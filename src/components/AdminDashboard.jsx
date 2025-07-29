import React, { useState, useEffect } from 'react';

const AdminDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [agents, setAgents] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [revenueData, setRevenueData] = useState([]);
  const [cropDistribution, setCropDistribution] = useState([]);

  useEffect(() => {
    // Mock data initialization
    setAgents([
      {
        id: 'A001',
        name: 'Sarah Agent',
        region: 'North Region',
        farmersCount: 15,
        revenue: '₹125,000',
        status: 'active'
      },
      {
        id: 'A002',
        name: 'Mike Agent',
        region: 'South Region',
        farmersCount: 12,
        revenue: '₹98,000',
        status: 'active'
      },
      {
        id: 'A003',
        name: 'Lisa Agent',
        region: 'East Region',
        farmersCount: 8,
        revenue: '₹75,000',
        status: 'active'
      },
      {
        id: 'A004',
        name: 'Tom Agent',
        region: 'West Region',
        farmersCount: 10,
        revenue: '₹85,000',
        status: 'inactive'
      }
    ]);

    setAnalytics({
      totalRevenue: '₹383,000',
      totalFarmers: 45,
      totalAgents: 4,
      activeCrops: 67,
      averageRevenuePerFarmer: '₹8,511',
      growthRate: '12.5%'
    });

    setRevenueData([
      { month: 'Jan', revenue: 25000 },
      { month: 'Feb', revenue: 30000 },
      { month: 'Mar', revenue: 28000 },
      { month: 'Apr', revenue: 32000 },
      { month: 'May', revenue: 35000 },
      { month: 'Jun', revenue: 38000 },
      { month: 'Jul', revenue: 42000 },
      { month: 'Aug', revenue: 45000 },
      { month: 'Sep', revenue: 48000 },
      { month: 'Oct', revenue: 52000 },
      { month: 'Nov', revenue: 55000 },
      { month: 'Dec', revenue: 58000 }
    ]);

    setCropDistribution([
      { crop: 'Rice', farmers: 18, percentage: 40 },
      { crop: 'Wheat', farmers: 16, percentage: 35 },
      { crop: 'Corn', farmers: 8, percentage: 18 },
      { crop: 'Sugarcane', farmers: 3, percentage: 7 }
    ]);
  }, []);

  const renderOverview = () => (
    <div className="row">
      <div className="col-md-3 mb-4">
        <div className="metric-card">
          <h3>{analytics.totalRevenue}</h3>
          <p>Total Revenue</p>
        </div>
      </div>
      <div className="col-md-3 mb-4">
        <div className="metric-card">
          <h3>{analytics.totalFarmers}</h3>
          <p>Total Farmers</p>
        </div>
      </div>
      <div className="col-md-3 mb-4">
        <div className="metric-card">
          <h3>{analytics.totalAgents}</h3>
          <p>Total Agents</p>
        </div>
      </div>
      <div className="col-md-3 mb-4">
        <div className="metric-card">
          <h3>{analytics.activeCrops}</h3>
          <p>Active Crops</p>
        </div>
      </div>

      <div className="col-md-6">
        <div className="dashboard-card">
          <h5><i className="fas fa-chart-line me-2"></i>Annual Revenue Trend</h5>
          <div className="chart-container">
            <div className="row text-center">
              {revenueData.slice(-6).map((data, index) => (
                <div key={index} className="col-md-2">
                  <div className="border rounded p-2">
                    <h6>{data.month}</h6>
                    <p className="text-primary">₹{(data.revenue / 1000).toFixed(0)}k</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-6">
        <div className="dashboard-card">
          <h5><i className="fas fa-chart-pie me-2"></i>Crop-wise Farmer Distribution</h5>
          <div className="chart-container">
            {cropDistribution.map((crop, index) => (
              <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                <span>{crop.crop}</span>
                <div className="d-flex align-items-center">
                  <div className="progress me-2" style={{width: '100px'}}>
                    <div 
                      className="progress-bar" 
                      style={{width: `${crop.percentage}%`}}
                    ></div>
                  </div>
                  <span>{crop.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAgentSupervision = () => (
    <div className="dashboard-card">
      <h5><i className="fas fa-user-tie me-2"></i>Agent Supervision</h5>
      <div className="mb-3">
        <label className="form-label">Filter by Region</label>
        <select className="form-control form-control-custom" style={{width: '200px'}}>
          <option value="">All Regions</option>
          <option value="North Region">North Region</option>
          <option value="South Region">South Region</option>
          <option value="East Region">East Region</option>
          <option value="West Region">West Region</option>
        </select>
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Agent Name</th>
              <th>ID</th>
              <th>Region</th>
              <th>Farmers Assigned</th>
              <th>Revenue Generated</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {agents.map(agent => (
              <tr key={agent.id}>
                <td>{agent.name}</td>
                <td>{agent.id}</td>
                <td>{agent.region}</td>
                <td>{agent.farmersCount}</td>
                <td>{agent.revenue}</td>
                <td>
                  <span className={`status-${agent.status}`}>
                    {agent.status}
                  </span>
                </td>
                <td>
                  <button className="btn btn-primary btn-sm me-2">
                    <i className="fas fa-eye me-2"></i>View Details
                  </button>
                  <button className="btn btn-outline-primary btn-sm">
                    <i className="fas fa-edit me-2"></i>Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="row">
      <div className="col-md-6">
        <div className="dashboard-card">
          <h5><i className="fas fa-chart-bar me-2"></i>Revenue by Region</h5>
          <div className="chart-container">
            <div className="row">
              <div className="col-md-6">
                <div className="text-center p-3">
                  <h4>North Region</h4>
                  <p className="text-primary">₹125,000</p>
                  <small className="text-muted">32.6% of total</small>
                </div>
              </div>
              <div className="col-md-6">
                <div className="text-center p-3">
                  <h4>South Region</h4>
                  <p className="text-success">₹98,000</p>
                  <small className="text-muted">25.6% of total</small>
                </div>
              </div>
              <div className="col-md-6">
                <div className="text-center p-3">
                  <h4>East Region</h4>
                  <p className="text-warning">₹75,000</p>
                  <small className="text-muted">19.6% of total</small>
                </div>
              </div>
              <div className="col-md-6">
                <div className="text-center p-3">
                  <h4>West Region</h4>
                  <p className="text-info">₹85,000</p>
                  <small className="text-muted">22.2% of total</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-6">
        <div className="dashboard-card">
          <h5><i className="fas fa-chart-line me-2"></i>Performance Metrics</h5>
          <div className="chart-container">
            <div className="row text-center">
              <div className="col-md-6">
                <div className="border rounded p-3">
                  <h4>{analytics.averageRevenuePerFarmer}</h4>
                  <p>Avg Revenue per Farmer</p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="border rounded p-3">
                  <h4>{analytics.growthRate}</h4>
                  <p>Growth Rate</p>
                </div>
              </div>
              <div className="col-md-6 mt-3">
                <div className="border rounded p-3">
                  <h4>₹{parseInt(analytics.totalRevenue.replace('₹', '').replace(',', '')) / analytics.totalFarmers}</h4>
                  <p>Revenue per Agent</p>
                </div>
              </div>
              <div className="col-md-6 mt-3">
                <div className="border rounded p-3">
                  <h4>{Math.round(analytics.totalFarmers / analytics.totalAgents)}</h4>
                  <p>Farmers per Agent</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-12">
        <div className="dashboard-card">
          <h5><i className="fas fa-chart-area me-2"></i>Monthly Revenue Trends</h5>
          <div className="chart-container">
            <div className="row">
              {revenueData.map((data, index) => (
                <div key={index} className="col-md-1 text-center">
                  <div className="border rounded p-2">
                    <small>{data.month}</small>
                    <p className="text-primary mb-0">₹{(data.revenue / 1000).toFixed(0)}k</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCompanyMetrics = () => (
    <div className="row">
      <div className="col-md-3 mb-4">
        <div className="metric-card">
          <h3>₹{analytics.totalRevenue}</h3>
          <p>Company Revenue</p>
        </div>
      </div>
      <div className="col-md-3 mb-4">
        <div className="metric-card">
          <h3>{analytics.totalFarmers}</h3>
          <p>Total Farmers</p>
        </div>
      </div>
      <div className="col-md-3 mb-4">
        <div className="metric-card">
          <h3>{analytics.totalAgents}</h3>
          <p>Active Agents</p>
        </div>
      </div>
      <div className="col-md-3 mb-4">
        <div className="metric-card">
          <h3>{analytics.activeCrops}</h3>
          <p>Active Crops</p>
        </div>
      </div>

      <div className="col-md-6">
        <div className="dashboard-card">
          <h5><i className="fas fa-chart-pie me-2"></i>Crop Distribution</h5>
          <div className="chart-container">
            {cropDistribution.map((crop, index) => (
              <div key={index} className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center">
                  <div 
                    className="rounded-circle me-3" 
                    style={{
                      width: '20px', 
                      height: '20px', 
                      backgroundColor: ['#007bff', '#28a745', '#ffc107', '#17a2b8'][index]
                    }}
                  ></div>
                  <span>{crop.crop}</span>
                </div>
                <div className="d-flex align-items-center">
                  <div className="progress me-2" style={{width: '150px'}}>
                    <div 
                      className="progress-bar" 
                      style={{
                        width: `${crop.percentage}%`,
                        backgroundColor: ['#007bff', '#28a745', '#ffc107', '#17a2b8'][index]
                      }}
                    ></div>
                  </div>
                  <span>{crop.percentage}% ({crop.farmers} farmers)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="col-md-6">
        <div className="dashboard-card">
          <h5><i className="fas fa-chart-bar me-2"></i>Regional Performance</h5>
          <div className="chart-container">
            <div className="row">
              <div className="col-md-6">
                <div className="text-center p-3">
                  <h6>North Region</h6>
                  <p className="text-primary">₹125,000</p>
                  <small className="text-muted">15 farmers</small>
                </div>
              </div>
              <div className="col-md-6">
                <div className="text-center p-3">
                  <h6>South Region</h6>
                  <p className="text-success">₹98,000</p>
                  <small className="text-muted">12 farmers</small>
                </div>
              </div>
              <div className="col-md-6">
                <div className="text-center p-3">
                  <h6>East Region</h6>
                  <p className="text-warning">₹75,000</p>
                  <small className="text-muted">8 farmers</small>
                </div>
              </div>
              <div className="col-md-6">
                <div className="text-center p-3">
                  <h6>West Region</h6>
                  <p className="text-info">₹85,000</p>
                  <small className="text-muted">10 farmers</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="dashboard-card">
      <h5><i className="fas fa-file-alt me-2"></i>Reports & Analytics</h5>
      <div className="row">
        <div className="col-md-4 mb-3">
          <div className="card">
            <div className="card-body text-center">
              <i className="fas fa-chart-line fa-2x text-primary mb-2"></i>
              <h6>Revenue Report</h6>
              <p className="text-muted">Monthly and annual revenue analysis</p>
              <button className="btn btn-primary btn-sm">
                <i className="fas fa-download me-2"></i>Download
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card">
            <div className="card-body text-center">
              <i className="fas fa-users fa-2x text-success mb-2"></i>
              <h6>Farmer Report</h6>
              <p className="text-muted">Farmer distribution and performance</p>
              <button className="btn btn-success btn-sm">
                <i className="fas fa-download me-2"></i>Download
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card">
            <div className="card-body text-center">
              <i className="fas fa-user-tie fa-2x text-warning mb-2"></i>
              <h6>Agent Report</h6>
              <p className="text-muted">Agent performance and metrics</p>
              <button className="btn btn-warning btn-sm">
                <i className="fas fa-download me-2"></i>Download
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card">
            <div className="card-body text-center">
              <i className="fas fa-seedling fa-2x text-info mb-2"></i>
              <h6>Crop Report</h6>
              <p className="text-muted">Crop-wise analysis and predictions</p>
              <button className="btn btn-info btn-sm">
                <i className="fas fa-download me-2"></i>Download
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card">
            <div className="card-body text-center">
              <i className="fas fa-money-bill fa-2x text-danger mb-2"></i>
              <h6>Payment Report</h6>
              <p className="text-muted">Payment tracking and analysis</p>
              <button className="btn btn-danger btn-sm">
                <i className="fas fa-download me-2"></i>Download
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card">
            <div className="card-body text-center">
              <i className="fas fa-chart-pie fa-2x text-secondary mb-2"></i>
              <h6>Analytics Report</h6>
              <p className="text-muted">Comprehensive analytics overview</p>
              <button className="btn btn-secondary btn-sm">
                <i className="fas fa-download me-2"></i>Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-lg navbar-custom">
        <div className="container-fluid">
          <span className="navbar-brand text-white">
            <i className="fas fa-crown me-2"></i>
            Admin Dashboard
          </span>
          <div className="navbar-nav ms-auto">
            <span className="navbar-text text-white me-3">
              Welcome, {user.name} (ID: {user.id})
            </span>
            <button className="btn btn-outline-light" onClick={onLogout}>
              <i className="fas fa-sign-out-alt me-2"></i>Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="row">
        <div className="col-md-2 sidebar">
          <nav className="nav flex-column">
            <button 
              className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <i className="fas fa-tachometer-alt me-2"></i>Overview
            </button>
            <button 
              className={`nav-link ${activeTab === 'agent-supervision' ? 'active' : ''}`}
              onClick={() => setActiveTab('agent-supervision')}
            >
              <i className="fas fa-user-tie me-2"></i>Agent Supervision
            </button>
            <button 
              className={`nav-link ${activeTab === 'analytics' ? 'active' : ''}`}
              onClick={() => setActiveTab('analytics')}
            >
              <i className="fas fa-chart-bar me-2"></i>Analytics
            </button>
            <button 
              className={`nav-link ${activeTab === 'company-metrics' ? 'active' : ''}`}
              onClick={() => setActiveTab('company-metrics')}
            >
              <i className="fas fa-building me-2"></i>Company Metrics
            </button>
            <button 
              className={`nav-link ${activeTab === 'reports' ? 'active' : ''}`}
              onClick={() => setActiveTab('reports')}
            >
              <i className="fas fa-file-alt me-2"></i>Reports
            </button>
          </nav>
        </div>

        <div className="col-md-10 p-4">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'agent-supervision' && renderAgentSupervision()}
          {activeTab === 'analytics' && renderAnalytics()}
          {activeTab === 'company-metrics' && renderCompanyMetrics()}
          {activeTab === 'reports' && renderReports()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 