const initStripe = require('../../stripe');
const CustomerService = require('../../utils/CustomerService');
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
      discounts: [
        {
          coupon: req.body.couponId,
        },
      ],
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

      let newOrderNumber;

      const year = new Date()
        .getFullYear()
        .toString()
        .split('')
        .splice(2, 4)
        .join('');

      if (parsedOrders.length <= 0) {
        initalOrderNo = 1000;
        newOrderNumber = year + initalOrderNo;
      } else {
        const currentOrderNumber =
          parsedOrders[parsedOrders.length - 1].orderNumber
            .toString()
            .substring(2) * 1;
        newOrderNumber = parseInt(year + currentOrderNumber) + 1;
      }

      const order = {
        orderNumber: newOrderNumber,
        orderId: session.id,
        payment_method_types: session.payment_method_types,
        payment_status: session.payment_status,
        customerId: session.customer_details.customer,
        customerName: session.customer_details.name,
        customerEmail: session.customer_details.email,
        servicePoint: {
          name: req.body.servicePoint.name,
          servicePointId: req.body.servicePoint.servicePointId,
        },
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

const getActiveCouponCodes = async (req, res) => {
  const promotionCodes = await stripe.coupons.list();
  res.status(200).json({ success: true, promotionCodes });
};

module.exports = {
  createCheckoutSession,
  getAllProducts,
  verifySession,
  getActiveCouponCodes,
};
