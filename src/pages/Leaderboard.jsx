import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

const MEDALS = ['🥇', '🥈', '🥉']

export default function Leaderboard() {
  const { user } = useAuth()
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('leaderboard')
      .select('*')
      .then(({ data, error }) => {
        if (!error && data) {
          // Dedupe by display name, keeping the highest-XP entry per name
          const byName = new Map()
          for (const row of data) {
            const key = (row.name ?? '').trim().toLowerCase()
            const existing = byName.get(key)
            if (!existing || (row.xp ?? 0) > (existing.xp ?? 0)) {
              byName.set(key, row)
            }
          }
          const deduped = Array.from(byName.values()).sort((a, b) => (b.xp ?? 0) - (a.xp ?? 0))
          setRows(deduped)
        }
        setLoading(false)
      })
  }, [])

  return (
    <div className="page">
      <h1>Leaderboard</h1>
      <p className="subtitle">Top campus heroes by XP</p>

      {loading ? (
        <p>Loading…</p>
      ) : rows.length === 0 ? (
        <p>No scores yet — complete a mission to appear here.</p>
      ) : (
        <ol className="leaderboard">
          {rows.map((row, i) => (
            <li
              key={row.id}
              className={
                row.id === user?.id
                  ? `leaderboard-row you ${i < 3 ? 'top-rank' : ''}`
                  : `leaderboard-row ${i < 3 ? 'top-rank' : ''}`
              }
            >
              <span className="rank">{i < 3 ? MEDALS[i] : `#${i + 1}`}</span>
              <span className="name">{row.name}</span>
              <span className="meta">
                Lv {row.level} · {row.xp} XP
              </span>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}