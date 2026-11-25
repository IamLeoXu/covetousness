(function(){
  'use strict';
  const G=window.ChapterGame,D=window.InquiryData,$=id=>document.getElementById(id);
  const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const art='execution/assets/character/';
  let hintLevel=0,hintScope='case',previewing=false;
  const state=()=>G.getState();
  function defaultEmotion(s){return s.ending==='release'?'cry':s.ending==='hold'||s.facts.includes('withheld')?'thoughtful':'neutral';}
  function portrait(s,options={}){
    if(options.portrait==='cry'||s.emotion==='cry'||s.ending==='release')return art+'details/covered-face.png';
    if(['overreach','contradicted'].includes(options.result)||s.emotion==='angry')return art+'details/open-hands.png';
    if(options.portrait==='letter'||s.emotion==='thoughtful')return art+'details/clasped-keys.png';
    return art+'details/held-letter.png';
  }
  function layerUnlocked(s,id){const p=window.InquiryEngine.milestones(s.facts);return id==='keys'||id==='notice'&&p.first||id==='rescue'&&p.warning;}
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
    $('emotionTag').textContent={neutral:'LISTENING / OFF AIR',thoughtful:'UNSETTLED / THINKING',angry:'DEFENSIVE / CHALLENGED',cry:'SHATTERED / RECORDED'}[s.ending==='release'?'cry':s.emotion]||'LISTENING / OFF AIR';
    const completed={keys:p.first,notice:p.warning,rescue:p.rescue&&p.causation};
    $('caseLayerTabs').innerHTML=D.caseLayers.map(item=>'<button data-layer="'+item.id+'" class="'+(item.id===layer.id?'active ':'')+(completed[item.id]?'done':'')+'" '+(!layerUnlocked(s,item.id)?'disabled':'')+' aria-pressed="'+(item.id===layer.id)+'"><b>'+item.number+'</b><span>'+item.title+'<small>'+item.short+'</small></span><i>'+(completed[item.id]?'✓':layerUnlocked(s,item.id)?'↗':'—')+'</i></button>').join('');
    $('caseLayerTabs').querySelectorAll('[data-layer]').forEach(button=>button.onclick=()=>setLayer(button.dataset.layer));
    $('caseProgress').textContent=Object.values(completed).filter(Boolean).length+' / 3 卷';
    $('lifeQuickStatus').textContent=s.lifeSolved.length+' / 6 事件 · '+s.lifeLinks.length+' / 3 关系';
    $('profileCount').textContent=(s.lifeSolved.length+s.lifeLinks.length)+' / 9';
    $('profileButton').classList.toggle('complete',p.profile);$('profileButton').classList.toggle('ready',!p.profile&&(s.lifeSolved.length>0||p.causation));
    const items=sceneItems(s,D.scenes[s.scene]);
    $('sceneEmpty').hidden=items.length>0;
    if(!items.length){const places=Object.keys(D.scenes).filter(key=>sceneItems(s,D.scenes[key]).length);$('sceneEmpty').innerHTML='<span>THIS FILE / '+layer.number+'</span><h3>这里没有这一卷的材料。</h3><p>其他卷宗暂时收起。换一个地点继续核对。</p>'+places.map(key=>'<button data-jump="'+key+'">'+esc(D.scenes[key].title)+' →</button>').join('');$('sceneEmpty').querySelectorAll('[data-jump]').forEach(button=>button.onclick=()=>document.querySelector('[data-location="'+button.dataset.jump+'"]').click());}
    document.querySelectorAll('[data-location]').forEach(button=>{const count=sceneItems(s,D.scenes[button.dataset.location]).length;button.classList.toggle('no-materials',!count);button.title=count?'本卷 '+count+' 件材料':'本卷无材料';});
    $('roundOne').textContent='CASE / '+Object.values(completed).filter(Boolean).length+' OF 3';$('roundTwo').textContent='LIFE / '+(s.lifeSolved.length+s.lifeLinks.length)+' OF 9';
    $('roundOne').className=p.causation?'done':'current';$('roundTwo').className=p.profile?'done':'current';
    window.LifeUI?.refresh();
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
    $('ending').querySelector('.dialog-bar>span').textContent='FINAL REVIEW / A PERSON, NOT A FILE';
    $('ending').querySelector('.ending-art img').src=s.ending==='release'?art+'details/covered-face.png':art+'details/held-letter.png';
    $('ending').querySelector('h2').innerHTML='她也曾经，<br>舍不得却放了手。';
    $('endingFacts').innerHTML='<div class="ending-fact">案件：隐瞒停用要求、改变安置款用途、返身救人；搬动新增损害未明。</div><div class="ending-fact life-conclusion">人生：真实相爱过，自己选择过，送走过朋友，也仍被家人牵挂。后来她把没有回应，越来越多地听成失去。</div>';
    $('ending').querySelector('.ending-context').textContent='她的过去不能抵销伤者的损失；现在的过错也不能把她的一生改写成全是虚假。你愿意如何公开评价她，还给不给她学习放手的以后？';
    $('endingOptions').querySelector('[data-ending="hold"]').innerHTML='<b>HOLD / 保留最终判断</b><span>公开过错、支持外部接管与追责，保留伤害因果疑点，以及她今后改变和重新建立关系的可能。</span>';
    $('endingOptions').querySelector('[data-ending="release"]').innerHTML='<b>RELEASE / 公开断罪</b><span>承认她的真心与救援，仍判断反复替人决定已破坏信任，公开反对再由她独立承担安置。</span>';
  }
  function renderEndingResult(s){
    const hold=s.ending==='hold';
    $('endingResult').innerHTML='<span>'+(hold?'JUDGMENT RESERVED':'JUDGMENT RELEASED')+'</span><p>'+(hold?'主持人：过错需要公开，伤害需要继续查明。她曾会放手，也仍有人愿意来往；我不把这段人生封成一个永远没有以后的人。':'主持人：她真心照顾、真心爱过，救援也应完整播出。但她无权用自己的投入，替别人延长一个未经同意的以后。我反对再由她独立承担安置。')+'</p><p>'+(hold?'小春：那包针，她居然还留着。……我先问问她，什么时候有空。':'小春：那两张票也放进去吧。别只剩最后那封信。')+'</p><button id="endingPlay" class="ink-button">'+(hold?'ARCHIVE PREVIEW / 查看处决演出':'PLAY HER TAPE / 播放处决记录')+' ↗</button>';
    $('endingPlay').onclick=()=>launchCG(hold);
  }
  function onVerdict(choice,s){
    s.emotion=choice==='release'?'cry':'thoughtful';G.save();G.render();prepareEnding(s);G.closeDialog('ending');
    if(choice==='release')G.playConversation([{who:'主持人',text:'救人的记录会播出。那段恋爱、你没有去的培训、送纱纪上车的那天，也都会留下。'},{who:'小春',text:'那两张票也放进去吧。别只剩最后那封信。'},{who:'主持人',text:'它们都是真的。最后的判断，是我负责。'},{who:'小春',text:'钥匙先放你这里。我怕我又带回去。'},{who:'记录',text:'她遮住脸。那只杯子留在桌上，电话还没有拨出去。磁带开始等待播放。'}],{label:'AFTER THE VERDICT',portrait:'cry',after:()=>launchCG(false)});
    else G.playConversation([{who:'纱纪',text:'那包针还在。你什么时候来？'},{who:'小春',text:'我先问你有空的日子。……这次不先订了。'},{who:'奈央',text:'这个袋子我自己拿。别再替我留房间。'},{who:'小春',text:'好。杯子你要吗？'},{who:'记录',text:'她等对方回答，没有替她把杯子塞进袋里。门仍由外部接管，澪也仍没有来见她。'}],{label:'HOLD / 一个可以询问的以后',portrait:'letter',after:()=>G.openEnding()});
  }
  function launchCG(preview){previewing=preview;document.querySelectorAll('dialog[open]').forEach(node=>node.close());$('cgStatus').textContent=preview?'ARCHIVE PREVIEW / 不改变当前判断':'HER TAPE / THE THINGS SHE KEPT';$('cgScreen').hidden=false;$('app').inert=true;$('cgFrame').src='execution/index.html?chapter=01';document.body.classList.add('watching-cg');$('cgFrame').focus();}
  function exitCG(){const frame=$('cgFrame');try{frame.contentWindow.postMessage({channel:'dead-air-chapter',action:'pause'},'*');}catch(_){}frame.src='about:blank';$('cgScreen').hidden=true;$('app').inert=false;document.body.classList.remove('watching-cg');if(state().ending)G.openEnding();else G.render();}
  window.addEventListener('message',event=>{if($('cgScreen').hidden||event.source!==$('cgFrame').contentWindow||event.data?.channel!=='dead-air-chapter')return;if(event.data.event==='complete'){if(!previewing){state().cgWatched=true;G.save();}$('cgStatus').textContent='END OF TAPE / 记录已保存';}if(event.data.event==='ready')$('cgStatus').textContent=previewing?'ARCHIVE PREVIEW / 点击磁带放入':'HER TAPE / 点击磁带放入，播放记录';});
  window.ChapterExtension={portrait,render,sceneItems,layerUnlocked,onResult,onCollect,onConversationEnd,prepareEnding,renderEndingResult,onVerdict,talkToHer,setLayer};
  $('profileButton').onclick=()=>window.LifeUI.open();$('lifeLaneButton').onclick=()=>window.LifeUI.open();
  $('lifeHintButton').onclick=()=>openHint('life');
  $('hintButton').onclick=openHint;$('nextHint').onclick=()=>{hintLevel++;renderHint();};$('previewCG').onclick=()=>launchCG(true);$('exitCG').onclick=exitCG;
  document.querySelectorAll('#hintDialog [data-close]').forEach(button=>button.onclick=()=>G.closeDialog(button.dataset.close));
  document.addEventListener('keydown',event=>{if(event.ctrlKey||event.altKey||event.metaKey||/INPUT|TEXTAREA|SELECT/.test(event.target.tagName)||!$('titleScreen').hidden||!$('cgScreen').hidden||document.querySelector('dialog[open]'))return;if(event.key.toLowerCase()==='p'){event.preventDefault();window.LifeUI.open();}if(event.key.toLowerCase()==='h'){event.preventDefault();openHint();}});
  document.addEventListener('keydown',event=>{if(event.key.toLowerCase()==='h'&&!event.ctrlKey&&!event.altKey&&!event.metaKey&&!/INPUT|TEXTAREA|SELECT/.test(event.target.tagName)&&$('profileDialog').open&&!$('conversation').open&&!$('viewer').open&&!$('hintDialog').open){event.preventDefault();openHint('life');}});
  G.render();
})();
