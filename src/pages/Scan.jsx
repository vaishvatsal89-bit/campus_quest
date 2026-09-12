import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import CameraCapture from '../components/CameraCapture'
import MissionCard from '../components/MissionCard'
import { getSpotById } from '../data/campusSpots'
import { useAuth } from '../context/AuthContext'
import { generateMissionFromImage } from '../lib/gemini'
import { levelFromXp, newBadgesToAward } from '../lib/game'
import { supabase } from '../lib/supabase'

export default function Scan() {
  const { spotId } = useParams()
  const spot = getSpotById(spotId)
  const { user, profile, refreshProfile, updateProfileLocal } = useAuth()
  const navigate = useNavigate()

  const [phase, setPhase] = useState('camera')
  const [mission, setMission] = useState(null)
  const [missionId, setMissionId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [completing, setCompleting] = useState(false)
  const [error, setError] = useState('')

  const handleCapture = async (dataUrl) => {
    setError('')
    setLoading(true)
    setPhase('generating')
    try {
      const generated = await generateMissionFromImage(dataUrl, spot.name)

      const { data: row, error: insertErr } = await supabase
        .from('missions')
        .insert({
          user_id: user.id,
          ai_mission: JSON.stringify(generated),
          status: 'active',
          xp_reward: generated.xp,
        })
        .select('id')
        .single()

      if (insertErr) throw insertErr

      setMission(generated)
      setMissionId(row.id)
      setPhase('mission')
    } catch (e) {
      setError(e.message ?? 'Failed to generate mission')
      setPhase('camera')
    } finally {
      setLoading(false)
    }
  }

  const completeMission = async () => {
    if (!missionId || !mission) return
    setCompleting(true)
    setError('')
    try {
      const { error: missionErr } = await supabase
        .from('missions')
        .update({ status: 'completed' })
        .eq('id', missionId)
      if (missionErr) throw missionErr

      const newXp = (profile?.xp ?? 0) + mission.xp
      const newLevel = levelFromXp(newXp)

      const { error: profileErr } = await supabase
        .from('profiles')
        .update({ xp: newXp, level: newLevel })
        .eq('id', user.id)
      if (profileErr) throw profileErr

      updateProfileLocal({ xp: newXp, level: newLevel })

      const { count } = await supabase
        .from('missions')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .eq('status', 'completed')

      const { data: existingBadges } = await supabase.from('badges').select('badge_name').eq('user_id', user.id)

      const toAward = newBadgesToAward(
        count ?? 0,
        (existingBadges ?? []).map((b) => b.badge_name),
      )

      if (toAward.length) {
        await supabase.from('badges').insert(
          toAward.map((b) => ({
            user_id: user.id,
            badge_name: b.name,
          })),
        )
      }

      await refreshProfile(user.id)
      navigate('/profile', { state: { justCompleted: true, xp: mission.xp } })
    } catch (e) {
      setError(e.message ?? 'Could not save progress')
    } finally {
      setCompleting(false)
    }
  }

  return (
    <div className="page scan-page">
      <Link to="/" className="back-link">
        ← Back to map
      </Link>
      <h1>
        {spot.emoji} {spot.name}
      </h1>
      <p className="subtitle">Point your camera at something real here. AI builds your quest from the photo.</p>

      {error && <p className="error-text">{error}</p>}

      {phase === 'camera' && <CameraCapture onCapture={handleCapture} disabled={loading} />}

      {phase === 'generating' && (
        <div className="loading-box">
          <div className="spinner" />
          <p>Gemini is reading your world…</p>
        </div>
      )}

      {phase === 'mission' && mission && (
        <MissionCard mission={mission} onComplete={completeMission} completing={completing} />
      )}
    </div>
  )
}
