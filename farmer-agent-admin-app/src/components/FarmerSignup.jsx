import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext, ToastContext } from '../App';

export default function FarmerSignup() {
  const [form, setForm] = useState({
    name: '', age: '', gender: '', phone: '', email: '', password: '', confirmPassword: '', region: '', address: '', acres: '', cultivationStartDate: '', preferredLanguage: '', soilType: ''
  });
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    const farmerId = 'F' + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    // Mock agent assignment
    const agent = form.region === 'North Region' ? 'Sarah Agent' : 'Regional Agent';
    const user = { ...form, id: farmerId, role: 'farmer', agent };
    setUser(user); // user is the signed-up user object
    localStorage.setItem('user', JSON.stringify(user));
    showToast('Signup successful! Welcome to AgriConnect.', 'success');
    navigate('/farmer-dashboard');
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-7">
          <div className="card p-4">
            <h2 className="mb-4 text-success">Farmer Signup</h2>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Full Name</label>
                  <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} required />
                </div>
                <div className="col-md-3 mb-3">
                  <label className="form-label">Age</label>
                  <input type="number" className="form-control" name="age" value={form.age} onChange={handleChange} required />
                </div>
                <div className="col-md-3 mb-3">
                  <label className="form-label">Gender</label>
                  <select className="form-control" name="gender" value={form.gender} onChange={handleChange} required>
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Phone Number</label>
                  <input type="tel" className="form-control" name="phone" value={form.phone} onChange={handleChange} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} required />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Password</label>
                  <input type="password" className="form-control" name="password" value={form.password} onChange={handleChange} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Confirm Password</label>
                  <input type="password" className="form-control" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Region/Constituency</label>
                  <select className="form-control" name="region" value={form.region} onChange={handleChange} required>
                    <option value="">Select</option>
                    <option value="North Region">North Region</option>
                    <option value="South Region">South Region</option>
                    <option value="East Region">East Region</option>
                    <option value="West Region">West Region</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Address</label>
                  <input type="text" className="form-control" name="address" value={form.address} onChange={handleChange} required />
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">Acres of Land</label>
                  <input type="number" className="form-control" name="acres" value={form.acres} onChange={handleChange} required />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Cultivation Start Date</label>
                  <input type="date" className="form-control" name="cultivationStartDate" value={form.cultivationStartDate} onChange={handleChange} required />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Preferred Language</label>
                  <select className="form-control" name="preferredLanguage" value={form.preferredLanguage} onChange={handleChange} required>
                    <option value="">Select</option>
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Telugu">Telugu</option>
                    <option value="Tamil">Tamil</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Type of Soil</label>
                  <select className="form-control" name="soilType" value={form.soilType} onChange={handleChange} required>
                    <option value="">Select</option>
                    <option value="Clay">Clay</option>
                    <option value="Sandy">Sandy</option>
                    <option value="Loamy">Loamy</option>
                    <option value="Red">Red</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="btn btn-primary-custom w-100">Sign Up</button>
            </form>
            <div className="mt-3 text-center">
              <span>Already have an account? <a href="/farmer-login">Login</a></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 