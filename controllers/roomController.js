const Room = require('../models/roomModel');
const authMiddleware = require('../middleware/authMiddleware');

const createRoom = async (req, res) => {
  try {
    if (req.userData.userRole !== 'landlord') {
      return res.status(403).json({ message: 'You are not authorized to create a room' });
    }

    const newRoomData = {
      type: req.body.type,
      photos: req.body.photos,
      address: req.body.address,
      landlord: req.userData.userId,
      status: req.body.status
    };

    const newRoom = new Room(newRoomData);
    const savedRoom = await newRoom.save();
    res.status(201).json(savedRoom);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteRoomById = async (req, res) => {
  try {
    const roomId = req.params.id;
    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    if (room.landlord.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to delete this room' });
    }

    await Room.findByIdAndDelete(roomId);
    res.status(200).json({ message: 'Room deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getAllRooms = async (req, res) => {
  try {
    if (req.user.role !== 'landlord') {
      return res.status(403).json({ message: 'You are not authorized to access all rooms' });
    }

    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createRoom,
  deleteRoomById,
  getAllRooms
};
