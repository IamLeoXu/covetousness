# 编辑某个贴纸什么时候出现、放在哪里

普通演出在 timeline.js 的当前 scenes 节点里改 stickers；112–135 秒 solo 的贴纸在该节点 flashbacks 每一项的 layers 里改，详见 FLASHBACKS.md。

例如 77 秒电线节点的花瓣：

```json
{
  "id": "wind-petals", "asset": "petalCut",
  "start": 77, "end": 90,
  "x": 67, "y": 34, "height": 28,
  "rotation": -12, "opacity": 0.7, "layer": "front",
  "motion": { "xTo": 49, "yTo": 44, "rotationTo": 6, "startTime": 77, "duration": 13, "ease": "smooth" }
}
```

| 字段 | 作用 |
|---|---|
| start / end | 歌曲中的显示起止秒数；start 包含，end 时停止。省略则跟随当前节点 |
| x / y | 贴纸中心，分别从左边 / 顶边按百分比计算；不是人物的底部 y |
| height | 高度占画面高度百分比，宽度等比 |
| rotation | 角度，正数顺时针 |
| opacity | 0–1 |
| layer | back 在人物后面，front 在人物前面 |
| fadeIn / fadeOut | 淡入淡出秒数 |
| motion | 位置 / 大小 / 旋转的终点；删除 motion 即固定 |
| visible | false 暂时隐藏 |

删除某项移除该贴纸，stickers: [] 关闭本节点全部普通贴纸。贴纸不会自动跨 scenes 节点：要持续出现，在后续节点也保留同一项。复制到新节点后检查 start / end，也可删掉它们让时间跟随新节点。

asset 选择 props 名称：frame（旧相框）、frameCut（中空纸框）、memoryTrace（信件残物）、petalCut（花瓣）、reachClose / sobClose / letterClose / keysClose / absenceClose（新版特写），以及 roomKeys / repairLedger / residentNote / emptyCup / vacantDoor / archiveSleeve（新版旧物）。旧 keys / envelope / flower 和 palmClose 兼容名保留。

旧相框 asset: "frame" 用 content 选择 faceA（黑脸）、faceB（撕纸遮脸）、faceC（玫瑰色遮眼）、faceEmpty；frameCut 是普通透明图，不读取 content。

69–77 秒流动画框带 motion.preset: "faces"，会按 index / count / depth 加速经过；其 x 是流动轨迹上的偏移。要完全固定在某处，删除整个 motion 再改 x / y。77 秒的硬切由下一个 wind-in-the-wires 场景决定，不需要在贴纸上补半秒淡出。

本版已移除 revealLayer；没有独立隐藏显影层。人物 pose 和字幕不是贴纸。

新增旧物示例，放入需要出现的 scenes.stickers：

```json
{ "id": "house-keys", "asset": "roomKeys", "start": 61, "end": 69, "x": 74, "y": 62, "height": 21, "rotation": 8, "layer": "front" }
```

ARCHIVE 的物件列表另在根级 executionAssets.archiveObjects；它是推子增添的图层，不替代场景 stickers 的出现时间。ERASE 会抹去人物特写和照片中的人形，独立旧物保留。
