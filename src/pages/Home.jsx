import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

export default function Home() {
  // Read lang from the shared context. No local useState, no setLang here —
  // Home never changes the language, it only displays translated content.
  const { lang } = useLanguage()

  return (
    <div className="home-page">
      <div className="section-header">
        <h1>{lang === 'en' ? 'Arrhythmia Guide' : '心律不整指南'}</h1>
      </div>

      <div className="home">
        <p>{lang === 'en' 
          ? 'A comprehensive bilingual reference for cardiac arrhythmias' 
          : '心律不整的雙語參考指南'}</p>

        <div className="home-cards">
          <Link to="/fundamentals" className="home-card">
            <h2>{lang === 'en' ? 'Fundamentals' : '基礎知識'}</h2>
            <p className="card-summary">
              {lang === 'en' 
                ? 'Core concepts in cardiac electrophysiology, systematic ECG interpretation, and an overview of arrhythmia mechanisms' 
                : '心臟電生理學核心概念、系統性心電圖判讀、心律不整機轉概論'}
            </p>
            <div className="card-details">
              <ul>
                <li>{lang === 'en' ? 'Cardiac Electrophysiology' : '心臟電生理學'}</li>
                <li>{lang === 'en' ? 'ECG Interpretation' : '心電圖判讀'}</li>
                <li>{lang === 'en' ? 'Arrhythmia Overview' : '心律不整概論'}</li>
              </ul>
            </div>
          </Link>

          <Link to="/tachyarrhythmias" className="home-card">
            <h2>{lang === 'en' ? 'Tachyarrhythmias' : '快速心律不整'}</h2>
            <p className="card-summary">
              {lang === 'en' 
                ? 'Diagnosis and management of fast heart rhythms — SVT, atrial fibrillation, ventricular tachycardia, and ventricular fibrillation' 
                : '快速心律不整的診斷與治療 — 上心室心搏過速、心房顫動、心室心搏過速、心室顫動'}
            </p>
            <div className="card-details">
              <ul>
                <li>{lang === 'en' ? 'Supraventricular Tachycardia (SVT)' : '上心室心搏過速'}</li>
                <li>{lang === 'en' ? 'Atrial Fibrillation (AF)' : '心房顫動'}</li>
                <li>{lang === 'en' ? 'Ventricular Tachycardia (VT)' : '心室心搏過速'}</li>
                <li>{lang === 'en' ? 'Ventricular Fibrillation (VF)' : '心室顫動'}</li>
              </ul>
            </div>
          </Link>

          <Link to="/bradyarrhythmias" className="home-card">
            <h2>{lang === 'en' ? 'Bradyarrhythmias' : '慢速心律不整'}</h2>
            <p className="card-summary">
              {lang === 'en' 
                ? 'Evaluation and treatment of slow heart rhythms — sinus node dysfunction and AV conduction block' 
                : '慢速心律不整的評估與治療 — 竇房結功能異常與房室傳導阻滯'}
            </p>
            <div className="card-details">
              <ul>
                <li>{lang === 'en' ? 'Sinus Node Dysfunction (SND)' : '竇房結功能異常'}</li>
                <li>{lang === 'en' ? 'AV Block' : '房室傳導阻滯'}</li>
              </ul>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}