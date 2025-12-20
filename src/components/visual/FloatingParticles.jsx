import React, { useEffect } from 'react';
import useVisuals from '../../hooks/useVisuals'

export default function FloatingParticles({ count = 8, color = 'rgba(255,255,255,0.08)' }) {
  const { visualsEnabled } = useVisuals();
  if (!visualsEnabled) return null;

  useEffect(() => {
    // lightweight CSS particle generation handled via inline styles
  }, []);

  const nodes = new Array(count).fill(0).map((_, i) => (
    <div key={i} style={{
      position: 'absolute',
      width: 24 + (i % 5) * 6,
      height: 24 + (i % 7) * 5,
      borderRadius: '50%',
      left: `${(i * 13) % 96}%`,
      top: `${(i * 23) % 84}%`,
      background: color,
      filter: 'blur(6px)',
      transform: `translate3d(0,0,0)`,
      animation: `float${i % 4} 9s ease-in-out ${i * 0.4}s infinite`
    }} />
  ));

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      <style>{`
        @keyframes float0 { 0%{transform:translateY(0)}50%{transform:translateY(-18px)}100%{transform:translateY(0)} }
        @keyframes float1 { 0%{transform:translateY(0)}50%{transform:translateY(-28px)}100%{transform:translateY(0)} }
        @keyframes float2 { 0%{transform:translateY(0)}50%{transform:translateY(-12px)}100%{transform:translateY(0)} }
        @keyframes float3 { 0%{transform:translateY(0)}50%{transform:translateY(-22px)}100%{transform:translateY(0)} }
      `}</style>
      {nodes}
    </div>
  );
}
