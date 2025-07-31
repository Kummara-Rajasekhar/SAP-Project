import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ToastContext } from '../context/ToastContext';
import 'animate.css';

export default function FarmerLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);

  // Ensure page scrolls to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'farmer@test.com' && password === 'password') {
      const user = { id: 'F001', name: 'John Farmer', role: 'farmer', region: 'North Region', email };
      login(user);
      showToast('Login successful!', 'success');
      navigate('/'); // Navigate to home page instead of dashboard
    } else {
      showToast('Invalid credentials. Please try again.', 'danger');
    }
  };

  const handleBackToSelection = () => {
    navigate('/login-selection');
  };

  return (
    <div className="login-page">
      <div className="container-fluid">
        <div className="row min-vh-100">
          {/* Left Side - Branding & Info */}
          <div className="col-lg-6 d-none d-lg-flex login-brand-section">
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
                  Welcome Back, Farmer!
                </h1>
                <p className="lead text-white-50 mb-5">
                  Access your digital farming tools, weather updates, market prices, and expert consultations.
                </p>
                
                {/* Role-specific features */}
                <div className="features-list">
                  <div className="feature-item animate__animated animate__fadeInLeft" style={{ animationDelay: '0.2s' }}>
                    <i className="fas fa-cloud-sun text-warning me-3"></i>
                    <span>Weather Advisory & Crop Alerts</span>
                  </div>
                  <div className="feature-item animate__animated animate__fadeInLeft" style={{ animationDelay: '0.4s' }}>
                    <i className="fas fa-chart-line text-success me-3"></i>
                    <span>Real-time Market Prices</span>
                  </div>
                  <div className="feature-item animate__animated animate__fadeInLeft" style={{ animationDelay: '0.6s' }}>
                    <i className="fas fa-comments text-primary me-3"></i>
                    <span>Expert Agricultural Consultation</span>
                  </div>
                  <div className="feature-item animate__animated animate__fadeInLeft" style={{ animationDelay: '0.8s' }}>
                    <i className="fas fa-mobile-alt text-info me-3"></i>
                    <span>Digital Crop Monitoring</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="col-lg-6 d-flex align-items-center justify-content-center">
            <div className="login-form-container animate__animated animate__fadeInUp">
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
                  <h2 className="role-title mb-2">Farmer Login</h2>
                  <p className="role-description text-muted">
                    Access your farming dashboard and tools
                  </p>
                </div>
              </div>

              <div className="login-card">
                <form onSubmit={handleSubmit} className="login-form">
                  <div className="form-group mb-4">
                    <label className="form-label">
                      <i className="fas fa-envelope me-2 text-muted"></i>
                      Email Address
                    </label>
                    <input 
                      type="email" 
                      className="form-control form-control-lg" 
                      value={email} 
                      onChange={e => setEmail(e.target.value)} 
                      placeholder="Enter your email"
                      required 
                    />
                  </div>
                  
                  <div className="form-group mb-4">
                    <label className="form-label">
                      <i className="fas fa-lock me-2 text-muted"></i>
                      Password
                    </label>
                    <input 
                      type="password" 
                      className="form-control form-control-lg" 
                      value={password} 
                      onChange={e => setPassword(e.target.value)} 
                      placeholder="Enter your password"
                      required 
                    />
                  </div>

                  <div className="form-group mb-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="rememberMe" />
                        <label className="form-check-label" htmlFor="rememberMe">
                          Remember me
                        </label>
                      </div>
                      <a href="#" className="text-decoration-none text-primary">Forgot Password?</a>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-success btn-lg w-100 mb-4">
                    <i className="fas fa-sign-in-alt me-2"></i>
                    Login as Farmer
                  </button>
                </form>

                <div className="text-center">
                  <p className="text-muted mb-0">
                    Don't have an account? 
                    <a href="/farmer-signup" className="text-decoration-none text-success ms-1 fw-bold">
                      Sign up as Farmer
                    </a>
                  </p>
                </div>

                {/* Demo Credentials */}
                <div className="demo-credentials mt-4">
                  <div className="alert alert-info">
                    <h6 className="alert-heading mb-2">
                      <i className="fas fa-info-circle me-2"></i>
                      Demo Credentials
                    </h6>
                    <p className="mb-1 small">Email: <code>farmer@test.com</code></p>
                    <p className="mb-0 small">Password: <code>password</code></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 