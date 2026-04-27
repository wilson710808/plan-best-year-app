import { useState } from 'react'

const steps = [
  { 
    id: 1, 
    title: '打开认知', 
    icon: '💡',
    questions: [
      '过去一年，你学到的最重要的一件事是什么？',
      '如果没有任何限制，你最想成为什么样的人？',
      '什么对你来说真正重要？（家庭、事业、健康、成长、贡献...）'
    ]
  },
  { 
    id: 2, 
    title: '挖掘需求', 
    icon: '🔍',
    questions: [
      '你为什么想要这个目标？',
      '达成这个目标后，你的生活会有什么不同？',
      '这个目标背后，你真正的渴望是什么？'
    ]
  },
  { 
    id: 3, 
    title: '设定目标', 
    icon: '🎯',
    questions: [
      '用 SMART 原则描述你的目标',
      '你的季度里程碑是什么？',
      '每周需要投入多少时间？'
    ]
  },
  { 
    id: 4, 
    title: '陪伴执行', 
    icon: '🤝',
    questions: [
      '今天最重要的一件事是什么？',
      '有什么阻碍你前进？',
      '明天你要做出什么改变？'
    ]
  }
]

function GuidePage({ userData, updateUserData }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [chatHistory, setChatHistory] = useState([
    { type: 'ai', text: '你好！我是你的 AI 规划教练。准备好了吗？' }
  ])
  const [inputText, setInputText] = useState('')

  const handleAnswer = (questionIndex, answer) => {
    setAnswers(prev => ({ ...prev, [`step${currentStep}_q${questionIndex}`]: answer }))
    setChatHistory(prev => [...prev, 
      { type: 'user', text: answer },
      { type: 'ai', text: steps[currentStep].questions[questionIndex + 1] || '很好！继续下一个问题...' }
    ])
  }

  const handleInputSubmit = () => {
    if (!inputText.trim()) return
    setChatHistory(prev => [...prev, { type: 'user', text: inputText }])
    
    // AI 回复逻辑
    const responses = [
      '这是一个很好的开始！请继续深入...',
      '我理解你的想法。让我们继续探索...',
      '很好！这就是你内心真正的渴望...',
      '继续说说你的具体计划是什么？'
    ]
    setTimeout(() => {
      setChatHistory(prev => [...prev, { 
        type: 'ai', 
        text: responses[Math.floor(Math.random() * responses.length)]
      }])
    }, 800)
    
    setInputText('')
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1)
      setChatHistory(prev => [...prev, { 
        type: 'ai', 
        text: `太棒了！现在进入第 ${currentStep + 2} 步：${steps[currentStep + 1].title}` 
      }])
    }
  }

  return (
    <div>
      {/* 进度指示器 */}
      <div className="progress-steps">
        {steps.map((step, index) => (
          <div 
            key={step.id}
            className={`progress-step ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
          >
            <div className="step-number">
              {index < currentStep ? '✓' : step.id}
            </div>
            <span className="step-label">{step.title}</span>
          </div>
        ))}
      </div>

      {/* AI 对话区域 */}
      <div className="card">
        <div className="chat-container">
          {chatHistory.map((msg, index) => (
            <div key={index} className={`chat-bubble ${msg.type}`}>
              {msg.text}
            </div>
          ))}
        </div>

        {/* 问题选项 */}
        {currentStep < steps.length && (
          <div>
            <h4 style={{ marginBottom: '12px', color: 'var(--primary)' }}>
              {steps[currentStep].icon} {steps[currentStep].title}
            </h4>
            {steps[currentStep].questions.map((q, qIndex) => (
              <div key={qIndex} className="input-group">
                <label>{q}</label>
                <textarea 
                  rows="3"
                  placeholder="输入你的答案..."
                  onBlur={(e) => handleAnswer(qIndex, e.target.value)}
                />
              </div>
            ))}
          </div>
        )}

        {/* 输入框 */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
          <input 
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleInputSubmit()}
            placeholder="输入你的想法..."
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
            onClick={handleInputSubmit}
          >
            发送
          </button>
        </div>

        {currentStep < steps.length - 1 && (
          <button 
            className="btn btn-secondary"
            style={{ marginTop: '16px' }}
            onClick={nextStep}
          >
            进入下一步 →
          </button>
        )}
      </div>
    </div>
  )
}

export default GuidePage
