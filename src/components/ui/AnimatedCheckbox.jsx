import React from 'react'

export default function AnimatedCheckbox({ checked, onChange, label }) {
  return (
    <label style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }} aria-label={label}>
      <input type="checkbox" checked={checked} onChange={onChange} style={{ display: 'none' }} />
      <svg width="24" height="24" viewBox="0 0 24 24" style={{ display: 'block' }} aria-hidden>
        <rect x="2" y="2" width="20" height="20" rx="6" fill={checked ? 'var(--accent, #7dd3fc)' : 'transparent'} stroke={checked ? 'transparent' : 'rgba(15,23,42,0.12)'} strokeWidth="1.5" />
        <path
          d="M6 12l3 3 9-9"
          fill="none"
          stroke={checked ? '#04293a' : 'transparent'}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ transition: 'stroke-dashoffset 360ms cubic-bezier(.2,.9,.2,1), opacity 200ms', strokeDasharray: 20, strokeDashoffset: checked ? 0 : 20, opacity: checked ? 1 : 0 }}
        />
      </svg>
    </label>
  )
}
