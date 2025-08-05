# 🌱 AgriConnect - Smart Agriculture Platform

A comprehensive MERN stack application with integrated AI models for modern agriculture management, crop recommendations, and predictive analytics.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [AI Models](#ai-models)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

AgriConnect is a full-stack agricultural management platform that combines modern web technologies with AI-powered models to provide farmers, agents, and administrators with comprehensive tools for crop management, weather analysis, price prediction, and agricultural recommendations.

### Key Components:
- **Frontend**: React-based web application with role-based dashboards
- **Backend**: Node.js/Express API with MongoDB database
- **AI Models**: Four specialized machine learning models for agriculture
- **Real-time Analytics**: Interactive dashboards and data visualization

## ✨ Features

### 🏠 Frontend Application
- **Multi-role Authentication**: Separate dashboards for Farmers, Agents, and Administrators
- **Modern UI/UX**: Responsive design with Tailwind CSS and Bootstrap
- **Interactive Dashboards**: Real-time data visualization and analytics
- **AI Tools Integration**: Direct access to machine learning models
- **Profile Management**: User profile customization and settings
- **Real-time Messaging**: Communication system between users

### 🤖 AI Models
1. **🌱 Crop Recommendation Model**
   - Soil analysis and climate pattern recognition
   - Market demand prediction
   - Profitability calculator
   - Optimal crop selection based on conditions

2. **🐛 Pesticides/Fertilizer Recommendation**
   - Disease and pest identification
   - Safe treatment options
   - Cost-effective solutions
   - Fertilizer composition analysis

3. **📈 Price Prediction Model**
   - Historical price analysis
   - Market trend prediction
   - Seasonal pattern recognition
   - Profit optimization strategies

4. **🌤️ Weather Analysis Model**
   - Real-time weather data
   - Agricultural forecasts
   - Crop-specific alerts
   - Climate analysis and predictions

### 🔧 Backend API
- **RESTful API**: Complete CRUD operations
- **JWT Authentication**: Secure user authentication
- **File Upload**: Media and document management
- **Real-time Updates**: WebSocket integration
- **Data Analytics**: Comprehensive reporting system

## 📁 Project Structure

```
SAP1/
├── 📱 farmer-agent-admin-app/          # Frontend React Application
│   ├── src/
│   │   ├── components/                 # React Components
│   │   ├── pages/                      # Page Components
│   │   ├── context/                    # React Context
│   │   ├── services/                   # API Services
│   │   └── styles/                     # CSS Styles
│   ├── public/
│   └── package.json
│
├── 🔧 backend/                         # Node.js/Express API
│   ├── controllers/                    # Route Controllers
│   ├── models/                         # MongoDB Models
│   ├── routes/                         # API Routes
│   ├── middleware/                     # Custom Middleware
│   ├── config/                         # Configuration
│   └── server.js                       # Main Server File
│
├── 🤖 AI Models/                       # Machine Learning Models
│   ├── Crop-Recommendation-main/       # Crop Recommendation Model
│   ├── fertilizer-recommendation-main/ # Fertilizer Recommendation
│   ├── Crop prize Prediction Model/    # Price Prediction Model
│   ├── Weather Model/                  # Weather Analysis Model
│   └── Dashboard Model/                # Analytics Dashboard
│
└── 📄 Documentation
    ├── README.md                       # This file
    └── API_USAGE.md                    # API Documentation
```

## 🛠️ Technology Stack

### Frontend
- **React 18.2.0** - Modern JavaScript library for building user interfaces
- **React Router DOM 6.8.1** - Client-side routing
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Bootstrap 5** - Component library for responsive design
- **Chart.js 4.5.0** - Data visualization library
- **Vite 5.0.0** - Fast build tool and development server

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js 4.18.2** - Web application framework
- **MongoDB 6.18.0** - NoSQL database
- **Mongoose 7.5.0** - MongoDB object modeling
- **JWT 9.0.2** - JSON Web Token authentication
- **bcryptjs 2.4.3** - Password hashing
- **Multer 1.4.5** - File upload middleware
- **CORS 2.8.5** - Cross-origin resource sharing

### AI Models
- **Python 3.8+** - Programming language for ML models
- **Streamlit** - Web framework for ML applications
- **Scikit-learn** - Machine learning library
- **Pandas** - Data manipulation and analysis
- **NumPy** - Numerical computing
- **Matplotlib/Plotly** - Data visualization

## 🤖 AI Models

### 1. Crop Recommendation Model
**Location**: `Crop-Recommendation-main/`
- **Purpose**: Recommend optimal crops based on soil and climate conditions
- **Features**:
  - Soil analysis integration
  - Climate pattern analysis
  - Market demand prediction
  - Profitability calculator
- **Deployment**: Streamlit Cloud
- **URL**: `https://crop-recommendation-vbbtdzkvym2whkdx3cdqmi.streamlit.app/`

### 2. Fertilizer Recommendation Model
**Location**: `fertilizer-recommendation-main/`
- **Purpose**: Recommend appropriate fertilizers based on soil conditions
- **Features**:
  - Disease identification
  - Pest detection
  - Safe treatment options
  - Cost-effective solutions
- **Deployment**: Streamlit Cloud
- **URL**: `https://fertilizer-recommendation.streamlit.app/`

### 3. Price Prediction Model
**Location**: `Crop prize Prediction Model/`
- **Purpose**: Predict crop prices using historical data and market trends
- **Features**:
  - Historical price analysis
  - Market trend prediction
  - Seasonal pattern recognition
  - Profit optimization
- **Deployment**: Streamlit Cloud
- **URL**: `https://crop-prize-prediction-model-ac.streamlit.app/`

### 4. Weather Analysis Model
**Location**: `Weather Model/`
- **Purpose**: Provide real-time weather data and agricultural forecasts
- **Features**:
  - Real-time weather data
  - Agricultural forecasts
  - Crop-specific alerts
  - Climate analysis
- **Deployment**: Streamlit Cloud
- **URL**: `https://weathermodel-1.streamlit.app/`

### 5. Analytics Dashboard
**Location**: `Dashboard Model/`
- **Purpose**: Comprehensive analytics and reporting dashboard
- **Features**:
  - Data visualization
  - Performance metrics
  - Trend analysis
  - Custom reports
- **Deployment**: Streamlit Cloud
- **URL**: `https://agriconnectdashboard-1.streamlit.app/`

## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- Python 3.8+
- Git

### 1. Clone the Repository
```bash
git clone <repository-url>
cd SAP1
```

### 2. Install Frontend Dependencies
```bash
cd farmer-agent-admin-app
npm install
```

### 3. Install Backend Dependencies
```bash
cd ../backend
npm install
```

### 4. Set Up Environment Variables
Create `.env` file in the backend directory:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
NODE_ENV=development
```

### 5. Install AI Model Dependencies
For each AI model directory:
```bash
cd Crop-Recommendation-main
pip install -r requirements.txt

cd ../fertilizer-recommendation-main
pip install -r requirements.txt
```

## 🎮 Usage

### Starting the Development Servers

#### 1. Start Backend Server
```bash
cd backend
npm run dev
```
Server will start on `http://localhost:5000`

#### 2. Start Frontend Application
```bash
cd farmer-agent-admin-app
npm run dev
```
Application will start on `http://localhost:5173`

#### 3. Run AI Models Locally (Optional)
```bash
# Crop Recommendation
cd Crop-Recommendation-main
streamlit run streamlit_app.py

# Fertilizer Recommendation
cd ../fertilizer-recommendation-main
streamlit run app.py

# Price Prediction
cd "../Crop prize Prediction Model"
streamlit run app.py

# Weather Analysis
cd ../Weather\ Model
streamlit run weatherapp.py

# Analytics Dashboard
cd ../Dashboard\ Model
streamlit run dash.py
```

### Accessing the Application

1. **Open Browser**: Navigate to `http://localhost:5173`
2. **Register/Login**: Create an account or login with existing credentials
3. **Choose Role**: Select your role (Farmer, Agent, or Administrator)
4. **Access Features**: Use the dashboard and AI tools based on your role

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### User Management
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `GET /api/user/dashboard` - Get dashboard data

### Crop Management
- `GET /api/crops` - Get all crops
- `POST /api/crops` - Add new crop
- `PUT /api/crops/:id` - Update crop
- `DELETE /api/crops/:id` - Delete crop

### Analytics
- `GET /api/analytics/overview` - Get analytics overview
- `GET /api/analytics/crops` - Get crop analytics
- `GET /api/analytics/weather` - Get weather analytics

For detailed API documentation, see `API_USAGE.md`

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
```bash
cd farmer-agent-admin-app
npm run build
```

### Backend Deployment (Heroku/Railway)
```bash
cd backend
npm start
```

### AI Models Deployment (Streamlit Cloud)
1. Push each model to separate GitHub repositories
2. Connect to Streamlit Cloud
3. Deploy with requirements.txt

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Follow the existing code style
- Add tests for new features
- Update documentation for API changes
- Ensure all tests pass before submitting

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Frontend Development**: React.js, Tailwind CSS, Bootstrap
- **Backend Development**: Node.js, Express.js, MongoDB
- **AI/ML Development**: Python, Streamlit, Scikit-learn
- **DevOps**: Vite, Streamlit Cloud, MongoDB Atlas

## 📞 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation in `/docs` folder

---

**🌱 AgriConnect** - Empowering Agriculture with AI and Modern Technology

*Built with ❤️ for the agricultural community* 