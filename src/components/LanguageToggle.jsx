import { useEffect } from 'react'

export default function LanguageToggle({ lang, setLang }) {
  useEffect(() => {
    const stored = localStorage.getItem('lang')
    if (stored && (stored === 'en' || stored === 'pl')) setLang(stored)
  }, [setLang])

  const switchTo = (l) => {
    localStorage.setItem('lang', l)
    setLang(l)
  }

  return (
    <div className="inline-flex rounded-lg overflow-hidden border border-gray-200">
      <button
        onClick={() => switchTo('en')}
        className={`px-3 py-1 text-sm ${lang==='en' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
      >EN</button>
      <button
        onClick={() => switchTo('pl')}
        className={`px-3 py-1 text-sm ${lang==='pl' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
      >PL</button>
    </div>
  )
}
