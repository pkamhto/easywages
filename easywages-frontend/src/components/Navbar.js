import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";  // CSS file ensure karo

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo">EasyWages</div>

      {/* Hamburger Button */}
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </div>

      {/* Menu Items */}
      <ul className={isOpen ? "nav-links open" : "nav-links"}>
        <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
        <li><Link to="/about" onClick={() => setIsOpen(false)}>About</Link></li>
        <li><Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link></li>
        <li><Link to="/jobs" onClick={() => setIsOpen(false)}>Jobs</Link></li>               {/* 👈 NEW */}
        <li><Link to="/post-job" onClick={() => setIsOpen(false)}>Post Job</Link></li>       {/* 👈 NEW */}
        <li><Link to="/login" onClick={() => setIsOpen(false)}>Login</Link></li>
        <li><Link to="/signup" onClick={() => setIsOpen(false)}>Signup</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
