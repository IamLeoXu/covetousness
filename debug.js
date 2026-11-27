/* Inference assistance: suggest valid combinations from sources already read. */
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
    button.hidden=false;panel.hidden=true;
    button.onclick=()=>{const G=window.ChapterGame,s=G.getState(),items=solutions(s,s.builder.topic);panel.hidden=false;panel.innerHTML='<b>本卷可推导的结论</b>'+(!items.length?'<p>尚无完整组合。先继续询问并阅读来源。</p>':items.map((item,index)=>'<article><p>'+item.sources.map(id=>(D.evidence[id]||D.facts[id]).title).join(' ＋ ')+' → <strong>'+D.facts[item.claim].title+'</strong></p><button data-debug-solution="'+index+'">'+(item.known?'再次推理':'填入并直接推理')+'</button></article>').join(''));
      panel.querySelectorAll('[data-debug-solution]').forEach(node=>node.onclick=()=>{const item=items[Number(node.dataset.debugSolution)];G.inferFromSources(item.claim,item.sources);});
    };
  }
  window.InferenceAssistant={solutions,render};
  window.DebugInference={enabled:true,solutions,render}; // Compatibility for existing local regression tools.
})();
