import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'animate.css';

export default function JoinUs() {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: 'fas fa-chart-line',
      title: 'Increased Profits',
      description: 'Access better market prices and reduce middlemen costs',
      color: 'success'
    },
    {
      icon: 'fas fa-cloud-sun',
      title: 'Weather Intelligence',
      description: 'Get real-time weather alerts and crop advisory',
      color: 'info'
    },
    {
      icon: 'fas fa-users',
      title: 'Expert Network',
      description: 'Connect with agricultural experts and scientists',
      color: 'primary'
    },
    {
      icon: 'fas fa-mobile-alt',
      title: 'Digital Tools',
      description: 'Use modern farming apps and monitoring systems',
      color: 'warning'
    },
    {
      icon: 'fas fa-truck',
      title: 'Direct Marketing',
      description: 'Sell directly to buyers and get better prices',
      color: 'danger'
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Crop Insurance',
      description: 'Protect your crops with digital insurance solutions',
      color: 'secondary'
    }
  ];

  const features = [
    {
      title: 'Digital Farmer Profile',
      description: 'Create your digital identity with farming history and expertise',
      icon: 'fas fa-id-card'
    },
    {
      title: 'Market Price Updates',
      description: 'Get real-time prices for all major crops in your region',
      icon: 'fas fa-chart-bar'
    },
    {
      title: 'Weather Advisory',
      description: 'Receive personalized weather alerts and farming recommendations',
      icon: 'fas fa-cloud-rain'
    },
    {
      title: 'Expert Consultation',
      description: 'Chat with agricultural experts for crop-specific advice',
      icon: 'fas fa-comments'
    },
    {
      title: 'Crop Monitoring',
      description: 'Track your crops with satellite imagery and sensors',
      icon: 'fas fa-satellite'
    },
    {
      title: 'Financial Services',
      description: 'Access loans, insurance, and financial planning tools',
      icon: 'fas fa-piggy-bank'
    }
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Farmer from Punjab',
      quote: 'AgriConnect helped me increase my wheat yield by 30% and get better prices.',
      rating: 5,
      image: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      name: 'Priya Sharma',
      role: 'Organic Farmer',
      quote: 'The weather alerts and expert advice have been game-changers for my organic farm.',
      rating: 5,
      image: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      name: 'Amit Patel',
      role: 'Agricultural Agent',
      quote: 'I can now help more farmers and earn better through this platform.',
      rating: 5,
      image: 'https://randomuser.me/api/portraits/men/67.jpg'
    }
  ];

  const stats = [
    { number: '50,000+', label: 'Active Farmers' },
    { number: '₹2.5Cr+', label: 'Total Transactions' },
    { number: '95%', label: 'Satisfaction Rate' },
    { number: '24/7', label: 'Expert Support' }
  ];

  return (
    <div className="join-us-page">
      {/* Hero Section */}
      <section className="hero-section py-5 bg-gradient-primary text-white">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="hero-content animate__animated animate__fadeInLeft">
                <h1 className="display-4 fw-bold mb-4">
                  Join the Future of Farming
                </h1>
                <p className="lead mb-4">
                  Connect with modern agricultural technology, expert advice, and better market opportunities. 
                  Transform your farming journey with AgriConnect.
                </p>
                <div className="hero-stats mb-4">
                  <div className="row">
                    {stats.map((stat, index) => (
                      <div key={index} className="col-6 mb-3">
                        <div className="stat-item text-center">
                          <div className="stat-number h3 fw-bold">{stat.number}</div>
                          <div className="stat-label small">{stat.label}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="hero-actions">
                  <button 
                    className="btn btn-light btn-lg me-3 mb-2"
                    onClick={() => navigate('/login-selection')}
                  >
                    <i className="fas fa-user-plus me-2"></i>
                    Get Started Now
                  </button>
                  <button 
                    className="btn btn-outline-light btn-lg mb-2"
                    onClick={() => navigate('/services')}
                  >
                    <i className="fas fa-info-circle me-2"></i>
                    Learn More
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-image animate__animated animate__fadeInRight">
                <img 
                  src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Modern Farming"
                  className="img-fluid rounded shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">Why Choose AgriConnect?</h2>
            <p className="lead text-muted">Discover the advantages that make us the preferred choice for farmers</p>
          </div>
          <div className="row">
            {benefits.map((benefit, index) => (
              <div key={index} className="col-lg-4 col-md-6 mb-4">
                <div className="card h-100 shadow-sm hover-lift animate__animated animate__fadeInUp" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="card-body text-center p-4">
                    <div className={`benefit-icon mb-3 text-${benefit.color}`}>
                      <i className={`${benefit.icon} fa-3x`}></i>
                    </div>
                    <h5 className="card-title mb-3">{benefit.title}</h5>
                    <p className="card-text text-muted">{benefit.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">Platform Features</h2>
            <p className="lead text-muted">Everything you need for modern farming in one place</p>
          </div>
          <div className="row">
            {features.map((feature, index) => (
              <div key={index} className="col-lg-6 mb-4">
                <div className="feature-item d-flex align-items-start p-4 bg-white rounded shadow-sm">
                  <div className="feature-icon me-3">
                    <i className={`${feature.icon} fa-2x text-primary`}></i>
                  </div>
                  <div className="feature-content">
                    <h5 className="mb-2">{feature.title}</h5>
                    <p className="text-muted mb-0">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">What Our Users Say</h2>
            <p className="lead text-muted">Real stories from farmers who transformed their farming</p>
          </div>
          <div className="row">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="col-lg-4 mb-4">
                <div className="card h-100 shadow-sm animate__animated animate__fadeInUp" style={{animationDelay: `${index * 0.2}s`}}>
                  <div className="card-body p-4">
                    <div className="d-flex align-items-center mb-3">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="rounded-circle me-3"
                        style={{width: '50px', height: '50px', objectFit: 'cover'}}
                      />
                      <div>
                        <h6 className="mb-1">{testimonial.name}</h6>
                        <small className="text-muted">{testimonial.role}</small>
                      </div>
                    </div>
                    <p className="card-text mb-3">"{testimonial.quote}"</p>
                    <div className="rating">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <i key={i} className="fas fa-star text-warning"></i>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Join Section */}
      <section className="how-to-join py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">How to Join AgriConnect</h2>
            <p className="lead text-muted">Simple steps to get started with modern farming</p>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="step-card text-center">
                <div className="step-number mb-3">
                  <span className="badge bg-primary rounded-circle p-3">1</span>
                </div>
                <h5>Choose Your Role</h5>
                <p className="text-muted">Select whether you're a farmer, agent, or administrator</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="step-card text-center">
                <div className="step-number mb-3">
                  <span className="badge bg-success rounded-circle p-3">2</span>
                </div>
                <h5>Create Account</h5>
                <p className="text-muted">Sign up with your basic information and location</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="step-card text-center">
                <div className="step-number mb-3">
                  <span className="badge bg-warning rounded-circle p-3">3</span>
                </div>
                <h5>Complete Profile</h5>
                <p className="text-muted">Add your farming details and preferences</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="step-card text-center">
                <div className="step-number mb-3">
                  <span className="badge bg-info rounded-circle p-3">4</span>
                </div>
                <h5>Start Using</h5>
                <p className="text-muted">Access all features and connect with experts</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-5">
        <div className="container">
          <div className="card shadow-lg bg-gradient-primary text-white">
            <div className="card-body text-center p-5">
              <h2 className="display-5 fw-bold mb-4">Ready to Transform Your Farming?</h2>
              <p className="lead mb-4">Join thousands of farmers who are already benefiting from our platform.</p>
              <div className="d-flex justify-content-center gap-3 flex-wrap">
                <button 
                  className="btn btn-light btn-lg"
                  onClick={() => navigate('/login-selection')}
                >
                  <i className="fas fa-user-plus me-2"></i>
                  Join Now - It's Free!
                </button>
                <button 
                  className="btn btn-outline-light btn-lg"
                  onClick={() => navigate('/contact')}
                >
                  <i className="fas fa-phone me-2"></i>
                  Contact Support
                </button>
              </div>
              <div className="mt-4">
                <small className="text-light">
                  <i className="fas fa-shield-alt me-2"></i>
                  Your data is secure and protected
                </small>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 