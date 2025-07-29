import React, { useState, useEffect } from 'react';

const FarmerDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [cropForm, setCropForm] = useState({
    cropName: '',
    startDate: '',
    endDate: '',
    quantity: '',
    price: '',
    status: 'pending'
  });
  const [crops, setCrops] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [mediaUpload, setMediaUpload] = useState({
    description: '',
    file: null
  });
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    setCrops([
      {
        id: 1,
        name: 'Rice',
        startDate: '2024-01-15',
        endDate: '2024-06-15',
        status: 'active',
        quantity: '500 kg',
        price: '₹25/kg',
        totalValue: '₹12,500'
      },
      {
        id: 2,
        name: 'Wheat',
        startDate: '2024-02-01',
        endDate: '2024-07-01',
        status: 'completed',
        quantity: '300 kg',
        price: '₹30/kg',
        totalValue: '₹9,000'
      }
    ]);

    setNotifications([
      {
        id: 1,
        type: 'weather',
        title: 'Weather Alert',
        message: 'Heavy rainfall expected in next 48 hours. Protect your crops.',
        timestamp: '2024-01-20 10:30 AM',
        read: false
      },
      {
        id: 2,
        type: 'prediction',
        title: 'Crop Prediction',
        message: 'Rice prices expected to increase by 15% in next month.',
        timestamp: '2024-01-19 02:15 PM',
        read: true
      },
      {
        id: 3,
        type: 'pesticide',
        title: 'Pesticide Recommendation',
        message: 'Apply neem-based pesticide to prevent pest infestation.',
        timestamp: '2024-01-18 09:45 AM',
        read: false
      }
    ]);

    setPayments([
      {
        id: 1,
        service: 'Rice Cultivation',
        estimatedCost: '₹8,000',
        serviceFee: '₹2,000',
        profitShare: '₹1,875',
        total: '₹11,875',
        status: 'paid'
      },
      {
        id: 2,
        service: 'Wheat Cultivation',
        estimatedCost: '₹6,000',
        serviceFee: '₹1,500',
        profitShare: '₹1,350',
        total: '₹8,850',
        status: 'pending'
      }
    ]);
  }, []);

  const handleCropSubmit = (e) => {
    e.preventDefault();
    const newCrop = {
      id: crops.length + 1,
      ...cropForm,
      totalValue: `₹${parseInt(cropForm.quantity) * parseInt(cropForm.price)}`
    };
    setCrops([...crops, newCrop]);
    setCropForm({
      cropName: '',
      startDate: '',
      endDate: '',
      quantity: '',
      price: '',
      status: 'pending'
    });
    alert('Crop registered successfully!');
  };

  const handleMediaUpload = (e) => {
    e.preventDefault();
    if (mediaUpload.file && mediaUpload.description) {
      alert('Media uploaded successfully! Agent will review your request.');
      setMediaUpload({ description: '', file: null });
    } else {
      alert('Please select a file and add description.');
    }
  };

  const handleFileChange = (e) => {
    setMediaUpload({
      ...mediaUpload,
      file: e.target.files[0]
    });
  };

  const markNotificationAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const calculateTotalRevenue = () => {
    return payments.reduce((sum, p) => sum + parseInt(p.total.replace('₹', '').replace(',', '')), 0).toLocaleString();
  };

  const calculateTotalServiceFees = () => {
    return payments.reduce((sum, p) => sum + parseInt(p.serviceFee.replace('₹', '').replace(',', '')), 0).toLocaleString();
  };

  const renderOverview = () => (
    <div className="row">
      <div className="col-md-3 mb-4">
        <div className="metric-card">
          <h3>{crops.length}</h3>
          <p>Total Crops</p>
        </div>
      </div>
      <div className="col-md-3 mb-4">
        <div className="metric-card">
          <h3>{notifications.filter(n => !n.read).length}</h3>
          <p>Unread Notifications</p>
        </div>
      </div>
      <div className="col-md-3 mb-4">
        <div className="metric-card">
          <h3>₹{calculateTotalRevenue()}</h3>
          <p>Total Revenue</p>
        </div>
      </div>
      <div className="col-md-3 mb-4">
        <div className="metric-card">
          <h3>₹{calculateTotalServiceFees()}</h3>
          <p>Service Fees Paid</p>
        </div>
      </div>

      <div className="col-md-6">
        <div className="dashboard-card">
          <h5><i className="fas fa-seedling me-2"></i>Recent Crops</h5>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Crop</th>
                  <th>Status</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {crops.slice(0, 3).map(crop => (
                  <tr key={crop.id}>
                    <td>{crop.name}</td>
                    <td>
                      <span className={`status-${crop.status}`}>
                        {crop.status}
                      </span>
                    </td>
                    <td>{crop.totalValue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="col-md-6">
        <div className="dashboard-card">
          <h5><i className="fas fa-bell me-2"></i>Recent Notifications</h5>
          {notifications.slice(0, 3).map(notification => (
            <div key={notification.id} className="notification-item">
              <h6>{notification.title}</h6>
              <p className="mb-1">{notification.message}</p>
              <small className="text-muted">{notification.timestamp}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCropRegistration = () => (
    <div className="dashboard-card">
      <h5><i className="fas fa-plus-circle me-2"></i>Register New Crop</h5>
      <form onSubmit={handleCropSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Crop Name</label>
              <input
                type="text"
                className="form-control form-control-custom"
                value={cropForm.cropName}
                onChange={(e) => setCropForm({...cropForm, cropName: e.target.value})}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Start Date</label>
              <input
                type="date"
                className="form-control form-control-custom"
                value={cropForm.startDate}
                onChange={(e) => setCropForm({...cropForm, startDate: e.target.value})}
                required
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">End Date</label>
              <input
                type="date"
                className="form-control form-control-custom"
                value={cropForm.endDate}
                onChange={(e) => setCropForm({...cropForm, endDate: e.target.value})}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Quantity (kg)</label>
              <input
                type="number"
                className="form-control form-control-custom"
                value={cropForm.quantity}
                onChange={(e) => setCropForm({...cropForm, quantity: e.target.value})}
                required
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Price per kg (₹)</label>
              <input
                type="number"
                className="form-control form-control-custom"
                value={cropForm.price}
                onChange={(e) => setCropForm({...cropForm, price: e.target.value})}
                required
              />
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary-custom">
          Register Crop
        </button>
      </form>
    </div>
  );

  const renderCropManagement = () => (
    <div className="dashboard-card">
      <h5><i className="fas fa-list me-2"></i>Crop Management</h5>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Crop Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total Value</th>
            </tr>
          </thead>
          <tbody>
            {crops.map(crop => (
              <tr key={crop.id}>
                <td>{crop.name}</td>
                <td>{crop.startDate}</td>
                <td>{crop.endDate}</td>
                <td>
                  <span className={`status-${crop.status}`}>
                    {crop.status}
                  </span>
                </td>
                <td>{crop.quantity}</td>
                <td>{crop.price}</td>
                <td>{crop.totalValue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="dashboard-card">
      <h5><i className="fas fa-bell me-2"></i>Notifications</h5>
      {notifications.map(notification => (
        <div 
          key={notification.id} 
          className={`notification-item ${!notification.read ? 'border-warning' : ''}`}
          onClick={() => markNotificationAsRead(notification.id)}
          style={{ cursor: 'pointer' }}
        >
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h6 className="mb-1">
                <i className={`fas fa-${notification.type === 'weather' ? 'cloud-rain' : notification.type === 'prediction' ? 'chart-line' : 'bug'} me-2`}></i>
                {notification.title}
              </h6>
              <p className="mb-1">{notification.message}</p>
              <small className="text-muted">{notification.timestamp}</small>
            </div>
            {!notification.read && (
              <span className="badge bg-warning">New</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const renderMediaUpload = () => (
    <div className="dashboard-card">
      <h5><i className="fas fa-upload me-2"></i>Media Upload</h5>
      <form onSubmit={handleMediaUpload}>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control form-control-custom"
            rows="4"
            value={mediaUpload.description}
            onChange={(e) => setMediaUpload({...mediaUpload, description: e.target.value})}
            placeholder="Describe your query or request..."
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Upload Photo/Video</label>
          <div className="upload-area">
            <input
              type="file"
              className="form-control"
              accept="image/*,video/*"
              onChange={handleFileChange}
              required
            />
            <small className="text-muted">Supported formats: JPG, PNG, MP4, AVI</small>
          </div>
        </div>
        <button type="submit" className="btn btn-primary-custom">
          Upload Media
        </button>
      </form>
    </div>
  );

  const renderPayments = () => (
    <div className="dashboard-card">
      <h5><i className="fas fa-money-bill me-2"></i>Payment Details</h5>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Service</th>
              <th>Estimated Cost</th>
              <th>Service Fee (25%)</th>
              <th>Profit Share (15%)</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(payment => (
              <tr key={payment.id}>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderAgentContact = () => (
    <div className="dashboard-card">
      <h5><i className="fas fa-user-tie me-2"></i>Assigned Agent</h5>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h6>Agent Details</h6>
              <p><strong>Name:</strong> Sarah Agent</p>
              <p><strong>Phone:</strong> +91 98765 43210</p>
              <p><strong>Email:</strong> sarah.agent@example.com</p>
              <p><strong>Region:</strong> North Region</p>
              <button className="btn btn-primary-custom mt-2">
                <i className="fas fa-phone me-2"></i>Call Agent
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h6>Quick Actions</h6>
              <button className="btn btn-outline-primary w-100 mb-2">
                <i className="fas fa-comment me-2"></i>Send Message
              </button>
              <button className="btn btn-outline-success w-100 mb-2">
                <i className="fas fa-calendar me-2"></i>Schedule Meeting
              </button>
              <button className="btn btn-outline-info w-100">
                <i className="fas fa-file-alt me-2"></i>Request Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const navItems = [
    { id: 'overview', icon: 'fas fa-tachometer-alt', label: 'Overview' },
    { id: 'crop-registration', icon: 'fas fa-plus-circle', label: 'Register Crop' },
    { id: 'crop-management', icon: 'fas fa-list', label: 'Crop Management' },
    { id: 'notifications', icon: 'fas fa-bell', label: 'Notifications' },
    { id: 'media-upload', icon: 'fas fa-upload', label: 'Media Upload' },
    { id: 'payments', icon: 'fas fa-money-bill', label: 'Payments' },
    { id: 'agent-contact', icon: 'fas fa-user-tie', label: 'Agent Contact' }
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'overview': return renderOverview();
      case 'crop-registration': return renderCropRegistration();
      case 'crop-management': return renderCropManagement();
      case 'notifications': return renderNotifications();
      case 'media-upload': return renderMediaUpload();
      case 'payments': return renderPayments();
      case 'agent-contact': return renderAgentContact();
      default: return renderOverview();
    }
  };

  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-lg navbar-custom">
        <div className="container-fluid">
          <span className="navbar-brand text-white">
            <i className="fas fa-seedling me-2"></i>
            Farmer Dashboard
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
            {navItems.map(item => (
              <button 
                key={item.id}
                className={`nav-link ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <i className={`${item.icon} me-2`}></i>{item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="col-md-10 p-4">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard; 