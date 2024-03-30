const express = require('express');
const { getCustomers, createCustomer, getCustomer } = require('./customerControllers');

const customerRouter = express.Router();

customerRouter.get('/', getCustomers);
customerRouter.get('/:id', getCustomer);
customerRouter.post('/create', createCustomer);


module.exports = customerRouter;
