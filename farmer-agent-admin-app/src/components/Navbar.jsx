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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setDropdownOpen(false);
  };

  const handleProfileClick = () => setDropdownOpen((open) => !open);
  const closeDropdown = () => setDropdownOpen(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

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
    <nav className="bg-white shadow-lg border-b border-gray-200 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <NavLink className="flex items-center space-x-2 text-2xl font-bold text-green-600 hover:text-green-700 transition-colors" to="/">
              <i className="fas fa-seedling text-3xl"></i>
              <span>AgriConnect</span>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <NavLink 
                className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors" 
                to="/about"
              >
                About
              </NavLink>
              <NavLink 
                className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors" 
                to="/services"
              >
                Services
              </NavLink>
              <NavLink 
                className="text-gray-700 hover:text-green-600 px-3 py-2 rounded-md text-sm font-medium transition-colors" 
                to="/contact"
              >
                Contact
              </NavLink>
              
              {user && (
                <NavLink 
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2" 
                  to={getDashboardPath()}
                >
                  <i className="fas fa-tachometer-alt"></i>
                  <span>Dashboard</span>
                </NavLink>
              )}
            </div>
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:block">
            {!user ? (
              <div className="relative">
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2">
                  <span>Login</span>
                  <i className="fas fa-chevron-down text-xs"></i>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <NavLink className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" to="/farmer-login">
                    Farmer Login
                  </NavLink>
                  <NavLink className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" to="/agent-login">
                    Agent Login
                  </NavLink>
                  <NavLink className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" to="/admin-login">
                    Admin Login
                  </NavLink>
                </div>
              </div>
            ) : (
              <div className="relative profile-dropdown">
                <button 
                  className="flex items-center space-x-3 bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={handleProfileClick}
                >
                  <img 
                    src={user.avatar || defaultAvatars[user.role]} 
                    alt="Profile" 
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span>{user.name}</span>
                  <i className="fas fa-chevron-down text-xs"></i>
                </button>
                
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <NavLink 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2" 
                      to="/profile" 
                      onClick={closeDropdown}
                    >
                      <i className="fas fa-user w-4"></i>
                      <span>Profile</span>
                    </NavLink>
                    <NavLink 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2" 
                      to="/settings" 
                      onClick={closeDropdown}
                    >
                      <i className="fas fa-cog w-4"></i>
                      <span>Settings</span>
                    </NavLink>
                    <hr className="my-1" />
                    <button 
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2" 
                      onClick={handleLogout}
                    >
                      <i className="fas fa-sign-out-alt w-4"></i>
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
            >
              <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <NavLink 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50" 
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </NavLink>
            <NavLink 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50" 
              to="/services"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </NavLink>
            <NavLink 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50" 
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </NavLink>
            
            {user && (
              <NavLink 
                className="block px-3 py-2 rounded-md text-base font-medium bg-green-600 text-white hover:bg-green-700" 
                to={getDashboardPath()}
                onClick={() => setMobileMenuOpen(false)}
              >
                <i className="fas fa-tachometer-alt mr-2"></i>
                Dashboard
              </NavLink>
            )}
            
            {!user && (
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="space-y-1">
                  <NavLink 
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50" 
                    to="/farmer-login"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Farmer Login
                  </NavLink>
                  <NavLink 
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50" 
                    to="/agent-login"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Agent Login
                  </NavLink>
                  <NavLink 
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50" 
                    to="/admin-login"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Admin Login
                  </NavLink>
                </div>
              </div>
            )}
            
            {user && (
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-3 py-2">
                  <img 
                    src={user.avatar || defaultAvatars[user.role]} 
                    alt="Profile" 
                    className="w-10 h-10 rounded-full object-cover mr-3"
                  />
                  <div>
                    <div className="text-base font-medium text-gray-800">{user.name}</div>
                    <div className="text-sm text-gray-500 capitalize">{user.role}</div>
                  </div>
                </div>
                <div className="space-y-1">
                  <NavLink 
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50" 
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <i className="fas fa-user mr-2"></i>
                    Profile
                  </NavLink>
                  <NavLink 
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50" 
                    to="/settings"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <i className="fas fa-cog mr-2"></i>
                    Settings
                  </NavLink>
                  <button 
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50" 
                    onClick={handleLogout}
                  >
                    <i className="fas fa-sign-out-alt mr-2"></i>
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 