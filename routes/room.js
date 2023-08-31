const express = require('express');
const router = express.Router();
const Room = require('../models/roomModel'); // Assuming you have a Room model
const Landlord = require('../models/landlordModel'); // Import the Landlord model

// Create a new room (only allowed for landlords)
router.post('/create', async (req, res) => {
  try {
    const userId = req.body.landlord; // Assuming userId is set by your authentication logic
    const landlord = await Landlord.findById(userId);

    if (!landlord) {
      return res.status(403).json({ message: 'You are not authorized to create a room' });
    }

    const newRoomData = {
      type: req.body.type,
      photos: req.body.photos,
      address: req.body.address,
      landlord: userId, // Set the room's landlord to the current landlord's ID
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


// Update room by ID (only allowed for the landlord who owns the room)
router.put('/:id', async (req, res) => {
  try {
    const roomId = req.params.id;
    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    if (room.landlord.toString() !== req.body.landlord) {
      return res.status(403).json({ message: 'You are not authorized to update this room' });
    }

    const updatedRoomData = {
      type: req.body.type,
      photos: req.body.photos,
      address: req.body.address,
      landlord: req.body.landlord,
      status: req.body.status
    };

    const updatedRoom = await Room.findByIdAndUpdate(roomId, updatedRoomData, { new: true });

    res.status(200).json(updatedRoom);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Delete room by ID (only allowed for the landlord who owns the room)
router.delete('/:id', async (req, res) => {
  try {
    const roomId = req.params.id;
    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    if (room.landlord.toString() !== req.body.landlord) {
      return res.status(403).json({ message: 'You are not authorized to delete this room' });
    }

    await Room.findByIdAndDelete(roomId);
    res.status(200).json({ message: 'Room deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Get all rooms (only allowed for authenticated landlords)
router.get('/all', async (req, res) => {
  try {
   
    // Fetch all rooms
    const rooms = await Room.find();

    res.status(200).json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;



module.exports = router;
