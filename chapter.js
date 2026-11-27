(function(){
  'use strict';
  const G=window.ChapterGame,D=window.InquiryData,$=id=>document.getElementById(id);
  const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const art='execution/assets/character/';
  let hintLevel=0,hintScope='case',previewing=false;
  const state=()=>G.getState();
  function defaultEmotion(s){return s.ending==='bad'?'cry':s.ending==='good'||s.facts.includes('withheld')?'thoughtful':'neutral';}
  function portrait(s,options={}){
    if(options.portrait==='cry'||s.emotion==='cry'||s.ending==='bad')return art+'details/covered-face.png';
    if(['overreach','contradicted'].includes(options.result)||s.emotion==='angry')return art+'details/open-hands.png';
    if(options.portrait==='key-detail')return art+'details/clasped-keys.png?v=0.8.1';
    if(options.portrait==='front-keys')return art+'details/front-clasped-keys.png?v=0.8.1';
    if(['front-letter','letter-detail'].includes(options.portrait))return art+'details/front-held-letter.png?v=0.8.1';
    return art+'details/calm-empty-hands.png?v=0.8.1';
  }
  function layerUnlocked(s,id){const p=window.InquiryEngine.milestones(s.facts);return id==='keys'||id==='notice'&&(s.inquiry?.done.includes('notice')||['knowledge','noticeGap','withheld','misuse'].some(fact=>s.facts.includes(fact)))||id==='rescue'&&(s.inquiry?.done.includes('return')||p.rescue||s.facts.includes('rescueAct'));}
  function sceneItems(s,scene){
    const layer=D.caseLayers.find(item=>item.id===s.caseLayer)||D.caseLayers[0];
    const items=scene.items.filter(item=>layer.materials.includes(item.id)&&window.InvestigationEngine.canAccess(s,item.id));
    return items.map((item,i)=>({...item,x:items.length>3?14+i*24:items.length===1?36:items.length===2?22+i*42:13+i*32,y:48}));
  }
  function setLayer(id){
    const s=state();if(!layerUnlocked(s,id)){G.notify('先核实上一层，再打开下一卷。人物侧写随时可以调查。');return;}
    s.caseLayer=id;s.builder={topic:id,claim:null,selected:[],source:'evidence'};
    if(!sceneItems(s,D.scenes[s.scene]).length)s.scene=Object.keys(D.scenes).find(key=>sceneItems(s,D.scenes[key]).length)||'studio';
    G.save();G.render();
  }
  function render(s){
    const p=G.progress(),layer=D.caseLayers.find(item=>item.id===s.caseLayer)||D.caseLayers[0];
    $('phaseNumber').textContent=String.fromCharCode(65+D.caseLayers.indexOf(layer));$('phaseEyebrow').textContent='CASE FILE / '+layer.short;
    $('phaseQuestion').textContent=D.topics.find(topic=>topic.id===layer.id).question;
    $('phaseHint').textContent=layer.caption;
    $('app').dataset.emotion=s.emotion;$('app').dataset.caseLayer=layer.id;
    $('emotionTag').textContent={neutral:'LISTENING / OFF AIR',thoughtful:'UNSETTLED / THINKING',angry:'DEFENSIVE / CHALLENGED',cry:'SHATTERED / RECORDED'}[s.ending==='bad'?'cry':s.emotion]||'LISTENING / OFF AIR';
    const completed={keys:p.first,notice:p.warning,rescue:p.rescue&&p.causation};
    $('caseLayerTabs').innerHTML=D.caseLayers.map(item=>'<button data-layer="'+item.id+'" class="'+(item.id===layer.id?'active ':'')+(completed[item.id]?'done':'')+'" '+(!layerUnlocked(s,item.id)?'disabled':'')+' aria-pressed="'+(item.id===layer.id)+'"><b>'+String.fromCharCode(65+D.caseLayers.indexOf(item))+'</b><span>'+item.title+'<small>'+item.short+'</small></span><i>'+(completed[item.id]?'✓':layerUnlocked(s,item.id)?'↗':'—')+'</i></button>').join('');
    $('caseLayerTabs').querySelectorAll('[data-layer]').forEach(button=>button.onclick=()=>setLayer(button.dataset.layer));
    $('caseProgress').textContent=Object.values(completed).filter(Boolean).length+' / 3 卷';
    $('lifeQuickStatus').textContent=s.lifeSolved.length+' / 6 经历 · '+window.Programme.adopted(s).length+' / 6 拼图片段';
    $('profileCount').textContent=window.Programme.adopted(s).length+' / 6';
    $('profileButton').classList.toggle('complete',p.profile);$('profileButton').classList.toggle('ready',!p.profile&&(s.lifeSolved.length>0||p.causation));
    const items=sceneItems(s,D.scenes[s.scene]);
    $('sceneEmpty').hidden=items.length>0;
    if(!items.length){const places=Object.keys(D.scenes).filter(key=>sceneItems(s,D.scenes[key]).length);$('sceneEmpty').innerHTML='<span>THIS FILE / '+layer.number+'</span><h3>这里没有这一卷的材料。</h3><p>其他卷宗暂时收起。换一个地点继续核对。</p>'+places.map(key=>'<button data-jump="'+key+'">'+esc(D.scenes[key].title)+' →</button>').join('');$('sceneEmpty').querySelectorAll('[data-jump]').forEach(button=>button.onclick=()=>document.querySelector('[data-location="'+button.dataset.jump+'"]').click());}
    document.querySelectorAll('[data-location]').forEach(button=>{const count=sceneItems(s,D.scenes[button.dataset.location]).length;button.classList.toggle('no-materials',!count);button.title=count?'本卷 '+count+' 件材料':'本卷无材料';});
    $('roundOne').textContent='CASE / '+Object.values(completed).filter(Boolean).length+' OF 3';$('roundTwo').textContent='LIFE / '+D.lifePieces(s).length+' CUTS';
    $('roundOne').className=p.causation?'done':'current';$('roundTwo').className=p.profile?'done':'current';
    window.LifeUI?.refresh();$('previewCG').hidden=!window.InquiryEngine.cgUnlocked(s);
  }
  function onResult(s,result){
    s.emotion=['overreach','contradicted'].includes(result.kind)?'angry':result.kind==='incomplete'?'thoughtful':defaultEmotion(s);
    const p=G.progress();
  }
  function onCollect(s,id){if(D.evidence[id].lane==='life')setTimeout(()=>G.notify('保存到人生档案 · 不进入案件证据池'),40);}
  function onConversationEnd(s){s.emotion=defaultEmotion(s);G.save();window.LifeUI?.refresh();}
  function talkToHer(){window.InquiryUI.open();}
  function hintSpec(){
    if(hintScope==='life')return window.LifeUI.hint();
    const s=state(),steps=window.InvestigationEngine.availableSteps(s),unread=Object.keys(s.inquiry.received).filter(id=>!s.collected.includes(id));
    if(unread.length)return ['收到的材料还没有读完',['先打开“'+D.evidence[unread[0]].title+'”。','材料在采访桌“刚交来的材料”中，也能在对应物件或收件夹重看。','读过以后才会出现在推理的来源库里。']];
    if(steps.length)return ['现在可以追问',['采访桌上可以继续问：“'+steps[0].question+'”','点击“'+steps[0].title+'”。对方会在这段采访里交出相关材料。','收到后对照原件，再到 B 提出推断。测试时也可用一键推理查看当前组合。']];
    const available=window.DebugInference?.solutions(s,s.caseLayer).filter(item=>!item.known)||[];
    if(available.length){const solution=available[0];return ['比较已有来源',['你已经有足够材料核对“'+D.facts[solution.claim].title+'”。','到 B，选择这句说法。','采用：'+solution.sources.map(id=>(D.evidence[id]||D.facts[id]).title).join(' ＋ ')+'。']];}
    return ['整理本期判断',['N 可回看已经核实的结果；P 可继续人物取材与拼图。','R 勾选本期采用的推论与人物侧写，再 CUE 读一遍稿件。','最后的定性只采用本期选入的内容。B 轨整体正反面可以切换，A 轨按实际采用的案件材料形成依据。']];
  }
  function renderHint(){const [title,hints]=hintSpec();$('hintTitle').textContent=title;$('hintText').textContent=hints[Math.min(hintLevel,hints.length-1)];$('nextHint').disabled=hintLevel>=hints.length-1;$('nextHint').textContent=hintLevel>=hints.length-1?'提示已完整展开':'再提示一步 →';}
  function openHint(scope){hintScope=scope==='life'?'life':'case';hintLevel=0;renderHint();G.openDialog('hintDialog');}
  function prepareEnding(s){
    $('ending').querySelector('.dialog-bar>span').textContent='FINAL MIX / BROADCAST REVIEW';
    $('ending').classList.toggle('is-result',!!s.ending);
    $('ending').querySelector('.ending-art img').src=s.ending==='bad'?art+'details/covered-face.png':art+'details/calm-empty-hands.png?v=0.8.1';
    $('ending').querySelector('h2').innerHTML=s.ending==='zero'?'材料不足，<br>这期只播摘要。':s.ending==='objective'?'两面都已留下，<br>这次不替她定性。':s.ending?'这盒共同录音，<br>留下了谁的声音？':'本期播什么，<br>最后一句怎么说？';
    $('ending').querySelector('.ending-copy>.eyebrow').textContent=s.ending?'OFF AIR / PERSONAL ARCHIVE':'THE NEXT QUESTION';
    $('endingFacts').hidden=!!s.ending;
    $('ending').querySelector('.ending-context').hidden=!!s.ending;
    const snapshot=s.radio.phase==='archived'?s.radio.editorialSnapshot:null,source=snapshot||s,chosen=window.Programme.usedFacts(source),events=window.Programme.usedEvents(source),links=window.Programme.usedLinks(source);
    $('endingFacts').innerHTML=chosen.map(id=>'<div class="ending-fact"><button data-verdict-source="'+id+'">'+esc(D.facts[id].title)+' ↗</button><small>本期已采用的推论</small></div>').join('')+events.map(id=>'<div class="ending-fact">'+esc(D.lifeEpisodes.find(e=>e.id===id).name)+'<small>B / 已采用经历</small></div>').join('')+links.map(id=>'<div class="ending-fact">人物推断：'+esc(D.lifeConnections.find(l=>l.id===id).title)+'<small>B / 已采用人物关系</small></div>').join('');
    $('endingFacts').querySelectorAll('[data-verdict-source]').forEach(button=>button.onclick=()=>G.openViewer(button.dataset.verdictSource));
    const status=window.InquiryEngine.verdictStatus(s);
    $('verdictChains').hidden=!!s.ending;
    const assessment=status.assessment;$('verdictAssessment').hidden=!!s.ending;$('endingDecisionNotice').hidden=!!s.ending;
    $('verdictAssessment').innerHTML=assessment?'<h3>本期采用材料的综合判断</h3><p>正面分量 '+assessment.positive+' · 反面分量 '+assessment.negative+'。A 轨案件材料为主，B 轨整体侧写补充人物理解，同一主题不重复堆分。</p><p>'+(!assessment.minimum?'目前材料还不足以作人物定性。':status.good.ready&&status.bad.ready?'两方面都有充分材料，好人和坏人两项均可选择。':status.good.ready?'本期采用的材料偏向正面。':status.bad.ready?'本期采用的材料偏向反面。':'还缺能支撑某一面判断的材料。')+'</p>'+(assessment.complete?'<p class="all-checked">完整客观播报的调查与采用条件均已满足。</p>':'<details><summary>完整客观播报还缺什么？</summary><ul>'+assessment.missing.map(item=>'<li>'+esc(item)+'</li>').join('')+'</ul></details>'):'';
    $('verdictChains').innerHTML=['bad','good','objective'].map(id=>'<section class="verdict-chain '+(status[id].ready?'ready':'')+'"><h3>'+(id==='bad'?'坏人 / 综合依据':id==='good'?'好人 / 综合依据':'客观 / 完整性检查')+'</h3>'+status[id].steps.map(step=>'<p class="'+(step.ok?'linked':'missing')+'"><b>'+(step.ok?'●':'○')+' '+step.title+'</b><span>'+esc(step.text)+'</span></p>').join('')+'</section>').join('');
    for(const id of ['good','bad','objective']){$('endingOptions').querySelector('[data-ending="'+id+'"]').disabled=!status[id].ready||!!window.Onboarding?.mustReturnBeforeEnding();}
    const summaryButton=$('endingOptions').querySelector('[data-ending="zero"]');summaryButton.disabled=!!window.Onboarding?.mustReturnBeforeEnding()||!!assessment?.complete;summaryButton.querySelector('span').textContent=assessment?.complete?'本期材料已完整采用，请选择完整客观播报或人物定性。':'调查或本期采用范围仍不完整。选此项会仅播现有摘要并结束本期，不是完整客观结局。';
    if(!$('endingLibraryActions')){const actions=document.createElement('div');actions.id='endingLibraryActions';actions.className='ending-library-actions';actions.innerHTML='<button id="changeProgrammeCuts" class="secondary-button">更换本期 PGM 采用内容 ↗</button>';$('verdictChains').after(actions);$('changeProgrammeCuts').onclick=()=>{G.closeDialog('ending');window.Radio.openRundown();};}$('endingLibraryActions').hidden=!!s.ending;
    $('ending').querySelector('.ending-context').textContent='本页只列本期实际采用的推论、经历与关系。已经知道但没有接入的内容仍在素材库，更换后重新 CUE 即可，不用重做。';
  }
  function continueReporting(){
    const s=state();if(s.ending==='zero'){s.ending=null;s.radio.phase='off-air';s.radio.previousSummary=s.radio.airScript;s.radio.previewed='';s.radio.airedEnding=null;s.radio.editorialSnapshot=null;s.radio.airScript=null;s.cgWatched=false;G.save();}
    G.closeDialog('ending');G.render();
  }
  function renderEndingResult(s){
    const unlocked=window.InquiryEngine.cgUnlocked(s),zero=s.ending==='zero';
    $('endingResult').innerHTML='<span>'+(zero?'ENDING 00 / DEAD AIR':s.ending==='good'?'ENDING 01 / A GOOD PERSON':s.ending==='objective'?'ENDING 03 / BOTH SIDES':'ENDING 02 / A BAD PERSON')+'</span><p>'+esc(s.radio.airScript?.at(-1)?.body||'这一期没有形成足以定性的论证。')+'</p>'+(zero?'<p>红灯熄灭。这版摘要已归档；还可以继续调查或重新编排。</p>':'<div id="endingTape" class="ending-tape-display" role="img" aria-label="从开场开始录制的共同节目磁带"></div><p class="ending-tape-caption">她的声音留在带子里。你决定留下的内容，都保存在这版录音中。</p><button id="endingPlay" class="ink-button ending-cg-entry"><span>播放结局 CG<small>HER TAPE / 03:33 · FALLING FLOWERS</small></span><span class="tape-play-icon" aria-hidden="true">▶</span></button>')+'<button id="endingUncut" class="secondary-button">'+(zero?'继续取材 / 保留现有调查':'回到台内 / 翻阅原件')+'</button>';
    if(s.radio.audienceNote){const audience=document.createElement('p');audience.className='audience-note';audience.textContent=s.radio.audienceNote;$('endingResult').append(audience);}
    const arrogance=window.InquiryEngine.arroganceStatus?.(s);if(arrogance){const record=document.createElement('p');record.id='arroganceRecord';record.className='arrogance-record';record.textContent=s.ending==='objective'?'本人物已完成全收集客观播报：没有给她下好坏定义。':s.ending==='zero'?'本期只留下未完成的摘要，不计作完整客观结局。':'本人物已被定性。这次给整个人命名的选择已留在记录里。';$('endingResult').append(record);}
    if(!zero)new window.CharacterCassette($('endingTape'),'ending-record',{decal:'execution/assets/ui/koharu-tape-decal.png'}).update(.35);
    if(s.radio.phase==='archived'){const reedit=document.createElement('button');reedit.id='endingReedit';reedit.className='secondary-button';reedit.textContent='用现有素材重新编排一版 / 不清调查 ↗';reedit.onclick=()=>window.Radio.newDraft();$('endingResult').append(reedit);}
    if($('endingPlay')){$('endingPlay').disabled=!unlocked;$('endingPlay').onclick=()=>launchCG(false);}
    $('endingUncut').onclick=continueReporting;
  }
  function onVerdict(choice,s){
    s.emotion=choice==='bad'?'cry':'thoughtful';G.save();G.render();prepareEnding(s);G.closeDialog('ending');
    G.playConversation(D.journeyEndings[choice],{module:'ending',label:'OFF AIR / '+(choice==='zero'?'OPEN CONCLUSION':'THE SAME TAPE'),portrait:choice==='bad'?'cry':'neutral',endText:choice==='zero'?'返回本期记录 →':'封存节目带 / 查看结尾 →',after:()=>G.openEnding()});
  }
  function launchCG(preview){if(!window.InquiryEngine.cgUnlocked(state())){G.notify('这份记录还没有形成正式结局，磁带没有解锁。');return;}previewing=preview;document.querySelectorAll('dialog[open]').forEach(node=>node.close());$('cgStatus').textContent=preview?'ARCHIVE PREVIEW / 不改变当前判断':'HER TAPE / THE THINGS SHE KEPT';$('cgScreen').hidden=false;$('app').inert=true;$('cgFrame').src='execution/index.html?chapter=01';document.body.classList.add('watching-cg');$('cgFrame').focus();}
  function exitCG(){const frame=$('cgFrame');try{frame.contentWindow.postMessage({channel:'dead-air-chapter',action:'pause'},'*');}catch(_){}frame.src='about:blank';$('cgScreen').hidden=true;$('app').inert=false;document.body.classList.remove('watching-cg');if(state().ending)G.openEnding();else G.render();}
  window.addEventListener('message',event=>{if($('cgScreen').hidden||event.source!==$('cgFrame').contentWindow||event.data?.channel!=='dead-air-chapter')return;if(event.data.event==='complete'){if(!previewing&&window.InquiryEngine.cgUnlocked(state())){state().cgWatched=true;G.save();}$('cgStatus').textContent='END OF TAPE / 记录已保存';}if(event.data.event==='ready')$('cgStatus').textContent=previewing?'ARCHIVE PREVIEW / 点击磁带放入':'HER TAPE / 点击磁带放入，播放记录';});
  window.ChapterExtension={portrait,render,sceneItems,layerUnlocked,onResult,onCollect,onConversationEnd,prepareEnding,renderEndingResult,onVerdict,talkToHer,setLayer};
  $('profileButton').onclick=()=>window.LifeUI.open();$('lifeLaneButton').onclick=()=>window.LifeUI.open();
  $('lifeHintButton').onclick=()=>openHint('life');
  $('hintButton').onclick=openHint;$('nextHint').onclick=()=>{hintLevel++;renderHint();};$('previewCG').onclick=()=>launchCG(true);$('exitCG').onclick=exitCG;
  document.querySelectorAll('#hintDialog [data-close]').forEach(button=>button.onclick=()=>G.closeDialog(button.dataset.close));
  document.addEventListener('keydown',event=>{if(event.ctrlKey||event.altKey||event.metaKey||/INPUT|TEXTAREA|SELECT/.test(event.target.tagName)||!$('titleScreen').hidden||!$('cgScreen').hidden||document.querySelector('dialog[open]'))return;if(event.key.toLowerCase()==='p'){event.preventDefault();window.LifeUI.open();}if(event.key.toLowerCase()==='h'){event.preventDefault();openHint();}});
  document.addEventListener('keydown',event=>{if(event.key.toLowerCase()==='h'&&!event.ctrlKey&&!event.altKey&&!event.metaKey&&!/INPUT|TEXTAREA|SELECT/.test(event.target.tagName)&&$('profileDialog').open&&!$('conversation').open&&!$('viewer').open&&!$('hintDialog').open){event.preventDefault();openHint('life');}});
  G.render();
})();
