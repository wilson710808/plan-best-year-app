import { useState } from 'react'
import { useApp } from '../contexts/AppContext'

export default function CheckInPage({ navigate }) {
  const { t, goals, checkIns, doCheckIn, makeUpCheckIn, currentStreak, unlockedFeatures, GOAL_CATEGORIES } = useApp()
  const [showMakeUp, setShowMakeUp] = useState(null)
  const [makeUpReason, setMakeUpReason] = useState('')
  const [celebration, setCelebration] = useState(null)
  const today = new Date().toISOString().split('T')[0]
  const activeGoals = goals.filter(g => !g.completed)

  const handleCheckIn = (goalId) => {
    doCheckIn(goalId, true)
    const newStreak = currentStreak + 1
    if (newStreak === 7) setCelebration(t.checkIn.streak7)
    else if (newStreak === 14) setCelebration(t.checkIn.streak14)
    else if (newStreak === 21) setCelebration(t.checkIn.streak21)
  }

  const handleBatchComplete = () => {
    activeGoals.forEach(g => doCheckIn(g.id, true))
    setCelebration('🎉 全部完成！')
  }

  const handleMakeUp = (goalId, date) => {
    if (!makeUpReason.trim()) return
    makeUpCheckIn(goalId, date, makeUpReason)
    setShowMakeUp(null)
    setMakeUpReason('')
  }

  const isCheckedToday = (goalId) => checkIns.some(c => c.taskId === goalId && c.date === today && c.completed)

  // Focus mode entry
  if (!unlockedFeatures.goalTracking) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: 40 }}>
        <div style={{ fontSize: 40 }}>🔒</div>
        <p>{t.unlock.locked.replace('{n}', '3')}</p>
      </div>
    )
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h3>✅ {t.checkIn.title}</h3>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-secondary" style={{ width: 'auto', padding: '8px 12px', fontSize: 12 }}
            onClick={() => navigate('focus')}>🧘 {t.checkIn.focusMode}</button>
          <button className="btn btn-primary" style={{ width: 'auto', padding: '8px 12px', fontSize: 12 }}
            onClick={handleBatchComplete}>{t.checkIn.batchComplete}</button>
        </div>
      </div>

      {/* Streak badge */}
      {currentStreak > 0 && (
        <div className="card" style={{ textAlign: 'center', background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))', color: 'white', border: 'none' }}>
          <div style={{ fontSize: 32 }}>🔥</div>
          <div style={{ fontSize: 24, fontWeight: 700 }}>{currentStreak}</div>
          <div style={{ fontSize: 13, opacity: 0.9 }}>{t.checkIn.days.replace('天！', '天連續打卡')}</div>
        </div>
      )}

      {/* Goal check-in list */}
      {activeGoals.map(goal => {
        const checked = isCheckedToday(goal.id)
        c = (GOAL_CATEGORIES).find(c => c.id === goal.category)
        return (
          <div key={goal.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>{cat?.icon} {goal.title}</div>
              <div style={{ fontSize: 12, color: 'var(--text-light)' }}>
                {checked ? `✅ ${t.checkIn.completed}` : `⬜ ${t.checkIn.missed}`}
              </div>
            </div>
            {checked ? (
              <div style={{ fontSize: 24 }}>✅</div>
            ) : (
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-primary" style={{ width: 'auto', padding: '8px 16px', fontSize: 13 }}
                  onClick={() => handleCheckIn(goal.id)}>{t.checkIn.completed}</button>
              </div>
            )}
          </div>
        )
      })}

      {/* Make up check-in */}
      {showMakeUp && (
        <div className="card" style={{ position: 'fixed', bottom: 100, left: 20, right: 20, zIndex: 200, maxWidth: 390, margin: '0 auto' }}>
          <h4>{t.checkIn.makeUp}</h4>
          <div className="input-group">
            <label>{t.checkIn.makeUpReason}</label>
            <textarea rows={3} value={makeUpReason} onChange={e => setMakeUpReason(e.target.value)} />
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-secondary" onClick={() => setShowMakeUp(null)}>{t.common.cancel}</button>
            <button className="btn btn-primary" onClick={() => handleMakeUp(showMakeUp.goalId, showMakeUp.date)}>{t.common.confirm}</button>
          </div>
        </div>
      )}

      {/* Celebration overlay */}
      {celebration && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 300 }}
          onClick={() => setCelebration(null)}>
          <div className="card" style={{ textAlign: 'center', maxWidth: 300 }}>
            <div style={{ fontSize: 60, marginBottom: 16 }}>🎉🎊🥳</div>
            <h3>{celebration}</h3>
            <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => setCelebration(null)}>{t.common.done}</button>
          </div>
        </div>
      )}
    </div>
  )
}
