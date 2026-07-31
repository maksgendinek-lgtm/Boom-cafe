import { motion } from 'framer-motion'
import { Zap, Coffee, MapPin } from 'lucide-react'
import { siteConfig } from '../config/siteConfig'
import { fadeInUp, staggerContainer } from '../utils/motion'
import { useLanguage } from '../context/LanguageContext'

const iconMap = { Zap, Coffee, MapPin }

export default function Features() {
  const { features } = siteConfig
  const { lang } = useLanguage()

  return (
    <section id="features" className="relative py-28 md:py-36 overflow-hidden">
      {/* Semi-transparent background — lets PremiumBackground show through */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-900/5 via-deep-800/15 to-deep-900/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-terracotta/3 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-120px' }}
          variants={staggerContainer}
          className="text-center mb-20"
        >
          <motion.span
            variants={fadeInUp}
            className="text-terracotta text-sm font-medium tracking-widest uppercase mb-4 block"
          >
            {lang === 'ru' ? 'Преимущества' : 'Advantages'}
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-cream mb-8 leading-[1.1]"
          >
            {lang === 'ru' ? features.title.ru : features.title.en}
          </motion.h2>
          <motion.div
            variants={fadeInUp}
            className="w-24 h-1 bg-gradient-to-r from-terracotta via-terracotta to-teal mx-auto rounded-full mb-8"
          />
          <motion.p
            variants={fadeInUp}
            className="text-stone-400 text-xl max-w-2xl mx-auto leading-relaxed"
          >
            {lang === 'ru' ? features.subtitle.ru : features.subtitle.en}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.items.map((feature) => {
            const Icon = iconMap[feature.icon]
            return (
              <motion.div
                key={feature.title.ru}
                variants={fadeInUp}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="group relative p-8 rounded-2xl bg-deep-700/20 border border-deep-500/10 hover:border-terracotta/20 hover:shadow-2xl hover:shadow-terracotta/5 transition-shadow duration-300 backdrop-blur-sm overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-terracotta/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-terracotta/10 flex items-center justify-center mb-6 group-hover:bg-terracotta/15 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-terracotta/10 transition-transform duration-300">
                    <Icon className="text-terracotta" size={28} />
                  </div>
                  <h3 className="text-lg font-semibold text-cream mb-3 group-hover:text-terracotta-light transition-colors duration-300">
                    {lang === 'ru' ? feature.title.ru : feature.title.en}
                  </h3>
                  <p className="text-stone-400 text-sm leading-relaxed">
                    {lang === 'ru' ? feature.text.ru : feature.text.en}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
