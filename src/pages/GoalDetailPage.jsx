import { useApp } from '../contexts/AppContext'

export default function GoalDetailPage({ goal, navigate }) {
  const { t, updateGoal, deleteGoal, addMilestone, GOAL_CATEGORIES } = useApp()
  if (!goal) { navigate('goals'); return null }
  const cat = GOAL_CATEGORIES.find(c => c.id === goal.category) || GOAL_CATEGORIES[0]

  const smarterDimensions = [
    { key: 'specific', label: t.goals.smarter.specific, icon: '🎯' },
    { key: 'measurable', label: t.goals.smarter.measurable, icon: '📏' },
    { key: 'achievable', label: t.goals.smarter.achievable, icon: '✅' },
    { key: 'risky', label: t.goals.smarter.risky, icon: '🚀' },
    { key: 'timeBound', label: t.goals.smarter.timeBound, icon: '⏰' },
    { key: 'exciting', label: t.goals.smarter.exciting, icon: '✨' },
    { key: 'relevant', label: t.goals.smarter.relevant, icon: '🔗' }
  ]

  const handleProgress = (delta) => {
    updateGoal(goal.id, { progress: Math.max(0, Math.min(100, (goal.progress || 0) + delta)) })
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <button className="btn-icon" onClick={() => navigate('goals')}>←</button>
        <h3 style={{ flex: 1 }}>{goal.title}</h3>
        <button style={{ background: 'none', border: 'none', color: 'var(--er)', fontSize: 13, cursor: 'pointer' }}
          onClick={() => { deleteGoal(goal.id); navigate('goals') }}>🗑️</button>
      </div>

      {/* Category & Progress */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ fontSize: 13, padding: '4px 12px', borderRadius: 20, background: `${cat.color}20`, color: cat.color }}>
            {cat.icon} {t.goals.categories[goal.category]}
          </span>
          {goal.deadline && <span style={{ fontSize: 13, color: 'var(--text-light)' }}>📅 {goal.deadline}</span>}
        </div>
        <div className="goal-progress" style={{ height: 12, marginBottom: 8 }}>
          <div className="goal-progress-bar" style={{ width: `${goal.progress || 0}%` }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: 700 }}>{goal.progress || 0}%</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-secondary" style={{ width: 'auto', padding: '6px 16px' }}
              onClick={() => handleProgress(-10)}>-10</button>
            <button className="btn btn-primary" style={{ width: 'auto', padding: '6px 16px' }}
              onClick={() => handleProgress(10)}>+10</button>
          </div>
        </div>
      </div>

      {/* 3 Whys */}
      <div className="card">
        <h4>💎 {t.steps.why.title}</h4>
        {[goal.why1, goal.why2, goal.why3].map((w, i) => w && (
          <div key={i} style={{ padding: '12px', margin: '8px 0', background: 'var(--bg)', borderRadius: 12, borderLeft: '3px solid var(--secondary)' }}>
            <div style={{ fontSize: 12, color: 'var(--secondary)', fontWeight: 600 }}>
              {i === 0 ? '第1層' : i === 1 ? '第2層' : '第3層'} {t.steps.why.title}
            </div>
            <div style={{ fontSize: 14, marginTop: 4 }}>{w}</div>
          </div>
        ))}
        {(!goal.why1 && !goal.why2 && !goal.why3) && <p style={{ color: 'var(--text-light)', fontSize: 13 }}>尚未設定，請透過五步驟引導設定</p>}
      </div>

      {/* SMARTER Score */}
      <div className="card" style={{ cursor: 'pointer' }} onClick={() => navigate('smarter', { goal })}>
        <h4>🎯 {t.goals.smarterScore}</h4>
        <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
          {smarterDimensions.map(d => {
            const score = goal.smarterScores?.[d.key] || 0
            return (
              <div key={d.key} style={{ flex: 1, textAlign: 'center', padding: '6px 2px', borderRadius: 8,
                background: score > 0 ? 'rgba(0,184,148,0.1)' : 'var(--bg)' }}>
                <div style={{ fontSize: 16 }}>{d.icon}</div>
                <div style={{ fontSize: 10, color: 'var(--text-light)' }}>{score > 0 ? `${score}/10` : '-'}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Indicators */}
      <div className="card">
        <h4>📊 {t.goals.leadingIndicators}</h4>
        {(goal.leadingIndicators || []).map((ind, i) => (
          <div key={i} style={{ padding: '8px 12px', margin: '4px 0', background: 'var(--bg)', borderRadius: 8, fontSize: 14 }}>
            🎯 {ind}
          </div>
        ))}
        <h4 style={{ marginTop: 16 }}>📈 {t.goals.laggingIndicators}</h4>
        {(goal.laggingIndicators || []).map((ind, i) => (
          <div key={i} style={{ padding: '8px 12px', margin: '4px 0', background: 'var(--bg)', borderRadius: 8, fontSize: 14 }}>
            📊 {ind}
          </div>
        ))}
      </div>

      {/* Milestones */}
      <div className="card">
        <h4>🏆 {t.goals.milestones}</h4>
        {(goal.milestones || []).map((m, i) => (
          <div key={i} style={{ padding: '8px 12px', margin: '4px 0', background: 'var(--bg)', borderRadius: 8, fontSize: 14, display: 'flex', justifyContent: 'space-between' }}>
            <span>{m.emoji || '📌'} {m.title}</span>
            <span style={{ fontSize: 12, color: 'var(--text-light)' }}>{m.date}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
