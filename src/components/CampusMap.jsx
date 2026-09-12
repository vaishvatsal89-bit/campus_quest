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
  const PADDING = 14

  function toPosition(spot) {
    const xPct = ((spot.lng - minLng) / lngRange) * (100 - PADDING * 2) + PADDING
    const yPct = (1 - (spot.lat - minLat) / latRange) * (100 - PADDING * 2) + PADDING
    return { x: xPct, y: yPct }
  }

  const points = spots.map((spot) => ({ ...spot, ...toPosition(spot) }))

  return (
    <div className="campus-map">
      <div className="campus-map-glow campus-map-glow-1" />
      <div className="campus-map-glow campus-map-glow-2" />
      <div className="campus-map-stars" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={i} className="star" style={{ left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%`, animationDelay: `${(i % 6) * 0.4}s` }} />
        ))}
      </div>

      <svg className="campus-map-paths" viewBox="0 0 100 100" preserveAspectRatio="none">
        {points.slice(1).map((p, i) => {
          const prev = points[i]
          return (
            <line
              key={p.id}
              x1={prev.x}
              y1={prev.y}
              x2={p.x}
              y2={p.y}
              className="quest-path"
            />
          )
        })}
      </svg>

      {points.map((spot, i) => (
        <Link
          key={spot.id}
          to={`/scan/${spot.id}`}
          className="map-marker"
          style={{ left: `${spot.x}%`, top: `${spot.y}%`, animationDelay: `${i * 0.15}s` }}
        >
          <span className="map-marker-ring" />
          <span className="map-marker-dot">{spot.emoji}</span>
          <span className="map-marker-callout">
            {spot.name}
            <span className="map-marker-arrow" />
          </span>
        </Link>
      ))}
    </div>
  )
}