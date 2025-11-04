
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Container sx={{ mt: 4 }}>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
