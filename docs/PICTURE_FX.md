# 处决演出的两个推子 / v0.15

界面为英文 ARCHIVE / OBJECTS、ERASE / PEOPLE。它们对应小春保存旧物、却留不住人的处决反讽。

- ARCHIVE：逐层加入封存套、住客纸条、小楼钥匙、维修账簿、遗留杯子和空房门。使用实际绘制的透明图，位于人物和场景贴纸之后。
- ERASE：从上向下抹去主角色、人物特写和照片中的人形，用已有印刷纸闸素材形成缺失边缘；相框、独立旧物、背景和字幕保留。
- 两者独立，也可同时拉满，让旧物完整留存、人物全部消失。暂停时立即重绘，不改变音乐、字幕时间和剧情判定。

timeline.js 的 settings 设置初值，取值 0–1：

```json
"executionMix": { "archive": 0, "erase": 0 }
```

根级 executionAssets.archiveObjects 控制 ARCHIVE 的素材、位置、大小与叠放顺序。例如：

```json
{ "asset": "roomKeys", "x": 28, "y": 20, "height": 22, "rotation": 10, "opacity": 0.94 }
```

x / y 为图层中心百分比，height 为画面高度百分比；越靠后的物件需要更高推子值才出现。需要这些物件固定出现在某一时段，改对应 scenes.stickers；ARCHIVE 列表是交互增添的独立图层。

executionAssets.subjectProps 列出接受 ERASE 的人物贴图名称；erasureMask 指向缺失边缘素材 printShutter。新增人物特写后应把 props 名称加入 subjectProps。普通主角色和相框内容自动接受 ERASE。若人物与钥匙画在同一张图里，ERASE 会抹去整张人物图；独立 roomKeys 贴纸保留。

字幕字号仍由 settings.lyricFontScale 控制。首尾印刷纸闸仍在 settings.printTransitions：kind 为 open / close，start / duration 使用歌曲秒数。删除一项取消该次纸闸，空数组关闭全部。Solo 短纸闸用 flashbacks 各项的 splice。

原 TAPE FX / ECHO、REVEAL / SHIFT、CAPTION / LIGHT 控件不再使用。本版没有调试面板。
