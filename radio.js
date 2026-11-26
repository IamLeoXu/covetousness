(function(){
  'use strict';
  const G=window.ChapterGame,D=window.InquiryData,$=id=>document.getElementById(id),state=()=>G.getState(),P=window.Programme;
  const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const chapterVerdict=window.ChapterExtension.onVerdict,chapterEnding=window.ChapterExtension.prepareEnding;
  let sceneMode='intro',review=false,reviewStep=0,recording=false,audioContext=null,editPreview='',armed='',lastEditStamp='',previewMode='rundown',previewStamp='';
  const rs=()=>state().radio;
  const busy=()=>!$('radioScene').hidden;
  const firstFacts=()=>['afterCall','oldKeys','freeExit'].filter(id=>state().facts.includes(id));
  function sound(kind){
    if(!state().audio)return;
    try{
      if(!audioContext)audioContext=new (window.AudioContext||window.webkitAudioContext)();audioContext.resume().catch(()=>{});
      const t=audioContext.currentTime,notes=kind==='ring'?[659.25,880,659.25]:kind==='air'?[392,523.25,784]:[174.61,261.63,349.23];
      notes.forEach((hz,i)=>{const o=audioContext.createOscillator(),g=audioContext.createGain();o.type='sine';o.frequency.value=hz;g.gain.setValueAtTime(0,t+i*.12);g.gain.linearRampToValueAtTime(.018,t+i*.12+.01);g.gain.exponentialRampToValueAtTime(.0001,t+i*.12+.19);o.connect(g);g.connect(audioContext.destination);o.start(t+i*.12);o.stop(t+i*.12+.2);});
    }catch(_){}
  }
  function segmentFacts(id){return P.selected(state(),id).filter(item=>item.kind==='fact').map(item=>item.id);}
  function segmentReady(id){return P.choices(state(),id).length>0;}
  function segmentText(id){return P.body(state(),id);}
  function ordered(){return rs().order==='life-first'?['life','rumor','warning','rescue']:['rumor','warning','rescue','life'];}
  function segments(){return ordered().filter(id=>P.active(state()).includes(id)).map(id=>({id,title:D.radioSegments.find(item=>item.id===id).title,body:segmentText(id)}));}
  function fingerprint(){return JSON.stringify([rs().scope,rs().order,rs().lifeQuote,rs().queued,P.allCuts(state()),segments()]);}
  function hasSelected(){return segments().length>0;}
  function ready(){return !!(state().ending&&rs().phase==='archived')||hasSelected()&&rs().previewed===fingerprint();}
  function goal(){
    const r=rs();
    if(r.phase==='archived')return ['ARCHIVED / 本期版本已封存','可以回到原档继续取材；后来的发现不会倒写进刚才的节目。','rundown'];
    if(!r.introDone)return ['01:00 / AFTER HOURS · 开播前','接入值班线路。',null];
    if(r.tutorial==='log'&&!window.InvestigationEngine?.canAccess(state(),'rescue'))return ['继续采访 / 核对时间','问奈央当时何时报的警。她手里的受理回执可以对照这通电话。','inquiry'];
    if(r.tutorial==='log')return ['导播内线 / 先调首次报警记录','原通话在 22:19。点击右侧按钮去档案台，打开首次报警记录。','log'];
    if(r.tutorial==='argument'&&!r.lessonDismissed)return ['导播内线 / 录第一条 TAKE','进入编辑台后可自行选说法与来源；需要详细步骤时可打开 H 提示。','argument'];
    const nextQuestion=window.InvestigationEngine?.availableSteps(state())[0];if(nextQuestion)return ['继续采访 / '+nextQuestion.title,nextQuestion.question,'inquiry'];
    if(!G.progress().ready)return ['EDIT DESK / 来稿还在手边','沿采访桌的问题继续追问，或者打开人物侧写。','argument'];
    return [ready()?'CUE CONFIRMED / 可以准备收尾':'TAKE READY / 已有可用录音','R 可以整理本期；只有行为与人物链接起来，才能签发正式定性。零散稿件可作为摘要收尾。','rundown'];
  }
  function render(){
    const r=rs(),onAir=r.phase==='on-air',label=onAir?'ON AIR':recording&&r.phase!=='archived'?'REC':r.phase==='archived'?'ARCHIVED':'OFF AIR';
    $('broadcastStatus').textContent=label;$('app').dataset.broadcast=label.toLowerCase().replace(' ','-');
    const [task,note,cue]=goal();$('broadcastTask').textContent=task;$('broadcastNote').textContent=note;
    $('rundownCount').textContent=segments().length+' TRACKS';$('radioCueAction').hidden=!cue;
    $('radioCueAction').textContent={log:'调取报警记录 →',argument:'打开编辑台 →',inquiry:'接着问 →',life:'人物侧写 →',rundown:'打开播出单 / R →'}[cue]||'';
    $('radioCueAction').onclick=()=>{if(cue==='log'){window.ChapterExtension.setLayer('keys');document.querySelector('[data-location="archive"]').click();}if(cue==='argument')G.openBuilder();if(cue==='inquiry')window.InquiryUI.open();if(cue==='life')window.LifeUI.open();if(cue==='rundown')openRundown();};
    const lamp=document.querySelector('.header-actions .off-air');lamp.innerHTML='<i></i>'+label;
    document.querySelectorAll('[data-radio-guide]').forEach(node=>node.removeAttribute('data-radio-guide'));
    if(!window.Onboarding?.moduleNotes&&r.introDone&&r.tutorial==='log'){document.querySelector('[data-location="archive"]').dataset.radioGuide='next';const material=document.querySelector('[data-evidence="rescue"]');if(material)material.dataset.radioGuide='next';}
    if(!window.Onboarding?.moduleNotes&&r.introDone&&r.tutorial==='argument')$('buildButton').dataset.radioGuide='next';
    if($('rundownDialog').open)renderRundown();if($('builder').open)decorateBuilder();
  }
  function showScene(kind){sceneMode=kind;$('radioScene').hidden=false;$('app').inert=true;$('titleScreen').inert=true;document.body.classList.add('radio-scene-open');}
  function hideScene(){ $('radioScene').hidden=true;$('app').inert=false;$('titleScreen').inert=false;document.body.classList.remove('radio-scene-open'); }
  function prologueStep(){return review?reviewStep:rs().prologueStep;}
  function renderPrologue(){
    const step=Math.min(prologueStep(),D.radioColdOpen.length-1),scene=D.radioColdOpen[step];$('radioScene').dataset.kind=scene.kind;
    $('radioSceneStatus').textContent=review?'TONIGHT / REHEAR THE OPENING':'BEFORE THE RED LIGHT';$('radioSceneSkip').hidden=false;$('radioSceneSkip').textContent=review?($('titleScreen').hidden?'关闭开场 / 返回录音室':'返回标题 / 关闭开场'):'熟悉操作 / 跳过教学';
    $('radioStoryTime').textContent=scene.time;$('radioStoryTag').textContent=scene.tag;$('radioStoryTitle').textContent=scene.title;
    $('radioStoryBody').innerHTML=scene.body.map(text=>'<p>'+esc(text)+'</p>').join('');$('radioStoryFeedback').textContent='';$('radioStoryCount').textContent=String(step+1).padStart(2,'0')+' / '+String(D.radioColdOpen.length).padStart(2,'0');
    const gated=scene.kind==='cue'?'snippet':scene.kind==='original'?'call':null,known=!gated||state().collected.includes(gated);
    $('radioStoryNext').disabled=!known;$('radioStoryNext').textContent=scene.action+' →';
    $('radioStoryActions').innerHTML=scene.kind==='cue'?'<div class="radio-route"><button id="prologueCue"><b>CUE</b><span>先在本地预听</span></button><button id="prologueAir"><b>ON AIR</b><span>直接送往听众</span></button></div>':scene.kind==='original'?'<button id="prologueOriginal" class="secondary-button">CUE / 调出完整原通话 ↗</button>':'';
    if($('prologueCue'))$('prologueCue').onclick=()=>{sound('cue');G.openViewer('snippet');};
    if($('prologueAir'))$('prologueAir').onclick=()=>{$('radioStoryFeedback').textContent='导播内线：先别推红灯。片段还没有时间和受话人，送 CUE 看原件。';G.sound('paper');};
    if($('prologueOriginal'))$('prologueOriginal').onclick=()=>{sound('cue');G.openViewer('call');};
    const guest=scene.kind==='guest',incoming=scene.kind==='call';
    $('radioStoryArt').innerHTML=guest?'<img class="radio-guest" src="execution/assets/character/details/held-letter.png" alt="小春拿着信封的无五官剪影"><span>STUDIO A / VISITOR WAITING</span>':incoming?'<div class="radio-line-machine"><span>AFTER HOURS / LINE SELECT</span><b>02</b><div class="radio-line-leds"><i></i><i></i><i></i></div><strong>奈央 / 节目前确认</strong><small>11.20 · 授权文字转录</small><em>INCOMING CALL</em></div>':scene.kind==='cue'||scene.kind==='original'?'<div class="radio-packet"><img src="assets/tape-decal.png" alt="节目来稿封面"><span>AH / 001</span><b>'+(scene.kind==='cue'?'NINE SECONDS':'THE FULL CALL')+'</b><small>TEXT COPY / 11.16</small></div>':'<div class="radio-window-lettering"><span>107.9</span><b>AFTER<br>HOURS.</b><small>THE LAST ROOM WITH A LIGHT ON</small></div>';
    $('radioStoryNext').onclick=()=>{if(prologueStep()<D.radioColdOpen.length-1){if(review)reviewStep++;else rs().prologueStep++;G.save();renderPrologue();if(prologueStep()===1)sound('ring');}else finishPrologue(false);};
    const focus=known?$('radioStoryNext'):scene.kind==='cue'?$('prologueCue'):$('prologueOriginal');focus?.focus({preventScroll:true});
  }
  function openPrologue(rehear=false){review=rehear;reviewStep=0;showScene('intro');renderPrologue();sound('ident');}
  function finishPrologue(skip){
    if(review){hideScene();review=false;render();return;}
    rs().introDone=true;rs().prologueStep=D.radioColdOpen.length-1;
    rs().tutorial=skip||G.progress().first?'done':state().collected.includes('rescue')?'argument':'log';
    if(skip)window.Onboarding?.skip();
    G.save();hideScene();G.render();
    if(state().ending){G.openEnding();return;}
    G.playConversation(D.intro,{label:'STUDIO A / 来访',portrait:'keys',endText:'看看她带来的通话 →',after:()=>{if(!state().collected.includes('call'))G.openViewer('call');}});
  }
  function start(){
    if(rs().phase==='on-air'&&state().ending){transmit(state().ending,true);return true;}
    if(!rs().introDone){openPrologue(false);return true;}
    render();return false;
  }
  function onCollect(id){if(rs().introDone&&rs().tutorial==='log'&&id==='rescue')rs().tutorial='argument';}
  function onViewerClosed(){if(busy()&&sceneMode==='intro')renderPrologue();render();}
  function onResult(result){if(result.fact&&['oldKeys','freeExit','afterCall'].includes(result.fact)){rs().firstFact=result.fact;rs().tutorial='done';}}
  function onConversation(value){recording=value;render();}
  function hint(){
    if(rs().tutorial==='log')return ['导播内线 / 第一条录音',['去台内档案，打开首次报警记录。原通话在 22:19，报警在 22:13。','然后按 B 比较原件，依据受话人与两个时刻组合追问。']];
    if(rs().tutorial==='argument'&&!rs().lessonDismissed)return ['推理台 / 核对原件与时间',['选“别走发生在事故后，说给安置站值班员”。','把原通话和首次报警记录放进来源位。','点击“推理 / 提出追问”，听她回答。']];
    if(G.progress().ready)return ['值班编排 / 可以现在收尾',['R 打开播出单，任选一条可用 TAKE 收进待播轨。','CUE 确认后检查论证链。正式结局需相关两段人生和一条关系，无需六段全收集。','继续调查可回采访桌接着问；P 核对经历，手动拼合相关两片，选择正反侧写。']];return null;
  }
  function editFingerprint(){const b=state().builder;return JSON.stringify([b.topic,b.claim,[...b.selected].sort()]);}
  function canRecord(){return !!state().builder.claim&&state().builder.selected.length>0;}
  function decorateBuilder(){
    const b=state().builder;$('editCoach').hidden=true;
    $('submitArgument').disabled=!b.claim||!b.selected.length;
    $('submitArgument').innerHTML='推理 / 提出追问 <span>↗</span>';
  }
  function archived(){return rs().phase==='archived'&&!!state().ending;}
  function openRundown(){renderRundown();G.openDialog('rundownDialog');}
  function cutPicker(segment,library,keep,locked,expanded){
    if(!library.length)return '';
    const row=item=>'<div class="cut-row '+(!item.eligible?'needs-portrait':'')+'"><label><input type="checkbox" data-pgm-cut="'+item.key+'" data-pgm-track="'+segment.id+'" '+(keep.includes(item.key)?'checked ':'')+(locked||!item.eligible?'disabled':'')+'><span><b>'+esc(item.title)+'</b><small>'+esc(item.role)+(item.sources.length?' · 依据：'+esc(item.sources.map(P.title).join(' ＋ ')):'')+'</small></span></label></div>';
    let content;
    if(segment.id==='life'){
      const links=library.filter(item=>item.kind==='link'),events=library.filter(item=>item.kind==='event');
      content='<p class="life-task-split"><b>这里选播哪一种人物解读。</b><br>拼图确认过的经历可以反复选用。勾选一条解读，相关两段一起成为依据。</p>'+links.map(item=>'<div class="cut-row relation-cut '+(!item.eligible?'needs-portrait':'')+'"><label><input type="checkbox" data-pgm-cut="'+item.key+'" data-pgm-track="life" '+(keep.includes(item.key)?'checked ':'')+(locked||!item.eligible?'disabled':'')+'><span><b>'+esc(item.title.replace('人物推断 / ',''))+'</b><small>'+esc(item.body)+'</small></span></label><div class="chain-evidence">'+item.pair.map(id=>'<span>↳ '+esc(library.find(e=>e.key==='event:'+id)?.title||id)+'</span>').join('')+'</div>'+(item.eligible?'<button class="text-button" data-use-chain="'+item.id+'" '+(locked?'disabled':'')+'>本期采用这条侧写 →</button>':'<small>在人物拼图放好这两段，确认年代。</small>')+'</div>').join('')+(!links.length?'<p class="empty-note">尚未核实人物关系。可以继续人物取材与拼图，也可以只播已有片段。</p>':'')+'<details class="cut-fragments"><summary>只播散段摘要 / 不构成人物解读 ↓</summary><p class="life-task-split">单独勾选经历只作为摘要。取消一条解读会保留它的两段经历，可在此取消；调查结果始终保留。</p>'+events.map(row).join('')+'</details>';
    }else content=library.map(row).join('');
    return '<details class="cut-library" data-cut-picker="'+segment.id+'" '+(expanded?'open':'')+'><summary>素材库 · '+(segment.id==='life'?'人物解读与散段摘要':library.length+' 条已核实推论')+' · 已选 '+keep.length+' 项 <span>展开更换 ↓</span></summary><div class="cut-library-items">'+content+'</div>'+(!locked&&library.some(item=>!item.eligible)?'<button class="secondary-button" data-confirm-portrait>人物拼图 / 确认相应片段 →</button>':'')+'</details>';
  }
  function renderRundown(){
    const fragmentsOpen=!!document.querySelector('.cut-fragments[open]');
    const s=state(),r=rs(),locked=archived(),source=locked?(r.editorialSnapshot||s):s,openTracks=new Set([...document.querySelectorAll('[data-cut-picker][open]')].map(el=>el.dataset.cutPicker)),scroll=$('rundownDialog').querySelector('.rundown-scroll'),scrollTop=scroll.scrollTop;
    $('rundownSegments').innerHTML=D.radioSegments.map(segment=>{
      const recorded=locked?r.airScript?.find(part=>part.id===segment.id):null,library=P.library(source,segment.id),eligible=library.filter(item=>item.eligible),keep=P.keys(source,segment.id),available=locked?!!recorded:eligible.length>0,queued=locked?!!recorded:r.queued.includes(segment.id);
      const picker=cutPicker(segment,library,keep,locked,openTracks.has(segment.id));
      const text=locked?(recorded?.body||'本期未采用此轨。原件仍在台内。'):keep.length?P.body(s,segment.id):available?'展开素材库，选择已经得到的推论或人物片段。更换只需重新 CUE，不必重推或重访。':segment.need;
      return '<article class="rundown-card '+(available?'available':'waiting')+(queued?' queued':'')+'"><span class="rundown-code">'+segment.code+'</span><div class="rundown-card-copy"><h3>'+esc(segment.title)+'</h3><p>'+esc(text)+'</p><small>'+(queued?(keep.length?'PGM / 采用 '+keep.length+' 条':'PGM / 尚未选择内容'):available?'LIBRARY / 可反复取用':'SOURCE / 继续调查或确认侧写')+'</small>'+picker+'</div><button data-queue="'+segment.id+'" '+(locked?'disabled':'')+'>'+(queued?'断开本轨':available?'接入 PGM ＋':'去取材 ↗')+'</button></article>';
    }).join('');
    const fragments=document.querySelector('.cut-fragments');if(fragments)fragments.open=fragmentsOpen;
    $('rundownSegments').querySelectorAll('[data-queue]').forEach(button=>button.onclick=()=>{
      const id=button.dataset.queue;if(!segmentReady(id)){G.closeDialog('rundownDialog');if(id==='life')window.LifeUI.open('portrait');else window.ChapterExtension.setLayer(id==='rumor'?'keys':id==='warning'?'notice':'rescue');return;}
      if(!P.connect(s,id)){G.notify('先在本轨素材库中勾选要采用的内容。');return;}G.save();G.sound('click');render();
    });
    $('rundownSegments').querySelectorAll('[data-pgm-cut]').forEach(input=>input.onchange=()=>{P.toggle(s,input.dataset.pgmTrack,input.dataset.pgmCut,input.checked);if(input.checked&&!r.queued.includes(input.dataset.pgmTrack))r.queued.push(input.dataset.pgmTrack);if(!P.keys(s,input.dataset.pgmTrack).length)r.queued=r.queued.filter(id=>id!==input.dataset.pgmTrack);G.save();renderRundown();});
    $('rundownSegments').querySelectorAll('[data-use-chain]').forEach(button=>button.onclick=()=>{if(P.useRelation(s,button.dataset.useChain)){G.save();G.sound('paper');renderRundown();}});
    $('rundownSegments').querySelectorAll('[data-confirm-portrait]').forEach(button=>button.onclick=()=>{G.closeDialog('rundownDialog');window.LifeUI.open('portrait');});
    $('rundownOrder').querySelectorAll('[data-radio-order]').forEach(button=>{button.classList.toggle('active',button.dataset.radioOrder===r.order);button.disabled=locked;button.onclick=()=>{r.order=button.dataset.radioOrder;r.previewed='';G.save();renderRundown();};});
    document.querySelectorAll('[name="scope"]').forEach(input=>{input.checked=input.value===r.scope;input.disabled=locked;input.onchange=()=>{r.scope=input.value;r.previewed='';G.save();renderRundown();};});
    const pieces=P.selected(source,'life').filter(item=>item.kind==='event'&&(source.lifeSolved||[]).includes(item.id));
    if(pieces.length&&!pieces.some(item=>item.id===r.lifeQuote))r.lifeQuote=pieces[0].id;
    $('rundownRead').disabled=locked?!r.airScript?.length:!hasSelected();$('rundownArm').disabled=!ready();$('rundownArm').textContent=locked?'回到本期结尾 →':'检查本期论证 / 最后一句 ↗';
    $('rundownNewDraft').hidden=!locked;$('rundownNewDraft').onclick=newDraft;
    $('rundownReadyNote').textContent=locked?'这一版已封存。可以用同一素材库另编一版；之前的记录和磁带解锁会保留。':!hasSelected()?'选择已有素材，再接入至少一轨。推论、补访和人物关系都会保留，不需要重做。':r.previewed!==fingerprint()?'本期采用 '+segments().length+' 轨。更换内容后重新 CUE 核对；不需要重录已核实的内容。':'CUE 已确认。本次审判只使用本期真正选入的推论与人物链。';
    renderPortraitReading(source,locked);$('rundownCount').textContent=segments().length+' TRACKS';scroll.scrollTop=scrollTop;window.Onboarding?.refresh();
  }
  function renderPortraitReading(source,locked){
    let node=$('portraitJudgment');if(!node){node=document.createElement('section');node.id='portraitJudgment';node.className='portrait-reading';$('rundownSegments').after(node);}
    const side=source.portraitSide||'front';
    node.innerHTML='<h3>同一段人生，你采用哪一面？</h3><p>拼图保存经历。这里的读法将写进 B 轨，成为你给她下判断的依据。</p><div>'+[['front','正面 / 她曾怎样爱人'],['back','反面 / 她怎样留住别人']].map(([id,text])=>'<button data-portrait-reading="'+id+'" class="'+(side===id?'active':'')+'" '+(locked?'disabled':'')+'>'+text+'</button>').join('')+'</div>';
    node.querySelectorAll('[data-portrait-reading]').forEach(button=>button.onclick=()=>{state().portraitSide=button.dataset.portraitReading;rs().previewed='';G.save();renderRundown();});
  }
  function newDraft(){if(!P.newDraft(state()))return;G.closeDialog('ending');G.save();G.render();openRundown();G.notify('已用现有素材开启新编排。上版记录与磁带权限保留，不必重推或重访。');}
  function useFact(id){
    if(archived()){openRundown();G.notify('本期已封存，先点“用现有素材重新编排一版”。');return false;}
    const track=Object.keys(P.sets).find(track=>P.sets[track].includes(id));if(!track||!state().facts.includes(id))return false;
    P.toggle(state(),track,'fact:'+id,true);if(!rs().queued.includes(track))rs().queued.push(track);G.save();G.render();G.notify('已采用到 '+D.radioSegments.find(item=>item.id===track).code+'。可在播出单自由更换，无需重推。');return true;
  }
  function useRelation(id){
    if(archived()){openRundown();return false;}
    if(!P.useRelation(state(),id)){G.notify('这条关系已保留。在人物拼图确认相应经历，即可从 B 素材库采用。');return false;}
    G.save();G.render();G.notify('相关两段经历与人物推断已采用到 B，可在播出单更换。');return true;
  }
  function openScript(){
    previewMode='rundown';previewStamp=fingerprint();const items=archived()&&rs().airScript?.length?rs().airScript:segments();
    $('radioScriptBody').innerHTML=items.map((item,i)=>'<article><span>'+String(i+1).padStart(2,'0')+' / '+esc(item.title)+'</span><p>'+esc(item.body)+'</p></article>').join('')+(!archived()?'<p class="radio-script-last">最后一句尚未署名。下一页会检查行为与人物逻辑链，再决定是否能够定性。</p>':'');
    $('radioScriptConfirm').textContent=archived()?'返回本期记录 →':'确认这份编排 / 返回播出单 →';G.openDialog('radioScript');sound('cue');
  }
  function confirmScript(){if(previewMode==='edit'){if(previewStamp===editFingerprint())editPreview=previewStamp;G.closeDialog('radioScript');G.renderBuilder();return;}if(hasSelected()&&!archived()&&previewStamp===fingerprint())rs().previewed=previewStamp;G.save();G.closeDialog('radioScript');renderRundown();}
  function guardEnding(){if(ready())return true;openRundown();return false;}
  function airScript(choice){
    const body=D.judgmentEditorial[choice];
    return [{id:'ident',title:'01:00 / AFTER HOURS',body:'这里是 AFTER HOURS，FM 107.9。今晚的来访者是小春。以下采用本期播出单中的原件与采访文字转录。'},...segments(),{id:'editorial',title:choice==='zero'?'本期摘要 / 没有定性':'最后一句 / 你给她的定义',body}];
  }
  function renderTransmission(){
    const r=rs(),script=r.airScript,index=Math.min(r.transmitIndex,script.length-1),item=script[index];$('radioScene').dataset.kind='broadcast';$('radioSceneStatus').textContent='ON AIR / 本期播出转录';$('radioSceneSkip').hidden=true;
    $('radioStoryTime').textContent='01:00';$('radioStoryTag').textContent=index===script.length-1?'THE LAST SENTENCE / YOUR SIGNATURE':'PROGRAMME / '+(r.order==='life-first'?'先人后事':'先事后人');$('radioStoryTitle').textContent=item.title;$('radioStoryBody').innerHTML='<p class="radio-on-air-copy">'+esc(item.body)+'</p>';$('radioStoryActions').innerHTML='';$('radioStoryFeedback').textContent='导播：红灯已亮。这一版的原稿与来源会一并归档。';$('radioStoryCount').textContent=String(index+1).padStart(2,'0')+' / '+String(script.length).padStart(2,'0');$('radioStoryNext').disabled=false;$('radioStoryNext').textContent=index===script.length-1?'播出结束 / 切回录音室 →':'播出下一段 →';
    $('radioStoryArt').innerHTML='<div class="radio-air-sign"><i></i><span>ON AIR</span><b>AFTER HOURS</b><small>FM 107.9 / RECORD 001</small></div><div class="radio-air-progress">'+script.map((part,i)=>'<span class="'+(i<=index?'played':'')+'">'+esc(part.id==='life'?'B':part.id==='editorial'?'END':part.id==='ident'?'ID':D.radioSegments.find(segment=>segment.id===part.id).code)+'</span>').join('')+'</div>';
    $('radioStoryNext').onclick=()=>{if(r.transmitIndex<script.length-1){r.transmitIndex++;G.save();renderTransmission();}else finishTransmission();};
    $('radioStoryNext').focus({preventScroll:true});window.Onboarding?.refresh();
  }
  function transmit(choice,resume=false){document.querySelectorAll('dialog[open]').forEach(node=>node.close());if(!resume||!rs().airScript?.length){rs().airScript=airScript(choice);rs().transmitIndex=0;rs().editorialSnapshot=P.freeze(state(),choice,rs().airScript);}rs().phase='on-air';rs().airedEnding=choice;G.save();window.Onboarding?.event('transmit',{choice});showScene('air');renderTransmission();render();sound('air');}
  function finishTransmission(){const choice=state().ending;rs().phase='archived';P.archive(state());G.save();hideScene();render();chapterVerdict(choice,state());}
  window.ChapterExtension.onVerdict=(choice)=>transmit(choice);
  window.ChapterExtension.prepareEnding=(s)=>{chapterEnding(s);$('ending').querySelector('.dialog-bar>span').textContent=archived()?'AFTER HOURS / ARCHIVED BROADCAST':'ON AIR / YOU SIGN THE LAST SENTENCE';if(!s.ending)$('ending').querySelector('h2').innerHTML='材料已在待播盘。<br>最后一句，怎么说？';};
  $('rundownButton').onclick=openRundown;$('rundownRead').onclick=openScript;$('radioScriptConfirm').onclick=confirmScript;$('rundownArm').onclick=()=>{G.closeDialog('rundownDialog');G.openEnding();};$('radioSceneSkip').onclick=()=>finishPrologue(true);
  const rehear=document.createElement('button');rehear.id='rehearOpening';rehear.className='radio-rehear';rehear.textContent='重听本期开场 / 电台与前情';rehear.onclick=()=>openPrologue(true);document.querySelector('.title-copy').append(rehear);
  const rehearMenu=document.createElement('button');rehearMenu.id='rehearFromMenu';rehearMenu.className='text-button';rehearMenu.textContent='重听本期开场';rehearMenu.onclick=()=>{G.closeDialog('helpDialog');openPrologue(true);};document.querySelector('.chapter-help-links').append(rehearMenu);
  $('startButton').firstChild.nodeValue='TAKE THE NIGHT SHIFT ';document.querySelector('.title-control-hint').textContent='来访 · 追问取证 · 人物拼图 · 最后的审判';document.querySelector('.title-bottom span:last-child').textContent='CHAPTER BUILD / '+D.version+'';
  document.addEventListener('keydown',event=>{if(!busy()||document.querySelector('dialog[open]'))return;if(event.key==='Enter'&&!event.target.closest('button')&&!$('radioStoryNext').disabled){event.preventDefault();$('radioStoryNext').click();}if(event.key==='Escape'&&review)finishPrologue(true);if(!event.target.closest('button')||!['Enter',' '].includes(event.key))event.stopImmediatePropagation();},true);
  document.addEventListener('keydown',event=>{if(event.key.toLowerCase()!=='r'||event.ctrlKey||event.altKey||event.metaKey||/INPUT|TEXTAREA|SELECT/.test(event.target.tagName)||!$('titleScreen').hidden||busy()||!$('cgScreen').hidden||document.querySelector('dialog[open]'))return;event.preventDefault();openRundown();});
  window.Radio={start,render,onCollect,onResult,onViewerClosed,onConversation,guardEnding,ready,busy,openRundown,openPrologue,hint,decorateBuilder,canRecord,newDraft,useFact,useRelation};
  G.render();
})();
