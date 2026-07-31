import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { stiffness: 500, damping: 35 })
  const springY = useSpring(y, { stiffness: 500, damping: 35 })

  useEffect(() => {
    // Только для устройств с точным указателем (мышь)
    if (!window.matchMedia('(pointer: fine)').matches) return

    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
      const target = e.target.closest('a, button, [role="button"], input, .glass-card, [data-cursor]')
      setHovering(Boolean(target))
    }
    const onLeave = () => setVisible(false)

    window.addEventListener('mousemove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [x, y])

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[100] hidden md:block"
      style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
    >
      <motion.div
        animate={{
          scale: hovering ? 2.5 : 1,
          opacity: visible ? (hovering ? 0.95 : 0.7) : 0,
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        className="w-4 h-4 rounded-full border-2 border-[#6D0C0E] bg-[#6D0C0E]/15"
      />
      {hovering && (
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="absolute inset-0 rounded-full border border-[#6D0C0E]/30"
          style={{ width: 40, height: 40, x: -18, y: -18 }}
        />
      )}
    </motion.div>
  )
}
