import { useState } from 'react'

const categories = [
  { id: 'career', name: '事业', icon: '💼', color: '#6C5CE7' },
  { id: 'health', name: '健康', icon: '💪', color: '#00B894' },
  { id: 'finance', name: '财务', icon: '💰', color: '#FDCB6E' },
  { id: 'relationship', name: '关系', icon: '❤️', color: '#FF7675' },
  { id: 'growth', name: '成长', icon: '📚', color: '#74B9FF' },
  { id: 'contribution', name: '贡献', icon: '🌍', color: '#A29BFE' }
]

const sampleGoals = [
  { id: 1, title: '完成产品开发并上线', category: 'career', progress: 65, deadline: '2026-06-30' },
  { id: 2, title: '每周跑步3次，每次30分钟', category: 'health', progress: 40, deadline: '2026-12-31' },
  { id: 3, title: '建立6个月应急基金', category: 'finance', progress: 50, deadline: '2026-10-01' },
]

function GoalsPage({ userData, updateUserData }) {
  const [goals, setGoals] = useState(sampleGoals)
  const [showAddGoal, setShowAddGoal] = useState(false)
  const [newGoal, setNewGoal] = useState({ title: '', category: 'career', deadline: '' })

  const addGoal = () => {
    if (!newGoal.title.trim()) return
    
    const goal = {
      id: Date.now(),
      title: newGoal.title,
      category: newGoal.category,
      progress: 0,
      deadline: newGoal.deadline || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    }
    
    setGoals(prev => [...prev, goal])
    setNewGoal({ title: '', category: 'career', deadline: '' })
    setShowAddGoal(false)
  }

  const totalProgress = goals.length > 0 
    ? Math.round(goals.reduce((acc, g) => acc + g.progress, 0) / goals.length)
    : 0

  return (
    <div>
      <h2 style={{ marginBottom: '20px', fontSize: '20px' }}>🎯 我的目标</h2>

      {/* 统计概览 */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{goals.length}</div>
          <div className="stat-label">目标总数</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{totalProgress}%</div>
          <div className="stat-label">整体进度</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{goals.filter(g => g.progress >= 50).length}</div>
          <div className="stat-label">进行中</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{goals.filter(g => g.progress === 100).length}</div>
          <div className="stat-label">已完成</div>
        </div>
      </div>

      {/* 进度总览 */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontWeight: '600' }}>年度目标进度</span>
          <span style={{ color: 'var(--primary)', fontWeight: '600' }}>{totalProgress}%</span>
        </div>
        <div className="goal-progress" style={{ height: '12px' }}>
          <div className="goal-progress-bar" style={{ width: `${totalProgress}%` }} />
        </div>
      </div>

      {/* 目标列表 */}
      {goals.map(goal => {
        const category = categories.find(c => c.id === goal.category)
        return (
          <div key={goal.id} className="goal-card">
            <div className="goal-header">
              <span className="goal-title">{goal.icon || category?.icon} {goal.title}</span>
              <span className="goal-category" style={{ 
                background: `${category?.color}20`,
                color: category?.color
              }}>
                {category?.name}
              </span>
            </div>
            <div className="goal-progress">
              <div 
                className="goal-progress-bar" 
                style={{ 
                  width: `${goal.progress}%`,
                  background: `linear-gradient(90deg, ${category?.color}, ${category?.color}80)`
                }} 
              />
            </div>
            <div className="goal-stats">
              <span>{goal.progress}% 完成</span>
              <span>📅 {goal.deadline}</span>
            </div>
            <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
              <button 
                style={{ 
                  flex: 1,
                  padding: '8px',
                  background: 'var(--border)',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  setGoals(prev => prev.map(g => 
                    g.id === goal.id ? { ...g, progress: Math.max(0, g.progress - 10) } : g
                  ))
                }}
              >
                -10%
              </button>
              <button 
                style={{ 
                  flex: 1,
                  padding: '8px',
                  background: category?.color || 'var(--primary)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
                onClick={() => {
                  setGoals(prev => prev.map(g => 
                    g.id === goal.id ? { ...g, progress: Math.min(100, g.progress + 10) } : g
                  ))
                }}
              >
                +10%
              </button>
            </div>
          </div>
        )
      })}

      {/* 添加目标 */}
      {showAddGoal ? (
        <div className="card">
          <h3 style={{ marginBottom: '16px' }}>添加新目标</h3>
          <div className="input-group">
            <label>目标名称</label>
            <input 
              type="text"
              value={newGoal.title}
              onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
              placeholder="例如：完成马拉松"
            />
          </div>
          <div className="input-group">
            <label>类别</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setNewGoal(prev => ({ ...prev, category: cat.id }))}
                  style={{
                    padding: '8px 16px',
                    border: `2px solid ${newGoal.category === cat.id ? cat.color : 'var(--border)'}`,
                    background: newGoal.category === cat.id ? `${cat.color}20` : 'white',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>
          </div>
          <div className="input-group">
            <label>截止日期</label>
            <input 
              type="date"
              value={newGoal.deadline}
              onChange={(e) => setNewGoal(prev => ({ ...prev, deadline: e.target.value }))}
            />
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              className="btn btn-secondary"
              onClick={() => setShowAddGoal(false)}
            >
              取消
            </button>
            <button className="btn btn-primary" onClick={addGoal}>
              添加目标
            </button>
          </div>
        </div>
      ) : (
        <button 
          className="btn btn-primary"
          onClick={() => setShowAddGoal(true)}
          style={{ marginTop: '16px' }}
        >
          ➕ 添加新目标
        </button>
      )}
    </div>
  )
}

export default GoalsPage
