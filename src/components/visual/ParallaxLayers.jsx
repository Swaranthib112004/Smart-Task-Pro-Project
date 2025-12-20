import React, { useRef } from 'react';
import useVisuals from '../../hooks/useVisuals'

export default function ParallaxLayers({ layers = [] }) {
  const { visualsEnabled } = useVisuals();
  const rootRef = useRef(null);
  if (!visualsEnabled) return (
    <div style={{ position: 'relative', overflow: 'hidden', background: layers[0] && `url(${layers[0].image}) center/cover no-repeat` }} />
  );

  function handleMove(e) {
    const el = rootRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    layers.forEach((layer, i) => {
      const node = el.querySelector(`[data-layer='${i}']`);
      if (!node) return;
      const depth = layer.depth || (i+1) * 4;
      node.style.transform = `translate3d(${x * depth}px, ${y * depth}px, 0)`;
    });
  }

  return (
    <div ref={rootRef} onMouseMove={handleMove} style={{ position: 'relative', overflow: 'hidden' }}>
      {layers.map((layer, i) => (
        <div key={i} data-layer={i} style={{ position: 'absolute', inset: 0, backgroundImage: layer.image ? `url(${layer.image})` : 'none', backgroundSize: 'cover', backgroundPosition: layer.position || 'center', transition: 'transform 220ms linear', pointerEvents: 'none', transform: 'translate3d(0,0,0)' }} />
      ))}
    </div>
  );
}
