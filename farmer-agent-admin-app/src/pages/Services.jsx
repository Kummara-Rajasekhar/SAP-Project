import React from 'react';
import 'animate.css';

const services = [
  {
    icon: 'fas fa-robot',
    title: 'AI Crop Prediction',
    desc: 'Get accurate predictions for crop yield and best sowing times.'
  },
  {
    icon: 'fas fa-cloud-sun',
    title: 'Weather Alerts',
    desc: 'Receive timely weather updates and alerts for your region.'
  },
  {
    icon: 'fas fa-user-tie',
    title: 'Agent Connect',
    desc: 'Directly connect with your regional agent for support.'
  },
  {
    icon: 'fas fa-money-bill-wave',
    title: 'Digital Payments',
    desc: 'Fast, secure, and transparent payments for your produce.'
  },
  {
    icon: 'fas fa-seedling',
    title: 'Crop Management',
    desc: 'Register, track, and manage all your crops in one place.'
  },
  {
    icon: 'fas fa-upload',
    title: 'Media Upload',
    desc: 'Send photos/videos of your crops or issues to agents.'
  },
  {
    icon: 'fas fa-book-open',
    title: 'Knowledge Center',
    desc: 'Access guides, tips, and best practices for modern farming.'
  },
  {
    icon: 'fas fa-headset',
    title: '24/7 Support',
    desc: 'Get help anytime from our expert support team.'
  },
  {
    icon: 'fas fa-rupee-sign',
    title: 'Regional Market Prices',
    desc: 'Stay updated with the latest prices for your crops.'
  },
  {
    icon: 'fas fa-bug',
    title: 'Pesticide Recommendations',
    desc: 'Personalized suggestions for safe and effective pest control.'
  },
];

export default function Services() {
  return (
    <div className="page-content">
      <div className="container py-5">
        <h1 className="text-center mb-5 animate__animated animate__fadeInDown">
          Our <span className="text-success">Services</span>
        </h1>
        
        <div className="row">
          <div className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm animate__animated animate__fadeInUp">
              <div className="card-body text-center p-4">
                <i className="fas fa-seedling fa-3x text-success mb-3"></i>
                <h5 className="card-title">Crop Management</h5>
                <p className="card-text">
                  Comprehensive crop planning, monitoring, and management tools with AI-powered insights.
                </p>
                <ul className="list-unstyled text-start">
                  <li><i className="fas fa-check text-success me-2"></i>Crop Planning</li>
                  <li><i className="fas fa-check text-success me-2"></i>Growth Monitoring</li>
                  <li><i className="fas fa-check text-success me-2"></i>Disease Detection</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm animate__animated animate__fadeInUp animate__delay-1s">
              <div className="card-body text-center p-4">
                <i className="fas fa-chart-line fa-3x text-primary mb-3"></i>
                <h5 className="card-title">Market Analytics</h5>
                <p className="card-text">
                  Real-time market data, price predictions, and demand forecasting for better decisions.
                </p>
                <ul className="list-unstyled text-start">
                  <li><i className="fas fa-check text-success me-2"></i>Price Tracking</li>
                  <li><i className="fas fa-check text-success me-2"></i>Demand Analysis</li>
                  <li><i className="fas fa-check text-success me-2"></i>Market Trends</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm animate__animated animate__fadeInUp animate__delay-2s">
              <div className="card-body text-center p-4">
                <i className="fas fa-users fa-3x text-warning mb-3"></i>
                <h5 className="card-title">Expert Support</h5>
                <p className="card-text">
                  24/7 access to agricultural experts and technical support for all farming needs.
                </p>
                <ul className="list-unstyled text-start">
                  <li><i className="fas fa-check text-success me-2"></i>Expert Consultation</li>
                  <li><i className="fas fa-check text-success me-2"></i>Technical Support</li>
                  <li><i className="fas fa-check text-success me-2"></i>Training Programs</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm animate__animated animate__fadeInUp animate__delay-3s">
              <div className="card-body text-center p-4">
                <i className="fas fa-tint fa-3x text-info mb-3"></i>
                <h5 className="card-title">Irrigation Management</h5>
                <p className="card-text">
                  Smart irrigation systems with weather-based recommendations and water optimization.
                </p>
                <ul className="list-unstyled text-start">
                  <li><i className="fas fa-check text-success me-2"></i>Weather Integration</li>
                  <li><i className="fas fa-check text-success me-2"></i>Water Optimization</li>
                  <li><i className="fas fa-check text-success me-2"></i>Automated Systems</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm animate__animated animate__fadeInUp animate__delay-4s">
              <div className="card-body text-center p-4">
                <i className="fas fa-truck fa-3x text-secondary mb-3"></i>
                <h5 className="card-title">Supply Chain</h5>
                <p className="card-text">
                  Direct market access, logistics support, and supply chain optimization services.
                </p>
                <ul className="list-unstyled text-start">
                  <li><i className="fas fa-check text-success me-2"></i>Direct Marketing</li>
                  <li><i className="fas fa-check text-success me-2"></i>Logistics Support</li>
                  <li><i className="fas fa-check text-success me-2"></i>Quality Assurance</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm animate__animated animate__fadeInUp animate__delay-5s">
              <div className="card-body text-center p-4">
                <i className="fas fa-mobile-alt fa-3x text-danger mb-3"></i>
                <h5 className="card-title">Mobile App</h5>
                <p className="card-text">
                  User-friendly mobile application for on-the-go access to all farming tools.
                </p>
                <ul className="list-unstyled text-start">
                  <li><i className="fas fa-check text-success me-2"></i>Offline Access</li>
                  <li><i className="fas fa-check text-success me-2"></i>Push Notifications</li>
                  <li><i className="fas fa-check text-success me-2"></i>Multi-language</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-5 animate__animated animate__fadeInUp">
          <h3 className="text-success mb-4">Ready to Get Started?</h3>
          <p className="lead mb-4">Join thousands of farmers who are already benefiting from our services.</p>
          <a href="/farmer-signup" className="btn btn-primary-custom btn-lg me-3">Sign Up Now</a>
          <a href="/contact" className="btn btn-outline-success btn-lg">Contact Us</a>
        </div>
      </div>
    </div>
  );
} 