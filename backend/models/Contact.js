const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: String,
  city: String,
  postalCode: String,
  service: String,
  privacyConsent: { type: Boolean, default: false },
  message: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Référence à l'utilisateur connecté (optionnel)
  // role: { type: String, enum: ['client', 'prestataire', 'guest'] }, // Rôle de l'expéditeur
  role: { type: String, enum: ['client', 'prestataire', 'guest'], default: 'guest' },
  createdAt: { type: Date, default: Date.now }
},{ timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);