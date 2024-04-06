const express = require('express');
const { getCustomers, createCustomer, getCustomer, getCustomerOrders } = require('./customerControllers');

const customerRouter = express.Router();

customerRouter.get('/', getCustomers);
customerRouter.get('/:id', getCustomer);
customerRouter.get('/orders/:email', getCustomerOrders)
customerRouter.post('/create', createCustomer);


module.exports = customerRouter;
