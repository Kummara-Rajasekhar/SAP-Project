import React from 'react';
import 'animate.css';

const serviceCategories = [
  {
    title: "Smart Farming Solutions",
    icon: "fas fa-seedling",
    color: "success",
    services: [
      {
        icon: "fas fa-robot",
        title: "AI Crop Prediction",
        description: "Advanced AI algorithms predict crop yields, optimal sowing times, and harvest periods based on historical data and current conditions.",
        features: ["Yield Forecasting", "Optimal Sowing Time", "Harvest Prediction", "Risk Assessment"]
      },
      {
        icon: "fas fa-chart-line",
        title: "Precision Agriculture",
        description: "GPS-based field mapping and variable rate technology for optimal resource utilization and crop management.",
        features: ["Field Mapping", "Variable Rate Application", "Resource Optimization", "Data Analytics"]
      },
      {
        icon: "fas fa-leaf",
        title: "Crop Health Monitoring",
        description: "Real-time monitoring of crop health using satellite imagery and IoT sensors for early disease detection.",
        features: ["Disease Detection", "Nutrient Analysis", "Growth Tracking", "Alert System"]
      }
    ]
  },
  {
    title: "Weather & Climate Services",
    icon: "fas fa-cloud-sun",
    color: "primary",
    services: [
      {
        icon: "fas fa-cloud-rain",
        title: "Real-time Weather Alerts",
        description: "Hyper-local weather forecasts and alerts specifically tailored for agricultural activities and crop protection.",
        features: ["Hourly Forecasts", "Rain Predictions", "Storm Alerts", "Temperature Monitoring"]
      },
      {
        icon: "fas fa-thermometer-half",
        title: "Climate Analysis",
        description: "Long-term climate data analysis and seasonal weather patterns to help with crop planning and risk management.",
        features: ["Seasonal Trends", "Climate Patterns", "Risk Assessment", "Historical Data"]
      },
      {
        icon: "fas fa-sun",
        title: "UV Index & Solar Radiation",
        description: "Solar radiation monitoring and UV index tracking for optimal crop growth and protection strategies.",
        features: ["UV Monitoring", "Solar Tracking", "Crop Protection", "Growth Optimization"]
      }
    ]
  },
  {
    title: "Market & Financial Services",
    icon: "fas fa-chart-bar",
    color: "warning",
    services: [
      {
        icon: "fas fa-rupee-sign",
        title: "Live Market Prices",
        description: "Real-time market prices for all major crops across different markets and regions with price trend analysis.",
        features: ["Live Price Updates", "Market Comparison", "Price Trends", "Regional Analysis"]
      },
      {
        icon: "fas fa-handshake",
        title: "Direct Buyer Connect",
        description: "Direct connection with buyers, processors, and exporters to eliminate middlemen and maximize profits.",
        features: ["Buyer Network", "Quality Standards", "Price Negotiation", "Contract Management"]
      },
      {
        icon: "fas fa-credit-card",
        title: "Digital Payment Solutions",
        description: "Secure digital payment systems for seamless transactions with buyers and input suppliers.",
        features: ["Secure Payments", "Transaction History", "Multiple Options", "Instant Settlement"]
      }
    ]
  },
  {
    title: "Expert Support & Training",
    icon: "fas fa-users",
    color: "info",
    services: [
      {
        icon: "fas fa-user-tie",
        title: "Agricultural Expert Connect",
        description: "Direct access to certified agricultural experts, soil scientists, and crop specialists for personalized guidance.",
        features: ["Expert Consultation", "Soil Testing", "Crop Planning", "Problem Solving"]
      },
      {
        icon: "fas fa-graduation-cap",
        title: "Training Programs",
        description: "Comprehensive training programs on modern farming techniques, technology adoption, and best practices.",
        features: ["Online Courses", "Field Training", "Certification", "Skill Development"]
      },
      {
        icon: "fas fa-headset",
        title: "24/7 Support System",
        description: "Round-the-clock customer support through multiple channels including phone, chat, and video calls.",
        features: ["Multi-channel Support", "Quick Response", "Technical Help", "Emergency Support"]
      }
    ]
  },
  {
    title: "Technology & Innovation",
    icon: "fas fa-microchip",
    color: "secondary",
    services: [
      {
        icon: "fas fa-mobile-alt",
        title: "Mobile App Platform",
        description: "User-friendly mobile application with offline capabilities and multi-language support for easy access.",
        features: ["Offline Access", "Multi-language", "Push Notifications", "Easy Navigation"]
      },
      {
        icon: "fas fa-camera",
        title: "Photo Analysis",
        description: "AI-powered image analysis for crop disease identification, pest detection, and growth monitoring.",
        features: ["Disease Detection", "Pest Identification", "Growth Analysis", "Instant Results"]
      },
      {
        icon: "fas fa-database",
        title: "Data Analytics",
        description: "Comprehensive data analytics and reporting tools for farm performance tracking and decision making.",
        features: ["Performance Tracking", "Custom Reports", "Trend Analysis", "Decision Support"]
      }
    ]
  },
  {
    title: "Supply Chain & Logistics",
    icon: "fas fa-truck",
    color: "danger",
    services: [
      {
        icon: "fas fa-warehouse",
        title: "Storage Solutions",
        description: "Smart storage recommendations and warehouse management for optimal crop preservation and quality maintenance.",
        features: ["Storage Guidelines", "Quality Control", "Inventory Management", "Preservation Tips"]
      },
      {
        icon: "fas fa-route",
        title: "Logistics Support",
        description: "End-to-end logistics support including transportation, packaging, and delivery coordination.",
        features: ["Transportation", "Packaging", "Delivery Tracking", "Cost Optimization"]
      },
      {
        icon: "fas fa-certificate",
        title: "Quality Certification",
        description: "Quality assurance and certification services to meet international standards and market requirements.",
        features: ["Quality Testing", "Certification", "Standards Compliance", "Market Access"]
      }
    ]
  }
];

export default function Services() {
  return (
    <div className="page-content">
      {/* Hero Section */}
      <div className="services-hero py-5 mb-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="hero-content animate__animated animate__fadeInLeft">
                <div className="brand-section mb-4">
                  <div className="logo-container">
                    <div className="logo-icon">
                      <i className="fas fa-seedling"></i>
                    </div>
                    <div className="brand-text">
                      <h1 className="brand-title">AgriConnect</h1>
                      <p className="brand-tagline">Comprehensive Farming Services</p>
                    </div>
                  </div>
                </div>
                <h2 className="text-success mb-4">
                  Empowering Farmers with
                  <span className="text-gradient"> Complete Solutions</span>
                </h2>
                <p className="lead text-muted mb-4">
                  From weather monitoring to market access, we provide end-to-end services 
                  that modernize farming practices and maximize your agricultural success.
                </p>
                <div className="hero-stats">
                  <div className="row">
                    <div className="col-4 text-center">
                      <h3 className="text-success mb-1">50+</h3>
                      <small className="text-muted">Services</small>
                    </div>
                    <div className="col-4 text-center">
                      <h3 className="text-primary mb-1">24/7</h3>
                      <small className="text-muted">Support</small>
                    </div>
                    <div className="col-4 text-center">
                      <h3 className="text-warning mb-1">100%</h3>
                      <small className="text-muted">Digital</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-image-wrapper animate__animated animate__fadeInRight">
                <div className="hero-image-container">
                  <div className="floating-card card-1">
                    <div className="card-icon">
                      <i className="fas fa-cloud-sun"></i>
                    </div>
                    <div className="card-content">
                      <div className="card-title">Weather Alerts</div>
                      <div className="card-subtitle">Real-time updates</div>
                    </div>
                  </div>
                  <div className="floating-card card-2">
                    <div className="card-icon">
                      <i className="fas fa-chart-line"></i>
                    </div>
                    <div className="card-content">
                      <div className="card-title">Market Prices</div>
                      <div className="card-subtitle">Live data</div>
                    </div>
                  </div>
                  <div className="floating-card card-3">
                    <div className="card-icon">
                      <i className="fas fa-robot"></i>
                    </div>
                    <div className="card-content">
                      <div className="card-title">AI Insights</div>
                      <div className="card-subtitle">Smart predictions</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Categories */}
      <div className="container py-5">
        {serviceCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="service-category mb-5">
            <div className="category-header text-center mb-5 animate__animated animate__fadeInDown">
              <div className="category-icon-wrapper mb-3">
                <div className={`category-icon bg-${category.color}`}>
                  <i className={`${category.icon} fa-2x text-white`}></i>
                </div>
              </div>
              <h3 className={`text-${category.color} mb-3`}>{category.title}</h3>
              <div className="category-divider"></div>
            </div>
            
            <div className="row">
              {category.services.map((service, serviceIndex) => (
                <div key={serviceIndex} className="col-lg-4 col-md-6 mb-4">
                  <div className={`service-card card h-100 shadow-sm animate__animated animate__fadeInUp`} 
                       style={{animationDelay: `${serviceIndex * 0.2}s`}}>
                    <div className="card-body p-4">
                      <div className="service-icon-wrapper mb-4">
                        <div className={`service-icon bg-${category.color}-subtle`}>
                          <i className={`${service.icon} fa-2x text-${category.color}`}></i>
                        </div>
                      </div>
                      
                      <h5 className="card-title mb-3">{service.title}</h5>
                      <p className="card-text text-muted mb-4">{service.description}</p>
                      
                      <div className="service-features">
                        <h6 className="text-muted mb-3">Key Features:</h6>
                        <ul className="list-unstyled">
                          {service.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="mb-2">
                              <i className={`fas fa-check-circle text-${category.color} me-2`}></i>
                              <span className="small">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="service-action mt-4">
                        <button className={`btn btn-${category.color} btn-sm w-100`}>
                          <i className="fas fa-arrow-right me-2"></i>
                          Learn More
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Special Weather Services Section */}
        <div className="weather-services-section mb-5">
          <div className="card shadow-lg border-0 animate__animated animate__fadeInUp">
            <div className="card-body p-5">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <h3 className="text-primary mb-4">
                    <i className="fas fa-cloud-sun me-3"></i>
                    Advanced Weather Services
                  </h3>
                  <p className="lead text-muted mb-4">
                    Our comprehensive weather monitoring system provides farmers with 
                    precise, location-specific weather data and agricultural recommendations.
                  </p>
                  <div className="weather-features">
                    <div className="row">
                      <div className="col-6 mb-3">
                        <div className="weather-feature">
                          <i className="fas fa-thermometer-half text-primary me-2"></i>
                          <span>Temperature Monitoring</span>
                        </div>
                      </div>
                      <div className="col-6 mb-3">
                        <div className="weather-feature">
                          <i className="fas fa-tint text-info me-2"></i>
                          <span>Humidity Tracking</span>
                        </div>
                      </div>
                      <div className="col-6 mb-3">
                        <div className="weather-feature">
                          <i className="fas fa-wind text-warning me-2"></i>
                          <span>Wind Speed</span>
                        </div>
                      </div>
                      <div className="col-6 mb-3">
                        <div className="weather-feature">
                          <i className="fas fa-sun text-warning me-2"></i>
                          <span>UV Index</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="weather-demo text-center">
                    <div className="weather-card bg-gradient-primary text-white p-4 rounded">
                      <h4 className="mb-3">Current Weather</h4>
                      <div className="weather-info">
                        <i className="fas fa-cloud-sun fa-3x mb-3"></i>
                        <h2>28°C</h2>
                        <p>Partly Cloudy</p>
                        <div className="weather-details">
                          <div className="row">
                            <div className="col-4">
                              <small>Humidity</small>
                              <div>65%</div>
                            </div>
                            <div className="col-4">
                              <small>Wind</small>
                              <div>12 km/h</div>
                            </div>
                            <div className="col-4">
                              <small>UV</small>
                              <div>High</div>
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

        {/* Call to Action */}
        <div className="text-center mt-5 animate__animated animate__fadeInUp">
          <div className="cta-section bg-gradient-success text-white p-5 rounded">
            <h3 className="mb-4">Ready to Transform Your Farming?</h3>
            <p className="lead mb-4">
              Join thousands of farmers who are already benefiting from our comprehensive services.
            </p>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <button className="btn btn-light btn-lg">
                <i className="fas fa-user-plus me-2"></i>
                Start Free Trial
              </button>
              <button className="btn btn-outline-light btn-lg">
                <i className="fas fa-play me-2"></i>
                Watch Demo
              </button>
              <button className="btn btn-outline-light btn-lg">
                <i className="fas fa-phone me-2"></i>
                Contact Expert
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 