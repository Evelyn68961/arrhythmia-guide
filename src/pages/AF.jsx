import { useState } from 'react'
import data from '../data/af.json'
import introImg from '../assets/images/AF-intro.png'
import classImg from '../assets/images/AF-clinc-class.png'
import treatImg from '../assets/images/AF-treat.png'

export default function AF() {
  const [lang, setLang] = useState('en')
  const [activeTab, setActiveTab] = useState(0)

  const tabs = [
    { label: { en: 'Overview', zh: '概述' }, img: introImg },
    { label: { en: 'Clinical Profile', zh: '臨床表徵 & 分類' }, img: classImg },
    { label: { en: 'Management', zh: '治療策略' }, img: treatImg },
  ]

  return (
        <div className="content">
          {/* Language Toggle */}
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
              <div className={`tab-content ${activeTab === 0 ? 'active' : ''}`}>
                <img src={introImg} alt="AF Overview" />
              </div>
              <div className={`tab-content ${activeTab === 1 ? 'active' : ''}`}>
                <img src={classImg} alt="AF Clinical Profile" />
              </div>
              <div className={`tab-content ${activeTab === 2 ? 'active' : ''}`}>
                <img src={treatImg} alt="AF Treatment" />
              </div>
              <div className="references">
                <h4>{lang === 'en' ? 'References' : '參考資料'}</h4>
                <ul>
                  <li>
                    <a href="https://www.msdmanuals.com/professional/cardiovascular-disorders/specific-cardiac-arrhythmias/atrial-fibrillation" target="_blank" rel="noopener noreferrer">
                      MSD Manual - Atrial Fibrillation
                    </a>
                  </li>
                  <li>
                    <a href="https://www.ncbi.nlm.nih.gov/books/NBK526072/" target="_blank" rel="noopener noreferrer">
                      NCBI - Atrial Fibrillation
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="column-right">
              {/* Tab 0: Overview */}
              <div className={`tab-content ${activeTab === 0 ? 'active' : ''}`}>
                <h3>{data.topic[lang]}</h3>
                <p>{data.definition[lang]}</p>
                <hr />
                <h4>{data.ecg_characteristics[lang]}</h4>
                <h5>{data.ecg_characteristics.hallmarks[lang]}</h5>
                <ul>
                  {data.ecg_characteristics.hallmarks.items.map((s, index) => (
                    <li key={index}>
                      {s[lang]}
                    </li>
                  ))}
                </ul> 
                <h5>{data.ecg_characteristics.ventricular_rate.title[lang]}</h5>
                <p>{data.ecg_characteristics.ventricular_rate.content[lang]}</p>
                <h5>{data.ecg_characteristics.fibrillatory_waves[lang]}</h5>
                {data.ecg_characteristics.fibrillatory_waves.types.map((item) => (
                  <div key={item.type} >
                    <h5>{item.name[lang]}</h5>
                    <p>{item.description[lang]}</p>
                  </div>
                ))}
                <hr />
                <h4>{data.pathophysiology[lang]}</h4>
                <h5>{data.pathophysiology.triggers[lang]}</h5>
                <p>{data.pathophysiology.triggers.description[lang]}</p>
                <h6>{data.pathophysiology.triggers.pulmonary_veins[lang]}</h6>
                <p>{data.pathophysiology.triggers.pulmonary_veins.description[lang]}</p>
                <h6>{data.pathophysiology.triggers.other_sites[lang]}</h6>
                <ul>
                  {data.pathophysiology.triggers.other_sites.items.map((s, index) => (
                    <li key={index}>
                      {s[lang]}
                    </li>
                  ))}
                </ul> 
                <h5>{data.pathophysiology.substrate[lang]}</h5>
                <h6>{data.pathophysiology.substrate.structural_remodeling[lang]}</h6>
                <p>{data.pathophysiology.substrate.structural_remodeling.description[lang]}</p>
                <h6>{data.pathophysiology.substrate.electrical_remodeling[lang]}</h6>
                <p>{data.pathophysiology.substrate.electrical_remodeling.description[lang]}</p>
                <h5>{data.pathophysiology.modulators[lang]}</h5>
                <h6>{data.pathophysiology.modulators.autonomic[lang]}</h6>
                <p>{data.pathophysiology.modulators.autonomic.description[lang]}</p>
                <h6>{data.pathophysiology.modulators.ganglionated_plexi[lang]}</h6>
                <p>{data.pathophysiology.modulators.ganglionated_plexi.description[lang]}</p>
              </div>

              {/* Tab 1: Clinical Profile */}
              <div className={`tab-content ${activeTab === 1 ? 'active' : ''}`}>
                <h3>{data.clinical_presentation[lang]}</h3>
                <h4>{data.clinical_presentation.asymptomatic[lang]}</h4>
                <p>{data.clinical_presentation.asymptomatic.description[lang]}</p>
                <h4>{data.clinical_presentation.symptoms[lang]}</h4>
                <ul>
                  {data.clinical_presentation.symptoms.items.map((s, index) => (
                    <li key={index}>
                      {s[lang]}
                    </li>
                  ))}
                </ul> 
                <h4>{data.clinical_presentation.serious_presentations[lang]}</h4>
                <ul>
                  {data.clinical_presentation.serious_presentations.items.map((s, index) => (
                    <li key={index}>
                      {s[lang]}
                    </li>
                  ))}
                </ul> 
                <hr />
                <h3>{data.classification[lang]}</h3>
                <p>{data.classification.staging_overview[lang]}</p>
                <h4>{data.classification.stages[lang]}</h4>

              </div>



            </div>
          </div>
        </div>
      )           
}
