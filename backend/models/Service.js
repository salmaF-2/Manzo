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
  title: { type: String, required: true },
  description: String,
  price: {
    type: Number,
    // Price is required only if pricingType is 'fixed'
    required: function() { return this.pricingType === 'fixed'; }
  },
  startingPrice: {
    type: Number,
    // StartingPrice is required only if pricingType is 'devis'
    required: function() { return this.pricingType === 'devis'; }
  },
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
  // Assumes a one-to-one relationship between a service and a prestataire for simplicity
  prestataire: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Service', serviceSchema);