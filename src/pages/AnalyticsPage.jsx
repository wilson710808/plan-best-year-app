import { useApp } from '../contexts/AppContext'

export default function AnalyticsPage({ navigate }) {
  const { t, checkIns, energyRecords, goals } = useApp()

  // Build heatmap data (last 365 days)
  const today = new Date()
  const heatmapData = []
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const ds = d.toISOString().split('T')[0]
    const count = checkIns.filter(c => c.date === ds && c.completed).length
    heatmapData.push({ date: ds, count, day: d.getDay() })
  }
  const maxCount = Math.max(1, ...heatmapData.map(d => d.count))

  const getColor = (count) => {
    if (count === 0) return 'var(--border)'
    const intensity = count / maxCount
    if (intensity > 0.7) return 'var(--success)'
    if (intensity > 0.3) return 'var(--primary-light)'
    return 'var(--primary)'
  }

  // Energy curve
  const recentEnergy = energyRecords.slice(-30)

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <button className="btn-icon" onClick={() => navigate('dashboard')}>←</button>
        <h3>📊 數據分析</h3>
      </div>

      {/* Heatmap */}
      <div className="card">
        <h4 style={{ marginBottom: 12 }}>🗓️ {t.dashboard.heatMap}</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {heatmapData.map((d, i) => (
            <div key={i} title={`${d.date}: ${d.count}次`}
              style={{ width: 12, height: 12, borderRadius: 2, background: getColor(d.count) }} />
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 8, fontSize: 11, color: 'var(--text-light)' }}>
          <span>少</span>
          {[0, 0.3, 0.7, 1].map((v, i) => (
            <div key={i} style={{ width: 12, height: 12, borderRadius: 2, background: getColor(v * maxCount) }} />
          ))}
          <span>多</span>
        </div>
      </div>

      {/* Energy Curve */}
      <div className="card">
        <h4 style={{ marginBottom: 12 }}>⚡ {t.dashboard.energyCurve}</h4>
        {recentEnergy.length > 0 ? (
          <div>
            <svg width="100%" height="120" viewBox="0 0 300 120">
              <polyline fill="none" stroke="var(--primary)" strokeWidth="2"
                points={recentEnergy.map((e, i) => {
                  const x = i * (300 / Math.max(1, recentEnergy.length - 1))
                  const y = 120 - (e.level / 10 * 110)
                  return `${x},${y}`
                }).join(' ')} />
              {recentEnergy.map((e, i) => {
                const x = i * (300 / Math.max(1, recentEnergy.length - 1))
                const y = 120 - (e.level / 10 * 110)
                return <circle key={i} cx={x} cy={y} r="4" fill="var(--primary)" />
              })}
            </svg>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-light)' }}>
              <span>{recentEnergy[0]?.date}</span>
              <span>{recentEnergy[recentEnergy.length - 1]?.date}</span>
            </div>
          </div>
        ) : (
          <p style={{ textAlign: 'center', color: 'var(--text-light)' }}>尚無能量記錄</p>
        )}
        <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
            <button key={n} style={{ flex: 1, padding: 8, border: '1px solid var(--border)', borderRadius: 8,
              background: 'var(--card-bg)', cursor: 'pointer', fontSize: 12 }}
              onClick={() => {
                const today = new Date().toISOString().split('T')[0]
                if (!energyRecords.find(e => e.date === today)) {
                  // use addEnergyRecord from context
                }
              }}>{n}</button>
          ))}
        </div>
      </div>

      {/* Goal completion stats */}
      <div className="card">
        <h4>🎯 目標完成度</h4>
        {goals.map(g => (
          <div key={g.id} style={{ marginBottom: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontSize: 13 }}>{g.title}</span>
              <span style={{ fontWeight: 600 }}>{g.progress || 0}%</span>
            </div>
            <div className="goal-progress"><div className="goal-progress-bar" style={{ width: `${g.progress || 0}%` }} /></div>
          </div>
        ))}
        {goals.length === 0 && <p style={{ color: 'var(--text-light)', textAlign: 'center' }}>{t.common.noData}</p>}
      </div>
    </div>
  )
}
