/* Receiving a source and reading a source are separate events. */
(function(){
  'use strict';const D=window.InquiryData;
  const initial=['photo','snippet','call'];
  function delivered(s,id){return (s.inquiry?.done||[]).includes(id);}
  function available(step,s){
    if(!step||delivered(s,step.id))return false;const r=step.requires||{},facts=s.facts||[],done=s.inquiry?.done||[];
    return (r.facts||[]).every(id=>facts.includes(id))&&(!r.anyFacts?.length||r.anyFacts.some(id=>facts.includes(id)))&&(r.steps||[]).every(id=>done.includes(id))&&(r.read||[]).every(id=>(s.collected||[]).includes(id));
  }
  function availableSteps(s){return (D.inquirySteps||[]).filter(step=>available(step,s));}
  function canAccess(s,id){
    if(D.facts[id])return (s.facts||[]).includes(id);
    if(!D.evidence[id])return false;
    if((s.collected||[]).includes(id))return true;
    if(D.evidence[id].lane==='life')return (s.portraitReceived||[]).includes(id);
    return initial.includes(id)||!!s.inquiry?.received?.[id];
  }
  function visibleClaims(s,topicId){
    const has=id=>canAccess(s,id),fact=id=>(s.facts||[]).includes(id);
    const gates={oldKeys:()=>has('keys')&&has('ledger'),freeExit:()=>has('entry'),afterCall:()=>has('rescue'),locked:()=>has('photo'),knowledge:()=>has('report')&&has('receipt'),noticeGap:()=>has('report')&&has('notice'),withheld:()=>fact('knowledge')||fact('noticeGap')||fact('withheld'),completeInfo:()=>has('receipt'),misuse:()=>has('grant')&&has('spending'),rescueAct:()=>has('returnVideo'),rescueContext:()=>fact('rescueAct')&&has('dispatch')&&has('falling'),causationLimit:()=>has('handoff')&&has('expert'),rescueHarmed:()=>has('handoff'),rescueSafe:()=>has('expert')};
    return (D.topics.find(topic=>topic.id===topicId)?.claims||[]).filter(claim=>fact(claim.id)||!gates[claim.id]||gates[claim.id]());
  }
  window.InvestigationEngine={initial,available,delivered,availableSteps,canAccess,visibleClaims};
})();
