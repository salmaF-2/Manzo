const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  paymentMethod: { type: String, enum: ['card', 'cash', 'stripe'], required: true },
  stripePaymentIntentId: String,
  stripeCustomerId: String,
  amount: Number,
  currency: { type: String, default: 'eur' },
  status: { type: String, enum: ['requires_payment_method', 'requires_confirmation', 'processing', 'requires_action', 'succeeded', 'canceled'], default: 'requires_payment_method' }
});

const devisSchema = new mongoose.Schema({
  montant: Number,
  details: String,
  accepte: Boolean
});

const bookingSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  prestataire: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  date: { type: Date, required: true },
  heureDebut: String,
  heureFin: String,
  adresse: String,
  statut: { 
    type: String, 
    enum: ['en_attente', 'confirme', 'annule', 'termine'], 
    default: 'en_attente' 
  },
  devis: devisSchema,
  payment: paymentSchema,
  note: Number,
  avis: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);