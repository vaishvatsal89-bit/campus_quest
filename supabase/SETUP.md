# Supabase setup (one-time)

Run `npm run check` after each step — both checks must pass before demo/commit.

## 1. Enable Anonymous sign-in (required)

1. Open [Supabase Dashboard](https://supabase.com/dashboard) → project **campus-quest**
2. **Authentication** → **Providers** → **Anonymous sign-ins** → **Enable**
3. Save

Without this, "Start adventure" will fail.

## 2. SQL

You already ran the main schema. If leaderboard is empty but profiles exist, re-run:

```sql
GRANT SELECT ON public.leaderboard TO anon, authenticated;
```

## 3. API keys

**Settings → API** → copy Project URL and `anon` public key into `.env`.
