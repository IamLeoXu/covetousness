# 姿势与表情 / v0.15

| pose | 素材与用途 |
|---|---|
| stand | 原完整站姿 |
| neutral / sweet / defensive / withdrawn / pleading / wistful | 六个原完整坐姿 |
| reachShadow | 保留抬手上身，双腿向一侧收拢的完整跪坐 |
| sobShadow | 完整蜷坐、掩面哭泣 |
| letterSit | 双手握信、低头跪坐 |
| keysHeld | 双手握住小楼钥匙、低头侧坐 |
| walk / walk2 | 原 MOV 解帧动作 |
| null | 不显示主角色 |

四张新版完整人物在 assets/character/shadows：reach-shadow-v15.png、sob-shadow-v15.png、letter-kneel-v15.png、keys-held-v15.png。角色脸保持无五官黑影，露肤为中性象牙色和米褐硬阴影。原图与旧版均保留。

静态人物默认使用完整素材，高度为画面高度的 82%。framing: "full" 明确选择完整图；framing: "portrait" 才选择半身素材。scale 覆盖默认高度；x 是水平中心百分比，y 是图像底边离画面底边的百分比。可先用 x: 65、y: 6、scale: 0.8 调整完整人物。负 y 会把脚移出画面。

followExpressions: false 固定本节点 pose；静态人物否则跟随根级 expressions。expression.layout 可以覆盖该次切换的 x / y / scale 等参数。动画默认固定自身动作。pose: null 关闭普通场景主角色；闪回中的人物贴图还需要从 layers 删除。

treatment: "color" 保留绘制好的肤色、色块和阴影。treatment: "silhouette" 配合 silhouetteColor 变成纯色轮廓。printShadow: false 关闭额外投影。

| props 名称 | 特写内容 |
|---|---|
| reachClose | 抬手、仰头 |
| sobClose | 掩面、手与头部 |
| letterClose | 双手握信 |
| keysClose | 胸前握钥匙 |
| absenceClose | 双手想抱住什么，身前为空 |
| palmClose | 兼容旧配置，映射到 absenceClose |

上述特写保存在 assets/character/details 的 *-v15.png，用于 112–135 秒 Solo 的 flashbacks.layers。半身素材可以有意放大裁切；常规场景保留完整人物。不要通过修改普通场景的 y，尝试补出一张已经裁好的特写所没有的腿。

原七张高清图仍在 assets/character/hd。settings.characterHD: false 或 quality: "original" 可使用原七张旧图；四张新版遮面姿势始终映射到本版完整素材。绘制原图见 assets/production/v15/originals。
