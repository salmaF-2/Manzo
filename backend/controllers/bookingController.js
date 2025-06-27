
const Booking = require('../models/Booking');
const stripe = require('../config/stripe');

// ➕ Créer une réservation (mise à jour)
exports.createBooking = async (req, res) => {
  try {
    const { client, ...rest } = req.body;

    // Vérifiez si le client existe déjà en base
    let clientId;
    if (typeof client === 'object') {
      const existingClient = await User.findOne({ email: client.email });
      if (existingClient) {
        clientId = existingClient._id;
      } else {
        // Créez un nouvel utilisateur client si nécessaire
        const newClient = await User.create({
          name: client.name,
          email: client.email,
          phone: client.phone,
          role: 'client',
          adresse: client.address
        });
        clientId = newClient._id;
      }
    } else {
      clientId = client; // Supposons que c'est déjà un ObjectId
    }

    const bookingData = {
      ...rest,
      client: clientId, // Utilisez uniquement l'ObjectId
      payment: {
        paymentMethod: rest.paymentMethod || 'cash',
        status: rest.paymentMethod === 'stripe' ? 'requires_payment_method' : 'succeeded'
      }
    };

    const newBooking = await Booking.create(bookingData);
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 📃 Obtenir toutes les réservations
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('client')
      .populate('prestataire')
      .populate('service');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔍 Obtenir une réservation par ID
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('client')
      .populate('prestataire')
      .populate('service');
    if (!booking) return res.status(404).json({ message: "Réservation non trouvée" });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📝 Modifier le statut ou le devis
exports.updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!booking) return res.status(404).json({ message: "Réservation non trouvée" });
    res.json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ❌ Supprimer une réservation
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: "Réservation non trouvée" });
    res.json({ message: "Réservation supprimée" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
