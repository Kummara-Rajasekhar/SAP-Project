import React, { useState } from 'react';
import './Settings.css';

const Settings = () => {
  const [settings, setSettings] = useState({
    // Notifications
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    
    // Farming Preferences
    cropType: 'rice',
    farmingMethod: 'organic',
    irrigationType: 'drip',
    
    // Privacy
    locationSharing: true,
    dataAnalytics: true,
    expertAdvice: true
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = () => {
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  return (
    <div className="settings-page">
      <div className="settings-container">
        <div className="settings-header">
          <h1>Settings</h1>
          <p>Manage your account preferences</p>
        </div>

        <div className="settings-content">
          <div className="settings-grid">
            {/* Notifications */}
            <div className="settings-column">
              <div className="settings-section">
                <h3><i className="fas fa-bell"></i> Notifications</h3>
                
                <div className="setting-item">
                  <div className="setting-info">
                    <h5>Email Notifications</h5>
                    <p>Receive updates via email</p>
                  </div>
                  <div className="setting-control">
                    <div 
                      className={`toggle-switch ${settings.emailNotifications ? 'active' : ''}`}
                      onClick={() => handleSettingChange('emailNotifications', !settings.emailNotifications)}
                    ></div>
                  </div>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <h5>SMS Notifications</h5>
                    <p>Get alerts via SMS</p>
                  </div>
                  <div className="setting-control">
                    <div 
                      className={`toggle-switch ${settings.smsNotifications ? 'active' : ''}`}
                      onClick={() => handleSettingChange('smsNotifications', !settings.smsNotifications)}
                    ></div>
                  </div>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <h5>Push Notifications</h5>
                    <p>Receive app notifications</p>
                  </div>
                  <div className="setting-control">
                    <div 
                      className={`toggle-switch ${settings.pushNotifications ? 'active' : ''}`}
                      onClick={() => handleSettingChange('pushNotifications', !settings.pushNotifications)}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Farming Preferences */}
            <div className="settings-column">
              <div className="settings-section">
                <h3><i className="fas fa-seedling"></i> Farming Preferences</h3>
                
                <div className="setting-item">
                  <div className="setting-info">
                    <h5>Crop Type</h5>
                    <p>Select your primary crop</p>
                  </div>
                  <div className="setting-control">
                    <select 
                      className="form-select"
                      value={settings.cropType}
                      onChange={(e) => handleSettingChange('cropType', e.target.value)}
                    >
                      <option value="rice">Rice</option>
                      <option value="wheat">Wheat</option>
                      <option value="maize">Maize</option>
                      <option value="cotton">Cotton</option>
                    </select>
                  </div>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <h5>Farming Method</h5>
                    <p>Choose your farming approach</p>
                  </div>
                  <div className="setting-control">
                    <select 
                      className="form-select"
                      value={settings.farmingMethod}
                      onChange={(e) => handleSettingChange('farmingMethod', e.target.value)}
                    >
                      <option value="organic">Organic</option>
                      <option value="conventional">Conventional</option>
                      <option value="mixed">Mixed</option>
                    </select>
                  </div>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <h5>Irrigation Type</h5>
                    <p>Select irrigation system</p>
                  </div>
                  <div className="setting-control">
                    <select 
                      className="form-select"
                      value={settings.irrigationType}
                      onChange={(e) => handleSettingChange('irrigationType', e.target.value)}
                    >
                      <option value="drip">Drip</option>
                      <option value="sprinkler">Sprinkler</option>
                      <option value="flood">Flood</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Privacy */}
            <div className="settings-column">
              <div className="settings-section">
                <h3><i className="fas fa-shield-alt"></i> Privacy</h3>
                
                <div className="setting-item">
                  <div className="setting-info">
                    <h5>Location Sharing</h5>
                    <p>Allow location-based services</p>
                  </div>
                  <div className="setting-control">
                    <div 
                      className={`toggle-switch ${settings.locationSharing ? 'active' : ''}`}
                      onClick={() => handleSettingChange('locationSharing', !settings.locationSharing)}
                    ></div>
                  </div>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <h5>Data Analytics</h5>
                    <p>Share data for improvements</p>
                  </div>
                  <div className="setting-control">
                    <div 
                      className={`toggle-switch ${settings.dataAnalytics ? 'active' : ''}`}
                      onClick={() => handleSettingChange('dataAnalytics', !settings.dataAnalytics)}
                    ></div>
                  </div>
                </div>

                <div className="setting-item">
                  <div className="setting-info">
                    <h5>Expert Advice</h5>
                    <p>Receive expert recommendations</p>
                  </div>
                  <div className="setting-control">
                    <div 
                      className={`toggle-switch ${settings.expertAdvice ? 'active' : ''}`}
                      onClick={() => handleSettingChange('expertAdvice', !settings.expertAdvice)}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button 
              className="btn btn-primary"
              onClick={handleSaveSettings}
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>

      {showSuccessMessage && (
        <div className="success-message">
          <i className="fas fa-check-circle"></i>
          Settings saved successfully!
        </div>
      )}
    </div>
  );
};

export default Settings; 