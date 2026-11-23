/* DEAD AIR v0.18: restored anonymous memories, source MOV animation, object-only flashbacks. */
window.TIMELINE = {
  "version": "0.18",
  "duration": 213.68,
  "music": "assets/bgm.mp3",
  "art": {
    "city": "assets/props/city.webp",
    "emptyWindows": "assets/backgrounds/empty-windows.webp",
    "blackStrings": "assets/backgrounds/black-strings.webp",
    "memoryCut": "assets/backgrounds/print/memory-cut.webp",
    "archiveCut": "assets/backgrounds/print/archive-cut.webp",
    "voidCut": "assets/backgrounds/print/void-cut.webp",
    "petalRoad": "assets/backgrounds/petal-road.webp",
    "paperVault": "assets/backgrounds/paper-vault.webp",
    "morningVault": "assets/backgrounds/morning-vault.webp"
  },
  "props": {
    "frame": "assets/props/frame.webp",
    "faceA": "assets/props/face-a.webp",
    "faceB": "assets/props/face-b.webp",
    "faceC": "assets/props/face-c.webp",
    "faceEmpty": "assets/props/face-empty.webp",
    "frameCut": "assets/props/print/frame-cut.webp",
    "printShutter": "assets/props/print/print-shutter.webp",
    "sobClose": "assets/character/details/covered-face.png",
    "letterClose": "assets/character/details/gripped-envelope.png",
    "reachClose": "assets/character/details/reach-dark.png",
    "keysClose": "assets/character/details/clasped-keys.png",
    "absenceClose": "assets/character/details/open-hands.png",
    "roomKeys": "assets/props/kept/room-keys.png",
    "repairLedger": "assets/props/kept/repair-ledger.png",
    "residentNote": "assets/props/kept/resident-note.png",
    "emptyCup": "assets/props/kept/empty-cup.png",
    "letterStudyClose": "assets/character/details/held-letter.png",
    "reachStudyClose": "assets/character/details/reach-light.png",
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
    "rainRun": "assets/props/fragments/rain-run.webp",
    "envelope": "assets/props/envelope.webp",
    "looseKeys": "assets/props/keys.webp",
    "pressedFlower": "assets/props/pressed-flower.webp",
    "memoryTrace": "assets/props/print/memory-trace.webp",
    "vacantDoor": "assets/props/kept/vacant-door.png",
    "archiveSleeve": "assets/props/kept/archive-sleeve.png"
  },
  "portraits": {
    "standShadow": "assets/character/shadows/stand-bowed.png",
    "standBowed": "assets/character/shadows/stand-bowed.png",
    "standReachShadow": "assets/character/shadows/stand-reaching-profile.png",
    "standReachProfile": "assets/character/shadows/stand-reaching-profile.png",
    "standReachOpen": "assets/character/shadows/stand-reaching-open.png",
    "standReachHigh": "assets/character/shadows/stand-reaching-high.png",
    "reachShadow": "assets/character/shadows/kneel-reaching.png",
    "reachSoftShadow": "assets/character/shadows/kneel-reaching-soft.png",
    "sobShadow": "assets/character/shadows/sit-sobbing.png",
    "letterSit": "assets/character/shadows/sit-letter.webp",
    "coveredFace": "assets/character/details/covered-face.png"
  },
  "animations": {
    "walk": {
      "src": "assets/character/animations/walk/{frame}.webp",
      "frameCount": 30,
      "fps": 10,
      "loop": true,
      "posterFrame": 0
    },
    "walk2": {
      "src": "assets/character/animations/walk2/{frame}.webp",
      "frameCount": 30,
      "fps": 10,
      "loop": true,
      "posterFrame": 0
    },
    "cry": {
      "src": "assets/character/animations/cry/{frame}.webp",
      "frameCount": 72,
      "fps": 10,
      "loop": false,
      "posterFrame": 71,
      "width": 684,
      "height": 1167,
      "sourceSize": [
        720,
        1280
      ],
      "crop": {
        "x": 36,
        "y": 94,
        "width": 684,
        "height": 1167
      },
      "sourceName": "cry.mov",
      "sourceSha256": "63f2acdef99059aeff8389da8ec99f45b40b9e87de92bd79d4c0913b453149b8",
      "duration": 7.2,
      "bytes": 23407264
    },
    "lookback": {
      "src": "assets/character/animations/lookback/{frame}.webp",
      "frameCount": 55,
      "fps": 10,
      "loop": false,
      "posterFrame": 54,
      "width": 612,
      "height": 1211,
      "sourceSize": [
        720,
        1280
      ],
      "crop": {
        "x": 85,
        "y": 44,
        "width": 612,
        "height": 1211
      },
      "sourceName": "lookback.mov",
      "sourceSha256": "93409fd22bcfea7adc6ba1c743e041c70f14af6388561aecae21e19c108310bd",
      "duration": 5.5,
      "bytes": 18720928
    }
  },
  "scenes": [
    {
      "t": 0,
      "id": "rain-and-departure",
      "stage": "rain",
      "pose": "walk",
      "action": "恢复走路动画，以统一深色剪影呈现在雨站；背景运动继续沿用原有设置。",
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
      "stickers": [],
      "framing": "full",
      "motion": 0,
      "followExpressions": false,
      "animationLoop": true,
      "animationSpeed": 0.7
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
      "pose": "lookback",
      "action": "使用用户新增 lookback.mov 的透明动画，在半明半暗中回望；只呈现 Koharu，不新增歌词中 you 的身份。",
      "x": 77,
      "y": 6,
      "scale": 0.85,
      "opacity": 1,
      "treatment": "color",
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
          "x": 40,
          "y": 43,
          "height": 53,
          "rotation": -4.010704565915763,
          "opacity": 0.25,
          "layer": "front",
          "content": "faceEmpty",
          "fadeIn": 6.5
        }
      ],
      "framing": "full",
      "motion": 0,
      "followExpressions": false,
      "animationLoop": false,
      "animationSpeed": 0.85,
      "animationTimeStart": 24.5
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
      "pose": "walk2",
      "action": "无歌词的回忆中恢复另一组走路剪影，保持同一底板，不显示旧五官立绘。",
      "x": 75,
      "y": -1,
      "scale": 1.02,
      "framing": "full",
      "printShadow": false,
      "motion": 0,
      "opacity": 0.82,
      "treatment": "silhouette",
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
      },
      "animationLoop": true,
      "animationSpeed": 0.45,
      "silhouetteColor": "#291723",
      "followExpressions": false
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
          "x": 58,
          "y": 55,
          "height": 30,
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
          "x": 54,
          "y": 69,
          "height": 19,
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
          "x": 42,
          "y": 49,
          "height": 27,
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
          "x": 44,
          "y": 74,
          "height": 12,
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
          "x": 32,
          "y": 62,
          "height": 24,
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
          "x": 44,
          "y": 68,
          "height": 20,
          "rotation": -12,
          "opacity": 0.94,
          "layer": "front",
          "fadeIn": 0.7,
          "fadeOut": 0.4
        },
        {
          "id": "pocket-envelope-detail",
          "asset": "letterClose",
          "x": 79,
          "y": 45,
          "height": 66,
          "rotation": 0,
          "start": 61,
          "end": 69,
          "opacity": 1,
          "layer": "back",
          "fadeIn": 0.65,
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
      "action": "独奏闪回只使用雨站、匿名黑头相片、房门、信件、账单、钥匙、花与空画框；用切片、接触印相格和遮罩组织记忆，不使用 Koharu 或她的身体局部。",
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
          "id": "rain-without-her",
          "background": "city",
          "layout": "strips",
          "layers": [
            {
              "asset": "emptyCup",
              "x": 67,
              "y": 69,
              "height": 24,
              "rotation": 0,
              "opacity": 1
            },
            {
              "asset": "rentReceipt",
              "x": 47,
              "y": 58,
              "height": 30,
              "rotation": 11,
              "opacity": 1
            }
          ],
          "splice": 0.09,
          "backgroundMotion": {
            "zoom": 1.8,
            "fromX": -18,
            "toX": -20,
            "startTime": 112,
            "duration": 2.2,
            "ease": "linear"
          }
        },
        {
          "t": 114.2,
          "id": "letter-with-no-addressee",
          "background": "petalRoad",
          "layout": "aperture",
          "layers": [
            {
              "asset": "envelope",
              "x": 66,
              "y": 48,
              "height": 73,
              "rotation": -7,
              "opacity": 1,
              "motion": {
                "heightTo": 80,
                "xTo": 63,
                "ease": "smooth"
              }
            },
            {
              "asset": "roomTag",
              "x": 34,
              "y": 67,
              "height": 25,
              "rotation": 8,
              "opacity": 1
            }
          ],
          "splice": 0.09
        },
        {
          "t": 116.3,
          "id": "windows-pass-too-fast",
          "background": "emptyWindows",
          "layout": "split",
          "layers": [
            {
              "asset": "frame",
              "x": 32,
              "y": 46,
              "height": 87,
              "rotation": -7,
              "opacity": 1,
              "content": "faceA"
            },
            {
              "asset": "frame",
              "x": 70,
              "y": 49,
              "height": 74,
              "rotation": 7,
              "opacity": 1,
              "content": "faceC"
            }
          ],
          "splice": 0.09
        },
        {
          "t": 118.4,
          "id": "everything-accounted-for",
          "background": "paperVault",
          "layout": "contact",
          "layers": [],
          "splice": 0.09,
          "cells": [
            "repairLedger",
            "rentReceipt",
            "roomKeys",
            "bluePen",
            "residentNote",
            "pressedFlower"
          ]
        },
        {
          "t": 120.6,
          "id": "the-room-is-empty",
          "background": "morningVault",
          "layout": "aperture",
          "layers": [
            {
              "asset": "vacantDoor",
              "x": 66,
              "y": 52,
              "height": 86,
              "rotation": -2,
              "opacity": 1,
              "motion": {
                "heightTo": 94,
                "ease": "smooth"
              }
            },
            {
              "asset": "roomTag",
              "x": 34,
              "y": 67,
              "height": 29,
              "rotation": 9,
              "opacity": 1
            }
          ],
          "splice": 0.09
        },
        {
          "t": 122.4,
          "id": "keys-still-fit",
          "background": "voidCut",
          "layout": "strips",
          "layers": [
            {
              "asset": "looseKeys",
              "x": 58,
              "y": 51,
              "height": 91,
              "rotation": -11,
              "opacity": 1,
              "motion": {
                "rotationTo": -3,
                "heightTo": 97,
                "ease": "smooth"
              }
            }
          ],
          "splice": 0.09
        },
        {
          "t": 124,
          "id": "papers-we-kept",
          "background": "archiveCut",
          "layout": "split",
          "layers": [
            {
              "asset": "memoryTrace",
              "x": 59,
              "y": 52,
              "height": 87,
              "rotation": 6,
              "opacity": 1
            },
            {
              "asset": "pressedNote",
              "x": 26,
              "y": 66,
              "height": 30,
              "rotation": -9,
              "opacity": 1
            }
          ],
          "splice": 0.09
        },
        {
          "t": 125.4,
          "id": "anonymous-contact",
          "background": "emptyWindows",
          "layout": "strips",
          "layers": [
            {
              "asset": "frame",
              "x": 29,
              "y": 47,
              "height": 82,
              "rotation": -6,
              "opacity": 1,
              "content": "faceB"
            },
            {
              "asset": "frame",
              "x": 68,
              "y": 45,
              "height": 97,
              "rotation": 5,
              "opacity": 1,
              "content": "faceA"
            }
          ],
          "splice": 0.09
        },
        {
          "t": 126.8,
          "id": "a-door-with-no-return",
          "background": "paperVault",
          "layout": "aperture",
          "layers": [
            {
              "asset": "vacantDoor",
              "x": 61,
              "y": 52,
              "height": 91,
              "rotation": 0,
              "opacity": 1
            },
            {
              "asset": "roomKeys",
              "x": 32,
              "y": 67,
              "height": 32,
              "rotation": 13,
              "opacity": 1
            }
          ],
          "splice": 0.09
        },
        {
          "t": 128.2,
          "id": "flowers-between-the-pages",
          "background": "petalRoad",
          "layout": "split",
          "layers": [
            {
              "asset": "pressedFlower",
              "x": 63,
              "y": 51,
              "height": 69,
              "rotation": -8,
              "opacity": 1,
              "motion": {
                "heightTo": 76,
                "ease": "smooth"
              }
            },
            {
              "asset": "residentNote",
              "x": 31,
              "y": 61,
              "height": 32,
              "rotation": 8,
              "opacity": 1
            }
          ],
          "splice": 0.09
        },
        {
          "t": 129.4,
          "id": "a-cup-left-behind",
          "background": "voidCut",
          "layout": "aperture",
          "layers": [
            {
              "asset": "emptyCup",
              "x": 61,
              "y": 53,
              "height": 74,
              "rotation": -3,
              "opacity": 1
            },
            {
              "asset": "bluePen",
              "x": 33,
              "y": 70,
              "height": 22,
              "rotation": -12,
              "opacity": 1
            }
          ],
          "splice": 0.09
        },
        {
          "t": 130.5,
          "id": "objects-in-the-register",
          "background": "paperVault",
          "layout": "contact",
          "layers": [],
          "splice": 0.09,
          "cells": [
            "envelope",
            "roomTag",
            "emptyCup",
            "pressedNote",
            "looseKeys",
            "archiveSleeve"
          ]
        },
        {
          "t": 131.4,
          "id": "receipt-without-a-name",
          "background": "morningVault",
          "layout": "split",
          "layers": [
            {
              "asset": "rentReceipt",
              "x": 60,
              "y": 52,
              "height": 87,
              "rotation": 7,
              "opacity": 1
            },
            {
              "asset": "bluePen",
              "x": 31,
              "y": 70,
              "height": 23,
              "rotation": -15,
              "opacity": 1
            }
          ],
          "splice": 0.09
        },
        {
          "t": 132.2,
          "id": "the-unposted-letter",
          "background": "petalRoad",
          "layout": "aperture",
          "layers": [
            {
              "asset": "envelope",
              "x": 60,
              "y": 53,
              "height": 88,
              "rotation": -5,
              "opacity": 1
            },
            {
              "asset": "pressedFlower",
              "x": 28,
              "y": 69,
              "height": 29,
              "rotation": 9,
              "opacity": 1
            }
          ],
          "splice": 0.09
        },
        {
          "t": 133,
          "id": "only-the-frames",
          "background": "emptyWindows",
          "layout": "strips",
          "layers": [
            {
              "asset": "frame",
              "x": 35,
              "y": 47,
              "height": 82,
              "rotation": -5,
              "opacity": 1,
              "content": "faceEmpty"
            },
            {
              "asset": "archiveSleeve",
              "x": 71,
              "y": 50,
              "height": 77,
              "rotation": 7,
              "opacity": 1
            }
          ],
          "splice": 0.09
        },
        {
          "t": 133.8,
          "id": "wires-and-metal",
          "background": "blackStrings",
          "layout": "split",
          "layers": [
            {
              "asset": "roomKeys",
              "x": 62,
              "y": 55,
              "height": 57,
              "rotation": -9,
              "opacity": 1
            }
          ],
          "splice": 0.09
        },
        {
          "t": 134.4,
          "id": "one-petal-left",
          "background": "voidCut",
          "layout": "aperture",
          "layers": [
            {
              "asset": "petalBlush",
              "x": 62,
              "y": 53,
              "height": 35,
              "rotation": -18,
              "opacity": 1,
              "motion": {
                "xTo": 56,
                "yTo": 63,
                "heightTo": 18,
                "ease": "smooth"
              }
            }
          ],
          "splice": 0.09
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
      "pose": "coveredFace",
      "action": "静默段用掩面特写，截面落到画面之外；该特写不进入独奏闪回。",
      "x": 66,
      "y": -5,
      "scale": 1.04,
      "framing": "portrait",
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
    "standShadow": "assets/character/shadows/stand-bowed.png",
    "standBowed": "assets/character/shadows/stand-bowed.png",
    "standReachShadow": "assets/character/shadows/stand-reaching-profile.png",
    "standReachProfile": "assets/character/shadows/stand-reaching-profile.png",
    "standReachOpen": "assets/character/shadows/stand-reaching-open.png",
    "standReachHigh": "assets/character/shadows/stand-reaching-high.png",
    "reachShadow": "assets/character/shadows/kneel-reaching.png",
    "reachSoftShadow": "assets/character/shadows/kneel-reaching-soft.png",
    "sobShadow": "assets/character/shadows/sit-sobbing.png",
    "letterSit": "assets/character/shadows/sit-letter.webp",
    "coveredFace": "assets/character/details/covered-face.png"
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
      "pose": "walk"
    },
    {
      "t": 31,
      "pose": "letterSit"
    },
    {
      "t": 39,
      "pose": "standBowed",
      "layout": {
        "x": 74,
        "y": 6,
        "scale": 0.84
      }
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
      "t": 90,
      "pose": "standReachHigh",
      "layout": {
        "x": 71,
        "y": 6,
        "scale": 0.85
      }
    },
    {
      "t": 98,
      "pose": "cry",
      "layout": {
        "x": 73,
        "y": 6,
        "scale": 0.85,
        "animationLoop": false
      }
    },
    {
      "t": 135,
      "pose": "standReachProfile",
      "layout": {
        "x": 68,
        "y": 6,
        "scale": 0.86
      }
    },
    {
      "t": 142,
      "pose": "reachShadow",
      "layout": {
        "x": 65,
        "y": 6,
        "scale": 0.81
      }
    },
    {
      "t": 146,
      "pose": "standBowed"
    },
    {
      "t": 151,
      "pose": "reachShadow"
    },
    {
      "t": 159,
      "pose": "cry",
      "layout": {
        "x": 67,
        "y": 6,
        "scale": 0.83,
        "animationStart": 3,
        "animationLoop": false
      }
    },
    {
      "t": 163,
      "pose": "standReachOpen",
      "layout": {
        "x": 67,
        "y": 6,
        "scale": 0.84
      }
    },
    {
      "t": 170,
      "pose": "letterSit"
    }
  ],
  "shadowSprites": {
    "standShadow": "assets/character/shadows/stand-bowed.png",
    "standBowed": "assets/character/shadows/stand-bowed.png",
    "standReachShadow": "assets/character/shadows/stand-reaching-profile.png",
    "standReachProfile": "assets/character/shadows/stand-reaching-profile.png",
    "standReachOpen": "assets/character/shadows/stand-reaching-open.png",
    "standReachHigh": "assets/character/shadows/stand-reaching-high.png",
    "reachShadow": "assets/character/shadows/kneel-reaching.png",
    "reachSoftShadow": "assets/character/shadows/kneel-reaching-soft.png",
    "sobShadow": "assets/character/shadows/sit-sobbing.png",
    "letterSit": "assets/character/shadows/sit-letter.webp",
    "coveredFace": "assets/character/details/covered-face.png"
  },
  "hdSprites": {},
  "cassette": {
    "title": "KOHARU",
    "subtitle": "FALLING FLOWERS",
    "decal": "assets/ui/koharu-tape-decal.png"
  }
};
