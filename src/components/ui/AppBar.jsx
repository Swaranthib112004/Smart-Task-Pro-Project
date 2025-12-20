import React from "react";

export default function AppBar({ title, children }) {
  return (
    <div style={{ background: "#0b5cff", color: "white", padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ fontWeight: 700 }}>{title}</div>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>{children}</div>
    </div>
  );
}
