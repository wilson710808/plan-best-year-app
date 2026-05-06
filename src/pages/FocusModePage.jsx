import { useApp } from '../contexts/AppContext'

export default function FocusModePage({ navigate }) {
  const { t, goals, checkIns, doCheckIn } = useApp()
  const today = new Date().toISOString().split('T')[0]
  const activeGoals = goals.filter(g => !g.completed)
  const unchecked = activeGoals.filter(g => !checkIns.some(c => c.taskId === g.id && c.date === today && c.completed))

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <button className="btn-icon" onClick={() => navigate('checkin')}>←</button>
        <h3>🧘 {t.checkIn.focusMode}</h3>
      </div>
      <p style={{ textAlign: 'center', color: 'var(--text-light)', marginBottom: 24 }}>只顯示今日待完成任務，專注完成</p>
      {unchecked.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: 40 }}>
          <div style={{ fontSize: 60 }}>🎉</div>
          <h3>今日任務全部完成！</h3>
          <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => navigate('dashboard')}>返回首頁</button>
        </div>
      ) : unchecked.map((goal, i) => (
        <div key={goal.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', animation: `fadeIn 0.3s ease ${i * 0.1}s both` }}>
          <div><div style={{ fontWeight: 600 }}>{goal.title}</div></div>
          <button className="btn btn-primary" style={{ width: 'auto', padding: '10px 20px' }}
            onClick={() => doCheckIn(goal.id, true)}>✅ {t.checkIn.completed}</button>
        </div>
      ))}
      <div style={{ textAlign: 'center', marginTop: 16, fontSize: 13, color: 'var(--text-light)' }}>
        剩餘 {unchecked.length} 項
      </div>
    </div>
  )
}
