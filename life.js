(function(){
  'use strict';
  const G=window.ChapterGame,D=window.InquiryData,E=window.LifeEngine,$=id=>document.getElementById(id);
  const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const state=()=>G.getState();
  let mode='inquiry',linkIndex=0,eventChoice=null,linkChoice=null,linkPair=['',''],selectedPiece=null,side='front';
  let eventFeedback=null,linkFeedback=null,puzzleMessage='';
  const eventById=id=>D.lifeEpisodes.find(event=>event.id===id);
  const visible=()=>D.lifeEpisodes.filter(event=>D.lifeVisible(event,state()));
  const current=()=>visible().find(event=>event.id===state().lifeFocus)||visible()[0];
  const hasPiece=id=>D.lifePieces(state()).some(event=>event.id===id);
  const allEvents=()=>D.lifeEpisodes.every(event=>state().lifeSolved.includes(event.id));
  const allLinks=()=>D.lifeConnections.every(link=>state().lifeLinks.includes(link.id));
  const puzzleCorrect=()=>D.lifeEpisodes.every((event,i)=>state().profileSlots[i]===event.id);
  function feedback(item){return item?'<p class="life-feedback '+item.kind+'" role="status">'+esc(item.note)+'</p>':'';}
  function setMode(next){mode=next;selectedPiece=null;refresh();$('lifeWorkspace').scrollTop=0;}
  function focusEvent(id){state().lifeFocus=id;eventChoice=null;eventFeedback=null;G.save();setMode('inquiry');}
  function open(prefer){
    eventChoice=null;eventFeedback=null;linkChoice=null;linkPair=['',''];linkFeedback=null;
    if(prefer==='inquiry')mode='inquiry';
    else mode='inquiry';
    if(state().lifeSolved.includes(current().id)&&!allEvents())state().lifeFocus=visible().find(event=>!state().lifeSolved.includes(event.id))?.id||current().id;
    G.openDialog('profileDialog');refresh();
  }
  function refresh(){
    if(!$('profileDialog').open)return;
    const s=state();$('lifeProgress').innerHTML='<b>'+D.lifePieces(s).length+' CUTS</b> 已取片段<br><b>'+s.lifeSolved.length+'</b> 段深入补访<br><span>'+(s.facts.includes('profileComplete')?'已交叉核对完整侧写':s.facts.includes('profileSketch')?'已采用局部侧写':'尚未采用侧写')+'</span>';
    $('lifeModes').querySelectorAll('[data-life-mode]').forEach(button=>{button.classList.toggle('active',button.dataset.lifeMode===mode);button.setAttribute('aria-pressed',String(button.dataset.lifeMode===mode));});
    if(mode==='inquiry')renderInquiry();else if(mode==='connections')renderConnections();else renderPuzzle();
  }
  function renderInquiry(){
    const s=state(),event=current(),done=s.lifeSolved.includes(event.id),primary=event.primary,doc=D.evidence[primary],read=s.collected.includes(primary),heard=s.collected.includes(event.sources[1]),adopted=hasPiece(event.id),deep=s.collected.includes(event.sources[0]);
    $('lifeWorkspace').innerHTML='<div class="life-inquiry"><aside class="life-event-nav"><span>PRIVATE FILE / 已有索引</span>'+visible().map((item,i)=>'<button data-life-event="'+item.id+'" class="'+(item.id===event.id?'active ':'')+(hasPiece(item.id)?'solved':'')+'"><i>'+item.age+'</i><span>'+esc(item.name)+'<small>'+item.tag+'</small></span><b>'+(hasPiece(item.id)?'●':'↗')+'</b></button>').join('')+'<p>附页中的日期、寄件人与附件号，可以带你找到另一份旧档。</p></aside><section class="life-event-detail"><div class="life-event-title"><span class="eyebrow">'+event.tag+'</span><h3>'+esc(event.name)+'</h3><p>调出一份档案，再决定采用这一段，还是继续追问。</p></div><div class="life-source-pair"><button data-life-source="'+primary+'"><span>FILE / '+(read?'已读':'调取')+'</span><strong>'+esc(doc.title)+'</strong><small>阅读原件；随附材料在档案底部</small></button><button id="lifeInterview" '+(!deep?'disabled':'')+'><span>LINE / '+(heard?'回访已保存':'继续补访')+'</span><strong>'+(deep?esc(D.evidence[event.sources[1]].title):'先翻随附原件')+'</strong><small>'+(heard?'重听这段文字转录':'根据原件，提出能回答的问题')+'</small></button></div><section class="life-facet"><span class="field-label">LIFT / 取一个人物片段</span><p>'+esc(D.lifeFacetText[event.id])+'</p><button id="liftLifeFacet" class="secondary-button" '+(!read||adopted?'disabled':'')+'>'+(adopted?'CUT SAVED / 已取片段':'LIFT TO PORTRAIT / 收入侧写盘 ＋')+'</button><small>这一段采用你眼前的记录。更长的访谈留在原档。</small></section><details class="life-deep" '+(heard?'open':'')+'><summary>继续补访 / 重建这段经历</summary><div class="life-reconstruction"><h4>'+esc(event.question)+'</h4><div class="life-event-options">'+event.options.filter(([id])=>!done||id===event.answer).map(([id,text])=>'<button data-event-choice="'+id+'" class="'+((done?event.answer:eventChoice)===id?'selected':'')+'" '+(done?'disabled':'')+'>'+esc(text)+'</button>').join('')+'</div>'+feedback(eventFeedback)+'<div class="life-submit-row"><span>'+[deep,heard].filter(Boolean).length+' / 2 来源核对</span><button id="verifyLifeEvent" class="ink-button" '+(done||!deep||!heard||!eventChoice?'disabled':'')+'>'+(done?'EVENT VERIFIED / 已核对':'VERIFY / 核对经历 ↗')+'</button></div></div></details>'+(done?'<article class="life-event-coda"><p>“'+esc(event.voice)+'”</p><button id="nextLifeEvent" class="secondary-button">另一份索引 →</button></article>':'')+'<button id="useLifePieces" class="ink-button life-to-rundown" '+(!D.lifePieces(s).length?'disabled':'')+'>ASSEMBLE / 用已有片段拼出侧写 →</button></section></div>';
    $('lifeWorkspace').querySelectorAll('[data-life-event]').forEach(button=>button.onclick=()=>focusEvent(button.dataset.lifeEvent));
    $('lifeWorkspace').querySelector('[data-life-source]').onclick=()=>G.openViewer(primary);
    $('lifeInterview').onclick=()=>heard?G.openViewer(event.sources[1]):interview(event);
    $('liftLifeFacet').onclick=()=>{if(!s.lifeFacets.includes(event.id))s.lifeFacets.push(event.id);G.save();G.sound('paper');G.render();};
    $('useLifePieces').onclick=()=>setMode('portrait');
    $('lifeWorkspace').querySelectorAll('[data-event-choice]').forEach(button=>button.onclick=()=>{eventChoice=button.dataset.eventChoice;eventFeedback=null;renderInquiry();});
    $('verifyLifeEvent').onclick=()=>{const result=E.episode(event.id,eventChoice,s.collected);eventFeedback=result;s.lifeAttempts.push({type:'event',id:event.id,choice:eventChoice,result:result.kind});if(result.kind==='supported'&&!s.lifeSolved.includes(event.id)){s.lifeSolved.push(event.id);if(!s.lifeFacets.includes(event.id))s.lifeFacets.push(event.id);G.sound('fact');}else if(result.kind!=='supported')G.sound('paper');G.save();G.render();};
    if($('nextLifeEvent'))$('nextLifeEvent').onclick=()=>{const next=visible().find(item=>!s.lifeSolved.includes(item.id));if(next)focusEvent(next.id);else setMode('connections');};
  }
  function interview(event){
    const s=state();G.playConversation([{who:'主持人',text:event.interview.question}],{label:'LIFE INTERVIEW / '+event.tag,choices:()=>event.interview.options.map(option=>({text:option.text,action:()=>{
      const wrong=option.id==='assume';s.emotion=wrong?'angry':'thoughtful';
      G.playConversation(option.lines.map(text=>({who:'小春',text})),{label:wrong?'QUESTION THE ASSUMPTION':'A QUESTION SHE CAN ANSWER',result:wrong?'overreach':null,portrait:wrong?'open':'letter',after:()=>{
        if(option.id==='ask'){G.collect(event.sources[1]);eventFeedback={kind:'supported',note:'回答与补访证词已收入本段。现在可以比较两份来源，重建事件。'};G.save();}
        refresh();
      }});
    }}))});
  }
  function renderConnections(){
    const s=state(),available=D.lifeConnections.filter(link=>link.pair.every(id=>s.lifeSolved.includes(id)));
    if(!available.length){$('lifeWorkspace').innerHTML='<section class="life-connections"><span class="eyebrow">PATCH BAY / 等待交叉补访</span><h3>这里把两段已经核对的经历接在一起。</h3><p>继续翻原件、完成回访，相关经历会在这里出现。也可以现在采用手边的片段，进入侧写。</p><button id="connectionsToPortrait" class="ink-button">用已有片段拼图 →</button></section>';$('connectionsToPortrait').onclick=()=>setMode('portrait');return;}
    if(!available.includes(D.lifeConnections[linkIndex]))linkIndex=D.lifeConnections.indexOf(available[0]);
    const link=D.lifeConnections[linkIndex],done=s.lifeLinks.includes(link.id),events=D.lifeEpisodes.filter(event=>s.lifeSolved.includes(event.id));
    if(done){linkPair=[...link.pair];linkChoice=link.answer;}
    const select=(index)=>'<label>事件 '+(index+1)+'<select '+(done?'disabled':'')+' id="linkEvent'+index+'" aria-label="关系中的第'+(index+1)+'段事件"><option value="">选择一段已重建的经历</option>'+events.map(event=>'<option value="'+event.id+'" '+(linkPair[index]===event.id?'selected':'')+'>'+event.age+' / '+esc(event.name)+'</option>').join('')+'</select></label>';
    $('lifeWorkspace').innerHTML='<section class="life-connections"><nav class="life-link-nav">'+D.lifeConnections.filter(item=>available.includes(item)).map(item=>{const i=D.lifeConnections.indexOf(item);return '<button data-life-link="'+i+'" class="'+(i===linkIndex?'active':'')+'">0'+(i+1)+' / '+(s.lifeLinks.includes(item.id)?'VERIFIED ✓':'CONNECT')+'</button>';}).join('')+'</nav><span class="eyebrow">A RELATIONSHIP BETWEEN EVENTS</span><h3>'+esc(link.title)+'</h3><p class="life-link-instruction">选出与问题有关的两段已重建事件，再提出同时保留两边事实的读法。它是人物理解，不是新的定罪证据。</p>'+(events.length<2?'<p class="life-feedback incomplete">还缺可连接的事件。先到“经历核对”调查旧档与补访。</p>':'')+'<div class="life-link-selectors">'+select(0)+'<i>↔</i>'+select(1)+'</div><div class="life-event-options">'+link.options.filter(([id])=>!done||id===link.answer).map(([id,text])=>'<button data-link-choice="'+id+'" class="'+(linkChoice===id?'selected':'')+'" '+(done?'disabled':'')+'>'+esc(text)+'</button>').join('')+'</div>'+feedback(linkFeedback)+'<div class="life-submit-row"><span>'+(done?'关系已核对':'需要两段事件和一个读法')+'</span><button id="verifyLifeLink" class="ink-button" '+(done||!linkChoice||!linkPair.every(Boolean)?'disabled':'')+'>'+(done?'RELATION VERIFIED / 已核对':'CONNECT / 提交关系 ↗')+'</button></div>'+(done?'<article class="life-link-coda"><p>'+esc(link.note)+'</p><button id="nextLifeLink" class="secondary-button">'+(allLinks()?'去拼回正反画像 →':'下一条关系 →')+'</button></article>':'')+'</section>';
    $('lifeWorkspace').querySelectorAll('[data-life-link]').forEach(button=>button.onclick=()=>{linkIndex=Number(button.dataset.lifeLink);linkPair=['',''];linkChoice=null;linkFeedback=null;renderConnections();});
    [0,1].forEach(index=>$('linkEvent'+index).onchange=e=>{linkPair[index]=e.target.value;linkFeedback=null;renderConnections();});
    $('lifeWorkspace').querySelectorAll('[data-link-choice]').forEach(button=>button.onclick=()=>{linkChoice=button.dataset.linkChoice;linkFeedback=null;renderConnections();});
    $('verifyLifeLink').onclick=()=>{
      const result=E.connection(link.id,linkChoice,linkPair,s.lifeSolved);linkFeedback=result;s.lifeAttempts.push({type:'connection',id:link.id,choice:linkChoice,pair:[...linkPair],result:result.kind});
      if(result.kind==='supported'&&!s.lifeLinks.includes(link.id)){s.lifeLinks.push(link.id);G.sound('fact');}G.save();G.render();
    };
    if($('nextLifeLink'))$('nextLifeLink').onclick=()=>{const next=D.lifeConnections.findIndex(item=>!s.lifeLinks.includes(item.id));if(next>=0){linkIndex=next;linkPair=['',''];linkChoice=null;linkFeedback=null;renderConnections();}else setMode('portrait');};
  }
  function finishIfReady(){
    const s=state();if(!E.complete(s)||s.facts.includes('profileComplete'))return;
    s.facts.push('profileComplete');s.emotion='thoughtful';G.save();G.sound('fact');G.notify('人生事件、关系与正反侧写已完成。她的一生不会只剩这场事故。');G.render();
  }
  function reading(id){
    const event=eventById(id);if(!event||!hasPiece(id))return;
    if(!state().lifeSolved.includes(id)){$('fragmentReading').innerHTML='<span>'+event.age+' / SELECTED FILE</span><h3>'+esc(D.lifeFacetText[id])+'</h3><p>来源：'+esc(D.evidence[event.primary].title)+'</p><small>采用的是眼前这份档案；更长的回访尚未核对。</small>';return;}
    $('fragmentReading').innerHTML='<span>'+event.age+' / '+esc(event.tag)+'</span><h3>'+esc(side==='front'?event.front:event.back)+'</h3><p>“'+esc(event.voice)+'”</p><small>依据：'+event.sources.map(source=>esc(D.evidence[source].title)).join(' ＋ ')+'。人物侧写不直接代替案件证明。</small>';
  }
  function placePiece(index,id=selectedPiece){
    const s=state();if(!id||!hasPiece(id)||s.facts.includes('profileComplete'))return;
    const old=s.profileSlots.indexOf(id);if(old>=0)s.profileSlots[old]=null;s.profileSlots[index]=id;s.profileViews=[];s.facts=s.facts.filter(fact=>fact!=='profileSketch');selectedPiece=null;puzzleMessage='';G.save();renderPuzzle();reading(id);G.sound('paper');
  }
  function renderPuzzle(){
    const s=state(),done=s.facts.includes('profileComplete'),image=side==='front'?'execution/assets/character/shadows/stand-reaching-profile.png':'execution/assets/character/shadows/stand-bowed.png';
    $('profileDialog').dataset.side=side;
    $('lifeWorkspace').innerHTML='<div class="life-portrait-top"><div><span class="eyebrow">THE SAME PERSON, TWO READINGS</span><h3>这一版画像，来自你选中的片段。</h3></div><div class="profile-sides"><button id="profileFront" class="'+(side==='front'?'active':'')+'">SIDE A<small>采用的档案</small></button><button id="profileBack" class="'+(side==='back'?'active':'')+'">SIDE B<small>补访后的另一面</small></button></div></div><div class="profile-layout"><div class="puzzle-wrap"><div id="puzzleBoard" class="puzzle-board" aria-label="按日期拼放采用的片段">'+D.lifeEpisodes.map((expected,i)=>{const event=eventById(s.profileSlots[i]),n=event?D.lifeEpisodes.indexOf(event):-1;return '<button class="puzzle-slot '+(event?'occupied':'empty')+(done?' verified':'')+'" data-puzzle-slot="'+i+'" aria-label="'+expected.age+'岁的经历">'+(event?'<img class="piece-image" src="'+image+'" style="--c:'+n%2+';--r:'+Math.floor(n/2)+'" alt="小春的无五官剪影拼图">':'<span class="puzzle-age">'+expected.age+'</span>')+'<span class="puzzle-slot-label">'+expected.age+' / '+esc(event?event.name:'把这段经历放回来')+'</span></button>';}).join('')+'</div><p id="puzzleStatus">'+esc(puzzleMessage||(done?'经历、关系与正反侧写均已完成。':!allEvents()?'已取片段按日期放回；其余位置可以留空。':!allLinks()?'可以采用已有片段，也可以继续交叉补访。':'按年代拼好，确认这一面，再翻到另一面。'))+'</p><button id="checkProfile" class="ink-button" '+(done?'disabled':'')+'>'+(done?'BOTH SIDES / 侧写完成':'ADOPT THIS CUT / 采用当前侧写 ↗')+'</button></div><section class="profile-fragments"><p class="profile-instruction">选一段经历，再点左侧位置；也可拖放。放错可以重放。已经取出的片段就可以进入拼图；空位可以保留。</p><div id="fragmentTray">'+[3,0,5,2,1,4].map(index=>{const event=D.lifeEpisodes[index],unlocked=hasPiece(event.id);return '<button class="fragment-card '+(selectedPiece===event.id?'selected ':'')+(s.profileSlots.includes(event.id)?'placed ':'')+(!unlocked?'locked':'')+'" data-fragment="'+event.id+'" draggable="'+unlocked+'" '+(!unlocked?'disabled':'')+'><span class="fragment-image">'+(unlocked?'<img class="piece-image" src="'+image+'" style="--c:'+index%2+';--r:'+Math.floor(index/2)+'" alt="">':'<b>?</b>')+'</span><strong>'+esc(unlocked?event.name:'未打开的档案')+'</strong><small>'+(unlocked?(s.lifeSolved.includes(event.id)?'已深入补访':'已取片段'):'尚无索引')+'</small></button>';}).join('')+'</div><article id="fragmentReading" class="fragment-reading"><span>HER LIFE</span><h3>这一版侧写，采用哪些片段？</h3><p>未放入的部分保持空白。翻面可以查看已经补访的不同读法。</p></article></section></div>';
    $('profileFront').onclick=()=>flip('front');$('profileBack').onclick=()=>flip('back');
    if((done||s.facts.includes('profileSketch'))&&window.Radio){const queue=document.createElement('button');queue.id='lifeToRundown';queue.className='secondary-button life-to-rundown';queue.textContent='把这段人生留进节目 / 打开播出单 →';queue.onclick=()=>{G.closeDialog('profileDialog');window.Radio.openRundown();};$('checkProfile').parentElement.append(queue);}
    $('puzzleBoard').querySelectorAll('[data-puzzle-slot]').forEach(slot=>{slot.onclick=()=>{const i=Number(slot.dataset.puzzleSlot);if(selectedPiece)placePiece(i);else reading(s.profileSlots[i]);};slot.ondragover=e=>{e.preventDefault();slot.classList.add('drop-target');};slot.ondragleave=()=>slot.classList.remove('drop-target');slot.ondrop=e=>{e.preventDefault();placePiece(Number(slot.dataset.puzzleSlot),e.dataTransfer.getData('text/plain'));};});
    $('fragmentTray').querySelectorAll('[data-fragment]').forEach(button=>{button.onclick=()=>{if(done){reading(button.dataset.fragment);return;}selectedPiece=button.dataset.fragment;renderPuzzle();reading(selectedPiece);};button.ondragstart=e=>e.dataTransfer.setData('text/plain',button.dataset.fragment);});
    $('checkProfile').onclick=()=>{
      const placed=s.profileSlots.filter(Boolean),correct=placed.length>0&&s.profileSlots.every((id,i)=>!id||id===D.lifeEpisodes[i].id);
      if(!correct)puzzleMessage=placed.length?'比较档案日期，把已取片段放回对应年龄；其余可留空。':'先选择一块已取片段，再点对应年龄的位置。';
      else {if(!s.facts.includes('profileSketch'))s.facts.push('profileSketch');if(!s.profileViews.includes(side))s.profileViews.push(side);puzzleMessage='这 '+placed.length+' 块片段已采用。空位保留，可以现在收进播出单。';G.save();finishIfReady();G.render();}
      renderPuzzle();
    };
  }
  function flip(to){side=to;const s=state();if(puzzleCorrect()&&allEvents()&&allLinks()&&s.profileViews.length){if(!s.profileViews.includes(side))s.profileViews.push(side);G.save();finishIfReady();}renderPuzzle();reading(state().profileSlots.find(Boolean));G.sound('paper');}
  function hint(){const event=current();return ['补访 / '+event.name,['先打开“'+D.evidence[event.primary].title+'”。读完可以取出眼前片段，放到侧写中对应的年龄。','档案最下面有随附材料。点击附页，会调出更多原件或新的旧档索引。','若要深入重建，读完原件、提一个可核对的问题，再比较两个来源。采用局部侧写就能准备播出，无需把所有空位填满。']];}
  $('lifeModes').querySelectorAll('[data-life-mode]').forEach(button=>button.onclick=()=>setMode(button.dataset.lifeMode));
  $('viewer').addEventListener('close',refresh);
  window.LifeUI={open,refresh,hint};
  G.render();
})();
