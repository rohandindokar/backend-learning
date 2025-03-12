const express = require('express');
const router = express.Router();
const { initiateReturn, getReturns, approveReturn, rejectReturn } = require('../controllers/returnController');

router.post('/initiate', initiateReturn);
router.get('/', getReturns);
router.patch('/:id/approve', approveReturn);
router.patch('/:id/reject', rejectReturn);

module.exports = router;
