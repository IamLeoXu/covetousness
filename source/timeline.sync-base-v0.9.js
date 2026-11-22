/* DEAD AIR v0.9: transparent character animations. See docs/CHARACTER_ANIMATION.md. */
window.TIMELINE = {
  "version": "0.9",
  "duration": 213.68,
  "music": "assets/bgm.mp3",
  "art": {
    "city": "assets/props/city.webp"
  },
  "props": {
    "frame": "assets/props/frame.webp",
    "faceA": "assets/props/face-a.webp",
    "faceB": "assets/props/face-b.webp",
    "faceC": "assets/props/face-c.webp",
    "faceEmpty": "assets/props/face-empty.webp",
    "keys": "assets/props/keys.webp",
    "envelope": "assets/props/envelope.webp",
    "flower": "assets/props/pressed-flower.webp",
    "hand": "assets/props/hand.webp"
  },
  "portraits": {
    "stand": "assets/portraits/stand.webp",
    "neutral": "assets/portraits/neutral.webp",
    "sweet": "assets/portraits/sweet.webp",
    "defensive": "assets/portraits/defensive.webp",
    "withdrawn": "assets/portraits/withdrawn.webp",
    "pleading": "assets/portraits/pleading.webp",
    "wistful": "assets/portraits/wistful.webp"
  },
  "animations": {
    "walk": {
      "src": "assets/character/animations/walk/{frame}.webp",
      "frameCount": 30,
      "fps": 10
    },
    "walk2": {
      "src": "assets/character/animations/walk2/{frame}.webp",
      "frameCount": 30,
      "fps": 10
    }
  },
  "scenes": [
    {
      "t": 0,
      "id": "rain-and-departure",
      "stage": "rain",
      "pose": "stand",
      "framing": "full",
      "followExpressions": false,
      "action": "雨夜只保留同一处空站台。她握着信封，画外的灯光和风承担离去的暗示；不新增对方的人物或背影。",
      "x": 77,
      "y": -3,
      "scale": 1.01,
      "opacity": 1,
      "treatment": "silhouette",
      "silhouetteColor": "#150009",
      "camera": 1,
      "pan": 0.02,
      "subtitleAlign": "left",
      "subtitleX": 6,
      "subtitleY": 8,
      "transition": "fade"
    },
    {
      "t": 24.5,
      "id": "half-in-the-light",
      "stage": "departure",
      "pose": null,
      "action": "同一站台的光收窄，人物退场。只留下半明半暗的空框，不把歌词中的 you 具体化。",
      "x": 77,
      "y": -3,
      "scale": 1.01,
      "opacity": 1,
      "treatment": "color",
      "camera": 1.1,
      "pan": 0.02,
      "subtitleAlign": "left",
      "subtitleX": 6,
      "subtitleY": 8,
      "transition": "fade"
    },
    {
      "t": 31,
      "id": "first-plea",
      "stage": "memory",
      "pose": "neutral",
      "action": "保留同一记忆构图，从平静进入失落，再以用户原图的恳求坐姿挽留；39 秒后画框内容淡去。",
      "x": 77,
      "y": -3,
      "scale": 1.01,
      "opacity": 1,
      "treatment": "color",
      "camera": 1,
      "pan": 0.02,
      "subtitleAlign": "left",
      "subtitleX": 6,
      "subtitleY": 8,
      "transition": "fade"
    },
    {
      "t": 52,
      "id": "warm-recollection",
      "stage": "memory",
      "pose": "sweet",
      "action": "间奏才短暂想起过去的笑。沿用原构图和物件，不重新布景。",
      "x": 77,
      "y": -3,
      "scale": 1.01,
      "opacity": 1,
      "treatment": "color",
      "camera": 1,
      "pan": 0.02,
      "subtitleAlign": "left",
      "subtitleX": 6,
      "subtitleY": 8,
      "transition": "fade"
    },
    {
      "t": 61,
      "id": "the-folded-name",
      "stage": "keepsakes",
      "pose": null,
      "action": "钥匙、信封和折好的收据成为一组静物。以物件表达她想保存的关系，不复原某次具体相遇。",
      "x": 77,
      "y": -3,
      "scale": 1.01,
      "opacity": 1,
      "treatment": "color",
      "camera": 1,
      "pan": 0.02,
      "subtitleAlign": "left",
      "subtitleX": 6,
      "subtitleY": 8,
      "transition": "fade"
    },
    {
      "t": 69,
      "id": "faces-in-transit",
      "stage": "faces",
      "pose": null,
      "action": "遮脸、黑面和空白肖像在不同景深经过。73.5 秒开始加速，87 秒逐渐擦去内容，始终没有具名的新人物。",
      "x": 77,
      "y": -3,
      "scale": 1.01,
      "opacity": 1,
      "treatment": "color",
      "camera": 1,
      "pan": 0.02,
      "subtitleAlign": "right",
      "subtitleX": 6,
      "subtitleY": 8,
      "transition": "fade"
    },
    {
      "t": 90,
      "id": "second-plea",
      "stage": "possession",
      "pose": "pleading",
      "action": "第二副歌先恳求，98 秒后蜷缩。框线继续收拢，构图不随每句歌词更换。",
      "x": 77,
      "y": -3,
      "scale": 1.01,
      "opacity": 1,
      "treatment": "color",
      "camera": 1,
      "pan": 0.02,
      "subtitleAlign": "left",
      "subtitleX": 6,
      "subtitleY": 8,
      "transition": "fade"
    },
    {
      "t": 112,
      "id": "the-archive-turns",
      "stage": "overload",
      "pose": "defensive",
      "action": "收藏逐步堆积，以双臂抵触和托腮失落的原图坐姿表现不肯放手与意识到失去。",
      "x": 77,
      "y": -3,
      "scale": 1.01,
      "opacity": 0.8,
      "treatment": "color",
      "camera": 1,
      "pan": 0.02,
      "subtitleAlign": "left",
      "subtitleX": 6,
      "subtitleY": 8,
      "transition": "fade"
    },
    {
      "t": 135,
      "id": "the-black-strings",
      "stage": "fracture",
      "pose": null,
      "action": "纸张边缘牵出黑色细线。142 秒她的手伸向画面外的窄光；不出现被追逐的人。",
      "x": 77,
      "y": -3,
      "scale": 1.01,
      "opacity": 1,
      "treatment": "color",
      "camera": 1,
      "pan": 0.02,
      "subtitleAlign": "left",
      "subtitleX": 6,
      "subtitleY": 8,
      "transition": "fade"
    },
    {
      "t": 146,
      "id": "one-soft-hum",
      "stage": "quiet",
      "pose": "withdrawn",
      "action": "碎片和黑线静止，伸手落空后蜷缩，只剩她、光和空框。",
      "x": 72,
      "y": 0,
      "scale": 0.96,
      "opacity": 1,
      "treatment": "color",
      "camera": 1,
      "pan": 0.02,
      "subtitleAlign": "left",
      "subtitleX": 6,
      "subtitleY": 8,
      "transition": "fade"
    },
    {
      "t": 151,
      "id": "unreachable-collection",
      "stage": "collection",
      "pose": "pleading",
      "action": "最后一次恳求，159 秒后蜷缩。仅使用原图已有姿态，不补画哭脸。",
      "x": 72,
      "y": 0,
      "scale": 0.95,
      "opacity": 1,
      "treatment": "color",
      "camera": 1,
      "pan": 0.02,
      "subtitleAlign": "left",
      "subtitleX": 6,
      "subtitleY": 8,
      "transition": "fade"
    },
    {
      "t": 170,
      "id": "sealed",
      "stage": "sealed",
      "pose": "withdrawn",
      "action": "玻璃将收藏封住，她自己也成为框中的剪影。178 秒晨光进入，却没有带回任何人。",
      "x": 68,
      "y": 5,
      "scale": 0.86,
      "opacity": 1,
      "treatment": "silhouette",
      "camera": 1,
      "pan": 0.02,
      "subtitleAlign": "left",
      "subtitleX": 6,
      "subtitleY": 8,
      "transition": "fade"
    },
    {
      "t": 193,
      "id": "the-things-remain",
      "stage": "outro",
      "pose": null,
      "action": "尾奏停在钥匙、收据和空框的静物上，缓慢淡出。",
      "x": 77,
      "y": -3,
      "scale": 1.01,
      "opacity": 1,
      "treatment": "color",
      "camera": 1,
      "pan": 0.02,
      "subtitleAlign": "center",
      "subtitleX": 6,
      "subtitleY": 8,
      "transition": "fade"
    }
  ],
  "lyrics": [
    {
      "time": 0.5,
      "section": "VERSE 1",
      "text": "I caught your sleeve in the rain\nBy the bus stop rail",
      "end": 5.5
    },
    {
      "time": 5.5,
      "section": "VERSE 1",
      "text": "Paper cups in the gutter\nAnd a threadbare trail",
      "end": 9.5
    },
    {
      "time": 9.5,
      "section": "VERSE 1",
      "text": "Your laugh drifted past me\nLike smoke from a train",
      "end": 13
    },
    {
      "time": 13,
      "section": "VERSE 1",
      "text": "I held it too long\nNow it’s falling again",
      "end": 17
    },
    {
      "time": 17,
      "section": "PRE 1",
      "text": "Wind in the alley\nTugging my coat",
      "end": 21
    },
    {
      "time": 21,
      "section": "PRE 1",
      "text": "Cherry bloom bruised\nOn the curb and the stones",
      "end": 24.5
    },
    {
      "time": 24.5,
      "section": "PRE 1",
      "text": "You turned your face\nJust half in the light",
      "end": 28
    },
    {
      "time": 28,
      "section": "PRE 1",
      "text": "And I knew then\nIt was leaving time",
      "end": 31
    },
    {
      "time": 31,
      "section": "CHORUS 1",
      "text": "Falling flowers, stay\nJust a little while",
      "end": 35
    },
    {
      "time": 35,
      "section": "CHORUS 1",
      "text": "Falling flowers, stay\nOn this crooked mile",
      "end": 39
    },
    {
      "time": 39,
      "section": "CHORUS 1",
      "text": "You were here, you were here\nThen you slipped away",
      "end": 42
    },
    {
      "time": 42,
      "section": "CHORUS 1",
      "text": "Falling flowers, stay\nIn my hands today",
      "end": 49
    },
    {
      "time": 49,
      "section": "CHORUS 1",
      "text": "(falling flowers)",
      "end": 52
    },
    {
      "time": 61,
      "section": "VERSE 2",
      "text": "Your name in my pocket\nFolded small and thin",
      "end": 65
    },
    {
      "time": 65,
      "section": "VERSE 2",
      "text": "Beside old receipts\nAnd a cracked blue pen",
      "end": 69
    },
    {
      "time": 69,
      "section": "VERSE 2",
      "text": "The train windows shimmer\nWith somebody’s past",
      "end": 73.5
    },
    {
      "time": 73.5,
      "section": "VERSE 2",
      "text": "I watch every face\nBut they move too fast",
      "end": 77
    },
    {
      "time": 77,
      "section": "PRE 2",
      "text": "Wind in the wires\nSoft through the trees",
      "end": 80
    },
    {
      "time": 80,
      "section": "PRE 2",
      "text": "Somewhere a memory\nKeeps calling to me",
      "end": 83
    },
    {
      "time": 83,
      "section": "PRE 2",
      "text": "You turned your head\nLike you knew my song",
      "end": 87
    },
    {
      "time": 87,
      "section": "PRE 2",
      "text": "Then the moment broke\nAnd the road rolled on",
      "end": 90
    },
    {
      "time": 90,
      "section": "CHORUS 2",
      "text": "Falling flowers, stay\nJust a little while",
      "end": 95
    },
    {
      "time": 95,
      "section": "CHORUS 2",
      "text": "Falling flowers, stay\nOn this crooked mile",
      "end": 98
    },
    {
      "time": 98,
      "section": "CHORUS 2",
      "text": "You were here, you were here\nThen you slipped away",
      "end": 102
    },
    {
      "time": 102,
      "section": "CHORUS 2",
      "text": "Falling flowers, stay\nIn my hands today",
      "end": 108
    },
    {
      "time": 108,
      "section": "CHORUS 2",
      "text": "(falling flowers)",
      "end": 112
    },
    {
      "time": 135,
      "section": "BRIDGE",
      "text": "Black strings crying\nThrough the open air",
      "end": 139
    },
    {
      "time": 139,
      "section": "BRIDGE",
      "text": "Concrete and moon dust\nSpinning everywhere",
      "end": 142
    },
    {
      "time": 142,
      "section": "BRIDGE",
      "text": "I reach for the shape\nYou left on my tongue",
      "end": 146
    },
    {
      "time": 146,
      "section": "BRIDGE",
      "text": "But the night just answers\nWith one soft hum",
      "end": 151
    },
    {
      "time": 151,
      "section": "FINAL CHORUS",
      "text": "Falling flowers, stay\nJust a little while",
      "end": 155
    },
    {
      "time": 155,
      "section": "FINAL CHORUS",
      "text": "Falling flowers, stay\nOn this crooked mile",
      "end": 159
    },
    {
      "time": 159,
      "section": "FINAL CHORUS",
      "text": "You were here, you were here\nThen you slipped away",
      "end": 163
    },
    {
      "time": 163,
      "section": "FINAL CHORUS",
      "text": "Falling flowers, stay\nIn my hands today",
      "end": 170
    },
    {
      "time": 170,
      "section": "FINAL CHORUS",
      "text": "Falling flowers, stay\nWhile the wind still sings",
      "end": 178
    },
    {
      "time": 178,
      "section": "FINAL CHORUS",
      "text": "Falling flowers, stay\nUntil morning brings",
      "end": 182
    },
    {
      "time": 182,
      "section": "FINAL CHORUS",
      "text": "You were here, you were here\nThen you slipped away",
      "end": 186
    },
    {
      "time": 186,
      "section": "FINAL CHORUS",
      "text": "Falling flowers, stay\nIn my hands today",
      "end": 193
    }
  ],
  "originalText": "[Verse 1]\nI caught your sleeve in the rain\nBy the bus stop rail\nPaper cups in the gutter\nAnd a threadbare trail\nYour laugh drifted past me\nLike smoke from a train\nI held it too long\nNow it’s falling again\n\n[Pre-Chorus]\nWind in the alley\nTugging my coat\nCherry bloom bruised\nOn the curb and the stones\nYou turned your face\nJust half in the light\nAnd I knew then\nIt was leaving time\n\n[Chorus]\nFalling flowers, stay\nJust a little while\nFalling flowers, stay\nOn this crooked mile\nYou were here, you were here\nThen you slipped away\nFalling flowers, stay\nIn my hands today\n(falling flowers)\n\n[小solo]\n\n[Verse 2]\nYour name in my pocket\nFolded small and thin\nBeside old receipts\nAnd a cracked blue pen\nThe train windows shimmer\nWith somebody’s past\nI watch every face\nBut they move too fast\n\n[Pre-Chorus]\nWind in the wires\nSoft through the trees\nSomewhere a memory\nKeeps calling to me\nYou turned your head\nLike you knew my song\nThen the moment broke\nAnd the road rolled on\n\n[Chorus]\nFalling flowers, stay\nJust a little while\nFalling flowers, stay\nOn this crooked mile\nYou were here, you were here\nThen you slipped away\nFalling flowers, stay\nIn my hands today\n(falling flowers)\n\n[Bridge]\n[Distortion Solo]\n[strong]\nBlack strings crying\nThrough the open air\nConcrete and moon dust\nSpinning everywhere\nI reach for the shape\nYou left on my tongue\n[weak]\nBut the night just answers\nWith one soft hum\n\n[Final Chorus][weak]\nFalling flowers, stay\nJust a little while\nFalling flowers, stay\nOn this crooked mile\nYou were here, you were here\nThen you slipped away\nFalling flowers, stay\nIn my hands today\n[strong]\n(falling flowers)\nFalling flowers, stay\nWhile the wind still sings\nFalling flowers, stay\nUntil morning brings\nYou were here, you were here\nThen you slipped away\nFalling flowers, stay\nIn my hands today",
  "settings": {
    "volume": 0.75,
    "transitionSeconds": 0.6,
    "motion": 1,
    "lyricFontScale": 1,
    "tapeFx": 0,
    "echoFx": 0,
    "expressionTransitionSeconds": 0.22,
    "pictureGrain": 0.04,
    "pictureEcho": 0
  },
  "seatedSprites": {
    "neutral": "assets/character/seated/neutral.png",
    "sweet": "assets/character/seated/sweet.png",
    "defensive": "assets/character/seated/defensive.png",
    "withdrawn": "assets/character/seated/withdrawn.png",
    "pleading": "assets/character/seated/pleading.png",
    "wistful": "assets/character/seated/wistful.png"
  },
  "character": {
    "name": "Koharu",
    "design": "仅使用用户两张原图，切分、抠底、2倍等比放大；不重绘",
    "expressions": {
      "stand": "站姿",
      "neutral": "平静",
      "sweet": "开心",
      "defensive": "抵触",
      "withdrawn": "蜷缩",
      "pleading": "恳求",
      "wistful": "失落"
    }
  },
  "expressions": [
    {
      "t": 0,
      "pose": "stand",
      "note": "雨夜使用用户给的站姿"
    },
    {
      "t": 31,
      "pose": "neutral",
      "note": "初次挽留，保持克制"
    },
    {
      "t": 39,
      "pose": "wistful",
      "note": "回忆中对方离开"
    },
    {
      "t": 42,
      "pose": "pleading",
      "note": "把想挽留的话压在手边"
    },
    {
      "t": 52,
      "pose": "sweet",
      "note": "无歌词的温暖回忆"
    },
    {
      "t": 90,
      "pose": "pleading",
      "note": "第二副歌挽留"
    },
    {
      "t": 98,
      "pose": "withdrawn",
      "note": "再次失去后蜷缩"
    },
    {
      "t": 112,
      "pose": "defensive",
      "note": "长间奏的抵触与不肯放手"
    },
    {
      "t": 128,
      "pose": "wistful",
      "note": "发现保存物件留不住联系"
    },
    {
      "t": 146,
      "pose": "withdrawn",
      "note": "伸手落空后的安静"
    },
    {
      "t": 151,
      "pose": "pleading",
      "note": "最后一次恳求"
    },
    {
      "t": 159,
      "pose": "withdrawn",
      "note": "最后的失落与自我封闭"
    },
    {
      "t": 170,
      "pose": "withdrawn",
      "note": "以同一蜷缩轮廓进入封存剪影"
    }
  ],
  "standingSprite": "assets/character/stand.png"
};
