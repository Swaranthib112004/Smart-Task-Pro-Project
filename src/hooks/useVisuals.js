import { useEffect, useState } from 'react';

export default function useVisuals() {
  const [enabled, setEnabled] = useState(() => typeof window !== 'undefined' ? (localStorage.getItem('profile:visuals') !== 'off') : true);

  useEffect(() => {
    function onChange(e) {
      if (e && e.detail !== undefined) setEnabled(Boolean(e.detail === 'on' || e.detail === true));
      else setEnabled(localStorage.getItem('profile:visuals') !== 'off');
    }
    window.addEventListener('visualschange', onChange);
    return () => window.removeEventListener('visualschange', onChange);
  }, []);

  return { visualsEnabled: enabled };
}
