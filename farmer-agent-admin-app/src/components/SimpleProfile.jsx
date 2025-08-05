import React from 'react';
import { useAuth } from '../context/AuthContext';

const SimpleProfile = () => {
  const { user } = useAuth();

  console.log('SimpleProfile - User:', user);

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
            <h1 className="text-center mb-4">Simple Profile Page</h1>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Profile Information</h5>
                <p className="card-text">
                  This is a simple profile page to test routing.
                </p>
                <div className="alert alert-info">
                  <strong>User Information:</strong>
                  <pre>{JSON.stringify(user, null, 2)}</pre>
                </div>
                <p>
                  <strong>User exists:</strong> {user ? 'Yes' : 'No'}
                </p>
                <p>
                  <strong>User name:</strong> {user?.name || 'Not available'}
                </p>
                <p>
                  <strong>User email:</strong> {user?.email || 'Not available'}
                </p>
                <p>
                  <strong>User role:</strong> {user?.role || 'Not available'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleProfile; 