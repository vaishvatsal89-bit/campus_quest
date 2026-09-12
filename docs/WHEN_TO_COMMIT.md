# When to commit (judges & submission)

**Nothing is committed yet** — that is intentional. Local work is invisible until you **push to GitHub**.

## What judges can and cannot see

| They see (if you submit a repo link) | They never see |
|--------------------------------------|----------------|
| Public GitHub repo after you push | Your `.env` (must stay untracked) |
| Commit messages & timestamps | Unpushed local commits |
| README + source code | Supabase/Gemini secrets |

Judges care about **working demo + honest AI declaration**, not whether you used Cursor. They may check that the repo matches what you built during the hackathon.

## Recommended commit schedule (CodeMania 24h)

### Now → Hour ~21 — **no push to public GitHub**

- OK: keep coding with **zero commits**, or only **local** commits (not pushed).
- Use **private** repo if you want GitHub backup before submit — judges still cannot see it until public + you share the link.

### Hour ~21 — **first commit (local or private remote)**

When **one full scan works** on your phone (login → scan → AI mission → XP):

```powershell
git add .
git status
```

Confirm **`.env` does NOT appear**. Only then:

```powershell
git commit -m "Campus Quest MVP: camera scan, Gemini missions, Supabase XP"
```

Suggested **single commit** for judging simplicity (shows one cohesive hackathon push):

- Avoid dozens of commits like "fix", "ai generated", "cursor" — looks messy, not dishonest.
- Good message examples:
  - `Campus Quest MVP: AI scavenger hunt for CodeMania`
  - `Add Gemini vision missions and Supabase leaderboard`

### Hour ~22 — **push + deploy**

1. Create GitHub repo (public if submission requires it).
2. Push:

   ```powershell
   git remote add origin https://github.com/YOUR_USER/campus-quest.git
   git push -u origin main
   ```

3. Deploy Vercel; add env vars in Vercel dashboard (not in git).

### Hour ~23–24 — **submit**

Paste: repo URL + live demo URL + text from `SUBMISSION.md`.

Optional second commit **only if** you fix bugs after push:

```powershell
git commit -m "Fix camera permissions copy and mission save edge case"
git push
```

## What must NEVER be committed

- `.env` / API keys
- Supabase service role key
- Personal passwords

`.gitignore` already lists `.env` — always run `git status` before commit.

## If judges ask about Git history

Say truthfully:

- "We focused on a working demo first; the repo reflects the hackathon build."
- "We used Cursor as a dev assistant; architecture and integration choices were ours."
- "Secrets are in env vars, not in the repository."

## Current automated check

```powershell
npm run check
```

Fix all ❌ before your first commit.
