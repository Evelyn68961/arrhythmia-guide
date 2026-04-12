import { NavLink, Outlet } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

/**
 * FundamentalsLayout — the "layout route" for /fundamentals/*
 *
 * Same structure as TachyLayout/BradyLayout. These entries are educational
 * topics rather than clinical conditions, so the array is named `topics`
 * and the "abbr" column holds a short descriptive word rather than a true
 * medical abbreviation.
 */
export default function FundamentalsLayout() {
  const { lang } = useLanguage()

  const topics = [
    {
      path: 'electrophysiology',
      abbr: 'Electrophysiology',
      full: { en: 'Cardiac Electrophysiology', zh: '心臟電生理學' },
    },
    {
      path: 'ecg',
      abbr: 'ECG',
      full: { en: 'ECG Interpretation', zh: '心電圖判讀' },
    },
    {
      path: 'overview',
      abbr: 'Overview',
      full: { en: 'Arrhythmia Overview', zh: '心律不整概論' },
    },
  ]

  return (
    <div className="sidebar-layout">
      <aside className="condition-sidebar" aria-label={lang === 'en' ? 'Fundamentals topics' : '基礎知識項目'}>
        <h2 className="sidebar-title">
          {lang === 'en' ? 'Fundamentals' : '基礎知識'}
        </h2>
        <nav aria-label={lang === 'en' ? 'Topic navigation' : '項目導覽'}>
          {topics.map((t) => (
            <NavLink key={t.path} to={t.path} className="condition-link">
              <span className="condition-link__abbr">{t.abbr}</span>
              <span className="condition-link__full">{t.full[lang]}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="condition-content">
        <Outlet />
      </div>
    </div>
  )
}
