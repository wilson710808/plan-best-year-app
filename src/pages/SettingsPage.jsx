import { useApp } from '../contexts/AppContext'

export default function SettingsPage({ navigate }) {
  const { t, lang, setLang, darkMode, setDarkMode, coachStyle, setCoachStyle, daysSinceFirstUse, unlockedFeatures, isSuperUser, t: i18n } = useApp()
  const styleList = i18n.ai.styles ? Object.entries(i18n.ai.styles).map(([id, s]) => ({ id, ...s })) : []
  const languages = [{ id: 'zh-TW', label: '繁體中文' }, { id: 'zh-CN', label: '简体中文' }, { id: 'en', label: 'English' }]

  const handleClearData = () => {
    if (window.confirm(t.settings.clearConfirm)) {
      Object.keys(localStorage).filter(k => k.startsWith('pby_')).forEach(k => localStorage.removeItem(k))
      window.location.reload()
    }
  }

  return (
    <div>
      <h3 style={{ marginBottom: 16 }}>⚙️ {t.settings.title}</h3>

      {/* Language */}
      <div className="card">
        <h4>🌐 {t.settings.language}</h4>
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          {languages.map(l => (
            <div key={l.id} className={`date-tab ${lang === l.id ? 'active' : ''}`}
              onClick={() => setLang(l.id)}>{l.label}</div>
          ))}
        </div>
      </div>

      {/* Dark Mode */}
      <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>🌙 {t.settings.darkMode}</span>
        <div style={{ width: 50, height: 28, borderRadius: 14, background: darkMode ? 'var(--primary)' : 'var(--border)',
          cursor: 'pointer', position: 'relative', transition: '0.3s' }}
          onClick={() => setDarkMode(!darkMode)}>
          <div style={{ width: 22, height: 22, borderRadius: 11, background: 'white',
            position: 'absolute', top: 3, left: darkMode ? 25 : 3, transition: '0.3s' }} />
        </div>
      </div>

      {/* Coach Style */}
      <div className="card">
        <h4>🤖 {t.settings.coachStyle}</h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 8 }}>
          {styleList.map(s => (
            <div key={s.id} className={`date-tab ${coachStyle === s.id ? 'active' : ''}`}
              onClick={() => setCoachStyle(s.id)} style={{ textAlign: 'center', padding: 16 }}>
              <div style={{ fontSize: 28 }}>{s.emoji}</div>
              <div style={{ fontWeight: 600, marginTop: 4 }}>{s.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text-light)', marginTop: 2 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Unlock Progress */}
      <div className="card">
        <h4>🔓 {t.settings.unlockInfo}</h4>
        {isSuperUser && (
          <div style={{ padding: '8px 12px', marginBottom: 8, background: 'var(--primary)', color: 'white', borderRadius: 8, fontSize: 13, fontWeight: 600 }}>
            🦀 Super User — 全部功能已解鎖
          </div>
        )}
        <div style={{ marginTop: 8 }}>
          {[
            { day: 1, label: t.unlock.day1 },
            { day: 3, label: t.unlock.day3 },
            { day: 7, label: t.unlock.day7 },
            { day: 14, label: t.unlock.day14 }
          ].map(u => (
            <div key={u.day} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0' }}>
              <span style={{ width: 24, textAlign: 'center' }}>{(isSuperUser || daysSinceFirstUse >= u.day) ? '✅' : '🔒'}</span>
              <span style={{ flex: 1, fontSize: 14 }}>D{u.day} {u.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* About */}
      <div className="card" onClick={() => navigate('guide')} style={{ cursor: 'pointer' }}>
        <h4>📖 {t.settings.about}</h4>
        <p style={{ fontSize: 13, color: 'var(--text-light)', marginTop: 8 }}>{t.settings.aboutContent}</p>
      </div>

      {/* Data */}
      <div className="card">
        <h4>💾 {t.settings.data}</h4>
        <button className="btn btn-secondary" style={{ marginTop: 8, borderColor: 'var(--er)', color: 'var(--er)' }}
          onClick={handleClearData}>{t.settings.clearData}</button>
      </div>
    </div>
  )
}
