import React from 'react';
import { Box, Typography } from '@mui/material';

export default function ImageCard({ title, subtitle, image, style, onClick, children }) {
  return (
    <Box
      onClick={onClick}
      {...(image ? { 'data-preview': image } : {})}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 2,
        cursor: 'pointer',
        minHeight: 160,
        backgroundImage: image ? `url(${image})` : 'linear-gradient(135deg,#e6f7ff,#fff0f6)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        boxShadow: 'var(--glass-shadow, 0 8px 28px rgba(12,18,22,0.06))',
        '&:hover .overlay': { opacity: 1, transform: 'translateY(0)' },
        ...style
      }}
    >
      <Box className="overlay" sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(0,0,0,0.18),rgba(0,0,0,0.36))', opacity: 0.8, transition: 'opacity .28s, transform .28s', transform: 'translateY(6px)' }} />
      <Box sx={{ position: 'absolute', left: 16, bottom: 16, color: '#fff', zIndex: 2 }}>
        {title && <Typography variant="h6" sx={{ fontWeight: 700 }}>{title}</Typography>}
        {subtitle && <Typography variant="body2" sx={{ mt: .5 }}>{subtitle}</Typography>}
      </Box>
      <Box sx={{ position: 'absolute', inset: 8, zIndex: 1, pointerEvents: 'none', borderRadius: 2, border: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(6px)' }} />
      {children}
    </Box>
  );
}
