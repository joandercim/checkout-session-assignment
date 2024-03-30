const express = require('express');
const { createCheckoutSession } = require('./checkoutControllers');

const checkoutRouter = express.Router();

checkoutRouter.post('/create-checkout-session', createCheckoutSession)

module.exports = checkoutRouter;
