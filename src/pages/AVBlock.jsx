import { useState } from 'react'
import data from '../data/avblock.json'
import introImg from '../assets/images/AVBlock-intro.png'
import strategyImg from '../assets/images/AVBlock-treatment-strategy.png'
import classificationImg from '../assets/images/AVBlock-treatment-classification.png'

export default function AVBlock() {
  const [lang, setLang] = useState('zh')  // 'zh' or 'en'

  return (
    <div className="content">
      {/* Language Toggle */}
      <div className="lang-toggle">
        <button 
          className={lang === 'zh' ? 'active' : ''} 
          onClick={() => setLang('zh')}
        >
          中文
        </button>
        <button 
          className={lang === 'en' ? 'active' : ''} 
          onClick={() => setLang('en')}
        >
          English
        </button>
      </div>

      {/* Title */}
      <h2>{data.topic[lang]}</h2>

      {/* Intro Image */}
      <img src={introImg} alt="AV Block Introduction" />

      {/* Definition */}
      <section>
        <h3>{lang === 'zh' ? '定義' : 'Definition'}</h3>
        <p>{data.definition[lang]}</p>
      </section>

      {/* Etiology */}
      <section>
        <h3>{data.etiology[lang]}</h3>
        <ul>
          {data.etiology.causes.map((cause, index) => (
            <li key={index}>
              {cause[lang] || cause.category?.[lang]}
            </li>
          ))}
        </ul>
      </section>

      {/* Classification */}
      <section>
        <h3>{data.classification[lang]}</h3>
        {data.classification.types.map((type) => (
          <div key={type.degree} className="classification-card">
            <h4>{type.name[lang]}</h4>
            <p>{type.description[lang]}</p>
          </div>
        ))}
      </section>

      {/* Treatment */}
      <section>
        <h3>{data.treatment.overview[lang]}</h3>
        <img src={strategyImg} alt="AV Block Treatment Strategy" />
        <img src={classificationImg} alt="AV Block Treatment Classification" />
      </section>
    </div>
  )
}