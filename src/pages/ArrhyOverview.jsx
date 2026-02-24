import { useState } from 'react'
import data from '../data/arrhythmia_overview.json'
// Import your images
import introImg from '../assets/images/arrhy-intro.png'
import classImg from '../assets/images/arrhy-class.png'
import managementImg from '../assets/images/arrhy-management.png'

export default function ArrhyOverview({ lang }) {
  const [activeTab, setActiveTab] = useState(0)

  const tabs = [
    { label: { en: 'Overview', zh: '概述' }, img: introImg },
    { label: { en: 'Classification', zh: '分類' }, img: classImg },
    { label: { en: 'Management', zh: '處置原則' }, img: managementImg }
  ]

  return (
    <div className="content">

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
            <img src={introImg} alt="Overview" />
          </div>
          <div className={`tab-content ${activeTab === 1 ? 'active' : ''}`}>
            <img src={classImg} alt="Classification" />
          </div>
          <div className={`tab-content ${activeTab === 2 ? 'active' : ''}`}>
            <img src={managementImg} alt="Management" />
          </div>
          <div className="references">
            <h4>{lang === 'en' ? 'References' : '參考資料'}</h4>
            <ul>
              <li>
                <a href="https://www.heart.org/en/health-topics/arrhythmia" target="_blank" rel="noopener noreferrer">
                  AHA - Arrhythmia
                </a>
              </li>
              <li>
                <a href="https://www.ncbi.nlm.nih.gov/books/NBK558923/" target="_blank" rel="noopener noreferrer">
                  NCBI - Cardiac Arrhythmias
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="column-right">
          {/* Tab 0: Overview */}
          <div className={`tab-content ${activeTab === 0 ? 'active' : ''}`}>
            
            {/* Intro */}
            <h3>{data.normal_vs_arrhythmia.title[lang]}</h3>
            <p>{data.definition[lang]}</p>
            
            <h4>{data.normal_vs_arrhythmia.normal_heart[lang]}</h4>
            <ul>
              {data.normal_vs_arrhythmia.normal_heart.characteristics.map((item, index) => (
                <li key={index}>{item[lang]}</li>
              ))}
            </ul>
            
            <h4>{data.normal_vs_arrhythmia.arrhythmia[lang]}</h4>
            <ul>
              {data.normal_vs_arrhythmia.arrhythmia.characteristics.map((item, index) => (
                <li key={index}>{item[lang]}</li>
              ))}
            </ul>
            
            <h5>{data.normal_vs_arrhythmia.arrhythmia.example_af[lang]}</h5>
            <p>{data.normal_vs_arrhythmia.arrhythmia.example_af.description[lang]}</p>
            <hr />

            {/* Clinical Presentation */}
            <h3>{data.clinical_presentation.title[lang]}</h3>
            
            <h4>{data.clinical_presentation.symptoms[lang]}</h4>
            {data.clinical_presentation.symptoms.items.map((item, index) => (
              <div key={index}>
                <h5>{item.symptom[lang]}</h5>
                <p>{item.description[lang]}</p>
              </div>
            ))}
            
            <h4>{data.clinical_presentation.serious_presentations[lang]}</h4>
            {data.clinical_presentation.serious_presentations.items.map((item, index) => (
              <div key={index}>
                <h5>{item.presentation[lang]}</h5>
                <p>{item.features[lang]}</p>
              </div>
            ))}
            
            <h4>{data.clinical_presentation.asymptomatic[lang]}</h4>
            <p>{data.clinical_presentation.asymptomatic.description[lang]}</p>
            <hr />

            {/* Etiology */}
            <h3>{data.etiology.title[lang]}</h3>
            {data.etiology.categories.map((cat, index) => (
              <div key={index}>
                <h5>{cat.category[lang]}</h5>
                <ul>
                  {cat.causes.map((cause, causeIndex) => (
                    <li key={causeIndex}>{cause[lang]}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Tab 1: Classification */}
          <div className={`tab-content ${activeTab === 1 ? 'active' : ''}`}>
            <h3>{data.classification.title[lang]}</h3>
            
            {/* By Rate */}
            <h4>{data.classification.by_rate[lang]}</h4>
            {data.classification.by_rate.categories.map((cat, index) => (
              <div key={index}>
                <h5>{cat.category[lang]}</h5>
                <ul>
                  {cat.examples.map((ex, exIndex) => (
                    <li key={exIndex}>{ex[lang]}</li>
                  ))}
                </ul>
              </div>
            ))}
            <hr />

            {/* By Origin */}
            <h4>{data.classification.by_origin[lang]}</h4>
            {data.classification.by_origin.categories.map((cat, index) => (
              <div key={index}>
                <h5>{cat.category[lang]}</h5>
                <p><strong>{lang === 'en' ? 'QRS Width' : 'QRS 寬度'}:</strong> {cat.qrs_width[lang]}</p>
                <ul>
                  {cat.examples.map((ex, exIndex) => (
                    <li key={exIndex}>{ex[lang]}</li>
                  ))}
                </ul>
              </div>
            ))}
            <hr />

            {/* By Mechanism */}
            <h4>{data.classification.by_mechanism[lang]}</h4>
            {data.classification.by_mechanism.mechanisms.map((mech, index) => (
              <div key={index}>
                <h5>{mech.mechanism[lang]}</h5>
                <p>{mech.description[lang]}</p>
                
                {/* Requirements (for Reentry) */}
                {mech.requirements && (
                  <ul>
                    {mech.requirements.map((req, reqIndex) => (
                      <li key={reqIndex}>{req[lang]}</li>
                    ))}
                  </ul>
                )}

                {/* Subtypes (for Triggered Activity) */}
                {mech.subtypes && (
                  <>
                    {mech.subtypes.map((sub, subIndex) => (
                      <div key={subIndex}>
                        <h6>{sub.type[lang]}</h6>
                        <p><strong>{lang === 'en' ? 'Phase' : '相位'}:</strong> {sub.phase[lang]}</p>
                        <p><strong>{lang === 'en' ? 'Cause' : '原因'}:</strong> {sub.cause[lang]}</p>
                        <p><strong>{lang === 'en' ? 'Example' : '範例'}:</strong> {sub.example[lang]}</p>
                      </div>
                    ))}
                  </>
                )}

                {mech.examples && !mech.subtypes && (
                  <p><strong>{lang === 'en' ? 'Examples' : '範例'}:</strong> {mech.examples[lang]}</p>
                )}
              </div>
            ))}
          </div>

          {/* Tab 2: Management Principles */}
          <div className={`tab-content ${activeTab === 2 ? 'active' : ''}`}>
            <h3>{data.management_principles.title[lang]}</h3>
            
            {/* Diagnostic Approach */}
            <h4>{data.diagnostic_approach.title[lang]}</h4>
            {data.diagnostic_approach.modalities.map((mod, index) => (
              <div key={index}>
                <h5>{mod.modality[lang]}</h5>
                <p>{mod.role[lang]}</p>
              </div>
            ))}
            <hr />

            {/* Acute Management */}
            <h4>{data.management_principles.acute_management[lang]}</h4>
            {data.management_principles.acute_management.steps.map((step, index) => (
              <div key={index}>
                <h5>{lang === 'en' ? 'Step' : '步驟'} {step.step}: {step.action[lang]}</h5>
                <p>{step.details[lang]}</p>
              </div>
            ))}
            <hr />

            {/* Long-term Management */}
            <h4>{data.management_principles.long_term_management[lang]}</h4>
            {data.management_principles.long_term_management.components.map((comp, index) => (
              <div key={index}>
                <h5>{comp.component[lang]}</h5>
                <p>{comp.details[lang]}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}