(function(){
  'use strict';
  const G=window.ChapterGame,D=window.InquiryData,E=window.LifeEngine,$=id=>document.getElementById(id);
  const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const state=()=>G.getState();
  let mode='inquiry',linkIndex=0,eventChoice=null,linkChoice=null,linkPair=['',''],selectedPiece=null,side='front';
  let eventFeedback=null,linkFeedback=null,puzzleMessage='';
  const eventById=id=>D.lifeEpisodes.find(event=>event.id===id);
  const current=()=>eventById(state().lifeFocus)||D.lifeEpisodes[0];
  const allEvents=()=>D.lifeEpisodes.every(event=>state().lifeSolved.includes(event.id));
  const allLinks=()=>D.lifeConnections.every(link=>state().lifeLinks.includes(link.id));
  const puzzleCorrect=()=>D.lifeEpisodes.every((event,i)=>state().profileSlots[i]===event.id);
  function feedback(item){return item?'<p class="life-feedback '+item.kind+'" role="status">'+esc(item.note)+'</p>':'';}
  function setMode(next){mode=next;selectedPiece=null;refresh();$('lifeWorkspace').scrollTop=0;}
  function focusEvent(id){state().lifeFocus=id;eventChoice=null;eventFeedback=null;G.save();setMode('inquiry');}
  function open(prefer){
    eventChoice=null;eventFeedback=null;linkChoice=null;linkPair=['',''];linkFeedback=null;
    if(prefer==='inquiry')mode='inquiry';
    else mode=!allEvents()?'inquiry':!allLinks()?'connections':'portrait';
    if(state().lifeSolved.includes(current().id)&&!allEvents())state().lifeFocus=D.lifeEpisodes.find(event=>!state().lifeSolved.includes(event.id)).id;
    G.openDialog('profileDialog');refresh();
  }
  function refresh(){
    if(!$('profileDialog').open)return;
    const s=state();$('lifeProgress').innerHTML='<b>'+s.lifeSolved.length+' / 6</b> 段经历<br><b>'+s.lifeLinks.length+' / 3</b> 条关系<br><span>'+(s.facts.includes('profileComplete')?'正反侧写完成':'正反侧写待拼合')+'</span>';
    $('lifeModes').querySelectorAll('[data-life-mode]').forEach(button=>{button.classList.toggle('active',button.dataset.lifeMode===mode);button.setAttribute('aria-pressed',String(button.dataset.lifeMode===mode));});
    if(mode==='inquiry')renderInquiry();else if(mode==='connections')renderConnections();else renderPuzzle();
  }
  function renderInquiry(){
    const s=state(),event=current(),done=s.lifeSolved.includes(event.id),doc=D.evidence[event.sources[0]],voice=D.evidence[event.sources[1]],read=s.collected.includes(event.sources[0]),heard=s.collected.includes(event.sources[1]);
    $('lifeWorkspace').innerHTML='<div class="life-inquiry"><aside class="life-event-nav"><span>SIX EPISODES / 六段经历</span>'+D.lifeEpisodes.map((item,i)=>'<button data-life-event="'+item.id+'" class="'+(item.id===event.id?'active ':'')+(s.lifeSolved.includes(item.id)?'solved':'')+'"><i>'+String(i+1).padStart(2,'0')+'</i><span>'+esc(item.name)+'<small>'+item.tag+'</small></span><b>'+(s.lifeSolved.includes(item.id)?'✓':'↗')+'</b></button>').join('')+'<p>一次核对一段。顺序可以自选，材料不混进案件线。</p></aside><section class="life-event-detail"><div class="life-event-title"><span class="eyebrow">'+event.tag+'</span><h3>'+esc(event.name)+'</h3><p>'+esc(event.question)+'</p></div><div class="life-source-pair"><button data-life-source="'+event.sources[0]+'"><span>01 / 旧档 '+(read?'✓':'↗')+'</span><strong>'+esc(doc.title)+'</strong><small>打开全文，核对日期与原话</small></button><button id="lifeInterview" '+(!read?'disabled':'')+'><span>02 / '+(heard?'补访已保存 ✓':'交谈与证词 ↗')+'</span><strong>'+esc(voice.title)+'</strong><small>'+(heard?'重读完整补访':'先读旧档，再选一个问题追问')+'</small></button></div><div class="life-reconstruction"><span class="field-label">03 / RECONSTRUCT THE EVENT</span><h4>两份来源，支持哪一个事件？</h4><div id="lifeEventOptions" class="life-event-options">'+event.options.filter(([id])=>!done||id===event.answer).map(([id,text])=>'<button data-event-choice="'+id+'" class="'+((done?event.answer:eventChoice)===id?'selected':'')+'" aria-pressed="'+((done?event.answer:eventChoice)===id)+'" '+(done?'disabled':'')+'>'+esc(text)+'</button>').join('')+'</div>'+feedback(eventFeedback)+'<div class="life-submit-row"><span>'+[read,heard].filter(Boolean).length+' / 2 来源已核对 · '+(done?'事件已重建':event.age+' 岁')+'</span><button id="verifyLifeEvent" class="ink-button" '+(done||!read||!heard||!eventChoice?'disabled':'')+'>'+(done?'EVENT VERIFIED / 已重建':'VERIFY EVENT / 核对事件 ↗')+'</button></div></div>'+(done?'<article class="life-event-coda"><span>A PERSON IN THE RECORD</span><p>“'+esc(event.voice)+'”</p><small>这段经历已进入拼图。它解释她的人生，不为案件加罪或免责。</small><button id="nextLifeEvent" class="secondary-button">'+(allEvents()?'开始连接人生事件 →':'继续调查下一段 →')+'</button></article>':'')+'</section></div>';
    $('lifeWorkspace').querySelectorAll('[data-life-event]').forEach(button=>button.onclick=()=>focusEvent(button.dataset.lifeEvent));
    $('lifeWorkspace').querySelector('[data-life-source]').onclick=()=>G.openViewer(event.sources[0]);
    $('lifeInterview').onclick=()=>heard?G.openViewer(event.sources[1]):interview(event);
    $('lifeWorkspace').querySelectorAll('[data-event-choice]').forEach(button=>button.onclick=()=>{eventChoice=button.dataset.eventChoice;eventFeedback=null;renderInquiry();});
    $('verifyLifeEvent').onclick=()=>{
      const result=E.episode(event.id,eventChoice,s.collected);eventFeedback=result;s.lifeAttempts.push({type:'event',id:event.id,choice:eventChoice,result:result.kind});
      if(result.kind==='supported'&&!s.lifeSolved.includes(event.id)){s.lifeSolved.push(event.id);G.sound('fact');}else if(result.kind!=='supported')G.sound('paper');
      G.save();G.render();
    };
    if($('nextLifeEvent'))$('nextLifeEvent').onclick=()=>{const next=D.lifeEpisodes.find(item=>!s.lifeSolved.includes(item.id));if(next)focusEvent(next.id);else setMode('connections');};
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
    const s=state(),link=D.lifeConnections[linkIndex],done=s.lifeLinks.includes(link.id),events=D.lifeEpisodes.filter(event=>s.lifeSolved.includes(event.id));
    if(done){linkPair=[...link.pair];linkChoice=link.answer;}
    const select=(index)=>'<label>事件 '+(index+1)+'<select '+(done?'disabled':'')+' id="linkEvent'+index+'" aria-label="关系中的第'+(index+1)+'段事件"><option value="">选择一段已重建的经历</option>'+events.map(event=>'<option value="'+event.id+'" '+(linkPair[index]===event.id?'selected':'')+'>'+event.age+' / '+esc(event.name)+'</option>').join('')+'</select></label>';
    $('lifeWorkspace').innerHTML='<section class="life-connections"><nav class="life-link-nav">'+D.lifeConnections.map((item,i)=>'<button data-life-link="'+i+'" class="'+(i===linkIndex?'active':'')+'">0'+(i+1)+' / '+(s.lifeLinks.includes(item.id)?'VERIFIED ✓':'CONNECT')+'</button>').join('')+'</nav><span class="eyebrow">A RELATIONSHIP BETWEEN EVENTS</span><h3>'+esc(link.title)+'</h3><p class="life-link-instruction">选出与问题有关的两段已重建事件，再提出同时保留两边事实的读法。它是人物理解，不是新的定罪证据。</p>'+(events.length<2?'<p class="life-feedback incomplete">还缺可连接的事件。先到“经历核对”调查旧档与补访。</p>':'')+'<div class="life-link-selectors">'+select(0)+'<i>↔</i>'+select(1)+'</div><div class="life-event-options">'+link.options.filter(([id])=>!done||id===link.answer).map(([id,text])=>'<button data-link-choice="'+id+'" class="'+(linkChoice===id?'selected':'')+'" '+(done?'disabled':'')+'>'+esc(text)+'</button>').join('')+'</div>'+feedback(linkFeedback)+'<div class="life-submit-row"><span>'+(done?'关系已核对':'需要两段事件和一个读法')+'</span><button id="verifyLifeLink" class="ink-button" '+(done||!linkChoice||!linkPair.every(Boolean)?'disabled':'')+'>'+(done?'RELATION VERIFIED / 已核对':'CONNECT / 提交关系 ↗')+'</button></div>'+(done?'<article class="life-link-coda"><p>'+esc(link.note)+'</p><button id="nextLifeLink" class="secondary-button">'+(allLinks()?'去拼回正反画像 →':'下一条关系 →')+'</button></article>':'')+'</section>';
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
    const event=eventById(id);if(!event)return;
    $('fragmentReading').innerHTML='<span>'+event.age+' / '+esc(event.tag)+'</span><h3>'+esc(side==='front'?event.front:event.back)+'</h3><p>“'+esc(event.voice)+'”</p><small>依据：'+event.sources.map(source=>esc(D.evidence[source].title)).join(' ＋ ')+'。人物侧写不直接代替案件证明。</small>';
  }
  function placePiece(index,id=selectedPiece){
    const s=state();if(!id||!s.lifeSolved.includes(id)||s.facts.includes('profileComplete'))return;
    const old=s.profileSlots.indexOf(id);if(old>=0)s.profileSlots[old]=null;s.profileSlots[index]=id;s.profileViews=[];selectedPiece=null;puzzleMessage='';G.save();renderPuzzle();reading(id);G.sound('paper');
  }
  function renderPuzzle(){
    const s=state(),done=s.facts.includes('profileComplete'),image=side==='front'?'execution/assets/character/shadows/stand-reaching-profile.png':'execution/assets/character/shadows/stand-bowed.png';
    $('profileDialog').dataset.side=side;
    $('lifeWorkspace').innerHTML='<div class="life-portrait-top"><div><span class="eyebrow">THE SAME PERSON, TWO READINGS</span><h3>先有她的一生，才有最后这盒磁带。</h3></div><div class="profile-sides"><button id="profileFront" class="'+(side==='front'?'active':'')+'">SIDE A<small>她爱过，也选择过</small></button><button id="profileBack" class="'+(side==='back'?'active':'')+'">SIDE B<small>她把以后留在手里</small></button></div></div><div class="profile-layout"><div class="puzzle-wrap"><div id="puzzleBoard" class="puzzle-board" aria-label="按年代拼回六段人生">'+D.lifeEpisodes.map((expected,i)=>{const event=eventById(s.profileSlots[i]),n=event?D.lifeEpisodes.indexOf(event):-1;return '<button class="puzzle-slot '+(event?'occupied':'empty')+(done?' verified':'')+'" data-puzzle-slot="'+i+'" aria-label="'+expected.age+'岁的经历">'+(event?'<img class="piece-image" src="'+image+'" style="--c:'+n%2+';--r:'+Math.floor(n/2)+'" alt="小春的无五官剪影拼图">':'<span class="puzzle-age">'+expected.age+'</span>')+'<span class="puzzle-slot-label">'+expected.age+' / '+esc(event?event.name:'把这段经历放回来')+'</span></button>';}).join('')+'</div><p id="puzzleStatus">'+esc(puzzleMessage||(done?'经历、关系与正反侧写均已完成。':!allEvents()?'先重建六段人生事件，再按档案中的时序放回。':!allLinks()?'事件已取得；还需要核对三条人生关系。':'按年代拼好，确认这一面，再翻到另一面。'))+'</p><button id="checkProfile" class="ink-button" '+(done?'disabled':'')+'>'+(done?'BOTH SIDES / 侧写完成':'ASSEMBLE / 确认这一面 ↗')+'</button></div><section class="profile-fragments"><p class="profile-instruction">选一段经历，再点左侧位置；也可拖放。放错可以重放。只有已经重建的事件可以进入拼图。</p><div id="fragmentTray">'+[3,0,5,2,1,4].map(index=>{const event=D.lifeEpisodes[index],unlocked=s.lifeSolved.includes(event.id);return '<button class="fragment-card '+(selectedPiece===event.id?'selected ':'')+(s.profileSlots.includes(event.id)?'placed ':'')+(!unlocked?'locked':'')+'" data-fragment="'+event.id+'" draggable="'+unlocked+'" '+(!unlocked?'disabled':'')+'><span class="fragment-image">'+(unlocked?'<img class="piece-image" src="'+image+'" style="--c:'+index%2+';--r:'+Math.floor(index/2)+'" alt="">':'<b>?</b>')+'</span><strong>'+esc(event.name)+'</strong><small>'+(unlocked?'事件已重建':'到经历核对中调查')+'</small></button>';}).join('')+'</div><article id="fragmentReading" class="fragment-reading"><span>HER LIFE</span><h3>真心、选择和越界，都属于同一个人。</h3><p>翻面改变读法，不改变已经核对的过去。没有一个片段能把她整个人判成好人或坏人。</p></article></section></div>';
    $('profileFront').onclick=()=>flip('front');$('profileBack').onclick=()=>flip('back');
    $('puzzleBoard').querySelectorAll('[data-puzzle-slot]').forEach(slot=>{slot.onclick=()=>{const i=Number(slot.dataset.puzzleSlot);if(selectedPiece)placePiece(i);else reading(s.profileSlots[i]);};slot.ondragover=e=>{e.preventDefault();slot.classList.add('drop-target');};slot.ondragleave=()=>slot.classList.remove('drop-target');slot.ondrop=e=>{e.preventDefault();placePiece(Number(slot.dataset.puzzleSlot),e.dataTransfer.getData('text/plain'));};});
    $('fragmentTray').querySelectorAll('[data-fragment]').forEach(button=>{button.onclick=()=>{if(done){reading(button.dataset.fragment);return;}selectedPiece=button.dataset.fragment;renderPuzzle();reading(selectedPiece);};button.ondragstart=e=>e.dataTransfer.setData('text/plain',button.dataset.fragment);});
    $('checkProfile').onclick=()=>{
      if(!allEvents()){puzzleMessage='还缺经历。先调查每段的旧档与补访，并核对支持的事件。';}
      else if(!allLinks()){puzzleMessage='三条关系还没有完成。到“关系推断”选择两段事件和有根据的读法。';}
      else if(!puzzleCorrect()){puzzleMessage='时序尚未对应。比较旧档日期：16、19、20、21、24、26 岁，从左到右、从上到下。';}
      else {if(!s.profileViews.includes(side))s.profileViews.push(side);puzzleMessage='这一面已确认。翻到另一面，读一读同一段过去。';G.save();finishIfReady();}
      renderPuzzle();
    };
  }
  function flip(to){side=to;const s=state();if(puzzleCorrect()&&allEvents()&&allLinks()&&s.profileViews.length){if(!s.profileViews.includes(side))s.profileViews.push(side);G.save();finishIfReady();}renderPuzzle();reading(side==='front'?'love':'break');G.sound('paper');}
  function hint(){
    const s=state(),event=D.lifeEpisodes.find(item=>!s.lifeSolved.includes(item.id));
    if(event)return ['人生调查 / '+event.name,['P 打开“经历核对”，一次调查一段。先读旧档，再选一个可被记录核对的问题。','本段来源：'+event.sources.map(id=>D.evidence[id].title).join(' ＋ ')+'。不要用“从来”“所有”“所以必然”代替证据。','补访选“'+event.interview.options.find(option=>option.id==='ask').text+'”；核对事件选“'+event.options.find(option=>option[0]===event.answer)[1]+'”。']];
    const link=D.lifeConnections.find(item=>!s.lifeLinks.includes(item.id));
    if(link)return ['人生关系 / '+link.title,['进入“关系推断”。选择两段已经重建的经历，再选能同时保留双方事实的读法。','对应事件是：'+link.pair.map(id=>eventById(id).name).join(' ＋ ')+'。',link.options.find(option=>option[0]===link.answer)[1]]];
    return ['正反人物拼图',['六段经历和三条关系都已核对。现在按旧档日期，把事件放回人生。','从左到右、从上到下，年份顺序为 16、19、20、21、24、26。','顺序：下次先拆这个、两张不相邻的票、两份不同日期、没有读的最后一句、不包邮的针线、迟接的电话。确认一面，再翻面。']];
  }
  $('lifeModes').querySelectorAll('[data-life-mode]').forEach(button=>button.onclick=()=>setMode(button.dataset.lifeMode));
  $('viewer').addEventListener('close',refresh);
  window.LifeUI={open,refresh,hint};
  G.render();
})();
