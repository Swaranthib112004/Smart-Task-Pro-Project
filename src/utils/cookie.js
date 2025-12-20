export function setCookie(name, value, hours) {
  const expires = new Date(Date.now() + hours * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
  // store timestamp of expiry for non-server session management
  if (name === 'session') {
    const ts = Date.now() + hours * 60 * 60 * 1000;
    try { localStorage.setItem('session:expires', String(ts)) } catch (e) {}
  }
}

export function getCookie(name) {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
}

export function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
  if (name === 'session') {
    try { localStorage.removeItem('session:expires') } catch (e) {}
  }
}

export function getSessionExpiry() {
  try {
    const raw = localStorage.getItem('session:expires');
    return raw ? parseInt(raw, 10) : null;
  } catch (e) {
    return null;
  }
}
