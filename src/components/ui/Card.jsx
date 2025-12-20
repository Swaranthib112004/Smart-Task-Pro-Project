import React from "react";

export default function Card({ children, style }) {
  return (
    <div style={{ background: "white", borderRadius: 8, padding: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", ...style }}>
      {children}
    </div>
  );
}
