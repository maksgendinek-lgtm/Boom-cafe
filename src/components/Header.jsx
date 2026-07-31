import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Globe } from 'lucide-react'
import { WHATSAPP_URL } from '../config/siteConfig'
import { scrollToSection } from '../utils/motion'
import { useLanguage } from '../context/LanguageContext'

const navLinks = [
  { label: 'Главная', labelEn: 'Home', id: 'hero' },
  { label: 'О нас', labelEn: 'About', id: 'about' },
  { label: 'Меню', labelEn: 'Menu', id: 'menu' },
  { label: 'Контакты', labelEn: 'Contacts', id: 'contacts' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const { lang, toggleLang } = useLanguage()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (id) => {
    scrollToSection(id)
    setIsMobileOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-deep-900/80 backdrop-blur-xl shadow-lg shadow-black/30'
          : 'bg-gradient-to-b from-black/50 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <motion.button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="relative text-sm font-medium text-stone-400 hover:text-cream transition-colors duration-300 cursor-pointer group"
              >
                {lang === 'ru' ? link.label : link.labelEn}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-terracotta transition-all duration-300 group-hover:w-full" />
              </motion.button>
            ))}
          </nav>

          {/* Desktop CTA + Language toggle */}
          <div className="hidden md:flex items-center gap-4">
            <motion.button
              onClick={toggleLang}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-stone-400 hover:text-cream transition-colors duration-300"
              aria-label="Switch language"
            >
              <Globe size={16} />
              <span className="text-sm font-medium">{lang.toUpperCase()}</span>
            </motion.button>
            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="premium-btn premium-btn-terracotta text-sm text-white border-0 outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-0"
            >
              {lang === 'ru' ? 'Связаться' : 'Contact'}
            </motion.a>
          </div>

          {/* Mobile menu button */}
          <motion.button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="md:hidden p-2 text-cream hover:text-terracotta transition-colors duration-300 cursor-pointer"
            aria-label="Меню"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="md:hidden bg-deep-900/95 backdrop-blur-xl border-t border-white/5 overflow-hidden"
          >
            <nav className="flex flex-col px-6 py-6 gap-2">
              {navLinks.map((link) => (
                <motion.button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="text-left py-3 px-4 text-stone-400 hover:text-cream hover:bg-white/5 rounded-xl transition-all duration-300 cursor-pointer font-medium"
                >
                  {lang === 'ru' ? link.label : link.labelEn}
                </motion.button>
              ))}
              <div className="flex items-center gap-3 mt-3">
                <motion.button
                  onClick={toggleLang}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="flex items-center gap-2 px-4 py-2 text-stone-400 hover:text-cream transition-colors"
                >
                  <Globe size={18} />
                  <span className="text-sm font-medium">{lang.toUpperCase()}</span>
                </motion.button>
                <motion.a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 premium-btn-terracotta text-white rounded-full"
                >
                  {lang === 'ru' ? 'Связаться с нами' : 'Contact Us'}
                </motion.a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
