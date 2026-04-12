import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

function highlightAt(text, indices) {
  return text.split('').map((char, i) =>
    indices.includes(i)
      ? <span key={i} className="abbr-letter">{char}</span>
      : char
  )
}

export default function Home() {
  const { lang } = useLanguage()
  const [search, setSearch] = useState('')

  const categories = [
    {
      title: { en: 'Fundamentals', zh: '基礎知識' },
      summary: {
        en: 'Core concepts in cardiac electrophysiology, systematic ECG interpretation, and an overview of arrhythmia mechanisms',
        zh: '心臟電生理學核心概念、系統性心電圖判讀、心律不整機轉概論'
      },
      tabs: [
        { label: { en: 'Cardiac Electrophysiology', zh: '心臟電生理學' }, to: '/fundamentals/electrophysiology', highlight: [] },
        { label: { en: 'ECG Interpretation', zh: '心電圖判讀' }, to: '/fundamentals/ecg', highlight: [0, 1, 2] },
        { label: { en: 'Arrhythmia Overview', zh: '心律不整概論' }, to: '/fundamentals/overview', highlight: [] }
      ]
    },
    {
      title: { en: 'Tachyarrhythmias', zh: '快速心律不整' },
      summary: {
        en: 'Diagnosis and management of fast heart rhythms',
        zh: '快速心律不整的診斷與治療'
      },
      tabs: [
        { label: { en: 'Supraventricular Tachycardia', zh: '上心室心搏過速' }, to: '/tachyarrhythmias/svt', highlight: [0, 5, 17] },
        { label: { en: 'Atrial Fibrillation', zh: '心房顫動' }, to: '/tachyarrhythmias/af', highlight: [0, 7] },
        { label: { en: 'Ventricular Tachycardia', zh: '心室心搏過速' }, to: '/tachyarrhythmias/vt', highlight: [0, 12] },
        { label: { en: 'Ventricular Fibrillation', zh: '心室顫動' }, to: '/tachyarrhythmias/vf', highlight: [0, 12] }
      ]
    },
    {
      title: { en: 'Bradyarrhythmias', zh: '慢速心律不整' },
      summary: {
        en: 'Evaluation and treatment of slow heart rhythms',
        zh: '慢速心律不整的評估與治療'
      },
      tabs: [
        { label: { en: 'Sinus Node Dysfunction', zh: '竇房結功能異常' }, to: '/bradyarrhythmias/snd', highlight: [0, 6, 11] },
        { label: { en: 'AV Block', zh: '房室傳導阻滯' }, to: '/bradyarrhythmias/avblock', highlight: [0, 1] }
      ]
    }
  ]

  const query = search.toLowerCase()
  const filtered = query
    ? categories.filter(cat =>
        cat.title.en.toLowerCase().includes(query) ||
        cat.title.zh.includes(query) ||
        cat.summary.en.toLowerCase().includes(query) ||
        cat.summary.zh.includes(query) ||
        cat.tabs.some(tab =>
          tab.label.en.toLowerCase().includes(query) ||
          tab.label.zh.includes(query)
        )
      )
    : categories

  return (
    <div className="home-page">
      <div className="section-header">
        <h1>{lang === 'en' ? 'Arrhythmia Guide' : '心律不整指南'}</h1>
      </div>

      <div className="home">
        <input
          className="home-search"
          type="text"
          placeholder={lang === 'en' ? 'Search topics...' : '搜尋主題...'}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="home-cards">
          {filtered.map((cat) => (
            <div key={cat.title.en} className="home-card">
              <div className="home-card-header">
                <h2>{cat.title[lang]}</h2>
                <div className="home-card-tabs">
                  {cat.tabs.map((tab) => (
                    <Link key={tab.to} to={tab.to} className="home-tab">
                      {lang === 'en' && tab.highlight.length > 0
                        ? highlightAt(tab.label.en, tab.highlight)
                        : tab.label[lang]}
                    </Link>
                  ))}
                </div>
              </div>
              <p className="card-summary">{cat.summary[lang]}</p>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="no-results">
              {lang === 'en' ? 'No matching topics found.' : '找不到符合的主題。'}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
