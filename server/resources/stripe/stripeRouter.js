const express = require('express');
const { createCheckoutSession, getAllProducts, createStripeCustomer, verifySession } = require('./stripeControllers');
const loggedIn = require('../../middleware/loggedin');

const stripeRouter = express.Router();

stripeRouter.post('/create-checkout-session', loggedIn, createCheckoutSession)
stripeRouter.post('/verify-checkout-session/', verifySession)
stripeRouter.post('/customer/create', createStripeCustomer)
stripeRouter.get('/products', getAllProducts)

module.exports = stripeRouter;
