# Our Island: rules for AI assistants

## What this is
A cozy 3D island game (Three.js r128, loaded from a CDN) that runs in the browser. No build step: open index.html through a local server to play (`npx --yes serve`).

## Read first
- CODEMAP.md: index of every section in game.js. Search it for the topic, then jump to that section. Do NOT read game.js top to bottom (it is about 26,000 lines).
- After big edits, refresh it with `node tools/make-codemap.js`.

## Files and load order
launcher.js (start menu, loads the rest) then multiplayer.js, then game.js.
- index.html: page shell
- style.css / launcher.css: styles
- launcher.js: start menu, solo / online / direct modes, WebRTC (legacy)
- multiplayer.js: connection layer. localDB (solo save store), mpConnect, peerSync (partner character), mpBridge (live position + clock sync)
- game.js: the whole game, in sections marked with `// ----------` or `// =====` comments
- CODEMAP.md: auto-generated index

## Where things live (search by name)
- Save system: `window.X6` and `sv6()` near the top of game.js (extras save, key island_x36). World/inventory save goes through `db` (local copy in multiplayer.js, key island_v36).
- Player movement: `stepActor` in the "movement" section. Sprint (Shift) is in that call.
- Interactions: `exInt`, `exInt2` ... `exInt37`, tried in order from the "interactions" section. exInt6 is wrapped again near the end of the game.
- Partner features (mail, hearts, question cards, `partner`, `other()`) are still spread through game.js on purpose. Leave them.
- Debug / cheat commands: near the end of game.js (search `"tp:"`).

## Rules
- Three.js is r128. Do NOT use newer APIs (e.g. CapsuleGeometry).
- Do NOT rewrite working code. Make the smallest change that does the job.
- One change per request. Give a short plan first, then edit.
- Do not reformat or rename things you were not asked to touch.
- Never touch launcher.js or multiplayer.js unless asked.
- No new libraries or build tools.
- Scripts are plain (not modules). Top-level names in one file are visible in the others, so do not declare a name twice.
- After changes, list exactly which functions and lines you edited, and tell me what to test.

## Workflow
Commit before every AI session. Test in the browser after each change (hard refresh: Ctrl+Shift+R).
