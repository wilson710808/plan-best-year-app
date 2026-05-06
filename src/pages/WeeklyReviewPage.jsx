import { useState } from 'react'
import { useApp } from '../contexts/AppContext'

export default function WeeklyReviewPage({ navigate }) {
  const { t, reviews, setReviews } = useApp()
  const [form, setForm] = useState({ type: 'weekly', achievements: '', improvements: '', nextFocus: '', mood: 3 })
  const [viewMode, setViewMode] = useState('form')

  const handleSave = () => {
    if (!form.achievements.trim()) return
    setReviews(prev => [...prev, { id: Date.now(), ...form, date: new Date().toISOString() }])
    setForm({ type: 'weekly', achievements: '', improvements: '', nextFocus: '', mood: 3 })
    setViewMode('list')
  }

  const moods = ['😢', '😔', '😐', '🙂', '😄']

  return (
    <div>
      <h3 style={{ marginBottom: 16 }}>📝 {t.review.weekly}</h3>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <div className={`date-tab ${viewMode === 'form' ? 'active' : ''}`} onClick={() => setViewMode('form')}>✏️ 新增</div>
        <div className={`date-tab ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')}>📋 歷史</div>
      </div>

      {viewMode === 'form' ? (
        <div className="card">
          <div className="mood-selector">
            {moods.map((m, i) => (
              <button key={i} className={`mood-btn ${form.mood === i ? 'active' : ''}`}
                onClick={() => setForm({ ...form, mood: i })}>{m}</button>
            ))}
          </div>
          <div className="input-group"><label>🏆 {t.review.achievements}</label><textarea rows={2} value={form.achievements} onChange={e => setForm({ ...form, achievements: e.target.value })} /></div>
          <div className="input-group"><label>🔄 {t.review.improvements}</label><textarea rows={2} value={form.improvements} onChange={e => setForm({ ...form, improvements: e.target.value })} /></div>
          <div className="input-group"><label>🎯 {t.review.nextFocus}</label><textarea rows={2} value={form.nextFocus} onChange={e => setForm({ ...form, nextFocus: e.target.value })} /></div>
          <button className="btn btn-primary" onClick={handleSave}>{t.common.save}</button>
        </div>
      ) : (
        reviews.filter(r => r.type === 'weekly' || r.type === 'past').reverse().map(r => (
          <div key={r.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span>{r.type === 'past' ? '📜' : '📝'} {r.date?.split('T')[0]}</span>
              {r.mood !== undefined && <span style={{ fontSize: 20 }}>{moods[r.mood]}</span>}
            </div>
            {r.achievements && <p style={{ fontSize: 14 }}>🏆 {r.achievements}</p>}
            {r.improvements && <p style={{ fontSize: 14, color: 'var(--text-light)' }}>🔄 {r.improvements}</p>}
            {r.nextFocus && <p style={{ fontSize: 14 }}>🎯 {r.nextFocus}</p>}
            {r.lessons && <p style={{ fontSize: 14, color: 'var(--secondary)' }}>💡 {r.lessons}</p>}
          </div>
        ))
      )}
    </div>
  )
}
