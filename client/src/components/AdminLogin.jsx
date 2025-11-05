import { Button, Typography, Alert, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/admin-login", form);

      // store token and user
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
    <div style={{ maxWidth: 400, margin: "100px auto", textAlign: "center" }}>
      <Typography> User Login</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField label="Email" name="email" onChange={handleChange} />
        <TextField
          label="Password"
          name="password"
          type="password"
          onChange={handleChange}
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: "#6610f4",
            "&:hover": { backgroundColor: "#520dc2" },
          }}
        >
          Login
        </Button>
      </form>
      <Button onClick={() => navigate("/register")} sx={{ mt: 1 }}>
        Create Account
      </Button>
    </div>
  );
}

export default Login;
