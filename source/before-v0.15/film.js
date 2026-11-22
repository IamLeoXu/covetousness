/* Layered memory collage. Every moving element is driven by the song clock. */
(() => {
  'use strict';
  const clamp = (n, a = 0, b = 1) => Math.max(a, Math.min(b, n));
  const smooth = n => { n = clamp(n); return n * n * (3 - 2 * n); };
  const mix = (a, b, n) => a + (b - a) * n;
  const fract = n => n - Math.floor(n);
  const fill = (ctx, w, h, color) => { ctx.fillStyle = color; ctx.fillRect(0, 0, w, h); };

  class ExecutionFilm {
    constructor(data) {
      this.data = data;
      this.picture = document.getElementById('picture');
      this.canvas = document.getElementById('scenery');
      this.ctx = this.canvas.getContext('2d', { alpha: false });
      this.next = document.createElement('canvas');
      this.nextCtx = this.next.getContext('2d', { alpha: false });
      this.expressionLayer = document.createElement('canvas');
      this.expressionShadow = document.createElement('canvas');
      this.lyric = document.getElementById('lyric');
      this.lines = ['lyricOne', 'lyricTwo'].map(id => document.getElementById(id));
      this.reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
      this.needsPaint = true;
      this.art = this.loadGroup(data.art);
      this.props = this.loadGroup(data.props);
      this.portraits = this.loadGroup(data.portraits);
      this.fullPortraits = this.loadGroup({
        ...(data.seatedSprites || {}),
        ...(data.standingSprite ? { stand: data.standingSprite } : {}),
      });
      this.hdPortraits = this.loadGroup(data.hdSprites);
      this.animations = this.loadAnimations(data.animations);
      this.silhouettes = new Map();
      this.resize();
    }

    loadGroup(group) {
      return Object.fromEntries(Object.entries(group || {}).map(([key, src]) => {
        const image = new Image();
        const asset = { image, ready: false };
        image.onload = () => { asset.ready = true; this.needsPaint = true; };
        image.decoding = 'async'; image.src = src;
        return [key, asset];
      }));
    }

    loadAnimations(group) {
      return Object.fromEntries(Object.entries(group || {}).map(([name, config]) => {
        const paths = Array.isArray(config.frames) ? config.frames : Array.from(
          { length: Math.max(0, Math.floor(config.frameCount || 0)) },
          (_, index) => config.src.replace('{frame}', String(index).padStart(config.digits ?? 3, '0')),
        );
        const frames = Object.values(this.loadGroup(Object.fromEntries(paths.map((src, index) => [index, src]))));
        return [name, { frames, fps: Math.max(.01, Number(config.fps) || 24) }];
      }));
    }

    animationFrame(shot, t) {
      const animation = this.animations[shot.pose];
      if (!animation?.frames.length) return 0;
      const speed = Math.max(0, Number(shot.animationSpeed ?? 1) || 0);
      const start = Math.max(0, Number(shot.animationStart ?? 0) || 0);
      const elapsed = Math.max(0, t - (shot.t ?? 0)) * speed + start;
      // The epsilon keeps exact frame boundaries stable despite floating-point song times.
      const index = Math.floor(elapsed * animation.fps + 1e-7);
      return shot.animationLoop === false ? Math.min(index, animation.frames.length - 1) : index % animation.frames.length;
    }

    resize() {
      const w = this.picture.clientWidth || 1242, h = this.picture.clientHeight || 556;
      const ratio = clamp(window.devicePixelRatio || 1, 1, 2);
      if (w === this.width && h === this.height && ratio === this.pixelRatio) return;
      this.width = w; this.height = h; this.pixelRatio = ratio;
      for (const surface of [this.canvas, this.next]) {
        surface.width = Math.round(w * ratio); surface.height = Math.round(h * ratio);
        const context = surface.getContext('2d');
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
        context.imageSmoothingQuality = 'high';
      }
      this.needsPaint = true;
    }

    getScene(t) {
      let index = 0;
      while (index + 1 < this.data.scenes.length && this.data.scenes[index + 1].t <= t) index++;
      return { scene: this.data.scenes[index], index };
    }

    expressionAt(t, scene) {
      if (!scene.pose) return { pose: null, previous: null, blend: 1 };
      if (scene.followExpressions === false || (this.animations[scene.pose] && scene.followExpressions !== true)) {
        return { pose: scene.pose, previous: null, blend: 1 };
      }
      let cue = null, previous = null;
      for (const item of this.data.expressions || []) {
        if (item.t > t) break;
        previous = cue;
        cue = item;
      }
      if (!cue) return { pose: scene.pose, previous: null, blend: 1 };
      const seconds = this.data.settings.expressionTransitionSeconds ?? .2;
      const canBlend = previous && cue.t > scene.t && !this.reducedMotion && scene.treatment !== 'silhouette'
        && !this.animations[cue.pose] && !this.animations[previous.pose]
        && !this.data.shadowSprites?.[cue.pose] && !this.data.shadowSprites?.[previous.pose];
      return {
        pose: cue.pose,
        layout: cue.t >= scene.t ? cue.layout : null,
        previous: canBlend ? previous.pose : null,
        blend: canBlend ? smooth((t - cue.t) / Math.max(.01, seconds)) : 1,
      };
    }

    updateLyrics(t, scene) {
      const cue = this.data.lyrics.find(line => t >= line.time && t < line.end) || null;
      if (cue !== this.currentLyric) {
        const words = (cue?.text || '').split('\n');
        this.lines[0].textContent = words[0] || '';
        this.lines[1].textContent = words.slice(1).join(' ');
        this.currentLyric = cue;
      }
      this.lyric.dataset.empty = String(!cue);
      this.lyric.dataset.align = scene.subtitleAlign || 'left';
      this.lyric.style.left = this.lyric.style.right = clamp(scene.subtitleX ?? 6, 2, 16) + '%';
      this.lyric.style.bottom = clamp(scene.subtitleY ?? 8, 4, 28) + '%';
      this.lyric.style.opacity = cue ? String(this.reducedMotion ? 1 : Math.min(smooth((t - cue.time) / .17), smooth((cue.end - t) / .16))) : '0';
    }

    render(t) {
      const { scene, index } = this.getScene(t);
      const fade = this.data.settings.transitionSeconds ?? .6;
      const local = t - scene.t;
      if (index > 0 && local < fade && scene.transition === 'fade' && !this.reducedMotion) {
        const previous = this.data.scenes[index - 1];
        // Hold the outgoing expression before the new cue, including its own layout.
        this.drawShot(this.ctx, previous, Math.max(previous.t, scene.t - 1e-6));
        this.drawShot(this.nextCtx, scene, t);
        this.ctx.save(); this.ctx.globalAlpha = smooth(local / fade);
        this.ctx.drawImage(this.next, 0, 0, this.width, this.height); this.ctx.restore();
      } else this.drawShot(this.ctx, scene, t);
      this.printTransition(this.ctx, t);
      this.updateLyrics(t, scene);
      this.needsPaint = false;
    }

    polygon(ctx, points, color) {
      ctx.beginPath();
      points.forEach(([x, y], i) => i ? ctx.lineTo(x * this.width, y * this.height) : ctx.moveTo(x * this.width, y * this.height));
      ctx.closePath(); ctx.fillStyle = color; ctx.fill();
    }

    cover(ctx, image, x, y, w, h) {
      const s = Math.max(w / image.width, h / image.height);
      const sw = w / s, sh = h / s;
      ctx.drawImage(image, (image.width - sw) / 2, (image.height - sh) / 2, sw, sh, x, y, w, h);
    }

    prop(ctx, name, x, y, height, angle = 0, opacity = 1, ghost = true) {
      const asset = this.props[name];
      if (!asset?.ready || opacity <= 0) return;
      const img = asset.image, h = height * this.height, w = h * img.width / img.height;
      ctx.save(); ctx.translate(x * this.width, y * this.height); ctx.rotate(angle);
      ctx.globalAlpha = opacity; ctx.drawImage(img, -w / 2, -h / 2, w, h); ctx.restore();
    }

    framed(ctx, x, y, height, content, options = {}) {
      const frame = this.props.frame;
      if (!frame?.ready) return;
      const img = frame.image, h = height * this.height, w = h * img.width / img.height;
      const alpha = options.alpha ?? 1, fade = options.fade ?? 1;
      ctx.save(); ctx.translate(x * this.width, y * this.height); ctx.rotate(options.angle || 0);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = '#20121f';
      const px = -w * .5 + w * .125, py = -h * .5 + h * .16, pw = w * .73, ph = h * .57;
      ctx.fillRect(px, py, pw, ph);
      const photo = this.props[content];
      if (photo?.ready && fade > 0) {
        ctx.save(); ctx.beginPath(); ctx.rect(px, py, pw, ph); ctx.clip();
        ctx.globalAlpha = alpha * fade;
        this.cover(ctx, photo.image, px, py, pw, ph); ctx.restore();
      }
      ctx.globalAlpha = alpha; ctx.drawImage(img, -w * .5, -h * .5, w, h); ctx.restore();
    }

    stickerState(item, scene, t) {
      if (!item || item.visible === false || !item.asset) return null;
      const sceneEnd = this.data.scenes.find(next => next.t > scene.t)?.t ?? this.data.duration;
      const start = Number(item.start ?? scene.t ?? 0), end = Number(item.end ?? sceneEnd);
      // The outgoing scene can retain its last sticker state during a scene dissolve.
      const outgoingEnd = t === sceneEnd && end === sceneEnd && this.getScene(t).scene !== scene;
      if (end <= start || t < start || (t >= end && !outgoingEnd)) return null;
      const motion = item.motion || {};
      const motionStart = Number(motion.startTime ?? start);
      const duration = Math.max(.001, Number(motion.duration ?? (end - motionStart)) || .001);
      let progress = this.reducedMotion ? 0 : clamp((t - motionStart) / duration);
      if (motion.ease === 'smooth') progress = smooth(progress);
      const interpolate = (key, fallback) => {
        const from = Number(item[key] ?? fallback), to = Number(motion[key + 'To'] ?? from);
        return mix(from, to, progress);
      };
      let x = interpolate('x', 50), y = interpolate('y', 50);
      const height = interpolate('height', 25), rotation = interpolate('rotation', 0);
      let opacity = interpolate('opacity', 1);
      // Optional presets preserve the existing flowing frames and accumulating archive.
      if (motion.preset === 'faces') {
        const index = Number(motion.index) || 0, depth = Number(motion.depth) || 1;
        const clock = this.reducedMotion ? 72 : 69 + Math.max(0, t - motionStart);
        const anchor = Number(motion.anchorX ?? mix(-20, 125, fract(index / (motion.count || 4))));
        x += this.facePosition(clock, depth, index, motion.count || 4) * 100 - anchor;
      } else if (motion.preset === 'archive') {
        const index = Number(motion.index) || 0;
        const clock = t - motionStart + (Number(motion.offset) || 0);
        opacity *= smooth(smooth(clock / duration) * 1.8 - index * .09);
        if (!this.reducedMotion) y += Math.sin((112 + clock) * .21 + index * 1.3) * 2;
      }
      const fadeIn = Math.max(0, Number(item.fadeIn) || 0), fadeOut = Math.max(0, Number(item.fadeOut) || 0);
      if (fadeIn > 0) opacity *= smooth((t - start) / fadeIn);
      if (fadeOut > 0) opacity *= smooth((end - t) / fadeOut);
      if (height <= 0 || opacity <= 0) return null;
      let contentOpacity = clamp(Number(item.contentOpacity ?? 1));
      if (item.contentFadeOut) {
        const fade = item.contentFadeOut;
        contentOpacity *= 1 - smooth((t - Number(fade.start)) / Math.max(.001, Number(fade.duration) || .001));
      }
      return { asset: item.asset, content: item.content ?? 'faceEmpty', x: x / 100, y: y / 100,
        height: height / 100, angle: rotation * Math.PI / 180, opacity: clamp(opacity),
        contentOpacity, ghost: item.ghost !== false };
    }

    drawStickers(ctx, scene, t, layer = 'back') {
      for (const item of Array.isArray(scene.stickers) ? scene.stickers : []) {
        if ((item.layer === 'front' ? 'front' : 'back') !== layer) continue;
        const state = this.stickerState(item, scene, t);
        if (!state) continue;
        if (state.asset === 'frame') {
          this.framed(ctx, state.x, state.y, state.height, state.content,
            { angle: state.angle, alpha: state.opacity, fade: state.contentOpacity });
        } else this.prop(ctx, state.asset, state.x, state.y, state.height, state.angle, state.opacity, state.ghost);
      }
    }

    portraitAsset(shot) {
      const animation = this.animations[shot.pose];
      if (animation) return animation.frames[shot._animationFrame ?? 0];
      // Complete figures are the default. Old face-anchored crops require an explicit portrait shot.
      if (shot.framing !== 'portrait' && shot.quality !== 'original' && this.data.settings.characterHD !== false) {
        const hd = this.hdPortraits[shot.pose];
        if (hd?.ready) return hd;
      }
      return (shot.framing === 'portrait' ? this.portraits : this.fullPortraits)[shot.pose];
    }

    silhouette(shot, mixed = null) {
      const color = shot.silhouetteColor ?? shot.color ?? '#261522';
      const key = JSON.stringify([shot.framing || 'full', shot.pose, color]);
      const image = mixed || this.portraitAsset(shot).image;
      const cached = mixed ? null : this.silhouettes.get(key);
      if (cached?.image === image) return cached.layer;
      // Reuse one tint surface for an animation instead of retaining a canvas for every frame.
      const layer = mixed ? this.expressionShadow : cached?.layer || document.createElement('canvas');
      if (layer.width !== image.width || layer.height !== image.height) {
        layer.width = image.width; layer.height = image.height;
      }
      const ctx = layer.getContext('2d');
      ctx.globalCompositeOperation = 'source-over'; ctx.clearRect(0, 0, layer.width, layer.height);
      ctx.drawImage(image, 0, 0);
      ctx.globalCompositeOperation = 'source-in'; fill(ctx, layer.width, layer.height, color);
      ctx.globalCompositeOperation = 'source-over';
      if (!mixed) this.silhouettes.set(key, { image, layer });
      return layer;
    }

    portrait(ctx, scene, t, override = {}) {
      const shot = { ...scene, ...override };
      const expression = this.expressionAt(t, shot);
      let mixed = null;
      if (expression.previous && expression.blend < 1) {
        const before = this.portraitAsset({ ...shot, pose: expression.previous });
        const after = this.portraitAsset({ ...shot, pose: expression.pose });
        if (before?.ready && after?.ready) {
          const layer = this.expressionLayer;
          const height = after.image.height;
          const beforeWidth = before.image.width * height / before.image.height;
          const width = Math.ceil(Math.max(beforeWidth, after.image.width));
          if (layer.width !== width || layer.height !== height) {
            layer.width = width; layer.height = height;
          }
          const mixCtx = layer.getContext('2d');
          mixCtx.clearRect(0, 0, layer.width, layer.height);
          mixCtx.globalCompositeOperation = 'source-over';
          mixCtx.globalAlpha = 1 - expression.blend;
          mixCtx.drawImage(before.image, (width - beforeWidth) / 2, 0, beforeWidth, height);
          // Add premultiplied layers so the shared body stays opaque during a face change.
          mixCtx.globalCompositeOperation = 'lighter';
          mixCtx.globalAlpha = expression.blend;
          mixCtx.drawImage(after.image, (width - after.image.width) / 2, 0, after.image.width, height);
          mixCtx.globalAlpha = 1; mixCtx.globalCompositeOperation = 'source-over';
          mixed = layer;
        }
      }
      if (expression.pose) this.portraitLayer(ctx, { ...shot, ...(expression.layout || {}), pose: expression.pose }, t, mixed);
    }

    portraitLayer(ctx, shot, t, mixed = null) {
      if (this.animations[shot.pose]) shot = { ...shot, _animationFrame: this.animationFrame(shot, t) };
      const asset = this.portraitAsset(shot);
      if (!asset?.ready) return;
      const isSilhouette = shot.treatment === 'silhouette';
      const img = isSilhouette ? this.silhouette(shot) : mixed || asset.image;
      const defaultScale = !this.animations[shot.pose] && shot.framing !== 'portrait' ? .82 : 1;
      const h = this.height * (shot.scale ?? defaultScale), w = h * img.width / img.height;
      const motion = shot.motion ?? this.data.settings.motion ?? 1;
      const drift = this.reducedMotion ? 0 : Math.sin(t * .6) * this.height * .002 * motion;
      // x is the sprite's horizontal centre; y is its bottom's distance above the frame bottom.
      const x = this.width * (shot.x ?? 50) / 100 - w / 2;
      const y = this.height * (1 - (shot.y ?? 0) / 100) - h + drift;
      const opacity = shot.opacity ?? 1;
      ctx.save(); ctx.globalAlpha = opacity;
      // Hard printed shadow, not an airbrushed halo.
      if (!isSilhouette && shot.printShadow !== false && !this.data.shadowSprites?.[shot.pose]) {
        ctx.drawImage(this.silhouette(shot, mixed), x + 8, y + 4, w, h);
      }
      ctx.globalAlpha = opacity; ctx.drawImage(img, x, y, w, h); ctx.restore();
    }

    backgroundRect(scene, t, image) {
      const motion = scene.backgroundMotion;
      let zoom = Math.max(1, Number(scene.camera) || 1), offsetX = 0, offsetY = 0, progress = 0;
      if (motion && typeof motion === 'object') {
        const start = Number(motion.startTime ?? scene.t ?? 0);
        const end = this.data.scenes.find(item => item.t > (scene.t ?? 0))?.t ?? this.data.duration;
        const duration = Math.max(.001, Number(motion.duration ?? (end - start)) || .001);
        progress = this.reducedMotion ? 0 : clamp((t - start) / duration);
        if (motion.ease === 'smooth') progress = smooth(progress);
        const fromZoom = Math.max(1, Number(motion.zoom ?? scene.camera) || 1);
        zoom = mix(fromZoom, Math.max(1, Number(motion.zoomTo ?? fromZoom) || 1), progress);
        offsetX = this.width * mix(Number(motion.fromX) || 0, Number(motion.toX ?? motion.fromX) || 0, progress) / 100;
        offsetY = -this.height * mix(Number(motion.fromY) || 0, Number(motion.toY ?? motion.fromY) || 0, progress) / 100;
      } else if (scene.stage === 'rain' || scene.stage === 'departure') {
        offsetX = this.reducedMotion ? 0 : -clamp(t / 31) * this.width * (scene.pan ?? .018);
      }
      const scale = Math.max(this.width / image.width, this.height / image.height) * zoom;
      const width = image.width * scale, height = image.height * scale;
      if (motion?.clamp !== false) {
        const extraX = Math.max(0, (width - this.width) / 2), extraY = Math.max(0, (height - this.height) / 2);
        offsetX = clamp(offsetX, -extraX, extraX); offsetY = clamp(offsetY, -extraY, extraY);
      }
      return { x: (this.width - width) / 2 + offsetX, y: (this.height - height) / 2 + offsetY,
        width, height, zoom, progress };
    }

    background(ctx, scene, t, fallback = null) {
      const asset = this.art[scene.background ?? fallback];
      if (!asset?.ready) return false;
      const rect = this.backgroundRect(scene, t, asset.image);
      ctx.drawImage(asset.image, rect.x, rect.y, rect.width, rect.height);
      if (scene.backgroundTint) fill(ctx, this.width, this.height, scene.backgroundTint);
      return true;
    }

    city(ctx, scene, t) {
      this.background(ctx, scene, t, 'city');
      this.polygon(ctx, [[.48, 0], [1, 0], [1, 1], [.74, 1]], '#30132270');
      this.drawStickers(ctx, scene, t, 'back');
      this.portrait(ctx, scene, t);
      if (!this.reducedMotion) {
        ctx.strokeStyle = '#f5dcd54a'; ctx.lineWidth = .8;
        for (let i = 0; i < 42; i++) {
          const x = fract(i * .6181) * this.width, y = fract(t * .57 + i * .379) * this.height;
          ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 5, y + 21); ctx.stroke();
        }
      }
      if (scene.stage === 'departure') {
        const p = smooth((t - 24.5) / 6.5);
        this.polygon(ctx, [[.48, 0], [.54, 0], [.33, .68], [.25, .68]], '#f9dfb0' + Math.round(mix(80, 15, p)).toString(16).padStart(2, '0'));
      }
      this.drawStickers(ctx, scene, t, 'front');
    }

    facePosition(t, depth, i, count = 4) {
      // Integral of a ramped speed: motion stays continuous at 73.5s and 77s.
      const dt = Math.max(0, t - 69), ramp = clamp(t - 73.5, 0, 3.5);
      const distance = dt * .065 + .5 * .25 / 3.5 * ramp * ramp + Math.max(0, t - 77) * .25;
      const phase = fract(i / count - distance * depth);
      return mix(-.2, 1.25, phase);
    }

    collage(ctx, scene, t) {
      this.background(ctx, scene, t);
      this.drawStickers(ctx, scene, t, 'back');
      this.portrait(ctx, scene, t);
      this.drawStickers(ctx, scene, t, 'front');
    }

    drawShot(ctx, scene, t, nested = false) {
      ctx.save(); fill(ctx, this.width, this.height, '#17131b');
      if (scene.flashbacks?.length && !nested) this.flashback(ctx, scene, t);
      else if (scene.stage === 'rain' || scene.stage === 'departure') this.city(ctx, scene, t);
      else this.collage(ctx, scene, t);
      // A readability wash is composition, not a generated illustration.
      const shade = ctx.createLinearGradient(0, this.height * .7, 0, this.height);
      shade.addColorStop(0, '#17131b00'); shade.addColorStop(1, '#17131b70');
      fill(ctx, this.width, this.height, shade);
      ctx.restore();
    }

    flashbackAt(scene, t) {
      const track = this.reducedMotion ? scene.flashbacks.filter((_,i) => i % 3 === 0) : scene.flashbacks;
      let index=0;
      while (index+1 < track.length && track[index+1].t <= t) index++;
      const cue=track[index], end=track[index+1]?.t ?? this.data.scenes.find(s=>s.t>scene.t)?.t ?? this.data.duration;
      return { cue, end };
    }

    flashback(ctx, scene, t) {
      const {cue,end}=this.flashbackAt(scene,t);
      const source=this.data.scenes.find(s=>s.id===cue.sourceScene && !s.flashbacks);
      if (source) {
        const sourceTime=(cue.sourceTime??source.t) + (this.reducedMotion?0:Math.max(0,t-cue.t)*(cue.sourceSpeed??.15));
        this.drawShot(ctx,{...source,...(cue.sceneOverrides||{})},sourceTime,true);
      } else {
        const shot={...scene,...cue,flashbacks:null,pose:null,stickers:[],t:cue.t};
        this.background(ctx,shot,t);
        for (const layer of cue.layers||[]) {
          const state=this.stickerState({...layer,start:cue.t,end},scene,t);
          if (!state) continue;
          if (state.asset==='frame') this.framed(ctx,state.x,state.y,state.height,state.content,{angle:state.angle,alpha:state.opacity,fade:state.contentOpacity});
          else this.prop(ctx,state.asset,state.x,state.y,state.height,state.angle,state.opacity,false);
        }
      }
      const length=cue.splice??0, local=t-cue.t;
      const matte=this.props.printShutter;
      if (!this.reducedMotion && length>0 && local<length && matte?.ready) {
        const p=smooth(local/length);ctx.save();ctx.globalAlpha=.7*(1-p);ctx.translate(this.width*p*.12,0);
        this.cover(ctx,matte.image,0,0,this.width,this.height);ctx.restore();
      }
    }

    printTransition(ctx, t) {
      for (const item of this.data.settings.printTransitions || []) {
        const start = Number(item.start) || 0, duration = Math.max(.01, Number(item.duration) || 1);
        if (t < start || t > start + duration) continue;
        const asset = this.props[item.asset || 'printShutter'];
        if (!asset?.ready) continue;
        const p = clamp((t - start) / duration), closing = item.kind === 'close';
        const amount = closing ? smooth(p) : 1 - smooth(p);
        const w = this.width, h = this.height;
        const slip = this.reducedMotion ? 0 : (Math.floor(p * 7) % 2 ? 1 : -1) * w * .009 * amount;
        ctx.save(); ctx.globalAlpha = amount * (item.opacity ?? 1);
        ctx.translate(slip, 0); this.cover(ctx, asset.image, 0, 0, w, h);
        ctx.translate(w - slip * 2, h); ctx.rotate(Math.PI);
        ctx.globalAlpha *= .76; this.cover(ctx, asset.image, 0, 0, w, h); ctx.restore();
        const black = closing ? smooth((p - .68) / .32) : 1 - smooth(p / .35);
        if (black > 0) fill(ctx, w, h, '#17131b' + Math.round(black * 255).toString(16).padStart(2, '0'));
      }
    }
  }
  window.ExecutionFilm = ExecutionFilm;
})();
