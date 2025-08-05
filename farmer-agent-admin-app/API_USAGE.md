# API Usage Guide

This document explains how to use the axios-based API service for the AgriConnect application.

## Overview

The application now uses axios for all API calls with proper error handling, authentication, and organized service functions.

## API Service Structure

### 1. Base Configuration (`src/services/api.js`)

- **Base URL**: `http://localhost:5000/api`
- **Authentication**: Automatic token inclusion via interceptors
- **Error Handling**: Automatic 401 handling and token cleanup

### 2. Available API Services

#### Authentication API (`authAPI`)
```javascript
import { authAPI } from '../services/api';

// Login
const loginData = await authAPI.login(email, password, role);

// Register
const registerData = await authAPI.register(userData);

// Get Profile
const profile = await authAPI.getProfile();

// Change Password
await authAPI.changePassword(currentPassword, newPassword);

// Update Profile
await authAPI.updateProfile(userData);
```

#### Dashboard API (`dashboardAPI`)
```javascript
import { dashboardAPI } from '../services/api';

// Farmer Dashboard
const farmerStats = await dashboardAPI.getFarmerStats();
const farmerCrops = await dashboardAPI.getFarmerCrops();
const farmerPayments = await dashboardAPI.getFarmerPayments();
const farmerMedia = await dashboardAPI.getFarmerMedia();

// Agent Dashboard
const agentStats = await dashboardAPI.getAgentStats();
const agentFarmers = await dashboardAPI.getAgentFarmers();
const agentCrops = await dashboardAPI.getAgentCrops();
const agentPayments = await dashboardAPI.getAgentPayments();
const agentMediaRequests = await dashboardAPI.getAgentMediaRequests();

// Admin Dashboard
const adminStats = await dashboardAPI.getAdminStats();
const adminUsers = await dashboardAPI.getAdminUsers();
const adminAgents = await dashboardAPI.getAdminAgents();
const adminFarmers = await dashboardAPI.getAdminFarmers();
```

#### Crop API (`cropAPI`)
```javascript
import { cropAPI } from '../services/api';

// Create Crop
const newCrop = await cropAPI.createCrop(cropData);

// Update Crop
const updatedCrop = await cropAPI.updateCrop(cropId, cropData);

// Delete Crop
await cropAPI.deleteCrop(cropId);

// Get Crop
const crop = await cropAPI.getCrop(cropId);

// Get All Crops
const crops = await cropAPI.getAllCrops();

// Approve Crop
const approvedCrop = await cropAPI.approveCrop(cropId, approvalData);
```

#### Payment API (`paymentAPI`)
```javascript
import { paymentAPI } from '../services/api';

// Create Payment Order
const order = await paymentAPI.createOrder(paymentData);

// Verify Payment
const verification = await paymentAPI.verifyPayment(paymentData);

// Get Payment History
const history = await paymentAPI.getPaymentHistory();

// Get Payment Status
const status = await paymentAPI.getPaymentStatus(paymentId);
```

#### Media API (`mediaAPI`)
```javascript
import { mediaAPI } from '../services/api';

// Upload Media
const formData = new FormData();
formData.append('file', file);
formData.append('description', description);
const uploadedMedia = await mediaAPI.uploadMedia(formData);

// Get Media Requests
const requests = await mediaAPI.getMediaRequests();

// Approve Media
const approvedMedia = await mediaAPI.approveMedia(mediaId, approvalData);

// Reject Media
const rejectedMedia = await mediaAPI.rejectMedia(mediaId, rejectionData);
```

#### User Management API (`userAPI`)
```javascript
import { userAPI } from '../services/api';

// Get All Users
const users = await userAPI.getAllUsers();

// Update User
const updatedUser = await userAPI.updateUser(userId, userData);

// Delete User
await userAPI.deleteUser(userId);

// Update User Status
await userAPI.updateUserStatus(userId, status);

// Assign Agent
await userAPI.assignAgent(farmerId, agentId);
```

## Usage Examples

### 1. In Components

```javascript
import React, { useState, useEffect } from 'react';
import { dashboardAPI, cropAPI } from '../services/api';

const MyComponent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch dashboard data
        const stats = await dashboardAPI.getFarmerStats();
        const crops = await dashboardAPI.getFarmerCrops();
        
        setData({ stats, crops });
      } catch (err) {
        setError(err.message);
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCreateCrop = async () => {
    try {
      const newCrop = await cropAPI.createCrop({
        name: 'Wheat',
        type: 'Grain',
        quantity: 100,
        unit: 'kg'
      });
      console.log('New crop created:', newCrop);
    } catch (err) {
      console.error('Error creating crop:', err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Dashboard Data</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={handleCreateCrop}>Create Crop</button>
    </div>
  );
};
```

### 2. Error Handling

The API service automatically handles common errors:

- **401 Unauthorized**: Automatically removes token and redirects to login
- **Network Errors**: Provides user-friendly error messages
- **Server Errors**: Displays server error messages

```javascript
try {
  const data = await dashboardAPI.getFarmerStats();
  // Handle success
} catch (error) {
  // Error is already formatted with user-friendly message
  console.error('API Error:', error.message);
  // Show error to user
  setError(error.message);
}
```

### 3. Authentication Context

The `AuthContext` now uses the new API service:

```javascript
import { useAuth } from '../context/AuthContext';

const MyComponent = () => {
  const { user, login, logout, isAuthenticated } = useAuth();

  const handleLogin = async () => {
    try {
      await login(email, password, role);
      // Login successful
    } catch (error) {
      // Handle login error
      console.error('Login failed:', error.message);
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {user.name}!</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
};
```

## Testing

Visit `/dashboard-example` route to test the API functionality:

1. Login with any role (farmer, agent, admin)
2. Navigate to `/dashboard-example`
3. View the dashboard data fetched from the backend
4. Click the action buttons to test different API calls
5. Check the browser console for API responses

## Backend Integration

The API service is configured to work with the backend running on:
- **URL**: `http://localhost:5000/api`
- **Authentication**: Bearer token in Authorization header
- **Content-Type**: `application/json` (except for file uploads)

## Benefits

1. **Centralized Configuration**: All API settings in one place
2. **Automatic Authentication**: Tokens automatically included in requests
3. **Error Handling**: Consistent error handling across the app
4. **Type Safety**: Organized API functions with clear parameters
5. **Reusability**: Easy to import and use in any component
6. **Maintainability**: Easy to update API endpoints and logic 