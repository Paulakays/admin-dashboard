import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function Navbar() {
    return(
        <Router>
           <Route path="/users" element={<Users/>} />
        </Router>
    );
}
