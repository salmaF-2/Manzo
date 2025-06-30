// cityRoutes.js
const express = require('express');
const router = express.Router();
const cityController = require('../controllers/cityController'); // This imports your controller

router.get('/cities', cityController.getAllCities);  // <-- Tries to use getAllCities
router.post('/cities', cityController.addCity);      // <-- Tries to use addCity (THIS IS LINE 5)
router.get('/cities/:name', cityController.getCityByName); // New route

module.exports = router;