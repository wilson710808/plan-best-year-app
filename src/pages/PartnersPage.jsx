import { useState, useRef } from 'react'
import { useApp } from '../contexts/AppContext'
import { useAI } from '../hooks/useAppHooks'

const PARTNER_PROFILES = [
  { id: 'p1', name: '小明', role: 'traveler', emoji: '🚶', greeting: '你好！我也是正在努力的人，一起加油吧！', promptSuffix: '你是一位同行者伙伴，和用戶一起成長，分享自己的掙扎和進步。使用繁體中文。基於用戶的目標，分享你自己類似的經歷和掙扎，用「我也在努力...」的語氣共鳴，偶爾分享小進步互相激勵。' },
  { id: 'p2', name: '老張', role: 'veteran', emoji: '🧓', greeting: '我走過這條路，有什麼想問的嗎？', promptSuffix: '你是一位過來人伙伴，已經成功走過這條路，分享經驗和建議。使用繁體中文。基於用戶的目標類別，分享你當年如何完成類似目標的經驗，用「我當時也...」的方式給建議，指出容易忽略的陷阱。' },
  { id: 'p3', name: '小美', role: 'newbie', emoji: '🌸', greeting: '你好～我剛開始，請多多指教！', promptSuffix: '你是一位新手伙伴，剛開始旅程，常需要鼓勵但有新鮮視角。使用繁體中文。基於用戶的目標，用新手的好奇心提問「你是怎麼做到的？」，讓用戶在教你的過程中重新梳理思路，你的新鮮視角也可能帶來意外啟發。' },
  { id: 'p4', name: '陳教練', role: 'coach', emoji: '🎯', greeting: '你好，我是你的專業教練，有什麼想討論的？', promptSuffix: '你是一位專業教練伙伴，提供結構化指導和專業建議。使用繁體中文。基於用戶的目標信息，分析目標的SMARTER完成度，給出結構化的行動計畫，追蹤領先指標的執行狀況，幫助用戶做季度校正。' }
]

export default function PartnersPage({ navigate }) {
  const { t, userName, partners, aiConversations, setAiConversations, getGoalsContext } = useApp()
  const { query } = useAI()
  const [activeId, setActiveId] = useState('p1')
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const endRef = useRef(null)

  const activePartner = PARTNER_PROFILES.find(p => p.id === activeId) || PARTNER_PROFILES[0]
  const dbPartner = partners.find(p => p.id === activeId) || {}
  const convKey = `partner-${activeId}`
  const messages = aiConversations[convKey] || []

  const sendMessage = async () => {
    if (!input.trim() || loading) return
    const userMsg = { role: 'user', content: input.trim() }
    const newMessages = [...messages, userMsg]
    setAiConversations(prev => ({ ...prev, [convKey]: newMessages }))
    setInput(''); setLoading(true)

    const goalsCtx = getGoalsContext()
    const systemPrompt = activePartner.promptSuffix + goalsCtx + (dbPartner.missedToday ? `\n注意：你今天忘記打卡了，承認這一點並說明天會補上。` : '')
    const aiMsgs = [{ role: 'system', content: systemPrompt }, ...newMessages.slice(-20)]
    const result = await query(userName || 'user', input.trim(), aiMsgs)
    const aiMsg = { role: 'assistant', content: result.success ? result.response : '抱歉，無法連接 AI' }
    setAiConversations(prev => ({ ...prev, [convKey]: [...prev[convKey], aiMsg] }))
    setLoading(false)
    setTimeout(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), 100)
  }

  return (
    <div>
      {/* Partner tabs */}
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 8, marginBottom: 12 }}>
        {PARTNER_PROFILES.map(p => (
          <div key={p.id} className={`date-tab ${activeId === p.id ? 'active' : ''}`}
            onClick={() => setActiveId(p.id)} style={{ minWidth: 80, textAlign: 'center' }}>
            <div style={{ fontSize: 24 }}>{p.emoji}</div>
            <div style={{ fontSize: 12 }}>{p.name}</div>
            {partners.find(db => db.id === p.id)?.missedToday && <div style={{ fontSize: 10 }}>😅</div>}
          </div>
        ))}
      </div>

      {/* Missed notification */}
      {dbPartner.missedToday && (
        <div className="card" style={{ borderLeft: '4px solid var(--warning)', marginBottom: 12 }}>
          <p style={{ fontSize: 13, color: 'var(--warning)' }}>
            {t.ai.buddyMissed.replace('{name}', activePartner.name)}
          </p>
        </div>
      )}

      {/* Chat area */}
      <div style={{ height: 'calc(100vh - 340px)', overflowY: 'auto' }}>
        {messages.length === 0 && (
          <div className="chat-bubble ai">{activePartner.greeting}</div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`chat-bubble ${m.role === 'user' ? 'user' : 'ai'}`}>{m.content}</div>
        ))}
        {loading && <div className="chat-bubble ai">⏳ ...</div>}
        <div ref={endRef} />
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <input value={input} onChange={e => setInput(e.target.value)}
          placeholder={t.ai.inputPlaceholder}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          style={{ flex: 1, padding: '12px 16px', border: '2px solid var(--border)', borderRadius: 12, fontSize: 15 }}
        />
        <button className="btn btn-primary" style={{ width: 'auto', padding: '12px 20px' }}
          onClick={sendMessage} disabled={loading}>{t.ai.send}</button>
      </div>
    </div>
  )
}
