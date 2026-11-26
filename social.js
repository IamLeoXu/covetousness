(function(){
  'use strict';
  const G=window.ChapterGame,$=id=>document.getElementById(id);
  const topics=[
    {id:'cuff',title:'你在看我的袖子？',lines:[
      ['记录','小春指了指你的袖口。刚才起身时，一根线挂在了话筒支架上。'],
      ['小春','先别拽。越拽越长。'],
      ['记录','你把手放到桌沿。她借过桌上的剪刀，挑出那根线，只剪掉露在外面的部分。'],
      ['主持人','这样就好了？'],
      ['小春','能撑到你下班。回家从里面缝两针，别拿订书机钉。'],
      ['主持人','我看起来会拿订书机修衣服吗？'],
      ['小春','你刚才看了它一眼。']
    ]},
    {id:'window',title:'不说房子，你原来做什么？',lines:[
      ['小春','服装店。改衣服，也摆过橱窗。'],
      ['主持人','摆橱窗有什么门道？'],
      ['小春','你把所有好东西都摆上去，别人反而不知道先看哪件。'],
      ['记录','她把桌上歪着的节目单挪开一点，给收音指示灯留出位置。'],
      ['小春','就像这样。先让人看见一件，再看第二件。'],
      ['主持人','那你现在还做吗？'],
      ['小春','偶尔。前阵子有人拿着我以前的图来问价。'],
      ['主持人','接了？'],
      ['小春','还没回。我得重新算工钱，不能还按那时候的价。']
    ]},
    {id:'nao',title:'奈央平时怎么称呼你？',lines:[
      ['小春','急的时候叫全名。还有，你不要把“平时”也记进事故时间线。'],
      ['主持人','不记。我只是想知道你们平常怎么相处。'],
      ['小春','上个月她把我的缝纫剪刀拿去拆快递，我跟她吵了一次。'],
      ['主持人','她怎么说？'],
      ['小春','她说赔。后来真的买了一把，但买错了。'],
      ['主持人','所以又吵了一次？'],
      ['小春','没有。我带她去换。回来她说，既然顺路，能不能帮她改一下袖口。'],
      ['主持人','你帮了？'],
      ['小春','收钱了。她说朋友价，我说你上次也是这么说的。']
    ]},
    {id:'saki',title:'纱纪还会找你做东西吗？',requires:s=>s.collected.includes('lifeFabric')||s.lifeSolved.includes('friend'),lines:[
      ['小春','会。上次发了张图，说“很简单的，随便缝一下”。'],
      ['主持人','实际上呢？'],
      ['小春','一整排斜裁。她自己也做这行，她知道。'],
      ['主持人','你怎么回？'],
      ['小春','报价。她说怎么不包邮，我说想包邮就回来拿。'],
      ['主持人','后来呢？'],
      ['小春','钱转了，人也说要回来。她让约周六，别又替她把整个周末排满。'],
      ['记录','她拿起笔，又把笔放下。'],
      ['小春','我还没答应那天有空呢。']
    ]}
  ];
  function read(topic){
    G.playConversation(topic.lines.map(([who,text])=>({who,text})),{module:'talk',label:'STUDIO TALK / OFF AIR',portrait:'neutral',endText:'聊点别的 →',after:()=>{const s=G.getState();s.chatRead=[...new Set([...(s.chatRead||[]),topic.id])];G.save();open();}});
  }
  function open(){
    const s=G.getState();
    G.playConversation([{who:'小春',text:'先歇一下？你想聊什么。'}],{module:'talk',label:'STUDIO TALK / 值班间隙',portrait:'neutral',choices:()=>[
      ...topics.filter(topic=>!topic.requires||topic.requires(s)).map(topic=>({text:((s.chatRead||[]).includes(topic.id)?'↺ ':'')+topic.title,action:()=>read(topic)})),
      {text:'打开人生档案，核对一件具体的事。',action:()=>{G.finishConversation();window.LifeUI.open('inquiry');}},
      {text:'先回工作台。',action:G.finishConversation}
    ]});
  }
  const review=document.createElement('button');review.id='reviewDialogue';review.className='text-button';review.textContent='回看刚才的对话';review.onclick=G.reviewLastConversation;document.querySelector('.chapter-help-links').append(review);
  window.SocialTalk={open};
})();
