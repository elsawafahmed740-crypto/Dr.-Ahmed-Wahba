import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Breadcrumb({ items }) {
  return (
    <nav className="flex items-center gap-2 overflow-x-auto whitespace-nowrap text-sm font-semibold text-slate-500 pb-2 sm:pb-0 scrollbar-hide">
      {items.map(([label, path], i) => (
        <div key={label} className="flex items-center gap-2">
          {i > 0 && <ChevronRight size={14} className="text-slate-300" />}
          {path ? (
            <Link to={path} className="transition hover:text-[#1E5FA8]">{label}</Link>
          ) : (
            <span className="text-[#0F2747]">{label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}
