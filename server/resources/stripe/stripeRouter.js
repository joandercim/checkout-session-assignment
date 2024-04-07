const express = require('express');
const { createCheckoutSession, getAllProducts, verifySession, getActiveCouponCodes } = require('./stripeControllers');
const loggedIn = require('../../middleware/loggedin');

const stripeRouter = express.Router();

stripeRouter.post('/create-checkout-session', loggedIn, createCheckoutSession)
stripeRouter.post('/verify-checkout-session/', verifySession)
stripeRouter.get('/products', getAllProducts)
stripeRouter.get('/coupons', getActiveCouponCodes)

module.exports = stripeRouter;
