import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// 3D-наклон в сторону курсора (макс. ~6°), spring-физика
export default function Tilt({ children, className = '', max = 6, ...props }) {
  const ref = useRef(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, { stiffness: 300, damping: 20 })
  const springY = useSpring(rotateY, { stiffness: 300, damping: 20 })

  const handleMove = (e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    rotateY.set(px * max * 2)
    rotateX.set(-py * max * 2)
  }

  const handleLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformPerspective: 800,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}