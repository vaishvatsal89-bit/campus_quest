# Campus Quest

AI-powered campus scavenger hunt for **Kickr CodeMania 2026**.

## Quick start (you)

0. **Preflight:** `npm run check` — fix every ❌ before demo or git commit.

1. **Supabase:** Enable **Anonymous sign-in** — see [supabase/SETUP.md](./supabase/SETUP.md)
2. **`.env`** in this folder (same level as `package.json`):

   ```env
   VITE_SUPABASE_URL=...
   VITE_SUPABASE_ANON_KEY=...
   VITE_GEMINI_KEY=...
   ```

   Get Gemini key: [Google AI Studio](https://aistudio.google.com/apikey) — key usually starts with `AIza`.

3. **Run:**

   ```powershell
   cd C:\Users\dell\Desktop\campus-quest\campus-quest
   npm install
   npm run dev
   ```

4. Open the URL shown. On phone (same Wi‑Fi): `http://YOUR_LAPTOP_IP:5173`

5. **Demo flow:** Welcome → pick a campus spot → **Scan reality** → read AI mission → complete → Profile / Leaderboard

## Project structure

- `src/lib/gemini.js` — vision → mission JSON
- `src/components/CameraCapture.jsx` — browser camera
- `src/data/campusSpots.js` — edit location names (non-coders can edit this file)
- `docs/SUBMISSION.md` — hackathon form text
- `docs/JUDGE_PREP.md` — demo script & Q&A

## GitHub & deploy

See [docs/GITHUB_AND_DEPLOY.md](./docs/GITHUB_AND_DEPLOY.md)

**When to commit (not before demo works):** [docs/WHEN_TO_COMMIT.md](./docs/WHEN_TO_COMMIT.md)

## Hackathon timeline

See [docs/TIMELINE_24H.md](./docs/TIMELINE_24H.md)
