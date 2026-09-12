import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

export default function Leaderboard() {
  const { user } = useAuth()
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('leaderboard')
      .select('*')
      .then(({ data, error }) => {
        if (!error && data) setRows(data)
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
            <li key={row.id} className={row.id === user?.id ? 'leaderboard-row you' : 'leaderboard-row'}>
              <span className="rank">#{i + 1}</span>
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
