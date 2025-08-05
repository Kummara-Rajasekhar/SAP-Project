import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/auth.css';

const AdminRegister = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    department: '',
    role: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger entrance animations
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        address: formData.address,
        role: 'admin'
      };

      await register(userData);
      navigate('/');
    } catch (error) {
      setError(error.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-form-container bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200">
      {/* Animated Background Elements */}
      <div className="login-form-bg">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-20 left-20 w-40 h-40 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="login-form-card">
        <div className={`form-header ${isLoaded ? 'animate-fade-in-down' : ''}`}>
          <div className="form-icon bg-gradient-to-br from-purple-400 to-purple-600 animate-float">
            <span className="text-2xl">⚙️</span>
          </div>
          <h2 className="form-title animate-gradient">
            Admin Registration
          </h2>
          <p className="form-subtitle animate-fade-in-up">
            Join our system administration team
          </p>
        </div>
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="error-message">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="space-y-6">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                pattern="[0-9]{10}"
                maxLength="10"
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your phone number (10 digits)"
              />
            </div>

            <div className="form-group">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <textarea
                id="address"
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                rows={3}
                className="form-input form-textarea"
                placeholder="Enter your address"
              />
            </div>

            <div className="form-group">
              <label htmlFor="department" className="form-label">
                Department
              </label>
              <input
                id="department"
                name="department"
                type="text"
                required
                value={formData.department}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., IT, Operations, Finance"
              />
            </div>

            <div className="form-group">
              <label htmlFor="adminRole" className="form-label">
                Admin Role
              </label>
              <input
                id="adminRole"
                name="adminRole"
                type="text"
                required
                value={formData.adminRole}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., System Admin, Super Admin"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your password"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-input"
                placeholder="Confirm your password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="form-button bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="loading-spinner mr-3"></div>
                  Registering...
                </div>
              ) : (
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Register as Admin
                </div>
              )}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/admin-login" className="form-link">
                Sign in here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminRegister; 