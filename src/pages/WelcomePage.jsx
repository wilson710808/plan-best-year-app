import { useState } from 'react'
import { useApp } from '../contexts/AppContext'

export default function WelcomePage({ onComplete }) {
  const { t, setUserName } = useApp()
  const [name, setName] = useState('')
  const [step, setStep] = useState(0)

  const steps = [
    { icon: '📅', title: t.welcome.title, desc: t.welcome.subtitle, isHero: true },
    { icon: '🧭', title: t.steps.believe.title, desc: t.steps.believe.desc },
    { icon: '📝', title: t.steps.past.title, desc: t.steps.past.desc },
    { icon: '💎', title: t.steps.why.title, desc: t.steps.why.desc },
    { icon: '🎯', title: t.steps.smarter.title, desc: t.steps.smarter.desc },
    { icon: '⚡', title: t.steps.execute.title, desc: t.steps.execute.desc }
  ]

  const handleStart = () => {
    if (step < steps.length - 1) { setStep(step + 1); return }
    if (!name.trim()) return
    setUserName(name.trim())
    onComplete()
  }

  const s = steps[step]
  return (
    <div className="welcome-page">
      <div className="welcome-hero">
        <div className="welcome-icon">{s.icon}</div>
        {s.isHero ? (
          <>
            <h1 className="welcome-title">{s.title}</h1>
            <p className="welcome-subtitle">{s.desc}</p>
          </>
        ) : (
          <>
            <h2 style={{ marginBottom: 8 }}>{s.title}</h2>
            <p style={{ color: 'var(--text-light)', marginBottom: 24 }}>{s.desc}</p>
          </>
        )}

        {/* Step indicator */}
        <div className="progress-steps" style={{ margin: '20px 0' }}>
          {steps.map((_, i) => (
            <div key={i} className={`progress-step ${i <= step ? (i < step ? 'completed' : 'active') : ''}`}>
              <div className="step-number">{i < step ? '✓' : i}</div>
            </div>
          ))}
        </div>

        {/* Name input on last step */}
        {step === steps.length - 1 && (
          <div className="input-group" style={{ margin: '20px 0' }}>
            <label>你的名字</label>
            <input value={name} onChange={e => setName(e.target.value)}
              placeholder="請輸入你的名字" />
          </div>
        )}

        <button className="btn btn-primary" onClick={handleStart}>
          {step === steps.length - 1 ? t.welcome.start : t.common.next}
        </button>

        {/* Feature highlights on first screen */}
        {s.isHero && (
          <div style={{ marginTop: 30, textAlign: 'left' }}>
            {t.welcome.features.map((f, i) => (
              <p key={i} style={{ padding: '8px 0', fontSize: 15 }}>{f}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
