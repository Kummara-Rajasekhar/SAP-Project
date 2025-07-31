import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ToastContext } from '../context/ToastContext';
import 'animate.css';

const defaultAvatars = {
  farmer: 'https://randomuser.me/api/portraits/men/32.jpg',
  agent: 'https://randomuser.me/api/portraits/men/45.jpg',
  admin: 'https://randomuser.me/api/portraits/women/65.jpg',
};

export default function Profile() {
  const { user, login } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    region: user?.region || '',
    phone: user?.phone || '',
    address: user?.address || '',
    profilePic: user?.profilePic || defaultAvatars[user?.role] || '',
  });
  const [editing, setEditing] = useState(false);
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [message, setMessage] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    region: user?.region || '',
    address: user?.address || ''
  });

  // Ensure page scrolls to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!user) return (
    <div className="container py-5 text-center">
      <div className="card shadow-sm p-5">
        <i className="fas fa-user-lock fa-3x text-muted mb-3"></i>
        <h4>Please log in to view your profile</h4>
        <p className="text-muted">You need to be logged in to access your profile information.</p>
      </div>
    </div>
  );

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handlePicChange = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e2 => setForm(f => ({ ...f, profilePic: e2.target.result }));
      reader.readAsDataURL(file);
    }
  };
  const handleEdit = () => setEditing(true);
  const handleCancel = () => {
    setForm({
      name: user.name,
      email: user.email,
      region: user.region,
      phone: user.phone || '',
      address: user.address || '',
      profilePic: user.profilePic || defaultAvatars[user.role],
    });
    setEditing(false);
    setMessage('');
  };
  const handleSave = () => {
    const updatedUser = { ...user, ...form };
    login(updatedUser);
    setEditing(false);
    setShowSuccessMessage(true);
    showToast('Profile updated successfully!', 'success');
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };
  const handlePasswordChange = e => setPasswords({ ...passwords, [e.target.name]: e.target.value });
  const handlePasswordSubmit = e => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      setMessage('New passwords do not match.');
      return;
    }
    setMessage('Password change feature coming soon!');
  };

  const getRoleIcon = (role) => {
    switch(role) {
      case 'farmer': return 'fas fa-seedling';
      case 'agent': return 'fas fa-user-tie';
      case 'admin': return 'fas fa-user-shield';
      default: return 'fas fa-user';
    }
  };

  const getRoleColor = (role) => {
    switch(role) {
      case 'farmer': return 'success';
      case 'agent': return 'primary';
      case 'admin': return 'warning';
      default: return 'secondary';
    }
  };

  return (
    <div className="page-content">
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {/* Main Profile Card */}
            <div className="card shadow-lg border-0 profile-main-card animate__animated animate__fadeInDown">
              <div className="card-body p-4">
                <div className="row">
                  {/* Profile Picture - Left Side */}
                  <div className="col-lg-3 text-center">
                    <div className="profile-pic-section">
                      <div className="profile-pic-wrapper">
                        <img 
                          src={form.profilePic} 
                          alt="Profile" 
                          className="profile-pic"
                          onError={(e) => {
                            e.target.src = defaultAvatars[user.role];
                          }}
                        />
                        {editing && (
                          <div className="pic-overlay">
                            <label htmlFor="profile-pic-input" className="pic-upload-btn">
                              <i className="fas fa-camera"></i>
                            </label>
                            <input 
                              id="profile-pic-input"
                              type="file" 
                              accept="image/*" 
                              onChange={handlePicChange} 
                              className="d-none" 
                            />
                          </div>
                        )}
                      </div>
                      <div className="mt-3">
                        <span className={`badge bg-${getRoleColor(user.role)} fs-6 px-3 py-2`}>
                          <i className={`${getRoleIcon(user.role)} me-2`}></i>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Profile Details - Right Side */}
                  <div className="col-lg-9">
                    <div className="profile-details-section">
                      <div className="d-flex justify-content-between align-items-start mb-4">
                        <div>
                          <h2 className="profile-name mb-2">{form.name}</h2>
                          <p className="text-muted mb-0">User ID: {user.id}</p>
                        </div>
                        <div className="profile-actions">
                          {!editing ? (
                            <button 
                              type="button" 
                              className="btn btn-outline-primary btn-sm"
                              onClick={handleEdit}
                            >
                              <i className="fas fa-edit me-1"></i>
                              Edit
                            </button>
                          ) : (
                            <div className="d-flex gap-2">
                              <button 
                                type="button" 
                                className="btn btn-success btn-sm"
                                onClick={handleSave}
                              >
                                <i className="fas fa-save me-1"></i>
                                Save
                              </button>
                              <button 
                                type="button" 
                                className="btn btn-secondary btn-sm"
                                onClick={handleCancel}
                              >
                                <i className="fas fa-times me-1"></i>
                                Cancel
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="profile-info-grid">
                        <div className="info-item">
                          <i className="fas fa-envelope text-primary"></i>
                          <div>
                            <span className="info-label">Email</span>
                            <span className="info-value">{form.email}</span>
                          </div>
                        </div>
                        
                        <div className="info-item">
                          <i className="fas fa-map-marker-alt text-warning"></i>
                          <div>
                            <span className="info-label">Region</span>
                            <span className="info-value">{form.region || 'Not specified'}</span>
                          </div>
                        </div>
                        
                        <div className="info-item">
                          <i className="fas fa-phone text-success"></i>
                          <div>
                            <span className="info-label">Phone</span>
                            <span className="info-value">{form.phone || 'Not specified'}</span>
                          </div>
                        </div>
                        
                        <div className="info-item">
                          <i className="fas fa-home text-info"></i>
                          <div>
                            <span className="info-label">Address</span>
                            <span className="info-value">{form.address || 'Not specified'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Form */}
            <div className="profile-form animate__animated animate__fadeInUp mt-4">
              <div className="card shadow-sm">
                <div className="card-header bg-light">
                  <h5 className="mb-0">
                    <i className="fas fa-user-edit me-2 text-primary"></i>
                    Personal Information
                  </h5>
                </div>
                <div className="card-body p-4">
                  <form onSubmit={handleSave}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-bold">
                          <i className="fas fa-user me-2 text-success"></i>
                          Full Name
                        </label>
                        <input 
                          type="text" 
                          className="form-control" 
                          name="name" 
                          value={form.name} 
                          onChange={handleChange} 
                          disabled={!editing} 
                          required 
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-bold">
                          <i className="fas fa-envelope me-2 text-primary"></i>
                          Email Address
                        </label>
                        <input 
                          type="email" 
                          className="form-control" 
                          name="email" 
                          value={form.email} 
                          onChange={handleChange} 
                          disabled={!editing} 
                          required 
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-bold">
                          <i className="fas fa-map-marker-alt me-2 text-warning"></i>
                          Region
                        </label>
                        <input 
                          type="text" 
                          className="form-control" 
                          name="region" 
                          value={form.region} 
                          onChange={handleChange} 
                          disabled={!editing} 
                          required 
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label fw-bold">
                          <i className="fas fa-phone me-2 text-info"></i>
                          Phone Number
                        </label>
                        <input 
                          type="tel" 
                          className="form-control" 
                          name="phone" 
                          value={form.phone} 
                          onChange={handleChange} 
                          disabled={!editing} 
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 mb-3">
                        <label className="form-label fw-bold">
                          <i className="fas fa-home me-2 text-secondary"></i>
                          Address
                        </label>
                        <textarea 
                          className="form-control" 
                          name="address" 
                          value={form.address} 
                          onChange={handleChange} 
                          disabled={!editing} 
                          rows="3"
                        ></textarea>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Account Security */}
            <div className="account-security mt-4 animate__animated animate__fadeInUp">
              <div className="card shadow-sm">
                <div className="card-header bg-light">
                  <h5 className="mb-0">
                    <i className="fas fa-shield-alt me-2 text-warning"></i>
                    Account Security
                  </h5>
                </div>
                <div className="card-body p-4">
                  <form onSubmit={handlePasswordSubmit}>
                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <label className="form-label fw-bold">Current Password</label>
                        <input 
                          type="password" 
                          className="form-control" 
                          name="current" 
                          value={passwords.current} 
                          onChange={handlePasswordChange} 
                          placeholder="Enter current password" 
                          disabled 
                        />
                      </div>
                      <div className="col-md-4 mb-3">
                        <label className="form-label fw-bold">New Password</label>
                        <input 
                          type="password" 
                          className="form-control" 
                          name="new" 
                          value={passwords.new} 
                          onChange={handlePasswordChange} 
                          placeholder="Enter new password" 
                          disabled 
                        />
                      </div>
                      <div className="col-md-4 mb-3">
                        <label className="form-label fw-bold">Confirm Password</label>
                        <input 
                          type="password" 
                          className="form-control" 
                          name="confirm" 
                          value={passwords.confirm} 
                          onChange={handlePasswordChange} 
                          placeholder="Confirm new password" 
                          disabled 
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-outline-warning" disabled>
                      <i className="fas fa-key me-2"></i>
                      Change Password
                    </button>
                    <small className="text-muted d-block mt-2">
                      <i className="fas fa-info-circle me-1"></i>
                      Password change feature will be available soon
                    </small>
                  </form>
                </div>
              </div>
            </div>

            {/* Success Message */}
            {message && (
              <div className="alert alert-success mt-4 animate__animated animate__fadeIn">
                <i className="fas fa-check-circle me-2"></i>
                {message}
              </div>
            )}
            {showSuccessMessage && (
              <div className="alert alert-success mt-4 animate__animated animate__fadeIn">
                <i className="fas fa-check-circle me-2"></i>
                Profile updated successfully!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 