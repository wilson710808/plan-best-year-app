import { useState } from 'react'
import { useApp } from '../contexts/AppContext'

const GUIDE_STEPS = [
  { id: 'believe', titleKey: 'believe', questions: [
    '過去一年，你學到的最重要的一件事是什麼？',
    '如果沒有任何限制，你最想成為什麼樣的人？',
    '什麼對你來說真正重要？（家庭、事業、健康、成長、貢獻...）',
    '有哪些信念正在限制你？試著把它們寫下來，然後轉化為正向信念。'
  ]},
  { id: 'past', titleKey: 'past', questions: [
    '過去一年最大的成就是什麼？',
    '有什麼遺憾或未完成的事？',
    '從這些經歷中你學到了什麼教訓？',
    '如果給過去一年打分，你會打幾分？為什麼？'
  ]},
  { id: 'why', titleKey: 'why', questions: [
    '你今年最想實現的目標是什麼？',
    '為什麼這個目標對你重要？（第一層為什麼）',
    '為什麼那個原因對你重要？（第二層為什麼）',
    '最深層的渴望是什麼？（第三層為什麼）'
  ]},
  { id: 'smarter', titleKey: 'smarter', questions: [
    '你的目標是否具體明確？(Specific)',
    '你如何衡量進度？(Measurable)',
    '這個目標對你目前是否可達成？(Achievable)',
    '這個目標是否需要你走出舒適圈？(Risky)',
    '目標有明確的截止日期嗎？(Time-bound)',
    '想到這個目標你感到興奮嗎？(Exciting)',
    '這個目標與你的人生方向相關嗎？(Relevant)'
  ]},
  { id: 'execute', titleKey: 'execute', questions: [
    '你的第一步行動是什麼？',
    '你每天/每週會投入多少時間？',
    '誰可以成為你的問責夥伴？',
    '如果遇到挫折，你的備用計劃是什麼？'
  ]}
]

export default function GuidePage({ navigate }) {
  const { t, addBelief, addGoal, setReviews } = useApp()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const currentStep = GUIDE_STEPS[step]

  const setAnswer = (qi, value) => {
    setAnswers(prev => ({ ...prev, [`${step}-${qi}`]: value }))
  }

  const handleNext = () => {
    if (step < GUIDE_STEPS.length - 1) setStep(step + 1)
    else {
      // Save belief if step 0
      const limitingAnswer = answers['0-3']
      if (limitingAnswer) {
        addBelief({ limiting: limitingAnswer, reframed: '', category: 'selfLimiting' })
      }
      // Save goal if step 2
      const goalAnswer = answers['2-0']
      if (goalAnswer) {
        addGoal({ title: goalAnswer, category: 'growth', why1: answers['2-1'] || '', why2: answers['2-2'] || '', why3: answers['2-3'] || '', deadline: '' })
      }
      // Save review if step 1
      const pastAchievement = answers['1-0']
      if (pastAchievement) {
        setReviews(prev => [...prev, { id: Date.now(), type: 'past', achievements: pastAchievement, lessons: answers['1-2'] || '', date: new Date().toISOString() }])
      }
      navigate('dashboard')
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <button className="btn-icon" onClick={() => navigate('dashboard')}>←</button>
        <h3>🧭 五步驟引導規劃</h3>
      </div>

      {/* Progress */}
      <div className="progress-steps">
        {GUIDE_STEPS.map((s, i) => (
          <div key={s.id} className={`progress-step ${i === step ? 'active' : (i < step ? 'completed' : '')}`}>
            <div className="step-number">{i < step ? '✓' : i + 1}</div>
            <div className="step-label">{t.steps[s.titleKey]?.title || s.titleKey}</div>
          </div>
        ))}
      </div>

      {/* Current Step */}
      <div className="card">
        <h3 style={{ marginBottom: 16 }}>
          {step + 1}. {t.steps[currentStep.titleKey]?.title}
        </h3>
        <p style={{ color: 'var(--text-light)', marginBottom: 20 }}>
          {t.steps[currentStep.titleKey]?.desc}
        </p>

        {currentStep.questions.map((q, qi) => (
          <div key={qi} className="input-group">
            <label>{q}</label>
            <textarea rows={3} value={answers[`${step}-${qi}`] || ''}
              onChange={e => setAnswer(qi, e.target.value)}
              placeholder="寫下你的想法..." />
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        {step > 0 && <button className="btn btn-secondary" onClick={() => setStep(step - 1)}>{t.common.previous}</button>}
        <button className="btn btn-primary" onClick={handleNext}>
          {step === GUIDE_STEPS.length - 1 ? t.common.done : t.common.next}
        </button>
      </div>
    </div>
  )
}
