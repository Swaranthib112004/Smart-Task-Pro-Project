// Test setup: clear storages before each test
import { beforeEach } from 'vitest'

beforeEach(() => {
  localStorage.clear()
  sessionStorage.clear()
  // clear cookies
  const cookies = document.cookie.split(';')
  for (const c of cookies) {
    const idx = c.indexOf('=')
    const name = idx > -1 ? c.substr(0, idx).trim() : c.trim()
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  }
})
