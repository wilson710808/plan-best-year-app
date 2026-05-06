import { useState } from 'react'
import { useApp } from '../contexts/AppContext'

export default function PeriodCalibrationPage({ navigate }) {
  const { t, goals, setReviews } = useApp()
  const [quarter, setQuarter] = useState('Q1')
  const [form, setForm] = useState({ onTrack: '', adjustments: '', newGoals: '', abandoned: '' })

  const handleSave = () => {
    setReviews(prev => [...prev, { id: Date.now(), type: 'calibration', quarter, ...form, date: new Date().toISOString() }])
    navigate('goals')
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <button className="btn-icon" onClick={() => navigate('goals')}>←</button>
        <h3>📐 {t.goals.periodCalibration}</h3>
      </div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {['Q1', 'Q2', 'Q3', 'Q4'].map(q => (
          <div key={q} className={`date-tab ${quarter === q ? 'active' : ''}`} onClick={() => setQuarter(q)}>{q}</div>
        ))}
      </div>
      <div className="card">
        <div className="input-group"><label>🎯 哪些目標在軌道上？</label><textarea rows={2} value={form.onTrack} onChange={e => setForm({ ...form, onTrack: e.target.value })} /></div>
        <div className="input-group"><label>🔄 需要調整什麼？</label><textarea rows={2} value={form.adjustments} onChange={e => setForm({ ...form, adjustments: e.target.value })} /></div>
        <div className="input-group"><label>➕ 新增什麼目標？</label><textarea rows={2} value={form.newGoals} onChange={e => setForm({ ...form, newGoals: e.target.value })} /></div>
        <div className="input-group"><label>➖ 放棄什麼目標？</label><textarea rows={2} value={form.abandoned} onChange={e => setForm({ ...form, abandoned: e.target.value })} /></div>
      </div>
      <button className="btn btn-primary" onClick={handleSave}>{t.common.save}</button>
    </div>
  )
}
