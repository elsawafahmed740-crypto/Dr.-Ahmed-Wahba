import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getSpecialtyById, getCaseById } from '../components/portfolio/clinicalData'
import { PageHero } from '../components/PageHero'
import { Breadcrumb } from '../components/Breadcrumb'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Expand } from 'lucide-react'
import { specialtyStyles } from '../lib/specialtyStyles'
import { Lightbox } from '../components/Lightbox'

// ─── CasePage ─────────────────────────────────────────────────────────────────
export function CasePage() {
  const { specialtyId, caseId } = useParams()
  const navigate = useNavigate()
  const [active, setActive] = useState(0)
  const [lightboxImages, setLightboxImages] = useState(null)
  const [lightboxStart, setLightboxStart]   = useState(0)

  const specialty = getSpecialtyById(specialtyId)
  const item      = getCaseById(caseId)

  if (!specialty || !item) {
    return (
      <main className="pt-20 min-h-screen flex items-center justify-center bg-[#F8F9FA]">
        <div className="text-center">
          <h1 className="text-4xl font-black text-[#0F2747]">Case Not Found</h1>
          <button onClick={() => navigate('/portfolio')} className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#0F2747] px-6 py-3 font-bold text-white">
            Back to Portfolio
          </button>
        </div>
      </main>
    )
  }

  const tone     = specialtyStyles[specialty.id] || specialtyStyles.restorative
  const timeline = item.timeline || []
  const step     = timeline[active]

  const openLightbox = (imgs, idx = 0) => { setLightboxImages(imgs); setLightboxStart(idx) }
  const closeLightbox = () => setLightboxImages(null)

  // Build timeline images for lightbox
  const timelineImgs = timeline.map((s) => ({ src: s.image, title: `Step ${s.step}: ${s.title}` }))

  return (
    <main className="pt-20 bg-[#F8F9FA] min-h-screen">

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImages && (
          <Lightbox images={lightboxImages} startIndex={lightboxStart} onClose={closeLightbox} />
        )}
      </AnimatePresence>

      <PageHero
        eyebrow={specialty.name}
        title={item.title}
        desc={item.summary}
        gradient={tone.bg}
        stats={[
          [item.duration || '—', 'Duration'],
          [item.visits   || '—', 'Visits'],
          [item.patientAge || '—', 'Patient Age']
        ]}
      />

      <section className="py-12 relative z-10 -mt-8">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="rounded-[2rem] bg-white p-6 md:p-8 shadow-xl shadow-slate-900/5 ring-1 ring-slate-200">
            <Breadcrumb items={[['Home', '/'], ['Portfolio', '/portfolio'], [specialty.name, `/portfolio/${specialty.id}`], ['Case Study']]} />

            {/* ── Metadata grid (only if data exists) ── */}
            {(item.gender || item.treatmentType || item.duration) && (
              <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
                {[
                  item.gender        && ['Patient',   `${item.gender}${item.patientAge ? ', ' + item.patientAge : ''}`],
                  item.treatmentType && ['Treatment',  item.treatmentType],
                  item.duration      && ['Duration',   item.duration],
                  item.visits        && ['Visits',     item.visits],
                  item.materials     && ['Materials',  item.materials],
                  item.technique     && ['Technique',  item.technique],
                ].filter(Boolean).map(([label, value]) => (
                  <div key={label} className="rounded-[1.5rem] bg-slate-50 p-5 ring-1 ring-slate-200/60 shadow-sm">
                    <div className="text-xs font-black uppercase tracking-[0.14em] text-slate-400">{label}</div>
                    <div className="mt-2 text-sm font-bold text-[#0F2747] leading-snug">{value}</div>
                  </div>
                ))}
              </div>
            )}

            {/* ── Clinical cards (only if data exists) ── */}
            {(item.chiefComplaint || item.diagnosis || item.treatmentPlan) && (
              <div className="mt-8 grid gap-6 lg:grid-cols-3">
                {[
                  item.chiefComplaint && ['Chief Complaint', item.chiefComplaint],
                  item.diagnosis      && ['Diagnosis',       item.diagnosis],
                  item.treatmentPlan  && ['Treatment Plan',  item.treatmentPlan],
                ].filter(Boolean).map(([title, text]) => (
                  <div key={title} className="rounded-[1.5rem] bg-white p-6 shadow-md shadow-slate-200/40 ring-1 ring-slate-200">
                    <h3 className="text-xl font-black text-[#0F2747] font-['Space_Grotesk']">{title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-slate-600">{text}</p>
                  </div>
                ))}
              </div>
            )}

            {/* ── Timeline (only if exists) ── */}
            {timeline.length > 0 && (
              <div className="mt-12 rounded-[2rem] bg-white p-6 shadow-lg shadow-slate-200/50 ring-1 ring-slate-200 sm:p-10">
                <h2 className="text-3xl font-black text-[#0F2747] font-['Space_Grotesk']">Treatment Timeline</h2>
                <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">

                  {/* Step list */}
                  <div className="space-y-3">
                    {timeline.map((s, idx) => (
                      <button
                        key={s.step}
                        onClick={() => setActive(idx)}
                        className={`flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-left transition-all duration-300 ${active === idx ? 'bg-[#0F2747] text-white shadow-lg sm:translate-x-2 scale-[1.02] sm:scale-100' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:translate-x-1 ring-1 ring-slate-200/50'}`}
                      >
                        <span className={`font-black text-lg shrink-0 ${active === idx ? 'text-[#C9A84C]' : 'text-slate-400'}`}>
                          {String(s.step).padStart(2, '0')}
                        </span>
                        <span className="text-sm font-bold leading-snug">{s.title}</span>
                      </button>
                    ))}
                  </div>

                  {/* Active step detail */}
                  {step && (
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={active}
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
                        className="overflow-hidden rounded-[2rem] bg-slate-50 ring-1 ring-slate-200 shadow-inner"
                      >
                        {/* Image with lightbox trigger */}
                        <div
                          className="relative group cursor-zoom-in"
                          onClick={() => openLightbox(timelineImgs, active)}
                        >
                          <img
                            src={step.image}
                            alt={step.title}
                            className="w-full h-auto block max-h-[500px] object-contain transition-transform duration-500 group-hover:scale-[1.01]"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-[#0F2747]/0 group-hover:bg-[#0F2747]/40 transition-colors duration-300 rounded-t-[2rem]">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-2">
                              <div className="grid size-12 place-items-center rounded-full bg-white/20 backdrop-blur-sm ring-1 ring-white/30">
                                <Expand size={20} className="text-white" />
                              </div>
                              <span className="text-white font-black text-sm">View Full Image</span>
                            </div>
                          </div>
                          {/* Step counter badge */}
                          <div className="absolute top-4 right-4 rounded-full bg-black/50 backdrop-blur-sm px-3 py-1.5 text-xs font-black text-white ring-1 ring-white/20">
                            {active + 1} / {timeline.length}
                          </div>
                        </div>

                        <div className="p-8">
                          <span className={`inline-block rounded-full px-4 py-1.5 text-xs font-black ring-1 ${tone.chip}`}>
                            Step {step.step} of {timeline.length}
                          </span>
                          <h3 className="mt-5 text-2xl font-black text-[#0F2747] font-['Space_Grotesk']">{step.title}</h3>
                          <p className="mt-4 text-base leading-relaxed text-slate-600">{step.desc}</p>

                          {/* Prev/Next step buttons */}
                          <div className="mt-6 flex flex-col sm:flex-row gap-3">
                            <button
                              disabled={active === 0}
                              onClick={() => setActive(a => a - 1)}
                              className="inline-flex justify-center items-center gap-2 rounded-full border border-slate-200 px-4 py-3 sm:py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-30 transition w-full sm:w-auto"
                            >
                              <ChevronLeft size={16} /> Previous
                            </button>
                            <button
                              disabled={active === timeline.length - 1}
                              onClick={() => setActive(a => a + 1)}
                              className="inline-flex justify-center items-center gap-2 rounded-full border border-slate-200 px-4 py-3 sm:py-2 text-sm font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-30 transition w-full sm:w-auto"
                            >
                              Next <ChevronRight size={16} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  )}
                </div>
              </div>
            )}

            {/* ── Notes ── */}
            {item.notes && (
              <div className="mt-8 rounded-[2rem] bg-gradient-to-br from-[#0F2747] to-[#0a1c33] p-8 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A84C] rounded-full blur-[80px] opacity-20 -translate-y-1/2 translate-x-1/4" />
                <div className="relative z-10">
                  <h3 className="text-2xl font-black font-['Space_Grotesk'] flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-xl bg-white/10 text-xl ring-1 ring-white/20">📝</span>
                    Clinician Notes
                  </h3>
                  <p className="mt-5 text-base leading-relaxed text-white/80 max-w-4xl">{item.notes}</p>
                </div>
              </div>
            )}

            {/* ── Summary card for simple cases (no extra data) ── */}
            {!item.chiefComplaint && !timeline.length && (
              <div className="mt-10 rounded-[2rem] bg-slate-50 p-8 ring-1 ring-slate-200">
                <h3 className="text-2xl font-black text-[#0F2747] font-['Space_Grotesk']">Case Summary</h3>
                <p className="mt-5 text-base leading-8 text-slate-600">{item.summary}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <span className={`rounded-full px-4 py-1.5 text-xs font-black ring-1 ${tone.chip}`}>{item.treatmentType}</span>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>
    </main>
  )
}
