const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { requireAuth } = require('../middleware/authMiddleware');

// Envoyer un message de contact (accessible sans authentification)
router.post('/contact', contactController.sendContactMessage);

// Récupérer les messages (seulement pour admin)
router.get('/contact', requireAuth, contactController.getContactMessages);

module.exports = router;