import React from 'react';

const MinimalProfile = () => {
  console.log('MinimalProfile - Component rendered');

  return (
    <div style={{ 
      padding: '100px 20px 20px 20px', 
      minHeight: '100vh',
      background: 'red',
      color: 'white'
    }}>
      <h1>Minimal Profile Page</h1>
      <p>This is a minimal profile page to test routing.</p>
      <p>If you can see this, routing is working!</p>
    </div>
  );
};

export default MinimalProfile; 