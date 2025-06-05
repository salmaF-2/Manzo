// controllers/bookingController.js
const Booking = require('../models/Booking');

// ➕ Créer une réservation
exports.createBooking = async (req, res) => {
  try {
    const newBooking = await Booking.create(req.body);
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
