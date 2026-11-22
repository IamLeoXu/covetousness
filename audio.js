/* Original track and master volume; the picture faders never enter the audio graph. */
(() => {
  'use strict';
  class AudioSignal {
    constructor(audio,cache){
      this.audio=audio;this.cache=cache;this.volume=.75;this.muted=false;this.running=false;
      this.context=null;this.analysers=null;this.source=null;this.gain=null;this.initializing=null;
      this.localReady=null;
      this.originalMusic=audio.getAttribute?.('src')||audio.src;
      this.overview=cache?.overview||null;this.buffers=[new Float32Array(1024),new Float32Array(1024)];
      this.frequency=new Uint8Array(512);this.flat=new Float32Array(64);
      this.cachedScopes=(cache?.scopes||[]).map(b64=>{
        const bytes=atob(b64),values=new Int8Array(bytes.length);
        for(let i=0;i<bytes.length;i++)values[i]=bytes.charCodeAt(i);return values;
      });
      this.setVolume(this.volume);
      const Context=window.AudioContext||window.webkitAudioContext;
      if(location.protocol==='file:'&&Context&&document.head?.appendChild)this.prepareLocalMedia().catch(()=>{});
    }
    setVolume(v){
      this.volume=Math.max(0,Math.min(1,Number(v)||0));
      const gain=this.muted?0:this.volume;
      if(this.gain){this.audio.volume=1;this.gain.gain.setTargetAtTime(this.running?gain:0,this.context.currentTime,.012);}
      else this.audio.volume=gain;
    }
    setMuted(v){this.muted=!!v;this.setVolume(this.volume);}
    prepareLocalMedia(){
      if(this.localReady)return this.localReady;
      this.localReady=new Promise((resolve,reject)=>{
        const script=document.createElement('script');script.src='assets/audio-source.js';
        script.onerror=()=>reject(new Error('Local audio payload unavailable'));
        script.onload=()=>{
          try{
            const data=window.LOCAL_AUDIO_DATA;
            if(!data?.base64)throw new Error('Local audio payload is empty');
            if(data.music!==this.originalMusic&&!this.originalMusic.endsWith('/'+data.music))throw new Error('Local audio payload does not match the track');
            const bytes=atob(data.base64),buffer=new Uint8Array(bytes.length);
            for(let i=0;i<bytes.length;i++)buffer[i]=bytes.charCodeAt(i);
            this.blobUrl=URL.createObjectURL(new Blob([buffer],{type:'audio/mpeg'}));
            this.audio.src=this.blobUrl;this.audio.load?.();
            delete window.LOCAL_AUDIO_DATA;script.remove();resolve();
          }catch(error){reject(error);}
        };
        document.head.appendChild(script);
      });
      return this.localReady;
    }
    initialize(){if(!this.initializing)this.initializing=this.openGraph();return this.initializing;}
    async openGraph(){
      const Context=window.AudioContext||window.webkitAudioContext;
      if(!Context)return;
      try{
        this.context=new Context({latencyHint:'interactive'});
        await this.context.resume();
        // A locally created Blob keeps direct-open playback origin-clean for Web Audio.
        if(location.protocol==='file:')await this.prepareLocalMedia();
        this.source=this.context.createMediaElementSource(this.audio);
        this.gain=this.context.createGain();
        this.source.connect(this.gain);this.gain.connect(this.context.destination);
        const splitter=this.context.createChannelSplitter(2);this.gain.connect(splitter);
        this.analysers=[0,1].map(channel=>{const analyser=this.context.createAnalyser();analyser.fftSize=1024;analyser.smoothingTimeConstant=.65;splitter.connect(analyser,channel);return analyser;});
        this.setVolume(this.volume);this.loadActualOverview();
      }catch(error){
        if(this.source){try{this.source.disconnect();this.source.connect(this.context.destination);}catch{}}
        this.gain=null;this.analysers=null;this.setVolume(this.volume);
      }
    }
    async resume(){
      await this.initialize();if(this.context?.state==='suspended')await this.context.resume();
      this.running=true;this.setVolume(this.volume);
    }
    pauseOutput(){this.running=false;this.setVolume(this.volume);}
    async loadActualOverview(){
      try{
        const response=await fetch(this.audio.currentSrc||this.audio.src);if(!response.ok)return;
        const decoded=await this.context.decodeAudioData(await response.arrayBuffer());
        const peaks=[];const bins=1500;
        for(let ch=0;ch<2;ch++){
          const pcm=decoded.getChannelData(Math.min(ch,decoded.numberOfChannels-1)),track=[];
          for(let i=0;i<bins;i++){
            const from=Math.floor(i*pcm.length/bins),to=Math.floor((i+1)*pcm.length/bins);
            let min=0,max=0;for(let j=from;j<to;j++){min=Math.min(min,pcm[j]);max=Math.max(max,pcm[j]);}
            track.push([min,max]);
          }
          peaks.push(track);
        }
        this.overview=peaks;this.audio.dispatchEvent(new Event('waveformready'));
      }catch{} // 缓存本身也是该音轨的真实采样；读取失败不会生成替代的假波形。
    }
    read(time,audible){
      if(!audible||this.muted||this.volume===0)return {rms:[0,0],waves:[this.flat,this.flat],energy:0};
      if(this.analysers){
        const rms=this.analysers.map((analyser,ch)=>{
          const buffer=this.buffers[ch];analyser.getFloatTimeDomainData(buffer);
          let power=0;for(const sample of buffer)power+=sample*sample;
          return Math.sqrt(power/buffer.length);
        });
        this.analysers[0].getByteFrequencyData(this.frequency);
        let bass=0;for(let i=1;i<10;i++)bass+=this.frequency[i];
        return {rms,waves:this.buffers,energy:bass/(9*255)};
      }
      if(this.cache&&this.cachedScopes.length===2&&Math.abs(this.audio.duration-this.cache.duration)<.3){
        const frame=Math.max(0,Math.min(this.cache.rms[0].length-1,Math.floor(time*this.cache.fps)));
        const n=this.cache.scopePoints;
        for(let ch=0;ch<2;ch++)for(let p=0;p<n;p++)this.buffers[ch][p]=this.cachedScopes[ch][frame*n+p]/127*this.volume;
        const rms=this.cache.rms.map(channel=>(channel[frame]||0)*this.volume);
        return {rms,waves:this.buffers.map(b=>b.subarray(0,n)),energy:Math.min(1,(rms[0]+rms[1])*2.4)};
      }
      return {rms:[0,0],waves:[this.flat,this.flat],energy:0};
    }
    drawOverview(canvas,time,duration){
      const ctx=canvas.getContext('2d'),w=canvas.width,h=canvas.height;ctx.clearRect(0,0,w,h);
      ctx.fillStyle='#151b25';ctx.fillRect(0,0,w,h);ctx.strokeStyle='#30394a';ctx.lineWidth=1;
      for(let ch=0;ch<2;ch++){
        const mid=h*(ch?.76:.25);ctx.beginPath();ctx.moveTo(0,mid);ctx.lineTo(w,mid);ctx.stroke();
        const peaks=this.overview?.[ch];if(!peaks)continue;
        const step=w/peaks.length;const end=time/duration*w;
        for(let i=0;i<peaks.length;i++){
          ctx.fillStyle=i*step<=end?'#d2f850':'#6c768c';
          const [min,max]=peaks[i];const y=mid-max*h*.205,height=Math.max(1,(max-min)*h*.205);
          ctx.fillRect(i*step,y,Math.max(.8,step*.7),height);
        }
      }
    }
    drawPhase(canvas,signal){
      const ctx=canvas.getContext('2d'),w=canvas.width,h=canvas.height;
      ctx.clearRect(0,0,w,h);
      const cx=w/2,cy=h/2,r=Math.min(w,h)*.42;
      ctx.strokeStyle='#293343';ctx.lineWidth=1;
      ctx.beginPath();ctx.moveTo(cx-r,cy);ctx.lineTo(cx+r,cy);ctx.moveTo(cx,cy-r);ctx.lineTo(cx,cy+r);ctx.stroke();
      ctx.beginPath();ctx.arc(cx,cy,r,0,Math.PI*2);ctx.stroke();
      ctx.save();ctx.translate(cx,cy);ctx.rotate(Math.PI/4);ctx.strokeRect(-r*.7,-r*.7,r*1.4,r*1.4);ctx.restore();
      const [left,right]=signal.waves,n=Math.min(left.length,right.length);
      ctx.strokeStyle='#aa90ff';ctx.lineWidth=1.4;ctx.beginPath();
      for(let i=0;i<n;i++){
        // Mid/side display: mono produces a vertical trace; stereo widens it.
        const x=cx+(left[i]-right[i])*r*1.4;
        const y=cy-(left[i]+right[i])*r*1.4;
        if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
      }
      ctx.stroke();ctx.fillStyle='#d2f850';ctx.fillRect(cx-1,cy-1,2,2);
    }
    drawScope(canvas,signal){
      const ctx=canvas.getContext('2d'),w=canvas.width,h=canvas.height;ctx.clearRect(0,0,w,h);
      ctx.strokeStyle='#293343';ctx.lineWidth=1;
      for(let x=0;x<=w;x+=w/12){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke();}
      for(let ch=0;ch<2;ch++){
        const mid=h*(ch?.74:.26);ctx.beginPath();ctx.moveTo(0,mid);ctx.lineTo(w,mid);ctx.stroke();
        const wave=signal.waves[ch];ctx.strokeStyle=ch?'#aa90ff':'#d2f850';ctx.lineWidth=1.8;ctx.beginPath();
        for(let i=0;i<wave.length;i++){
          const x=i/(wave.length-1)*w,y=mid-wave[i]*h*.24;
          if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
        }
        ctx.stroke();ctx.strokeStyle='#293343';
      }
    }
  }
  window.AudioSignal=AudioSignal;
})();
