const Stripe = require('stripe');
require('dotenv').config();
const createPaymentIntent = async (req, res) => {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const amount = Math.round(req.body.amount * 100);
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "inr",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Stripe Intent Error:", error);
    res.status(500).json({ error: error.message });
  }
};

const getConfig = (req, res) => {
  res.json({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
  });
};

module.exports = { createPaymentIntent, getConfig };
