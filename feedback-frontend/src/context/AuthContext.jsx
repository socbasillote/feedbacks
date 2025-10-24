import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const API_BASE = "http://localhost:5000";
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(null);

  // Load user safely from LocalStorage on startup
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error(" Failed to parse user from localStorage", error);
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  }, []);


  const login = async (email, password) => {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token); // store token
        return { success: true };
      } else {
        return { success: false, message: data.message || "Login failed." };
      }
    } catch (err) {
      console.error("Error logging in:", err);
      return { success: false, message: "Server error."};
    }
  };

  const signup = async (email, password) => {
    try {
      const res = await fetch(`${API_BASE}/auth/signup`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token); // store token
        return { success: true };
      } else {
        return { success: false, message: data.message || "Signup failed." };
      }
    } catch (err) {
      console.error("Error signning up:", err);
      return { success: false, message: "Server error." };
    }
  };



  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user,  login, logout, signup, isAuthenticated: !!user, }}>
      {children}
    </AuthContext.Provider>
  );
};
