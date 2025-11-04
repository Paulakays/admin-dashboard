
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import React from "react";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  let currentUser = null;
  try {
    const storedUser = localStorage.getItem("user");
    currentUser = storedUser ? JSON.parse(storedUser) : null;
  } catch (err) {
    console.error("Error parsing user from localStorage:", err);
    localStorage.removeItem("user"); // clear invalid data
  }

  const isAdmin = currentUser?.role === "admin";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
         Admin Dashboard
        </Typography>

        {currentUser && (
          <>
            {isAdmin ? (
              <>
                <Button color="inherit" component={Link} to="/home">
                  Home
                </Button>
                <Button color="inherit" component={Link} to="/about">
                  About
                </Button>
                <Button color="inherit" component={Link} to="/my-profile">
                  My Profile
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/my-profile">
                  My Profile
                </Button>
                <Button color="inherit" component={Link} to="/contact">
                  Contact
                </Button>
              </>
            )}
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}

        {!currentUser && (
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
