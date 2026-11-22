# 磁带与插带开场 / v0.15

点击小春的磁带后，先移入播放器舱位，再合盖，最后拉远到主界面的磁带位置。歌曲在三步完成后才从 0 秒开始，歌词时间不加偏移。界面使用 SELECT TAPE / INSERT、INSERTING TAPE、CLOSING HATCH 等英文提示。

timeline.js 根级 cassette：

```json
"cassette": {
  "title": "KOHARU",
  "subtitle": "FALLING FLOWERS",
  "decal": "assets/ui/koharu-tape-decal.png"
}
```

settings.intro：

```json
"intro": { "insertMs": 850, "closeMs": 520, "pullbackMs": 1050 }
```

单位毫秒，合计约 2.42 秒，只影响开场。停止、回放不会再次插带。减少动态效果时跳过空间运动；连续点击只执行一次，歌曲还会等待音频准备完成。

cassette.js 给开场和主界面绘制同一盘磁带。壳体用小春的深梅、旧玫瑰、奶油色；蝴蝶结、信封和钥匙贴花是 assets/ui 中的绘制 PNG。播放器与外部 UI 保持游戏配色。

## 带路

卷盘中心固定在 SVG 的 (100,107) / (220,107)，两卷随带量一减一增，轴心不移动。左右圆导轮中心为 (43,176) / (277,176)，半径 6。

细带从左卷盘的切点沿公切线到左导轮，绕导轮圆弧到壳体前缘，沿前缘直行经过磁头口，再绕右导轮圆弧返回右卷盘。转弯有圆导轮支撑，取消之前任意折线。几何在每次卷径更新时重算，卷盘转向与供带、收带一致。线宽为 0.65。

这是一幅紧凑磁带的示意图，壳内布局按本项目尺寸简化。走带依据：前角导向件与前缘磁头压带区域。参考 [Audio compact cassette 专利](https://patents.google.com/patent/CA1216061A) 和 [National Audio Company 制造介绍](https://www.nationalaudiocompany.com/blog/how-is-cassette-tape-made/)。

开场位置与舱盖改 opening.js / style.css；壳体、卷径和带路改 cassette.js。请保持统一坐标与等比 SVG，不要单独拉伸一侧卷盘。三种带量预览见 preview/v15-tape.jpg。
