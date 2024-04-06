const fs = require('fs').promises;
const StripeCustomer = require('../models/StripeCustomer');
const CustomerService = require('./CustomerService');

const initStripe = require('../stripe');
const stripe = initStripe();

class StripeServices {
  constructor() {}

  static async createStripeCustomer(name, email, customers) {
    const newCustomer = new StripeCustomer(name, email);

    try {
      const customer = await stripe.customers.create(newCustomer);
      const customerInDB = customers.find((c) => c.email === email);
      customerInDB.stripeId = customer.id;

      const updatedCustomers = customers.map((cust) => {
        if (cust.email === email) {
          console.log('Updating customer...');
          return customerInDB;
        } else {
          return cust;
        }
      });

      return updatedCustomers;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = StripeServices;
