import { motion } from 'framer-motion'
import { MapPin, MessageCircle, Clock, Phone } from 'lucide-react'
import { WHATSAPP_URL, siteConfig } from '../config/siteConfig'
import { fadeInUp, staggerContainer } from '../utils/motion'
import { useLanguage } from '../context/LanguageContext'

const { contacts } = siteConfig

export default function Contacts() {
  const { lang } = useLanguage()

  return (
    <section id="contacts" className="relative py-28 md:py-36 overflow-hidden">
      {/* Semi-transparent background — lets PremiumBackground show through */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-900/5 via-deep-800/20 to-deep-900/5" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-teal/4 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-terracotta/3 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-120px' }}
          variants={staggerContainer}
          className="text-center mb-24"
        >
          <motion.span
            variants={fadeInUp}
            className="text-terracotta text-sm font-medium tracking-widest uppercase mb-4 block"
          >
            {lang === 'ru' ? 'Свяжитесь с нами' : 'Get in touch'}
          </motion.span>
          <motion.h2
            variants={fadeInUp}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-cream mb-8 leading-[1.1]"
          >
            {lang === 'ru' ? 'Всегда' : 'Always'}{' '}
            <span className="gradient-text">
              {lang === 'ru' ? 'на связи' : 'connected'}
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
            {lang === 'ru'
              ? 'Закажите через WhatsApp, позвоните или заезжайте — мы работаем круглосуточно'
              : 'Order via WhatsApp, call or visit — we work 24/7'}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* WhatsApp */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeInUp}
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="group relative p-8 rounded-2xl bg-deep-700/20 border border-deep-500/10 hover:border-terracotta/20 hover:shadow-2xl hover:shadow-terracotta/5 transition-shadow duration-300 backdrop-blur-sm overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-terracotta/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative">
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-terracotta/10 flex items-center justify-center group-hover:bg-terracotta/15 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-terracotta/10 transition-transform duration-300">
                  <MessageCircle className="text-terracotta" size={26} />
                </div>
                <div className="flex-1">
                  <h3 className="text-cream font-semibold text-lg mb-1 group-hover:text-terracotta-light transition-colors duration-300">
                    WhatsApp
                  </h3>
                  <p className="text-stone-400 text-sm mb-4 leading-relaxed">
                    {lang === 'ru'
                      ? 'Быстрый заказ и ответ на вопросы'
                      : 'Quick order and answers to questions'}
                  </p>
                  <motion.a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="premium-btn premium-btn-terracotta text-sm"
                  >
                    <MessageCircle size={16} />
                    {lang === 'ru' ? 'Написать в WhatsApp' : 'Write on WhatsApp'}
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Phone */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeInUp}
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="group relative p-8 rounded-2xl bg-deep-700/20 border border-deep-500/10 hover:border-teal/20 hover:shadow-2xl hover:shadow-teal/5 transition-shadow duration-300 backdrop-blur-sm overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-teal/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative">
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-teal/10 flex items-center justify-center group-hover:bg-teal/15 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-teal/10 transition-transform duration-300">
                  <Phone className="text-teal" size={26} />
                </div>
                <div>
                  <h3 className="text-cream font-semibold text-lg mb-1 group-hover:text-teal transition-colors duration-300">
                    {lang === 'ru' ? 'Телефон' : 'Phone'}
                  </h3>
                  <p className="text-stone-400 text-sm mb-2">
                    {lang === 'ru' ? 'Звоните в любое время' : 'Call anytime'}
                  </p>
                  <a
                    href={`tel:+${contacts.phone}`}
                    className="text-stone-300 hover:text-teal transition-colors duration-300 text-lg font-medium"
                  >
                    {contacts.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Map + Address + Hours - full width below */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mt-6">
          {/* Address + 2GIS */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeInUp}
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="group relative p-8 rounded-2xl bg-deep-700/20 border border-deep-500/10 hover:border-terracotta/20 hover:shadow-2xl hover:shadow-terracotta/5 transition-shadow duration-300 backdrop-blur-sm overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-terracotta/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative">
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-terracotta/10 flex items-center justify-center group-hover:bg-terracotta/15 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-terracotta/10 transition-transform duration-300">
                  <MapPin className="text-terracotta" size={26} />
                </div>
                <div>
                  <h3 className="text-cream font-semibold text-lg mb-1 group-hover:text-terracotta-light transition-colors duration-300">
                    {lang === 'ru' ? 'Адрес' : 'Address'}
                  </h3>
                  <p className="text-stone-300 text-base mb-1">
                    {contacts.address}
                  </p>
                  <p className="text-stone-500 text-sm mb-4">
                    {lang === 'ru'
                    ? 'Боомское ущелье, трасса Бишкек — Иссык-Куль'
                      : 'Boom Gorge, Bishkek — Issyk-Kul highway'}
                  </p>
                  <motion.a
                    href={contacts.twoGisUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="premium-btn premium-btn-ghost text-xs"
                  >
                    {lang === 'ru' ? 'Мы в 2ГИС' : 'We are on 2GIS'}
                    <svg
                      className="w-3.5 h-3.5 ml-0.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M7 17L17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Working hours */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeInUp}
            whileHover={{ y: -6, scale: 1.01 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="group relative p-8 rounded-2xl bg-deep-700/20 border border-deep-500/10 hover:border-teal/20 hover:shadow-2xl hover:shadow-teal/5 transition-shadow duration-300 backdrop-blur-sm overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-teal/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative">
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-teal/10 flex items-center justify-center group-hover:bg-teal/15 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-teal/10 transition-transform duration-300">
                  <Clock className="text-teal" size={26} />
                </div>
                <div>
                  <h3 className="text-cream font-semibold text-lg mb-1 group-hover:text-teal transition-colors duration-300">
                    {lang === 'ru' ? 'Часы работы' : 'Working hours'}
                  </h3>
                  <p className="text-stone-300 text-base font-medium">
                    {contacts.workingHours}
                  </p>
                  <p className="text-stone-500 text-sm mt-2">
                    {lang === 'ru'
                      ? 'Всегда готовы вас принять'
                      : 'Always ready to welcome you'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
