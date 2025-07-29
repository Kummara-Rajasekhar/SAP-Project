import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext, ToastContext } from '../App';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'admin@test.com' && password === 'password') {
      const user = { id: 'AD001', name: 'Admin User', role: 'admin', region: 'All Regions', email };
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      showToast('Login successful!', 'success');
      navigate('/admin-dashboard');
    } else {
      showToast('Invalid credentials. Please try again.', 'danger');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card p-4">
            <h2 className="mb-4 text-success">Admin Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
              </div>
              <button type="submit" className="btn btn-primary-custom w-100">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 