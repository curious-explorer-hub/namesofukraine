# Prompt: revitalize the remaining portraits

Paste everything below the line into Claude Code from the repo root. The motion and rules were approved by the owner on 2026-09-30 after a pilot on Франко, Лобановський, and Вернадський (product_vision.md §15).

---

Animate the remaining eligible portraits on the site with our approved "acknowledge" motion, check each clip, and commit.

## The motion (do not change it without the owner)

The person **turns to face the viewer, nods once, and turns back** to their original pose, as if acknowledging that you read their story. Only the head moves. **The face and expression are never changed**: no smile, no blink, no lip movement, no copied expressions. A copied smile was tried and rejected as creepy and disrespectful.

`npm run revitalize` already does exactly this (`scripts/revitalize-photos.mjs` → `scripts/head-motion.py`, variant D):

- 4.5 s at 25 fps; all motion is eased, starting and ending on the original photo.
- Turn toward the viewer over the first ~27% of the clip, only as far as facing the camera (at most 18°, never past frontal). A portrait that already faces the camera barely turns.
- Pause, then one 7° nod (chin down and back) while facing the viewer.
- Pause, then turn back to the original pose over the last ~38%.

On the site, the profile shows the static photo with a «Живе фото» / "Live" badge. The clip plays **once** on hover or on tap/click/keyboard, then returns to the photo. It never loops or autoplays. Cards and share images stay static.

## Who is eligible

Go through `src/content/people/uk/*.md` and pick profiles that meet **all** of these:

1. **Has a portrait** (`image:` set). Monogram profiles have nothing to animate.
2. **Freely licensed photo**: public domain, CC0, CC BY, or CC BY-SA. **Skip** anything credited "Усі права захищено" (all rights reserved): an animated clip is a derivative work. For CC BY-SA, the credit line on the page already adds "animated with AI"; keep the license unchanged.
3. **A photograph, not an artwork.** Skip paintings, icons, engravings, drawings, sculptures, and coins. Animating an artist's work changes the artwork; ask the owner first.
4. **A clear face**, large enough and not hidden (profile view, eyes closed mid-song, heavy shadow, very small or blurred). Use `sips -g pixelWidth -g pixelHeight` and look at the image; aim for ≥ 600 px wide.
5. **Not in the Defenders group and not a violent death** (executed, killed in action, murdered, died in the camps), **unless the owner has opted them in**. Ask the owner before including any of them; list who would be affected.

Already done: `ivan-franko`, `valerii-lobanovskyi`, `volodymyr-vernadskyi`.

## Steps

1. **Check the tools.** LivePortrait must exist at `~/environment/git/LivePortrait`, with `.venv/bin/python` and `pretrained_weights/` (setup: `uv venv --python 3.10 .venv`, then `uv pip install torch==2.3.0 torchvision==0.18.0 torchaudio==2.3.0 onnxruntime-silicon==1.16.3 -r requirements_base.txt "huggingface_hub[cli]<1"`, then `.venv/bin/huggingface-cli download KlingTeam/LivePortrait --local-dir pretrained_weights --exclude "*.git*" "README.md" "docs"`). `ffmpeg` must be on the PATH (`brew install ffmpeg`).
2. **List the candidates** in a table: name, photo size, license, photo or artwork, and the reason for each skip. Show it to the owner and wait for approval before rendering.
3. **Opt them in** by adding `animate: true` (just above `reviewed:`) to each approved profile's Ukrainian file.
4. **Render**: `npm run revitalize`. It skips clips that already exist; add `--force` to redo. It takes about a minute per person on Apple Silicon and prints the source pose for each one.
5. **Check every clip** before keeping it:
   - Pull frames at fps=2 and a crop of the face, and look at them: the face must be unchanged and recognizable. Ears, hair, glasses, beard, collar, and the background must not warp or smear.
   - The turn must go toward the camera (the printed yaw should shrink toward 0) and the nod must dip the chin, not lift it.
   - The first and last frames must match the original photo.
   - If a clip shows artifacts, delete it, remove `animate: true` from that profile, and report it. Don't tune the numbers per person without the owner.
6. **Check the site**: open `/uk/people/<slug>/` and `/en/people/<slug>/`. The photo must be static with the "Live" badge, and play once on hover or click. Run `npx astro check` and `npm test`. If `animate` comes through as `undefined` after any schema change, stop the dev server, delete `.astro/data-store.json`, and restart.
7. **Commit** the clips (`public/portraits/*.mp4`) and the `animate: true` changes in one commit, list who was animated and who was skipped (with reasons), and push only when the owner asks.

## Report back

- Who was animated.
- Who was skipped, and why (license, artwork, face quality, Defenders/violent death awaiting the owner, or artifacts).
- Any clip that looked borderline, with a frame grab.
