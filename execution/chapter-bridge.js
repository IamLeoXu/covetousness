(function(){
  'use strict';
  const tell=event=>{if(parent!==window)parent.postMessage({channel:'dead-air-chapter',event},'*');};
  const audio=document.getElementById('audio');
  audio.addEventListener('ended',()=>tell('complete'));
  window.addEventListener('message',event=>{if(event.source!==parent||event.data?.channel!=='dead-air-chapter')return;if(event.data.action==='pause')audio.pause();});
  tell('ready');
})();
