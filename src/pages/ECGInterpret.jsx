import { useState } from 'react'
import data from '../data/ecg_interpretation.json'
import wavesImg from '../assets/images/ecg-waves.png'
import intervalsImg  from '../assets/images/ecg-intervals.png'
import systematicImg from '../assets/images/ecg-systematic.png'
import tachyImg from '../assets/images/ecg-tachy.png'
import bradyImg from '../assets/images/ecg-brady.png'

export default function ECGInterpret({ lang }) {
  const [activeTab, setActiveTab] = useState(0)

  const tabs = [
    { label: { en: 'Waves & Segments', zh: '波形與節段' }, img: wavesImg },
    { label: { en: 'Key Intervals', zh: '關鍵間期' }, img: intervalsImg },
    { label: { en: 'Systematic Approach', zh: '系統性判讀' }, img: systematicImg },
    { label: { en: 'Tachyarrhythmias', zh: '心搏過速' }, img: tachyImg },
    { label: { en: 'Bradyarrhythmias', zh: '心搏過緩' }, img: bradyImg }
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
            <img src={wavesImg} alt="ECG Components" />
          </div>
          <div className={`tab-content ${activeTab === 1 ? 'active' : ''}`}>
            <img src={intervalsImg} alt="ECG Components" />
          </div>
          <div className={`tab-content ${activeTab === 2 ? 'active' : ''}`}>
            <img src={systematicImg} alt="Systematic ECG Reading" />
          </div>
          <div className={`tab-content ${activeTab === 3 ? 'active' : ''}`}>
            <img src={tachyImg} alt="Tachyarrhythmia Recognition" />
          </div>
          <div className={`tab-content ${activeTab === 4 ? 'active' : ''}`}>
            <img src={bradyImg} alt="Bradyarrhythmia Recognition" />
          </div>
          <div className="references">
            <h4>{lang === 'en' ? 'References' : '參考資料'}</h4>
            <ul>
              <li>
                <a href="https://litfl.com/ecg-library/" target="_blank" rel="noopener noreferrer">
                  LITFL - ECG Library
                </a>
              </li>
              <li>
                <a href="https://www.aclsmedicaltraining.com/basics-of-ecg/" target="_blank" rel="noopener noreferrer">
                  ACLS - Basics of ECG
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="column-right">
          {/* Tab 0: Waves & Segments */}
          <div className={`tab-content ${activeTab === 0 ? 'active' : ''}`}>
            <h3>{data.basic_ecg_components.title[lang]}</h3>
            <p>{data.overview[lang]}</p>
            <hr />

            <h4>{data.basic_ecg_components.waves_and_segments[lang]}</h4>
            {data.basic_ecg_components.waves_and_segments.components.map((item, index) => (
              <div key={index}>
                <h5>{item.component[lang]}</h5>
                <p><strong>{lang === 'en' ? 'Represents' : '代表'}:</strong> {item.represents[lang]}</p>
                {item.normal_characteristics && (
                  <p><strong>{lang === 'en' ? 'Normal' : '正常值'}:</strong> {item.normal_characteristics[lang]}</p>
                )}
                <p><strong>{lang === 'en' ? 'Clinical Relevance' : '臨床意義'}:</strong> {item.clinical_relevance[lang]}</p>
              </div>
            ))}
          </div>

          {/* Tab 1: Key Intervals */}
          <div className={`tab-content ${activeTab === 1 ? 'active' : ''}`}>
            <h3>{data.basic_ecg_components.title[lang]}</h3>
            <p>{data.overview[lang]}</p>
            <hr />

            <h4>{data.basic_ecg_components.key_intervals[lang]}</h4>
            {data.basic_ecg_components.key_intervals.intervals.map((item, index) => (
              <div key={index}>
                <h5>{item.interval[lang]}</h5>
                <p><strong>{lang === 'en' ? 'Measures' : '測量'}:</strong> {item.measures[lang]}</p>
                <p><strong>{lang === 'en' ? 'Normal Value' : '正常值'}:</strong> {item.normal_value[lang]}</p>
                {item.calculation && (
                  <p><strong>{lang === 'en' ? 'Calculation' : '計算'}:</strong> {item.calculation[lang]}</p>
                )}
                {item.prolonged_by && (
                  <p><strong>{lang === 'en' ? 'Prolonged By' : '延長因素'}:</strong> {item.prolonged_by[lang]}</p>
                )}
                <p><strong>{lang === 'en' ? 'Clinical Consequence' : '臨床影響'}:</strong> {item.clinical_consequence[lang]}</p>
              </div>
            ))}
          </div>

          {/* Tab 2: Systematic ECG Interpretation (R-R-P-Q-I) */}
          <div className={`tab-content ${activeTab === 2 ? 'active' : ''}`}>
            <h3>{data.systematic_ecg_interpretation.title[lang]}</h3>
            <p>{data.systematic_ecg_interpretation.description[lang]}</p>
            <hr />

            {data.systematic_ecg_interpretation.steps.map((step, index) => (
              <div key={index}>
                <h4>{step.name[lang]}</h4>

                {/* Step 1: Calculate Rate — has methods[] + interpretation */}
                {step.methods && (
                  <>
                    {step.methods.map((m, mIndex) => (
                      <div key={mIndex}>
                        <h5>{m.method[lang]}</h5>
                        <p>{m.technique[lang]}</p>
                        {m.quick_reference && (
                          <p><strong>{lang === 'en' ? 'Quick Reference' : '快速參考'}:</strong> {m.quick_reference[lang]}</p>
                        )}
                      </div>
                    ))}
                    {step.interpretation && (
                      <div>
                        <h5>{lang === 'en' ? 'Interpretation' : '判讀'}</h5>
                        <ul>
                          {Object.entries(step.interpretation).map(([key, val]) => (
                            <li key={key}><strong>{key}:</strong> {val[lang]}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                )}

                {/* Step 2: Assess Rhythm — has technique + interpretations[] */}
                {step.technique && !step.methods && (
                  <p><strong>{lang === 'en' ? 'Technique' : '技巧'}:</strong> {step.technique[lang]}</p>
                )}
                {step.interpretations && (
                  <>
                    {step.interpretations.map((interp, iIndex) => (
                      <div key={iIndex}>
                        <h5>{interp.finding[lang]}</h5>
                        <p>{interp.description[lang]}</p>
                        {interp.common_rhythms && (
                          <p><strong>{lang === 'en' ? 'Common Rhythms' : '常見節律'}:</strong> {interp.common_rhythms[lang]}</p>
                        )}
                        {interp.think && (
                          <p><strong>{interp.think[lang]}</strong></p>
                        )}
                      </div>
                    ))}
                  </>
                )}

                {/* Step 3: Examine P Waves — has questions[] */}
                {step.questions && (
                  <>
                    {step.questions.map((q, qIndex) => (
                      <div key={qIndex}>
                        <h5>{q.question[lang]}</h5>
                        <p>{q.assessment[lang]}</p>
                        <p><strong>{lang === 'en' ? 'Interpretation' : '判讀'}:</strong> {q.interpretation[lang]}</p>
                      </div>
                    ))}
                  </>
                )}

                {/* Step 4: QRS Width — has categories[] */}
                {step.categories && (
                  <>
                    {step.categories.map((cat, catIndex) => (
                      <div key={catIndex}>
                        <h5>{cat.finding[lang]}</h5>
                        <p>{cat.interpretation[lang]}</p>
                        {cat.clinical_rule && (
                          <p><strong>{lang === 'en' ? 'Clinical Rule' : '臨床規則'}:</strong> {cat.clinical_rule[lang]}</p>
                        )}
                      </div>
                    ))}
                  </>
                )}

                {/* Step 5: Measure Intervals — has intervals[] */}
                {step.intervals && (
                  <>
                    {step.intervals.map((intv, intIndex) => (
                      <div key={intIndex}>
                        <h5>{intv.interval[lang]}</h5>
                        <p><strong>{lang === 'en' ? 'Measures' : '測量'}:</strong> {intv.measures[lang]}</p>
                        <p><strong>{lang === 'en' ? 'Assess For' : '評估'}:</strong> {intv.assess_for[lang]}</p>
                      </div>
                    ))}
                  </>
                )}

                <hr />
              </div>
            ))}
          </div>

          {/* Tab 3: Tachyarrhythmia Recognition */}
          <div className={`tab-content ${activeTab === 3 ? 'active' : ''}`}>
            <h3>{data.tachyarrhythmia_recognition.title[lang]}</h3>
            
            <table>
              <thead>
                <tr>
                  <th>{lang === 'en' ? 'ECG Finding' : 'ECG 表現'}</th>
                  <th>{lang === 'en' ? 'Likely Arrhythmia' : '可能心律不整'}</th>
                  <th>{lang === 'en' ? 'Key Features' : '關鍵特徵'}</th>
                </tr>
              </thead>
              <tbody>
                {data.tachyarrhythmia_recognition.classification_table.map((row, index) => (
                  <tr key={index}>
                    <td>{row.ecg_finding[lang]}</td>
                    <td>{row.likely_arrhythmia[lang]}</td>
                    <td>{row.key_features[lang]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tab 4: Bradyarrhythmia Recognition */}
          <div className={`tab-content ${activeTab === 4 ? 'active' : ''}`}>
            <h3>{data.bradyarrhythmia_recognition.title[lang]}</h3>
            
            <table>
              <thead>
                <tr>
                  <th>{lang === 'en' ? 'ECG Finding' : 'ECG 表現'}</th>
                  <th>{lang === 'en' ? 'Likely Arrhythmia' : '可能心律不整'}</th>
                  <th>{lang === 'en' ? 'Key Features' : '關鍵特徵'}</th>
                </tr>
              </thead>
              <tbody>
                {data.bradyarrhythmia_recognition.classification_table.map((row, index) => (
                  <tr key={index}>
                    <td>{row.ecg_finding[lang]}</td>
                    <td>{row.likely_arrhythmia[lang]}</td>
                    <td>{row.key_features[lang]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  )
}
