import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-container">
      <h1>About EasyWages</h1>
      <p>
        EasyWages is a platform designed to bridge the gap between laborers and employers.
        Our goal is to make job searching and hiring simpler and more efficient.
      </p>

      <div className="about-section">
        <h2>Our Mission</h2>
        <p>
          We aim to provide a seamless experience for both workers and employers by offering a user-friendly 
          interface, instant job matching, and secure communication.
        </p>
      </div>

      <div className="about-section">
        <h2>Why Choose Us?</h2>
        <ul>
          <li>✅ Quick and easy job search</li>
          <li>✅ Direct communication between employers & laborers</li>
          <li>✅ Verified job listings & profiles</li>
          <li>✅ Secure and reliable platform</li>
        </ul>
      </div>
    </div>
  );
}

export default About;
