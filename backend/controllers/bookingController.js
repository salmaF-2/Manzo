const Booking = require('../models/Booking');
const Service = require('../models/Service');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// exports.createBooking = async (req, res) => {
//   try {
//     const { service, prestataire, date, time, paymentMethod, clientDetails, pricingType } = req.body;

//     // 1. Get service from DB to securely get price and type
//     const serviceDoc = await Service.findById(service);
//     if (!serviceDoc) {
//       return res.status(404).json({ error: 'Service non trouvé' });
//     }

//     // 2. Determine amount based on server-side data
//     let amount = 0;
//     if (serviceDoc.pricingType === 'fixed') {
//       amount = serviceDoc.price;
//     } else if (serviceDoc.pricingType === 'devis') {
//       // For a quote, the initial amount is 0. It will be updated later.
//       amount = serviceDoc.startingPrice || 0; 
//     }
    
//     // 3. Validate card payment for fixed price services
//     if (paymentMethod === 'card' && serviceDoc.pricingType === 'fixed' && (!amount || amount < 1)) {
//         return res.status(400).json({ error: 'Le prix du service pour le paiement par carte est invalide.' });
//     }

//     // 4. Create the new booking instance
//     const booking = new Booking({
//       service,
//       prestataire,
//       client: req.user.userId,
//       date: new Date(date),
//       time,
//       clientDetails,
//       status: serviceDoc.pricingType === 'devis' ? 'quote_pending' : 'pending',
//       payment: {
//         method: paymentMethod,
//         amount: amount,
//         status: (paymentMethod === 'card' && serviceDoc.pricingType === 'fixed') ? 'pending' : 
//                 (paymentMethod === 'cash') ? 'pending_cash' : 
//                 'quote_pending' // For devis or cash payment on a devis service
//       },
//     });
    
//     // 5. Handle Stripe PaymentIntent creation ONLY for fixed-price card payments
//     if (paymentMethod === 'card' && serviceDoc.pricingType === 'fixed') {
//       const paymentIntent = await stripe.paymentIntents.create({
//         amount: Math.round(amount * 100), // Stripe requires amount in cents
//         currency: 'mad',
//         metadata: { 
//           bookingId: booking._id.toString(),
//           serviceId: service,
//         }
//       });

//       booking.payment.stripePaymentId = paymentIntent.id;
//       await booking.save();

//       // Return the client secret for the frontend to confirm the payment
//       return res.status(201).json({
//         booking,
//         clientSecret: paymentIntent.client_secret
//       });
//     }

//     // 6. For all other cases (cash or devis), just save the booking and return
//     await booking.save();
//     res.status(201).json({ booking });

//   } catch (error) {
//     console.error('Erreur création réservation:', error);
//     res.status(500).json({ 
//       error: 'Une erreur est survenue lors de la création de la réservation.',
//       details: error.message
//     });
//   }
// };


exports.createBooking = async (req, res) => {
  try {
    const { service, prestataire, date, time, paymentMethod, clientDetails } = req.body;

    // 1. Get service details
    const serviceDoc = await Service.findById(service);
    if (!serviceDoc) {
      return res.status(404).json({ error: 'Service not found' });
    }

    // 2. Validate payment method
    if (paymentMethod === 'card' && serviceDoc.pricingType !== 'fixed') {
      return res.status(400).json({ error: 'Card payment only available for fixed-price services' });
    }

    // 3. Create booking
    const booking = new Booking({
      service,
      prestataire,
      client: req.user.userId,
      date: new Date(date),
      time,
      clientDetails,
      status: 'pending',
      payment: {
        method: paymentMethod,
        amount: serviceDoc.price,
        currency: 'mad',
        status: 'pending'
      }
    });

    // 4. Handle Stripe payment
    if (paymentMethod === 'card') {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(serviceDoc.price * 100),
        currency: 'mad',
        metadata: { bookingId: booking._id.toString() },
        payment_method_types: ['card'],
        description: `Payment for ${serviceDoc.title}`
      });

      booking.payment.stripePaymentId = paymentIntent.id;
      booking.payment.clientSecret = paymentIntent.client_secret;
    }

    await booking.save();

    res.status(201).json({
      booking,
      clientSecret: booking.payment.clientSecret
    });

  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ 
      error: error.message,
      details: error.response?.data || error 
    });
  }
};

exports.updatePaymentStatus = async (req, res) => {
  try {
    const { bookingId, status } = req.body;
    
    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { 
        'payment.status': status,
        status: status === 'succeeded' ? 'confirmed' : 'pending'
      },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('service')
      .populate('prestataire')
      .populate('client');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('service')
      .populate('prestataire')
      .populate('client');
    
    if (!booking) {
      return res.status(404).json({ message: "Réservation non trouvée" });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!booking) {
      return res.status(404).json({ message: "Réservation non trouvée" });
    }
    res.json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: "Réservation non trouvée" });
    }
    res.json({ message: "Réservation supprimée" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add this to bookingController.js
exports.updateBookingPayment = async (req, res) => {
    try {
      const { status } = req.body;
      const booking = await Booking.findById(req.params.id);
  
      if (!booking) {
        return res.status(404).json({ message: "Réservation non trouvée" });
      }

      // Check if the user making the request is the client of the booking
      if (booking.client.toString() !== req.user.userId) {
        return res.status(403).json({ message: "Action non autorisée" });
      }
  
      booking.payment.status = status;
      await booking.save();
  
      res.json(booking);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };