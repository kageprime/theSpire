# Veilspire (M1 build)
Run from a folder with a local server (browsers block asset loading from file:// for audio):
    python3 -m http.server 8000     then open http://localhost:8000
One-file build for sharing/phones:  node tools/build.mjs  ->  dist/veilspire.html
Layout: data/assets.js (asset paths) | src/01..14 (load order is in index.html) | assets/{img,audio,fonts}
Scenes live in src/12_scenes.js, touch in src/13_input.js. Fonts: IM Fell English (OFL). Sounds: Kenney (CC0).
Note: files are plain scripts sharing globals (not ES modules yet); converting is a later refactor.
