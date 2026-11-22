# 在 timeline.js 中使用走路素材

walk.mov 与 walk2.mov 已导入，原文件保留在工作区 assets/character。两段都是 Apple ProRes 4444、720×1280、3 秒、10fps，并有实际透明区域。ProRes 4444 带 Alpha 适合做母版；仅选择支持 Alpha 的格式还不够，导出内容本身也要有透明区域。运行包包含转换后的帧动画，不重复收录这两个 MOV，网页运行无需读取母版。

当前播放器按歌曲时间选择图像。这两段各解出 30 张透明无损 WebP，保留原始尺寸、画幅、动作、颜色和帧率，播放时不重新绘制角色，也不插帧。这样暂停、倒带、拖动与循环都由同一个歌曲时钟决定，双击 index.html 也可使用。素材中的音频不导入，歌曲仍使用原有音轨。

## 在 scenes 中调用

找到你要使用的场景，只添加或修改下面这些字段，保留该段的 t、id、stage、字幕等其他字段：

```json
"pose": "walk2",
"framing": "full",
"followExpressions": false,
"animationLoop": true,
"animationSpeed": 1,
"animationStart": 0,
"treatment": "color",
"x": 70,
"y": 4,
"scale": 0.85,
"motion": 0
```

保存后刷新页面。pose 改成 "walk" 就调用另一段素材。没有替你改变现有场景的 pose 和位置，方便你自行选择使用时机。

| 字段 | 含义 |
|---|---|
| pose: "walk" | 使用 walk.mov 转出的帧动画 |
| pose: "walk2" | 使用 walk2.mov 转出的帧动画 |
| animationLoop: true | 循环播放；不填默认 true |
| animationLoop: false | 播放一次，之后保持最后一帧，直到下一场景 |
| animationSpeed: 1 | 原速；0.5 为半速，2 为倍速，0 冻结动作；不改变歌曲速度 |
| animationStart: 0 | 从素材内部第 0 秒开始；例如 1 表示从素材第 1 秒开始 |
| followExpressions: false | 固定使用本段动画，避免表情轨道切回静态坐姿；动画姿态默认固定，显式 true 才跟随 expressions |
| motion: 0 | 关闭整个图层额外的上下浮动，保留素材自身的动作 |

原色用 treatment: "color"。想要走路剪影，改成下面两行即可，动作仍然播放：

```json
"treatment": "silhouette",
"silhouetteColor": "#150009"
```

x / y / scale 的含义与静态角色一致；视频按完整导出画幅显示，包含原片的透明留白。改变 x 只会改变整段动画的位置，素材自身是否向前移动由原片决定。animationStart 是素材内部时间，场景 t 是歌曲时间，二者分开。

rain、departure、memory、possession、overload、quiet、collection、sealed 场景已有角色绘制。keepsakes、faces、fracture、outro 属于物件或手部段落，要在这些段落加角色需改 film.js 对应函数。

## 以后导入新 MOV

把有透明通道的新视频放进 assets/character，用 Python 和 FFmpeg 运行：

```powershell
python tools/import-character-video.py --ffmpeg "你的ffmpeg.exe完整路径" assets/character/new-pose.mov
```

脚本会输出新素材的配置，并保存到 assets/character/animations/manifest.json。把配置添加到 timeline.js 顶层的 animations 中，例如：

```json
"animations": {
  "new-pose": {
    "src": "assets/character/animations/new-pose/{frame}.webp",
    "frameCount": 30,
    "fps": 10
  }
}
```

frameCount 和 fps 使用脚本实际输出的值；保留已有的 walk 与 walk2 条目。之后在 scenes 里写 pose: "new-pose"。脚本不会自动覆盖 timeline.js，也不修改 MOV 母版。

这种帧序列方式用于当前的短动作素材；较长、较高帧率的片段应另做流式透明视频支持，以控制解码内存与加载量。
