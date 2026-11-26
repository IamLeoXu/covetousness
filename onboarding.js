(function(){
  'use strict';
  const G=window.ChapterGame,D=window.InquiryData,$=id=>document.getElementById(id),state=()=>G.getState(),t=()=>state().onboarding;
  const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let pending=false,lastStep='',current=null,root=null,card=null,dialogStack=[],drag=null,geometryObserver=null,observedTarget=null,observedHost=null;
  const shown=node=>!!node&&node.getClientRects().length>0&&!node.hidden;
  const open=id=>$(id)?.open===true;
  const footerClose=id=>document.querySelector('#'+id+' .ink-button[data-close="'+id+'"]')||document.querySelector('#'+id+' [data-close="'+id+'"]');
  const coreActive=()=>t()?.enabled&&!t().complete&&!t().core.done;
  const mark=id=>{if(!t().seen.includes(id))t().seen.push(id);};
  function persist(){G.save();}
  function step(id,target,title,text,extra={}){return {id,target:typeof target==='string'?document.querySelector(target):target,title,text,...extra};}
  function closeViewer(id,text){return step(id,footerClose('viewer'),'先读原件，再回到比较台',text);}
  function caseLesson(){
    const c=t().core,s=state(),viewer=G.viewerId(),b=s.builder;
    if(open('viewer')&&viewer==='call'&&!c.alarmClosed)return closeViewer('case-arrival-call','她带来的通话是 22:19。读完返回采访桌，问奈央当时何时报的警。');
    if(open('builder')&&!c.alarmClosed)return step('case-return-interview',footerClose('builder'),'先补上缺的时间来源','先返回采访桌，问奈央并读她发来的受理回执，再来比较。');
    if(!s.collected.includes('call'))return open('viewer')?closeViewer('case-first-call','这是小春带来的完整通话。记下受话人和 22:19，再问奈央事故何时已经发生。'):step('case-open-call','[data-evidence="call"]','先看她拿来的完整通话','先读原话，再找另一份能核对时间的材料。');
    if(!window.InvestigationEngine.canAccess(s,'rescue'))return step('case-ask-alarm','[data-inquiry-step="alarm"]','问奈央当时几点报的警','电话里只有通话时间。问问在场的人，她会把保存的受理回执发来。');
    if(!c.alarmClosed){
      if(open('viewer'))return closeViewer('case-alarm-read','报警记录是 22:13。这给“事故前后”一个外部时间坐标。读完后，点击这里保存并返回。');
      if(s.scene!=='archive')return step('case-go-archive','[data-location="archive"]','第一步 / 找到时间坐标','原通话在 22:19。先点这里的“台内档案”，调取另一份能独立确认时间的记录。');
      return step('case-open-alarm','[data-evidence="rescue"]','第二步 / 打开首次报警记录','点击这个档案。接下来不是马上下结论，而是看它记下了什么时刻。');
    }
    if(!open('builder'))return step('case-open-builder','#buildButton','下一步 / 比较原件','线索已保存。现在点击右下方“比较原件”，把两份记录放到同一张编辑台上核对。');
    if(b.topic!=='keys')return step('case-select-file','[data-topic="keys"]','先回到这一项问题','本次练习核对“别走”的语境。点“最初的指控”，其他卷宗稍后再查。');
    if(!t().seen.includes('builder-layout'))return step('case-builder-layout','#builderMap','上方是卷宗，下方是来源位','A/B/C 用来切换调查问题；下面 1、2、3 是同一句说法的三个来源位，两组编号没有配对关系。先选说法，再选能互相支持的材料：顺序不限，不必填满。原始材料与已核实推论可以混用，切换标签不清空来源。',{ack:'开始这次组合',seen:['builder-layout']});
    if(!c.callCompared&&s.collected.includes('call')){c.callCompared=true;persist();}
    if(!c.callCompared){
      if(open('viewer'))return closeViewer('case-call-read','看清两个信息：受话人是安置站值班员；通话开始于 22:19。我们没有从一句“别走”猜它是在对住客下命令。');
      return step('case-inspect-call','[data-inspect="call"]','先看内容 / 还不放进来源位','点击“原始通话”右上角的 ↗。大按钮是把材料放进组合，↗ 才是重看原件；这次先读原件。');
    }
    if(!t().quiz.recipient)return step('case-recipient','#builderQuestion','这句话，是对谁说的？','请根据刚才原件中的受话人作答。这里确认的是事实，不是猜她的动机。',{quiz:{key:'recipient',options:[['resident','住客'],['station','安置站值班员'],['unknown','原件没有交代']],answer:'station',wrong:'再看转录中的受话人：接电话的是安置站值班员。九秒切片没有保留这一层语境。'}});
    if(!t().quiz.time)return step('case-chronology','#builderQuestion','两个时刻，先后怎样？','首次报警 22:13；原通话 22:19。把两份独立记录连起来，才能判断那句“别走”发生在什么时候。',{quiz:{key:'time',options:[['before','原通话在首次报警之前'],['after','原通话在首次报警之后'],['same','两者同时发生']],answer:'after',wrong:'22:19 晚于 22:13。原通话发生在首次报警之后，不能拿它直接证明事前限制住客离开。'}});
    if(b.claim!=='afterCall')return step('case-choose-claim','[data-claim="afterCall"]','把刚才的两步，合成一句能核实的话','受话人已确认，先后也已确认。选择这条只在材料范围内的说法；它还没有证明她在其他事情上没有责任。');
    if(!b.selected.includes('call'))return step('case-select-call','[data-select="call"]','放入第一份来源','这次点击材料的大按钮，把原通话放进来源位。它支持“说给谁”和“22:19”。');
    if(!b.selected.includes('rescue'))return step('case-select-alarm','[data-select="rescue"]','放入第二份来源','再点击首次报警记录。它支持“22:13 已经报警”，与原通话一起构成事故前后的比较。第三个来源位可以空着。');
    return step('case-record','#submitArgument','提交你的推理，听她回答','选好说法和两份来源后，点击这里。程序会核对组合是否能支持这句话，回答与推论会保留。');
  }

  function lifeModule(){
    const s=state(),mode=window.LifeUI.currentMode(),e=window.LifeUI.currentEpisode(),seen=t().seen;
    if(mode==='research'){
      if(seen.includes('module-portrait-research'))return null;
      if(open('conversation'))return step('portrait-listen','#conversationNext','听她把这段讲完','原件会在采访里交到你手上，先听人把话说完。');
      if(open('viewer'))return closeViewer('portrait-read','读原件的日期和另一端的回答。读完回到侧写，两份来源都会保留。');
      if(s.lifeSolved.includes(e.id))return step('portrait-piece-ready','#portraitToPuzzle','这段经历可以进入拼图了','核对一次就够。下一步是把这块放回发生的年龄，侧写才有依据。');
      if(!e.sources.every(id=>s.portraitReceived.includes(id)||s.collected.includes(id)))return step('portrait-ask','#portraitInvestigate','从一件具体的事问起','点击这里继续采访。没有交给你的私人材料，不会预先摆在桌上。');
      const unread=e.sources.find(id=>!s.portraitRead.includes(id));
      if(unread)return step('portrait-open-original','[data-portrait-read="'+unread+'"]','收到以后，亲自读原件','看看这张纸或这段回答具体说了什么，再来核对。');
      return step('portrait-verify','#portraitVerify','把这段经历核对下来','比较两份来源，保存这块记忆。还没有拼合的部分会留空。');
    }
    mark('module-portrait-research');
    if(seen.includes('module-portrait-puzzle'))return null;
    const pieces=D.lifePieces(s),selected=document.querySelector('[data-fragment].selected')?.dataset.fragment;
    if(!pieces.length)return step('portrait-need-piece','[data-portrait-mode="research"]','先从一段经历取得片段','回到取材。听采访、读来源并核对后，这段才可用于拼图。');
    if(s.profileAdopted.length)return step('portrait-two-readings','#fragmentReading','拼图决定你采用怎样的她','正反面是对同一批经历的两种理解。你采用的那一面会写进 B 轨，并影响最终审判；不是把她的一生都查完的证明。',{ack:'继续整理侧写',seen:['module-portrait-puzzle']});
    const wrong=s.profileSlots.find((id,i)=>id&&id!==D.lifeEpisodes[i].id);
    if(wrong){const index=D.lifeEpisodes.findIndex(event=>event.id===wrong);if(selected!==wrong)return step('portrait-reselect-wrong','[data-fragment="'+wrong+'"]','重新选中放错的片段','先在托盘重新选这一块，再放回正确的年龄。');return step('portrait-correct-age','[data-puzzle-slot="'+index+'"]','把这段移回它发生的时候','原件日期对应 '+D.lifeEpisodes[index].age+' 岁。点这个位置即可移动。');}
    if(selected){const index=D.lifeEpisodes.findIndex(event=>event.id===selected);if(s.profileSlots[index]!==selected)return step('portrait-place','[data-puzzle-slot="'+index+'"]','把这段放在发生的时候','把选中的经历放到 '+D.lifeEpisodes[index].age+' 岁。可以点位置，也可以拖过去。');}
    if(s.profileSlots.some(Boolean))return step('portrait-confirm','#checkProfile','确认你拼出的经历','放对的年代会保存，空位可以留着。不要求六片全齐才审判。');
    return step('portrait-select','[data-fragment]:not(:disabled)','选一块已取得的片段','先选片，再点对应年龄的位置。下方可以读这段经历的正反两面。');
  }
  function currentModule(){
    if(open('rundownDialog')||open('radioScript')&&!open('builder'))return 'rundown';
    if(open('ending'))return 'ending';
    if(open('profileDialog'))return window.LifeUI.currentMode()==='portrait'?'portrait-puzzle':'portrait-research';
    if(open('conversation')&&$('conversation').dataset.module==='talk')return 'talk';
    if(open('notebook'))return 'notebook';
    return 'case';
  }
  function skipModule(){
    const module=currentModule();
    const keys={rundown:['pgm-library','rundown'],ending:['ending-review'],'portrait-research':['module-portrait-research'],'portrait-puzzle':['module-portrait-puzzle'],talk:['module-talk'],notebook:['notebook'],'life-inquiry':['module-life-inquiry'],'life-connections':['relations'],'life-portrait':['module-life-portrait']};
    if(module==='case'){t().core.done=true;t().complete=true;}else for(const key of keys[module]||[])mark(key);
    persist();lastStep='';refresh();
  }
  function contextual(){
    const s=state(),viewer=G.viewerId(),seen=t().seen;
    if(open('viewer')&&viewer==='report'&&!seen.includes('signed-page'))return step('source-signed-page','#companionButton','第一次遇到 / 签收附页','报告写了什么，与她何时拿到这个版本，需要两份来源。点 TURN PAGE，查看对应版本的签收页。');
    if(open('viewer')&&viewer==='receipt'&&!seen.includes('signed-page'))return step('source-receipt-close',footerClose('viewer'),'核对版本与签收人','这里证明的是她收到了什么，不是住客已经知道什么。读完后返回，再与住客实际看到的告示比较。');
    if(open('profileDialog')&&document.querySelector('.life-connections')&&!seen.includes('relations')){
      const active=document.querySelector('[data-life-link].active');if(!active)return null;
      const link=D.lifeConnections[Number(active.dataset.lifeLink)];
      if(s.lifeLinks.includes(link.id)){mark('relations');persist();return step('relation-done','.life-link-coda','关系核对完成','这条关系把两段有来源的经历接起来。拼图核对相关两段的年代后，播出单 B 轨可以一次采用它和两份依据；不需要先查完其他四段。',{ack:'继续取材'});}
      if($('linkEvent0')?.value!==link.pair[0])return step('relation-first','#linkEvent0','新的操作 / 连接两段经历','左边选择“'+D.lifeEpisodes.find(item=>item.id===link.pair[0]).name+'”。先摆事实，关系不是再给她贴一个空标签。');
      if($('linkEvent1')?.value!==link.pair[1])return step('relation-second','#linkEvent1','放入另一段经历','右边选择“'+D.lifeEpisodes.find(item=>item.id===link.pair[1]).name+'”。接下来找能同时保留两段事实的解释。');
      const choice=document.querySelector('[data-link-choice].selected')?.dataset.linkChoice;
      if(!choice||choice===t().lastRelationWrong)return step('relation-reading','.life-connections .life-event-options','这两件事之间，能推出什么？','选择一个同时容纳两段事实的读法。不能用后来的遗憾倒改先后，也不能用一次善意抹去另一项过错。');
      return step('relation-verify','#verifyLifeLink','提交你连接出的关系','核对通过后，它会作为人物推断保留。若选错仍可以调整，原件不会丢失。');
    }
    if(open('builder')&&['withheld','rescueContext','causationLimit'].includes(s.builder.claim)&&!seen.includes('inference-bridge'))return step('inference-bridge','#claimRole','深层推论必须站在上一层结果上','这一类不能只靠原始材料跳过去。左侧切换“已核实推论”或“全部材料”，把已核实结果和新原件放入同一组；第三个来源位是否需要，取决于你要证明什么。核实过的推论也可直接送 PGM，不需要重做。',{ack:'继续组合',seen:['inference-bridge','reuse-facts']});
    if(open('builder')&&!seen.includes('reuse-facts')&&[...document.querySelectorAll('[data-source="facts"]')].some(node=>!node.textContent.trim().endsWith('0')))return step('facts-tab','[data-source="facts"]','新的操作 / 推论也可以继续组合','点击“已核实推论”。之前做出的有依据的结论可以与别的来源继续组合；但一条结论不能拿来证明它自己。');
    if(open('rundownDialog')&&!open('radioScript')&&!seen.includes('pgm-library'))return step('rundown-library','#programmeGuide','选择本期采用的依据','素材库保留已经核实的推论、经历和人物关系。展开某轨勾选，即会采用到 PGM；换内容只需要重新 CUE，不用重新推理或补访。人物关系可以连同相关两段一起换入 B。',{ack:'选择本期采用的素材',seen:['pgm-library']});
    if(open('rundownDialog')&&!seen.includes('rundown')){
      if(open('radioScript'))return step('rundown-confirm','#radioScriptConfirm','这是实际将采用的版本','没有接入的轨道不会自动播出。确认这份稿件，再回播出单检查本期是否已经构成完整论证。');
      if(!s.radio.queued.length&&!Object.values(s.radio.cuts||{}).some(keys=>keys.length)){const picker=document.querySelector('.rundown-card.available [data-cut-picker]');if(picker&&!picker.open)return step('rundown-open-library',picker.querySelector('summary'),'先展开已有素材','这里存放的是已核实结果，不是再做一遍推理。展开后可以挑本期要保留的内容。');const first=picker?.querySelector('input[data-pgm-cut]:not(:disabled)');if(first)return step('rundown-select-cut',first.closest('label'),'勾选本期采用的一条内容','勾选只决定这期采用什么，不会增加新推论，也不会删除没选的结果。人物推断还可以连同相关两段经历一起替换到 B。');}
      if(!s.radio.queued.length){const button=[...document.querySelectorAll('[data-queue]')].find(node=>node.closest('.available'));return step('rundown-patch',button,'新的操作 / 接入待播轨','点击“接入 PGM”。取得材料、录好 TAKE 与决定把它播出去，是三个不同操作；本期可以不采用某些录音。');}
      if(!window.Radio.ready())return step('rundown-preview','#rundownRead','先读本期完整稿件','CUE 会显示本期实际勾选的内容。只有选入的推论与人物侧写进入审判；只采用零散摘要会走第 0 结局，不开放磁带。');
      return step('rundown-review','#rundownArm','去最后的论证检查','点击这里。下一页会显示哪些链已接上、哪些仍缺来源，你可以继续取材，不用强行作结。');
    }
    if(open('ending')&&!s.ending&&!seen.includes('ending-review'))return step('ending-review','#verdictChains','新的操作 / 用逻辑链支撑定性','上面的事实和人物推断来自本期 PGM。已知但未采用的内容不会自动进入本次审判。链条与所采用的侧写齐备，才能给她作好坏审判；只播摘要是第 0 结局，不解锁 CG。',{ack:'我明白了',seen:['ending-review','rundown']});
    if(s.radio.phase==='on-air'&&!seen.includes('broadcast'))return step('broadcast-next','#radioStoryNext','现在才是对外播出的版本','这一次 ON AIR 按你接入的内容逐段播出，最后一句由你署名。原稿会封存，后来的发现不会倒写进去。');
    return null;
  }
  function choose(){
    const s=state();if(!t()?.enabled||!$('titleScreen').hidden||!$('cgScreen').hidden)return null;
    if(!$('radioScene').hidden&&s.radio.phase!=='on-air')return null;
    if(s.radio.phase==='on-air'||open('ending')||open('rundownDialog')||open('radioScript')&&!open('builder'))return contextual();
    if(open('conversation')&&$('conversation').dataset.module==='talk')return t().seen.includes('module-talk')?null:step('talk-intro','#conversationText','谈谈 / 值班间隙的交流','这里认识她怎么说话、做事和与别人相处，不会自动生成定性依据。进入“同行取材”可听共同采访并核对关系。这里不会授予案件事实。',{ack:'开始聊聊',seen:['module-talk']});
    if(open('profileDialog'))return lifeModule();
    if(open('notebook'))return t().seen.includes('notebook')?null:step('notebook-intro','#notebookContent','取材笔记 / 查看已知结果','这里查看已经核实的推论和未解决的问题。它与播出单不同：笔记记录你知道什么，播出单决定你说什么。',{ack:'继续查看',seen:['notebook']});
    if(open('helpDialog')||open('recordDialog'))return null;
    if(!t().complete&&!t().core.done){
      if(t().core.submitted){if(open('conversation'))return step('case-read-result','#conversationNext','读完你的第一条推论','追问已有来源，回答也会保存。读到最后，注意它纠正了什么，以及它还没有证明什么。');t().core.done=true;t().complete=true;persist();}
      else {if(open('conversation'))return null;return caseLesson();}
    }
    return contextual();
  }
  function ensure(){
    if(root)return;
    root=document.createElement('div');root.id='producerGuide';root.hidden=true;root.className='producer-guide';
    root.innerHTML='<div class="guide-shade top"></div><div class="guide-shade left"></div><div class="guide-shade right"></div><div class="guide-shade bottom"></div><div class="guide-focus" aria-hidden="true"></div><svg class="guide-arrow" aria-hidden="true"><path></path><polygon></polygon></svg><aside class="producer-card" aria-label="导播内线引导"><header><span class="producer-icon">AH</span><div><span>PRODUCER / INTERNAL LINE</span><b id="producerTitle"></b><span id="producerDragHint" class="producer-drag-caption">按住标题栏可拖动提示框</span></div><button id="producerPause" aria-label="收起引导">−</button></header><p id="producerCopy" aria-live="polite"></p><div id="producerQuiz"></div><p id="producerFeedback" role="status"></p><footer><span id="producerAction">请点击高亮位置</span><button id="producerAck" hidden></button><button id="producerSkip" class="guide-skip">关闭本次引导</button></footer></aside>';
    card=root.querySelector('.producer-card');bindDrag();
    root.querySelector('#producerPause').onclick=()=>{t().paused=!t().paused;persist();refresh();};
    const moduleSkip=document.createElement('button');moduleSkip.id='producerSkipModule';moduleSkip.className='guide-skip';moduleSkip.textContent='跳过当前模块';moduleSkip.onclick=skipModule;root.querySelector('#producerSkip').before(moduleSkip);
    root.querySelector('#producerSkip').textContent='关闭全部引导';root.querySelector('#producerSkip').onclick=skip;
    root.querySelector('#producerAck').onclick=()=>{if(current?.finish)t().complete=true;for(const id of current?.seen||[])mark(id);if(current?.id==='relation-done')mark('relations');lastStep='';persist();refresh();};
    document.body.append(root);
  }
  function region(host){
    const r=host===document.body?{left:0,top:0,right:innerWidth,bottom:innerHeight}:host.getBoundingClientRect();
    return {left:Math.max(8,r.left+10),top:Math.max(8,r.top+10),right:Math.min(innerWidth-8,r.right-10),bottom:Math.min(innerHeight-8,r.bottom-10)};
  }
  function visibleFocus(node){
    const r=node.getBoundingClientRect(),pad=4;
    let left=Math.max(0,r.left-pad),top=Math.max(0,r.top-pad),right=Math.min(innerWidth,r.right+pad),bottom=Math.min(innerHeight,r.bottom+pad);
    for(let p=node.parentElement;p;p=p.parentElement){
      const css=getComputedStyle(p),b=p.getBoundingClientRect(),dialog=p.tagName==='DIALOG';
      if(dialog||/auto|scroll|hidden|clip/.test(css.overflowX)){left=Math.max(left,b.left+p.clientLeft);right=Math.min(right,b.left+p.clientLeft+p.clientWidth);}
      if(dialog||/auto|scroll|hidden|clip/.test(css.overflowY)){top=Math.max(top,b.top+p.clientTop);bottom=Math.min(bottom,b.top+p.clientTop+p.clientHeight);}
    }
    return right>left&&bottom>top?{left,top,right,bottom,width:right-left,height:bottom-top}:null;
  }
  function paintSpotlight(r){
    const w=innerWidth,h=innerHeight,set=(sel,x,y,width,height)=>Object.assign(root.querySelector(sel).style,{left:x+'px',top:y+'px',width:Math.max(0,width)+'px',height:Math.max(0,height)+'px'});
    const x=r?.left||0,y=r?.top||0,right=r?.right||0,bottom=r?.bottom||0;
    set('.guide-shade.top',0,0,w,r?y:h);set('.guide-shade.left',0,y,x,bottom-y);set('.guide-shade.right',right,y,r?w-right:0,bottom-y);set('.guide-shade.bottom',0,bottom,w,r?h-bottom:0);
    root.querySelector('.guide-focus').toggleAttribute('hidden',!r);
    if(r)set('.guide-focus',x,y,r.width,r.height);
  }
  function drawArrow(){
    const arrow=root.querySelector('.guide-arrow'),focus=root.querySelector('.guide-focus'),hidden=t().paused||focus.hasAttribute('hidden')||root.hidden;
    arrow.toggleAttribute('hidden',hidden);if(hidden)return;
    Object.assign(arrow.style,{width:innerWidth+'px',height:innerHeight+'px'});arrow.setAttribute('viewBox','0 0 '+innerWidth+' '+innerHeight);
    const r=focus.getBoundingClientRect(),cr=card.getBoundingClientRect(),tx=(r.left+r.right)/2,ty=(r.top+r.bottom)/2,sx=Math.max(cr.left+20,Math.min(tx,cr.right-20)),sy=ty<cr.top?cr.top:ty>cr.bottom?cr.bottom:cr.top+30,dx=tx-sx,dy=ty-sy,length=Math.hypot(dx,dy)||1,ex=tx-dx/length*13,ey=ty-dy/length*13;
    arrow.querySelector('path').setAttribute('d','M '+sx+' '+sy+' Q '+sx+' '+(sy+dy*.55)+' '+ex+' '+ey);
    arrow.querySelector('polygon').setAttribute('points',tx+','+ty+' '+(ex-dy/length*6)+','+(ey+dx/length*6)+' '+(ex+dy/length*6)+','+(ey-dx/length*6));
  }
  function savedPanelPosition(){
    const p=t().panelPosition;if(!p||!Number.isFinite(p.x)||!Number.isFinite(p.y))return null;
    return {x:p.x*(p.viewportWidth>0?innerWidth/p.viewportWidth:1),y:p.y*(p.viewportHeight>0?innerHeight/p.viewportHeight:1)};
  }
  function moveCard(x,y,host=topDialog()||document.body){
    const b=region(host),r=card.getBoundingClientRect(),left=Math.max(b.left,Math.min(x,Math.max(b.left,b.right-r.width))),top=Math.max(b.top,Math.min(y,Math.max(b.top,b.bottom-r.height)));
    Object.assign(card.style,{left:left+'px',top:top+'px'});drawArrow();return {x:left,y:top};
  }
  function rememberPanelPosition(){
    const r=card.getBoundingClientRect();t().panelPosition={x:r.left,y:r.top,viewportWidth:innerWidth,viewportHeight:innerHeight};persist();
  }
  function finishDrag(event){
    if(!drag||event&&event.pointerId!==undefined&&event.pointerId!==drag.id)return;
    const previous=drag;drag=null;root.classList.remove('dragging');if(previous.moved)rememberPanelPosition();
    const handle=card.querySelector('header');try{if(handle.hasPointerCapture(previous.id))handle.releasePointerCapture(previous.id);}catch{}
  }
  function bindDrag(){
    const handle=card.querySelector('header');handle.classList.add('producer-drag-handle');handle.tabIndex=0;handle.setAttribute('aria-label','拖动标题栏移动提示框，也可使用方向键');handle.title='按住标题栏拖动；聚焦后也可用方向键移动';
    handle.addEventListener('pointerdown',event=>{
      if(event.button!==0||event.isPrimary===false||event.target.closest('button,a,input,select,textarea'))return;
      const r=card.getBoundingClientRect();drag={id:event.pointerId,startX:event.clientX,startY:event.clientY,x:r.left,y:r.top,position:{x:r.left,y:r.top},moved:false};root.classList.add('dragging');
      try{handle.setPointerCapture(event.pointerId);}catch{}event.preventDefault();
    });
    document.addEventListener('pointermove',event=>{
      if(!drag||event.pointerId!==drag.id)return;
      const dx=event.clientX-drag.startX,dy=event.clientY-drag.startY;if(!drag.moved&&Math.hypot(dx,dy)<3)return;
      drag.moved=true;drag.position=moveCard(drag.x+dx,drag.y+dy);event.preventDefault();
    },{passive:false});
    document.addEventListener('pointerup',finishDrag);document.addEventListener('pointercancel',finishDrag);handle.addEventListener('lostpointercapture',finishDrag);addEventListener('blur',()=>finishDrag());
    handle.addEventListener('keydown',event=>{
      if(event.target!==handle||!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key))return;
      const r=card.getBoundingClientRect(),amount=event.shiftKey?30:10;moveCard(r.left+(event.key==='ArrowRight'?amount:event.key==='ArrowLeft'?-amount:0),r.top+(event.key==='ArrowDown'?amount:event.key==='ArrowUp'?-amount:0));rememberPanelPosition();event.preventDefault();event.stopPropagation();
    });
  }
  function watchGeometry(node,host){
    if(typeof ResizeObserver==='undefined'||observedTarget===node&&observedHost===host)return;
    if(!geometryObserver)geometryObserver=new ResizeObserver(refresh);geometryObserver.disconnect();geometryObserver.observe(node);geometryObserver.observe(card);if(host!==document.body)geometryObserver.observe(host);observedTarget=node;observedHost=host;
  }
  function place(spec){
    const node=spec.target;if(!shown(node)){root.hidden=true;return;}
    const host=topDialog()||document.body;if(root.parentElement!==host){finishDrag();host.append(root);}
    root.hidden=false;root.dataset.step=spec.id;root.classList.toggle('paused',t().paused);
    const bounds=region(host);card.style.width=Math.max(120,Math.min(t().paused?280:366,bounds.right-bounds.left))+'px';card.style.maxHeight=Math.max(70,bounds.bottom-bounds.top)+'px';
    if(t().paused){root.querySelector('#producerTitle').textContent='引导已收起';root.querySelector('#producerCopy').textContent='点击右上角 ＋ 可以继续当前步骤。';root.querySelector('#producerPause').textContent='+';positionPaused();watchGeometry(node,host);return;}
    root.querySelector('#producerPause').textContent='−';
    const changed=lastStep!==spec.id,before=node.getBoundingClientRect(),hostBounds=host===document.body?{top:0,bottom:innerHeight}:host.getBoundingClientRect();
    const offscreen=before.height<hostBounds.bottom-hostBounds.top-24&&(before.top<hostBounds.top+8||before.bottom>hostBounds.bottom-8);
    if(!drag&&(changed||offscreen)){node.scrollIntoView({block:offscreen?'center':'nearest',inline:'nearest',behavior:'instant'});lastStep=spec.id;}
    document.querySelectorAll('[data-producer-focus]').forEach(item=>item.removeAttribute('data-producer-focus'));node.dataset.producerFocus=spec.id;
    root.querySelector('#producerTitle').textContent=spec.title;root.querySelector('#producerCopy').textContent=spec.text;
    root.querySelector('#producerAction').textContent=spec.quiz?'请先在这里回答':spec.ack?'读完后继续':'请亲自点击高亮位置';
    const ack=root.querySelector('#producerAck');ack.hidden=!spec.ack;ack.textContent=spec.ack||'';
    const quiz=root.querySelector('#producerQuiz');quiz.innerHTML=spec.quiz?spec.quiz.options.map(([id,label])=>'<button data-quiz="'+id+'">'+escape(label)+'</button>').join(''):'';
    root.querySelector('#producerFeedback').textContent=spec.quiz?t().quiz.lastKey===spec.quiz.key?t().quiz.feedback||'':'':'';
    quiz.querySelectorAll('[data-quiz]').forEach(button=>button.onclick=()=>{const q=spec.quiz;if(button.dataset.quiz===q.answer){t().quiz[q.key]=true;t().quiz.feedback='';}else{t().quiz.lastKey=q.key;t().quiz.feedback=q.wrong;}persist();refresh();});
    const focus=visibleFocus(node);paintSpotlight(focus);
    const manual=drag?.position||savedPanelPosition(),r=focus||node.getBoundingClientRect(),size=card.getBoundingClientRect();
    let cx=Math.max(bounds.left,Math.min(r.right-size.width,bounds.right-size.width)),cy=r.bottom+19;
    if(cy+size.height>bounds.bottom)cy=r.top-size.height-19;
    if(cy<bounds.top){cy=r.bottom+10;cx=r.left>innerWidth/2?r.left-size.width-22:r.right+22;}
    moveCard(manual?.x??cx,manual?.y??cy,host);watchGeometry(node,host);
  }
  function topDialog(){return [...dialogStack].reverse().map(id=>$(id)).find(node=>node?.open)||[...document.querySelectorAll('dialog[open]')].at(-1)||null;}
  function positionPaused(){const host=topDialog()||document.body,b=region(host),manual=drag?.position||savedPanelPosition();moveCard(manual?.x??b.right-280,manual?.y??b.bottom-118,host);}
  function render(){pending=false;ensure();current=choose();if(!current){finishDrag();geometryObserver?.disconnect();observedTarget=null;observedHost=null;root.hidden=true;document.querySelectorAll('[data-producer-focus]').forEach(node=>node.removeAttribute('data-producer-focus'));return;}place(current);}
  function refresh(){if(pending)return;pending=true;requestAnimationFrame(render);}
  function event(name,data={}){
    if(!t())return;
    if(name==='dialog-open'){dialogStack=dialogStack.filter(id=>id!==data.id);dialogStack.push(data.id);}
    if(name==='dialog-close')dialogStack=dialogStack.filter(id=>id!==data.id);
    if(!t().enabled){refresh();return;}
    if(name==='viewer-open'){if(data.id==='rescue')t().core.alarmOpened=true;if(data.id==='lifeLetter')t().life.letterOpened=true;}
    if(name==='viewer-close'){if(data.id==='rescue'&&t().core.alarmOpened)t().core.alarmClosed=true;if(data.id==='call'&&t().core.builderOpened)t().core.callCompared=true;if(data.id==='lifeLetter'&&t().life.letterOpened)t().life.letterRead=true;if(data.id==='receipt')mark('signed-page');}
    if(name==='builder-open')t().core.builderOpened=true;
    if(name==='case-result'&&data.claim==='afterCall'&&data.kind==='supported')t().core.submitted=true;
    if(name==='dialog-open'&&data.id==='profileDialog')t().life.opened=true;
    if(name==='dialog-close'&&data.id==='notebook')mark('notebook');
    if(name==='life-result')t().life.lastWrong=data.kind==='supported'?null:data.choice;
    if(name==='relation-result')t().lastRelationWrong=data.kind==='supported'?null:data.choice;
    persist();refresh();
  }
  function skip(){t().enabled=false;t().complete=true;persist();if(root)root.hidden=true;document.querySelectorAll('[data-producer-focus]').forEach(node=>node.removeAttribute('data-producer-focus'));G.render();}
  function replay(){finishDrag();const panelPosition=t().panelPosition;state().onboarding=D.newOnboarding();state().onboarding.panelPosition=panelPosition;G.closeDialog('helpDialog');lastStep='';persist();G.render();refresh();}
  const replayButton=document.createElement('button');replayButton.id='replayTutorial';replayButton.className='secondary-button';replayButton.textContent='PRODUCER / 补看操作引导';replayButton.onclick=replay;document.querySelector('.chapter-help-links').append(replayButton);
  document.addEventListener('click',event=>{if(event.target.closest('#producerGuide'))return;if(event.target.closest('[data-source="facts"]'))mark('reuse-facts');if(event.target.closest('#radioStoryNext')&&state().radio.phase==='on-air')mark('broadcast');refresh();});
  window.visualViewport?.addEventListener('resize',refresh);window.visualViewport?.addEventListener('scroll',refresh);document.addEventListener('change',refresh);document.addEventListener('keydown',()=>refresh());addEventListener('resize',refresh);document.addEventListener('scroll',refresh,true);
  document.addEventListener('close',e=>{if(e.target.tagName==='DIALOG')event('dialog-close',{id:e.target.id});},true);
  window.Onboarding={refresh,event,coreActive,skip,replay};refresh();
})();
