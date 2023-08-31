const Request = require('../models/requestModel'); // Import the Request model

// Create a new request
exports.createRequest = async (req, res) => {
  try {
    const { tenantId, roomId } = req.body;

    // Create a new request instance
    const newRequest = new Request({
      tenant: tenantId,
      room: roomId,
      status: 'pending'
    });

    // Save the request in the database
    const savedRequest = await newRequest.save();

    res.status(201).json(savedRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all requests
exports.getAllRequests = async (req, res) => {
  try {
    const allRequests = await Request.find()
      .populate('tenant', '_id fullName') // Populate the 'tenant' field with specified fields
      .populate('room', '_id roomNumber'); // Populate the 'room' field with specified fields

    res.status(200).json(allRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update request status by ID
exports.updateRequestStatus = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status } = req.body;

    const updatedRequest = await Request.findByIdAndUpdate(
      requestId,
      { status },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.status(200).json(updatedRequest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete request by ID
exports.deleteRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    const deletedRequest = await Request.findByIdAndDelete(requestId);

    if (!deletedRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.status(200).json({ message: 'Request deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
