const stripe = require('../config/stripe');
const Booking = require('../models/Booking');

// Créer un Payment Intent
exports.createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency, bookingId } = req.body;
    
    // Créer un customer dans Stripe
    const customer = await stripe.customers.create({
      email: req.user.email,
      name: `${req.user.firstName} ${req.user.lastName}`,
      metadata: {
        userId: req.user._id.toString(),
        bookingId: bookingId
      }
    });

    // Créer un Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe utilise des centimes
      currency: currency || 'eur',
      customer: customer.id,
      metadata: {
        bookingId: bookingId
      },
      payment_method_types: ['card'],
      description: `Paiement pour la réservation ${bookingId}`
    });

    // Mettre à jour la réservation avec les infos de paiement
    await Booking.findByIdAndUpdate(bookingId, {
      'payment.stripePaymentIntentId': paymentIntent.id,
      'payment.stripeCustomerId': customer.id,
      'payment.amount': amount,
      'payment.currency': currency || 'eur',
      'payment.status': paymentIntent.status
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
  } catch (error) {
    console.error('Erreur Stripe:', error);
    res.status(500).json({ error: error.message });
  }
};

// Confirmer le paiement
exports.confirmPayment = async (req, res) => {
  try {
    const { paymentIntentId } = req.body;
    
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({ error: 'Le paiement n\'a pas été confirmé' });
    }

    // Mettre à jour la réservation
    const booking = await Booking.findOneAndUpdate(
      { 'payment.stripePaymentIntentId': paymentIntentId },
      { 
        'payment.status': 'succeeded',
        statut: 'confirme'
      },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ error: 'Réservation non trouvée' });
    }

    res.status(200).json(booking);
  } catch (error) {
    console.error('Erreur confirmation paiement:', error);
    res.status(500).json({ error: error.message });
  }
};

// Webhook pour les événements Stripe
exports.handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook Error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Gérer les différents événements
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      await handlePaymentIntentSucceeded(paymentIntent);
      break;
    case 'payment_intent.payment_failed':
      const paymentFailed = event.data.object;
      await handlePaymentIntentFailed(paymentFailed);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};

async function handlePaymentIntentSucceeded(paymentIntent) {
  try {
    await Booking.findOneAndUpdate(
      { 'payment.stripePaymentIntentId': paymentIntent.id },
      { 
        'payment.status': 'succeeded',
        statut: 'confirme'
      }
    );
  } catch (error) {
    console.error('Erreur mise à jour réservation:', error);
  }
}

async function handlePaymentIntentFailed(paymentIntent) {
  try {
    await Booking.findOneAndUpdate(
      { 'payment.stripePaymentIntentId': paymentIntent.id },
      { 
        'payment.status': 'failed',
        statut: 'annule'
      }
    );
  } catch (error) {
    console.error('Erreur mise à jour réservation:', error);
  }
}