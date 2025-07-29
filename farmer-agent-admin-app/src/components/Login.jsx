import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'farmer',
    region: '',
    name: '',
    age: '',
    gender: '',
    address: '',
    acres: '',
    cultivationStartDate: '',
    preferredLanguage: '',
    soilType: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isLogin) {
      const mockUsers = {
        'farmer@test.com': { id: 'F001', name: 'John Farmer', role: 'farmer', region: 'North Region' },
        'agent@test.com': { id: 'A001', name: 'Sarah Agent', role: 'agent', region: 'North Region' },
        'admin@test.com': { id: 'AD001', name: 'Admin User', role: 'admin', region: 'All Regions' }
      };

      const user = mockUsers[formData.email];
      if (user && formData.password === 'password') {
        localStorage.setItem('user', JSON.stringify(user));
        if (onLogin) onLogin(user);
        navigate(`/${user.role}-dashboard`);
      } else {
        alert('Invalid credentials. Use: farmer@test.com, agent@test.com, or admin@test.com with password: password');
      }
    } else {
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }

      const newUser = {
        id: `F${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
        name: formData.name,
        role: formData.role,
        region: formData.region,
        email: formData.email,
        phone: formData.phone,
        age: formData.age,
        gender: formData.gender,
        address: formData.address,
        acres: formData.acres,
        cultivationStartDate: formData.cultivationStartDate,
        preferredLanguage: formData.preferredLanguage,
        soilType: formData.soilType
      };

      localStorage.setItem('user', JSON.stringify(newUser));
      if (onLogin) onLogin(newUser);
      navigate(`/${newUser.role}-dashboard`);
    }
  };

  const renderSignupFields = () => (
    <>
      <div className="mb-3">
        <label className="form-label fw-bold text-primary">Role</label>
        <select 
          name="role" 
          className="form-control form-control-custom"
          value={formData.role}
          onChange={handleInputChange}
        >
          <option value="farmer">🌾 Farmer</option>
          <option value="agent">👨‍🌾 Agent</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold text-primary">Full Name</label>
        <input
          type="text"
          name="name"
          className="form-control form-control-custom"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Enter your full name"
          required
        />
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label fw-bold text-primary">Age</label>
            <input
              type="number"
              name="age"
              className="form-control form-control-custom"
              value={formData.age}
              onChange={handleInputChange}
              placeholder="Enter your age"
              required
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label fw-bold text-primary">Gender</label>
            <select 
              name="gender" 
              className="form-control form-control-custom"
              value={formData.gender}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold text-primary">Region/Constituency</label>
        <select 
          name="region" 
          className="form-control form-control-custom"
          value={formData.region}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Region</option>
          <option value="North Region">North Region</option>
          <option value="South Region">South Region</option>
          <option value="East Region">East Region</option>
          <option value="West Region">West Region</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold text-primary">Address</label>
        <textarea
          name="address"
          className="form-control form-control-custom"
          value={formData.address}
          onChange={handleInputChange}
          rows="3"
          placeholder="Enter your complete address"
          required
        />
      </div>

      {formData.role === 'farmer' && (
        <>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label fw-bold text-primary">Acres of Land</label>
                <input
                  type="number"
                  name="acres"
                  className="form-control form-control-custom"
                  value={formData.acres}
                  onChange={handleInputChange}
                  placeholder="Enter land area in acres"
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label fw-bold text-primary">Cultivation Start Date</label>
                <input
                  type="date"
                  name="cultivationStartDate"
                  className="form-control form-control-custom"
                  value={formData.cultivationStartDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label fw-bold text-primary">Preferred Language</label>
                <select 
                  name="preferredLanguage" 
                  className="form-control form-control-custom"
                  value={formData.preferredLanguage}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Language</option>
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Telugu">Telugu</option>
                  <option value="Tamil">Tamil</option>
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label fw-bold text-primary">Soil Type</label>
                <select 
                  name="soilType" 
                  className="form-control form-control-custom"
                  value={formData.soilType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Soil Type</option>
                  <option value="Clay">Clay</option>
                  <option value="Sandy">Sandy</option>
                  <option value="Loamy">Loamy</option>
                  <option value="Red">Red</option>
                </select>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );

  const renderWeatherWidget = () => (
    <div className="weather-widget glass-effect">
      <div className="d-flex align-items-center">
        <i className="fas fa-cloud-sun fa-2x me-3"></i>
        <div>
          <h6 className="mb-1">Today's Weather</h6>
          <p className="mb-0">28°C, Partly Cloudy</p>
          <small>Perfect for crop growth</small>
        </div>
      </div>
    </div>
  );

  const renderCropTips = () => (
    <div className="crop-prediction glass-effect">
      <div className="d-flex align-items-center">
        <i className="fas fa-seedling fa-2x me-3"></i>
        <div>
          <h6 className="mb-1">Crop Tip of the Day</h6>
          <p className="mb-0">Rice prices expected to increase by 15% next month</p>
          <small>Consider early harvesting</small>
        </div>
      </div>
    </div>
  );

  const renderPesticideAlert = () => (
    <div className="pesticide-alert glass-effect">
      <div className="d-flex align-items-center">
        <i className="fas fa-bug fa-2x me-3"></i>
        <div>
          <h6 className="mb-1">Pesticide Alert</h6>
          <p className="mb-0">Apply neem-based pesticide to prevent pest infestation</p>
          <small>Recommended for current season</small>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container-fluid animated-bg" style={{ minHeight: '100vh' }}>
      <div className="row justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="col-lg-10">
          <div className="row">
            <div className="col-md-6">
              <div className="dashboard-card glass-effect" style={{ borderRadius: '24px' }}>
                <div className="text-center mb-4">
                  <h2 className="text-primary fw-bold">
                    <i className="fas fa-seedling me-2"></i>
                    {isLogin ? 'Welcome Back' : 'Join Agri Connect'}
                  </h2>
                  <p className="text-secondary">Farmer Agent Admin System</p>
                </div>

                <form onSubmit={handleSubmit}>
                  {!isLogin && renderSignupFields()}

                  <div className="mb-3">
                    <label className="form-label fw-bold text-primary">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control form-control-custom"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold text-primary">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      className="form-control form-control-custom"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold text-primary">Password</label>
                    <input
                      type="password"
                      name="password"
                      className="form-control form-control-custom"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      required
                    />
                  </div>

                  {!isLogin && (
                    <div className="mb-3">
                      <label className="form-label fw-bold text-primary">Confirm Password</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        className="form-control form-control-custom"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        placeholder="Confirm your password"
                        required
                      />
                    </div>
                  )}

                  <button type="submit" className="btn btn-primary-custom w-100 mb-3">
                    <i className={`fas fa-${isLogin ? 'sign-in-alt' : 'user-plus'} me-2`}></i>
                    {isLogin ? 'Login' : 'Sign Up'}
                  </button>

                  <div className="text-center">
                    <button
                      type="button"
                      className="btn btn-link text-decoration-none text-secondary"
                      onClick={() => setIsLogin(!isLogin)}
                    >
                      {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
                    </button>
                  </div>

                  {isLogin && (
                    <div className="mt-4 p-3 bg-card rounded" style={{ border: '1px solid var(--border-color)' }}>
                      <small className="text-muted">
                        <strong>Demo Credentials:</strong><br/>
                        🌾 Farmer: farmer@test.com / password<br/>
                        👨‍🌾 Agent: agent@test.com / password<br/>
                        👑 Admin: admin@test.com / password
                      </small>
                    </div>
                  )}
                </form>
              </div>
            </div>

            <div className="col-md-6">
              <div className="ps-md-4">
                <h3 className="text-primary fw-bold mb-4">
                  <i className="fas fa-leaf me-2"></i>
                  Agri Connect
                </h3>
                <p className="text-secondary mb-4">
                  Connect with farmers, agents, and agricultural experts. 
                  Get real-time insights, weather updates, and crop recommendations.
                </p>
                
                {renderWeatherWidget()}
                {renderCropTips()}
                {renderPesticideAlert()}

                <div className="mt-4">
                  <h6 className="text-primary fw-bold mb-3">Why Choose Agri Connect?</h6>
                  <div className="row">
                    <div className="col-6 mb-3">
                      <div className="text-center text-secondary">
                        <i className="fas fa-chart-line fa-2x mb-2 text-primary"></i>
                        <p className="mb-0 small">Smart Analytics</p>
                      </div>
                    </div>
                    <div className="col-6 mb-3">
                      <div className="text-center text-secondary">
                        <i className="fas fa-cloud-sun fa-2x mb-2 text-info"></i>
                        <p className="mb-0 small">Weather Alerts</p>
                      </div>
                    </div>
                    <div className="col-6 mb-3">
                      <div className="text-center text-secondary">
                        <i className="fas fa-seedling fa-2x mb-2 text-success"></i>
                        <p className="mb-0 small">Crop Tips</p>
                      </div>
                    </div>
                    <div className="col-6 mb-3">
                      <div className="text-center text-secondary">
                        <i className="fas fa-users fa-2x mb-2 text-warning"></i>
                        <p className="mb-0 small">Expert Support</p>
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
  );
};

export default Login; 