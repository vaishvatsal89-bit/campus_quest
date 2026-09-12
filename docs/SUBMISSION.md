# CodeMania submission copy-paste

## Project title
Campus Quest

## One-line pitch
AI-powered real-world scavenger hunt: your camera captures campus reality; Gemini turns it into missions, XP, and badges.

## Problem statement
Students often move through campus on autopilot — same routes, little exploration, weak connection to physical spaces. Orientation and club events need engaging, low-setup activities.

## Solution description
Mobile-friendly web game. Player picks a campus zone, opens the camera, scans something real. **Google Gemini 2.0 Flash (vision)** analyzes the photo and generates a unique RPG-style mission. Completing missions awards XP, levels, badges, and a live leaderboard (Supabase).

## AI technologies used
- **Gemini 2.0 Flash** — multimodal vision + JSON mission generation from user photos
- Optional: Cursor AI — development assistant (all code reviewed by team)

## AI use declaration
- **Gameplay-critical AI:** Mission text, enemy, reward, and XP flavor are **not** pre-written; they are generated per photo. Removing AI breaks the product.
- **Human work:** React UI, camera capture, Supabase auth/data, game loop, campus spot list, prompts structure, testing, presentation.
- **Demo note:** API key is in frontend for hackathon speed; production would use a Supabase Edge Function.

## Technology stack
React 19, Vite, React Router, Supabase (Auth + Postgres + RLS), Gemini API, Browser MediaDevices camera API

## Team member contributions
(Fill names — be specific and honest)

| Member | Role during hackathon |
|--------|------------------------|
| [You] | Full-stack: app architecture, React UI, camera flow, Gemini integration, Supabase schema/RLS, deployment |
| [Teammate 1] | Campus locations list, user testing, demo script, slides |
| [Teammate 2] | Prompt tone / mission wording doc, badges naming, submission form |

## Repository
(GitHub URL after you push)

## Working demo
(Local: `npm run dev` — or Vercel URL after deploy)
