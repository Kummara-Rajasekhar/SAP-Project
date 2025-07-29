import React, { useContext } from 'react';
import 'animate.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

const achievements = [
  { icon: 'fas fa-users', title: '10,000+ Farmers Empowered', desc: 'Across 4 regions of India' },
  { icon: 'fas fa-leaf', title: 'Eco-Friendly Practices', desc: 'Promoting sustainable agriculture' },
  { icon: 'fas fa-robot', title: 'AI Crop Prediction', desc: 'Smart tools for better yield' },
  { icon: 'fas fa-hand-holding-usd', title: 'Direct Payments', desc: 'Transparent and fast settlements' },
];

const testimonials = [
  {
    quote: 'AgriConnect helped me increase my yield and get better prices for my crops! Highly recommended.',
    name: 'Ramesh, Farmer (Andhra Pradesh)',
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=128&q=80',
  },
  {
    quote: 'The weather alerts and agent support are a game changer for us farmers.',
    name: 'Sita, Farmer (Telangana)',
    img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=128&q=80',
  },
];

export default function Home() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="page-content">
      <div className="hero-section text-center py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-7">
              <h1 className="hero-title animate__animated animate__fadeInUp">
                Welcome to <span className="text-success">AgriTech Solutions</span>
              </h1>
              <p className="hero-quote animate__animated animate__fadeInUp animate__delay-1s">
                Empowering farmers with modern technology and comprehensive support for sustainable agriculture.
              </p>
              {user ? (
                <div className="animate__animated animate__fadeInUp animate__delay-2s">
                  <h4 className="text-success mb-3">Welcome back, {user.name}!</h4>
                  <div className="row">
                    <div className="col-md-5 text-center">
                      <img src={user.profilePic || (user.role === 'farmer' ? 'https://randomuser.me/api/portraits/men/32.jpg' : user.role === 'agent' ? 'https://randomuser.me/api/portraits/men/45.jpg' : 'https://randomuser.me/api/portraits/women/65.jpg')} alt="Profile" className="rounded-circle shadow-lg" style={{width: 120, height: 120, objectFit: 'cover', border: '4px solid #4caf50'}} />
                    </div>
                    <div className="col-md-7 text-start">
                      <h5 className="text-dark">Role: {user.role.charAt(0).toUpperCase() + user.role.slice(1)}</h5>
                      <p className="text-muted">Region: {user.region}</p>
                      <p className="text-muted">Email: {user.email}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-4 animate__animated animate__fadeInUp animate__delay-2s">
                  <a href="/farmer-signup" className="btn btn-primary-custom me-3">Get Started</a>
                  <a href="/about" className="btn btn-outline-success">Learn More</a>
                </div>
              )}
            </div>
            <div className="col-md-5 text-center">
              <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" alt="Agriculture" className="hero-img animate__animated animate__fadeInRight" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm animate__animated animate__fadeInUp">
              <div className="card-body text-center">
                <i className="fas fa-seedling fa-3x text-success mb-3"></i>
                <h5 className="card-title">Smart Farming</h5>
                <p className="card-text">Advanced agricultural techniques and technology for better crop yields.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm animate__animated animate__fadeInUp animate__delay-1s">
              <div className="card-body text-center">
                <i className="fas fa-chart-line fa-3x text-primary mb-3"></i>
                <h5 className="card-title">Market Analytics</h5>
                <p className="card-text">Real-time market data and price predictions for better decision making.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm animate__animated animate__fadeInUp animate__delay-2s">
              <div className="card-body text-center">
                <i className="fas fa-users fa-3x text-warning mb-3"></i>
                <h5 className="card-title">Expert Support</h5>
                <p className="card-text">Direct access to agricultural experts and technical support.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 