import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import Tilt from './Tilt'
import { fadeInUp, staggerContainerFast, viewportOnce } from '../utils/motion'

// Динамический импорт (eager: false) — URL изображений загружаются асинхронно,
// не блокируя стартовую загрузку модуля и не резолвя все пути сразу.
const imageModules = import.meta.glob('../assets/gallery/*.webp', { eager: false, import: 'default' })
const imageKeys = Object.keys(imageModules).sort()

/** Скелетон-заглушка на время загрузки картинки */
function Skeleton() {
  return (
    <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-[#2a1a1a] to-[#1a0a0a] rounded-xl" />
  )
}

export default function DishGallery() {
  const [activeIndex, setActiveIndex] = useState(null)
  const [urls, setUrls] = useState({})

  const close = useCallback(() => setActiveIndex(null), [])

  // Асинхронно подгружаем URL изображений — не блокируем рендер
  useEffect(() => {
    let cancelled = false
    const loadAll = async () => {
      const entries = await Promise.all(
        imageKeys.map((key) => imageModules[key]())
      )
      if (!cancelled) {
        const map = {}
        entries.forEach((url, i) => { map[i] = url })
        setUrls(map)
      }
    }
    loadAll()
    return () => { cancelled = true }
  }, [])

  // Закрытие по Escape и блокировка скролла при открытом лайтбоксе
  useEffect(() => {
    if (activeIndex === null) return
    const onKey = (e) => e.key === 'Escape' && close()
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [activeIndex, close])

  return (
    <section id="gallery" className="bg-[#1a0a0a] py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeInUp}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center text-[#FAF8F5] mb-4">
            Наши блюда
          </h2>
          <div className="w-24 h-1 bg-[#6D0C0E] mx-auto mb-12 rounded-full" />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainerFast}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {imageKeys.map((key, i) => {
            const src = urls[i]
            // Первые 3 изображения (hero-карточки) загружаем eagerly, остальные — lazy
            const isHero = i < 3

            return (
              <motion.div key={key} variants={fadeInUp}>
                <Tilt max={6}>
                  <motion.button
                    type="button"
                    data-cursor
                    onClick={() => setActiveIndex(i)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="group block w-full overflow-hidden rounded-xl aspect-square focus:outline-none focus:ring-2 focus:ring-[#6D0C0E]"
                  >
                    <div className="relative w-full h-full">
                      {/* Skeleton-заглушка пока URL не загружен */}
                      {!src && <Skeleton />}

                      {src && (
                        <img
                          src={src}
                          alt={`Блюдо ${i + 1}`}
                          loading={isHero ? 'eager' : 'lazy'}
                          decoding="async"
                          width={400}
                          height={400}
                          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                        />
                      )}
                    </div>
                  </motion.button>
                </Tilt>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* Лайтбокс */}
      {activeIndex !== null && urls[activeIndex] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          <motion.button
            type="button"
            onClick={close}
            aria-label="Закрыть"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center rounded-full bg-[#6D0C0E] text-[#FAF8F5] text-2xl leading-none"
          >
            ×
          </motion.button>
          <motion.img
            src={urls[activeIndex]}
            alt={`Блюдо ${activeIndex + 1}`}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="max-w-full max-h-[90vh] rounded-xl object-contain shadow-2xl"
          />
        </div>
      )}
    </section>
  )
}