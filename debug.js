/* TEST ONLY. Set enabled:false or remove this script before publication. */
(function(){
  'use strict';const D=window.InquiryData,E=window.InquiryEngine;
  function solutions(s,topicId){
    const layer=D.caseLayers.find(item=>item.id===topicId);if(!layer)return [];
    const owned=new Set([...(s.collected||[]),...(s.facts||[])]),inLayer=new Set([...layer.materials,...layer.facts]);
    return Object.entries(D.inferenceRecipes).filter(([id])=>layer.facts.includes(id)).flatMap(([claim,recipes])=>{
      const sources=recipes.find(recipe=>recipe.every(id=>owned.has(id)&&inLayer.has(id))&&E.evaluate(claim,recipe).fact===claim);
      return sources?[{claim,sources:[...sources],known:(s.facts||[]).includes(claim)}]:[];
    });
  }
  function render(){
    if(typeof document==='undefined')return;const button=document.getElementById('debugInference'),panel=document.getElementById('debugInferencePanel');if(!button||!panel)return;
    button.hidden=!window.DebugInference.enabled;panel.hidden=true;
    button.onclick=()=>{const G=window.ChapterGame,s=G.getState(),items=solutions(s,s.builder.topic);panel.hidden=false;panel.innerHTML='<b>TEST / 本卷已读来源可以推出</b>'+(!items.length?'<p>当前没有完整组合。先询问并打开来源；测试按钮不发放未取得的证物。</p>':items.map((item,index)=>'<article><p>'+item.sources.map(id=>(D.evidence[id]||D.facts[id]).title).join(' ＋ ')+' → <strong>'+D.facts[item.claim].title+'</strong></p><button data-debug-solution="'+index+'">'+(item.known?'再次推理':'填入并直接推理')+'</button></article>').join(''));
      panel.querySelectorAll('[data-debug-solution]').forEach(node=>node.onclick=()=>{const item=items[Number(node.dataset.debugSolution)];G.debugInfer(item.claim,item.sources);});
    };
  }
  window.DebugInference={enabled:true,solutions,render};
})();
