import { useEffect, useRef } from 'react'

export default function ConfettiBurst() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const colors = ['#6ee7b7', '#fbbf24', '#a7f3d0', '#f87171', '#60a5fa']
    const particles = Array.from({ length: 90 }, () => ({
      x: canvas.width / 2,
      y: canvas.height / 3,
      vx: (Math.random() - 0.5) * 14,
      vy: Math.random() * -14 - 4,
      size: Math.random() * 6 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 15,
      life: 1,
    }))

    let frame
    function tick() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      let alive = false
      particles.forEach((p) => {
        p.vy += 0.35
        p.x += p.vx
        p.y += p.vy
        p.rotation += p.rotSpeed
        p.life -= 0.012
        if (p.life > 0) {
          alive = true
          ctx.save()
          ctx.translate(p.x, p.y)
          ctx.rotate((p.rotation * Math.PI) / 180)
          ctx.globalAlpha = Math.max(p.life, 0)
          ctx.fillStyle = p.color
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size)
          ctx.restore()
        }
      })
      if (alive) frame = requestAnimationFrame(tick)
    }
    tick()

    return () => cancelAnimationFrame(frame)
  }, [])

  return <canvas ref={canvasRef} className="confetti-canvas" />
}