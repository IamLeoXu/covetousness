# 编辑 Solo 的闪回 / v0.15

打开 timeline.js，找到 t: 112、id: "solo-memory-flashback"。flashbacks 数组控制 112–135 秒的 15 个切点。每项 t 是开始秒数，到下一项 t 结束；最后一项到 135 秒。新增项必须按 t 递增并使用唯一 id。

本版恢复半身闪回，使用 reachClose、sobClose、letterClose、keysClose 和 absenceClose。完整人物仍用于常规长镜头；特写在闪回中以手、脸部黑影和胸前物件表达记忆。

| 开始秒数 | 内容 |
|---|---|
| 112 | 雨夜旧片段 |
| 114.4 | 握信特写 |
| 116.8 | 无脸相框 |
| 119.2 | 空抱特写 |
| 121.6 | 无歌词的温暖旧片段 |
| 123.8 | 掩面特写 |
| 125.6 | 抬手特写 |
| 127.2 | 雨夜重现 |
| 128.6 | 握钥匙特写 |
| 129.8 | 遮脸照片 |
| 130.9 | 维修账簿与小楼钥匙 |
| 131.9 | 伸手 |
| 132.9 | 再次掩面 |
| 133.8 | 空站台 |
| 134.45 | 握钥匙，停住 |

特写和独立物件改 layers。例如：

```json
{
  "t": 114.4,
  "id": "folded-letter",
  "background": "memoryCut",
  "backgroundTint": "#17131b40",
  "layers": [
    {
      "asset": "letterClose",
      "x": 66,
      "y": 51,
      "height": 116,
      "rotation": -6,
      "opacity": 1,
      "motion": { "xTo": 63, "heightTo": 121, "ease": "smooth" }
    }
  ],
  "splice": 0.14
}
```

x / y 是层中心距左上角的百分比，height 是画面高度百分比，rotation 为角度。特写的 height 可以超过 100，形成有意裁切。motion 为终点，删掉整个 motion 即固定。数组越靠后，层越靠前。asset 从根级 props 选；相框 asset: "frame" 可用 content: "faceA" / "faceB" / "faceC" 放入无脸照片。

回看前面已有场景用 sourceScene：

```json
{
  "t": 112,
  "id": "sleeve-in-rain",
  "sourceScene": "rain-and-departure",
  "sourceTime": 7.4,
  "sourceSpeed": 0.18,
  "splice": 0.16
}
```

sourceScene 是已有场景的唯一 id，sourceTime 为读取那段画面的歌曲秒数，sourceSpeed 为图像时钟速度，0 为定格。只取图像，不倒放歌曲、歌词。不要指向闪回节点自身。sourceScene 与 layers 选一种画面来源。

需要在回放场景中改完整人物时，可加 sceneOverrides，例如：
`"sceneOverrides": { "pose": "keysHeld", "followExpressions": false, "framing": "full", "x": 68, "y": 7, "scale": 0.79, "stickers": [] }`。
该覆盖只作用于这一闪回，不改原场景。

splice 是切点开头纸闸遮挡时长，设 0 或删除即可直接切。减少动态效果时使用较疏切点并冻结层运动。ERASE 会作用于人物特写及照片的人形，保留相框和独立旧物。
