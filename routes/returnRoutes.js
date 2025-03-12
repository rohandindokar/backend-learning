const express = require('express');
const ReturnRequest = require('../models/returnRequests');

const router = express.Router();

router.post('/initiate', async (ReturnRequest, res) =>{
    const { orderId , reason } = ReturnRequest.body;

    if(!orderId || !reason){
        return res.status(400).json({
            message: 'OrderId and reason both are required'
        });
    }
    try {

        const newReturnRequest = new ReturnRequest({orderId , reason});
        await newReturnRequest.save();

        res.status(201).jsoon({
            message: 'Return initiated successfully',
            data: newReturnRequest
        });
        
    } catch (err) {
        res.status(500).json({
            message:'Server Error',
            error: err.message
        });
        
    }
});


router.get('/', async (req, res) =>{
    try {
        const returnRequests = await ReturnRequest.find();
        res.status(200).json({
            message: 'Return requests fetched successfully',
            data: returnRequests
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            error : error.message
        });
    }
});

module.exports = router;