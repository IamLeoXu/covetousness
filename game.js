(function () {
  'use strict';
  const D = window.InquiryData, E = window.InquiryEngine;
  const $ = id => document.getElementById(id);
  const esc = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const KEY = 'dead-air-chapter01-v03';
  const allClaims = D.topics.flatMap(topic=>topic.claims);
  const fresh = () => ({version:D.version,started:false,scene:'studio',caseLayer:'keys',collected:[],facts:[],factProofs:{},profileAdopted:[],attempts:[],audio:true,ending:null,studioQuote:null,emotion:'neutral',profileSlots:[null,null,null,null,null,null],profileViews:[],lifeSolved:[],lifeFacets:[],lifeLinks:[],lifeAttempts:[],lifeFocus:'boxes',cgWatched:false,radio:D.newRadioState(),onboarding:D.newOnboarding(),builder:{topic:'keys',claim:null,selected:[],source:'evidence'}});
  let state = fresh(), flow = null, toastTimer, currentViewer = null, audioContext = null, lastSound = 0;
  try {
    const stored = JSON.parse(localStorage.getItem(KEY)||localStorage.getItem('dead-air-chapter01-v02'));
    if (stored && [D.version,'0.8.0','0.7.0','0.6.5','0.6.4','0.6.3','0.6.2','0.6.1','0.6','0.5','0.4','0.3','0.2'].includes(stored.version)) {
      const legacy=stored.version==='0.2';
      state.started = stored.started === true;
      state.scene = D.scenes[stored.scene] ? stored.scene : 'studio';
      state.collected = [...new Set(Array.isArray(stored.collected) ? stored.collected.filter(id=>D.evidence[id]) : [])];
      state.facts = [...new Set(Array.isArray(stored.facts) ? stored.facts.filter(id=>D.facts[id]&&(!legacy||id!=='profileComplete')) : [])];
      state.attempts = Array.isArray(stored.attempts) ? stored.attempts.filter(a=>a && allClaims.some(c=>c.id===a.claim) && Array.isArray(a.materials)).slice(-100) : [];
      state.factProofs=stored.factProofs&&typeof stored.factProofs==='object'?Object.fromEntries(Object.entries(stored.factProofs).filter(([id,items])=>D.facts[id]&&Array.isArray(items)).map(([id,items])=>[id,items.filter(key=>D.facts[key]||D.evidence[key]).slice(0,3)])):{};
      state.audio = stored.audio !== false;
      state.ending = !legacy&&['good','bad','zero','hold','release'].includes(stored.ending) ? stored.ending : null;
      state.studioQuote = typeof stored.studioQuote === 'string' ? stored.studioQuote.slice(0,160) : null;
      state.profileSlots=Array.from({length:6},(_,i)=>!legacy&&D.profiles.some(p=>p.id===stored.profileSlots?.[i])?stored.profileSlots[i]:null);
      state.profileAdopted=Array.isArray(stored.profileAdopted)?[...new Set(stored.profileAdopted.filter(id=>D.lifeEpisodes.some(e=>e.id===id)))]:state.facts.some(id=>['profileSketch','profileComplete'].includes(id))?D.lifeEpisodes.filter((e,i)=>state.profileSlots[i]===e.id).map(e=>e.id):[];
      state.profileViews=!legacy&&Array.isArray(stored.profileViews)?stored.profileViews.filter(v=>v==='front'||v==='back'):[];
      state.lifeSolved=!legacy&&Array.isArray(stored.lifeSolved)?[...new Set(stored.lifeSolved.filter(id=>D.lifeEpisodes.some(event=>event.id===id)))]:[];
      state.lifeFacets=[...new Set([...(Array.isArray(stored.lifeFacets)?stored.lifeFacets:[]),...state.lifeSolved])].filter(id=>D.lifeEpisodes.some(event=>event.id===id));
      state.lifeLinks=!legacy&&Array.isArray(stored.lifeLinks)?[...new Set(stored.lifeLinks.filter(id=>D.lifeConnections.some(link=>link.id===id)))]:[];
      state.lifeAttempts=!legacy&&Array.isArray(stored.lifeAttempts)?stored.lifeAttempts.slice(-60):[];
      state.dialogueLog=Array.isArray(stored.dialogueLog)?stored.dialogueLog.filter(entry=>entry&&Array.isArray(entry.lines)).slice(-30):[];
      state.chatRead=Array.isArray(stored.chatRead)?stored.chatRead.filter(id=>typeof id==='string'):[];
      state.lifeFocus=D.lifeEpisodes.some(event=>event.id===stored.lifeFocus)?stored.lifeFocus:'boxes';
      const p=E.milestones(state.facts);
      state.caseLayer=D.caseLayers.some(layer=>layer.id===stored.caseLayer)?stored.caseLayer:!p.first?'keys':!p.warning?'notice':'rescue';
      state.builder={topic:state.caseLayer,claim:null,selected:[],source:'evidence'};
      if(state.facts.includes('profileComplete')&&!window.LifeEngine.complete(state)){state.facts=state.facts.filter(id=>id!=='profileComplete');state.ending=null;}
      state.cgWatched=stored.cgWatched===true;
      state.radio=D.restoreRadioState(stored.radio,state.ending);
      state.onboarding=D.restoreOnboarding(stored.onboarding,stored.started===true);
      if(['hold','release'].includes(state.ending)){state.ending='zero';state.radio.airedEnding='zero';state.cgWatched=false;}
      if(['good','bad'].includes(state.ending)&&state.radio.phase==='archived'&&!E.cgUnlocked(state)){state.ending='zero';state.cgWatched=false;}
      if(E.milestones(state.facts).first)state.radio.tutorial='done';
    }
  } catch (_) { /* file: storage may be unavailable; the session still works. */ }

  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (_) {} }
  function notify(text) { $('toast').textContent=text; $('toast').classList.add('show'); clearTimeout(toastTimer); toastTimer=setTimeout(()=>$('toast').classList.remove('show'),3300); }
  function known(id) { return state.collected.includes(id) || state.facts.includes(id); }
  function owned() { return [...state.collected.filter(id=>D.evidence[id].lane!=='life'),...state.facts.filter(id=>D.facts[id].proof!==false)]; }
  function progress() { return E.milestones(state.facts); }
  function openDialog(id) { const node=$(id); if(!node.open) node.showModal(); window.Onboarding?.event('dialog-open',{id}); }
  function closeDialog(id) { if($(id).open) $(id).close();window.Onboarding?.event('dialog-close',{id}); }
  function sceneFlash() {
    if(matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const node=$('transitionFlash'); node.classList.remove('active'); void node.offsetWidth; node.classList.add('active');
  }

  function sound(type='click') {
    if(!state.audio) return;
    const now=performance.now(); if(now-lastSound<38 && type==='click') return; lastSound=now;
    try {
      if(!audioContext) audioContext=new (window.AudioContext||window.webkitAudioContext)();
      if(audioContext.state==='suspended') audioContext.resume().catch(()=>{});
      const ctx=audioContext,t=ctx.currentTime;
      if(type==='fact') {
        [392,523.25].forEach((frequency,i)=>{const o=ctx.createOscillator(),g=ctx.createGain();o.type='sine';o.frequency.value=frequency;o.connect(g);g.connect(ctx.destination);g.gain.setValueAtTime(0,t+i*.085);g.gain.linearRampToValueAtTime(.022,t+i*.085+.008);g.gain.exponentialRampToValueAtTime(.0001,t+i*.085+.16);o.start(t+i*.085);o.stop(t+i*.085+.17);});
        return;
      }
      const length=type==='paper'?.07:.035,buffer=ctx.createBuffer(1,Math.ceil(ctx.sampleRate*length),ctx.sampleRate),samples=buffer.getChannelData(0);
      for(let i=0;i<samples.length;i++){const p=i/samples.length;samples[i]=(Math.random()*2-1)*Math.exp(-p*(type==='paper'?4:12));}
      const src=ctx.createBufferSource(),filter=ctx.createBiquadFilter(),gain=ctx.createGain();
      src.buffer=buffer;filter.type='bandpass';filter.frequency.value=type==='paper'?1700:1050;filter.Q.value=type==='paper'?.45:1.2;gain.gain.value=type==='paper'?.045:.085;src.connect(filter);filter.connect(gain);gain.connect(ctx.destination);src.start();
      if(type==='click'){const second=ctx.createBufferSource(),sg=ctx.createGain();second.buffer=buffer;sg.gain.value=.018;second.connect(sg);sg.connect(ctx.destination);second.start(t+.012);}
    } catch (_) { /* Audio is optional and never blocks the game. */ }
  }

  function objectArt(kind,item={}) {
    if(kind==='photo') return '<div class="object-photo"><img src="assets/keys.webp" alt="转发照片中的钥匙"><small>SHARED / 11.17</small></div>';
    if(kind==='keys') return '<img src="assets/keys.webp" alt="旧钥匙">';
    if(kind==='letter') return '<img src="assets/envelope.webp" alt="旧信封">';
    if(kind==='tape') return '<div class="object-tape"><img src="assets/tape-decal.png" alt=""><span>KOHARU / TRANSCRIPT</span></div>';
    if(kind==='video') return '<div class="object-video"><b>'+(item.id==='returnVideo'?'22:15':'22:07')+'</b><small>'+(item.id==='returnVideo'?'RETURN':'ENTRY')+' / 11.16</small></div>';
    if(kind==='folder') return '<div class="object-folder"><span>AH / 001</span><small>RECORD COPY</small></div>';
    const text={ledger:'RETURN',notice:'NOTICE',report:'REPORT'}[kind]||'RECORD';
    return '<div class="object-paper '+esc(kind)+'"><b>'+text+'</b><i></i><i></i><i></i></div>';
  }

  function render() {
    const p=progress(), scene=D.scenes[state.scene], second=p.first || p.second;
    $('app').dataset.scene=state.scene; $('app').dataset.phase=second?'second':'first';
    $('phaseNumber').textContent=second?'02':'01';
    $('phaseEyebrow').textContent=second?'WHAT THEY WERE TOLD':'A DOOR THAT WASN\'T LOCKED';
    $('phaseQuestion').textContent=p.second?'你已经知道了什么？':second?'他们知道的，是什么？':'她把人锁住了吗？';
    $('phaseHint').textContent=p.first&&p.second?'这一小段的事实已能归档。你也可以继续核查其他解释。':second?'能出入，与知道危险，是同一回事吗？':'查看物件，组合材料，向小春提出一个有根据的说法。';
    $('roundOne').className=p.first?'done':'current';$('roundTwo').className=p.second?'done':second?'current':'';
    $('sceneCode').textContent=scene.en; $('sceneTitle').textContent=scene.title;
    $('sceneTypeset').innerHTML={studio:'AFTER<br>HOURS.',lobby:'THEY<br>LEFT.',archive:'ON THE<br>RECORD.'}[state.scene];
    $('captionSpeaker').textContent=scene.speaker;
    $('sceneCaption').textContent=state.scene==='studio'&&state.studioQuote?state.studioQuote:scene.caption;
    $('portrait').src=window.ChapterExtension?.portrait(state)||'execution/assets/character/details/held-letter.png';
    $('portrait').alt='小春的角色剪影';
    const sceneItems=window.ChapterExtension?.sceneItems(state,scene)||scene.items.filter(item=>D.caseLayers.find(layer=>layer.id===state.caseLayer).materials.includes(item.id));
    $('hotspots').innerHTML=sceneItems.map(item=>'<button class="hotspot '+(known(item.id)?'seen':'')+'" data-evidence="'+item.id+'" style="--x:'+item.x+'%;--y:'+item.y+'%" aria-label="'+esc(item.hint)+'"><span class="hotspot-art '+item.art+'">'+objectArt(item.art,item)+'</span><span class="hotspot-name"><i>'+D.evidence[item.id].code+'</i>'+item.label+'</span><span class="hotspot-hint">'+esc(item.hint)+'</span></button>').join('');
    $('hotspots').querySelectorAll('[data-evidence]').forEach(button=>button.addEventListener('click',()=>openViewer(button.dataset.evidence)));
    document.querySelectorAll('[data-location]').forEach(button=>{const active=button.dataset.location===state.scene;button.classList.toggle('active',active);if(active)button.setAttribute('aria-current','location');else button.removeAttribute('aria-current');});
    $('sceneCount').textContent='THIS FILE / '+sceneItems.filter(item=>known(item.id)).length+' / '+sceneItems.length;
    $('noteCount').textContent=state.facts.length+' FACT'+(state.facts.length===1?'':'S');
    $('audioToggle').textContent=state.audio?'SOUND ON':'SOUND OFF';$('audioToggle').setAttribute('aria-pressed',String(state.audio));
    $('resumeButton').hidden=!state.started;
    window.ChapterExtension?.render(state);
    window.Radio?.render();window.Onboarding?.refresh();
  }

  function collect(id) {
    if(D.evidence[id]&&!state.collected.includes(id)){state.collected.push(id);window.ChapterExtension?.onCollect(state,id);window.Radio?.onCollect(id);save();render();return true;}return false;
  }

  function documentVisual(item,id) {
    if(item.type==='transcript') return '<div class="clip-visual">'+objectArt('tape')+'<b>'+(item.lane==='life'?'VOICE':id==='snippet'?'00:09':item.clock||'22:19')+'</b><span>TRANSCRIPT / TEXT COPY</span></div>';
    if(item.image) return '<img src="'+item.image+'" alt="'+esc(item.title)+'">'+(item.type==='video'?'<span class="timecode">'+esc(item.timecode||'11.16 / 22:07:16')+'</span>':'')+'<span class="visual-caption">'+esc(item.label)+'<br>AFTER HOURS / RECORD COPY</span>';
    return '<div class="document-art"><span class="doc-art-label">AFTER HOURS / 001</span><strong>'+esc(({ledger:'RETURN<br>LOG.',notice:'PLEASE<br>WAIT.',report:'STOP<br>USE.',receipt:'SIGNED<br>COPY.'})[item.type]||'ON THE<br>RECORD.').replace(/&lt;br&gt;/g,'<br>')+'</strong><div class="doc-art-line"></div><div class="doc-art-line"></div><div class="doc-art-line"></div><span class="doc-art-stamp">'+(item.type==='receipt'?'11.13 / 18:20':item.type==='ledger'?'RETURNED':item.type==='notice'?'11.14':'FILE COPY')+'</span></div>';
  }

  function openViewer(id) {
    if(!D.evidence[id]&&!D.facts[id]) return;
    const newly=collect(id), fact=D.facts[id];
    currentViewer=id;
    const item=fact?{...fact,code:'F',label:fact.label,type:'report',source:'你的调查笔记 / 已核实推论',lead:fact.title,paragraphs:[fact.body],note:'这是一项由已有材料核实的推论。它可以继续参与组合，但不是新增的外部证物。'}:D.evidence[id];
    let content='<div class="exhibit-visual '+item.type+'"><span class="exhibit-number">'+item.code+'</span>'+documentVisual(item,id)+'</div><article class="exhibit-copy"><span class="eyebrow">'+esc(item.label)+'</span><h2>'+esc(item.title)+'</h2><p class="exhibit-source">'+esc(item.source)+'</p><p class="exhibit-lead">'+esc(item.lead)+'</p>';
    if(item.transcript) content+='<div class="transcript-lines">'+item.transcript.map(([who,text])=>'<div class="transcript-line"><span>'+esc(who)+'</span><p>'+esc(text)+'</p></div>').join('')+'</div>';
    content+=(item.paragraphs||[]).map(text=>'<p>'+esc(text)+'</p>').join('');
    if(item.rows) content+='<table class="record-table"><tbody>'+item.rows.map(([key,value])=>'<tr><th scope="row">'+esc(key)+'</th><td>'+esc(value)+'</td></tr>').join('')+'</tbody></table>';
    if(item.note) content+='<div class="exhibit-note">'+esc(item.note)+'</div>';
    if(item.followUps?.length)content+='<nav class="source-attachments" aria-label="随附材料"><span>FILE ATTACHMENTS / 随附材料</span>'+item.followUps.map(link=>'<button data-follow-up="'+link.id+'">'+esc(link.label)+' <b>↗</b></button>').join('')+'</nav>';
    if(fact&&fact.proof!==false){const proof=window.Programme.proof(state,id);content+='<section class="proof-chain"><b>推论依据与用途</b><p>'+esc(D.inferenceRoles[id]||'可进入本期论证')+'</p>'+proof.map(key=>'<button data-proof-source="'+key+'">'+esc(materialTitle(key))+' ↗</button>').join('')+'<button id="proofToPGM" class="proof-use">采用这条推论到 PGM ＋</button></section>';}
    content+='</article>';
    $('viewerContent').innerHTML=content;$('viewerContent').scrollTop=0;
    $('viewerContent').querySelectorAll('[data-follow-up]').forEach(button=>button.onclick=()=>openViewer(button.dataset.followUp));
    $('viewerContent').querySelectorAll('[data-proof-source]').forEach(button=>button.onclick=()=>openViewer(button.dataset.proofSource));if($('proofToPGM'))$('proofToPGM').onclick=()=>window.Radio.useFact(id);
    $('viewerLabel').textContent=(fact?'INFERENCE':item.lane==='life'?'LIFE SOURCE':'EVIDENCE')+' / '+item.code+' / '+item.label;
    $('viewerSaved').innerHTML='<i></i>'+(fact?'VERIFIED / YOUR INFERENCE':item.lane==='life'?'SAVED TO HER LIFE FILE':newly?'ADDED TO CASE FILE':'IN YOUR CASE FILE');
    $('companionButton').hidden=!item.companion;
    if(item.companion){$('companionButton').textContent=id==='report'?'TURN PAGE / 签收附页 ↗':'BACK TO REPORT ↗';$('companionButton').onclick=()=>{sound('paper');openViewer(item.companion);};}
    if($('builder').open) renderBuilder();
    openDialog('viewer');sound('paper');window.Onboarding?.event('viewer-open',{id});
  }

  function switchScene(id) {
    if(!D.scenes[id]||id===state.scene) return;
    state.scene=id;save();sceneFlash();render();
  }

  function materialTitle(id) { return (D.evidence[id]||D.facts[id]).title; }
  function renderBuilder() {
    const b=state.builder;
    const topic=D.topics.find(t=>t.id===b.topic)||D.topics[0],layer=D.caseLayers.find(item=>item.id===topic.id);
    b.source=['facts','mixed'].includes(b.source)?b.source:'evidence';
    const inLayer=id=>layer.materials.includes(id)||layer.facts.includes(id);
    b.selected=b.selected.filter(id=>known(id)&&inLayer(id)).slice(0,3);
    const materials=owned().filter(id=>inLayer(id)&&(b.source==='mixed'?true:b.source==='facts'?!!D.facts[id]:!!D.evidence[id]));
    $('materialCount').textContent=String(materials.length).padStart(2,'0');
    $('materialTabs').innerHTML=[['evidence','原始材料'],['facts','已核实推论'],['mixed','全部材料']].map(([id,label])=>'<button data-source="'+id+'" aria-pressed="'+(b.source===id)+'" class="'+(b.source===id?'active':'')+'">'+label+' <small>'+owned().filter(key=>inLayer(key)&&(id==='mixed'?true:id==='facts'?!!D.facts[key]:!!D.evidence[key])).length+'</small></button>').join('');
    $('materialTabs').querySelectorAll('[data-source]').forEach(button=>button.onclick=()=>{b.source=button.dataset.source;renderBuilder();});
    $('poolScope').textContent='FILE '+String.fromCharCode(65+D.caseLayers.indexOf(layer))+' / '+layer.title+' · 仅显示本卷';
    $('evidencePool').innerHTML=materials.length?materials.map(id=>{
      const item=D.evidence[id]||D.facts[id],inference=!!D.facts[id],selected=b.selected.includes(id);
      return '<div class="material-card '+(inference?'inference ':'')+(selected?'selected':'')+'" draggable="true" data-material="'+id+'"><button class="material-select" data-select="'+id+'" aria-pressed="'+selected+'" aria-label="'+(selected?'移除：':'放入：')+esc(item.title)+'"><span>'+(inference?'VERIFIED INFERENCE':'EVIDENCE / '+item.code)+'</span><strong>'+esc(item.short||item.title)+'</strong><small>'+esc(item.label)+'</small></button><button class="material-inspect" data-inspect="'+id+'" aria-label="重看：'+esc(item.title)+'">↗</button>'+(inference?'<div class="material-pgm"><span>'+esc(D.inferenceRoles[id]||'可进入本期论证')+'</span><button data-adopt-fact="'+id+'" type="button">采用到 PGM ＋</button></div>':'')+'</div>';
    }).join(''):'<p class="pool-empty">'+(b.source==='facts'?'本卷尚无已核实推论。<br>先使用原始材料。':'本卷还没有收集材料。<br>回到场景，查看这一层的物件。')+'</p>';
    $('evidencePool').querySelectorAll('[data-select]').forEach(button=>button.onclick=()=>selectMaterial(button.dataset.select));
    $('evidencePool').querySelectorAll('[data-adopt-fact]').forEach(button=>button.onclick=()=>window.Radio.useFact(button.dataset.adoptFact));
    $('evidencePool').querySelectorAll('[data-inspect]').forEach(button=>button.onclick=()=>openViewer(button.dataset.inspect));
    $('evidencePool').querySelectorAll('[data-material]').forEach(card=>card.ondragstart=event=>{event.dataTransfer.setData('text/plain',card.dataset.material);event.dataTransfer.effectAllowed='copy';});
    $('topicTabs').innerHTML=D.topics.map(topic=>'<button role="tab" aria-selected="'+(topic.id===b.topic)+'" class="'+(topic.id===b.topic?'active':'')+'" data-topic="'+topic.id+'" '+(window.ChapterExtension&&!window.ChapterExtension.layerUnlocked(state,topic.id)?'disabled':'')+'><span>'+topic.en+'</span>'+topic.title+'</button>').join('');
    $('topicTabs').querySelectorAll('[data-topic]').forEach(button=>button.onclick=()=>{b.topic=state.caseLayer=button.dataset.topic;b.claim=null;b.selected=[];b.source='evidence';save();render();renderBuilder();});
    if($('builderQuestion'))$('builderQuestion').textContent=topic.question;
    $('claimOptions').innerHTML=topic.claims.filter(claim=>!D.claimVisible||D.claimVisible(claim,state)).map(claim=>'<button class="claim-option '+(claim.id===b.claim?'selected':'')+'" data-claim="'+claim.id+'" aria-pressed="'+(claim.id===b.claim)+'">'+esc(claim.text)+'</button>').join('');
    $('claimOptions').querySelectorAll('[data-claim]').forEach(button=>button.onclick=()=>{b.claim=button.dataset.claim;if((D.inferenceRecipes[b.claim]||[]).some(recipe=>recipe.some(id=>D.facts[id])))b.source='mixed';renderBuilder();});
    const deep=(D.inferenceRecipes[b.claim]||[]).some(recipe=>recipe.some(id=>D.facts[id]));$('claimRole').classList.toggle('deep',deep);$('claimRole').textContent=deep?'深层推论：必须把已核实推论和新原件放在同一组。切换左侧标签不会清空已选来源。':b.claim?(D.inferenceRoles[b.claim]||'先核实当前说法，再决定是否采用。'):'';
    $('evidenceSlots').innerHTML=[0,1,2].map(index=>{const id=b.selected[index];return '<button class="evidence-slot '+(id?'filled':'empty')+'" data-slot="'+index+'" aria-label="'+(id?'移除：'+esc(materialTitle(id)):'第 '+(index+1)+' 个证据位')+'">'+(id?'<span>'+String(index+1).padStart(2,'0')+' / '+(D.facts[id]?'INFERENCE':'EVIDENCE')+'</span><strong>'+esc(materialTitle(id))+'</strong>':'<span>来源位 '+(index+1)+' / 可留空</span>')+'</button>';}).join('');
    $('evidenceSlots').querySelectorAll('[data-slot]').forEach(slot=>{
      slot.onclick=()=>{const i=Number(slot.dataset.slot);if(b.selected[i]){b.selected.splice(i,1);renderBuilder();}else notify('从左侧选一份材料，或将它拖进来。');};
      slot.ondragover=event=>{event.preventDefault();slot.classList.add('drop-target');};
      slot.ondragleave=()=>slot.classList.remove('drop-target');
      slot.ondrop=event=>{event.preventDefault();slot.classList.remove('drop-target');const id=event.dataTransfer.getData('text/plain');if(!known(id))return;const oldIndex=b.selected.indexOf(id),i=Number(slot.dataset.slot);if(oldIndex>=0)b.selected.splice(oldIndex,1);if(i<b.selected.length)b.selected[i]=id;else if(b.selected.length<3)b.selected.push(id);renderBuilder();};
    });
    $('submitArgument').disabled=!b.claim||!b.selected.length;
    const chosen=topic.claims.find(c=>c.id===b.claim);
    $('submitHint').textContent=!chosen?'先选择一个明确、可以核实的说法。':(chosen.check||'放入能支持这句话的材料。')+' 已选 '+b.selected.length+' 份。';
    window.Radio?.decorateBuilder();window.Onboarding?.refresh();
  }
  function selectMaterial(id) {
    if(!known(id)) return;
    const selected=state.builder.selected,index=selected.indexOf(id);
    if(index>=0) selected.splice(index,1);else if(selected.length<3) selected.push(id);else {notify('一次最多三份材料，先取下一份。');return;}
    sound('paper');renderBuilder();
  }
  function openBuilder() {renderBuilder();$('builder').scrollTop=0;openDialog('builder');window.Onboarding?.event('builder-open');}

  const labels={supported:'SUPPORTED / 一项可以成立的说法',incomplete:'KEEP LOOKING / 证据还缺一环',overreach:'BEYOND THE RECORD / 结论超出了材料',contradicted:'CHECK YOUR CLAIM / 材料与说法冲突'};
  function submitArgument() {
    const b=state.builder;if(!b.claim||!b.selected.length||window.Radio&&!window.Radio.canRecord())return;
    const result=E.evaluate(b.claim,b.selected),claim=allClaims.find(item=>item.id===b.claim);
    const newFact=result.fact&&!state.facts.includes(result.fact),before=progress();
    state.attempts.push({claim:b.claim,topic:b.topic,materials:[...b.selected],result:result.kind,note:result.note,fact:result.fact});
    if(newFact) state.facts.push(result.fact);
    if(result.fact)state.factProofs[result.fact]=[...b.selected];
    state.studioQuote=result.lines[0];state.scene='studio';
    if(newFact&&!before.first&&progress().first) state.builder={topic:'notice',claim:null,selected:[]};
    window.ChapterExtension?.onResult(state,result);
    window.Radio?.onResult(result);window.Onboarding?.event('case-result',{...result,claim:b.claim});
    save();render();closeDialog('builder');sceneFlash();
    const lines=[{who:'主持人',text:claim.text},...result.lines.map(text=>({who:'小春',text})),{who:'调查笔记',text:result.note}];
    if(newFact) lines.push({who:'调查笔记',text:'已记下：'+D.facts[result.fact].title+'。这项推论可以继续参与组合。'});
    playConversation(lines,{label:labels[result.kind],result:result.kind,portrait:result.kind==='supported'?(result.fact==='oldKeys'?'front-keys':'neutral'):'open',choices:()=>{
      if(progress().ready&&!state.ending&&!window.Onboarding?.coreActive())return [{text:'把事实与人物侧写带入最后的公开评价。',action:()=>{finishConversation();openEnding();}},{text:'继续核查其他材料。',action:finishConversation}];
      return null;
    }});
    if(newFact) sound('fact');
  }

  function playConversation(lines,options={}) {
    const parent=options.parent||null;
    flow={lines,index:0,...options,parent};$('conversation').dataset.result=options.result||'';
    $('conversation').dataset.module=options.module||'';
    renderConversation();openDialog('conversation');window.Radio?.onConversation(true);
  }
  function renderConversation() {
    if(!flow) return;
    const line=flow.lines[flow.index];$('conversationLabel').textContent=flow.label||'INTERVIEW / OFF AIR';$('conversationSpeaker').textContent=line.who;$('conversationText').textContent=line.text;
    $('conversationPortrait').src=window.ChapterExtension?.portrait(state,{...flow,portrait:line.portrait||flow.portrait})||'execution/assets/character/details/calm-empty-hands.png';
    $('conversationPortrait').dataset.framing=/\/(?:calm-empty-hands|clasped-keys|front-clasped-keys|front-held-letter)\.png/.test($('conversationPortrait').src)?'waist':'';
    const tape=line.visual==='tape';$('conversation').classList.toggle('is-tape',tape);
    $('conversationTape').hidden=!tape;$('conversationPortrait').hidden=tape;
    if(tape&&!$('conversationTape').firstElementChild)new window.CharacterCassette($('conversationTape'),'handoff',{decal:'execution/assets/ui/koharu-tape-decal.png'}).update(.35);
    $('conversationCounter').textContent=String(flow.index+1).padStart(2,'0')+' / '+String(flow.lines.length).padStart(2,'0');
    $('conversationPrev').disabled=flow.index===0&&!flow.parent;
    $('conversationChoices').innerHTML='';$('conversationNext').hidden=false;
    const atEnd=flow.index===flow.lines.length-1,choices=atEnd&&flow.choices?flow.choices():null;
    if(choices&&choices.length){$('conversationNext').hidden=true;choices.forEach(choice=>{const button=document.createElement('button');button.textContent=choice.text;button.onclick=()=>{const previous=flow;choice.action();if(flow&&flow!==previous&&!flow.parent&&!flow.review){flow.parent=previous;renderConversation();}};$('conversationChoices').append(button);});}
    $('conversationNext').textContent=atEnd?(flow.endText||'返回调查 →'):'下一页 →';window.Onboarding?.refresh();
  }
  function previousConversation(){if(!flow)return;if(flow.index>0)flow.index--;else if(flow.parent)flow=flow.parent;renderConversation();}
  function rememberConversation(){
    if(!flow||flow.review||flow.choices&&flow.lines.length===1)return;
    const entry={label:flow.label||'INTERVIEW / OFF AIR',portrait:flow.portrait||'neutral',lines:flow.lines.map(({who,text,visual,portrait})=>({who,text,visual,portrait}))};
    state.dialogueLog=Array.isArray(state.dialogueLog)?state.dialogueLog:[];
    if(JSON.stringify(state.dialogueLog.at(-1))!==JSON.stringify(entry))state.dialogueLog.push(entry);
    state.dialogueLog=state.dialogueLog.slice(-30);save();
  }
  function reviewLastConversation(){const entry=state.dialogueLog?.at(-1);if(!entry){notify('还没有读完的对话。');return;}closeDialog('helpDialog');playConversation(entry.lines,{label:'回看 / '+entry.label,portrait:entry.portrait,review:true,endText:'结束回看 →'});}
  function advanceConversation() {if(!flow)return;if(flow.index<flow.lines.length-1){flow.index++;renderConversation();}else finishConversation();}
  function finishConversation() {const after=flow?.after;rememberConversation();flow=null;closeDialog('conversation');window.Radio?.onConversation(false);window.ChapterExtension?.onConversationEnd(state);render();after?.();}
  function talkToHer() {
    if(window.ChapterExtension?.talkToHer){window.ChapterExtension.talkToHer();return;}
    playConversation([{who:'小春',text:'你想先问哪件？'}],{portrait:'keys',choices:()=>[
      {text:'那些旧钥匙，为什么一直留着？',action:()=>playConversation([{who:'小春',text:'牌子是他们自己写的。有个人借了我的笔，连盖子都没拔开。'},{who:'主持人',text:'后来他去了哪里？'},{who:'小春',text:'换了工作，搬走了。我帮他借的车。他后来寄过东西来，说新地方挺好。'},{who:'小春',text:'你看，我也不是从来都不让人走。'}],{portrait:'keys'})},
      {text:'你以前也住在这儿？',action:()=>playConversation([{who:'小春',text:'十八岁。二楼最靠里面那间，冬天冷，不过晒得到太阳。'},{who:'主持人',text:'那时候就打算接手？'},{who:'小春',text:'没有。我那时在服装店做事，后来还有一次去外地培训的机会。'},{who:'小春',text:'橱窗里还是那些衣服，换个位置，就有人愿意停下来。我挺喜欢那个。'},{who:'主持人',text:'后来呢？'},{who:'小春',text:'我留下来了。是我自己选的。你别写成谁把我拴在这里。'}],{portrait:'letter'})},
      {text:'如果住客说，他不想再让你替他安排呢？',action:()=>playConversation([{who:'小春',text:'奈央跟我吵过。有次她都定了搬家日，我还替她填了续住。'},{who:'主持人',text:'你没问她？'},{who:'小春',text:'我想先留着，总比到时候没有好。……第二天我去跟她道歉了。'},{who:'主持人',text:'以后就没再这样？'},{who:'小春',text:'又有过。她说我每次都觉得，别人自己定的还不够稳。'}],{portrait:'keys'})},
      {text:'先核对材料，稍后再谈。',action:finishConversation}
    ]});
  }

  function unresolvedQuestions() {
    const f=new Set(state.facts),items=[];
    if(!f.has('oldKeys'))items.push('照片中那串钥匙的归属，尚未完成核对。');
    if(!f.has('freeExit'))items.push('事故当晚具体的出入行为，尚未独立核实。');
    if(!f.has('afterCall'))items.push('九秒切片的时间与受话人，尚未完成核实。');
    if(!f.has('withheld'))items.push('她收到什么，与住客实际知道什么，还没有连成完整证据链。');
    if(!f.has('rescueAct'))items.push('事故后她是否实际返身救人，尚未核实。');
    if(!f.has('rescueContext'))items.push('她返身前面对的指示与现场变化，尚未完整核对。');
    if(!f.has('causationLimit'))items.push('搬动是否新增损害，仍需核对专业接手与复核意见。');
    if(!f.has('profileComplete'))items.push('人物侧写尚未拼合正反两面。');
    items.push('此前的款项用途与其他人的责任独立保留，救援不抵销它们。');return items;
  }
  function openNotebook() {
    const p=progress();let html='<div class="notebook-body">';
    if(!state.facts.length)html+='<p class="empty-note">还没有核实一项完整说法。<br>场景里的材料已经可以打开，记录台在右下角。</p>';
    html+=D.caseLayers.map(layer=>{const ids=state.facts.filter(id=>layer.facts.includes(id));return '<details class="case-note-group" '+(state.caseLayer===layer.id?'open':'')+'><summary>'+layer.number+' / '+layer.title+' <span>'+ids.length+' 项已核实</span></summary>'+ids.map(id=>{const fact=D.facts[id],attempt=state.attempts.find(a=>a.fact===id&&a.result==='supported');return '<article class="fact-note"><span>'+fact.label+'</span><h3>'+esc(fact.title)+'</h3><p>'+esc(fact.body)+'</p>'+(attempt?'<small>依据：'+attempt.materials.filter(id=>D.evidence[id]||D.facts[id]).map(id=>esc(materialTitle(id))).join(' ＋ ')+'</small>':'')+'</article>';}).join('')+'</details>';}).join('');
    html+='<div class="life-note-summary"><b>HER LIFE / 人物侧写</b><p>已重建 '+state.lifeSolved.length+' 段完整经历、'+state.lifeFacets.length+' 块片段，核对 '+state.lifeLinks.length+' 条关系。人物侧写不混入定罪证据池。</p><button id="notebookLife" class="secondary-button">打开人生调查 ↗</button></div>';
    html+='<details class="unresolved"><summary>STILL OPEN / 尚待核查</summary>'+unresolvedQuestions().map(text=>'<p>'+esc(text)+'</p>').join('')+'</details>';
    if(p.ready)html+='<button class="finish-case" id="finishCase">MAKE YOUR JUDGMENT <small>进入最后评价 →</small></button>';
    if(state.attempts.length){html+='<h3 class="attempts-title">YOUR QUESTIONS / 最近的质询</h3>'+state.attempts.slice(-6).reverse().map(attempt=>{const claim=allClaims.find(c=>c.id===attempt.claim);return '<article class="attempt-note"><span>'+esc((labels[attempt.result]||'RECORDED').split(' / ')[0])+'</span><p>'+esc(claim.text)+'</p><p>'+esc(attempt.note||'')+'</p></article>';}).join('');}
    html+='</div>';$('notebookContent').innerHTML=html;if($('finishCase')){$('finishCase').textContent='PREPARE THE BROADCAST / 整理本期播出单 →';$('finishCase').onclick=()=>{closeDialog('notebook');openEnding();};}$('notebookLife').onclick=()=>{closeDialog('notebook');window.LifeUI.open();};openDialog('notebook');
  }

  function openEnding() {
    const p=progress();if(!p.ready){notify('事实或人物侧写还缺一部分，可以打开提示查看。');return;}
    if(window.Radio&&!window.Radio.guardEnding())return;
    $('endingFacts').innerHTML=state.facts.map(id=>'<div class="ending-fact">'+esc(D.facts[id].title)+'</div>').join('');
    const heading=$('ending').querySelector('h2');heading.innerHTML='她真的救了人。<br>也真的越过了界限。';
    $('endingOptions').hidden=!!state.ending;$('endingResult').hidden=!state.ending;
    if(state.ending)renderEndingResult();window.ChapterExtension?.prepareEnding(state);openDialog('ending');
  }
  function chooseEnding(choice) {if(!['good','bad','zero'].includes(choice)||state.ending)return;if(!E.canChooseVerdict(choice,state)){notify('这份稿件还没有接成支撑该定性的逻辑链，可以继续取材或仅播出摘要。');return;}if(window.Radio&&!window.Radio.guardEnding())return;state.ending=choice;save();$('endingOptions').hidden=true;$('endingResult').hidden=false;renderEndingResult();sound('fact');window.ChapterExtension?.onVerdict(choice,state);}
  function renderEndingResult() {
    if(window.ChapterExtension?.renderEndingResult){window.ChapterExtension.renderEndingResult(state);return;}
    const hold=state.ending==='hold';
    $('endingResult').innerHTML='<span>'+(hold?'JUDGMENT RESERVED':'JUDGMENT STATED')+' / RECORDED</span><p>'+ (hold?'主持人：危险信息没有完整告知，这项事实应当公开。关于她今后是否还有可能重新获得信任，我保留判断。':'主持人：她把保住小楼放在了住客知情与自行决定之前。我反对今后再将需要临时住处的人交由她独立照料。')+'</p><p>'+ (hold?'小春：门还是不能开，对吧？……嗯。我知道。':'小春：最后这句，是你自己说的？……我听见了。')+'</p><p>END OF THE PILOT · 剧情止于此处。你的组合与仍未解决的问题已保存在记录里。</p>';
  }
  function openPlayerRecord() {
    const lines=['DEAD AIR / 她留下的东西','裁决：'+(state.ending==='good'?'正面定性':state.ending==='bad'?'负面定性':state.ending==='zero'?'第0结局 / 只有摘要':'尚未选择'),'','当前已知事实（可能含播出后的补查）：'];
    state.facts.forEach(id=>{const attempt=state.attempts.find(a=>a.fact===id&&a.result==='supported');lines.push('· '+D.facts[id].title,D.facts[id].body);if(attempt)lines.push('依据：'+attempt.materials.filter(id=>D.evidence[id]||D.facts[id]).map(materialTitle).join(' ＋ '));lines.push('');});
    lines.push('人物经历：',...D.lifeEpisodes.filter(event=>state.lifeSolved.includes(event.id)).map(event=>'· '+event.age+'岁 / '+event.name+'：'+event.options.find(option=>option[0]===event.answer)[1]),'','人生关系：',...D.lifeConnections.filter(link=>state.lifeLinks.includes(link.id)).map(link=>'· '+link.title+' '+link.note),'');
    if(state.radio.airScript?.length){lines.push('实际播出记录：','编排：'+(state.radio.order==='life-first'?'先人后事':'先事后人'));state.radio.airScript.forEach(part=>lines.push('· '+part.title,part.body,''));}
    if(state.radio.editorialSnapshot){const snap=state.radio.editorialSnapshot;lines.push('播出时封存的取材范围：',JSON.stringify(snap,null,2),'');}
    lines.push('仍待核查：',...unresolvedQuestions().map(text=>'· '+text),'','提出过的说法：');
    state.attempts.forEach((attempt,index)=>{lines.push(String(index+1)+'. '+allClaims.find(c=>c.id===attempt.claim).text,'依据：'+attempt.materials.filter(id=>D.evidence[id]||D.facts[id]).map(materialTitle).join(' ＋ '),'反馈：'+(attempt.note||''),'');});
    $('recordText').value=lines.join('\n');$('recordCopyStatus').textContent='可以选中文字保存。';openDialog('recordDialog');
  }

  function begin(newGame) {
    if(newGame){const audio=state.audio;state=fresh();state.audio=audio;}
    state.started=true;save();$('titleScreen').hidden=true;render();
    if(window.Radio?.start(newGame))return;
    if(newGame)playConversation(D.intro,{portrait:'keys',label:'FIRST INTERVIEW / 11.20'});
  }
  function requestRestart() {$('restartConfirm').hidden=false;}
  function restart() {document.querySelectorAll('dialog[open]').forEach(d=>d.close());$('restartConfirm').hidden=true;state=fresh();save();render();$('titleScreen').hidden=false;$('resumeButton').hidden=true;$('startButton').focus();}

  document.querySelectorAll('[data-close]').forEach(button=>button.addEventListener('click',()=>closeDialog(button.dataset.close)));
  document.querySelectorAll('[data-location]').forEach(button=>button.addEventListener('click',()=>switchScene(button.dataset.location)));
  document.querySelectorAll('[data-ending]').forEach(button=>button.addEventListener('click',()=>chooseEnding(button.dataset.ending)));
  document.addEventListener('click',event=>{if(event.target.closest('button'))sound();},true);
  $('buildButton').onclick=openBuilder;$('notebookButton').onclick=openNotebook;$('talkPerson').onclick=talkToHer;
  $('clearSlots').onclick=()=>{state.builder.selected=[];renderBuilder();};$('submitArgument').onclick=submitArgument;$('conversationNext').onclick=advanceConversation;$('conversationPrev').onclick=previousConversation;
  $('helpButton').onclick=()=>openDialog('helpDialog');$('brandHome').onclick=event=>{event.preventDefault();openDialog('helpDialog');};
  $('restartButton').onclick=requestRestart;$('cancelRestart').onclick=()=>{$('restartConfirm').hidden=true;};$('confirmRestart').onclick=restart;
  $('audioToggle').onclick=()=>{state.audio=!state.audio;save();render();if(state.audio)sound();};
  $('saveRecord').onclick=openPlayerRecord;
  $('copyRecord').onclick=async()=>{const text=$('recordText').value;try{if(!navigator.clipboard)throw Error('no clipboard');await navigator.clipboard.writeText(text);$('recordCopyStatus').textContent='记录已复制。';}catch(_){$('recordText').focus();$('recordText').select();const copied=document.execCommand('copy');$('recordCopyStatus').textContent=copied?'记录已复制。':'文字已选中，可按 Ctrl+C 复制。';}};
  $('startButton').onclick=()=>{if(state.started){openDialog('helpDialog');requestRestart();}else begin(true);};
  $('resumeButton').onclick=()=>begin(false);
  $('conversation').addEventListener('cancel',()=>{flow=null;window.Radio?.onConversation(false);window.ChapterExtension?.onConversationEnd(state);render();});
  $('viewer').addEventListener('close',()=>{window.Onboarding?.event('viewer-close',{id:currentViewer});window.Radio?.onViewerClosed(currentViewer);currentViewer=null;if($('builder').open)renderBuilder();});
  document.addEventListener('keydown',event=>{
    if(event.ctrlKey||event.altKey||event.metaKey||/INPUT|TEXTAREA|SELECT/.test(event.target.tagName))return;
    if(!$('titleScreen').hidden)return;
    if($('cgScreen')&&!$('cgScreen').hidden)return;
    if($('conversation').open){if((event.key==='Enter'||event.key===' ')&&event.target.closest('button'))return;if(event.key==='ArrowLeft'){event.preventDefault();previousConversation();}else if((event.key==='Enter'||event.key===' ')&&!$('conversationNext').hidden){event.preventDefault();advanceConversation();}return;}
    if(document.querySelector('dialog[open]'))return;
    if(event.key.toLowerCase()==='b'){event.preventDefault();openBuilder();}
    if(event.key.toLowerCase()==='n'){event.preventDefault();openNotebook();}
    if(['1','2','3'].includes(event.key)){event.preventDefault();switchScene(['studio','lobby','archive'][Number(event.key)-1]);}
  });
  window.ChapterGame={getState:()=>state,save,render,notify,openDialog,closeDialog,playConversation,finishConversation,reviewLastConversation,openEnding,openViewer,collect,progress,sound,openBuilder,renderBuilder,viewerId:()=>currentViewer};
  render();$('startButton').focus();
})();
