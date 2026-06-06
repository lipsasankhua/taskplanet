import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Signup() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('https://taskplanet-server-td9i.onrender.com/api/auth/signup', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.username);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.msg || 'Signup failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">
          <h2>🌍 TaskPlanet</h2>
          <p>Create your account and join the community</p>
        </div>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <label className="auth-label">Username</label>
          <input className="auth-input" name="username" onChange={handleChange} required />
          <label className="auth-label">Email</label>
          <input className="auth-input" name="email" type="email" onChange={handleChange} required />
          <label className="auth-label">Password</label>
          <input className="auth-input" name="password" type="password" onChange={handleChange} required />
          <button className="auth-btn" type="submit">Create Account</button>
        </form>
        <div className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;