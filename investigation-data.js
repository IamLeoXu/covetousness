/* v0.10: questions bring records onto the desk. Kept IDs preserve existing research and tapes. */
(function(){
  'use strict';
  const D=window.InquiryData,L=(who,text,extra={})=>({who,text,...extra});
  const edit=(id,changes)=>Object.assign(D.evidence[id],changes);
  D.version='0.10.0';
  D.initialEvidence=['photo','snippet','call'];
  D.radioColdOpen=[
    {time:'00:52',kind:'wake',tag:'AFTER HOURS / VISITOR',title:'她把手机推到话筒旁边。',body:['屏幕上是一串钥匙，下面的配字说她把四个住客锁在了楼里。往下滑，还有九秒钟的“别走”。','天音小春是今晚的来访者。四天前，她经营的小楼出了事故，住客澪受伤。她来找你，只提了一个要求：“至少把我说的整句话听完。”','你在空白磁带上写下 KOHARU，放在桌边。今晚录完的节目，就留在这里。'],action:'听她带来的录音'},
    {time:'00:54',kind:'cue',tag:'HER COPY / THE FULL CALL',title:'“这才是前面和后面。”',body:['小春从安置站拿到了那通电话的副本。完整转录和通话登记放在一起，开始时间是 11月16日 22:19。','“别走”前面，值班员说自己即将下班；后面，小春开始报四名住客的名字。她让你先听这一份，再听网上的切片。','监听接 CUE。广播的红灯暂时关着。'],action:'把两份录音放在一起'},
    {time:'00:58',kind:'guest',tag:'STUDIO A / FIRST QUESTION',title:'糖袋压住了那张截图。',body:['她挑掉碎的那块，把袋口转向你。','“整的给你。碎的掉进推子里，我可不会修。”她看了眼尚未亮起的红灯，“那张照片也能查。奈央知道那串钥匙怎么回事。”','你记下通话的时间。要知道这句话在事故前还是后，还得找另一个时间。'],action:'开始采访'}
  ];
  D.intro=[L('主持人','电话是 22:19。出事是在这之前，还是之后？'),L('小春','我那时到处找床位，没看钟。奈央报的警，你问她。'),L('记录','小春拨通奈央，把手机留在桌子中间。')];

  D.inquirySteps=[
    {id:'alarm',title:'问奈央：那晚几点报的警？',question:'给原通话找一个能对照的时间。',requires:{read:['call']},gives:['rescue'],place:'archive',givenBy:'奈央 / 电话中发送',deliverySummary:'追问报警时间后，奈央发来她手机里保存的通话页和受理短信。',lines:[
      L('主持人','奈央，小春说是你报的警。还记得几点吗？'),
      L('奈央','我看下手机。……22:13。这里还有受理短信，我发过去。'),
      L('小春','后面电话给我了。那会儿我还在跟她说澪在楼上。'),
      L('奈央','嗯，那通我录下来了，一直没删。先给你时间这一页？'),
      L('记录','奈央发来当晚的报警通话页和受理短信。两个时间都是 22:13。')
    ]},
    {id:'keys',title:'查照片里的钥匙',question:'它们究竟是谁的？',requires:{read:['photo']},gives:['keys','ledger'],place:'lobby',givenBy:'小春 / 当面拿出',deliverySummary:'问到照片里的钥匙后，小春拿出旧钥匙和退住簿，让你核对编号与归还日期。',lines:[
      L('主持人','这张照片里的四把，都是住客现在用的？'),
      L('小春','不是。等下，我带了。'),
      L('记录','她从袋里拿出一串旧钥匙，翻过磨花的牌子，又摊开一本退住簿。'),
      L('小春','编号在背面。搬走的时候谁还的，都签了名。'),
      L('记录','旧钥匙摆在退住簿旁边。纸牌背面的四个编号，都能在归还栏里找到。')
    ]},
    {id:'exit',title:'问奈央：你那晚怎么出去的？',question:'旧钥匙已经对上，现住客手里还有自己的钥匙吗？',requires:{facts:['oldKeys']},gives:['entry'],place:'archive',givenBy:'奈央 / 电话中发送',deliverySummary:'核实旧钥匙后，你追问当晚的实际出入。奈央发来此前向房东取得的入口录像摘录。',lines:[
      L('主持人','照片里是旧钥匙。那你当晚出去，用的是什么？'),
      L('奈央','我自己的，一直放在包里。是我自己开的门。'),
      L('主持人','门口有没有留下记录？'),
      L('奈央','有。房东的监控。我前两天找他要过那一段，现在发你。'),
      L('记录','奈央传来 11月16日 22:07 的入口录像摘录：她从包里取出钥匙，打开前门，独自离开。')
    ]},
    {id:'notice',title:'听奈央说那张告示',question:'门能开，住客为什么没有搬？',requires:{anyFacts:['afterCall','oldKeys','freeExit']},gives:['notice'],place:'lobby',givenBy:'奈央 / 电话中发送',deliverySummary:'最初的指控得到核实后，奈央提起自己贴过的告示，发来当时拍的前台照片。',lines:[
      L('奈央','那几句传错的，是该改。可我们没说过那张告示是假的。'),
      L('主持人','什么告示？'),
      L('奈央','“轻步，再等三天”。我还帮她把翘起来的角贴平了。照片在这。'),
      L('小春','我以为三天够了。维修那边——'),
      L('奈央','小春，你当时就是这么跟我们说的。'),
      L('记录','奈央发来 11月14日拍的前台照片。纸上有小春的署名。')
    ]},
    {id:'report',title:'问小春：维修判断从哪来？',question:'把她收到的要求和告示对照。',requires:{steps:['notice']},gives:['report','receipt'],place:'archive',givenBy:'小春 / 当面交出',deliverySummary:'追问维修判断的根据后，小春从文件袋取出评估报告，签收页还订在后面。',lines:[
      L('主持人','你说等维修。有人来检查过？'),
      L('小春','来过。那份我也带了。'),
      L('记录','她在文件袋里摸了一会儿，抽出评估报告。签收回执还订在后面。'),
      L('奈央','这里写的是停止住宿，安排迁出。'),
      L('小春','……我看见了。'),
      L('主持人','那为什么写成再等三天？'),
      L('小春','安置的钱刚下来，房东又在催。我想先把两头压住，三天后就能转开。')
    ]},
    {id:'money',title:'追问安置款去了哪里',question:'她说周转不开，账上发生了什么？',requires:{facts:['withheld']},gives:['grant','spending'],place:'studio',givenBy:'小春 / 手机中出示并传送',deliverySummary:'问到拨款金额和余额后，小春打开手机银行，将拨款单与两笔转账交给你。',lines:[
      L('主持人','安置款下来了多少？'),
      L('小春','一万八。'),
      L('主持人','现在剩多少？'),
      L('小春','一千二。……房租一万二，防水那笔四千八。两边都在催。'),
      L('奈央','那我们住旅店的钱呢？'),
      L('小春','我手上还有一批活，做完就能补上。房子一停，单子也没了。'),
      L('记录','她打开银行记录，把拨款单和两笔转账一起传给你。')
    ]},
    {id:'return',title:'问奈央：她后来去了哪里？',question:'还有一段当晚的经过没有讲。',requires:{facts:['withheld']},gives:['returnVideo','falling'],place:'archive',givenBy:'奈央 / 电话中发送',deliverySummary:'追问返身经过时，奈央发来门口声音记录，并找出小春进入和抱人出来的录像时段。',lines:[
      L('奈央','告示的事要讲。她回去那段，也得讲。'),
      L('主持人','你看着她进去的？'),
      L('奈央','我在门口。上面又响了一下，灰落下来。她就往里走，我喊她，她没停。'),
      L('小春','你当时还想跟进来。'),
      L('奈央','所以你把我按门口接人。我记得，不用你提醒。'),
      L('记录','奈央发来她当晚留下的声音记录，又从房东给的录像里找出小春进入和抱人出来的时段。')
    ]},
    {id:'dispatch',title:'追问返身前的那通电话',question:'她为什么没有继续等救援？',requires:{facts:['rescueAct']},gives:['dispatch'],place:'archive',givenBy:'奈央 / 电话中补发',deliverySummary:'确认返身行动后，你追问电话里的指示，奈央补发同一通报警录音的后段。',lines:[
      L('主持人','你往回走以前，电话那头让你做什么？'),
      L('小春','在门外等，接应他们。我说了好。'),
      L('奈央','就在刚才那通里。我把后面也发给你。'),
      L('小春','我站了一会儿。后来那一声……我不知道还来不来得及。'),
      L('记录','奈央发来同一通报警录音的后段，保留了接线员的指示和小春的回答。')
    ]},
    {id:'medical',title:'问清第一次检查的时间',question:'关于澪的伤，还有哪一步能查？',requires:{facts:['rescueContext']},gives:['handoff','expert'],place:'archive',givenBy:'澪保存 / 奈央转交',deliverySummary:'问到伤情与首次检查时间后，奈央转交澪保存的救援交接页和 11月19日随访说明。',lines:[
      L('主持人','她被抱出来时，伤就已经是后来查到的那样了吗？'),
      L('奈央','澪昨天复诊也问了。她留着交接那页，还有医生写的说明。我刚问过她了，可以给你。'),
      L('小春','我抱她的时候，她一直说腿疼。'),
      L('奈央','知道。你先让我发完。'),
      L('记录','两页扫描件到了：一页是救援交接，一页是 11月19日的随访记录。'),
      L('主持人','先把检查时间和进出楼的时间摆在一起。')
    ]}
  ];

  edit('rescue',{source:'奈央提供 / 当晚报警通话页与受理短信',lead:'22:13，奈央拨出报警电话。',paragraphs:['通话页日期为 11月16日，拨出时间 22:13。受理短信记有共助小楼、二层连接平台和住客受伤。'],rows:[['报警时间','11.16 / 22:13'],['地点','共助小楼 / 二层连接平台'],['受理状态','救援已派出']],note:''});
  edit('keys',{source:'小春当面拿出的旧钥匙 / 奈央连线核对',note:'纸牌背面留有四个房间编号。'});
  edit('ledger',{source:'小春带来的退住簿原件',note:''});
  edit('entry',{source:'房东保存的入口录像 / 奈央提供摘录',note:''});
  edit('notice',{source:'奈央提供 / 11.14 前台照片',note:''});
  edit('report',{source:'小春当面交出的评估报告',note:'签收回执订在报告后。'});
  edit('receipt',{source:'同一份评估报告 / 签收附页',note:''});
  edit('grant',{source:'小春提供 / 11.14 拨款单',lead:'临时安置款 18,000 元。',paragraphs:['拨款用于四名住客的临时住宿及搬离交通。','附件有两个已确认的长期床位，以及另外两人的短住旅店报价。'],note:''});
  edit('spending',{source:'小春手机银行记录 / 与账簿核对',lead:'11月14日，两笔支出。',paragraphs:['第一笔付款摘要为“共助小楼季度租金”。第二笔为上月防水工程的尾款。','危险平台的新工程尚未支付预付款。'],note:''});
  edit('returnVideo',{source:'房东保存的门口录像 / 奈央核对时段',note:''});
  edit('falling',{source:'奈央当晚录下的门口声音 / 本次补访',paragraphs:['录音中有一声短促的碰撞声，随后是奈央喊小春名字的声音。'],note:''});
  edit('dispatch',{source:'奈央保存的报警录音 / 后段',paragraphs:[],note:''});
  edit('handoff',{title:'第一次专业接手记录',source:'澪保存的救援交接页 / 奈央转交',lead:'11月16日，22:18，西侧入口。',rows:[['接手时间','11.16 / 22:18'],['接手位置','小楼西侧入口'],['送达经过','由小春从楼内抱至入口'],['现场检查','已发现明显伤情，随后转送']],paragraphs:['交接页从入口处的检查开始记录。'],note:'',followUps:[]});
  edit('expert',{title:'复诊时的伤情说明',source:'澪保存的 11.19 随访记录 / 奈央转交',lead:'澪问：搬动的时候，是不是又伤到了？',paragraphs:['医生记录：平台事故可以造成现有损伤，搬动也可能使损伤加重。第一次检查在抱出后，缺少此前的检查作对照，目前无法分清新增损害及其范围。'],note:''});
  D.caseLayers.find(layer=>layer.id==='rescue').materials=D.caseLayers.find(layer=>layer.id==='rescue').materials.filter(id=>id!=='handoffAppendix');
  if(!D.scenes.archive.items.some(item=>item.id==='returnVideo'))D.scenes.archive.items.push({id:'returnVideo',x:14,y:77,label:'SHE WENT BACK',hint:'重看奈央提供的门口记录',art:'video'});

  D.portraitScenes={
    boxes:{intro:[L('主持人','你从什么时候开始不喜欢搬家？'),L('小春','十六岁那几年，换了三次学校。我妈还留着课表，上周刚拍给我。'),L('记录','她翻出母亲发来的照片，又拨通电话，把扬声器转向桌子。')],answer:[L('母亲','那个纸箱？她自己写的，下次先拆。杯子和漫画塞一块，压得书角都卷了。'),L('小春','你压的。'),L('母亲','好，我压的。新学校第三天就有人拿糖来换她橡皮，她哪里肯吃亏。'),L('小春','三分之一包，别再说半包。'),L('母亲','这么多年就这个记得清。你下节目记得吃点东西。')],delivery:'小春留下纸夹的照片，母亲同意保留这段补访。'},
    love:{intro:[L('记录','谈到以前的工作，小春给你看第一次做的橱窗。作品册的背页夹着两张电影票。'),L('主持人','票背这张草图是谁画的？'),L('小春','遥。纱纪也在那家店，我问她还记不记得。')],answer:[L('纱纪','记得。她弄头发就弄了半天，电影差点没赶上。'),L('小春','后来不是赶上了。'),L('纱纪','人家说领口颜色暗，她还把人赶远两步。第二天自己就改了。'),L('小春','站太近本来就看不全。……那天后来去吃了面。'),L('纱纪','她吃完一路在笑。我问好不好吃，她说跟面没关系。')],delivery:'小春传来票根与草图照片，纱纪补上了那天的经过。'},
    choice:{intro:[L('主持人','你还想做陈列，怎么当年接了小楼？'),L('小春','那时候觉得我能做起来。培训的回函应该还在邮箱里。'),L('记录','她搜出“陈列培训”，又往下翻到同年的来信。')],answer:[L('小春','三月回的，选了不参加。遥七月才拿到那边的工作。'),L('主持人','你先定了留下？'),L('小春','嗯。也没人替我勾。我当时还给小楼画了块新招牌。'),L('主持人','后来后悔过吗？'),L('小春','想过我要是去了会怎样。可那会儿，我是真的想把这里做好。')],delivery:'她把三月回函与同年往来的日期一并发来，保留了这段回答。'},
    break:{intro:[L('主持人','你总说再等几天。以前也这样等过谁吗？'),L('小春','……有过。不是小楼的人。'),L('记录','她在相册里找了很久，传来一张信的照片，下面连着一份没走成的行程。')],answer:[L('小春','遥那时候已经说结束了。'),L('主持人','那份行程是后来约好的？'),L('小春','我先订的。想见了面，总还能谈。后来问了，遥没答应，我就没去。'),L('记录','她把画面停在信的最后一行，没再往上划。'),L('小春','你要读就整张读。前面那些开心的，也不是我一个人编的。')],delivery:'她留下完整来信与后来行程的照片，也同意保留刚才的回答。'},
    friend:{intro:[L('记录','小春的手机亮了一下。纱纪发来样衣照片，问袖口能不能再放半寸。'),L('小春','她自己也会改，就是懒。我给她打过去。'),L('主持人','你们以前一起做这些？')],answer:[L('纱纪','一起做，也一起吵。我要走那回，欠她八十块差额，她催到我上车。'),L('小春','因为你想混过去。'),L('纱纪','对，她一分钱没少收。最后那箱样衣也是她替我改完的，单子上还有她写的不包邮。'),L('小春','邮费最后也没找你要。'),L('纱纪','嗯。脸臭了一路，针塞了两包。这回满意没有？我把那张单找给你。')],delivery:'纱纪发回那次出库单，小春在桌边认出了自己的字。补访一并留档。'},
    phone:{intro:[L('主持人','电话没人接，你会一直打吗？'),L('小春','看是谁。我妈搬家那阵，打过好多次。她的新地址还在这。'),L('记录','她翻出母亲发新地址的消息。下面挤着六个未接。电话接通后，她先问母亲有没有吃饭。')],answer:[L('母亲','早吃了。你那回连着打，我在炒菜，锅都顾不上。'),L('小春','我就是问你搬完没有。'),L('母亲','都说搬完了。你什么时候来？杯子还给你留着。'),L('小春','不是说那只让我拿走？'),L('母亲','另一只。你总不能以后都不来了吧。')],delivery:'母亲确认了搬家清单和那通迟接的电话，两份记录留在这段经历下。'}
  };

  edit('lifeBoxes',{source:'小春提供 / 母亲保存的纸夹照片',paragraphs:['十六岁那几年，课表先后换了三个校名。每张路线图上都圈着一家卖热牛奶的小店。','纸箱照片上写着“下次先拆这个”。打开后是杯子、发带和漫画。'],followUps:[]});
  edit('lifeTickets',{source:'小春的旧作品册 / 票根与草图照片',paragraphs:['十九岁，她与遥交往。两张电影票背面，一张画着橱窗草图，另一张夹着她挑的布样。','草图上有她补写的一句：“丑得很有主张，留着，我修。”遥在旁边写了她第一次橱窗展出的日期。'],followUps:[]});
  edit('lifeChoice',{source:'小春旧邮箱 / 三月回函及同期来信',paragraphs:['20岁三月，她在陈列培训回函中勾选“不参加”。培训需离城四个月。','遥收到外地录用的来信在七月。九月离城时，两人约定轮流探望。'],followUps:[]});
  edit('lifeLetter',{source:'小春提供 / 原信与后续行程照片',paragraphs:['异地交往一年后，遥在信中提出分手。信的前半写了两人一起度过的日子，末尾写：“我们过去是真的。我现在说结束，也是真的。别替我订下一次车了。”','探望行程日期在来信之后。对方确认一栏空着，车票未使用。'],followUps:[]});
  edit('lifeFabric',{source:'纱纪提供 / 当年的出库单与签收回单',paragraphs:['24岁那年，纱纪去外地工作室。最后一批样衣由小春改完，出库单列有两人署名，稿费已结清。','单子角落写着：“别再把拉链装反，返工不包邮。”寄件人为小春，邮费栏没有向纱纪追收。'],followUps:[]});
  edit('lifeMoving',{source:'母女共同确认 / 新地址消息和搬家清单',paragraphs:['母亲为缩短通勤、少照管一间屋子而搬家，提前一周把新地址发给小春。','小春在十九分钟里打了六次电话。最后一通接通后，母亲问她下周什么时候过来。'],rows:[['通知新地址','搬家前一周'],['电话','19:04—19:23 / 六次呼叫'],['旧物','杯子一只 / 留给小春']],followUps:[]});
  const voiceIds={boxes:'lifeBoxesVoice',love:'lifeLoveVoice',choice:'lifeChoiceVoice',break:'lifeBreakVoice',friend:'lifeFriendVoice',phone:'lifePhoneVoice'};
  for(const [id,voice] of Object.entries(voiceIds))edit(voice,{source:'本次补访 / '+({boxes:'母亲',love:'纱纪',choice:'小春',break:'小春',friend:'纱纪',phone:'母亲'}[id]),lead:D.portraitScenes[id].answer.find(line=>!['记录','主持人'].includes(line.who)).text,transcript:D.portraitScenes[id].answer.filter(line=>line.who!=='记录').map(line=>[line.who,line.text]),paragraphs:[],note:''});
  const readings={
    boxes:{answer:'她随家人迁居，靠熟悉的物件安顿下来，和母亲一直有来往。',front:'她走到哪里，都能很快找到熟悉的小店和新朋友。',back:'她把一次次生活装进箱子，越来越舍不得丢掉任何一件。'},
    love:{answer:'她曾有一段双方都投入过的恋爱。',front:'她也有过盼着下班、打扮好去约会的时候。',back:'她仍留着两张票，反复回到那个还没有结束的晚上。'},
    choice:{answer:'她三月拒绝培训，遥七月才收到外地录用。',front:'她认真挑过自己的路，想做成一件事。',back:'她不肯轻易认输，也越来越不肯承认留下的代价。'},
    break:{answer:'遥明确提出分手，后来的探望由她单方面安排。',front:'她记得被喜欢过的日子，舍不得把它们一笔抹掉。',back:'别人已经说结束，她还在安排下一次。'},
    friend:{answer:'她结清稿费，帮纱纪寄完样衣，送朋友离城。',front:'她嘴上追着算工钱，手上把朋友的箱子搬上车。',back:'她懂得怎么送人走，后来却越来越做不到。'},
    phone:{answer:'母亲换了住处，两人仍在来往；她开始反复确认对方有没有回话。',front:'母亲还在等她过去，朋友也还会找她做活。',back:'一个电话迟接一会儿，她就开始担心人会不见。'}
  };
  const questions={boxes:'换过几个地方，怎样住下来？',love:'那时你们一起做过什么？',choice:'那份培训是谁决定不去的？',break:'那张探望行程，遥答应了吗？',friend:'纱纪离开时，你做了什么？',phone:'母亲搬家后，你们还怎么联系？'};
  for(const event of D.lifeEpisodes){const value=readings[event.id];event.primary=event.sources[0];event.question=questions[event.id];event.front=value.front;event.back=value.back;event.options=event.options.map(([id,text])=>[id,id===event.answer?value.answer:text]);event.voice=D.portraitScenes[event.id].answer.filter(line=>line.who==='小春').at(-1)?.text||event.voice;D.lifeFacetText[event.id]=value.answer;}
  for(const link of D.lifeConnections){
    const text={
      'not-erased':'她确实被爱过，也确实被提出了分手。',
      'own-cost':'她先选择留下，后来却想替已经结束的关系续上一个以后。',
      'not-fate':'她曾送朋友离开，如今却反复确认谁还会回来。'
    }[link.id];link.title={'not-erased':'两张票与最后一封信','own-cost':'留下以后，还想留住什么','not-fate':'她也曾送人走'}[link.id];link.note=text;link.options=link.options.map(([id,old])=>[id,id===link.answer?text:old]);
  }
  D.initialLife=D.lifeEpisodes.map(event=>event.id);
  D.lifeVisible=()=>true;
  D.facts.profileSketch.body='你把已经核对的经历拼进她的侧写。审判会采用你选入节目的那一面。';
  D.facts.profileComplete.body='六段经历与三条关系已经拼合。你仍要决定，它们说明她是怎样的人。';
  D.facts.withheld.body='她收到完整的停止住宿要求，给住客的告示却只写维修、轻步和再等三天。';
  D.facts.misuse.body='18,000 元指定用于住客安置，12,000 元付了房租，4,800 元付了上月防水尾款。';
  D.facts.rescueAct.body='她在 22:15:08 返回楼内，22:17:31 抱着澪出来，奈央在门外接人。';
  D.facts.rescueContext.body='接线员先让她留在门口接应，随后又出现掉落声和落灰，她决定返身。';
  D.facts.causationLimit.body='第一次检查在抱出后。随访意见无法分清最初事故与随后搬动各造成了多少损害。';

  D.caseReplies={
    oldKeys:['他们搬走交回来的。我留着牌子，没扔。','奈央那把还在她自己手上。'],
    freeExit:['她自己开的门。她有钥匙。','这个你们能说清楚吧？'],
    afterCall:['我是在求值班员别下班。名字还没报完，他要转接。','九秒外面这些，也给人听听。'],
    knowledge:['签名是我的。那天就拿到了。','我还问过能不能先补一块，他们说不行。'],
    noticeGap:['我写了维修，再等三天。','停止住宿那段，没写。'],
    withheld:['我知道他们看完会走。','那阵子每个人都在催，我总觉得把眼前这笔顶过去就行了。'],
    misuse:['对。先付了房租和防水的钱。','我一直想着下一批活做完就补。没有补上。'],
    rescueAct:['她还在上面。我就进去了。','奈央在门口接我。'],
    rescueContext:['我说了等。是真的等了一会儿。','后来那一声，我站不住了。'],
    causationLimit:['我不知道是不是抱的时候又伤了她。','我去看她，她也没让我进去。']
  };
  D.caseNotes={oldKeys:'编号和退住日期对上了。',freeExit:'记录中，奈央持自己的钥匙离开。',afterCall:'22:19 的原通话晚于 22:13 报警。',knowledge:'报告版本、签名与接收日期一致。',noticeGap:'告示没有停止住宿要求。',withheld:'她收到完整要求，住客看到的是删减后的告示。',misuse:'款项指定安置住客，实际先付了房租与旧维修。',rescueAct:'门口记录确认返身和抱出。',rescueContext:'先有接应指示，后有新的掉落声。',causationLimit:'首次检查在搬动之后，随访意见未能分清新增损害。'};

  D.judgmentEditorial={
    good:'我核实了她的隐瞒，也看见她在出事后返回楼里。那些经历让我相信，照顾别人并非她用来遮掩自己的说辞。她做错过，也贪心过，但我仍判定：天音小春是一个好人。今晚，我把这个判断播给所有听众。',
    bad:'她知道应当停止住宿，却让住客再等；安置款先保住了房租和旧账。她舍不得自己的投入，也想让别人继续等她。我判定：天音小春是一个坏人。她口中的照顾，最终仍要让别人替她付代价。这就是我今晚的裁决。',
    zero:'今晚核实的内容已经播出。我还不能给天音小春下一个定义。这次审判，到这里暂停。'
  };
  D.journeyEndings={
    good:[L('记录','红灯熄灭。小春看着桌上那盒写了自己名字的磁带。'),L('小春','……好人啊。'),L('小春','我还以为，你还有好多事要问。'),L('主持人','这就是我的判断。'),L('小春','给我一份吧。我想自己再听一遍。',{visual:'tape'})],
    bad:[L('小春','坏人。这个字，一下就说完了。'),L('记录','她把没吃的糖装回袋里，拉了两次，才合上袋口。'),L('小春','你问我的那些，我都答了。我现在再讲什么，还有用吗？'),L('主持人','节目已经播出了。'),L('记录','你按下停止键。磁带窗里的两只白色线轮停住了。',{visual:'tape'})],
    zero:[L('小春','今晚就这样？'),L('主持人','这次我没有结论。'),L('记录','你收起这一版录音。采访单上，还有几行没有填完。')]
  };
  D.radioSegments.find(segment=>segment.id==='life').title='你拼出的这个人';
  D.radioSegments.find(segment=>segment.id==='life').need='核对经历，放入人物拼图，再选择审判采用的侧写。';
  D.caseFailureReplies={
    locked:['就这张照片，你怎么知道我锁了谁？'],
    completeInfo:['我的签名，又不是她们的。'],
    rescueHarmed:['你说是我抱坏的，医生也这么说了吗？'],
    rescueSafe:['我把她抱出来，就一定没事吗？'],
    default:['我没跟上。你指的是这里哪一段？']
  };
  D.caseFailureNotes={
    oldKeys:'把钥匙编号和退住记录对上。',
    freeExit:'需要当晚具体的出入记录。',
    afterCall:'把原通话时间与报警时间对上。',
    knowledge:'报告与对应的签收页需要一起核对。',
    noticeGap:'对照完整报告和实际告示。',
    withheld:'先核实收到的报告或告示差异，再与另一份来源组合。',
    misuse:'同时对照款项用途和实际转账。',
    rescueAct:'需要她进入和抱人出来的记录。',
    rescueContext:'需要返身救人的推论、接线指示与掉落声。',
    causationLimit:'把返身或处境的推论，与交接记录、随访意见组合。',
    locked:'照片与半句录音还不能确认锁人。',
    completeInfo:'签收人是小春，需另查住客实际收到什么。',
    rescueHarmed:'发现伤情的时间，不能单独证明致伤原因。',
    rescueSafe:'未查明加重，不能推出已经证实安全。',
    default:'这组材料还接不上所选说法。'
  };
})();
