import { useState } from 'react'
import { AppProvider, useApp } from './contexts/AppContext'
import BottomNav from './components/BottomNav'
import WelcomePage from './pages/WelcomePage'
import DashboardPage from './pages/DashboardPage'
import GuidePage from './pages/GuidePage'
import GoalsPage from './pages/GoalsPage'
import GoalDetailPage from './pages/GoalDetailPage'
import AddGoalPage from './pages/AddGoalPage'
import AbandonListPage from './pages/AbandonListPage'
import SMARTERScorerPage from './pages/SMARTERScorerPage'
import PastReviewPage from './pages/PastReviewPage'
import PeriodCalibrationPage from './pages/PeriodCalibrationPage'
import MilestoneWallPage from './pages/MilestoneWallPage'
import CheckInPage from './pages/CheckInPage'
import FocusModePage from './pages/FocusModePage'
import BeliefTrackerPage from './pages/BeliefTrackerPage'
import AICoachPage from './pages/AICoachPage'
import PartnersPage from './pages/PartnersPage'
import ChallengePage from './pages/ChallengePage'
import WeeklyReviewPage from './pages/WeeklyReviewPage'
import SettingsPage from './pages/SettingsPage'
import AnalyticsPage from './pages/AnalyticsPage'

function AppContent() {
  const { onboarded, setOnboarded, t } = useApp()
  const [page, setPage] = useState('dashboard')
  const [pageParams, setPageParams] = useState({})

  const navigate = (p, params = {}) => { setPage(p); setPageParams(params) }

  if (!onboarded) {
    return <WelcomePage onComplete={() => setOnboarded(true)} />
  }

  const renderPage = () => {
    switch (page) {
      case 'dashboard': return <DashboardPage navigate={navigate} />
      case 'guide': return <GuidePage navigate={navigate} />
      case 'goals': return <GoalsPage navigate={navigate} />
      case 'goal-detail': return <GoalDetailPage goal={pageParams.goal} navigate={navigate} />
      case 'add-goal': return <AddGoalPage navigate={navigate} />
      case 'abandon': return <AbandonListPage navigate={navigate} />
      case 'smarter': return <SMARTERScorerPage goal={pageParams.goal} navigate={navigate} />
      case 'past-review': return <PastReviewPage navigate={navigate} />
      case 'calibration': return <PeriodCalibrationPage navigate={navigate} />
      case 'milestones': return <MilestoneWallPage navigate={navigate} />
      case 'checkin': return <CheckInPage navigate={navigate} />
      case 'focus': return <FocusModePage navigate={navigate} />
      case 'beliefs': return <BeliefTrackerPage navigate={navigate} />
      case 'ai-coach': return <AICoachPage navigate={navigate} />
      case 'partners': return <PartnersPage navigate={navigate} />
      case 'challenge': return <ChallengePage navigate={navigate} />
      case 'review': return <WeeklyReviewPage navigate={navigate} />
      case 'settings': return <SettingsPage navigate={navigate} />
      case 'analytics': return <AnalyticsPage navigate={navigate} />
      default: return <DashboardPage navigate={navigate} />
    }
  }

  const showNav = !['goal-detail', 'add-goal', 'smarter', 'past-review', 'calibration', 'focus'].includes(page)

  return (
    <div className="app">
      <header className="header">
        <h1>{t.app.title}</h1>
        <p>{t.app.subtitle}</p>
      </header>
      <main className="page">{renderPage()}</main>
      {showNav && <BottomNav current={page} navigate={navigate} />}
    </div>
  )
}

export default function App() {
  return <AppProvider><AppContent /></AppProvider>
}
