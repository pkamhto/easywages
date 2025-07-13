import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/EditProfile.css"; 

const EditProfile = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // ✅ Initial State user ka data le raha hai
  const [formData, setFormData] = useState({
    name: user?.name || "",
    age: user?.age || "",
    gender: user?.gender || "",
    category: user?.category || "",
    dob: user?.dob || "",
    contact: user?.contact || "",
    photo: user?.photo || ""
  });

  // ✅ Input change hone pe state update
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Profile Update API Call
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/update-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("✅ Profile Updated Successfully!");
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard"); // ✅ Redirect to dashboard
      } else {
        alert("❌ Error: " + data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("❌ Server Error. Please try again.");
    }
  };

  return (
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
        <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Age" required />
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" required />
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
        <input type="text" name="contact" value={formData.contact} onChange={handleChange} placeholder="Contact" required />
        <input type="text" name="photo" value={formData.photo} onChange={handleChange} placeholder="Photo URL" />
        
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default EditProfile;
