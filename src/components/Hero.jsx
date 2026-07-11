import { ArrowRight, Star } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'

export function Hero() {
  const navigate = useNavigate()
  const shouldReduceMotion = useReducedMotion()

  const handleAboutMeClick = () => {
    const el = document.getElementById('about')
    if (el) {
      const offset = 90
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = el.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    } else {
      navigate('/#about')
    }
  }

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden bg-[#0F2747] flex items-center">
      {/* Background Image & Overlay */}
      <img src="/about.jpg" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full scale-105 object-cover opacity-10 blur-md mix-blend-overlay" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F2747]/95 via-[#0F2747]/90 to-[#1a3a60]/80" />
      
      {/* Premium glowing blobs */}
      <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-[#1E5FA8]/20 blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 h-[600px] w-[600px] rounded-full bg-[#C9A84C]/15 blur-[120px] pointer-events-none -translate-x-1/3 translate-y-1/3" />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 pb-20 pt-32 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:pt-20">
        
        {/* Left Column */}
        <motion.div 
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, ease: 'easeOut' }}
          className="max-w-3xl text-center lg:text-left z-10"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-[#C9A84C] mb-6 backdrop-blur-md">
            <Star size={14} className="fill-[#C9A84C]" />
            Dr. Ahmed Ibrahim Wahba
          </div>

          <h1 className="font-['Space_Grotesk'] text-4xl font-black leading-[1.1] text-white sm:text-5xl lg:text-[4.5rem]">
            Passionate About<br />
            <span className="bg-gradient-to-r from-[#1E5FA8] to-[#C9A84C] bg-clip-text text-transparent">Restorative</span> &<br />
            Esthetic Dentistry.
          </h1>
          
          <p className="mx-auto mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-white/70 lg:mx-0">
            Documenting my clinical journey, showcasing restorative protocols, rubber dam isolation setups, and high-quality dental photography.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row flex-wrap justify-center gap-4 lg:justify-start">
            <button onClick={() => navigate('/portfolio')} className="group inline-flex w-full sm:w-auto justify-center items-center gap-2 rounded-full bg-gradient-to-r from-[#1E5FA8] to-[#144781] px-8 py-4 text-[15px] font-bold text-white transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(30,95,168,0.4)]">
              Explore Cases
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
            <button onClick={handleAboutMeClick} className="group inline-flex w-full sm:w-auto justify-center items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm px-8 py-4 text-[15px] font-bold text-white transition-all hover:bg-white/10 hover:border-[#C9A84C] hover:text-[#C9A84C]">
              About Me
            </button>
          </div>
        </motion.div>

        {/* Right Column */}
        <motion.div 
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 1, ease: 'easeOut', delay: 0.2 }}
          className="relative mx-auto flex w-full max-w-[460px] justify-center lg:justify-end mt-6 lg:mt-0 z-10"
        >
          {/* Card wrapper for premium look */}
          <div className="relative w-full overflow-hidden rounded-[2.5rem] bg-gradient-to-b from-white/10 to-white/5 p-2 shadow-[0_40px_80px_rgba(0,0,0,0.5)] ring-1 ring-white/20 backdrop-blur-md group transition-transform duration-700 hover:scale-[1.02]">
            <img src="/wahba.jpeg" alt="Dr. Ahmed Wahba, dental intern" className="h-[450px] sm:h-[580px] w-full rounded-[2rem] object-cover object-top transition-transform duration-700 group-hover:scale-105" />
            {/* Subtle inner shadow overlay */}
            <div className="absolute inset-0 rounded-[2rem] shadow-[inset_0_0_40px_rgba(0,0,0,0.2)] pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
