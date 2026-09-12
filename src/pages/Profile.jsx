import { useEffect, useState } from 'react'
import ConfettiBurst from '../components/ConfettiBurst'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { xpProgressInLevel } from '../lib/game'
import { supabase } from '../lib/supabase'

export default function Profile() {
  const { profile, user } = useAuth()
  const location = useLocation()
  const [badges, setBadges] = useState([])
  const [missions, setMissions] = useState([])

  useEffect(() => {
    if (!user) return
    supabase
      .from('badges')
      .select('badge_name, earned_at')
      .eq('user_id', user.id)
      .order('earned_at', { ascending: false })
      .then(({ data }) => setBadges(data ?? []))

    supabase
      .from('missions')
      .select('id, status, xp_reward, created_at, ai_mission')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(8)
      .then(({ data }) => setMissions(data ?? []))
  }, [user])

  const progress = xpProgressInLevel(profile?.xp ?? 0)
  const justCompleted = location.state?.justCompleted

  return (
    <div className="page">
      <h1>{profile?.name ?? 'Hero'}</h1>
           {justCompleted && (
  <>
    <ConfettiBurst />
    <p className="success-banner">+{location.state.xp} XP — quest logged!</p>
  </>
)}

      <div className="profile-stats">
        <div>
          <p className="stat-label">Level</p>
          <p className="stat-value">{profile?.level ?? 1}</p>
        </div>
        <div>
          <p className="stat-label">Total XP</p>
          <p className="stat-value">{profile?.xp ?? 0}</p>
        </div>
      </div>

      <div className="xp-bar-wrap">
        <div className="xp-bar" style={{ width: `${progress.percent}%` }} />
      </div>
      <p className="fine-print">
        {progress.current} / {progress.max} XP to next level
      </p>

      <section>
        <h2>Badges</h2>
        {badges.length === 0 ? (
          <p className="subtitle">Complete missions to earn badges.</p>
        ) : (
          <ul className="badge-list">
            {badges.map((b) => (
              <li key={b.badge_name + b.earned_at}>🏅 {b.badge_name}</li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2>Recent quests</h2>
        <ul className="history-list">
          {missions.map((m) => {
            let title = 'Quest'
            try {
              title = JSON.parse(m.ai_mission).title ?? title
            } catch {
              /* ignore */
            }
            return (
              <li key={m.id}>
                <span>{title}</span>
                <span className="meta">
                  {m.status} · +{m.xp_reward} XP
                </span>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}
