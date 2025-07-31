import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContext } from '../context/ToastContext';
import { AuthContext } from '../context/AuthContext';

const sidebarLinks = [
  { id: 'dashboard', icon: 'fas fa-home', label: 'Dashboard' },
  { id: 'consultations', icon: 'fas fa-comments', label: 'Consultations' },
  { id: 'farmers', icon: 'fas fa-users', label: 'My Farmers' },
  { id: 'earnings', icon: 'fas fa-dollar-sign', label: 'Earnings' },
  { id: 'knowledge', icon: 'fas fa-graduation-cap', label: 'Knowledge Base' },
  { id: 'analytics', icon: 'fas fa-chart-bar', label: 'Analytics' },
  { id: 'setting', icon: 'fas fa-cog', label: 'Setting' },
  { id: 'account', icon: 'fas fa-user', label: 'My Account' },
  { id: 'help', icon: 'fas fa-question-circle', label: 'Help & Support' },
];

const AgentDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);

  if (!user) {
    useEffect(() => { navigate('/agent-login'); }, [navigate]);
    return <div className="d-flex justify-content-center align-items-center" style={{height: '80vh'}}><div className="loading-spinner"></div></div>;
  }
  const [activeSidebar, setActiveSidebar] = useState('dashboard');
  const [farmers, setFarmers] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [cropSupport, setCropSupport] = useState([]);
  const [aiTools, setAiTools] = useState([]);
  const [regionalMetrics, setRegionalMetrics] = useState({});
  const [payments, setPayments] = useState([]);

  const [quickStats, setQuickStats] = useState({
    farmersManaged: 45,
    supportTickets: 12,
    earnings: 75000,
    pendingRequests: 8
  });
  const [recentActivities, setRecentActivities] = useState([
    { id: 1, type: 'farmer', message: 'New farmer registration: John Doe', time: '1 hour ago', icon: 'fas fa-user-plus', color: 'text-success' },
    { id: 2, type: 'support', message: 'Resolved ticket #1234', time: '3 hours ago', icon: 'fas fa-headset', color: 'text-primary' },
    { id: 3, type: 'payment', message: 'Processed payment: ₹25,000', time: '1 day ago', icon: 'fas fa-rupee-sign', color: 'text-warning' },
    { id: 4, type: 'request', message: 'New support request received', time: '2 days ago', icon: 'fas fa-question-circle', color: 'text-info' }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [filterStatus, setFilterStatus] = useState('all');

  const handleQuickStatClick = (statType) => {
    showToast(`Viewing ${statType} details`, 'info');
    // Navigate to respective sections
    switch(statType) {
      case 'farmers':
        setActiveSidebar('farmers');
        break;
      case 'support':
        setActiveSidebar('support');
        break;
      case 'earnings':
        setActiveSidebar('payments');
        break;
      case 'requests':
        setActiveSidebar('requests');
        break;
    }
  };

  const handleActivityClick = (activity) => {
    showToast(`Viewing ${activity.type} activity`, 'info');
    // Navigate to respective sections
    switch(activity.type) {
      case 'farmer':
        setActiveSidebar('farmers');
        break;
      case 'support':
        setActiveSidebar('support');
        break;
      case 'payment':
        setActiveSidebar('payments');
        break;
      case 'request':
        setActiveSidebar('requests');
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
    setFarmers([
      { id: 1, name: 'John Farmer', email: 'john@example.com', phone: '+91 98765 43210', region: 'North', crops: ['Rice', 'Wheat'], status: 'active', joinDate: '2024-01-15' },
      { id: 2, name: 'Sarah Farmer', email: 'sarah@example.com', phone: '+91 98765 43211', region: 'South', crops: ['Corn'], status: 'pending', joinDate: '2024-01-20' },
      { id: 3, name: 'Mike Farmer', email: 'mike@example.com', phone: '+91 98765 43212', region: 'East', crops: ['Rice', 'Corn'], status: 'active', joinDate: '2024-01-10' },
      { id: 4, name: 'Lisa Farmer', email: 'lisa@example.com', phone: '+91 98765 43213', region: 'West', crops: ['Wheat'], status: 'rejected', joinDate: '2024-01-18' }
    ]);
    setPendingRequests([
      { id: 1, farmerName: 'Sarah Farmer', cropType: 'Corn', requestType: 'Registration', status: 'pending', date: '2024-01-20' },
      { id: 2, farmerName: 'Mike Farmer', cropType: 'Rice', requestType: 'Support', status: 'pending', date: '2024-01-19' }
    ]);
    setCropSupport([
      { id: 1, crop: 'Rice', farmers: 15, issues: 3, resolved: 2, pending: 1 },
      { id: 2, crop: 'Wheat', farmers: 12, issues: 2, resolved: 1, pending: 1 },
      { id: 3, crop: 'Corn', farmers: 8, issues: 1, resolved: 1, pending: 0 }
    ]);
    setAiTools([
      { id: 1, name: 'Crop Prediction', usage: 45, accuracy: '92%', lastUsed: '2024-01-20' },
      { id: 2, name: 'Pesticide Recommendation', usage: 32, accuracy: '88%', lastUsed: '2024-01-19' },
      { id: 3, name: 'Price Prediction', usage: 28, accuracy: '85%', lastUsed: '2024-01-18' }
    ]);
    setRegionalMetrics({
      totalFarmers: 35,
      activeFarmers: 28,
      totalRevenue: '₹2,50,000',
      monthlyGrowth: '+12%',
      topRegion: 'North',
      topCrop: 'Rice'
    });
    setPayments([
      { id: 1, farmer: 'John Farmer', service: 'Rice Cultivation', amount: '₹11,875', status: 'paid', date: '2024-01-15' },
      { id: 2, farmer: 'Mike Farmer', service: 'Corn Cultivation', amount: '₹7,000', status: 'pending', date: '2024-01-20' },
      { id: 3, farmer: 'Lisa Farmer', service: 'Wheat Cultivation', amount: '₹8,850', status: 'paid', date: '2024-01-10' }
    ]);
  }, []);

  // TOPBAR
  const renderTopbar = () => (
    <div className="topbar">
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <h4 className="mb-0 me-3">Welcome back, {user.name}!</h4>
          <span className="badge bg-primary">{user.role}</span>
        </div>
        <div className="d-flex align-items-center">
          <div className="search-box me-3">
            <i className="fas fa-search me-2"></i>
            <input type="text" placeholder="Search..." className="border-0 bg-transparent" />
          </div>
          <div className="profile d-flex align-items-center">
            <img src={user.profilePic || 'https://randomuser.me/api/portraits/men/45.jpg'} alt="Profile" className="profile-img me-2" />
            <div className="dropdown">
              <button className="btn btn-link dropdown-toggle text-dark text-decoration-none" type="button" data-bs-toggle="dropdown">
                {user.name}
              </button>
              <ul className="dropdown-menu">
                <li><button className="dropdown-item" onClick={() => navigate('/profile')}>My Profile</button></li>
                <li><button className="dropdown-item" onClick={logout}>Logout</button></li>
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
        <i className="fas fa-user-tie me-2"></i>
        <span>Agent Dashboard</span>
      </div>
      <nav className="nav flex-column">
        <button className={`nav-link ${activeSidebar === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveSidebar('dashboard')}>
          <i className="fas fa-tachometer-alt me-2"></i>
          Dashboard
        </button>
        <button className={`nav-link ${activeSidebar === 'farmers' ? 'active' : ''}`} onClick={() => setActiveSidebar('farmers')}>
          <i className="fas fa-users me-2"></i>
          Farmer Management
        </button>
        <button className={`nav-link ${activeSidebar === 'crops' ? 'active' : ''}`} onClick={() => setActiveSidebar('crops')}>
          <i className="fas fa-seedling me-2"></i>
          Crop Support
        </button>
        <button className={`nav-link ${activeSidebar === 'ai-tools' ? 'active' : ''}`} onClick={() => setActiveSidebar('ai-tools')}>
          <i className="fas fa-robot me-2"></i>
          AI Tools
        </button>
        <button className={`nav-link ${activeSidebar === 'metrics' ? 'active' : ''}`} onClick={() => setActiveSidebar('metrics')}>
          <i className="fas fa-chart-bar me-2"></i>
          Regional Metrics
        </button>
        <button className={`nav-link ${activeSidebar === 'payments' ? 'active' : ''}`} onClick={() => setActiveSidebar('payments')}>
          <i className="fas fa-rupee-sign me-2"></i>
          Payment System
        </button>
        <button className={`nav-link ${activeSidebar === 'reports' ? 'active' : ''}`} onClick={() => setActiveSidebar('reports')}>
          <i className="fas fa-file-alt me-2"></i>
          Reports
        </button>
      </nav>
    </div>
  );

  // MAIN DASHBOARD AREA
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
            <option value="farmer">Farmer Related</option>
            <option value="support">Support Tickets</option>
            <option value="payment">Payments</option>
            <option value="request">Requests</option>
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
            onClick={() => handleQuickStatClick('farmers')}
          >
            <i className="fas fa-users fa-2x text-success mb-2"></i>
            <div className="fw-bold fs-4">{quickStats.farmersManaged}</div>
            <div className="text-muted">Farmers Managed</div>
          </div>
        </div>
        <div className="col-md-3">
          <div 
            className="card text-center p-3 shadow-sm cursor-pointer" 
            style={{cursor: 'pointer', transition: 'all 0.3s ease'}}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            onClick={() => handleQuickStatClick('support')}
          >
            <i className="fas fa-headset fa-2x text-primary mb-2"></i>
            <div className="fw-bold fs-4">{quickStats.supportTickets}</div>
            <div className="text-muted">Support Tickets</div>
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
            <i className="fas fa-rupee-sign fa-2x text-warning mb-2"></i>
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
            onClick={() => handleQuickStatClick('requests')}
          >
            <i className="fas fa-user-clock fa-2x text-info mb-2"></i>
            <div className="fw-bold fs-4">{quickStats.pendingRequests}</div>
            <div className="text-muted">Pending Requests</div>
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
                      <span className={`badge bg-${activity.type === 'farmer' ? 'success' : activity.type === 'support' ? 'primary' : activity.type === 'payment' ? 'warning' : 'info'} me-2`}>
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
                <i className="fas fa-user-plus me-2"></i>Add New Farmer
              </button>
              <button className="btn btn-outline-primary btn-sm">
                <i className="fas fa-headset me-2"></i>Support Tickets
              </button>
              <button className="btn btn-outline-warning btn-sm">
                <i className="fas fa-rupee-sign me-2"></i>Process Payments
              </button>
              <button className="btn btn-outline-info btn-sm">
                <i className="fas fa-chart-line me-2"></i>View Reports
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
      <div className="col-md-6">
          <div className="card h-100">
            <div className="fw-bold mb-3">Farmer Overview</div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <div className="fw-bold fs-4" style={{color: '#4caf50'}}>{regionalMetrics.totalFarmers}</div>
                <div className="text-muted small">Total Farmers</div>
              </div>
              <div className="text-end">
                <div className="fw-bold fs-5">{regionalMetrics.activeFarmers}</div>
                <div className="text-success small">Active</div>
              </div>
            </div>
            <div className="progress" style={{height: 8, borderRadius: 4}}>
              <div className="progress-bar bg-success" style={{width: `${(regionalMetrics.activeFarmers/regionalMetrics.totalFarmers)*100}%`}}></div>
            </div>
            <div className="text-muted small mt-2">{regionalMetrics.monthlyGrowth} from last month</div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card h-100">
            <div className="fw-bold mb-3">Revenue Overview</div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <div className="fw-bold fs-4" style={{color: '#4caf50'}}>{regionalMetrics.totalRevenue}</div>
                <div className="text-muted small">Total Revenue</div>
              </div>
              <div className="text-end">
                <div className="fw-bold fs-5">{regionalMetrics.monthlyGrowth}</div>
                <div className="text-success small">Growth</div>
              </div>
            </div>
            <div className="d-flex justify-content-between small">
              <span>Top Region: {regionalMetrics.topRegion}</span>
              <span>Top Crop: {regionalMetrics.topCrop}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="card h-100">
            <div className="fw-bold mb-3">Recent Farmers</div>
          <div className="table-responsive">
              <table className="table table-sm">
              <thead>
                <tr>
                  <th>Name</th>
                    <th>Region</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {farmers.slice(0, 3).map(farmer => (
                  <tr key={farmer.id}>
                    <td>{farmer.name}</td>
                      <td>{farmer.region}</td>
                    <td>
                        <span className={`badge bg-${farmer.status === 'active' ? 'success' : farmer.status === 'pending' ? 'warning' : 'danger'}`}>
                        {farmer.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
            <button className="btn btn-outline-success btn-sm mt-2">View All Farmers</button>
        </div>
      </div>
      <div className="col-md-6">
          <div className="card h-100">
            <div className="fw-bold mb-3">Crop Support Overview</div>
            {cropSupport.map(crop => (
              <div key={crop.id} className="d-flex justify-content-between align-items-center mb-2">
                <div>
                  <div className="fw-bold">{crop.crop}</div>
                  <div className="small text-muted">{crop.farmers} farmers</div>
                </div>
                <div className="text-end">
                  <div className="fw-bold">{crop.resolved}/{crop.issues}</div>
                  <div className="small text-success">Resolved</div>
                </div>
            </div>
          ))}
            <button className="btn btn-outline-success btn-sm mt-2">View Details</button>
          </div>
        </div>
      </div>
    </div>
  );

  // FARMER MANAGEMENT PAGE
  const renderFarmerManagement = () => (
    <div className="container-fluid py-4">
      <div className="row g-4">
        <div className="col-12">
          <h2 className="fw-bold mb-4">Farmer Management</h2>
        </div>
        
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="fw-bold">All Farmers</div>
              <div className="d-flex gap-2">
                <select className="form-select form-select-sm" style={{width: 'auto'}}>
                  <option>All Regions</option>
                  <option>North</option>
                  <option>South</option>
                  <option>East</option>
                  <option>West</option>
                </select>
                <button className="btn btn-primary-custom btn-sm">+ Add Farmer</button>
        </div>
      </div>

          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                    <th>Email</th>
                    <th>Region</th>
                    <th>Crops</th>
                  <th>Status</th>
                    <th>Join Date</th>
                    <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {farmers.map(farmer => (
                  <tr key={farmer.id}>
                    <td>{farmer.name}</td>
                      <td>{farmer.email}</td>
                      <td>{farmer.region}</td>
                      <td>{farmer.crops.join(', ')}</td>
                      <td>
                        <span className={`badge bg-${farmer.status === 'active' ? 'success' : farmer.status === 'pending' ? 'warning' : 'danger'}`}>
                        {farmer.status}
                      </span>
                    </td>
                      <td>{farmer.joinDate}</td>
                      <td>
                        <button className="btn btn-outline-primary btn-sm me-1">View</button>
                        <button className="btn btn-outline-success btn-sm me-1">Edit</button>
                        <button className="btn btn-outline-info btn-sm">Contact</button>
                      </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

        <div className="col-md-4">
          <div className="card mb-4">
            <div className="fw-bold mb-3">Farmer Statistics</div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <div className="fw-bold fs-4" style={{color: '#4caf50'}}>{farmers.length}</div>
                <div className="text-muted small">Total Farmers</div>
            </div>
              <div className="text-end">
                <div className="fw-bold fs-5">{farmers.filter(f => f.status === 'active').length}</div>
                <div className="text-success small">Active</div>
            </div>
            </div>
            <div className="progress mb-3" style={{height: 8}}>
              <div className="progress-bar bg-success" style={{width: `${(farmers.filter(f => f.status === 'active').length/farmers.length)*100}%`}}></div>
          </div>
            <div className="d-flex justify-content-between small">
              <span>Active: {farmers.filter(f => f.status === 'active').length}</span>
              <span>Pending: {farmers.filter(f => f.status === 'pending').length}</span>
            </div>
          </div>

          <div className="card mb-4">
            <div className="fw-bold mb-3">Quick Actions</div>
            <button className="btn btn-outline-success w-100 mb-2">
              <i className="fas fa-user-plus me-2"></i>Add New Farmer
            </button>
            <button className="btn btn-outline-primary w-100 mb-2">
              <i className="fas fa-envelope me-2"></i>Send Bulk Message
            </button>
            <button className="btn btn-outline-warning w-100 mb-2">
              <i className="fas fa-chart-bar me-2"></i>Generate Report
            </button>
            <button className="btn btn-outline-info w-100">
              <i className="fas fa-download me-2"></i>Export Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // CROP SUPPORT PAGE
  const renderCropSupport = () => (
    <div className="container-fluid py-4">
      <div className="row g-4">
        <div className="col-12">
          <h2 className="fw-bold mb-4">Crop Support Overview</h2>
        </div>
        
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="fw-bold mb-3">Crop-wise Support</div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Crop</th>
                    <th>Farmers</th>
                    <th>Total Issues</th>
                    <th>Resolved</th>
                    <th>Pending</th>
                    <th>Success Rate</th>
                    <th>Actions</th>
            </tr>
          </thead>
          <tbody>
                  {cropSupport.map(crop => (
              <tr key={crop.id}>
                      <td>{crop.crop}</td>
                      <td>{crop.farmers}</td>
                      <td>{crop.issues}</td>
                      <td>{crop.resolved}</td>
                      <td>{crop.pending}</td>
                      <td>
                        <span className={`badge bg-${(crop.resolved/crop.issues)*100 >= 80 ? 'success' : (crop.resolved/crop.issues)*100 >= 60 ? 'warning' : 'danger'}`}>
                          {Math.round((crop.resolved/crop.issues)*100)}%
                  </span>
                </td>
                      <td>
                        <button className="btn btn-outline-primary btn-sm me-1">View Details</button>
                        <button className="btn btn-outline-success btn-sm">Support</button>
                      </td>
              </tr>
            ))}
          </tbody>
        </table>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card mb-4">
            <div className="fw-bold mb-3">Support Statistics</div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <div className="fw-bold fs-4" style={{color: '#4caf50'}}>6</div>
                <div className="text-muted small">Total Issues</div>
              </div>
              <div className="text-end">
                <div className="fw-bold fs-5">4</div>
                <div className="text-success small">Resolved</div>
              </div>
            </div>
            <div className="progress mb-3" style={{height: 8}}>
              <div className="progress-bar bg-success" style={{width: '67%'}}></div>
            </div>
            <div className="d-flex justify-content-between small">
              <span>Resolved: 4</span>
              <span>Pending: 2</span>
            </div>
          </div>

          <div className="card mb-4">
            <div className="fw-bold mb-3">Recent Support Requests</div>
            {pendingRequests.map(request => (
              <div key={request.id} className="d-flex justify-content-between align-items-center mb-2 p-2 border rounded">
                <div>
                  <div className="fw-bold">{request.farmerName}</div>
                  <div className="small text-muted">{request.cropType} - {request.requestType}</div>
                </div>
                <span className="badge bg-warning text-dark">{request.status}</span>
              </div>
            ))}
            <button className="btn btn-outline-warning w-100 mt-2">View All Requests</button>
          </div>
        </div>
      </div>
    </div>
  );

  // AI TOOLS PAGE
  const renderAiTools = () => (
    <div className="container-fluid py-4">
      <div className="row g-4">
        <div className="col-12">
          <h2 className="fw-bold mb-4">AI Tools</h2>
                </div>
        
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="fw-bold mb-3">AI Tools Overview</div>
            <div className="row g-4">
              {aiTools.map(tool => (
                <div key={tool.id} className="col-md-6">
                  <div className="card h-100">
                    <div className="card-body text-center">
                      <i className={`fas fa-${tool.name === 'Crop Prediction' ? 'chart-line' : tool.name === 'Pesticide Recommendation' ? 'bug' : 'dollar-sign'} fa-3x text-primary mb-3`}></i>
                      <h5 className="fw-bold">{tool.name}</h5>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span>Usage: {tool.usage}</span>
                        <span className="text-success">Accuracy: {tool.accuracy}</span>
                      </div>
                      <div className="progress mb-3" style={{height: 8}}>
                        <div className="progress-bar bg-success" style={{width: `${tool.usage}%`}}></div>
                      </div>
                      <button className="btn btn-primary-custom btn-sm">Launch Tool</button>
                    </div>
              </div>
            </div>
          ))}
            </div>
        </div>
      </div>

        <div className="col-md-4">
          <div className="card mb-4">
            <div className="fw-bold mb-3">Tool Performance</div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <div className="fw-bold fs-4" style={{color: '#4caf50'}}>105</div>
                <div className="text-muted small">Total Uses</div>
                </div>
              <div className="text-end">
                <div className="fw-bold fs-5">88%</div>
                <div className="text-success small">Avg Accuracy</div>
              </div>
            </div>
            <div className="d-flex justify-content-between small">
              <span>Crop Prediction: 45</span>
              <span>Pesticide: 32</span>
                </div>
            <div className="d-flex justify-content-between small">
              <span>Price Prediction: 28</span>
              </div>
            </div>

          <div className="card mb-4">
            <div className="fw-bold mb-3">Recent Predictions</div>
            <div className="d-flex align-items-start mb-3">
              <div className="badge bg-primary me-2 mt-1">
                <i className="fas fa-chart-line"></i>
                </div>
              <div className="flex-grow-1">
                <div className="small">Rice prices expected to increase by 15% in next month</div>
                <div className="text-muted small">2 hours ago</div>
              </div>
            </div>
            <div className="d-flex align-items-start mb-3">
              <div className="badge bg-success me-2 mt-1">
                <i className="fas fa-bug"></i>
                </div>
              <div className="flex-grow-1">
                <div className="small">Apply neem-based pesticide to prevent pest infestation</div>
                <div className="text-muted small">1 day ago</div>
              </div>
            </div>
            <button className="btn btn-outline-primary w-100">View All Predictions</button>
          </div>
        </div>
      </div>
    </div>
  );

  // REGIONAL METRICS PAGE
  const renderRegionalMetrics = () => (
    <div className="container-fluid py-4">
      <div className="row g-4">
        <div className="col-12">
          <h2 className="fw-bold mb-4">Regional Metrics</h2>
        </div>
        
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="fw-bold mb-3">Regional Performance</div>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Region</th>
                    <th>Farmers</th>
                    <th>Revenue</th>
                    <th>Growth</th>
                    <th>Top Crop</th>
                    <th>Performance</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>North</td>
                    <td>15</td>
                    <td>₹4,50,000</td>
                    <td><span className="text-success">+15%</span></td>
                    <td>Rice</td>
                    <td><span className="badge bg-success">Excellent</span></td>
                  </tr>
                  <tr>
                    <td>South</td>
                    <td>12</td>
                    <td>₹3,80,000</td>
                    <td><span className="text-success">+12%</span></td>
                    <td>Wheat</td>
                    <td><span className="badge bg-warning">Good</span></td>
                  </tr>
                  <tr>
                    <td>East</td>
                    <td>18</td>
                    <td>₹4,20,000</td>
                    <td><span className="text-success">+18%</span></td>
                    <td>Corn</td>
                    <td><span className="badge bg-success">Excellent</span></td>
                  </tr>
                  <tr>
                    <td>West</td>
                    <td>10</td>
                    <td>₹2,50,000</td>
                    <td><span className="text-success">+8%</span></td>
                    <td>Wheat</td>
                    <td><span className="badge bg-info">Average</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card mb-4">
            <div className="fw-bold mb-3">Regional Summary</div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <div className="fw-bold fs-4" style={{color: '#4caf50'}}>55</div>
                <div className="text-muted small">Total Farmers</div>
              </div>
              <div className="text-end">
                <div className="fw-bold fs-5">₹15,00,000</div>
                <div className="text-success small">Total Revenue</div>
              </div>
            </div>
            <div className="d-flex justify-content-between small">
              <span>Top Region: North</span>
              <span>Growth: +13%</span>
            </div>
          </div>

          <div className="card mb-4">
            <div className="fw-bold mb-3">Quick Actions</div>
            <button className="btn btn-outline-primary w-100 mb-2">
              <i className="fas fa-chart-bar me-2"></i>Generate Report
            </button>
            <button className="btn btn-outline-success w-100 mb-2">
              <i className="fas fa-download me-2"></i>Export Data
            </button>
            <button className="btn btn-outline-warning w-100">
              <i className="fas fa-envelope me-2"></i>Send Alerts
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // PAYMENTS PAGE
  const renderPayments = () => (
    <div className="container-fluid py-4">
      <div className="row g-4">
        <div className="col-12">
          <h2 className="fw-bold mb-4">Payment Management</h2>
        </div>
        
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="fw-bold mb-3">Payment Transactions</div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Farmer</th>
              <th>Service</th>
                    <th>Amount</th>
                    <th>Date</th>
              <th>Status</th>
                    <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(payment => (
              <tr key={payment.id}>
                      <td>{payment.farmer}</td>
                <td>{payment.service}</td>
                      <td>{payment.amount}</td>
                      <td>{payment.date}</td>
                      <td>
                        <span className={`badge bg-${payment.status === 'paid' ? 'success' : 'warning'}`}>
                    {payment.status}
                  </span>
                </td>
                <td>
                        <button className="btn btn-outline-primary btn-sm me-1">View</button>
                        <button className="btn btn-outline-success btn-sm me-1">Generate Bill</button>
                        <button className="btn btn-outline-info btn-sm">Send Reminder</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
        </div>

        <div className="col-md-4">
          <div className="card mb-4">
            <div className="fw-bold mb-3">Payment Statistics</div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <div className="fw-bold fs-4" style={{color: '#4caf50'}}>₹26,725</div>
                <div className="text-muted small">Total Revenue</div>
        </div>
              <div className="text-end">
                <div className="fw-bold fs-5">2</div>
                <div className="text-success small">Paid</div>
      </div>
        </div>
            <div className="progress mb-3" style={{height: 8}}>
              <div className="progress-bar bg-success" style={{width: '67%'}}></div>
      </div>
            <div className="d-flex justify-content-between small">
              <span>Paid: ₹18,725</span>
              <span>Pending: ₹8,000</span>
        </div>
      </div>

          <div className="card mb-4">
            <div className="fw-bold mb-3">Quick Actions</div>
            <button className="btn btn-outline-success w-100 mb-2">
              <i className="fas fa-file-invoice me-2"></i>Generate Bill
            </button>
            <button className="btn btn-outline-warning w-100 mb-2">
              <i className="fas fa-bell me-2"></i>Send Reminders
            </button>
            <button className="btn btn-outline-info w-100 mb-2">
              <i className="fas fa-chart-pie me-2"></i>Payment Report
            </button>
            <button className="btn btn-outline-primary w-100">
              <i className="fas fa-download me-2"></i>Export Data
            </button>
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
              <input className="form-check-input" type="checkbox" id="farmerAlerts" checked />
              <label className="form-check-label" for="farmerAlerts">
                Farmer Registration Alerts
              </label>
          </div>
            <div className="form-check mb-3">
              <input className="form-check-input" type="checkbox" id="paymentAlerts" checked />
              <label className="form-check-label" for="paymentAlerts">
                Payment Notifications
              </label>
            </div>
            <div className="form-check mb-3">
              <input className="form-check-input" type="checkbox" id="supportRequests" checked />
              <label className="form-check-label" for="supportRequests">
                Support Request Alerts
              </label>
            </div>
            <div className="form-check mb-3">
              <input className="form-check-input" type="checkbox" id="aiPredictions" />
              <label className="form-check-label" for="aiPredictions">
                AI Prediction Updates
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
                    How do I manage farmer registrations?
            </button>
                </h2>
                <div id="faq1" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                  <div className="accordion-body">
                    Go to Farmer Management section to view all farmers. You can approve, reject, or edit farmer profiles. Use the filter options to find specific farmers by region or status.
          </div>
        </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                    How do I use AI tools for predictions?
            </button>
                </h2>
                <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div className="accordion-body">
                    Navigate to AI Tools section and select the tool you want to use. Enter the required parameters and the system will generate predictions that you can share with farmers.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                    How do I generate payment reports?
            </button>
                </h2>
                <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div className="accordion-body">
                    Go to Payments section and use the "Generate Report" option. You can filter by date range, farmer, or payment status to create detailed reports.
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
                    <i className="fas fa-users fa-2x text-primary mb-2"></i>
                    <h5 className="card-title">Total Farmers</h5>
                    <h3 className="text-primary">24</h3>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="card text-center">
                  <div className="card-body">
                    <i className="fas fa-seedling fa-2x text-success mb-2"></i>
                    <h5 className="card-title">Active Crops</h5>
                    <h3 className="text-success">18</h3>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="card text-center">
                  <div className="card-body">
                    <i className="fas fa-rupee-sign fa-2x text-warning mb-2"></i>
                    <h5 className="card-title">Revenue</h5>
                    <h3 className="text-warning">₹2.5L</h3>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="card text-center">
                  <div className="card-body">
                    <i className="fas fa-tasks fa-2x text-info mb-2"></i>
                    <h5 className="card-title">Pending Tasks</h5>
                    <h3 className="text-info">7</h3>
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
                    <div className="list-group">
                      <div className="list-group-item d-flex align-items-center">
                        <i className="fas fa-user-plus text-success me-3"></i>
                        <div className="flex-grow-1">
                          <div className="fw-bold">New farmer registered: Rajesh Kumar</div>
                          <small className="text-muted">2 hours ago</small>
                        </div>
                      </div>
                      <div className="list-group-item d-flex align-items-center">
                        <i className="fas fa-seedling text-primary me-3"></i>
                        <div className="flex-grow-1">
                          <div className="fw-bold">Crop support provided to 3 farmers</div>
                          <small className="text-muted">4 hours ago</small>
                        </div>
                      </div>
                      <div className="list-group-item d-flex align-items-center">
                        <i className="fas fa-robot text-info me-3"></i>
                        <div className="flex-grow-1">
                          <div className="fw-bold">AI prediction used for wheat crop</div>
                          <small className="text-muted">1 day ago</small>
                        </div>
                      </div>
                      <div className="list-group-item d-flex align-items-center">
                        <i className="fas fa-rupee-sign text-warning me-3"></i>
                        <div className="flex-grow-1">
                          <div className="fw-bold">Payment processed: ₹15,000</div>
                          <small className="text-muted">2 days ago</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">Quick Actions</h5>
                  </div>
                  <div className="card-body">
                    <button className="btn btn-primary-custom w-100 mb-2">
                      <i className="fas fa-user-plus me-2"></i>Add New Farmer
                    </button>
                    <button className="btn btn-outline-success w-100 mb-2">
                      <i className="fas fa-robot me-2"></i>Use AI Tools
                    </button>
                    <button className="btn btn-outline-warning w-100 mb-2">
                      <i className="fas fa-chart-bar me-2"></i>View Reports
                    </button>
                    <button className="btn btn-outline-info w-100">
                      <i className="fas fa-cog me-2"></i>Settings
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'farmers':
        return (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4>Farmer Management</h4>
              <button className="btn btn-primary-custom">
                <i className="fas fa-plus me-2"></i>Add New Farmer
              </button>
            </div>
            <div className="card">
              <div className="card-header">
                <div className="row align-items-center">
                  <div className="col-md-6">
                    <h5 className="mb-0">Registered Farmers</h5>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex gap-2">
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Search farmers..."
                      />
                      <select className="form-select" style={{width: 'auto'}}>
                        <option>All Status</option>
                        <option>Active</option>
                        <option>Pending</option>
                        <option>Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Farmer Name</th>
                        <th>Contact</th>
                        <th>Region</th>
                        <th>Crops</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="d-flex align-items-center">
                            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Farmer" className="rounded-circle me-2" style={{width: 35, height: 35, objectFit: 'cover'}} />
                            <div>
                              <div className="fw-bold">Rajesh Kumar</div>
                              <small className="text-muted">ID: F001</small>
                            </div>
                          </div>
                        </td>
                        <td>+91 98765 43210</td>
                        <td>North Region</td>
                        <td>Wheat, Rice</td>
                        <td><span className="badge bg-success">Active</span></td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary me-1">View</button>
                          <button className="btn btn-sm btn-outline-success">Support</button>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="d-flex align-items-center">
                            <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="Farmer" className="rounded-circle me-2" style={{width: 35, height: 35, objectFit: 'cover'}} />
                            <div>
                              <div className="fw-bold">Amit Singh</div>
                              <small className="text-muted">ID: F002</small>
                            </div>
                          </div>
                        </td>
                        <td>+91 98765 43211</td>
                        <td>South Region</td>
                        <td>Corn, Soybeans</td>
                        <td><span className="badge bg-success">Active</span></td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary me-1">View</button>
                          <button className="btn btn-sm btn-outline-success">Support</button>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="d-flex align-items-center">
                            <img src="https://randomuser.me/api/portraits/men/67.jpg" alt="Farmer" className="rounded-circle me-2" style={{width: 35, height: 35, objectFit: 'cover'}} />
                            <div>
                              <div className="fw-bold">Suresh Patel</div>
                              <small className="text-muted">ID: F003</small>
                            </div>
                          </div>
                        </td>
                        <td>+91 98765 43212</td>
                        <td>East Region</td>
                        <td>Cotton</td>
                        <td><span className="badge bg-warning">Pending</span></td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary me-1">View</button>
                          <button className="btn btn-sm btn-outline-success">Support</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );

      case 'crops':
        return (
          <div>
            <h4 className="mb-4">Crop Support Overview</h4>
            <div className="row">
              <div className="col-md-8">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">Crop Support Requests</h5>
                  </div>
                  <div className="card-body">
                    <div className="list-group">
                      <div className="list-group-item">
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <h6 className="mb-1">Wheat Disease Treatment</h6>
                            <p className="mb-1">Farmer: Rajesh Kumar | Region: North</p>
                            <small className="text-muted">Requested: 2 hours ago</small>
                          </div>
                          <span className="badge bg-warning">High Priority</span>
                        </div>
                      </div>
                      <div className="list-group-item">
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <h6 className="mb-1">Rice Irrigation Advice</h6>
                            <p className="mb-1">Farmer: Amit Singh | Region: South</p>
                            <small className="text-muted">Requested: 1 day ago</small>
                          </div>
                          <span className="badge bg-info">Medium Priority</span>
                        </div>
                      </div>
                      <div className="list-group-item">
                        <div className="d-flex justify-content-between align-items-start">
                          <div>
                            <h6 className="mb-1">Corn Fertilizer Recommendation</h6>
                            <p className="mb-1">Farmer: Suresh Patel | Region: East</p>
                            <small className="text-muted">Requested: 2 days ago</small>
                          </div>
                          <span className="badge bg-success">Low Priority</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">Support Statistics</h5>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <div className="d-flex justify-content-between">
                        <span>Total Requests</span>
                        <span className="fw-bold">24</span>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between">
                        <span>Resolved</span>
                        <span className="fw-bold text-success">18</span>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between">
                        <span>Pending</span>
                        <span className="fw-bold text-warning">6</span>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between">
                        <span>Success Rate</span>
                        <span className="fw-bold text-primary">75%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'ai-tools':
        return (
          <div>
            <h4 className="mb-4">AI Tools</h4>
            <div className="row">
              <div className="col-md-4 mb-4">
                <div className="card h-100">
                  <div className="card-header">
                    <h5 className="mb-0">
                      <i className="fas fa-seedling me-2"></i>Crop Prediction
                    </h5>
                  </div>
                  <div className="card-body">
                    <p className="text-muted">Predict crop yields and optimal planting times using AI.</p>
                    <div className="mb-3">
                      <label className="form-label">Select Crop</label>
                      <select className="form-select">
                        <option>Wheat</option>
                        <option>Rice</option>
                        <option>Corn</option>
                        <option>Cotton</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Region</label>
                      <select className="form-select">
                        <option>North Region</option>
                        <option>South Region</option>
                        <option>East Region</option>
                        <option>West Region</option>
                      </select>
                    </div>
                    <button className="btn btn-primary-custom w-100">
                      <i className="fas fa-magic me-2"></i>Generate Prediction
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="card h-100">
                  <div className="card-header">
                    <h5 className="mb-0">
                      <i className="fas fa-spray-can me-2"></i>Pesticide Recommendation
                    </h5>
                  </div>
                  <div className="card-body">
                    <p className="text-muted">Get AI-powered pesticide recommendations for crop protection.</p>
                    <div className="mb-3">
                      <label className="form-label">Crop Type</label>
                      <select className="form-select">
                        <option>Wheat</option>
                        <option>Rice</option>
                        <option>Corn</option>
                        <option>Cotton</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Disease/Issue</label>
                      <select className="form-select">
                        <option>Rust Disease</option>
                        <option>Powdery Mildew</option>
                        <option>Aphid Infestation</option>
                        <option>Root Rot</option>
                      </select>
                    </div>
                    <button className="btn btn-primary-custom w-100">
                      <i className="fas fa-search me-2"></i>Get Recommendation
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-4 mb-4">
                <div className="card h-100">
                  <div className="card-header">
                    <h5 className="mb-0">
                      <i className="fas fa-chart-line me-2"></i>Price Prediction
                    </h5>
                  </div>
                  <div className="card-body">
                    <p className="text-muted">Predict market prices for crops using historical data.</p>
                    <div className="mb-3">
                      <label className="form-label">Crop</label>
                      <select className="form-select">
                        <option>Wheat</option>
                        <option>Rice</option>
                        <option>Corn</option>
                        <option>Cotton</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Time Period</label>
                      <select className="form-select">
                        <option>Next Month</option>
                        <option>Next 3 Months</option>
                        <option>Next 6 Months</option>
                        <option>Next Year</option>
                      </select>
                    </div>
                    <button className="btn btn-primary-custom w-100">
                      <i className="fas fa-calculator me-2"></i>Predict Price
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'metrics':
        return (
          <div>
            <h4 className="mb-4">Regional Metrics</h4>
            <div className="row">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">Farmer Distribution</h5>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span>North Region</span>
                        <span className="fw-bold">8 Farmers</span>
                      </div>
                      <div className="progress">
                        <div className="progress-bar bg-primary" style={{width: '33%'}}></div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span>South Region</span>
                        <span className="fw-bold">6 Farmers</span>
                      </div>
                      <div className="progress">
                        <div className="progress-bar bg-success" style={{width: '25%'}}></div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span>East Region</span>
                        <span className="fw-bold">5 Farmers</span>
                      </div>
                      <div className="progress">
                        <div className="progress-bar bg-warning" style={{width: '21%'}}></div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span>West Region</span>
                        <span className="fw-bold">5 Farmers</span>
                      </div>
                      <div className="progress">
                        <div className="progress-bar bg-info" style={{width: '21%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">Revenue by Region</h5>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span>North Region</span>
                        <span className="fw-bold">₹85,000</span>
                      </div>
                      <div className="progress">
                        <div className="progress-bar bg-primary" style={{width: '34%'}}></div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span>South Region</span>
                        <span className="fw-bold">₹65,000</span>
                      </div>
                      <div className="progress">
                        <div className="progress-bar bg-success" style={{width: '26%'}}></div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span>East Region</span>
                        <span className="fw-bold">₹55,000</span>
                      </div>
                      <div className="progress">
                        <div className="progress-bar bg-warning" style={{width: '22%'}}></div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span>West Region</span>
                        <span className="fw-bold">₹45,000</span>
                      </div>
                      <div className="progress">
                        <div className="progress-bar bg-info" style={{width: '18%'}}></div>
                      </div>
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
            <h4 className="mb-4">Payment System</h4>
            <div className="row">
              <div className="col-md-8">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">Payment Transactions</h5>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Farmer</th>
                            <th>Crop</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>2024-01-15</td>
                            <td>Rajesh Kumar</td>
                            <td>Wheat</td>
                            <td>₹15,000</td>
                            <td><span className="badge bg-success">Completed</span></td>
                            <td>
                              <button className="btn btn-sm btn-outline-primary">View</button>
                            </td>
                          </tr>
                          <tr>
                            <td>2024-01-14</td>
                            <td>Amit Singh</td>
                            <td>Rice</td>
                            <td>₹12,500</td>
                            <td><span className="badge bg-success">Completed</span></td>
                            <td>
                              <button className="btn btn-sm btn-outline-primary">View</button>
                            </td>
                          </tr>
                          <tr>
                            <td>2024-01-13</td>
                            <td>Suresh Patel</td>
                            <td>Corn</td>
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
                        <span>Total Processed</span>
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
                    <button className="btn btn-primary-custom w-100 mb-2">
                      <i className="fas fa-plus me-2"></i>Create New Payment
                    </button>
                    <button className="btn btn-outline-secondary w-100">
                      <i className="fas fa-download me-2"></i>Export Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'reports':
        return (
          <div>
            <h4 className="mb-4">Reports</h4>
            <div className="row">
              <div className="col-md-6 mb-4">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">Monthly Report</h5>
                  </div>
                  <div className="card-body">
                    <p className="text-muted">Generate comprehensive monthly reports for all farmers and crops.</p>
                    <div className="mb-3">
                      <label className="form-label">Select Month</label>
                      <select className="form-select">
                        <option>January 2024</option>
                        <option>December 2023</option>
                        <option>November 2023</option>
                      </select>
                    </div>
                    <button className="btn btn-primary-custom w-100">
                      <i className="fas fa-file-pdf me-2"></i>Generate Report
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">Crop Analysis Report</h5>
                  </div>
                  <div className="card-body">
                    <p className="text-muted">Detailed analysis of crop performance and recommendations.</p>
                    <div className="mb-3">
                      <label className="form-label">Select Crop</label>
                      <select className="form-select">
                        <option>Wheat</option>
                        <option>Rice</option>
                        <option>Corn</option>
                        <option>All Crops</option>
                      </select>
                    </div>
                    <button className="btn btn-primary-custom w-100">
                      <i className="fas fa-chart-bar me-2"></i>Generate Analysis
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
            <i className="fas fa-user-tie fa-3x text-muted mb-3"></i>
            <h4 className="text-muted">Welcome to Agent Dashboard</h4>
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

export default AgentDashboard; 