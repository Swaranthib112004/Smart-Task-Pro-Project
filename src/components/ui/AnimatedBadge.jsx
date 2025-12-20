import React from 'react'
import { Box } from '@mui/material'
import { prefersReducedMotion } from '../../utils/motion'

export default function AnimatedBadge({ children, color = '#f59e0b' }) {
  const reduced = prefersReducedMotion()
  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
      <Box sx={{ width: 10, height: 10, borderRadius: '50%', background: color, boxShadow: `0 6px 18px ${color}33`, animation: reduced ? 'none' : 'pulse 1200ms infinite' }} />
      <style>{`@keyframes pulse { 0%{transform:scale(.85);opacity:.85}50%{transform:scale(1.05);opacity:1}100%{transform:scale(.85);opacity:.85} }`}</style>
      <Box sx={{ fontSize: 13 }}>{children}</Box>
    </Box>
  )
}
