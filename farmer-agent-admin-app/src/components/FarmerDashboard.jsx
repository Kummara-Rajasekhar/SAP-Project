import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContext } from '../App';

const sidebarLinks = [
  { id: 'dashboard', icon: 'fas fa-home', label: 'Dashboard' },
  { id: 'soil', icon: 'fas fa-tint', label: 'Soil & Water' },
  { id: 'weather', icon: 'fas fa-cloud-sun', label: 'Weather' },
  { id: 'tasks', icon: 'fas fa-tasks', label: 'Task Management' },
  { id: 'labor', icon: 'fas fa-users', label: 'Labor Management' },
  { id: 'analytics', icon: 'fas fa-chart-bar', label: 'Report & Analytics' },
  { id: 'setting', icon: 'fas fa-cog', label: 'Setting' },
  { id: 'account', icon: 'fas fa-user', label: 'My Account' },
  { id: 'help', icon: 'fas fa-question-circle', label: 'Help & Support' },
];

const FarmerDashboard = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [activeSidebar, setActiveSidebar] = useState('dashboard');
  const [activeTab, setActiveTab] = useState('overview');
  const [cropForm, setCropForm] = useState({ cropName: '', startDate: '', endDate: '', quantity: '', price: '', status: 'pending' });
  const [crops, setCrops] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [mediaUpload, setMediaUpload] = useState({ description: '', file: null });
  const [payments, setPayments] = useState([]);
  const [soilHealth, setSoilHealth] = useState({ ph: '6.8', nitrogen: 'High', phosphorus: 'Medium', potassium: 'High', moisture: '75%' });
  const [weatherData, setWeatherData] = useState({
    location: 'Hyderabad, Telangana',
    day: 'Monday',
    date: 'January 22, 2024',
    temperature: '28°C',
    high: '32°C',
    low: '22°C',
    condition: 'Partly Cloudy',
    humidity: '65%',
    windSpeed: '12 km/h'
  });
  const { showToast } = useContext(ToastContext);
  const [quickStats, setQuickStats] = useState({
    totalCrops: 8,
    earnings: 45000,
    unreadNotifications: 3,
    activeTasks: 5
  });
  const [recentActivities, setRecentActivities] = useState([
    { id: 1, type: 'crop', message: 'Registered new crop: Wheat', time: '2 hours ago', icon: 'fas fa-check-circle', color: 'text-success' },
    { id: 2, type: 'upload', message: 'Uploaded field photo', time: '4 hours ago', icon: 'fas fa-upload', color: 'text-info' },
    { id: 3, type: 'payment', message: 'Received payment: ₹15,000', time: '1 day ago', icon: 'fas fa-rupee-sign', color: 'text-primary' },
    { id: 4, type: 'notification', message: '3 new notifications', time: '2 days ago', icon: 'fas fa-bell', color: 'text-warning' }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    if (!user) {
      navigate('/farmer-login');
    }
  }, [user, navigate]);

  if (!user) {
    return <div className="d-flex justify-content-center align-items-center" style={{height: '80vh'}}><div className="loading-spinner"></div></div>;
  }

  const handleQuickStatClick = (statType) => {
    showToast(`Viewing ${statType} details`, 'info');
    // Navigate to respective sections
    switch(statType) {
      case 'crops':
        setActiveSidebar('crops');
        break;
      case 'earnings':
        setActiveSidebar('payments');
        break;
      case 'notifications':
        setActiveSidebar('notifications');
        break;
      case 'tasks':
        setActiveSidebar('tasks');
        break;
    }
  };

  const handleActivityClick = (activity) => {
    showToast(`Viewing ${activity.type} activity`, 'info');
    // Navigate to respective sections
    switch(activity.type) {
      case 'crop':
        setActiveSidebar('crops');
        break;
      case 'upload':
        setActiveSidebar('media');
        break;
      case 'payment':
        setActiveSidebar('payments');
        break;
      case 'notification':
        setActiveSidebar('notifications');
        break;
    }
  };

  const filteredActivities = recentActivities.filter(activity => {
    const matchesSearch = activity.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || activity.type === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const sortedActivities = [...filteredActivities].sort((a, b) => {
    switch(sortBy) {
      case 'date':
        return new Date(b.time) - new Date(a.time);
      case 'type':
        return a.type.localeCompare(b.type);
      case 'message':
        return a.message.localeCompare(b.message);
      default:
        return 0;
    }
  });

  useEffect(() => {
    setCrops([
      { id: 1, name: 'Rice', startDate: '2024-01-15', endDate: '2024-06-15', status: 'active', quantity: '500 kg', price: '₹25/kg', totalValue: '₹12,500', progress: 65 },
      { id: 2, name: 'Wheat', startDate: '2024-02-01', endDate: '2024-07-01', status: 'completed', quantity: '300 kg', price: '₹30/kg', totalValue: '₹9,000', progress: 100 },
      { id: 3, name: 'Corn', startDate: '2024-03-01', endDate: '2024-08-01', status: 'active', quantity: '400 kg', price: '₹20/kg', totalValue: '₹8,000', progress: 35 }
    ]);
    setNotifications([
      { id: 1, type: 'weather', title: 'Weather Alert', message: 'Heavy rainfall expected in next 48 hours. Protect your crops.', timestamp: '2024-01-20 10:30 AM', read: false, priority: 'high' },
      { id: 2, type: 'prediction', title: 'Crop Prediction', message: 'Rice prices expected to increase by 15% in next month.', timestamp: '2024-01-19 02:15 PM', read: true, priority: 'medium' },
      { id: 3, type: 'pesticide', title: 'Pesticide Recommendation', message: 'Apply neem-based pesticide to prevent pest infestation.', timestamp: '2024-01-18 09:45 AM', read: false, priority: 'high' },
      { id: 4, type: 'harvest', title: 'Harvest Reminder', message: 'Your wheat crop is ready for harvest in 2 weeks.', timestamp: '2024-01-17 03:20 PM', read: false, priority: 'medium' }
    ]);
    setPayments([
      { id: 1, service: 'Rice Cultivation', estimatedCost: '₹8,000', serviceFee: '₹2,000', profitShare: '₹1,875', total: '₹11,875', status: 'paid', date: '2024-01-15' },
      { id: 2, service: 'Wheat Cultivation', estimatedCost: '₹6,000', serviceFee: '₹1,500', profitShare: '₹1,350', total: '₹8,850', status: 'pending', date: '2024-01-20' },
      { id: 3, service: 'Corn Cultivation', estimatedCost: '₹5,000', serviceFee: '₹1,250', profitShare: '₹750', total: '₹7,000', status: 'paid', date: '2024-01-10' }
    ]);
  }, []);

  // TOPBAR
  const renderTopbar = () => (
    <div className="topbar">
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <h4 className="mb-0 me-3">Welcome back, {user.name}!</h4>
          <span className="badge bg-success">{user.role}</span>
        </div>
        <div className="d-flex align-items-center">
          <div className="search-box me-3">
            <i className="fas fa-search me-2"></i>
            <input type="text" placeholder="Search..." className="border-0 bg-transparent" />
          </div>
          <div className="profile d-flex align-items-center">
            <img src={user.profilePic || 'https://randomuser.me/api/portraits/men/32.jpg'} alt="Profile" className="profile-img me-2" />
            <div className="dropdown">
              <button className="btn btn-link dropdown-toggle text-dark text-decoration-none" type="button" data-bs-toggle="dropdown">
                {user.name}
              </button>
              <ul className="dropdown-menu">
                <li><button className="dropdown-item" onClick={() => navigate('/profile')}>My Profile</button></li>
                <li><button className="dropdown-item" onClick={onLogout}>Logout</button></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // SIDEBAR
  const renderSidebar = () => (
    <div className="sidebar">
      <div className="sidebar-logo mb-4">
        <i className="fas fa-seedling me-2"></i>
        <span>Farmer Dashboard</span>
      </div>
      <nav className="nav flex-column">
        <button className={`nav-link ${activeSidebar === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveSidebar('dashboard')}>
          <i className="fas fa-tachometer-alt me-2"></i>
          Dashboard
        </button>
        <button className={`nav-link ${activeSidebar === 'crops' ? 'active' : ''}`} onClick={() => setActiveSidebar('crops')}>
          <i className="fas fa-seedling me-2"></i>
          Crop Management
        </button>
        <button className={`nav-link ${activeSidebar === 'notifications' ? 'active' : ''}`} onClick={() => setActiveSidebar('notifications')}>
          <i className="fas fa-bell me-2"></i>
          Notifications
        </button>
        <button className={`nav-link ${activeSidebar === 'media' ? 'active' : ''}`} onClick={() => setActiveSidebar('media')}>
          <i className="fas fa-camera me-2"></i>
          Media Upload
        </button>
        <button className={`nav-link ${activeSidebar === 'agents' ? 'active' : ''}`} onClick={() => setActiveSidebar('agents')}>
          <i className="fas fa-users me-2"></i>
          Agent Contacts
        </button>
        <button className={`nav-link ${activeSidebar === 'payments' ? 'active' : ''}`} onClick={() => setActiveSidebar('payments')}>
          <i className="fas fa-rupee-sign me-2"></i>
          Payments
        </button>
        <button className={`nav-link ${activeSidebar === 'weather' ? 'active' : ''}`} onClick={() => setActiveSidebar('weather')}>
          <i className="fas fa-cloud-sun me-2"></i>
          Weather
        </button>
        <button className={`nav-link ${activeSidebar === 'soil' ? 'active' : ''}`} onClick={() => setActiveSidebar('soil')}>
          <i className="fas fa-leaf me-2"></i>
          Soil Health
        </button>
      </nav>
    </div>
  );

  // MAIN DASHBOARD AREA (cards/widgets)
  const renderMainDashboard = () => (
    <div className="container-fluid py-4">
      {/* Search and Filter Controls */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="input-group">
            <span className="input-group-text"><i className="fas fa-search"></i></span>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Search activities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
      </div>
        </div>
        <div className="col-md-3">
          <select 
            className="form-select" 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Activities</option>
            <option value="crop">Crop Related</option>
            <option value="payment">Payments</option>
            <option value="notification">Notifications</option>
            <option value="upload">Uploads</option>
          </select>
      </div>
        <div className="col-md-3">
          <select 
            className="form-select" 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="date">Sort by Date</option>
            <option value="type">Sort by Type</option>
            <option value="message">Sort by Message</option>
          </select>
        </div>
        <div className="col-md-2">
          <button 
            className="btn btn-outline-secondary w-100"
            onClick={() => {
              setSearchTerm('');
              setFilterStatus('all');
              setSortBy('date');
            }}
          >
            <i className="fas fa-refresh me-1"></i>Reset
          </button>
      </div>
      </div>

      {/* Quick Stats */}
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div 
            className="card text-center p-3 shadow-sm cursor-pointer" 
            style={{cursor: 'pointer', transition: 'all 0.3s ease'}}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            onClick={() => handleQuickStatClick('crops')}
          >
            <i className="fas fa-seedling fa-2x text-success mb-2"></i>
            <div className="fw-bold fs-4">{quickStats.totalCrops}</div>
            <div className="text-muted">Total Crops</div>
          </div>
        </div>
        <div className="col-md-3">
          <div 
            className="card text-center p-3 shadow-sm cursor-pointer" 
            style={{cursor: 'pointer', transition: 'all 0.3s ease'}}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            onClick={() => handleQuickStatClick('earnings')}
          >
            <i className="fas fa-rupee-sign fa-2x text-primary mb-2"></i>
            <div className="fw-bold fs-4">₹{(quickStats.earnings/1000).toFixed(0)}K</div>
            <div className="text-muted">Earnings</div>
          </div>
        </div>
        <div className="col-md-3">
          <div 
            className="card text-center p-3 shadow-sm cursor-pointer" 
            style={{cursor: 'pointer', transition: 'all 0.3s ease'}}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            onClick={() => handleQuickStatClick('notifications')}
          >
            <i className="fas fa-bell fa-2x text-warning mb-2"></i>
            <div className="fw-bold fs-4">{quickStats.unreadNotifications}</div>
            <div className="text-muted">Unread Notifications</div>
          </div>
        </div>
        <div className="col-md-3">
          <div 
            className="card text-center p-3 shadow-sm cursor-pointer" 
            style={{cursor: 'pointer', transition: 'all 0.3s ease'}}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            onClick={() => handleQuickStatClick('tasks')}
          >
            <i className="fas fa-tasks fa-2x text-info mb-2"></i>
            <div className="fw-bold fs-4">{quickStats.activeTasks}</div>
            <div className="text-muted">Active Tasks</div>
          </div>
        </div>
      </div>

      {/* Recent Activity with Enhanced Features */}
      <div className="row g-4">
        <div className="col-md-8">
          <div className="card p-4 shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="fw-bold">Recent Activity</div>
              <div className="text-muted small">
                Showing {sortedActivities.length} of {recentActivities.length} activities
              </div>
            </div>
            <ul className="list-group list-group-flush">
              {sortedActivities.map((activity) => (
                <li 
                  key={activity.id} 
                  className="list-group-item cursor-pointer" 
                  style={{cursor: 'pointer', transition: 'all 0.2s ease'}}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                  onClick={() => handleActivityClick(activity)}
                >
                  <div className="d-flex align-items-center">
                    <i className={`${activity.icon} ${activity.color} me-2`}></i>
                    <div className="flex-grow-1">
                      <div className="small">{activity.message}</div>
                      <div className="text-muted small">{activity.time}</div>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className={`badge bg-${activity.type === 'crop' ? 'success' : activity.type === 'payment' ? 'warning' : activity.type === 'notification' ? 'info' : 'primary'} me-2`}>
                        {activity.type}
                      </span>
                      <i className="fas fa-chevron-right text-muted"></i>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            {sortedActivities.length === 0 && (
              <div className="text-center py-4 text-muted">
                <i className="fas fa-search fa-2x mb-2"></i>
                <div>No activities found matching your criteria</div>
              </div>
            )}
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-4 shadow-sm">
            <div className="fw-bold mb-3">Quick Actions</div>
            <div className="d-grid gap-2">
              <button className="btn btn-outline-success btn-sm">
                <i className="fas fa-plus me-2"></i>Add New Crop
              </button>
              <button className="btn btn-outline-primary btn-sm">
                <i className="fas fa-upload me-2"></i>Upload Photos
              </button>
              <button className="btn btn-outline-warning btn-sm">
                <i className="fas fa-bell me-2"></i>View Notifications
              </button>
              <button className="btn btn-outline-info btn-sm">
                <i className="fas fa-chart-line me-2"></i>View Reports
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row g-4">
        <div className="col-12 col-lg-8">
          <div className="mb-4">
            <h2 className="fw-bold mb-1">Good Morning</h2>
            <div className="text-muted mb-2">Optimize Your Farm Operations with Real-Time Insights</div>
          </div>
          <div className="row g-4 mb-2">
      <div className="col-md-6">
              <div className="card h-100">
                <div className="d-flex align-items-center mb-2">
                  <span className="badge bg-success me-2"><i className="fas fa-map-marker-alt me-1"></i>{weatherData.location}</span>
                  <span className="badge bg-light text-dark ms-auto">C</span>
                  <span className="badge bg-light text-dark ms-2">F</span>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <div className="me-3">
                    <div className="fw-bold fs-5">{weatherData.day}</div>
                    <div className="text-muted small">{weatherData.date}</div>
                  </div>
                  <div className="ms-auto text-end">
                    <div className="fw-bold fs-3">{weatherData.temperature}</div>
                    <div className="text-muted">High: {weatherData.high} Low: {weatherData.low}</div>
                    <div className="fw-bold text-success">{weatherData.condition}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card h-100">
                <div className="fw-bold mb-2">Production Overview</div>
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <span className="badge bg-light text-dark">Yearly</span>
                  </div>
                  <div className="fw-bold fs-4" style={{color: '#4caf50'}}>1,000 Tons</div>
                </div>
                <div className="progress mt-3" style={{height: 12, borderRadius: 6}}>
                  <div className="progress-bar bg-success" style={{width: '50%'}}></div>
                  <div className="progress-bar bg-info" style={{width: '20%'}}></div>
                  <div className="progress-bar bg-warning" style={{width: '30%'}}></div>
                </div>
                <div className="d-flex justify-content-between mt-2 small">
                  <span>Wheat 30%</span>
                  <span>Corn 20%</span>
                  <span>Rice 50%</span>
                </div>
              </div>
            </div>
          </div>
          <div className="row g-4">
            <div className="col-md-6">
              <div className="card h-100">
                <div className="fw-bold mb-2">Month Yield Analysis</div>
                <img src="https://assets-global.website-files.com/5f6b7b7b7b7b7b7b7b7b7b77b7b7b7b7_chart-green.svg" alt="Yield Chart" style={{width: '100%', height: 120, objectFit: 'contain'}} />
                <div className="d-flex justify-content-between mt-2 small">
                  <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card h-100">
                <div className="fw-bold mb-2">Corn Field</div>
                <img src="https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=400&q=80" alt="Corn Field" style={{width: '100%', height: 90, objectFit: 'cover', borderRadius: 12}} />
                <div className="mt-2 small">
                  <div><b>Crop Health:</b> Good</div>
                  <div><b>Plating Date:</b> 16 May, 2024</div>
                  <div><b>Pesticide Use:</b> Low</div>
                </div>
                <button className="btn btn-outline-success btn-sm mt-2">More Details</button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <div className="card mb-4">
            <div className="fw-bold mb-2">Total Land Area</div>
            <div className="fs-3 fw-bold" style={{color: '#4caf50'}}>1200 acres</div>
            <div className="text-success small">+6% from last month</div>
          </div>
          <div className="card mb-4">
            <div className="fw-bold mb-2">Revenue</div>
            <div className="fs-3 fw-bold" style={{color: '#4caf50'}}>$500,000</div>
            <div className="text-success small">+18.45% from last month</div>
          </div>
          <div className="card mb-4">
            <div className="fw-bold mb-2">Vegetable Harvest Summary</div>
            <div className="d-flex justify-content-between">
              <span>Carrots</span>
              <span className="fw-bold">120 Ton</span>
            </div>
          </div>
          <div className="card mb-4">
            <div className="fw-bold mb-2">Task Management</div>
            <div className="d-flex justify-content-between mb-2">
              <span>Task Name</span>
              <span>Assigned To</span>
              <span>Due Date</span>
              <span>Status</span>
            </div>
            <div className="d-flex justify-content-between small mb-1">
              <span>Soil Test</span>
              <span>Ramesh</span>
              <span>21 May</span>
              <span><span className="badge bg-success">Done</span></span>
            </div>
            <div className="d-flex justify-content-between small mb-1">
              <span>Watering</span>
              <span>Sita</span>
              <span>22 May</span>
              <span><span className="badge bg-warning text-dark">Pending</span></span>
            </div>
            <button className="btn btn-primary-custom btn-sm mt-2">+ New Task</button>
          </div>
        </div>
      </div>
    </div>
  );

  // SOIL & WATER PAGE
  const renderSoilWater = () => (
    <div className="container-fluid py-4">
      <div className="row g-4">
        <div className="col-12">
          <h2 className="fw-bold mb-4">Soil & Water Management</h2>
        </div>
        
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="fw-bold mb-3">Soil Health Monitoring</div>
            <div className="row g-3">
              <div className="col-6">
                <div className="text-center p-3 border rounded">
                  <div className="fw-bold fs-4" style={{color: '#4caf50'}}>{soilHealth.ph}</div>
                  <div className="small text-muted">pH Level</div>
                  <div className="progress mt-2" style={{height: 6}}>
                    <div className="progress-bar bg-success" style={{width: '68%'}}></div>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="text-center p-3 border rounded">
                  <div className="fw-bold fs-4" style={{color: '#4caf50'}}>{soilHealth.moisture}</div>
                  <div className="small text-muted">Moisture</div>
                  <div className="progress mt-2" style={{height: 6}}>
                    <div className="progress-bar bg-info" style={{width: '75%'}}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="row g-3 mt-3">
              <div className="col-4">
                <div className="text-center p-2">
                  <div className="fw-bold text-success">{soilHealth.nitrogen}</div>
                  <div className="small text-muted">Nitrogen</div>
                </div>
              </div>
              <div className="col-4">
                <div className="text-center p-2">
                  <div className="fw-bold text-warning">{soilHealth.phosphorus}</div>
                  <div className="small text-muted">Phosphorus</div>
                </div>
              </div>
              <div className="col-4">
                <div className="text-center p-2">
                  <div className="fw-bold text-success">{soilHealth.potassium}</div>
                  <div className="small text-muted">Potassium</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card mb-4">
            <div className="fw-bold mb-3">Water Management</div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <div className="fw-bold">Irrigation Status</div>
                <div className="small text-muted">Last updated: 2 hours ago</div>
              </div>
              <span className="badge bg-success">Active</span>
            </div>
            
            <div className="row g-3">
              <div className="col-6">
                <div className="text-center p-3 border rounded">
                  <div className="fw-bold fs-4" style={{color: '#4caf50'}}>85%</div>
                  <div className="small text-muted">Water Level</div>
                </div>
              </div>
              <div className="col-6">
                <div className="text-center p-3 border rounded">
                  <div className="fw-bold fs-4" style={{color: '#4caf50'}}>6.2</div>
                  <div className="small text-muted">Water pH</div>
                </div>
              </div>
            </div>
            
            <div className="mt-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span>Irrigation Schedule</span>
                <button className="btn btn-outline-success btn-sm">Edit</button>
              </div>
              <div className="small text-muted">
                <div>Morning: 6:00 AM - 8:00 AM</div>
                <div>Evening: 6:00 PM - 8:00 PM</div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="card">
            <div className="fw-bold mb-3">Soil Testing History</div>
          <div className="table-responsive">
              <table className="table table-sm">
              <thead>
                <tr>
                    <th>Date</th>
                    <th>pH Level</th>
                    <th>Nitrogen</th>
                    <th>Phosphorus</th>
                    <th>Potassium</th>
                    <th>Moisture</th>
                    <th>Recommendations</th>
                </tr>
              </thead>
              <tbody>
                  <tr>
                    <td>2024-01-20</td>
                    <td>6.8</td>
                    <td><span className="badge bg-success">High</span></td>
                    <td><span className="badge bg-warning">Medium</span></td>
                    <td><span className="badge bg-success">High</span></td>
                    <td>75%</td>
                    <td>Add phosphorus fertilizer</td>
                  </tr>
                  <tr>
                    <td>2024-01-15</td>
                    <td>6.5</td>
                    <td><span className="badge bg-success">High</span></td>
                    <td><span className="badge bg-success">High</span></td>
                    <td><span className="badge bg-success">High</span></td>
                    <td>80%</td>
                    <td>Optimal conditions</td>
                  </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>
    </div>
  );

  // WEATHER PAGE
  const renderWeather = () => (
    <div className="container-fluid py-4">
      <div className="row g-4">
        <div className="col-12">
          <h2 className="fw-bold mb-4">Weather Information</h2>
        </div>
        
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <div className="fw-bold fs-4">{weatherData.location}</div>
                <div className="text-muted">{weatherData.day}, {weatherData.date}</div>
              </div>
              <div className="text-end">
                <div className="fw-bold fs-2">{weatherData.temperature}</div>
                <div className="text-muted">High: {weatherData.high}° Low: {weatherData.low}°</div>
              </div>
            </div>
            
            <div className="row g-3">
              <div className="col-md-3">
                <div className="text-center p-3 border rounded">
                  <i className="fas fa-tint fa-2x text-info mb-2"></i>
                  <div className="fw-bold">{weatherData.humidity}</div>
                  <div className="small text-muted">Humidity</div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="text-center p-3 border rounded">
                  <i className="fas fa-wind fa-2x text-secondary mb-2"></i>
                  <div className="fw-bold">{weatherData.windSpeed}</div>
                  <div className="small text-muted">Wind Speed</div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="text-center p-3 border rounded">
                  <i className="fas fa-sun fa-2x text-warning mb-2"></i>
                  <div className="fw-bold">UV Index</div>
                  <div className="small text-muted">Moderate</div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="text-center p-3 border rounded">
                  <i className="fas fa-eye fa-2x text-primary mb-2"></i>
                  <div className="fw-bold">Visibility</div>
                  <div className="small text-muted">10 km</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card mb-4">
            <div className="fw-bold mb-3">7-Day Forecast</div>
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
              <div key={index} className="d-flex justify-content-between align-items-center mb-2 p-2 border rounded">
                <div>
                  <div className="fw-bold">{day}</div>
                  <div className="small text-muted">20 Jan</div>
                </div>
                <div className="text-center">
                  <i className="fas fa-sun text-warning"></i>
                </div>
                <div className="text-end">
                  <div className="fw-bold">28°</div>
                  <div className="small text-muted">18°</div>
                </div>
            </div>
          ))}
          </div>
        </div>

        <div className="col-12">
          <div className="card">
            <div className="fw-bold mb-3">Weather Alerts</div>
            <div className="alert alert-warning">
              <i className="fas fa-exclamation-triangle me-2"></i>
              <strong>Heavy Rainfall Warning:</strong> Expected heavy rainfall in the next 48 hours. 
              Protect your crops and ensure proper drainage.
            </div>
            <div className="alert alert-info">
              <i className="fas fa-info-circle me-2"></i>
              <strong>Temperature Alert:</strong> Temperatures expected to rise above 35°C this week. 
              Consider additional irrigation for sensitive crops.
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // TASK MANAGEMENT PAGE
  const renderTaskManagement = () => (
    <div className="container-fluid py-4">
      <div className="row g-4">
        <div className="col-12">
          <h2 className="fw-bold mb-4">Task Management</h2>
            </div>
        
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="fw-bold">Current Tasks</div>
              <button className="btn btn-primary-custom btn-sm">+ Add Task</button>
          </div>
            
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Task</th>
                    <th>Assigned To</th>
                    <th>Due Date</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Soil Testing</td>
                    <td>Ramesh</td>
                    <td>21 May</td>
                    <td><span className="badge bg-danger">High</span></td>
                    <td><span className="badge bg-success">Completed</span></td>
                    <td>
                      <button className="btn btn-outline-primary btn-sm me-1">Edit</button>
                      <button className="btn btn-outline-danger btn-sm">Delete</button>
                    </td>
                  </tr>
                  <tr>
                    <td>Watering Crops</td>
                    <td>Sita</td>
                    <td>22 May</td>
                    <td><span className="badge bg-warning">Medium</span></td>
                    <td><span className="badge bg-warning text-dark">Pending</span></td>
                    <td>
                      <button className="btn btn-outline-primary btn-sm me-1">Edit</button>
                      <button className="btn btn-outline-danger btn-sm">Delete</button>
                    </td>
                  </tr>
                  <tr>
                    <td>Fertilizer Application</td>
                    <td>Ramesh</td>
                    <td>25 May</td>
                    <td><span className="badge bg-info">Low</span></td>
                    <td><span className="badge bg-secondary">Not Started</span></td>
                    <td>
                      <button className="btn btn-outline-primary btn-sm me-1">Edit</button>
                      <button className="btn btn-outline-danger btn-sm">Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card mb-4">
            <div className="fw-bold mb-3">Task Statistics</div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <div className="fw-bold fs-4" style={{color: '#4caf50'}}>8</div>
                <div className="text-muted small">Total Tasks</div>
            </div>
              <div className="text-end">
                <div className="fw-bold fs-5">3</div>
                <div className="text-success small">Completed</div>
          </div>
            </div>
            <div className="progress mb-3" style={{height: 8}}>
              <div className="progress-bar bg-success" style={{width: '37.5%'}}></div>
          </div>
            <div className="d-flex justify-content-between small">
              <span>Completed: 3</span>
              <span>Pending: 3</span>
              <span>Not Started: 2</span>
        </div>
            </div>

          <div className="card mb-4">
            <div className="fw-bold mb-3">Quick Actions</div>
            <button className="btn btn-outline-success w-100 mb-2">
              <i className="fas fa-plus me-2"></i>Add New Task
            </button>
            <button className="btn btn-outline-primary w-100 mb-2">
              <i className="fas fa-calendar me-2"></i>Schedule Task
            </button>
            <button className="btn btn-outline-warning w-100 mb-2">
              <i className="fas fa-users me-2"></i>Assign to Worker
            </button>
            <button className="btn btn-outline-info w-100">
              <i className="fas fa-chart-bar me-2"></i>View Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // LABOR MANAGEMENT PAGE
  const renderLaborManagement = () => (
    <div className="container-fluid py-4">
      <div className="row g-4">
        <div className="col-12">
          <h2 className="fw-bold mb-4">Labor Management</h2>
        </div>
        
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="fw-bold">Workforce</div>
              <button className="btn btn-primary-custom btn-sm">+ Add Worker</button>
            </div>
            
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Contact</th>
                    <th>Hours Worked</th>
                    <th>Performance</th>
              <th>Status</th>
                    <th>Actions</th>
            </tr>
          </thead>
          <tbody>
                  <tr>
                    <td>Ramesh Kumar</td>
                    <td>Field Worker</td>
                    <td>+91 98765 43210</td>
                    <td>160 hrs</td>
                    <td><span className="badge bg-success">Excellent</span></td>
                    <td><span className="badge bg-success">Active</span></td>
                    <td>
                      <button className="btn btn-outline-primary btn-sm me-1">Edit</button>
                      <button className="btn btn-outline-info btn-sm">View</button>
                </td>
              </tr>
                  <tr>
                    <td>Sita Devi</td>
                    <td>Irrigation Specialist</td>
                    <td>+91 98765 43211</td>
                    <td>140 hrs</td>
                    <td><span className="badge bg-warning">Good</span></td>
                    <td><span className="badge bg-success">Active</span></td>
                    <td>
                      <button className="btn btn-outline-primary btn-sm me-1">Edit</button>
                      <button className="btn btn-outline-info btn-sm">View</button>
                    </td>
                  </tr>
                  <tr>
                    <td>Mohan Singh</td>
                    <td>Equipment Operator</td>
                    <td>+91 98765 43212</td>
                    <td>120 hrs</td>
                    <td><span className="badge bg-info">Average</span></td>
                    <td><span className="badge bg-secondary">On Leave</span></td>
                    <td>
                      <button className="btn btn-outline-primary btn-sm me-1">Edit</button>
                      <button className="btn btn-outline-info btn-sm">View</button>
                    </td>
                  </tr>
          </tbody>
        </table>
      </div>
    </div>
        </div>

        <div className="col-md-4">
          <div className="card mb-4">
            <div className="fw-bold mb-3">Labor Statistics</div>
            <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
                <div className="fw-bold fs-4" style={{color: '#4caf50'}}>8</div>
                <div className="text-muted small">Total Workers</div>
            </div>
              <div className="text-end">
                <div className="fw-bold fs-5">6</div>
                <div className="text-success small">Active</div>
          </div>
        </div>
            <div className="d-flex justify-content-between small mb-3">
              <span>Field Workers: 4</span>
              <span>Specialists: 2</span>
    </div>
            <div className="d-flex justify-content-between small">
              <span>Operators: 1</span>
              <span>Supervisors: 1</span>
            </div>
          </div>

          <div className="card mb-4">
            <div className="fw-bold mb-3">Payroll Summary</div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span>Total Hours</span>
              <span className="fw-bold">420 hrs</span>
        </div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span>Total Wages</span>
              <span className="fw-bold">₹42,000</span>
          </div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span>This Month</span>
              <span className="fw-bold">₹15,000</span>
        </div>
            <button className="btn btn-outline-success w-100 mt-3">Generate Payroll</button>
          </div>
        </div>
      </div>
    </div>
  );

  // ANALYTICS PAGE
  const renderAnalytics = () => (
    <div className="container-fluid py-4">
      <div className="row g-4">
        <div className="col-12">
          <h2 className="fw-bold mb-4">Reports & Analytics</h2>
        </div>
        
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="fw-bold mb-3">Crop Performance</div>
            <div className="row g-3">
              <div className="col-6">
                <div className="text-center p-3 border rounded">
                  <div className="fw-bold fs-4" style={{color: '#4caf50'}}>85%</div>
                  <div className="small text-muted">Rice Yield</div>
                </div>
              </div>
              <div className="col-6">
                <div className="text-center p-3 border rounded">
                  <div className="fw-bold fs-4" style={{color: '#4caf50'}}>78%</div>
                  <div className="small text-muted">Wheat Yield</div>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <div className="progress mb-2" style={{height: 8}}>
                <div className="progress-bar bg-success" style={{width: '85%'}}></div>
              </div>
              <div className="small text-muted">Target: 90% | Current: 85%</div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card mb-4">
            <div className="fw-bold mb-3">Financial Overview</div>
            <div className="row g-3">
              <div className="col-6">
                <div className="text-center p-3 border rounded">
                  <div className="fw-bold fs-4" style={{color: '#4caf50'}}>₹1,25,000</div>
                  <div className="small text-muted">Total Revenue</div>
                </div>
              </div>
              <div className="col-6">
                <div className="text-center p-3 border rounded">
                  <div className="fw-bold fs-4" style={{color: '#4caf50'}}>₹45,000</div>
                  <div className="small text-muted">Total Expenses</div>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <div className="d-flex justify-content-between align-items-center">
                <span>Net Profit</span>
                <span className="fw-bold text-success">₹80,000</span>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <span>Profit Margin</span>
                <span className="fw-bold text-success">64%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="card">
            <div className="fw-bold mb-3">Monthly Reports</div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
                    <th>Report Type</th>
                    <th>Period</th>
              <th>Status</th>
                    <th>Generated On</th>
                    <th>Actions</th>
            </tr>
          </thead>
          <tbody>
                  <tr>
                    <td>Crop Performance Report</td>
                    <td>January 2024</td>
                    <td><span className="badge bg-success">Generated</span></td>
                    <td>2024-01-20</td>
                    <td>
                      <button className="btn btn-outline-primary btn-sm me-1">View</button>
                      <button className="btn btn-outline-success btn-sm">Download</button>
                </td>
              </tr>
                  <tr>
                    <td>Financial Report</td>
                    <td>January 2024</td>
                    <td><span className="badge bg-success">Generated</span></td>
                    <td>2024-01-20</td>
                    <td>
                      <button className="btn btn-outline-primary btn-sm me-1">View</button>
                      <button className="btn btn-outline-success btn-sm">Download</button>
                    </td>
                  </tr>
                  <tr>
                    <td>Labor Report</td>
                    <td>January 2024</td>
                    <td><span className="badge bg-warning">Pending</span></td>
                    <td>-</td>
                    <td>
                      <button className="btn btn-outline-secondary btn-sm">Generate</button>
                    </td>
                  </tr>
          </tbody>
        </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // SETTINGS PAGE
  const renderSettings = () => (
    <div className="container-fluid py-4">
      <div className="row g-4">
        <div className="col-12">
          <h2 className="fw-bold mb-4">Settings</h2>
        </div>
        
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="fw-bold mb-3">Profile Settings</div>
            <form>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-control" value={user.name} />
            </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" value={user.email} />
          </div>
              <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input type="tel" className="form-control" value="+91 98765 43210" />
        </div>
              <div className="mb-3">
                <label className="form-label">Region</label>
                <select className="form-control">
                  <option>North Region</option>
                  <option>South Region</option>
                  <option>East Region</option>
                  <option>West Region</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary-custom">Save Changes</button>
            </form>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card mb-4">
            <div className="fw-bold mb-3">Notification Settings</div>
            <div className="form-check mb-3">
              <input className="form-check-input" type="checkbox" id="weatherAlerts" checked />
              <label className="form-check-label" for="weatherAlerts">
                Weather Alerts
              </label>
            </div>
            <div className="form-check mb-3">
              <input className="form-check-input" type="checkbox" id="cropUpdates" checked />
              <label className="form-check-label" for="cropUpdates">
                Crop Updates
              </label>
            </div>
            <div className="form-check mb-3">
              <input className="form-check-input" type="checkbox" id="marketPrices" />
              <label className="form-check-label" for="marketPrices">
                Market Price Updates
              </label>
            </div>
            <div className="form-check mb-3">
              <input className="form-check-input" type="checkbox" id="taskReminders" checked />
              <label className="form-check-label" for="taskReminders">
                Task Reminders
              </label>
            </div>
            <button className="btn btn-primary-custom">Save Preferences</button>
          </div>
        </div>

        <div className="col-12">
          <div className="card">
            <div className="fw-bold mb-3">Security Settings</div>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Current Password</label>
                  <input type="password" className="form-control" />
            </div>
                <div className="mb-3">
                  <label className="form-label">New Password</label>
                  <input type="password" className="form-control" />
          </div>
                <div className="mb-3">
                  <label className="form-label">Confirm New Password</label>
                  <input type="password" className="form-control" />
        </div>
                <button className="btn btn-primary-custom">Change Password</button>
              </div>
              <div className="col-md-6">
                <div className="alert alert-info">
                  <i className="fas fa-info-circle me-2"></i>
                  <strong>Password Requirements:</strong>
                  <ul className="mb-0 mt-2">
                    <li>At least 8 characters</li>
                    <li>Include uppercase and lowercase letters</li>
                    <li>Include numbers and special characters</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ACCOUNT PAGE
  const renderAccount = () => (
    <div className="container-fluid py-4">
      <div className="row g-4">
        <div className="col-12">
          <h2 className="fw-bold mb-4">My Account</h2>
        </div>
        
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="text-center">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Profile" 
                   style={{width: 100, height: 100, borderRadius: '50%', objectFit: 'cover'}} />
              <div className="fw-bold fs-5 mt-3">{user.name}</div>
              <div className="text-muted">Farmer ID: {user.id}</div>
              <div className="text-muted">{user.email}</div>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card mb-4">
            <div className="fw-bold mb-3">Account Information</div>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label fw-bold">Registration Date</label>
                  <div>January 15, 2024</div>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Account Status</label>
                  <div><span className="badge bg-success">Active</span></div>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Region</label>
                  <div>North Region</div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label fw-bold">Total Crops</label>
                  <div>{crops.length}</div>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Total Revenue</label>
                  <div>₹{payments.reduce((sum, p) => sum + parseInt(p.total.replace('₹', '').replace(',', '')), 0).toLocaleString()}</div>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Last Login</label>
                  <div>Today, 10:30 AM</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="card">
            <div className="fw-bold mb-3">Account Activity</div>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Activity</th>
                    <th>Date & Time</th>
                    <th>IP Address</th>
                    <th>Device</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Login</td>
                    <td>2024-01-20 10:30 AM</td>
                    <td>192.168.1.100</td>
                    <td>Chrome - Windows</td>
                  </tr>
                  <tr>
                    <td>Crop Registration</td>
                    <td>2024-01-19 02:15 PM</td>
                    <td>192.168.1.100</td>
                    <td>Chrome - Windows</td>
                  </tr>
                  <tr>
                    <td>Payment Made</td>
                    <td>2024-01-18 09:45 AM</td>
                    <td>192.168.1.100</td>
                    <td>Chrome - Windows</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // HELP PAGE
  const renderHelp = () => (
    <div className="container-fluid py-4">
      <div className="row g-4">
        <div className="col-12">
          <h2 className="fw-bold mb-4">Help & Support</h2>
        </div>
        
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="fw-bold mb-3">Frequently Asked Questions</div>
            <div className="accordion" id="faqAccordion">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                    How do I register a new crop?
            </button>
                </h2>
                <div id="faq1" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                  <div className="accordion-body">
                    To register a new crop, go to the Dashboard and click on "Register New Crop". Fill in the required information including crop name, start date, end date, quantity, and expected price. Submit the form and your agent will review the request.
          </div>
        </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                    How can I contact my assigned agent?
                  </button>
                </h2>
                <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div className="accordion-body">
                    You can find your assigned agent's contact information in the "Agent Contact" section. You can call, message, or schedule a meeting with your agent directly through the platform.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                    What are the payment terms?
                  </button>
                </h2>
                <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div className="accordion-body">
                    The payment structure includes estimated cultivation cost, 25% service fee, and 15% profit share. Payments are processed after crop harvest and quality verification.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card mb-4">
            <div className="fw-bold mb-3">Contact Support</div>
            <div className="mb-3">
              <div className="fw-bold">Phone Support</div>
              <div>+91 1800-123-4567</div>
              <div className="small text-muted">Available 24/7</div>
            </div>
            <div className="mb-3">
              <div className="fw-bold">Email Support</div>
              <div>support@farmering.com</div>
              <div className="small text-muted">Response within 24 hours</div>
            </div>
            <div className="mb-3">
              <div className="fw-bold">Live Chat</div>
              <button className="btn btn-outline-success btn-sm">Start Chat</button>
            </div>
          </div>

          <div className="card mb-4">
            <div className="fw-bold mb-3">Quick Actions</div>
            <button className="btn btn-outline-primary w-100 mb-2">
              <i className="fas fa-download me-2"></i>Download User Guide
              </button>
            <button className="btn btn-outline-info w-100 mb-2">
              <i className="fas fa-video me-2"></i>Watch Tutorial Videos
            </button>
            <button className="btn btn-outline-warning w-100">
              <i className="fas fa-bug me-2"></i>Report an Issue
            </button>
        </div>
        </div>
      </div>
    </div>
  );

  // Render main content based on sidebar selection
  const renderContent = () => {
    switch (activeSidebar) {
      case 'dashboard':
        return (
          <div>
            <div className="row mb-4">
              <div className="col-md-3 mb-3">
                <div className="card text-center">
                  <div className="card-body">
                    <i className="fas fa-seedling fa-2x text-success mb-2"></i>
                    <h5 className="card-title">Total Crops</h5>
                    <h3 className="text-success">{quickStats.totalCrops}</h3>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="card text-center">
                  <div className="card-body">
                    <i className="fas fa-rupee-sign fa-2x text-primary mb-2"></i>
                    <h5 className="card-title">Total Earnings</h5>
                    <h3 className="text-primary">₹{quickStats.earnings.toLocaleString()}</h3>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="card text-center">
                  <div className="card-body">
                    <i className="fas fa-bell fa-2x text-warning mb-2"></i>
                    <h5 className="card-title">Notifications</h5>
                    <h3 className="text-warning">{quickStats.unreadNotifications}</h3>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="card text-center">
                  <div className="card-body">
                    <i className="fas fa-tasks fa-2x text-info mb-2"></i>
                    <h5 className="card-title">Active Tasks</h5>
                    <h3 className="text-info">{quickStats.activeTasks}</h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-8">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">Recent Activities</h5>
                  </div>
                  <div className="card-body">
                    <div className="d-flex justify-content-between mb-3">
                      <input 
                        type="text" 
                        className="form-control me-2" 
                        placeholder="Search activities..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <select 
                        className="form-select" 
                        style={{width: 'auto'}}
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                      >
                        <option value="date">Sort by Date</option>
                        <option value="type">Sort by Type</option>
                      </select>
                    </div>
                    <div className="list-group">
                      {recentActivities
                        .filter(activity => 
                          activity.message.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map(activity => (
                          <div key={activity.id} className="list-group-item d-flex align-items-center">
                            <i className={`${activity.icon} ${activity.color} me-3`}></i>
                            <div className="flex-grow-1">
                              <div className="fw-bold">{activity.message}</div>
                              <small className="text-muted">{activity.time}</small>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">Weather Update</h5>
                  </div>
                  <div className="card-body text-center">
                    <i className="fas fa-cloud-sun fa-3x text-warning mb-3"></i>
                    <h4>{weatherData.temperature}</h4>
                    <p className="text-muted">{weatherData.condition}</p>
                    <div className="row text-center">
                      <div className="col-4">
                        <div className="text-center">
                          <i className="fas fa-thermometer-half text-danger mb-2"></i>
                          <div className="fw-bold">High</div>
                          <div className="text-muted">{weatherData.high}</div>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="text-center">
                          <i className="fas fa-thermometer-empty text-info mb-2"></i>
                          <div className="fw-bold">Low</div>
                          <div className="text-muted">{weatherData.low}</div>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="text-center">
                          <i className="fas fa-tint text-primary mb-2"></i>
                          <div className="fw-bold">Humidity</div>
                          <div className="text-muted">{weatherData.humidity}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'crops':
        return (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4>Crop Management</h4>
              <button className="btn btn-primary-custom" onClick={() => setActiveTab('add-crop')}>
                <i className="fas fa-plus me-2"></i>Add New Crop
              </button>
            </div>

            {activeTab === 'add-crop' ? (
              <div className="card">
                <div className="card-header">
                  <h5 className="mb-0">Register New Crop</h5>
                </div>
                <div className="card-body">
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    if (cropForm.cropName && cropForm.startDate) {
                      const newCrop = { ...cropForm, id: Date.now() };
                      setCrops([...crops, newCrop]);
                      setCropForm({ cropName: '', startDate: '', endDate: '', quantity: '', price: '', status: 'pending' });
                      showToast('Crop registered successfully!', 'success');
                    }
                  }}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Crop Name</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          value={cropForm.cropName}
                          onChange={(e) => setCropForm({...cropForm, cropName: e.target.value})}
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Start Date</label>
                        <input 
                          type="date" 
                          className="form-control" 
                          value={cropForm.startDate}
                          onChange={(e) => setCropForm({...cropForm, startDate: e.target.value})}
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Expected End Date</label>
                        <input 
                          type="date" 
                          className="form-control" 
                          value={cropForm.endDate}
                          onChange={(e) => setCropForm({...cropForm, endDate: e.target.value})}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Quantity (kg)</label>
                        <input 
                          type="number" 
                          className="form-control" 
                          value={cropForm.quantity}
                          onChange={(e) => setCropForm({...cropForm, quantity: e.target.value})}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Expected Price (₹/kg)</label>
                        <input 
                          type="number" 
                          className="form-control" 
                          value={cropForm.price}
                          onChange={(e) => setCropForm({...cropForm, price: e.target.value})}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Status</label>
                        <select 
                          className="form-select" 
                          value={cropForm.status}
                          onChange={(e) => setCropForm({...cropForm, status: e.target.value})}
                        >
                          <option value="pending">Pending</option>
                          <option value="planted">Planted</option>
                          <option value="growing">Growing</option>
                          <option value="ready">Ready for Harvest</option>
                        </select>
                      </div>
                    </div>
                    <div className="d-flex gap-2">
                      <button type="submit" className="btn btn-primary-custom">Register Crop</button>
                      <button type="button" className="btn btn-outline-secondary" onClick={() => setActiveTab('list')}>
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              <div className="card">
                <div className="card-header">
                  <h5 className="mb-0">My Crops</h5>
                </div>
                <div className="card-body">
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Crop Name</th>
                          <th>Start Date</th>
                          <th>End Date</th>
                          <th>Quantity</th>
                          <th>Price</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {crops.map(crop => (
                          <tr key={crop.id}>
                            <td>{crop.cropName}</td>
                            <td>{crop.startDate}</td>
                            <td>{crop.endDate}</td>
                            <td>{crop.quantity} kg</td>
                            <td>₹{crop.price}/kg</td>
                            <td>
                              <span className={`badge bg-${crop.status === 'ready' ? 'success' : crop.status === 'growing' ? 'warning' : 'secondary'}`}>
                                {crop.status}
                              </span>
                            </td>
                            <td>
                              <button className="btn btn-sm btn-outline-primary me-1">Edit</button>
                              <button className="btn btn-sm btn-outline-danger">Delete</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'notifications':
        return (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4>Notifications</h4>
              <button className="btn btn-outline-secondary btn-sm">
                <i className="fas fa-check-double me-2"></i>Mark All Read
              </button>
            </div>
            <div className="card">
              <div className="card-body">
                {notifications.length === 0 ? (
                  <div className="text-center py-4">
                    <i className="fas fa-bell fa-3x text-muted mb-3"></i>
                    <h5 className="text-muted">No notifications</h5>
                    <p className="text-muted">You're all caught up!</p>
                  </div>
                ) : (
                  <div className="list-group">
                    {notifications.map(notification => (
                      <div key={notification.id} className={`list-group-item ${!notification.read ? 'border-start border-warning border-3' : ''}`}>
                        <div className="d-flex justify-content-between align-items-start">
                          <div className="flex-grow-1">
                            <h6 className="mb-1">{notification.title}</h6>
                            <p className="mb-1">{notification.message}</p>
                            <small className="text-muted">{notification.time}</small>
                          </div>
                          <div className="ms-3">
                            <button className="btn btn-sm btn-outline-primary">View</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'media':
        return (
          <div>
            <h4 className="mb-4">Media Upload</h4>
            <div className="row">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">Upload New Media</h5>
                  </div>
                  <div className="card-body">
                    <form>
                      <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea 
                          className="form-control" 
                          rows="3"
                          value={mediaUpload.description}
                          onChange={(e) => setMediaUpload({...mediaUpload, description: e.target.value})}
                          placeholder="Describe your upload..."
                        ></textarea>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Upload File</label>
                        <input 
                          type="file" 
                          className="form-control" 
                          accept="image/*,video/*"
                          onChange={(e) => setMediaUpload({...mediaUpload, file: e.target.files[0]})}
                        />
                      </div>
                      <button type="submit" className="btn btn-primary-custom">
                        <i className="fas fa-upload me-2"></i>Upload Media
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">Recent Uploads</h5>
                  </div>
                  <div className="card-body">
                    <div className="text-center py-4">
                      <i className="fas fa-images fa-3x text-muted mb-3"></i>
                      <h6 className="text-muted">No uploads yet</h6>
                      <p className="text-muted">Upload your first media file</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'agents':
        return (
          <div>
            <h4 className="mb-4">Agent Contacts</h4>
            <div className="row">
              <div className="col-md-4 mb-4">
                <div className="card text-center">
                  <div className="card-body">
                    <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="Agent" className="rounded-circle mb-3" style={{width: 80, height: 80, objectFit: 'cover'}} />
                    <h5 className="card-title">Rajesh Kumar</h5>
                    <p className="text-muted">Senior Agricultural Agent</p>
                    <div className="mb-2">
                      <span className="badge bg-success">Available</span>
                    </div>
                    <div className="d-flex justify-content-center gap-2">
                      <button className="btn btn-sm btn-primary-custom">
                        <i className="fas fa-phone me-1"></i>Call
                      </button>
                      <button className="btn btn-sm btn-outline-success">
                        <i className="fas fa-comment me-1"></i>Message
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="card text-center">
                  <div className="card-body">
                    <img src="https://randomuser.me/api/portraits/women/32.jpg" alt="Agent" className="rounded-circle mb-3" style={{width: 80, height: 80, objectFit: 'cover'}} />
                    <h5 className="card-title">Priya Sharma</h5>
                    <p className="text-muted">Crop Specialist</p>
                    <div className="mb-2">
                      <span className="badge bg-warning">Busy</span>
                    </div>
                    <div className="d-flex justify-content-center gap-2">
                      <button className="btn btn-sm btn-primary-custom">
                        <i className="fas fa-phone me-1"></i>Call
                      </button>
                      <button className="btn btn-sm btn-outline-success">
                        <i className="fas fa-comment me-1"></i>Message
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="card text-center">
                  <div className="card-body">
                    <img src="https://randomuser.me/api/portraits/men/67.jpg" alt="Agent" className="rounded-circle mb-3" style={{width: 80, height: 80, objectFit: 'cover'}} />
                    <h5 className="card-title">Amit Singh</h5>
                    <p className="text-muted">Technical Support</p>
                    <div className="mb-2">
                      <span className="badge bg-success">Available</span>
                    </div>
                    <div className="d-flex justify-content-center gap-2">
                      <button className="btn btn-sm btn-primary-custom">
                        <i className="fas fa-phone me-1"></i>Call
                      </button>
                      <button className="btn btn-sm btn-outline-success">
                        <i className="fas fa-comment me-1"></i>Message
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'payments':
        return (
          <div>
            <h4 className="mb-4">Payment Management</h4>
            <div className="row">
              <div className="col-md-8">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">Payment History</h5>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>2024-01-15</td>
                            <td>Wheat Harvest Payment</td>
                            <td>₹15,000</td>
                            <td><span className="badge bg-success">Completed</span></td>
                            <td>
                              <button className="btn btn-sm btn-outline-primary">View</button>
                            </td>
                          </tr>
                          <tr>
                            <td>2024-01-10</td>
                            <td>Rice Crop Payment</td>
                            <td>₹12,500</td>
                            <td><span className="badge bg-success">Completed</span></td>
                            <td>
                              <button className="btn btn-sm btn-outline-primary">View</button>
                            </td>
                          </tr>
                          <tr>
                            <td>2024-01-05</td>
                            <td>Corn Harvest Payment</td>
                            <td>₹8,750</td>
                            <td><span className="badge bg-warning">Pending</span></td>
                            <td>
                              <button className="btn btn-sm btn-outline-primary">View</button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">Payment Summary</h5>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <div className="d-flex justify-content-between">
                        <span>Total Earnings</span>
                        <span className="fw-bold">₹36,250</span>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between">
                        <span>This Month</span>
                        <span className="fw-bold text-success">₹27,500</span>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between">
                        <span>Pending</span>
                        <span className="fw-bold text-warning">₹8,750</span>
                      </div>
                    </div>
                    <hr />
                    <button className="btn btn-primary-custom w-100">
                      <i className="fas fa-download me-2"></i>Download Statement
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'weather':
        return (
          <div>
            <h4 className="mb-4">Weather Information</h4>
            <div className="row">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">Current Weather</h5>
                  </div>
                  <div className="card-body text-center">
                    <i className="fas fa-cloud-sun fa-4x text-warning mb-3"></i>
                    <h2>{weatherData.temperature}</h2>
                    <h5 className="text-muted">{weatherData.condition}</h5>
                    <p className="text-muted">{weatherData.location}</p>
                    <div className="row mt-4">
                      <div className="col-4">
                        <div className="text-center">
                          <i className="fas fa-thermometer-half text-danger mb-2"></i>
                          <div className="fw-bold">High</div>
                          <div className="text-muted">{weatherData.high}</div>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="text-center">
                          <i className="fas fa-thermometer-empty text-info mb-2"></i>
                          <div className="fw-bold">Low</div>
                          <div className="text-muted">{weatherData.low}</div>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="text-center">
                          <i className="fas fa-tint text-primary mb-2"></i>
                          <div className="fw-bold">Humidity</div>
                          <div className="text-muted">{weatherData.humidity}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">Weather Forecast</h5>
                  </div>
                  <div className="card-body">
                    <div className="list-group">
                      <div className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                          <div className="fw-bold">Tomorrow</div>
                          <small className="text-muted">Partly Cloudy</small>
                        </div>
                        <div className="text-end">
                          <div className="fw-bold">28°C</div>
                          <small className="text-muted">22°C</small>
                        </div>
                      </div>
                      <div className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                          <div className="fw-bold">Wednesday</div>
                          <small className="text-muted">Sunny</small>
                        </div>
                        <div className="text-end">
                          <div className="fw-bold">30°C</div>
                          <small className="text-muted">24°C</small>
                        </div>
                      </div>
                      <div className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                          <div className="fw-bold">Thursday</div>
                          <small className="text-muted">Light Rain</small>
                        </div>
                        <div className="text-end">
                          <div className="fw-bold">26°C</div>
                          <small className="text-muted">20°C</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'soil':
        return (
          <div>
            <h4 className="mb-4">Soil Health Analysis</h4>
            <div className="row">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">Soil Parameters</h5>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span>pH Level</span>
                        <span className="fw-bold">{soilHealth.ph}</span>
                      </div>
                      <div className="progress">
                        <div className="progress-bar bg-success" style={{width: '68%'}}></div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span>Nitrogen (N)</span>
                        <span className="fw-bold">{soilHealth.nitrogen}</span>
                      </div>
                      <div className="progress">
                        <div className="progress-bar bg-primary" style={{width: '85%'}}></div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span>Phosphorus (P)</span>
                        <span className="fw-bold">{soilHealth.phosphorus}</span>
                      </div>
                      <div className="progress">
                        <div className="progress-bar bg-warning" style={{width: '60%'}}></div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span>Potassium (K)</span>
                        <span className="fw-bold">{soilHealth.potassium}</span>
                      </div>
                      <div className="progress">
                        <div className="progress-bar bg-info" style={{width: '80%'}}></div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span>Moisture</span>
                        <span className="fw-bold">{soilHealth.moisture}</span>
                      </div>
                      <div className="progress">
                        <div className="progress-bar bg-success" style={{width: '75%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">Recommendations</h5>
                  </div>
                  <div className="card-body">
                    <div className="alert alert-success">
                      <i className="fas fa-check-circle me-2"></i>
                      <strong>Good News!</strong> Your soil health is excellent for wheat cultivation.
                    </div>
                    <div className="alert alert-warning">
                      <i className="fas fa-exclamation-triangle me-2"></i>
                      <strong>Phosphorus Level:</strong> Consider adding phosphorus-rich fertilizers.
                    </div>
                    <div className="alert alert-info">
                      <i className="fas fa-info-circle me-2"></i>
                      <strong>Next Test:</strong> Schedule soil testing in 3 months.
                    </div>
                    <button className="btn btn-primary-custom w-100 mt-3">
                      <i className="fas fa-calendar me-2"></i>Schedule Soil Test
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-5">
            <i className="fas fa-tachometer-alt fa-3x text-muted mb-3"></i>
            <h4 className="text-muted">Welcome to your Dashboard</h4>
            <p className="text-muted">Select a section from the sidebar to get started.</p>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-root">
      {renderSidebar()}
      <div className="dashboard-content">
        {renderTopbar()}
        {renderContent()}
      </div>
    </div>
  );
};

export default FarmerDashboard; 