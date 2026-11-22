# 编辑某个贴纸什么时候出现、放在哪里

v0.12 新素材：frameCut（透明中空纸框）、memoryTrace（信件票据残物）、petalCut（五片花瓣）。它们仍在每个 scenes 节点的 stickers 内控制 start / end、x / y、height / rotation，用法与下面一致。frameCut 是普通透明素材，不读取旧 frame 的 content。显影推子另有 scene.revealLayer，设 revealLayer: false 可关闭。两张人物剪影属于 pose。

打开根目录 timeline.js，在目标 scenes 节点里找到 stickers 数组。现有钥匙、信封、花、画框、流动画框和伸手素材都已拆成独立条目；改某一项只影响该节点。

例如在 t: 31 的节点中，把钥匙这一项改成：

```json
{
  "id": "keys",
  "asset": "keys",
  "start": 35,
  "end": 39,
  "x": 47,
  "y": 62,
  "height": 26,
  "rotation": -28,
  "opacity": 1,
  "layer": "back",
  "fadeIn": 0.2,
  "fadeOut": 0.2
}
```

含义：歌曲第 35 秒开始显示，第 39 秒消失；中心在画面左边起 47%、上边起 62% 的位置，高度为画面 26%，逆时针旋转 28 度。修改已有那一项，不需要再改 film.js。保存并刷新页面。

| 字段 | 作用 |
|---|---|
| id | 本节点内便于识别的名字，例如 keys-left |
| asset | props 中的素材名：keys、envelope、flower、hand、frame 等 |
| start / end | 歌曲中的绝对秒数；start 含在显示区间内，end 时停止。省略则使用本节点起止时间 |
| x / y | 贴纸中心位置百分比，0–100；从左上角计算，x 增大右移，y 增大下移 |
| height | 贴纸高度占画面高度的百分比；宽度等比计算 |
| rotation | 旋转角度，单位是度；正数顺时针、负数逆时针 |
| opacity | 不透明度，0–1 |
| layer | back 在人物后面，front 在人物前面；仍位于场景的光线、玻璃等叠加效果之中 |
| fadeIn / fadeOut | 淡入、淡出时长，单位秒；省略或 0 就直接出现、消失 |
| visible | false 暂时关闭该项；不填或 true 显示 |

start / end 控制该贴纸在当前节点内的显示窗口。例如该节点 31 秒开始、52 秒结束，填 start: 35、end: 39 就在 35–39 秒出现；填 end: 60 也不会让它跨过该节点继续显示。要跨节点显示，在后续节点也保留同一贴纸，并设置相应时间。

复制节点后，检查贴纸的 start / end；若希望自动跟随新节点，把这两项删掉即可。不要把坐标写成 0.47 / 0.62：此处使用 47 / 62。

## 移除、增加贴纸

删除数组内某一个对象，就移除该贴纸；关闭当前节点的全部贴纸写：

```json
"stickers": []
```

新增一项就复制现有对象，改 id、asset、start/end 和位置。不同对象之间用逗号分隔。

## 编辑画框和框内内容

```json
{
  "id": "frame-left",
  "asset": "frame",
  "content": "faceEmpty",
  "start": 35,
  "end": 39,
  "x": 25,
  "y": 40,
  "height": 45,
  "rotation": -8,
  "opacity": 1
}
```

asset: frame 使用画框外壳；content 选择框里的 faceA、faceB、faceC 或 faceEmpty。contentOpacity 控制框内图像透明度，默认 1。

已有部分画框带 contentFadeOut：它只让框内内容在指定时间淡去，框本身仍在。删除 contentFadeOut 可让内容持续显示。

## 移动贴纸

在某项中添加 motion；不写它时，贴纸固定在 x/y：

```json
"motion": {
  "xTo": 65,
  "yTo": 50,
  "duration": 3,
  "ease": "smooth"
}
```

从该贴纸的 start 开始，在 3 秒内从原来的 x/y 移到 65/50。ease 可用 linear 或 smooth；还可写 heightTo、rotationTo、opacityTo。startTime 可指定运动的歌曲起点，不写就跟随贴纸的 start。

原有飞逝画框和堆积演出带 motion.preset（faces / archive），用于保留原来的轨迹；直接编辑 start/end、x/y 和 height 仍会作用于该项。想把它改成普通固定贴纸，删除整段 motion；想让框内内容始终显示，再删除 contentFadeOut。

stickers: [] 移除的是贴纸素材，雨线、黑线、玻璃和光属于场景效果，仍由 stage 决定。
