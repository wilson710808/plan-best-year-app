import { useState } from 'react'
import { useApp } from '../contexts/AppContext'

export default function SMARTERScorerPage({ goal, navigate }) {
  const { t, updateGoal } = useApp()
  const [scores, setScores] = useState(goal?.smarterScores || {})

  if (!goal) { navigate('goals'); return null }

  const dims = [
    { key: 'specific', label: t.goals.smarter.specific, icon: '🎯' },
    { key: 'measurable', label: t.goals.smarter.measurable, icon: '📏' },
    { key: 'achievable', label: t.goals.smarter.achievable, icon: '✅' },
    { key: 'risky', label: t.goals.smarter.risky, icon: '🚀' },
    { key: 'timeBound', label: t.goals.smarter.timeBound, icon: '⏰' },
    { key: 'exciting', label: t.goals.smarter.exciting, icon: '✨' },
    { key: 'relevant', label: t.goals.smarter.relevant, icon: '🔗' }
  ]

  const handleSave = () => {
    updateGoal(goal.id, { smarterScores: scores })
    navigate('goal-detail', { goal: { ...goal, smarterScores: scores } })
  }

  const avg = dims.length ? Math.round(dims.reduce((a, d) => a + (scores[d.key] || 0), 0) / dims.length) : 0

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <button className="btn-icon" onClick={() => navigate('goal-detail', { goal })}>←</button>
        <h3>🎯 {t.goals.smarterScore}</h3>
      </div>

      {/* Radar chart (Canvas) */}
      <div className="card" style={{ textAlign: 'center' }}>
        <canvas id="radar" width="280" height="280" style={{ maxWidth: '100%' }} />
        <div style={{ fontSize: 32, fontWeight: 700, color: avg >= 7 ? 'var(--success)' : avg >= 4 ? 'var(--warning)' : 'var(--er)' }}>
          {avg}/10
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-light)' }}>
          {avg >= 7 ? '目標設定良好！' : avg >= 4 ? '有改善空間' : '需要重新規劃'}
        </div>
      </div>

      {/* Score sliders */}
      {dims.map(d => (
        <div key={d.key} className="card" style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px' }}>
          <span style={{ fontSize: 20 }}>{d.icon}</span>
          <span style={{ flex: 1, fontSize: 14 }}>{d.label}</span>
          <input type="range" min="0" max="10" value={scores[d.key] || 0}
            onChange={e => setScores({ ...scores, [d.key]: parseInt(e.target.value) })}
            style={{ width: 100 }} />
          <span style={{ fontWeight: 700, width: 30, textAlign: 'right' }}>{scores[d.key] || 0}</span>
        </div>
      ))}

      <div style={{ display: 'flex', gap: 12 }}>
        <button className="btn btn-secondary" onClick={() => navigate('goal-detail', { goal })}>{t.common.cancel}</button>
        <button className="btn btn-primary" onClick={handleSave}>{t.common.save}</button>
      </div>

      {/* Draw radar after render */}
      {typeof document !== 'undefined' && setTimeout(() => {
        const canvas = document.getElementById('radar')
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        const cx = 140, cy = 140, r = 110
        ctx.clearRect(0, 0, 280, 280)
        // Grid
        for (let i = 1; i <= 5; i++) {
          ctx.beginPath()
          for (let j = 0; j <= dims.length; j++) {
            const angle = (Math.PI * 2 * j / dims.length) - Math.PI / 2
            const rr = r * i / 5
            const x = cx + rr * Math.cos(angle), y = cy + rr * Math.sin(angle)
            j === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
          }
          ctx.strokeStyle = '#e8e8e8'; ctx.stroke()
        }
        // Axes
        dims.forEach((d, i) => {
          const angle = (Math.PI * 2 * i / dims.length) - Math.PI / 2
          ctx.beginPath(); ctx.moveTo(cx, cy)
          ctx.lineTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle))
          ctx.strokeStyle = '#e8e8e8'; ctx.stroke()
        })
        // Data
        ctx.beginPath()
        dims.forEach((d, i) => {
          const val = (scores[d.key] || 0) / 10
          const angle = (Math.PI * 2 * i / dims.length) - Math.PI / 2
          const x = cx + r * val * Math.cos(angle), y = cy + r * val * Math.sin(angle)
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        })
        ctx.closePath()
        ctx.fillStyle = 'rgba(108, 92, 231, 0.2)'; ctx.fill()
        ctx.strokeStyle = '#6C5CE7'; ctx.lineWidth = 2; ctx.stroke()
      }, 50)}
    </div>
  )
}
