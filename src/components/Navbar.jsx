import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaTooth, FaWhatsapp, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { Home, User, GraduationCap, BookOpen, Cpu, Phone } from 'lucide-react'
import { motion } from 'framer-motion'

// Section IDs that exist on the HomePage
const SECTION_IDS = ['about', 'education', 'courses', 'skills', 'conferences', 'contact']

// All nav links with corresponding icons
const navLinks = [
  { label: 'Home',      path: '/',            hash: '',          icon: Home },
  { label: 'About',     path: '/',            hash: 'about',      icon: User },
  { label: 'Education', path: '/',            hash: 'education',  icon: GraduationCap },
  { label: 'Courses',   path: '/',            hash: 'courses',    icon: BookOpen },
  { label: 'Skills',    path: '/',            hash: 'skills',     icon: Cpu },
  { label: 'Contact',   path: '/',            hash: 'contact',    icon: Phone },
]

// Portfolio is always in the top navbar on all screens
const portfolioLink = { label: 'Portfolio', path: '/portfolio', hash: '' }

// Social links with their famous brand colors
const socialLinks = [
  {
    label: 'WhatsApp',
    href: 'https://wa.me/201212179987',
    icon: FaWhatsapp,
    textColor: 'text-[#25D366]',
    hoverClass: 'hover:bg-[#25D366] hover:text-white hover:border-[#25D366] hover:shadow-[#25D366]/30',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/wahba_ahmed_/',
    icon: FaInstagram,
    textColor: 'text-[#E1306C]',
    hoverClass: 'hover:bg-[#E1306C] hover:text-white hover:border-[#E1306C] hover:shadow-[#E1306C]/30',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/ahmed-ibrahim-8b2352342/',
    icon: FaLinkedinIn,
    textColor: 'text-[#0A66C2]',
    hoverClass: 'hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] hover:shadow-[#0A66C2]/30',
  },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeHash, setActiveHash] = useState('')
  const location   = useLocation()
  const navigate   = useNavigate()
  const ticking    = useRef(false)

  // ── Scroll tracking ──────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return
      ticking.current = true
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 16)

        // Only track sections on the home page
        if (location.pathname !== '/') {
          ticking.current = false
          return
        }

        const OFFSET = 150 // navbar height + buffer
        let current = ''

        for (const id of SECTION_IDS) {
          const el = document.getElementById(id)
          if (!el) continue
          if (el.getBoundingClientRect().top <= OFFSET) {
            current = id
          }
        }
        setActiveHash(current)
        ticking.current = false
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [location.pathname])

  // Active hash is reset inside the scroll handler when pathname !== '/'

  // ── Helpers ───────────────────────────────────────────────────────
  const isHomeTop = location.pathname === '/' && !scrolled

  const isLinkActive = (link) => {
    if (link.path !== '/') {
      return location.pathname === link.path
    }
    if (link.hash === '') {
      return location.pathname === '/' && activeHash === ''
    }
    return location.pathname === '/' && activeHash === link.hash
  }

  const handleNavClick = (link) => {
    if (link.path !== '/') {
      navigate(link.path)
      return
    }
    if (link.hash === '') {
      if (location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        navigate('/')
      }
      return
    }
    // Hash link on home page
    if (location.pathname === '/') {
      const el = document.getElementById(link.hash)
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
      }
    } else {
      navigate(`/#${link.hash}`)
    }
  }

  // ── Style helpers ─────────────────────────────────────────────────
  const navTextBase  = isHomeTop ? 'text-white/80 hover:text-white' : 'text-slate-600 hover:text-[#1E5FA8]'
  const activeStyle  = isHomeTop ? 'text-white' : 'text-[#1E5FA8]'

  // ── Render ────────────────────────────────────────────────────────
  return (
    <>
      {/* ── TOP NAVBAR ─────────────────────────────────────────── */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          isHomeTop
            ? 'bg-transparent'
            : 'bg-white/90 shadow-sm shadow-slate-900/5 backdrop-blur-xl ring-1 ring-slate-900/5'
        }`}
      >
        <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-2 sm:px-8">
          {/* Logo */}
          <Link
            to="/"
            className={`flex items-center gap-2 sm:gap-3 text-left transition ${isHomeTop ? 'text-white' : 'text-[#0F2747]'}`}
            aria-label="Go to homepage"
          >
            <span
              className={`grid size-9 sm:size-10 place-items-center rounded-lg sm:rounded-xl ${
                isHomeTop ? 'bg-white/15 ring-1 ring-white/20' : 'bg-[#0F2747] text-white'
              }`}
            >
              <FaTooth className="text-sm sm:text-base" />
            </span>
            <span>
              <span className="block text-base font-bold leading-tight">Dr. Ahmed Wahba</span>
              <span
                className={`block text-[9px] sm:text-[11px] font-medium uppercase tracking-[0.18em] ${
                  isHomeTop ? 'text-white/55' : 'text-slate-400'
                }`}
              >
                Dentist
              </span>
            </span>
          </Link>

          {/* Desktop nav — hidden on mobile */}
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
            {navLinks.map((link) => {
              const active = isLinkActive(link)
              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link)}
                  className={`relative text-sm font-semibold transition ${navTextBase} ${active ? activeStyle : ''}`}
                  aria-current={active ? 'page' : undefined}
                >
                  {link.label}
                  {active && (
                    <span className="absolute -bottom-3 left-0 h-0.5 w-full rounded-full bg-current" />
                  )}
                </button>
              )
            })}
          </nav>

          {/* Portfolio link & Social icons (all screens) */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Distinct Portfolio Button */}
            <button
              onClick={() => handleNavClick(portfolioLink)}
              className={`group flex items-center gap-1.5 sm:gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 hover:scale-105 ${
                isLinkActive(portfolioLink)
                  ? 'bg-gradient-to-r from-[#1E5FA8] to-blue-500 text-white shadow-[0_5px_15px_rgba(30,95,168,0.4)]'
                  : isHomeTop
                    ? 'bg-white/15 hover:bg-white text-white hover:text-[#0F2747] border border-white/20 shadow-lg'
                    : 'bg-[#0F2747] hover:bg-[#1E5FA8] text-white shadow-md'
              }`}
            >
              <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isLinkActive(portfolioLink) ? 'bg-white' : 'bg-[#C9A84C]'}`}></span>
                <span className={`relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 ${isLinkActive(portfolioLink) ? 'bg-white' : 'bg-[#C9A84C]'}`}></span>
              </span>
              Portfolio
            </button>

            {/* Social Icons with brand colors */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className={`grid size-8 sm:size-9 place-items-center rounded-lg sm:rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                    isHomeTop 
                      ? 'bg-white/10 border-white/20' 
                      : 'bg-white border-slate-200'
                  } ${s.textColor} ${s.hoverClass}`}
                >
                  <s.icon className="text-base sm:text-[18px]" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ── MOBILE BOTTOM NAV ──────────────────────────────────── */}
      {/* Floating capsule-shaped bottom navigation inspired by premium UI designs */}
      <nav
        className="fixed bottom-4 inset-x-0 z-50 lg:hidden flex justify-center px-4 pointer-events-none"
        aria-label="Mobile bottom navigation"
      >
        <div className="w-full max-w-md bg-[#0F2747]/95 backdrop-blur-xl rounded-[2rem] shadow-[0_10px_35px_rgba(15,39,71,0.35)] border border-white/10 flex items-center justify-around h-16 px-3 pointer-events-auto relative">
          {navLinks.map((link) => {
            const active = isLinkActive(link)
            const Icon = link.icon

            return (
              <button
                key={link.label}
                onClick={() => handleNavClick(link)}
                className="relative flex flex-col items-center justify-center w-12 h-full focus:outline-none"
                aria-current={active ? 'page' : undefined}
              >
                {/* Smooth sliding floating bubble for the active tab */}
                {active && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute -top-5 w-12 h-12 bg-[#1E5FA8] rounded-full flex items-center justify-center shadow-lg shadow-blue-500/40 border-4 border-[#0F2747] z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  >
                    <Icon className="text-white w-5 h-5" />
                  </motion.div>
                )}

                {/* Default icon & text for inactive tabs */}
                <motion.div
                  animate={{
                    opacity: active ? 0 : 1,
                    y: active ? 8 : 0,
                    scale: active ? 0.7 : 1
                  }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-center gap-0.5 text-white/60 hover:text-white"
                >
                  <Icon className="w-4.5 h-4.5" />
                  <span className="text-[9px] font-bold tracking-wide">
                    {link.label}
                  </span>
                </motion.div>
              </button>
            )
          })}
        </div>
      </nav>
    </>
  )
}
