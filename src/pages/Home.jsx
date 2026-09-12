import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CAMPUS_SPOTS } from '../data/campusSpots'
import { useAuth } from '../context/AuthContext'
import CampusMap from '../components/CampusMap'

export default function Home() {
  const { profile } = useAuth()
  const [view, setView] = useState('map')

  return (
    <div className="page">
      <h1>Campus map</h1>

      <p className="subtitle">
        Hey {profile?.name ?? 'Hero'} — pick a location, walk there, then scan something real to spawn an AI quest.
      </p>

      <div className="map-toggle">
        <button
          type="button"
          className={view === 'map' ? 'active' : ''}
          onClick={() => setView('map')}
        >
          🗺️ Map
        </button>

        <button
          type="button"
          className={view === 'list' ? 'active' : ''}
          onClick={() => setView('list')}
        >
          📋 List
        </button>
      </div>

      {view === 'map' ? (
        <CampusMap spots={CAMPUS_SPOTS} />
      ) : (
        <ul className="spot-list">
          {CAMPUS_SPOTS.map((spot) => (
            <li key={spot.id}>
              <Link to={`/scan/${spot.id}`} className="spot-card">
                <span className="spot-emoji">{spot.emoji}</span>

                <div>
                  <h2>{spot.name}</h2>
                  <p>{spot.hint}</p>
                </div>

                <span className="spot-cta">Scan →</span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <section className="how-it-works">
        <h2>⚡ How to play</h2>

        <ol>
          <li>🗺️ Pick a spot on the map — walk there</li>
          <li>📷 Tap Scan — camera opens</li>
          <li>🤖 Gemini AI reads your photo and builds a unique quest</li>
          <li>✅ Complete the mission — earn XP and badges</li>
          <li>🏆 Climb the campus leaderboard</li>
        </ol>
      </section>
    </div>
  )
}