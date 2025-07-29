import React, { useState } from 'react';
import 'animate.css';

export default function Contact() {
  return (
    <div className="page-content">
      <div className="container py-5">
        <h1 className="text-center mb-5 animate__animated animate__fadeInDown">
          Contact <span className="text-success">Us</span>
        </h1>
        
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="card shadow-sm h-100 animate__animated animate__fadeInLeft">
                  <div className="card-body p-4">
                    <h4 className="text-success mb-4">Get in Touch</h4>
                    <div className="mb-3">
                      <i className="fas fa-map-marker-alt text-primary me-3"></i>
                      <span>123 AgriTech Park, Hyderabad, Telangana 500001</span>
                    </div>
                    <div className="mb-3">
                      <i className="fas fa-phone text-primary me-3"></i>
                      <span>+91 98765 43210</span>
                    </div>
                    <div className="mb-3">
                      <i className="fas fa-envelope text-primary me-3"></i>
                      <span>info@agritech.com</span>
                    </div>
                    <div className="mb-3">
                      <i className="fas fa-clock text-primary me-3"></i>
                      <span>Mon - Fri: 9:00 AM - 6:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-md-6 mb-4">
                <div className="card shadow-sm h-100 animate__animated animate__fadeInRight">
                  <div className="card-body p-4">
                    <h4 className="text-success mb-4">Quick Contact</h4>
                    <form>
                      <div className="mb-3">
                        <input type="text" className="form-control" placeholder="Your Name" />
                      </div>
                      <div className="mb-3">
                        <input type="email" className="form-control" placeholder="Your Email" />
                      </div>
                      <div className="mb-3">
                        <input type="text" className="form-control" placeholder="Subject" />
                      </div>
                      <div className="mb-3">
                        <textarea className="form-control" rows="4" placeholder="Your Message"></textarea>
                      </div>
                      <button type="submit" className="btn btn-primary-custom w-100">Send Message</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="row mt-5">
              <div className="col-12">
                <div className="card shadow-sm animate__animated animate__fadeInUp">
                  <div className="card-body p-4">
                    <h4 className="text-success mb-4">Regional Offices</h4>
                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <h6 className="text-primary">North Region</h6>
                        <p className="small text-muted">Delhi, Punjab, Haryana</p>
                        <p className="small">Phone: +91 98765 43211</p>
                      </div>
                      <div className="col-md-4 mb-3">
                        <h6 className="text-primary">South Region</h6>
                        <p className="small text-muted">Karnataka, Tamil Nadu, Kerala</p>
                        <p className="small">Phone: +91 98765 43212</p>
                      </div>
                      <div className="col-md-4 mb-3">
                        <h6 className="text-primary">East Region</h6>
                        <p className="small text-muted">West Bengal, Bihar, Odisha</p>
                        <p className="small">Phone: +91 98765 43213</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-5 animate__animated animate__fadeInUp">
              <h4 className="text-success mb-4">Follow Us</h4>
              <div className="d-flex justify-content-center gap-3">
                <a href="#" className="btn btn-outline-primary"><i className="fab fa-facebook"></i></a>
                <a href="#" className="btn btn-outline-info"><i className="fab fa-twitter"></i></a>
                <a href="#" className="btn btn-outline-danger"><i className="fab fa-instagram"></i></a>
                <a href="#" className="btn btn-outline-primary"><i className="fab fa-linkedin"></i></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 