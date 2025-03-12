const express = require('express');
const groqClient = require('../utils/groqClient');
const ReturnRequest = require('../models/returnRequests');

const router = express.Router();

router.post('/', async (req, res) => {
    const { message } = req.body;

    try {
        const aiResponse = await groqClient(message);
        console.log('AI Response:', aiResponse);

        // Example NLP parsing (you can make this smarter)
        if (aiResponse.toLowerCase().includes('return') && aiResponse.includes('Order ID')) {
            const orderId = '12345'; // Ideally parsed from aiResponse
            const reason = 'Defective'; // Ideally parsed from aiResponse
            const request = await ReturnRequest.create({ orderId, reason });
            return res.json({ reply: `Return initiated for Order ID ${orderId} with reason: ${reason}` });
        }

        res.json({ reply: aiResponse });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
