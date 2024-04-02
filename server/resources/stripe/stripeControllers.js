const initStripe = require('../../stripe');

const stripe = initStripe();

const createCheckoutSession = async (req, res) => {

  const { body } = req.body

  console.log(body)
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: body,
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });

    res.status(200).json({ msg: 'Session created', url: session.url });
  } catch (e) {
    res.status(200).json({ error: e.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    console.log('Fetching products');
    const products = await stripe.products.list();
    res.status(200).json({ success: true, products });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const getAllPrices = async (req, res) => {
  try {
    console.log('Fetching prices');
    const prices = await stripe.prices.list();
    res.status(200).json({ success: true, prices });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = { createCheckoutSession, getAllProducts, getAllPrices };

// Retrieve a session
// OM payment_status === true så har allt gått bra.

// Retreive a checkout sessions line items (hämta information om vad som fanns i ordern)
// Webhooks kan vara något att använda. (fast inte i den här uppgiften)
