const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: false,
  },
  startingPrice: {
    type: Number,
    required: false,
  },
  duration: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  rating: {
    type: Number,
    required: false,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  pricingType: {
    type: String,
    enum: ['fixed', 'devis'],
    required: true,
    default: 'fixed',
  },
  cities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'City',
      required: true,
    }
  ],
  iconName: {
    type: String,
  },
  popular: {
    type: Boolean,
    default: false,
  },
  prestataire: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Service', serviceSchema);
