"""由真实音轨生成直接打开 HTML 也能读取的波形。依赖 Python + numpy + FFmpeg。
用法：python tools/analyse_audio.py --ffmpeg 路径/ffmpeg.exe
换音乐后重新运行；不接触歌词时码。此脚本不参与网页运行。
"""
import argparse
import base64
import hashlib
import json
from pathlib import Path
import subprocess
import numpy as np

root = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser()
parser.add_argument('--ffmpeg', default='ffmpeg')
args = parser.parse_args()
music = root / 'assets/bgm.mp3'
rate, fps, window = 16000, 40, 256
pcm = subprocess.run([args.ffmpeg, '-v', 'error', '-i', str(music), '-map', '0:a:0',
                      '-ac', '2', '-ar', str(rate), '-f', 'f32le', '-'],
                     stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=True).stdout
samples = np.frombuffer(pcm, dtype='<f4').reshape(-1, 2)
duration = len(samples) / rate
count = int(np.ceil(duration * fps))
rms, peaks, scopes = [], [], []
for channel in range(2):
    arr = samples[:, channel]
    rms_ch, scope_ch = [], []
    for i in range(count):
        start, end = int(i * rate / fps), min(len(arr), int((i + 1) * rate / fps))
        block = arr[start:end]
        rms_ch.append(round(float(np.sqrt(np.mean(block * block))), 5) if len(block) else 0)
        # 保存该 25ms 帧实际的 16ms 波形片段，而非合成正弦或随机噪声。
        clip = arr[start:start + window]
        clip = np.pad(clip, (0, max(0, window-len(clip))))[:window]
        # 对 4 个采样点低通平均，再量化；每帧 64 点。
        scope_ch.extend(np.clip(np.rint(clip.reshape(64,4).mean(1)*127), -127, 127).astype(np.int8))
    rms.append(rms_ch)
    scopes.append(base64.b64encode(np.asarray(scope_ch, dtype=np.int8).tobytes()).decode())
    peaks.append([[round(float(np.min(b)),4), round(float(np.max(b)),4)] for b in np.array_split(arr, 1500)])
data = dict(version=1, music='assets/bgm.mp3', sha256=hashlib.sha256(music.read_bytes()).hexdigest(),
            duration=duration, sampleRate=rate, fps=fps, scopePoints=64, rms=rms,
            overview=peaks, scopes=scopes)
(root/'assets/audio-analysis.js').write_text('/* 实际 MP3 的离线分析；由 tools/analyse_audio.py 生成。 */\nwindow.AUDIO_ANALYSIS = '+json.dumps(data,separators=(',',':'))+';\n', encoding='utf-8')
print(json.dumps(dict(duration=duration,channels=2,frames=count,sha256=data['sha256'])))
