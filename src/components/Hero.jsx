import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { WHATSAPP_URL } from '../config/siteConfig'
import { staggerContainer, scrollToSection } from '../utils/motion'
import { useLanguage } from '../context/LanguageContext'

export default function Hero() {
  const [riverProgress, setRiverProgress] = useState(0)
  const { lang } = useLanguage()
  const containerRef = useRef(null)
  const { scrollY } = useScroll()

  /* Parallax: 3 layers moving at different speeds */
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])
  const contentY = useTransform(scrollY, [0, 600], [0, -80])

  /* Layer 1 — background image (slowest, 0.3x) */
  const bgY = useTransform(scrollY, [0, 800], [0, 120])

  /* Layer 2 — burgundy glows (medium, 0.5x) */
  const glowY = useTransform(scrollY, [0, 800], [0, 60])

  /* Layer 3 — fog (fastest, 0.7x) */
  const fogY = useTransform(scrollY, [0, 800], [0, 40])

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const windowHeight = window.innerHeight
      const progress = Math.min(scrollTop / (windowHeight * 1.5), 1)
      setRiverProgress(progress)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  /* Stagger container with 0.15s delay between children */
  const heroStagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  }

  /* Item animation: opacity 0→1, y 30→0, duration 0.8s, easeOut */
  const heroItem = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ── Layer 1: background image with parallax (slowest) ── */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 will-change-transform"
      >
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=85&auto=format&fit=crop"
          alt="Боомское ущелье"
          className="w-full h-full object-cover scale-110"
          loading="eager"
        />
        {/* Light gradient overlay — mountains stay visible and saturated */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(20,10,10,0.15)] via-[rgba(20,10,10,0.35)] to-[rgba(20,10,10,0.6)]" />
      </motion.div>

      {/* ── Layer 2: burgundy ambient glows (medium parallax) ── */}
      <motion.div
        style={{ y: glowY }}
        className="absolute will-change-transform"
      >
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-terracotta/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-0 w-[600px] h-[600px] bg-teal/5 rounded-full blur-3xl" />
      </motion.div>

      {/* ── Layer 3: fog / mist (fastest parallax) ── */}
      <motion.div
        style={{ y: fogY }}
        className="fog-layer"
        aria-hidden="true"
      >
        <div className="fog-particle" />
        <div className="fog-particle" />
        <div className="fog-particle" />
      </motion.div>

      {/* River SVG */}
      <div className="absolute bottom-0 left-0 w-full h-32 pointer-events-none z-10">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id="riverGrad"
              x1="0"
              y1="0"
              x2="1"
              y2="0"
            >
              <stop offset="0%" stopColor="#4A7C6F" stopOpacity="0" />
              <stop offset="30%" stopColor="#4A7C6F" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#5E9B8A" stopOpacity="0.7" />
              <stop offset="70%" stopColor="#4A7C6F" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#4A7C6F" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0 60 Q 120 20, 240 50 T 480 40 T 720 60 T 960 35 T 1200 55 T 1440 40"
            stroke="url(#riverGrad)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="2000"
            strokeDashoffset={2000 - riverProgress * 2000}
          />
          <path
            d="M0 75 Q 140 35, 260 65 T 500 55 T 740 75 T 980 50 T 1220 70 T 1440 55"
            stroke="url(#riverGrad)"
            strokeWidth="1"
            fill="none"
            strokeDasharray="2000"
            strokeDashoffset={2000 - riverProgress * 2000}
            opacity="0.4"
          />
        </svg>
      </div>

      {/* Content */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center pt-28 pb-20"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={heroStagger}
        >
          <motion.div variants={heroItem} className="mb-6">
            <img
              src="/Boom-cafe/logo.png"
              alt="BOOM"
              className="h-24 sm:h-32 md:h-40 lg:h-48 w-auto mx-auto object-contain"
            />
          </motion.div>

          <motion.div variants={heroItem} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 border border-terracotta/40 rounded-full text-xs font-medium tracking-widest uppercase text-terracotta bg-deep-900/30 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-terracotta animate-pulse" />
              {lang === 'ru' ? 'Боомское ущелье' : 'Boom Gorge'}
            </span>
          </motion.div>

          <motion.p
            variants={heroItem}
            className="text-xl sm:text-2xl md:text-3xl text-[#F0EEEA] font-light max-w-2xl mx-auto mb-4 leading-relaxed"
          >
            {lang === 'ru' ? 'Идеальная остановка' : 'The perfect stop'}{' '}
            <span className="text-[#F0EEEA] font-medium">
              {lang === 'ru' ? 'по пути на Иссык-Куль' : 'on the way to Issyk-Kul'}
            </span>
          </motion.p>

          <motion.p
            variants={heroItem}
            className="text-base text-stone-500 max-w-xl mx-auto mb-12 leading-relaxed"
          >
            {lang === 'ru'
              ? 'Вкусная еда, горячий кофе и отдых в самом сердце гор.'
              : 'Delicious food, hot coffee and rest in the heart of the mountains.'}
          </motion.p>

          <motion.div variants={heroItem} className="flex items-center justify-center">
            <motion.button
              onClick={() => scrollToSection('menu')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="premium-btn premium-btn-terracotta text-white"
            >
              <span className="relative z-10">
                {lang === 'ru' ? 'Смотреть меню' : 'View Menu'}
              </span>
              <ChevronDown size={16} className="relative z-10" />
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        style={{ opacity: heroOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8, ease: 'easeOut' }}
        onClick={() => scrollToSection('about')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-stone-400 hover:text-terracotta transition-colors duration-300 cursor-pointer"
        aria-label="Прокрутить вниз"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={24} />
        </motion.div>
      </motion.button>
    </section>
  )
}