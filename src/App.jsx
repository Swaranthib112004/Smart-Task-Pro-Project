import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Tasks from "./pages/Tasks";
import { getCookie } from "./utils/cookie";
import { useAuth } from "./context/AuthContext";
import { ThemeProvider, CssBaseline, AppBar, Toolbar, Typography, Button, Container, Fade } from "@mui/material";
import { getTheme } from "./theme";
import { motion as motionUtils, prefersReducedMotion } from './utils/motion'

export default function App() {
  console.log("App render");
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const location = useLocation();

  // Track theme reactively so ThemeProvider updates when the user changes theme in Profile
  const [themeName, setThemeName] = React.useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.body.dataset.theme = themeName;
    localStorage.setItem("theme", themeName);
  }, [themeName]);

  useEffect(() => {
    const onThemeChange = (e) => {
      if (e && e.detail) setThemeName(e.detail);
    };
    window.addEventListener('themechange', onThemeChange);
    return () => window.removeEventListener('themechange', onThemeChange);
  }, []);

  // If the session ends elsewhere, redirect to login to avoid showing protected content
  useEffect(() => {
    if (!user && location.pathname !== "/login") {
      navigate("/login");
    }
  }, [user, location.pathname, navigate]);

  const logged = Boolean(getCookie("session"));

  const theme = getTheme(themeName);
  // useLocation already declared above; avoid redeclaration

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <AppBar position="static" elevation={0} sx={{ background: theme.palette.mode === 'dark' ? 'rgba(8,12,18,0.6)' : 'rgba(255,255,255,0.66)', backdropFilter: 'blur(8px)', borderBottom: '1px solid rgba(15,23,42,0.04)' }}>
        <Toolbar sx={{gap:2}}>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>SmartTask</Typography>
          <Button color="inherit" onClick={() => navigate('/dashboard')}>Dashboard</Button>
          <Button color="inherit" onClick={() => navigate('/tasks')}>Tasks</Button>
          <Button color="inherit" onClick={() => navigate('/profile')}>Profile</Button>
          {user ? (
            <Button color="inherit" onClick={() => { logout(); navigate('/login'); }}>Logout</Button>
          ) : (
            <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
          )}
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        {/* Page transition: Fade on route change. Respect reduced motion preference. */}
        <Fade in timeout={motionUtils.medium} key={location.pathname} exit={!prefersReducedMotion()}>
          <div>
            <Routes location={location}>
              <Route path="/" element={<Navigate to={logged ? "/dashboard" : "/login"} />} />
              <Route path="/login" element={<Login />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/profile" element={<Profile />} />
              </Route>

              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </Fade>
      </Container>
    </ThemeProvider>
  );
}
