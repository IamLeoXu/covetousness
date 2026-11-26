(function(){
  'use strict';const G=window.ChapterGame;
  const review=document.createElement('button');review.id='reviewDialogue';review.className='text-button';review.textContent='回看刚才的对话';review.onclick=G.reviewLastConversation;document.querySelector('.chapter-help-links').append(review);
  window.SocialTalk={open:()=>window.InquiryUI.open()};
})();
