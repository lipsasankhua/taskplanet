import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('https://taskplanet-server-td9i.onrender.com/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', res.data.username);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">
          <h2>🌍 TaskPlanet</h2>
          <p>Connect, post and earn with your community</p>
        </div>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <label className="auth-label">Email</label>
          <input className="auth-input" name="email" type="email" onChange={handleChange} required />
          <label className="auth-label">Password</label>
          <input className="auth-input" name="password" type="password" onChange={handleChange} required />
          <button className="auth-btn" type="submit">Login</button>
        </form>
        <div className="auth-switch">
          No account? <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;