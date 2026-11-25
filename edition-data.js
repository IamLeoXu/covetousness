/* A programme can close before its reporter has opened every envelope. */
(function(){
  'use strict';const D=window.InquiryData;D.version='0.5';
  D.initialLife=['boxes','choice','break','phone'];
  D.lifeVisible=(event,s)=>D.initialLife.includes(event.id)||s.collected.includes(event.sources[0])||s.lifeSolved.includes(event.id);
  D.lifePieces=s=>D.lifeEpisodes.filter(event=>s.lifeSolved.includes(event.id)||(s.lifeFacets||[]).includes(event.id));
  D.lifeFacetText={boxes:'她把熟悉的东西留在箱子里，搬家时也带着。',choice:'她拒绝过一次外地培训，接手了小楼。',break:'明确分手以后，她仍写了一份未经对方确认的探望行程。',phone:'母亲搬走后，她在短时间里打了许多次电话。',love:'保留下来的票根与涂鸦，记录着一段双方都投入过的亲密。',friend:'结算单显示她拿到了自己的工钱，也帮朋友把样衣送走。'};
  D.facts.profileSketch={title:'采用的人物片段',short:'侧写草稿',label:'PORTRAIT / SELECTED FRAGMENTS',body:'已将掌握的人生片段按日期放入侧写。空白部分仍未取材；这不是完整人生的认证。',proof:false};
  const extra=(code,title,lead,paragraphs,followUps,lane='life')=>({code,title,lead,paragraphs,followUps,type:'document',label:'ARCHIVE / ATTACHMENT',source:'原档随附材料 / 经当事人授权',lane,place:lane==='life'?'portrait':'archive',layer:lane==='life'?undefined:'rescue'});
  Object.assign(D.evidence,{
    lifeVisit:extra('L07a','没有得到确认的探望行程','分手之后，她还是先把日期写好了。',['行程日期晚于分手来信。对方确认一栏为空。夹页上有一句小春自己的备注：“票先不要退。”','原信与行程订在一起，装订孔下压着几张更早的票根。'],[{id:'lifeLetter',label:'拆开装订 / 阅读原信'}]),
    lifeWork:extra('L05a','不参加培训的回函','她自己在“不参加”一栏打了勾。',['三月，她拒绝了离城四个月的陈列培训。同年的小楼经营移交表上，有她的签名。','文件后附旧工作组的结算索引，按年份归档。'],[{id:'lifeChoice',label:'核对月份 / 查看同期往来'},{id:'lifeSettlement',label:'翻到末页 / 结算索引'}]),
    lifeSettlement:extra('L09a','旧工作组结算索引','“样衣尾款，双方已结清。”',['记录里有一笔她催收的稿费。收件人不是她，签收回单来自外地工作室。','结算后另有一笔邮费，没有向对方追收。回单保留了包裹明细。'],[{id:'lifeFabric',label:'查看寄件回单 / 包裹明细'}]),
    lifeCallLog:extra('L11a','搬家那周的拨号记录','十九分钟里，六次呼叫。',['清单备注：“她搬走后的第三天，19:04—19:23。”小春在其中一条后面画了重重的圈。','同一夹页保存了新地址通知与最后接通的文字记录。'],[{id:'lifeMoving',label:'查看随附地址通知'},{id:'lifePhoneVoice',label:'查看最后接通的通话'}]),
    handoffAppendix:extra('15a','交接单背面的物品核对','有人在栏外补了一行字。',['专业人员接手时，小春的包与账本仍留在前台。她要求奈央先清点澪的随身物品。','背面附件号对应门口记录。楼内没有可用的连续影像，只有进入与离开的两个时刻。'],[{id:'returnVideo',label:'按附件号调取 / 门口时刻摘录'}],'case')
  });
  D.evidence.lifeLetter.followUps=[{id:'lifeTickets',label:'翻看原信背后 / 早期票根'}];
  D.evidence.lifeChoice.followUps=[{id:'lifeSettlement',label:'查看旧工作组结算索引'}];
  D.evidence.handoff.followUps=[{id:'handoffAppendix',label:'翻面 / 查看交接附记'}];
  D.evidence.handoff.note='交接时间只能确认专业检查在搬动之后。背面另附物品核对与附件号。';
  D.evidence.lifeBoxes.paragraphs=D.evidence.lifeBoxes.paragraphs.slice(0,2);
  D.evidence.lifeBoxes.followUps=[{id:'lifeBoxesVoice',label:'按夹页联系人 / 母亲的回访'}];
  D.caseLayers.find(layer=>layer.id==='rescue').materials.push('handoffAppendix');
  D.caseLayers.find(layer=>layer.id==='rescue').caption='先核对交接单与当时指示。附件可以继续调取，取材范围由你决定。';
  D.caseLayers.find(layer=>layer.id==='rescue').title='事故之后';
  D.caseLayers.find(layer=>layer.id==='rescue').short='交接与后果';
  D.topics.find(topic=>topic.id==='rescue').title='交接与后果';
  D.claimVisible=(claim,s)=>claim.id!=='rescueAct'||s.collected.includes('returnVideo')||s.facts.includes('rescueAct');
  D.scenes.archive.items=D.scenes.archive.items.filter(item=>item.id!=='returnVideo');
  D.lifeEpisodes.forEach(event=>{event.primary={choice:'lifeWork',break:'lifeVisit',phone:'lifeCallLog'}[event.id]||event.sources[0];});
  D.lifeEpisodes.find(event=>event.id==='love').name='两张不相邻的票';
  D.radioSegments=[{id:'rumor',code:'A1',title:'来稿核实',need:'核实一项来稿指控即可录成一条 TAKE。'},{id:'warning',code:'A2',title:'经营记录',need:'核对报告、告示或安置款中的一项说法。'},{id:'rescue',code:'A3',title:'事故之后',need:'核对交接记录、现场指示或行动附件。'},{id:'life',code:'B',title:'人物摘录',need:'从补访中采用一块人物片段；可继续翻附页。'}];
  D.radioColdOpen[2].body[0]='楼内公共平台坠落，住客澪受伤。来稿附着小春的告示：维修期间“再等三天”；安置款到账后，房租先付了。还有一张钥匙照片和九秒钟的“别走”。';
  D.radioColdOpen[3].body[1]='你可以核实来稿、补访她的过去，也可以在已有材料上收尾。播出单只采用你实际选进去的内容。值班倒计时不会替你决定何时结束。';
  D.intro=[{who:'主持人',text:'安置的钱，为什么先交了房租？'},{who:'小春',text:'那两笔一直在催。修了多少地方，账上都记着。'},{who:'主持人',text:'住客知道报告里要求停用吗？'},{who:'小春',text:'……你先把东西看完，别只拿那九秒钟来问我。'},{who:'导播内线',text:'先试一条可核实的追问。原通话是 22:19，去调首次报警记录，再回编辑台。两个时间都摆上来，我带你录第一条。'}];
  const baseNew=D.newRadioState,baseRestore=D.restoreRadioState;
  D.newRadioState=()=>({...baseNew(),scope:'conduct',lessonDismissed:false,editorialSnapshot:null});
  D.restoreRadioState=(value,ending)=>{const r={...baseRestore(value,ending),scope:value?.scope==='person'?'person':'conduct',lessonDismissed:value?.lessonDismissed===true,editorialSnapshot:value?.editorialSnapshot||null};if(D.lifeEpisodes.some(event=>event.id===value?.lifeQuote))r.lifeQuote=value.lifeQuote;if(Array.isArray(value?.airScript)&&value.airScript.length>=3&&value.airScript.length<=6&&value.airScript.every(item=>item&&['id','title','body'].every(key=>typeof item[key]==='string')))r.airScript=value.airScript.map(item=>({id:item.id.slice(0,30),title:item.title.slice(0,100),body:item.body.slice(0,3000)}));return r;};
})();
