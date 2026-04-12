import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

export default function Navbar() {
  const { lang, setLang } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="main-nav" role="navigation" aria-label={lang === 'en' ? 'Main navigation' : '主導覽列'}>
      <button
        className={`hamburger ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
      >
        <span />
        <span />
        <span />
      </button>

      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <NavLink to="/" onClick={() => setMenuOpen(false)}>
          {lang === 'en' ? 'Home' : '首頁'}
        </NavLink>
        <NavLink to="/fundamentals" onClick={() => setMenuOpen(false)}>
          {lang === 'en' ? 'Fundamentals' : '基礎知識'}
        </NavLink>
        <NavLink to="/tachyarrhythmias" onClick={() => setMenuOpen(false)}>
          {lang === 'en' ? 'Tachyarrhythmias' : '快速心律不整'}
        </NavLink>
        <NavLink to="/bradyarrhythmias" onClick={() => setMenuOpen(false)}>
          {lang === 'en' ? 'Bradyarrhythmias' : '慢速心律不整'}
        </NavLink>
      </div>

      <div className="lang-toggle" role="group" aria-label={lang === 'en' ? 'Language selection' : '語言選擇'}>
        <button
          className={lang === 'en' ? 'active' : ''}
          onClick={() => setLang('en')}
          aria-pressed={lang === 'en'}
        >
          Eng
        </button>
        <button
          className={lang === 'zh' ? 'active' : ''}
          onClick={() => setLang('zh')}
          aria-pressed={lang === 'zh'}
        >
          中文
        </button>
      </div>
    </nav>
  )
}
