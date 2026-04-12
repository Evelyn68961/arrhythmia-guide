import { NavLink, Outlet } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

/**
 * BradyLayout — the "layout route" for /bradyarrhythmias/*
 * Same pattern as TachyLayout: sticky sidebar + <Outlet /> for child routes.
 */
export default function BradyLayout() {
  const { lang } = useLanguage()

  const conditions = [
    {
      path: 'snd',
      abbr: 'SND',
      full: { en: 'Sinus Node Dysfunction', zh: '竇房結功能異常' },
    },
    {
      path: 'avblock',
      abbr: 'AV Block',
      full: { en: 'Atrioventricular Block', zh: '房室傳導阻滯' },
    },
  ]

  return (
    <div className="sidebar-layout">
      <aside className="condition-sidebar" aria-label={lang === 'en' ? 'Bradyarrhythmia conditions' : '慢速心律不整項目'}>
        <h2 className="sidebar-title">
          {lang === 'en' ? 'Bradyarrhythmias' : '慢速心律不整'}
        </h2>
        <nav aria-label={lang === 'en' ? 'Condition navigation' : '項目導覽'}>
          {conditions.map((c) => (
            <NavLink key={c.path} to={c.path} className="condition-link">
              <span className="condition-link__abbr">{c.abbr}</span>
              <span className="condition-link__full">{c.full[lang]}</span>
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
