import React from "react";

export default function Button({ children, onClick, variant = "primary", style, className, type = "button" }) {
  const base = {
    padding: "10px 16px",
    borderRadius: "var(--card-radius, 12px)",
    cursor: "pointer",
    border: "none",
    fontWeight: 600,
    fontSize: 14,
    lineHeight: '20px',
    transition: 'transform 180ms cubic-bezier(.2,.9,.2,1), box-shadow 180ms',
    boxShadow: 'var(--glass-shadow, 0 6px 18px rgba(12,18,22,0.04))'
  };

  const variants = {
    primary: { background: 'var(--accent-gradient)', color: 'var(--text, #04293a)' },
    text: { background: 'transparent', color: 'var(--accent, #7dd3fc)' },
    danger: { background: '#d32f2f', color: 'white' },
  };

  const focusStyle = {
    outline: 'none',
    boxShadow: '0 6px 18px rgba(12,18,22,0.08), 0 0 0 4px rgba(125,211,252,0.12)'
  };

  const pressStyle = { transform: 'scale(.985)' };

  return (
    <button
      type={type}
      className={`soft-transition ${className || ""}`.trim()}
      style={{ ...base, ...(variants[variant] || variants.primary), ...style }}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === 'Enter') onClick && onClick(e); }}
      onFocus={(e) => Object.assign(e.currentTarget.style, focusStyle)}
      onBlur={(e) => Object.assign(e.currentTarget.style, { boxShadow: base.boxShadow })}
      onMouseDown={(e) => Object.assign(e.currentTarget.style, pressStyle)}
      onMouseUp={(e) => Object.assign(e.currentTarget.style, { transform: 'none' })}
      onPointerDown={(e) => Object.assign(e.currentTarget.style, pressStyle)}
      onPointerUp={(e) => Object.assign(e.currentTarget.style, { transform: 'none' })}
    >
      {children}
    </button>
  );
}
