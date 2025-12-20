import React, { useEffect } from "react";

export default function Snackbar({ message, open, onClose }) {
  useEffect(() => {
    if (open) {
      const t = setTimeout(onClose, 2500);
      return () => clearTimeout(t);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div style={{ position: "fixed", bottom: 20, right: 20, background: "#323232", color: "white", padding: "10px 16px", borderRadius: 6 }}>
      {message}
    </div>
  );
}
