import { useEffect, useState } from 'react'

export default function CheatSheet({ lang }) {
  const [sections, setSections] = useState([])
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    fetch(`${baseUrl}/api/cheats`).then(r => r.json()).then(setSections)
  }, [])

  const filter = ''

  return (
    <div className="space-y-4">
      {sections.map(sec => (
        <div key={sec.key} className="p-4 rounded-lg border bg-white/70">
          <div className="text-lg font-semibold mb-2">{sec.title?.[lang]}</div>
          <ul className="grid gap-2">
            {sec.items.filter(() => true).map((it, idx) => (
              <li key={idx} className="p-2 bg-white rounded border font-mono text-sm">
                {it?.[lang]}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
