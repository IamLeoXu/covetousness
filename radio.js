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
    if(r.tutorial==='log')return ['导播内线 / 先调首次报警记录','原通话在 22:19。点击右侧按钮去档案台，打开首次报警记录。','log'];
    if(r.tutorial==='argument'&&!r.lessonDismissed)return ['导播内线 / 录第一条 TAKE','进入编辑台后可自行选说法与来源；需要详细步骤时可打开 H 提示。','argument'];
    if(!G.progress().ready)return ['EDIT DESK / 来稿还在手边','核对一项说法，或从私人档案采用一块人物侧写。','argument'];
    return [ready()?'CUE CONFIRMED / 可以准备收尾':'TAKE READY / 已有可用录音','R 可以整理本期；只有行为与人物链接起来，才能签发正式定性。零散稿件可作为摘要收尾。','rundown'];
  }
  function render(){
    const r=rs(),onAir=r.phase==='on-air',label=onAir?'ON AIR':recording&&r.phase!=='archived'?'REC':r.phase==='archived'?'ARCHIVED':'OFF AIR';
    $('broadcastStatus').textContent=label;$('app').dataset.broadcast=label.toLowerCase().replace(' ','-');
    const [task,note,cue]=goal();$('broadcastTask').textContent=task;$('broadcastNote').textContent=note;
    $('rundownCount').textContent=segments().length+' TRACKS';$('radioCueAction').hidden=!cue;
    $('radioCueAction').textContent={log:'调取报警记录 →',argument:'打开编辑台 →',life:'继续人生补访 →',rundown:'打开播出单 / R →'}[cue]||'';
    $('radioCueAction').onclick=()=>{if(cue==='log'){window.ChapterExtension.setLayer('keys');document.querySelector('[data-location="archive"]').click();}if(cue==='argument')G.openBuilder();if(cue==='life')window.LifeUI.open();if(cue==='rundown')openRundown();};
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
    const step=prologueStep(),scene=D.radioColdOpen[step];$('radioScene').dataset.kind=scene.kind;
    $('radioSceneStatus').textContent=review?'TONIGHT / REHEAR THE OPENING':'BEFORE THE RED LIGHT';$('radioSceneSkip').hidden=false;$('radioSceneSkip').textContent=review?($('titleScreen').hidden?'关闭开场 / 返回录音室':'返回标题 / 关闭开场'):'熟悉操作 / 跳过教学';
    $('radioStoryTime').textContent=scene.time;$('radioStoryTag').textContent=scene.tag;$('radioStoryTitle').textContent=scene.title;
    $('radioStoryBody').innerHTML=scene.body.map(text=>'<p>'+esc(text)+'</p>').join('');$('radioStoryFeedback').textContent='';$('radioStoryCount').textContent=String(step+1).padStart(2,'0')+' / 05';
    const gated=scene.kind==='cue'?'snippet':scene.kind==='original'?'call':null,known=!gated||state().collected.includes(gated);
    $('radioStoryNext').disabled=!known;$('radioStoryNext').textContent=scene.action+' →';
    $('radioStoryActions').innerHTML=scene.kind==='cue'?'<div class="radio-route"><button id="prologueCue"><b>CUE</b><span>先在本地预听</span></button><button id="prologueAir"><b>ON AIR</b><span>直接送往听众</span></button></div>':scene.kind==='original'?'<button id="prologueOriginal" class="secondary-button">CUE / 调出完整原通话 ↗</button>':'';
    if($('prologueCue'))$('prologueCue').onclick=()=>{sound('cue');G.openViewer('snippet');};
    if($('prologueAir'))$('prologueAir').onclick=()=>{$('radioStoryFeedback').textContent='导播内线：先别推红灯。片段还没有时间和受话人，送 CUE 看原件。';G.sound('paper');};
    if($('prologueOriginal'))$('prologueOriginal').onclick=()=>{sound('cue');G.openViewer('call');};
    const guest=scene.kind==='guest',incoming=scene.kind==='call';
    $('radioStoryArt').innerHTML=guest?'<img class="radio-guest" src="execution/assets/character/details/held-letter.png" alt="小春拿着信封的无五官剪影"><span>STUDIO A / VISITOR WAITING</span>':incoming?'<div class="radio-line-machine"><span>AFTER HOURS / LINE SELECT</span><b>02</b><div class="radio-line-leds"><i></i><i></i><i></i></div><strong>奈央 / 节目前确认</strong><small>11.20 · 授权文字转录</small><em>INCOMING CALL</em></div>':scene.kind==='cue'||scene.kind==='original'?'<div class="radio-packet"><img src="assets/tape-decal.png" alt="节目来稿封面"><span>AH / 001</span><b>'+(scene.kind==='cue'?'NINE SECONDS':'THE FULL CALL')+'</b><small>TEXT COPY / 11.16</small></div>':'<div class="radio-window-lettering"><span>107.9</span><b>AFTER<br>HOURS.</b><small>THE LAST ROOM WITH A LIGHT ON</small></div>';
    $('radioStoryNext').onclick=()=>{if(prologueStep()<4){if(review)reviewStep++;else rs().prologueStep++;G.save();renderPrologue();if(prologueStep()===1)sound('ring');}else finishPrologue(false);};
    const focus=known?$('radioStoryNext'):scene.kind==='cue'?$('prologueCue'):$('prologueOriginal');focus?.focus({preventScroll:true});
  }
  function openPrologue(rehear=false){review=rehear;reviewStep=0;showScene('intro');renderPrologue();sound('ident');}
  function finishPrologue(skip){
    if(review){hideScene();review=false;render();return;}
    rs().introDone=true;rs().prologueStep=4;
    rs().tutorial=skip||G.progress().first?'done':state().collected.includes('rescue')?'argument':'log';
    if(skip)window.Onboarding?.skip();
    G.save();hideScene();G.render();
    if(state().ending){G.openEnding();return;}
    G.playConversation(D.intro,{label:'STUDIO A / PRE-INTERVIEW · NOT ON AIR',portrait:'keys'});
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
    if(rs().tutorial==='argument'&&!rs().lessonDismissed)return ['编辑台 / 核对原件与时间',['选“别走发生在事故后，说给安置站值班员”。','点击原通话和首次报警记录，分别进入两个来源位。','点 CUE 核对两份转录，确认后点 ARM，再点 REC。听完回答就得到第一条 TAKE。']];
    if(G.progress().ready)return ['值班编排 / 可以现在收尾',['R 打开播出单，任选一条可用 TAKE 收进待播轨。','CUE 确认后检查论证链。正式结局需相关两段人生和一条关系，无需六段全收集。','若想继续调查，翻阅原件底部的附页与附件号；P 可以采用局部侧写，也可以做更长的交叉补访。']];return null;
  }
  function editFingerprint(){const b=state().builder;return JSON.stringify([b.topic,b.claim,[...b.selected].sort()]);}
  function canRecord(){return armed===editFingerprint()&&editPreview===editFingerprint();}
  function decorateBuilder(){
    const b=state().builder,stamp=editFingerprint(),guided=rs().tutorial==='argument'&&!rs().lessonDismissed;
    if(lastEditStamp!==stamp){editPreview='';armed='';lastEditStamp=stamp;}
    if(armed!==stamp)armed='';
    const has=b.claim&&b.selected.length,previewed=has&&editPreview===stamp;
    $('editCue').disabled=!has;$('editArm').disabled=!previewed;$('editArm').classList.toggle('armed',canRecord());$('editArm').setAttribute('aria-pressed',String(canRecord()));
    $('submitArgument').disabled=!has||!canRecord();$('submitArgument').innerHTML='REC / TAKE <span>●</span>';$('editTakeState').textContent=canRecord()?'REC READY':previewed?'CUE OK':'SAFE';
    $('editCue').onclick=()=>{previewMode='edit';previewStamp=stamp;const claim=D.topics.flatMap(t=>t.claims).find(item=>item.id===b.claim);$('radioScriptBody').innerHTML='<article><span>QUESTION BUS / 待录追问</span><p>'+esc(claim.text)+'</p></article>'+b.selected.map((id,i)=>{const item=D.evidence[id]||D.facts[id];return '<article><span>SOURCE '+(i+1)+' / '+esc(item.title)+'</span><p>'+esc(item.lead||item.body||'')+'</p>'+(item.transcript||item.rows||[]).map(([who,text])=>'<p><b>'+esc(who)+'</b> '+esc(text)+'</p>').join('')+(item.paragraphs||[]).map(text=>'<p>'+esc(text)+'</p>').join('')+'</article>';}).join('');$('radioScriptConfirm').textContent='CUE OK / 确认来源，返回编辑台 →';G.openDialog('radioScript');sound('cue');};
    $('editArm').onclick=()=>{armed=canRecord()?'':editFingerprint();G.sound('click');decorateBuilder();};
    document.querySelectorAll('[data-coach-target]').forEach(node=>node.removeAttribute('data-coach-target'));
    if(!guided||window.Onboarding?.moduleNotes){$('editCoach').hidden=true;return;}
    let step=1,target='[data-claim="afterCall"]',text='先选择追问：“别走”发生在事故后，说给安置站值班员。';
    if(b.claim==='afterCall'){step=2;target='[data-select="call"]';text='点击“原通话”，把 22:19 的受话人与原话送进来源位。';
      if(b.selected.includes('call')){step=3;target='[data-select="rescue"]';text='再点击“首次报警记录”，把 22:13 放入第二个来源位。';
        if(b.selected.includes('rescue')){step=4;target='#editCue';text='两份时间都有了。点击 CUE，核对这条追问实际采用的两份转录。';if(previewed){step=5;target='#editArm';text='来源已经预听。按 ARM，让采访录音待命；现在仍未向听众播出。';if(canRecord()){step=6;target='#submitArgument';text='按 REC / TAKE，向小春提出这条组合追问，录下她的回应。';}}}
      }
    }
    if(b.selected.some(id=>!['call','rescue'].includes(id))){text='这次先只保留原通话和首次报警记录。点多余的来源位可取下它，再继续便签步骤。';target='#evidenceSlots';}
    $('editCoach').hidden=false;$('editCoach').innerHTML='<div><span>PRODUCER / FIRST TAKE · '+step+' / 6</span><p>'+esc(text)+'</p></div><button id="coachLocate" class="secondary-button">定位下一步 ↓</button><button id="coachDismiss" class="text-button">我自己操作</button>';
    const node=document.querySelector(target);if(node)node.dataset.coachTarget='next';
    $('coachLocate').onclick=()=>{if(!node){const source=step===2?'call':'rescue';G.openViewer(source);return;}node.scrollIntoView({block:'center',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});node.focus({preventScroll:true});};
    $('coachDismiss').onclick=()=>{rs().lessonDismissed=true;G.save();decorateBuilder();};
  }
  function archived(){return rs().phase==='archived'&&!!state().ending;}
  function openRundown(){renderRundown();G.openDialog('rundownDialog');}
  function cutPicker(segment,library,keep,locked,expanded){
    if(!library.length)return '';
    const row=item=>'<div class="cut-row '+(!item.eligible?'needs-portrait':'')+'"><label><input type="checkbox" data-pgm-cut="'+item.key+'" data-pgm-track="'+segment.id+'" '+(keep.includes(item.key)?'checked ':'')+(locked||!item.eligible?'disabled':'')+'><span><b>'+esc(item.title)+'</b><small>'+esc(item.role)+(item.sources.length?' · 依据：'+esc(item.sources.map(P.title).join(' ＋ ')):'')+'</small></span></label></div>';
    let content;
    if(segment.id==='life'){
      const links=library.filter(item=>item.kind==='link'),events=library.filter(item=>item.kind==='event');
      content='<p class="life-task-split"><b>这里选播哪一种人物解读。</b><br>拼图已核对的年代不会重做。勾选一条解读，相关两段经历自动成为它的依据。</p>'+links.map(item=>'<div class="cut-row relation-cut '+(!item.eligible?'needs-portrait':'')+'"><label><input type="checkbox" data-pgm-cut="'+item.key+'" data-pgm-track="life" '+(keep.includes(item.key)?'checked ':'')+(locked||!item.eligible?'disabled':'')+'><span><b>'+esc(item.title.replace('人物推断 / ',''))+'</b><small>'+esc(item.body)+'</small></span></label><div class="chain-evidence">'+item.pair.map(id=>'<span>↳ '+esc(library.find(e=>e.key==='event:'+id)?.title||id)+'</span>').join('')+'</div>'+(item.eligible?'<button class="text-button" data-use-chain="'+item.id+'" '+(locked?'disabled':'')+'>本期 B 只采用这一条解读 →</button>':'<small>先在拼图核对这两段的年代。</small>')+'</div>').join('')+(!links.length?'<p class="empty-note">尚未核实人物关系。可以去“关系连接”，也可以只播散段摘要。</p>':'')+'<details class="cut-fragments"><summary>只播散段摘要 / 不构成人物解读 ↓</summary><p class="life-task-split">单独勾选经历只作为摘要。取消一条解读会保留它的两段经历，可在此取消；取材和年代记录始终保留。</p>'+events.map(row).join('')+'</details>';
    }else content=library.map(row).join('');
    return '<details class="cut-library" data-cut-picker="'+segment.id+'" '+(expanded?'open':'')+'><summary>素材库 · '+(segment.id==='life'?'人物解读与散段摘要':library.length+' 条已核实推论')+' · 已选 '+keep.length+' 项 <span>展开更换 ↓</span></summary><div class="cut-library-items">'+content+'</div>'+(!locked&&library.some(item=>!item.eligible)?'<button class="secondary-button" data-confirm-portrait>到拼图核对相关经历的年代 →</button>':'')+'</details>';
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
    $('rundownSegments').querySelectorAll('[data-pgm-cut]').forEach(input=>input.onchange=()=>{P.toggle(s,input.dataset.pgmTrack,input.dataset.pgmCut,input.checked);G.save();renderRundown();});
    $('rundownSegments').querySelectorAll('[data-use-chain]').forEach(button=>button.onclick=()=>{if(P.useRelation(s,button.dataset.useChain)){G.save();G.sound('paper');renderRundown();}});
    $('rundownSegments').querySelectorAll('[data-confirm-portrait]').forEach(button=>button.onclick=()=>{G.closeDialog('rundownDialog');window.LifeUI.open('portrait');});
    $('rundownOrder').querySelectorAll('[data-radio-order]').forEach(button=>{button.classList.toggle('active',button.dataset.radioOrder===r.order);button.disabled=locked;button.onclick=()=>{r.order=button.dataset.radioOrder;r.previewed='';G.save();renderRundown();};});
    document.querySelectorAll('[name="scope"]').forEach(input=>{input.checked=input.value===r.scope;input.disabled=locked;input.onchange=()=>{r.scope=input.value;r.previewed='';G.save();renderRundown();};});
    const pieces=P.selected(source,'life').filter(item=>item.kind==='event'&&(source.lifeSolved||[]).includes(item.id));
    if(pieces.length&&!pieces.some(item=>item.id===r.lifeQuote))r.lifeQuote=pieces[0].id;
    $('rundownRead').disabled=locked?!r.airScript?.length:!hasSelected();$('rundownArm').disabled=!ready();$('rundownArm').textContent=locked?'回到本期结尾 →':'检查本期论证 / 最后一句 ↗';
    $('rundownNewDraft').hidden=!locked;$('rundownNewDraft').onclick=newDraft;
    $('rundownReadyNote').textContent=locked?'这一版已封存。可以用同一素材库另编一版；之前的记录和磁带解锁会保留。':!hasSelected()?'选择已有素材，再接入至少一轨。推论、补访和人物关系都会保留，不需要重做。':r.previewed!==fingerprint()?'本期采用 '+segments().length+' 轨。更换内容后重新 CUE 核对；不需要重录已核实的内容。':'CUE 已确认。本次审判只使用本期真正选入的推论与人物链。';
    $('rundownCount').textContent=segments().length+' TRACKS';scroll.scrollTop=scrollTop;window.Onboarding?.refresh();
  }
  function newDraft(){if(!P.newDraft(state()))return;G.closeDialog('ending');G.save();G.render();openRundown();G.notify('已用现有素材开启新编排。上版记录与磁带权限保留，不必重推或重访。');}
  function useFact(id){
    if(archived()){openRundown();G.notify('本期已封存，先点“用现有素材重新编排一版”。');return false;}
    const track=Object.keys(P.sets).find(track=>P.sets[track].includes(id));if(!track||!state().facts.includes(id))return false;
    P.toggle(state(),track,'fact:'+id,true);if(!rs().queued.includes(track))rs().queued.push(track);G.save();G.render();G.notify('已采用到 '+D.radioSegments.find(item=>item.id===track).code+'。可在播出单自由更换，无需重推。');return true;
  }
  function useRelation(id){
    if(archived()){openRundown();return false;}
    if(!P.useRelation(state(),id)){G.notify('这条关系已保留。先在拼图确认相关两段的日期，即可从 B 素材库采用。');return false;}
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
    const body=choice==='zero'?'这里是本期已经核实的摘要。现有材料尚未接成能够对她定性的论证。本次值班结束，调查原件留在台内。':choice==='good'?'我承认她在告知上的责任，也保留伤者仍在承受的后果。但从她实际返身的选择、当时所知的信息与那些真实关系里，我仍然认定：她是个值得相信的人。这个判断，由我署名。':'我依据她已知却未完整传达的危险、安置款的选择，以及她把投入与未结束的安排留给对方的人物链，认定她把自己的需要置于别人的选择之前。我给她下的定义是：不值得托付。这由我署名。';
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
  $('startButton').firstChild.nodeValue='TAKE THE NIGHT SHIFT ';document.querySelector('.title-control-hint').textContent='一夜电台 · 来稿核实 · 人生补访 · 你的播出版本';document.querySelector('.title-bottom span:last-child').textContent='CHAPTER BUILD / '+D.version+'';
  document.addEventListener('keydown',event=>{if(!busy()||document.querySelector('dialog[open]'))return;if(event.key==='Enter'&&!event.target.closest('button')&&!$('radioStoryNext').disabled){event.preventDefault();$('radioStoryNext').click();}if(event.key==='Escape'&&review)finishPrologue(true);if(!event.target.closest('button')||!['Enter',' '].includes(event.key))event.stopImmediatePropagation();},true);
  document.addEventListener('keydown',event=>{if(event.key.toLowerCase()!=='r'||event.ctrlKey||event.altKey||event.metaKey||/INPUT|TEXTAREA|SELECT/.test(event.target.tagName)||!$('titleScreen').hidden||busy()||!$('cgScreen').hidden||document.querySelector('dialog[open]'))return;event.preventDefault();openRundown();});
  window.Radio={start,render,onCollect,onResult,onViewerClosed,onConversation,guardEnding,ready,busy,openRundown,openPrologue,hint,decorateBuilder,canRecord,newDraft,useFact,useRelation};
  G.render();
})();
