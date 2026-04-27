import { useState } from 'react'
import WelcomePage from './pages/WelcomePage'
import GuidePage from './pages/GuidePage'
import PartnersPage from './pages/PartnersPage'
import GoalsPage from './pages/GoalsPage'
import ReviewPage from './pages/ReviewPage'

function App() {
  const [currentPage, setCurrentPage] = useState('welcome')
  const [userData, setUserData] = useState({
    name: '',
    goals: [],
    completedSteps: [],
    dailyReviews: []
  })

  const updateUserData = (updates) => {
    setUserData(prev => ({ ...prev, ...updates }))
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'welcome':
        return <WelcomePage onStart={() => setCurrentPage('guide')} />
      case 'guide':
        return <GuidePage userData={userData} updateUserData={updateUserData} />
      case 'partners':
        return <PartnersPage />
      case 'goals':
        return <GoalsPage userData={userData} updateUserData={updateUserData} />
      case 'review':
        return <ReviewPage userData={userData} updateUserData={updateUserData} />
      default:
        return <WelcomePage onStart={() => setCurrentPage('guide')} />
    }
  }

  if (currentPage === 'welcome') {
    return (
      <div className="app">
        {renderPage()}
      </div>
    )
  }

  return (
    <div className="app">
      <header className="header">
        <h1>📅 规划最好的一年</h1>
        <p>AI 引导，让梦想照进现实</p>
      </header>
      
      <main className="page">
        {renderPage()}
      </main>

      <nav className="bottom-nav">
        <div 
          className={`nav-item ${currentPage === 'guide' ? 'active' : ''}`}
          onClick={() => setCurrentPage('guide')}
        >
          <span className="nav-icon">🧭</span>
          <span>规划</span>
        </div>
        <div 
          className={`nav-item ${currentPage === 'partners' ? 'active' : ''}`}
          onClick={() => setCurrentPage('partners')}
        >
          <span className="nav-icon">🤝</span>
          <span>伙伴圈</span>
        </div>
        <div 
          className={`nav-item ${currentPage === 'goals' ? 'active' : ''}`}
          onClick={() => setCurrentPage('goals')}
        >
          <span className="nav-icon">🎯</span>
          <span>目标</span>
        </div>
        <div 
          className={`nav-item ${currentPage === 'review' ? 'active' : ''}`}
          onClick={() => setCurrentPage('review')}
        >
          <span className="nav-icon">📝</span>
          <span>复盘</span>
        </div>
      </nav>
    </div>
  )
}

export default App
