import { NavLink, Outlet } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

/**
 * TachyLayout — the "layout route" for /tachyarrhythmias/*
 *
 * This component renders the shell: sticky left sidebar + content area.
 * It does NOT render SVT/AF/VT/VF directly. Instead, it renders <Outlet />,
 * which is a placeholder that React Router fills with whichever child route
 * component matches the current URL.
 *
 *   URL                           What <Outlet /> becomes
 *   /tachyarrhythmias/svt   →     <SVT />
 *   /tachyarrhythmias/af    →     <AF />
 *   /tachyarrhythmias/vt    →     <VT />
 *   /tachyarrhythmias/vf    →     <VF />
 *
 * The sidebar stays mounted as the user clicks between conditions — only
 * the thing inside <Outlet /> swaps. That's the whole point of layout routes.
 */
export default function TachyLayout() {
  const { lang } = useLanguage()

  // Each condition has two labels:
  //   - abbr: short, always-single-line primary label (e.g. "SVT")
  //   - full: descriptive secondary label shown smaller beneath
  // This matches how UpToDate/AMBOSS present conditions — clinicians scan
  // for the abbreviation, the full name is there for discoverability.
  const conditions = [
    {
      path: 'svt',
      abbr: 'SVT',
      full: { en: 'Supraventricular Tachycardia', zh: '上心室心搏過速' },
    },
    {
      path: 'af',
      abbr: 'AF',
      full: { en: 'Atrial Fibrillation', zh: '心房顫動' },
    },
    {
      path: 'vt',
      abbr: 'VT',
      full: { en: 'Ventricular Tachycardia', zh: '心室心搏過速' },
    },
    {
      path: 'vf',
      abbr: 'VF',
      full: { en: 'Ventricular Fibrillation', zh: '心室顫動' },
    },
  ]

  return (
    <div className="sidebar-layout">
      <aside className="condition-sidebar">
        <h2 className="sidebar-title">
          {lang === 'en' ? 'Tachyarrhythmias' : '快速心律不整'}
        </h2>
        <nav>
          {conditions.map((c) => (
            // NavLink automatically adds the `active` class when its `to`
            // matches the current URL. No manual activeTab state needed.
            // Using relative paths ("svt", not "/tachyarrhythmias/svt")
            // means this file doesn't care where it's mounted in App.jsx.
            <NavLink key={c.path} to={c.path} className="condition-link">
              <span className="condition-link__abbr">{c.abbr}</span>
              <span className="condition-link__full">{c.full[lang]}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="condition-content">
        {/* The current child route renders here. */}
        <Outlet />
      </div>
    </div>
  )
}
