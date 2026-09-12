# Judge round — 7 questions (memorize short answers)

## 1. What problem did you solve?
Students don't explore campus. We gamify real spaces with AI missions tied to what they actually see.

## 2. Who is the user?
Sharda students — orientations, clubs, friend groups doing a 30-minute campus quest.

## 3. What did you build?
React PWA-style web app: map of zones → camera scan → Gemini mission → XP, badges, leaderboard.

## 4. Where is the AI?
**Live demo path:** Scan page → take photo → network call to Gemini with image bytes → JSON mission on screen. Change the object in frame → mission changes. Show the "AI-generated from your photo" label.

## 5. What did you personally build during the hackathon?
"I built the React app end-to-end: routing, anonymous Supabase auth, camera capture, Gemini vision integration, saving missions and XP, leaderboard, and UI. Teammates contributed campus spots, testing, slides, and prompt wording — not production code."

## 6. How does the prototype work?
Anonymous login → profile row → pick spot → `getUserMedia` → canvas JPEG → Gemini `generateContent` with image + prompt → insert mission → on complete, update XP/level and badges.

## 7. What would you build next?
GPS geofencing per spot, team raids, admin dashboard for events, Edge Function to hide API keys, optional photo proof verification.

---

## Demo script (3 minutes)

1. **15s** — Problem + one-line pitch (teammate)
2. **90s** — **Live on phone:** login → Library → scan a book/tree/person → read AI mission aloud → complete → show profile XP + leaderboard
3. **30s** — Architecture: Camera → Gemini → Supabase (you)
4. **15s** — Impact: orientation, wellness walks, any university
5. **10s** — Backup: short screen recording if Wi‑Fi fails

## Integrity (slide 16)
- **Original idea:** Campus Quest conceived at CodeMania (not TaskCampus marketplace).
- **Pre-existing:** None of this repo; separate old projects not submitted.
- **AI:** Declared in SUBMISSION.md; Gemini is essential to gameplay.

## Win tips
- Judges said: **working product > pretty slides**
- Show **one perfect scan** before showing leaderboard
- If Gemini errors: check API key starts with `AIza` from aistudio.google.com
