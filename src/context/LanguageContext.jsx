import { createContext, useContext, useEffect, useState } from 'react'

// 1. Create the "shelf" — a Context object. It has no value yet; it's just
//    the identifier that Provider and useContext will refer to.
const LanguageContext = createContext(null)

// 2. Provider component — owns the single source of truth for `lang` and
//    makes it available to every descendant via the Context.
//
//    `children` is whatever JSX this component wraps around in App.jsx.
//    All of those children (Navbar, Routes, pages, leaf components) can
//    then read the value we put on the shelf.
export function LanguageProvider({ children }) {
  // Lazy initializer: on first render, read from localStorage so the user's
  // choice survives a page refresh. Falls back to 'en' if nothing is stored.
  const [lang, setLang] = useState(
    () => localStorage.getItem('lang') || 'en'
  )

  // Persist any future changes back to localStorage.
  useEffect(() => {
    localStorage.setItem('lang', lang)
  }, [lang])

  // The `value` object is what every consumer will receive from useContext.
  // We expose both the current language and the setter, because the Navbar
  // toggle needs to change it while everything else just reads it.
  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

// 3. Custom hook — a tiny convenience wrapper around useContext.
//    Components can do `const { lang } = useLanguage()` instead of importing
//    both useContext and LanguageContext every time.
//
//    The safety check throws a clear error if someone accidentally calls
//    this outside of <LanguageProvider>, instead of a cryptic "cannot
//    destructure property 'lang' of null" crash.
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === null) {
    throw new Error('useLanguage must be used inside <LanguageProvider>')
  }
  return context
}
