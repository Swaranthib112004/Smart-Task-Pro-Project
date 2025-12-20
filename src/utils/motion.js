export const prefersReducedMotion = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const motion = {
  short: 160,
  medium: 300,
  long: 600,
}

export default { prefersReducedMotion, motion }
