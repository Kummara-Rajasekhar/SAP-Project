import axios from 'axios';

// Configure axios defaults
const API_BASE_URL = 'http://localhost:5000/api';
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Create axios instance with interceptors
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    return Promise.reject(error);
  }
);

// Generic API call helper
export const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await api.request({
      url: endpoint,
      ...options
    });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || 'Network error';
    throw new Error(message);
  }
};

// Auth API functions
export const authAPI = {
  login: (email, password, role) => 
    apiCall('/auth/login', { method: 'POST', data: { email, password, role } }),
  
  register: (userData) => 
    apiCall('/auth/register', { method: 'POST', data: userData }),
  
  getProfile: () => 
    apiCall('/auth/me'),
  
  changePassword: (currentPassword, newPassword) => 
    apiCall('/auth/change-password', { method: 'PUT', data: { currentPassword, newPassword } }),
  
  updateProfile: (userData) => 
    apiCall('/user/profile', { method: 'PUT', data: userData })
};

// Dashboard API functions
export const dashboardAPI = {
  // Farmer dashboard
  getFarmerStats: () => 
    apiCall('/farmer/dashboard'),
  
  getFarmerCrops: () => 
    apiCall('/farmer/crops'),
  
  getFarmerPayments: () => 
    apiCall('/farmer/payments'),
  
  getFarmerMedia: () => 
    apiCall('/farmer/media'),
  
  // Agent dashboard
  getAgentStats: () => 
    apiCall('/agent/dashboard'),
  
  getAgentFarmers: () => 
    apiCall('/agent/farmers'),
  
  getAgentCrops: () => 
    apiCall('/agent/crops'),
  
  getAgentPayments: () => 
    apiCall('/agent/payments'),
  
  getAgentMediaRequests: () => 
    apiCall('/agent/media-requests'),
  
  // Admin dashboard
  getAdminStats: () => 
    apiCall('/admin/dashboard'),
  
  getAdminUsers: () => 
    apiCall('/admin/users'),
  
  getAdminAgents: () => 
    apiCall('/admin/agents'),
  
  getAdminFarmers: () => 
    apiCall('/admin/farmers')
};

// Crop API functions
export const cropAPI = {
  createCrop: (cropData) => 
    apiCall('/crop', { method: 'POST', data: cropData }),
  
  updateCrop: (id, cropData) => 
    apiCall(`/crop/${id}`, { method: 'PUT', data: cropData }),
  
  deleteCrop: (id) => 
    apiCall(`/crop/${id}`, { method: 'DELETE' }),
  
  getCrop: (id) => 
    apiCall(`/crop/${id}`),
  
  getAllCrops: () => 
    apiCall('/crop'),
  
  approveCrop: (id, approvalData) => 
    apiCall(`/crop/${id}/approve`, { method: 'PUT', data: approvalData })
};

// Payment API functions
export const paymentAPI = {
  createOrder: (paymentData) => 
    apiCall('/payment/create-order', { method: 'POST', data: paymentData }),
  
  verifyPayment: (paymentData) => 
    apiCall('/payment/verify', { method: 'POST', data: paymentData }),
  
  getPaymentHistory: () => 
    apiCall('/payment/history'),
  
  getPaymentStatus: (id) => 
    apiCall(`/payment/${id}`)
};

// Media API functions
export const mediaAPI = {
  uploadMedia: (formData) => 
    api.post('/media/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(response => response.data),
  
  getMediaRequests: () => 
    apiCall('/media/requests'),
  
  approveMedia: (id, approvalData) => 
    apiCall(`/media/${id}/approve`, { method: 'PUT', data: approvalData }),
  
  rejectMedia: (id, rejectionData) => 
    apiCall(`/media/${id}/reject`, { method: 'PUT', data: rejectionData })
};

// User management API functions
export const userAPI = {
  getAllUsers: () => 
    apiCall('/admin/users'),
  
  updateUser: (id, userData) => 
    apiCall(`/admin/users/${id}`, { method: 'PUT', data: userData }),
  
  deleteUser: (id) => 
    apiCall(`/admin/users/${id}`, { method: 'DELETE' }),
  
  updateUserStatus: (id, status) => 
    apiCall(`/admin/users/${id}/status`, { method: 'PUT', data: { status } }),
  
  assignAgent: (farmerId, agentId) => 
    apiCall('/admin/assign-agent', { method: 'POST', data: { farmerId, agentId } })
};

export default api; 