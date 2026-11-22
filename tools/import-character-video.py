"""Convert short character videos into lossless transparent frames for the song-clock renderer.

Usage: python tools/import-character-video.py --ffmpeg PATH assets/character/walk.mov
Without input paths, imports assets/character/*.mov. Requires FFmpeg with libwebp.
Writes derived frames and a manifest; never rewrites timeline.js or the MOV sources.
"""
import argparse
import hashlib
import json
from pathlib import Path
import re
import shutil
import subprocess
import tempfile


def probe(ffmpeg, source):
    result = subprocess.run([ffmpeg, '-hide_banner', '-nostdin', '-i', str(source)],
                            stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    details = result.stderr.decode('utf8', errors='replace')
    stream = next((line for line in details.splitlines() if 'Video:' in line), '')
    dimensions = re.search(r'(\d{2,})x(\d{2,})', stream)
    rate = re.search(r'([\d.]+) fps', stream)
    if not dimensions or not rate:
        raise RuntimeError('Cannot read video size/frame rate: ' + details)
    return {'width': int(dimensions[1]), 'height': int(dimensions[2]),
            'fps': float(rate[1]), 'alphaFormat': bool(re.search(r'yuva|rgba|bgra|gbrap|argb|abgr', stream)),
            'stream': stream.strip()}


def main():
    root = Path(__file__).resolve().parents[1]
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--ffmpeg', default='ffmpeg')
    parser.add_argument('sources', nargs='*')
    args = parser.parse_args()
    sources = [Path(value).resolve() for value in args.sources] or sorted((root / 'assets/character').glob('*.mov'))
    destination = root / 'assets/character/animations'
    destination.mkdir(parents=True, exist_ok=True)
    manifest_path = destination / 'manifest.json'
    manifest = json.loads(manifest_path.read_text(encoding='utf8')) if manifest_path.exists() else {'animations': {}}
    for source in sources:
        name = source.stem
        if not re.fullmatch(r'[A-Za-z0-9_-]+', name):
            raise ValueError('Use letters, digits, underscore or hyphen in the video filename: ' + source.name)
        info = probe(args.ffmpeg, source)
        if not info['alphaFormat']:
            raise ValueError('The video format does not contain an alpha plane: ' + source.name)
        with tempfile.TemporaryDirectory(prefix='.import-', dir=destination) as scratch:
            if not Path(scratch).resolve().is_relative_to(destination.resolve()):
                raise ValueError('Temporary output must stay inside the animation directory')
            command = [args.ffmpeg, '-hide_banner', '-nostdin', '-loglevel', 'error', '-i', str(source),
                       '-map', '0:v:0', '-an', '-vsync', '0', '-c:v', 'libwebp', '-lossless', '1',
                       '-compression_level', '6', '-pix_fmt', 'bgra', '-start_number', '0',
                       '-y', str(Path(scratch) / '%03d.webp')]
            subprocess.run(command, check=True)
            frames = sorted(Path(scratch).glob('*.webp'))
            if not frames:
                raise RuntimeError('No frames generated: ' + source.name)
            target = destination / name
            target.mkdir(exist_ok=True)
            for frame in frames:
                shutil.copyfile(frame, target / frame.name)
            count = len(frames)
            config = {'src': f'assets/character/animations/{name}/{{frame}}.webp',
                      'frameCount': count, 'fps': info['fps']}
            entry = {**config, 'width': info['width'], 'height': info['height'],
                     'duration': count / info['fps'], 'source': source.name,
                     'sourceSha256': hashlib.sha256(source.read_bytes()).hexdigest(),
                     'method': 'Original decoded frames, BGRA lossless WebP; no redraw, resize or frame interpolation; audio omitted'}
            manifest['animations'][name] = entry
            print(json.dumps({'name': name, 'config': config, 'duration': entry['duration'],
                              'framesBytes': sum(frame.stat().st_size for frame in frames)}, ensure_ascii=False))
    manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n', encoding='utf8')


if __name__ == '__main__':
    main()
