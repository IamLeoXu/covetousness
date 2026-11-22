/* DEAD AIR v0.12: painted print collage. Edit scenes / stickers / expressions here. */
window.TIMELINE = {
  "version": "0.12",
  "duration": 213.68,
  "music": "assets/bgm.mp3",
  "art": {
    "city": "assets/props/city.webp",
    "petalRoad": "assets/backgrounds/petal-road.webp",
    "paperVault": "assets/backgrounds/paper-vault.webp",
    "emptyWindows": "assets/backgrounds/empty-windows.webp",
    "blackStrings": "assets/backgrounds/black-strings.webp",
    "morningVault": "assets/backgrounds/morning-vault.webp",
    "memoryCut": "assets/backgrounds/print/memory-cut.webp",
    "archiveCut": "assets/backgrounds/print/archive-cut.webp",
    "voidCut": "assets/backgrounds/print/void-cut.webp"
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
    "hand": "assets/props/hand.webp",
    "frameCut": "assets/props/print/frame-cut.webp",
    "memoryTrace": "assets/props/print/memory-trace.webp",
    "petalCut": "assets/props/print/petal-cut.webp",
    "printShutter": "assets/props/print/print-shutter.webp"
  },
  "portraits": {
    "stand": "assets/portraits/stand.webp",
    "neutral": "assets/portraits/neutral.webp",
    "sweet": "assets/portraits/sweet.webp",
    "defensive": "assets/portraits/defensive.webp",
    "withdrawn": "assets/portraits/withdrawn.webp",
    "pleading": "assets/portraits/pleading.webp",
    "wistful": "assets/portraits/wistful.webp",
    "reachShadow": "assets/character/shadows/reach-shadow.webp",
    "sobShadow": "assets/character/shadows/sob-shadow.webp"
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
      "pose": "walk",
      "animationLoop": true,
      "animationSpeed": 0.7,
      "action": "雨夜只保留同一处空站台。她握着信封，画外的灯光和风承担离去的暗示；不新增对方的人物或背影。",
      "x": 77,
      "y": -3,
      "scale": 1.01,
      "opacity": 1,
      "treatment": "silhouette",
      "silhouetteColor": "#150009",
      "camera": 2,
      "pan": 0.02,
      "subtitleAlign": "left",
      "subtitleX": 6,
      "subtitleY": 8,
      "transition": "fade",
      "background": "city",
      "backgroundMotion": {
        "zoom": 2,
        "fromX": 22,
        "toX": -22,
        "startTime": 0,
        "duration": 31,
        "ease": "linear"
      },
      "stickers": []
    },
    {
      "t": 17,
      "id": "half-in-the-light",
      "stage": "departure",
      "pose": null,
      "action": "同一站台的光收窄，人物退场。只留下半明半暗的空框，不把歌词中的 you 具体化。",
      "x": 77,
      "y": -3,
      "scale": 1.01,
      "opacity": 1,
      "treatment": "color",
      "camera": 2,
      "pan": 0.02,
      "subtitleAlign": "left",
      "subtitleX": 6,
      "subtitleY": 8,
      "transition": "fade",
      "background": "city",
      "backgroundMotion": {
        "zoom": 2.8,
        "fromX": -20,
        "toX": -19,
        "fromY": -18,
        "toY": -17,
        "startTime": 17,
        "duration": 3,
        "ease": "linear"
      },
      "stickers": []
    },
    {
      "t": 21,
      "id": "half-in-the-light-2",
      "stage": "departure",
      "pose": null,
      "action": "同一站台的光收窄，人物退场。只留下半明半暗的空框，不把歌词中的 you 具体化。",
      "x": 77,
      "y": -3,
      "scale": 1.01,
      "opacity": 1,
      "treatment": "color",
      "camera": 2,
      "pan": 0.02,
      "subtitleAlign": "left",
      "subtitleX": 6,
      "subtitleY": 8,
      "transition": "fade",
      "background": "city",
      "backgroundMotion": {
        "zoom": 2.8,
        "fromX": 45,
        "toX": 50,
        "fromY": 60,
        "toY": 65,
        "startTime": 21,
        "duration": 10,
        "ease": "linear"
      },
      "stickers": []
    },
    {
      "t": 24.5,
      "id": "half-in-the-light-2",
      "stage": "departure",
      "pose": "walk",
      "animationLoop": true,
      "animationSpeed": 0.7,
      "action": "同一站台的光收窄，人物退场。只留下半明半暗的空框，不把歌词中的 you 具体化。",
      "x": 77,
      "y": -3,
      "scale": 1.01,
      "opacity": 1,
      "treatment": "silhouette",
      "silhouetteColor": "#150009",
      "camera": 2,
      "pan": 0.02,
      "subtitleAlign": "left",
      "subtitleX": 6,
      "subtitleY": 8,
      "transition": "fade",
      "background": "city",
      "backgroundMotion": {
        "zoom": 1.5,
        "fromX": -22,
        "toX": -24,
        "startTime": 25,
        "duration": 6,
        "ease": "linear"
      },
      "stickers": [
        {
          "id": "departure-frame",
          "asset": "frame",
          "start": 24.5,
          "end": 31,
          "x": 76,
          "y": 43,
          "height": 53,
          "rotation": -4.010704565915763,
          "opacity": 0.35,
          "layer": "front",
          "content": "faceEmpty",
          "fadeIn": 6.5
        }
      ]
    },
    {
      "t": 31,
      "id": "first-plea",
      "stage": "memory",
      "pose": "neutral",
      "action": "同一张斜切空相片承载第一遍副歌。彩色回忆短暂停留；39 秒失落，42 秒换成坐着仰头伸手的无脸剪影，不补出画外的人。",
      "x": 74,
      "y": 6,
      "scale": 0.78,
      "framing": "full",
      "printShadow": false,
      "motion": 0,
      "opacity": 1,
      "treatment": "color",
      "camera": 1,
      "subtitleAlign": "left",
      "subtitleX": 6,
      "subtitleY": 8,
      "transition": "fade",
      "background": "memoryCut",
      "stickers": [
        {
          "id": "first-falling-petals",
          "asset": "petalCut",
          "start": 31,
          "end": 52,
          "x": 44,
          "y": 30,
          "height": 29,
          "rotation": 0,
          "opacity": 0.78,
          "layer": "back",
          "fadeIn": 0.8,
          "fadeOut": 2,
          "motion": {
            "xTo": 39,
            "yTo": 51,
            "rotationTo": -11,
            "startTime": 31,
            "duration": 21,
            "ease": "smooth"
          }
        }
      ],
      "backgroundMotion": {
        "zoom": 1.02,
        "zoomTo": 1.06,
        "fromX": 0.8,
        "toX": -0.8,
        "startTime": 31,
        "duration": 30,
        "ease": "smooth"
      },
      "wordmark": {
        "text": "STAY",
        "x": 6,
        "y": 44,
        "size": 31,
        "start": 31,
        "end": 39,
        "fadeOut": 1.2
      },
      "revealLayer": {
        "asset": "memoryTrace",
        "x": 25,
        "y": 27,
        "height": 30,
        "rotation": -7,
        "opacity": 0.7
      }
    },
    {
      "t": 52,
      "id": "warm-recollection",
      "stage": "memory",
      "pose": "sweet",
      "action": "只有无歌词的温暖回忆中保留笑脸。沿用同一底板与镜头，不在每句歌词处切背景。",
      "x": 75,
      "y": 7,
      "scale": 0.66,
      "framing": "full",
      "printShadow": false,
      "motion": 0,
      "opacity": 1,
      "treatment": "color",
      "camera": 1,
      "subtitleAlign": "left",
      "subtitleX": 6,
      "subtitleY": 8,
      "transition": "fade",
      "background": "memoryCut",
      "stickers": [
        {
          "id": "memory-empty-mount",
          "asset": "frameCut",
          "start": 52,
          "end": 61,
          "x": 27,
          "y": 35,
          "height": 42,
          "rotation": 5,
          "opacity": 0.58,
          "layer": "back",
          "fadeIn": 1,
          "fadeOut": 1
        },
        {
          "id": "memory-petals",
          "asset": "petalCut",
          "start": 52,
          "end": 61,
          "x": 45,
          "y": 30,
          "height": 25,
          "rotation": 0,
          "opacity": 0.65,
          "layer": "back",
          "motion": {
            "yTo": 39,
            "rotationTo": -8,
            "duration": 9
          }
        }
      ],
      "backgroundMotion": {
        "zoom": 1.02,
        "zoomTo": 1.06,
        "fromX": 0.8,
        "toX": -0.8,
        "startTime": 31,
        "duration": 30,
        "ease": "smooth"
      },
      "revealLayer": {
        "asset": "memoryTrace",
        "x": 25,
        "y": 27,
        "height": 30,
        "rotation": -7,
        "opacity": 0.7
      }
    },
    {
      "t": 61,
      "id": "the-folded-name",
      "stage": "keepsakes",
      "pose": null,
      "action": "人物退场，以折信、旧票据和断笔的绘制素材承接口袋中的名字，不使用新的具象人物。",
      "x": 73,
      "y": 7,
      "scale": 0.76,
      "framing": "full",
      "printShadow": false,
      "motion": 0,
      "opacity": 1,
      "treatment": "color",
      "camera": 1,
      "subtitleAlign": "left",
      "subtitleX": 6,
      "subtitleY": 8,
      "transition": "fade",
      "background": "memoryCut",
      "stickers": [
        {
          "id": "pocket-traces",
          "asset": "memoryTrace",
          "start": 61,
          "end": 69,
          "x": 62,
          "y": 40,
          "height": 47,
          "rotation": 5,
          "opacity": 1,
          "layer": "back",
          "fadeIn": 0.7
        },
        {
          "id": "pocket-mount",
          "asset": "frameCut",
          "start": 61,
          "end": 69,
          "x": 78,
          "y": 37,
          "height": 55,
          "rotation": -3,
          "opacity": 0.35,
          "layer": "back"
        }
      ],
      "backgroundMotion": {
        "zoom": 1.1,
        "fromX": -1,
        "toX": -2,
        "startTime": 61,
        "duration": 8,
        "ease": "smooth"
      },
      "revealLayer": {
        "asset": "frameCut",
        "x": 28,
        "y": 28,
        "height": 33,
        "opacity": 0.7
      }
    },
    {
      "t": 69,
      "id": "faces-in-transit",
      "stage": "faces",
      "pose": null,
      "action": "空画框与被抹掉的黑色窗口从同一构图里经过；faces 不画五官，也不指定某个人。窗口逐渐加快，直到第二遍副歌。",
      "x": 73,
      "y": 7,
      "scale": 0.76,
      "framing": "full",
      "printShadow": false,
      "motion": 0,
      "opacity": 1,
      "treatment": "color",
      "camera": 1,
      "subtitleAlign": "left",
      "subtitleX": 6,
      "subtitleY": 8,
      "transition": "fade",
      "background": "archiveCut",
      "stickers": [
        {
          "id": "faceless-mount-1",
          "asset": "frameCut",
          "start": 69,
          "end": 90,
          "x": -20,
          "y": 34,
          "height": 57,
          "rotation": -6,
          "opacity": 0.86,
          "layer": "back",
          "motion": {
            "preset": "faces",
            "index": 0,
            "depth": 1,
            "anchorX": -20,
            "startTime": 69,
            "duration": 21
          }
        },
        {
          "id": "faceless-mount-2",
          "asset": "frameCut",
          "start": 69,
          "end": 90,
          "x": 28,
          "y": 42,
          "height": 39,
          "rotation": 4,
          "opacity": 0.72,
          "layer": "back",
          "motion": {
            "preset": "faces",
            "index": 1,
            "depth": 0.72,
            "anchorX": 28,
            "startTime": 69,
            "duration": 21
          }
        },
        {
          "id": "faceless-mount-3",
          "asset": "frameCut",
          "start": 69,
          "end": 90,
          "x": 76,
          "y": 29,
          "height": 28,
          "rotation": -3,
          "opacity": 0.5,
          "layer": "back",
          "motion": {
            "preset": "faces",
            "index": 2,
            "depth": 0.47,
            "anchorX": 76,
            "startTime": 69,
            "duration": 21
          }
        }
      ],
      "backgroundTint": "#17131b80",
      "backgroundMotion": {
        "zoom": 1.14,
        "fromX": 4,
        "toX": -4,
        "startTime": 69,
        "duration": 21,
        "ease": "linear"
      },
      "revealLayer": {
        "asset": "memoryTrace",
        "x": 64,
        "y": 38,
        "height": 34,
        "opacity": 0.9
      }
    },
    {
      "t": 90,
      "id": "second-plea",
      "stage": "possession",
      "pose": "reachShadow",
      "action": "副歌回到相同空框，彩色人物被伸手剪影代替；98 秒滑落后换成掩面蜷缩的姿势。",
      "x": 70,
      "y": 6,
      "scale": 0.82,
      "framing": "full",
      "printShadow": false,
      "motion": 0,
      "opacity": 1,
      "treatment": "color",
      "camera": 1,
      "subtitleAlign": "left",
      "subtitleX": 6,
      "subtitleY": 8,
      "transition": "fade",
      "background": "memoryCut",
      "stickers": [
        {
          "id": "second-petals",
          "asset": "petalCut",
          "start": 90,
          "end": 112,
          "x": 43,
          "y": 25,
          "height": 30,
          "rotation": 0,
          "opacity": 0.7,
          "layer": "back",
          "fadeOut": 3,
          "motion": {
            "xTo": 37,
            "yTo": 57,
            "rotationTo": -12,
            "duration": 22,
            "ease": "smooth"
          }
        }
      ],
      "backgroundMotion": {
        "zoom": 1.1,
        "zoomTo": 1.16,
        "fromX": 0,
        "toX": -2,
        "startTime": 90,
        "duration": 22,
        "ease": "smooth"
      },
      "wordmark": {
        "text": "STAY",
        "x": 6,
        "y": 44,
        "size": 30,
        "color": "#b8758a",
        "start": 90,
        "end": 98,
        "fadeOut": 1.2
      },
      "revealLayer": {
        "asset": "memoryTrace",
        "x": 25,
        "y": 28,
        "height": 31,
        "rotation": -7,
        "opacity": 0.8
      }
    },
    {
      "t": 112,
      "id": "the-archive-turns",
      "stage": "overload",
      "pose": "defensive",
      "action": "间奏只保留积累的空框与套印剪影。抵触变成掩面；不再堆九张杂物，不画触须或玻璃箱。",
      "x": 75,
      "y": 8,
      "scale": 0.68,
      "framing": "full",
      "printShadow": false,
      "motion": 0,
      "opacity": 1,
      "treatment": "color",
      "camera": 1,
      "subtitleAlign": "left",
      "subtitleX": 6,
      "subtitleY": 8,
      "transition": "fade",
      "background": "archiveCut",
      "stickers": [
        {
          "id": "archive-mount-one",
          "asset": "frameCut",
          "start": 114,
          "end": 135,
          "x": 44,
          "y": 31,
          "height": 40,
          "rotation": -7,
          "opacity": 0.55,
          "layer": "back",
          "fadeIn": 3,
          "fadeOut": 2,
          "motion": {
            "xTo": 40,
            "yTo": 29,
            "rotationTo": -11,
            "duration": 21
          }
        },
        {
          "id": "archive-mount-two",
          "asset": "frameCut",
          "start": 119,
          "end": 135,
          "x": 23,
          "y": 61,
          "height": 27,
          "rotation": 8,
          "opacity": 0.4,
          "layer": "back",
          "fadeIn": 4,
          "fadeOut": 2
        }
      ],
      "backgroundTint": "#17131b9c",
      "backgroundMotion": {
        "zoom": 1.08,
        "zoomTo": 1.18,
        "fromX": 1,
        "toX": -2,
        "startTime": 112,
        "duration": 23,
        "ease": "smooth"
      },
      "wordmark": {
        "text": "KEEP",
        "x": 6,
        "y": 44,
        "size": 28,
        "start": 112,
        "end": 135,
        "fadeIn": 3,
        "fadeOut": 2,
        "color": "#b8758a",
        "opacity": 0.85
      },
      "revealLayer": {
        "asset": "memoryTrace",
        "x": 32,
        "y": 58,
        "height": 28,
        "rotation": 5,
        "opacity": 0.9
      }
    },
    {
      "t": 135,
      "id": "reach-into-absence",
      "stage": "fracture",
      "pose": "reachShadow",
      "action": "黑弦不直译成触须。把断裂的纸面与画外窄光作为意象，坐着仰头伸手，手与光之间留下空隙。",
      "x": 61,
      "y": 7,
      "scale": 0.81,
      "framing": "full",
      "printShadow": false,
      "motion": 0,
      "opacity": 1,
      "treatment": "color",
      "camera": 1,
      "subtitleAlign": "left",
      "subtitleX": 6,
      "subtitleY": 8,
      "transition": "fade",
      "background": "voidCut",
      "stickers": [
        {
          "id": "bridge-last-petals",
          "asset": "petalCut",
          "start": 135,
          "end": 146,
          "x": 40,
          "y": 30,
          "height": 23,
          "rotation": 0,
          "opacity": 0.6,
          "layer": "back",
          "fadeOut": 2,
          "motion": {
            "xTo": 34,
            "yTo": 50,
            "rotationTo": -14,
            "duration": 11
          }
        }
      ],
      "followExpressions": false,
      "backgroundMotion": {
        "zoom": 1.02,
        "zoomTo": 1.05,
        "fromX": 0,
        "toX": -0.7,
        "startTime": 135,
        "duration": 16,
        "ease": "smooth"
      },
      "revealLayer": {
        "asset": "frameCut",
        "x": 32,
        "y": 30,
        "height": 31,
        "rotation": -8,
        "opacity": 0.7
      }
    },
    {
      "t": 146,
      "id": "one-soft-hum",
      "stage": "quiet",
      "pose": "sobShadow",
      "action": "夜只回一声低鸣。沿用同一窄光背景，伸手收回成掩面痛哭，留白承担停顿。",
      "x": 66,
      "y": 9,
      "scale": 0.59,
      "framing": "full",
      "printShadow": false,
      "motion": 0,
      "opacity": 1,
      "treatment": "color",
      "camera": 1,
      "subtitleAlign": "left",
      "subtitleX": 6,
      "subtitleY": 8,
      "transition": "fade",
      "background": "voidCut",
      "stickers": [],
      "followExpressions": false,
      "backgroundTint": "#17131b28",
      "backgroundMotion": {
        "zoom": 1.02,
        "zoomTo": 1.05,
        "fromX": 0,
        "toX": -0.7,
        "startTime": 135,
        "duration": 16,
        "ease": "smooth"
      },
      "revealLayer": {
        "asset": "memoryTrace",
        "x": 25,
        "y": 30,
        "height": 28,
        "opacity": 0.65
      }
    },
    {
      "t": 151,
      "id": "unreachable-collection",
      "stage": "collection",
      "pose": "reachShadow",
      "action": "最后副歌仍在同一处空白里伸手；159 秒以后退回掩面。重复意象而不反复换景。",
      "x": 61,
      "y": 7,
      "scale": 0.81,
      "framing": "full",
      "printShadow": false,
      "motion": 0,
      "opacity": 1,
      "treatment": "color",
      "camera": 1,
      "subtitleAlign": "left",
      "subtitleX": 6,
      "subtitleY": 8,
      "transition": "fade",
      "background": "voidCut",
      "stickers": [
        {
          "id": "final-falling-petals",
          "asset": "petalCut",
          "start": 151,
          "end": 170,
          "x": 43,
          "y": 26,
          "height": 27,
          "rotation": 0,
          "opacity": 0.6,
          "layer": "back",
          "fadeOut": 4,
          "motion": {
            "xTo": 35,
            "yTo": 55,
            "rotationTo": -15,
            "duration": 19,
            "ease": "smooth"
          }
        }
      ],
      "backgroundMotion": {
        "zoom": 1.05,
        "zoomTo": 1.08,
        "fromX": -0.7,
        "toX": -1,
        "startTime": 151,
        "duration": 19,
        "ease": "smooth"
      },
      "wordmark": {
        "text": "STAY",
        "x": 6,
        "y": 43,
        "size": 28,
        "start": 151,
        "end": 159,
        "fadeOut": 1.2,
        "color": "#b8758a",
        "opacity": 0.78
      },
      "revealLayer": {
        "asset": "memoryTrace",
        "x": 25,
        "y": 27,
        "height": 30,
        "rotation": -7,
        "opacity": 0.75
      }
    },
    {
      "t": 170,
      "id": "sealed",
      "stage": "sealed",
      "pose": "sobShadow",
      "action": "收藏终于成为空相片中的小小剪影，人物缩小。以已画好的纸框封存，不再画具象玻璃牢笼。",
      "x": 73,
      "y": 13,
      "scale": 0.5,
      "framing": "full",
      "printShadow": false,
      "motion": 0,
      "opacity": 1,
      "treatment": "color",
      "camera": 1,
      "subtitleAlign": "left",
      "subtitleX": 6,
      "subtitleY": 8,
      "transition": "fade",
      "background": "memoryCut",
      "stickers": [
        {
          "id": "sealed-paper-mount",
          "asset": "frameCut",
          "start": 170,
          "end": 193,
          "x": 73,
          "y": 49,
          "height": 78,
          "rotation": 2,
          "opacity": 0.78,
          "layer": "front",
          "fadeIn": 1.3
        }
      ],
      "followExpressions": false,
      "backgroundTint": "#17131b78",
      "backgroundMotion": {
        "zoom": 1.06,
        "fromX": 0,
        "toX": -0.8,
        "startTime": 170,
        "duration": 43.68,
        "ease": "smooth"
      },
      "revealLayer": {
        "asset": "memoryTrace",
        "x": 25,
        "y": 30,
        "height": 30,
        "opacity": 0.7
      }
    },
    {
      "t": 193,
      "id": "the-things-remain",
      "stage": "outro",
      "pose": null,
      "action": "人物消失，留下空框和纸面残物；末尾用印刷闸门与套印错位收黑，不使用雪花屏。",
      "x": 73,
      "y": 7,
      "scale": 0.76,
      "framing": "full",
      "printShadow": false,
      "motion": 0,
      "opacity": 1,
      "treatment": "color",
      "camera": 1,
      "subtitleAlign": "left",
      "subtitleX": 6,
      "subtitleY": 8,
      "transition": "fade",
      "background": "memoryCut",
      "stickers": [
        {
          "id": "remaining-empty-mount",
          "asset": "frameCut",
          "start": 193,
          "end": 213.68,
          "x": 73,
          "y": 49,
          "height": 78,
          "rotation": 2,
          "opacity": 0.78,
          "layer": "back"
        },
        {
          "id": "remaining-paper-traces",
          "asset": "memoryTrace",
          "start": 193,
          "end": 213.68,
          "x": 73,
          "y": 66,
          "height": 17,
          "rotation": -4,
          "opacity": 0.75,
          "layer": "back",
          "fadeIn": 2
        }
      ],
      "backgroundTint": "#17131b78",
      "backgroundMotion": {
        "zoom": 1.06,
        "fromX": 0,
        "toX": -0.8,
        "startTime": 170,
        "duration": 43.68,
        "ease": "smooth"
      },
      "revealLayer": {
        "asset": "memoryTrace",
        "x": 25,
        "y": 30,
        "height": 30,
        "opacity": 0.7
      }
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
    "expressionTransitionSeconds": 0.22,
    "characterHD": true,
    "pictureReveal": 0.12,
    "pictureShift": 0,
    "printTransitions": [
      {
        "kind": "open",
        "start": 0,
        "duration": 1.35,
        "asset": "printShutter"
      },
      {
        "kind": "close",
        "start": 210.5,
        "duration": 3.18,
        "asset": "printShutter"
      }
    ]
  },
  "seatedSprites": {
    "neutral": "assets/character/seated/neutral.png",
    "sweet": "assets/character/seated/sweet.png",
    "defensive": "assets/character/seated/defensive.png",
    "withdrawn": "assets/character/seated/withdrawn.png",
    "pleading": "assets/character/seated/pleading.png",
    "wistful": "assets/character/seated/wistful.png",
    "reachShadow": "assets/character/shadows/reach-shadow.webp",
    "sobShadow": "assets/character/shadows/sob-shadow.webp"
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
      "pose": "stand"
    },
    {
      "t": 31,
      "pose": "neutral"
    },
    {
      "t": 39,
      "pose": "wistful"
    },
    {
      "t": 42,
      "pose": "reachShadow",
      "layout": {
        "x": 70,
        "y": 6,
        "scale": 0.8
      }
    },
    {
      "t": 52,
      "pose": "sweet"
    },
    {
      "t": 90,
      "pose": "reachShadow"
    },
    {
      "t": 98,
      "pose": "sobShadow",
      "layout": {
        "x": 73,
        "y": 7,
        "scale": 0.65
      }
    },
    {
      "t": 112,
      "pose": "defensive",
      "layout": {
        "treatment": "silhouette",
        "silhouetteColor": "#a36578",
        "opacity": 0.65
      }
    },
    {
      "t": 128,
      "pose": "sobShadow",
      "layout": {
        "scale": 0.58,
        "treatment": "color",
        "opacity": 1
      }
    },
    {
      "t": 135,
      "pose": "reachShadow"
    },
    {
      "t": 146,
      "pose": "sobShadow"
    },
    {
      "t": 151,
      "pose": "reachShadow"
    },
    {
      "t": 159,
      "pose": "sobShadow",
      "layout": {
        "x": 67,
        "y": 8,
        "scale": 0.62
      }
    },
    {
      "t": 170,
      "pose": "sobShadow"
    }
  ],
  "standingSprite": "assets/character/stand.png",
  "shadowSprites": {
    "reachShadow": "assets/character/shadows/reach-shadow.webp",
    "sobShadow": "assets/character/shadows/sob-shadow.webp"
  },
  "hdSprites": {
    "stand": "assets/character/hd/stand.webp",
    "neutral": "assets/character/hd/neutral.webp",
    "sweet": "assets/character/hd/sweet.webp",
    "defensive": "assets/character/hd/defensive.webp",
    "withdrawn": "assets/character/hd/withdrawn.webp",
    "pleading": "assets/character/hd/pleading.webp",
    "wistful": "assets/character/hd/wistful.webp"
  }
};
