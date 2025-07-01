const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.post('/', reviewController.createReview);
router.get('/', reviewController.getAllReviews); // <-- ADD THIS LINE
router.get('/prestataire/:prestataireId', reviewController.getReviewsForPrestataire);
router.get('/city/:cityName', reviewController.getReviewsByCityName); // New route

module.exports = router;