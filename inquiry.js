(function(){
  'use strict';const G=window.ChapterGame,D=window.InquiryData,E=window.InvestigationEngine,$=id=>document.getElementById(id),state=()=>G.getState();
  const esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function ask(id){
    const step=D.inquirySteps.find(item=>item.id===id),s=state();if(!E.available(step,s))return;
    G.playConversation(step.lines,{module:'inquiry',label:'INTERVIEW / '+step.title,portrait:'neutral',endText:'查看交来的材料 →',after:()=>{
      // A cancelled scene has no callback. Repeated callbacks and callbacks from a previous game do not deliver again.
      if(s!==state()||E.delivered(s,step.id))return;
      const order=Math.max(0,...Object.values(s.inquiry.received).map(receipt=>Number.isFinite(receipt?.order)?receipt.order:0))+1;
      s.inquiry.done=[...new Set([...s.inquiry.done,step.id])];
      for(const evidence of step.gives)if(!s.inquiry.received[evidence])s.inquiry.received[evidence]={step:step.id,from:step.title,givenBy:step.givenBy||'本次采访的提供者',summary:step.deliverySummary||'材料在这段采访中交到台内。',order};
      s.scene=step.place||D.evidence[step.gives[0]]?.place||'studio';if(!D.scenes[s.scene])s.scene='archive';
      const layer=D.evidence[step.gives[0]]?.layer;if(layer){s.caseLayer=layer;if(s.builder.topic!==layer)s.builder={topic:layer,claim:null,selected:[],source:'evidence'};}
      G.save();G.render();if(step.gives.length)G.openViewer(step.gives[0]);
    }});
  }
  function render(){
    const node=$('inquiryDesk');if(!node)return;const s=state(),steps=E.availableSteps(s);
    node.innerHTML='<div class="inquiry-desk-title"><span>INTERVIEW / 下一句问什么</span><small>'+s.inquiry.done.length+' 段采访已保存</small></div>'+(steps.length?'<div class="inquiry-questions">'+steps.map(step=>'<button data-inquiry-step="'+step.id+'"><b>'+esc(step.question||step.title)+'</b><small>'+esc(step.title)+' ↗</small></button>').join('')+'</div>':'<p>先看看收到的材料。选出能互相对照的来源，再提出你的推断。</p>');
    node.querySelectorAll('[data-inquiry-step]').forEach(button=>button.onclick=()=>ask(button.dataset.inquiryStep));
    renderReceipts(s);
  }
  function renderReceipts(s){
    const node=$('receivedSources');if(!node)return;
    const unread=Object.keys(s.inquiry.received).filter(id=>D.evidence[id]&&!s.collected.includes(id)),groups=new Map();
    for(const id of unread){
      const receipt=s.inquiry.received[id]||{},authored=typeof receipt.givenBy==='string'&&receipt.givenBy.trim().length>0&&typeof receipt.summary==='string'&&receipt.summary.trim().length>0&&Number.isFinite(receipt.order)&&receipt.order>0,key=(authored?'new:':'old:')+(receipt.step||'legacy')+':'+(receipt.from||'原有取材');
      if(!groups.has(key))groups.set(key,{...receipt,authored,ids:[]});groups.get(key).ids.push(id);
    }
    const list=[...groups.values()].sort((a,b)=>(b.authored?b.order:0)-(a.authored?a.order:0));
    node.hidden=!list.length;
    node.innerHTML=list.length?'<div class="inquiry-desk-title"><span>INBOX / 已收到，尚未阅读</span><small>按提供来源保存</small></div>'+list.map(group=>'<article class="source-receipt received-group" data-receipt-step="'+esc(group.step||'legacy')+'"><header><h4>'+(group.authored?'来自：'+esc(group.givenBy):'台内已有的材料')+'</h4><small>'+(group.authored?'收件 '+String(group.order).padStart(2,'0'):'原取得记录')+'</small></header><p class="source-receipt-context">'+(group.authored?'在“'+esc(group.from)+'”的采访中提供。':esc(group.from||'台内档案')+'。已存入台内档案，可随时查阅。')+'</p>'+(group.authored?'<p>'+esc(group.summary)+'</p>':'')+'<div class="inquiry-mail">'+group.ids.map(id=>'<button data-inquiry-read="'+id+'">'+esc(D.evidence[id].title)+' ↗</button>').join('')+'</div></article>').join(''):'';
    node.querySelectorAll('[data-inquiry-read]').forEach(button=>button.onclick=()=>G.openViewer(button.dataset.inquiryRead));
  }
  function open(){const next=E.availableSteps(state())[0];if(next)ask(next.id);else{G.notify('看看已收到的原件，或打开人物侧写继续问她。');$('inquiryDesk')?.scrollIntoView({block:'center'});}}
  function speaker(line,flow){const key=/小春/.test(line.who)?'koharu':/奈央/.test(line.who)?'nao':/纱纪/.test(line.who)?'saki':/母亲/.test(line.who)?'mother':/主持/.test(line.who)?'host':'record';$('conversation').dataset.speaker=key;const session=$('conversationSession');if(session){session.hidden=flow.module!=='inquiry'&&flow.module!=='portrait';session.querySelectorAll('[data-voice]').forEach(node=>node.classList.toggle('active',node.dataset.voice===key));}if($('signalSpeaker')){$('signalSpeaker').textContent={nao:'奈央',saki:'纱纪',mother:'小春的母亲'}[key]||line.who;$('signalRoute').textContent=({nao:'LINE 02',saki:'LINE 03',mother:'LINE 04'}[key]||'STUDIO A')+' / CONNECTED';}}
  window.InquiryUI={render,ask,open,speaker};render();
})();
