import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import CardiacElectro from './CardiacElectro'
import ECGInterpret from './ECGInterpret'
import ArrhyOverview from './ArrhyOverview'


export default function Fundamentals() {
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
        <h1>{lang === 'en' ? 'Fundamentals' : '基礎知識'}</h1>

        <nav className="section-nav">
          <button onClick={() => scrollToSection('cardiac-electro')}>
            {lang === 'en' ? 'Cardiac Electrophysiology' : '心臟電生理學'}
          </button>
          <button onClick={() => scrollToSection('ecg-interpret')}>
            {lang === 'en' ? 'ECG Interpretation' : '心電圖判讀'}
          </button>
          <button onClick={() => scrollToSection('arrhy-overview')}>
            {lang === 'en' ? 'Arrhythmia Overview' : '心律不整概論'}
          </button>
        </nav>
      </div>

      {/* Children no longer need `lang` as a prop — they read it from
          context directly via useLanguage(). */}
      <section id="cardiac-electro" className="section-wrapper">
        <CardiacElectro />
      </section>

      <section id="ecg-interpret" className="section-wrapper">
        <ECGInterpret />
      </section>

      <section id="arrhy-overview" className="section-wrapper">
        <ArrhyOverview />
      </section>
    </div>
  )
}