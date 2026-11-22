# 显影、叠印与首尾闸门

REVEAL / 显影控制画好的纸面残物层。初值 settings.pictureReveal，范围 0–1。每个 scenes 节点可改 revealLayer：

```json
"revealLayer": {
  "asset": "memoryTrace",
  "x": 25, "y": 31, "height": 36,
  "rotation": -7, "opacity": 0.8
}
```

坐标、大小和角度与 stickers 相同，这一层固定在人物背后。显影推到 0 时隐藏，推到 100 时按 opacity 显示。revealLayer: false 让当前节点不使用显影层，它独立于 stickers: []。

SHIFT / 叠印控制几个宽印刷带的硬边错位，初值 settings.pictureShift，范围 0–1。0 是干净画面，1 是最大错位；字幕在独立文字层，不参与错位。两个推子均可在暂停时调整，不进入音频链路。

首尾闸门使用 props.printShutter 的绘制透明素材。可在 settings.printTransitions 改起止时间：

```json
"printTransitions": [
  { "kind": "open", "start": 0, "duration": 1.35, "asset": "printShutter" },
  { "kind": "close", "start": 210.5, "duration": 3.18, "asset": "printShutter" }
]
```

删除某项取消那一次闸门，空数组关闭全部。open 从黑场显出画面，close 最后收到黑场。动画按歌曲时间取值，暂停、倒带、跳转不会留下残影。系统减少动态效果时取消短促位移，只保留遮挡与淡变。

大字在当前节点编辑，例如：

```json
"wordmark": {
  "text": "STAY", "x": 6, "y": 44, "size": 31,
  "start": 31, "end": 39, "fadeOut": 1.2
}
```

x 是从左侧起的百分比，y 是文字基线从顶部起的百分比，size 是字号相对画面高度的百分比。删除 wordmark 即取消。
