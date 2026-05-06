import { useApp } from '../contexts/AppContext'

export default function BottomNav({ current, navigate }) {
  const { t } = useApp()
  const tabs = [
    { id: 'dashboard', icon: '🏠', label: t.nav.home },
    { id: 'goals', icon: '🎯', label: t.nav.goals },
    { id: 'checkin', icon: '✅', label: t.nav.checkIn },
    { id: 'ai-coach', icon: '🤖', label: t.nav.ai },
    { id: 'settings', icon: '⚙️', label: t.nav.settings }
  ]

  return (
    <nav className="bottom-nav">
      {tabs.map(tab => (
        <div key={tab.id}
          className={`nav-item ${current === tab.id ? 'active' : ''}`}
          onClick={() => navigate(tab.id)}
        >
          <span className="nav-icon">{tab.icon}</span>
          <span>{tab.label}</span>
        </div>
      ))}
    </nav>
  )
}
