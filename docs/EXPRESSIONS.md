# 姿势与表情 / v0.12

可用 pose：stand（持信站姿）、neutral（平静坐姿）、sweet（笑脸盘坐）、defensive（抱臂）、withdrawn（抱膝失落）、pleading（双手合起恳求）、wistful（托腮怀念）、reachShadow（坐着仰头伸手）、sobShadow（双手掩面蜷缩），另有 walk / walk2 两套原视频动作。

新增剪影已画入深色遮面与硬边阴影。treatment: "color" 保留其双色印刷层次，treatment: "silhouette" 配合 silhouetteColor 重新统一着色。

本场景写 pose: null 就没有人物。followExpressions: false 固定使用场景的 pose，否则静态人物随根级 expressions 轨道变化。动作素材默认固定自己的动画。

例如第 159 秒改成掩面，同时缩小并右移：

```json
{
  "t": 159,
  "pose": "sobShadow",
  "layout": { "x": 67, "y": 8, "scale": 0.62 }
}
```

layout 可填 x / y / scale / treatment / silhouetteColor / opacity。它只作用于起点不早于当前场景的表情节点；进入后续场景，新的场景构图重新生效。修改姿势后若位置没变，检查正在生效的 expressions.layout。

| 时间 | 使用 |
|---|---|
| 0–31 | 用户的 walk 剪影与空场节点 |
| 31–39 / 39–42 | 平静 / 托腮失落 |
| 42–52 | 伸手遮面剪影 |
| 52–61 | 唯一的笑脸回忆 |
| 61–90 | 人物退场，纸面与空画框 |
| 90–98 / 98–112 | 伸手 / 掩面 |
| 112–128 / 128–135 | 抱臂套印剪影 / 掩面 |
| 135–146 / 146–151 | 朝画外窄光伸手 / 掩面 |
| 151–159 / 159–193 | 伸手 / 掩面并缩小 |
| 193 以后 | 空场 |

7 张高清静态立绘在 assets/character/hd；完整取景 framing: "full" 时默认启用。settings.characterHD: false 全局切回旧图，场景 quality: "original" 单独切回。原图与原像素切片保持原样。
