import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const defaultAvatars = {
  farmer: 'https://randomuser.me/api/portraits/men/32.jpg',
  agent: 'https://randomuser.me/api/portraits/men/45.jpg',
  admin: 'https://randomuser.me/api/portraits/women/65.jpg',
};

const SimpleNavbar = () => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Debug logging
  console.log('Navbar - User state:', user);
  console.log('Navbar - User exists:', !!user);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate('/');
  };

  const handleProfileClick = () => {
    console.log('Profile button clicked');
    setDropdownOpen((open) => !open);
  };

  const handleProfileLinkClick = () => {
    console.log('Profile link clicked, navigating to /profile');
    setDropdownOpen(false);
    navigate('/profile');
  };

  const closeDropdown = () => setDropdownOpen(false);

  useEffect(() => {
    if (!dropdownOpen) return;
    const handleClick = (e) => {
      if (!e.target.closest('.profile-dropdown')) setDropdownOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [dropdownOpen]);

  const getDashboardPath = () => {
    if (!user) return '/';
    switch (user.role) {
      case 'farmer':
        return '/farmer-dashboard';
      case 'agent':
        return '/agent-dashboard';
      case 'admin':
        return '/admin-dashboard';
      default:
        return '/dashboard';
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}>
      <div className="container">
        {/* Brand - Left side */}
        <NavLink className="navbar-brand fw-bold text-success" to="/" style={{ fontSize: '1.5rem' }}>
          <i className="fas fa-seedling me-2"></i>AgriConnect
        </NavLink>

        {/* Mobile Toggle Button */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Items - Right side */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link fw-semibold" to="/about" style={{ color: '#333', fontSize: '1rem' }}>
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link fw-semibold" to="/services" style={{ color: '#333', fontSize: '1rem' }}>
                Services
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link fw-semibold" to="/contact" style={{ color: '#333', fontSize: '1rem' }}>
                Contact
              </NavLink>
            </li>
          </ul>

          {/* Right Side Items - Only show when logged in */}
          {user && (
            <div className="d-flex align-items-center gap-3">
              {/* Dashboard button - Only show if user exists */}
              <NavLink 
                className="btn btn-success" 
                to={getDashboardPath()}
                style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
              >
                <i className="fas fa-tachometer-alt me-1"></i>Dashboard
              </NavLink>

              {/* User Profile Dropdown - Only show if user is logged in */}
              <div className="dropdown profile-dropdown">
                <button 
                  className="btn btn-outline-primary dropdown-toggle d-flex align-items-center" 
                  onClick={handleProfileClick}
                  style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
                >
                  <img 
                    src={user.avatar || defaultAvatars[user.role]} 
                    alt="Profile" 
                    className="rounded-circle me-2" 
                    style={{ width: '32px', height: '32px', objectFit: 'cover' }}
                  />
                  <span style={{ maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {user.name || user.email}
                  </span>
                </button>
                <ul className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`} style={{ minWidth: '200px' }}>
                  <li>
                    <button 
                      className="dropdown-item" 
                      onClick={handleProfileLinkClick}
                      style={{ cursor: 'pointer' }}
                    >
                      <i className="fas fa-user me-2"></i>Profile
                    </button>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/test-profile" onClick={closeDropdown}>
                      <i className="fas fa-vial me-2"></i>Test Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/simple-profile" onClick={closeDropdown}>
                      <i className="fas fa-user-circle me-2"></i>Simple Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/minimal-profile" onClick={closeDropdown}>
                      <i className="fas fa-user-shield me-2"></i>Minimal Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/api-test" onClick={closeDropdown}>
                      <i className="fas fa-plug me-2"></i>API Test
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/settings" onClick={closeDropdown}>
                      <i className="fas fa-cog me-2"></i>Settings
                    </NavLink>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item text-danger" onClick={handleLogout}>
                      <i className="fas fa-sign-out-alt me-2"></i>Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Login Button - Only show if user is NOT logged in */}
          {!user && (
            <div className="d-flex align-items-center">
              <NavLink 
                className="btn btn-primary" 
                to="/login-selection"
                style={{ fontSize: '0.9rem', padding: '0.5rem 1.5rem', fontWeight: 600 }}
              >
                <i className="fas fa-sign-in-alt me-1"></i>Login
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default SimpleNavbar; 