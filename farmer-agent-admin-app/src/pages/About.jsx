import React from 'react';
import 'animate.css';

export default function About() {
  return (
    <div className="page-content">
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <h1 className="text-center mb-5 animate__animated animate__fadeInDown">
              About <span className="text-success">AgriTech Solutions</span>
            </h1>
            
            <div className="card shadow-sm mb-5 animate__animated animate__fadeInUp">
              <div className="card-body p-5">
                <h3 className="text-success mb-4">Our Mission</h3>
                <p className="lead">
                  We are dedicated to revolutionizing agriculture through technology, connecting farmers with modern solutions, 
                  and creating a sustainable future for Indian agriculture.
                </p>
                <p>
                  AgriTech Solutions bridges the gap between traditional farming practices and modern technology, 
                  empowering farmers with data-driven insights, market access, and expert support.
                </p>
              </div>
            </div>

            <div className="row mb-5">
              <div className="col-md-6 mb-4">
                <div className="card h-100 shadow-sm animate__animated animate__fadeInLeft">
                  <div className="card-body text-center p-4">
                    <i className="fas fa-users fa-3x text-primary mb-3"></i>
                    <h5>Our Team</h5>
                    <p className="text-muted">
                      Experienced agricultural experts, technologists, and industry professionals 
                      working together to serve the farming community.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="card h-100 shadow-sm animate__animated animate__fadeInRight">
                  <div className="card-body text-center p-4">
                    <i className="fas fa-globe fa-3x text-success mb-3"></i>
                    <h5>Our Reach</h5>
                    <p className="text-muted">
                      Serving farmers across all regions of India with localized support 
                      and region-specific agricultural guidance.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card shadow-sm animate__animated animate__fadeInUp">
              <div className="card-body p-5">
                <h3 className="text-success mb-4">Our Values</h3>
                <div className="row">
                  <div className="col-md-4 text-center mb-4">
                    <i className="fas fa-heart fa-2x text-danger mb-3"></i>
                    <h6>Empathy</h6>
                    <p className="small text-muted">Understanding farmer needs and challenges</p>
                  </div>
                  <div className="col-md-4 text-center mb-4">
                    <i className="fas fa-lightbulb fa-2x text-warning mb-3"></i>
                    <h6>Innovation</h6>
                    <p className="small text-muted">Continuous improvement and modern solutions</p>
                  </div>
                  <div className="col-md-4 text-center mb-4">
                    <i className="fas fa-handshake fa-2x text-info mb-3"></i>
                    <h6>Trust</h6>
                    <p className="small text-muted">Building lasting relationships with farmers</p>
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