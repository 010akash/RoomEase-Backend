const Landlord = require('../models/landlordModel'); // Import the Landlord model
const Room = require('../models/roomModel'); // Import the Room model

// Controller to create a new landlord
exports.createLandlord = async (req, res) => {
    try {
      const newLandlordData = req.body; // Assuming the data is sent in the request body
      const newLandlord = new Landlord(newLandlordData);
      const savedLandlord = await newLandlord.save();
      res.status(201).json(savedLandlord);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

// Controller to get landlord profile by ID
exports.getLandlordProfile = async (req, res) => {
  try {
    const landlord = await Landlord.findById(req.params.id);
    if (!landlord) {
      return res.status(404).json({ message: 'Landlord not found' });
    }
    res.status(200).json(landlord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller to update landlord profile by ID
exports.updateLandlordProfile = async (req, res) => {
  try {
    const updatedLandlord = await Landlord.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedLandlord) {
      return res.status(404).json({ message: 'Landlord not found' });
    }
    res.status(200).json(updatedLandlord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller to get all rooms owned by a landlord
exports.getLandlordRooms = async (req, res) => {
  try {
    const landlordRooms = await Room.find({ landlord: req.params.id });
    res.status(200).json(landlordRooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Add more controller functions as needed
