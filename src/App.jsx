import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from './components/Navbar'
import LanguageToggle from './components/LanguageToggle'
import Quiz from './components/Quiz'
import CheatSheet from './components/CheatSheet'
import Projects from './components/Projects'

function App() {
  const [lang, setLang] = useState('en')
  const [tab, setTab] = useState('cheats')
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [seeded, setSeeded] = useState(false)

  useEffect(() => {
    fetch(`${baseUrl}/api/quizzes`).then(async r => {
      if (r.ok) {
        const data = await r.json();
        if (!Array.isArray(data) || data.length === 0) {
          await fetch(`${baseUrl}/api/seed`, { method: 'POST' })
          setSeeded(true)
        }
      }
    }).catch(() => {})
  }, [])

  const t = {
    en: {
      heroTitle: 'Master Python with interactive cheat sheets, quizzes and real projects',
      heroSubtitle: 'Learn in English or Polish. Practice automation, data, web, and testing with hands-on tasks.',
    },
    pl: {
      heroTitle: 'Opanuj Pythona dzięki interaktywnym ściągom, quizom i prawdziwym projektom',
      heroSubtitle: 'Ucz się po angielsku lub po polsku. Ćwicz automatyzację, dane, web i testy na praktycznych zadaniach.',
    }
  }[lang]

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-sky-50 to-emerald-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <Navbar lang={lang} onNav={setTab} />
          <LanguageToggle lang={lang} setLang={setLang} />
        </div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl p-8 bg-white/70 border shadow-sm mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{t.heroTitle}</h1>
          <p className="text-gray-600">{t.heroSubtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            {tab === 'cheats' && <CheatSheet lang={lang} />}
            {tab === 'quizzes' && <Quiz lang={lang} />}
            {tab === 'projects' && <Projects lang={lang} />}
            {tab === 'automation' && <Projects lang={lang} />}
          </div>
          <aside className="space-y-4">
            <div className="p-4 rounded-xl bg-white/70 border">
              <div className="font-semibold mb-2">{lang==='en'?'Automation ideas':'Pomyśły na automatyzację'}</div>
              <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
                <li>{lang==='en'?'Bulk rename files with pathlib':'Masowa zmiana nazw plików z pathlib'}</li>
                <li>{lang==='en'?'Email CSV report via SMTP':'Wysyłka raportu CSV przez SMTP'}</li>
                <li>{lang==='en'?'Scrape and monitor prices':'Skrobanie i monitoring cen'}</li>
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-white/70 border">
              <div className="font-semibold mb-2">{lang==='en'?'Tips':'Wskazówki'}</div>
              <ul className="list-disc ml-5 text-sm text-gray-700 space-y-1">
                <li>{lang==='en'?'Use virtualenv and requirements.txt':'Używaj virtualenv i requirements.txt'}</li>
                <li>{lang==='en'?'Format with black, lint with ruff':'Formatuj black, lintuj ruff'}</li>
                <li>{lang==='en'?'Automate with cron/Task Scheduler':'Automatyzuj cron/Planer zadań'}</li>
              </ul>
            </div>
          </aside>
        </div>

        {seeded && (
          <div className="mt-6 text-sm text-gray-600">Seeded starter content.</div>
        )}
      </div>
    </div>
  )
}

export default App
