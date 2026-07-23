import { useState } from 'react'
import { Hero } from '../components/Hero'
import {
  ArrowRight,
  GraduationCap,
  Microscope,
  ShieldCheck,
  Stethoscope,
  Check,
  MapPin,
  Phone,
  Send,
  Mail,
  MessageCircle,
  Camera,
  HeartPulse,
  Globe2,
} from 'lucide-react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
}

function Section({ id, tint = 'bg-white', children }) {
  return (
    <section id={id} className={`${tint} scroll-mt-24 py-20 sm:py-28 overflow-hidden`}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">{children}</div>
    </section>
  )
}

function SectionTitle({ title, subtitle }) {
  // Avoid mutating the array: use slice instead of pop
  const words    = typeof title === 'string' ? title.split(' ') : []
  const lastWord = words[words.length - 1]
  const rest     = words.slice(0, -1).join(' ')

  return (
    <motion.div 
      variants={fadeInUp} 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true, amount: 0.3 }}
      className="mx-auto mb-16 max-w-3xl text-center"
    >
      <h2 className="font-['Space_Grotesk'] text-4xl font-black text-[#0F2747] sm:text-5xl">
        {typeof title === 'string' ? (
          <>
            {rest} <span className="bg-gradient-to-r from-[#1E5FA8] to-[#C9A84C] bg-clip-text text-transparent">{lastWord}</span>
          </>
        ) : (
          title
        )}
      </h2>
      <div className="mx-auto mt-6 h-1.5 w-24 rounded-full bg-gradient-to-r from-[#1E5FA8] to-[#C9A84C]" />
      {subtitle && <p className="mt-6 text-base leading-7 text-slate-500">{subtitle}</p>}
    </motion.div>
  )
}

function AboutSection() {
  const items = [
    { title: 'Tanta University', desc: 'Dental Intern', icon: GraduationCap, tone: 'from-[#1E5FA8] to-blue-400' },
    { title: 'Restorative & Esthetic', desc: 'Clinical Focus', icon: Stethoscope, tone: 'from-[#C9A84C] to-yellow-400' },
    { title: 'Intraoral Photography', desc: 'High-Quality Documentation', icon: Camera, tone: 'from-purple-600 to-fuchsia-500' },
    { title: 'Rubber Dam Isolation', desc: 'Advanced Protocols', icon: ShieldCheck, tone: 'from-emerald-500 to-teal-400' },
  ]
  return (
    <Section id="about" tint="bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          
          {/* Left Column: Visual Composition */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative sm:h-[600px] w-full mb-10 sm:mb-0 flex justify-center sm:block"
          >
            {/* Background decorative blobs */}
            <div className="absolute -left-10 -top-10 h-72 w-72 rounded-full bg-blue-100/60 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -right-10 h-72 w-72 rounded-full bg-amber-100/40 blur-3xl pointer-events-none" />
            
            <img src="/dental-tools.png" alt="Dental clinical setup" className="hidden sm:block absolute left-0 top-0 h-[45%] w-[25%] sm:h-[35%] sm:w-[30%] lg:h-[35%] lg:w-[50%] rounded-[2rem] object-cover shadow-2xl ring-8 ring-white transition-transform duration-700 hover:scale-[1.02] z-0" />
            
            <img src="/about.jpg" alt="Dr. Ahmed Wahba with patient" className="relative sm:absolute sm:bottom-0 sm:right-0 h-[400px] sm:h-[85%] lg:h-[80%] w-full max-w-[400px] sm:max-w-none sm:w-[75%] rounded-[2rem] object-cover object-center shadow-2xl ring-8 ring-white z-10 transition-transform duration-700 hover:scale-[1.02]" />
            
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5, type: 'spring' }}
              className="absolute -bottom-6 left-4 sm:left-auto sm:bottom-[15%] sm:-left-2 z-20 flex flex-col items-center justify-center rounded-2xl bg-[#0F2747] px-7 py-6 text-center text-white shadow-2xl shadow-[#0F2747]/40 ring-4 ring-white"
            >
              <div className="font-['Space_Grotesk'] text-4xl font-black text-[#C9A84C]">Intern</div>
              <div className="mt-1 text-xs font-bold uppercase tracking-[0.25em] text-white/80">Tanta Univ.</div>
            </motion.div>
          </motion.div>

          {/* Right Column: Text and Cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col justify-center"
          >
            <motion.div variants={fadeInUp} className="mb-8">
              <h2 className="font-['Space_Grotesk'] text-4xl font-black text-[#0F2747] sm:text-5xl lg:text-[2.75rem] leading-[1.15]">
                Crafting <span className="bg-gradient-to-r from-[#1E5FA8] to-[#C9A84C] bg-clip-text text-transparent">Smiles</span> with Precision & Artistry.
              </h2>
              <div className="mt-6 h-1.5 w-24 rounded-full bg-gradient-to-r from-[#1E5FA8] to-[#C9A84C]" />
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-5 text-lg leading-relaxed text-slate-600">
              <p>
                I am a Dental Intern at the Faculty of Dentistry, Tanta University, specializing in high-precision restorative and esthetic dentistry. My approach combines clinical dedication with meticulous photographic documentation to capture every detail of the restorative process.
              </p>
              <p>
                This clinical portfolio documents my professional journey, showcasing advanced rubber dam isolation protocols, complex restorative cases, and predictable esthetic results.
              </p>
            </motion.div>

            <motion.div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2" variants={staggerContainer}>
              {items.map((item) => (
                <motion.div 
                  key={item.title} 
                  variants={fadeInUp} 
                  className="group relative flex items-start gap-4 rounded-3xl bg-[#F8F9FA] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:bg-white hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:ring-1 hover:ring-slate-100"
                >
                  <div className={`grid size-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${item.tone} text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3`}>
                    <item.icon size={24} />
                  </div>
                  <div className="pt-1">
                    <h3 className="font-['Space_Grotesk'] text-lg font-bold text-[#0F2747] leading-tight transition-colors group-hover:text-[#1E5FA8]">{item.title}</h3>
                    <p className="mt-1.5 text-sm font-semibold text-slate-500">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
        </div>
      </div>
    </Section>
  )
}

function EducationSection() {
  const education = [
    {
      date: 'Present',
      title: 'Dental Intern',
      place: 'Faculty of Dentistry, Tanta University',
      desc: 'Serving as a Dental Intern, running rotations and performing clinical procedures under supervisory faculty guidelines.',
      icon: Stethoscope,
    },
  ]
  return (
    <Section id="education" tint="bg-[#F8F9FA]">
      <SectionTitle 
        title="Education & Qualifications" 
        subtitle="Academic training at the Faculty of Dentistry, Tanta University, graduating with distinction."
      />
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto max-w-4xl"
      >
        <div className="relative pl-8 sm:pl-40">
          {/* Vertical Timeline Gradient Line */}
          <div className="absolute left-[14px] top-2 bottom-2 w-1 rounded-full bg-gradient-to-b from-[#1E5FA8] via-[#C9A84C] to-transparent sm:left-[63px] opacity-30" />
          
          <div className="space-y-8 sm:space-y-12">
            {education.map((item, idx) => (
              <motion.div key={idx} variants={fadeInUp} className="relative group">
                {/* Glowing Node */}
                <div className="absolute -left-[22px] sm:-left-[101px] top-[70px] sm:top-[56px] h-3 w-3 rounded-full bg-[#1E5FA8] shadow-[0_0_15px_rgba(30,95,168,0.8)] ring-4 ring-[#F8F9FA] group-hover:bg-[#C9A84C] group-hover:shadow-[0_0_15px_rgba(201,168,76,0.8)] transition-colors duration-300" />
                
                {/* Timeline Node Date Badge (Desktop) */}
                <div className="absolute -left-40 top-12 w-28 text-right hidden sm:block">
                  <span className="inline-block rounded-full bg-gradient-to-r from-[#0F2747] to-[#1E5FA8] px-4 py-1.5 text-xs font-bold text-white shadow-md">
                    {item.date}
                  </span>
                </div>

                {/* Content Card */}
                <div className="ml-2 sm:ml-0 rounded-[1.5rem] sm:rounded-[2rem] bg-white p-5 sm:p-8 shadow-sm ring-1 ring-slate-100 transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] group-hover:ring-slate-200">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
                    <div className="flex items-center justify-between sm:hidden mb-1">
                      {/* Date Badge on Mobile */}
                      <span className="inline-block rounded-full bg-gradient-to-r from-[#0F2747] to-[#1E5FA8] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                        {item.date}
                      </span>
                    </div>

                    <div className="grid size-12 sm:size-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-blue-50 to-slate-50 text-[#1E5FA8] shadow-inner group-hover:from-[#1E5FA8] group-hover:to-blue-400 group-hover:text-white transition-all duration-300">
                      <item.icon size={24} className="sm:w-6 sm:h-6 w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-['Space_Grotesk'] text-xl sm:text-2xl font-bold text-[#0F2747]">{item.title}</h3>
                      <p className="mt-1 text-sm font-bold text-[#C9A84C]">{item.place}</p>
                      <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </Section>
  )
}

function CoursesSection() {
  const columns = [
    {
      title: 'Clinical Dentistry & Photography',
      icon: Camera,
      tone: 'from-[#1E5FA8] to-blue-500',
      courses: [
        { name: 'Rogin Root Canal Masters Cloud Class 2026 – Precision Treatment Bootcamp', place: 'Advanced Endodontics Training Program', date: '2026' },
        { name: 'MDS Online Course', place: 'Dental Academy', date: '2025' },
        { name: 'Dental Photography Course', place: 'Clinical Documentation Workshop', date: '2024' },
      ]
    },
    {
      title: 'Healthcare & Safety',
      icon: HeartPulse,
      tone: 'from-rose-500 to-pink-500',
      courses: [
        { name: 'Infection Control Protocols', place: 'Healthcare Training Academy', date: '2023' },
        { name: 'First Aid & Basic Life Support (BLS)', place: 'Red Crescent / Medical Training', date: '2023' },
      ]
    },
    {
      title: 'Languages & General Skills',
      icon: Globe2,
      tone: 'from-[#C9A84C] to-amber-500',
      courses: [
        { name: 'German Language Course - Level A2', place: 'Language Center', date: '2025' },
      ]
    }
  ]
  
  return (
    <Section id="courses" tint="bg-[#F4F7F9]">
      <SectionTitle 
        title="Courses & Certifications" 
        subtitle="Continuous professional training, certifications, and language acquisitions."
      />
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid gap-8 md:grid-cols-3"
      >
        {columns.map((col, idx) => (
          <motion.div key={idx} variants={fadeInUp} className="group rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-100 overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:ring-slate-200">
            {/* Colored Header */}
            <div className={`bg-gradient-to-r ${col.tone} p-6 flex items-center gap-4`}>
              <div className="bg-white/20 p-2.5 rounded-xl backdrop-blur-sm shadow-inner">
                <col.icon size={24} className="text-white" />
              </div>
              <h3 className="font-['Space_Grotesk'] font-bold text-white text-lg leading-tight">{col.title}</h3>
            </div>
            
            <div className="p-6 flex-1 space-y-6 bg-white">
              {col.courses.map((course, cIdx) => (
                <div key={cIdx} className="group/item relative transition-all">
                  <div className="flex justify-between items-start gap-4">
                    <h4 className="font-bold text-[#0F2747] text-[15px] leading-tight group-hover/item:text-[#1E5FA8] transition-colors">{course.name}</h4>
                    <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-600 ring-1 ring-emerald-500/20">
                      <Check size={12} /> Cert.
                    </span>
                  </div>
                  <div className="mt-2.5 flex justify-between items-center text-xs text-slate-500 font-medium">
                    <span className="flex-1 pr-2">{course.place}</span>
                    <span className="font-bold text-[#1E5FA8] bg-blue-50 px-2.5 py-1 rounded-lg">{course.date}</span>
                  </div>
                  {cIdx < col.courses.length - 1 && <hr className="mt-6 border-slate-100 transition-colors group-hover/item:border-blue-50" />}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}

// Lifted to module scope so React never recreates the component type on re-renders
function SkillBar({ name, pct, gradient }) {
  return (
    <div className="group mb-6">
      <div className="flex justify-between text-sm font-bold mb-2.5">
        <span className="text-[#0F2747] transition-colors group-hover:text-[#1E5FA8]">{name}</span>
        <span className="text-slate-400 transition-colors group-hover:text-[#C9A84C]">{pct}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden shadow-inner">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.1, ease: 'easeOut' }}
          className={`h-full rounded-full bg-gradient-to-r ${gradient} shadow-[0_0_10px_rgba(0,0,0,0.1)]`}
        />
      </div>
    </div>
  )
}

function SkillsSection() {
  const clinicalSkills = [
    { name: 'Composite Restorations', pct: 95 },
    { name: 'Rubber Dam Isolation', pct: 98 },
    { name: 'Root Canal Treatment', pct: 88 },
    { name: 'Crown Preparation', pct: 85 },
    { name: 'Scaling & Polishing', pct: 90 },
    { name: 'Impression Taking', pct: 92 },
    { name: 'Shade Selection', pct: 94 },
    { name: 'Dental Photography', pct: 96 },
  ]

  const digitalSkills = [
    { name: 'Microsoft Word', pct: 90 },
    { name: 'Microsoft PowerPoint', pct: 92 },
    { name: 'Microsoft Excel', pct: 85 },
    { name: 'Canva', pct: 94 },
  ]

  return (
    <Section id="skills" tint="bg-white">
      <SectionTitle
        title="Professional & Clinical Skills"
        subtitle="A comprehensive set of clinical dental competencies and digital tools utilized in modern practice."
      />
      <div className="grid gap-10 md:grid-cols-2 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-[2rem] bg-white p-8 sm:p-10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] ring-1 ring-slate-100 transition-transform hover:-translate-y-1"
        >
          {/* Decorative Background Blob */}
          <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-blue-50 blur-2xl z-0 pointer-events-none" />

          <div className="relative z-10 flex items-center gap-4 mb-10">
            <div className="bg-gradient-to-br from-[#1E5FA8] to-blue-400 p-3.5 rounded-2xl shadow-lg shadow-blue-500/20">
              <Stethoscope size={28} className="text-white" />
            </div>
            <h3 className="font-['Space_Grotesk'] text-2xl font-black text-[#0F2747]">Clinical Skills</h3>
          </div>
          <div className="relative z-10">
            {clinicalSkills.map(s => <SkillBar key={s.name} {...s} gradient="from-[#1E5FA8] to-cyan-400" />)}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative rounded-[2rem] bg-[#0F2747] p-8 sm:p-10 shadow-[0_20px_40px_-15px_rgba(15,39,71,0.5)] ring-1 ring-[#1E5FA8]/30 h-fit transition-transform hover:-translate-y-1 overflow-hidden"
        >
          {/* Decorative Background Blob */}
          <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-[#1E5FA8]/20 blur-3xl z-0 pointer-events-none" />

          <div className="relative z-10 flex items-center gap-4 mb-10">
            <div className="bg-gradient-to-br from-[#C9A84C] to-yellow-400 p-3.5 rounded-2xl shadow-lg shadow-yellow-500/20">
              <Microscope size={28} className="text-[#0F2747]" />
            </div>
            <h3 className="font-['Space_Grotesk'] text-2xl font-black text-white">Digital Skills</h3>
          </div>
          <div className="relative z-10">
            {digitalSkills.map(s => (
              <div className="group mb-6" key={s.name}>
                <div className="flex justify-between text-sm font-bold mb-2.5 transition-all">
                  <span className="text-white/90 transition-colors group-hover:text-[#C9A84C]">{s.name}</span>
                  <span className="text-white/40 transition-colors group-hover:text-white">{s.pct}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-[#1E5FA8]/30 overflow-hidden shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.1, ease: 'easeOut' }}
                    className="h-full rounded-full bg-gradient-to-r from-[#C9A84C] to-yellow-300 shadow-[0_0_10px_rgba(201,168,76,0.3)]"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  )
}

function ConferencesSection() {
  const events = [
    {
      date: '2026',
      role: 'Attendee',
      level: 'National',
      title: 'Tanta Dental Conference 2026',
      place: 'Tanta University Faculty of Dentistry',
      location: 'Tanta, Egypt'
    },
    {
      date: '2025',
      role: 'Attendee',
      level: 'National',
      title: 'Egypt National Dental Exhibition (EDEX)',
      place: 'EDEX Egypt',
      location: 'Cairo, Egypt'
    }
  ]

  return (
    <Section id="conferences" tint="bg-[#F8F9FA]">
      <SectionTitle 
        title="Scientific Events" 
        subtitle="Active attendance and engagement in national and international dental conferences."
      />
      
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto max-w-5xl"
      >
        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          {[
            { num: '2', label: 'Conferences Attended', tone: 'from-[#1E5FA8] to-blue-400' },
            { num: '1', label: 'Exhibitions', tone: 'from-[#C9A84C] to-yellow-400' },
            { num: '2026', label: 'Latest Attendance', tone: 'from-emerald-500 to-teal-400' }
          ].map((stat, idx) => (
            <motion.div key={idx} variants={fadeInUp} className="group relative rounded-[2rem] bg-white p-8 text-center shadow-sm ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] overflow-hidden">
              <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${stat.tone}`} />
              <div className="font-['Space_Grotesk'] text-5xl sm:text-6xl font-black text-[#0F2747] mb-3 group-hover:scale-110 transition-transform duration-300">
                <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#0F2747] to-slate-500">{stat.num}</span>
              </div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Events List */}
        <div className="space-y-6">
          {events.map((event, idx) => (
            <motion.div key={idx} variants={fadeInUp} className="group flex flex-col sm:flex-row bg-white rounded-[2rem] shadow-sm ring-1 ring-slate-100 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50">
              
              {/* Date Block */}
              <div className="flex flex-row sm:flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#0F2747] to-[#1a3a60] p-6 sm:w-48 shrink-0 relative overflow-hidden text-center">
                <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-white/5 blur-xl pointer-events-none" />
                <span className="font-['Space_Grotesk'] text-3xl sm:text-4xl font-black text-white">{event.date}</span>
                <span className="text-[10px] font-bold text-white/60 uppercase tracking-[0.2em]">Year</span>
              </div>
              
              {/* Content Block */}
              <div className="flex-1 p-6 sm:p-8 flex flex-col justify-center bg-white relative">
                {/* Decorative pin icon watermark */}
                <MapPin size={100} className="absolute right-4 bottom-4 text-slate-50 opacity-50 pointer-events-none transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-12" />
                
                <div className="relative z-10 flex flex-wrap gap-2.5 mb-4">
                  <span className="rounded-full bg-blue-50 text-blue-600 px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider">{event.role}</span>
                  <span className={`rounded-full px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider ${event.level === 'International' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'}`}>
                    {event.level}
                  </span>
                </div>
                <h3 className="relative z-10 font-['Space_Grotesk'] text-xl sm:text-2xl font-bold text-[#0F2747] group-hover:text-[#1E5FA8] transition-colors">{event.title}</h3>
                <p className="relative z-10 mt-2 text-[15px] text-slate-500 font-semibold">{event.place}</p>
                <div className="relative z-10 mt-5 flex items-center gap-2 text-sm font-bold text-[#C9A84C]">
                  <MapPin size={18} />
                  {event.location}
                </div>
              </div>
              
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  )
}

function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [method, setMethod] = useState('email') // 'email' or 'whatsapp'
  const [status, setStatus] = useState('idle') // 'idle' | 'loading' | 'success' | 'error'

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSend = async (e) => {
    e.preventDefault()
    const { name, email, subject, message } = form

    if (method === 'whatsapp') {
      const text = 
`🦷 *رسالة جديدة من موقعك الشخصي*
━━━━━━━━━━━━━━━━━━

👤 *الاسم:* ${name}
📧 *البريد الإلكتروني:* ${email}
📌 *الموضوع:* ${subject}

💬 *الرسالة:*
${message}

━━━━━━━━━━━━━━━━━━
_تم الإرسال من نموذج التواصل على موقع Dr. Wahba_`
      window.open(`https://wa.me/201212179987?text=${encodeURIComponent(text)}`, '_blank')
      return
    }

    // EmailJS send
    setStatus('loading')
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: name,
          email: email,
          title: subject,
          subject: subject,
          message: message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setStatus('idle'), 5000)
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  const inputClass = "mt-2.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none placeholder:text-white/30 focus:border-[#C9A84C] focus:bg-white/10 focus:ring-1 focus:ring-[#C9A84C] transition-all"

  return (
    <Section id="contact" tint="bg-[#0F2747]">
      <div className="relative mx-auto max-w-6xl grid gap-12 lg:grid-cols-2 lg:gap-20 items-center">
        
        {/* Background decorative blobs */}
        <div className="absolute top-0 left-10 h-72 w-72 rounded-full bg-[#1E5FA8]/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 h-72 w-72 rounded-full bg-[#C9A84C]/10 blur-3xl pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative z-10"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-bold text-white/80 mb-6 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Available for new opportunities
          </div>
          
          <h2 className="text-4xl font-black text-white sm:text-5xl lg:text-[3.5rem] leading-[1.1]">
            Let's talk about a case, course, or <span className="bg-gradient-to-r from-[#1E5FA8] to-[#C9A84C] bg-clip-text text-transparent">collaboration.</span>
          </h2>
          <div className="mt-6 h-1.5 w-24 rounded-full bg-gradient-to-r from-[#1E5FA8] to-[#C9A84C]" />
          <p className="mt-6 text-lg leading-relaxed text-white/60">
            Reach out directly by phone, WhatsApp, or the short message form. I usually respond within a few hours.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <a href="tel:+201212179987" className="group inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-[15px] font-bold text-[#0F2747] transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              <Phone size={18} className="transition-transform group-hover:rotate-12" /> Call Me
            </a>
            <a href="https://wa.me/201212179987" target="_blank" rel="noopener noreferrer" className="group inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#C9A84C] to-yellow-500 px-8 py-4 text-[15px] font-bold text-white transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(201,168,76,0.4)]">
              <Send size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /> WhatsApp
            </a>
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSend}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          className="relative z-10 rounded-[2rem] bg-white/5 p-6 shadow-2xl ring-1 ring-white/10 backdrop-blur-md sm:p-10"
        >
          {/* Form Fields */}
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-bold text-white/80">
              Full Name
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                maxLength={100}
                className={inputClass}
                placeholder="Dr. John Doe"
              />
            </label>
            <label className="block text-sm font-bold text-white/80">
              Your Email
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                maxLength={150}
                className={inputClass}
                placeholder="example@mail.com"
              />
            </label>
          </div>
          
          <label className="mt-5 block text-sm font-bold text-white/80">
            Message Subject
            <input
              type="text"
              name="subject"
              required
              value={form.subject}
              onChange={handleChange}
              maxLength={150}
              className={inputClass}
              placeholder="Clinical case consultation..."
            />
          </label>
          
          <label className="mt-5 block text-sm font-bold text-white/80">
            Message
            <textarea
              name="message"
              required
              value={form.message}
              onChange={handleChange}
              maxLength={2000}
              className={`${inputClass} min-h-[120px] resize-y`}
              placeholder="Tell me more about how we can work together..."
            />
          </label>

          {/* Send Method Selector */}
          <div className="mt-6">
            <p className="text-sm font-bold text-white/70 mb-3">Send via:</p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setMethod('email')}
                className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-all border ${
                  method === 'email'
                    ? 'bg-[#1E5FA8] border-[#1E5FA8] text-white shadow-[0_0_15px_rgba(30,95,168,0.4)]'
                    : 'bg-white/5 border-white/10 text-white/60 hover:border-white/30 hover:text-white'
                }`}
              >
                <Mail size={16} /> Email
              </button>
              <button
                type="button"
                onClick={() => setMethod('whatsapp')}
                className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold transition-all border ${
                  method === 'whatsapp'
                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                    : 'bg-white/5 border-white/10 text-white/60 hover:border-white/30 hover:text-white'
                }`}
              >
                <MessageCircle size={16} /> WhatsApp
              </button>
            </div>
          </div>

          {/* Status messages */}
          {status === 'success' && (
            <div className="mt-5 flex items-center gap-2 rounded-xl bg-emerald-500/20 border border-emerald-500/30 px-4 py-3 text-sm font-bold text-emerald-400">
              <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              تم إرسال رسالتك بنجاح! سأرد عليك في أقرب وقت.
            </div>
          )}
          {status === 'error' && (
            <div className="mt-5 flex items-center gap-2 rounded-xl bg-red-500/20 border border-red-500/30 px-4 py-3 text-sm font-bold text-red-400">
              <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              حدث خطأ أثناء الإرسال. حاول مرة أخرى أو تواصل عبر واتساب.
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className={`group mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-4 text-[15px] font-black text-white transition-all disabled:opacity-70 disabled:cursor-not-allowed ${
              method === 'email'
                ? 'bg-gradient-to-r from-[#1E5FA8] to-blue-500 hover:from-blue-600 hover:to-blue-400 shadow-[0_10px_20px_-10px_rgba(30,95,168,0.5)] hover:shadow-[0_10px_20px_-10px_rgba(30,95,168,0.8)]'
                : 'bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-700 hover:to-green-600 shadow-[0_10px_20px_-10px_rgba(16,185,129,0.5)] hover:shadow-[0_10px_20px_-10px_rgba(16,185,129,0.8)]'
            }`}
          >
            {status === 'loading' ? (
              <>
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Sending...
              </>
            ) : method === 'email' ? (
              <> Send via Email <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" /> </>
            ) : (
              <> Send via WhatsApp <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" /> </>
            )}
          </button>
        </motion.form>
      </div>
    </Section>
  )
}

export function HomePage() {
  return (
    <main>
      <Hero />
      <AboutSection />
      <EducationSection />
      <CoursesSection />
      <SkillsSection />
      <ConferencesSection />
      <ContactSection />
    </main>
  )
}
