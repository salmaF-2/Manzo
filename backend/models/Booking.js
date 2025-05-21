const mongoose = require('mongoose');

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
  note: Number,
  avis: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);
