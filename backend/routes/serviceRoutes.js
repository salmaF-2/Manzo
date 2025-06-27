const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');
const { requireAuth } = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// Routes publiques
router.get('/', serviceController.getServices);
router.get('/popular', serviceController.getPopularServices);
router.get('/city/:cityId', serviceController.getServicesByCity);
router.get('/:id/prestataires', serviceController.getPrestatairesForService);

router.get('/:id', serviceController.getServiceById);

// Routes protégées
router.post('/', requireAuth, serviceController.createService);
router.put('/:id', requireAuth, serviceController.updateService);
router.delete('/:id', requireAuth, adminMiddleware, serviceController.deleteService);

module.exports = router;