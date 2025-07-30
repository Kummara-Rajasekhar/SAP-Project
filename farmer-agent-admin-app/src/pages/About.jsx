import React from 'react';
import 'animate.css';

export default function About() {
  return (
    <div className="page-content">
      <div className="container py-5">
        {/* Hero Section */}
        <div className="row mb-5">
          <div className="col-lg-8 mx-auto text-center">
            <div className="brand-section mb-4">
              <div className="logo-container justify-content-center">
                <div className="logo-icon">
                  <i className="fas fa-seedling"></i>
                </div>
                <div className="brand-text">
                  <h1 className="brand-title">AgriConnect</h1>
                  <p className="brand-tagline">Smart Farming Solutions</p>
                </div>
              </div>
            </div>
            <h2 className="text-success mb-4 animate__animated animate__fadeInDown">
              Revolutionizing Agriculture Through Technology
            </h2>
            <p className="lead text-muted animate__animated animate__fadeInUp">
              Connecting farmers, agricultural experts, and buyers in a comprehensive digital ecosystem 
              that empowers sustainable farming practices and economic growth.
            </p>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="row mb-5">
          <div className="col-lg-6 mb-4">
            <div className="card h-100 shadow-sm animate__animated animate__fadeInLeft">
              <div className="card-body p-4">
                <div className="text-center mb-3">
                  <i className="fas fa-bullseye fa-3x text-success"></i>
                </div>
                <h4 className="text-success mb-3">Our Mission</h4>
                <p className="text-muted">
                  To bridge the gap between traditional farming practices and modern technology, 
                  empowering farmers with data-driven insights, market access, and expert support 
                  to create a sustainable and profitable agricultural future.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 mb-4">
            <div className="card h-100 shadow-sm animate__animated animate__fadeInRight">
              <div className="card-body p-4">
                <div className="text-center mb-3">
                  <i className="fas fa-eye fa-3x text-primary"></i>
                </div>
                <h4 className="text-primary mb-3">Our Vision</h4>
                <p className="text-muted">
                  To become India's leading agricultural technology platform, connecting millions 
                  of farmers with cutting-edge solutions, expert knowledge, and global markets 
                  for a prosperous agricultural ecosystem.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Platform Overview */}
        <div className="card shadow-sm mb-5 animate__animated animate__fadeInUp">
          <div className="card-body p-5">
            <h3 className="text-success mb-4 text-center">Platform Overview</h3>
            <div className="row">
              <div className="col-md-4 text-center mb-4">
                <div className="feature-icon mb-3">
                  <i className="fas fa-mobile-alt fa-3x text-success"></i>
                </div>
                <h5>Digital Solutions</h5>
                <p className="text-muted small">
                  Mobile-first platform with real-time data, weather updates, and crop monitoring
                </p>
              </div>
              <div className="col-md-4 text-center mb-4">
                <div className="feature-icon mb-3">
                  <i className="fas fa-chart-line fa-3x text-primary"></i>
                </div>
                <h5>Market Intelligence</h5>
                <p className="text-muted small">
                  Live market prices, demand trends, and direct buyer-seller connections
                </p>
              </div>
              <div className="col-md-4 text-center mb-4">
                <div className="feature-icon mb-3">
                  <i className="fas fa-users fa-3x text-info"></i>
                </div>
                <h5>Expert Network</h5>
                <p className="text-muted small">
                  Connect with agricultural experts, scientists, and industry professionals
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Role-Based Features */}
        <div className="row mb-5">
          <div className="col-12">
            <h3 className="text-center text-success mb-5 animate__animated animate__fadeInDown">
              Platform Roles & Features
            </h3>
          </div>
          
          {/* Farmers Section */}
          <div className="col-lg-4 mb-4">
            <div className="card h-100 shadow-sm animate__animated animate__fadeInUp">
              <div className="card-header bg-success text-white text-center">
                <i className="fas fa-user-farmer fa-2x mb-2"></i>
                <h4 className="mb-0">Farmers</h4>
              </div>
              <div className="card-body p-4">
                <h6 className="text-success mb-3">Key Features:</h6>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <i className="fas fa-check-circle text-success me-2"></i>
                    Digital Farmer Profile & Marketplace
                  </li>
                  <li className="mb-2">
                    <i className="fas fa-check-circle text-success me-2"></i>
                    Weather-based Crop Advisory
                  </li>
                  <li className="mb-2">
                    <i className="fas fa-check-circle text-success me-2"></i>
                    Real-time Market Prices
                  </li>
                  <li className="mb-2">
                    <i className="fas fa-check-circle text-success me-2"></i>
                    Direct Buyer Connections
                  </li>
                  <li className="mb-2">
                    <i className="fas fa-check-circle text-success me-2"></i>
                    Crop Monitoring & Analytics
                  </li>
                  <li className="mb-2">
                    <i className="fas fa-check-circle text-success me-2"></i>
                    Expert Consultation Access
                  </li>
                </ul>
                <div className="text-center mt-3">
                  <span className="badge bg-success-subtle text-success">50,000+ Active Farmers</span>
                </div>
              </div>
            </div>
          </div>

          {/* Agents Section */}
          <div className="col-lg-4 mb-4">
            <div className="card h-100 shadow-sm animate__animated animate__fadeInUp">
              <div className="card-header bg-primary text-white text-center">
                <i className="fas fa-user-tie fa-2x mb-2"></i>
                <h4 className="mb-0">Agricultural Agents</h4>
              </div>
              <div className="card-body p-4">
                <h6 className="text-primary mb-3">Key Features:</h6>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <i className="fas fa-check-circle text-primary me-2"></i>
                    Expert Dashboard & Analytics
                  </li>
                  <li className="mb-2">
                    <i className="fas fa-check-circle text-primary me-2"></i>
                    Farmer Management System
                  </li>
                  <li className="mb-2">
                    <i className="fas fa-check-circle text-primary me-2"></i>
                    Advisory Services Platform
                  </li>
                  <li className="mb-2">
                    <i className="fas fa-check-circle text-primary me-2"></i>
                    Market Intelligence Tools
                  </li>
                  <li className="mb-2">
                    <i className="fas fa-check-circle text-primary me-2"></i>
                    Training & Certification
                  </li>
                  <li className="mb-2">
                    <i className="fas fa-check-circle text-primary me-2"></i>
                    Commission Tracking
                  </li>
                </ul>
                <div className="text-center mt-3">
                  <span className="badge bg-primary-subtle text-primary">1,200+ Certified Agents</span>
                </div>
              </div>
            </div>
          </div>

          {/* Admins Section */}
          <div className="col-lg-4 mb-4">
            <div className="card h-100 shadow-sm animate__animated animate__fadeInUp">
              <div className="card-header bg-warning text-white text-center">
                <i className="fas fa-user-shield fa-2x mb-2"></i>
                <h4 className="mb-0">Administrators</h4>
              </div>
              <div className="card-body p-4">
                <h6 className="text-warning mb-3">Key Features:</h6>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <i className="fas fa-check-circle text-warning me-2"></i>
                    Platform Management Dashboard
                  </li>
                  <li className="mb-2">
                    <i className="fas fa-check-circle text-warning me-2"></i>
                    User Management & Security
                  </li>
                  <li className="mb-2">
                    <i className="fas fa-check-circle text-warning me-2"></i>
                    Content & Policy Control
                  </li>
                  <li className="mb-2">
                    <i className="fas fa-check-circle text-warning me-2"></i>
                    Analytics & Reporting
                  </li>
                  <li className="mb-2">
                    <i className="fas fa-check-circle text-warning me-2"></i>
                    System Monitoring
                  </li>
                  <li className="mb-2">
                    <i className="fas fa-check-circle text-warning me-2"></i>
                    Support & Maintenance
                  </li>
                </ul>
                <div className="text-center mt-3">
                  <span className="badge bg-warning-subtle text-warning">24/7 Platform Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="card shadow-sm mb-5 animate__animated animate__fadeInUp">
          <div className="card-body p-5">
            <h3 className="text-success mb-4 text-center">Technology & Innovation</h3>
            <div className="row">
              <div className="col-md-3 text-center mb-4">
                <i className="fas fa-cloud fa-3x text-primary mb-3"></i>
                <h6>Cloud Infrastructure</h6>
                <p className="small text-muted">Scalable AWS cloud platform</p>
              </div>
              <div className="col-md-3 text-center mb-4">
                <i className="fas fa-mobile fa-3x text-success mb-3"></i>
                <h6>Mobile First</h6>
                <p className="small text-muted">Responsive design for all devices</p>
              </div>
              <div className="col-md-3 text-center mb-4">
                <i className="fas fa-shield-alt fa-3x text-warning mb-3"></i>
                <h6>Security</h6>
                <p className="small text-muted">End-to-end encryption & data protection</p>
              </div>
              <div className="col-md-3 text-center mb-4">
                <i className="fas fa-robot fa-3x text-info mb-3"></i>
                <h6>AI & ML</h6>
                <p className="small text-muted">Smart crop recommendations</p>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Statistics */}
        <div className="row mb-5">
          <div className="col-12">
            <h3 className="text-center text-success mb-4 animate__animated animate__fadeInDown">
              Our Impact
            </h3>
          </div>
          <div className="col-md-3 text-center mb-4">
            <div className="card shadow-sm animate__animated animate__fadeInUp">
              <div className="card-body p-4">
                <i className="fas fa-users fa-3x text-success mb-3"></i>
                <h2 className="text-success">50,000+</h2>
                <p className="text-muted">Active Farmers</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 text-center mb-4">
            <div className="card shadow-sm animate__animated animate__fadeInUp">
              <div className="card-body p-4">
                <i className="fas fa-map-marker-alt fa-3x text-primary mb-3"></i>
                <h2 className="text-primary">25+</h2>
                <p className="text-muted">States Covered</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 text-center mb-4">
            <div className="card shadow-sm animate__animated animate__fadeInUp">
              <div className="card-body p-4">
                <i className="fas fa-chart-line fa-3x text-warning mb-3"></i>
                <h2 className="text-warning">₹500M+</h2>
                <p className="text-muted">Transaction Volume</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 text-center mb-4">
            <div className="card shadow-sm animate__animated animate__fadeInUp">
              <div className="card-body p-4">
                <i className="fas fa-star fa-3x text-info mb-3"></i>
                <h2 className="text-info">4.8/5</h2>
                <p className="text-muted">User Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="card shadow-sm mb-5 animate__animated animate__fadeInUp">
          <div className="card-body p-5">
            <h3 className="text-success mb-4 text-center">Our Core Values</h3>
            <div className="row">
              <div className="col-md-4 text-center mb-4">
                <i className="fas fa-heart fa-2x text-danger mb-3"></i>
                <h6>Empathy</h6>
                <p className="small text-muted">Understanding farmer needs and challenges with compassion</p>
              </div>
              <div className="col-md-4 text-center mb-4">
                <i className="fas fa-lightbulb fa-2x text-warning mb-3"></i>
                <h6>Innovation</h6>
                <p className="small text-muted">Continuous improvement and cutting-edge solutions</p>
              </div>
              <div className="col-md-4 text-center mb-4">
                <i className="fas fa-handshake fa-2x text-info mb-3"></i>
                <h6>Trust</h6>
                <p className="small text-muted">Building lasting relationships with all stakeholders</p>
              </div>
              <div className="col-md-4 text-center mb-4">
                <i className="fas fa-leaf fa-2x text-success mb-3"></i>
                <h6>Sustainability</h6>
                <p className="small text-muted">Promoting eco-friendly farming practices</p>
              </div>
              <div className="col-md-4 text-center mb-4">
                <i className="fas fa-globe fa-2x text-primary mb-3"></i>
                <h6>Inclusivity</h6>
                <p className="small text-muted">Serving farmers from all backgrounds and regions</p>
              </div>
              <div className="col-md-4 text-center mb-4">
                <i className="fas fa-award fa-2x text-warning mb-3"></i>
                <h6>Excellence</h6>
                <p className="small text-muted">Delivering the highest quality service and support</p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="row mb-5">
          <div className="col-12">
            <h3 className="text-center text-success mb-5 animate__animated animate__fadeInDown">
              Our Expert Team
            </h3>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card h-100 shadow-sm animate__animated animate__fadeInLeft">
              <div className="card-body text-center p-4">
                <i className="fas fa-users fa-3x text-primary mb-3"></i>
                <h5>Agricultural Experts</h5>
                <p className="text-muted">
                  Experienced agronomists, soil scientists, and crop specialists with decades 
                  of field experience providing expert guidance to farmers.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card h-100 shadow-sm animate__animated animate__fadeInRight">
              <div className="card-body text-center p-4">
                <i className="fas fa-laptop-code fa-3x text-success mb-3"></i>
                <h5>Technology Team</h5>
                <p className="text-muted">
                  Skilled developers, data scientists, and UX designers creating innovative 
                  digital solutions for modern agriculture challenges.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card h-100 shadow-sm animate__animated animate__fadeInLeft">
              <div className="card-body text-center p-4">
                <i className="fas fa-chart-bar fa-3x text-warning mb-3"></i>
                <h5>Market Analysts</h5>
                <p className="text-muted">
                  Market research experts and economists providing real-time insights 
                  on crop prices, demand trends, and market opportunities.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card h-100 shadow-sm animate__animated animate__fadeInRight">
              <div className="card-body text-center p-4">
                <i className="fas fa-headset fa-3x text-info mb-3"></i>
                <h5>Support Team</h5>
                <p className="text-muted">
                  Dedicated customer support professionals ensuring farmers receive 
                  timely assistance and guidance whenever needed.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="card shadow-sm animate__animated animate__fadeInUp">
          <div className="card-body p-5 text-center">
            <h3 className="text-success mb-4">Join the Agricultural Revolution</h3>
            <p className="lead text-muted mb-4">
              Whether you're a farmer looking to modernize your practices, an expert wanting to share knowledge, 
              or an organization seeking to support agriculture, we have a place for you in our ecosystem.
            </p>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <button className="btn btn-success btn-lg">
                <i className="fas fa-user-plus me-2"></i>
                Join as Farmer
              </button>
              <button className="btn btn-primary btn-lg">
                <i className="fas fa-user-tie me-2"></i>
                Become an Agent
              </button>
              <button className="btn btn-outline-success btn-lg">
                <i className="fas fa-envelope me-2"></i>
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 