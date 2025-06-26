const Review = require('../models/Review');
const User = require('../models/User'); // Assuming this is your Prestataire model
const City = require('../models/City');
exports.createReview = async (req, res) => {
  try {
    const { client, prestataire, reservation, note, commentaire } = req.body;

    const review = new Review({
      client,
      prestataire,
      reservation,
      note,
      commentaire
    });

    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getReviewsForPrestataire = async (req, res) => {
  try {
    const { prestataireId } = req.params;
    const reviews = await Review.find({ prestataire: prestataireId })
      .populate('client', 'name') 
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getReviewsByCityName = async (req, res) => {
    try {
        const { cityName } = req.params;

        // 1. Find the city to get its ID (case-insensitive)
        const city = await City.findOne({ name: new RegExp(`^${cityName}$`, 'i') });
        if (!city) {
            return res.status(404).json({ message: 'City not found' });
        }

        // 2. Find all prestataires associated with this city
        const prestatairesInCity = await User.find({ city: city._id, role: 'prestataire' }).select('_id name');
        const prestataireIds = prestatairesInCity.map(p => p._id);

        if (prestataireIds.length === 0) {
            return res.status(200).json([]); // No prestataires in this city, so no reviews
        }

        // 3. Find reviews for these prestataires and populate client/prestataire names
        const reviews = await Review.find({ prestataire: { $in: prestataireIds } })
            .populate('client', 'name') // Populate client to get their name
            .populate('prestataire', 'name') // Populate prestataire to get their name
            .sort({ createdAt: -1 }); // Sort by newest reviews first

        // Format reviews to match frontend expectations (nom, note, commentaire, date)
        const formattedReviews = reviews.map(review => ({
            id: review._id,
            nom: review.client ? review.client.name : 'Client Anonyme', // Use client name
            note: review.note,
            commentaire: review.commentaire,
            date: review.createdAt, // Frontend uses 'date', backend uses 'createdAt'
            prestataireName: review.prestataire ? review.prestataire.name : 'Prestataire Inconnu'
        }));

        res.status(200).json(formattedReviews);
    } catch (error) {
        console.error("Error fetching reviews by city name:", error);
        res.status(500).json({ message: 'Error fetching reviews for city', error: error.message });
    }
};