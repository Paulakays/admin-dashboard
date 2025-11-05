import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Alert,
  Box,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "../styles/App.css";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/login", form); 
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <Box className="auth-wrapper">
      <Paper elevation={4} className="auth-box">
        <Typography variant="h5" className="auth-title">
          User Login
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
            fullWidth
            type="email"
            value={form.email}
            onChange={handleChange}
          />
          <TextField
            label="Password"
            name="password"
            fullWidth
            type="password"
            value={form.password}
            onChange={handleChange}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2, backgroundColor: "#6610f4" }}
          >
            Login
          </Button>
        </form>

        <Button variant="text" fullWidth onClick={() => navigate("/register")}>
          Create Account
        </Button>
      </Paper>
    </Box>
  );
}

export default Login;
