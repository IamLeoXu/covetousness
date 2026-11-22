/* Insert the selected character tape, close the hatch, then pull back into the deck. */
(() => {
  'use strict';
  class TapeLoadingScene {
    constructor({ root, game, target, config, unlock }) {
      this.root=root; this.game=game; this.target=target; this.config=config||{}; this.unlock=unlock;
      this.loaded=false; this.loading=false;
      this.button=document.getElementById('enter'); this.scene=document.getElementById('loadScene');
      this.bay=document.getElementById('loadBay'); this.status=document.getElementById('loadStatus');
      this.game.inert=true;
    }

    async animate(element, frames, duration) {
      if (typeof element.animate !== 'function' || duration <= 0) {
        Object.assign(element.style, frames[frames.length-1]); return;
      }
      await element.animate(frames,{duration,easing:'cubic-bezier(.22,.72,.2,1)',fill:'forwards'}).finished.catch(()=>{});
    }

    async insert() {
      if (this.loaded || this.loading) return false;
      this.loading=true; this.button.disabled=true;
      this.root.dataset.step='inserting'; this.status.textContent='正在放入磁带';
      // Resume the audio context in the original click; the song itself waits for the pullback.
      const unlocked=Promise.resolve(this.unlock()).catch(()=>{});
      const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
      const speed=reduced ? 0 : 1;
      const source=document.getElementById('handCassette').getBoundingClientRect();
      const bay=document.getElementById('bayCassette').getBoundingClientRect();
      this.button.style.transformOrigin=`${source.width/2}px ${source.height/2}px`;
      const dx=bay.left+bay.width/2-source.left-source.width/2, dy=bay.top+bay.height/2-source.top-source.height/2;
      const ratio=bay.width/source.width;
      await this.animate(this.button,[{transform:'translate(0,0) scale(1)'},{transform:`translate(${dx}px,${dy}px) scale(${ratio})`}],(this.config.insertMs??850)*speed);
      this.root.dataset.step='closing'; this.status.textContent='合上舱盖';
      await this.animate(document.getElementById('loadDoor'),[{transform:'rotateX(-108deg)'},{transform:'rotateX(0deg)'}],(this.config.closeMs??520)*speed);
      this.root.dataset.step='pullback'; this.status.textContent='SIDE A';
      const current=document.getElementById('bayCassette').getBoundingClientRect(), target=this.target.getBoundingClientRect();
      const cx=current.left+current.width/2, cy=current.top+current.height/2;
      this.scene.style.transformOrigin=`${cx}px ${cy}px`;
      const tx=target.left+target.width/2-cx, ty=target.top+target.height/2-cy, zoom=target.width/current.width;
      await Promise.all([
        this.animate(this.scene,[{transform:'translate(0,0) scale(1)',opacity:1},{transform:`translate(${tx}px,${ty}px) scale(${zoom})`,opacity:0}],(this.config.pullbackMs??1050)*speed),
        this.animate(this.root,[{backgroundColor:'#10151e'},{backgroundColor:'#10151e00'}],(this.config.pullbackMs??1050)*speed),
      ]);
      await unlocked;
      this.loaded=true; this.loading=false; this.root.hidden=true; this.game.inert=false;
      document.getElementById('play').focus?.({preventScroll:true});
      return true;
    }
  }
  window.TapeLoadingScene=TapeLoadingScene;
})();
