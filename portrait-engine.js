/* The portrait is assembled from investigated memories; placing a piece is a player action. */
(function(){
  'use strict';const D=window.InquiryData,unique=items=>[...new Set(items||[])];
  const event=id=>D.lifeEpisodes.find(item=>item.id===id);
  function ensure(s){
    if(!Array.isArray(s.portraitRead))s.portraitRead=(s.collected||[]).filter(id=>D.evidence[id]?.lane==='life');
    for(const key of ['lifeSolved','lifeFacets','lifeLinks','lifeAttempts','profileAdopted','profileViews','portraitReceived','portraitRead','portraitHeard'])if(!Array.isArray(s[key]))s[key]=[];
    if(!Array.isArray(s.profileSlots))s.profileSlots=Array(6).fill(null);
    if(!Array.isArray(s.facts))s.facts=[];
    if(!Array.isArray(s.collected))s.collected=[];
    s.portraitSide=s.portraitSide==='back'?'back':'front';return s;
  }
  function hasPiece(s,id){return (s.lifeSolved||[]).includes(id)||(s.lifeFacets||[]).includes(id);}
  function verifyEpisode(s,id){
    ensure(s);const e=event(id);if(!e)return {kind:'incomplete',note:'先选一段经历。'};
    if(s.lifeSolved.includes(id))return {kind:'supported',note:'这段已经核对过，片段还在。',already:true};
    if(!e.sources.every(source=>s.collected.includes(source)&&s.portraitRead.includes(source)))return {kind:'incomplete',note:'先读完这次收到的两份来源，再核对日期与当事人的回答。'};
    const result=window.LifeEngine.episode(id,e.answer,s.collected);if(result.kind!=='supported')return result;
    s.lifeSolved=unique([...s.lifeSolved,id]);s.lifeFacets=unique([...s.lifeFacets,id]);
    s.lifeAttempts.push({type:'portrait',id,materials:[...e.sources],result:'supported'});s.lifeAttempts=s.lifeAttempts.slice(-60);
    return {kind:'supported',note:'这段经历已核对。把它放回相应年龄，就能进入你的侧写。'};
  }
  function place(s,index,id){
    ensure(s);if(!Number.isInteger(index)||index<0||index>=D.lifeEpisodes.length||!event(id)||!hasPiece(s,id))return false;
    s.profileSlots=s.profileSlots.map((value,i)=>value===id&&i!==index?null:value);s.profileSlots[index]=id;return true;
  }
  function refreshRelations(s){
    ensure(s);let changed=false;
    for(const link of D.lifeConnections)if(link.pair.every(id=>s.lifeSolved.includes(id)&&s.profileAdopted.includes(id))&&!s.lifeLinks.includes(link.id)){s.lifeLinks.push(link.id);changed=true;}
    if(window.LifeEngine.complete(s)&&!s.facts.includes('profileComplete')){s.facts.push('profileComplete');changed=true;}
    return changed;
  }
  function confirm(s,side='front'){
    ensure(s);const placed=s.profileSlots.filter(Boolean);
    if(!placed.length)return {kind:'incomplete',note:'先选一块已经取得的片段，再点对应年龄的位置。'};
    if(s.profileSlots.some((id,i)=>id&&id!==D.lifeEpisodes[i].id))return {kind:'overreach',note:'有片段放错了年代。对照原件日期重新摆放，空位可以留着。'};
    if(placed.some(id=>!hasPiece(s,id)))return {kind:'incomplete',note:'还没取得的经历不能放入侧写。'};
    const count=s.profileAdopted.length,links=s.lifeLinks.length;
    if(!window.Programme.acceptPortrait(s))return {kind:'incomplete',note:'再看看片段与日期。'};
    s.portraitSide=side==='back'?'back':'front';s.profileViews=unique([...s.profileViews,s.portraitSide]);refreshRelations(s);
    return {kind:'supported',note:'年代已确认。'+(s.lifeLinks.length>links?'相关经历也连成了一条人物关系。':'这些片段可以在播出单 B 轨采用。'),newPieces:s.profileAdopted.length-count,newLinks:s.lifeLinks.length-links};
  }
  function view(s,side){ensure(s);window.Programme.setPortraitSide(s,side==='back'?'back':'front');if(s.profileAdopted.length)s.profileViews=unique([...s.profileViews,s.portraitSide]);refreshRelations(s);return s.portraitSide;}
  window.PortraitEngine={ensure,hasPiece,verifyEpisode,place,confirm,refreshRelations,view};
})();
