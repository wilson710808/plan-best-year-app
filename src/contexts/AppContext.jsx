import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { useLocalStorage } from '../hooks/useAppHooks'
import zhTW from '../i18n/zh-TW'
import zhCN from '../i18n/zh-CN'
import en from '../i18n/en'

const translations = { 'zh-TW': zhTW, 'zh-CN': zhCN, 'en': en }
const AppContext = createContext(null)

const COACH_STYLES = [
  { id: 'motivator', emoji: '🔥' },
  { id: 'analyst', emoji: '📊' },
  { id: 'companion', emoji: '🤗' },
  { id: 'challenger', emoji: '⚡' }
]

const AI_PARTNERS = [
  { id: 'p1', name: '小明', role: 'traveler', emoji: '🚶', streak: 0, missedToday: false },
  { id: 'p2', name: '老張', role: 'veteran', emoji: '🧓', streak: 42, missedToday: false },
  { id: 'p3', name: '小美', role: 'newbie', emoji: '🌸', streak: 3, missedToday: false },
  { id: 'p4', name: '陳教練', role: 'coach', emoji: '🎯', streak: 100, missedToday: false }
]

const GOAL_CATEGORIES = [
  { id: 'career', icon: '💼', color: '#6C5CE7' },
  { id: 'health', icon: '💪', color: '#00B894' },
  { id: 'finance', icon: '💰', color: '#FDCB6E' },
  { id: 'relationship', icon: '❤️', color: '#FF7675' },
  { id: 'growth', icon: '📚', color: '#74B9FF' },
  { id: 'contribution', icon: '🌍', color: '#A29BFE' }
]

const BELIEF_CATEGORIES = [
  'selfLimiting', 'overGeneralization', 'pessimisticFilter',
  'emotionalReasoning', 'perfectionism', 'comparison'
]

export function AppProvider({ children }) {
  // Core state
  const [lang, setLang] = useLocalStorage('lang', 'zh-TW')
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false)
  const [userName, setUserName] = useLocalStorage('userName', '')
  const [firstUseDate] = useLocalStorage('firstUseDate', new Date().toISOString())
  const [coachStyle, setCoachStyle] = useLocalStorage('coachStyle', 'motivator')
  const [onboarded, setOnboarded] = useLocalStorage('onboarded', false)

  // Data
  const [goals, setGoals] = useLocalStorage('goals', [])
  const [checkIns, setCheckIns] = useLocalStorage('checkIns', [])
  const [beliefs, setBeliefs] = useLocalStorage('beliefs', [])
  const [milestones, setMilestones] = useLocalStorage('milestones', [])
  const [abandonList, setAbandonList] = useLocalStorage('abandonList', [])
  const [reviews, setReviews] = useLocalStorage('reviews', [])
  const [partners, setPartners] = useLocalStorage('partners', AI_PARTNERS)
  const [energyRecords, setEnergyRecords] = useLocalStorage('energy', [])
  const [aiConversations, setAiConversations] = useLocalStorage('aiConv', {})
  const [challengeDay, setChallengeDay] = useLocalStorage('challengeDay', 0)
  const [challengePhase, setChallengePhase] = useLocalStorage('challengePhase', '') // 'launch' | 'challenge' | 'done'

  // Super user check — Wilson gets all features unlocked for testing
  const isSuperUser = userName === 'Wilson'

  // Derived
  const t = translations[lang] || zhTW
  const daysSinceFirstUse = Math.floor((Date.now() - new Date(firstUseDate).getTime()) / 86400000) + 1

  // Feature unlock — super user bypasses all day-based restrictions
  const unlockedFeatures = isSuperUser
    ? { basic: true, goalTracking: true, aiCoach: true, advancedAnalytics: true }
    : {
        basic: daysSinceFirstUse >= 1,
        goalTracking: daysSinceFirstUse >= 3,
        aiCoach: daysSinceFirstUse >= 7,
        advancedAnalytics: daysSinceFirstUse >= 14
      }

  // Current streak
  const currentStreak = useCallback(() => {
    const today = new Date().toISOString().split('T')[0]
    let streak = 0
    let d = new Date()
    while (true) {
      const ds = d.toISOString().split('T')[0]
      const hasCheckIn = checkIns.some(c => c.date === ds && c.completed)
      if (hasCheckIn) { streak++; d.setDate(d.getDate() - 1) }
      else break
    }
    return streak
  }, [checkIns])

  // Check in
  const doCheckIn = useCallback((taskId, completed = true) => {
    const today = new Date().toISOString().split('T')[0]
    setCheckIns(prev => {
      const filtered = prev.filter(c => !(c.taskId === taskId && c.date === today))
      return [...filtered, { id: Date.now(), taskId, date: today, completed, createdAt: new Date().toISOString() }]
    })
  }, [setCheckIns])

  const makeUpCheckIn = useCallback((taskId, date, reason) => {
    setCheckIns(prev => {
      const filtered = prev.filter(c => !(c.taskId === taskId && c.date === date))
      return [...filtered, { id: Date.now(), taskId, date, completed: true, isMakeUp: true, reason, createdAt: new Date().toISOString() }]
    })
  }, [setCheckIns])

  // Goals CRUD
  const addGoal = useCallback((goal) => {
    setGoals(prev => [...prev, { ...goal, id: Date.now(), progress: 0, createdAt: new Date().toISOString() }])
  }, [setGoals])

  const updateGoal = useCallback((id, updates) => {
    setGoals(prev => prev.map(g => g.id === id ? { ...g, ...updates } : g))
  }, [setGoals])

  const deleteGoal = useCallback((id) => {
    setGoals(prev => prev.filter(g => g.id !== id))
  }, [setGoals])

  // Beliefs CRUD
  const addBelief = useCallback((belief) => {
    setBeliefs(prev => [...prev, { ...belief, id: Date.now(), createdAt: new Date().toISOString() }])
  }, [setBeliefs])

  const updateBelief = useCallback((id, updates) => {
    setBeliefs(prev => prev.map(b => b.id === id ? { ...b, ...updates } : b))
  }, [setBeliefs])

  // Milestones
  const addMilestone = useCallback((milestone) => {
    setMilestones(prev => [...prev, { ...milestone, id: Date.now(), createdAt: new Date().toISOString() }])
  }, [setMilestones])

  // Abandon list
  const addToAbandon = useCallback((item) => {
    setAbandonList(prev => [...prev, { ...item, id: Date.now(), abandonedAt: new Date().toISOString() }])
  }, [setAbandonList])

  const removeFromAbandon = useCallback((id) => {
    setAbandonList(prev => prev.filter(a => a.id !== id))
  }, [setAbandonList])

  // Energy
  const addEnergyRecord = useCallback((level) => {
    const today = new Date().toISOString().split('T')[0]
    setEnergyRecords(prev => {
      const filtered = prev.filter(e => e.date !== today)
      return [...filtered, { date: today, level, timestamp: new Date().toISOString() }]
    })
  }, [setEnergyRecords])

  // Dark mode effect
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  // Partner missed day simulation (20% chance per day)
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    if (Math.random() < 0.2) {
      setPartners(prev => prev.map(p =>
        p.id === 'p3' ? { ...p, missedToday: true } : p
      ))
    }
  }, [setPartners])

  const value = {
    // Settings
    lang, setLang, darkMode, setDarkMode, t, userName, setUserName,
    coachStyle, setCoachStyle, onboarded, setOnboarded,
    // Feature unlock
    unlockedFeatures, daysSinceFirstUse, isSuperUser,
    // Data
    goals, addGoal, updateGoal, deleteGoal,
    checkIns, doCheckIn, makeUpCheckIn, currentStreak: currentStreak(),
    beliefs, addBelief, updateBelief,
    milestones, addMilestone,
    abandonList, addToAbandon, removeFromAbandon,
    reviews, setReviews,
    partners, setPartners,
    energyRecords, addEnergyRecord,
    aiConversations, setAiConversations,
    challengeDay, setChallengeDay, challengePhase, setChallengePhase,
    // Constants
    COACH_STYLES, GOAL_CATEGORIES, BELIEF_CATEGORIES
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() { return useContext(AppContext) }
