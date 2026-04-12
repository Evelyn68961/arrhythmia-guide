import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

export default function NotFound() {
  const { lang } = useLanguage()

  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>{lang === 'en' ? 'Page Not Found' : '找不到頁面'}</h2>
      <p>
        {lang === 'en'
          ? 'The page you are looking for does not exist or has been moved.'
          : '您尋找的頁面不存在或已被移動。'}
      </p>
      <Link to="/" className="not-found-link">
        {lang === 'en' ? 'Back to Home' : '返回首頁'}
      </Link>
    </div>
  )
}
