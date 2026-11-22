# DEAD AIR — The Things She Kept / v0.15

打开 index.html，点击小春的磁带：放入、合盖、镜头拉远，完成后歌曲从 0 秒开始。也可运行 `node tools/serve.cjs`。纯 HTML / CSS / JavaScript，无构建依赖。

小春经营旧街的共助小楼。她的贪婪来自无法放开自己倾尽所有保住的住处、住客和过去的付出。此次演出用钥匙、维修账簿、住客纸条、遗留杯子和空房门延续这个故事。角色设定见 [docs/CHARACTER_BRIEF.md](docs/CHARACTER_BRIEF.md)。

本版抬手图保留原上身动作，腿部改成向一侧收拢的跪坐；掩面、握信与新增的握钥匙姿势统一采用中性象牙肤色、米褐硬阴影。保持无五官黑脸、硬线条、旧玫瑰与深梅色块。没有新增编发、椅子或歌词中的另一位人物。

15 张本版运行素材：4 张完整人物、5 张半身特写、6 张透明旧物。完整人物在 assets/character/shadows，特写在 assets/character/details，旧物在 assets/props/kept。绘制原图与参考保存在 assets/production/v15。路径、尺寸、裁切和哈希见 [docs/ART_PRODUCTION_v0.15.json](docs/ART_PRODUCTION_v0.15.json)。旧素材保留。

| 歌曲时间 | 演出 |
|---|---|
| 0–31 秒 | 保留用户手改节点、背景镜头和 walk 的 0.7 倍速度 |
| 61–69 秒 | 维修账簿、钥匙、纸条与遗留杯子 |
| 69–77 秒 | 旧黑脸和遮眼照片在画框中加速闪回 |
| 77–90 秒 | Wind in the wires 起立即切到原电线背景 |
| 112–135 秒 | 恢复 15 个 Solo 闪回切点：握信、空抱、抬手、掩面、握钥匙特写，穿插旧片段、黑脸照片和账簿 |
| 170–193 秒 | 她握住小楼钥匙，完整坐姿被封入纸框 |
| 193 秒以后 | 人物离开，框中只剩钥匙、纸条和杯子 |

38 组订正歌词及 time / end 不变。插带动效约 2.42 秒，使用独立界面时间，不占用歌曲和歌词时间。

| 操作 | 功能 |
|---|---|
| 点击磁带 / 聚焦后 Enter | 插带、合盖、进入播放器并开始歌曲 |
| PLAY / 空格 | 播放、暂停 |
| REW / J、F.FWD / L | 静音倒带、快进；再按一次停下 |
| STOP | 回到歌曲开头，磁带留在机器里 |
| 波形、左右方向键 | 定位；方向键每次移动 3 秒 |
| MASTER | 主音量 |
| ARCHIVE / OBJECTS | 逐层保存钥匙、账簿等旧物 |
| ERASE / PEOPLE | 用纸面缺失效果抹去人物和照片中的人形，保留框、旧物与背景 |
| MUTE / M | 静音 |
| CINEMA / C、FULLSCREEN / F | 纯画面与全屏 |

两个演出推子可同时使用：东西越留越多，人却逐渐消失，对应她“保住一切”的处决反讽。默认均为 0，暂停时也能调整。界面标签、提示和无障碍名称使用英文。推子不修改歌曲速度、音量或字幕时间。字幕字号仍可在 settings.lyricFontScale 配置。

磁带卷盘、轴心、圆导轮与带路共用 SVG 坐标。细带从卷盘切线绕过两侧圆导轮，沿壳体前缘经过磁头口；转角使用圆弧，取消没有导向支撑的折线。

继续编辑：

- [docs/FLASHBACKS.md](docs/FLASHBACKS.md)：Solo 的切点、特写与层的位置。
- [docs/STICKERS.md](docs/STICKERS.md)：贴纸出现时间、位置和移动。
- [docs/PICTURE_FX.md](docs/PICTURE_FX.md)：ARCHIVE / ERASE 的默认值与素材列表。
- [docs/EXPRESSIONS.md](docs/EXPRESSIONS.md)、[docs/SCENE_PARAMETERS.md](docs/SCENE_PARAMETERS.md)：完整人物、剪影色与布局。
- [docs/BACKGROUND_MOTION.md](docs/BACKGROUND_MOTION.md)：背景镜头。
- [docs/CHARACTER_ANIMATION.md](docs/CHARACTER_ANIMATION.md)：原 MOV 解帧动作。
- [docs/LOADING_AND_TAPE.md](docs/LOADING_AND_TAPE.md)：插带时序与带路。
- [docs/WORKSPACE_SYNC.md](docs/WORKSPACE_SYNC.md)：实际本机路径与备份。

预览：[素材](docs/preview/v15-materials.jpg)、[分镜](docs/preview/v15-storyboard.jpg)、[推子对照](docs/preview/v15-execution-mix.jpg)、[磁带带量](docs/preview/v15-tape.jpg)。检查范围见 [docs/VALIDATION.md](docs/VALIDATION.md)。

本版直接修改本机 DEAD_AIR_CG。运行素材和绘制原图都在该目录，129 个运行引用均已核对，无缺失或目录外依赖。复制整个文件夹即可保留这些内容。修改前代码在 source/before-v0.15；本轮写入记录为 source/workspace-update-v0.15.json。
