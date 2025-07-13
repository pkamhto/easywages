// src/admin/AdminLogin.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Baad me backend se verify karenge
    if (
      credentials.email === "admin@easywages.com" &&
      credentials.password === "admin123"
    ) {
      navigate("/admin/dashboard");
    } else {
      alert("❌ Invalid Admin Credentials");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "2rem" }}>
      <h2>🔐 Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Admin Email"
          value={credentials.email}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "1rem" }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: "10px", marginBottom: "1rem" }}
        />
        <button type="submit" style={{ padding: "10px 20px" }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
