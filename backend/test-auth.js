const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api';

async function testAuth() {
  try {
    console.log('🧪 Testing Authentication Flow...\n');

    // Test 1: Register a new farmer
    console.log('1. Testing Farmer Registration...');
    const signupData = {
      name: 'Test Farmer',
      email: 'farmer@test.com',
      password: 'password123',
      phone: '1234567890',
      address: 'Test Address',
      role: 'farmer'
    };

    const signupResponse = await axios.post(`${API_BASE_URL}/auth/register`, signupData);
    console.log('✅ Signup successful:', signupResponse.data.message);
    console.log('User ID:', signupResponse.data.user._id);
    console.log('Token:', signupResponse.data.token ? '✅ Present' : '❌ Missing');
    console.log('');

    // Test 2: Login with the same credentials
    console.log('2. Testing Farmer Login...');
    const loginData = {
      email: 'farmer@test.com',
      password: 'password123'
    };

    const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, loginData);
    console.log('✅ Login successful:', loginResponse.data.message);
    console.log('User:', loginResponse.data.user.name);
    console.log('Role:', loginResponse.data.user.role);
    console.log('Status:', loginResponse.data.user.status);
    console.log('Token:', loginResponse.data.token ? '✅ Present' : '❌ Missing');
    console.log('');

    // Test 3: Get current user profile
    console.log('3. Testing Get Profile...');
    const token = loginResponse.data.token;
    const profileResponse = await axios.get(`${API_BASE_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('✅ Profile retrieved successfully');
    console.log('User:', profileResponse.data.user.name);
    console.log('');

    console.log('🎉 All tests passed! Authentication flow is working correctly.');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    console.log('Response status:', error.response?.status);
    console.log('Response data:', error.response?.data);
  }
}

// Run the test
testAuth(); 