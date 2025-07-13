import React, { useState } from 'react';
import axios from 'axios';

const JobPostForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    wage: '',
    category: 'Other',
    skillsRequired: '',
    expiresAt: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const token = localStorage.getItem('token');

      const payload = {
        ...formData,
        skillsRequired: formData.skillsRequired.split(',').map(skill => skill.trim()),
      };

      const res = await axios.post(
        'http://localhost:5000/api/jobs/post',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        setMessage('✅ Job posted successfully!');
        setFormData({
          title: '',
          description: '',
          location: '',
          wage: '',
          category: 'Other',
          skillsRequired: '',
          expiresAt: '',
        });
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h2>Post a New Job</h2>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Job Title" value={formData.title} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange}></textarea>
        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} required />
        <input type="number" name="wage" placeholder="Wage" value={formData.wage} onChange={handleChange} required />
        
        <select name="category" value={formData.category} onChange={handleChange}>
          <option value="Construction">Construction</option>
          <option value="Cleaning">Cleaning</option>
          <option value="Delivery">Delivery</option>
          <option value="Plumbing">Plumbing</option>
          <option value="Electrician">Electrician</option>
          <option value="Other">Other</option>
        </select>

        <input type="text" name="skillsRequired" placeholder="Skills (comma separated)" value={formData.skillsRequired} onChange={handleChange} />

        <input type="date" name="expiresAt" value={formData.expiresAt} onChange={handleChange} />

        <button type="submit">Post Job</button>
      </form>
    </div>
  );
};

export default JobPostForm;
