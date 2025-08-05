import React from 'react';
import 'animate.css';

const services = [
  {
    id: 'crop-recommendation',
    title: "Crop Recommendation",
    description: "AI-powered crop recommendation system that analyzes soil conditions, climate data, and market trends to suggest the most profitable crops for your region.",
    icon: "fas fa-seedling",
    color: "success",
    gradient: "linear-gradient(135deg, #28a745, #20c997)",
    features: [
      "Soil Analysis Integration",
      "Climate Pattern Analysis", 
      "Market Demand Prediction",
      "Profitability Calculator"
    ],
    url: "https://crop-recommendation-vbbtdzkvym2whkdx3cdqmi.streamlit.app/"
  },
  {
    id: 'pesticides-recommendation',
    title: "Pesticides Recommendation",
    description: "Smart pesticide recommendation system that identifies crop diseases and pests, then suggests the most effective and safe treatment options.",
    icon: "fas fa-bug",
    color: "warning",
    gradient: "linear-gradient(135deg, #ffc107, #fd7e14)",
    features: [
      "Disease Identification",
      "Pest Detection",
      "Safe Treatment Options",
      "Cost-Effective Solutions"
    ],
    url: "https://fertilizer-recommendation.streamlit.app/"
  },
  {
    id: 'price-prediction',
    title: "Price Prediction",
    description: "Advanced machine learning models that predict crop prices based on historical data, market trends, and seasonal patterns to help maximize profits.",
    icon: "fas fa-chart-line",
    color: "primary",
    gradient: "linear-gradient(135deg, #007bff, #6610f2)",
    features: [
      "Historical Price Analysis",
      "Market Trend Prediction",
      "Seasonal Pattern Recognition",
      "Profit Optimization"
    ],
    url: "https://crop-prize-prediction-model-ac.streamlit.app/"
  },
  {
    id: 'weather-analysis',
    title: "Weather Analysis",
    description: "Comprehensive weather monitoring and analysis system providing real-time weather data, forecasts, and agricultural recommendations.",
    icon: "fas fa-cloud-sun",
    color: "info",
    gradient: "linear-gradient(135deg, #17a2b8, #20c997)",
    features: [
      "Real-time Weather Data",
      "Agricultural Forecasts",
      "Crop-Specific Alerts",
      "Climate Analysis"
    ],
    url: "https://weathermodel-1.streamlit.app/"
  }
];

export default function Services() {
  return (
    <div className="page-content">
      {/* Hero Section with AgriConnect Branding */}
      <div className="services-hero py-5 mb-5" style={{background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)'}}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 order-lg-2">
              <div className="hero-content animate__animated animate__fadeInRight">
                <div className="brand-section mb-4">
                  <div className="logo-container d-flex align-items-center">
                    <div className="logo-icon me-3">
                      <div className="brand-logo" style={{
                        width: '60px',
                        height: '60px',
                        background: 'linear-gradient(135deg, #28a745, #20c997)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 15px rgba(40, 167, 69, 0.3)'
                      }}>
                        <i className="fas fa-seedling fa-2x text-white"></i>
                      </div>
                    </div>
                    <div className="brand-text">
                      <h1 className="brand-title mb-1" style={{color: '#28a745', fontWeight: '700'}}>AgriConnect</h1>
                      <p className="brand-tagline mb-0" style={{color: '#6c757d', fontSize: '1.1rem'}}>AI-Powered Farming Solutions</p>
                    </div>
                  </div>
                </div>
                <h2 className="text-success mb-4">
                  Empowering Farmers with
                  <span className="text-gradient" style={{background: 'linear-gradient(135deg, #28a745, #20c997)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}> Smart Technology</span>
                </h2>
                <p className="lead text-muted mb-4">
                  AgriConnect is your trusted partner in modern agriculture. Our advanced AI models provide comprehensive solutions 
                  for crop management, pest control, price prediction, and weather analysis to maximize your agricultural success.
                </p>
                <div className="company-info mb-4">
                  <div className="row">
                    <div className="col-4 text-center">
                      <h3 className="text-success mb-1">4</h3>
                      <small className="text-muted">AI Models</small>
                    </div>
                    <div className="col-4 text-center">
                      <h3 className="text-primary mb-1">24/7</h3>
                      <small className="text-muted">Support</small>
                    </div>
                    <div className="col-4 text-center">
                      <h3 className="text-warning mb-1">100%</h3>
                      <small className="text-muted">Reliable</small>
                    </div>
                  </div>
                </div>
                <div className="agriconnect-features">
                  <div className="row">
                    <div className="col-6 mb-2">
                      <div className="d-flex align-items-center">
                        <i className="fas fa-check-circle text-success me-2"></i>
                        <small>Data-Driven Insights</small>
                      </div>
                    </div>
                    <div className="col-6 mb-2">
                      <div className="d-flex align-items-center">
                        <i className="fas fa-check-circle text-success me-2"></i>
                        <small>Expert Support</small>
                      </div>
                    </div>
                    <div className="col-6 mb-2">
                      <div className="d-flex align-items-center">
                        <i className="fas fa-check-circle text-success me-2"></i>
                        <small>Mobile Access</small>
                      </div>
                    </div>
                    <div className="col-6 mb-2">
                      <div className="d-flex align-items-center">
                        <i className="fas fa-check-circle text-success me-2"></i>
                        <small>Real-time Updates</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 order-lg-1">
              <div className="hero-image-wrapper animate__animated animate__fadeInLeft">
                <div className="hero-image-container text-center">
                  <div className="hero-illustration">
                    <div className="brand-showcase">
                      <div className="main-logo mb-4">
                        <div className="logo-circle" style={{
                          width: '120px',
                          height: '120px',
                          background: 'linear-gradient(135deg, #28a745, #20c997)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto',
                          boxShadow: '0 8px 25px rgba(40, 167, 69, 0.4)'
                        }}>
                          <i className="fas fa-seedling fa-4x text-white"></i>
                        </div>
                      </div>
                      <h4 className="text-success mb-2">AgriConnect Platform</h4>
                      <p className="text-muted">Your Complete Farming Solution</p>
                      <div className="platform-stats mt-4">
                        <div className="row">
                          <div className="col-4">
                            <div className="stat-item">
                              <i className="fas fa-robot text-primary"></i>
                              <small>AI-Powered</small>
                            </div>
                          </div>
                          <div className="col-4">
                            <div className="stat-item">
                              <i className="fas fa-mobile-alt text-success"></i>
                              <small>Mobile Ready</small>
                            </div>
                          </div>
                          <div className="col-4">
                            <div className="stat-item">
                              <i className="fas fa-shield-alt text-warning"></i>
                              <small>Secure</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AgriConnect Services Section */}
      <div className="container py-5">
        <div className="section-header text-center mb-5">
          <h3 className="text-success mb-3">
            <i className="fas fa-cogs me-2"></i>
            AgriConnect AI Services
          </h3>
          <p className="lead text-muted">
            Discover our comprehensive suite of AI-powered farming solutions designed to revolutionize your agricultural practices.
          </p>
        </div>

        <div className="row justify-content-center">
          {services.map((service, index) => (
            <div key={service.id} className="col-lg-6 col-xl-3 mb-4">
              <div className={`service-card card h-100 shadow-lg border-0 animate__animated animate__fadeInUp`} 
                   style={{animationDelay: `${index * 0.2}s`}}>
                <div className="card-body p-4 d-flex flex-column">
                  {/* Service Header with AgriConnect Branding */}
                  <div className="service-header text-center mb-4">
                    <div className="service-icon-wrapper mb-3">
                      <div className="service-icon" style={{background: service.gradient}}>
                        <i className={`${service.icon} fa-2x text-white`}></i>
                      </div>
                    </div>
                    <h4 className="card-title mb-2">{service.title}</h4>
                    <p className="card-text text-muted small">{service.description}</p>
                    <div className="agriconnect-badge mt-2">
                      <span className="badge bg-success" style={{fontSize: '0.7rem'}}>
                        <i className="fas fa-leaf me-1"></i>
                        AgriConnect AI
                      </span>
                    </div>
                  </div>
                  
                  {/* Features List */}
                  <div className="service-features flex-grow-1">
                    <h6 className="text-muted mb-3">
                      <i className="fas fa-star text-warning me-2"></i>
                      Key Features:
                    </h6>
                    <ul className="list-unstyled">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="mb-2">
                          <i className={`fas fa-check-circle text-${service.color} me-2`}></i>
                          <span className="small">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Action Button with AgriConnect Branding */}
                  <div className="service-action mt-4">
                    <a 
                      href={service.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`btn btn-${service.color} btn-lg w-100 shadow-sm`}
                      style={{background: service.gradient, border: 'none'}}
                      disabled={!service.url || service.url === '#'}
                    >
                      <i className="fas fa-external-link-alt me-2"></i>
                      Launch AgriConnect {service.title}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AgriConnect Company Information */}
        <div className="agriconnect-info mt-5 pt-5">
          <div className="row">
            <div className="col-lg-4 mb-4">
              <div className="company-card text-center p-4">
                <div className="company-icon mb-3">
                  <i className="fas fa-building fa-3x text-primary"></i>
                </div>
                <h5>About AgriConnect</h5>
                <p className="text-muted">Leading provider of AI-powered agricultural solutions, helping farmers optimize their operations and increase productivity.</p>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="company-card text-center p-4">
                <div className="company-icon mb-3">
                  <i className="fas fa-users fa-3x text-success"></i>
                </div>
                <h5>Our Mission</h5>
                <p className="text-muted">To democratize access to advanced farming technology and empower farmers with data-driven insights for sustainable agriculture.</p>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="company-card text-center p-4">
                <div className="company-icon mb-3">
                  <i className="fas fa-chart-line fa-3x text-warning"></i>
                </div>
                <h5>Innovation Focus</h5>
                <p className="text-muted">Continuously developing cutting-edge AI models and machine learning solutions to address modern farming challenges.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action with AgriConnect Branding */}
        <div className="text-center mt-5 animate__animated animate__fadeInUp">
          <div className="cta-section bg-gradient-success text-white p-5 rounded">
            <div className="agriconnect-logo mb-3">
              <i className="fas fa-seedling fa-3x"></i>
            </div>
            <h3 className="mb-4">Ready to Transform Your Farming with AgriConnect?</h3>
            <p className="lead mb-4">
              Join thousands of farmers who are already benefiting from our comprehensive AI-powered solutions.
            </p>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <button className="btn btn-light btn-lg">
                <i className="fas fa-play me-2"></i>
                Watch AgriConnect Demo
              </button>
              <button className="btn btn-outline-light btn-lg">
                <i className="fas fa-phone me-2"></i>
                Contact AgriConnect Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 