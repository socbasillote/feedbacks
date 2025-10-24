import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home"; // You can make this later
import { AuthProvider } from "./context/AuthContext";
import MyFeedback from "./pages/MyFeedback";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/my" element={<MyFeedback />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
