import { useState } from 'react'

const partners = [
  {
    id: 1,
    name: '务实派',
    avatar: '🤓',
    color: '#6C5CE7',
    bg: '#F0EEFF',
    desc: '泼冷水提醒你现实',
    traits: ['理性分析', '风险提示', '逻辑清晰'],
    greeting: '你好，我是务实派。我会帮你看清现实，避免盲目乐观。准备好了吗？'
  },
  {
    id: 2,
    name: '鼓励派',
    avatar: '🌟',
    color: '#FF8C42',
    bg: '#FFF0E6',
    desc: '快放弃时推你一把',
    traits: ['温暖鼓励', '正向反馈', '情绪支持'],
    greeting: '你好，我是鼓励派！无论你遇到什么困难，我都会陪着你一起度过。加油！'
  },
  {
    id: 3,
    name: '好奇派',
    avatar: '🔮',
    color: '#00B894',
    bg: '#E6FFF8',
    desc: '帮你探索可能性',
    traits: ['开放式提问', '激发创意', '探索未知'],
    greeting: '你好，我是好奇派！我喜欢探索各种可能性，你有什么想聊的吗？'
  }
]

function PartnersPage() {
  const [activePartner, setActivePartner] = useState(partners[0])
  const [messages, setMessages] = useState([])
  const [inputText, setInputText] = useState('')

  const selectPartner = (partner) => {
    setActivePartner(partner)
    setMessages([{ type: 'ai', text: partner.greeting }])
  }

  const handleSend = () => {
    if (!inputText.trim()) return
    
    setMessages(prev => [...prev, { type: 'user', text: inputText }])
    
    // AI 回复
    setTimeout(() => {
      const responses = {
        1: [
          '让我帮你分析一下...',
          '这是一个需要谨慎考虑的决定。',
          '你有没有考虑过可能的风险？'
        ],
        2: [
          '你一定可以的！',
          '加油！我相信你能做到！',
          '你已经做得很好了，继续保持！'
        ],
        3: [
          '这个想法很有趣！',
          '你有没有想过另一种可能？',
          '让我们一起探索更多可能性...'
        ]
      }
      const partnerResponses = responses[activePartner.id]
      setMessages(prev => [...prev, { 
        type: 'ai', 
        text: partnerResponses[Math.floor(Math.random() * partnerResponses.length)]
      }])
    }, 1000)
    
    setInputText('')
  }

  return (
    <div>
      <h2 style={{ marginBottom: '20px', fontSize: '20px' }}>🤝 AI 伙伴圈</h2>
      <p style={{ fontSize: '14px', color: 'var(--text-light)', marginBottom: '20px' }}>
        选择一个 AI 伙伴，开始对话
      </p>

      {/* 伙伴选择 */}
      {partners.map(partner => (
        <div 
          key={partner.id}
          className={`partner-card ${activePartner.id === partner.id ? 'active' : ''}`}
          onClick={() => selectPartner(partner)}
        >
          <div className="partner-header">
            <div 
              className="partner-avatar"
              style={{ background: partner.bg }}
            >
              {partner.avatar}
            </div>
            <div>
              <div className="partner-name">{partner.name}</div>
              <div className="partner-type">{partner.desc}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {partner.traits.map((trait, i) => (
              <span 
                key={i}
                style={{ 
                  fontSize: '12px',
                  padding: '4px 10px',
                  background: partner.bg,
                  color: partner.color,
                  borderRadius: '20px'
                }}
              >
                {trait}
              </span>
            ))}
          </div>
        </div>
      ))}

      {/* 聊天区域 */}
      <div className="card" style={{ marginTop: '20px' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px',
          marginBottom: '16px',
          paddingBottom: '12px',
          borderBottom: '1px solid var(--border)'
        }}>
          <span style={{ fontSize: '24px' }}>{activePartner.avatar}</span>
          <span style={{ fontWeight: '600' }}>与 {activePartner.name} 对话中</span>
        </div>

        <div className="chat-container" style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {messages.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '40px 20px',
              color: 'var(--text-light)'
            }}>
              <span style={{ fontSize: '48px' }}>{activePartner.avatar}</span>
              <p style={{ marginTop: '12px' }}>开始和 {activePartner.name} 聊天吧</p>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div key={index} className={`chat-bubble ${msg.type}`}>
                {msg.text}
              </div>
            ))
          )}
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
          <input 
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={`问 ${activePartner.name}...`}
            style={{ 
              flex: 1,
              padding: '12px 16px',
              border: '2px solid var(--border)',
              borderRadius: '12px',
              fontSize: '15px'
            }}
          />
          <button 
            className="btn btn-primary"
            style={{ width: 'auto', padding: '12px 20px' }}
            onClick={handleSend}
          >
            💬
          </button>
        </div>
      </div>
    </div>
  )
}

export default PartnersPage
