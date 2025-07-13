import React, { useEffect, useState } from "react";
import axios from "axios";

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/jobs");
        setJobs(response.data);
      } catch (error) {
        console.error("❌ Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>🛠 Available Jobs</h2>
      {jobs.length === 0 ? (
        <p>No jobs available right now.</p>
      ) : (
        jobs.map((job) => (
          <div key={job._id} style={{ border: "1px solid #ccc", marginBottom: "1rem", padding: "1rem" }}>
            <h3>{job.title}</h3>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Wage:</strong> ₹{job.wage}</p>
            <p>{job.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default JobList;
