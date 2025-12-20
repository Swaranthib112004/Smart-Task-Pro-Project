import React, { useState, useEffect } from "react";
import { Card, Button, Typography, Box, TextField, Avatar, Switch, FormControlLabel } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNotifications } from '../context/NotificationContext'
import Stats from '../components/Stats'

export default function Profile() {
  const { user, login, logout } = useAuth();
  const [email, setEmail] = useState(user?.email || "");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [bio, setBio] = useState(localStorage.getItem('profile:bio') || '')
  const [avatar, setAvatar] = useState(localStorage.getItem('profile:avatar') || '')
  const [joined] = useState(localStorage.getItem('profile:joined') || new Date().toISOString())
  const [animations, setAnimations] = useState(localStorage.getItem('profile:animations') !== 'off')
  const { notify } = useNotifications() || {}

  useEffect(() => {
    document.body.dataset.theme = theme;
    localStorage.setItem("theme", theme);
    // Notify other parts of the app (App.jsx) that theme changed so MUI ThemeProvider can update
    try { window.dispatchEvent(new CustomEvent('themechange', { detail: theme })); } catch (e) { /* ignore */ }
  }, [theme]);

  useEffect(() => {
    document.body.dataset.anim = animations ? 'on' : 'off'
    localStorage.setItem('profile:animations', animations ? 'on' : 'off')
  }, [animations])

  const save = () => {
    // update user in localStorage
    const u = { email };
    localStorage.setItem("user", JSON.stringify(u));
    // update context – re-login to refresh
    login(email, true);
    localStorage.setItem('profile:bio', bio)
    localStorage.setItem('profile:avatar', avatar)
    localStorage.setItem('profile:joined', joined)
    notify && notify({ message: 'Profile saved', severity: 'success' })
  };

  function handleAvatar(e) {
    const f = e.target.files && e.target.files[0]
    if (!f) return
    const reader = new FileReader()
    reader.onload = () => { setAvatar(reader.result); localStorage.setItem('profile:avatar', reader.result) }
    reader.readAsDataURL(f)
  }

  function clearAll() {
    if (!confirm('Clear all app data including tasks and profile? This cannot be undone.')) return
    localStorage.clear()
    sessionStorage.clear()
    notify && notify({ message: 'All data cleared', severity: 'warning' })
    window.location.reload()
  }

  return (
    <Box sx={{ p: 3 }}>
      <Card sx={{ p: 2 }}>
        <Typography variant="h6">Profile</Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Avatar src={avatar} sx={{ width: 64, height: 64 }} />
          <input type="file" accept="image/*" onChange={handleAvatar} />
        </Box>
        <Typography sx={{ mt: 2, mb: 1 }}>Email</Typography>
        <TextField value={email} onChange={(e) => setEmail(e.target.value)} fullWidth sx={{ mb: 1 }} />
        <Typography sx={{ mb: 1 }}>Bio</Typography>
        <TextField value={bio} onChange={(e) => setBio(e.target.value)} fullWidth multiline rows={3} sx={{ mb: 1 }} />
        <Typography sx={{ mb: 1 }}>Theme</Typography>
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <Button variant={theme === 'light' ? 'contained' : 'text'} onClick={() => setTheme('light')}>Light</Button>
          <Button variant={theme === 'dark' ? 'contained' : 'text'} onClick={() => setTheme('dark')}>Dark</Button>
        </Box>

        <FormControlLabel control={<Switch checked={animations} onChange={(e) => setAnimations(e.target.checked)} />} label="Enable animations" />
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="contained" onClick={save}>Save</Button>
          <Button color="error" onClick={() => { logout(); }}>Logout</Button>
          <Button color="warning" onClick={clearAll}>Clear all data</Button>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2">Joined: {new Date(joined).toLocaleDateString()}</Typography>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Stats />
        </Box>
      </Card>
    </Box>
  );
}
