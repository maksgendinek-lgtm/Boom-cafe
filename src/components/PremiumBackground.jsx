import { motion } from 'framer-motion'

/**
 * PremiumBackground
 * ─────────────────────────────────────────────
 * Multi-layer animated gradient background with:
 *   1. Slow "breathing" gradient (canyon dark + warm white)
 *   2. Burgundy #6D0C0E ambient glows
 *   3. Fine noise / grain overlay for depth
 *
 * Used as a fixed base behind all content.
 * Sections sit on top with their own (semi-transparent) backgrounds
 * so the animated gradient subtly shows through — creating a
 * "smooth background flow" between sections rather than abrupt cuts.
 */
export default function PremiumBackground() {
  return (
    <>
      {/* Layer 1: animated gradient base */}
      <motion.div
        aria-hidden="true"
        className="fixed inset-0 -z-10"
        style={{
          background:
            'linear-gradient(135deg, #FAF8F5 0%, #F5F0EA 50%, #FAF8F5 100%)',
          backgroundSize: '400% 400%',
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 30,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />

      {/* Layer 2: burgundy ambient glows (slow pulse) */}
      <motion.div
        aria-hidden="true"
        className="fixed -z-10 rounded-full blur-3xl"
        style={{
          width: '800px',
          height: '400px',
          top: '25%',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'radial-gradient(circle, rgba(109,12,14,0.06) 0%, transparent 70%)',
        }}
        animate={{
          opacity: [0.06, 0.09, 0.06],
          scale: [1, 1.03, 1],
        }}
        transition={{
          duration: 20,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />
      <motion.div
        aria-hidden="true"
        className="fixed -z-10 rounded-full blur-3xl"
        style={{
          width: '600px',
          height: '600px',
          bottom: '20%',
          right: '5%',
          background: 'radial-gradient(circle, rgba(109,12,14,0.04) 0%, transparent 70%)',
        }}
        animate={{
          opacity: [0.04, 0.07, 0.04],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 25,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'reverse',
          delay: 3,
        }}
      />

      {/* Layer 3: fine noise / grain overlay */}
      <motion.div
        aria-hidden="true"
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          opacity: 0.03,
          mixBlendMode: 'multiply',
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
        }}
      />
    </>
  )
}
