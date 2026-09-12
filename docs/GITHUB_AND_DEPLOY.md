# GitHub + Vercel deploy (step-by-step)

## A. Create GitHub repo (15 min)

1. Open terminal in project folder:

   ```powershell
   cd C:\Users\dell\Desktop\campus-quest\campus-quest
   git init
   git add .
   git status
   ```

   Confirm **`.env` is NOT listed** (only `.env.example`).

2. First commit:

   ```powershell
   git commit -m "Campus Quest: AI scavenger hunt MVP for CodeMania"
   ```

3. Create repo on GitHub (website): **New repository** → name `campus-quest` → Public → **Do not** add README (you have one).

4. Push:

   ```powershell
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/campus-quest.git
   git push -u origin main
   ```

## B. Deploy on Vercel (10 min)

1. [vercel.com](https://vercel.com) → Import GitHub repo `campus-quest`
2. Framework: **Vite**
3. **Environment variables** (same as `.env`):

   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_GEMINI_KEY`

4. Deploy → copy **Production URL** for submission.

5. **Camera on phone:** Vercel gives HTTPS — camera works better than HTTP on LAN.

## C. Supabase auth redirect (if needed)

If auth breaks on Vercel URL: Supabase → **Authentication** → **URL Configuration** → add your Vercel URL to **Site URL** / redirect allow list.

Anonymous sign-in does not need OAuth redirects for this demo.
