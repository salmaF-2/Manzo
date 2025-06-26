const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true }, 
  coordinates: {
    lat: Number,
    lng: Number,
    zoom: Number
  },
  prestataires: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('City', citySchema);
