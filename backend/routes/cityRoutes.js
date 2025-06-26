const express = require('express');
const router = express.Router();
const cityController = require('../controllers/cityController');

router.get('/cities', cityController.getAllCities);
router.post('/cities', cityController.addCity);
router.get('/cities/:name', cityController.getCityByName); // New route

module.exports = router;