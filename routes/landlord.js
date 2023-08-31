const express = require('express');
const Landlord = require('../models/landlordModel'); 
const router = express.Router();

// Get landlord profile by ID
router.get('/profile/:id', async (req, res) => {
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
});

// Update landlord profile by ID
router.put('/profile/:id', async (req, res) => {
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
});

// Delete landlord profile by ID
router.delete('/profile/:id', async (req, res) => {
  try {
    const deletedLandlord = await Landlord.findByIdAndDelete(req.params.id);
    if (!deletedLandlord) {
      return res.status(404).json({ message: 'Landlord not found' });
    }
    res.status(200).json({ message: 'Landlord deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



// Create a new room (only allowed for landlords)
router.post('/create-room', async (req, res) => {
  try {
    const newRoomData = {
      type: req.body.type,
      photos: req.body.photos,
      address: req.body.address,
      landlord: req.userData.userId, // Set the room's landlord to the current user's ID
      status: req.body.status
    };

    const newRoom = new Room(newRoomData);
    const savedRoom = await newRoom.save();
    res.status(201).json(savedRoom);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get all rooms owned by the landlord
router.get('/rooms', async (req, res) => {
  try {
    const rooms = await Room.find({ landlord: req.userData.userId }); // Find rooms by the current landlord's ID
    res.status(200).json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete a room owned by the landlord
router.delete('/rooms/:roomId', async (req, res) => {
  try {
    const roomId = req.params.roomId;
    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    if (room.landlord.toString() !== req.userData.userId) {
      return res.status(403).json({ message: 'You are not authorized to delete this room' });
    }

    await Room.findByIdAndDelete(roomId);
    res.status(200).json({ message: 'Room deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
// ... Other landlord-related routes
module.exports = router;
