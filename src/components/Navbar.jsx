import { NavLink } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

export default function Navbar() {
  // Pull both the current language and the setter from context.
  // This is the ONLY place in the app that calls setLang — everywhere else
  // just reads `lang`.
  const { lang, setLang } = useLanguage()

  return (
    <nav className="main-nav">
      <div className="nav-links">
        <NavLink to="/">{lang === 'en' ? 'Home' : '首頁'}</NavLink>
        <NavLink to="/fundamentals">
          {lang === 'en' ? 'Fundamentals' : '基礎知識'}
        </NavLink>
        <NavLink to="/tachyarrhythmias">
          {lang === 'en' ? 'Tachyarrhythmias' : '快速心律不整'}
        </NavLink>
        <NavLink to="/bradyarrhythmias">
          {lang === 'en' ? 'Bradyarrhythmias' : '慢速心律不整'}
        </NavLink>
      </div>

      {/* Global language toggle — single source of truth */}
      <div className="lang-toggle">
        <button
          className={lang === 'en' ? 'active' : ''}
          onClick={() => setLang('en')}
        >
          Eng
        </button>
        <button
          className={lang === 'zh' ? 'active' : ''}
          onClick={() => setLang('zh')}
        >
          中文
        </button>
      </div>
    </nav>
  )
}
