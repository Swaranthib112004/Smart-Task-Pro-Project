import React, { createContext, useContext, useState, useCallback } from 'react'
import { Snackbar, Alert, Slide } from '@mui/material'

const NotificationContext = createContext(null)

export function useNotifications() {
  return useContext(NotificationContext)
}

export function NotificationProvider({ children }) {
  const [queue, setQueue] = useState([])

  const notify = useCallback((payload) => {
    // payload: { key, message, severity='info', action }
    const key = payload.key || Date.now()
    setQueue((q) => [...q, { key, ...payload }])
    return key
  }, [])

  const dismiss = useCallback((key) => {
    setQueue((q) => q.filter((n) => n.key !== key))
  }, [])

  return (
    <NotificationContext.Provider value={{ notify, dismiss }}>
      {children}
      {/* Render snackbars stacked bottom-right */}
      <div>
        {queue.map((n) => (
          <Snackbar
            key={n.key}
            open
            autoHideDuration={n.duration || 3000}
            onClose={() => dismiss(n.key)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            TransitionComponent={Slide}
          >
            <Alert onClose={() => dismiss(n.key)} severity={n.severity || 'info'} sx={{ width: '100%' }}>
              {n.message}
              {n.action}
            </Alert>
          </Snackbar>
        ))}
      </div>
    </NotificationContext.Provider>
  )
}
