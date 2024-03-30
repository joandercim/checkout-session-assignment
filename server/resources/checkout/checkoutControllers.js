const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

const createCheckoutSession = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price: 'price_1Ozuu106UDFBBq4ET3XkA75S',
          quantity: 1,
        },
      ],
      success_url: `${process.env.SERVER_URL}?success=true`,
      cancel_url: `${process.env.SERVER_URL}?canceled=true`,
    });

    res.status(200).json({ msg: 'Session created', url: session });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = { createCheckoutSession };
