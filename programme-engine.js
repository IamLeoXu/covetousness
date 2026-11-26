/* Verified research is a reusable library; a programme is an explicit selection from it. */
(function(){
  'use strict';
  const D=window.InquiryData,tracks=['rumor','warning','rescue','life'];
  const sets={rumor:['afterCall','oldKeys','freeExit'],warning:['knowledge','noticeGap','withheld','misuse'],rescue:['rescueAct','rescueContext','causationLimit']};
  const unique=ids=>[...new Set(ids||[])],radio=s=>s.radio||{queued:s.queued||[],cuts:s.cuts||s.selection||{}};
  const title=id=>(D.facts[id]||D.evidence[id])?.title||id;
  function adopted(s){
    if(Array.isArray(s.profileAdopted))return unique(s.profileAdopted).filter(id=>D.lifeEpisodes.some(e=>e.id===id));
    return (s.facts||[]).some(id=>['profileSketch','profileComplete'].includes(id))?D.lifeEpisodes.filter((e,i)=>s.profileSlots?.[i]===e.id).map(e=>e.id):[];
  }
  function proof(s,id){
    const saved=s.factProofs?.[id]||(s.attempts||[]).filter(a=>a.fact===id&&a.result==='supported').at(-1)?.materials;
    if(Array.isArray(saved))return saved.filter(key=>key!==id&&(D.facts[key]||D.evidence[key]));
    const known=new Set([...(s.facts||[]),...(s.collected||[])]);
    return (D.inferenceRecipes[id]||[]).find(recipe=>recipe.every(key=>known.has(key)))||[];
  }
  function library(s,track){
    if(track!=='life')return (sets[track]||[]).filter(id=>(s.facts||[]).includes(id)).map(id=>({key:'fact:'+id,id,kind:'fact',title:D.facts[id].title,body:D.facts[id].body,eligible:true,sources:proof(s,id),role:D.inferenceRoles[id]||''}));
    const accepted=adopted(s),pieces=D.lifeEpisodes.filter(e=>(s.lifeFacets||[]).includes(e.id)||(s.lifeSolved||[]).includes(e.id));
    return [...pieces.map(e=>({key:'event:'+e.id,id:e.id,kind:'event',title:e.age+' 岁 / '+e.name,body:(s.lifeSolved||[]).includes(e.id)?e.options.find(([id])=>id===e.answer)[1]:D.lifeFacetText[e.id],eligible:accepted.includes(e.id),sources:fieldProof(s,e.id)||((s.lifeSolved||[]).includes(e.id)?e.sources:[e.primary]),role:accepted.includes(e.id)?((s.lifeSolved||[]).includes(e.id)?'已核对经历 · 可用于人物链':'档案片段 · 仅能支撑摘要'):'尚未在人物拼图确认年代'})),
      ...D.lifeConnections.filter(l=>(s.lifeLinks||[]).includes(l.id)).map(l=>({key:'link:'+l.id,id:l.id,kind:'link',title:'人物推断 / '+l.title,body:l.options.find(([id])=>id===l.answer)[1],eligible:l.pair.every(id=>accepted.includes(id)&&(s.lifeSolved||[]).includes(id)),pair:l.pair,sources:l.pair,role:'采用时会一并带入相关两段经历'}))];
  }
  function fieldProof(s,event){const entry=(D.fieldStories||[]).find(story=>s.fieldProofs?.[story.id]?.length===2&&D.lifeConnections.find(l=>l.id===story.id).pair.includes(event));return entry?[...s.fieldProofs[entry.id]]:null;}
  function keys(s,track){
    const r=radio(s),eligible=library(s,track).filter(item=>item.eligible).map(item=>item.key);
    if(Object.prototype.hasOwnProperty.call(r.cuts||{},track))return unique(r.cuts[track]).filter(key=>eligible.includes(key));
    if((r.queued||[]).includes(track)&&track==='rumor'){const text=(s.script||r.airScript||[]).find(part=>part.id==='rumor')?.body||'',match=eligible.find(key=>text.startsWith(D.facts[key.slice(5)]?.title));if(match)return [match];if(r.firstFact&&eligible.includes('fact:'+r.firstFact))return ['fact:'+r.firstFact];}
    return (r.queued||[]).includes(track)?eligible:[];
  }
  function selected(s,track){const keep=keys(s,track);return library(s,track).filter(item=>keep.includes(item.key)&&item.eligible);}
  function choices(s,track){return library(s,track).filter(item=>item.eligible);}
  function setKeys(s,track,next){const valid=choices(s,track).map(item=>item.key);s.radio.cuts||={};s.radio.cuts[track]=unique(next).filter(key=>valid.includes(key));s.radio.previewed='';}
  function toggle(s,track,key,on){
    const item=library(s,track).find(item=>item.key===key);if(!item?.eligible)return false;
    let next=keys(s,track);if(on){next.push(key);if(item.kind==='link')next.push(...item.pair.map(id=>'event:'+id));}
    else{next=next.filter(id=>id!==key);if(item.kind==='event')next=next.filter(id=>!library(s,track).some(l=>l.key===id&&l.kind==='link'&&l.pair.includes(item.id)));}
    setKeys(s,track,next);return true;
  }
  function connect(s,track){
    const r=s.radio;if(!choices(s,track).length)return false;
    if(!Object.prototype.hasOwnProperty.call(r.cuts||{},track))setKeys(s,track,choices(s,track).map(item=>item.key));
    if(!(r.queued||[]).includes(track)&&!keys(s,track).length)return false;
    r.queued=r.queued.includes(track)?r.queued.filter(id=>id!==track):[...r.queued,track];r.previewed='';return true;
  }
  function useRelation(s,id){
    const link=library(s,'life').find(item=>item.kind==='link'&&item.id===id);if(!link?.eligible)return false;
    setKeys(s,'life',[...link.pair.map(id=>'event:'+id),link.key]);if(!s.radio.queued.includes('life'))s.radio.queued.push('life');s.radio.lifeQuote=link.pair.at(-1);return true;
  }
  function allCuts(s){return Object.fromEntries(tracks.map(id=>[id,keys(s,id)]));}
  function active(s,queued){return (queued||radio(s).queued||[]).filter(id=>tracks.includes(id)&&selected(s,id).length);}
  function usedFacts(s,queued){return unique(active(s,queued).flatMap(track=>selected(s,track).filter(item=>item.kind==='fact').map(item=>item.id)));}
  function usedEvents(s,queued){return active(s,queued).includes('life')?selected(s,'life').filter(item=>item.kind==='event').map(item=>item.id):[];}
  function usedLinks(s,queued){return active(s,queued).includes('life')?selected(s,'life').filter(item=>item.kind==='link').map(item=>item.id):[];}
  function body(s,track){
    const items=selected(s,track);let text=items.map(item=>(item.kind==='link'?'人物推断：':item.title+'。')+item.body).join(' ');
    if(track==='life'){
      const side=s.portraitSide||'front',events=items.filter(item=>item.kind==='event');
      text=(side==='front'?'正面侧写。':'反面侧写。')+events.map(item=>{const event=D.lifeEpisodes.find(e=>e.id===item.id);return event.age+'岁，'+event.name+'：'+(side==='front'?event.front:event.back);}).join(' ')+items.filter(item=>item.kind==='link').map(item=>' '+item.body).join('');
    }
    return text;
  }
  function acceptPortrait(s){
    const placed=(s.profileSlots||[]).filter(Boolean);if(!placed.length||s.profileSlots.some((id,i)=>id&&id!==D.lifeEpisodes[i].id))return false;
    s.profileAdopted=unique([...adopted(s),...placed]);if(!s.facts.includes('profileSketch'))s.facts.push('profileSketch');return true;
  }
  function freeze(s,choice,script){
    return {schema:'selected-cuts-v3',version:D.version,portraitSide:s.portraitSide||'front',portraitRead:[...(s.portraitRead||[])],portraitHeard:[...(s.portraitHeard||[])],portraitReceived:[...(s.portraitReceived||[])],inquiry:JSON.parse(JSON.stringify(s.inquiry||{done:[],received:{}})),recordId:Date.now().toString(36)+'-'+(s.radio.history||[]).length,facts:[...s.facts],collected:[...s.collected],factProofs:JSON.parse(JSON.stringify(s.factProofs||{})),lifeSolved:[...s.lifeSolved],lifeLinks:[...s.lifeLinks],lifeFacets:[...s.lifeFacets],profileSlots:[...s.profileSlots],profileAdopted:[...adopted(s)],fieldProofs:JSON.parse(JSON.stringify(s.fieldProofs||{})),fieldSeen:[...(s.fieldSeen||[])],journey:JSON.parse(JSON.stringify(s.journey||{seen:[],choices:{},voiceCuts:[]})),queued:active(s),cuts:allCuts(s),scope:s.radio.scope,choice,script:script.map(item=>({...item}))};
  }
  function archive(s){
    const r=s.radio,snapshot=r.editorialSnapshot;if(!snapshot||!['good','bad','zero'].includes(snapshot.choice))return;
    const id=snapshot.recordId||(snapshot.recordId='legacy-'+Date.now().toString(36));r.history||=[];
    if(!r.history.some(item=>item.id===id))r.history.push({id,choice:snapshot.choice,snapshot:JSON.parse(JSON.stringify(snapshot)),script:(r.airScript||snapshot.script||[]).map(item=>({...item}))});
    r.history=r.history.slice(-20);
  }
  function newDraft(s){
    if(s.radio.phase!=='archived')return false;
    const r=s.radio,previous=r.editorialSnapshot;archive(s);
    if(!Object.keys(r.cuts||{}).length&&previous)r.cuts=allCuts(previous);
    s.ending=null;s.emotion='thoughtful';r.phase='off-air';r.airedEnding=null;r.editorialSnapshot=null;r.airScript=null;r.transmitIndex=0;r.previewed='';return true;
  }
  window.Programme={tracks,sets,title,proof,adopted,library,choices,keys,selected,setKeys,toggle,connect,useRelation,allCuts,active,usedFacts,usedEvents,usedLinks,body,acceptPortrait,freeze,archive,newDraft};
})();
