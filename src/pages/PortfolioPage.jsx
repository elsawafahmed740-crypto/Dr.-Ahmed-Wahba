import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { SPECIALTIES, CASES } from '../components/portfolio/clinicalData'
import { PageHero } from '../components/PageHero'
import { motion, AnimatePresence } from 'framer-motion'

import { specialtyStyles } from '../lib/specialtyStyles'

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 15 } },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
}

export function PortfolioPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')

  const filteredSpecialties = SPECIALTIES.filter((s) => {
    if (activeFilter !== 'all' && s.id !== activeFilter) return false
    if (search) {
      const q = search.toLowerCase()
      return s.name.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q)
    }
    return true
  })

  const totalCases = SPECIALTIES.reduce((sum, s) => sum + s.cases, 0)

  return (
    <main className="pt-20 bg-[#F8F9FA] min-h-screen relative overflow-hidden">
      
      {/* Decorative Background Shapes removed for performance */}

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* ── Hero Banner ── */}
          <PageHero 
            eyebrow="🦷 Clinical Portfolio" 
            title="Clinical Case Library" 
            desc="A curated collection of real clinical cases demonstrating expertise across 4 dental specialties. Each case is fully documented with examination findings, treatment workflow, and outcomes." 
            stats={[
              [`${totalCases}+`, 'Documented Cases'], 
              [SPECIALTIES.length, 'Specialties'], 
              ['Tanta', 'University'], 
              ['Excellent', 'Academic Grade']
            ]} 
            gradient="from-[#05101f] via-[#0F2747] to-[#122e54]"
          />
        </motion.div>

        <section className="py-12 relative z-20 -mt-8">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            
            {/* ── Search & Filter (Glassmorphism) ── */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="rounded-3xl bg-white/70 backdrop-blur-2xl p-4 shadow-xl shadow-slate-900/5 ring-1 ring-white/80 lg:flex lg:items-center lg:justify-between lg:gap-5 mb-12 relative overflow-hidden"
            >
              {/* Shimmer effect on filter bar */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_3s_infinite]" />
              
              <label className="relative block flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={19} />
                <input 
                  value={search} 
                  onChange={(e) => setSearch(e.target.value)} 
                  placeholder="Search specialties or procedures..." 
                  className="w-full rounded-2xl bg-white/80 py-4 pl-12 pr-4 text-sm font-semibold outline-none ring-1 ring-slate-200/60 focus:ring-[#C9A84C] transition-shadow shadow-sm placeholder:text-slate-400 text-slate-800" 
                />
              </label>
              <div className="mt-4 flex gap-2 overflow-x-auto lg:mt-0 p-2 -mx-2 sm:mx-0 scrollbar-hide relative z-10">
                <button 
                  onClick={() => setActiveFilter('all')} 
                  className={`whitespace-nowrap rounded-full px-5 py-3 text-sm font-bold transition-all duration-300 ${activeFilter === 'all' ? 'bg-gradient-to-r from-[#C9A84C] to-[#b39542] text-white shadow-lg shadow-amber-900/20 scale-105' : 'bg-white text-slate-600 hover:bg-slate-50 ring-1 ring-slate-200/60'}`}
                >
                  All
                </button>
                {SPECIALTIES.map((s) => (
                  <button 
                    key={s.id}
                    onClick={() => setActiveFilter(s.id)} 
                    className={`whitespace-nowrap flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition-all duration-300 ${activeFilter === s.id ? 'bg-[#0F2747] text-white shadow-lg shadow-slate-900/20 scale-105' : 'bg-white text-slate-600 hover:bg-slate-50 ring-1 ring-slate-200/60'}`}
                  >
                    <span>{s.icon}</span> {s.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* ── Specialties Grid ── */}
            <AnimatePresence mode='wait'>
              {filteredSpecialties.length === 0 ? (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="rounded-3xl bg-white p-12 text-center ring-1 ring-slate-200 shadow-sm"
                >
                  <p className="text-lg text-slate-500 font-medium">No specialties match your search. Try a different keyword.</p>
                  <button 
                    className="mt-6 rounded-full bg-[#0F2747] px-6 py-3 font-bold text-white transition hover:bg-[#1E5FA8]" 
                    onClick={() => { setSearch(''); setActiveFilter('all') }}
                  >
                    Clear Search
                  </button>
                </motion.div>
              ) : (
                <motion.div 
                  key="grid"
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="grid gap-6 md:grid-cols-2"
                >
                  <AnimatePresence>
                    {filteredSpecialties.map((spec) => {
                      const caseCount = CASES.filter((c) => c.specialtyId === spec.id).length
                      const tone = specialtyStyles[spec.id] || specialtyStyles.restorative
                      
                      return (
                        <motion.button 
                          layout
                          variants={itemVariants}
                          initial="hidden"
                          animate="show"
                          exit="exit"
                          whileHover={{ y: -8, transition: { duration: 0.2 } }}
                          key={spec.id} 
                          onClick={() => navigate(`/portfolio/${spec.id}`)}
                          role="link"
                          aria-label={`View ${spec.name} portfolio`}
                          className={`group relative overflow-hidden rounded-[2rem] bg-white/95 backdrop-blur-xl p-8 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-200/60 transition-colors ${tone.hoverRing}`}
                        >
                          {/* Animated top gradient border */}
                          <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${tone.bg} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
                          
                          <motion.div 
                            whileHover={{ rotate: [0, -10, 10, -5, 5, 0] }}
                            transition={{ duration: 0.5 }}
                            className={`mx-auto grid size-20 place-items-center rounded-2xl bg-gradient-to-br text-4xl text-white shadow-lg ${tone.bg}`}
                          >
                            {spec.icon}
                          </motion.div>
                          
                          <h2 className="mt-6 font-['Space_Grotesk'] text-2xl font-bold text-[#0F2747] transition-colors group-hover:text-blue-900">{spec.name}</h2>
                          <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-slate-500">{spec.desc}</p>
                          
                          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                            <span className={`rounded-full px-4 py-1.5 text-xs font-black ring-1 ${tone.chip}`}>{spec.cases} total cases</span>
                            {caseCount > 0 && (
                              <span className={`rounded-full px-4 py-1.5 text-xs font-black ring-1 bg-slate-50 text-[#0F2747] ring-slate-200 group-hover:bg-[#0F2747] group-hover:text-white transition-colors duration-300 shadow-sm`}>
                                {caseCount} documented
                              </span>
                            )}
                          </div>
                        </motion.button>
                      )
                    })}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Philosophy Banner ── */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mt-16 overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#0F2747] to-[#0a1c33] p-6 sm:p-10 text-white shadow-2xl relative"
            >
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 right-0 w-80 h-80 bg-[#C9A84C] rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"
              />
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
                <motion.div 
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  className="grid size-16 shrink-0 place-items-center rounded-2xl bg-white/10 text-3xl shadow-inner ring-1 ring-white/20 backdrop-blur-sm"
                >
                  💡
                </motion.div>
                <div>
                  <h3 className="font-['Space_Grotesk'] text-2xl font-bold">Clinical Documentation Philosophy</h3>
                  <p className="mt-3 text-white/70 leading-relaxed max-w-3xl">
                    Every case in this library is documented with standardized intraoral photography, periapical radiographs, 
                    detailed treatment notes, and outcomes measured against established clinical benchmarks. 
                    Quality over quantity — only cases with complete records are included.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </section>
      </div>
    </main>
  )
}
