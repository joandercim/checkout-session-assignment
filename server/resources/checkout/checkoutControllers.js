const initStripe = require('../../stripe')

const stripe = initStripe();

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

    res.status(200).json({ msg: 'Session created', url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = { createCheckoutSession };

// Retrieve a session
// OM payment_status === true så har allt gått bra.

// Retreive a checkout sessions line items (hämta information om vad som fanns i ordern)
// Webhooks kan vara något att använda. (fast inte i den här uppgiften)
