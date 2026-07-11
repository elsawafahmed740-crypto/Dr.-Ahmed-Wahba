/**
 * Per-specialty colour tokens used across PortfolioPage, SpecialtyPage, and CasePage.
 * Single source of truth — import from here instead of duplicating per file.
 */
export const specialtyStyles = {
  restorative: {
    chip:      'bg-blue-50 text-blue-700 ring-blue-100',
    bg:        'from-blue-600 to-sky-500',
    border:    'border-blue-200',
    text:      'text-blue-700',
    hoverRing: 'hover:ring-blue-400',
    accent:    '#1E5FA8',
    number:    'text-blue-200',
  },
  endodontics: {
    chip:      'bg-slate-100 text-slate-700 ring-slate-200',
    bg:        'from-slate-800 to-blue-900',
    border:    'border-slate-200',
    text:      'text-slate-700',
    hoverRing: 'hover:ring-slate-400',
    accent:    '#334155',
    number:    'text-slate-200',
  },
  prosthodontics: {
    chip:      'bg-amber-50 text-amber-700 ring-amber-100',
    bg:        'from-amber-500 to-yellow-600',
    border:    'border-amber-200',
    text:      'text-amber-700',
    hoverRing: 'hover:ring-amber-400',
    accent:    '#C9A84C',
    number:    'text-amber-200',
  },
  periodontology: {
    chip:      'bg-emerald-50 text-emerald-700 ring-emerald-100',
    bg:        'from-emerald-700 to-teal-600',
    border:    'border-emerald-200',
    text:      'text-emerald-700',
    hoverRing: 'hover:ring-emerald-400',
    accent:    '#2D6A4F',
    number:    'text-emerald-200',
  },
}
