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
    if(options.portrait==='letter'||s.emotion==='thoughtful')return art+'details/clasped-keys.png';
    return art+'details/held-letter.png';
  }
  function layerUnlocked(s,id){const p=window.InquiryEngine.milestones(s.facts);return id==='keys'||id==='notice'&&p.first||id==='rescue'&&p.first;}
  function sceneItems(s,scene){
    const layer=D.caseLayers.find(item=>item.id===s.caseLayer)||D.caseLayers[0];
    const items=scene.items.filter(item=>layer.materials.includes(item.id));
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
    $('phaseNumber').textContent=layer.number;$('phaseEyebrow').textContent='CASE FILE / '+layer.short;
    $('phaseQuestion').textContent=D.topics.find(topic=>topic.id===layer.id).question;
    $('phaseHint').textContent=layer.caption;
    $('app').dataset.emotion=s.emotion;$('app').dataset.caseLayer=layer.id;
    $('emotionTag').textContent={neutral:'LISTENING / OFF AIR',thoughtful:'UNSETTLED / THINKING',angry:'DEFENSIVE / CHALLENGED',cry:'SHATTERED / RECORDED'}[s.ending==='bad'?'cry':s.emotion]||'LISTENING / OFF AIR';
    const completed={keys:p.first,notice:p.warning,rescue:p.rescue&&p.causation};
    $('caseLayerTabs').innerHTML=D.caseLayers.map(item=>'<button data-layer="'+item.id+'" class="'+(item.id===layer.id?'active ':'')+(completed[item.id]?'done':'')+'" '+(!layerUnlocked(s,item.id)?'disabled':'')+' aria-pressed="'+(item.id===layer.id)+'"><b>'+item.number+'</b><span>'+item.title+'<small>'+item.short+'</small></span><i>'+(completed[item.id]?'✓':layerUnlocked(s,item.id)?'↗':'—')+'</i></button>').join('');
    $('caseLayerTabs').querySelectorAll('[data-layer]').forEach(button=>button.onclick=()=>setLayer(button.dataset.layer));
    $('caseProgress').textContent=Object.values(completed).filter(Boolean).length+' / 3 卷';
    $('lifeQuickStatus').textContent=D.lifePieces(s).length+' 块已取片段 · '+s.lifeSolved.length+' 段深入补访';
    $('profileCount').textContent=D.lifePieces(s).length+' CUTS';
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
    if(result.fact&&s.caseLayer==='keys'&&p.first){s.caseLayer='notice';s.builder={topic:'notice',claim:null,selected:[],source:'evidence'};}
    if(result.fact&&s.caseLayer==='notice'&&p.warning){s.caseLayer='rescue';s.builder={topic:'rescue',claim:null,selected:[],source:'evidence'};}
  }
  function onCollect(s,id){if(D.evidence[id].lane==='life')setTimeout(()=>G.notify('保存到人生档案 · 不进入案件证据池'),40);}
  function onConversationEnd(s){s.emotion=defaultEmotion(s);G.save();window.LifeUI?.refresh();}
  function talkToHer(){window.LifeUI.open('inquiry');}
  function hintSpec(){
    if(hintScope==='life')return window.LifeUI.hint();
    const radioHint=window.Radio?.hint();if(radioHint)return radioHint;
    const s=state(),p=G.progress();
    if(!p.first)return ['第一卷 / 最初的指控',['每次只核对一项。现在场景和证据池都只显示第一卷。','可以从钥匙归属、当晚出入、原通话三条路任选一条查。','最快路线：资料台“当晚入口录像摘录” → B →“持自己的钥匙自行离开” → 只放这份记录。']];
    if(!s.facts.includes('withheld'))return ['第二卷 / 收到与告知',['报告出具、本人签收、住客看到，是三个事实。','完整报告可翻到签收附页，前台保留了住客告示。','完整报告＋签收回执＋住客告示 →“她收到停用要求，却没有完整传达”。']];
    if(!s.facts.includes('misuse'))return ['第二卷 / 钱的用途',['花在小楼上，与符合指定用途，是两件事。','录音室有拨款条件和实际支出。','拨款条件＋实际转账与余额 →“安置款改变指定用途”。']];
    if(!s.facts.includes('rescueAct'))return ['第三卷 / 行动',['不要用伤情的好坏替代实际行动。','资料台的返身录像记录了进楼与抱出。','“返身救人的录像摘录” →“她确实返回，把澪抱出来”。']];
    if(!s.facts.includes('rescueContext'))return ['第三卷 / 当时的冲突',['当时的处境，要用她当时能知道的信息核对。','专业指示在资料台；新掉落声在前台的奈央记录中。','救援接线指示＋掉落声 →“先接到接应指示，随后听到掉落声”。']];
    if(!s.facts.includes('causationLimit'))return ['第三卷 / 证明的界限',['有伤情，不自动说明每处伤何时发生。','对照首次专业接手时点与复核意见。','第一次接手记录＋因果复核 →“无法确认新增损害，也无法确认绝对无害”。']];
    if(!p.profile)return window.LifeUI.hint();
    return ['进入最后评价',['案件与人生调查都已完成。','按 N，笔记底部进入最终评价。','保留与断罪共用事实。断罪后看完反应对白，进入完整处决 CG。']];
  }
  function renderHint(){const [title,hints]=hintSpec();$('hintTitle').textContent=title;$('hintText').textContent=hints[Math.min(hintLevel,hints.length-1)];$('nextHint').disabled=hintLevel>=hints.length-1;$('nextHint').textContent=hintLevel>=hints.length-1?'提示已完整展开':'再提示一步 →';}
  function openHint(scope){hintScope=scope==='life'?'life':'case';hintLevel=0;renderHint();G.openDialog('hintDialog');}
  function prepareEnding(s){
    $('ending').querySelector('.dialog-bar>span').textContent='FINAL MIX / ARGUMENT & JUDGMENT';
    $('ending').querySelector('.ending-art img').src=s.ending==='bad'?art+'details/covered-face.png':art+'details/held-letter.png';
    $('ending').querySelector('h2').innerHTML=s.ending==='zero'?'这次，只剩摘要。':'你用什么，<br>给她下这个定义？';
    const snapshot=s.radio.phase==='archived'?s.radio.editorialSnapshot:null,known=snapshot?.facts||s.facts;
    $('endingFacts').innerHTML=known.filter(id=>D.facts[id]&&D.facts[id].proof!==false).map(id=>'<div class="ending-fact">'+esc(D.facts[id].title)+'</div>').join('');
    const status=window.InquiryEngine.verdictStatus(s);
    $('verdictChains').hidden=!!s.ending;
    $('verdictChains').innerHTML=['bad','good'].map(id=>'<section class="verdict-chain '+(status[id].ready?'ready':'')+'"><h3>'+(id==='bad'?'负面定性 / 论证':'正面定性 / 论证')+'</h3>'+status[id].steps.map(step=>'<p class="'+(step.ok?'linked':'missing')+'"><b>'+(step.ok?'●':'○')+' '+step.title+'</b><span>'+esc(step.text)+'</span></p>').join('')+'</section>').join('');
    for(const id of ['good','bad']){$('endingOptions').querySelector('[data-ending="'+id+'"]').disabled=!status[id].ready;}
    $('ending').querySelector('.ending-context').textContent='零散材料可以收成一期摘要。要给这个人下定义，需要把行为、相关经历与推断一同接入节目。';
  }
  function continueReporting(){
    const s=state();if(s.ending==='zero'){s.ending=null;s.radio.phase='off-air';s.radio.previousSummary=s.radio.airScript;s.radio.previewed='';s.radio.airedEnding=null;s.radio.editorialSnapshot=null;s.radio.airScript=null;s.cgWatched=false;G.save();}
    G.closeDialog('ending');G.render();
  }
  function renderEndingResult(s){
    const unlocked=window.InquiryEngine.cgUnlocked(s),zero=s.ending==='zero';
    $('endingResult').innerHTML='<span>'+(zero?'ENDING 00 / DEAD AIR':s.ending==='good'?'ENDING 01 / A GOOD PERSON':'ENDING 02 / A BAD PERSON')+'</span><p>'+esc(s.radio.airScript?.at(-1)?.body||'这一期没有形成足以定性的论证。')+'</p>'+(zero?'<p>红灯熄灭。她的档案没有封签，磁带仍未入库。</p>':'<p>你把一条有根据的链，收束成了对一个人的定义。来访磁带已封存。</p><button id="endingPlay" class="ink-button">PLAY HER TAPE / 打开封存磁带 ↗</button>')+'<button id="endingUncut" class="secondary-button">'+(zero?'继续取材 / 保留现有调查':'回到台内 / 翻阅原件')+'</button>';
    if($('endingPlay')){$('endingPlay').disabled=!unlocked;$('endingPlay').onclick=()=>launchCG(false);}
    $('endingUncut').onclick=continueReporting;
  }
  function onVerdict(choice,s){
    s.emotion=choice==='bad'?'cry':'thoughtful';G.save();G.render();prepareEnding(s);G.closeDialog('ending');
    const lines=choice==='zero'?[{who:'导播内线',text:'只有几段摘要，还没有接成能定性的论证。这期到这里。'},{who:'记录',text:'没有新的档案入库，磁带口仍然关着。你可以带着已核实的材料继续下一轮取材。'}]:choice==='bad'?[{who:'小春',text:'你说的那些事，我没有说它没发生。'},{who:'小春',text:'所以，后面就只剩下“我就是这样的人”了？'},{who:'记录',text:'封签压住了还没翻开的页角。她把钥匙留在桌面上，没有再拿起。'}]:[{who:'小春',text:'你说……我还是个好人。'},{who:'小春',text:'那张告示呢？她现在走路还会疼。那些也留着吧。'},{who:'记录',text:'你保留了她的责任，也给整个人写下了一个定义。磁带入库，未采用的原件仍在桌上。'}];
    G.playConversation(lines,{label:'OFF AIR / '+(choice==='zero'?'NO VERDICT':'THE PERSON YOU NAMED'),portrait:choice==='bad'?'cry':'letter',after:()=>G.openEnding()});
  }
  function launchCG(preview){if(!window.InquiryEngine.cgUnlocked(state())){G.notify('这份记录尚未形成正式定性结局，磁带没有解锁。');return;}previewing=preview;document.querySelectorAll('dialog[open]').forEach(node=>node.close());$('cgStatus').textContent=preview?'ARCHIVE PREVIEW / 不改变当前判断':'HER TAPE / THE THINGS SHE KEPT';$('cgScreen').hidden=false;$('app').inert=true;$('cgFrame').src='execution/index.html?chapter=01';document.body.classList.add('watching-cg');$('cgFrame').focus();}
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
