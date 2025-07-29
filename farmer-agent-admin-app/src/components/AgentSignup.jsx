import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext, ToastContext } from '../App';

export default function AgentSignup() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', password: '', confirmPassword: '', region: ''
  });
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    const agentId = 'A' + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    const user = { ...form, id: agentId, role: 'agent' };
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
    showToast('Signup successful! Welcome to AgriConnect.', 'success');
    navigate('/agent-dashboard');
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4">
            <h2 className="mb-4 text-success">Agent Signup</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input type="tel" className="form-control" name="phone" value={form.phone} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" name="password" value={form.password} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input type="password" className="form-control" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Region</label>
                <select className="form-control" name="region" value={form.region} onChange={handleChange} required>
                  <option value="">Select</option>
                  <option value="North Region">North Region</option>
                  <option value="South Region">South Region</option>
                  <option value="East Region">East Region</option>
                  <option value="West Region">West Region</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary-custom w-100">Sign Up</button>
            </form>
            <div className="mt-3 text-center">
              <span>Already have an account? <a href="/agent-login">Login</a></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 