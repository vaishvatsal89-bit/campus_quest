import { useCallback, useEffect, useRef, useState } from 'react'

export default function CameraCapture({ onCapture, disabled }) {
  const videoRef = useRef(null)
  const streamRef = useRef(null)
  const [ready, setReady] = useState(false)
  const [cameraError, setCameraError] = useState(null)

  const stopStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop())
    streamRef.current = null
  }, [])

  useEffect(() => {
    let cancelled = false

    async function start() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 } },
          audio: false,
        })
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop())
          return
        }
        streamRef.current = stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          await videoRef.current.play()
        }
        setReady(true)
      } catch (e) {
        setCameraError(
          e.name === 'NotAllowedError'
            ? 'Camera permission denied. Allow camera access and reload.'
            : 'Could not open camera. Try Chrome on your phone.',
        )
      }
    }

    start()
    return () => {
      cancelled = true
      stopStream()
    }
  }, [stopStream])

  const capture = () => {
    const video = videoRef.current
    if (!video || !ready || disabled) return

    const canvas = document.createElement('canvas')
    const w = video.videoWidth || 640
    const h = video.videoHeight || 480
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext('2d')
    ctx.drawImage(video, 0, 0, w, h)
    const dataUrl = canvas.toDataURL('image/jpeg', 0.82)
    onCapture(dataUrl)
  }

  return (
    <div className="camera-wrap">
      {cameraError ? (
        <p className="error-text">{cameraError}</p>
      ) : (
        <>
          <video ref={videoRef} className="camera-video" playsInline muted />
          <div className="scan-radar" aria-hidden="true" />
          <div className="camera-frame" aria-hidden />
          <div className="camera-corners" aria-hidden="true">
            <span className="corner tl" />
            <span className="corner tr" />
            <span className="corner bl" />
            <span className="corner br" />
          </div>
          <button type="button" className="btn btn-primary btn-capture" onClick={capture} disabled={!ready || disabled}>
            {disabled ? 'Generating…' : 'Scan reality'}
          </button>
        </>
      )}
    </div>
  )
}