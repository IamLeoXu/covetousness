/* 磁带机、调音台与音乐共用播放位置。镜头和字幕在 timeline.js 中编排。 */
(() => {
  'use strict';

  const $ = id => document.getElementById(id);
  const data = window.TIMELINE;
  const audio = $('audio');
  const game = $('game');
  const viewport = $('viewport');
  const message = $('message');
  if (!data?.scenes?.length || !data?.lyrics?.length) {
    message.hidden = false;
    message.textContent = '时间轴无法读取，请检查 timeline.js。';
    return;
  }

  if (data.music && audio.getAttribute('src') !== data.music) audio.src = data.music;
  const cache = window.AUDIO_ANALYSIS?.music === data.music ? window.AUDIO_ANALYSIS : null;
  const signal = new window.AudioSignal(audio, cache);
  const film = new window.ExecutionFilm(data);
  const meters = new window.StereoVUMeter($('meterL'), $('meterR'));
  const overview = $('overview');
  const scope = $('scope');
  const scrub = $('seek');
  const start = $('play');
  const phaseScope = $('phaseScope');

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const pad = value => String(value).padStart(2, '0');
  const format = t => `${pad(Math.floor(t / 60))}:${pad(Math.floor(t % 60))}`;
  let duration = data.duration;
  let time = 0;
  let rate = 0;
  let command = 0;
  let entered = false;
  let completed = false;
  let paintedTime = -1;
  let waveformTime = -1;
  let lastFrame = 0;
  let messageTimer;

  const setVolume = value => {
    signal.setVolume(value / 100);
    $('volume').value = value;
    $('volumeLabel').value = value;
  };
  setVolume(Math.round(clamp(data.settings.volume ?? .75, 0, 1) * 100));
  function setEffect(id, key, value) {
    const n = clamp(Number(value) || 0, 0, 100);
    $(id).value = String(n);
    $(id + 'Label').value = String(n);
    film.setEffects({ [key]: n / 100 });
  }
  setEffect('revealFx', 'reveal', Math.round((data.settings.pictureReveal ?? .12) * 100));
  setEffect('shiftFx', 'shift', Math.round((data.settings.pictureShift ?? 0) * 100));
  $('lyric').style.setProperty('--lyric-scale', clamp(data.settings.lyricFontScale ?? 1, .65, 1.2));

  function notify(text) {
    clearTimeout(messageTimer);
    message.textContent = text;
    message.hidden = false;
    messageTimer = setTimeout(() => { message.hidden = true; }, 5000);
  }

  function showFilm() {
    entered = true;
    $('opening').hidden = true;
    $('ending').hidden = true;
  }

  function updateState() {
    const playing = rate === 1;
    const state = playing ? 'playing' : rate < 0 ? 'rewinding' : rate > 1 ? 'forwarding' : entered ? 'paused' : 'idle';
    game.classList.remove('idle', 'paused', 'playing', 'rewinding', 'forwarding');
    game.classList.add(state);
    const labels = { playing: 'PLAYING', rewinding: 'REWIND', forwarding: 'FAST FORWARD', paused: 'PAUSED', idle: 'READY' };
    $('deckState').textContent = completed ? 'END OF TAPE' : labels[state];
    $('playIcon').setAttribute('d', playing ? 'M8 3h6v18H8zm11 0h6v18h-6z' : 'M9 2 26 12 9 22z');
    $('playLabel').textContent = playing ? 'PAUSE' : 'PLAY';
    start.setAttribute('aria-label', playing ? '暂停' : '播放');
    start.setAttribute('aria-pressed', String(playing));
    $('rew').classList.toggle('selected', rate < 0);
    $('forward').classList.toggle('selected', rate > 1);
  }

  function syncAudio() {
    if (Number.isFinite(audio.duration)) audio.currentTime = clamp(time, 0, duration);
  }

  function pauseAudio() {
    audio.pause();
    signal.pauseOutput();
  }

  function seek(value, reveal = true) {
    const stateChanged = completed || (reveal && !entered);
    completed = false;
    $('ending').hidden = true;
    if (reveal) showFilm();
    time = clamp(Number(value) || 0, 0, duration);
    syncAudio();
    paintedTime = waveformTime = -1;
    if (stateChanged) updateState();
  }

  async function play() {
    if (rate === 1) {
      command++;
      rate = 0;
      pauseAudio();
      if (!audio.seeking) time = clamp(audio.currentTime, 0, duration);
      updateState();
      return;
    }
    showFilm();
    const operation = ++command;
    completed = false;
    if (time >= duration - .03) time = 0;
    syncAudio();
    rate = 1;
    updateState();
    try {
      await signal.resume();
      if (operation !== command || rate !== 1) { signal.pauseOutput(); return; }
      await audio.play();
      if (operation !== command && rate !== 1) pauseAudio();
    } catch {
      if (operation !== command) return;
      rate = 0;
      pauseAudio();
      updateState();
      notify(audio.error ? '音乐无法读取，请检查 assets/bgm.mp3。' : '点击 PLAY 继续播放音乐。');
    }
  }

  function stop() {
    command++;
    rate = 0;
    pauseAudio();
    seek(0, false);
    updateState();
  }

  function scan(speed) {
    showFilm();
    command++;
    pauseAudio();
    completed = false;
    rate = rate === speed ? 0 : speed;
    updateState();
  }

  function finish() {
    command++;
    rate = 0;
    time = duration;
    pauseAudio();
    completed = true;
    $('ending').hidden = false;
    updateState();
  }

  function resize() {
    const scale = Math.min(viewport.clientWidth / 1600, viewport.clientHeight / 900);
    game.style.transform = `scale(${scale})`;
    film.resize();
  }

  function cinema() {
    game.classList.toggle('cinema');
    resize();
  }

  function fullscreen() {
    if (document.fullscreenElement) document.exitFullscreen?.().catch(() => {});
    else viewport.requestFullscreen?.().catch(() => notify('可以使用浏览器的全屏键观看。'));
  }

  function showTime() {
    const text = format(time);
    $('time').textContent = text;
    $('counter').textContent = text;
    $('filmTime').textContent = `${text}:${pad(Math.floor(time % 1 * 25))}`;
    scrub.value = String(time);
    scrub.setAttribute('aria-valuetext', `${text} / ${format(duration)}`);
    const fraction = time / duration;
    $('playhead').style.left = `calc(${fraction * 100}% - ${fraction * 2}px)`;
    const maxRadius = 22, minRadius = 16.5, area = maxRadius ** 2 - minRadius ** 2;
    const leftRadius = Math.sqrt(maxRadius ** 2 - fraction * area);
    const rightRadius = Math.sqrt(minRadius ** 2 + fraction * area);
    const turns = 88 * duration * 2 / area * 180 / Math.PI;
    $('reelL').style.transform = `rotate(${turns * (maxRadius - leftRadius)}deg)`;
    $('reelR').style.transform = `rotate(${turns * (rightRadius - minRadius)}deg)`;
    $('rollL').style.transform = `scale(${leftRadius / maxRadius})`;
    $('rollR').style.transform = `scale(${rightRadius / maxRadius})`;
    $('tapeStrip').setAttribute('d', `M 50 ${25 - leftRadius} L 150 ${25 - rightRadius}`);
  }

  function showSignal(values, delta) {
    meters.update(values.rms, delta);
    signal.drawScope(scope, values);
    signal.drawPhase(phaseScope, values);
    $('signalLamp').classList.toggle('lit', Math.max(...values.rms) > .005);
  }

  function frame(stamp) {
    const delta = lastFrame ? Math.min((stamp - lastFrame) / 1000, .12) : 1 / 60;
    lastFrame = stamp;
    const audible = rate === 1 && !audio.paused && !audio.seeking && audio.readyState >= 2;
    if (audible) time = clamp(audio.currentTime, 0, duration);
    if (rate !== 0 && rate !== 1) {
      time = clamp(time + delta * rate, 0, duration);
      if (time <= 0 || time >= duration) {
        rate = 0;
        syncAudio();
        updateState();
      }
    }
    if (time !== paintedTime || film.needsPaint) {
      film.render(time);
      showTime();
      paintedTime = time;
    }
    showSignal(signal.read(time, audible), delta);
    if (waveformTime < 0 || Math.abs(time - waveformTime) > .07) {
      signal.drawOverview(overview, time, duration);
      waveformTime = time;
    }
    if (rate === 1 && time >= duration - .015) finish();
    requestAnimationFrame(frame);
  }

  function updateDuration() {
    if (!Number.isFinite(audio.duration) || audio.duration <= 0) return;
    duration = audio.duration;
    scrub.max = String(duration);
    $('duration').textContent = '/ ' + format(duration);
    $('endTime').textContent = format(duration);
    waveformTime = -1;
    if (time > 0) syncAudio();
  }

  function toggleMute() {
    signal.setMuted(!signal.muted);
    const mute = $('mute');
    mute.classList.toggle('muted', signal.muted);
    mute.setAttribute('aria-label', signal.muted ? '取消静音' : '静音');
    mute.setAttribute('aria-pressed', String(signal.muted));
  }

  $('enter').onclick = play;
  start.onclick = play;
  $('stop').onclick = stop;
  $('rew').onclick = () => scan(-3);
  $('forward').onclick = () => scan(2.5);
  $('replay').onclick = () => { stop(); play(); };
  scrub.oninput = event => seek(event.target.value);
  $('volume').oninput = event => setVolume(Number(event.target.value));
  $('revealFx').oninput = event => setEffect('revealFx', 'reveal', event.target.value);
  $('shiftFx').oninput = event => setEffect('shiftFx', 'shift', event.target.value);
  $('mute').onclick = toggleMute;
  $('cinema').onclick = cinema;
  $('exitCinema').onclick = cinema;
  $('fullscreen').onclick = fullscreen;

  audio.addEventListener('loadedmetadata', updateDuration);
  audio.addEventListener('ended', finish);
  audio.addEventListener('error', () => {
    command++;
    rate = 0;
    signal.pauseOutput();
    updateState();
    notify('音乐无法读取，请检查 assets/bgm.mp3。');
  });
  audio.addEventListener('waveformready', () => { waveformTime = -1; });
  if (audio.readyState >= 1) updateDuration();

  document.addEventListener('keydown', event => {
    if (event.ctrlKey || event.metaKey || event.altKey || event.target instanceof HTMLInputElement) return;
    const key = event.key.toLowerCase();
    if (key === ' ' && !(event.target instanceof HTMLButtonElement)) { event.preventDefault(); play(); }
    else if (key === 'arrowleft') { event.preventDefault(); seek(time - 3); }
    else if (key === 'arrowright') { event.preventDefault(); seek(time + 3); }
    else if (key === 'j') scan(-3);
    else if (key === 'l') scan(2.5);
    else if (key === 'm') toggleMute();
    else if (key === 'c') cinema();
    else if (key === 'f') fullscreen();
    else if (key === 'escape' && game.classList.contains('cinema') && !document.fullscreenElement) cinema();
  });
  window.addEventListener('resize', resize);
  document.addEventListener('fullscreenchange', resize);
  resize();
  updateState();
  requestAnimationFrame(frame);
})();
