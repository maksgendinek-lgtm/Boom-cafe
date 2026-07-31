import { useState, useMemo } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Search } from 'lucide-react'
import { menuData } from '../data/menuData'
import { staggerContainerFast } from '../utils/motion'
import { useLanguage } from '../context/LanguageContext'

function formatPrice(price) {
  return `${price} сом`
}

function getLocalizedText(text, lang) {
  if (!text) return ''
  if (lang === 'en') {
    const parts = text.split(' / ')
    return parts[1] || parts[0]
  }
  const parts = text.split(' / ')
  return parts[0]
}

/* Premium reveal variant — opacity + translateY + scale(0.95→1), easeOut */
const revealItem = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState(menuData[0].category)
  const [search, setSearch] = useState('')
  const { lang } = useLanguage()
  const { scrollY } = useScroll()
  const sectionOpacity = useTransform(scrollY, [0, 200], [0.3, 1])
  const sectionY = useTransform(scrollY, [0, 400], [60, 0])

  const isSearching = search.trim().length > 0

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return null
    return menuData.flatMap((cat) =>
      cat.items
        .filter((item) => {
          const localizedName = getLocalizedText(item.name, lang)
          return localizedName.toLowerCase().includes(query)
        })
        .map((item) => ({ ...item, category: cat.category }))
    )
  }, [search, lang])

  const activeItems = useMemo(() => {
    if (isSearching) return filteredItems
    return menuData.find((cat) => cat.category === activeCategory)?.items ?? []
  }, [activeCategory, isSearching, filteredItems])

  return (
    <section id="menu" className="relative py-28 md:py-36 overflow-hidden">
      {/* Semi-transparent section background — lets PremiumBackground show through */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-800/30 via-deep-900/10 to-deep-900/10" />
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-terracotta/4 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-teal/3 rounded-full blur-3xl" />

      <motion.div
        style={{ opacity: sectionOpacity, y: sectionY }}
        className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-120px' }}
          variants={staggerContainerFast}
          className="text-center mb-24"
        >
          <motion.h2
            variants={revealItem}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-cream mb-8 leading-[1.1]"
          >
            {lang === 'ru' ? 'Наше' : 'Our'}{' '}
            <span className="gradient-text">
              {lang === 'ru' ? 'меню' : 'menu'}
            </span>
          </motion.h2>
          <motion.div
            variants={revealItem}
            className="w-24 h-1 bg-gradient-to-r from-terracotta via-terracotta to-teal mx-auto rounded-full mb-8"
          />
          <motion.p
            variants={revealItem}
            className="text-stone-400 text-xl max-w-2xl mx-auto leading-relaxed"
          >
            {lang === 'ru'
              ? 'Топовые блюда — с историей. Остальное — компактным списком.'
              : 'Top dishes — with a story. The rest — in a compact list.'}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainerFast}
          className="relative max-w-xl mx-auto mb-20"
        >
          <motion.div variants={revealItem}>
            <Search
              className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-terracotta transition-colors"
              size={20}
            />
            <input
              type="text"
              placeholder={lang === 'ru' ? 'Поиск по меню...' : 'Search menu...'}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-deep-700/60 border border-deep-500/20 rounded-full text-stone-300 placeholder:text-stone-500 focus:outline-none focus:border-terracotta/30 focus:bg-deep-700/90 focus:shadow-xl focus:shadow-terracotta/5 transition-all duration-300"
            />
          </motion.div>
        </motion.div>

        {!isSearching && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={staggerContainerFast}
            className="flex gap-2 overflow-x-auto pb-6 mb-16"
          >
            {menuData.map((cat) => (
              <motion.button
                key={cat.category}
                variants={revealItem}
                onClick={() => setActiveCategory(cat.category)}
                className={`flex-shrink-0 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  activeCategory === cat.category
                    ? 'bg-terracotta text-white shadow-xl shadow-terracotta/25'
                    : 'bg-deep-700/40 text-stone-300 hover:text-cream hover:bg-deep-600/40 border border-deep-500/15 backdrop-blur-sm'
                }`}
              >
                {getLocalizedText(cat.category, lang)}
              </motion.button>
            ))}
          </motion.div>
        )}

        {isSearching && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-stone-500 mb-12"
          >
            {filteredItems.length > 0
              ? lang === 'ru'
                ? `Найдено: ${filteredItems.length}`
                : `Found: ${filteredItems.length}`
              : lang === 'ru'
                ? 'Ничего не найдено. Попробуйте другой запрос.'
                : 'Nothing found. Try another query.'}
          </motion.p>
        )}

        {/* Premium menu grid — card hover: scale + shadow, 0.3s */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`regular-${isSearching ? search : activeCategory}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            exit="hidden"
            variants={staggerContainerFast}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {(isSearching ? filteredItems : activeItems)?.map(
              (item, index) => (
                <motion.div
                  key={`${item.name}-${index}`}
                  variants={revealItem}
                >
                  <motion.div
                    whileHover={{ scale: 1.02, y: -4 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="group h-full p-5 rounded-xl bg-deep-700/30 border border-deep-500/15 hover:border-terracotta/25 hover:shadow-xl hover:shadow-terracotta/8 transition-shadow duration-300 backdrop-blur-sm"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-terracotta/15 to-teal/8 flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-terracotta/10 transition-transform duration-300">
                        <span className="font-display text-base font-bold gradient-text-warm">
                          {getLocalizedText(item.name, lang).charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-cream font-medium leading-snug mb-1.5 group-hover:text-terracotta-light transition-colors duration-300">
                          {getLocalizedText(item.name, lang)}
                        </h3>
                        {item.desc && (
                          <p className="text-stone-500 text-xs leading-relaxed mb-2 line-clamp-2">
                            {getLocalizedText(item.desc, lang)}
                          </p>
                        )}
                        <p className="text-terracotta font-semibold text-sm">
                          {formatPrice(item.price)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
