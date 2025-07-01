// const mongoose = require('mongoose');

// const bookingSchema = new mongoose.Schema({
//   service: { 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: 'Service', 
//     required: true 
//   },
//   prestataire: { 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: 'User', 
//     required: true 
//   },
//   client: { 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: 'User' 
//   },
//   date: { 
//     type: Date, 
//     required: true 
//   },
//   time: { 
//     type: String, 
//     required: true 
//   },
//   status: { 
//     type: String, 
//     enum: ['pending', 'confirmed', 'cancelled', 'completed'], 
//     default: 'pending' 
//   },
//   payment: {
//     method: { 
//       type: String, 
//       enum: ['cash', 'card'], 
//       required: true 
//     },
//     status: { 
//       type: String, 
//       enum: ['pending', 'paid', 'failed'], 
//       default: 'pending' 
//     },
//     amount: { 
//       type: Number, 
//       required: true 
//     },
//     stripePaymentId: String
//   },
//   clientDetails: {
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     phone: { type: String, required: true },
//     address: { type: String, required: true },
//     notes: String
//   }
// }, { 
//   timestamps: true 
// });

// module.exports = mongoose.model('Booking', bookingSchema);

const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  service: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Service', 
    required: true 
  },
  prestataire: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  client: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  date: { 
    type: Date, 
    required: true 
  },
  time: { 
    type: String, 
    required: true 
  },
  status: { 
    type: String, 
    // FIX: More descriptive statuses for the booking lifecycle
    enum: ['pending', 'confirmed', 'cancelled', 'completed', 'quote_pending', 'quote_accepted'], 
    default: 'pending' 
  },
  payment: {
    method: { 
      type: String, 
      enum: ['cash', 'card'], 
      required: true 
    },
    status: { 
      type: String, 
      // FIX: More descriptive statuses for payment
      enum: ['pending', 'paid', 'failed', 'pending_cash', 'quote_pending'], 
      default: 'pending' 
    },
    amount: { 
      type: Number, 
      required: true 
    },
    stripePaymentId: String
  },
  clientDetails: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    notes: String
  }
}, { 
  timestamps: true 
});

module.exports = mongoose.model('Booking', bookingSchema);