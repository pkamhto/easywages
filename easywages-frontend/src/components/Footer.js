import React from "react";
import { Link } from "react-router-dom";  // ✅ Bas Link rakhna hai
import "./Footer.css";

function Footer() {
  return (
    <footer style={{ padding: "10px", background: "#222", color: "white" }}>
      <p>© 2025 EasyWages. All rights reserved.</p>
      <Link to="/about" style={{ color: "white", marginRight: "10px" }}>About</Link>
      <Link to="/contact" style={{ color: "white" }}>Contact</Link>
    </footer>
  );
}

export default Footer;
