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

function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    }
  };

  return (
    <Box className="auth-wrapper">
      <Paper elevation={4} className="auth-box">
        <Typography variant="h5" className="auth-title">
          User Registration
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField
            label="First Name"
            name="firstName"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            label="Last Name"
            name="lastName"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            label="Email"
            name="email"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            label="Phone"
            name="phone"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            label="Role"
            name="role"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            fullWidth
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Register
          </Button>
        </form>

        <Button variant="text" fullWidth onClick={() => navigate("/login")}>
          Back to Login
        </Button>
      </Paper>
    </Box>
  );
}

export default Register;
