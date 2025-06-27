const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: Number,
  startingPrice: Number,
  duration: String,
  image: String,
  rating: Number,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  pricingType: { 
    type: String, 
    enum: ['fixed', 'devis'], 
    required: true 
  },
  cities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'City' }],
  iconName: String,
  popular: Boolean,

  prestataire: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});


module.exports = mongoose.model('Service', serviceSchema);
