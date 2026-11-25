/* A true ending needs an argued account, not a collection percentage. */
(function(){
  'use strict';const E=window.InquiryEngine,D=window.InquiryData;
  E.verdictStatus=function(s,queued=s.radio?.queued||[]){
    const facts=new Set(s.facts||[]),solved=new Set(s.lifeSolved||[]),links=new Set(s.lifeLinks||[]),slots=s.profileSlots||[],pgm=new Set(queued);
    const first=['afterCall','oldKeys','freeExit'].some(id=>facts.has(id));
    const adopted=facts.has('profileSketch')||facts.has('profileComplete');
    const pair=(id)=>{const link=D.lifeConnections.find(item=>item.id===id);return adopted&&links.has(id)&&link.pair.every(event=>solved.has(event)&&slots[D.lifeEpisodes.findIndex(item=>item.id===event)]===event);};
    const badCase=first&&facts.has('withheld')&&facts.has('misuse'),badLife=pair('own-cost'),badProgramme=['rumor','warning','life'].every(id=>pgm.has(id));
    const goodCase=first&&['withheld','rescueAct','rescueContext','causationLimit'].every(id=>facts.has(id)),goodLife=pair('not-fate')||pair('not-erased'),goodProgramme=['rumor','warning','rescue','life'].every(id=>pgm.has(id));
    return {
      bad:{ready:badCase&&badLife&&badProgramme,steps:[{ok:badCase,title:'行为链',text:'还原来稿，核实她已知的停用要求、未完整传达与安置款用途。'},{ok:badLife,title:'人物链',text:'核对自主选择与分手后的安排，连接“没走的路，能向谁索还”，采用这两块侧写。'},{ok:badProgramme,title:'采用范围',text:'把来稿核实、经营记录与上述人物链一同放入本期。'}]},
      good:{ready:goodCase&&goodLife&&goodProgramme,steps:[{ok:goodCase,title:'行为链',text:'承认事前告知的过错，核对事后的实际行动、当时处境与因果边界。'},{ok:goodLife,title:'人物链',text:'继续补访，连接一段真实关系及其变化；采用相关两段经历与已核对的关系。'},{ok:goodProgramme,title:'采用范围',text:'把来稿、经营、事后记录与上述人物链一同放入本期。'}]}
    };
  };
  E.canChooseVerdict=(choice,s,queued)=>choice==='zero'||['good','bad'].includes(choice)&&E.verdictStatus(s,queued)[choice].ready;
  E.cgUnlocked=function(s){
    const snapshot=s.radio?.editorialSnapshot;
    return s.radio?.phase==='archived'&&['good','bad'].includes(s.ending)&&snapshot?.choice===s.ending&&E.verdictStatus(snapshot,snapshot.queued)[s.ending].ready;
  };
})();
