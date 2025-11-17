import { useEffect, useState } from 'react'

export default function Projects({ lang }) {
  const [projects, setProjects] = useState([])
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    fetch(`${baseUrl}/api/projects`).then(r => r.json()).then(setProjects)
  }, [])

  const t = {
    en: { steps: 'Steps', difficulty: 'Difficulty', category: 'Category' },
    pl: { steps: 'Kroki', difficulty: 'Poziom', category: 'Kategoria' },
  }[lang]

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {projects.map(p => (
        <div key={p.slug} className="p-4 rounded-lg border bg-white/70">
          <div className="text-lg font-semibold">{p.title?.[lang]}</div>
          <p className="text-gray-600 text-sm mb-3">{p.summary?.[lang]}</p>
          <div className="text-xs text-gray-700 mb-2">{t.difficulty}: {p.difficulty} • {t.category}: {p.category}</div>
          <ol className="list-decimal ml-5 text-sm space-y-1">
            {p.steps.map((s, i) => (<li key={i}>{s?.[lang]}</li>))}
          </ol>
        </div>
      ))}
    </div>
  )
}
