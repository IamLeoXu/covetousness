/* Authored life history. These records belong to the portrait, not the prosecution. */
(function(){
  'use strict';
  const D=window.InquiryData;
  D.version='0.3';
  D.evidence.dispatch.clock='22:13';D.evidence.falling.clock='22:14:50';
  D.evidence.returnVideo.timecode='11.16 / 22:15:08 — 22:17:31';
  D.caseLayers=[
    {id:'keys',number:'01',title:'最初的指控',short:'钥匙与原话',materials:['photo','snippet','keys','ledger','entry','call','rescue'],facts:['oldKeys','freeExit','afterCall'],caption:'只核对钥匙、出入和那句话的语境。其他卷宗先收起来。'},
    {id:'notice',number:'02',title:'危险与告知',short:'报告与款项',materials:['report','receipt','notice','grant','spending'],facts:['knowledge','noticeGap','withheld','misuse'],caption:'这一层只比较她知道什么、住客知道什么，以及安置款的用途。'},
    {id:'rescue',number:'03',title:'救援与后果',short:'行动与因果',materials:['dispatch','falling','returnVideo','handoff','expert'],facts:['rescueAct','rescueContext','causationLimit'],caption:'返身是事实。她面对什么、是否新增损害，分开核实。'}
  ];
  Object.values(D.evidence).forEach(item=>item.lane='case');
  D.caseLayers.forEach(layer=>{layer.materials.forEach(id=>D.evidence[id].layer=layer.id);layer.facts.forEach(id=>D.facts[id].layer=layer.id);});
  const source=(code,title,label,lead,paragraphs,extra={})=>({code,title,label,lead,paragraphs,type:'letter',lane:'life',place:'portrait',source:'私人档案 / 经本人及相关人授权摘录',...extra});
  Object.assign(D.evidence,{
    lifeBoxes:source('L01','三次转学的纸夹','BOXES / AGE 16','同一张课表，换过三个校名。',['父母因工作在几年里换过住处。纸夹里有不同学校的路线图，每张都标了卖热牛奶的小店。','她在最后一个纸箱上写“下次先拆这个”，里面是杯子、发带和一本没看完的漫画。','纸夹里没有家人断绝联系的记录。频繁迁居与被家人抛弃，是不同的事。'],{image:'assets/envelope.webp'}),
    lifeBoxesVoice:source('L02','母亲谈那些纸箱','A VOICE FROM HOME','“新同学第三天就跟她换橡皮了。”',[],{type:'transcript',source:'母亲的补访 / 小春同意使用',transcript:[['母亲','她先把桌面摆得跟旧家一样。第二天就出门找那边有没有卖热牛奶的。'],['母亲','她很会交朋友。第三天就拿一块橡皮换了人家半包糖。'],['小春','三分之一包。她吃过了，半包我可不换。'],['母亲','我们现在也通电话。她连我新买的锅是什么颜色都要问。']]}),
    lifeTickets:source('L03','两张电影票与背面涂鸦','TWO TICKETS / AGE 19','票上没有座位挨在一起，她把箭头画到了另一张。',['那年她与同龄的遥开始交往。票背是遥替她画的橱窗草图，她回了一句：“丑得很有主张，留着，我修。”','另一张夹着她做的布样。遥在背面记了她第一次陈列作品的展出日期，不是借款或代办事项。','他们允许保留这些文字，但不公开影像。本章不为遥增加人物立绘。'],{image:'assets/envelope.webp'}),
    lifeLoveVoice:source('L04','旧同事谈那段恋爱','NOT JUST A LOSS','“她以前会嫌下班太慢。”',[],{type:'transcript',source:'旧同事纱纪 / 录音摘录',transcript:[['纱纪','她会换两次蝴蝶结再出门，嘴上说是店里落灰了。'],['纱纪','遥来看她第一次做的橱窗，她隔着玻璃指挥人站远一点，说太近了看不出全貌。'],['小春','本来就该站远一点。……后来我们去吃了面。'],['纱纪','她不是只替对方做事。她也会撒娇、挑剔，吵完还等对方来哄。那时候很开心。']]}),
    lifeChoice:source('L05','三月的回函与九月的车票','TWO DIFFERENT DATES','放弃培训在先；遥离城在后。',['20岁三月，橱窗陈列培训邀请她离城四个月。回函由她本人拒绝，早于遥收到外地录用。','同年九月，遥接受外地工作。他们当时仍在交往，约定轮流探望。','小春接手小楼是她自己的选择。现有材料不支持“遥先离开，所以逼她放弃培训”这条时间顺序。'],{rows:[['三月','她签回“不参加本次培训”'],['七月','遥收到外地录用'],['九月','遥离城，双方约定探望']]}),
    lifeChoiceVoice:source('L06','小春谈没有去的培训','MY OWN CHOICE','“别把我自己选的事，也算到别人头上。”',[],{type:'transcript',source:'本次访谈 / 对照旧回函',transcript:[['小春','我想过要不要去。那时小楼正好要换人，我也觉得自己能做。'],['主持人','遥让你留下？'],['小春','没有。遥那份录用比我回函晚了四个月。'],['小春','我舍不得那条路，和当年不是我自己选的，是两回事。别把我写得连一个决定都没做过。']]}),
    lifeLetter:source('L07','完整的分手信与后来那张行程','A FINISHED SENTENCE / AGE 21','信写的是“结束”，不是“再等一等”。',['异地交往持续了一年。遥在信中说仍珍惜共同的过去，但已经不愿继续恋爱，明确提出分手。没有第三者或死亡的记录。','她后来写了一份探望行程，日期在分手信之后；行程没有得到遥确认。','信的末尾：“我们过去是真的。我现在说结束，也是真的。别替我订下一次车了。”'],{image:'assets/envelope.webp'}),
    lifeBreakVoice:source('L08','她终于读完信的最后一句','AFTER THE LAST LINE','“我把前面读了好多次，后面不读。”',[],{type:'transcript',source:'本次访谈 / 她亲自确认的时间线',transcript:[['小春','我不是没看见那句。我把前面读了好多次，后面不读。'],['主持人','后来那次行程，是两个人约好的？'],['小春','不是。是我订完才问的。遥没有答应，我也没去。'],['小春','那个人没有死，也没有等着我去救。就是不想再跟我谈恋爱了。……这句很难听，我知道怎么说。']]}),
    lifeFabric:source('L09','寄往外地工作室的样衣单','A SEND-OFF / AGE 24','她署名要了稿费，也亲自把箱子送上车。',['纱纪获邀去外地工作室，离开了她们原先一起做零活的小组。小春帮她改完最后一批样衣。','出库单列着双方署名和已结清的稿费。小春在角落写“别再把拉链装反，返工不包邮”。','寄回的明信片上，纱纪说新工作很好。小春另约了有空时去玩，没有擅自替朋友保留一个回来的岗位。'],{image:'assets/envelope.webp'}),
    lifeFriendVoice:source('L10','纱纪谈那次送行','SHE COULD LET GO','“她没装大方，脸臭了一路，还是帮我搬了。”',[],{type:'transcript',source:'纱纪 / 本次补访',transcript:[['纱纪','她说我走了谁来拆她的线。然后把我漏结的工钱一笔一笔算出来。'],['纱纪','送行那天脸臭了一路，最后塞给我一包针，说那边的不好用。'],['小春','有两包。另一包她自己弄丢了。'],['纱纪','她舍不得，但那次没有拦我。我们后来还是朋友，吵架也没少。']]}),
    lifeMoving:source('L11','母亲搬家时的清单','A NEW ADDRESS / AGE 26','地址换了，联系人没有删掉。',['母亲因通勤和保养房屋的负担搬去较小的住处，提前给过小春新地址。','旧餐桌留在原屋，小春经同意保留了一只杯子。清单没有撤回亲子关系或拒绝往来的内容。','同一时期，她开始反复确认别人是否安全到家，也有未经奈央同意续留房间的记录。二者可以放进侧写，不能凭此诊断她或替当晚的行为免责。'],{rows:[['新地址','搬家前一周已告知'],['保留旧物','杯子一只 / 母亲同意'],['联系方式','原号码继续使用']]}),
    lifePhoneVoice:source('L12','那通迟接的电话','THE CALL STILL CAME','“菜在锅里，我刚才没听见。”',[],{type:'transcript',source:'母女共同提供的通话摘录 / 与搬家清单对照',transcript:[['母亲','菜在锅里，我刚才没听见。你怎么打这么多次？'],['小春','我就问一下。'],['母亲','下周你来不来？来就买你爱吃的。'],['小春','来。……那个杯子我还留着。'],['母亲','留着就留着。人又不是只在那个杯子里。']]}),
  });
  const interview=(question,good,answer,bad,correction)=>({question,options:[{id:'assume',text:bad,lines:correction},{id:'ask',text:good,lines:answer},{id:'later',text:'先不追问，回去看看原件。',lines:['好。看完再问，别替我把话补上。']}]});
  D.lifeEpisodes=[
    {id:'boxes',age:'16',name:'下次先拆这个',tag:'FAMILY / MOVING',sources:['lifeBoxes','lifeBoxesVoice'],question:'频繁搬家，究竟让她失去了什么，又留下了什么？',interview:interview('先问她一个能由记录核对的问题。','那些箱子是谁陪你收的，后来还联系吗？',['纸箱上的字是我的。妈妈负责贴，我总嫌她贴歪。','你去问她也行。她肯定又要说我换糖那件事。'],'所以你从小就没有人爱你？',['你是从哪里看出“没人爱”的？','搬家是真的。我妈昨天还问我吃没吃饭。']),answer:'continuity',options:[['abandoned','她从小被家人抛弃，所以只能依赖旧物。'],['continuity','迁居不断，她用熟悉的物件接续生活；家人的联系仍在。'],['unchanged','保留旧物说明迁居从未影响她。']],front:'她会在新地方重新交朋友，也会认真给自己搭一个家。',back:'她很早就学会把“还在”放进可以握住的东西里。',voice:'三分之一包。半包我可不换。'},
    {id:'love',age:'19',name:'两张不相邻的票',tag:'LOVE / TOGETHER',sources:['lifeTickets','lifeLoveVoice'],question:'这段感情只有她单方面付出吗？',interview:interview('她不需要你替她把过去全写成悲剧。','那时候有什么事，是对方陪你做的？',['第一次橱窗。遥看了很久，说领口那块颜色太暗。','我当场把人赶远了两步。后来还是改了。纱纪看见了。'],'所以你从头到尾只是被利用？',['你都没问过开心的那部分。','过去过得好，不会因为后来分手就变成假的。']),answer:'mutual',options:[['used','两张旧票足以证明对方一直在利用她。'],['never','后来分手，说明当时也没有真实感情。'],['mutual','旧物与旁证支持真实、相互的亲密；后来结束不抹去它。']],front:'她曾经爱得轻快，会挑剔、会撒娇，也被认真喜欢过。',back:'越是真的幸福，越难接受它不能一直续下去。',voice:'第一次橱窗。那天的面也很好吃。'},
    {id:'choice',age:'20',name:'两份不同日期',tag:'WORK / CHOICE',sources:['lifeChoice','lifeChoiceVoice'],question:'她放弃培训，是被恋人的离开逼出来的吗？',interview:interview('比较日期，再问决定是谁做的。','你拒绝培训时，遥已经拿到外地录用了吗？',['还没有。那是后来的事。','我想把这边接过来，也觉得自己做得了。你可以说我选错，不能说不是我选的。'],'为了那个人，你才被迫留在这里吧？',['你把两张纸的月份看反了。','我舍不得一条没走的路，不等于能拿它向别人讨债。']),answer:'own',options:[['forced','遥先离城，迫使她放弃已经谈好的培训。'],['own','她先自主拒绝培训，遥后来才离城；损失不能改写顺序。'],['easy','既然是自主选择，她后来就不可能遗憾。']],front:'她有专业兴趣、判断和担当，自己的决定由自己署名。',back:'没有走过的路，后来变成了越来越难割舍的投入。',voice:'你别把我写得连一个决定都没做过。'},
    {id:'break',age:'21',name:'没有读的最后一句',tag:'LOVE / ENDING',sources:['lifeLetter','lifeBreakVoice'],question:'后来那张行程，是共同约定，还是她替对方延长的以后？',interview:interview('问清楚谁确认过那份行程。','分手后的探望，是双方重新约好的吗？',['没有。是我先订，再去问的。遥没有答应。','那封信没说等一等。我知道它说的是什么。'],'对方不回头，所以你做什么都可以理解吧？',['理解什么？替人订好下一次？','你可以听我说舍不得，不用替我说那样就对。']),answer:'ended',options:[['dead','遥已经死亡，她只是在等待一个永远回不来的恋人。'],['promise','她写下新行程，就说明双方仍然承诺继续恋爱。'],['ended','分手已被明确提出；后来的行程未获确认，她在拖延承认结束。']],front:'她最终能说出那句难听的实话，没有把对方写成恶人。',back:'她开始用单方面安排的“下一次”，抵住已经说完的结束。',voice:'不是等着我去救。就是不想再跟我谈恋爱了。'},
    {id:'friend',age:'24',name:'不包邮的针线',tag:'FRIENDSHIP / SEND-OFF',sources:['lifeFabric','lifeFriendVoice'],question:'舍不得一个人，是否就必然只能阻拦她离开？',interview:interview('查那次送行实际发生了什么。','纱纪离开时，你是怎么帮她结完那份工作的？',['最后那批线拆了两遍。稿费一分不能少。','送她上车的时候我没说好听的。针是真的好用，她后来还来问我买。'],'你肯定从来没真心送走过谁？',['你可以问纱纪。那张出库单她还留着。','舍不得、脸臭，和最后帮她搬上车，可以是同一天。']),answer:'letgo',options:[['always','她一生都只能阻拦别人独立。'],['letgo','她曾舍不得仍帮朋友离开，并继续拥有来往与自己的专业价值。'],['settled','一次送行便证明她此后所有安排都尊重边界。']],front:'她有手艺、有脾气，有一个会回嘴、仍愿意来往的朋友。',back:'她并非不懂放手，后来却越来越难重复那一次。',voice:'有两包针。另一包她自己弄丢了。'},
    {id:'phone',age:'26',name:'迟接的电话',tag:'FAMILY / STILL HERE',sources:['lifeMoving','lifePhoneVoice'],question:'地址和习惯变了，是否意味着关系已经消失？',interview:interview('把她担心的事，与对方实际做的事分开。','母亲搬家后，她还邀请你过去吗？',['有。还问我吃什么。我打了好几次，她只是没听见。','我知道。知道和等的时候不乱想，不是一回事。'],'母亲搬走，等于所有人都抛弃了你？',['她只是换了个住处。你别这么写她。','杯子还在我这里。人也还在，就是不在旧房子里了。']),answer:'changed',options:[['gone','一次迟接足以证明母亲已经拒绝她。'],['excused','害怕失去，便使她后来替别人决定具有正当性。'],['changed','联系仍在；她越来越难容忍关系变化，这能解释恐惧但不能免责。']],front:'她仍被家人和朋友牵挂，也还有主动去见他们的机会。',back:'她渐渐把没有立即回应，听成了即将失去。',voice:'人也还在，就是不在旧房子里了。'}
  ];
  D.lifeConnections=[
    {id:'not-erased',title:'幸福与结束，能否同时是真的？',pair:['love','break'],answer:'both',options:[['fraud','后来分手，反证此前的亲密全是骗局。'],['both','亲密真实发生过，结束也已明确发生；二者不互相取消。'],['owed','曾经相爱，就欠她一个永远继续的承诺。']],note:'这条连线保留她被爱过的魅力，也保留别人结束关系的选择。'},
    {id:'own-cost',title:'没走的路，能向谁索还？',pair:['choice','break'],answer:'agency',options:[['agency','她自主留下后确有遗憾，但不能把投入变成对方必须留下的债。'],['blame','恋人离开，造成了此前已经作出的培训决定。'],['nothing','自主选择的人没有资格再感到遗憾。']],note:'她有能动性，也会痛。理解遗憾，不必改写日期或转移所有责任。'},
    {id:'not-fate',title:'她一直都只有这一种活法吗？',pair:['friend','phone'],answer:'change',options:[['fate','她从来只会占有别人，过去的善意都没有意义。'],['clean','有过一次真诚送行，就能撤销当下已经核实的越界。'],['change','她曾能舍不得仍放手；如今更怕变化，弧光在这种转变中。']],note:'侧写描述变化，不替当晚的隐瞒、款项或救援直接增加、抵销法律责任。'}
  ];
  D.profiles=D.lifeEpisodes;
  D.facts.profileComplete.body='六段独立人生事件与三条关系已经核对。她有家庭、恋爱、专业和友谊；对变化的恐惧逐渐压过曾经会放手的能力。人物理解与案件归责分别保留。';
})();
