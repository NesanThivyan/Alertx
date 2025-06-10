const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');


// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5000', credentials: true }));
app.use(morgan('dev'));

// Import routes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const medicalRoutes = require('./routes/medical.routes');
const bookingRoutes = require('./routes/booking.routes');
const alertRoutes = require('./routes/alert.routes');
const adminRoutes = require('./routes/admin.routes');


// Mount routes (use unique prefixes to avoid conflicts)
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/medical', medicalRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/admin', adminRoutes);


// Health check route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;

mongoose
  .connect('mongodb+srv://srithivyanesan2002:0Oc4RauGqE8L3Ffc@cluster0.rufe3mm.mongodb.net/alert-x')
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('DB connection error:', err.message);
    process.exit(1);
  });