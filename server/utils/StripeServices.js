const StripeCustomer = require('../models/StripeCustomer');
const initStripe = require('../stripe');
const StripeCustomerLocation = require('../models/StripeCustomerLocation');
const stripe = initStripe();

class StripeServices {
  constructor() {}

  static async createStripeCustomer(name, email, location, customers) {
    const newCustomer = new StripeCustomer(
      name,
      email,
      new StripeCustomerLocation(
        location.city,
        location.street,
        location.zipCode
      )
    );

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
