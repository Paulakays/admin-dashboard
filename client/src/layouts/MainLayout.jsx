import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";

// Main layout component with Navbar, Footer, and Outlet for nested routes
function MainLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Container sx={{ mt: 4 }}>
          {/* Nested routes will be rendered here */}
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
