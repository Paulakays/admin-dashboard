import React from "react";
import { Container, Box } from "@mui/material";

function AuthLayout({ children }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f4f6f8",
      }}
    >
      <Container maxWidth="sm">{children}</Container>
    </Box>
  );
}

export default AuthLayout;
