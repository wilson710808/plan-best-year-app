import { useState } from 'react'
import { useApp } from '../contexts/AppContext'

export default function GoalsPage({ navigate }) {
  const { t, goals, deleteGoal, GOAL_CATEGORIES, unlockedFeatures } = useApp()
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? goals : goals.filter(g => g.category === filter)

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h3>🎯 {t.nav.goals}</h3>
        <button className="btn btn-primary" style={{ width: 'auto', padding: '10px 20px' }}
          onClick={() => navigate('add-goal')}>+ {t.goals.add}</button>
      </div>

      {/* Goal limit warning */}
      {goals.filter(g => !g.completed).length > 5 && (
        <div className="card" style={{ borderLeft: '4px solid var(--warning)', marginBottom: 16 }}>
          <p style={{ color: 'var(--warning)', fontWeight: 600 }}>⚠️ {t.goals.limitWarning}</p>
          <p style={{ fontSize: 13 }}>{t.goals.limit}</p>
        </div>
      )}

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 8, marginBottom: 12 }}>
        <div className={`date-tab ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>全部</div>
        {GOAL_CATEGORIES.map(c => (
          <div key={c.id} className={`date-tab ${filter === c.id ? 'active' : ''}`}
            onClick={() => setFilter(c.id)}>{c.icon} {t.goals.categories[c.id]}</div>
        ))}
      </div>

      {/* Goal list */}
      {filtered.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: 40 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🎯</div>
          <p>{t.common.noData}</p>
          <button className="btn btn-primary" style={{ marginTop: 16 }}
            onClick={() => navigate('add-goal')}>{t.goals.add}</button>
        </div>
      ) : filtered.map(goal => {
        const cat = GOAL_CATEGORIES.find(c => c.id === goal.category) || GOAL_CATEGORIES[0]
        return (
          <div key={goal.id} className="goal-card" style={{ cursor: 'pointer' }}
            onClick={() => navigate('goal-detail', { goal })}>
            <div className="goal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span>{cat.icon}</span>
                <span className="goal-title">{goal.title}</span>
              </div>
              <span className="goal-category" style={{ background: `${cat.color}20`, color: cat.color }}>
                {t.goals.categories[goal.category]}
              </span>
            </div>
            <div className="goal-progress">
              <div className="goal-progress-bar" style={{ width: `${goal.progress || 0}%` }} />
            </div>
            <div className="goal-stats">
              <span>{goal.progress || 0}%</span>
              {goal.deadline && <span>📅 {goal.deadline}</span>}
            </div>
            {/* 3 Whys preview */}
            {goal.why1 && (
              <div style={{ marginTop: 8, padding: '8px 12px', background: 'var(--bg)', borderRadius: 8, fontSize: 13, color: 'var(--text-light)' }}>
                💎 {goal.why1.substring(0, 40)}{goal.why1.length > 40 ? '...' : ''}
              </div>
            )}
          </div>
        )
      })}

      {/* Sub pages */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 20 }}>
        <div className="card" style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => navigate('abandon')}>
          <div style={{ fontSize: 24 }}>🗑️</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>{t.goals.abandonList}</div>
        </div>
        <div className="card" style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => navigate('past-review')}>
          <div style={{ fontSize: 24 }}>📜</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>{t.goals.pastReview}</div>
        </div>
        <div className="card" style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => navigate('milestones')}>
          <div style={{ fontSize: 24 }}>🏆</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>{t.goals.milestoneWall}</div>
        </div>
        <div className="card" style={{ textAlign: 'center', cursor: 'pointer' }}
          onClick={() => unlockedFeatures.goalTracking && navigate('calibration')}>
          <div style={{ fontSize: 24 }}>📐</div>
          <div style={{ fontSize: 13, marginTop: 4 }}>{t.goals.periodCalibration}</div>
        </div>
      </div>
    </div>
  )
}
