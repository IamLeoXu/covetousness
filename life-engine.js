(function(){
  'use strict';
  const D=window.InquiryData;
  const result=(kind,note)=>({kind,note});
  window.LifeEngine={
    episode(id,choice,materials){
      const event=D.lifeEpisodes.find(item=>item.id===id);if(!event)return result('incomplete','先选择一段经历。');
      const owned=new Set(materials);
      if(!event.sources.every(source=>owned.has(source)))return result('incomplete','这一段还缺旧档或补访。打开原件，再问一个可核对的问题。');
      if(choice!==event.answer)return result('overreach',event.id==='choice'?'三月的回函先于七月的录用。自主选择也可能留下遗憾。':event.id==='love'?'后来结束，不会把当时相互的喜欢变成没有发生。':'这个说法超出了这两份记录。比较它们明确说过什么，不替当事人补上动机或结局。');
      return result('supported','两份来源支持这段事件。现在它可以进入人生拼图；这不是定罪证物。');
    },
    connection(id,choice,pair,solved){
      const link=D.lifeConnections.find(item=>item.id===id);if(!link)return result('incomplete','选择要重建的关系。');
      if(pair.length!==2||new Set(pair).size!==2)return result('incomplete','选择两段不同的人生事件。');
      if(!pair.every(event=>solved.includes(event)))return result('incomplete','先完成这两段事件各自的档案与补访。');
      if(!link.pair.every(event=>pair.includes(event)))return result('incomplete','这两段经历还不能回答当前问题。按问题中的时间与关系找对应事件。');
      if(choice!==link.answer)return result('overreach','这条读法抹去了一边已核实的事实。保留她的真心、遗憾，以及别人自行决定的权利。');
      return result('supported',link.note);
    },
    complete(state){return D.lifeEpisodes.every(event=>state.lifeSolved.includes(event.id))&&D.lifeConnections.every(link=>state.lifeLinks.includes(link.id))&&D.lifeEpisodes.every(event=>window.Programme.adopted(state).includes(event.id));}
  };
})();
