import { createContext, useContext, useEffect, useState, useRef } from "react";
import { setCookie, getCookie, deleteCookie, getSessionExpiry } from "../utils/cookie";
import { useNotifications } from './NotificationContext'

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const warnTimeoutRef = useRef(null);
  const logoutTimeoutRef = useRef(null);
  const { notify, dismiss } = useNotifications() || {};

  useEffect(() => {
    console.log("AuthProvider: initializing auth state");
    const storedLocal = localStorage.getItem("user");
    const storedSession = sessionStorage.getItem("user");
    const session = getCookie("session");

    // Prefer localStorage (remembered) over sessionStorage
    if (session && (storedLocal || storedSession)) {
      const src = storedLocal || storedSession;
      setUser(JSON.parse(src));
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!getCookie("session")) {
        logout();
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const login = (email, remember) => {
    console.log("AuthProvider.login", email, remember);
    const hours = remember ? 24 * 7 : 1;
    setCookie("session", "active", hours);
    // schedule warning and logout
    scheduleExpiryHandlers(hours * 60 * 60 * 1000);
    const u = JSON.stringify({ email });
    if (remember) {
      localStorage.setItem("user", u);
      sessionStorage.removeItem("user");
    } else {
      sessionStorage.setItem("user", u);
      localStorage.removeItem("user");
    }
    setUser({ email });
  };

  function clearExpiryHandlers() {
    if (warnTimeoutRef.current) { clearTimeout(warnTimeoutRef.current); warnTimeoutRef.current = null }
    if (logoutTimeoutRef.current) { clearTimeout(logoutTimeoutRef.current); logoutTimeoutRef.current = null }
  }

  function scheduleExpiryHandlers(msFromNow) {
    clearExpiryHandlers();
    // warn 60 seconds before expiry
    const warnAt = Math.max(0, msFromNow - 60000);
    warnTimeoutRef.current = setTimeout(() => {
      if (notify) {
        const key = notify({ message: 'Your session will expire in 1 minute', severity: 'warning', duration: 60000, action: (
          <button onClick={() => { setCookie('session','active',1); dismiss && dismiss(key); notify({ message: 'Session extended', severity: 'success' }) }} style={{ marginLeft: 12, background: 'transparent', border: 'none', color: 'inherit', fontWeight: 700 }}>Extend</button>
        ) })
      }
    }, warnAt);

    logoutTimeoutRef.current = setTimeout(() => {
      logout();
    }, msFromNow);
  }

  const logout = () => {
    console.log("AuthProvider.logout");
    deleteCookie("session");
    clearExpiryHandlers();
    // keep other app data (tasks) intact; only remove user/session
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    setUser(null);
    if (notify) notify({ message: 'You have been logged out', severity: 'info' });
  };

  // On mount, if a session expiry exists, schedule handlers
  useEffect(() => {
    const expiry = getSessionExpiry();
    if (expiry && expiry > Date.now()) {
      scheduleExpiryHandlers(expiry - Date.now());
    }
    return () => clearExpiryHandlers();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    // Graceful fallback to avoid hard crashes when component is rendered outside provider
    console.warn("useAuth must be used within an AuthProvider. Returning noop defaults.");
    return {
      user: null,
      login: () => {},
      logout: () => {},
    };
  }
  return ctx;
};
