import React, { useState, useContext, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const defaultAvatars = {
  farmer: 'https://randomuser.me/api/portraits/men/32.jpg',
  agent: 'https://randomuser.me/api/portraits/men/45.jpg',
  admin: 'https://randomuser.me/api/portraits/women/65.jpg',
};

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
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
        return '/';
    }
  };

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
            {user && (
              <li className="nav-item">
                <NavLink className="nav-link btn btn-success btn-sm me-3" to={getDashboardPath()}>
                  <i className="fas fa-tachometer-alt me-1"></i>Dashboard
                </NavLink>
              </li>
            )}
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
              </>
            )}
            {user && (
              <li className="nav-item dropdown ms-3 profile-dropdown">
                <button className="btn btn-outline-primary-custom dropdown-toggle d-flex align-items-center" onClick={handleProfileClick}>
                  <img src={user.avatar || defaultAvatars[user.role]} alt="Profile" className="profile-img me-2" />
                  {user.name}
                </button>
                <ul className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
                  <li><NavLink className="dropdown-item" to="/profile" onClick={closeDropdown}>
                    <i className="fas fa-user me-2"></i>Profile
                  </NavLink></li>
                  <li><NavLink className="dropdown-item" to="/settings" onClick={closeDropdown}>
                    <i className="fas fa-cog me-2"></i>Settings
                  </NavLink></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item" onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt me-2"></i>Logout
                  </button></li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 