import { Link } from 'react-router-dom'

export default function CampusMap({ spots }) {
  const lats = spots.map((s) => s.lat)
  const lngs = spots.map((s) => s.lng)
  const minLat = Math.min(...lats)
  const maxLat = Math.max(...lats)
  const minLng = Math.min(...lngs)
  const maxLng = Math.max(...lngs)

  const latRange = maxLat - minLat || 1
  const lngRange = maxLng - minLng || 1
  const PADDING = 12

  function toPosition(spot) {
    const xPct = ((spot.lng - minLng) / lngRange) * (100 - PADDING * 2) + PADDING
    const yPct = (1 - (spot.lat - minLat) / latRange) * (100 - PADDING * 2) + PADDING
    return { left: `${xPct}%`, top: `${yPct}%` }
  }

  return (
    <div className="campus-map">
      <div className="campus-map-grid" aria-hidden="true" />
      {spots.map((spot) => {
        const pos = toPosition(spot)
        return (
          <Link key={spot.id} to={`/scan/${spot.id}`} className="map-marker" style={pos}>
            <span className="map-marker-dot">{spot.emoji}</span>
            <span className="map-marker-label">{spot.name}</span>
          </Link>
        )
      })}
    </div>
  )
}