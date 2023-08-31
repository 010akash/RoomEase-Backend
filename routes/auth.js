const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Tenant = require('../models/tenantModel');
const Landlord = require('../models/landlordModel');

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    // Check if user with given email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      role
    });

    await newUser.save();

    // Based on the user's role, add to Tenant or Landlord table
    if (role === 'tenant') {
      const newTenant = new Tenant(req.body);
      const savedTenant = await newTenant.save();
      res.status(201).json(savedTenant); // Send tenant info to the client
    } else if (role === 'landlord') {
      const newLandlord = new Landlord(req.body);
      const savedLandlord = await newLandlord.save();
      res.status(201).json(savedLandlord); // Send landlord info to the client
    } else {
      res.status(201).json({ message: 'User registered successfully' }); // Send user info to the client
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// User Login
router.post('/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Find the user based on their email and role
    let user = await User.findOne({ email, role });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, userRole: role },
      '123456789', // Replace with your actual secret key
      { expiresIn: '1h' }
    );

    res.status(200).json({ token, role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;
