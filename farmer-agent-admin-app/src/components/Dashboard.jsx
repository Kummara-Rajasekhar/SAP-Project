import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { NavLink } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger entrance animations after component mounts
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const getRoleSpecificContent = () => {
    switch (user?.role) {
      case 'farmer':
        return {
          title: 'Farmer Dashboard',
          description: 'Manage your farm operations and track your progress',
          bgColor: 'from-green-50 via-green-100 to-green-200',
          cardColor: 'bg-green-500',
          accentColor: 'green',
          stats: [
            { label: 'Total Crops', value: '12', icon: '🌾', color: 'text-green-600', delay: '0ms' },
            { label: 'Active Orders', value: '5', icon: '📦', color: 'text-blue-600', delay: '100ms' },
            { label: 'Revenue', value: '$2,450', icon: '💰', color: 'text-yellow-600', delay: '200ms' },
            { label: 'Land Area', value: '25 acres', icon: '🏞️', color: 'text-purple-600', delay: '300ms' }
          ],
          quickActions: [
            { title: 'Add New Crop', link: '/farmer-dashboard', icon: '🌱', color: 'bg-green-500 hover:bg-green-600', delay: '0ms' },
            { title: 'View Orders', link: '/farmer-dashboard', icon: '📋', color: 'bg-blue-500 hover:bg-blue-600', delay: '100ms' },
            { title: 'Upload Media', link: '/farmer-dashboard', icon: '📷', color: 'bg-purple-500 hover:bg-purple-600', delay: '200ms' },
            { title: 'Payment History', link: '/farmer-dashboard', icon: '💳', color: 'bg-yellow-500 hover:bg-yellow-600', delay: '300ms' }
          ]
        };
      case 'agent':
        return {
          title: 'Agent Dashboard',
          description: 'Manage your clients and agricultural advisory services',
          bgColor: 'from-blue-50 via-blue-100 to-blue-200',
          cardColor: 'bg-blue-500',
          accentColor: 'blue',
          stats: [
            { label: 'Active Clients', value: '18', icon: '👥', color: 'text-blue-600', delay: '0ms' },
            { label: 'Pending Tasks', value: '7', icon: '📝', color: 'text-orange-600', delay: '100ms' },
            { label: 'Completed Reports', value: '24', icon: '📊', color: 'text-green-600', delay: '200ms' },
            { label: 'Revenue', value: '$4,200', icon: '💰', color: 'text-yellow-600', delay: '300ms' }
          ],
          quickActions: [
            { title: 'Add New Client', link: '/agent-dashboard', icon: '👤', color: 'bg-blue-500 hover:bg-blue-600', delay: '0ms' },
            { title: 'Create Report', link: '/agent-dashboard', icon: '📄', color: 'bg-green-500 hover:bg-green-600', delay: '100ms' },
            { title: 'Schedule Visit', link: '/agent-dashboard', icon: '📅', color: 'bg-purple-500 hover:bg-purple-600', delay: '200ms' },
            { title: 'View Analytics', link: '/agent-dashboard', icon: '📈', color: 'bg-orange-500 hover:bg-orange-600', delay: '300ms' }
          ]
        };
      case 'admin':
        return {
          title: 'Admin Dashboard',
          description: 'Manage system operations and user administration',
          bgColor: 'from-purple-50 via-purple-100 to-purple-200',
          cardColor: 'bg-purple-500',
          accentColor: 'purple',
          stats: [
            { label: 'Total Users', value: '156', icon: '👥', color: 'text-purple-600', delay: '0ms' },
            { label: 'Active Sessions', value: '23', icon: '🖥️', color: 'text-blue-600', delay: '100ms' },
            { label: 'System Alerts', value: '3', icon: '⚠️', color: 'text-red-600', delay: '200ms' },
            { label: 'Revenue', value: '$12,450', icon: '💰', color: 'text-yellow-600', delay: '300ms' }
          ],
          quickActions: [
            { title: 'User Management', link: '/admin-dashboard', icon: '👥', color: 'bg-purple-500 hover:bg-purple-600', delay: '0ms' },
            { title: 'System Logs', link: '/admin-dashboard', icon: '📋', color: 'bg-blue-500 hover:bg-blue-600', delay: '100ms' },
            { title: 'Analytics', link: '/admin-dashboard', icon: '📊', color: 'bg-green-500 hover:bg-green-600', delay: '200ms' },
            { title: 'Settings', link: '/settings', icon: '⚙️', color: 'bg-gray-500 hover:bg-gray-600', delay: '300ms' }
          ]
        };
      default:
        return {
          title: 'Dashboard',
          description: 'Welcome to your dashboard',
          bgColor: 'from-gray-50 via-gray-100 to-gray-200',
          cardColor: 'bg-gray-500',
          accentColor: 'gray',
          stats: [
            { label: 'Welcome', value: 'User', icon: '👋', color: 'text-gray-600', delay: '0ms' },
            { label: 'Status', value: 'Active', icon: '✅', color: 'text-green-600', delay: '100ms' },
            { label: 'Role', value: user?.role || 'Unknown', icon: '🎭', color: 'text-purple-600', delay: '200ms' },
            { label: 'Last Login', value: 'Today', icon: '🕒', color: 'text-blue-600', delay: '300ms' }
          ],
          quickActions: [
            { title: 'View Profile', link: '/profile', icon: '👤', color: 'bg-blue-500 hover:bg-blue-600', delay: '0ms' },
            { title: 'Settings', link: '/settings', icon: '⚙️', color: 'bg-gray-500 hover:bg-gray-600', delay: '100ms' },
            { title: 'Help', link: '/contact', icon: '❓', color: 'bg-green-500 hover:bg-green-600', delay: '200ms' },
            { title: 'Logout', link: '/', icon: '🚪', color: 'bg-red-500 hover:bg-red-600', delay: '300ms' }
          ]
        };
    }
  };

  const content = getRoleSpecificContent();

  return (
    <div className={`min-h-screen bg-gradient-to-br ${content.bgColor} transition-all duration-1000 ease-in-out`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with entrance animation */}
        <div className={`mb-8 text-center transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="text-4xl font-bold text-gray-900 mb-4 animate-pulse">
            {content.title}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-fade-in">
            {content.description}
          </p>
        </div>

        {/* Stats Grid with staggered animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {content.stats.map((stat, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-xl shadow-lg p-6 transform transition-all duration-700 ease-out hover:scale-105 hover:shadow-2xl hover:-translate-y-2 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
              style={{ transitionDelay: stat.delay }}
            >
              <div className="flex items-center">
                <div className={`text-4xl mr-4 ${stat.color} animate-bounce`} style={{ animationDelay: `${index * 0.2}s` }}>
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 animate-pulse">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions with slide-in animations */}
        <div className={`bg-white rounded-xl shadow-lg mb-8 overflow-hidden transform transition-all duration-1000 ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {content.quickActions.map((action, index) => (
                <NavLink
                  key={index}
                  to={action.link}
                  className={`flex items-center p-4 rounded-lg text-white ${action.color} transform transition-all duration-500 hover:scale-110 hover:shadow-xl ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                  style={{ transitionDelay: action.delay }}
                >
                  <span className="text-2xl mr-3 animate-pulse">{action.icon}</span>
                  <span className="font-medium">{action.title}</span>
                </NavLink>
              ))}
            </div>
          </div>
        </div>

        {/* Role-specific Dashboard Links with fade-in animations */}
        <div className={`bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
          <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">Role-specific Dashboards</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <NavLink
                to="/farmer-dashboard"
                className="flex items-center p-6 border-2 border-green-200 rounded-xl hover:bg-green-50 transition-all duration-500 transform hover:scale-105 hover:shadow-xl hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: '0.5s' }}
              >
                <span className="text-3xl mr-4 animate-bounce">🌾</span>
                <div>
                  <p className="font-semibold text-gray-900 text-lg">Farmer Dashboard</p>
                  <p className="text-sm text-gray-600">Manage crops and farm operations</p>
                </div>
              </NavLink>
              
              <NavLink
                to="/agent-dashboard"
                className="flex items-center p-6 border-2 border-blue-200 rounded-xl hover:bg-blue-50 transition-all duration-500 transform hover:scale-105 hover:shadow-xl hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: '0.7s' }}
              >
                <span className="text-3xl mr-4 animate-bounce">👥</span>
                <div>
                  <p className="font-semibold text-gray-900 text-lg">Agent Dashboard</p>
                  <p className="text-sm text-gray-600">Manage clients and advisory services</p>
                </div>
              </NavLink>
              
              <NavLink
                to="/admin-dashboard"
                className="flex items-center p-6 border-2 border-purple-200 rounded-xl hover:bg-purple-50 transition-all duration-500 transform hover:scale-105 hover:shadow-xl hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: '0.9s' }}
              >
                <span className="text-3xl mr-4 animate-bounce">⚙️</span>
                <div>
                  <p className="font-semibold text-gray-900 text-lg">Admin Dashboard</p>
                  <p className="text-sm text-gray-600">System administration and management</p>
                </div>
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .animate-bounce {
          animation: bounce 1s infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .5; }
        }
        
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
          40%, 43% { transform: translate3d(0,-30px,0); }
          70% { transform: translate3d(0,-15px,0); }
          90% { transform: translate3d(0,-4px,0); }
        }
      `}</style>
    </div>
  );
};

export default Dashboard; 