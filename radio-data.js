/* One night at AFTER HOURS. All broadcasts in this fiction stay inside the game. */
(function(){
  'use strict';const D=window.InquiryData;D.version='0.4';
  D.newRadioState=()=>({introDone:false,prologueStep:0,tutorial:'log',queued:[],order:'facts-first',lifeQuote:'love',firstFact:null,previewed:'',phase:'off-air',transmitIndex:0,airedEnding:null});
  D.restoreRadioState=function(value,ending){
    const fresh=D.newRadioState();if(!value||typeof value!=='object'){if(ending){fresh.phase='archived';fresh.airedEnding=ending;}return fresh;}
    fresh.introDone=value.introDone===true;fresh.prologueStep=Math.max(0,Math.min(4,Number(value.prologueStep)||0));fresh.tutorial=['log','argument','done'].includes(value.tutorial)?value.tutorial:'log';
    fresh.queued=[...new Set(Array.isArray(value.queued)?value.queued.filter(id=>['rumor','warning','rescue','life'].includes(id)):[])];fresh.order=value.order==='life-first'?'life-first':'facts-first';fresh.lifeQuote=['love','break','friend'].includes(value.lifeQuote)?value.lifeQuote:'love';fresh.firstFact=['afterCall','oldKeys','freeExit'].includes(value.firstFact)?value.firstFact:null;fresh.previewed=typeof value.previewed==='string'?value.previewed:'';
    fresh.phase=['off-air','on-air','archived'].includes(value.phase)?value.phase:'off-air';fresh.transmitIndex=Math.max(0,Math.min(5,Number(value.transmitIndex)||0));fresh.airedEnding=['hold','release'].includes(value.airedEnding)?value.airedEnding:null;
    if(Array.isArray(value.airScript)&&value.airScript.length===6&&value.airScript.every(item=>item&&typeof item.id==='string'&&typeof item.title==='string'&&typeof item.body==='string'))fresh.airScript=value.airScript.map(item=>({id:item.id.slice(0,30),title:item.title.slice(0,100),body:item.body.slice(0,3000)}));
    return fresh;
  };
  D.radioSegments=[{id:'rumor',code:'A1',title:'先把流言放回原处',need:'核实第一卷的一项最初指控。'},{id:'warning',code:'A2',title:'能够离开，知道危险了吗',need:'核实停用告知与安置款用途。'},{id:'rescue',code:'A3',title:'救人的事实，归责的边界',need:'核实返身行动、当时处境与伤害因果。'},{id:'life',code:'B',title:'事故以前，她怎样生活',need:'完成六段人生、三条关系与正反侧写。'}];
  D.radioColdOpen=[
    {time:'00:52',tag:'BEFORE THE CITY SLEEPS',title:'上一档节目，刚刚结束。',body:['窗外的店招一盏盏暗下去。录音室的钟停在凌晨一点之前，线路指示灯仍亮着。','你是《AFTER HOURS》的主持人。这里接收人们讲不完的事。每一期，你把来稿、补访和原件整理成一段能播出的记录。','今晚，等在玻璃那边的人叫天音小春。你还没有听她开口，电话先响了。'],action:'接入值班线路',kind:'wake'},
    {time:'00:53',tag:'LINE 02 / BEFORE THE INTERVIEW',title:'“别只播那九秒。”',body:['奈央：「小春已经到你们那里了吗？网上那段录音，我听过。我们愿意给你看当晚的材料。」','奈央：「澪让我再确认一次，住院照片不要放。她现在还在恢复。你们能听小春解释，也请把发生在我们身上的事留下。」','你在值班单上记下：相关人授权的材料可以使用；没问清楚的，不替任何一方补完。'],action:'接收本期来稿',kind:'call'},
    {time:'00:54',tag:'INCOMING / AN UNVERIFIED EXCERPT',title:'一张照片，一段九秒的切片。',body:['四天前，共助小楼的连接平台发生事故，住客澪受伤。后来流传的配字说：负责人收走钥匙，把人留在危险里。','切片里，小春只说了一句“别走”。它还没有告诉你，对面是谁、说话是哪一天哪一分钟。','导播内线：「先送 CUE。ON AIR 连着听众，预听才连着你的监听。」'],action:'登记来稿，继续准备',kind:'cue'},
    {time:'00:56',tag:'THE FULL RECORD / A LITTLE CONTEXT',title:'原通话，躺在另一只文件夹里。',body:['小春提交了节目可看的材料；外勤也在许可下记录了前台实物。场景里的“前台”，是这些已经取得的取材回放。','今晚你要准备两条内容：她实际做过什么，以及她怎样成为今天的自己。核实过的段落先留在待播盘，最后一句公开评价由你署名。','导播内线：「把原通话也放到 CUE。等她进来，再拿首次报警记录核一下时间。我们不赶这几十秒。」'],action:'打开录音室的门',kind:'original'},
    {time:'00:58',tag:'STUDIO A / OFF AIR',title:'她先垫了一张旧宣传单。',body:['纸袋放上桌之前，她问这里会不会留水印。最上面是一盒糖，文件和钥匙压在下面。','小春：「糖在上面，证物在下面。那块碎了，我吃。」','你把话筒推向她。此时录下的只是节目准备；红色播出灯，留到你愿意为稿件负责的时候再亮。'],action:'开始节目前访谈',kind:'guest'}
  ];
  D.intro=[{who:'主持人',text:'今晚这期是你的来访记录。流传的片段我先送到预听，原件也在手边。'},{who:'小春',text:'那段九秒的，我知道。还有钥匙照片。原通话我带来了。'},{who:'主持人',text:'奈央来过电话。我们用授权材料，澪不愿公开的照片不放。你有要先确认的吗？'},{who:'小春',text:'门没锁。我也没有先拿自己的东西跑。……告示是我写的，这个我知道。'},{who:'主持人',text:'先核对时间。再问你实际做过什么，也听听这些东西为什么一直留在你手里。'}];
  D.scenes.studio.en='STUDIO A / REC';D.scenes.studio.title='节目前访谈';D.scenes.studio.caption='话筒在录，播出灯还没亮。你想先问哪一段？';
  D.scenes.lobby.en='FIELD TAPE / 11.19';D.scenes.lobby.title='前台取材回放';D.scenes.lobby.speaker='外勤记录';D.scenes.lobby.caption='经许可取得的前台记录。日期、编号与原物都留在画面里。';
  D.scenes.archive.en='STATION ARCHIVE / 03';D.scenes.archive.title='台内档案';D.scenes.archive.speaker='导播内线';D.scenes.archive.caption='原件和授权副本分开归档。准备播出的每句话，都得能找回来源。';
  D.evidence.entry.note='台内保存的是经授权的连续影像摘录。它只覆盖列出的具体人物与时段。';
  D.evidence.returnVideo.note='背景仅作档案条目封面。核对以列出的时间、行动与授权复核摘录为限。';
})();
