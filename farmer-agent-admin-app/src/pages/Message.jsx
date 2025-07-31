import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContext } from '../context/ToastContext';

const Message = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useContext(ToastContext);
  
  // Get agent info from navigation state or use default
  const agentInfo = location.state?.agent || {
    name: 'Agent',
    role: 'Agricultural Agent',
    phone: '+91 98765 43210',
    status: 'Available'
  };

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'agent',
      text: `Hello! I'm ${agentInfo.name}, your ${agentInfo.role.toLowerCase()}. How can I help you today?`,
      timestamp: new Date(Date.now() - 60000).toLocaleTimeString(),
      type: 'received'
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now(),
      sender: 'farmer',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString(),
      type: 'sent'
    };

    setMessages([...messages, message]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate agent response
    setTimeout(() => {
      const responses = [
        "Thank you for your message. I'll look into this for you.",
        "I understand your concern. Let me check the details.",
        "That's a good question. Here's what I can tell you...",
        "I'll get back to you with more information soon.",
        "Thanks for reaching out. I'm here to help!"
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const agentMessage = {
        id: Date.now() + 1,
        sender: 'agent',
        text: randomResponse,
        timestamp: new Date().toLocaleTimeString(),
        type: 'received'
      };

      setMessages(prev => [...prev, agentMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleCall = () => {
    // Call functionality without toast messages
    console.log(`Calling ${agentInfo.name} at ${agentInfo.phone}`);
  };

  return (
    <div className="message-page-container" style={{height: '100vh', overflow: 'hidden'}}>
      <div className="container-fluid h-100">
        <div className="row h-100 justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card message-card" style={{height: '100vh'}}>
              <div className="card-header d-flex justify-content-between align-items-center" style={{height: '80px'}}>
                <div className="d-flex align-items-center">
                  <button 
                    className="btn btn-outline-light btn-sm me-3"
                    onClick={() => navigate('/farmer-dashboard')}
                  >
                    <i className="fas fa-arrow-left me-1"></i>Back
                  </button>
                  <div>
                    <h5 className="mb-0">{agentInfo.name}</h5>
                    <small className="text-light">{agentInfo.role}</small>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <span className={`badge ${agentInfo.status === 'Available' ? 'bg-success' : 'bg-warning'} me-2`}>
                    {agentInfo.status}
                  </span>
                  <button 
                    className="btn btn-light btn-sm"
                    onClick={handleCall}
                  >
                    <i className="fas fa-phone me-1"></i>Call
                  </button>
                </div>
              </div>
              
              <div className="card-body" style={{height: 'calc(100vh - 140px)', overflowY: 'auto', padding: '20px'}}>
                <div className="chat-messages" ref={chatContainerRef}>
                  {messages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`message ${message.type === 'sent' ? 'message-sent' : 'message-received'}`}
                    >
                      <div className={`message-bubble ${message.type === 'sent' ? 'bg-primary text-white' : 'bg-light'}`}>
                        <div className="message-text">{message.text}</div>
                        <small className={`message-time ${message.type === 'sent' ? 'text-white-50' : 'text-muted'}`}>
                          {message.timestamp}
                        </small>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="message message-received">
                      <div className="message-bubble bg-light">
                        <div className="typing-indicator">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="card-footer" style={{height: '60px'}}>
                <form onSubmit={handleSendMessage} className="d-flex">
                  <input
                    type="text"
                    className="form-control me-2"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={!newMessage.trim()}
                  >
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message; 