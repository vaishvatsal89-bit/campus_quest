import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import { useAuth } from './context/AuthContext'
import Home from './pages/Home'
import Leaderboard from './pages/Leaderboard'
import Profile from './pages/Profile'
import Scan from './pages/Scan'
import Welcome from './pages/Welcome'

function Protected({ children }) {
  const { loading, profile, session } = useAuth()

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner" />
        <p>Loading Campus Quest…</p>
      </div>
    )
  }

  if (!session || !profile) {
    return <Navigate to="/welcome" replace />
  }

  return children
}

export default function App() {
  return (
    <Routes>
      <Route path="/welcome" element={<Welcome />} />
      <Route
        element={
          <Protected>
            <Layout />
          </Protected>
        }
      >
        <Route index element={<Home />} />
        <Route path="scan/:spotId" element={<Scan />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
