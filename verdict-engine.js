/* A facts and one B portrait jointly support the programme's final conclusion. */
(function(){
  'use strict';const E=window.InquiryEngine,D=window.InquiryData,P=window.Programme;
  const unique=items=>[...new Set(items||[])],hasAll=(items,required)=>required.every(id=>items.includes(id));
  const requiredFacts=()=>Object.keys(D.inferenceRecipes);
  const requiredEvents=()=>D.lifeEpisodes.map(event=>event.id);
  const requiredLinks=()=>D.lifeConnections.map(link=>link.id);
  const requiredSources=()=>unique([...(D.initialEvidence||['photo','snippet','call']),...D.caseLayers.flatMap(layer=>layer.materials).filter(id=>id!=='handoffAppendix'),...D.lifeEpisodes.flatMap(event=>event.sources)]);
  const rules=()=>D.judgmentRules||{minimumCaseThemes:3,minimumLifeEvents:2,minimumLinks:1,minimumWeight:3,balanceRatio:2/3,portraitWeight:1};
  function collectionStatus(s,queued){
    const facts=requiredFacts(),events=requiredEvents(),links=requiredLinks(),sources=requiredSources(),usedFacts=P.usedFacts(s,queued),usedEvents=P.usedEvents(s,queued),usedLinks=P.usedLinks(s,queued),accepted=P.adopted(s);
    const missing={researchFacts:facts.filter(id=>!(s.facts||[]).includes(id)),sources:sources.filter(id=>!(s.collected||[]).includes(id)),lifeSolved:events.filter(id=>!(s.lifeSolved||[]).includes(id)),lifeConfirmed:events.filter(id=>!accepted.includes(id)),lifeLinks:links.filter(id=>!(s.lifeLinks||[]).includes(id)),selectedFacts:facts.filter(id=>!usedFacts.includes(id)),selectedEvents:events.filter(id=>!usedEvents.includes(id)),selectedLinks:links.filter(id=>!usedLinks.includes(id))};
    const researchComplete=['researchFacts','sources','lifeSolved','lifeConfirmed','lifeLinks'].every(key=>!missing[key].length),selectionComplete=['selectedFacts','selectedEvents','selectedLinks'].every(key=>!missing[key].length);
    return {researchComplete,selectionComplete,complete:researchComplete&&selectionComplete,missing,required:{facts,events,links,sources}};
  }
  function assess(s,queued){
    const r=rules(),usedFacts=P.usedFacts(s,queued),accepted=P.adopted(s),usedEvents=P.usedEvents(s,queued).filter(id=>(s.lifeSolved||[]).includes(id)&&accepted.includes(id)),usedLinks=P.usedLinks(s,queued).filter(id=>{const link=D.lifeConnections.find(item=>item.id===id);return link&&(s.lifeLinks||[]).includes(id)&&link.pair.every(event=>usedEvents.includes(event));});
    const groups=(D.judgmentGroups||[]).flatMap(group=>{const ids=group.facts.filter(id=>usedFacts.includes(id));if(!ids.length)return [];return [{id:group.id,title:group.title,facts:ids,positive:Math.max(0,...ids.map(id=>group.positive[id]||0)),negative:Math.max(0,...ids.map(id=>group.negative[id]||0))}];});
    const portraitSide=P.portraitSide(s),readings=Object.fromEntries(usedEvents.map(id=>[id,portraitSide]));
    const casePositive=groups.reduce((sum,group)=>sum+group.positive,0),caseNegative=groups.reduce((sum,group)=>sum+group.negative,0);
    const portraitReady=usedEvents.length>=r.minimumLifeEvents&&usedLinks.length>=r.minimumLinks;
    const portraitPositive=portraitReady&&['front','both'].includes(portraitSide)?(r.portraitWeight||1):0,portraitNegative=portraitReady&&['back','both'].includes(portraitSide)?(r.portraitWeight||1):0;
    const positive=casePositive+portraitPositive,negative=caseNegative+portraitNegative;
    const minimum=groups.length>=r.minimumCaseThemes&&usedEvents.length>=r.minimumLifeEvents&&usedLinks.length>=r.minimumLinks;
    const collection=collectionStatus(s,queued);
    const labels={researchFacts:'案件推论尚未全部核实',sources:'必要原件尚未全部读过',lifeSolved:'六段经历尚未全部深入核对',lifeConfirmed:'六块人物片段尚未全部确认年代',lifeLinks:'三条人物关系尚未齐全',selectedFacts:'本期未采用全部必要案件推论',selectedEvents:'本期未采用六段经历',selectedLinks:'本期未采用三条人物关系'};
    return {positive,negative,casePositive,caseNegative,portraitPositive,portraitNegative,portraitSide,groups,minimum,complete:collection.complete,researchComplete:collection.researchComplete,selectionComplete:collection.selectionComplete,missing:Object.entries(collection.missing).filter(([,ids])=>ids.length).map(([key])=>labels[key]),missingDetails:collection.missing,required:collection.required,usedFacts,usedEvents,usedLinks,readings};
  }
  function missingDescription(a){
    const m=a.missingDetails,parts=[];if(m.researchFacts.length)parts.push('尚需核实 '+m.researchFacts.length+' 项案件推论');if(m.sources.length)parts.push('尚有 '+m.sources.length+' 份必要原件未读');if(m.lifeSolved.length||m.lifeConfirmed.length)parts.push('六段经历需全部深入并确认年代');if(m.lifeLinks.length)parts.push('三条人物关系还未齐');
    if(!parts.length&&!a.selectionComplete)parts.push('研究已齐；把全部必要案件与人物材料采用到本期即可');
    return parts.join('；')||'案件与人物材料已齐，可以完整播出两面的来龙去脉。';
  }
  E.collectionStatus=collectionStatus;
  E.verdictStatus=function(s,queued=s.radio?.queued||s.queued||[]){
    const a=assess(s,queued),r=rules(),base=[{ok:a.groups.length>=r.minimumCaseThemes,title:'案件材料',text:'本期采用 '+a.groups.length+' 个独立案件主题，至少需要 '+r.minimumCaseThemes+' 个。相同主题的重复推论不重复加权。'},{ok:a.usedEvents.length>=r.minimumLifeEvents&&a.usedLinks.length>=r.minimumLinks,title:'人物材料',text:'本期采用 '+a.usedEvents.length+' 段已确认经历与 '+a.usedLinks.length+' 条关系；至少需要两段和一条关系。'}];
    const goodWeight=a.positive>=r.minimumWeight&&a.positive>=a.negative*r.balanceRatio,badWeight=a.negative>=r.minimumWeight&&a.negative>=a.positive*r.balanceRatio;
    return {assessment:a,good:{ready:a.minimum&&goodWeight,steps:[...base,{ok:goodWeight,title:'综合正面依据',text:'正面 '+a.positive+'，反面 '+a.negative+'。A 轨采用的行为是主要依据，B 轨整体侧写补充人物理解。'}]},bad:{ready:a.minimum&&badWeight,steps:[...base,{ok:badWeight,title:'综合反面依据',text:'反面 '+a.negative+'，正面 '+a.positive+'。正反材料都有分量时可同时开放两项；人物经历在本期作为一份完整侧写使用。'}]},objective:{ready:a.complete,steps:[{ok:a.researchComplete,title:'完整调查',text:missingDescription(a)},{ok:a.selectionComplete,title:'本期完整采用',text:a.selectionComplete?'全部必要案件与人物材料均已采用。选择完整客观播报时，节目会自动呈现侧写两面。':'全收集后，把完整材料实际采用到本期即可。'}]}};
  };
  E.canChooseVerdict=(choice,s,queued)=>choice==='zero'||['good','bad','objective'].includes(choice)&&E.verdictStatus(s,queued)[choice].ready;
  // Records predating weighted judgment retain the exact rules they were made under.
  function legacyValid(snapshot,choice){
    if(!snapshot||snapshot.choice!==choice||!['good','bad'].includes(choice))return false;
    const facts=new Set(P.usedFacts(snapshot)),events=new Set(P.usedEvents(snapshot)),links=new Set(P.usedLinks(snapshot)),accepted=new Set(P.adopted(snapshot)),pgm=new Set(P.active(snapshot));
    const first=['afterCall','oldKeys','freeExit'].some(id=>facts.has(id));
    const pair=id=>{const link=D.lifeConnections.find(item=>item.id===id);return link&&links.has(id)&&(snapshot.lifeLinks||[]).includes(id)&&link.pair.every(event=>events.has(event)&&accepted.has(event)&&(snapshot.lifeSolved||[]).includes(event));};
    if(choice==='bad')return first&&['withheld','misuse'].every(id=>facts.has(id))&&pair('own-cost')&&['rumor','warning','life'].every(id=>pgm.has(id))&&(!snapshot.portraitSide||snapshot.portraitSide==='back');
    return first&&['withheld','rescueAct','rescueContext','causationLimit'].every(id=>facts.has(id))&&(pair('not-fate')||pair('not-erased'))&&['rumor','warning','rescue','life'].every(id=>pgm.has(id))&&(!snapshot.portraitSide||snapshot.portraitSide==='front');
  }
  function legacyV4Valid(snapshot,choice){
    if(!snapshot||snapshot.choice!==choice||!['good','bad','objective'].includes(choice))return false;
    const facts=P.usedFacts(snapshot),accepted=P.adopted(snapshot),events=P.usedEvents(snapshot).filter(id=>(snapshot.lifeSolved||[]).includes(id)&&accepted.includes(id));
    const links=P.usedLinks(snapshot).filter(id=>{const link=D.lifeConnections.find(item=>item.id===id);return link&&(snapshot.lifeLinks||[]).includes(id)&&link.pair.every(event=>events.includes(event));});
    if(choice==='objective')return collectionStatus(snapshot,snapshot.queued).complete&&requiredEvents().every(id=>P.reading(snapshot,id)==='both');
    const oldGroups=[{ids:['afterCall','oldKeys','freeExit'],positive:()=>1,negative:()=>0},{ids:['knowledge','noticeGap','withheld'],positive:()=>0,negative:ids=>ids.includes('withheld')?3:ids.includes('noticeGap')?1:0},{ids:['misuse'],positive:()=>0,negative:()=>3},{ids:['rescueAct'],positive:()=>3,negative:()=>0},{ids:['rescueContext'],positive:()=>1,negative:()=>0},{ids:['causationLimit'],positive:()=>0,negative:()=>0}];
    const groups=oldGroups.map(group=>({...group,used:group.ids.filter(id=>facts.includes(id))})).filter(group=>group.used.length);
    if(groups.length<3||events.length<2||links.length<1)return false;
    const positive=groups.reduce((sum,group)=>sum+group.positive(group.used),0)+events.filter(id=>P.reading(snapshot,id)!=='back').length;
    const negative=groups.reduce((sum,group)=>sum+group.negative(group.used),0)+events.filter(id=>P.reading(snapshot,id)!=='front').length;
    return choice==='good'?positive>=3&&positive>=negative*2/3:negative>=3&&negative>=positive*2/3;
  }
  function valid(snapshot,choice){
    if(!snapshot||snapshot.choice!==choice)return false;
    if(['selected-cuts-v1','selected-cuts-v2','selected-cuts-v3'].includes(snapshot.schema)||!snapshot.schema)return legacyValid(snapshot,choice);
    if(snapshot.schema==='selected-cuts-v4')return legacyV4Valid(snapshot,choice);
    return ['good','bad','objective'].includes(choice)&&E.verdictStatus(snapshot,snapshot.queued)[choice].ready;
  }
  E.cgRecordValid=valid;
  E.cgUnlocked=function(s){const current=D.characterId||'koharu',matching=record=>(record.characterId||record.snapshot?.characterId||'koharu')===current;return !!(s.radio?.phase==='archived'&&valid(s.radio.editorialSnapshot,s.ending)||(s.radio?.history||[]).some(record=>matching(record)&&valid(record.snapshot,record.choice))||Object.values(s.radio?.cgRecords||{}).some(record=>matching(record)&&valid(record.snapshot,record.choice)));};
  E.arroganceStatus=function(s){
    const expected=unique(D.expectedCharacters||['koharu']),latest={};
    const consume=record=>{const snap=record?.snapshot,choice=record?.choice;if(!snap||snap.choice!==choice||!['good','bad','objective','zero'].includes(choice))return;const characterId=record.characterId||snap.characterId||'koharu',proof=record.judgment||snap.judgment,category=choice==='zero'?'incomplete':choice==='objective'?'objective':'definition',frozenValid=proof?.validated===true&&proof.category===category&&(choice!=='objective'||proof.completeCollection===true);if(choice!=='zero'&&!frozenValid&&!valid(snap,choice))return;latest[characterId]={characterId,choice,category:choice==='zero'?'incomplete':choice==='objective'?'objective':'definition',recordId:record.id||snap.recordId};};
    for(const record of s.radio?.history||[])consume(record);
    for(const record of Object.values(s.radio?.characterJudgments||{}))consume(record);
    if(s.radio?.phase==='archived'&&s.radio.editorialSnapshot)consume({choice:s.ending||s.radio.editorialSnapshot.choice,snapshot:s.radio.editorialSnapshot});
    const byCharacter=Object.fromEntries(expected.filter(id=>latest[id]).map(id=>[id,latest[id]])),definitions=expected.filter(id=>latest[id]?.category==='definition').length,objective=expected.filter(id=>latest[id]?.category==='objective').length,incomplete=expected.filter(id=>latest[id]?.category==='incomplete').length,missingCharacters=expected.filter(id=>!latest[id]);
    const implementedScopeComplete=expected.length>0&&definitions+objective===expected.length,allObjective=expected.length>0&&objective===expected.length;
    const tier=definitions===expected.length&&expected.length?'extreme':definitions?'ordinary':allObjective?'none':'undetermined';
    const current=D.characterId||'koharu',chapterObjectiveComplete=latest[current]?.category==='objective';
    return {scope:'implemented-characters',tier,expectedCharacters:expected,byCharacter,definitions,objective,incomplete,missingCharacters,implementedScopeComplete,chapterObjectiveComplete,chapterTrueEnding:chapterObjectiveComplete,campaignComplete:D.campaignComplete===true,campaignTrueEnding:D.campaignComplete===true&&allObjective,fullCollectionTrueEnding:D.campaignComplete===true&&allObjective};
  };
})();
