import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import SND from './SND'
import AVBlock from './AVBlock'

export default function Brady() {
  const location = useLocation()
  const [lang, setLang] = useState('en')  // Shared language state

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
        <h1>Bradyarrhythmias</h1>
        
        {/* Single language toggle for the whole page */}
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

        <nav className="section-nav">
          <button onClick={() => scrollToSection('snd')}>
            {lang === 'en' ? 'Sinus Node Dysfunction (SND)' : '竇房結功能異常'}
          </button>
          <button onClick={() => scrollToSection('avblock')}>
            {lang === 'en' ? 'AV Block' : '房室傳導阻滯'}
          </button>
        </nav>
      </div>

      <section id="snd" className="section-wrapper">
        <SND lang={lang} />
      </section>

      <section id="avblock" className="section-wrapper">
        <AVBlock lang={lang} />
      </section>
    </div>
  )
}