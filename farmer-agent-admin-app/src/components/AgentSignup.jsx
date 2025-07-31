import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ToastContext } from '../context/ToastContext';
import 'animate.css';

export default function AgentSignup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    region: '',
    expertise: '',
    experience: ''
  });
  const { login } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
  const navigate = useNavigate();

  // Ensure page scrolls to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      showToast('Passwords do not match!', 'error');
      return;
    }
    
    // Simulate successful signup
    const user = {
      id: 'A' + Date.now(),
      name: `${formData.firstName} ${formData.lastName}`,
      role: 'agent',
      email: formData.email,
      region: formData.region
    };
    
    login(user);
    showToast('Account created successfully! Welcome to AgriConnect!', 'success');
    navigate('/');
  };

  const handleBackToSelection = () => {
    navigate('/login-selection');
  };

  return (
    <div className="signup-page agent-signup">
      <div className="container-fluid">
        <div className="row min-vh-100">
                     {/* Left Side - Simple Info Section */}
           <div className="col-lg-6 d-none d-lg-flex signup-info-section">
             <div className="info-content text-center">
               <div className="info-header animate__animated animate__fadeInDown">
                 {/* Simple Logo */}
                 <div className="simple-logo mb-4">
                   <i className="fas fa-seedling text-success" style={{ fontSize: '3rem' }}></i>
                 </div>
                 
                 {/* Main Heading */}
                 <h1 className="display-4 fw-bold text-dark mb-4">
                   Become an Agricultural Expert
                 </h1>
                 
                 {/* Description Text */}
                 <p className="lead text-muted mb-5">
                   Join our network of agricultural experts and help farmers succeed while earning from your expertise.
                 </p>
                 
                 {/* Simple Benefits */}
                 <div className="simple-benefits">
                   <div className="simple-benefit-item mb-3">
                     <i className="fas fa-check-circle text-success me-2"></i>
                     <span className="text-dark">Expert consultations</span>
                   </div>
                   <div className="simple-benefit-item mb-3">
                     <i className="fas fa-check-circle text-success me-2"></i>
                     <span className="text-dark">Earn from your knowledge</span>
                   </div>
                   <div className="simple-benefit-item mb-3">
                     <i className="fas fa-check-circle text-success me-2"></i>
                     <span className="text-dark">Help farmers succeed</span>
                   </div>
                   <div className="simple-benefit-item mb-3">
                     <i className="fas fa-check-circle text-success me-2"></i>
                     <span className="text-dark">Track your impact</span>
                   </div>
                 </div>
               </div>
             </div>
           </div>

                     {/* Right Side - Signup Form */}
           <div className="col-lg-6 d-flex align-items-center justify-content-center">
             <div className="signup-form-container animate__animated animate__fadeInUp">
               <div className="text-center mb-5">
                 <button 
                   className="btn btn-outline-secondary mb-4"
                   onClick={handleBackToSelection}
                 >
                   <i className="fas fa-arrow-left me-2"></i>
                   Back to Role Selection
                 </button>
                 
                 {/* Role Badge */}
                 <div className="role-badge mb-5">
                   <div className="role-icon-wrapper">
                     <i className="fas fa-user-tie"></i>
                   </div>
                   <h2 className="role-title mb-3">Agent Registration</h2>
                   <p className="role-description text-muted">
                     Create your expert profile and start helping farmers
                   </p>
                 </div>
               </div>

              <form onSubmit={handleSubmit} className="signup-form">
                {/* Personal Information Section */}
                <div className="form-section mb-4">
                  <h5 className="section-title">
                    <i className="fas fa-user me-2 text-primary"></i>
                    Personal Information
                  </h5>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        <i className="fas fa-user me-2 text-primary"></i>
                        Full Name
                      </label>
                      <input type="text" className="form-control" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Enter your first name" required />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        <i className="fas fa-user me-2 text-primary"></i>
                        Last Name
                      </label>
                      <input type="text" className="form-control" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Enter your last name" required />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        <i className="fas fa-envelope me-2 text-danger"></i>
                        Email Address
                      </label>
                      <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} placeholder="Enter email address" required />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        <i className="fas fa-phone me-2 text-success"></i>
                        Phone Number
                      </label>
                      <input type="tel" className="form-control" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter phone number" required />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        <i className="fas fa-map-marker-alt me-2 text-warning"></i>
                        Region
                      </label>
                      <select className="form-select" name="region" value={formData.region} onChange={handleChange} required>
                        <option value="">Select Region</option>
                        <option value="North Region">North Region</option>
                        <option value="South Region">South Region</option>
                        <option value="East Region">East Region</option>
                        <option value="West Region">West Region</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        <i className="fas fa-graduation-cap me-2 text-info"></i>
                        Expertise
                      </label>
                      <input type="text" className="form-control" name="expertise" value={formData.expertise} onChange={handleChange} placeholder="e.g., Crop Management, Pest Control" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        <i className="fas fa-briefcase me-2 text-success"></i>
                        Experience
                      </label>
                      <input type="text" className="form-control" name="experience" value={formData.experience} onChange={handleChange} placeholder="e.g., 5 years, 10 years" />
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
                      <label className="form-label">
                        <i className="fas fa-lock me-2 text-info"></i>
                        Password
                      </label>
                      <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} placeholder="Create a strong password" required />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        <i className="fas fa-lock me-2 text-info"></i>
                        Confirm Password
                      </label>
                      <input type="password" className="form-control" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm your password" required />
                    </div>
                  </div>
                </div>

                                 <button type="submit" className="btn btn-primary btn-lg w-100 mb-4">
                   <i className="fas fa-user-plus me-2"></i>
                   Create Agent Account
                 </button>
               </form>

               <div className="text-center mt-4">
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
  );
} 