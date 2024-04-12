const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const customerSchema = require('../../models/customerSchema');
const CustomerService = require('../../utils/CustomerService');
const StripeServices = require('../../utils/StripeServices');
const Customer = require('../../models/Customer');
const CustomerLocation = require('../../models/CustomerLocation');

const fs = require('fs').promises;

exports.getCustomers = async (req, res) => {
  const customers = await CustomerService.getAllCustomers();
  res.status(200).json({ success: true, customers });
};

exports.getCustomer = async (req, res) => {
  const currentCustomer = await CustomerService.getCurrentCustomerByID(
    req.params.id
  );

  if (!currentCustomer) {
    return res.status(400).json({
      success: false,
      customer: `No customer with id ${req.params.id} in db.`,
    });
  }

  const { name, email, location } = currentCustomer;

  res.status(200).json({ success: true, customer: name, email, location });
};

exports.createCustomer = async (req, res) => {
  const { error } = customerSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }

  const customers = await CustomerService.getAllCustomers();
  const currentCustomer = await CustomerService.getCurrentCustomerByEmail(
    req.body.email
  );

  if (currentCustomer) {
    return res.status(400).json({
      success: false,
      customer: `Customer already in db.`,
    });
  }

  const hashedPass = await bcrypt.hash(req.body.password, 10);

  const newCustomer = new Customer(
    uuidv4(),
    req.body.name,
    req.body.email,
    hashedPass,
    new CustomerLocation(
      req.body.location.street,
      req.body.location.zipCode,
      req.body.location.city
    )
  );

  customers.push(newCustomer);

  const updatedCustomers = await StripeServices.createStripeCustomer(
    req.body.name,
    req.body.email,
    req.body.location,
    customers
  );

  await fs.writeFile(
    './data/customers.json',
    JSON.stringify(updatedCustomers, null, 2)
  );

  res.status(201).json({ success: true, customer: newCustomer.email });
};

exports.getCustomerOrders = async (req, res) => {
  const orders = await CustomerService.getOrdersByCustomerEmail(
    req.params.email
  );

  res.status(200).json({ success: true, orders });
};
