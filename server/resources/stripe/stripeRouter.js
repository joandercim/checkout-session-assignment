const express = require('express');
const { createCheckoutSession, getAllProducts, getAllPrices } = require('./stripeControllers');

const stripeRouter = express.Router();

stripeRouter.post('/create-checkout-session', createCheckoutSession)
stripeRouter.get('/products/prices', getAllPrices)
stripeRouter.get('/products', getAllProducts)

module.exports = stripeRouter;
