const express = require('express');
const { createPaymentIntent, getConfig } = require('../controllers/paymentController');

const router = express.Router();

router.post('/create-payment-intent', createPaymentIntent);
router.get('/config', getConfig);

module.exports = router;
