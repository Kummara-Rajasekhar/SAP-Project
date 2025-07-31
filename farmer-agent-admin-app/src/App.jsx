import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Services from './pages/Services';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import LoginSelection from './pages/LoginSelection';
import FarmerLogin from './components/FarmerLogin';
import AgentLogin from './components/AgentLogin';
import AdminLogin from './components/AdminLogin';
import FarmerSignup from './components/FarmerSignup';
import AgentSignup from './components/AgentSignup';
import FarmerDashboard from './components/FarmerDashboard';
import AgentDashboard from './components/AgentDashboard';
import AdminDashboard from './components/AdminDashboard';
import Message from './pages/Message';
import ScrollToTop from './components/ScrollToTop';
import AIChatbot from './components/AIChatbot';
import { AuthContext } from './context/AuthContext';
import './App.css';

function RequireAuth({ children, role }) {
  const { user } = useContext(AuthContext);
  
  if (!user) {
    return <Navigate to="/login-selection" replace />;
  }
  
  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }
  
  return children;
}

function ConditionalFooter() {
  const { user } = useContext(AuthContext);
  const location = window.location.pathname;
  
  // Permanently hide footer on all dashboard pages (farmer, agent, admin), message, profile, and settings pages
  if (location.includes('dashboard') || location.includes('message') || location.includes('profile') || location.includes('settings')) {
    return null;
  }
  
  /* return <Footer />; */
}

export default function App() {
  const [isAIChatbotOpen, setIsAIChatbotOpen] = useState(false);
  const [triggerFromServices, setTriggerFromServices] = useState(false);

  const handleAIChatbotToggle = () => {
    setIsAIChatbotOpen(!isAIChatbotOpen);
  };

  const handleAIInsightsFromServices = () => {
    setIsAIChatbotOpen(true);
    setTriggerFromServices(true);
  };

  return (
    <Router>
      <div className="app-container">
        <ScrollToTop />
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services onAIInsights={handleAIInsightsFromServices} />} />
            <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/login-selection" element={<LoginSelection />} />
            <Route path="/farmer-login" element={<FarmerLogin />} />
            <Route path="/agent-login" element={<AgentLogin />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/farmer-signup" element={<FarmerSignup />} />
            <Route path="/agent-signup" element={<AgentSignup />} />
            <Route path="/farmer-dashboard" element={<RequireAuth role="farmer"><FarmerDashboard /></RequireAuth>} />
            <Route path="/agent-dashboard" element={<RequireAuth role="agent"><AgentDashboard /></RequireAuth>} />
            <Route path="/admin-dashboard" element={<RequireAuth role="admin"><AdminDashboard /></RequireAuth>} />
            <Route path="/message" element={<RequireAuth role="farmer"><Message /></RequireAuth>} />
          </Routes>
        </main>
        <ConditionalFooter />
        
        {/* Global AI Chatbot */}
        <AIChatbot 
          isOpen={isAIChatbotOpen} 
          onToggle={handleAIChatbotToggle}
          triggerFromServices={triggerFromServices}
        />
      </div>
    </Router>
  );
} 