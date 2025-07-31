import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import 'animate.css';

export default function Home() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const features = [
    {
      icon: 'fas fa-mobile-alt',
      title: 'Digital Farmer Profile',
      description: 'Create and manage your digital farming profile with complete crop history and achievements.'
    },
    {
      icon: 'fas fa-cloud-sun',
      title: 'Weather Advisory',
      description: 'Get real-time weather updates and crop-specific recommendations for your region.'
    },
    {
      icon: 'fas fa-comments',
      title: 'Expert Consultation',
      description: 'Connect with agricultural experts and scientists for personalized guidance.'
    },
    {
      icon: 'fas fa-chart-line',
      title: 'Market Prices',
      description: 'Access real-time market prices and demand trends for better selling decisions.'
    },
    {
      icon: 'fas fa-handshake',
      title: 'Direct Connections',
      description: 'Connect directly with buyers and vendors without middlemen.'
    },
    {
      icon: 'fas fa-satellite',
      title: 'Crop Monitoring',
      description: 'Monitor your crops with smart technology and satellite imagery.'
    }
  ];

  const stats = [
    { number: '50,000+', label: 'Farmers Registered' },
    { number: '100+', label: 'Agricultural Experts' },
    { number: '₹2.5Cr+', label: 'Total Transactions' },
    { number: '95%', label: 'Satisfaction Rate' }
  ];

  const stakeholders = [
    {
      icon: 'fas fa-user-friends',
      title: 'Farmers',
      description: 'Access modern farming techniques, market insights, and expert guidance.',
      color: 'success'
    },
    {
      icon: 'fas fa-user-tie',
      title: 'Agricultural Experts',
      description: 'Share your knowledge and earn by helping farmers with their challenges.',
      color: 'primary'
    },
    {
      icon: 'fas fa-store',
      title: 'Buyers & Vendors',
      description: 'Connect directly with farmers for quality produce and supplies.',
      color: 'warning'
    },
    {
      icon: 'fas fa-building',
      title: 'NGOs & Government',
      description: 'Support and monitor agricultural development programs effectively.',
      color: 'info'
    }
  ];

  const recentActivities = [
    {
      title: 'New Crop Advisory Released',
      description: 'Updated recommendations for Rabi season crops',
      time: '2 hours ago',
      icon: 'fas fa-bell'
    },
    {
      title: 'Market Price Update',
      description: 'Wheat prices increased by 8% this week',
      time: '4 hours ago',
      icon: 'fas fa-chart-line'
    },
    {
      title: 'Expert Available',
      description: 'Dr. Sharma available for consultation today',
      time: '6 hours ago',
      icon: 'fas fa-user-md'
    },
    {
      title: 'Weather Alert',
      description: 'Heavy rainfall expected in North India',
      time: '8 hours ago',
      icon: 'fas fa-cloud-rain'
    }
  ];

  const upcomingEvents = [
    {
      title: 'Agricultural Workshop',
      date: 'Dec 15, 2024',
      time: '10:00 AM',
      location: 'Online',
      type: 'Workshop'
    },
    {
      title: 'Crop Management Seminar',
      date: 'Dec 20, 2024',
      time: '2:00 PM',
      location: 'Delhi',
      type: 'Seminar'
    },
    {
      title: 'Market Analysis Webinar',
      date: 'Dec 25, 2024',
      time: '11:00 AM',
      location: 'Online',
      type: 'Webinar'
    }
  ];

  const testimonials = [
    {
      name: 'Ramesh Kumar',
      role: 'Farmer, Punjab',
      quote: 'Thanks to AgriTech, I increased my crop yield by 30% and got better market prices.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80'
    },
    {
      name: 'Priya Sharma',
      role: 'Agricultural Expert',
      quote: 'The platform helps me reach more farmers and share my expertise effectively.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80'
    },
    {
      name: 'Amit Patel',
      role: 'Buyer, Mumbai',
      quote: 'Direct connection with farmers ensures quality produce at fair prices.',
      rating: 4,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80'
    }
  ];

  return (
    <div className="page-content">
      {/* Hero Image Section - Full Width */}
      {/* <section className="hero-image-section py-5 position-relative overflow-hidden">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="hero-image-wrapper animate__animated animate__fadeIn animate__delay-1s">
                <div className="hero-image-container text-center">
                  <img 
                    src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
                    alt="Farmers and Agricultural Professionals Connecting in Fields" 
                    className="hero-main-image"
                    style={{
                      borderRadius: '25px',
                      boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
                      border: '6px solid #ffffff',
                      objectFit: 'cover',
                      width: '100%',
                      height: '600px',
                      maxWidth: '1200px'
                    }}
                  />
                  
              
                  <div className="floating-card card-1 animate__animated animate__fadeInUp animate__delay-2s">
                    <div className="card-icon">
                      <i className="fas fa-handshake"></i>
                    </div>
                    <div className="card-content">
                      <span className="card-title">Field Partnership</span>
                      <span className="card-subtitle">Farmers & Experts</span>
                    </div>
                  </div>
                  <div className="floating-card card-2 animate__animated animate__fadeInUp animate__delay-3s">
                    <div className="card-icon">
                      <i className="fas fa-clipboard-check"></i>
                    </div>
                    <div className="card-content">
                      <span className="card-title">Crop Consultation</span>
                      <span className="card-subtitle">Expert guidance</span>
                    </div>
                  </div>
                  <div className="floating-card card-3 animate__animated animate__fadeInUp animate__delay-4s">
                    <div className="card-icon">
                      <i className="fas fa-seedling"></i>
                    </div>
                    <div className="card-content">
                      <span className="card-title">Quality Seeds</span>
                      <span className="card-subtitle">Best products</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* AgriConnect Logo and Description Section - Combined Layout */}
      <section className="agriconnect-showcase py-5">
        <div className="container">
          <div className="agriconnect-unified-section">
            {/* Logo Section */}
            <div className="logo-section">
              <div className="logo-card">
                <div className="logo-icon-large">
                  <i className="fas fa-seedling"></i>
                </div>
                <div className="logo-text">
                  <h1 className="logo-title">AgriConnect</h1>
                  <p className="logo-tagline">Smart Farming Solutions</p>
                </div>
              </div>
              <div className="trust-badge">
                <i className="fas fa-star"></i>
                <span>Trusted by 50,000+ Farmers</span>
              </div>
            </div>
            
            {/* Description Section */}
            <div className="description-section">
              <div className="description-content">
                <h2 className="description-title">
                  <span className="title-line">Connecting</span>
                  <span className="title-highlight">Farmers, Experts & Buyers</span>
                  <span className="title-line">for a Smarter</span>
                  <span className="title-line">Agricultural Future</span>
                </h2>
                <p className="description-text">
                  Empowering Indian farmers with cutting-edge technology, market insights, and expert guidance. 
                  Join thousands of farmers who are already benefiting from our comprehensive agricultural platform.
                </p>
                <div className="description-features">
                  <div className="feature-item">
                    <i className="fas fa-chart-line"></i>
                    <span>Smart Analytics</span>
                  </div>
                  <div className="feature-item">
                    <i className="fas fa-mobile-alt"></i>
                    <span>Mobile App</span>
                  </div>
                  <div className="feature-item">
                    <i className="fas fa-cloud-sun"></i>
                    <span>Weather Updates</span>
                  </div>
                  <div className="feature-item">
                    <i className="fas fa-handshake"></i>
                    <span>Direct Connect</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section - All Details Below Image */}
      {/*  */}

      {/* Statistics Section */}
      <section className="stats-section py-5 bg-light">
        <div className="container">
          <div className="row">
            {stats.map((stat, index) => (
              <div key={index} className="col-md-3 col-sm-6 mb-4">
                <div className="card text-center h-100 shadow-sm">
                  <div className="card-body p-4">
                    <div className="stat-number text-success mb-2">{stat.number}</div>
                    <div className="stat-label text-muted">{stat.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="features-section py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">Our Key Features</h2>
            <p className="lead text-muted">Discover what makes our platform unique</p>
          </div>
          <div className="row">
            {features.map((feature, index) => (
              <div key={index} className="col-lg-4 col-md-6 mb-4">
                <div className="card h-100 shadow-sm hover-lift">
                  <div className="card-body text-center p-4">
                    <div className="feature-icon mb-3">
                      <i className={`${feature.icon} fa-3x text-primary`}></i>
                    </div>
                    <h5 className="card-title mb-3">{feature.title}</h5>
                    <p className="card-text text-muted">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stakeholders Section */}
      <section className="stakeholders-section py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">Who We Serve</h2>
            <p className="lead text-muted">Tailored solutions for every stakeholder in agriculture</p>
          </div>
          <div className="row">
            {stakeholders.map((stakeholder, index) => (
              <div key={index} className="col-lg-3 col-md-6 mb-4">
                <div className="card h-100 shadow-sm hover-lift">
                  <div className="card-body text-center p-4">
                    <div className="stakeholder-icon mb-3">
                      <i className={`${stakeholder.icon} fa-3x text-${stakeholder.color}`}></i>
                    </div>
                    <h5 className="card-title mb-3">{stakeholder.title}</h5>
                    <p className="card-text text-muted">{stakeholder.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Widgets Section - Fixed Heading Color */}
      <section className="widgets-section py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3 text-dark">Live Updates</h2>
            <p className="lead text-muted">Stay informed with real-time information</p>
          </div>
          <div className="row">
            <div className="col-lg-4 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-header bg-primary text-white">
                  <h5 className="mb-0"><i className="fas fa-cloud-sun me-2"></i>Weather Update</h5>
                </div>
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <i className="fas fa-sun fa-2x text-warning me-3"></i>
                    <div>
                      <h6 className="mb-1">Delhi, India</h6>
                      <p className="mb-0 text-muted">28°C, Partly Cloudy</p>
                    </div>
                  </div>
                  <p className="small text-muted">Good conditions for wheat cultivation</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-header bg-success text-white">
                  <h5 className="mb-0"><i className="fas fa-chart-line me-2"></i>Market Prices</h5>
                </div>
                <div className="card-body p-4">
                  <div className="market-item mb-3">
                    <div className="d-flex justify-content-between">
                      <span>Wheat</span>
                      <span className="text-success">₹2,450/quintal</span>
                    </div>
                  </div>
                  <div className="market-item mb-3">
                    <div className="d-flex justify-content-between">
                      <span>Rice</span>
                      <span className="text-success">₹1,850/quintal</span>
                    </div>
                  </div>
                  <div className="market-item">
                    <div className="d-flex justify-content-between">
                      <span>Cotton</span>
                      <span className="text-success">₹6,200/quintal</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-header bg-info text-white">
                  <h5 className="mb-0"><i className="fas fa-calendar me-2"></i>Upcoming Events</h5>
                </div>
                <div className="card-body p-4">
                  {upcomingEvents.slice(0, 3).map((event, index) => (
                    <div key={index} className="event-item mb-3">
                      <h6 className="mb-1">{event.title}</h6>
                      <p className="small text-muted mb-0">
                        <i className="fas fa-clock me-1"></i>
                        {event.date} at {event.time}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Activities Section */}
      <section className="activities-section py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-3">Recent Activities</h2>
            <p className="lead text-muted">Stay updated with the latest happenings</p>
          </div>
          <div className="row">
            {recentActivities.map((activity, index) => (
              <div key={index} className="col-lg-6 mb-4">
                <div className="card shadow-sm">
                  <div className="card-body p-4">
                    <div className="d-flex align-items-start">
                      <div className="activity-icon me-3">
                        <i className={`${activity.icon} fa-2x text-primary`}></i>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-2">{activity.title}</h6>
                        <p className="text-muted mb-2">{activity.description}</p>
                        <small className="text-muted">
                          <i className="fas fa-clock me-1"></i>
                          {activity.time}
                        </small>
                      </div>
                    </div>
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
            <p className="lead text-muted">Real stories from our community</p>
          </div>
          <div className="row">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="col-lg-4 mb-4">
                <div className="card h-100 shadow-sm">
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

      {/* Contact & Newsletter Section */}
      <section className="contact-section py-5 bg-light">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-body p-4">
                  <h4 className="mb-4">Get in Touch</h4>
                  <form>
                    <div className="mb-3">
                      <input type="text" className="form-control" placeholder="Your Name" />
                    </div>
                    <div className="mb-3">
                      <input type="email" className="form-control" placeholder="Your Email" />
                    </div>
                    <div className="mb-3">
                      <textarea className="form-control" rows="4" placeholder="Your Message"></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">
                      <i className="fas fa-paper-plane me-2"></i>
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-6 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-body p-4">
                  <h4 className="mb-4">Stay Updated</h4>
                  <p className="text-muted mb-4">Subscribe to our newsletter for the latest updates and agricultural insights.</p>
                  <form>
                    <div className="input-group mb-3">
                      <input type="email" className="form-control" placeholder="Enter your email" />
                      <button className="btn btn-success" type="submit">
                        <i className="fas fa-envelope me-2"></i>
                        Subscribe
                      </button>
                    </div>
                  </form>
                  <div className="mt-4">
                    <h6>Connect with us:</h6>
                    <div className="d-flex gap-3 mt-2">
                      <a href="#" className="text-primary"><i className="fab fa-facebook fa-2x"></i></a>
                      <a href="#" className="text-info"><i className="fab fa-twitter fa-2x"></i></a>
                      <a href="#" className="text-success"><i className="fab fa-whatsapp fa-2x"></i></a>
                      <a href="#" className="text-danger"><i className="fab fa-youtube fa-2x"></i></a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-5">
        <div className="container">
          <div className="card shadow-lg">
            <div className="card-body text-center p-5">
              <h2 className="display-5 fw-bold mb-4">Ready to Transform Your Farming?</h2>
              <p className="lead mb-4">Join thousands of farmers who are already benefiting from our platform.</p>
              <div className="d-flex justify-content-center gap-3">
                <button className="btn btn-success btn-lg" onClick={() => navigate('/login-selection')}>
                  <i className="fas fa-user-plus me-2"></i>
                  Join Now
                </button>
                <button className="btn btn-outline-primary btn-lg" onClick={() => navigate('/contact')}>
                  <i className="fas fa-phone me-2"></i>
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 