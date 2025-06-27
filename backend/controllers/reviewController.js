const Review = require('../models/Review');
const User = require('../models/User'); 
const City = require('../models/City');

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

exports.getReviewsForPrestataire = async (req, res) => {
    try {
        const { prestataireId } = req.params;
        // FIX: Populate 'client' with both nom and prenom
        const reviews = await Review.find({ prestataire: prestataireId })
            .populate('client', 'nom prenom') 
            .sort({ createdAt: -1 });
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getReviewsByCityName = async (req, res) => {
    try {
        const { cityName } = req.params;

        // CRUCIAL FIX: Query for prestataires by the string 'ville' field, not the ObjectId from 'City'.
        const prestatairesInCity = await User.find({
            role: 'prestataire',
            ville: { $regex: new RegExp(`^${cityName}$`, 'i') } // Case-insensitive exact match
        }).select('_id nom prenom'); 

        const prestataireIds = prestatairesInCity.map(p => p._id);

        if (prestataireIds.length === 0) {
            // No prestataires found in this city, so there can't be any reviews for them.
            return res.status(200).json([]); 
        }

        // Find reviews for these prestataires and populate client's name
        const reviews = await Review.find({ prestataire: { $in: prestataireIds } })
            .populate('client', 'nom prenom') // FIX: Populate with nom and prenom
            .sort({ createdAt: -1 });

        // Format reviews to match frontend expectations (nom, note, commentaire, date)
        const formattedReviews = reviews.map(review => ({
            id: review._id,
            // FIX: Combine nom and prenom from the populated client object
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