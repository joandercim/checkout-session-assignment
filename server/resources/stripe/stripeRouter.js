const express = require('express');
const { createCheckoutSession, getAllProducts, getAllPrices, createStripeCustomer, verifySession } = require('./stripeControllers');

const stripeRouter = express.Router();

stripeRouter.post('/create-checkout-session', createCheckoutSession)
stripeRouter.post('/verify-checkout-session/', verifySession)
stripeRouter.post('/customer/create', createStripeCustomer)
stripeRouter.get('/customer/:id', getAllPrices)
stripeRouter.get('/products/prices', getAllPrices)
stripeRouter.get('/products', getAllProducts)

module.exports = stripeRouter;
