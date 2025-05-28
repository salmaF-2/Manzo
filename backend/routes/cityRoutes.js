const express = require('express');
const router = express.Router();
const City = require('../models/City');

router.get('/cities', async (req, res) => {
  try {
    const cities = await City.find({}, 'name'); // récupère juste le nom
    res.json(cities);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;
