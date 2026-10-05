# Renders a short clip of a portrait gently moving its head (no change to the face) with
# LivePortrait. Run with LivePortrait's Python from its checkout (see revitalize-photos.mjs):
#   python head-motion.py <photo> <out.mp4> [--turn 8] [--nod 0] [--tilt 0] [--seconds 3]
# Each angle follows a sine curve, so the clip starts and ends on the original pose.
# --acknowledge: turn to face the viewer (up to --turn degrees), nod once, turn back.
import argparse
import math
import os
import sys

sys.path.insert(0, os.getcwd())

import torch  # noqa: E402
from src.config.crop_config import CropConfig  # noqa: E402
from src.config.inference_config import InferenceConfig  # noqa: E402
from src.live_portrait_pipeline import LivePortraitPipeline  # noqa: E402
from src.utils.camera import get_rotation_matrix  # noqa: E402
from src.utils.crop import paste_back, prepare_paste_back  # noqa: E402
from src.utils.io import load_image_rgb, resize_to_limit  # noqa: E402
from src.utils.video import images2video  # noqa: E402

parser = argparse.ArgumentParser()
parser.add_argument('photo')
parser.add_argument('out')
parser.add_argument('--turn', type=float, default=8.0, help='peak head turn in degrees (yaw)')
parser.add_argument('--nod', type=float, default=0.0, help='peak chin dip in degrees (pitch)')
parser.add_argument('--tilt', type=float, default=0.0, help='peak head tilt in degrees (roll)')
parser.add_argument('--acknowledge', action='store_true', help='turn to the viewer, nod, turn back')
parser.add_argument('--seconds', type=float, default=3.0)
parser.add_argument('--fps', type=int, default=25)
args = parser.parse_args()

pipeline = LivePortraitPipeline(inference_cfg=InferenceConfig(), crop_cfg=CropConfig())
wrapper, cropper = pipeline.live_portrait_wrapper, pipeline.cropper
cfg = wrapper.inference_cfg

with torch.no_grad():
    img = resize_to_limit(load_image_rgb(args.photo), cfg.source_max_dim, cfg.source_division)
    crop = cropper.crop_source_image(img, cropper.crop_cfg)
    if crop is None:
        sys.exit(f'No face detected in {args.photo}')
    source = wrapper.prepare_source(crop['img_crop_256x256'])
    mask = prepare_paste_back(cfg.mask_crop, crop['M_c2o'], dsize=(img.shape[1], img.shape[0]))
    info = wrapper.get_kp_info(source)
    features = wrapper.extract_feature_3d(source)
    x_s = wrapper.transform_keypoint(info)
    yaw0, pitch0 = float(info['yaw']), float(info['pitch'])
    print(f'Source pose: yaw {yaw0:.1f}°, pitch {pitch0:.1f}°')
    # A head already turned away swings toward the camera (smaller |yaw|); a frontal one turns
    # slightly aside. Positive pitch dips the chin (a nod); negative would lift it.
    turn_sign = -1 if yaw0 > 3 else 1

    ease = lambda u: 0.5 - 0.5 * math.cos(math.pi * min(max(u, 0.0), 1.0))  # 0 → 1, smooth at both ends
    # Acknowledge timeline, as fractions of the clip: turn in, pause, nod, pause, turn back.
    TURN_IN, NOD_START, NOD_END, TURN_OUT = 0.27, 0.33, 0.55, 0.62
    # Turn only as far as facing the viewer, never past it.
    turn_amount = min(abs(yaw0), args.turn) if args.acknowledge else args.turn

    frames = []
    n = round(args.seconds * args.fps)
    for i in range(n):
        # One smooth swing out and back: 0 → peak → 0.
        u = i / (n - 1)
        if args.acknowledge:
            turn_curve = ease(u / TURN_IN) - ease((u - TURN_OUT) / (1 - TURN_OUT))
            nod_curve = math.sin(math.pi * min(max((u - NOD_START) / (NOD_END - NOD_START), 0.0), 1.0))
        else:
            turn_curve = nod_curve = math.sin(math.pi * u)
        yaw = info['yaw'] + turn_sign * turn_amount * turn_curve
        pitch = info['pitch'] + args.nod * nod_curve
        roll = info['roll'] + turn_sign * args.tilt * turn_curve
        rotation = get_rotation_matrix(pitch, yaw, roll)
        x_d = info['scale'] * (info['kp'] @ rotation + info['exp']) + info['t']
        x_d = wrapper.stitching(x_s, x_d)
        out = wrapper.parse_output(wrapper.warp_decode(features, x_s, x_d)['out'])[0]
        frames.append(paste_back(out, crop['M_c2o'], img, mask))

images2video(frames, wfp=args.out, fps=args.fps)
print(f'Saved {args.out} ({n} frames)')
