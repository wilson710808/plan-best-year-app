import { useState } from 'react'
import { useApp } from '../contexts/AppContext'

export default function AddGoalPage({ navigate }) {
  const { t, addGoal, GOAL_CATEGORIES, goals } = useApp()
  const [form, setForm] = useState({ title: '', category: 'career', deadline: '', why1: '', why2: '', why3: '',
    leadingIndicators: '', laggingIndicators: '' })

  const handleSubmit = () => {
    if (!form.title.trim()) return
    addGoal({
      ...form,
      leadingIndicators: form.leadingIndicators.split('\n').filter(Boolean),
      laggingIndicators: form.laggingIndicators.split('\n').filter(Boolean),
      milestones: [], smarterScores: {}
    })
    navigate('goals')
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <button className="btn-icon" onClick={() => navigate('goals')}>←</button>
        <h3>+ {t.goals.add}</h3>
      </div>

      {goals.filter(g => !g.completed).length >= 5 && (
        <div className="card" style={{ borderLeft: '4px solid var(--warning)', marginBottom: 16 }}>
          <p style={{ color: 'var(--warning)' }}>⚠️ {t.goals.limitWarning}</p>
        </div>
      )}

      <div className="card">
        <div className="input-group">
          <label>目標名稱</label>
          <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="例：完成產品開發並上線" />
        </div>

        <div className="input-group">
          <label>類別</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {GOAL_CATEGORIES.map(c => (
              <div key={c.id}
                className={`date-tab ${form.category === c.id ? 'active' : ''}`}
                onClick={() => setForm({ ...form, category: c.id })}>
                {c.icon} {t.goals.categories[c.id]}
              </div>
            ))}
          </div>
        </div>

        <div className="input-group">
          <label>截止日期</label>
          <input type="date" value={form.deadline} onChange={e => setForm({ ...form, deadline: e.target.value })} />
        </div>

        <h4 style={{ margin: '20px 0 12px', color: 'var(--secondary)' }}>💎 {t.steps.why.title}</h4>
        <div className="input-group"><label>{t.goals.why1}</label><textarea rows={2} value={form.why1} onChange={e => setForm({ ...form, why1: e.target.value })} /></div>
        <div className="input-group"><label>{t.goals.why2}</label><textarea rows={2} value={form.why2} onChange={e => setForm({ ...form, why2: e.target.value })} /></div>
        <div className="input-group"><label>{t.goals.why3}</label><textarea rows={2} value={form.why3} onChange={e => setForm({ ...form, why3: e.target.value })} /></div>

        <h4 style={{ margin: '20px 0 12px', color: 'var(--primary)' }}>📊 指標</h4>
        <div className="input-group">
          <label>{t.goals.leadingIndicators}</label>
          <textarea rows={3} value={form.leadingIndicators} onChange={e => setForm({ ...form, leadingIndicators: e.target.value })}
            placeholder="每行一個領先指標，例：&#10;每週跑步3次&#10;每日閱讀30分鐘" />
        </div>
        <div className="input-group">
          <label>{t.goals.laggingIndicators}</label>
          <textarea rows={3} value={form.laggingIndicators} onChange={e => setForm({ ...form, laggingIndicators: e.target.value })}
            placeholder="每行一個滯後指標，例：&#10;體重下降5公斤&#10;完成2本書" />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <button className="btn btn-secondary" onClick={() => navigate('goals')}>{t.common.cancel}</button>
        <button className="btn btn-primary" onClick={handleSubmit}>{t.common.save}</button>
      </div>
    </div>
  )
}
