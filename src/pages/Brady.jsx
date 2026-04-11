import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import SND from './SND'
import AVBlock from './AVBlock'

export default function Brady() {
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
        <h1>{lang === 'en' ? 'Bradyarrhythmias' : '慢速心律不整'}</h1>

        <nav className="section-nav">
          <button onClick={() => scrollToSection('snd')}>
            {lang === 'en' ? 'Sinus Node Dysfunction (SND)' : '竇房結功能異常'}
          </button>
          <button onClick={() => scrollToSection('avblock')}>
            {lang === 'en' ? 'AV Block' : '房室傳導阻滯'}
          </button>
        </nav>
      </div>

      {/* Children read `lang` from context directly — no prop-drilling. */}
      <section id="snd" className="section-wrapper">
        <SND />
      </section>

      <section id="avblock" className="section-wrapper">
        <AVBlock />
      </section>
    </div>
  )
}