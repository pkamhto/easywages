// src/pages/JobList.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/jobs");
        setJobs(res.data.jobs);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="job-list" style={{ padding: '2rem' }}>
      <h2>Available Jobs</h2>
      {jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <ul>
          {jobs.map((job) => (
            <li key={job._id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
              <h3>{job.title}</h3>
              <p>{job.description}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Wage:</strong> ₹{job.wage}</p>
              <p><strong>Category:</strong> {job.category}</p>
              <p><strong>Skills:</strong> {job.skillsRequired?.join(", ")}</p>
              <p><strong>Expires At:</strong> {new Date(job.expiresAt).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JobList;