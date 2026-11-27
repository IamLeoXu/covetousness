/* A sources drive the balance; B contributes one overall portrait reading. */
(function(){
  'use strict';const D=window.InquiryData;
  D.characterId=D.characterId||'koharu';
  D.expectedCharacters=D.expectedCharacters||['koharu'];
  if(typeof D.campaignComplete!=='boolean')D.campaignComplete=false;
  D.judgmentRules={minimumCaseThemes:3,minimumLifeEvents:2,minimumLinks:1,minimumWeight:3,balanceRatio:2/3,portraitWeight:1};
  D.judgmentGroups=[
    {id:'rumor',title:'流言澄清',facts:['afterCall','oldKeys','freeExit'],positive:{afterCall:1,oldKeys:1,freeExit:1},negative:{}},
    {id:'disclosure',title:'危险告知',facts:['knowledge','noticeGap','withheld'],positive:{},negative:{knowledge:0,noticeGap:1,withheld:3}},
    {id:'funds',title:'安置款用途',facts:['misuse'],positive:{},negative:{misuse:3}},
    {id:'rescue',title:'返身救援',facts:['rescueAct'],positive:{rescueAct:3},negative:{}},
    {id:'context',title:'救援时的处境',facts:['rescueContext'],positive:{rescueContext:1},negative:{}},
    {id:'causation',title:'伤情证明范围',facts:['causationLimit'],positive:{},negative:{}}
  ];
  const fresh=D.newRadioState,restore=D.restoreRadioState;
  const records=value=>value&&typeof value==='object'&&!Array.isArray(value)?Object.fromEntries(Object.entries(value).filter(([id,record])=>id&&record&&typeof record==='object'&&record.snapshot&&['good','bad','objective','zero'].includes(record.choice))):{};
  D.newRadioState=()=>{const r={...fresh(),portraitSelection:null,characterJudgments:{},cgRecords:{}};delete r.lifeReadings;return r;};
  D.restoreRadioState=(value,ending)=>{
    const r={...restore(value,ending),portraitSelection:value?.portraitSelection==='all'?'all':null,characterJudgments:records(value?.characterJudgments),cgRecords:records(value?.cgRecords)};
    // Old frozen records retain their own readings; a live draft has only portraitSide.
    delete r.lifeReadings;
    // Add durable per-character summaries without altering an old snapshot or script.
    const latest={},unlocks={};
    for(const record of r.history||[]){
      const snapshot=record.snapshot,choice=record.choice,characterId=record.characterId||snapshot.characterId||'koharu';
      const category=choice==='zero'?'incomplete':choice==='objective'?'objective':'definition',prior=record.judgment||snapshot.judgment;
      const valid=choice==='zero'||prior?.validated===true&&prior.category===category&&(choice!=='objective'||prior.completeCollection===true)||window.InquiryEngine?.cgRecordValid?.(snapshot,choice);
      if(!valid)continue;
      const summary={...record,characterId,judgment:{category,validated:true,completeCollection:choice==='objective'}};
      latest[characterId]=summary;if(choice!=='zero')unlocks[characterId]=summary;
    }
    r.characterJudgments={...latest,...r.characterJudgments};r.cgRecords={...unlocks,...r.cgRecords};return r;
  };
})();
