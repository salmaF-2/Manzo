const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

const { requirePrestataireAuth } = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// Public routes
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.get('/:id/services', categoryController.getServicesByCategory);

// Admin-only routes
router.post('/', requirePrestataireAuth, categoryController.createCategory);
router.put('/:id', requirePrestataireAuth, categoryController.updateCategory);
router.delete('/:id', requirePrestataireAuth, categoryController.deleteCategory);

module.exports = router;
