import React, { createContext, useContext, useState } from 'react';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'info', duration = 3000) => {
    const id = Date.now();
    const newToast = { id, message, type, duration };
    
    setToasts(prev => [...prev, newToast]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, duration);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const value = {
    toasts,
    showToast,
    removeToast
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      {/* Toast Container */}
      <div className="toast-container position-fixed top-0 end-0 p-3" style={{ zIndex: 1050 }}>
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`toast show bg-${toast.type === 'error' ? 'danger' : toast.type === 'success' ? 'success' : toast.type === 'warning' ? 'warning' : 'info'} text-white`}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="toast-header">
              <strong className="me-auto">
                {toast.type === 'error' ? 'Error' : 
                 toast.type === 'success' ? 'Success' : 
                 toast.type === 'warning' ? 'Warning' : 'Info'}
              </strong>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={() => removeToast(toast.id)}
                aria-label="Close"
              ></button>
            </div>
            <div className="toast-body">
              {toast.message}
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export { ToastContext }; 