import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Card, TextField, Checkbox, FormControlLabel, Button, Typography, Box, Snackbar, Alert } from "@mui/material";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  console.log("Login: render");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");

  const handleLogin = () => {
    setLoading(true);
    // simulate API call
    setTimeout(() => {
      login(email, remember);
      setLoading(false);
      setToast("Logged in successfully");
      navigate("/dashboard");
    }, 800);
  };

  return (
    <Box sx={styles.wrapper}>
      <Card sx={styles.card}>
        <Typography variant="h5" sx={{ mb: 1 }}>SmartTask</Typography>

        <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth sx={{ mb: 1 }} />
        <TextField label="Password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" fullWidth sx={{ mb: 1 }} />

        <FormControlLabel control={<Checkbox checked={remember} onChange={(e) => setRemember(e.target.checked)} />} label="Remember Me" />

        <Button variant="contained" onClick={handleLogin} fullWidth sx={{ mt: 2 }}>{loading ? "Logging in…" : "Login"}</Button>
      </Card>

      <Snackbar open={Boolean(toast)} autoHideDuration={2500} onClose={() => setToast("")}> 
        <Alert severity="success" sx={{ width: '100%' }}>{toast}</Alert>
      </Snackbar>
    </Box>
  );
}

const styles = {
  wrapper: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    padding: 4,
    width: 340,
  },
};
