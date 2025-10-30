
Gabe Fitness by Capstone — v2
“YHWH es mi fortaleza y mi escudo” — Salmo 28:7
================================================================

What’s inside
-------------
- index.html   — App UI (header with gold icon, workout overlay, timer, hydration, music)
- styles.css   — Dark-by-default + light/dark toggle, Capstone palette
- script.js    — 12-week plan with muscle groups, reps/time, form cues; hydration; chime; confetti
- manifest.json — Enables “Add to Home Screen” (PWA)
- service-worker.js — Caches files so it opens offline
- icons/       — 192 & 512 PNGs (gold icon)
- favicon.ico  — Gold icon for browser tabs

Open locally
------------
1) Double-click index.html or open in VS Code → Live Server.
2) First load caches files for offline use.
3) Theme toggle (🌙/☀️) in header saves preference.

Publish with GitHub Pages
-------------------------
1) Push this folder to your GitHub repo.
2) On GitHub: Settings → Pages → Source: Deploy from a branch → Branch: main → Folder: /(root) → Save.
3) Your site will be live at: https://<username>.github.io/<repo>/

View on your phone
------------------
- Option A (public): open the GitHub Pages URL above.
- Option B (local network): VS Code Live Server → replace 127.0.0.1 with your computer’s LAN IP on your phone.

Install to Home Screen
----------------------
- iPhone Safari: Share → Add to Home Screen.
- Android Chrome: “Install App” prompt or menu → Add to Home Screen.

Tips
----
- Update workouts in script.js inside the `workouts` object.
- Change the playlist by replacing the iframe src in index.html.
- Start date for the 12-week cycle is set to Monday, Nov 3, 2025 (change in script.js if needed).

Version Info
------------
Build: Gabe Fitness v2
Date: October 2025
Features: Gold glowing icon, blue splash with Spanish verse + “Cargando…” (3s fade), dark-by-default theme with toggle, fresh reset, offline-ready PWA, 12-week program, hydration tracker, confetti, and chime.
