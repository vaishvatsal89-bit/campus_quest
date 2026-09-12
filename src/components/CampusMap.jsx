import { Link } from 'react-router-dom'

const ZOOM = 18
const SIZE_W = 500
const SIZE_H = 375

function lonToPixelX(lon, zoom) {
  return ((lon + 180) / 360) * 256 * Math.pow(2, zoom)
}

function latToPixelY(lat, zoom) {
  const rad = (lat * Math.PI) / 180
  return ((1 - Math.log(Math.tan(rad) + 1 / Math.cos(rad)) / Math.PI) / 2) * 256 * Math.pow(2, zoom)
}

const SPREAD = 160

export default function CampusMap({ spots }) {
  const centerLat = spots.reduce((s, p) => s + p.lat, 0) / spots.length
  const centerLng = spots.reduce((s, p) => s + p.lng, 0) / spots.length

  const cx = lonToPixelX(centerLng, ZOOM)
  const cy = latToPixelY(centerLat, ZOOM)

  const points = spots.map((spot) => {
    const px = lonToPixelX(spot.lng, ZOOM)
    const py = latToPixelY(spot.lat, ZOOM)
    const rawX = 50 + ((px - cx) / SIZE_W) * 100
    const rawY = 50 + ((py - cy) / SIZE_H) * 100
    return { ...spot, x: rawX, y: rawY }
  })

  // Spread overlapping markers so they don't pile up
  const spread = points.map((p, i) => {
    const others = points.slice(0, i)
    let x = p.x
    let y = p.y
    others.forEach((o) => {
      const dx = x - o.x
      const dy = y - o.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 12) {
        const angle = Math.atan2(dy || 1, dx || 1)
        const push = (12 - dist) / 2 + 2
        x += Math.cos(angle) * push
        y += Math.sin(angle) * push
      }
    })
    // Keep within bounds
    x = Math.max(8, Math.min(88, x))
    y = Math.max(10, Math.min(82, y))
    return { ...p, x, y }
  })

  const mapUrl = `https://staticmap.openstreetmap.de/staticmap.php?center=${centerLat},${centerLng}&zoom=${ZOOM}&size=${SIZE_W}x${SIZE_H}&maptype=mapnik`

  return (
    <div className="campus-map">
      <img src={mapUrl} alt="Campus map" className="campus-map-tiles" />
      <div className="campus-map-tint" aria-hidden="true" />

      {/* Animated glow orbs */}
      <div className="campus-map-glow campus-map-glow-1" />
      <div className="campus-map-glow campus-map-glow-2" />

      {/* Dashed quest paths */}
      <svg className="campus-map-paths" viewBox="0 0 100 100" preserveAspectRatio="none">
        {spread.slice(1).map((p, i) => {
          const prev = spread[i]
          return (
            <line
              key={p.id}
              x1={prev.x} y1={prev.y}
              x2={p.x}    y2={p.y}
              className="quest-path"
            />
          )
        })}
      </svg>

      {/* Markers */}
      {spread.map((spot, i) => (
        <Link
          key={spot.id}
          to={`/scan/${spot.id}`}
          className="map-marker"
          style={{
            left: `${spot.x}%`,
            top:  `${spot.y}%`,
            animationDelay: `${i * 0.12}s`,
            zIndex: 10 + i,
          }}
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