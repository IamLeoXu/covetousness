/* Authored case material. This demo has no API or external dependencies. */
(function (root) {
  'use strict';
  const evidence = {
    photo: {
      code: '01', title: '被转发的钥匙照片', label: 'SHARED IMAGE', type: 'photo', place: 'studio',
      source: '公共转发件 / 发布于 11.17', image: 'assets/keys.webp',
      lead: '“四个人的钥匙，都在她手里。”',
      paragraphs: ['这是转发时附上的文字。图中是一串四枚钥匙，系着旧玫瑰色的牌子。', '原图没有附拍摄日期，也没有列出钥匙对应的住客。照片边缘，一角纸牌已经磨破。'],
      note: '转发配字与照片本身，是两种来源。'
    },
    keys: {
      code: '02', title: '前台留下的旧钥匙', label: 'KEY RING', type: 'object', place: 'lobby',
      source: '小楼前台 / 经许可查看', image: 'assets/keys.webp',
      lead: '四枚钥匙。四个被磨淡的编号。',
      paragraphs: ['把牌子翻过来，能辨认出 A12、B07、C19、D03。A12 的右下角缺了一小片。', '玫瑰色的牌子、钥匙排列和纸牌缺口，与转发照片中的那串相符。'],
      rows: [['纸牌编号', 'A12 / B07 / C19 / D03'], ['保存位置', '共用前台的旧物盒']],
      note: '编号可以核对，钥匙的来历还需要另一份记录。'
    },
    ledger: {
      code: '03', title: '退住与归还登记', label: 'RETURN LEDGER', type: 'ledger', place: 'lobby',
      source: '小楼前台 / 退住簿原件',
      lead: '“钥匙交回”一栏，有四个签名。',
      paragraphs: ['登记由各住客在离开时签署。四个编号均有归还日期，早于 11.16 的事故。'],
      rows: [['编号', '退住日 / 钥匙'], ['A12', '08.04 / 已归还'], ['B07', '08.19 / 已归还'], ['C19', '09.02 / 已归还'], ['D03', '09.13 / 已归还']],
      note: '这本簿子记录的是退住的人，并非当晚四名住客的名单。'
    },
    entry: {
      code: '04', title: '当晚入口录像摘录', label: 'ENTRY RECORD', type: 'video', place: 'archive',
      source: '11.16 / 入口录像复核摘录', image: 'assets/city.webp',
      lead: '22:07:16，奈央打开了前门。',
      paragraphs: ['连续画面中，现住客奈央从自己的袋子里取出钥匙，打开前门，独自离开。小春没有出现在这个片段里。', '这份摘录仅对应画面中的人和时段，没有覆盖整晚所有出口。'],
      rows: [['日期', '11.16'], ['时间', '22:07:16 — 22:07:39'], ['复核身份', '奈央 / 当晚现住客']],
      note: '这是文字化的录像摘录，本小样未制作人物监控视频。'
    },
    snippet: {
      code: '05', title: '网上流传的九秒录音', label: 'NINE SECONDS', type: 'transcript', place: 'studio',
      source: '公共切片 / 无通话编号',
      lead: '“别走，等我两分钟。”',
      transcript: [['小春', '等一下。'], ['记录', '转接双音。'], ['小春', '别走，等我两分钟。我这边还没弄完。']],
      paragraphs: ['转发者配字：“事故前，她还在阻拦住客离开。”切片本身没有交代受话人和绝对时间。'],
      note: '本 demo 以文字转录展示对白，不以合成语音冒充原始录音。'
    },
    call: {
      code: '06', title: '安置站的原始通话转录', label: 'FULL CALL', type: 'transcript', place: 'studio',
      source: '安置站授权副本 / 通话登记附页',
      lead: '通话开始：11.16 / 22:19。',
      transcript: [['值班员 · 00:23', '我这班快结束了，后面要转接。'], ['小春 · 00:27', '等一下。'], ['记录 · 00:29', '转接双音。'], ['小春 · 00:30', '别走，等我两分钟。我这边还没弄完。'], ['值班员 · 00:36', '四个人？'], ['小春', '四个。一个已经送走了，剩下的今晚还没地方住。名字我一个个给你。']],
      rows: [['登记起始时间', '11.16 / 22:19'], ['受话单位', '临时安置站值班席']],
      paragraphs: ['转接双音和随后整句话，与九秒切片中的内容一致。该通话登记了四名住客。'],
      note: '通话的绝对时间来自登记；相同提示音只帮助定位同一段内容。'
    },
    rescue: {
      code: '07', title: '首次救援报警记录', label: 'RESCUE LOG', type: 'document', place: 'archive',
      source: '11.16 / 救援受理摘录',
      lead: '22:13，救援受理已经开始。',
      paragraphs: ['来电报告二层连接平台发生事故，有住客受伤。受理时间为 22:13。', '这能证明事故不晚于此时已经发生，不能据此倒推出精确的坍塌秒数。'],
      rows: [['受理时间', '11.16 / 22:13'], ['地点', '共助小楼 / 二层连接平台'], ['状态', '有人受伤 / 救援已派出']]
    },
    notice: {
      code: '08', title: '贴给住客的告示', label: 'POSTED NOTICE', type: 'notice', place: 'lobby',
      source: '小楼共用前台 / 当时张贴件',
      lead: '“近期维修，请轻步通行。再等三天。”',
      paragraphs: ['请大家晚间轻步，暂时不要自行安排搬离。等三天后统一处理。', '告示署名为小春，日期是 11.14。正文没有说明二层连接平台的具体危险，也没有写停止住宿。'],
      rows: [['署名', '小春'], ['日期', '11.14']],
      note: '住客采访确认，当时看到的是这张告示。'
    },
    report: {
      code: '09', title: '完整建筑评估报告', label: 'ASSESSMENT', type: 'report', place: 'archive',
      source: '受委托评估单位 / 报告原件',
      lead: '“应立即停止住宿，安排住客迁出。”',
      paragraphs: ['二层外廊与楼梯连接平台存在危险，且为二层房间进出的必经位置。', '在完成处置及复核前，应停止住宿。轻步、限人或继续等待，均不能替代停用。'],
      rows: [['出具日期', '11.13'], ['危险位置', '二层连接平台'], ['要求', '停止住宿 / 安排迁出']],
      companion: 'receipt', note: '报告后附一页签收回执，可以翻阅。'
    },
    receipt: {
      code: '10', title: '报告签收回执', label: 'SIGNED COPY', type: 'receipt', place: 'archive',
      source: '建筑评估报告 / 签收附页',
      lead: '11.13 / 18:20，签收人：小春。',
      paragraphs: ['回执所列报告编号与完整评估报告一致；交付目录包含“停止住宿要求”页。', '小春在回执上签署自己的名字。此时距 11.16 的事故还有三天。'],
      rows: [['接收人', '小春'], ['签收时间', '11.13 / 18:20'], ['交付内容', '评估正文及停止住宿要求']],
      companion: 'report'
    },
    postcard: {
      code: '11', title: '旧住客寄回的纸条', label: 'A NOTE BACK', type: 'letter', place: 'lobby',
      source: '小春同意展示的旧信 / 私人地址已遮去', image: 'assets/envelope.webp',
      lead: '“新地方很好，车也还给人家了。”',
      paragraphs: ['谢谢你替我借车。杯子你们留着用，我真不是忘了。', '别再替我留房间啦。我知道去哪儿找你。'],
      note: '这张纸条没有证明事故，却记录了她曾经送别人离开。'
    }
  };

  const facts = {
    oldKeys: {title: '照片中的旧钥匙属于已退住的人', short: '旧钥匙的来历', label: 'A DIFFERENT GROUP', body: '照片、实物编号和退住登记相符。这串钥匙不能直接代表事故当晚的现住客钥匙。', kind: 'key'},
    freeExit: {title: '22:07，奈央持自己的钥匙离开', short: '有人可以自行出入', label: 'ONE CONFIRMED EXIT', body: '入口记录确认一名现住客在这个时段自行离开。不能扩写为整晚所有人的所有出口都正常。', kind: 'key'},
    afterCall: {title: '“别走”来自事故后的安置电话', short: '切片发生在事故后', label: 'AFTER THE INCIDENT', body: '原通话 22:19 开始，救援在 22:13 已受理。这段话对安置站值班员说。', kind: 'voice'},
    knowledge: {title: '小春在事故前三天收到停用要求', short: '她已收到完整要求', label: 'RECEIVED / 11.13', body: '完整报告与对应回执确认交付日期、内容和签收人。', kind: 'notice'},
    noticeGap: {title: '住客告示省略了停止住宿要求', short: '两份告知存在差异', label: 'AN OMISSION', body: '报告要求停止住宿，告示仅说维修、轻步与再等三天。这证明内容不同，仍需核实小春当时收到什么。', kind: 'notice'},
    withheld: {title: '她收到停用要求，却未完整告知住客', short: '危险信息没有传达完整', label: 'RECEIVED ≠ DISCLOSED', body: '报告、签收与张贴告示构成完整链条；小春承认没有给住客看完整报告。知情和决定去留的问题仍需继续面对。', kind: 'notice'}
  };

  const topics = [
    {id: 'keys', en: 'THE KEYS', title: '钥匙与出入', question: '她拿走钥匙，把人锁住了吗？', claims: [
      {id:'locked', text:'这些材料证明，她收走所有现住客的钥匙。'},
      {id:'oldKeys', text:'照片中的那串钥匙，属于已经退住的人。'},
      {id:'freeExit', text:'事故前，有现住客持自己的钥匙离开。'}
    ]},
    {id: 'voice', en: 'THE NINE SECONDS', title: '九秒的上下文', question: '“别走”发生在什么时候？', claims: [
      {id:'beforeCall', text:'她在事故前对住客说“别走”。'},
      {id:'afterCall', text:'这句话发生在事故后，说给安置站值班员。'},
      {id:'innocent', text:'录音得到澄清，因此她对其他问题也没有责任。'}
    ]},
    {id: 'notice', en: 'WHAT THEY KNEW', title: '住客得到的信息', question: '他们知道的，是哪一种危险？', claims: [
      {id:'completeInfo', text:'住客已经得到完整的停止住宿要求。'},
      {id:'knowledge', text:'事故前三天，小春已经收到完整停用要求。'},
      {id:'noticeGap', text:'她贴给住客的告示，省略了报告中的停用要求。'},
      {id:'withheld', text:'她收到停用要求，却没有完整告知住客。'},
      {id:'intent', text:'这些材料证明，她希望事故发生。'}
    ]}
  ];

  const scenes = {
    studio: {en:'STUDIO / 01', title:'录音室', background:'city', caption:'这些材料，我都带来了。先别拿一张照片就下结论。', speaker:'小春',
      items:[{id:'photo',x:16,y:60,label:'SHARED IMAGE',hint:'翻看网上转发的钥匙照片',art:'photo'}, {id:'snippet',x:34,y:73,label:'NINE SECONDS',hint:'查看流传录音的文字转录',art:'tape'}, {id:'call',x:49,y:52,label:'CALL ARCHIVE',hint:'翻阅原始通话和登记',art:'folder'}]},
    lobby: {en:'FRONT DESK / 02',title:'小楼前台',background:'windows',caption:'纸牌的边磨掉了。钥匙却一把也没扔。',speaker:'现场笔记',
      items:[{id:'keys',x:24,y:48,label:'KEY RING',hint:'把旧钥匙拿近些看',art:'keys'}, {id:'ledger',x:54,y:44,label:'RETURN LEDGER',hint:'翻开退住与钥匙归还登记',art:'ledger'}, {id:'notice',x:78,y:32,label:'POSTED NOTICE',hint:'看看住客当时能读到什么',art:'notice'}, {id:'postcard',x:78,y:71,label:'A NOTE BACK',hint:'读一张被保存的旧纸条',art:'letter'}]},
    archive: {en:'RECORD ROOM / 03',title:'资料台',background:'vault',caption:'日期、签名和原件。先看它们实际记下了什么。',speaker:'主持人',
      items:[{id:'entry',x:22,y:42,label:'ENTRY RECORD',hint:'查看当晚入口记录',art:'video'}, {id:'report',x:56,y:46,label:'ASSESSMENT',hint:'展开完整报告及其签收附页',art:'report'}, {id:'rescue',x:80,y:67,label:'RESCUE LOG',hint:'核对首次救援受理的时间',art:'folder'}]}
  };

  const intro = [
    {who:'小春', text:'糖在最上面。证物在下面。……你先别把红灯打开。'},
    {who:'主持人', text:'网上说，你拿走了住客的钥匙，还在事故前让他们“别走”。'},
    {who:'小春', text:'门没锁。原件、旧钥匙、登记，我都带了。你可以核对。'},
    {who:'主持人', text:'先弄清这些材料能证明什么，再谈你为什么让他们留下。'}
  ];
  root.InquiryData = {version:'0.1',evidence,facts,topics,scenes,intro};
})(typeof window !== 'undefined' ? window : globalThis);
