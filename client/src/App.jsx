import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  //Get user data from local storage
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected layout 
         Render MainLayout only if user is logged in*/}
        {user && (
          <Route path="/" element={<MainLayout />}>
            {/* Admin routes */}
            {user?.role === "admin" && (
              <>
                <Route index element={<Navigate to="/home" replace />} />
                <Route path="home" element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="my-profile" element={<MyProfile />} />
              </>
            )}

            {/* User routes */}

            {user?.role === "user" && (
              <>
                <Route index element={<Navigate to="/my-profile" replace />} />
                <Route path="my-profile" element={<MyProfile />} />
                <Route path="contact" element={<Contact />} />
              </>
            )}
          </Route>
        )}

        {/* Redirect if not logged in */}
        {!user && <Route path="*" element={<Navigate to="/login" replace />} />}
      </Routes>
    </Router>
  );
}

export default App;
