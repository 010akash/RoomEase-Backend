const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db'); // Import the MongoDB connection function

// Create an Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Define routes
app.use('/api/auth', require('./routes/auth')); // Authentication routes
app.use('/api/tenant', require('./routes/tenant')); // Tenant-related routes
app.use('/api/landlord', require('./routes/landlord')); // Landlord-related routes
app.use('/api/request', require('./routes/request')); // Request-related routes
app.use('/api/room', require('./routes/room')); // Room-related routes
app.use('/api/login', require('./routes/login')); // Login route

// Handle other routes and errors
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
