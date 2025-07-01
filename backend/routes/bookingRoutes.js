const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { requireAuth } = require('../middleware/authMiddleware'); // <-- Import the middleware

// --- FIX: Add requireAuth middleware to the routes that need it ---

router.post('/', requireAuth, bookingController.createBooking);
router.post('/update-payment', requireAuth, bookingController.updatePaymentStatus);
// GET /api/bookings - Get all bookings (can be admin-only or for a specific user)
// Example: Protect it so only authenticated users can see their own bookings
router.get('/', requireAuth, bookingController.getAllBookings); // Or create a dedicated 'getMyBookings' controller

// GET /api/bookings/:id - Get a single booking
router.get('/:id', requireAuth, bookingController.getBookingById);

// PATCH /api/bookings/:id/payment - Update payment status
router.patch('/:id/payment', requireAuth, bookingController.updateBookingPayment); // You might need a dedicated controller for this

// PUT /api/bookings/:id - Update a booking
router.put('/:id', requireAuth, bookingController.updateBooking);

// DELETE /api/bookings/:id - Delete a booking
router.delete('/:id', requireAuth, bookingController.deleteBooking);


module.exports = router;