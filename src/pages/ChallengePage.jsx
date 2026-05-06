import { useApp } from '../contexts/AppContext'

export default function ChallengePage({ navigate }) {
  const { t, challengeDay, setChallengeDay, challengePhase, setChallengePhase, goals } = useApp()

  const handleStart = (phase) => {
    setChallengePhase(phase)
    setChallengeDay(1)
  }

  const handleComplete = () => {
    if (challengePhase === 'launch') {
      setChallengePhase('challenge')
      setChallengeDay(1)
    } else {
      setChallengePhase('done')
    }
  }

  const dayProgress = challengePhase === 'launch' ? Math.min(challengeDay, 7) : Math.min(challengeDay, 21)
  const totalDays = challengePhase === 'launch' ? 7 : 21
  const pct = Math.round(dayProgress / totalDays * 100)

  return (
    <div>
      <h3 style={{ marginBottom: 16 }}>🏋️ {t.ai.challenge}</h3>

      {challengePhase === 'done' ? (
        <div className="card" style={{ textAlign: 'center', padding: 40 }}>
          <div style={{ fontSize: 60 }}>🎉</div>
          <h3>21天挑戰完成！</h3>
          <p style={{ color: 'var(--text-light)', marginTop: 8 }}>你已經養成了持續行動的習慣！</p>
        </div>
      ) : challengePhase ? (
        <div className="card">
          <h4>{challengePhase === 'launch' ? t.ai.sevenDay : t.ai.twentyOneDay}</h4>
          <p style={{ color: 'var(--text-light)', margin: '8px 0' }}>第 {dayProgress}/{totalDays} 天</p>
          <div className="goal-progress" style={{ height: 12, marginBottom: 12 }}>
            <div className="goal-progress-bar" style={{ width: `${pct}%` }} />
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {Array.from({ length: totalDays }, (_, i) => (
              <div key={i} style={{ flex: 1, height: 8, borderRadius: 4,
                background: i < dayProgress ? 'var(--success)' : 'var(--border)' }} />
            ))}
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
            <button className="btn btn-primary" onClick={() => setChallengeDay(prev => prev + 1)}>完成今日 ✓</button>
            {dayProgress >= totalDays && <button className="btn btn-secondary" onClick={handleComplete}>進入下一階段</button>}
          </div>
        </div>
      ) : (
        <>
          <div className="card" style={{ cursor: 'pointer' }} onClick={() => handleStart('launch')}>
            <h4>🚀 {t.ai.sevenDay}</h4>
            <p style={{ color: 'var(--text-light)', marginTop: 8 }}>用7天快速啟動你的目標行動計劃</p>
            <div style={{ marginTop: 12, display: 'flex', gap: 4 }}>
              {Array.from({ length: 7 }, (_, i) => <div key={i} style={{ flex: 1, height: 6, borderRadius: 3, background: 'var(--border)' }} />)}
            </div>
          </div>
          <div className="card" style={{ cursor: 'pointer', opacity: 0.6 }}>
            <h4>🔥 {t.ai.twentyOneDay}</h4>
            <p style={{ color: 'var(--text-light)', marginTop: 8 }}>需先完成7天啟動計劃</p>
          </div>
        </>
      )}
    </div>
  )
}
