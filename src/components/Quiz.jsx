import { useEffect, useState } from 'react'

export default function Quiz({ lang }) {
  const [quizzes, setQuizzes] = useState([])
  const [active, setActive] = useState(null)
  const [answers, setAnswers] = useState([])
  const [result, setResult] = useState(null)

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    fetch(`${baseUrl}/api/quizzes`).then(r => r.json()).then(setQuizzes)
  }, [])

  const t = {
    en: { start: 'Start', submit: 'Submit', score: 'Score', of: 'of' },
    pl: { start: 'Start', submit: 'Wyślij', score: 'Wynik', of: 'z' },
  }[lang]

  const openQuiz = (q) => {
    setActive(q)
    setAnswers(new Array(q.questions.length).fill(null))
    setResult(null)
  }

  const choose = (qi, oi) => {
    const next = [...answers]; next[qi] = oi; setAnswers(next)
  }

  const submit = async () => {
    const res = await fetch(`${baseUrl}/api/quizzes/submit`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quiz_slug: active.slug, answers })
    })
    const data = await res.json(); setResult(data)
  }

  if (!active) return (
    <div className="space-y-4">
      {quizzes.map(q => (
        <div key={q.slug} className="p-4 rounded-lg border bg-white/70">
          <div className="font-semibold">{q.title[lang]}</div>
          <p className="text-sm text-gray-600">{q.description?.[lang]}</p>
          <button onClick={() => openQuiz(q)} className="mt-3 px-3 py-1.5 bg-blue-600 text-white rounded">{t.start}</button>
        </div>
      ))}
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold">{active.title[lang]}</div>
        <button onClick={() => setActive(null)} className="text-blue-600">← Back</button>
      </div>
      {active.questions.map((q, qi) => (
        <div key={q.id} className="p-4 rounded-lg border bg-white/70">
          <div className="font-medium mb-2">{q.text[lang]}</div>
          <div className="grid gap-2">
            {q.options.map((opt, oi) => (
              <label key={oi} className={`p-2 rounded border cursor-pointer ${answers[qi]===oi?'border-blue-600 bg-blue-50':''}`}>
                <input type="radio" className="mr-2" name={`q-${qi}`} checked={answers[qi]===oi} onChange={() => choose(qi, oi)} />
                {opt[lang]}
              </label>
            ))}
          </div>
        </div>
      ))}
      <button onClick={submit} className="px-4 py-2 bg-emerald-600 text-white rounded">{t.submit}</button>
      {result && (
        <div className="p-4 rounded border bg-white/70">
          <span className="font-semibold">{t.score}:</span> {result.score} {t.of} {result.total}
        </div>
      )}
    </div>
  )
}
