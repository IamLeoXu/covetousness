(function(){
  'use strict';const G=window.ChapterGame,D=window.InquiryData,E=window.PortraitEngine,$=id=>document.getElementById(id),state=()=>G.getState();
  const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let mode='research',selectedPiece=null,readingId=null,message='',previousState=null;
  const current=()=>D.lifeEpisodes.find(item=>item.id===state().lifeFocus)||D.lifeEpisodes[0];
  const hasPiece=id=>E.hasPiece(state(),id);
  const received=id=>state().portraitReceived.includes(id)||state().collected.includes(id);
  function prepare(){
    const s=state();if(previousState!==s){selectedPiece=null;readingId=null;message='';mode='research';previousState=s;}
    E.ensure(s);if(!D.lifeEpisodes.some(item=>item.id===s.lifeFocus))s.lifeFocus='boxes';
    if(E.refreshRelations(s))G.save();return s;
  }
  function open(prefer){prepare();mode=['portrait','connections'].includes(prefer)?'portrait':'research';G.openDialog('profileDialog');refresh();}
  function setMode(next){mode=next==='portrait'?'portrait':'research';message='';refresh();$('lifeWorkspace').scrollTop=0;window.Onboarding?.refresh();}
  function focus(id){if(!D.lifeEpisodes.some(item=>item.id===id))return;state().lifeFocus=id;mode='research';message='';G.save();refresh();window.Onboarding?.refresh();}
  function readOriginal(id){
    if(!received(id)){G.notify('这份原件还没有交到台内。先问问相关的人。');return;}
    G.openViewer(id);if(state().collected.includes(id)){state().portraitRead=[...new Set([...state().portraitRead,id])];G.save();refresh();}
  }
  function investigate(){
    const e=current(),authored=D.portraitScenes?.[e.id];
    const fallback=e.interview.options.find(option=>option.id==='ask');
    const lines=authored?[...(authored.intro||[]),...(authored.answer||[])]:[
      {who:'记录',text:'小春翻出“'+D.evidence[e.sources[0]].title+'”，把它摊到话筒旁边。'},
      {who:'主持人',text:fallback.text},...fallback.lines.map(text=>({who:'小春',text}))
    ];
    lines.push({who:'记录',text:authored?.delivery||'这次采访留下两份来源：“'+e.sources.map(id=>D.evidence[id].title).join('”和“')+'”。'});
    G.playConversation(lines,{module:'portrait',label:e.age+' / '+e.name,portrait:['love','break'].includes(e.id)?'front-letter':'neutral',endText:'回到这段经历 →',after:()=>{
      const s=state();s.portraitReceived=[...new Set([...s.portraitReceived,...e.sources])];s.portraitHeard=[...new Set([...s.portraitHeard,e.id])];
      G.save();message='两份来源已收到。打开原件，再核对这段经历。';refresh();window.Onboarding?.refresh();
    }});
  }
  function verifyCurrent(){
    const s=state(),result=E.verifyEpisode(s,current().id);message=result.note;
    if(result.kind==='supported'){G.sound('fact');readingId=current().id;}
    G.save();G.render();window.Onboarding?.event('life-result',{episode:current().id,kind:result.kind});return result;
  }
  function placePiece(index,id=selectedPiece){
    if(!E.place(state(),index,id)){G.notify('先选一块已有的片段。');return false;}
    readingId=id;selectedPiece=null;message='片段已放入。摆好后核对年代。';G.save();refresh();G.sound('paper');window.Onboarding?.refresh();return true;
  }
  function confirmPortrait(){
    const result=E.confirm(state(),state().portraitSide);message=result.note;
    if(result.kind==='supported')G.sound('fact');G.save();G.render();window.Onboarding?.refresh();return result;
  }
  function flip(side){E.view(state(),side);if(state().radio)state().radio.previewed='';G.save();G.render();G.sound('paper');}
  function toolbar(){return '<nav class="portrait-mode-tabs" aria-label="人物侧写"><button data-portrait-mode="research" class="'+(mode==='research'?'active':'')+'" aria-pressed="'+(mode==='research')+'">取材与记忆</button><button data-portrait-mode="portrait" class="'+(mode==='portrait'?'active':'')+'" aria-pressed="'+(mode==='portrait')+'">人物拼图 <span>'+state().profileAdopted.length+' / 6</span></button></nav>';}
  function research(){
    const s=state(),e=current(),done=s.lifeSolved.includes(e.id),ready=e.sources.every(id=>s.collected.includes(id)&&s.portraitRead.includes(id));
    return toolbar()+'<nav id="portraitTopics" class="portrait-topic-grid" aria-label="选择要追问的经历">'+D.lifeEpisodes.map(item=>'<button data-portrait-topic="'+item.id+'" class="'+(e.id===item.id?'active':'')+'" aria-pressed="'+(e.id===item.id)+'"><span>'+item.age+' 岁</span><b>'+esc(item.name)+'</b><small>'+(s.lifeSolved.includes(item.id)?'已深入核对 ✓':item.sources.some(received)?'原件已到 / 待核对':'从这件事问起 ↗')+'</small></button>').join('')+'</nav>'+
      '<section class="portrait-research"><header><div><span class="eyebrow">'+esc(e.tag)+'</span><h3>'+esc(e.name)+'</h3><p>'+esc(e.question)+'</p></div><button id="portraitInvestigate" class="ink-button">'+(s.portraitHeard.includes(e.id)?'重听这段采访 ↺':'问问这件事 →')+'</button></header>'+
      '<div id="portraitSources" class="portrait-sources">'+e.sources.map(id=>received(id)?'<button data-portrait-read="'+id+'" class="secondary-button"><small>'+esc(D.evidence[id].code)+' / '+(s.portraitRead.includes(id)?'已读':'这次收到')+'</small><b>'+esc(D.evidence[id].title)+'</b><span>打开原件 ↗</span></button>':'<div class="portrait-unreceived"><small>尚未取得</small><b>'+(id===e.sources[0]?'相关的旧物与日期':'另一端的回答')+'</b><span>继续采访后再核对</span></div>').join('')+'</div>'+
      '<div class="portrait-verify-row"><p>'+(done?'这段经历已经核对，片段保存在拼图里。':e.sources.every(received)?'对照原件日期和当事人的回答。':'先听她把东西拿出来，再看这段经历发生了什么。')+'</p><button id="portraitVerify" class="ink-button" '+(!ready||done?'disabled':'')+'>'+(done?'已深入核对 ✓':'核对两份来源 / 取得片段 →')+'</button></div><p id="portraitFeedback" class="portrait-feedback" role="status">'+esc(message)+'</p>'+
      (done?'<article class="portrait-memory"><span>已核对的经历</span><p>'+esc(e.options.find(([id])=>id===e.answer)[1])+'</p><button id="portraitToPuzzle" class="secondary-button">把这段放进人物拼图 →</button></article>':'')+'</section>';
  }
  function sourceIds(e){const own=e.sources.filter(received);if(own.length)return own;for(const [id,ids]of Object.entries(state().fieldProofs||{})){const link=D.lifeConnections.find(item=>item.id===id);if(link?.pair.includes(e.id))return ids.filter(key=>D.evidence[key]);}return [];}
  function reading(){
    const e=D.lifeEpisodes.find(item=>item.id===readingId),s=state();
    if(!e||!hasPiece(e.id))return '<span>HER PORTRAIT</span><h3>选一块，看看你正在怎样理解她。</h3><p>同一段经历翻到另一面，会显出她舍不得的东西。空白处仍然是你还没问过的事。</p>';
    const deep=s.lifeSolved.includes(e.id),sources=sourceIds(e);
    return '<span>'+e.age+' / '+esc(e.name)+'</span><h3>'+esc(deep?(s.portraitSide==='front'?e.front:e.back):D.lifeFacetText[e.id])+'</h3>'+(deep?'<p>“'+esc(e.voice)+'”</p>':'<p>目前只有片段，原件与另一端的回答还没一起核对。</p>')+'<small>来源：'+esc(sources.length?sources.map(id=>D.evidence[id].title).join(' ＋ '):'旧存档中已核实的经历')+'</small><button data-return-topic="'+e.id+'" class="text-button">回到这段经历 / 查看来源 ↗</button>';
  }
  function relations(){
    const s=state(),links=D.lifeConnections.filter(item=>s.lifeLinks.includes(item.id));
    return '<section id="portraitRelations" class="portrait-relations"><h3>这些经历之间</h3>'+(links.length?links.map(link=>'<article><div><b>'+esc(link.title)+'</b><p>'+esc(link.options.find(([id])=>id===link.answer)[1])+'</p><small>'+esc(link.pair.map(id=>D.lifeEpisodes.find(e=>e.id===id).age+' 岁').join(' ＋ '))+'</small></div><button data-portrait-relation="'+link.id+'" class="secondary-button">选入 B 轨 →</button></article>').join(''):'<p>相关的两段经历核对过、年代放对后，会在这里连成侧写。</p>')+'</section>';
  }
  function puzzle(){
    const s=state(),image=s.portraitSide==='front'?'execution/assets/character/shadows/stand-reaching-profile.png':'execution/assets/character/shadows/stand-bowed.png';
    return toolbar()+'<div class="portrait-board-header"><div><span class="eyebrow">ONE PERSON / TWO READINGS</span><h3>你要用哪些经历，拼出她这个人？</h3></div><div class="profile-sides"><button id="profileFront" class="'+(s.portraitSide==='front'?'active':'')+'">SIDE A<small>她留下的情分</small></button><button id="profileBack" class="'+(s.portraitSide==='back'?'active':'')+'">SIDE B<small>她攥住的东西</small></button></div></div><div class="profile-layout"><section class="puzzle-wrap"><div id="puzzleBoard" class="puzzle-board" aria-label="把经历放回发生的年龄">'+D.lifeEpisodes.map((expected,i)=>{const e=D.lifeEpisodes.find(item=>item.id===s.profileSlots[i]),n=e?D.lifeEpisodes.indexOf(e):-1,confirmed=e&&e.id===expected.id&&s.profileAdopted.includes(e.id);return '<button class="puzzle-slot '+(e?'occupied':'empty')+(confirmed?' verified':'')+'" data-puzzle-slot="'+i+'" aria-label="'+expected.age+'岁的经历位置'+(e?'：'+esc(e.name):'，空白')+'">'+(e?'<img class="piece-image" src="'+image+'" style="--c:'+n%2+';--r:'+Math.floor(n/2)+'" alt="小春的无五官剪影拼图片段">':'<span class="puzzle-age">'+expected.age+'</span>')+'<span class="puzzle-slot-label">'+expected.age+' / '+esc(e?e.name:'等待一段经历')+'</span></button>';}).join('')+'</div><p id="puzzleStatus" role="status">'+esc(message||'选一块片段，再点相应年龄；也可拖放。摆好后核对年代，其他位置可以留空。')+'</p><button id="checkProfile" class="ink-button">核对年代 / 保存人物侧写 →</button><p class="portrait-confirmed">'+s.profileAdopted.length+' / 6 块已确认 · '+s.lifeSolved.length+' / 6 段已深入</p></section><section class="profile-fragments"><p class="profile-instruction">先选片，再放入左侧。选中后可在下方读正反两面。</p><div id="fragmentTray">'+[3,0,5,2,1,4].map(index=>{const e=D.lifeEpisodes[index],unlocked=hasPiece(e.id);return '<button class="fragment-card '+(selectedPiece===e.id?'selected ':'')+(s.profileSlots.includes(e.id)?'placed ':'')+(!unlocked?'locked':'')+'" data-fragment="'+e.id+'" draggable="'+unlocked+'" '+(!unlocked?'disabled':'')+' aria-pressed="'+(selectedPiece===e.id)+'"><span class="fragment-image">'+(unlocked?'<img class="piece-image" src="'+image+'" style="--c:'+index%2+';--r:'+Math.floor(index/2)+'" alt="">':'<b>?</b>')+'</span><strong>'+esc(e.name)+'</strong><small>'+(s.lifeSolved.includes(e.id)?'已深入核对':unlocked?'已有片段 / 可继续追问':'还未取得')+'</small></button>';}).join('')+'</div><article id="fragmentReading" class="fragment-reading">'+reading()+'</article></section></div>'+relations();
  }
  function refresh(){
    if(!$('profileDialog'))return;const s=prepare(),panel=$('profileDialog');panel.dataset.lifeUi='portrait';panel.dataset.side=s.portraitSide;$('lifeModes').hidden=true;
    const heading=panel.querySelector('.life-heading');if(heading){heading.querySelector('h2').textContent='她留下的东西';heading.querySelector('p').textContent=s.lifeSolved.length+' / 6 段已深入 · '+s.profileAdopted.length+' 块年代已确认';}
    $('lifeWorkspace').innerHTML=mode==='portrait'?puzzle():research();
    $('lifeWorkspace').querySelectorAll('[data-portrait-mode]').forEach(button=>button.onclick=()=>setMode(button.dataset.portraitMode));
    $('lifeWorkspace').querySelectorAll('[data-portrait-topic]').forEach(button=>button.onclick=()=>focus(button.dataset.portraitTopic));
    $('lifeWorkspace').querySelectorAll('[data-portrait-read]').forEach(button=>button.onclick=()=>readOriginal(button.dataset.portraitRead));
    if(mode==='research'){
      $('portraitInvestigate').onclick=investigate;$('portraitVerify').onclick=verifyCurrent;
      if($('portraitToPuzzle'))$('portraitToPuzzle').onclick=()=>{readingId=current().id;selectedPiece=hasPiece(current().id)?current().id:null;setMode('portrait');};
    }else{
      $('profileFront').onclick=()=>flip('front');$('profileBack').onclick=()=>flip('back');$('checkProfile').onclick=confirmPortrait;
      $('lifeWorkspace').querySelectorAll('[data-fragment]').forEach(button=>{button.onclick=()=>{selectedPiece=button.dataset.fragment;readingId=selectedPiece;refresh();window.Onboarding?.refresh();};button.ondragstart=event=>{event.dataTransfer.setData('text/plain',button.dataset.fragment);selectedPiece=button.dataset.fragment;};});
      $('lifeWorkspace').querySelectorAll('[data-puzzle-slot]').forEach(slot=>{slot.onclick=()=>{const index=Number(slot.dataset.puzzleSlot);if(selectedPiece)placePiece(index);else{readingId=s.profileSlots[index];refresh();}};slot.ondragover=event=>{event.preventDefault();slot.classList.add('drop-target');};slot.ondragleave=()=>slot.classList.remove('drop-target');slot.ondrop=event=>{event.preventDefault();placePiece(Number(slot.dataset.puzzleSlot),event.dataTransfer.getData('text/plain'));};});
      $('lifeWorkspace').querySelectorAll('[data-return-topic]').forEach(button=>button.onclick=()=>focus(button.dataset.returnTopic));
      $('lifeWorkspace').querySelectorAll('[data-portrait-relation]').forEach(button=>button.onclick=()=>{G.closeDialog('profileDialog');window.Radio.useRelation(button.dataset.portraitRelation);window.Radio.openRundown();});
    }
  }
  function hint(){const e=current();return mode==='portrait'?['人物拼图',['在下方点选一块已有片段，再点它发生的年龄；也可以拖过去。','按 16、19、20、21、24、26 岁核对。空位可留，摆错能重放。','核对年代后，相关的两段经历会连成侧写。翻面看你正在保留她的哪一部分，再决定播什么。']]:['取材 / '+e.name,['先点“问问这件事”。相关的人会拿出旧物、留下回答。','把这次收到的两份原件都打开，比较日期与具体经过。','核对后这段会成为拼图片段。16 岁经历也有完整路径，不需要先查别的五段。']];}
  $('viewer').addEventListener('close',()=>{refresh();window.Onboarding?.refresh();});
  window.LifeUI={open,refresh,hint,currentEpisode:current,currentMode:()=>mode,verifyCurrent,placePiece,confirmPortrait,investigate};G.render();
})();
