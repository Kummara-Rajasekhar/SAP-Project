import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ToastContext } from '../context/ToastContext';
import 'animate.css';

export default function FarmerSignup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    region: '',
    farmSize: '',
    cropType: '',
    experience: ''
  });
  const { login } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
  const navigate = useNavigate();

  // Ensure page scrolls to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      showToast('Passwords do not match!', 'error');
      return;
    }
    
    // Simulate successful signup
    const user = {
      id: 'F' + Date.now(),
      name: `${formData.firstName} ${formData.lastName}`,
      role: 'farmer',
      email: formData.email,
      region: formData.region
    };
    
    login(user); // user is the signed-up user object
    showToast('Account created successfully! Welcome to AgriConnect!', 'success');
    navigate('/');
  };

  const handleBackToSelection = () => {
    navigate('/login-selection');
  };

  return (
    <div className="signup-page farmer-signup">
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
                  Join as a Farmer
                </h1>
                
                {/* Description Text */}
                <p className="lead text-muted mb-5">
                  Create your digital farming profile and unlock access to modern agricultural tools and services.
                </p>
                
                {/* Simple Benefits */}
                <div className="simple-benefits">
                  <div className="simple-benefit-item mb-3">
                    <i className="fas fa-check-circle text-success me-2"></i>
                    <span className="text-dark">Better prices for your produce</span>
                  </div>
                  <div className="simple-benefit-item mb-3">
                    <i className="fas fa-check-circle text-success me-2"></i>
                    <span className="text-dark">Weather alerts and crop advice</span>
                  </div>
                  <div className="simple-benefit-item mb-3">
                    <i className="fas fa-check-circle text-success me-2"></i>
                    <span className="text-dark">Connect with experts</span>
                  </div>
                  <div className="simple-benefit-item mb-3">
                    <i className="fas fa-check-circle text-success me-2"></i>
                    <span className="text-dark">Monitor crops digitally</span>
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
                    <i className="fas fa-user-farmer"></i>
                  </div>
                  <h2 className="role-title mb-2">Farmer Registration</h2>
                  <p className="role-description text-muted">
                    Create your farming profile and join our community
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="signup-form">
                {/* Personal Information Section */}
                <div className="form-section mb-4">
                  <h5 className="section-title">
                    <i className="fas fa-user me-2 text-success"></i>
                    Personal Information
                  </h5>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        <i className="fas fa-user me-2 text-success"></i>
                        Full Name
                      </label>
                      <input type="text" className="form-control" name="name" value={formData.firstName} onChange={e => setFormData({ ...formData, firstName: e.target.value })} placeholder="Enter your full name" required />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        <i className="fas fa-user me-2 text-success"></i>
                        Last Name
                      </label>
                      <input type="text" className="form-control" name="lastName" value={formData.lastName} onChange={e => setFormData({ ...formData, lastName: e.target.value })} placeholder="Enter your last name" required />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        <i className="fas fa-phone me-2 text-primary"></i>
                        Phone Number
                      </label>
                      <input type="tel" className="form-control" name="phone" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} placeholder="Enter phone number" required />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">
                        <i className="fas fa-envelope me-2 text-danger"></i>
                        Email Address
                      </label>
                      <input type="email" className="form-control" name="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="Enter email address" required />
                    </div>
                  </div>
                </div>

                  {/* Account Security Section */}
                  <div className="form-section mb-4">
                    <h5 className="section-title">
                      <i className="fas fa-shield-alt me-2 text-primary"></i>
                      Account Security
                    </h5>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} required />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" name="confirmPassword" value={formData.confirmPassword} onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })} required />
                      </div>
                    </div>
                  </div>

                  {/* Location & Farming Details Section */}
                  <div className="form-section mb-4">
                    <h5 className="section-title">
                      <i className="fas fa-map-marker-alt me-2 text-warning"></i>
                      Location & Farming Details
                    </h5>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Region/Constituency</label>
                        <select className="form-control" name="region" value={formData.region} onChange={e => setFormData({ ...formData, region: e.target.value })} required>
                          <option value="">Select</option>
                          <option value="North Region">North Region</option>
                          <option value="South Region">South Region</option>
                          <option value="East Region">East Region</option>
                          <option value="West Region">West Region</option>
                        </select>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Farm Size (Acres)</label>
                        <input type="number" className="form-control" name="farmSize" value={formData.farmSize} onChange={e => setFormData({ ...formData, farmSize: e.target.value })} required />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Preferred Crop Type</label>
                        <select className="form-control" name="cropType" value={formData.cropType} onChange={e => setFormData({ ...formData, cropType: e.target.value })} required>
                          <option value="">Select</option>
                          <option value="Wheat">Wheat</option>
                          <option value="Rice">Rice</option>
                          <option value="Maize">Maize</option>
                          <option value="Sugarcane">Sugarcane</option>
                        </select>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Years of Experience</label>
                        <input type="number" className="form-control" name="experience" value={formData.experience} onChange={e => setFormData({ ...formData, experience: e.target.value })} required />
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-success btn-lg w-100 mb-4">
                    <i className="fas fa-user-plus me-2"></i>
                    Create Farmer Account
                  </button>
                </form>

                <div className="text-center">
                  <p className="text-muted mb-0">
                    Already have an account? 
                    <a href="/farmer-login" className="text-decoration-none text-success ms-1 fw-bold">
                      Login as Farmer
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