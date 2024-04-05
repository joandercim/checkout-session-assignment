const { CLIENT_RENEG_LIMIT } = require('tls');
const StripeCustomer = require('../../models/StripeCustomer');
const initStripe = require('../../stripe');
const CustomerService = require('../../utils/CustomerService');
const { randomUUID } = require('crypto');
const fs = require('fs').promises;

const stripe = initStripe();

const getAllProducts = async (req, res) => {
  try {
    console.log('Fetching products');
    const products = await stripe.products.list({
      expand: ['data.default_price'],
    });
    res.status(200).json({ success: true, products });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const createCheckoutSession = async (req, res) => {
  const currentCustomer = await CustomerService.getCurrentCustomerByEmail(
    req.body.customer
  );

  try {
    const session = await stripe.checkout.sessions.create({
      customer: currentCustomer.stripeId,
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: req.body.checkoutItems,
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });

    res.status(200).json({
      msg: 'Session created',
      url: session.url,
      sessionId: session.id,
    });
  } catch (e) {
    res.status(200).json({ error: e.message });
  }
};

const createStripeCustomer = async (req, res) => {
  const { name, email } = req.body;
  const newStripeCustomer = new StripeCustomer(name, email);

  try {
    const customer = await stripe.customers.create(newStripeCustomer);
    const customersInDB = await CustomerService.getAllCustomers();
    const customerInDB = await CustomerService.getCurrentCustomerByEmail(email);

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

    res.status(200).json({ success: true, customerId: customer.id });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const verifySession = async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.body.sessionId);

  const orders = await fs.readFile('./data/orders.json');
  const parsedOrders = await JSON.parse(orders);

  const orderExists = parsedOrders.find(
    (o) => o.orderId === req.body.sessionId
  );

  if (!orderExists) {
    if (session.payment_status === 'paid') {
      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id
      );

      const order = {
        orderNumber: randomUUID(),
        orderId: session.id,
        customerId: session.customer_details.customer,
        customerName: session.customer_details.name,
        products: lineItems,
        total: session.amount_total / 100,
        timestamp: new Date().toLocaleString(),
      };

      parsedOrders.push(order);

      await fs.writeFile(
        './data/orders.json',
        JSON.stringify(parsedOrders, null, 2)
      );

      return res.status(200).json({ verified: true });
    } else {
      return res.status(200).json({ verified: false });
    }
  }
};

module.exports = {
  createCheckoutSession,
  getAllProducts,
  createStripeCustomer,
  verifySession,
};

// Retrieve a session
// OM payment_status === true så har allt gått bra.

// Retreive a checkout sessions line items (hämta information om vad som fanns i ordern)
// Webhooks kan vara något att använda. (fast inte i den här uppgiften)
