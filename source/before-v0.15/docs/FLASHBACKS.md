# 编辑 solo 的闪回 / v0.14

打开 timeline.js，找到 t: 112、id: "solo-memory-flashback" 的节点。flashbacks 数组控制 112–135 秒的 15 个切点。每项 t 为开始秒数，下一项 t 为结束秒数，最后一项到 135 秒结束；按 t 递增排列。

本版默认演出不再调用 sobClose / letterClose / reachClose / palmClose。旧特写作为可选素材保留，新切点使用完整坐姿或空场。

下面的 sceneOverrides 控制这一闪回中的人物与构图，修改它不影响原长场景：

```json
{
  "t": 114.4,
  "id": "folded-letter",
  "sourceScene": "reach-into-absence",
  "sourceTime": 135,
  "sourceSpeed": 0,
  "sceneOverrides": {
    "stage": "memory",
    "pose": "letterSit",
    "followExpressions": false,
    "framing": "full",
    "x": 68,
    "y": 7,
    "scale": 0.79,
    "motion": 0,
    "printShadow": false,
    "treatment": "color",
    "opacity": 1,
    "background": "memoryCut",
    "backgroundTint": "#17131b28",
    "backgroundMotion": { "zoom": 1.02 },
    "stickers": []
  },
  "splice": 0.14
}
```

pose 可换成 reachShadow、sobShadow 或其他已注册姿态。x 是人物水平中心百分比，y 是底边距画面下沿百分比，scale 为图像高度 / 画面高度。保持 y ≥ 0 且 scale + y / 100 ≤ 1 给头脚留空间；横向还要留出手臂与头发宽度。pose: null 可以撤下人物。

sourceScene 是已有长场景的 id，sourceTime 是取原画面的歌曲时间，sourceSpeed 是图像时钟速度，0 为定格。它只读取图像，不倒放歌曲或歌词。不要指向闪回节点自身；使用唯一 id 作为来源。

画框、花瓣等独立物件使用 layers：

```json
{
  "t": 129.8,
  "id": "erased-face",
  "background": "archiveCut",
  "backgroundTint": "#17131b80",
  "layers": [
    { "asset": "frame", "content": "faceB", "x": 59, "y": 46, "height": 103, "rotation": -8 }
  ]
}
```

layers 的 x / y 为中心距左上角百分比，height 为画面高度百分比，rotation 为角度。motion 可以写 xTo / yTo / heightTo，删除 motion 即固定。层按数组顺序从后往前叠放。sourceScene 与 layers 选择一种取画面方式。

splice 为切点开头纸闸遮挡时长，设 0 或删除就直接切。减少动态效果时取较疏切点，并冻结层内运动。
