import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import data from '../data/avblock.json'
import introImg from '../assets/images/AVBlock-intro.png'
import strategyImg from '../assets/images/AVBlock-treatment-strategy.png'
import classificationImg from '../assets/images/AVBlock-treatment-classification.png'

export default function AVBlock() {
  const { lang } = useLanguage()
  const [activeTab, setActiveTab] = useState(0)

  const tabs = [
    { label: { en: 'Overview', zh: '概述' }, img: introImg },
    { label: { en: 'Strategy', zh: '治療策略' }, img: strategyImg },
    { label: { en: 'Management', zh: '依分類治療' }, img: classificationImg }
  ]

  return (
    <div className="content">

      {/* Title + tabs in one row */}
      <div className="content-header">
        <h2>{data.topic[lang]}</h2>

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
      </div>

      {/* Two Column Layout */}
      <div className="two-column">
        <div className="column-left">
          <div className={`tab-content ${activeTab === 0 ? 'active' : ''}`}>
            <img src={introImg} alt="AV Block Overview" />
          </div>
          <div className={`tab-content ${activeTab === 1 ? 'active' : ''}`}>
            <img src={strategyImg} alt="AV Block Strategy" />
          </div>
          <div className={`tab-content ${activeTab === 2 ? 'active' : ''}`}>
            <img src={classificationImg} alt="AV Block Management" />
          </div>
          <div className="references">
            <h4>{lang === 'en' ? 'References' : '參考資料'}</h4>
            <ul>
              <li>
                <a href="https://www.msdmanuals.com/professional/cardiovascular-disorders/specific-cardiac-arrhythmias/atrioventricular-block" target="_blank" rel="noopener noreferrer">
                  MSD Manual - Atrioventricular Block
                </a>
              </li>
              <li>
                <a href="https://www.ncbi.nlm.nih.gov/books/NBK459147/" target="_blank" rel="noopener noreferrer">
                  NCBI - Atrioventricular Block
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="column-right">
          {/* Tab 0: Overview */}
          <div className={`tab-content ${activeTab === 0 ? 'active' : ''}`}>
              <h4>{lang === 'zh' ? '定義' : 'Definition'}</h4>
              <p>{data.definition[lang]}</p>
              <br />

              <h4>{data.etiology[lang]}</h4>
              <ul>
                {data.etiology.causes.map((cause, index) => (
                  <li key={index}>
                    {cause[lang] || cause.category?.[lang]}
                  </li>
                ))}
              </ul>
              <br />

              <h4>{data.classification[lang]}</h4>
              {data.classification.types.map((type) => (
                <div key={type.degree} className="drug-card">
                  <div className="drug-name">{type.name[lang]}</div>
                  <dl className="detail-grid">
                    <dt>{lang === 'en' ? 'Description' : '描述'}</dt>
                    <dd>{type.description[lang]}</dd>
                  </dl>
                </div>
              ))}
          </div>

          {/* Tab 1: Strategy */}
          <div className={`tab-content ${activeTab === 1 ? 'active' : ''}`}>
          
              <h3>{data.treatment.overview[lang]}</h3>
              <p>{data.treatment.core_approach[lang]}</p>
              <br />
              <h4>{data.treatment.reversible_causes[lang]}</h4>
              <ul>
                {data.treatment.reversible_causes.items.map((item, index) => (
                  <li key={index}>{item[lang]}</li>
                ))}
              </ul>
              <br />

              <h4>{data.treatment.pacemaker_decision[lang]}</h4>
              <table className="info-table">
                <thead>
                  <tr>
                    <th>✓ {lang === 'en' ? 'Yes' : '需要'}</th>
                    <th>✗ {lang === 'en' ? 'No' : '不需要'}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{data.treatment.pacemaker_decision.yes_criteria[lang]}</td>
                    <td>{data.treatment.pacemaker_decision.no_criteria[lang]}</td>
                  </tr>
                </tbody>
              </table>
          </div>

          {/* Tab 2: Management */}
          <div className={`tab-content ${activeTab === 2 ? 'active' : ''}`}>
              <h4 className="major-section">{lang === 'zh' ? '依分類治療' : 'Treatment by Classification'}</h4>
              {data.treatment.by_classification.map((item) => (
                <div key={item.degree} className="drug-card">
                  <div className="drug-name">{item.name[lang]}</div>
                  <dl className="detail-grid">
                    {item.management.acute && (
                      <>
                        <dt>{lang === 'en' ? 'Acute' : '急性處置'}</dt>
                        <dd>{item.management.acute[lang]}</dd>
                      </>
                    )}
                    {item.management.long_term && (
                      <>
                        <dt>{lang === 'en' ? 'Long-term' : '長期處置'}</dt>
                        <dd>{item.management.long_term[lang]}</dd>
                      </>
                    )}
                    {item.management.asymptomatic && (
                      <>
                        <dt>{lang === 'en' ? 'Asymptomatic' : '無症狀'}</dt>
                        <dd>{item.management.asymptomatic[lang]}</dd>
                      </>
                    )}
                    {item.management.symptomatic && (
                      <>
                        <dt>{lang === 'en' ? 'Symptomatic' : '有症狀'}</dt>
                        <dd>{item.management.symptomatic[lang]}</dd>
                      </>
                    )}
                    {item.management.hemodynamically_stable && (
                      <>
                        <dt>{lang === 'en' ? 'Stable' : '穩定'}</dt>
                        <dd>{item.management.hemodynamically_stable[lang]}</dd>
                      </>
                    )}
                    {item.management.hemodynamically_unstable && (
                      <>
                        <dt>{lang === 'en' ? 'Unstable' : '不穩定'}</dt>
                        <dd>{item.management.hemodynamically_unstable[lang]}</dd>
                      </>
                    )}
                    {item.key_point && (
                      <>
                        <dt className="caution">{lang === 'en' ? 'Key Point' : '重點'}</dt>
                        <dd className="caution">{item.key_point[lang]}</dd>
                      </>
                    )}
                  </dl>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}