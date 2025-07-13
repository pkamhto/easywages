import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css"; 

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <aside className="profile-section">
        <img src={user?.photo || "/default-avatar.png"} alt="User" className="profile-pic" />
        <h2>{user?.name || "User"}</h2>
        <p><strong>Age:</strong> {user?.age || "N/A"}</p>
        <p><strong>Gender:</strong> {user?.gender || "N/A"}</p>
        <p><strong>Category:</strong> {user?.category || "N/A"}</p>
        <p><strong>DOB:</strong> {user?.dob || "N/A"}</p>
        <p><strong>Contact:</strong> {user?.contact || "N/A"}</p>

        {/* ✅ Edit Profile Button */}
        <button onClick={() => navigate("/edit-profile")} className="edit-profile-btn">Edit Profile</button>

        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </aside>
    </div>
  );
};

export default Dashboard;
