const express = require('express');
const ReturnRequest = require('../models/returnRequests');

const router = express.Router();

router.post('/initiate', async (req, res) =>{
    const { orderId , reason } = req.body;

    if(!orderId || !reason){
        return res.status(400).json({
            message: 'OrderId and reason both are required'
        });
    }
    try {

        const newReturnRequest = new ReturnRequest({orderId , reason});
        await newReturnRequest.save();

        res.status(201).json({
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

router.patch ('/:id/approve', async (req,res) => {
    try {
        const { id } = req.params;

        const updatedRequest = await ReturnRequest.findByIdAndUpdate(
            id,
            {status: 'Approved'},
            {new: true}
        );

        if (!updatedRequest){
            return res.status(404).json({
                message: 'Return request not found'
            });
        }

        res.status(200).json({
            message: 'Return request approved successfully',
            data: updatedRequest
        });

    } catch (error) {
        res.status(500).json({
            message:'Server error',
            error: error.message
        });
    }
});

router.patch('/:id/reject', async (req,res) => {
    try {
        const { id } = req.params;
        const updatedRequest = await ReturnRequest.findByIdAndUpdate(
            id,
            {status:'Rejected'},
            {new: true}
        );

        if(!updatedRequest){
            return res.status(404).json({
                message: 'Return request not found'
            });
        }

        res.status(200).json({
            message: 'Return request rejected successfully',
            data: updatedRequest
        });
        
    } catch (error) {
        res.status(500).json({message: 'Server error', error: error.message});
    }
});
module.exports = router;