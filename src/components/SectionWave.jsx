/**
 * SectionWave
 * ─────────────────────────────────────────────
 * Smooth SVG wave divider between sections.
 * Uses a gradient fill that blends canyon-dark
 * into warm-white, creating a "seamless flow"
 * rather than an abrupt color break.
 */
export default function SectionWave({
  fill = '#1a0a0a',
  flip = false,
  className = '',
}) {
  return (
    <div
      aria-hidden="true"
      className={`relative w-full overflow-hidden leading-none ${
        flip ? 'rotate-180' : ''
      } ${className}`}
    >
      <svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className="block w-full h-[50px] md:h-[90px]"
      >
        {/* Subtle gradient fill — smooth transition between sections */}
        <defs>
          <linearGradient id="waveGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={fill} stopOpacity="0.6" />
            <stop offset="100%" stopColor={fill} stopOpacity="0.15" />
          </linearGradient>
        </defs>
        <path
          d="M0,60 C240,110 480,0 720,40 C960,80 1200,20 1440,55 L1440,90 L0,90 Z"
          fill="url(#waveGrad)"
        />
        <path
          d="M0,45 C260,95 520,10 760,50 C1000,90 1240,25 1440,60 L1440,90 L0,90 Z"
          fill={fill}
          opacity="0.25"
        />
      </svg>
    </div>
  )
}
