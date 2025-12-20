import React, { useEffect, useRef, useState } from 'react'
import { Box, IconButton } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import useVisuals from '../../hooks/useVisuals'
import { prefersReducedMotion } from '../../utils/motion'

export default function StorySlides({ slides = [], auto = true, interval = 4000, enabled = true }) {
  const { visualsEnabled } = useVisuals();
  const reduced = prefersReducedMotion();
  const shouldRun = enabled && visualsEnabled && !reduced;
  const [index, setIndex] = useState(0);
  const rootRef = useRef(null);
  const touch = useRef({ startX: 0, lastX: 0 });

  useEffect(() => {
    if (!shouldRun || slides.length <= 1) return;
    const id = setInterval(() => setIndex(i => (i + 1) % slides.length), interval);
    return () => clearInterval(id);
  }, [shouldRun, slides.length, interval]);

  useEffect(() => {
    function onKey(e) {
      if (!rootRef.current) return;
      if (document.activeElement !== rootRef.current) return;
      if (e.key === 'ArrowLeft') setIndex(i => (i - 1 + slides.length) % slides.length);
      if (e.key === 'ArrowRight') setIndex(i => (i + 1) % slides.length);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [slides.length]);

  function onTouchStart(e) { touch.current.startX = e.touches[0].clientX; touch.current.lastX = touch.current.startX; }
  function onTouchMove(e) { touch.current.lastX = e.touches[0].clientX; }
  function onTouchEnd() {
    const dx = touch.current.lastX - touch.current.startX;
    if (Math.abs(dx) > 40) {
      if (dx < 0) setIndex(i => (i + 1) % slides.length);
      else setIndex(i => (i - 1 + slides.length) % slides.length);
    }
  }

  if (!slides.length) return null;

  return (
    <Box ref={rootRef} tabIndex={0} aria-label="Story slides" sx={{ position: 'relative', borderRadius: 2, overflow: 'hidden' }} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
      {slides.map((s, i) => (
        <Box key={i} sx={{ display: i === index ? 'block' : 'none', transition: 'opacity .36s ease', backgroundImage: `url(${s.image})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: 280 }}>
          <Box sx={{ p: 3, color: '#fff' }}>{s.title && <h3 style={{ margin: 0 }}>{s.title}</h3>}{s.subtitle && <p style={{ margin: 0 }}>{s.subtitle}</p>}</Box>
        </Box>
      ))}
      <IconButton aria-label="previous" sx={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)' }} onClick={() => setIndex(i => (i - 1 + slides.length) % slides.length)}><ArrowBackIosNewIcon /></IconButton>
      <IconButton aria-label="next" sx={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)' }} onClick={() => setIndex(i => (i + 1) % slides.length)}><ArrowForwardIosIcon /></IconButton>
    </Box>
  );
}
