import React from 'react'
import { Box, Typography } from '@mui/material'
import TagPill from '../ui/TagPill'

export default function CategoryImageCard({ image, category, title, tags = [] }){
  return (
    <Box sx={{ position: 'relative', overflow: 'hidden', borderRadius: 2, minHeight: 160, backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center', boxShadow: 'var(--glass-shadow)' }}>
      <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.14), rgba(0,0,0,0.4))' }} />
      <Box sx={{ position: 'absolute', left: 12, top: 12 }}>
        <TagPill sx={{ bgcolor: 'rgba(255,255,255,0.08)', color: '#fff' }}>{category}</TagPill>
      </Box>
      <Box sx={{ position: 'absolute', left: 12, bottom: 12, color: '#fff' }}>
        <Typography variant='h6' sx={{ fontWeight: 700 }}>{title}</Typography>
        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>{tags.slice(0,3).map((t,i) => <TagPill key={i} sx={{ bgcolor: 'rgba(255,255,255,0.06)', color: '#fff' }}>{t}</TagPill>)}</Box>
      </Box>
    </Box>
  )
}
