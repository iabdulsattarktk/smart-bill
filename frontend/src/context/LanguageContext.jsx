import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    // Load saved language from localStorage
    return localStorage.getItem('smartbill-lang') || 'en'
  })

  useEffect(() => {
    localStorage.setItem('smartbill-lang', lang)
  }, [lang])

  const isUrdu = lang === 'ur'

  const toggleLang = (newLang) => setLang(newLang)

  return (
    <LanguageContext.Provider value={{ lang, isUrdu, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  return useContext(LanguageContext)
}
