import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import SVT from './SVT'
import AF from './AF'
import VT from './VT'
import VF from './VF'

export default function Tachy() {
  const location = useLocation()
  // Read shared language from context instead of owning local state.
  const { lang } = useLanguage()

  // Scroll to section when hash exists on page load
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [location.hash])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      window.history.pushState(null, '', `#${id}`)
    }
  }

  return (
    <div>
      <div className="section-header">
        <h1>{lang === 'en' ? 'Tachyarrhythmias' : '快速心律不整'}</h1>

        <nav className="section-nav">
          <button onClick={() => scrollToSection('svt')}>
            {lang === 'en' ? 'Supraventricular Tachycardia (SVT)' : '上心室心搏過速'}
          </button>
          <button onClick={() => scrollToSection('af')}>
            {lang === 'en' ? 'Atrial Fibrillation (AF)' : '心房顫動'}
          </button>
          <button onClick={() => scrollToSection('vt')}>
            {lang === 'en' ? 'Ventricular Tachycardia (VT)' : '心室心搏過速'}
          </button>
          <button onClick={() => scrollToSection('vf')}>
            {lang === 'en' ? 'Ventricular Fibrillation (VF)' : '心室顫動'}
          </button>
        </nav>
      </div>

      {/* Children read `lang` from context directly — no prop-drilling. */}
      <section id="svt" className="section-wrapper">
        <SVT />
      </section>

      <section id="af" className="section-wrapper">
        <AF />
      </section>

      <section id="vt" className="section-wrapper">
        <VT />
      </section>

      <section id="vf" className="section-wrapper">
        <VF />
      </section>
    </div>
  )
}
