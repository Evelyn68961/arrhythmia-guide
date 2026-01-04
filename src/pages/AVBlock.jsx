import { useState } from 'react'
import data from '../data/avblock.json'
import introImg from '../assets/images/AVBlock-intro.png'
import strategyImg from '../assets/images/AVBlock-treatment-strategy.png'
import classificationImg from '../assets/images/AVBlock-treatment-classification.png'

export default function AVBlock() {
  const [lang, setLang] = useState('zh')
  const [activeTab, setActiveTab] = useState(0)

  const tabs = [
    { label: { en: 'Overview', zh: '概述' }, img: introImg },
    { label: { en: 'Strategy', zh: '治療策略' }, img: strategyImg },
    { label: { en: 'Management', zh: '依分類治療' }, img: classificationImg }
  ]

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

      {/* Section Tabs */}
      <div className="section-tabs">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={activeTab === index ? 'active' : ''}
            onClick={() => setActiveTab(index)}
          >
            {tab.label[lang]}
          </button>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="two-column">
        <div className="column-left">
          <img src={tabs[activeTab].img} alt="AV Block" />
        </div>
        <div className="column-right">
          {/* Tab 0: Overview */}
          {activeTab === 0 && (
            <>
              <h3>{lang === 'zh' ? '定義' : 'Definition'}</h3>
              <p>{data.definition[lang]}</p>

              <h3>{data.etiology[lang]}</h3>
              <ul>
                {data.etiology.causes.map((cause, index) => (
                  <li key={index}>
                    {cause[lang] || cause.category?.[lang]}
                  </li>
                ))}
              </ul>

              <h3>{data.classification[lang]}</h3>
              {data.classification.types.map((type) => (
                <div key={type.degree} >
                  <h4>{type.name[lang]}</h4>
                  <p>{type.description[lang]}</p>
                </div>
              ))}
            </>
          )}

          {/* Tab 1: Strategy */}
          {activeTab === 1 && (
            <>
              <h3>{data.treatment.overview[lang]}</h3>
              <p>{data.treatment.core_approach[lang]}</p>

              <h4>{data.treatment.reversible_causes[lang]}</h4>
              <ul>
                {data.treatment.reversible_causes.items.map((item, index) => (
                  <li key={index}>{item[lang]}</li>
                ))}
              </ul>

              <h4>{data.treatment.pacemaker_decision[lang]}</h4>
              <p>✓ {data.treatment.pacemaker_decision.yes_criteria[lang]}</p>
              <p>✗ {data.treatment.pacemaker_decision.no_criteria[lang]}</p>
            </>
          )}

          {/* Tab 2: Management */}
          {activeTab === 2 && (
            <>
              <h3>{lang === 'zh' ? '依分類治療' : 'Treatment by Classification'}</h3>
              {data.treatment.by_classification.map((item) => (
                <div key={item.degree} >
                  <h4>{item.name[lang]}</h4>
                  {item.management.acute && <p>{item.management.acute[lang]}</p>}
                  {item.management.long_term && <p>{item.management.long_term[lang]}</p>}
                  {item.management.asymptomatic && <p>{item.management.asymptomatic[lang]}</p>}
                  {item.management.symptomatic && <p>{item.management.symptomatic[lang]}</p>}
                  {item.management.hemodynamically_stable && <p>{item.management.hemodynamically_stable[lang]}</p>}
                  {item.management.hemodynamically_unstable && <p>{item.management.hemodynamically_unstable[lang]}</p>}
                  {item.key_point && <p><strong>{item.key_point[lang]}</strong></p>}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}