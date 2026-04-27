import { useState } from 'react'

function WelcomePage({ onStart }) {
  const features = [
    { icon: '💡', title: '打开认知', desc: '探索你真正想要的' },
    { icon: '🔍', title: '挖掘需求', desc: '找到背后的渴望' },
    { icon: '🎯', title: '设定目标', desc: '清晰可衡量的计划' },
    { icon: '🤝', title: 'AI伙伴圈', desc: '多角色陪你成长' }
  ]

  return (
    <div className="welcome-hero">
      <div className="welcome-icon">🚀</div>
      <h1 className="welcome-title">规划最好的一年</h1>
      <p className="welcome-subtitle">
        AI 引导式个人成长，让你的梦想不再是空想
      </p>

      <div style={{ padding: '0 10px' }}>
        {features.map((feature, index) => (
          <div key={index} className="card" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '16px',
            textAlign: 'left'
          }}>
            <span style={{ fontSize: '32px' }}>{feature.icon}</span>
            <div>
              <h3 style={{ fontSize: '16px', marginBottom: '4px' }}>{feature.title}</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-light)' }}>{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: '30px 20px' }}>
        <button className="btn btn-primary" onClick={onStart}>
          开始你的规划之旅 🌟
        </button>
      </div>
    </div>
  )
}

export default WelcomePage
