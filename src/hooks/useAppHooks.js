import { useState, useEffect, useCallback } from 'react'

const STORAGE_PREFIX = 'pby_'

export function useLocalStorage(key, initialValue) {
  const prefixedKey = STORAGE_PREFIX + key
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(prefixedKey)
      return item ? JSON.parse(item) : initialValue
    } catch { return initialValue }
  })

  const setValue = useCallback((value) => {
    setStoredValue(prev => {
      const newValue = value instanceof Function ? value(prev) : value
      localStorage.setItem(prefixedKey, JSON.stringify(newValue))
      return newValue
    })
  }, [prefixedKey])

  return [storedValue, setValue]
}

export function useAI() {
  const GATEWAY_URL = 'https://www.herelai.fun/ws/05-ai-gateway/api/query'
  const APP_ID = 'plan-best-year'

  const query = useCallback(async (userId, queryData, messages = [], options = {}) => {
    const body = {
      app_id: APP_ID,
      user_id: userId,
      query_data: queryData,
      messages: messages.map(m => ({ role: m.role, content: m.content })),
      options: { temperature: 0.7, max_tokens: 2000, ...options }
    }

    try {
      const response = await fetch(GATEWAY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(35000)
      })
      const data = await response.json()
      return { success: data.success, response: data.response || '', error: data.error }
    } catch (err) {
      return { success: false, response: '', error: err.message }
    }
  }, [])

  return { query }
}
