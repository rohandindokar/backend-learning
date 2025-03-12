const mongoose = require('mongoose');

// Define the schema
const returnRequestSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Pending Approval'
    }
}, { timestamps: true }); // Adds createdAt and updatedAt automatically

// Create the model
module.exports = mongoose.model('ReturnRequest', returnRequestSchema);
