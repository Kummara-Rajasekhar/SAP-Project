import React, { useState } from 'react';

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
        onLogin(user);
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

      onLogin(newUser);
    }
  };

  const renderSignupFields = () => (
    <>
      <div className="mb-3">
        <label className="form-label">Role</label>
        <select 
          name="role" 
          className="form-control form-control-custom"
          value={formData.role}
          onChange={handleInputChange}
        >
          <option value="farmer">Farmer</option>
          <option value="agent">Agent</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Full Name</label>
        <input
          type="text"
          name="name"
          className="form-control form-control-custom"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Age</label>
            <input
              type="number"
              name="age"
              className="form-control form-control-custom"
              value={formData.age}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <label className="form-label">Gender</label>
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
        <label className="form-label">Region/Constituency</label>
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
        <label className="form-label">Address</label>
        <textarea
          name="address"
          className="form-control form-control-custom"
          value={formData.address}
          onChange={handleInputChange}
          rows="3"
          required
        />
      </div>

      {formData.role === 'farmer' && (
        <>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Acres of Land</label>
                <input
                  type="number"
                  name="acres"
                  className="form-control form-control-custom"
                  value={formData.acres}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label className="form-label">Cultivation Start Date</label>
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
                <label className="form-label">Preferred Language</label>
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
                <label className="form-label">Soil Type</label>
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

  return (
    <div className="container-fluid" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '100vh' }}>
      <div className="row justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-lg">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <h2 className="text-primary">
                  <i className="fas fa-seedling me-2"></i>
                  {isLogin ? 'Login' : 'Sign Up'}
                </h2>
                <p className="text-muted">Farmer Agent Admin System</p>
              </div>

              <form onSubmit={handleSubmit}>
                {!isLogin && renderSignupFields()}

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control form-control-custom"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-control form-control-custom"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control form-control-custom"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {!isLogin && (
                  <div className="mb-3">
                    <label className="form-label">Confirm Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      className="form-control form-control-custom"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                )}

                <button type="submit" className="btn btn-primary-custom w-100 mb-3">
                  {isLogin ? 'Login' : 'Sign Up'}
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={() => setIsLogin(!isLogin)}
                  >
                    {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
                  </button>
                </div>

                {isLogin && (
                  <div className="mt-3 p-3 bg-light rounded">
                    <small className="text-muted">
                      <strong>Demo Credentials:</strong><br/>
                      Farmer: farmer@test.com / password<br/>
                      Agent: agent@test.com / password<br/>
                      Admin: admin@test.com / password
                    </small>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 