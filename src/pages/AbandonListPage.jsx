import { useState } from 'react'
import { useApp } from '../contexts/AppContext'

export default function AbandonListPage({ navigate }) {
  const { t, abandonList, addToAbandon, removeFromAbandon } = useApp()
  const [input, setInput] = useState('')

  const handleAdd = () => {
    if (!input.trim()) return
    addToAbandon({ title: input.trim(), emoji: '📦' })
    setInput('')
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <button className="btn-icon" onClick={() => navigate('goals')}>←</button>
        <h3>🗑️ {t.goals.abandonList}</h3>
      </div>
      <p style={{ color: 'var(--text-light)', marginBottom: 16, fontSize: 14 }}>
        「更少但更好」— 放棄不重要的事，才能專注在真正重要的目標上。
      </p>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="要放棄的事項..."
          style={{ flex: 1, padding: '12px 16px', border: '2px solid var(--border)', borderRadius: 12 }} />
        <button className="btn btn-primary" style={{ width: 'auto', padding: '12px 20px' }} onClick={handleAdd}>+</button>
      </div>
      {abandonList.map(item => (
        <div key={item.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>{item.emoji} {item.title}</span>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18 }}
            onClick={() => removeFromAbandon(item.id)}>✅ 已放下</button>
        </div>
      ))}
      {abandonList.length === 0 && (
        <div className="card" style={{ textAlign: 'center', padding: 30 }}>
          <div style={{ fontSize: 30 }}>✨</div>
          <p style={{ marginTop: 8, color: 'var(--text-light)' }}>列出你願意放棄的事，為重要目標騰出空間</p>
        </div>
      )}
    </div>
  )
}
