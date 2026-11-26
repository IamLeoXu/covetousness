(function(){
  'use strict';const G=window.ChapterGame,D=window.InquiryData,$=id=>document.getElementById(id),state=()=>G.getState();
  const names={first:'给今天录一段声音',warning:'三套预算，谁替她等',rescue:'谢谢与生气，都留下'};
  function available(id){const f=state().facts;return id==='first'?['afterCall','oldKeys','freeExit'].some(x=>f.includes(x)):id==='warning'?f.includes('withheld'):['withheld','rescueContext','causationLimit'].every(x=>f.includes(x));}
  function pending(){return Object.keys(names).find(id=>available(id)&&!state().journey.seen.includes(id))||null;}
  function complete(id,choice){const s=state();s.journey.seen=[...new Set([...s.journey.seen,id])];if(choice)s.journey.choices[id]=choice;G.save();G.render();}
  function play(id){
    if(!available(id))return;
    const s=state(),previous=s.journey.choices[id],decision=D.journeyChoices[id],option=decision.options.find(x=>x.id===previous);
    if(s.journey.seen.includes(id)){
      G.playConversation([...D.journeyScenes[id],...(option?.reply||[])],{module:'journey',label:'↺ JOINT INTERVIEW / '+names[id],endText:'返回采访桌 →'});return;
    }
    let lines=[...D.journeyScenes[id]];
    if(id==='warning'&&s.journey.choices.first==='nao')lines.splice(1,0,{who:'奈央',text:'刚才你让我把话说完。这次也请先让我说完。'});
    if(id==='rescue'&&s.journey.choices.warning==='work')lines.splice(-1,0,{who:'小春',text:'你刚才问报价不等我怎么办。我想过了。先回一个确定答复，不能再拿“再等一天”当答案。'});
    G.playConversation(lines,{module:'journey',label:'JOINT INTERVIEW / '+names[id],choices:()=>decision.options.map(option=>({text:option.text,action:()=>G.playConversation([{who:'主持人',text:option.text},...option.reply],{module:'journey',label:'THE NEXT QUESTION / '+decision.prompt,endText:'保存这段采访 / 返回工作台 →',after:()=>complete(id,option.id)})}))});
  }
  function afterResult(){const id=pending();if(id)play(id);}
  function open(){
    const s=state(),next=pending();
    if(next){play(next);return;}
    G.playConversation([{who:'小春',text:s.journey.seen.length?'想接谁的电话，还是重听刚才那一段？我把话筒留在这里。':'先把那九秒核完吧。后面你想问哪一段，我们一起找。'}],{module:'talk',label:'REPORTING DESK / 同行记录',choices:()=>[
      ...s.journey.seen.map(id=>({text:'↺ '+names[id],action:()=>play(id)})),
      {text:'和纱纪、奈央一起取材 / 核对人物关系 →',action:()=>{G.finishConversation();window.LifeUI.open();}},
      {text:'查看本期采用哪些声音 →',action:()=>{G.finishConversation();window.Radio.openRundown();}},
      {text:'回到案件工作台。',action:G.finishConversation}
    ]});
  }
  function render(){const next=pending(),s=state();$('companionTask').textContent=next?names[next]:s.journey.seen.length?'她想留下所有以后。她们正在给出自己的回答。':'先核实来稿，再一起接起电话。';$('companionOpen').textContent=next?'接回采访 →':'同行记录 ↗';$('companionOpen').onclick=open;}
  function speaker(line,flow){
    const who=line.who,key=/小春/.test(who)?'koharu':/奈央/.test(who)?'nao':/纱纪/.test(who)?'saki':/主持/.test(who)?'host':'record';$('conversation').dataset.speaker=key;
    const session=$('conversationSession');session.hidden=!['journey','field'].includes(flow.module);
    session.querySelectorAll('[data-voice]').forEach(node=>node.classList.toggle('active',node.dataset.voice===key));
  }
  window.Journey={pending,afterResult,open,play,render,speaker};render();
})();
