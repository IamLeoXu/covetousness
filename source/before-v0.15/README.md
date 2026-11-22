# DEAD AIR — The Things She Kept / v0.14

双击 index.html 打开，点击画面中的小春磁带。先放入、合盖、拉远到播放器，随后歌曲从 0 秒开始。也可运行 node tools/serve.cjs。纯 HTML / CSS / JavaScript，无构建依赖。

本版抬手改为完整盘腿坐姿：双膝向外，小腿在身前自然交叠，靴子完整保留。抬手、掩面和新增的低头握信坐姿统一使用浅桃肤色；玫瑰色用于头发与服装。保留硬线条与遮面剪影画风。旧素材、原七张高清立绘和 MOV 解帧保留。

solo 里连续的半身特写改为完整盘腿 / 蜷坐人物、物件与空场。静态人物默认使用完整素材；只有明确写 framing: "portrait" 才选旧半身图。人物大小仍由 scale 控制。

磁带使用角色的深梅、旧玫瑰、奶油色和绘制的信封 / 蝴蝶结 / 心形钥匙贴花。外部播放机与游戏 UI 维持原有紫黑、黄绿、淡紫配色。卷盘、轴心和细带改用同一 SVG 坐标，带路沿导带柱走到壳边与底部读头口。

| 歌曲时间 | 变化 |
|---|---|
| 0–31 秒 | 保留用户手改节点、背景镜头与 walk 的 0.7 倍动作速度 |
| 69–77 秒 | 复用旧黑脸、遮眼照片，画框逐渐加速 |
| 77–90 秒 | Wind in the wires 起立即换景，复用之前的电线、窄光与落纸背景 |
| 112–135 秒 | solo 使用 15 个递进闪回切点：站台、完整握信 / 抬手 / 掩面姿势、黑脸窗口、花瓣空场与温暖回忆 |
| 135 秒以后 | 延续已认可的剪影与留白，移除 STAY / KEEP 大字 |

38 组订正歌词、time / end 与原曲保持原样。插带开场约 2.42 秒，使用独立的界面时间，不占用歌曲和歌词时间。

| 操作 | 功能 |
|---|---|
| 点击磁带 / 聚焦后 Enter | 插带、合盖、进入播放器并开始歌曲 |
| PLAY / 空格 | 后续播放、暂停 |
| REW / J、F.FWD / L | 静音倒带、快进；再按一次停下 |
| STOP | 回到歌曲开头，磁带仍在机器里 |
| 波形轨道、左右方向键 | 定位；方向键每次移动 3 秒 |
| MASTER | 主音量 |
| CAPTION / 字号 | 字幕字号，18–34 px |
| LIGHT / 亮度 | 画面亮度，60%–125%，暂停时也可调整 |
| MUTE / M | 静音 |
| CINEMA / C、FULLSCREEN / F | 纯画面与全屏 |

REVEAL / SHIFT 已撤出。字号和亮度是观看设置，不修改音轨、字幕时间或素材文件。歌曲仍只经过主音量，电平与波形使用真实信号。

继续编辑：

- [docs/FLASHBACKS.md](docs/FLASHBACKS.md)：solo 各切点、完整人物位置、前段回放时间。
- [docs/STICKERS.md](docs/STICKERS.md)：贴纸什么时候出现、在哪里、怎样移动。
- [docs/LOADING_AND_TAPE.md](docs/LOADING_AND_TAPE.md)：磁带外观、带路、开场时长。
- [docs/SCENE_PARAMETERS.md](docs/SCENE_PARAMETERS.md)、[docs/EXPRESSIONS.md](docs/EXPRESSIONS.md)：完整人物、剪影、表情与 layout。
- [docs/BACKGROUND_MOTION.md](docs/BACKGROUND_MOTION.md)：背景移动与跨节点镜头。
- [docs/CHARACTER_ANIMATION.md](docs/CHARACTER_ANIMATION.md)：walk / walk2 原视频动作。
- [docs/WORKSPACE_SYNC.md](docs/WORKSPACE_SYNC.md)：原 Windows 目录的同步状态、更新入口与备份位置。

三张新图在 assets/character/shadows：reach-shadow-v14.webp（盘腿抬手）、sob-shadow-v14.webp（浅肤色掩面）、letter-sit-v14.webp（盘腿握信）。路径、绘制提示词与哈希见 docs/ART_PRODUCTION_v0.14.json。旧特写仍可从 props 手动选用，默认演出不再调用。修改前时间轴为 source/timeline.before-v0.14.js。

画面预览：docs/preview/v14-storyboard.jpg；磁带卷径预览：docs/preview/v14-tape.jpg。检查范围及环境限制见 docs/VALIDATION.md。
