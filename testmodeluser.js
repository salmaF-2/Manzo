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
  adresse: {
    rue: String,
    codePostal: String,
    ville: String,
    pays: String
  },
  localisation: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    }
  },
  preferences: {
    notifications: { type: Boolean, default: true },
    langue: { type: String, default: 'fr' },
    methodePaiementPreferee: {
      type: String,
      enum: ['carte', 'virement', 'paypal', 'cash']
    }
  },
  favorisPrestataires: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  avisLaisses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Avis' }],
  prestataireInfo: prestataireInfoSchema,
  createdAt: { type: Date, default: Date.now }
});
