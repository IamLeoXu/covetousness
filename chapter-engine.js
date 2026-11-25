(function(){
  'use strict';
  const E=window.InquiryEngine,base=E.evaluate;
  const answer=(kind,lines,note,fact=null)=>({kind,lines,note,fact});
  E.evaluate=function(claim,materialIds){
    const ids=[...new Set(materialIds)];
    if(!['misuse','rescueAct','rescueContext','causationLimit','rescueHarmed','rescueSafe'].includes(claim))return base(claim,ids);
    if(!ids.length||ids.length>3)return answer('incomplete',['我们一次核对一件事。'],'选取一至三份相关材料。');
    const m=new Set(ids.filter(id=>id!==claim));
    if(!m.size)return answer('incomplete',['这还是刚才那项结论。'],'不能用一项结论证明它自己。');
    if(claim==='misuse')return m.has('grant')&&m.has('spending')?answer('supported',['房租一万二，旧维修四千八。我先把催的两笔付了。','钱没进我口袋。可我知道，你问的是安置的钱为什么没有先用来安置。'],'拨款条件与支出互证。未作私人消费，不等于符合指定用途。','misuse'):answer('incomplete',['你给我看的是钱去了哪里，还是这笔钱原本让做什么？'],'判断用途是否改变，需要指定用途与实际支出两面材料。');
    const act=m.has('returnVideo')||m.has('rescueAct');
    const context=(m.has('dispatch')&&m.has('falling'))||m.has('rescueContext');
    const limit=(m.has('expert')&&m.has('handoff'))||m.has('causationLimit');
    if(claim==='rescueAct')return act?answer('supported',['她还在上面。我回去了，奈央在外面接。','那时候我没有想钥匙，也没有想账本。'],'记录确认返身与抱出；救人是事实，方法与后果仍须另行核实。','rescueAct'):answer('incomplete',['你问我回没回去，楼梯口的记录能看到。'],'报警或接应指示，不能独立证明她之后实际做了什么。');
    if(claim==='rescueContext')return context?answer('supported',['我说过等。我真的站在门外等了一会儿。','后来又响了。我不知道还能不能等到他们上去。你现在说那不一定是要塌……那时候我不知道。'],'确认她面对的两种信息。新增掉落声能解释紧迫感，但不证明她的处理必然正确。','rescueContext'):answer('incomplete',[m.has('dispatch')?'你给我的是先前的指示。后来那一声，你也问问奈央。':'那一声发生以前，救援那边也跟我说过话。'],'需要同时核对原有接应指示和随后新增的现场信息。');
    if(claim==='causationLimit')return limit?answer('supported',['我把她抱出来了。可是你问是不是我抱坏的，我不知道。','她现在走路还是疼。你别拿“不能确定”告诉我，她就没有受伤。'],'首次专业检查在搬动后，意见明确保留真实的两种可能。不能确认新增损害，不等于确认无害；此前过错独立保留。','causationLimit'):answer('incomplete',[m.has('expert')?'意见里说缺少搬动前的检查。你能确认，第一次接手是什么时候吗？':'人是在我抱出来以后被检查的。可这能说清每一处伤是什么时候有的吗？'],'需要把首次检查的时点，与复核意见的证明范围放在一起。');
    if(claim==='rescueHarmed')return answer(limit?'contradicted':'overreach',['你给我的记录是后来查出来的伤。','我没法说抱的时候一定没错。可“有可能”，也不是“已经证明全是这样”。'],'后发生的检查不能自行完成因果证明；缺少前后对照时，不能把全部新增损害认定为已证实。');
    return answer(limit?'contradicted':'overreach',['我也希望一句“我是去救她的”，就能把所有问题说完。','但我知道，不能。'],'因果未能查明，不能推成搬动已获证实安全；返身救人也不抵销先前隐瞒。');
  };
  E.milestones=function(facts){const m=new Set(facts),first=['oldKeys','freeExit','afterCall'].some(id=>m.has(id)),warning=m.has('withheld')&&m.has('misuse'),rescue=m.has('rescueAct')&&m.has('rescueContext'),causation=m.has('causationLimit'),profile=m.has('profileComplete');return {first,warning,rescue,causation,profile,second:warning&&rescue&&causation&&profile,ready:first||warning||rescue||causation||m.has('knowledge')||m.has('noticeGap')||m.has('misuse')||m.has('rescueAct')||m.has('rescueContext')||m.has('profileSketch')||profile};};
})();
