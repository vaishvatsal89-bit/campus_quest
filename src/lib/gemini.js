const MISSION_SCHEMA = `Return ONLY valid JSON with this shape:
{
  "title": "short epic title (max 6 words)",
  "mission": "what the player should do on campus (2-3 sentences, fun RPG tone)",
  "enemy": "a silly fictional enemy tied to what you see",
  "reward": "imaginary loot name",
  "xp": number between 40 and 80,
  "flavor": "one witty line the game narrator says"
}`

function buildPrompt(spotName) {
  return `You are the game master for "Campus Quest", a scavenger hunt at Sharda University.
The player is at location: "${spotName}".
Look at the photo from their phone camera. Identify real objects, buildings, people, or scenes.
Turn what you SEE into a playful mission students can complete in the next 5-10 minutes on campus.
Keep it safe, inclusive, and doable (no dangerous or inappropriate tasks).
${MISSION_SCHEMA}`
}

function parseMissionJson(text) {
  const cleaned = text.replace(/```json\n?|\n?```/g, '').trim()
  const data = JSON.parse(cleaned)
  const xp = Number(data.xp)
  return {
    title: String(data.title ?? 'Mystery Quest'),
    mission: String(data.mission ?? 'Explore this area and discover something new.'),
    enemy: String(data.enemy ?? 'The Boredom Slime'),
    reward: String(data.reward ?? 'Campus Coin'),
    xp: Number.isFinite(xp) ? Math.min(80, Math.max(40, xp)) : 50,
    flavor: String(data.flavor ?? 'The campus whispers secrets only questers hear.'),
  }
}

export async function generateMissionFromImage(base64Image, spotName) {
  const key = import.meta.env.VITE_GEMINI_KEY
  if (!key) {
  throw new Error('Missing VITE_GEMINI_KEY in .env')
}

  const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '')

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${encodeURIComponent(key)}`

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            { text: buildPrompt(spotName) },
            {
              inline_data: {
                mime_type: 'image/jpeg',
                data: base64Data,
              },
            },
          ],
        },
      ],
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.85,
      },
    }),
  })

  if (!res.ok) {
    const errBody = await res.text()
    throw new Error(`Gemini API error (${res.status}): ${errBody.slice(0, 200)}`)
  }

  const json = await res.json()
  const text =
    json?.candidates?.[0]?.content?.parts?.[0]?.text ??
    json?.candidates?.[0]?.content?.parts?.map((p) => p.text).join('')

  if (!text) {
    throw new Error('Gemini returned no mission text')
  }

  return parseMissionJson(text)
}
