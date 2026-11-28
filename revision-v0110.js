(function(){
  'use strict';const D=window.InquiryData;
  D.version='0.11.0';D.chapterTitle='积隅';D.characterId='koharu';D.expectedCharacters=['koharu'];D.campaignComplete=false;
  const previousNew=D.newRadioState,previousRestore=D.restoreRadioState;
  D.newRadioState=()=>({...previousNew(),lifeReadings:{}});
  D.restoreRadioState=(value,ending)=>{
    const r=previousRestore(value,ending),choices=['good','bad','objective','zero'];
    r.lifeReadings=value?.lifeReadings&&typeof value.lifeReadings==='object'?Object.fromEntries(Object.entries(value.lifeReadings).filter(([id,side])=>D.lifeEpisodes.some(event=>event.id===id)&&['front','back','both'].includes(side))):{};
    r.history=Array.isArray(value?.history)?value.history.filter(item=>item&&choices.includes(item.choice)&&item.snapshot&&typeof item.snapshot==='object').slice(-20):[];
    if(choices.includes(value?.airedEnding))r.airedEnding=value.airedEnding;
    if(typeof value?.audienceNote==='string')r.audienceNote=value.audienceNote.slice(0,1000);
    return r;
  };
  D.judgmentEditorial={
    good:'本期采用的行动与经历，让我相信她的善意。我的判断是：天音小春是一个好人。我把这个判断播给所有听众。',
    bad:'本期采用的行动与经历，让我认为她一次次把自己的需要放在别人前面。我的判断是：天音小春是一个坏人。这是我今晚给出的定义。',
    objective:'她隐瞒了停用要求，也确实返回楼内救人。她曾经帮助别人离开，后来又替别人安排未被答应的以后。这些事实和经历都已呈现。今晚我不把她归入好人或坏人，节目完整保留这两面。',
    zero:'本期调查与采用材料仍不完整。今晚只播已经核实的摘要，尚不能作出充分判断；这不是完整客观播报。'
  };
  D.journeyEndings.objective=[{who:'记录',text:'红灯熄灭。小春伸手碰了碰磁带标签，没有把它转过去。'},{who:'小春',text:'这次，不给我加别的称呼了？'},{who:'主持人',text:'今晚说过的，两面都留在这里。'},{who:'小春',text:'……给我一份吧。',visual:'tape'}];
})();
