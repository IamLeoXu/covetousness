# 播放画面设置 / v0.13

REVEAL / SHIFT 与交互显影层已撤出。下方两个推子改成具体的观看设置：

- CAPTION / 字号：18–34 px，初值 settings.lyricFontScale × 25。
- LIGHT / 亮度：60%–125%，初值 settings.pictureBrightness × 100。

亮度只应用于 CG 画布，字幕保持自身清晰度。两个设置暂停时也响应，不修改音乐、歌词时间或素材文件。

首尾印刷纸闸仍在 settings.printTransitions 配置，使用 props.printShutter 的绘制透明素材。kind: open 从黑场显出画面，close 收黑。start / duration 使用歌曲秒数。删除某项取消那一次纸闸，空数组关闭全部。

solo 内部短促纸闸用各 flashbacks 项的 splice 字段控制，0 或删除该字段即直接切图。STAY / KEEP 大字已移除。
