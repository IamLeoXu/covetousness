/* DEAD AIR v0.17: faceless memories, analogue signal recovery, physical receiver. */
window.TIMELINE = {
  "version": "0.17",
  "duration": 213.68,
  "music": "assets/bgm.mp3",
  "art": {
    "city": "assets/props/city.webp",
    "emptyWindows": "assets/backgrounds/empty-windows.webp",
    "blackStrings": "assets/backgrounds/black-strings.webp",
    "memoryCut": "assets/backgrounds/print/memory-cut.webp",
    "archiveCut": "assets/backgrounds/print/archive-cut.webp",
    "voidCut": "assets/backgrounds/print/void-cut.webp"
  },
  "props": {
    "frame": "assets/props/frame.webp",
    "faceA": "assets/character/details/absence-close-v15.png",
    "faceB": "assets/character/details/letter-close-v16.png",
    "faceC": "assets/character/details/sob-close-v15.png",
    "faceEmpty": "assets/props/face-empty.webp",
    "frameCut": "assets/props/print/frame-cut.webp",
    "printShutter": "assets/props/print/print-shutter.webp",
    "sobClose": "assets/character/details/sob-close-v15.png",
    "letterClose": "assets/character/details/黑影双手紧握象牙信封.png",
    "reachClose": "assets/character/details/仰首少女伸向画外.png",
    "keysClose": "assets/character/details/keys-close-v16.png",
    "absenceClose": "assets/character/details/absence-close-v15.png",
    "roomKeys": "assets/props/kept/room-keys.png",
    "repairLedger": "assets/props/kept/repair-ledger.png",
    "residentNote": "assets/props/kept/resident-note.png",
    "emptyCup": "assets/props/kept/empty-cup.png",
    "letterStudyClose": "assets/character/details/letter-close-v16.png",
    "reachStudyClose": "assets/character/details/reach-close-v16.png",
    "petalRose": "assets/props/fragments/petal-rose.webp",
    "petalBlush": "assets/props/fragments/petal-blush.webp",
    "petalDust": "assets/props/fragments/petal-dust.webp",
    "petalIvory": "assets/props/fragments/petal-ivory.webp",
    "petalFold": "assets/props/fragments/petal-fold.webp",
    "petalCup": "assets/props/fragments/petal-cup.webp",
    "petalWide": "assets/props/fragments/petal-wide.webp",
    "petalCurl": "assets/props/fragments/petal-curl.webp",
    "rentReceipt": "assets/props/fragments/rent-receipt.webp",
    "bluePen": "assets/props/fragments/blue-pen.webp",
    "roomTag": "assets/props/fragments/room-tag.webp",
    "pressedNote": "assets/props/fragments/pressed-note.webp",
    "rainBead": "assets/props/fragments/rain-bead.webp",
    "rainSlide": "assets/props/fragments/rain-slide.webp",
    "rainDouble": "assets/props/fragments/rain-double.webp",
    "rainRun": "assets/props/fragments/rain-run.webp"
  },
  "portraits": {
    "standShadow": "assets/character/shadows/942fdace-12b8-4f7e-9ce5-393a34cc6ab0.png",
    "standReachShadow": "assets/character/shadows/粉色长发礼服少女举手剪影.png",
    "reachShadow": "assets/character/shadows/跪姿蕾丝靴粉色蝴蝶结少女.png",
    "reachSoftShadow": "assets/character/shadows/粉黑奶油配色跪姿动漫少女.png",
    "sobShadow": "assets/character/shadows/sob-shadow-v15.png",
    "letterSit": "assets/character/shadows/letter-sit-v14.webp"
  },
  "animations": {},
  "scenes": [
    {
      "t": 0,
      "id": "rain-and-departure",
      "stage": "rain",
      "pose": "standShadow",
      "action": "空站台里只保留无脸剪影。抬手与画外灯光暗示无法挽留，不新增对方人物。",
      "x": 77,
      "y": 6,
      "scale": 0.84,
      "opacity": 0.88,
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
      "stickers": [],
      "framing": "full",
      "motion": 0,
      "followExpressions": false
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
      "id": "half-in-the-light-return",
      "stage": "departure",
      "pose": "standReachShadow",
      "action": "空站台里只保留无脸剪影。抬手与画外灯光暗示无法挽留，不新增对方人物。",
      "x": 77,
      "y": 6,
      "scale": 0.84,
      "opacity": 0.88,
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
      ],
      "framing": "full",
      "motion": 0,
      "followExpressions": false
    },
    {
      "t": 31,
      "id": "first-plea",
      "stage": "memory",
      "pose": "letterSit",
      "action": "第一遍副歌由握信剪影进入挽留姿态；单片花瓣分别飘落，不整串移动。",
      "x": 74,
      "y": 6,
      "scale": 0.73,
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
      "stickers": [],
      "backgroundMotion": {
        "zoom": 1.02,
        "zoomTo": 1.06,
        "fromX": 0.8,
        "toX": -0.8,
        "startTime": 31,
        "duration": 30,
        "ease": "smooth"
      },
      "petals": {
        "startTime": 31,
        "end": 61,
        "count": 7,
        "drift": -0.1
      }
    },
    {
      "t": 52,
      "id": "warm-recollection",
      "stage": "memory",
      "pose": "letterSit",
      "action": "无歌词的回忆里仍只使用无脸角色；同一张底板保留到下一段。",
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
      "petals": {
        "startTime": 31,
        "end": 61,
        "count": 7,
        "drift": -0.1
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
        },
        {
          "id": "kept-repair-ledger",
          "asset": "repairLedger",
          "x": 68,
          "y": 52,
          "height": 47,
          "rotation": -8,
          "start": 61,
          "end": 69,
          "opacity": 0.95,
          "layer": "front",
          "fadeIn": 0.7,
          "fadeOut": 0.4
        },
        {
          "id": "kept-room-keys",
          "asset": "roomKeys",
          "x": 83,
          "y": 58,
          "height": 24,
          "rotation": 11,
          "start": 61,
          "end": 69,
          "opacity": 0.95,
          "layer": "front",
          "fadeIn": 0.7,
          "fadeOut": 0.4
        },
        {
          "id": "kept-resident-note",
          "asset": "residentNote",
          "x": 54,
          "y": 62,
          "height": 29,
          "rotation": 5,
          "start": 61,
          "end": 69,
          "opacity": 0.95,
          "layer": "front",
          "fadeIn": 0.7,
          "fadeOut": 0.4
        },
        {
          "id": "kept-empty-cup",
          "asset": "emptyCup",
          "x": 75,
          "y": 75,
          "height": 15,
          "rotation": -2,
          "start": 61,
          "end": 69,
          "opacity": 0.95,
          "layer": "front",
          "fadeIn": 0.7,
          "fadeOut": 0.4
        },
        {
          "id": "folded-old-rent-receipt",
          "asset": "rentReceipt",
          "start": 65,
          "end": 69,
          "x": 48,
          "y": 58,
          "height": 26,
          "rotation": 8,
          "opacity": 0.94,
          "layer": "front",
          "fadeIn": 0.7,
          "fadeOut": 0.4
        },
        {
          "id": "cracked-blue-pen",
          "asset": "bluePen",
          "start": 65,
          "end": 69,
          "x": 59,
          "y": 72,
          "height": 22,
          "rotation": -12,
          "opacity": 0.94,
          "layer": "front",
          "fadeIn": 0.7,
          "fadeOut": 0.4
        }
      ],
      "backgroundMotion": {
        "zoom": 1.1,
        "fromX": -1,
        "toX": -2,
        "startTime": 61,
        "duration": 8,
        "ease": "smooth"
      }
    },
    {
      "t": 69,
      "id": "faces-in-transit",
      "stage": "faces",
      "pose": null,
      "action": "69–77 秒，已有黑脸、遮眼的人像在车窗画框中加速闪回；到 Wind in the wires 立即硬切离开。",
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
      "background": "emptyWindows",
      "stickers": [
        {
          "id": "masked-window-1",
          "asset": "frame",
          "content": "faceA",
          "start": 69,
          "end": 77,
          "x": -20,
          "y": 32,
          "height": 63,
          "rotation": -7,
          "opacity": 0.92,
          "layer": "back",
          "motion": {
            "preset": "faces",
            "index": 0,
            "count": 6,
            "depth": 1,
            "anchorX": -20,
            "startTime": 69,
            "duration": 8
          }
        },
        {
          "id": "masked-window-2",
          "asset": "frame",
          "content": "faceB",
          "start": 69,
          "end": 77,
          "x": 4.166666666666668,
          "y": 39,
          "height": 56,
          "rotation": 6,
          "opacity": 0.92,
          "layer": "back",
          "motion": {
            "preset": "faces",
            "index": 1,
            "count": 6,
            "depth": 0.97,
            "anchorX": 4.166666666666668,
            "startTime": 69,
            "duration": 8
          }
        },
        {
          "id": "masked-window-3",
          "asset": "frame",
          "content": "faceC",
          "start": 69,
          "end": 77,
          "x": 28.333333333333336,
          "y": 31,
          "height": 65,
          "rotation": -4,
          "opacity": 0.92,
          "layer": "back",
          "motion": {
            "preset": "faces",
            "index": 2,
            "count": 6,
            "depth": 1.03,
            "anchorX": 28.333333333333336,
            "startTime": 69,
            "duration": 8
          }
        },
        {
          "id": "masked-window-4",
          "asset": "frame",
          "content": "faceA",
          "start": 69,
          "end": 77,
          "x": 52.5,
          "y": 38,
          "height": 58,
          "rotation": 8,
          "opacity": 0.92,
          "layer": "back",
          "motion": {
            "preset": "faces",
            "index": 3,
            "count": 6,
            "depth": 1,
            "anchorX": 52.5,
            "startTime": 69,
            "duration": 8
          }
        },
        {
          "id": "masked-window-5",
          "asset": "frame",
          "content": "faceB",
          "start": 69,
          "end": 77,
          "x": 76.66666666666667,
          "y": 34,
          "height": 62,
          "rotation": -6,
          "opacity": 0.92,
          "layer": "back",
          "motion": {
            "preset": "faces",
            "index": 4,
            "count": 6,
            "depth": 0.96,
            "anchorX": 76.66666666666667,
            "startTime": 69,
            "duration": 8
          }
        },
        {
          "id": "masked-window-6",
          "asset": "frame",
          "content": "faceC",
          "start": 69,
          "end": 77,
          "x": 100.83333333333333,
          "y": 41,
          "height": 54,
          "rotation": 3,
          "opacity": 0.92,
          "layer": "back",
          "motion": {
            "preset": "faces",
            "index": 5,
            "count": 6,
            "depth": 1.04,
            "anchorX": 100.83333333333333,
            "startTime": 69,
            "duration": 8
          }
        }
      ],
      "backgroundTint": "#17131b60",
      "backgroundMotion": {
        "zoom": 1.1,
        "fromX": 2,
        "toX": -2,
        "startTime": 69,
        "duration": 8,
        "ease": "linear"
      }
    },
    {
      "t": 77,
      "id": "wind-in-the-wires",
      "stage": "wind",
      "pose": null,
      "action": "Wind in the wires 起立即结束人像闪回，复用之前的电线、窄光与落纸背景。77–90 秒保持同一场景，让风和落花承担记忆的回应。",
      "camera": 1,
      "transition": "cut",
      "subtitleAlign": "left",
      "subtitleX": 6,
      "subtitleY": 8,
      "background": "blackStrings",
      "backgroundMotion": {
        "zoom": 1.12,
        "fromX": 1.5,
        "toX": -1.5,
        "fromY": 0,
        "toY": 0.7,
        "startTime": 77,
        "duration": 13,
        "ease": "smooth"
      },
      "stickers": [],
      "petals": {
        "startTime": 77,
        "end": 90,
        "count": 8,
        "drift": -0.27
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
      "stickers": [],
      "backgroundMotion": {
        "zoom": 1.1,
        "zoomTo": 1.16,
        "fromX": 0,
        "toX": -2,
        "startTime": 90,
        "duration": 22,
        "ease": "smooth"
      },
      "petals": {
        "startTime": 90,
        "end": 112,
        "count": 8,
        "drift": -0.1
      }
    },
    {
      "t": 112,
      "id": "solo-memory-flashback",
      "stage": "flashback",
      "pose": null,
      "action": "只用 shadows 与 details 中的无脸角色闪回；握信、空抱、掩面与挽留穿插站台、房间牌、收据和蓝笔。",
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
      "transition": "cut",
      "background": "archiveCut",
      "stickers": [],
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
      "flashbacks": [
        {
          "t": 112,
          "id": "sleeve-in-rain",
          "sourceScene": "rain-and-departure",
          "sourceTime": 7.4,
          "sourceSpeed": 0.18,
          "splice": 0.16
        },
        {
          "t": 114.4,
          "id": "folded-letter",
          "background": "memoryCut",
          "backgroundTint": "#17131b40",
          "layers": [
            {
              "asset": "letterClose",
              "x": 66,
              "y": 51,
              "height": 116,
              "rotation": -6,
              "opacity": 1,
              "motion": {
                "xTo": 63,
                "heightTo": 121,
                "ease": "smooth"
              }
            }
          ],
          "splice": 0.14
        },
        {
          "t": 116.8,
          "id": "anonymous-windows",
          "background": "archiveCut",
          "backgroundTint": "#17131b80",
          "layers": [
            {
              "asset": "frame",
              "content": "faceA",
              "x": 34,
              "y": 47,
              "height": 84,
              "rotation": -7
            },
            {
              "asset": "frame",
              "content": "faceC",
              "x": 70,
              "y": 43,
              "height": 66,
              "rotation": 8
            }
          ]
        },
        {
          "t": 119.2,
          "id": "nothing-in-my-hand",
          "background": "voidCut",
          "backgroundTint": "#17131b40",
          "layers": [
            {
              "asset": "absenceClose",
              "x": 64,
              "y": 51,
              "height": 116,
              "rotation": -4,
              "opacity": 1,
              "motion": {
                "xTo": 61,
                "heightTo": 121,
                "ease": "smooth"
              }
            }
          ],
          "splice": 0.12
        },
        {
          "t": 121.6,
          "id": "once-warm",
          "background": "memoryCut",
          "backgroundTint": "#17131b40",
          "layers": [
            {
              "asset": "letterStudyClose",
              "x": 70,
              "y": 53,
              "height": 107,
              "rotation": 3
            },
            {
              "asset": "pressedNote",
              "x": 27,
              "y": 40,
              "height": 35,
              "rotation": -10
            },
            {
              "asset": "roomTag",
              "x": 36,
              "y": 71,
              "height": 28,
              "rotation": 12
            }
          ]
        },
        {
          "t": 123.8,
          "id": "cover-the-memory",
          "background": "voidCut",
          "backgroundTint": "#17131b40",
          "layers": [
            {
              "asset": "sobClose",
              "x": 69,
              "y": 55,
              "height": 124,
              "rotation": 3,
              "opacity": 1,
              "motion": {
                "xTo": 66,
                "heightTo": 129,
                "ease": "smooth"
              }
            }
          ],
          "splice": 0.13
        },
        {
          "t": 125.6,
          "id": "the-reach",
          "background": "voidCut",
          "backgroundTint": "#17131b40",
          "layers": [
            {
              "asset": "reachClose",
              "x": 62,
              "y": 52,
              "height": 102,
              "rotation": -4,
              "opacity": 1,
              "motion": {
                "xTo": 60,
                "heightTo": 104,
                "ease": "smooth"
              }
            }
          ]
        },
        {
          "t": 127.2,
          "id": "rain-repeats",
          "sourceScene": "rain-and-departure",
          "sourceTime": 12.3,
          "sourceSpeed": 0.16,
          "splice": 0.12
        },
        {
          "t": 128.6,
          "id": "the-fold-again",
          "background": "memoryCut",
          "backgroundTint": "#17131b40",
          "layers": [
            {
              "asset": "keysClose",
              "x": 65,
              "y": 51,
              "height": 124,
              "rotation": 4,
              "opacity": 1,
              "motion": {
                "xTo": 62,
                "heightTo": 128,
                "ease": "smooth"
              }
            }
          ]
        },
        {
          "t": 129.8,
          "id": "erased-face",
          "background": "archiveCut",
          "backgroundTint": "#17131b80",
          "layers": [
            {
              "asset": "frame",
              "content": "faceB",
              "x": 59,
              "y": 46,
              "height": 103,
              "rotation": -8
            }
          ]
        },
        {
          "t": 130.9,
          "id": "petal-passes",
          "background": "voidCut",
          "backgroundTint": "#17131b40",
          "layers": [
            {
              "asset": "repairLedger",
              "x": 64,
              "y": 53,
              "height": 86,
              "rotation": -8,
              "opacity": 1
            },
            {
              "asset": "roomKeys",
              "x": 39,
              "y": 57,
              "height": 58,
              "rotation": 12,
              "opacity": 1
            },
            {
              "asset": "rentReceipt",
              "x": 26,
              "y": 43,
              "height": 35,
              "rotation": 7
            },
            {
              "asset": "bluePen",
              "x": 51,
              "y": 79,
              "height": 22,
              "rotation": -14
            }
          ],
          "splice": 0.1
        },
        {
          "t": 131.9,
          "id": "too-far",
          "background": "voidCut",
          "backgroundTint": "#17131b40",
          "sourceScene": "reach-into-absence",
          "sourceTime": 143,
          "sourceSpeed": 0.1,
          "sceneOverrides": {
            "pose": "reachSoftShadow",
            "followExpressions": false,
            "x": 66,
            "y": 6,
            "scale": 0.81
          }
        },
        {
          "t": 132.9,
          "id": "cannot-look",
          "background": "voidCut",
          "backgroundTint": "#17131b40",
          "layers": [
            {
              "asset": "sobClose",
              "x": 66,
              "y": 53,
              "height": 132,
              "rotation": 2,
              "opacity": 1,
              "motion": {
                "xTo": 63,
                "heightTo": 137,
                "ease": "smooth"
              }
            }
          ]
        },
        {
          "t": 133.8,
          "id": "empty-platform",
          "sourceScene": "half-in-the-light",
          "sourceTime": 18.4,
          "sourceSpeed": 0.1,
          "splice": 0.1
        },
        {
          "t": 134.45,
          "id": "held-breath",
          "background": "voidCut",
          "backgroundTint": "#17131b40",
          "layers": [
            {
              "asset": "reachStudyClose",
              "x": 67,
              "y": 51,
              "height": 108,
              "rotation": -3
            }
          ]
        }
      ]
    },
    {
      "t": 135,
      "id": "reach-into-absence",
      "stage": "fracture",
      "pose": "standReachShadow",
      "action": "黑弦不直译成触须。把断裂的纸面与画外窄光作为意象，盘腿坐着仰头伸手，手与光之间留下空隙。",
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
      "stickers": [],
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
      "petals": {
        "startTime": 135,
        "end": 146,
        "count": 5,
        "drift": -0.16
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
      "stickers": [],
      "backgroundMotion": {
        "zoom": 1.05,
        "zoomTo": 1.08,
        "fromX": -0.7,
        "toX": -1,
        "startTime": 151,
        "duration": 19,
        "ease": "smooth"
      },
      "petals": {
        "startTime": 151,
        "end": 170,
        "count": 7,
        "drift": -0.13
      }
    },
    {
      "t": 170,
      "id": "sealed",
      "stage": "sealed",
      "pose": "letterSit",
      "action": "她攥紧小楼的钥匙，完整人物被收进同一只纸框。住客已离开，物件却被完整保留。",
      "x": 73,
      "y": 25,
      "scale": 0.46,
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
          "id": "remaining-house-keys",
          "asset": "roomKeys",
          "x": 80,
          "y": 66,
          "height": 15,
          "rotation": 5,
          "start": 193,
          "end": 213.68,
          "opacity": 0.9,
          "layer": "back",
          "fadeIn": 1.4
        },
        {
          "id": "remaining-note",
          "asset": "residentNote",
          "x": 71,
          "y": 63,
          "height": 22,
          "rotation": -7,
          "start": 193,
          "end": 213.68,
          "opacity": 0.9,
          "layer": "back",
          "fadeIn": 1.4
        },
        {
          "id": "remaining-cup",
          "asset": "emptyCup",
          "x": 68,
          "y": 70,
          "height": 12,
          "rotation": -2,
          "start": 193,
          "end": 213.68,
          "opacity": 0.9,
          "layer": "back",
          "fadeIn": 1.4
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
    "printTransitions": [],
    "intro": {
      "insertMs": 850,
      "closeMs": 520,
      "pullbackMs": 1050
    },
    "petalAssets": [
      "petalRose",
      "petalBlush",
      "petalDust",
      "petalIvory",
      "petalFold",
      "petalCup",
      "petalWide",
      "petalCurl"
    ],
    "signalAutomation": {
      "intro": [
        {
          "t": 0,
          "tracking": 0.025,
          "restoration": 0.025
        },
        {
          "t": 0.55,
          "tracking": 0.09,
          "restoration": 0.12
        },
        {
          "t": 1.4,
          "tracking": 0.48,
          "restoration": 0.5
        },
        {
          "t": 2.7,
          "tracking": 0.9,
          "restoration": 0.88
        },
        {
          "t": 4,
          "tracking": 1,
          "restoration": 1
        }
      ],
      "outro": [
        {
          "t": 204.5,
          "tracking": 1,
          "restoration": 1
        },
        {
          "t": 207.5,
          "tracking": 0.92,
          "restoration": 0.85
        },
        {
          "t": 210,
          "tracking": 0.45,
          "restoration": 0.42
        },
        {
          "t": 212.3,
          "tracking": 0.08,
          "restoration": 0.06
        },
        {
          "t": 213.68,
          "tracking": 0,
          "restoration": 0
        }
      ]
    }
  },
  "seatedSprites": {
    "standShadow": "assets/character/shadows/942fdace-12b8-4f7e-9ce5-393a34cc6ab0.png",
    "standReachShadow": "assets/character/shadows/粉色长发礼服少女举手剪影.png",
    "reachShadow": "assets/character/shadows/跪姿蕾丝靴粉色蝴蝶结少女.png",
    "reachSoftShadow": "assets/character/shadows/粉黑奶油配色跪姿动漫少女.png",
    "sobShadow": "assets/character/shadows/sob-shadow-v15.png",
    "letterSit": "assets/character/shadows/letter-sit-v14.webp"
  },
  "character": {
    "name": "Koharu",
    "design": "保留甜妹身份与硬线条图形画风。抬手沿用原上半身动作，下半身修正为自然侧坐；所有当前遮面图采用暖米白露肤、玫瑰色头发和深梅阴影。电台与磁带属于演出装置。",
    "expressions": {
      "stand": "站姿",
      "neutral": "平静",
      "sweet": "开心",
      "defensive": "抵触",
      "withdrawn": "蜷缩",
      "pleading": "恳求",
      "wistful": "失落",
      "reachShadow": "仰头抬手，完整侧坐姿",
      "sobShadow": "蜷坐掩面痛哭",
      "letterSit": "跪坐握信",
      "keysHeld": "侧坐攥紧房间钥匙"
    }
  },
  "expressions": [
    {
      "t": 0,
      "pose": "standShadow"
    },
    {
      "t": 31,
      "pose": "letterSit"
    },
    {
      "t": 42,
      "pose": "reachShadow",
      "layout": {
        "x": 72,
        "y": 6,
        "scale": 0.82
      }
    },
    {
      "t": 52,
      "pose": "letterSit"
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
      "t": 135,
      "pose": "standReachShadow",
      "layout": {
        "x": 70,
        "y": 6,
        "scale": 0.85
      }
    },
    {
      "t": 142,
      "pose": "reachShadow",
      "layout": {
        "x": 66,
        "y": 6,
        "scale": 0.81
      }
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
      "t": 163,
      "pose": "standShadow",
      "layout": {
        "x": 67,
        "y": 6,
        "scale": 0.82
      }
    },
    {
      "t": 170,
      "pose": "letterSit"
    }
  ],
  "shadowSprites": {
    "standShadow": "assets/character/shadows/942fdace-12b8-4f7e-9ce5-393a34cc6ab0.png",
    "standReachShadow": "assets/character/shadows/粉色长发礼服少女举手剪影.png",
    "reachShadow": "assets/character/shadows/跪姿蕾丝靴粉色蝴蝶结少女.png",
    "reachSoftShadow": "assets/character/shadows/粉黑奶油配色跪姿动漫少女.png",
    "sobShadow": "assets/character/shadows/sob-shadow-v15.png",
    "letterSit": "assets/character/shadows/letter-sit-v14.webp"
  },
  "hdSprites": {},
  "cassette": {
    "title": "KOHARU",
    "subtitle": "FALLING FLOWERS",
    "decal": "assets/ui/koharu-tape-decal.png"
  }
};
