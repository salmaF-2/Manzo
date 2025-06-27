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
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', 
        required: true,
    },
    pricingType: {
        type: String,
        enum: ['fixed', 'devis'],
        default: 'fixed'
    },
   
    cities: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City', // This is crucial for populating the city data
        required: true,
    }],
    iconName: {
        type: String,
    },
    popular: {
        type: Boolean,
        default: false,
    },
    // <<< FIX: THIS IS THE MISSING FIELD THAT CAUSES THE ERROR >>>
    // This field links the service to a specific prestataire (User)
    prestataire: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // This is crucial and must match the model name 'User'
        required: true,
    },
    // <<< END FIX >>>
}, {
    timestamps: true, // Adds createdAt and updatedAt timestamps
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;