(function(){
  'use strict';const D=window.InquiryData;D.version='0.12.1';
  // The chapter title stays unchanged until the user chooses from the proposed names.
  const visible=text=>String(text).replaceAll('审判','定性播出').replaceAll('裁决','判断');
  for(const id of Object.keys(D.inferenceRoles))D.inferenceRoles[id]=visible(D.inferenceRoles[id]);
  for(const segment of D.radioSegments)segment.need=visible(segment.need);
  D.facts.profileSketch.body='你把已经核对的经历拼进她的侧写。本期节目将采用你选定的整体读法。';
  for(const id of Object.keys(D.judgmentEditorial||{}))D.judgmentEditorial[id]=visible(D.judgmentEditorial[id]);
})();
