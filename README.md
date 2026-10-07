# Veilspire (M2 build)
Run from a folder with a local server (browsers block asset loading from file:// for audio):
    python3 -m http.server 8000     then open http://localhost:8000
One-file build for sharing/phones:  node tools/build.mjs  ->  dist/veilspire.html
Layout: data/assets.js | src/01..19 (load order is in index.html) | assets/{img,audio,fonts}
Scenes: src/12_scenes.js, touch: src/13_input.js.
M2 additions:
  src/14_light.js  light map, per-depth grade, bloom/grain/chroma/hit-flash/low-seal pulse, dressing
                   (bones, chalk circles, pages, cracks, candles, banners), dust and mist,
                   depth wipe card, camera look-ahead and push-in, heartbeat, footsteps, per-depth drone
  src/15_talk.js   dialogue scene ('talk'), code-drawn 64x64 portraits (PORT()), voices (blips or
                   browser speech), scripts (SCR), world barks. Options > Voices: off / blips / speech.
Sharp rendering: 16_main.js fitCanvas() renders at a whole multiple (SC, up to 4x) of the 512x320 game space. Options > Pixel fit: sharp (exact multiple) / fill (stretch to window).
Plain readout (P) disables grain, flashes, chroma split, push-in and light flicker.
Fonts: IM Fell English (OFL). Sounds: Kenney (CC0).
M2.5 combat feel: src/16_arts.js (slash arcs, impacts, clash, perilous counters, deathblows, Ash arts U and I).
M3 environment: src/18_env.js (tall walls with cached surface treatment, floor occlusion, puddles that reflect fire,
  brazier smoke, void backdrop with the Veilspire, void mask for the lighting pass, ambient sound, the overlook reveal).
  Source order is in index.html; main loop is src/19_main.js.
