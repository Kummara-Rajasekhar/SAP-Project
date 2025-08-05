import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/profile.css';

const Profile = () => {
  const { user } = useAuth();
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  // Debug logging
  console.log('Profile Component - User:', user);
  console.log('Profile Component - User exists:', !!user);

  useEffect(() => {
    // Trigger entrance animations
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Update form data when user changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || ''
      });
    }
  }, [user]);

  const getRoleColor = () => {
    switch (user?.role) {
      case 'farmer': return 'success';
      case 'agent': return 'primary';
      case 'admin': return 'warning';
      default: return 'secondary';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveChanges = async () => {
    setIsLoading(true);
    setMessage({ type: '', text: '' });
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setMessage({ 
        type: 'success', 
        text: 'Profile updated successfully!' 
      });
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    }, 1500);
  };

  const handlePasswordChange = async () => {
    setIsLoading(true);
    setMessage({ type: '', text: '' });
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setMessage({ 
        type: 'success', 
        text: 'Password updated successfully!' 
      });
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    }, 1500);
  };

  const roleColor = getRoleColor();

  // Show loading state if user is not available
  if (!user) {
    console.log('Profile Component - No user found, showing loading state');
    return (
      <div className="profile-container d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-3"></div>
          <p className="text-white">Loading profile...</p>
          <p className="text-white-50 small">Please make sure you are logged in</p>
        </div>
      </div>
    );
  }

  console.log('Profile Component - Rendering profile for user:', user.name);

  return (
    <div className="profile-container">
      <div className="container-fluid py-4">
        {/* Header */}
        <div className={`text-center mb-4 profile-header`}>
          <h1 className="display-4 fw-bold text-white mb-2">
            Profile Dashboard
          </h1>
          <p className="lead text-white-50">
            Manage your account and preferences
          </p>
        </div>

        {/* Message Display */}
        {message.text && (
          <div className={`${message.type === 'success' ? 'success-message' : 'error-message'} mb-4`}>
            <i className={`fas fa-${message.type === 'success' ? 'check-circle' : 'exclamation-circle'} me-2`}></i>
            {message.text}
          </div>
        )}

        <div className="row">
          {/* Profile Card */}
          <div className={`col-lg-4 mb-4 profile-card`}>
            <div className="card shadow-lg border-0 glass-card">
              <div className="card-body text-center p-4">
                <div className="position-relative mb-4">
                  <div className="profile-avatar">
                    <span>
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div className="edit-avatar-btn">
                    <i className="fas fa-edit"></i>
                  </div>
                </div>

                <h3 className="fw-bold text-dark mb-2">{user?.name || 'User Name'}</h3>
                <p className="text-muted mb-3">{user?.email || 'user@example.com'}</p>
                
                <div className={`badge bg-${roleColor} fs-6 mb-4`}>
                  <i className="fas fa-circle me-2"></i>
                  {user?.role?.charAt(0)?.toUpperCase() + user?.role?.slice(1) || 'User'}
                </div>

                <div className="text-start">
                  <h5 className="fw-bold text-dark mb-3">Contact Information</h5>
                  <div className="mb-3">
                    <div className="d-flex align-items-center mb-2">
                      <i className="fas fa-phone text-muted me-2"></i>
                      <span className="text-muted">{user?.phone || 'Phone not provided'}</span>
                    </div>
                    <div className="d-flex align-items-start">
                      <i className="fas fa-map-marker-alt text-muted me-2 mt-1"></i>
                      <span className="text-muted small">{user?.address || 'Address not provided'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className={`col-lg-8 main-content-card`}>
            <div className="card shadow-lg border-0 glass-card">
              {/* Tab Navigation */}
              <div className="card-header bg-white border-bottom">
                <ul className="nav nav-tabs card-header-tabs">
                  {[
                    { id: 'personal', name: 'Personal Info', icon: 'fas fa-user' },
                    { id: 'security', name: 'Security', icon: 'fas fa-lock' },
                    { id: 'preferences', name: 'Preferences', icon: 'fas fa-cog' },
                    { id: 'activity', name: 'Activity', icon: 'fas fa-chart-line' }
                  ].map((tab) => (
                    <li className="nav-item" key={tab.id}>
                      <button
                        className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                      >
                        <i className={`${tab.icon} me-2`}></i>
                        {tab.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tab Content */}
              <div className="card-body p-4">
                <div className="tab-content">
                  {activeTab === 'personal' && (
                    <div className="animate-fade-in">
                      <h4 className="fw-bold text-dark mb-4">Personal Information</h4>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label fw-bold">Full Name</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="form-control"
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label fw-bold">Email</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="form-control"
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label fw-bold">Phone</label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="form-control"
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label fw-bold">Role</label>
                          <input
                            type="text"
                            value={user?.role || ''}
                            disabled
                            className="form-control bg-light"
                          />
                        </div>
                        <div className="col-12 mb-3">
                          <label className="form-label fw-bold">Address</label>
                          <textarea
                            rows={3}
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="text-end">
                        <button 
                          className="btn btn-primary-custom"
                          onClick={handleSaveChanges}
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <div className="loading-spinner me-2" style={{width: '16px', height: '16px', borderWidth: '2px'}}></div>
                              Saving...
                            </>
                          ) : (
                            <>
                              <i className="fas fa-save me-2"></i>Save Changes
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {activeTab === 'security' && (
                    <div className="animate-fade-in">
                      <h4 className="fw-bold text-dark mb-4">Security Settings</h4>
                      <div className="row">
                        <div className="col-md-12 mb-3">
                          <label className="form-label fw-bold">Current Password</label>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Enter current password"
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label fw-bold">New Password</label>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Enter new password"
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label className="form-label fw-bold">Confirm New Password</label>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Confirm new password"
                          />
                        </div>
                      </div>
                      <div className="text-end">
                        <button 
                          className="btn btn-primary-custom"
                          onClick={handlePasswordChange}
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <div className="loading-spinner me-2" style={{width: '16px', height: '16px', borderWidth: '2px'}}></div>
                              Updating...
                            </>
                          ) : (
                            <>
                              <i className="fas fa-key me-2"></i>Update Password
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {activeTab === 'preferences' && (
                    <div className="animate-fade-in">
                      <h4 className="fw-bold text-dark mb-4">Preferences</h4>
                      <div className="row">
                        <div className="col-12 mb-3">
                          <div className="d-flex justify-content-between align-items-center p-3 border rounded preference-item">
                            <div>
                              <h6 className="fw-bold mb-1">Email Notifications</h6>
                              <p className="text-muted mb-0 small">Receive email updates about your account</p>
                            </div>
                            <div className="form-check form-switch">
                              <input className="form-check-input" type="checkbox" id="emailNotif" defaultChecked />
                            </div>
                          </div>
                        </div>
                        <div className="col-12 mb-3">
                          <div className="d-flex justify-content-between align-items-center p-3 border rounded preference-item">
                            <div>
                              <h6 className="fw-bold mb-1">SMS Notifications</h6>
                              <p className="text-muted mb-0 small">Receive SMS updates about your account</p>
                            </div>
                            <div className="form-check form-switch">
                              <input className="form-check-input" type="checkbox" id="smsNotif" />
                            </div>
                          </div>
                        </div>
                        <div className="col-12 mb-3">
                          <div className="d-flex justify-content-between align-items-center p-3 border rounded preference-item">
                            <div>
                              <h6 className="fw-bold mb-1">Push Notifications</h6>
                              <p className="text-muted mb-0 small">Receive push notifications on your device</p>
                            </div>
                            <div className="form-check form-switch">
                              <input className="form-check-input" type="checkbox" id="pushNotif" defaultChecked />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-end">
                        <button className="btn btn-primary-custom">
                          <i className="fas fa-save me-2"></i>Save Preferences
                        </button>
                      </div>
                    </div>
                  )}

                  {activeTab === 'activity' && (
                    <div className="animate-fade-in">
                      <h4 className="fw-bold text-dark mb-4">Recent Activity</h4>
                      <div className="space-y-3">
                        {[
                          { action: 'Logged in', time: '2 minutes ago', icon: 'fas fa-sign-in-alt', color: 'text-success' },
                          { action: 'Updated profile', time: '1 hour ago', icon: 'fas fa-edit', color: 'text-primary' },
                          { action: 'Changed password', time: '3 days ago', icon: 'fas fa-key', color: 'text-warning' },
                          { action: 'Registered account', time: '1 week ago', icon: 'fas fa-user-plus', color: 'text-info' }
                        ].map((activity, index) => (
                          <div key={index} className="d-flex align-items-center p-3 border rounded mb-2 activity-item">
                            <i className={`${activity.icon} ${activity.color} me-3 fs-5`}></i>
                            <div className="flex-grow-1">
                              <h6 className="fw-bold mb-1">{activity.action}</h6>
                              <small className="text-muted">{activity.time}</small>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 