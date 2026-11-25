/* Chapter additions live only in this integrated project. */
(function(){
  'use strict';
  const D=window.InquiryData;
  D.version='0.2';
  Object.assign(D.evidence,{
    grant:{code:'21',title:'临时安置拨款条件',label:'RELOCATION GRANT',type:'document',place:'studio',source:'定向拨款正文 / 11.14 到账',lead:'18,000，用于四名住客临时住宿与搬离。',paragraphs:['款项可支付临时旅店、搬离交通等，不是补充小楼经营租金或偿还旧维修欠款的资助。','两个长期床位已确认，另两人待安排；小春曾取得可供短住的旅店报价。短期搬离可行，但不保证长期去处与原经营都能保住。']},
    spending:{code:'22',title:'实际转账与余额',label:'WHERE IT WENT',type:'ledger',place:'studio',source:'11.14 / 原始转账与账目核对',lead:'钱没有用于私人消费，却先付给了小楼。',rows:[['季度房租','12,000'],['事故前一月防水尾款','4,800'],['余额','1,200']],paragraphs:['新平台工程没有支付预付款。旧维修尾款不是本次危险的处置费用。','实际支出与拨款指定用途是否一致，需要与拨款原文比对。']},
    dispatch:{code:'12',title:'救援接线的完整指示',label:'DISPATCH / 22:13',type:'transcript',place:'archive',source:'救援受理通话 / 授权转录',lead:'“先留在安全区接应，不要再次通过受损平台。”',transcript:[['接线员 · 22:13:40','人员已经派出，从西侧接近。你先留在安全区接应，不要再次通过受损平台。'],['小春','她还在上面。……好，我等。']],paragraphs:['这是对现场情况掌握有限时作出的接应指示。此后现场是否出现新的危险，需要另外核实。'],note:'等待专业接手的指示、她后来所感知的紧迫危险，以及她采取的行动，需要分别看待。'},
    falling:{code:'13',title:'奈央记录的掉落声',label:'A SOUND UPSTAIRS',type:'transcript',place:'lobby',source:'奈央事后当日的陈述 / 与现场录音对照',lead:'22:14:50 左右，又传来一声掉落。',transcript:[['奈央','我们已经在门外等了。楼上又响了一下，门口有灰落下来。'],['奈央','我不知道是不是又塌了。小春说澪还在里面，她就往回走。']],paragraphs:['现场录音能听见短促的碰撞声，但无法仅凭声音确定承重结构再次失稳。','这份材料能说明她做决定时面对什么，不能事后替她证明“当时一定马上会塌”。']},
    returnVideo:{code:'14',title:'返身救人的录像摘录',label:'SHE WENT BACK',type:'video',place:'archive',image:'assets/studio.png',source:'11.16 / 入口与楼梯口记录复核',lead:'22:15:08，她又上去了。',rows:[['22:15:08','小春携一条毯子返回楼内'],['22:17:31','小春抱着澪离开受损区域'],['现场表现','她没有先去拿自己的包或账本']],paragraphs:['奈央在外侧协助接人。现有影像没有拍清最初受伤时的身体状态，也没有覆盖搬动全过程。'],note:'本章仍用明确标记的录像文字摘录，不把示意背景冒充监控录像。'},
    handoff:{code:'15',title:'第一次专业接手记录',label:'FIRST HANDOVER',type:'document',place:'archive',source:'伤者授权提供的接手时刻摘录',lead:'22:18，专业人员在搬离后首次接手。',rows:[['记录时点','11.16 / 22:18'],['顺序','已离开受损区域，之后首次专业检查'],['缺失资料','不存在搬动前的同等客观检查']],paragraphs:['当时已发现明显伤情。记录不能把每一项损害准确分配到最初事故和随后搬动两个时段。'],note:'伤情出现于搬动后，不等于每一项损害都由搬动新增。'},
    expert:{code:'16',title:'伤害因果的复核意见',label:'CAUSATION REVIEW',type:'report',place:'archive',source:'专业复核意见 / 伤者授权摘要',lead:'存在真实的两种可能，不能用一项代替另一项。',paragraphs:['最初的平台事故可以解释目前记录的损害；随后搬动也存在加重损害的可能。','缺少搬动前的客观检查，现有材料不足以确定加重是否实际发生及其范围。也不能因此认定搬动绝对无害。','这项限制针对后续搬动所增加的损害，不撤销此前停用告知、住宿安排与建筑安全的调查。'],note:'结论限于现有材料，没有将“可能有害”写成已经证实，也没有证明绝对无害。'},
    firstRoom:{code:'17',title:'十八岁的员工登记',label:'HER FIRST ADDRESS',type:'letter',place:'lobby',image:'assets/envelope.webp',source:'小春授权展示的旧登记 / 私人资料遮去',lead:'职业：服装店店员。居住地址：共助小楼。',paragraphs:['最初的房租收据上，她的名字在“住客”一栏。那时她还不是负责人。','她跟父母换过几次住址，仍与家人联系。母亲最近还催她把洗缩水的毛衣寄回去。'],transcript:[['小春','二楼最里面。冬天冷，不过晒得到太阳。每次回去，都有人问我今天累不累。']]},
    transfer:{code:'18',title:'没有签回去的调店单',label:'ANOTHER LIFE',type:'document',place:'studio',source:'服装店旧同事与小春共同确认',lead:'培训四个月，岗位是她喜欢的橱窗陈列。',paragraphs:['旧管理者离开时曾劝她先去试试，小楼可以再找人。她最后主动接手经营。','她并没有注定成功的另一生，只是确实拥有另一条可以尝试的路。'],transcript:[['小春','橱窗里还是那些衣服，换个位置，就有人愿意停一下。我挺喜欢那个。'],['小春','是我自己留下的。别写成谁把我拴在这里。']]},
    repairs:{code:'19',title:'那次修好的屋顶',label:'SHE MADE IT WORK',type:'ledger',place:'lobby',source:'三年前的结算、夜班与二手交易记录',lead:'她确实把那一次撑过去了。',paragraphs:['她拿录像找维修商重做不合格处，卖掉自己的外套、加夜班，与住客共同分摊余款。旧账已结清。','庆祝时蛋糕很小，大家切了许多块。有人在玄关喊“我回来了”，她隔着人群应了一声。','当年的渗水修补与本次连接平台危险不同。做成过一次，不提供下一次安全的保证。'],transcript:[['奈央','她少一块钱都能追着人问。那次真给她修好了。后来我们还一起出去吃过饭。']]},
    renewal:{code:'20',title:'被奈央划掉的续住日期',label:'LET ME DECIDE',type:'notice',place:'lobby',source:'较晚年份的留言与双方采访',lead:'“我已经定好搬家日，不用替我留房间。”',paragraphs:['小春提前替奈央填了续住日期，尚未问过她。奈央划掉后，两人吵过一次。','小春带点心来道歉。后来，类似的“先替你安排好”又发生过。奈央曾搬离独立生活，这次因合租到期回来短住。'],transcript:[['奈央','她以前真的帮人搬走。后来就觉得，我们定的还不够稳，要她再看一次。']]}
  });
  D.evidence.entry.image='assets/city.webp';
  Object.assign(D.facts,{
    misuse:{title:'定向安置款先被用于房租和旧维修欠款',short:'钱的用途改变了',label:'CARE / AT WHOSE COST',kind:'notice',body:'拨款用途与实际支出不符。未用于私人消费是事实，但不能因此说指定安置目的已实现。'},
    rescueAct:{title:'她返身进入危险区域，抱出了澪',short:'她确实返回救人',label:'AN ACT OF RESCUE',kind:'rescue',body:'入口记录确认返回与抱出，不证明搬动在医学上必然正确，也不抹去事故前的过错。'},
    rescueContext:{title:'等待指示之后，她又感知到新的掉落声',short:'她当时面对的冲突',label:'WHAT SHE FACED',kind:'rescue',body:'专业接线要求接应；随后有掉落声和灰尘。她面对等待与返身的冲突，但声音本身不能证明即将全面坍塌。'},
    causationLimit:{title:'搬动是否新增损害，现有材料无法确定',short:'严重后果的归责界限',label:'A REAL EVIDENTIAL LIMIT',kind:'rescue',body:'首次客观检查在搬离后。复核意见保留最初事故与搬动加重两种真实可能，既不能确认新增损害，也不能确认绝对无害。'},
    profileComplete:{title:'她的人生正反两面已经拼合',short:'完整的人物侧写',label:'ONE PERSON / TWO READINGS',kind:'profile',proof:false,body:'同一段人生中真实的照顾、能力与选择，后来也成为无法放手的执念。这是对人物的理解，不是新的定罪证物。'}
  });
  D.topics=[
    {id:'keys',en:'01 / THE INITIAL CLAIM',title:'最初的指控',question:'钥匙、出入和“别走”，分别能证明什么？',claims:[
      {id:'oldKeys',text:'这串钥匙属于已退住的人，不能代表当晚全部现住客。',check:'核对实物编号与退住归还记录。'},
      {id:'freeExit',text:'当晚至少一名现住客，持自己的钥匙自行离开。',check:'需要有具体人物、日期与出入行为的当晚记录。'},
      {id:'afterCall',text:'“别走”发生在事故后，说给安置站值班员。',check:'同时核实原话受话人、通话时间与事故先后。'},
      {id:'locked',text:'仅凭钥匙照片和“别走”，即可认定她锁住了住客。',check:'这是待验证的严重指控；照片归属和原话语境不可省略。'}]},
    {id:'notice',en:'02 / WHAT WAS DISCLOSED',title:'知道与告知',question:'她收到的要求，与住客看到的内容是否相同？',claims:[
      {id:'knowledge',text:'事故前三天，她已经收到包含停用要求的完整报告。',check:'核对具体报告、对应版本与签收时刻。'},
      {id:'noticeGap',text:'贴给住客的告示，省略了原报告的停用要求。',check:'比较原要求和实际张贴的内容；这一步只证明文本差异。'},
      {id:'withheld',text:'她收到停用要求，却没有完整传达给住客。',check:'把她收到什么、何时收到、住客看到什么连起来。'},
      {id:'completeInfo',text:'她在回执上签了名，便足以证明住客已经完整知情。',check:'签收人的身份，能否替代住客实际获得的信息？'}]},
    {id:'rescue',en:'03 / RESCUE AND CAUSATION',title:'救援与后果',question:'她做了什么？这些行为能被归责到哪一种后果？',claims:[
      {id:'rescueAct',text:'事故后，她确实返回受损区域，把澪抱了出来。',check:'核实返身与抱出的实际行动，不把后果先塞进结论。'},
      {id:'rescueContext',text:'她先接到接应指示，随后又听到掉落声，才决定返身。',check:'把专业指示和当时新增的现场信息放在同一时间线上。'},
      {id:'causationLimit',text:'现有资料无法确认搬动增加了多少伤害，也无法确认绝对无害。',check:'核对首次检查发生于何时，以及复核意见实际排除了什么。'},
      {id:'rescueHarmed',text:'搬动之后发现伤情，就足以证明搬动新增了全部后遗伤害。',check:'时间在后，是否就等于因果已经成立？'},
      {id:'rescueSafe',text:'没有查明搬动加重，就足以确认她的搬动完全正确。',check:'“未能证实有害”和“已经证实无害”是不同命题。'}]}
  ];
  D.topics[1].claims.splice(3,0,{id:'misuse',text:'安置款先支付了房租与旧维修欠款，改变了指定用途。',check:'同时看拨款允许支付什么，以及钱实际流向哪里。'});
  D.scenes.studio.items=[{id:'photo',x:12,y:31,label:'SHARED IMAGE',hint:'查看钥匙转发照片',art:'photo'},{id:'snippet',x:32,y:31,label:'NINE SECONDS',hint:'看九秒录音转录',art:'tape'},{id:'call',x:51,y:31,label:'FULL CALL',hint:'查看原始通话',art:'folder'},{id:'transfer',x:12,y:76,label:'ANOTHER LIFE',hint:'她没有签回的调店单',art:'report'},{id:'grant',x:32,y:76,label:'GRANT TERMS',hint:'查看安置拨款条件',art:'folder'},{id:'spending',x:51,y:76,label:'ACTUAL SPENDING',hint:'查看实际支出',art:'ledger'}];
  D.scenes.lobby.items=[{id:'keys',x:14,y:37,label:'KEY RING',hint:'查看旧钥匙',art:'keys'},{id:'ledger',x:37,y:31,label:'RETURN LOG',hint:'核对退住簿',art:'ledger'},{id:'notice',x:63,y:31,label:'NOTICE',hint:'查看住客告示',art:'notice'},{id:'postcard',x:86,y:34,label:'A NOTE BACK',hint:'读旧住客寄回的纸条',art:'letter'},{id:'firstRoom',x:14,y:76,label:'FIRST ADDRESS',hint:'了解她最初怎样住进这里',art:'folder'},{id:'repairs',x:38,y:77,label:'IT ONCE WORKED',hint:'查看那次成功维修',art:'ledger'},{id:'renewal',x:63,y:76,label:'LET ME DECIDE',hint:'查看奈央划掉的续住日期',art:'notice'},{id:'falling',x:87,y:77,label:'FALLING SOUND',hint:'核对她返身前的现场情况',art:'folder'}];
  D.scenes.archive.items=[{id:'entry',x:14,y:32,label:'ENTRY / 22:07',hint:'查看当晚出入',art:'video'},{id:'report',x:38,y:32,label:'ASSESSMENT',hint:'查看报告及签收附页',art:'report'},{id:'rescue',x:63,y:32,label:'FIRST CALL',hint:'核对首次报警时间',art:'folder'},{id:'dispatch',x:86,y:32,label:'DISPATCH',hint:'查看完整接应指示',art:'folder'},{id:'returnVideo',x:14,y:77,label:'SHE WENT BACK',hint:'查看返身救人的摘录',art:'video'},{id:'handoff',x:39,y:77,label:'HANDOVER',hint:'核对首次专业检查',art:'report'},{id:'expert',x:70,y:77,label:'CAUSATION',hint:'查看损害归责复核',art:'report'}];
  D.scenes.studio.caption='这些我都带来了。糖在上面，你先拿一块。';
  D.profiles=[
    {id:'shelter',age:'18',name:'第一次住下',source:'firstRoom',front:'她记得被接住是什么感觉。',back:'后来，她难以接受这里不再需要自己。',voice:'那时我是住客。第一次有一个地址，连续过了好几个季节。',image:'execution/assets/character/details/held-letter.png'},
    {id:'choice',age:'20',name:'主动留下',source:'transfer',front:'她有别的愿望，也认真选择过照顾他人。',back:'那条没走的路，渐渐变成不能白费的投入。',voice:'我喜欢橱窗。你别连我自己选的事，也写成谁害了我。',image:'assets/envelope.webp'},
    {id:'ability',age:'23',name:'真的撑过去',source:'repairs',front:'她精明、能扛，确实解决过别人的困境。',back:'每次成功，都让“再撑一下”更像一个保证。',voice:'钱不能白给，漏的地方就得重做。那次我真的让他回来修了。',image:'assets/keys.webp'},
    {id:'departure',age:'24',name:'送别人离开',source:'postcard',front:'她也会为别人过上新生活而高兴。',back:'旧物留下了，关系却不能一直停在原地。',voice:'他寄东西回来的时候，我看了好几次地址。真的搬过去了。',image:'assets/envelope.webp'},
    {id:'boundary',age:'26',name:'替你决定',source:'renewal',front:'她能意识到越界，会道歉，会想补偿。',back:'道歉没有阻止她再次替别人作安排。',voice:'我以为先留着总比没有好。她问我，那为什么不先问她。',image:'assets/keys.webp'},
    {id:'return',age:'27',name:'最后一次返身',source:'returnVideo',front:'她没有只顾自己，危险里也真的回去了。',back:'她仍然无法安心把照顾交给别人接手。',voice:'我听见上面又响了。我知道有人在来，可她还在里面。',image:'execution/assets/character/details/covered-face.png'}
  ];
  D.intro=[{who:'小春',text:'糖在上面，证物在下面。那块碎了，我吃。'}, {who:'主持人',text:'照片、九秒录音、停用报告。还有你后来返身救人的记录。我们把它们分开核实。'}, {who:'小春',text:'我没有锁门。我也没有只顾着拿自己的东西跑。……但告示是我写的，这个我知道。'}, {who:'主持人',text:'先确认你实际做过什么，再讨论伤害能归责到哪一步。你的过去，也会听。'}];
})();
