import fs from 'fs'
import path from 'path'

const envPath = path.join(process.cwd(), '.env')
if (!fs.existsSync(envPath)) {
  console.error('❌ Missing .env next to package.json')
  process.exit(1)
}

const env = Object.fromEntries(
  fs
    .readFileSync(envPath, 'utf8')
    .split(/\r?\n/)
    .filter((l) => l && !l.startsWith('#'))
    .map((l) => {
      const i = l.indexOf('=')
      return [l.slice(0, i), l.slice(i + 1)]
    }),
)

const missing = ['VITE_SUPABASE_URL', 'VITE_SUPABASE_ANON_KEY', 'VITE_GEMINI_KEY'].filter((k) => !env[k])
if (missing.length) {
  console.error('❌ Missing in .env:', missing.join(', '))
  process.exit(1)
}

const geminiOk = env.VITE_GEMINI_KEY.startsWith('AIza')
console.log(geminiOk ? '✅ Gemini key format (AIza…)' : '❌ Gemini key should start with AIza — get one at https://aistudio.google.com/apikey')

const authRes = await fetch(`${env.VITE_SUPABASE_URL}/auth/v1/signup`, {
  method: 'POST',
  headers: {
    apikey: env.VITE_SUPABASE_ANON_KEY,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({}),
})

const authBody = await authRes.text()
if (authBody.includes('anonymous_provider_disabled')) {
  console.log('❌ Supabase: Anonymous sign-in is OFF → Dashboard → Auth → Providers → Anonymous → Enable')
} else if (authRes.ok || authBody.includes('access_token')) {
  console.log('✅ Supabase: Anonymous sign-in works')
} else {
  console.log('⚠️ Supabase auth check:', authRes.status, authBody.slice(0, 120))
}

if (!geminiOk) process.exit(1)

const gRes = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${encodeURIComponent(env.VITE_GEMINI_KEY)}`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ text: 'Reply with exactly: OK' }] }] }),
  },
)
const gText = await gRes.text()
console.log(gRes.ok ? '✅ Gemini API reachable' : `❌ Gemini API: ${gRes.status} ${gText.slice(0, 120)}`)
process.exit(gRes.ok && !authBody.includes('anonymous_provider_disabled') ? 0 : 1)
