(function(){
  'use strict';
  const G=window.ChapterGame,D=window.InquiryData,$=id=>document.getElementById(id);
  const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let side='front',selected=null,hintLevel=0,previewing=false;
  const state=()=>G.getState();
  const available=s=>D.profiles.filter(p=>s.collected.includes(p.source));
  const correct=s=>D.profiles.every((p,i)=>s.profileSlots[i]===p.id);
  function defaultEmotion(s){return s.ending==='release'?'cry':s.ending==='hold'||s.facts.includes('withheld')?'thoughtful':'neutral';}
  function portrait(s,options={}){
    if(options.portrait==='cry'||s.emotion==='cry'||s.ending==='release')return 'assets/koharu-cry.png';
    if(['overreach','contradicted'].includes(options.result)||s.emotion==='angry')return 'assets/koharu-defensive.png';
    if(options.portrait==='letter'||s.emotion==='thoughtful')return 'assets/koharu-wistful.png';
    return 'assets/koharu-neutral.png';
  }
  function phase(s){const p=window.InquiryEngine.milestones(s.facts);return !p.first||!p.warning?0:!p.rescue||!p.causation?1:!p.profile?2:3;}
  const phases=[['VERIFY THE ACTS','她实际做过什么？','先查最初的指控，再核实告知与款项。'],['RESCUE / AT WHAT COST','救人之后，伤害如何归责？','把她当时的处境、实际行动和后来伤情分开核实。'],['ONE PERSON / TWO READINGS','她怎样走到今天？','六段真实人生，拼成同一个人的正反两面。'],['YOUR FINAL JUDGMENT','你愿意怎样公开评价她？','事实相同，最后那一句判断由你负责。']];
  function render(s){
    const step=phase(s),p=window.InquiryEngine.milestones(s.facts);
    $('phaseNumber').textContent=String(step+1).padStart(2,'0');$('phaseEyebrow').textContent=phases[step][0];$('phaseQuestion').textContent=phases[step][1];$('phaseHint').textContent=phases[step][2];
    $('app').dataset.chapterPhase=step;$('app').dataset.emotion=s.emotion;
    $('emotionTag').textContent={neutral:'CALM / LISTENING',thoughtful:'UNSETTLED / THINKING',angry:'DEFENSIVE / CHALLENGED',cry:'SHATTERED / RECORDED'}[s.ending==='release'?'cry':s.emotion]||'CALM / LISTENING';
    const rounds=$('roundOne').parentElement;
    if(!$('roundThree'))rounds.insertAdjacentHTML('beforeend','<i></i><span id="roundThree">03<span>PORTRAIT</span></span><i></i><span id="roundFour">04<span>VERDICT</span></span>');
    [['roundOne','01','THE ACTS'],['roundTwo','02','RESCUE'],['roundThree','03','PORTRAIT'],['roundFour','04','VERDICT']].forEach(([id,num,text],i)=>{const node=$(id);node.innerHTML=num+'<span>'+text+'</span>';node.className=i<step?'done':i===step?'current':'';});
    $('profileCount').textContent=available(s).length+' / 6';$('profileButton').classList.toggle('ready',available(s).length===6&&!p.profile);$('profileButton').classList.toggle('complete',p.profile);
    const finish=$('notebook').querySelector('#finishCase');if(finish)finish.querySelector('small').textContent='进入最终评价 →';
  }
  function onResult(s,result){
    s.emotion=['overreach','contradicted'].includes(result.kind)?'angry':result.kind==='incomplete'?'thoughtful':defaultEmotion(s);
    const p=window.InquiryEngine.milestones(s.facts);
    if(p.warning&&!p.rescue)s.builder={topic:'rescue',claim:null,selected:[]};
  }
  function onCollect(s,id){if(D.profiles.some(p=>p.source===id))setTimeout(()=>G.notify('获得一片人生碎片 · 可在 PORTRAIT 中查看'),60);}
  function onConversationEnd(s){s.emotion=defaultEmotion(s);G.save();}

  function finishProfileIfReady(){
    const s=state();if(!correct(s)||!s.profileViews.includes('front')||!s.profileViews.includes('back'))return false;
    if(!s.facts.includes('profileComplete')){s.facts.push('profileComplete');s.emotion='thoughtful';G.save();G.render();G.sound('fact');G.notify('正反两面已拼合。她仍然是同一个人。');}
    return true;
  }
  function showPiece(id){
    const item=D.profiles.find(p=>p.id===id);if(!item)return;
    $('fragmentReading').innerHTML='<span>'+esc(item.age+' / '+item.name)+'</span><h3>'+esc(side==='front'?item.front:item.back)+'</h3><p>小春：“'+esc(item.voice)+'”</p><small>依据：'+esc(D.evidence[item.source].title)+'。这是人物侧写，不是新的定罪证物。</small>';
  }
  function selectPiece(id){if(state().facts.includes('profileComplete')){showPiece(id);return;}selected=id;renderProfile();showPiece(id);if(innerWidth<=800)$('puzzleBoard').scrollIntoView({block:'center',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});}
  function placePiece(slot,id=selected){
    const s=state();if(!id||s.facts.includes('profileComplete')||!available(s).some(p=>p.id===id))return;
    const previous=s.profileSlots.indexOf(id);if(previous>=0)s.profileSlots[previous]=null;s.profileSlots[slot]=id;
    s.profileViews=[];selected=null;G.save();renderProfile();G.sound('paper');showPiece(id);
  }
  function renderProfile(){
    const s=state(),known=available(s),done=s.facts.includes('profileComplete'),image=side==='front'?'assets/koharu-standing.png':'assets/koharu-keys.png';
    $('profileFront').classList.toggle('active',side==='front');$('profileBack').classList.toggle('active',side==='back');$('profileDialog').dataset.side=side;
    $('puzzleBoard').innerHTML=D.profiles.map((expected,i)=>{const id=s.profileSlots[i],piece=D.profiles.find(p=>p.id===id),n=D.profiles.findIndex(p=>p.id===id);return '<button class="puzzle-slot '+(piece?'occupied':'empty')+(done?' verified':'')+'" data-puzzle-slot="'+i+'" aria-label="'+esc(expected.age+' 岁 / '+(piece?piece.name:'空位'))+'">'+(piece?'<img class="piece-image" src="'+image+'" style="--c:'+n%2+';--r:'+Math.floor(n/2)+'" alt="人生拼图碎片">':'<span class="puzzle-age">'+expected.age+'</span>')+'<span class="puzzle-slot-label">'+expected.age+' / '+esc(piece?piece.name:'把这一段放回来')+'</span></button>';}).join('');
    $('puzzleBoard').querySelectorAll('[data-puzzle-slot]').forEach(slot=>{slot.onclick=()=>{const i=Number(slot.dataset.puzzleSlot);if(selected)placePiece(i);else if(s.profileSlots[i])showPiece(s.profileSlots[i]);else $('puzzleStatus').textContent='先从右侧选择一片人生，再点这个位置。';};slot.ondragover=e=>{e.preventDefault();slot.classList.add('drop-target');};slot.ondragleave=()=>slot.classList.remove('drop-target');slot.ondrop=e=>{e.preventDefault();slot.classList.remove('drop-target');placePiece(Number(slot.dataset.puzzleSlot),e.dataTransfer.getData('text/plain'));};});
    $('fragmentTray').innerHTML=[3,0,5,2,1,4].map(i=>{const item=D.profiles[i],unlocked=known.some(p=>p.id===item.id),placed=s.profileSlots.includes(item.id);return '<button class="fragment-card '+(selected===item.id?'selected ':'')+(placed?'placed ':'')+(!unlocked?'locked':'')+'" data-fragment="'+item.id+'" draggable="'+unlocked+'" '+(!unlocked?'disabled':'')+'><span class="fragment-image">'+(unlocked?'<img class="piece-image" src="'+image+'" style="--c:'+i%2+';--r:'+Math.floor(i/2)+'" alt="">':'<b>?</b>')+'</span><strong>'+esc(unlocked?item.name:'尚未取得')+'</strong><small>'+esc(unlocked?'回忆 / '+item.age:D.scenes[D.evidence[item.source].place].title+' · '+D.evidence[item.source].title)+'</small></button>';}).join('');
    $('fragmentTray').querySelectorAll('[data-fragment]').forEach(button=>{button.onclick=()=>selectPiece(button.dataset.fragment);button.ondragstart=e=>{e.dataTransfer.setData('text/plain',button.dataset.fragment);e.dataTransfer.effectAllowed='move';};});
    $('checkProfile').disabled=done;$('checkProfile').textContent=done?'BOTH SIDES / 拼合完成':'ASSEMBLE THE PORTRAIT ↗';
    $('puzzleStatus').textContent=done?'两种读法同时保留。它们不互相抵销。':correct(s)?'画面已经拼好。确认后翻到另一面，读一读同一段人生。':'已取得 '+known.length+' / 6 片。放错可以重放，不会丢失碎片。';
    if(!selected&&!$('fragmentReading').textContent)$('fragmentReading').innerHTML='<span>ONE PERSON</span><h3>她不是一张好人或坏人的标签。</h3><p>拼回经历，再翻面。对她的理解可以更复杂，已经核实的事实不会因此改变。</p>';
  }
  function checkProfile(){
    const s=state();if(available(s).length<6){$('puzzleStatus').textContent='还有人生碎片没找到。灰色碎片下方标出了来源和地点。';return;}
    if(!correct(s)){const wrong=D.profiles.map((p,i)=>s.profileSlots[i]!==p.id?p.age:null).filter(Boolean);$('puzzleStatus').textContent='这些年龄位置还没有对应起来：'+wrong.join('、')+'。看看片上的经历和画面接缝。';$('puzzleBoard').classList.add('needs-work');return;}
    $('puzzleBoard').classList.remove('needs-work');if(!s.profileViews.includes(side))s.profileViews.push(side);G.save();if(!finishProfileIfReady()){$('puzzleStatus').textContent='这一面已确认。翻到另一面，同一组经历会出现另一种读法。';G.sound('fact');}renderProfile();
  }
  function flipProfile(to){side=to;const s=state();if(correct(s)){if(!s.profileViews.includes(side))s.profileViews.push(side);G.save();finishProfileIfReady();}renderProfile();if(selected)showPiece(selected);else if(correct(s))showPiece(D.profiles[side==='front'?0:5].id);G.sound('paper');}
  function openProfile(){selected=null;renderProfile();G.openDialog('profileDialog');}

  function hintSpec(){
    const s=state(),p=G.progress();
    if(!p.first)return ['最初的指控',['钥匙照片和九秒切片，先不要当成完整事件。可以从归属、当晚出入或原通话三条路查。','旧钥匙的牌子编号，可以与退住簿对应。通话的绝对时间要和报警记录对照。','快捷路线：小楼前台查看“旧钥匙”和“退住登记”；记录台选第一项中的“这串钥匙属于已退住的人”，放入这两份。']];
    if(!s.facts.includes('withheld'))return ['收到与告知',['报告出具、本人签收、住客看到，是三个不同事实。','完整报告后面附有签收页；前台保留了贴给住客的告示。','资料台打开“完整报告”，点“签收附页”；前台看“住客告示”。将报告、签收、告示三份用于“她收到停用要求，却没有完整传达”。']];
    if(!s.facts.includes('misuse'))return ['安置款的用途',['花在小楼上，与符合指定用途，是两件事。','录音室有拨款条件和实际支出。','“知道与告知”中选择“安置款改变指定用途”，放入“临时安置拨款条件”＋“实际转账与余额”。']];
    if(!s.facts.includes('rescueAct'))return ['她实际做了什么',['不要先用伤情的好坏，替代是否返身的事实。','资料台有楼梯口与入口的录像摘录。','选“她返回受损区域，把澪抱出来”，提交“返身救人的录像摘录”。一份直接记录足以支持这个有限结论。']];
    if(!s.facts.includes('rescueContext'))return ['她当时面对什么',['事后知道的结果，不能代替当时面对的信息。','专业指示在资料台；随后新出现的现场声音，要到前台核对奈央的记录。','选“先接到指示，随后听到掉落声”，提交“救援接线的完整指示”＋“奈央记录的掉落声”。']];
    if(!s.facts.includes('causationLimit'))return ['伤情与因果',['“有伤情”没有自动说明每一处伤什么时候出现。','查第一次专业检查发生在搬动前还是后，再看复核意见究竟排除了什么。','选“无法确认搬动新增损害，也无法确认绝对无害”，放入“第一次专业接手记录”＋“伤害因果的复核意见”。']];
    if(!p.profile)return ['把人生拼回去',['人物侧写需要六段经历。未取得的碎片会显示来源地点。','录音室：调店单。前台：员工登记、那次维修、旧住客纸条、奈央续住日期。资料台：返身录像。','六片从左到右、从上到下：18 第一次住下；20 主动留下；23 真的撑过去；24 送别人离开；26 替你决定；27 最后一次返身。确认后翻到另一面。']];
    return ['进入最后评价',['你已经有足够的事实与人物侧写，可以打开调查笔记。','保留与断罪沿用同一组事实，区别是你愿意公开作出的最后判断。','笔记 N → MAKE YOUR JUDGMENT。断罪后会有一段反应，再进入处决磁带台。保留也有独立尾声；菜单可不改选择地预览 CG。']];
  }
  function renderHint(){const [title,hints]=hintSpec();$('hintTitle').textContent=title;$('hintText').textContent=hints[Math.min(hintLevel,hints.length-1)];$('nextHint').disabled=hintLevel>=hints.length-1;$('nextHint').textContent=hintLevel>=hints.length-1?'已经是直接提示':'再提示一步 →';}
  function openHint(){hintLevel=0;renderHint();G.openDialog('hintDialog');}

  function prepareEnding(s){
    $('ending').querySelector('.dialog-bar>span').textContent='FINAL REVIEW / WHAT YOU PUT ON AIR';
    $('ending').querySelector('.ending-art img').src=s.ending==='release'?'assets/koharu-cry.png':'assets/koharu-wistful.png';
    $('ending').querySelector('.ending-context').textContent='已核实：她改变了安置款用途，隐瞒停用要求，也确实返身救人。未能确认：搬动增加了多少伤害。保留因果疑点，是否足以让你保留她未来重新获得信任的可能？';
    const hold=$('endingOptions').querySelector('[data-ending="hold"]'),release=$('endingOptions').querySelector('[data-ending="release"]');
    hold.innerHTML='<b>HOLD / 保留最终判断</b><span>公布过错，支持外部接管与继续追责；不把未查明的伤害增量全部归给她，保留未来参与照护的可能。</span>';
    release.innerHTML='<b>RELEASE / 公开断罪</b><span>承认因果疑点，但认为明知风险、持续替人决定与越界救援已破坏信任，公开反对她再独立承担安置。</span>';
  }
  function renderEndingResult(s){
    const hold=s.ending==='hold';
    $('endingResult').innerHTML='<span>'+(hold?'JUDGMENT RESERVED':'JUDGMENT RELEASED')+'</span><p>'+(hold?'主持人：已证实的告知与款项过错应当公开。对未经查明的伤害增量，我不作确定归责；对她此后是否仍能重新获得信任，我保留判断。':'主持人：我承认搬动增量未明，也承认她曾冒险救人。但此前对风险的隐瞒和反复替人决定，已经使我无法再建议由她独立照料需要安置的人。')+'</p><p>'+(hold?'小春：门还是不能开。……我知道。奈央那个杯子，你先帮我问问她要不要。':'小春：以前说谢谢的人，你也都听过了，对吧？……那最后这一句，我听见了。')+'</p><button id="endingPlay" class="ink-button">'+(hold?'ARCHIVE PREVIEW / 查看处决演出':'PLAY HER TAPE / 播放处决记录')+' ↗</button>';
    $('endingPlay').onclick=()=>launchCG(hold);
  }
  function onVerdict(choice,s){
    s.emotion=choice==='release'?'cry':'thoughtful';G.save();G.render();prepareEnding(s);G.closeDialog('ending');
    if(choice==='release')G.playConversation([{who:'主持人',text:'这些事实会一起播出。救人的那段也会。最后的评价，是我的判断。'},{who:'小春',text:'你已经录好了？'},{who:'主持人',text:'嗯。'},{who:'小春',text:'钥匙先放你这里。我怕我又带回去。'},{who:'记录',text:'她把纸袋收好，手却空着。桌上的磁带还没有播放。'}],{label:'AFTER THE VERDICT',portrait:'cry',after:()=>launchCG(false)});
    else G.playConversation([{who:'小春',text:'所以，门还是不能开。……我知道。'},{who:'奈央',text:'这个袋子我自己拿。那张纸你想留就留，别再替我留房间。'},{who:'小春',text:'好。杯子你要吗？'},{who:'奈央',text:'要。我自己选。'},{who:'记录',text:'她的手停住，转去开门。澪仍然没有来见她。空出的杯位，暂时空着。'}],{label:'HOLD / 归还',portrait:'letter',after:()=>G.openEnding()});
  }
  function launchCG(preview){
    previewing=preview;document.querySelectorAll('dialog[open]').forEach(node=>node.close());
    $('cgStatus').textContent=preview?'ARCHIVE PREVIEW / 不改变当前判断':'HER TAPE / THE THINGS SHE KEPT';
    $('cgScreen').hidden=false;$('app').inert=true;$('cgFrame').src='execution/index.html?chapter=01';document.body.classList.add('watching-cg');$('cgFrame').focus();
  }
  function exitCG(){const frame=$('cgFrame');try{frame.contentWindow.postMessage({channel:'dead-air-chapter',action:'pause'},'*');}catch(_){}frame.src='about:blank';$('cgScreen').hidden=true;$('app').inert=false;document.body.classList.remove('watching-cg');if(state().ending)G.openEnding();else G.render();}
  window.addEventListener('message',event=>{if($('cgScreen').hidden||event.source!==$('cgFrame').contentWindow||event.data?.channel!=='dead-air-chapter')return;if(event.data.event==='complete'){if(!previewing){state().cgWatched=true;G.save();}$('cgStatus').textContent='END OF TAPE / 雪花继续，记录已保存';}if(event.data.event==='ready')$('cgStatus').textContent=previewing?'ARCHIVE PREVIEW / 点击磁带放入':'HER TAPE / 点击磁带放入，播放记录';});

  window.ChapterExtension={portrait,render,onResult,onCollect,onConversationEnd,prepareEnding,renderEndingResult,onVerdict};
  $('profileButton').onclick=openProfile;$('profileFront').onclick=()=>flipProfile('front');$('profileBack').onclick=()=>flipProfile('back');$('checkProfile').onclick=checkProfile;
  $('hintButton').onclick=openHint;$('nextHint').onclick=()=>{hintLevel++;renderHint();};$('previewCG').onclick=()=>launchCG(true);$('exitCG').onclick=exitCG;
  document.querySelectorAll('#profileDialog [data-close],#hintDialog [data-close]').forEach(button=>button.onclick=()=>G.closeDialog(button.dataset.close));
  document.addEventListener('keydown',event=>{if(event.ctrlKey||event.altKey||event.metaKey||/INPUT|TEXTAREA|SELECT/.test(event.target.tagName)||!$('titleScreen').hidden||!$('cgScreen').hidden||document.querySelector('dialog[open]'))return;if(event.key.toLowerCase()==='p'){event.preventDefault();openProfile();}if(event.key.toLowerCase()==='h'){event.preventDefault();openHint();}});
  G.render();
})();
