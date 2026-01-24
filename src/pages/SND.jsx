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
            className={activeTab === 2 && subTab === 0 ? 'active' : ''}
            onClick={() => { setActiveTab(2); setSubTab(0); }}
          >
            {lang === 'en' ? 'Acute Management' : '急性處置'}
          </button>

          {/* Long-term Treatment */}
          <button
            className={activeTab === 2 && subTab === 1 ? 'active' : ''}
            onClick={() => { setActiveTab(2); setSubTab(1); }}
          >
            {lang === 'en' ? 'Long-term Treatment' : '長期治療'}
          </button>
        </div>
      </div>

      {/* Tab 0: Overview */}
      <div className={`tab-content ${activeTab === 0 ? 'active' : ''}`}>
        <div className="two-column">
          {/* Left: Image */}
          <div className="column-left">
            <img src={introImg} alt="SND Introduction" />
          </div>

          {/* Right: Content */}
          <div className="column-right">
            <h3>{lang === 'en' ? 'Definition' : '定義'}</h3>
            <p>{data.definition[lang]}</p>

            {/* Etiology Heading */}
            <h3>{data.etiology[lang]}</h3>

            {/* Intrinsic Causes */}
            <h4>{data.etiology.intrinsic_causes[lang]}</h4>
            <ul>
              {data.etiology.intrinsic_causes.items.map((item, index) => (
                <li key={index}>{item[lang]}</li>
              ))}
            </ul>

            {/* Extrinsic Causes */}
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
        </div>
      </div>

      {/* Tab 1: Classification */}
      <div className={`tab-content ${activeTab === 1 ? 'active' : ''}`}>
        <div className="two-column">
          {/* Left: Image + SubTab buttons */}
          <div className="column-left">
            {subTab === 0 && <img src={classificationImg} alt="SND Classification" />}
            {subTab === 1 && <img src={saBlockImg} alt="SA Exit Block" />}
          </div>

          {/* Right: Content switches based on subTab */}
          <div className="column-right">
            {/* SubTab 0: Classification types */}
            {subTab === 0 && (
              <div>
                <h3>{data.classification[lang]}</h3>
                {/* Loop through types */}
                {data.classification.types.map((type, index) => (
                  <div key={index}>
                    <h4>{type.name[lang]}</h4>
                    <p>{type.definition[lang]}</p>
                  </div>
                ))}
              </div>
            )}

            {/* SubTab 1: SA Exit Block details */}
            {subTab === 1 && (
              <div>
                <h3>{lang === 'en' ? 'SA Exit Block' : '竇房出口阻滯'}</h3>

              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  )
}