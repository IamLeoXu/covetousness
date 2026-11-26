/* A verdict concerns the material actually selected for this programme. */
(function(){
  'use strict';const E=window.InquiryEngine,D=window.InquiryData,P=window.Programme;
  E.verdictStatus=function(s,queued=s.radio?.queued||s.queued||[]){
    const known=new Set(s.facts||[]),facts=new Set(P.usedFacts(s,queued)),solved=new Set(s.lifeSolved||[]),links=new Set(P.usedLinks(s,queued)),events=new Set(P.usedEvents(s,queued)),accepted=new Set(P.adopted(s)),pgm=new Set(P.active(s,queued));
    const first=['afterCall','oldKeys','freeExit'].some(id=>facts.has(id));
    const pair=id=>{const link=D.lifeConnections.find(l=>l.id===id);return links.has(id)&&(s.lifeLinks||[]).includes(id)&&link.pair.every(event=>solved.has(event)&&accepted.has(event)&&events.has(event));};
    const badCase=first&&['withheld','misuse'].every(id=>facts.has(id)),goodCase=first&&['withheld','rescueAct','rescueContext','causationLimit'].every(id=>facts.has(id));
    const badLife=pair('own-cost')&&(!s.portraitSide||s.portraitSide==='back'),goodLife=(pair('not-fate')||pair('not-erased'))&&(!s.portraitSide||s.portraitSide==='front'),badPGM=['rumor','warning','life'].every(id=>pgm.has(id)),goodPGM=['rumor','warning','rescue','life'].every(id=>pgm.has(id));
    function caseText(ids){const missingResearch=ids.filter(id=>!known.has(id)),notSelected=ids.filter(id=>known.has(id)&&!facts.has(id));return (missingResearch.length?'仍需核实：'+missingResearch.map(id=>D.facts[id].short).join('、')+'。':'')+(notSelected.length?'已核实但未采用：'+notSelected.map(id=>D.facts[id].short).join('、')+'。在播出单素材库勾选即可，不必重推。':'')+(!first?'还需在 A1 采用一项来稿核实推论。':'')||'本期已采用这条行为链的推论；原始线索没有直接代替它们。';}
    function lifeText(ids){const usable=ids.filter(id=>(s.lifeLinks||[]).includes(id));return usable.length?'已核对的人物推断可从 B 素材库直接选择：'+usable.map(id=>D.lifeConnections.find(l=>l.id===id).title).join(' / ')+'。需同时采用相关两段已确认经历；换内容无需重新补访。':'到人物侧写核对经历，把相应两块放入拼图并确认年代。';}
    return {
      bad:{ready:badCase&&badLife&&badPGM,steps:[{ok:badCase,title:'本期行为链',text:caseText(['withheld','misuse'])},{ok:badLife,title:'本期人物链',text:badLife?'本期采用反面侧写：自主选择与分手后的安排。':lifeText(['own-cost'])+(s.portraitSide==='front'?' 当前采用正面读法，可在 B 轨切换反面。':'')},{ok:badPGM,title:'PGM 采用范围',text:'A1 来稿核实、A2 经营记录与 B 人物链都需要接入；只知道、没有采用的内容不进入本次定性。'}]},
      good:{ready:goodCase&&goodLife&&goodPGM,steps:[{ok:goodCase,title:'本期行为链',text:caseText(['withheld','rescueAct','rescueContext','causationLimit'])},{ok:goodLife,title:'本期人物链',text:goodLife?'本期采用正面侧写：她曾拥有的关系、手艺与善意。':lifeText(['not-fate','not-erased'])+(s.portraitSide==='back'?' 当前采用反面读法，可在 B 轨切换正面。':'')},{ok:goodPGM,title:'PGM 采用范围',text:'A1、A2、A3 与 B 的相关推论需要一起接入；得出过的其他内容仍在素材库，可随时换用。'}]}
    };
  };
  E.canChooseVerdict=(choice,s,queued)=>choice==='zero'||['good','bad'].includes(choice)&&E.verdictStatus(s,queued)[choice].ready;
  function valid(snapshot,choice){return snapshot&&snapshot.choice===choice&&['good','bad'].includes(choice)&&E.verdictStatus(snapshot,snapshot.queued)[choice].ready;}
  E.cgUnlocked=function(s){return s.radio?.phase==='archived'&&valid(s.radio.editorialSnapshot,s.ending)||(s.radio?.history||[]).some(record=>valid(record.snapshot,record.choice));};
})();
