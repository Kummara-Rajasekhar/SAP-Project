import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { dashboardAPI, cropAPI, paymentAPI, mediaAPI } from '../services/api';

const DashboardExample = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        let data = {};

        // Fetch data based on user role
        switch (user?.role) {
          case 'farmer':
            const [farmerStats, farmerCrops, farmerPayments, farmerMedia] = await Promise.all([
              dashboardAPI.getFarmerStats(),
              dashboardAPI.getFarmerCrops(),
              dashboardAPI.getFarmerPayments(),
              dashboardAPI.getFarmerMedia()
            ]);
            data = { stats: farmerStats, crops: farmerCrops, payments: farmerPayments, media: farmerMedia };
            break;

          case 'agent':
            const [agentStats, agentFarmers, agentCrops, agentPayments, agentMediaRequests] = await Promise.all([
              dashboardAPI.getAgentStats(),
              dashboardAPI.getAgentFarmers(),
              dashboardAPI.getAgentCrops(),
              dashboardAPI.getAgentPayments(),
              dashboardAPI.getAgentMediaRequests()
            ]);
            data = { 
              stats: agentStats, 
              farmers: agentFarmers, 
              crops: agentCrops, 
              payments: agentPayments, 
              mediaRequests: agentMediaRequests 
            };
            break;

          case 'admin':
            const [adminStats, adminUsers, adminAgents, adminFarmers] = await Promise.all([
              dashboardAPI.getAdminStats(),
              dashboardAPI.getAdminUsers(),
              dashboardAPI.getAdminAgents(),
              dashboardAPI.getAdminFarmers()
            ]);
            data = { stats: adminStats, users: adminUsers, agents: adminAgents, farmers: adminFarmers };
            break;

          default:
            throw new Error('Invalid user role');
        }

        setDashboardData(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const handleCropAction = async (action, cropId, data = {}) => {
    try {
      switch (action) {
        case 'create':
          const newCrop = await cropAPI.createCrop(data);
          console.log('New crop created:', newCrop);
          break;
        case 'update':
          const updatedCrop = await cropAPI.updateCrop(cropId, data);
          console.log('Crop updated:', updatedCrop);
          break;
        case 'delete':
          await cropAPI.deleteCrop(cropId);
          console.log('Crop deleted');
          break;
        case 'approve':
          const approvedCrop = await cropAPI.approveCrop(cropId, data);
          console.log('Crop approved:', approvedCrop);
          break;
        default:
          console.log('Unknown action');
      }
    } catch (err) {
      console.error('Error performing crop action:', err);
    }
  };

  const handlePaymentAction = async (action, paymentData = {}) => {
    try {
      switch (action) {
        case 'createOrder':
          const order = await paymentAPI.createOrder(paymentData);
          console.log('Payment order created:', order);
          break;
        case 'verify':
          const verification = await paymentAPI.verifyPayment(paymentData);
          console.log('Payment verified:', verification);
          break;
        case 'history':
          const history = await paymentAPI.getPaymentHistory();
          console.log('Payment history:', history);
          break;
        default:
          console.log('Unknown payment action');
      }
    } catch (err) {
      console.error('Error performing payment action:', err);
    }
  };

  const handleMediaAction = async (action, mediaId, data = {}) => {
    try {
      switch (action) {
        case 'upload':
          const formData = new FormData();
          formData.append('file', data.file);
          formData.append('description', data.description);
          const uploadedMedia = await mediaAPI.uploadMedia(formData);
          console.log('Media uploaded:', uploadedMedia);
          break;
        case 'approve':
          const approvedMedia = await mediaAPI.approveMedia(mediaId, data);
          console.log('Media approved:', approvedMedia);
          break;
        case 'reject':
          const rejectedMedia = await mediaAPI.rejectMedia(mediaId, data);
          console.log('Media rejected:', rejectedMedia);
          break;
        default:
          console.log('Unknown media action');
      }
    } catch (err) {
      console.error('Error performing media action:', err);
    }
  };

  if (loading) {
    return <div className="p-4">Loading dashboard data...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">Error: {error}</div>;
  }

  if (!user) {
    return <div className="p-4">Please log in to view dashboard data.</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">
        {user.role.charAt(0).toUpperCase() + user.role.slice(1)} Dashboard
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Stats Card */}
        {dashboardData?.stats && (
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-2">Statistics</h3>
            <pre className="text-sm bg-gray-100 p-2 rounded">
              {JSON.stringify(dashboardData.stats, null, 2)}
            </pre>
          </div>
        )}

        {/* Crops Card */}
        {dashboardData?.crops && (
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-2">Crops</h3>
            <pre className="text-sm bg-gray-100 p-2 rounded">
              {JSON.stringify(dashboardData.crops, null, 2)}
            </pre>
          </div>
        )}

        {/* Payments Card */}
        {dashboardData?.payments && (
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-2">Payments</h3>
            <pre className="text-sm bg-gray-100 p-2 rounded">
              {JSON.stringify(dashboardData.payments, null, 2)}
            </pre>
          </div>
        )}

        {/* Additional role-specific cards */}
        {user.role === 'agent' && dashboardData?.farmers && (
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-2">Assigned Farmers</h3>
            <pre className="text-sm bg-gray-100 p-2 rounded">
              {JSON.stringify(dashboardData.farmers, null, 2)}
            </pre>
          </div>
        )}

        {user.role === 'admin' && dashboardData?.users && (
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-2">All Users</h3>
            <pre className="text-sm bg-gray-100 p-2 rounded">
              {JSON.stringify(dashboardData.users, null, 2)}
            </pre>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-6 space-y-4">
        <h3 className="text-lg font-semibold">API Actions (Check Console)</h3>
        
        <div className="space-x-2">
          <button
            onClick={() => handleCropAction('create', null, { name: 'Test Crop', type: 'Wheat' })}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Create Crop
          </button>
          
          <button
            onClick={() => handlePaymentAction('createOrder', { amount: 1000, currency: 'INR' })}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Create Payment Order
          </button>
          
          <button
            onClick={() => handleMediaAction('upload', null, { description: 'Test upload' })}
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
          >
            Upload Media
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardExample; 