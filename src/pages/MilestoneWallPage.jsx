import { useState } from 'react'
import { useApp } from '../contexts/AppContext'

export default function MilestoneWallPage({ navigate }) {
  const { t, milestones, addMilestone } = useApp()
  const [input, setInput] = useState('')
  const [emoji, setEmoji] = useState('🏆')

  const handleAdd = () => {
    if (!input.trim()) return
    addMilestone({ title: input.trim(), emoji, date: new Date().toISOString().split('T')[0] })
    setInput('')
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <button className="btn-icon" onClick={() => navigate('goals')}>←</button>
        <h3>🏆 {t.goals.milestoneWall}</h3>
      </div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {['🏆', '🎯', '💪', '🌟', '📖', '💰'].map(e => (
          <div key={e} className={`date-tab ${emoji === e ? 'active' : ''}`} onClick={() => setEmoji(e)} style={{ padding: '8px 12px', fontSize: 20 }}>{e}</div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="記錄一個里程碑..."
          style={{ flex: 1, padding: '12px 16px', border: '2px solid var(--border)', borderRadius: 12 }} />
        <button className="btn btn-primary" style={{ width: 'auto', padding: '12px 20px' }} onClick={handleAdd}>+</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {[...milestones].reverse().map(m => (
          <div key={m.id} className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 36 }}>{m.emoji}</div>
            <div style={{ fontWeight: 600, marginTop: 8 }}>{m.title}</div>
            <div style={{ fontSize: 12, color: 'var(--text-light)', marginTop: 4 }}>{m.date}</div>
          </div>
        ))}
      </div>
      {milestones.length === 0 && (
        <div className="card" style={{ textAlign: 'center', padding: 30 }}>
          <div style={{ fontSize: 30 }}>🏆</div>
          <p style={{ marginTop: 8, color: 'var(--text-light)' }}>記錄你的重要突破時刻</p>
        </div>
      )}
    </div>
  )
}
