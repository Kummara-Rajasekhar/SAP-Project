import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext, ToastContext } from '../App';
import 'animate.css';

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
    navigate('/');
  };

  const handleBackToSelection = () => {
    navigate('/login-selection');
  };

  return (
    <div className="signup-page">
      <div className="container-fluid">
        <div className="row min-vh-100">
          {/* Left Side - Branding & Info */}
          <div className="col-lg-6 d-none d-lg-flex signup-brand-section">
            <div className="brand-content">
              <div className="brand-header animate__animated animate__fadeInDown">
                <div className="logo-container d-inline-flex align-items-center mb-4">
                  <div className="logo-icon me-3">
                    <i className="fas fa-seedling"></i>
                  </div>
                  <div className="brand-text text-start">
                    <h2 className="brand-title mb-0">AgriConnect</h2>
                    <p className="brand-tagline mb-0">Smart Farming Solutions</p>
                  </div>
                </div>
                <h1 className="display-4 fw-bold text-white mb-4">
                  Join AgriConnect as an Expert
                </h1>
                <p className="lead text-white-50 mb-5">
                  Share your agricultural expertise, help farmers succeed, and earn by providing valuable guidance.
                </p>
                
                {/* Role-specific benefits */}
                <div className="benefits-list">
                  <div className="benefit-item animate__animated animate__fadeInLeft" style={{ animationDelay: '0.2s' }}>
                    <i className="fas fa-comments text-primary me-3"></i>
                    <span>Provide expert consultations to farmers</span>
                  </div>
                  <div className="benefit-item animate__animated animate__fadeInLeft" style={{ animationDelay: '0.4s' }}>
                    <i className="fas fa-dollar-sign text-success me-3"></i>
                    <span>Earn money through your expertise</span>
                  </div>
                  <div className="benefit-item animate__animated animate__fadeInLeft" style={{ animationDelay: '0.6s' }}>
                    <i className="fas fa-graduation-cap text-warning me-3"></i>
                    <span>Share knowledge and train farmers</span>
                  </div>
                  <div className="benefit-item animate__animated animate__fadeInLeft" style={{ animationDelay: '0.8s' }}>
                    <i className="fas fa-chart-bar text-info me-3"></i>
                    <span>Track your performance and impact</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Signup Form */}
          <div className="col-lg-6 d-flex align-items-center justify-content-center">
            <div className="signup-form-container animate__animated animate__fadeInUp">
              <div className="text-center mb-4">
                <button 
                  className="btn btn-outline-secondary mb-4"
                  onClick={handleBackToSelection}
                >
                  <i className="fas fa-arrow-left me-2"></i>
                  Back to Role Selection
                </button>
                
                {/* Role Badge */}
                <div className="role-badge mb-4">
                  <div className="role-icon-wrapper">
                    <i className="fas fa-user-tie"></i>
                  </div>
                  <h2 className="role-title mb-2">Agent Registration</h2>
                  <p className="role-description text-muted">
                    Create your expert profile and start helping farmers
                  </p>
                </div>
              </div>

              <div className="signup-card">
                <form onSubmit={handleSubmit} className="signup-form">
                  {/* Personal Information Section */}
                  <div className="form-section mb-4">
                    <h5 className="section-title">
                      <i className="fas fa-user me-2 text-primary"></i>
                      Personal Information
                    </h5>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Full Name</label>
                        <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} required />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} required />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Phone Number</label>
                        <input type="tel" className="form-control" name="phone" value={form.phone} onChange={handleChange} required />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Region</label>
                        <select className="form-control" name="region" value={form.region} onChange={handleChange} required>
                          <option value="">Select</option>
                          <option value="North Region">North Region</option>
                          <option value="South Region">South Region</option>
                          <option value="East Region">East Region</option>
                          <option value="West Region">West Region</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Account Security Section */}
                  <div className="form-section mb-4">
                    <h5 className="section-title">
                      <i className="fas fa-shield-alt me-2 text-warning"></i>
                      Account Security
                    </h5>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" value={form.password} onChange={handleChange} required />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required />
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary btn-lg w-100 mb-4">
                    <i className="fas fa-user-plus me-2"></i>
                    Create Agent Account
                  </button>
                </form>

                <div className="text-center">
                  <p className="text-muted mb-0">
                    Already have an account? 
                    <a href="/agent-login" className="text-decoration-none text-primary ms-1 fw-bold">
                      Login as Agent
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 