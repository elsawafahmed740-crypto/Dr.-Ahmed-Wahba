import { useParams, useNavigate } from 'react-router-dom'
import { getSpecialtyById, getCasesBySpecialty } from '../components/portfolio/clinicalData'
import { PageHero } from '../components/PageHero'
import { Breadcrumb } from '../components/Breadcrumb'
import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { ArrowRight, ChevronLeft, Expand } from 'lucide-react'
import { specialtyStyles } from '../lib/specialtyStyles'
import { Lightbox } from '../components/Lightbox'



// ─── Individual Case Row ───────────────────────────────────────────────────────
function CaseRow({ c, index, tone, specialtyId, navigate, onImageClick }) {
  const isEven = index % 2 === 0
  const ref = useRef(null)

  return (
    <div ref={ref} className="relative py-16 sm:py-24 border-b border-slate-100 last:border-0">
      {/* Watermark number */}
      <div className={`absolute top-8 ${isEven ? 'left-4 sm:left-8' : 'right-4 sm:right-8'} text-[6rem] sm:text-[9rem] lg:text-[12rem] font-black leading-none select-none pointer-events-none ${tone.number} opacity-30`}>
        {String(index + 1).padStart(2, '0')}
      </div>

      <div className={`relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16 ${isEven ? '' : 'lg:grid-flow-dense'}`}>

        {/* ── IMAGE ── */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? -60 : 60, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={`relative ${isEven ? '' : 'lg:col-start-2'}`}
        >
          <div
            className="group relative overflow-hidden rounded-[2rem] shadow-2xl shadow-slate-900/15 ring-1 ring-slate-200/60 cursor-zoom-in bg-slate-50"
            onClick={() => onImageClick(index)}
          >
            <img
              src={c.coverImage}
              alt={c.title}
              className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.02]"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-[#0F2747]/0 group-hover:bg-[#0F2747]/50 transition-colors duration-400 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-3 group-hover:translate-y-0 flex flex-col items-center gap-2">
                <div className="grid size-14 place-items-center rounded-full bg-white/20 backdrop-blur-sm ring-1 ring-white/30">
                  <Expand size={22} className="text-white" />
                </div>
                <span className="text-white font-black text-sm">Open Full View</span>
              </div>
            </div>
            {/* Accent dot */}
            <div className={`absolute top-5 ${isEven ? 'right-5' : 'left-5'} w-3 h-3 rounded-full bg-gradient-to-br ${tone.bg} shadow-lg`} />
          </div>

          {/* Floating tag */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className={`absolute -bottom-4 ${isEven ? 'right-6' : 'left-6'} rounded-2xl bg-white px-5 py-3 shadow-xl ring-1 ring-slate-200/60 flex items-center gap-3`}
          >
            <span className={`rounded-full px-3 py-1 text-xs font-black ring-1 ${tone.chip}`}>{c.treatmentType}</span>
            {c.duration && <span className="text-xs font-bold text-slate-400">{c.duration}</span>}
          </motion.div>
        </motion.div>

        {/* ── TEXT ── */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? 60 : -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className={`mt-6 lg:mt-0 ${isEven ? '' : 'lg:col-start-1 lg:row-start-1'}`}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="text-xs font-black uppercase tracking-[0.18em] text-slate-400 mb-4">
              Case {String(index + 1).padStart(2, '0')}
            </div>
            <h3 className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-black text-[#0F2747] leading-tight">
              {c.title}
            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="mt-6"
          >
            <div className="h-1 w-12 rounded-full mb-6" style={{ background: tone.accent }} />
            <p className="text-base sm:text-lg leading-8 text-slate-600">{c.summary}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <button
              onClick={() => onImageClick(index)}
              className="group inline-flex w-full sm:w-auto justify-center items-center gap-3 rounded-full border border-slate-200 px-6 py-4 sm:py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 transition"
            >
              <Expand size={16} /> View Image
            </button>
            <button
              onClick={() => navigate(`/portfolio/${specialtyId}/${c.id}`)}
              className="group inline-flex w-full sm:w-auto justify-center items-center gap-3 rounded-full px-7 py-4 sm:py-3 font-black text-sm text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{ background: `linear-gradient(135deg, ${tone.accent}, #0F2747)` }}
            >
              Full Case
              <span className="grid size-5 place-items-center rounded-full bg-white/20">
                <ArrowRight size={13} />
              </span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

// ─── SpecialtyPage ─────────────────────────────────────────────────────────────
export function SpecialtyPage() {
  const { specialtyId } = useParams()
  const navigate        = useNavigate()
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const specialty = getSpecialtyById(specialtyId)
  const cases     = getCasesBySpecialty(specialtyId)

  if (!specialty) {
    return (
      <main className="pt-20 min-h-screen flex items-center justify-center bg-[#F8F9FA]">
        <div className="text-center">
          <h1 className="text-4xl font-black text-[#0F2747]">Specialty Not Found</h1>
          <button onClick={() => navigate('/portfolio')} className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#0F2747] px-6 py-3 font-bold text-white">
            Back to Portfolio
          </button>
        </div>
      </main>
    )
  }

  const tone = specialtyStyles[specialty.id] || specialtyStyles.restorative

  // Build image list for lightbox
  const lightboxImages = cases.map(c => ({ src: c.coverImage, title: c.title }))

  return (
    <main className="pt-20 bg-[#FAFAFA] min-h-screen">

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={lightboxImages}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}

      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <PageHero
          eyebrow={specialty.icon + ' ' + specialty.name}
          title={specialty.name}
          desc={specialty.desc}
          gradient={tone.bg}
          stats={[
            [specialty.cases, 'Total Cases'],
            [cases.length, 'Documented'],
            ['Clinical', 'Category']
          ]}
        />
      </motion.div>

      <section className="py-12 relative z-10 -mt-8">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">

          {/* Top bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}
            className="rounded-[2rem] bg-white p-6 md:p-8 shadow-xl shadow-slate-900/5 ring-1 ring-slate-200 mb-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <Breadcrumb items={[['Home', '/'], ['Portfolio', '/portfolio'], [specialty.name]]} />
                <div className="mt-4 flex items-center gap-4">
                  <h2 className="font-['Space_Grotesk'] text-3xl font-black text-[#0F2747]">{specialty.name}</h2>
                  <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-500 ring-1 ring-slate-200/50">
                    {cases.length} cases
                  </span>
                </div>
              </div>
              <button
                onClick={() => navigate('/portfolio')}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 transition shrink-0"
              >
                <ChevronLeft size={16} /> All Specialties
              </button>
            </div>
          </motion.div>

          {/* Case rows */}
          <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-900/5 ring-1 ring-slate-200 px-6 sm:px-10 lg:px-16 overflow-hidden">
            {cases.length === 0 ? (
              <div className="py-24 text-center">
                <p className="text-xl text-slate-400 font-semibold">No documented cases yet.</p>
              </div>
            ) : (
              cases.map((c, index) => (
                <CaseRow
                  key={c.id}
                  c={c}
                  index={index}
                  tone={tone}
                  specialtyId={specialty.id}
                  navigate={navigate}
                  onImageClick={setLightboxIndex}
                />
              ))
            )}
          </div>

        </div>
      </section>
    </main>
  )
}
