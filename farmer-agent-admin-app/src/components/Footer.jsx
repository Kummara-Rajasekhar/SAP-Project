import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <h5><i className="fas fa-seedling me-2"></i>AgriConnect</h5>
            <p>Empowering farmers with modern technology and expert guidance to maximize agricultural productivity and sustainable farming practices.</p>
            <div className="social-links">
              <a href="#" className="me-3"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="me-3"><i className="fab fa-twitter"></i></a>
              <a href="#" className="me-3"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" className="me-3"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
          <div className="col-md-2 mb-4">
            <h5>Services</h5>
            <ul className="list-unstyled">
              <li><a href="#">Crop Management</a></li>
              <li><a href="#">Weather Updates</a></li>
              <li><a href="#">Soil Analysis</a></li>
              <li><a href="#">Market Prices</a></li>
            </ul>
          </div>
          <div className="col-md-2 mb-4">
            <h5>Support</h5>
            <ul className="list-unstyled">
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Feedback</a></li>
            </ul>
          </div>
          <div className="col-md-2 mb-4">
            <h5>Company</h5>
            <ul className="list-unstyled">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
          <div className="col-md-2 mb-4">
            <h5>Contact</h5>
            <ul className="list-unstyled">
              <li><i className="fas fa-phone me-2"></i>+91 98765 43210</li>
              <li><i className="fas fa-envelope me-2"></i>info@agritech.com</li>
              <li><i className="fas fa-map-marker-alt me-2"></i>Hyderabad, India</li>
            </ul>
          </div>
        </div>
        <hr className="my-4" style={{borderColor: 'rgba(255,255,255,0.2)'}} />
        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="mb-0">&copy; 2024 AgriConnect. All rights reserved.</p>
          </div>
          <div className="col-md-6 text-md-end">
            <p className="mb-0">Made with <i className="fas fa-heart text-danger"></i> for farmers</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 