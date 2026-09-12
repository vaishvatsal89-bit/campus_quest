import { Link } from 'react-router-dom'

const ZOOM = 17
const SIZE_W = 640
const SIZE_H = 480

function lonToPixelX(lon, zoom) {
  return ((lon + 180) / 360) * 256 * Math.pow(2, zoom)
}

function latToPixelY(lat, zoom) {
  const rad = (lat * Math.PI) / 180
  return ((1 - Math.log(Math.tan(rad) + 1 / Math.cos(rad)) / Math.PI) / 2) * 256 * Math.pow(2, zoom)
}

export default function CampusMap({ spots }) {
  const centerLat = spots.reduce((sum, s) => sum + s.lat, 0) / spots.length
  const centerLng = spots.reduce((sum, s) => sum + s.lng, 0) / spots.length

  const centerPx = { x: lonToPixelX(centerLng, ZOOM), y: latToPixelY(centerLat, ZOOM) }

  const points = spots.map((spot) => {
    const px = lonToPixelX(spot.lng, ZOOM)
    const py = latToPixelY(spot.lat, ZOOM)
    const xPct = 50 + ((px - centerPx.x) / SIZE_W) * 100
    const yPct = 50 + ((py - centerPx.y) / SIZE_H) * 100
    return { ...spot, x: xPct, y: yPct }
  })

  const mapUrl = `https://staticmap.openstreetmap.de/staticmap.php?center=${centerLat},${centerLng}&zoom=${ZOOM}&size=${SIZE_W}x${SIZE_H}&maptype=mapnik`

  return (
    <div className="campus-map">
      <img src={mapUrl} alt="Campus map" className="campus-map-tiles" />
      <div className="campus-map-tint" aria-hidden="true" />

      <svg className="campus-map-paths" viewBox="0 0 100 100" preserveAspectRatio="none">
        {points.slice(1).map((p, i) => {
          const prev = points[i]
          return <line key={p.id} x1={prev.x} y1={prev.y} x2={p.x} y2={p.y} className="quest-path" />
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