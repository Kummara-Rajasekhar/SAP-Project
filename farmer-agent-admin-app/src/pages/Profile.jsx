import React, { useContext, useState } from 'react';
import { AuthContext, ToastContext } from '../App';

const defaultAvatars = {
  farmer: 'https://randomuser.me/api/portraits/men/32.jpg',
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
    profilePic: user?.profilePic || defaultAvatars[user?.role] || '',
  });
  const [editing, setEditing] = useState(false);
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [message, setMessage] = useState('');

  if (!user) return <div className="container py-5 text-center">Please log in to view your profile.</div>;

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

  return (
    <div className="container py-5 animate__animated animate__fadeIn">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card p-4 shadow">
            <div className="d-flex align-items-center mb-4">
              <div className="me-4">
                <img src={form.profilePic} alt="Profile" className="rounded-circle shadow" style={{width: 96, height: 96, objectFit: 'cover', border: '3px solid #4caf50'}} />
                {editing && (
                  <div className="mt-2">
                    <input type="file" accept="image/*" onChange={handlePicChange} className="form-control form-control-sm" />
                  </div>
                )}
              </div>
              <div>
                <h3 className="fw-bold mb-1">{user.role.charAt(0).toUpperCase() + user.role.slice(1)} Profile</h3>
                <div className="text-muted">ID: {user.id}</div>
                <span className="badge bg-success mt-2">{user.role}</span>
              </div>
            </div>
            <form onSubmit={handleSave}>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Full Name</label>
                  <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} disabled={!editing} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} disabled={!editing} required />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Region</label>
                  <input type="text" className="form-control" name="region" value={form.region} onChange={handleChange} disabled={!editing} required />
                </div>
                <div className="col-md-6 d-flex align-items-end">
                  {!editing ? (
                    <button type="button" className="btn btn-outline-primary w-100" onClick={handleEdit}>Edit Profile</button>
                  ) : (
                    <div className="d-flex w-100 gap-2">
                      <button type="submit" className="btn btn-success w-50">Save</button>
                      <button type="button" className="btn btn-secondary w-50" onClick={handleCancel}>Cancel</button>
                    </div>
                  )}
                </div>
              </div>
            </form>
            <hr />
            <form onSubmit={handlePasswordSubmit} className="mt-3">
              <h5 className="fw-bold mb-3">Change Password</h5>
              <div className="row mb-2">
                <div className="col-md-4">
                  <input type="password" className="form-control" name="current" value={passwords.current} onChange={handlePasswordChange} placeholder="Current Password" disabled />
                </div>
                <div className="col-md-4">
                  <input type="password" className="form-control" name="new" value={passwords.new} onChange={handlePasswordChange} placeholder="New Password" disabled />
                </div>
                <div className="col-md-4">
                  <input type="password" className="form-control" name="confirm" value={passwords.confirm} onChange={handlePasswordChange} placeholder="Confirm New Password" disabled />
                </div>
              </div>
              <button type="submit" className="btn btn-outline-success mt-2" disabled>Change Password</button>
            </form>
            {message && <div className="alert alert-info mt-3">{message}</div>}
          </div>
        </div>
      </div>
    </div>
  );
} 