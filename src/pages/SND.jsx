import { useState } from 'react'
import data from '../data/snd.json'
import introImg from '../assets/images/SND-intro.png'
import classificationImg from '../assets/images/SND-classification.png'
import saBlockImg from '../assets/images/SND-extra-SAblock.png'
import acuteImg from '../assets/images/SND-acute-management.png'
import longtermImg from '../assets/images/SND-longterm-treatment.png'

export default function SND() {

  const [lang, setLang] = useState('en')
  const [activeTab, setActiveTab] = useState(0)
  const [subTab, setSubTab] = useState(0)

  // Main tabs definition
  const tabs = [
    { label: { en: 'Overview', zh: '概述' } },
    { label: { en: 'Classification', zh: '分類' } },
    { label: { en: 'Treatment', zh: '治療' } }
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

      {/* Tabs Row */}
      <div className="tabs-row">
        <div className="section-tabs">
          {/* Overview */}
          <button
            className={activeTab === 0 ? 'active' : ''}
            onClick={() => { setActiveTab(0); setSubTab(0); }}
          >
            {lang === 'en' ? 'Overview' : '概述'}
          </button>

          {/* Classification */}
          <button
            className={activeTab === 1 && subTab === 0 ? 'active' : ''}
            onClick={() => { setActiveTab(1); setSubTab(0); }}
          >
            {lang === 'en' ? 'Classification' : '分類'}
          </button>

          {/* SA Exit Block - only show when Tab 1 is active */}
          {activeTab === 1 && (
            <button
              className={subTab === 1 ? 'active' : ''}
              onClick={() => setSubTab(1)}
            >
              {lang === 'en' ? 'SA Block (more info)' : '竇房出口阻滯'}
            </button>
          )}

          {/* Acute Management */}
          <button
            className={activeTab === 2 ? 'active' : ''}
            onClick={() => { setActiveTab(2); setSubTab(0); }}
          >
            {lang === 'en' ? 'Acute Management' : '急性處置'}
          </button>

          {/* Long-term Treatment */}
          <button
            className={activeTab === 3 ? 'active' : ''}
            onClick={() => { setActiveTab(3); setSubTab(0); }}
          >
            {lang === 'en' ? 'Long-term Treatment' : '長期治療'}
          </button>
        </div>
      </div>
      
      {/* Two Column Layout */}
      <div className="two-column">
        {/* LEFT COLUMN - All Images */}
        <div className="column-left">
          <div className={`tab-content ${activeTab === 0 ? 'active' : ''}`}>
            <img src={introImg} alt="SND Introduction" />
          </div>

          <div className={`tab-content ${activeTab === 1 ? 'active' : ''}`}>
            {subTab === 0 && <img src={classificationImg} alt="SND Classification" />}
            {subTab === 1 && <img src={saBlockImg} alt="SA Exit Block" />}
          </div>

          <div className={`tab-content ${activeTab === 2 ? 'active' : ''}`}>
            <img src={acuteImg} alt="Acute Management" />
          </div>

          <div className={`tab-content ${activeTab === 3 ? 'active' : ''}`}>
            <img src={longtermImg} alt="Long-term Treatment" />
          </div>
        </div>

        {/* RIGHT COLUMN - All Text Content */}
        <div className="column-right">
          {/* Tab 0: Overview */}
          <div className={`tab-content ${activeTab === 0 ? 'active' : ''}`}>
            <h3>{lang === 'en' ? 'Definition' : '定義'}</h3>
            <p>{data.definition[lang]}</p>

            <h3>{data.etiology[lang]}</h3>

            <h4>{data.etiology.intrinsic_causes[lang]}</h4>
            <ul>
              {data.etiology.intrinsic_causes.items.map((item, index) => (
                <li key={index}>{item[lang]}</li>
              ))}
            </ul>

            <h4>{data.etiology.extrinsic_causes[lang]}</h4>
            {data.etiology.extrinsic_causes.items.map((group, index) => (
              <div key={index}>
                <h5>{group.category[lang]}</h5>
                <ul>
                  {group.items.map((item, itemIndex) => (
                    <li key={itemIndex}>{item[lang]}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Tab 1: Classification */}
          <div className={`tab-content ${activeTab === 1 ? 'active' : ''}`}>
            {subTab === 0 && (
              <div>
                <h3>{data.classification[lang]}</h3>
                {data.classification.types.map((type, index) => (
                  <div key={index}>
                    <h4>{type.name[lang]}</h4>
                    <p>{type.definition[lang]}</p>
                  </div>
                ))}
              </div>
            )}

            {subTab === 1 && (
              <div>
                <h3>{lang === 'en' ? 'SA Exit Block' : '竇房出口阻滯'}</h3>
                {data.classification.types
                  .filter(type => type.subtypes)
                  .map((type, index) => (
                    <div key={index}>
                      {type.subtypes.map((sub, subIndex) => (
                        <div key={subIndex} style={{ marginBottom: '1rem' }}>
                          <h4>{sub.name[lang]}</h4>
                          <p>{sub.description[lang]}</p>
                        </div>
                      ))}
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* Tab 2: Acute Management */}
          <div className={`tab-content ${activeTab === 2 ? 'active' : ''}`}>
            <h3>{data.treatment.acute_management.reversible_causes[lang]}</h3>
            <ul>
              {data.treatment.acute_management.reversible_causes.items.map((item, index) => (
                <li key={index}>{item[lang]}</li>
              ))}
            </ul>

            <h3>{data.treatment.acute_management.pharmacotherapy[lang]}</h3>
            <ul>
              {data.treatment.acute_management.pharmacotherapy.agents.map((agent, index) => (
                <li key={index}>
                  <strong>{agent.agent}</strong>: {agent.dose[lang]} — {agent.notes[lang]}
                </li>
              ))}
            </ul>

            <h3>{data.treatment.acute_management.temporary_pacing[lang]}</h3>
            <p><strong>{lang === 'en' ? 'Indications:' : '適應症：'}</strong></p>
            <ul>
              {data.treatment.acute_management.temporary_pacing.indications.map((item, index) => (
                <li key={index}>{item[lang]}</li>
              ))}
            </ul>
          </div>

          {/* Tab 3: Long-term Treatment */}
          <div className={`tab-content ${activeTab === 3 ? 'active' : ''}`}>
            <h3>{data.treatment.long_term_management[lang]}</h3>

            <h4>{data.treatment.long_term_management.discontinue_offending_agents[lang]}</h4>
            <ul>
              {data.treatment.long_term_management.discontinue_offending_agents.agents.map((item, index) => (
                <li key={index}>{item[lang]}</li>
              ))}
            </ul>

            <h4>{data.treatment.long_term_management.tachy_brady_management[lang]}</h4>
            <ol>
              {data.treatment.long_term_management.tachy_brady_management.steps.map((step, index) => (
                <li key={index}>{step[lang]}</li>
              ))}
            </ol>

            <h4>{data.treatment.long_term_management.anticoagulation[lang]}</h4>
            <ul>
              {data.treatment.long_term_management.anticoagulation.items.map((item, index) => (
                <li key={index}>{item[lang]}</li>
              ))}
            </ul>

            <h3>{data.treatment.pacemaker_decision[lang]}</h3>
            <p>✔ <strong>{lang === 'en' ? 'Yes:' : '需要：'}</strong> {data.treatment.pacemaker_decision.yes_criteria[lang]}</p>
            <p>✗ <strong>{lang === 'en' ? 'No:' : '不需要：'}</strong> {data.treatment.pacemaker_decision.no_criteria[lang]}</p>
          </div>
        </div>
      </div>
    </div>
  )
}