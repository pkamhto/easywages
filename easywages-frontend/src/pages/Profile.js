// 📁 src/pages/Profile.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // ⏳ Start with null

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("❌ Please login first!");
          navigate("/login");
          return;
        }

        const response = await fetch("http://localhost:5000/api/user/profile", {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setUser(data.user); // ✅ Set user in state
        } else {
          alert("❌ " + data.message);
          navigate("/login");
        }
      } catch (error) {
        console.error("Profile fetch error:", error);
        alert("❌ Something went wrong");
      }
    };

    fetchProfile(); // 🔃 Call on mount
  }, [navigate]);

  if (!user) return <p>⏳ Loading profile...</p>;

  return (
    <div className="profile-container">
      <h2>👤 My Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Age:</strong> {user.age}</p>
      <p><strong>Gender:</strong> {user.gender}</p>
      <p><strong>Category:</strong> {user.category}</p>
      <p><strong>Date of Birth:</strong> {user.dob?.slice(0, 10)}</p>
      <p><strong>Contact:</strong> {user.contact}</p>
      <p><strong>Trust Score:</strong> {user.trustScore}</p>

      {user.profilePic && (
        <img
          src={`http://localhost:5000/uploads/${user.profilePic}`}
          alt="Profile"
          width="150"
        />
      )}

      <br /><br />
      <button onClick={() => navigate("/edit-profile")}>✏️ Edit Profile</button>
    </div>
  );
};

export default Profile;
