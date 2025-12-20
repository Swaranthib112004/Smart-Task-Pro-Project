import React from 'react'
import { Chip } from '@mui/material'

export default function TagPill({ children, color = 'primary', sx }) {
  return <Chip label={children} color={color} size="small" sx={{ fontWeight: 600, ...sx }} />
}
