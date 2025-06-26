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
    const { name, image, coordinates, prestataires } = req.body;

    const city = new City({ name, image, coordinates, prestataires });
    await city.save();

    res.status(201).json(city);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
exports.getCityByName = async (req, res) => {
    try {
        const { name } = req.params;
        // Case-insensitive search for the city
        const city = await City.findOne({ name: new RegExp(`^${name}$`, 'i') }).populate({
            path: 'prestataires', // Populate the prestataires array
            model: 'User', // The model to use for population
            select: 'name service photo averageRating numberOfReviews distance' // Fields to select from Prestataire (User)
        });

        if (!city) {
            return res.status(404).json({ message: 'City not found' });
        }
        res.status(200).json(city);
    } catch (error) {
        console.error("Error fetching city by name:", error);
        res.status(500).json({ message: 'Error fetching city data', error: error.message });
    }
};
