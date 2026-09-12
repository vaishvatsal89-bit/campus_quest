import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Welcome() {
  const [name, setName] = useState('')
  const [busy, setBusy] = useState(false)
  const [localError, setLocalError] = useState('')
  const { signInWithName, loading, profile } = useAuth()
  const navigate = useNavigate()

  if (!loading && profile) {
    return <Navigate to="/" replace />
  }

  const start = async (e) => {
    e.preventDefault()
    setLocalError('')
    setBusy(true)
    try {
      await signInWithName(name)
      navigate('/', { replace: true })
    } catch (err) {
      setLocalError(err.message ?? 'Could not start quest. Enable Anonymous auth in Supabase.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="welcome-screen">
      <div className="welcome-card">
        <p className="pill pill-ai">Kickr CodeMania 2026</p>
        <h1>Campus Quest</h1>
        <p className="lead">
          An AI-powered scavenger hunt. Walk to a campus spot, scan the real world with your camera, and Gemini
          turns what it sees into your next mission.
        </p>
        <form onSubmit={start}>
          <label htmlFor="hero-name">Hero name</label>
          <input
            id="hero-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Aria the Explorer"
            maxLength={32}
            autoComplete="nickname"
          />
          {localError && <p className="error-text">{localError}</p>}
          <button type="submit" className="btn btn-primary btn-block" disabled={busy}>
            {busy ? 'Entering campus…' : 'Start adventure'}
          </button>
        </form>
        <p className="fine-print">Camera + internet required. Missions are AI-generated from your photos.</p>
      </div>
    </div>
  )
}
