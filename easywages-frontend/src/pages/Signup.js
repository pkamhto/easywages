import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    category: "",
    dob: "",
    contact: "", // ✅ Add contact here
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Signup Successful! 🎉");
        navigate("/login");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Signup Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="signup-container">
      <h2>🚀 Create Your Account</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact Number"
          value={formData.contact}
          onChange={handleChange}
          required
        />

        <div className="form-group">
          <label className="label">Gender:</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleChange}
                required
              />{" "}
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleChange}
              />{" "}
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Other"
                checked={formData.gender === "Other"}
                onChange={handleChange}
              />{" "}
              Other
            </label>
          </div>
        </div>

        <div className="form-group">
          <label className="label">Category:</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="category"
                value="Labour"
                checked={formData.category === "Labour"}
                onChange={handleChange}
                required
              />{" "}
              Lab
            </label>
            <label>
              <input
                type="radio"
                name="category"
                value="Employer"
                checked={formData.category === "Employer"}
                onChange={handleChange}
              />{" "}
              Emp
            </label>
          </div>
        </div>

        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <a href="/login">Login here</a>
      </p>
    </div>
  );
};

export default Signup;
