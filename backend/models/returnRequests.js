const mongoose = require('mongoose');

const returnRequestSchema = new mongoose.Schema({
    orderId: { type: String, required: true },
    reason: { type: String, required: true },
    status: { type: String, default: 'Pending Approval' }
}, { timestamps: true });

module.exports = mongoose.model('ReturnRequest', returnRequestSchema);
