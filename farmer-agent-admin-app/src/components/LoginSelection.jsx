import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/auth.css';

const LoginSelection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    // Trigger entrance animations
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const roles = [
    {
      id: 'farmer',
      title: 'Farmer',
      description: 'Manage your farm operations and track your progress with advanced agricultural tools',
      icon: '🌾',
      color: 'green',
      features: ['Crop Management', 'Weather Updates', 'Market Prices', 'Expert Consultation'],
      gradient: 'from-green-400 via-green-500 to-green-600',
      bgGradient: 'from-green-50 to-green-100'
    },
    {
      id: 'agent',
      title: 'Agent',
      description: 'Provide agricultural advisory services to farmers and manage client relationships',
      icon: '👥',
      color: 'blue',
      features: ['Client Management', 'Advisory Services', 'Reports & Analytics', 'Visit Scheduling'],
      gradient: 'from-blue-400 via-blue-500 to-blue-600',
      bgGradient: 'from-blue-50 to-blue-100'
    },
    {
      id: 'admin',
      title: 'Admin',
      description: 'Manage system operations and user administration with comprehensive controls',
      icon: '⚙️',
      color: 'purple',
      features: ['User Management', 'System Analytics', 'Security Control', 'Configuration'],
      gradient: 'from-purple-400 via-purple-500 to-purple-600',
      bgGradient: 'from-purple-50 to-purple-100'
    }
  ];

  return (
    <div className="login-selection-container">
      {/* Animated Background Elements */}
      <div className="animated-background">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      {/* Main Container */}
      <div className="main-container">
        <div className="content-wrapper">
          {/* Header Section */}
          <div className={`header-section ${isLoaded ? 'loaded' : ''}`}>
            <div className="title-wrapper">
              <h1 className="main-title">
                Welcome to AgriConnect
              </h1>
            </div>
            <p className="subtitle">
              Choose your role to access your personalized dashboard and unlock the full potential of modern agriculture
            </p>
          </div>

          {/* Role Cards Section */}
          <div className="role-cards-grid">
            {roles.map((role, index) => (
              <div
                key={role.id}
                className={`role-card ${isLoaded ? 'loaded' : ''}`}
                style={{ transitionDelay: `${index * 300}ms` }}
                onMouseEnter={() => setHoveredCard(role.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Card Background with Gradient */}
                <div className={`card-background card-${role.id}`}></div>
                
                {/* Main Card */}
                <div className="card-content">
                  {/* Floating Icon */}
                  <div className={`icon-container icon-${role.id}`}>
                    <span className="icon-text">{role.icon}</span>
                    {/* Glow Effect */}
                    <div className={`glow-effect glow-${role.id}`}></div>
                  </div>

                  {/* Role Title */}
                  <h2 className="role-title">
                    {role.title}
                  </h2>

                  {/* Role Description */}
                  <p className="role-description">
                    {role.description}
                  </p>

                  {/* Features List */}
                  <div className="features-section">
                    <h3 className="features-title">
                      <span className={`feature-dot dot-${role.id}`}></span>
                      Key Features:
                    </h3>
                    <ul className="features-list">
                      {role.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="feature-item">
                          <span className={`feature-bullet bullet-${role.id}`} style={{ animationDelay: `${featureIndex * 0.2}s` }}></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="action-buttons">
                    <Link
                      to={`/${role.id}-login`}
                      className={`login-btn btn-${role.id}`}
                    >
                      <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      Login as {role.title}
                    </Link>
                    
                    <Link
                      to={`/${role.id}-register`}
                      className={`register-btn btn-${role.id}`}
                    >
                      <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Sign up as {role.title}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Info Section */}
          <div className={`info-section ${isLoaded ? 'loaded' : ''}`}>
            <div className="info-card">
              <h3 className="info-title">
                Why Choose AgriConnect?
              </h3>
              <div className="info-grid">
                {[
                  { icon: '🚀', title: 'Smart Solutions', desc: 'Advanced technology for modern farming with AI-powered insights', color: 'green' },
                  { icon: '🤝', title: 'Expert Support', desc: 'Connect with agricultural experts and get personalized guidance', color: 'blue' },
                  { icon: '📊', title: 'Data Analytics', desc: 'Comprehensive insights to improve productivity and yield', color: 'purple' }
                ].map((item, index) => (
                  <div key={index} className="info-item">
                    <div className={`info-icon icon-${item.color}`}>
                      <span className="info-icon-text">{item.icon}</span>
                    </div>
                    <h4 className="info-item-title">{item.title}</h4>
                    <p className="info-item-desc">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSelection; 