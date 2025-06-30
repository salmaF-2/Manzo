const Review = require('../models/Review');
const User = require('../models/User'); 
const City = require('../models/City');

// Create a new review
exports.createReview = async (req, res) => {
    try {
        const { client, prestataire, reservation, note, commentaire } = req.body;
        const review = new Review({ client, prestataire, reservation, note, commentaire });
        await review.save();
        res.status(201).json(review);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get reviews for a specific prestataire
exports.getReviewsForPrestataire = async (req, res) => {
    try {
        const { prestataireId } = req.params;
        const reviews = await Review.find({ prestataire: prestataireId })
            .populate('client', 'nom prenom profileImage') // CORRECTED: Added profileImage
            .sort({ createdAt: -1 });
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get reviews by city name
exports.getReviewsByCityName = async (req, res) => {
    try {
        const { cityName } = req.params;

        const prestatairesInCity = await User.find({
            role: 'prestataire',
            ville: { $regex: new RegExp(`^${cityName}$`, 'i') } 
        }).select('_id nom prenom'); 

        const prestataireIds = prestatairesInCity.map(p => p._id);

        if (prestataireIds.length === 0) {
            return res.status(200).json([]); 
        }

        const reviews = await Review.find({ prestataire: { $in: prestataireIds } })
            .populate('client', 'nom prenom profileImage') // CORRECTED: Added profileImage
            .sort({ createdAt: -1 });

        const formattedReviews = reviews.map(review => ({
            id: review._id,
            nom: review.client ? `${review.client.nom} ${review.client.prenom}` : 'Client Anonyme', 
            note: review.note,
            commentaire: review.commentaire,
            date: review.createdAt, 
        }));

        res.status(200).json(formattedReviews);
    } catch (error) {
        console.error("Error fetching reviews by city name:", error);
        res.status(500).json({ message: 'Error fetching reviews for city', error: error.message });
    }
};

// Get all reviews for the homepage
exports.getAllReviews = async (req, res) => {
    try {
        // Fetch all reviews and populate the client details, including the photo
        const reviews = await Review.find({})
            .populate('client', 'nom prenom photo') // CORRECTED: Added profileImage
            .sort({ createdAt: -1 }); // Sort by newest first
        
        res.status(200).json(reviews);
    } catch (error) {
        console.error("Error fetching all reviews:", error);
        res.status(500).json({ message: 'Error fetching all reviews', error: error.message });
    }
};

// --- UPDATE YOUR MODULE EXPORTS ---
module.exports = {
    createReview: exports.createReview,
    getReviewsForPrestataire: exports.getReviewsForPrestataire,
    getReviewsByCityName: exports.getReviewsByCityName,
    getAllReviews: exports.getAllReviews,
};