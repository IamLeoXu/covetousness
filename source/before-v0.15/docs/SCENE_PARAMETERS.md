# 场景参数：完整人物、位置与剪影

v0.14 的 reachShadow 是完整盘腿抬手，sobShadow 是浅肤色掩面，letterSit 是完整盘腿握信。三张在 assets/character/shadows 的 *-v14.webp。solo 完整人物在 flashbacks 的 sceneOverrides 编辑，独立物件在 layers 编辑，详见 FLASHBACKS.md。

v0.12 新增 reachShadow（坐着仰头伸手）、sobShadow（掩面痛哭）。两张是画好的遮面剪影，framing: "full"、treatment: "color" 保留双色层次，treatment: "silhouette" 可改成纯色。静态人物 framing: "full" 默认选择七张高清清线版，quality: "original" 单独切回旧图，settings.characterHD: false 全局切回。

人物位置也可能来自根级 expressions 的 layout。若正在跟随表情轨，修改对应 layout，或写 followExpressions: false 固定本节点。printShadow: false 关闭额外印刷投影。

修改项目根目录 timeline.js 的 scenes，然后刷新页面。v0.8 补上完整人物素材选择与自定义剪影色。旧版本只加载已经裁好的半身 WebP，移动 y 无法显示被裁掉的腿；旧剪影色也写死在 film.js 中。

## 可直接替换的开场配置

下面让她以黑色全身剪影站在画面右侧。不会绘制新人物，使用现有站姿 PNG 的完整轮廓。

```json
{
  "t": 0,
  "id": "rain-and-departure",
  "stage": "rain",
  "pose": "stand",
  "framing": "full",
  "followExpressions": false,
  "action": "雨夜只保留同一处空站台。她握着信封，画外的灯光和风承担离去的暗示；不新增对方的人物或背影。",
  "x": 70,
  "y": 4,
  "scale": 0.85,
  "opacity": 1,
  "treatment": "silhouette",
  "silhouetteColor": "#000000",
  "motion": 0,
  "camera": 1,
  "pan": 0.02,
  "subtitleAlign": "left",
  "subtitleX": 6,
  "subtitleY": 8,
  "transition": "fade"
}
```

此例人物中心在画面宽度的 70%，脚底在距画面底边 4% 处，人物高度约为画面的 85%。上方剩余约 11%，因此头和脚都能放下。

## 角色字段

| 字段 | 写法 | 含义 |
|---|---|---|
| pose | "stand" | 站姿。六个坐姿为 neutral、sweet、defensive、withdrawn、pleading、wistful；walk / walk2 为走路帧动画；null 表示不显示人物 |
| framing | "full" / "portrait" | full 使用完整透明素材；portrait 使用旧半身排版。v0.14 不填默认 full |
| followExpressions | false / true | false 固定使用本段 pose；静态姿态不填或 true 跟随 expressions。动画姿态默认固定，显式 true 才跟随 expressions |
| x | 70 | 人物图像的水平中心距画面左边 70%。增大往右，减小往左 |
| y | 4 | 人物图像底边距画面底边 4%。增大往上，减小往下；负数会移到画面下方 |
| scale | 0.85 | 人物图像高度为画面高度的 85%。0.5 为一半高，1 为等高；宽度等比计算。静态完整人物不填时默认 0.82 |
| opacity | 1 | 不透明度，0–1 |
| treatment | "color" / "silhouette" | color 显示原图；silhouette 用单色填充原图轮廓。这里的 color 是模式名，不是颜色值 |
| silhouetteColor | "#000000" | 剪影颜色。可改为任意有效 CSS 颜色，如 #15131b、#fff。缺省保留原来的 #261522；也兼容单独的 color 颜色字段，优先使用 silhouetteColor |
| motion | 0 | 0 关闭人物轻微上下浮动；1 使用默认浮动幅度。不填读取 settings.motion |
| animationLoop | true / false | walk / walk2 是否循环；默认 true，false 播完保持末帧 |
| animationSpeed | 1 | 动画倍速，0.5 / 1 / 2 为半速 / 原速 / 倍速；0 冻结。歌曲速度不变 |
| animationStart | 0 | 从动画素材内第几秒开始；默认 0，与场景歌曲起点 t 分开 |

全身素材不会自动缩小进画面。要完整显示，可先用 y: 4、scale: 0.85，再挪 x。静止时，保持 y ≥ 0 且 scale + y / 100 ≤ 1，头脚就不会越过上下边界；左右还需给完整轮廓留出宽度。原来的 y: -3 会把底部移到画面下方，scale: 1.01 又高于整个画面。

想保留全身原色，只把 treatment 改回 "color"；想站得更远，把 scale 改成 0.5 或 0.6，再将 y 对齐背景地面。silhouetteColor 是人物填色，雨线、玻璃、全画面光影仍按所在场景叠加。

## 其他字段

| 字段 | 含义 |
|---|---|
| t | 本段开始时间，单位秒。scenes 按时间递增，到下一段 t 前持续使用本段 |
| id | 段落名称，便于识别 |
| stage | 选择 film.js 中已有场景：rain、departure、memory、keepsakes、faces、possession、overload、fracture、quiet、collection、sealed、outro |
| action | 给人看的分镜说明，修改文字不会自动改变画面 |
| camera | rain / departure 的背景缩放，1 为原取景，1.1 为放大 10%；不控制人物大小 |
| pan | rain / departure 的背景横移幅度，占画面宽度的比例；0 停止横移，0.02 为 2%，负数反向 |
| background | art 中注册的背景图片名称；所有现有场景都支持 |
| backgroundMotion | 背景专用镜头：zoom、zoomTo、fromX / toX、fromY / toY、duration、startTime、ease；配置后优先于旧 camera / pan，详见 BACKGROUND_MOTION.md |
| backgroundTint | 背景叠色，例如 #21162142 |
| stickers | 当前节点的贴纸数组；每项的 start/end 控制显示秒数，x/y/height 控制位置大小，详见 STICKERS.md。[] 表示没有贴纸 |
| subtitleAlign | "left" 或 "right"，字幕对齐方向 |
| subtitleX | 字幕左右安全边距的百分比，当前有效范围 2–16 |
| subtitleY | 字幕离画面底部的百分比，当前有效范围 4–28 |
| transition | "fade" 淡入下一场，其余值直接切换；淡入时长由 settings.transitionSeconds 决定 |

当前普通场景均读取 pose；pose: null 即没有人物，不需要修改 film.js。flashback 节点读取 flashbacks；完整人物用 sourceScene / sceneOverrides，独立物件用 layers。
