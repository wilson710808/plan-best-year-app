import { useState, useRef, useCallback } from 'react'
import { useApp } from '../contexts/AppContext'
import { useAI } from '../hooks/useAppHooks'

const COACH_PROMPTS = {
  motivator: '你是一位充滿能量的激勵型教練。用熱情和正向語氣鼓勵用戶，幫助他們保持動力。使用表情符號和活力語言。回覆繁體中文，簡潔有力。',
  analyst: '你是一位數據驅動的分析型教練。用理性和邏輯分析問題，提供具體可行的策略。回覆繁體中文，結構化呈現。',
  companion: '你是一位溫暖的陪伴型教練。先傾聽用戶感受，給予情感支持，再溫和引導。回覆繁體中文，語氣溫柔。',
  challenger: '你是一位直接犀利的挑戰型教練。直接指出問題，挑戰用戶走出舒適圈，不給藉口的空間。回覆繁體中文，語氣堅定。'
}

export default function AICoachPage({ navigate }) {
  const { t, coachStyle, userName, unlockedFeatures, aiConversations, setAiConversations, currentStreak } = useApp()
  const { query } = useAI()
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const convKey = 'coach'

  const messages = aiConversations[convKey] || []

  // Must be defined BEFORE any reference (fix: moved above the early return)
  const COACH_STYLES_LIST = t.ai.styles ? Object.entries(t.ai.styles).map(([id, s]) => ({ id, ...s })) : []

  if (!unlockedFeatures.aiCoach) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: 40 }}>
        <div style={{ fontSize: 40 }}>🔒</div>
        <p>{t.unlock.locked.replace('{n}', '7')}</p>
      </div>
    )
  }

  const sendMessage = async () => {
    if (!input.trim() || loading) return
    const userMsg = { role: 'user', content: input.trim() }
    const newMessages = [...messages, userMsg]
    setAiConversations(prev => ({ ...prev, [convKey]: newMessages }))
    setInput('')
    setLoading(true)

    // Context-aware prefix
    let contextPrefix = ''
    const dayOfWeek = new Date().getDay()
    if (currentStreak >= 7) contextPrefix = '用戶已連續打卡7天以上，肯定其毅力。'
    else if (currentStreak === 0) contextPrefix = '用戶今天還沒有打卡，溫和提醒。'
    if (dayOfWeek === 1) contextPrefix += '今天是週一，鼓勵用戶開始新的一週。'
    if (dayOfWeek === 5) contextPrefix += '今天是週五，回顧本週成就。'

    const systemPrompt = COACH_PROMPTS[coachStyle] + (contextPrefix ? '\n情境：' + contextPrefix : '')
    const aiMessages = [{ role: 'system', content: systemPrompt }, ...newMessages.slice(-20)]

    const result = await query(userName || 'user', input.trim(), aiMessages)
    const aiMsg = { role: 'assistant', content: result.success ? result.response : t.common.error + ': ' + result.error }
    setAiConversations(prev => ({ ...prev, [convKey]: [...prev[convKey], aiMsg] }))
    setLoading(false)
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 140px)' }}>
      {/* Header */}
      <div style={{ padding: '8px 0', borderBottom: '1px solid var(--border)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 24 }}>{COACH_STYLES_LIST.find(s => s.id === coachStyle)?.emoji || '🤖'}</span>
        <div>
          <div style={{ fontWeight: 600 }}>{t.ai.coach}</div>
          <div style={{ fontSize: 12, color: 'var(--text-light)' }}>
            {COACH_STYLES_LIST.find(s => s.id === coachStyle)?.name} · {t.dashboard.streak}: {currentStreak}🔥
          </div>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
        {messages.length === 0 && (
          <div style={{ textAlign: 'center', padding: 40, color: 'var(--text-light)' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🤖</div>
            <p>開始和 AI 教練對話吧！</p>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`chat-bubble ${m.role === 'user' ? 'user' : 'ai'}`}>
            {m.content}
          </div>
        ))}
        {loading && <div className="chat-bubble ai">⏳ {t.common.loading}</div>}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div style={{ display: 'flex', gap: 8, padding: '8px 0' }}>
        <input value={input} onChange={e => setInput(e.target.value)}
          placeholder={t.ai.inputPlaceholder}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          style={{ flex: 1, padding: '12px 16px', border: '2px solid var(--border)', borderRadius: 12, fontSize: 15 }} />
        <button className="btn btn-primary" style={{ width: 'auto', padding: '12px 20px' }}
          onClick={sendMessage} disabled={loading}>{t.ai.send}</button>
      </div>
    </div>
  )
}
