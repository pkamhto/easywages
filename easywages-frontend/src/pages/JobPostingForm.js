// src/pages/JobPostingForm.jsx

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const JobPostingForm = () => {
  const navigate = useNavigate();
  const [job, setJob] = useState({
    title: "",
    description: "",
    location: "",
    wage: "",
    category: "Construction",
  });

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/jobs/post",
        job,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Job posted successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to post job");
    }
  };

  return (
    <div className="job-post-form">
      <h2>Post a Job</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" onChange={handleChange} required />
        <textarea name="description" placeholder="Description" onChange={handleChange} />
        <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
        <input type="number" name="wage" placeholder="Wage" onChange={handleChange} required />
        <select name="category" onChange={handleChange}>
          <option>Construction</option>
          <option>Cleaning</option>
          <option>Delivery</option>
          <option>Plumbing</option>
          <option>Electrician</option>
          <option>Other</option>
        </select>
        <button type="submit">Post Job</button>
      </form>
    </div>
  );
};

export default JobPostingForm;
