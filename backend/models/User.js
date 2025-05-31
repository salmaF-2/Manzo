const mongoose = require('mongoose');

const disponibiliteSchema = new mongoose.Schema({
  jour: String,               // Ex: "lundi"
  heures: [String]            // Ex: ["08:00-12:00"]
});

const prestataireInfoSchema = new mongoose.Schema({
  noteMoyenne: { type: Number, default: 0 },
  nombreAvis: { type: Number, default: 0 },
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
  disponibilites: [disponibiliteSchema],
  experience: {
    type: String,
    enum: ['0-1', '1-3', '3-5', '5+']
  },
  secteurActivite: String,
  tarification: String,
  documents: {
    cin: String,
    rib: String,
    certifications: [String],
    carteAE: String,
    photoProfil: String,
    videoPresentation: String
  },
  methodePaiement: {
    type: String,
    enum: ['carte', 'virement', 'paypal'],
    required: false // optionnel
  },
  detailsCarte: {
    nomCarte: String,
    numeroCarte: String,
    dateExpiration: String,
    cvc: String
  },
  statutVerification: {
    type: String,
    enum: ['en_attente', 'verifie', 'rejete'],
    default: 'en_attente'
  },
  localisation: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      index: '2dsphere'
    }
  }
});

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['client', 'prestataire', 'admin'], 
    required: true 
  },
  nom: String,
  prenom: String,
  telephone: String,
  photo: String,
  genre: {
    type: String,
    enum: ['homme', 'femme'], 
  },
  // ville: { type: mongoose.Schema.Types.ObjectId, ref: 'City' },
  ville: String,
  codePostal: String,
  rue: String,
  prestataireInfo: prestataireInfoSchema,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);