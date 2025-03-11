import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import MyNavBar from "./Components/MyNavBar";
import MyFooter from "./Components/MyFooter";
import Home from "./Components/Home";
import Admin from "./Components/Admin";
import Contact from "./Components/Contact";
import Login from "./Components/Login";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <div>
      <MyNavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/admin" element={isAuthenticated ? <Admin /> : <Navigate to="/login" />} />
        <Route path="/aboutUs" element={<Contact />} />
      </Routes>
      <MyFooter />
    </div>
  );
}

export default App;
