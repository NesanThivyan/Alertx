const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes.js');
const { protect } = require('./middleware/auth.middleware');

// Load env vars
dotenv.config({ path: './.env' });

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/api', require('./routes/medical.routes'));
app.use('/api', require('./routes/booking.routes'));
app.use('/api', require('./routes/alert.routes'));


// Routes
app.use('/api/auth', authRoutes);

// Simple test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Example of a protected route (only accessible to logged-in users)
app.get('/api/dashboard', protect, (req, res) => {
  res.status(200).json({ success: true, message: `Welcome to your dashboard, ${req.user.name}! Your role is: ${req.user.role}` });
});

// Example of a hospital-only route
// Uncomment and implement 'authorize' middleware if needed
const { authorize } = require('./middleware/authorize');
app.get('/api/hospital/data', protect, authorize('hospital', 'admin'), (req, res) => {
  res.status(200).json({ success: true, message: `Accessing hospital-specific data as a ${req.user.role}.` });
});

// Example of a driver-only route
app.get('/api/driver/route', protect, authorize('driver', 'admin'), (req, res) => {
  res.status(200).json({ success: true, message: `Accessing driver route information as a ${req.user.role}.` });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));