const City = require('../models/City');

exports.getAllCities = async (req, res) => {
  try {
    const cities = await City.find().populate('prestataires', 'name email'); 
    res.json(cities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addCity = async (req, res) => {
  try {
    const city = new City(req.body);
    await city.save();
    res.status(201).json(city);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
