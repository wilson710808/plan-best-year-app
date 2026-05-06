import { useState } from 'react'
import { useApp } from '../contexts/AppContext'

export default function PastReviewPage({ navigate }) {
  const { t, reviews, setReviews } = useApp()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({ achievements: '', regrets: '', lessons: '', rating: 5 })

  const steps = [
    { key: 'achievements', title: '🏆 成就', desc: '過去一年最大的成就是什麼？' },
    { key: 'regrets', title: '😢 遺憾', desc: '有什麼遺憾或未完成的事？' },
    { key: 'lessons', title: '💡 教訓', desc: '從這些經歷中你學到了什麼？' },
    { key: 'rating', title: '📊 評分', desc: '給過去一年打分 (1-10)' }
  ]

  const handleSave = () => {
    setReviews(prev => [...prev, { id: Date.now(), type: 'past', ...form, date: new Date().toISOString() }])
    navigate('goals')
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <button className="btn-icon" onClick={() => navigate('goals')}>←</button>
        <h3>📜 {t.goals.pastReview}</h3>
      </div>
      <div className="progress-steps">
        {steps.map((s, i) => (
          <div key={i} className={`progress-step ${i === step ? 'active' : (i < step ? 'completed' : '')}`}>
            <div className="step-number">{i < step ? '✓' : i + 1}</div>
          </div>
        ))}
      </div>
      <div className="card">
        <h3>{steps[step].title}</h3>
        <p style={{ color: 'var(--text-light)', marginBottom: 16 }}>{steps[step].desc}</p>
        {steps[step].key === 'rating' ? (
          <div style={{ textAlign: 'center' }}>
            <input type="range" min="1" max="10" value={form.rating}
              onChange={e => setForm({ ...form, rating: parseInt(e.target.value) })} style={{ width: '100%' }} />
            <div style={{ fontSize: 48, fontWeight: 700, color: 'var(--primary)' }}>{form.rating}</div>
          </div>
        ) : (
          <textarea rows={4} value={form[steps[step].key]}
            onChange={e => setForm({ ...form, [steps[step].key]: e.target.value })} placeholder="寫下你的想法..." />
        )}
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        {step > 0 && <button className="btn btn-secondary" onClick={() => setStep(step - 1)}>{t.common.previous}</button>}
        {step < steps.length - 1 ? (
          <button className="btn btn-primary" onClick={() => setStep(step + 1)}>{t.common.next}</button>
        ) : (
          <button className="btn btn-primary" onClick={handleSave}>{t.common.done}</button>
        )}
      </div>
    </div>
  )
}
