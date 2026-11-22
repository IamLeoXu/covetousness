# 姿势与表情 / v0.14

| pose | 素材与用途 |
|---|---|
| stand | 原站姿 |
| neutral / sweet / defensive / withdrawn / pleading / wistful | 六个原坐姿 |
| reachShadow | 完整盘腿、仰头抬手，浅桃肤色，双脚在身前交叠 |
| sobShadow | 完整蜷坐掩面痛哭，肩膀和双腿为浅桃肤色 |
| letterSit | 完整盘腿，低头双手握信，浅桃肤色 |
| walk / walk2 | 原 MOV 解帧动作 |
| null | 没有人物 |

三张新图在 assets/character/shadows 的 *-v14.webp；旧图保留。reachShadow / sobShadow 已映射到本版素材。

静态人物默认完整图、高度为画面高度的 82%。framing: "full" 明确选择完整图；framing: "portrait" 才使用旧半身图。scale 覆盖默认高度，x 是水平中心百分比，y 是底边离画面底部的百分比。先用 x: 65、y: 6、scale: 0.8 调整完整人物，负 y 会让脚移出画面。

pose: null 隐藏人物。followExpressions: false 固定本节点 pose；否则静态人物跟随根级 expressions。expression.layout 可调整本场景内一次姿态切换的 x / y / scale 等字段。动画默认固定自身动作。

treatment: "color" 保留画好的肤色与阴影；treatment: "silhouette" 配合 silhouetteColor 可变纯色。printShadow: false 关闭额外投影。

| 时间 | 当前使用 |
|---|---|
| 0–31 | 用户手改 walk 剪影与空场，配置保持原样 |
| 31–39 / 39–42 / 42–52 | 平静 / 托腮失落 / 完整盘腿抬手 |
| 52–61 | 无歌词的笑脸回忆 |
| 61–90 | 物件、黑脸画框、电线场景，无女主立绘 |
| 90–98 / 98–112 | 完整盘腿抬手 / 完整掩面 |
| 112–135 | flashbacks 控制完整坐姿、旧画面与空场，不再调用旧半身特写 |
| 135–146 / 146–151 | 盘腿抬手 / 掩面 |
| 151–159 / 159–193 | 盘腿抬手 / 掩面并缩小 |
| 193 以后 | 空场 |

原七张高清图在 assets/character/hd。settings.characterHD: false 或 quality: "original" 使用旧图；三张新遮面姿势在两种设置下均使用本版完整素材。
