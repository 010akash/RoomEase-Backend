const express = require('express');
const Tenant = require('../models/tenantModel'); // Assuming you create a Tenant model

const router = express.Router();

// Create a new tenant
router.post('/create', async (req, res) => {
    try {
      const newTenant = new Tenant(req.body);
      const savedTenant = await newTenant.save();
      res.status(201).json(savedTenant);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

// Get all tenants
router.get('/alltenants', async (req, res) => {
    try {
      const allTenants = await Tenant.find();
      res.status(200).json(allTenants);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
});

// Get tenant profile by ID
router.get('/profile/:id', async (req, res) => {
  try {
    const tenant = await Tenant.findById(req.params.id);
    if (!tenant) {
      return res.status(404).json({ message: 'Tenant not found' });
    }
    res.status(200).json(tenant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update tenant profile by ID
router.put('/profile/:id', async (req, res) => {
  try {
    const updatedTenant = await Tenant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedTenant) {
      return res.status(404).json({ message: 'Tenant not found' });
    }
    res.status(200).json(updatedTenant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete tenant profile by ID
router.delete('/profile/:id', async (req, res) => {
  try {
    const deletedTenant = await Tenant.findByIdAndDelete(req.params.id);
    if (!deletedTenant) {
      return res.status(404).json({ message: 'Tenant not found' });
    }
    res.status(200).json({ message: 'Tenant deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// ... Other tenant-related routes
module.exports = router;
