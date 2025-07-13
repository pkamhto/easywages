import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      {/* ✅ Hero Section */}
      <section className="hero">
        <h1>Welcome to EasyWages</h1>
        <p>Connecting labours with employers easily & efficiently.</p>
        <button className="cta-button">Get Started</button>
      </section>

      {/* ✅ Features Section */}
      <section className="features">
        <h2>Why Choose Us?</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <h3>📌 Quick Job Matching</h3>
            <p>Find jobs or labours within minutes.</p>
          </div>
          <div className="feature-card">
            <h3>💬 Instant Chat</h3>
            <p>Direct communication between employers and workers.</p>
          </div>
          <div className="feature-card">
            <h3>🌍 Available Worldwide</h3>
            <p>Expand opportunities across different locations.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
