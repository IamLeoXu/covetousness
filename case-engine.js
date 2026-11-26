(function (root) {
  'use strict';
  const has = (items,...ids) => ids.every(id => items.has(id));
  const reply = (kind, lines, note, fact = null) => ({kind,lines,note,fact});
  function evaluate(claim, materialIds) {
    const ids = [...new Set(materialIds)];
    if (!ids.length) return reply('incomplete',['你想问哪一份？先给我看看。'],'选取与你的说法有关的材料。');
    if (ids.length > 3) return reply('incomplete',['我们一件一件看。'],'一次最多提交三份材料。');
    const m = new Set(ids.filter(id=>id!==claim));
    if(!m.size) return reply('incomplete',['这是你刚才已经提出的结论。要重新核对，就回到它依据的材料吧。'],'一项结论不能用它自己证明。已核实的推论可以用来回答新的问题。');
    const old = has(m,'keys','ledger') || m.has('oldKeys');
    const exit = m.has('entry') || m.has('freeExit');
    const after = has(m,'call','rescue') || m.has('afterCall');
    const knew = has(m,'report','receipt') || m.has('knowledge');
    const gap = has(m,'report','notice') || m.has('noticeGap');
    const withheld = has(m,'knowledge','notice') || has(m,'noticeGap','receipt') || has(m,'knowledge','noticeGap');
    switch (claim) {
      case 'oldKeys':
        if(old) return reply('supported',['是他们搬走以后交回的。牌子是自己写的，我就一直留着。','这串开不了现在的锁。你不能拿它说，我收走了当晚住客的钥匙。'],'实物编号与退住日期相符。这项结论只针对这串钥匙。','oldKeys');
        if(m.has('photo') && !m.has('keys')) return reply('incomplete',['照片里看得清是谁的吗？你可以把前台那串翻过来看看。'],'照片未注明钥匙归属，尚不能确认这一说法。');
        return reply('incomplete',['你给我看的东西，能对上这些钥匙的编号和归还时间吗？'],'需要核实钥匙的身份与交回记录，外观或一张纸各自都不够。');
      case 'freeExit':
        if(exit) return reply('supported',['那天奈央是自己出去的。她本来就有自己的钥匙。','但我知道，你接下来还是会问，她为什么又愿意留下。'],'确认的是一名现住客在记录时段的出入，不是整晚所有人的所有行动。','freeExit');
        if(old) return reply('incomplete',['那几个人早就搬走了。你问的不是当晚住的人吗？'],'旧住客交回钥匙，并不能独立证明事故当晚的出入情况。');
        return reply('incomplete',['谁？什么时候？如果要说有人离开，得看那一晚的记录。'],'当前材料尚不能确认当晚具体的出入行为。');
      case 'locked':
        if(exit || old) return reply('contradicted',['你刚才给我看的材料，不就在说另一件事吗？','先弄清这是谁的钥匙，或者那个人是怎么出去的。'],'提交材料与“收走所有现住客钥匙”的说法冲突。');
        if(m.has('snippet')) return reply('overreach',['我说过“别走”，不等于我把门锁了。你听过电话里另一个人说话吗？'],'一句没有上下文的话不能独立证明收走钥匙或锁人。');
        return reply('overreach',['照片里有钥匙，怎么就成了所有现住客的钥匙？','你可以查。别替它把没写的部分补上。'],'目前材料只能说明她持有一串钥匙，无法支持这项指控。');
      case 'afterCall':
        if(after) return reply('supported',['对。我是在求接线的人先别转接。还有三个人，今晚没地方住。','你们能把原话一起放吗？我已经听了太多次那九秒。'],'通话登记晚于救援受理；原件确认受话人及上下文。','afterCall');
        if(m.has('call')) return reply('incomplete',['电话登记在这里。你还要跟那晚哪一件事对时间？'],'通话时间已知，还缺能独立定位事故先后的记录。');
        return reply('incomplete',['切出来的那段没有时间，也没有对方的声音。原件在通话档案里。'],'需要核实原通话和事件时间，不能只用切片推断。');
      case 'beforeCall':
        if(after) return reply('contradicted',['你把两个时间再看一遍。那时已经出事了。'],'通话登记与救援记录明确反对“事故前”这一说法。');
        return reply('overreach',['“事故前”是转发的人写的。你找到它是几点了吗？'],'发布者的配字不是已核实的通话时间。');
      case 'innocent':
        return reply('overreach',after ? ['这段是被截错了。','……但你桌上那张报告，还是我签收的。'] : ['电话你还没核对完。怎么已经替别的事都下结论了？'],'澄清一项指控，不足以免除另一项行为的责任。');
      case 'knowledge':
        if(knew) return reply('supported',['看过。签名是我的。','那时候我还在问报价。我以为能再撑几天。'],'报告编号、交付内容与签收时间一致。','knowledge');
        if(m.has('report')) return reply('incomplete',['这张是完整的。你要确认我什么时候拿到的，可以看后面的交付记录。'],'报告的出具日期，不自动等于当事人接收日期。');
        return reply('incomplete',['你现在问的是，报告有没有送到我手里，对吗？'],'核实她接收的具体版本与时间。');
      case 'noticeGap':
        if(gap) return reply('supported',['告示是我写的。我写了维修，写了再等三天。','没有把停止住宿那段贴出去。'],'对照确认两份文本存在关键差异；她何时收到原件仍可继续核对。','noticeGap');
        return reply('incomplete',['你要比的是哪两份？住客看到的那张，也在前台。'],'需要同时比较原要求与实际告示。');
      case 'withheld':
        if(!m.has('knowledge')&&!m.has('noticeGap'))return reply('incomplete',['先分清我收到过什么，或者两张告知差在哪里，再把结论接到新材料上。'],'这一条必须使用已核实推论：先做“她已收到完整要求”或“两份告知存在差异”，再与另一份原件组合。三份原始线索不能跳过这层核对。');
        if(withheld) return reply('supported',['报告我看了。我没有把整份给他们。','你要问为什么……因为他们看完就会走。','以前每次差一点，我都补过去了。这次我也想先把楼保住。'],'确认了知悉与告知之间的差异；这不等于证明她希望伤害发生。','withheld');
        if(gap) return reply('incomplete',['两张确实不一样。你问我当时收到的是哪一份？'],'告示有省略，但还需要确认她收到完整要求的事实。');
        if(knew) return reply('incomplete',['我收到过。你现在要核对，他们看见的是什么，对吧？'],'收到报告与向住客告知，是两个需要分别核实的事实。');
        return reply('incomplete',['你说我收到的，和你说他们没看到的，是哪两份？'],'需要把原要求、签收与实际告知连成证据链。');
      case 'completeInfo':
        if(gap || withheld) return reply('contradicted',['告示里没有那一段。你刚才不是已经看见了吗？'],'两份文本存在关键差异，不能认定完整告知。');
        if(knew || m.has('receipt')) return reply('overreach',['这是我收的。住客有没有看到，不能拿我的签名当他们的。'],'她收到报告，不能独立证明住客也得到了完整信息。');
        return reply('incomplete',['你看过贴给他们的那张了吗？'],'需要核实住客实际获得的信息。');
      case 'intent':
        return reply('overreach',['我没给他们看完整的，这件事我认。','但我没有想让谁受伤。你给我的这些，也没有写我想这样。'],'危险信息的隐瞒与希望事故发生，不是同一个已证实的结论。');
      default:
        return reply('incomplete',['你具体想问哪一句？'],'先选择一个明确的说法。');
    }
  }
  function milestones(facts) {
    const set = new Set(facts);
    return {first: ['oldKeys','freeExit','afterCall'].some(id=>set.has(id)), second:set.has('withheld')};
  }
  root.InquiryEngine = {evaluate,milestones};
})(typeof window !== 'undefined' ? window : globalThis);
