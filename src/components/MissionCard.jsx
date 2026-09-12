export default function MissionCard({ mission, aiGenerated = true, onComplete, completing }) {
  if (!mission) return null

  return (
    <article className="mission-card">
      {aiGenerated && <span className="pill pill-ai">✨ AI-generated from your photo</span>}
      <h2>{mission.title}</h2>
      <p className="mission-flavor">{mission.flavor}</p>
      <div className="mission-body">
        <p>
          <strong>Quest:</strong> {mission.mission}
        </p>
        <p>
          <strong>Enemy:</strong> {mission.enemy}
        </p>
        <p>
          <strong>Reward:</strong> {mission.reward}
        </p>
        <p className="xp-line">+{mission.xp} XP</p>
      </div>
      {onComplete && (
        <button type="button" className="btn btn-success btn-block" onClick={onComplete} disabled={completing}>
          {completing ? 'Saving…' : 'Mission complete (honour system)'}
        </button>
      )}
    </article>
  )
}
