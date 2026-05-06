import { useState } from 'react'
import { useApp } from '../contexts/AppContext'

export default function BeliefTrackerPage({ navigate }) {
  const { t, beliefs, addBelief, updateBelief, BELIEF_CATEGORIES } = useApp()
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ limiting: '', reframed: '', category: 'selfLimiting' })

  const handleAdd = () => {
    if (!form.limiting.trim()) return
    addBelief(form)
    setForm({ limiting: '', reframed: '', category: 'selfLimiting' })
    setShowForm(false)
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <button className="btn-icon" onClick={() => navigate('dashboard')}>←</button>
        <h3 style={{ flex: 1 }}>💡 {t.belief.title}</h3>
        <button className="btn btn-primary" style={{ width: 'auto', padding: '8px 16px' }}
          onClick={() => setShowForm(!showForm)}>+ {t.belief.addNew}</button>
      </div>

      {showForm && (
        <div className="card">
          <div className="input-group">
            <label>{t.belief.categories[form.category]} {t.belief.limiting}</label>
            <textarea rows={2} value={form.limiting} onChange={e => setForm({ ...form, limiting: e.target.value })} />
          </div>
          <div className="input-group">
            <label>類別</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {BELIEF_CATEGORIES.map(cat => (
                <div key={cat} className={`date-tab ${form.category === cat ? 'active' : ''}`}
                  onClick={() => setForm({ ...form, category: cat })}
                  style={{ padding: '6px 10px', fontSize: 12 }}>{t.belief.categories[cat]}</div>
              ))}
            </div>
          </div>
          <div className="input-group">
            <label>{t.belief.reframed}</label>
            <textarea rows={2} value={form.reframed} onChange={e => setForm({ ...form, reframed: e.target.value })}
              placeholder="將限制性信念轉化為正向信念..." />
          </div>
          <button className="btn btn-primary" onClick={handleAdd}>{t.common.save}</button>
        </div>
      )}

      {beliefs.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: 40 }}>
          <div style={{ fontSize: 40 }}>💡</div>
          <p style={{ margin: '12px 0' }}>{t.common.noData}</p>
          <p style={{ fontSize: 13, color: 'var(--text-light)' }}>記錄並追蹤你的限制性信念，將它們轉化為正向信念</p>
        </div>
      ) : beliefs.map(b => (
        <div key={b.id} className="card" style={{ borderLeft: `4px solid ${b.reframed ? 'var(--success)' : 'var(--er)'}` }}>
          <div style={{ fontSize: 11, color: 'var(--secondary)', fontWeight: 600, marginBottom: 8 }}>
            {t.belief.categories[b.category] || b.category}
          </div>
          <div style={{ textDecoration: 'line-through', color: 'var(--text-light)', marginBottom: 8 }}>❌ {b.limiting}</div>
          {b.reframed ? (
            <div style={{ color: 'var(--success)' }}>✅ {b.reframed}</div>
          ) : (
            <button className="btn btn-secondary" style={{ fontSize: 13 }}
              onClick={() => {
                const reframed = prompt('轉化後的信念：')
                if (reframed) updateBelief(b.id, { reframed })
              }}>{t.belief.transform}</button>
          )}
        </div>
      ))}
    </div>
  )
}
