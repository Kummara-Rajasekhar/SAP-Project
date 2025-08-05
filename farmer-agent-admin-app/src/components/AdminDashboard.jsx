import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContext } from '../context/ToastContext';
import { AuthContext } from '../context/AuthContext';

const sidebarLinks = [
  { id: 'dashboard', icon: 'fas fa-home', label: 'Dashboard' },
  { id: 'users', icon: 'fas fa-users', label: 'User Management' },
  { id: 'analytics', icon: 'fas fa-chart-bar', label: 'Analytics' },
  { id: 'settings', icon: 'fas fa-cog', label: 'Settings' },
  { id: 'support', icon: 'fas fa-headset', label: 'Support' },
  { id: 'reports', icon: 'fas fa-file-alt', label: 'Reports' },
  { id: 'account', icon: 'fas fa-user', label: 'My Account' },
  { id: 'help', icon: 'fas fa-question-circle', label: 'Help & Support' },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);

  if (!user) {
    useEffect(() => { navigate('/admin-login'); }, [navigate]);
    return <div className="d-flex justify-content-center align-items-center" style={{height: '80vh'}}><div className="loading-spinner"></div></div>;
  }
  const [activeSidebar, setActiveSidebar] = useState('dashboard');
  const [agents, setAgents] = useState([]);
  const [revenueData, setRevenueData] = useState({});
  const [analytics, setAnalytics] = useState({});
  const [recentActivities, setRecentActivities] = useState([
    { id: 1, type: 'agent', message: 'New agent approved: Sarah Wilson', time: '2 hours ago', icon: 'fas fa-user-tie', color: 'text-success' },
    { id: 2, type: 'revenue', message: 'Monthly revenue report generated', time: '4 hours ago', icon: 'fas fa-chart-line', color: 'text-warning' },
    { id: 3, type: 'report', message: 'Analytics report completed', time: '1 day ago', icon: 'fas fa-file-alt', color: 'text-info' },
    { id: 4, type: 'farmer', message: '500 new farmers registered', time: '2 days ago', icon: 'fas fa-users', color: 'text-primary' }
  ]);
  const [regionalData, setRegionalData] = useState([]);
  const [quickStats, setQuickStats] = useState({
    totalAgents: 25,
    totalFarmers: 1200,
    totalRevenue: 8500000,
    reportsGenerated: 45
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [filterStatus, setFilterStatus] = useState('all');

  const handleQuickStatClick = (statType) => {
    showToast(`Viewing ${statType} details`, 'info');
    // Navigate to respective sections
    switch(statType) {
      case 'agents':
        setActiveSidebar('agents');
        break;
      case 'farmers':
        setActiveSidebar('analytics');
        break;
      case 'revenue':
        setActiveSidebar('revenue');
        break;
      case 'reports':
        setActiveSidebar('reports');
        break;
    }
  };

  const handleActivityClick = (activity) => {
    showToast(`Viewing ${activity.type} activity`, 'info');
    // Navigate to respective sections
    switch(activity.type) {
      case 'agent':
        setActiveSidebar('agents');
        break;
      case 'revenue':
        setActiveSidebar('revenue');
        break;
      case 'report':
        setActiveSidebar('reports');
        break;
      case 'farmer':
        setActiveSidebar('analytics');
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
    setAgents([
      { id: 1, name: 'Sarah Agent', email: 'sarah@example.com', region: 'North', farmersCount: 15, status: 'active', performance: 95 },
      { id: 2, name: 'Mike Agent', email: 'mike@example.com', region: 'South', farmersCount: 12, status: 'active', performance: 88 },
      { id: 3, name: 'Lisa Agent', email: 'lisa@example.com', region: 'East', farmersCount: 18, status: 'active', performance: 92 },
      { id: 4, name: 'John Agent', email: 'john@example.com', region: 'West', farmersCount: 10, status: 'inactive', performance: 75 }
    ]);
    setRevenueData({
      totalRevenue: '₹15,00,000',
      monthlyGrowth: '+18%',
      annualTrend: '+25%',
      topRegion: 'North',
      topAgent: 'Sarah Agent'
    });
    setAnalytics({
      totalFarmers: 150,
      totalAgents: 8,
      totalCrops: 45,
      averageRevenue: '₹1,25,000',
      farmerGrowth: '+12%',
      agentGrowth: '+8%'
    });
    setRegionalData([
      { region: 'North', farmers: 45, revenue: '₹4,50,000', agents: 2, growth: '+15%' },
      { region: 'South', farmers: 38, revenue: '₹3,80,000', agents: 2, growth: '+12%' },
      { region: 'East', farmers: 42, revenue: '₹4,20,000', agents: 2, growth: '+18%' },
      { region: 'West', farmers: 25, revenue: '₹2,50,000', agents: 2, growth: '+8%' }
    ]);
  }, []);

  // TOPBAR
  const renderTopbar = () => (
    <div className="topbar">
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <h4 className="mb-0 me-3">Welcome back, {user.name}!</h4>
          <span className="badge bg-danger">{user.role}</span>
        </div>
        <div className="d-flex align-items-center">
          <div className="search-box me-3">
            <i className="fas fa-search me-2"></i>
            <input type="text" placeholder="Search..." className="border-0 bg-transparent" />
          </div>
          <div className="profile d-flex align-items-center">
            <img src={user.profilePic || 'https://randomuser.me/api/portraits/women/65.jpg'} alt="Profile" className="profile-img me-2" />
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
        <i className="fas fa-shield-alt me-2"></i>
        <span>Admin Dashboard</span>
      </div>
      <nav className="nav flex-column">
        <button className={`nav-link ${activeSidebar === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveSidebar('dashboard')}>
          <i className="fas fa-tachometer-alt me-2"></i>
          Dashboard
        </button>
        <button className={`nav-link ${activeSidebar === 'agents' ? 'active' : ''}`} onClick={() => setActiveSidebar('agents')}>
          <i className="fas fa-user-tie me-2"></i>
          Agent Supervision
        </button>
        <button className={`nav-link ${activeSidebar === 'analytics' ? 'active' : ''}`} onClick={() => setActiveSidebar('analytics')}>
          <i className="fas fa-chart-line me-2"></i>
          Analytics
        </button>
        <button className={`nav-link ${activeSidebar === 'revenue' ? 'active' : ''}`} onClick={() => setActiveSidebar('revenue')}>
          <i className="fas fa-rupee-sign me-2"></i>
          Revenue Management
        </button>
        <button className={`nav-link ${activeSidebar === 'reports' ? 'active' : ''}`} onClick={() => setActiveSidebar('reports')}>
          <i className="fas fa-file-alt me-2"></i>
          Reports
        </button>
        <button className={`nav-link ${activeSidebar === 'settings' ? 'active' : ''}`} onClick={() => setActiveSidebar('settings')}>
          <i className="fas fa-cog me-2"></i>
          System Settings
        </button>
        <button className={`nav-link ${activeSidebar === 'users' ? 'active' : ''}`} onClick={() => setActiveSidebar('users')}>
          <i className="fas fa-users me-2"></i>
          User Management
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
            <option value="agent">Agent Related</option>
            <option value="revenue">Revenue Related</option>
            <option value="report">Reports</option>
            <option value="farmer">Farmer Related</option>
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
            onClick={() => handleQuickStatClick('agents')}
          >
            <i className="fas fa-user-tie fa-2x text-success mb-2"></i>
            <div className="fw-bold fs-4">{quickStats.totalAgents}</div>
            <div className="text-muted">Total Agents</div>
          </div>
        </div>
        <div className="col-md-3">
          <div 
            className="card text-center p-3 shadow-sm cursor-pointer" 
            style={{cursor: 'pointer', transition: 'all 0.3s ease'}}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            onClick={() => handleQuickStatClick('farmers')}
          >
            <i className="fas fa-users fa-2x text-primary mb-2"></i>
            <div className="fw-bold fs-4">{quickStats.totalFarmers}</div>
            <div className="text-muted">Total Farmers</div>
          </div>
        </div>
        <div className="col-md-3">
          <div 
            className="card text-center p-3 shadow-sm cursor-pointer" 
            style={{cursor: 'pointer', transition: 'all 0.3s ease'}}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            onClick={() => handleQuickStatClick('revenue')}
          >
            <i className="fas fa-rupee-sign fa-2x text-warning mb-2"></i>
            <div className="fw-bold fs-4">₹{(quickStats.totalRevenue/100000).toFixed(1)}L</div>
            <div className="text-muted">Total Revenue</div>
          </div>
        </div>
        <div className="col-md-3">
          <div 
            className="card text-center p-3 shadow-sm cursor-pointer" 
            style={{cursor: 'pointer', transition: 'all 0.3s ease'}}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            onClick={() => handleQuickStatClick('reports')}
          >
            <i className="fas fa-file-alt fa-2x text-info mb-2"></i>
            <div className="fw-bold fs-4">{quickStats.reportsGenerated}</div>
            <div className="text-muted">Reports Generated</div>
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
                      <span className={`badge bg-${activity.type === 'agent' ? 'success' : activity.type === 'revenue' ? 'warning' : activity.type === 'report' ? 'info' : 'primary'} me-2`}>
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
                <i className="fas fa-user-tie me-2"></i>Add New Agent
              </button>
              <button className="btn btn-outline-primary btn-sm">
                <i className="fas fa-chart-bar me-2"></i>View Analytics
              </button>
              <button className="btn btn-outline-warning btn-sm">
                <i className="fas fa-file-alt me-2"></i>Generate Reports
              </button>
              <button className="btn btn-outline-info btn-sm">
                <i className="fas fa-cog me-2"></i>System Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-12 col-lg-8">
          <div className="mb-4">
            <h2 className="fw-bold mb-1">Welcome Back, {user.name}!</h2>
            <div className="text-muted mb-2">Monitor system performance and manage operations</div>
          </div>
          
          <div className="row g-4 mb-4">
            <div className="col-md-6">
              <div className="card h-100">
                <div className="fw-bold mb-3">Revenue Overview</div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <div className="fw-bold fs-4" style={{color: '#4caf50'}}>{revenueData.totalRevenue}</div>
                    <div className="text-muted small">Total Revenue</div>
                  </div>
                  <div className="text-end">
                    <div className="fw-bold fs-5">{revenueData.monthlyGrowth}</div>
                    <div className="text-success small">Monthly Growth</div>
                  </div>
                </div>
                <div className="progress" style={{height: 8, borderRadius: 4}}>
                  <div className="progress-bar bg-success" style={{width: '75%'}}></div>
                </div>
                <div className="text-muted small mt-2">Target: ₹20,00,000</div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card h-100">
                <div className="fw-bold mb-3">System Overview</div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <div className="fw-bold fs-4" style={{color: '#4caf50'}}>{analytics.totalFarmers}</div>
                    <div className="text-muted small">Total Farmers</div>
                  </div>
                  <div className="text-end">
                    <div className="fw-bold fs-5">{analytics.totalAgents}</div>
                    <div className="text-success small">Active Agents</div>
                  </div>
                </div>
                <div className="d-flex justify-content-between small">
                  <span>Growth: {analytics.farmerGrowth}</span>
                  <span>Agents: {analytics.agentGrowth}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-md-6">
              <div className="card h-100">
                <div className="fw-bold mb-3">Agent Performance</div>
                <div className="table-responsive">
                  <table className="table table-sm">
                    <thead>
                      <tr>
                        <th>Agent</th>
                        <th>Region</th>
                        <th>Performance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {agents.slice(0, 3).map(agent => (
                        <tr key={agent.id}>
                          <td>{agent.name}</td>
                          <td>{agent.region}</td>
                          <td>
                            <span className={`badge bg-${agent.performance >= 90 ? 'success' : agent.performance >= 80 ? 'warning' : 'danger'}`}>
                              {agent.performance}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button className="btn btn-outline-success btn-sm mt-2">View All Agents</button>
              </div>
            </div>
      <div className="col-md-6">
              <div className="card h-100">
                <div className="fw-bold mb-3">Regional Analytics</div>
                {regionalData.slice(0, 3).map((region, index) => (
              <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                    <div>
                      <div className="fw-bold">{region.region}</div>
                      <div className="small text-muted">{region.farmers} farmers</div>
                    </div>
                    <div className="text-end">
                      <div className="fw-bold">{region.revenue}</div>
                      <div className="small text-success">{region.growth}</div>
                    </div>
                  </div>
                ))}
                <button className="btn btn-outline-success btn-sm mt-2">View Details</button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-4">
          <div className="card mb-4">
            <div className="fw-bold mb-3">Annual Revenue Trend</div>
            <div className="text-center mb-3">
              <div className="fw-bold fs-4" style={{color: '#4caf50'}}>{revenueData.annualTrend}</div>
              <div className="text-muted small">Annual Growth</div>
            </div>
            <div className="progress mb-3" style={{height: 12, borderRadius: 6}}>
              <div className="progress-bar bg-success" style={{width: '60%'}}></div>
              <div className="progress-bar bg-info" style={{width: '25%'}}></div>
              <div className="progress-bar bg-warning" style={{width: '15%'}}></div>
            </div>
            <div className="d-flex justify-content-between small">
              <span>Q1 40%</span>
              <span>Q2 25%</span>
              <span>Q3 35%</span>
            </div>
          </div>

          <div className="card mb-4">
            <div className="fw-bold mb-3">Recent Activities</div>
            {recentActivities.map(activity => (
              <div key={activity.id} className="d-flex align-items-start mb-3">
                <div className={`badge bg-${activity.type === 'agent' ? 'primary' : activity.type === 'revenue' ? 'success' : activity.type === 'farmer' ? 'info' : 'warning'} me-2 mt-1`}>
                  <i className={`fas fa-${activity.type === 'agent' ? 'user-tie' : activity.type === 'revenue' ? 'dollar-sign' : activity.type === 'farmer' ? 'user' : 'seedling'}`}></i>
                </div>
                <div className="flex-grow-1">
                  <div className="small">{activity.message}</div>
                  <div className="text-muted small">{activity.timestamp}</div>
                </div>
              </div>
            ))}
            <button className="btn btn-outline-primary btn-sm mt-2">View All Activities</button>
          </div>

          <div className="card mb-4">
            <div className="fw-bold mb-3">Top Performers</div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div>
                <div className="fw-bold">{revenueData.topAgent}</div>
                <div className="small text-muted">{revenueData.topRegion} Region</div>
              </div>
              <div className="text-end">
                <div className="fw-bold text-success">95%</div>
                <div className="small text-muted">Performance</div>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div>
                <div className="fw-bold">Mike Agent</div>
                <div className="small text-muted">South Region</div>
              </div>
              <div className="text-end">
                <div className="fw-bold text-warning">88%</div>
                <div className="small text-muted">Performance</div>
              </div>
            </div>
            <button className="btn btn-outline-success btn-sm mt-2">View Rankings</button>
          </div>
        </div>
      </div>
    </div>
  );

  // AGENT MANAGEMENT PAGE
  const renderAgentManagement = () => (
    <div className="container-fluid py-4">
      <div className="row g-4">
        <div className="col-12">
          <h2 className="fw-bold mb-4">Agent Management</h2>
        </div>
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="fw-bold">All Agents</div>
              <div className="d-flex gap-2">
                <select className="form-select form-select-sm" style={{width: 'auto'}}>
                  <option>All Regions</option>
                  <option>North</option>
                  <option>South</option>
                  <option>East</option>
                  <option>West</option>
        </select>
                <button className="btn btn-primary-custom btn-sm">+ Add Agent</button>
              </div>
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
                    <th>Name</th>
                    <th>Email</th>
              <th>Region</th>
                    <th>Farmers</th>
                    <th>Performance</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {agents.map(agent => (
              <tr key={agent.id}>
                <td>{agent.name}</td>
                      <td>{agent.email}</td>
                <td>{agent.region}</td>
                <td>{agent.farmersCount}</td>
                      <td>
                        <span className={`badge bg-${agent.performance >= 90 ? 'success' : agent.performance >= 80 ? 'warning' : 'danger'}`}>
                          {agent.performance}%
                        </span>
                      </td>
                      <td>
                        <span className={`badge bg-${agent.status === 'active' ? 'success' : 'secondary'}`}>
                    {agent.status}
                  </span>
                </td>
                <td>
                        <button className="btn btn-outline-primary btn-sm me-1">View</button>
                        <button className="btn btn-outline-success btn-sm me-1">Edit</button>
                        <button className="btn btn-outline-info btn-sm">Performance</button>
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
            <div className="fw-bold mb-3">Agent Statistics</div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <div className="fw-bold fs-4" style={{color: '#4caf50'}}>{agents.length}</div>
                <div className="text-muted small">Total Agents</div>
              </div>
              <div className="text-end">
                <div className="fw-bold fs-5">{agents.filter(a => a.status === 'active').length}</div>
                <div className="text-success small">Active</div>
              </div>
            </div>
            <div className="progress mb-3" style={{height: 8}}>
              <div className="progress-bar bg-success" style={{width: `${(agents.filter(a => a.status === 'active').length/agents.length)*100}%`}}></div>
            </div>
            <div className="d-flex justify-content-between small">
              <span>Active: {agents.filter(a => a.status === 'active').length}</span>
              <span>Inactive: {agents.filter(a => a.status === 'inactive').length}</span>
            </div>
          </div>
          <div className="card mb-4">
            <div className="fw-bold mb-3">Performance Overview</div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span>Average Performance</span>
              <span className="fw-bold text-success">87.5%</span>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span>Top Performer</span>
              <span className="fw-bold">{agents[0].name}</span>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span>Total Farmers Managed</span>
              <span className="fw-bold">55</span>
            </div>
            <button className="btn btn-outline-success w-100 mt-3">View Detailed Report</button>
          </div>
        </div>
      </div>
    </div>
  );

  // ANALYTICS PAGE
  const renderAnalyticsPage = () => (
    <div className="container-fluid py-4">
      <div className="row g-4">
        <div className="col-12">
          <h2 className="fw-bold mb-4">Analytics Dashboard</h2>
        </div>
      <div className="col-md-6">
          <div className="card mb-4">
            <div className="fw-bold mb-3">System Overview</div>
            <div className="row g-3">
              <div className="col-6">
                <div className="text-center p-3 border rounded">
                  <div className="fw-bold fs-4" style={{color: '#4caf50'}}>{analytics.totalFarmers}</div>
                  <div className="small text-muted">Total Farmers</div>
                </div>
              </div>
              <div className="col-6">
                <div className="text-center p-3 border rounded">
                  <div className="fw-bold fs-4" style={{color: '#4caf50'}}>{analytics.totalAgents}</div>
                  <div className="small text-muted">Total Agents</div>
                </div>
              </div>
            </div>
            <div className="row g-3 mt-2">
              <div className="col-6">
                <div className="text-center p-3 border rounded">
                  <div className="fw-bold fs-4" style={{color: '#4caf50'}}>{analytics.totalCrops}</div>
                  <div className="small text-muted">Active Crops</div>
                </div>
              </div>
              <div className="col-6">
                <div className="text-center p-3 border rounded">
                  <div className="fw-bold fs-4" style={{color: '#4caf50'}}>{analytics.averageRevenue}</div>
                  <div className="small text-muted">Avg Revenue</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="fw-bold mb-3">Growth Metrics</div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <div className="fw-bold fs-4" style={{color: '#4caf50'}}>{analytics.farmerGrowth}</div>
                <div className="text-muted small">Farmer Growth</div>
              </div>
              <div className="text-end">
                <div className="fw-bold fs-5">{analytics.agentGrowth}</div>
                <div className="text-success small">Agent Growth</div>
              </div>
            </div>
            <div className="progress mb-3" style={{height: 8}}>
              <div className="progress-bar bg-success" style={{width: '75%'}}></div>
            </div>
            <div className="d-flex justify-content-between small">
              <span>Monthly Target: 20%</span>
              <span>Current: 15%</span>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="card">
            <div className="fw-bold mb-3">Regional Performance Analysis</div>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Region</th>
                    <th>Farmers</th>
                    <th>Agents</th>
                    <th>Revenue</th>
                    <th>Growth</th>
                    <th>Performance</th>
                  </tr>
                </thead>
                <tbody>
                  {regionalData.map((region, index) => (
                    <tr key={index}>
                      <td>{region.region}</td>
                      <td>{region.farmers}</td>
                      <td>{region.agents}</td>
                      <td>{region.revenue}</td>
                      <td><span className="text-success">{region.growth}</span></td>
                      <td>
                        <span className={`badge bg-${region.growth.includes('18') ? 'success' : region.growth.includes('15') ? 'success' : region.growth.includes('12') ? 'warning' : 'info'}`}>
                          {region.growth.includes('18') ? 'Excellent' : region.growth.includes('15') ? 'Good' : region.growth.includes('12') ? 'Average' : 'Below Average'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // REVENUE PAGE
  const renderRevenuePage = () => (
    <div className="container-fluid py-4">
      <div className="row g-4">
        <div className="col-12">
          <h2 className="fw-bold mb-4">Revenue Management</h2>
        </div>
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="fw-bold mb-3">Revenue Overview</div>
            <div className="row g-4">
              <div className="col-md-6">
                <div className="text-center p-4 border rounded">
                  <div className="fw-bold fs-3" style={{color: '#4caf50'}}>{revenueData.totalRevenue}</div>
                  <div className="text-muted">Total Revenue</div>
                  <div className="text-success small mt-2">{revenueData.monthlyGrowth} from last month</div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="text-center p-4 border rounded">
                  <div className="fw-bold fs-3" style={{color: '#4caf50'}}>{revenueData.annualTrend}</div>
                  <div className="text-muted">Annual Growth</div>
                  <div className="text-success small mt-2">Target: 30%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="fw-bold mb-3">Revenue Breakdown</div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <div className="fw-bold">Service Fees</div>
                <div className="small text-muted">25% of total</div>
              </div>
              <div className="text-end">
                <div className="fw-bold">₹3,75,000</div>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <div className="fw-bold">Profit Share</div>
                <div className="small text-muted">15% of total</div>
                </div>
              <div className="text-end">
                <div className="fw-bold">₹2,25,000</div>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <div className="fw-bold">Other Revenue</div>
                <div className="small text-muted">Additional services</div>
                </div>
              <div className="text-end">
                <div className="fw-bold">₹9,00,000</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="card">
            <div className="fw-bold mb-3">Top Revenue Contributors</div>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Agent</th>
                    <th>Region</th>
                    <th>Revenue Generated</th>
                    <th>Farmers Managed</th>
                    <th>Performance</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{revenueData.topAgent}</td>
                    <td>{revenueData.topRegion}</td>
                    <td>₹4,50,000</td>
                    <td>15</td>
                    <td><span className="badge bg-success">95%</span></td>
                  </tr>
                  <tr>
                    <td>Lisa Agent</td>
                    <td>East</td>
                    <td>₹4,20,000</td>
                    <td>18</td>
                    <td><span className="badge bg-success">92%</span></td>
                  </tr>
                  <tr>
                    <td>Mike Agent</td>
                    <td>South</td>
                    <td>₹3,80,000</td>
                    <td>12</td>
                    <td><span className="badge bg-warning">88%</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // REPORTS PAGE
  const renderReportsPage = () => (
    <div className="container-fluid py-4">
      <div className="row g-4">
        <div className="col-12">
          <h2 className="fw-bold mb-4">Reports & Analytics</h2>
        </div>
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="fw-bold mb-3">Available Reports</div>
            <div className="row g-4">
              <div className="col-md-6">
                <div className="card h-100">
                  <div className="card-body text-center">
                    <i className="fas fa-chart-line fa-3x text-primary mb-3"></i>
                    <h6 className="fw-bold">Revenue Report</h6>
                    <p className="text-muted small">Monthly and annual revenue analysis with growth trends</p>
                    <button className="btn btn-primary-custom btn-sm">Generate</button>
      </div>
        </div>
      </div>
              <div className="col-md-6">
                <div className="card h-100">
                  <div className="card-body text-center">
                    <i className="fas fa-users fa-3x text-success mb-3"></i>
                    <h6 className="fw-bold">Farmer Report</h6>
                    <p className="text-muted small">Farmer distribution, registration trends, and performance</p>
                    <button className="btn btn-success btn-sm">Generate</button>
        </div>
      </div>
        </div>
              <div className="col-md-6">
                <div className="card h-100">
                  <div className="card-body text-center">
                    <i className="fas fa-user-tie fa-3x text-warning mb-3"></i>
                    <h6 className="fw-bold">Agent Report</h6>
                    <p className="text-muted small">Agent performance, productivity, and efficiency metrics</p>
                    <button className="btn btn-warning btn-sm">Generate</button>
      </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card h-100">
                  <div className="card-body text-center">
                    <i className="fas fa-seedling fa-3x text-info mb-3"></i>
                    <h6 className="fw-bold">Crop Report</h6>
                    <p className="text-muted small">Crop-wise analysis, yield predictions, and market trends</p>
                    <button className="btn btn-info btn-sm">Generate</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="fw-bold mb-3">Report Statistics</div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <div className="fw-bold fs-4" style={{color: '#4caf50'}}>24</div>
                <div className="text-muted small">Reports Generated</div>
              </div>
              <div className="text-end">
                <div className="fw-bold fs-5">4</div>
                <div className="text-success small">This Month</div>
              </div>
            </div>
            <div className="d-flex justify-content-between small">
              <span>Revenue: 8</span>
              <span>Farmer: 6</span>
            </div>
            <div className="d-flex justify-content-between small">
              <span>Agent: 5</span>
              <span>Crop: 5</span>
            </div>
          </div>
          <div className="card mb-4">
            <div className="fw-bold mb-3">Quick Actions</div>
            <button className="btn btn-outline-primary w-100 mb-2">
              <i className="fas fa-calendar me-2"></i>Schedule Report
            </button>
            <button className="btn btn-outline-success w-100 mb-2">
              <i className="fas fa-download me-2"></i>Export All
            </button>
            <button className="btn btn-outline-warning w-100 mb-2">
              <i className="fas fa-envelope me-2"></i>Email Reports
            </button>
            <button className="btn btn-outline-info w-100">
              <i className="fas fa-cog me-2"></i>Report Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // SETTINGS PAGE
  const renderSettingsPage = () => (
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
              <button type="submit" className="btn btn-primary-custom">Save Changes</button>
            </form>
          </div>
        </div>
      <div className="col-md-6">
          <div className="card mb-4">
            <div className="fw-bold mb-3">Notification Settings</div>
            <div className="form-check mb-3">
              <input className="form-check-input" type="checkbox" id="agentAlerts" checked />
              <label className="form-check-label" htmlFor="agentAlerts">
                Agent Activity Alerts
              </label>
            </div>
            <div className="form-check mb-3">
              <input className="form-check-input" type="checkbox" id="revenueAlerts" checked />
              <label className="form-check-label" htmlFor="revenueAlerts">
                Revenue Notifications
              </label>
            </div>
            <div className="form-check mb-3">
              <input className="form-check-input" type="checkbox" id="reportAlerts" checked />
              <label className="form-check-label" htmlFor="reportAlerts">
                Report Generation Alerts
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
  const renderHelpPage = () => (
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
                    How do I add a new agent?
              </button>
                </h2>
                <div id="faq1" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                  <div className="accordion-body">
                    Go to Agent Management and click on "+ Add Agent". Fill in the agent's details and assign a region. The agent will receive an email with login credentials.
            </div>
          </div>
        </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                    How do I generate analytics reports?
              </button>
                </h2>
                <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div className="accordion-body">
                    Navigate to Reports & Analytics and select the report type. Click "Generate" to create a new report. You can download or email the report directly.
            </div>
          </div>
        </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                    How do I manage security settings?
              </button>
                </h2>
                <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div className="accordion-body">
                    Go to Settings and update your password or notification preferences. For advanced security, enable two-factor authentication (coming soon).
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
              <i className="fas fa-download me-2"></i>Download Admin Guide
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
                    <i className="fas fa-user-tie fa-2x text-primary mb-2"></i>
                    <h5 className="card-title">Total Agents</h5>
                    <h3 className="text-primary">12</h3>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="card text-center">
                  <div className="card-body">
                    <i className="fas fa-users fa-2x text-success mb-2"></i>
                    <h5 className="card-title">Total Farmers</h5>
                    <h3 className="text-success">156</h3>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="card text-center">
                  <div className="card-body">
                    <i className="fas fa-rupee-sign fa-2x text-warning mb-2"></i>
                    <h5 className="card-title">Total Revenue</h5>
                    <h3 className="text-warning">₹15.2L</h3>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="card text-center">
                  <div className="card-body">
                    <i className="fas fa-chart-line fa-2x text-info mb-2"></i>
                    <h5 className="card-title">Growth Rate</h5>
                    <h3 className="text-info">+24%</h3>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-8">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">System Overview</h5>
                  </div>
                  <div className="card-body">
                    <div className="list-group">
                      <div className="list-group-item d-flex align-items-center">
                        <i className="fas fa-user-plus text-success me-3"></i>
                        <div className="flex-grow-1">
                          <div className="fw-bold">New agent registered: Priya Sharma</div>
                          <small className="text-muted">1 hour ago</small>
                        </div>
                      </div>
                      <div className="list-group-item d-flex align-items-center">
                        <i className="fas fa-chart-bar text-primary me-3"></i>
                        <div className="flex-grow-1">
                          <div className="fw-bold">Monthly revenue target achieved: 120%</div>
                          <small className="text-muted">2 hours ago</small>
                        </div>
                      </div>
                      <div className="list-group-item d-flex align-items-center">
                        <i className="fas fa-cog text-info me-3"></i>
                        <div className="flex-grow-1">
                          <div className="fw-bold">System maintenance completed</div>
                          <small className="text-muted">1 day ago</small>
                        </div>
                      </div>
                      <div className="list-group-item d-flex align-items-center">
                        <i className="fas fa-exclamation-triangle text-warning me-3"></i>
                        <div className="flex-grow-1">
                          <div className="fw-bold">3 pending agent approvals</div>
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
                      <i className="fas fa-user-plus me-2"></i>Add New Agent
                    </button>
                    <button className="btn btn-outline-success w-100 mb-2">
                      <i className="fas fa-chart-bar me-2"></i>View Analytics
                    </button>
                    <a 
                      href="https://agriconnectdashboard-1.streamlit.app/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn-outline-primary w-100 mb-2"
                    >
                      <i className="fas fa-tachometer-alt me-2"></i>Metrics Dashboard
                    </a>
                    <button className="btn btn-outline-warning w-100 mb-2">
                      <i className="fas fa-cog me-2"></i>System Settings
                    </button>
                    <button className="btn btn-outline-info w-100">
                      <i className="fas fa-file-alt me-2"></i>Generate Reports
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'agents':
        return (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4>Agent Supervision</h4>
              <button className="btn btn-primary-custom">
                <i className="fas fa-plus me-2"></i>Add New Agent
              </button>
            </div>
            <div className="card">
              <div className="card-header">
                <div className="row align-items-center">
                  <div className="col-md-6">
                    <h5 className="mb-0">Registered Agents</h5>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex gap-2">
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Search agents..."
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
                        <th>Agent Name</th>
                        <th>Contact</th>
                        <th>Region</th>
                        <th>Farmers</th>
                        <th>Performance</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="d-flex align-items-center">
                            <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="Agent" className="rounded-circle me-2" style={{width: 35, height: 35, objectFit: 'cover'}} />
                            <div>
                              <div className="fw-bold">Rajesh Kumar</div>
                              <small className="text-muted">ID: A001</small>
                            </div>
                          </div>
                        </td>
                        <td>+91 98765 43210</td>
                        <td>North Region</td>
                        <td>24</td>
                        <td>
                          <div className="progress" style={{height: '6px'}}>
                            <div className="progress-bar bg-success" style={{width: '85%'}}></div>
                          </div>
                          <small>85%</small>
                        </td>
                        <td><span className="badge bg-success">Active</span></td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary me-1">View</button>
                          <button className="btn btn-sm btn-outline-success">Edit</button>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="d-flex align-items-center">
                            <img src="https://randomuser.me/api/portraits/women/32.jpg" alt="Agent" className="rounded-circle me-2" style={{width: 35, height: 35, objectFit: 'cover'}} />
                            <div>
                              <div className="fw-bold">Priya Sharma</div>
                              <small className="text-muted">ID: A002</small>
                            </div>
                          </div>
                        </td>
                        <td>+91 98765 43211</td>
                        <td>South Region</td>
                        <td>18</td>
                        <td>
                          <div className="progress" style={{height: '6px'}}>
                            <div className="progress-bar bg-warning" style={{width: '72%'}}></div>
                          </div>
                          <small>72%</small>
                        </td>
                        <td><span className="badge bg-success">Active</span></td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary me-1">View</button>
                          <button className="btn btn-sm btn-outline-success">Edit</button>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="d-flex align-items-center">
                            <img src="https://randomuser.me/api/portraits/men/67.jpg" alt="Agent" className="rounded-circle me-2" style={{width: 35, height: 35, objectFit: 'cover'}} />
                            <div>
                              <div className="fw-bold">Amit Singh</div>
                              <small className="text-muted">ID: A003</small>
                            </div>
                          </div>
                        </td>
                        <td>+91 98765 43212</td>
                        <td>East Region</td>
                        <td>15</td>
                        <td>
                          <div className="progress" style={{height: '6px'}}>
                            <div className="progress-bar bg-danger" style={{width: '45%'}}></div>
                          </div>
                          <small>45%</small>
                        </td>
                        <td><span className="badge bg-warning">Pending</span></td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary me-1">View</button>
                          <button className="btn btn-sm btn-outline-success">Edit</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );

      case 'analytics':
        return (
          <div>
            <h4 className="mb-4">Analytics Dashboard</h4>
            <div className="row">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">Revenue Trends</h5>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span>January 2024</span>
                        <span className="fw-bold">₹2.5L</span>
                      </div>
                      <div className="progress">
                        <div className="progress-bar bg-success" style={{width: '100%'}}></div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span>December 2023</span>
                        <span className="fw-bold">₹2.1L</span>
                      </div>
                      <div className="progress">
                        <div className="progress-bar bg-primary" style={{width: '84%'}}></div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span>November 2023</span>
                        <span className="fw-bold">₹1.8L</span>
                      </div>
                      <div className="progress">
                        <div className="progress-bar bg-warning" style={{width: '72%'}}></div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span>October 2023</span>
                        <span className="fw-bold">₹1.5L</span>
                      </div>
                      <div className="progress">
                        <div className="progress-bar bg-info" style={{width: '60%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">User Growth</h5>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span>New Farmers</span>
                        <span className="fw-bold">+24</span>
                      </div>
                      <div className="progress">
                        <div className="progress-bar bg-success" style={{width: '80%'}}></div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span>New Agents</span>
                        <span className="fw-bold">+3</span>
                      </div>
                      <div className="progress">
                        <div className="progress-bar bg-primary" style={{width: '60%'}}></div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span>Active Users</span>
                        <span className="fw-bold">156</span>
                      </div>
                      <div className="progress">
                        <div className="progress-bar bg-warning" style={{width: '90%'}}></div>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span>Retention Rate</span>
                        <span className="fw-bold">92%</span>
                      </div>
                      <div className="progress">
                        <div className="progress-bar bg-info" style={{width: '92%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'revenue':
        return (
          <div>
            <h4 className="mb-4">Revenue Management</h4>
            <div className="row">
              <div className="col-md-8">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">Revenue Overview</h5>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Region</th>
                            <th>Total Revenue</th>
                            <th>This Month</th>
                            <th>Growth</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>North Region</td>
                            <td>₹4.2L</td>
                            <td>₹85,000</td>
                            <td><span className="badge bg-success">+15%</span></td>
                            <td>
                              <button className="btn btn-sm btn-outline-primary">View Details</button>
                            </td>
                          </tr>
                          <tr>
                            <td>South Region</td>
                            <td>₹3.8L</td>
                            <td>₹65,000</td>
                            <td><span className="badge bg-success">+12%</span></td>
                            <td>
                              <button className="btn btn-sm btn-outline-primary">View Details</button>
                            </td>
                          </tr>
                          <tr>
                            <td>East Region</td>
                            <td>₹3.2L</td>
                            <td>₹55,000</td>
                            <td><span className="badge bg-warning">+8%</span></td>
                            <td>
                              <button className="btn btn-sm btn-outline-primary">View Details</button>
                            </td>
                          </tr>
                          <tr>
                            <td>West Region</td>
                            <td>₹2.8L</td>
                            <td>₹45,000</td>
                            <td><span className="badge bg-danger">-2%</span></td>
                            <td>
                              <button className="btn btn-sm btn-outline-primary">View Details</button>
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
                    <h5 className="mb-0">Revenue Summary</h5>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <div className="d-flex justify-content-between">
                        <span>Total Revenue</span>
                        <span className="fw-bold">₹14L</span>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between">
                        <span>This Month</span>
                        <span className="fw-bold text-success">₹2.5L</span>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between">
                        <span>Growth Rate</span>
                        <span className="fw-bold text-success">+24%</span>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between">
                        <span>Target</span>
                        <span className="fw-bold text-primary">₹20L</span>
                      </div>
                    </div>
                    <hr />
                    <button className="btn btn-primary-custom w-100 mb-2">
                      <i className="fas fa-download me-2"></i>Export Report
                    </button>
                    <button className="btn btn-outline-secondary w-100">
                      <i className="fas fa-chart-line me-2"></i>View Analytics
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
                    <h5 className="mb-0">System Reports</h5>
                  </div>
                  <div className="card-body">
                    <div className="list-group">
                      <button className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                        <div>
                          <i className="fas fa-users me-2"></i>
                          User Activity Report
                        </div>
                        <span className="badge bg-primary rounded-pill">New</span>
                      </button>
                      <button className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                        <div>
                          <i className="fas fa-chart-bar me-2"></i>
                          Performance Analytics
                        </div>
                        <span className="badge bg-success rounded-pill">Updated</span>
                      </button>
                      <button className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                        <div>
                          <i className="fas fa-rupee-sign me-2"></i>
                          Financial Report
                        </div>
                        <span className="badge bg-warning rounded-pill">Pending</span>
                      </button>
                      <button className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                        <div>
                          <i className="fas fa-cog me-2"></i>
                          System Health Report
                        </div>
                        <span className="badge bg-info rounded-pill">Ready</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mb-4">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">Generate Custom Report</h5>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <label className="form-label">Report Type</label>
                      <select className="form-select">
                        <option>User Activity</option>
                        <option>Revenue Analysis</option>
                        <option>Performance Metrics</option>
                        <option>System Usage</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Date Range</label>
                      <select className="form-select">
                        <option>Last 30 Days</option>
                        <option>Last 3 Months</option>
                        <option>Last 6 Months</option>
                        <option>Last Year</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Format</label>
                      <select className="form-select">
                        <option>PDF</option>
                        <option>Excel</option>
                        <option>CSV</option>
                      </select>
                    </div>
                    <button className="btn btn-primary-custom w-100">
                      <i className="fas fa-file-alt me-2"></i>Generate Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div>
            <h4 className="mb-4">System Settings</h4>
            <div className="row">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">General Settings</h5>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <label className="form-label">System Name</label>
                      <input type="text" className="form-control" value="AgriTech Solutions" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Admin Email</label>
                      <input type="email" className="form-control" value="admin@agritech.com" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Timezone</label>
                      <select className="form-select">
                        <option>IST (UTC+5:30)</option>
                        <option>GMT (UTC+0)</option>
                        <option>EST (UTC-5)</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Language</label>
                      <select className="form-select">
                        <option>English</option>
                        <option>Hindi</option>
                        <option>Telugu</option>
                      </select>
                    </div>
                    <button className="btn btn-primary-custom">Save Settings</button>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h5 className="mb-0">Security Settings</h5>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" id="twoFactor" checked />
                        <label className="form-check-label" htmlFor="twoFactor">
                          Enable Two-Factor Authentication
                        </label>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" id="sessionTimeout" checked />
                        <label className="form-check-label" htmlFor="sessionTimeout">
                          Auto-logout after 30 minutes
                        </label>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" id="auditLog" checked />
                        <label className="form-check-label" htmlFor="auditLog">
                          Enable Audit Logging
                        </label>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" id="backup" checked />
                        <label className="form-check-label" htmlFor="backup">
                          Automatic Daily Backup
                        </label>
                      </div>
                    </div>
                    <button className="btn btn-primary-custom">Update Security</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'users':
        return (
          <div>
            <h4 className="mb-4">User Management</h4>
            <div className="card">
              <div className="card-header">
                <div className="row align-items-center">
                  <div className="col-md-6">
                    <h5 className="mb-0">All Users</h5>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex gap-2">
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Search users..."
                      />
                      <select className="form-select" style={{width: 'auto'}}>
                        <option>All Roles</option>
                        <option>Admin</option>
                        <option>Agent</option>
                        <option>Farmer</option>
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
                        <th>User</th>
                        <th>Role</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Last Login</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="d-flex align-items-center">
                            <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Admin" className="rounded-circle me-2" style={{width: 35, height: 35, objectFit: 'cover'}} />
                            <div>
                              <div className="fw-bold">Admin User</div>
                              <small className="text-muted">ID: ADM001</small>
                            </div>
                          </div>
                        </td>
                        <td><span className="badge bg-danger">Admin</span></td>
                        <td>admin@agritech.com</td>
                        <td><span className="badge bg-success">Active</span></td>
                        <td>2 hours ago</td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary me-1">Edit</button>
                          <button className="btn btn-sm btn-outline-warning">Suspend</button>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="d-flex align-items-center">
                            <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="Agent" className="rounded-circle me-2" style={{width: 35, height: 35, objectFit: 'cover'}} />
                            <div>
                              <div className="fw-bold">Rajesh Kumar</div>
                              <small className="text-muted">ID: AGT001</small>
                            </div>
                          </div>
                        </td>
                        <td><span className="badge bg-primary">Agent</span></td>
                        <td>rajesh@agritech.com</td>
                        <td><span className="badge bg-success">Active</span></td>
                        <td>1 day ago</td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary me-1">Edit</button>
                          <button className="btn btn-sm btn-outline-warning">Suspend</button>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="d-flex align-items-center">
                            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Farmer" className="rounded-circle me-2" style={{width: 35, height: 35, objectFit: 'cover'}} />
                            <div>
                              <div className="fw-bold">John Farmer</div>
                              <small className="text-muted">ID: FMR001</small>
                            </div>
                          </div>
                        </td>
                        <td><span className="badge bg-success">Farmer</span></td>
                        <td>john@example.com</td>
                        <td><span className="badge bg-success">Active</span></td>
                        <td>3 days ago</td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary me-1">Edit</button>
                          <button className="btn btn-sm btn-outline-warning">Suspend</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-5">
            <i className="fas fa-shield-alt fa-3x text-muted mb-3"></i>
            <h4 className="text-muted">Welcome to Admin Dashboard</h4>
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

export default AdminDashboard; 