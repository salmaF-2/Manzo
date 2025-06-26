const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

const { requireAuth } = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// Public routes
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.get('/:id/services', categoryController.getServicesByCategory);

// Admin-only routes
router.post('/', requireAuth, adminMiddleware, categoryController.createCategory);
router.put('/:id', requireAuth, adminMiddleware, categoryController.updateCategory);
router.delete('/:id', requireAuth, adminMiddleware, categoryController.deleteCategory);

module.exports = router;
