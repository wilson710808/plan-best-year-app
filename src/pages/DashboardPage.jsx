import { useApp } from '../contexts/AppContext'

export default function DashboardPage({ navigate }) {
  const { t, userName, goals, currentStreak, unlockedFeatures, checkIns, beliefs, milestones, daysSinceFirstUse } = useApp()
  const today = new Date().toISOString().split('T')[0]
  const todayCheckIns = checkIns.filter(c => c.date === today && c.completed).length
  const activeGoals = goals.filter(g => !g.completed)
  const completionRate = goals.length ? Math.round(goals.reduce((a, g) => a + (g.progress || 0), 0) / goals.length) : 0
  const recentBelief = beliefs.length ? beliefs[beliefs.length - 1] : null

  const quickActions = [
    { icon: '🎯', label: t.dashboard.milestones, page: 'milestones', unlock: true },
    { icon: '📊', label: t.dashboard.heatMap, page: 'analytics', unlock: unlockedFeatures.advancedAnalytics },
    { icon: '⚡', label: t.dashboard.calibration, page: 'calibration', unlock: unlockedFeatures.goalTracking },
    { icon: '🧘', label: t.dashboard.focusMode, page: 'focus', unlock: unlockedFeatures.goalTracking }
  ]

  return (
    <div>
      {/* Greeting */}
      <div className="card" style={{ background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))', color: 'white', border: 'none' }}>
        <h2 style={{ margin: 0 }}>{t.dashboard.greeting}，{userName}！</h2>
        <p style={{ opacity: 0.9, margin: '8px 0 0' }}>
          {t.settings.dayLabel.replace('{n}', daysSinceFirstUse)} · {t.dashboard.streak}: {currentStreak} 🔥
        </p>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{activeGoals.length}</div>
          <div className="stat-label">{t.dashboard.activeGoals}</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{currentStreak}</div>
          <div className="stat-label">{t.dashboard.streak}</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{todayCheckIns}</div>
          <div className="stat-label">{t.dashboard.todayTasks}</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{completionRate}%</div>
          <div className="stat-label">{t.dashboard.completion}</div>
        </div>
      </div>

      {/* Belief Reminder */}
      {recentBelief && (
        <div className="card" style={{ borderLeft: '4px solid var(--secondary)' }}>
          <h4 style={{ color: 'var(--secondary)', marginBottom: 8 }}>💡 {t.dashboard.beliefReminder}</h4>
          <p style={{ fontSize: 14, textDecoration: 'line-through', color: 'var(--text-light)' }}>{recentBelief.limiting}</p>
          <p style={{ fontSize: 14, color: 'var(--success)', marginTop: 4 }}>→ {recentBelief.reframed}</p>
        </div>
      )}

      {/* Quick Actions */}
      <h3 style={{ marginBottom: 12 }}>{t.dashboard.quickActions}</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
        {quickActions.map(a => (
          <div key={a.page} className="card" style={{ textAlign: 'center', cursor: 'pointer', opacity: a.unlock ? 1 : 0.5 }}
            onClick={() => a.unlock && navigate(a.page)}>
            <div style={{ fontSize: 28 }}>{a.icon}</div>
            <div style={{ fontSize: 13, marginTop: 8 }}>{a.label}</div>
            {!a.unlock && <div style={{ fontSize: 11, color: 'var(--text-light)' }}>🔒</div>}
          </div>
        ))}
      </div>

      {/* Five Steps Entry */}
      <div className="card" style={{ marginTop: 16, cursor: 'pointer' }} onClick={() => navigate('guide')}>
        <h4>🧭 五步驟引導規劃</h4>
        <p style={{ fontSize: 13, color: 'var(--text-light)' }}>相信可能 → 總結過去 → 找到為什麼 → SMARTER → 執行力</p>
      </div>

      {/* Unlock Progress */}
      <div className="card" style={{ marginTop: 16 }}>
        <h4>{t.settings.unlockInfo}</h4>
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          {[1, 3, 7, 14].map(d => (
            <div key={d} style={{ flex: 1, textAlign: 'center', padding: '8px 4px', borderRadius: 8,
              background: daysSinceFirstUse >= d ? 'rgba(0,184,148,0.1)' : 'var(--border)',
              color: daysSinceFirstUse >= d ? 'var(--success)' : 'var(--text-light)', fontSize: 12
            }}>
              <div style={{ fontWeight: 700 }}>D{d}</div>
              <div>{daysSinceFirstUse >= d ? '✅' : '🔒'}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
