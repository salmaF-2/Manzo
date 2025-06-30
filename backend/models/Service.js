// const mongoose = require('mongoose');

// const serviceSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: String,
//   price: {
//     type: Number,
//     required: function() { return this.pricingType === 'fixed'; }
//   },
//   startingPrice: {
//     type: Number,
//     required: function() { return this.pricingType === 'devis'; }
//   },
//   duration: String,
//   image: String,
//   rating: Number,
//   category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
//   pricingType: { 
//     type: String, 
//     enum: ['fixed', 'devis'], 
//     required: true 
//   },
//   cities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'City' }],
//   iconName: String,
//   popular: Boolean,

//   prestataire: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
// });


// module.exports = mongoose.model('Service', serviceSchema);

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
