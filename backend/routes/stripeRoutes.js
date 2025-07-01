const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Booking = require('../models/Booking');

// Créer un Payment Intent et confirmer le paiement immédiatement
router.post('/create-and-confirm-payment', async (req, res) => {
  try {
    const { amount, currency = 'mad', metadata, bookingId } = req.body;

    // 1. Créer le Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      metadata: { ...metadata, bookingId },
      payment_method_types: ['card'],
    });

    // 2. Confirmer le paiement immédiatement (simulation en mode test)
    const confirmedPayment = await stripe.paymentIntents.confirm(
      paymentIntent.id,
      { payment_method: 'pm_card_visa' } // Carte de test Stripe
    );

    // 3. Mettre à jour la réservation
    await Booking.findByIdAndUpdate(bookingId, {
      status: 'confirmed',
      paymentId: confirmedPayment.id,
      paymentStatus: confirmedPayment.status,
    });

    res.json({ 
      success: true,
      paymentIntent: confirmedPayment,
    });

  } catch (error) {
    console.error('Erreur de paiement:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;