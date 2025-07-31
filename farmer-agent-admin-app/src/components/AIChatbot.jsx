import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AIChatbot = ({ isOpen, onToggle, triggerFromServices = false }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm AgriConnect AI Assistant. How can I help you with farming today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (triggerFromServices && isOpen) {
      // Auto-trigger AI insights when opened from services page
      handleAIAssistance();
    }
  }, [triggerFromServices, isOpen]);

  const handleAIAssistance = () => {
    const aiMessage = {
      id: messages.length + 1,
      text: "I can help you with:\n• Crop recommendations\n• Weather analysis\n• Market insights\n• Pest management\n• Soil health tips\n\nWhat would you like to know?",
      sender: 'ai',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, aiMessage]);
  };

  const simulateAIResponse = async (userMessage) => {
    setIsTyping(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const responses = [
      "Based on current weather patterns, I recommend monitoring soil moisture levels for optimal crop growth.",
      "Market analysis shows favorable prices for wheat this season. Consider timing your harvest accordingly.",
      "For pest management, I suggest implementing integrated pest management (IPM) techniques.",
      "Your soil pH levels indicate good conditions for most crops. Consider crop rotation for better yields.",
      "Weather forecast suggests moderate rainfall. This is ideal for your current crop stage.",
      "Based on historical data, this is the optimal time for applying fertilizers to your crops.",
      "I recommend using drought-resistant crop varieties given the current climate conditions.",
      "Market trends indicate increasing demand for organic produce. Consider this for your next planting.",
      "Your field's location is suitable for multiple crop rotations. Let me suggest the best sequence.",
      "Current soil conditions are perfect for legume crops. This will also improve soil nitrogen levels."
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    const aiMessage = {
      id: messages.length + 2,
      text: randomResponse,
      sender: 'ai',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, aiMessage]);
    setIsTyping(false);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response
    await simulateAIResponse(inputMessage);
    setIsLoading(false);
  };

  const handleQuickActions = (action) => {
    const quickMessages = {
      'weather': "What's the current weather forecast for my location?",
      'crops': "Which crops are best suited for my soil type?",
      'market': "What are the current market prices for major crops?",
      'pests': "How can I identify and manage common crop pests?",
      'soil': "How can I improve my soil health and fertility?"
    };

    const userMessage = {
      id: messages.length + 1,
      text: quickMessages[action],
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    simulateAIResponse(quickMessages[action]);
  };

  if (!isOpen) {
    return (
      <div className="ai-chatbot-toggle" onClick={onToggle}>
        <div className="chatbot-icon">
          <i className="fas fa-robot"></i>
        </div>
        <div className="chatbot-label">AI Assistant</div>
      </div>
    );
  }

  return (
    <div className="ai-chatbot-container">
      <div className="ai-chatbot-header">
        <div className="chatbot-title">
          <i className="fas fa-robot me-2"></i>
          AgriConnect AI
        </div>
        <button className="chatbot-close" onClick={onToggle}>
          <i className="fas fa-times"></i>
        </button>
      </div>

      <div className="ai-chatbot-messages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender}`}>
            <div className="message-content">
              {message.sender === 'ai' && (
                <div className="ai-avatar">
                  <i className="fas fa-robot"></i>
                </div>
              )}
              <div className="message-bubble">
                <div className="message-text">{message.text}</div>
                <div className="message-time">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="message ai">
            <div className="message-content">
              <div className="ai-avatar">
                <i className="fas fa-robot"></i>
              </div>
              <div className="message-bubble">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="ai-chatbot-quick-actions">
        <button onClick={() => handleQuickActions('weather')} className="quick-action-btn">
          <i className="fas fa-cloud-sun"></i>
          Weather
        </button>
        <button onClick={() => handleQuickActions('crops')} className="quick-action-btn">
          <i className="fas fa-seedling"></i>
          Crops
        </button>
        <button onClick={() => handleQuickActions('market')} className="quick-action-btn">
          <i className="fas fa-chart-line"></i>
          Market
        </button>
        <button onClick={() => handleQuickActions('pests')} className="quick-action-btn">
          <i className="fas fa-bug"></i>
          Pests
        </button>
      </div>

      <form onSubmit={handleSendMessage} className="ai-chatbot-input">
        <div className="input-group">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask me anything about farming..."
            className="form-control"
            disabled={isLoading}
          />
          <button type="submit" className="btn btn-success" disabled={isLoading || !inputMessage.trim()}>
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AIChatbot; 