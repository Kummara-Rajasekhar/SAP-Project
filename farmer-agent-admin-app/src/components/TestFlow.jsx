import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../services/api';

const TestFlow = () => {
  const { login, register, user, isAuthenticated, logout } = useAuth();
  const [testData, setTestData] = useState({
    farmer: {
      name: 'Test Farmer',
      email: 'farmer@test.com',
      password: 'password123',
      phone: '1234567890',
      address: 'Test Address',
      role: 'farmer'
    },
    agent: {
      name: 'Test Agent',
      email: 'agent@test.com',
      password: 'password123',
      phone: '1234567890',
      address: 'Test Address',
      role: 'agent'
    },
    admin: {
      name: 'Test Admin',
      email: 'admin@test.com',
      password: 'password123',
      phone: '1234567890',
      address: 'Test Address',
      role: 'admin'
    }
  });

  const [currentStep, setCurrentStep] = useState('signup');
  const [selectedRole, setSelectedRole] = useState('farmer');
  const [message, setMessage] = useState('');

  const handleSignup = async (role) => {
    try {
      setMessage('Signing up...');
      const userData = testData[role];
      
      const result = await register(userData);
      setMessage(`✅ ${role} signup successful! User ID: ${result.user._id}`);
      setCurrentStep('login');
    } catch (error) {
      setMessage(`❌ Signup failed: ${error.message}`);
    }
  };

  const handleLogin = async (role) => {
    try {
      setMessage('Logging in...');
      const { email, password } = testData[role];
      
      const result = await login(email, password, role);
      setMessage(`✅ ${role} login successful! Welcome ${result.user.name}`);
      setCurrentStep('dashboard');
    } catch (error) {
      setMessage(`❌ Login failed: ${error.message}`);
    }
  };

  const handleLogout = () => {
    logout();
    setMessage('✅ Logged out successfully');
    setCurrentStep('signup');
  };

  const getDashboardRoute = (role) => {
    switch (role) {
      case 'farmer': return '/farmer-dashboard';
      case 'agent': return '/agent-dashboard';
      case 'admin': return '/admin-dashboard';
      default: return '/';
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">🧪 Test Flow: Signup → Login → Dashboard</h1>
      
      {/* Status Display */}
      <div className="mb-6 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Current Status:</h2>
        <p><strong>Authenticated:</strong> {isAuthenticated ? '✅ Yes' : '❌ No'}</p>
        <p><strong>Current User:</strong> {user ? `${user.name} (${user.role})` : 'None'}</p>
        <p><strong>Current Step:</strong> {currentStep}</p>
        {message && (
          <p className="mt-2 p-2 bg-blue-100 rounded">
            <strong>Message:</strong> {message}
          </p>
        )}
      </div>

      {/* Step 1: Signup */}
      {currentStep === 'signup' && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Step 1: User Signup</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.keys(testData).map((role) => (
              <div key={role} className="border p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 capitalize">{role} Signup</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Email: {testData[role].email}<br/>
                  Password: {testData[role].password}
                </p>
                <button
                  onClick={() => handleSignup(role)}
                  className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Signup as {role}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Login */}
      {currentStep === 'login' && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Step 2: User Login</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.keys(testData).map((role) => (
              <div key={role} className="border p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2 capitalize">{role} Login</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Email: {testData[role].email}<br/>
                  Password: {testData[role].password}
                </p>
                <button
                  onClick={() => handleLogin(role)}
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Login as {role}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Dashboard */}
      {currentStep === 'dashboard' && isAuthenticated && user && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Step 3: Role-Based Dashboard</h2>
          <div className="border p-6 rounded-lg bg-green-50">
            <h3 className="text-xl font-semibold mb-4">✅ Successfully Logged In!</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold">User Details:</h4>
                <ul className="text-sm">
                  <li><strong>Name:</strong> {user.name}</li>
                  <li><strong>Email:</strong> {user.email}</li>
                  <li><strong>Role:</strong> {user.role}</li>
                  <li><strong>Status:</strong> {user.status || 'Active'}</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold">Dashboard Access:</h4>
                <p className="text-sm mb-2">Your dashboard route: <code className="bg-gray-200 px-2 py-1 rounded">{getDashboardRoute(user.role)}</code></p>
                <a
                  href={getDashboardRoute(user.role)}
                  className="inline-block bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
                >
                  Go to {user.role} Dashboard
                </a>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {/* API Testing */}
      <div className="mt-8 border-t pt-6">
        <h2 className="text-2xl font-bold mb-4">API Testing</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Backend Health Check</h3>
            <button
              onClick={async () => {
                try {
                  const response = await fetch('http://localhost:5000/api/health');
                  const data = await response.json();
                  setMessage(`✅ Backend Health: ${data.message}`);
                } catch (error) {
                  setMessage(`❌ Backend Health Check Failed: ${error.message}`);
                }
              }}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Test Backend
            </button>
          </div>
          
          <div className="border p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Auth API Test</h3>
            <button
              onClick={async () => {
                try {
                  const data = await authAPI.getProfile();
                  setMessage(`✅ Auth API Working: ${data.user.name}`);
                } catch (error) {
                  setMessage(`❌ Auth API Failed: ${error.message}`);
                }
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Test Auth API
            </button>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-8 border-t pt-6">
        <h2 className="text-2xl font-bold mb-4">📋 Instructions</h2>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Complete Flow Test:</h3>
          <ol className="list-decimal list-inside space-y-2">
            <li><strong>Signup:</strong> Click any role signup button to create a new user</li>
            <li><strong>Login:</strong> After signup, click the corresponding login button</li>
            <li><strong>Dashboard:</strong> You'll be redirected to the role-specific dashboard</li>
            <li><strong>Test API:</strong> Use the API test buttons to verify backend connectivity</li>
          </ol>
          
          <div className="mt-4 p-3 bg-blue-50 rounded">
            <h4 className="font-semibold">Expected Behavior:</h4>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>✅ User data stored in MongoDB database</li>
              <li>✅ Login works with stored credentials</li>
              <li>✅ Role-based dashboard routing</li>
              <li>✅ JWT token authentication</li>
              <li>✅ Axios API calls to backend</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestFlow; 