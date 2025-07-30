import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'animate.css';

export default function LoginSelection() {
  const navigate = useNavigate();

  const loginOptions = [
    {
      role: 'farmer',
      title: 'Farmer',
      description: 'Access farming tools, market prices, and expert advice',
      icon: 'fas fa-user-farmer',
      color: 'success',
      features: [
        'Digital Farmer Profile',
        'Weather Advisory',
        'Market Prices',
        'Expert Consultation',
        'Crop Monitoring',
        'Direct Buyer Connect'
      ]
    },
    {
      role: 'agent',
      title: 'Agricultural Agent',
      description: 'Provide expert guidance and earn by helping farmers',
      icon: 'fas fa-user-tie',
      color: 'primary',
      features: [
        'Expert Dashboard',
        'Farmer Consultations',
        'Knowledge Sharing',
        'Earning Opportunities',
        'Analytics & Reports',
        'Community Building'
      ]
    },
    {
      role: 'admin',
      title: 'Administrator',
      description: 'Manage platform operations and user administration',
      icon: 'fas fa-user-shield',
      color: 'warning',
      features: [
        'User Management',
        'Platform Analytics',
        'Content Moderation',
        'System Settings',
        'Support Management',
        'Data Insights'
      ]
    }
  ];

  const handleLoginOption = (role) => {
    navigate(`/${role}-login`);
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="page-content">
      <div className="container py-5">
        {/* Header */}
        <div className="text-center mb-5 animate__animated animate__fadeInDown">
          <button 
            className="btn btn-outline-secondary mb-4"
            onClick={handleBackToHome}
          >
            <i className="fas fa-arrow-left me-2"></i>
            Back to Home
          </button>
          <div className="brand-section mb-4">
            <div className="logo-container d-inline-flex align-items-center">
              <div className="logo-icon me-3">
                <i className="fas fa-seedling"></i>
              </div>
              <div className="brand-text text-start">
                <h2 className="brand-title mb-0">AgriConnect</h2>
                <p className="brand-tagline mb-0">Smart Farming Solutions</p>
              </div>
            </div>
          </div>
          <h1 className="display-4 fw-bold text-gradient mb-3">
            Choose Your Role
          </h1>
          <p className="lead text-muted">
            Select your role to access the appropriate features and services
          </p>
        </div>

        {/* Login Options */}
        <div className="row g-4 justify-content-center">
          {loginOptions.map((option, index) => (
            <div 
              key={option.role} 
              className="col-lg-4 col-md-6"
            >
              <div 
                className={`login-option-card card h-100 shadow-lg border-0 animate__animated animate__fadeInUp`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="card-body p-4">
                  {/* Header */}
                  <div className="text-center mb-4">
                    <div className={`role-icon-wrapper bg-${option.color}-subtle mb-3`}>
                      <i className={`${option.icon} text-${option.color} fa-2x`}></i>
                    </div>
                    <h3 className="fw-bold text-dark mb-2">{option.title}</h3>
                    <p className="text-muted mb-0">{option.description}</p>
                  </div>



                  {/* Features */}
                  <div className="role-features mb-4">
                    <h6 className="fw-bold text-dark mb-3">
                      <i className="fas fa-star text-warning me-2"></i>
                      Key Features
                    </h6>
                    <ul className="list-unstyled">
                      {option.features.map((feature, idx) => (
                        <li key={idx} className="feature-item">
                          <i className={`fas fa-check text-${option.color} me-2`}></i>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Button */}
                  <div className="text-center">
                    <button 
                      className={`btn btn-${option.color} btn-lg w-100`}
                      onClick={() => handleLoginOption(option.role)}
                    >
                      <i className="fas fa-sign-in-alt me-2"></i>
                      Login as {option.title}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="row mt-5">
          <div className="col-lg-8 mx-auto">
            <div className="card bg-light border-0">
              <div className="card-body text-center p-4">
                <h5 className="fw-bold text-dark mb-3">
                  <i className="fas fa-info-circle text-primary me-2"></i>
                  Need Help Choosing?
                </h5>
                <p className="text-muted mb-3">
                  Not sure which role is right for you? Contact our support team for guidance.
                </p>
                <div className="d-flex justify-content-center gap-3">
                  <button className="btn btn-outline-primary">
                    <i className="fas fa-headset me-2"></i>
                    Contact Support
                  </button>
                  <button className="btn btn-outline-secondary" onClick={handleBackToHome}>
                    <i className="fas fa-home me-2"></i>
                    Back to Home
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 