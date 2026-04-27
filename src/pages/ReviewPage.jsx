import { useState } from 'react'

const moods = ['😢', '😔', '😐', '🙂', '😄']

function ReviewPage({ userData, updateUserData }) {
  const [viewMode, setViewMode] = useState('daily')
  const [mood, setMood] = useState(3)
  const [completed, setCompleted] = useState('')
  const [obstacle, setObstacle] = useState('')
  const [tomorrow, setTomorrow] = useState('')
  const [reviews, setReviews] = useState([
    { 
      date: '2026-04-26', 
      mood: 4, 
      completed: '完成了产品规划文档',
      obstacle: '时间管理需要改进',
      tomorrow: '早起一小时专注工作'
    },
    { 
      date: '2026-04-25', 
      mood: 3, 
      completed: '开发了网页原型',
      obstacle: '需求细节不够清晰',
      tomorrow: '和团队对齐需求'
    }
  ])

  const saveReview = () => {
    if (!completed.trim()) return
    
    const review = {
      date: new Date().toISOString().split('T')[0],
      mood,
      completed,
      obstacle,
      tomorrow
    }
    
    setReviews(prev => [review, ...prev])
    setCompleted('')
    setObstacle('')
    setTomorrow('')
  }

  const weekMoodAvg = reviews.length > 0 
    ? (reviews.slice(0, 7).reduce((acc, r) => acc + r.mood, 0) / Math.min(reviews.length, 7)).toFixed(1)
    : '-'

  return (
    <div>
      <h2 style={{ marginBottom: '20px', fontSize: '20px' }}>📝 每日复盘</h2>

      {/* 视图切换 */}
      <div className="review-date-tabs">
        <div 
          className={`date-tab ${viewMode === 'daily' ? 'active' : ''}`}
          onClick={() => setViewMode('daily')}
        >
          📝 今日复盘
        </div>
        <div 
          className={`date-tab ${viewMode === 'weekly' ? 'active' : ''}`}
          onClick={() => setViewMode('weekly')}
        >
          📅 周视图
        </div>
      </div>

      {viewMode === 'daily' ? (
        <>
          {/* 心情选择 */}
          <div className="card">
            <h4 style={{ marginBottom: '12px' }}>今天心情如何？</h4>
            <div className="mood-selector">
              {moods.map((m, i) => (
                <button 
                  key={i}
                  className={`mood-btn ${mood === i + 1 ? 'active' : ''}`}
                  onClick={() => setMood(i + 1)}
                >
                  {m}
                </button>
              ))}
            </div>
            <p style={{ textAlign: 'center', color: 'var(--text-light)', fontSize: '13px' }}>
              {mood <= 2 ? '没关系，明天会更好 💪' : mood === 3 ? '保持这个状态 👍' : '太棒了！ 🎉'}
            </p>
          </div>

          {/* 复盘表单 */}
          <div className="card">
            <div className="input-group">
              <label>✅ 今日完成的事</label>
              <textarea 
                rows="3"
                value={completed}
                onChange={(e) => setCompleted(e.target.value)}
                placeholder="写下今天让你骄傲的事..."
              />
            </div>
            <div className="input-group">
              <label>🚧 遇到的阻碍</label>
              <textarea 
                rows="2"
                value={obstacle}
                onChange={(e) => setObstacle(e.target.value)}
                placeholder="什么让你放慢了脚步？"
              />
            </div>
            <div className="input-group">
              <label>🌟 明日计划</label>
              <textarea 
                rows="2"
                value={tomorrow}
                onChange={(e) => setTomorrow(e.target.value)}
                placeholder="明天最重要的三件事..."
              />
            </div>
            <button className="btn btn-primary" onClick={saveReview}>
              保存复盘 ✨
            </button>
          </div>

          {/* AI 教练点评 */}
          <div className="card" style={{ 
            background: 'linear-gradient(135deg, rgba(255,140,66,0.1), rgba(108,92,231,0.1))',
            border: '2px solid var(--primary)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <span style={{ fontSize: '24px' }}>🤖</span>
              <span style={{ fontWeight: '600', color: 'var(--primary)' }}>AI 教练点评</span>
            </div>
            <p style={{ fontSize: '14px', lineHeight: '1.6' }}>
              {completed ? 
                '很高兴看到你的进展！记住，每个小小的进步都是成功的积累。' :
                '还没有记录今天？没关系，现在开始也不晚！'
              }
            </p>
          </div>
        </>
      ) : (
        <>
          {/* 周统计 */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value" style={{ fontSize: '36px' }}>{weekMoodAvg}</div>
              <div className="stat-label">本周平均心情</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{reviews.length}</div>
              <div className="stat-label">已记录天数</div>
            </div>
          </div>

          {/* 历史记录 */}
          <h3 style={{ marginBottom: '16px', marginTop: '20px' }}>📅 最近复盘</h3>
          {reviews.map((review, index) => (
            <div key={index} className="card">
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '12px'
              }}>
                <span style={{ fontWeight: '600' }}>{review.date}</span>
                <span style={{ fontSize: '24px' }}>{moods[review.mood - 1]}</span>
              </div>
              <div style={{ marginBottom: '8px' }}>
                <span style={{ color: 'var(--success)', fontSize: '13px' }}>✅ </span>
                <span style={{ fontSize: '14px' }}>{review.completed}</span>
              </div>
              {review.obstacle && (
                <div style={{ marginBottom: '8px' }}>
                  <span style={{ color: 'var(--warning)', fontSize: '13px' }}>🚧 </span>
                  <span style={{ fontSize: '14px', color: 'var(--text-light)' }}>{review.obstacle}</span>
                </div>
              )}
              {review.tomorrow && (
                <div>
                  <span style={{ color: 'var(--secondary)', fontSize: '13px' }}>🌟 </span>
                  <span style={{ fontSize: '14px' }}>{review.tomorrow}</span>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  )
}

export default ReviewPage
