import React, { useContext, useState } from 'react';
import { AuthContext, ToastContext } from '../App';
import 'animate.css';

const defaultAvatars = {
  farmer: 'https://c8.alamy.com/comp/KXDCJC/1-indian-rural-farmer-old-man-holding-shovel-working-farm-KXDCJC.jpg',
  agent: 'https://randomuser.me/api/portraits/men/45.jpg',
  admin: 'https://randomuser.me/api/portraits/women/65.jpg',
};

export default function Profile() {
  const { user, setUser } = useContext(AuthContext);
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
  const handleSave = e => {
    e.preventDefault();
    const updatedUser = { ...user, ...form };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setEditing(false);
    setMessage('Profile updated successfully!');
    showToast('Profile updated successfully!', 'success');
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
      case 'farmer': return 'fas fa-user-farmer';
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
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {/* Profile Header */}
            <div className="profile-header mb-5 animate__animated animate__fadeInDown">
              <div className="card shadow-lg border-0">
                <div className="card-body p-5">
                  <div className="row align-items-center">
                    <div className="col-lg-4 text-center">
                      <div className="profile-avatar-wrapper mb-4">
                        <div className="profile-avatar">
                          <img 
                            src={form.profilePic} 
                            alt="Profile" 
                            className="profile-image"
                            onError={(e) => {
                              e.target.src = defaultAvatars[user.role];
                            }}
                          />
                          {editing && (
                            <div className="avatar-overlay">
                              <label htmlFor="profile-pic-input" className="avatar-upload-btn">
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
                      </div>
                    </div>
                    <div className="col-lg-8">
                      <div className="profile-info">
                        <div className="d-flex align-items-center mb-3">
                          <h2 className="mb-0 me-3">{form.name}</h2>
                          <span className={`badge bg-${getRoleColor(user.role)} fs-6`}>
                            <i className={`${getRoleIcon(user.role)} me-2`}></i>
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </span>
                        </div>
                        <p className="text-muted mb-3">
                          <i className="fas fa-envelope me-2"></i>
                          {form.email}
                        </p>
                        <p className="text-muted mb-3">
                          <i className="fas fa-map-marker-alt me-2"></i>
                          {form.region || 'Region not specified'}
                        </p>
                        <p className="text-muted mb-4">
                          <i className="fas fa-id-card me-2"></i>
                          User ID: {user.id}
                        </p>
                        {!editing ? (
                          <button 
                            type="button" 
                            className="btn btn-outline-primary btn-lg"
                            onClick={handleEdit}
                          >
                            <i className="fas fa-edit me-2"></i>
                            Edit Profile
                          </button>
                        ) : (
                          <div className="d-flex gap-2">
                            <button 
                              type="button" 
                              className="btn btn-success btn-lg"
                              onClick={handleSave}
                            >
                              <i className="fas fa-save me-2"></i>
                              Save Changes
                            </button>
                            <button 
                              type="button" 
                              className="btn btn-secondary btn-lg"
                              onClick={handleCancel}
                            >
                              <i className="fas fa-times me-2"></i>
                              Cancel
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Form */}
            <div className="profile-form animate__animated animate__fadeInUp">
              <div className="card shadow-sm">
                <div className="card-header bg-light">
                  <h4 className="mb-0">
                    <i className="fas fa-user-edit me-2 text-primary"></i>
                    Personal Information
                  </h4>
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
                          className="form-control form-control-lg" 
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
                          className="form-control form-control-lg" 
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
                          className="form-control form-control-lg" 
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
                          className="form-control form-control-lg" 
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
                          className="form-control form-control-lg" 
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
                  <h4 className="mb-0">
                    <i className="fas fa-shield-alt me-2 text-warning"></i>
                    Account Security
                  </h4>
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
          </div>
        </div>
      </div>
    </div>
  );
} 