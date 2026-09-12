import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Layout() {
  const { profile } = useAuth()

  return (
    <div className="app-shell">
      <header className="top-bar">
        <div>
          <p className="brand">Campus Quest</p>
          <p className="tagline">Scan · AI · Quest</p>
        </div>
        {profile && (
          <div className="top-stats">
            <span>Lv {profile.level ?? 1}</span>
            <span>{profile.xp ?? 0} XP</span>
          </div>
        )}
      </header>

      <main className="main-content">
        <Outlet />
      </main>

      <nav className="bottom-nav" aria-label="Main">
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
          🗺️ Map
        </NavLink>
        <NavLink to="/leaderboard" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
          🏆 Rank
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
          👤 Hero
        </NavLink>
      </nav>
    </div>
  )
}
