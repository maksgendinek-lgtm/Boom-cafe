import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { WHATSAPP_URL, PHONE, PHONE_LINK } from '../config/siteConfig'
import { scrollToSection } from '../utils/motion'
import { useLanguage } from '../context/LanguageContext'

export default function Footer() {
  const year = new Date().getFullYear()
  const { lang } = useLanguage()

  return (
    <footer className="relative border-t border-deep-600/40 bg-deep-900">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <motion.button
              onClick={() => scrollToSection('hero')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="font-display text-2xl font-bold text-cream hover:text-terracotta transition-colors duration-300 cursor-pointer mb-2"
            >
              BOOM
            </motion.button>
            <p className="text-stone-500 text-sm">
              {lang === 'ru' ? 'Кафе в Боомском ущелье' : 'Cafe in Boom Gorge'}
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-6">
            {[
              { label: 'О нас', labelEn: 'About', id: 'about' },
              { label: 'Меню', labelEn: 'Menu', id: 'menu' },
              { label: 'Контакты', labelEn: 'Contacts', id: 'contacts' },
            ].map((link) => (
              <motion.button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="text-sm text-stone-400 hover:text-cream transition-colors duration-300 cursor-pointer"
              >
                {lang === 'ru' ? link.label : link.labelEn}
              </motion.button>
            ))}
          </nav>

          {/* Contact */}
          <div className="flex items-center gap-4">
            <motion.a
              href={PHONE_LINK}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="text-sm text-stone-400 hover:text-teal transition-colors duration-300"
            >
              {PHONE}
            </motion.a>
            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-terracotta hover:bg-terracotta-dark text-white text-sm font-medium rounded-full transition-colors duration-300 shadow-lg shadow-terracotta/15"
            >
              <MessageCircle size={16} />
              WhatsApp
            </motion.a>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-deep-500/30 to-transparent my-8" />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-deep-500 text-xs">
            © {year} BOOM. {lang === 'ru' ? 'Все права защищены.' : 'All rights reserved.'}
          </p>
          <p className="text-deep-500 text-xs">
            {lang === 'ru' ? 'Боомское ущелье, Кыргызстан' : 'Boom Gorge, Kyrgyzstan'}
          </p>
        </div>
      </div>
    </footer>
  )
}
