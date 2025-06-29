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



