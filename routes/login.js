const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Tenant = require('../models/tenantModel');
const Landlord = require('../models/landlordModel');

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;

    let user = null;

    if (role === 'tenant') {
      user = await Tenant.findOne({ email });
    } else if (role === 'landlord') {
      user = await Landlord.findOne({ email });
    }

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, userRole: role }, // Use the provided role
      '123456789',
      { expiresIn: '1h' }
    );

    res.status(200).json({ token, role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

