const StripeCustomer = require('../models/StripeCustomer');
const CustomerService = require('./CustomerService');

const initStripe = require('../stripe');
const stripe = initStripe();

class StripeServices {
  constructor() {}

  static async createStripeCustomer(name, email) {

    console.log('StripeServices running')
    const newStripeCustomer = new StripeCustomer(name, email);

    try {
      const customer = await stripe.customers.create(newStripeCustomer);
      const customersInDB = await CustomerService.getAllCustomers();
      const customerInDB = await CustomerService.getCurrentCustomerByEmail(
        email
      );

      if (customerInDB) {
        customerInDB.stripeId = customer.id;

        const updatedCustomers = customersInDB.map((cust) => {
          if (cust.email === email) {
            console.log('Updating customer...');
            return customerInDB;
          } else {
            return cust;
          }
        });
        fs.writeFile(
          './data/customers.json',
          JSON.stringify(updatedCustomers, null, 2)
        );
      }
    } catch (e) {
      console.error(e);
    }
  }
}

module.exports = StripeServices;
