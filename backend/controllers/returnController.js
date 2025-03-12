const ReturnRequest = require('../models/returnRequests');

// Initiate return
exports.initiateReturn = async (req, res) => {
    const { orderId, reason } = req.body;
    if (!orderId || !reason) return res.status(400).json({ message: 'Order ID and reason required' });

    try {
        const request = await ReturnRequest.create({ orderId, reason });
        res.status(201).json({ message: 'Return initiated', data: request });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Fetch all returns
exports.getReturns = async (req, res) => {
    try {
        const requests = await ReturnRequest.find();
        res.status(200).json({ message: 'Fetched successfully', data: requests });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Approve return
exports.approveReturn = async (req, res) => {
    const { id } = req.params;
    try {
        const updated = await ReturnRequest.findByIdAndUpdate(id, { status: 'Approved' }, { new: true });
        if (!updated) return res.status(404).json({ message: 'Not found' });
        res.json({ message: 'Approved', data: updated });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Reject return
exports.rejectReturn = async (req, res) => {
    const { id } = req.params;
    try {
        const updated = await ReturnRequest.findByIdAndUpdate(id, { status: 'Rejected' }, { new: true });
        if (!updated) return res.status(404).json({ message: 'Not found' });
        res.json({ message: 'Rejected', data: updated });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
