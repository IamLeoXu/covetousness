# DEAD AIR — The Things She Kept / v0.12

双击 index.html，点击「播放录音」。也可运行 node tools/serve.cjs。纯 HTML / CSS / JavaScript，无构建依赖。

本版按较早版本的大面积明暗、斜切与套印构图重排 31 秒之后的演出。使用绘制的纸框、信件、花瓣、印刷闸门与三张版画底板，移除了触须曲线、程序绘制的玻璃箱和旧伸手贴纸。UI 仍用游戏的紫黑、黄绿、淡紫与珊瑚红；CG 使用角色的深梅、旧玫瑰与奶油色。

人物改用完整画幅，新增坐着仰头伸手、双手掩面痛哭两张无脸剪影。第一遍副歌保留少量彩色回忆，后半段以剪影和空框承接歌词。笑脸只在 52–61 秒无歌词回忆中出现。共 15 个节点，保留 38 组订正歌词和原曲；0–31 秒手动节点、镜头与走路速度保留。

| 素材位置 | 内容 |
|---|---|
| assets/character/hd | 7 张高清清线立绘，透明无损 WebP |
| assets/character/shadows | reach-shadow / sob-shadow 两张绘制的遮面剪影 |
| assets/backgrounds/print | memory-cut / archive-cut / void-cut 三张绘制底板 |
| assets/props/print | 新纸框、信件残物、花瓣、印刷闸门 |
| assets/character/sources、native | 原附件与原像素透明切片，保持原样 |
| assets/character/seated、stand.png | 旧的 2 倍完整素材，供切回原版 |
| assets/portraits | 兼容旧半身构图的素材 |
| assets/character/animations | 两个原 MOV 解出的透明无损帧，未重绘 |

高清版按原设计重建清晰线条，保留服装、发型、姿态和硬边赛璐璐画法；局部细节有重建，不是原像素的无损复原。原素材未覆盖。settings.characterHD: false 切回旧素材，或在单个场景里写 quality: "original"。高清静态素材在 framing: "full" 时使用，两张新增剪影也使用这个取景方式。

| 操作 | 功能 |
|---|---|
| PLAY / 空格 | 播放、暂停 |
| REW / J、F.FWD / L | 静音倒带、快进，再按一次停下 |
| STOP | 回到开头 |
| 波形轨道、左右方向键 | 定位；方向键每次移动 3 秒 |
| MASTER | 主音量 |
| REVEAL / 显影 | 显露本场景隐藏的纸面残物，暂停时也可调整 |
| SHIFT / 叠印 | 控制画面的硬边套印错位，字幕保持清晰 |
| MUTE / M | 静音 |
| CINEMA / C、FULLSCREEN / F | 纯画面与全屏 |

两个画面推子在播放前、播放中和暂停时均可用，初值在 settings.pictureReveal / pictureShift。原 TAPE FX、ECHO 音效已撤出播放链路，音乐只经过主音量，真实电平表和波形继续读取该音轨。开头 0–1.35 秒、结尾 210.5–213.68 秒使用绘制的印刷闸门，配置在 settings.printTransitions。

继续编辑：

- [docs/STICKERS.md](docs/STICKERS.md)：贴纸何时出现、放在哪里、怎样移动。
- [docs/SCENE_PARAMETERS.md](docs/SCENE_PARAMETERS.md)：完整人物、剪影颜色、隐藏人物。
- [docs/EXPRESSIONS.md](docs/EXPRESSIONS.md)：表情轨与 layout、固定姿势。
- [docs/BACKGROUND_MOTION.md](docs/BACKGROUND_MOTION.md)：背景缩放、移动、跨节点连续镜头。
- [docs/PICTURE_FX.md](docs/PICTURE_FX.md)：显影层、叠印与首尾闸门。
- [docs/CHARACTER_ANIMATION.md](docs/CHARACTER_ANIMATION.md)：walk / walk2 动画。
- [docs/STORYBOARD.md](docs/STORYBOARD.md)：本版按歌词大意的编排。

磁带细带条与两卷带量动画保留。换曲时运行 node tools/embed-audio.cjs 更新本地载荷，再用 tools/analyse_audio.py 更新真实波形缓存。当前曲长 213.68 秒。

演出预览见 docs/preview/v12-storyboard.jpg。验证范围见 docs/VALIDATION.md。

修改前的时间轴备份在 source/timeline.before-v0.12.js，可对照恢复个人节点。
