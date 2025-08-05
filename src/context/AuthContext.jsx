import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AuthContext = createContext();

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  error: null
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        error: null
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: null
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check if user is authenticated on app load
  useEffect(() => {
    const checkAuth = async () => {
      if (state.token) {
        try {
          const response = await fetch('http://localhost:5000/api/auth/me', {
            headers: {
              'Authorization': `Bearer ${state.token}`,
              'Content-Type': 'application/json'
            }
          });

          if (response.ok) {
            const data = await response.json();
            dispatch({
              type: 'LOGIN_SUCCESS',
              payload: {
                user: data.data.user,
                token: state.token
              }
            });
          } else {
            localStorage.removeItem('token');
            dispatch({ type: 'LOGOUT' });
          }
        } catch (error) {
          console.error('Auth check error:', error);
          localStorage.removeItem('token');
          dispatch({ type: 'LOGOUT' });
        }
      } else {
        dispatch({ type: 'LOGOUT' });
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email, password) => {
    dispatch({ type: 'LOGIN_START' });

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.data.token);
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            user: data.data.user,
            token: data.data.token
          }
        });
        return { success: true };
      } else {
        dispatch({
          type: 'LOGIN_FAILURE',
          payload: data.message || 'Login failed'
        });
        return { success: false, error: data.message };
      }
    } catch (error) {
      console.error('Login error:', error);
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: 'Network error. Please try again.'
      });
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  // Register function
  const register = async (userData) => {
    dispatch({ type: 'LOGIN_START' });

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.data.token);
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            user: data.data.user,
            token: data.data.token
          }
        });
        return { success: true };
      } else {
        dispatch({
          type: 'LOGIN_FAILURE',
          payload: data.message || 'Registration failed'
        });
        return { success: false, error: data.message };
      }
    } catch (error) {
      console.error('Register error:', error);
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: 'Network error. Please try again.'
      });
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  };

  // Update user function
  const updateUser = (userData) => {
    dispatch({
      type: 'UPDATE_USER',
      payload: userData
    });
  };

  // Clear error function
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  // API call helper with authentication
  const apiCall = async (url, options = {}) => {
    const token = localStorage.getItem('token');
    
    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers
      }
    };

    try {
      const response = await fetch(`http://localhost:5000${url}`, config);
      const data = await response.json();

      if (response.ok) {
        return { success: true, data: data.data || data };
      } else {
        // Handle token expiration
        if (response.status === 401) {
          logout();
        }
        return { success: false, error: data.message || 'Request failed' };
      }
    } catch (error) {
      console.error('API call error:', error);
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    updateUser,
    clearError,
    apiCall
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 