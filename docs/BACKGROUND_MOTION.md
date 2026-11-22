# 背景缩放与缓慢移动

v0.12 后段默认使用三张新绘制版画底板：memoryCut（纸面回忆）、archiveCut（无脸窗口）、voidCut（不可及窄光），路径在 assets/backgrounds/print。旧五张仍保留供手动选择，backgroundMotion 字段和下面的相机用法不变。开场 0–31 秒手动节点未改动。

背景镜头独立于人物：人物可以固定 x 播放 walk / walk2，而背景向左移动，形成向右走的感觉。当前开场已设为 2 倍背景、缓慢左移；开场与离场共用同一条 31 秒镜头运动，跨场景不会重置。保留了你改过的离场起点与走路速度。

## 放大两倍，然后缓缓左移

在 timeline.js 的某个 scenes 段落中添加：

```json
"background": "city",
"backgroundMotion": {
  "zoom": 2,
  "fromX": 0,
  "toX": -25,
  "duration": 20,
  "ease": "linear"
}
```

这表示一开始就以 2 倍显示，接下来的 20 秒内，背景从居中移到左偏画面宽度 25% 的位置。人物的 x / y / scale 不受影响。想更慢，增加 duration 或缩短移动距离。

## 参数

| 字段 | 含义 |
|---|---|
| background | art 中的图片名称；例如 city、petalRoad、paperVault、emptyWindows、blackStrings、morningVault |
| backgroundMotion.zoom | 起始放大倍数，最小 1；2 表示宽高均为原取景的 2 倍 |
| backgroundMotion.zoomTo | 结束放大倍数；不填则保持 zoom。zoom: 1、zoomTo: 2 会逐渐放大 |
| backgroundMotion.fromX | 背景起始水平偏移，占画面宽度的百分比；0 居中，正数右移，负数左移 |
| backgroundMotion.toX | 背景终点水平偏移；比 fromX 小就是往左移动。不填保持 fromX |
| backgroundMotion.fromY / toY | 背景起止垂直偏移，占画面高度的百分比；正数上移，负数下移 |
| backgroundMotion.duration | 移动持续多少秒，到达后保持终点；不填则运动到本段结束 |
| backgroundMotion.startTime | 从歌曲第几秒开始计时；不填用本段的 t。多个段落填写同一个值与相同运动参数，可延续同一条镜头 |
| backgroundMotion.ease | linear 为匀速，适合走路；smooth 为缓慢启动和停下。默认 linear |
| backgroundMotion.clamp | 默认 true，将位移限制在图片边界内以避免露底。只有明确想露出底色时才设 false |
| backgroundTint | 可选的背景叠色，如 "#21162142"；只影响背景，不改变人物与字幕颜色 |

缩放基于铺满当前画面的取景，不拉伸图片。先放大才有足够的移动余量：与画面等宽的图片在 zoom: 1 时不能横移而不露底，所以默认边界限制会阻止它继续移动。想让背景明显移动，先用 zoom: 2、fromX: 20、toX: -20 看效果。

已有 backgroundMotion 时以这一组为准；旧 camera / pan 仍兼容，但建议以后在 backgroundMotion 中统一调整。系统的减少动态效果偏好会让背景停在起始取景。

## 本次五张新背景

所有背景都保留玫瑰、奶油、深梅与少量旧金色，采用硬边色块、剪纸和网点。人物继续由原素材单独叠加。

| art 名称 | 文件 | 歌词与意象 | 实际使用 |
|---|---|---|---|
| petalRoad | assets/backgrounds/petal-road.webp | Falling flowers / crooked mile：折成弯路的纸带与留不住的花瓣 | 31–61 秒；90–112 秒以更暗的叠色再次出现 |
| paperVault | assets/backgrounds/paper-vault.webp | Name in my pocket / receipts：折纸、空位与逐渐收紧的收藏 | 61–69、112–135、151–170 秒 |
| emptyWindows | assets/backgrounds/empty-windows.webp | Train windows / every face：掠过的空车窗，画框内部保持空白或黑面 | 69–90 秒 |
| blackStrings | assets/backgrounds/black-strings.webp | Black strings / moon dust / reach：黑线、碎片和触不到的窄光 | 135–151 秒，共用镜头；前景演出从伸手进入安静 |
| morningVault | assets/backgrounds/morning-vault.webp | Until morning / slipped away：被封存的空位、未闭合的弧线与晨光 | 170 秒至结束，同一取景延续到静物尾奏 |

31 与 52 秒沿用同一背景和镜头，135 与 146 秒也连续使用，结尾 170 与 193 秒继续同一画面。背景按情绪和意象组织，不跟随每句字幕切换。

## 更换或加入自己的背景

先在顶层 art 中注册图片路径，再在目标场景的 background 中写名称：

```json
"art": {
  "city": "assets/props/city.webp",
  "myBackground": "assets/backgrounds/my-background.webp"
}
```

保留 art 里其他已有项目。场景写 background: "myBackground"，再按上面设置 backgroundMotion；所有现有场景类型都能选择背景。图片应留出供人物、字幕和横移使用的空间。
