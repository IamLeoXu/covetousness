(function(){
  'use strict';const G=window.ChapterGame,D=window.InquiryData,E=window.InvestigationEngine,$=id=>document.getElementById(id),state=()=>G.getState();
  const esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function ask(id){
    const step=D.inquirySteps.find(item=>item.id===id),s=state();if(!E.available(step,s))return;
    G.playConversation(step.lines,{module:'inquiry',label:'INTERVIEW / '+step.title,portrait:'neutral',endText:'查看交来的材料 →',after:()=>{
      s.inquiry.done=[...new Set([...s.inquiry.done,step.id])];
      for(const evidence of step.gives)s.inquiry.received[evidence]={step:step.id,from:step.title};
      s.scene=step.place||D.evidence[step.gives[0]]?.place||'studio';if(!D.scenes[s.scene])s.scene='archive';
      const layer=D.evidence[step.gives[0]]?.layer;if(layer){s.caseLayer=layer;if(s.builder.topic!==layer)s.builder={topic:layer,claim:null,selected:[],source:'evidence'};}
      G.save();G.render();if(step.gives.length)G.openViewer(step.gives[0]);
    }});
  }
  function render(){
    const node=$('inquiryDesk');if(!node)return;const s=state(),steps=E.availableSteps(s);
    const unread=Object.keys(s.inquiry.received).filter(id=>!s.collected.includes(id));
    node.innerHTML='<div class="inquiry-desk-title"><span>INTERVIEW / 下一句问什么</span><small>'+s.inquiry.done.length+' 段采访已保存</small></div>'+(steps.length?'<div class="inquiry-questions">'+steps.map(step=>'<button data-inquiry-step="'+step.id+'"><b>'+esc(step.question||step.title)+'</b><small>'+esc(step.title)+' ↗</small></button>').join('')+'</div>':'<p>先看看收到的材料。选出能互相对照的来源，再提出你的推断。</p>')+(unread.length?'<div class="inquiry-mail"><span>刚交来的材料</span>'+unread.map(id=>'<button data-inquiry-read="'+id+'">'+esc(D.evidence[id].title)+' ↗</button>').join('')+'</div>':'');
    node.querySelectorAll('[data-inquiry-step]').forEach(button=>button.onclick=()=>ask(button.dataset.inquiryStep));node.querySelectorAll('[data-inquiry-read]').forEach(button=>button.onclick=()=>G.openViewer(button.dataset.inquiryRead));
  }
  function open(){const next=E.availableSteps(state())[0];if(next)ask(next.id);else{G.notify('看看已收到的原件，或打开人物侧写继续问她。');$('inquiryDesk')?.scrollIntoView({block:'center'});}}
  function speaker(line,flow){const key=/小春/.test(line.who)?'koharu':/奈央/.test(line.who)?'nao':/纱纪/.test(line.who)?'saki':/主持/.test(line.who)?'host':'record';$('conversation').dataset.speaker=key;const session=$('conversationSession');if(session){session.hidden=flow.module!=='inquiry'&&flow.module!=='portrait';session.querySelectorAll('[data-voice]').forEach(node=>node.classList.toggle('active',node.dataset.voice===key));}}
  window.InquiryUI={render,ask,open,speaker};render();
})();
