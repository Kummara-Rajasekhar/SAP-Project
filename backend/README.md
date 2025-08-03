# AgriConnect Backend

## Setup Instructions

### 1. Environment Variables
Create a `.env` file in the backend directory with the following variables:

**Copy the content from `env-template.txt` file or use this:**

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Atlas Configuration
MONGODB_URI=mongodb+srv://rajasekhar:12345@cluster0.6syrnas.mongodb.net/agriconnect?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=agriconnect_jwt_secret_key_2024_rajasekhar_secure_token
JWT_EXPIRES_IN=30d

# CORS Configuration
CORS_ORIGIN=http://localhost:5173
```

**Steps to create .env file:**
1. In the `backend` directory, create a new file named `.env`
2. Copy the content above into the `.env` file
3. Save the file

### 2. MongoDB Atlas Setup
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a new cluster or use existing one
3. Get your connection string
4. Replace the MONGODB_URI in your .env file

### 3. Install Dependencies
```bash
npm install
```

### 4. Start the Server
```bash
npm run dev
```

## API Endpoints

### Health Check
- `GET /api/health` - Server health status

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### User Management
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `PUT /api/user/password` - Change password
- `GET /api/user/all` - Get all users (Admin only)

## Current Status
✅ Server runs without database connection
✅ Basic routes working
✅ Authentication routes ready
✅ User management routes ready

Next steps:
1. Add your MongoDB Atlas connection string
2. Test the API endpoints
3. Add more features as needed 