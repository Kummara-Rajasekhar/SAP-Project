import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Login from './components/Login';
import Profile from './pages/Profile';
import LoginSelection from './pages/LoginSelection';
import JoinUs from './pages/JoinUs';
import FarmerDashboard from './components/FarmerDashboard';
import AgentDashboard from './components/AgentDashboard';
import AdminDashboard from './components/AdminDashboard';
import FarmerLogin from './components/FarmerLogin';
import FarmerSignup from './components/FarmerSignup';
import AgentLogin from './components/AgentLogin';
import AgentSignup from './components/AgentSignup';
import AdminLogin from './components/AdminLogin';

export const AuthContext = createContext();
export const ToastContext = createContext();

const defaultAvatars = {
  farmer: 'https://randomuser.me/api/portraits/men/32.jpg',
  agent: 'https://randomuser.me/api/portraits/men/45.jpg',
  admin: 'https://randomuser.me/api/portraits/women/65.jpg',
};

function Toast({ toast, setToast }) {
  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => setToast(t => ({ ...t, visible: false })), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.visible, setToast]);
  if (!toast.visible) return null;
  return (
    <div className={`toast align-items-center text-bg-${toast.type || 'info'} show position-fixed top-0 end-0 m-4`} role="alert" aria-live="assertive" aria-atomic="true" style={{zIndex: 2000, minWidth: 280}}>
      <div className="d-flex">
        <div className="toast-body">{toast.message}</div>
        <button type="button" className="btn-close btn-close-white me-2 m-auto" aria-label="Close" onClick={() => setToast(t => ({ ...t, visible: false }))}></button>
      </div>
    </div>
  );
}

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const handleProfileClick = () => setDropdownOpen((open) => !open);
  const closeDropdown = () => setDropdownOpen(false);

  useEffect(() => {
    if (!dropdownOpen) return;
    const handleClick = (e) => {
      if (!e.target.closest('.profile-dropdown')) setDropdownOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [dropdownOpen]);

    return (
    <nav className="navbar navbar-expand-lg navbar-custom">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          <i className="fas fa-seedling me-2"></i>AgriConnect
        </NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center w-100 justify-content-end">
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/services">Services</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">Contact</NavLink>
            </li>
            {!user && (
              <>
                <li className="nav-item dropdown ms-3">
                  <a className="nav-link dropdown-toggle btn btn-primary-custom px-4 py-2" href="#" id="loginDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{fontWeight: 600, fontSize: '1rem'}}>
                    Login
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="loginDropdown">
                    <li><NavLink className="dropdown-item" to="/farmer-login">Farmer Login</NavLink></li>
                    <li><NavLink className="dropdown-item" to="/agent-login">Agent Login</NavLink></li>
                    <li><NavLink className="dropdown-item" to="/admin-login">Admin Login</NavLink></li>
                  </ul>
                </li>
                <li className="nav-item dropdown ms-2">
                  <a className="nav-link dropdown-toggle btn btn-outline-success px-4 py-2" href="#" id="signupDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{fontWeight: 600, fontSize: '1rem'}}>
                    Signup
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="signupDropdown">
                    <li><NavLink className="dropdown-item" to="/farmer-signup">Farmer Signup</NavLink></li>
                    <li><NavLink className="dropdown-item" to="/agent-signup">Agent Signup</NavLink></li>
                  </ul>
                </li>
              </>
            )}
            {user && (
              <>
                <li className="nav-item mx-2 profile-dropdown position-relative">
                  <div className="d-flex align-items-center" style={{cursor: 'pointer'}} onClick={handleProfileClick}>
                    <img
                      src={user.profilePic || defaultAvatars[user.role]}
                      alt="Profile"
                      className="rounded-circle me-2"
                      style={{width: 38, height: 38, objectFit: 'cover', border: '2px solid #4caf50'}}
                    />
                    <span className="fw-bold text-success" style={{fontSize: '1rem'}}>{user.name}</span>
                    <span className="badge bg-success text-light ms-2" style={{fontSize: '0.8em'}}>{user.role}</span>
                    <i className="fas fa-chevron-down ms-2 text-muted"></i>
                  </div>
                  {dropdownOpen && (
                    <div className="dropdown-menu show mt-2" style={{right: 0, left: 'auto', minWidth: 180, boxShadow: '0 4px 16px rgba(0,0,0,0.08)'}}>
                      <button className="dropdown-item" onClick={() => {closeDropdown(); navigate('/profile');}}>
                        <i className="fas fa-user me-2"></i>My Profile
                      </button>
                      <button className="dropdown-item" onClick={() => {closeDropdown(); navigate(`/${user.role}-dashboard`);}}>
                        <i className="fas fa-tachometer-alt me-2"></i>Dashboard
                      </button>
                      <button className="dropdown-item" onClick={() => {closeDropdown(); alert('Settings coming soon!')}}>
                        <i className="fas fa-cog me-2"></i>Settings
                      </button>
                      <div className="dropdown-divider"></div>
                      <button className="dropdown-item text-danger" onClick={() => {closeDropdown(); handleLogout();}}>
                        <i className="fas fa-sign-out-alt me-2"></i>Logout
                      </button>
                    </div>
                  )}
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

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

function RequireAuth({ children, role }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  if (!user) {
    navigate(`/${role}-login`);
    return null;
  }
  if (role && user.role !== role) {
    navigate('/');
    return null;
  }
  return children;
}

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [toast, setToast] = useState({ visible: false, message: '', type: 'info' });
  const showToast = (message, type = 'info') => setToast({ visible: true, message, type });

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser && !user) setUser(JSON.parse(savedUser));
    if (!savedUser && user) setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <ToastContext.Provider value={{ showToast }}>
        <Router>
          <div className="app-container">
            <Navbar />
            <Toast toast={toast} setToast={setToast} />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/join-us" element={<JoinUs />} />
                <Route path="/login-selection" element={<LoginSelection />} />
                <Route path="/farmer-login" element={<FarmerLogin />} />
                <Route path="/farmer-signup" element={<FarmerSignup />} />
                <Route path="/agent-login" element={<AgentLogin />} />
                <Route path="/agent-signup" element={<AgentSignup />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/farmer-dashboard" element={
                  <RequireAuth role="farmer">
                    <FarmerDashboard user={user} onLogout={() => { localStorage.removeItem('user'); setUser(null); showToast('Logged out successfully!'); }} />
                  </RequireAuth>
                } />
                <Route path="/agent-dashboard" element={
                  <RequireAuth role="agent">
                    <AgentDashboard user={user} onLogout={() => { localStorage.removeItem('user'); setUser(null); showToast('Logged out successfully!'); }} />
                  </RequireAuth>
                } />
                <Route path="/admin-dashboard" element={
                  <RequireAuth role="admin">
                    <AdminDashboard user={user} onLogout={() => { localStorage.removeItem('user'); setUser(null); showToast('Logged out successfully!'); }} />
                  </RequireAuth>
                } />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </ToastContext.Provider>
    </AuthContext.Provider>
  );
}

export default App; 