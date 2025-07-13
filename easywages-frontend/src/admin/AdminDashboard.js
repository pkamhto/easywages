import React, { useEffect, useState } from "react";
import axios from "axios";
import JobPostingForm from '../components/JobPostingForm';  // Relative path से इम्पोर्ट करें
 // Importing the Job Posting form component

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalLabours: 0,
    totalEmployers: 0,
    activeJobs: 0,
  });
  
  const [jobList, setJobList] = useState([]);
  
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/stats");
        setStats(response.data);
      } catch (error) {
        console.error("❌ Failed to fetch stats:", error);
      }
    };

    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/jobs");
        setJobList(response.data);
      } catch (error) {
        console.error("❌ Failed to fetch jobs:", error);
      }
    };

    fetchStats();
    fetchJobs();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>📊 Admin Dashboard</h1>
      <p>Welcome, Admin! Here's an overview:</p>

      {/* Stats Section */}
      <div style={{ display: "flex", gap: "2rem", marginTop: "2rem" }}>
        <div style={{ padding: "1rem", border: "1px solid #ccc", flex: 1 }}>
          <h3>👷 Total Labour Users</h3>
          <p>{stats.totalLabours}</p>
        </div>

        <div style={{ padding: "1rem", border: "1px solid #ccc", flex: 1 }}>
          <h3>🏢 Total Employers</h3>
          <p>{stats.totalEmployers}</p>
        </div>

        <div style={{ padding: "1rem", border: "1px solid #ccc", flex: 1 }}>
          <h3>📄 Active Job Listings</h3>
          <p>{stats.activeJobs}</p>
        </div>
      </div>

      {/* Job Posting Form */}
      <div style={{ marginTop: "3rem" }}>
        <h2>📋 Post a New Job</h2>
        <JobPostingForm />
      </div>

      {/* Job List Section */}
      <div style={{ marginTop: "3rem" }}>
        <h2>📃 Job Listings</h2>
        <table style={{ width: "100%", border: "1px solid #ccc", marginTop: "1rem" }}>
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Category</th>
              <th>Location</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {jobList.map((job, index) => (
              <tr key={index}>
                <td>{job.title}</td>
                <td>{job.category}</td>
                <td>{job.location}</td>
                <td>{job.status}</td> {/* Assuming job has a status */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
