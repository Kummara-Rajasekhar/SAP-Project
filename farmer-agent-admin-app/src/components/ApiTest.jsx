import React, { useState } from 'react';
import { authAPI } from '../services/api';

const ApiTest = () => {
  const [testResult, setTestResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testApiConnection = async () => {
    setLoading(true);
    setTestResult('');
    
    try {
      // Test the health endpoint
      const response = await fetch('http://localhost:5000/api/health');
      const data = await response.json();
      
      if (response.ok) {
        setTestResult(`✅ API Connection Successful!\n\nResponse: ${JSON.stringify(data, null, 2)}`);
      } else {
        setTestResult(`❌ API Connection Failed!\n\nStatus: ${response.status}\nResponse: ${JSON.stringify(data, null, 2)}`);
      }
    } catch (error) {
      setTestResult(`❌ API Connection Error!\n\nError: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const testRegistration = async () => {
    setLoading(true);
    setTestResult('');
    
    try {
      const testUser = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'testpassword123',
        role: 'farmer',
        phone: '+1234567890',
        address: 'Test Address'
      };

      const result = await authAPI.register(testUser);
      setTestResult(`✅ Registration Test Successful!\n\nResponse: ${JSON.stringify(result, null, 2)}`);
    } catch (error) {
      setTestResult(`❌ Registration Test Failed!\n\nError: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      padding: '100px 20px 20px 20px', 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white'
    }}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center mb-4">API Connection Test</h1>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Backend API Test</h5>
                <p className="card-text">
                  This page tests the connection to the backend API.
                </p>
                
                <div className="d-flex gap-2 mb-3">
                  <button 
                    className="btn btn-primary"
                    onClick={testApiConnection}
                    disabled={loading}
                  >
                    {loading ? 'Testing...' : 'Test API Connection'}
                  </button>
                  
                  <button 
                    className="btn btn-success"
                    onClick={testRegistration}
                    disabled={loading}
                  >
                    {loading ? 'Testing...' : 'Test Registration'}
                  </button>
                </div>

                {testResult && (
                  <div className="alert alert-info">
                    <pre style={{ whiteSpace: 'pre-wrap', fontSize: '12px' }}>
                      {testResult}
                    </pre>
                  </div>
                )}

                <div className="mt-3">
                  <h6>Current Configuration:</h6>
                  <ul>
                    <li><strong>Frontend URL:</strong> http://localhost:3001</li>
                    <li><strong>Backend URL:</strong> http://localhost:5000</li>
                    <li><strong>API Base URL:</strong> http://localhost:5000/api</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiTest; 