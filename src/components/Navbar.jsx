import { BookOpen, Code2, Rocket, ListChecks, Workflow } from 'lucide-react'

export default function Navbar({ lang, onNav }) {
  const t = {
    en: { cheats: 'Cheat Sheet', quizzes: 'Quizzes', projects: 'Projects', automation: 'Automation', getStarted: 'Get started' },
    pl: { cheats: 'Ściąga', quizzes: 'Quizy', projects: 'Projekty', automation: 'Automatyzacja', getStarted: 'Zaczynamy' },
  }[lang]

  const Item = ({ icon: Icon, label, target }) => (
    <button onClick={() => onNav(target)} className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white/70 transition">
      <Icon size={18} />
      <span className="font-medium">{label}</span>
    </button>
  )

  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Rocket className="text-blue-600" />
        <span className="font-semibold">PyMastery</span>
      </div>
      <div className="hidden md:flex items-center gap-2 text-gray-700">
        <Item icon={BookOpen} label={t.cheats} target="cheats" />
        <Item icon={ListChecks} label={t.quizzes} target="quizzes" />
        <Item icon={Code2} label={t.projects} target="projects" />
        <Item icon={Workflow} label={t.automation} target="automation" />
      </div>
    </div>
  )
}
