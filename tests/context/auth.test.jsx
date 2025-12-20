import React from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { AuthProvider, useAuth } from '../../src/context/AuthContext'

function TestComp() {
  const { user, login, logout } = useAuth()
  return (
    <div>
      <div data-testid="user">{user ? user.email : 'no-user'}</div>
      <button onClick={() => login('a@a.com', false)}>login-session</button>
      <button onClick={() => login('b@b.com', true)}>login-remember</button>
      <button onClick={() => logout()}>logout</button>
    </div>
  )
}

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear()
    sessionStorage.clear()
    document.cookie = ''
    vi.useFakeTimers()
  })

  it('login with remember uses localStorage', async () => {
    render(<AuthProvider><TestComp /></AuthProvider>)
    screen.getByText('login-remember').click()
    await waitFor(() => expect(screen.getByTestId('user').textContent).toBe('b@b.com'))
    expect(localStorage.getItem('user')).toBe(JSON.stringify({ email: 'b@b.com' }))
    expect(sessionStorage.getItem('user')).toBeNull()
    // cookie should exist
    expect(document.cookie.includes('session=active')).toBe(true)
  })

  it('login without remember uses sessionStorage', async () => {
    render(<AuthProvider><TestComp /></AuthProvider>)
    screen.getByText('login-session').click()
    await waitFor(() => expect(screen.getByTestId('user').textContent).toBe('a@a.com'))
    expect(sessionStorage.getItem('user')).toBe(JSON.stringify({ email: 'a@a.com' }))
    expect(localStorage.getItem('user')).toBeNull()
  })

  it('auto logout when cookie removed', async () => {
    render(<AuthProvider><TestComp /></AuthProvider>)
    // login session
    screen.getByText('login-session').click()
    await waitFor(() => expect(screen.getByTestId('user').textContent).toBe('a@a.com'))

    // remove cookie and advance timers so interval fires
    document.cookie = 'session=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
    // advance 11 seconds to trigger the 10s interval
    vi.advanceTimersByTime(11000)

    await waitFor(() => expect(screen.getByTestId('user').textContent).toBe('no-user'))
  })
})
