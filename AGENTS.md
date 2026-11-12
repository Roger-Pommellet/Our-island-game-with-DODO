# Our Island: rules for AI assistants

## What this is
A cozy 3D island game (Three.js r128, loaded from a CDN) that runs in the browser. No build step yet: open index.html to play.

## File layout
- index.html: page shell, loads everything below
- style.css: game UI styles
- game.js: the whole game (about 26,800 formatted lines)
- launcher.js / launcher.css: start menu and multiplayer layer (legacy, being removed)

## Rules
- Three.js is r128. Do NOT use newer APIs (e.g. CapsuleGeometry).
- Do NOT rewrite working code. Make the smallest change that does the job.
- One change per request. Explain the plan first, then edit.
- Do not reformat or rename things you were not asked to touch.
- game.js runs in strict mode and depends on globals set by launcher.js (db, __MP). Do not remove them until multiplayer is removed on purpose.

## Known issues
- exInt4 is defined twice; the later definition wins. Merge carefully.
- Interactions go through a patch chain (exInt, exInt2 ... exInt37). Plan: replace with one lookup table.
- Multiplayer code (partner, other(), onSnapshot, peerSync) is spread through game.js.

## Workflow
Commit before every AI session. Test in the browser after each change.
