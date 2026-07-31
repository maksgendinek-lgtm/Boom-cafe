import { motion } from 'framer-motion'
import { UtensilsCrossed, Mountain, Coffee, Wifi, Moon, Store } from 'lucide-react'
import { fadeInUp, staggerContainer, useCountUp } from '../utils/motion'
import { useLanguage } from '../context/LanguageContext'

const stats = [
  { label: 'Блюд в меню', labelEn: 'Dishes on menu', end: 50, suffix: '+' },
  { label: 'Видов напитков', labelEn: 'Drink varieties', end: 40, suffix: '+' },
  { label: 'Км от Бишкека', labelEn: 'Km from Bishkek', end: 98, suffix: '' },
]

function StatItem({ label, labelEn, end, suffix }) {
  const { count, ref } = useCountUp(end, 2200, 0)
  const { lang } = useLanguage()

  return (
    <div ref={ref} className="text-center">
      <div className="font-display text-4xl md:text-5xl font-bold text-gold mb-1">
        {count}
        {suffix && <span className="text-gold-light">{suffix}</span>}
      </div>
      <p className="text-stone-400 text-sm font-medium">
        {lang === 'ru' ? label : labelEn}
      </p>
    </div>
  )
}

const features = [
  {
    icon: UtensilsCrossed,
    title: 'Разнообразное меню',
    titleEn: 'Diverse menu',
    text: 'От традиционных кыргызских блюд до европейской классики, пиццы и авторских напитков',
    textEn: 'From traditional Kyrgyz dishes to European classics, pizza and signature drinks',
  },
  {
    icon: Mountain,
    title: 'В сердце ущелья',
    titleEn: 'In the heart of the gorge',
    text: 'Расположены прямо на трассе Бишкек — Иссык-Куль. Идеальная остановка с видом на скалы и реку Чу',
    textEn: 'Located right on the Bishkek — Issyk-Kul highway. Perfect stop with views of cliffs and the Chu River',
  },
  {
    icon: Coffee,
    title: 'Премиальный сервис',
    titleEn: 'Premium service',
    text: 'Готовим из свежих продуктов и создаём атмосферу, в которую хочется возвращаться',
    textEn: 'We cook with fresh ingredients and create an atmosphere you want to return to',
  },
  {
    icon: Wifi,
    title: 'Бесплатный Wi-Fi',
    titleEn: 'Free Wi-Fi',
    text: 'Бесплатный Wi-Fi на всей территории кафе',
    textEn: 'Free Wi-Fi throughout the café',
  },
  {
    icon: Moon,
    title: 'Намазкана',
    titleEn: 'Prayer Room',
    text: 'Отдельная намазкана для комфортной молитвы',
    textEn: 'Dedicated prayer room for your comfort',
  },
  {
    icon: Store,
    title: 'Кофейня',
    titleEn: 'Coffee Shop',
    text: 'Полноценная кофейня с авторскими напитками',
    textEn: 'Full coffee shop with signature drinks',
  },
]

export default function About() {
  const { lang } = useLanguage()

  return (
    <section id="about" className="relative py-28 md:py-36 overflow-hidden">
      {/* Semi-transparent background — lets PremiumBackground show through */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-900/5 via-deep-800/20 to-deep-900/5" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-terracotta/5 rounded-full blur-3xl" />

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
            {lang === 'ru' ? 'О кафе' : 'About us'}
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-cream mb-8 leading-[1.1]"
          >
            {lang === 'ru' ? 'Ваша остановка' : 'Your stop'}{' '}
            <span className="gradient-text">
              {lang === 'ru' ? 'в Боомском ущелье' : 'in Boom Gorge'}
            </span>
          </motion.h2>
          <motion.div
            variants={fadeInUp}
            className="w-24 h-1 bg-gradient-to-r from-terracotta via-terracotta to-teal mx-auto rounded-full mb-8"
          />
          <motion.p
            variants={fadeInUp}
            className="text-stone-400 text-xl max-w-2xl mx-auto leading-relaxed"
          >
            <span className="text-cream font-medium">BOOM</span> —{' '}
            {lang === 'ru'
              ? 'это уютное кафе с разнообразной кухней:'
              : 'is a cozy cafe with diverse cuisine:'}
            <span className="text-stone-300">
              {' '}
              {lang === 'ru' ? 'более 50 блюд' : 'more than 50 dishes'}
            </span>{' '}
            и{' '}
            <span className="text-stone-300">
              {lang === 'ru' ? 'более 40 видов напитков' : 'more than 40 types of drinks'}
            </span>
            .
            {lang === 'ru'
              ? ' От национальных блюд и восточных лагманов до европейской классики и свежей пиццы.'
              : ' From national dishes and Eastern lagman to European classics and fresh pizza.'}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 mb-24"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} variants={fadeInUp}>
              <StatItem {...stat} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                variants={fadeInUp}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="group relative p-8 rounded-2xl bg-deep-700/20 border border-deep-500/10 hover:border-terracotta/20 hover:shadow-2xl hover:shadow-terracotta/5 transition-shadow duration-300 backdrop-blur-sm overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-terracotta/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-terracotta/10 flex items-center justify-center mb-5 group-hover:bg-terracotta/15 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-terracotta/10 transition-transform duration-300">
                    <Icon className="text-terracotta" size={28} />
                  </div>
                  <h3 className="text-lg font-semibold text-cream mb-3 group-hover:text-terracotta-light transition-colors duration-300">
                    {lang === 'ru' ? feature.title : feature.titleEn}
                  </h3>
                  <p className="text-stone-400 text-sm leading-relaxed">
                    {lang === 'ru' ? feature.text : feature.textEn}
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
