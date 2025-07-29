import React, { useState, useEffect } from 'react';

const AgentDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [farmers, setFarmers] = useState([]);
  const [pendingFarmers, setPendingFarmers] = useState([]);
  const [crops, setCrops] = useState([]);
  const [aiPredictions, setAiPredictions] = useState([]);
  const [payments, setPayments] = useState([]);
  const [rejectionReason, setRejectionReason] = useState('');

  useEffect(() => {
    // Mock data initialization
    setFarmers([
      {
        id: 'F001',
        name: 'John Farmer',
        phone: '+91 98765 43210',
        email: 'john@example.com',
        region: 'North Region',
        acres: 5,
        status: 'approved',
        crops: ['Rice', 'Wheat']
      },
      {
        id: 'F002',
        name: 'Mary Farmer',
        phone: '+91 98765 43211',
        email: 'mary@example.com',
        region: 'North Region',
        acres: 3,
        status: 'approved',
        crops: ['Corn']
      }
    ]);

    setPendingFarmers([
      {
        id: 'F003',
        name: 'David Farmer',
        phone: '+91 98765 43212',
        email: 'david@example.com',
        region: 'North Region',
        acres: 4,
        status: 'pending',
        registrationDate: '2024-01-20'
      }
    ]);

    setCrops([
      {
        id: 1,
        farmerId: 'F001',
        farmerName: 'John Farmer',
        cropName: 'Rice',
        startDate: '2024-01-15',
        endDate: '2024-06-15',
        status: 'active',
        quantity: '500 kg',
        estimatedRevenue: '₹12,500'
      },
      {
        id: 2,
        farmerId: 'F001',
        farmerName: 'John Farmer',
        cropName: 'Wheat',
        startDate: '2024-02-01',
        endDate: '2024-07-01',
        status: 'completed',
        quantity: '300 kg',
        estimatedRevenue: '₹9,000'
      }
    ]);

    setAiPredictions([
      {
        id: 1,
        cropType: 'Rice',
        prediction: 'Price increase by 15% in next month',
        confidence: '85%',
        farmers: ['F001'],
        timestamp: '2024-01-20 10:30 AM'
      },
      {
        id: 2,
        cropType: 'Wheat',
        prediction: 'Optimal harvest time: Mid-June',
        confidence: '92%',
        farmers: ['F001'],
        timestamp: '2024-01-19 02:15 PM'
      }
    ]);

    setPayments([
      {
        id: 1,
        farmerId: 'F001',
        farmerName: 'John Farmer',
        service: 'Rice Cultivation',
        estimatedCost: '₹8,000',
        serviceFee: '₹2,000',
        profitShare: '₹1,875',
        total: '₹11,875',
        status: 'paid'
      },
      {
        id: 2,
        farmerId: 'F002',
        farmerName: 'Mary Farmer',
        service: 'Corn Cultivation',
        estimatedCost: '₹5,000',
        serviceFee: '₹1,250',
        profitShare: '₹750',
        total: '₹7,000',
        status: 'pending'
      }
    ]);
  }, []);

  const handleFarmerAction = (farmerId, action) => {
    if (action === 'reject' && !rejectionReason) {
      alert('Please provide a rejection reason.');
      return;
    }

    const farmer = pendingFarmers.find(f => f.id === farmerId);
    if (action === 'approve') {
      setFarmers([...farmers, { ...farmer, status: 'approved' }]);
      setPendingFarmers(pendingFarmers.filter(f => f.id !== farmerId));
      alert('Farmer approved successfully!');
    } else if (action === 'reject') {
      setPendingFarmers(pendingFarmers.filter(f => f.id !== farmerId));
      alert(`Farmer rejected. Reason: ${rejectionReason}`);
      setRejectionReason('');
    }
  };

  const sendPredictionToFarmers = (predictionId) => {
    const prediction = aiPredictions.find(p => p.id === predictionId);
    alert(`Prediction sent to ${prediction.farmers.length} farmers: ${prediction.prediction}`);
  };

  const generateBill = (paymentId) => {
    const payment = payments.find(p => p.id === paymentId);
    alert(`Bill generated for ${payment.farmerName}: ${payment.total}`);
  };

  const renderOverview = () => (
    <div className="row">
      <div className="col-md-3 mb-4">
        <div className="metric-card">
          <h3>{farmers.length}</h3>
          <p>Total Farmers</p>
        </div>
      </div>
      <div className="col-md-3 mb-4">
        <div className="metric-card">
          <h3>{pendingFarmers.length}</h3>
          <p>Pending Approvals</p>
        </div>
      </div>
      <div className="col-md-3 mb-4">
        <div className="metric-card">
          <h3>₹{payments.reduce((sum, p) => sum + parseInt(p.total.replace('₹', '').replace(',', '')), 0).toLocaleString()}</h3>
          <p>Total Revenue</p>
        </div>
      </div>
      <div className="col-md-3 mb-4">
        <div className="metric-card">
          <h3>{crops.filter(c => c.status === 'active').length}</h3>
          <p>Active Crops</p>
        </div>
      </div>

      <div className="col-md-6">
        <div className="dashboard-card">
          <h5><i className="fas fa-users me-2"></i>Recent Farmers</h5>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>ID</th>
                  <th>Status</th>
                  <th>Crops</th>
                </tr>
              </thead>
              <tbody>
                {farmers.slice(0, 3).map(farmer => (
                  <tr key={farmer.id}>
                    <td>{farmer.name}</td>
                    <td>{farmer.id}</td>
                    <td>
                      <span className={`status-${farmer.status}`}>
                        {farmer.status}
                      </span>
                    </td>
                    <td>{farmer.crops.join(', ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="col-md-6">
        <div className="dashboard-card">
          <h5><i className="fas fa-chart-line me-2"></i>Recent AI Predictions</h5>
          {aiPredictions.slice(0, 3).map(prediction => (
            <div key={prediction.id} className="notification-item">
              <h6>{prediction.cropType} - {prediction.prediction}</h6>
              <p className="mb-1">Confidence: {prediction.confidence}</p>
              <small className="text-muted">{prediction.timestamp}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderFarmerManagement = () => (
    <div className="row">
      <div className="col-md-6">
        <div className="dashboard-card">
          <h5><i className="fas fa-clock me-2"></i>Pending Approvals</h5>
          {pendingFarmers.map(farmer => (
            <div key={farmer.id} className="card mb-3">
              <div className="card-body">
                <h6>{farmer.name} (ID: {farmer.id})</h6>
                <p className="mb-1"><strong>Phone:</strong> {farmer.phone}</p>
                <p className="mb-1"><strong>Email:</strong> {farmer.email}</p>
                <p className="mb-1"><strong>Acres:</strong> {farmer.acres}</p>
                <p className="mb-1"><strong>Registration Date:</strong> {farmer.registrationDate}</p>
                
                <div className="mt-3">
                  <button 
                    className="btn btn-success me-2"
                    onClick={() => handleFarmerAction(farmer.id, 'approve')}
                  >
                    <i className="fas fa-check me-2"></i>Approve
                  </button>
                  <button 
                    className="btn btn-danger"
                    onClick={() => document.getElementById('rejectionModal').style.display = 'block'}
                  >
                    <i className="fas fa-times me-2"></i>Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="col-md-6">
        <div className="dashboard-card">
          <h5><i className="fas fa-users me-2"></i>Approved Farmers</h5>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>ID</th>
                  <th>Phone</th>
                  <th>Acres</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {farmers.map(farmer => (
                  <tr key={farmer.id}>
                    <td>{farmer.name}</td>
                    <td>{farmer.id}</td>
                    <td>{farmer.phone}</td>
                    <td>{farmer.acres}</td>
                    <td>
                      <span className={`status-${farmer.status}`}>
                        {farmer.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Rejection Modal */}
      <div id="rejectionModal" className="modal" style={{display: 'none', position: 'fixed', zIndex: 1000, left: 0, top: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.4)'}}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Rejection Reason</h5>
              <button type="button" className="btn-close" onClick={() => document.getElementById('rejectionModal').style.display = 'none'}></button>
            </div>
            <div className="modal-body">
              <textarea
                className="form-control"
                rows="3"
                placeholder="Enter rejection reason..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => document.getElementById('rejectionModal').style.display = 'none'}>Cancel</button>
              <button type="button" className="btn btn-danger" onClick={() => {
                handleFarmerAction('F003', 'reject');
                document.getElementById('rejectionModal').style.display = 'none';
              }}>Reject</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCropSupport = () => (
    <div className="dashboard-card">
      <h5><i className="fas fa-seedling me-2"></i>Crop Support Overview</h5>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Farmer</th>
              <th>Crop</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Quantity</th>
              <th>Revenue</th>
            </tr>
          </thead>
          <tbody>
            {crops.map(crop => (
              <tr key={crop.id}>
                <td>{crop.farmerName}</td>
                <td>{crop.cropName}</td>
                <td>{crop.startDate}</td>
                <td>{crop.endDate}</td>
                <td>
                  <span className={`status-${crop.status}`}>
                    {crop.status}
                  </span>
                </td>
                <td>{crop.quantity}</td>
                <td>{crop.estimatedRevenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderAiTools = () => (
    <div className="row">
      <div className="col-md-6">
        <div className="dashboard-card">
          <h5><i className="fas fa-brain me-2"></i>AI Predictions</h5>
          {aiPredictions.map(prediction => (
            <div key={prediction.id} className="card mb-3">
              <div className="card-body">
                <h6>{prediction.cropType}</h6>
                <p className="mb-2">{prediction.prediction}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="badge bg-info">Confidence: {prediction.confidence}</span>
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={() => sendPredictionToFarmers(prediction.id)}
                  >
                    <i className="fas fa-paper-plane me-2"></i>Send to Farmers
                  </button>
                </div>
                <small className="text-muted">{prediction.timestamp}</small>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="col-md-6">
        <div className="dashboard-card">
          <h5><i className="fas fa-magic me-2"></i>AI Tools</h5>
          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="card text-center">
                <div className="card-body">
                  <i className="fas fa-chart-line fa-2x text-primary mb-2"></i>
                  <h6>Crop Prediction</h6>
                  <button className="btn btn-outline-primary btn-sm">
                    Generate
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card text-center">
                <div className="card-body">
                  <i className="fas fa-bug fa-2x text-success mb-2"></i>
                  <h6>Pesticide Recommendation</h6>
                  <button className="btn btn-outline-success btn-sm">
                    Generate
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card text-center">
                <div className="card-body">
                  <i className="fas fa-dollar-sign fa-2x text-warning mb-2"></i>
                  <h6>Price Prediction</h6>
                  <button className="btn btn-outline-warning btn-sm">
                    Generate
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="card text-center">
                <div className="card-body">
                  <i className="fas fa-cloud-sun fa-2x text-info mb-2"></i>
                  <h6>Weather Alert</h6>
                  <button className="btn btn-outline-info btn-sm">
                    Generate
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPayments = () => (
    <div className="dashboard-card">
      <h5><i className="fas fa-money-bill me-2"></i>Payment System</h5>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Farmer</th>
              <th>Service</th>
              <th>Estimated Cost</th>
              <th>Service Fee (25%)</th>
              <th>Profit Share (15%)</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(payment => (
              <tr key={payment.id}>
                <td>{payment.farmerName}</td>
                <td>{payment.service}</td>
                <td>{payment.estimatedCost}</td>
                <td>{payment.serviceFee}</td>
                <td>{payment.profitShare}</td>
                <td>{payment.total}</td>
                <td>
                  <span className={`status-${payment.status}`}>
                    {payment.status}
                  </span>
                </td>
                <td>
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={() => generateBill(payment.id)}
                  >
                    <i className="fas fa-file-invoice me-2"></i>Generate Bill
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderRegionalMetrics = () => (
    <div className="row">
      <div className="col-md-3 mb-4">
        <div className="metric-card">
          <h3>{farmers.length}</h3>
          <p>Total Farmers</p>
        </div>
      </div>
      <div className="col-md-3 mb-4">
        <div className="metric-card">
          <h3>₹{payments.reduce((sum, p) => sum + parseInt(p.total.replace('₹', '').replace(',', '')), 0).toLocaleString()}</h3>
          <p>Total Revenue</p>
        </div>
      </div>
      <div className="col-md-3 mb-4">
        <div className="metric-card">
          <h3>₹{payments.reduce((sum, p) => sum + parseInt(p.serviceFee.replace('₹', '').replace(',', '')), 0).toLocaleString()}</h3>
          <p>Service Fees</p>
        </div>
      </div>
      <div className="col-md-3 mb-4">
        <div className="metric-card">
          <h3>₹{payments.reduce((sum, p) => sum + parseInt(p.profitShare.replace('₹', '').replace(',', '')), 0).toLocaleString()}</h3>
          <p>Profit Share</p>
        </div>
      </div>

      <div className="col-md-6">
        <div className="dashboard-card">
          <h5><i className="fas fa-chart-pie me-2"></i>Crop Distribution</h5>
          <div className="row text-center">
            <div className="col-md-4">
              <div className="border rounded p-3">
                <h4>Rice</h4>
                <p className="text-primary">40%</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="border rounded p-3">
                <h4>Wheat</h4>
                <p className="text-success">35%</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="border rounded p-3">
                <h4>Corn</h4>
                <p className="text-warning">25%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-6">
        <div className="dashboard-card">
          <h5><i className="fas fa-chart-bar me-2"></i>Monthly Revenue</h5>
          <div className="row text-center">
            <div className="col-md-3">
              <div className="border rounded p-2">
                <h6>Jan</h6>
                <p className="text-primary">₹25,000</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="border rounded p-2">
                <h6>Feb</h6>
                <p className="text-success">₹30,000</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="border rounded p-2">
                <h6>Mar</h6>
                <p className="text-warning">₹28,000</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="border rounded p-2">
                <h6>Apr</h6>
                <p className="text-info">₹32,000</p>
              </div>
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
            <i className="fas fa-user-tie me-2"></i>
            Agent Dashboard
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
              className={`nav-link ${activeTab === 'farmer-management' ? 'active' : ''}`}
              onClick={() => setActiveTab('farmer-management')}
            >
              <i className="fas fa-users me-2"></i>Farmer Management
            </button>
            <button 
              className={`nav-link ${activeTab === 'crop-support' ? 'active' : ''}`}
              onClick={() => setActiveTab('crop-support')}
            >
              <i className="fas fa-seedling me-2"></i>Crop Support
            </button>
            <button 
              className={`nav-link ${activeTab === 'ai-tools' ? 'active' : ''}`}
              onClick={() => setActiveTab('ai-tools')}
            >
              <i className="fas fa-brain me-2"></i>AI Tools
            </button>
            <button 
              className={`nav-link ${activeTab === 'payments' ? 'active' : ''}`}
              onClick={() => setActiveTab('payments')}
            >
              <i className="fas fa-money-bill me-2"></i>Payments
            </button>
            <button 
              className={`nav-link ${activeTab === 'regional-metrics' ? 'active' : ''}`}
              onClick={() => setActiveTab('regional-metrics')}
            >
              <i className="fas fa-chart-bar me-2"></i>Regional Metrics
            </button>
          </nav>
        </div>

        <div className="col-md-10 p-4">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'farmer-management' && renderFarmerManagement()}
          {activeTab === 'crop-support' && renderCropSupport()}
          {activeTab === 'ai-tools' && renderAiTools()}
          {activeTab === 'payments' && renderPayments()}
          {activeTab === 'regional-metrics' && renderRegionalMetrics()}
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard; 