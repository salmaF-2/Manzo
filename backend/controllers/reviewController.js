const Review = require('../models/Review');
const User = require('../models/User');
const City = require('../models/City');

exports.createReview = async (req, res) => {
    try {
        const { client, prestataire, reservation, note, commentaire } = req.body;
        const review = new Review({ client, prestataire, reservation, note, commentaire });
        await review.save();

        const allReviewsForPrestataire = await Review.find({ prestataire: prestataire });
        const numberOfReviews = allReviewsForPrestataire.length;
        const totalRating = allReviewsForPrestataire.reduce((acc, curr) => acc + curr.note, 0);
        const averageRating = numberOfReviews > 0 ? totalRating / numberOfReviews : 0;

        await User.findByIdAndUpdate(
            prestataire,
            {
                'prestataireInfo.noteMoyenne': averageRating,
                'prestataireInfo.nombreAvis': numberOfReviews,
            },
            { new: true }
        );

        res.status(201).json(review);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getReviewsForPrestataire = async (req, res) => {
    try {
        const { prestataireId } = req.params;
        const reviews = await Review.find({ prestataire: prestataireId })
            .populate('client', 'nom prenom photo') // CHANGE THIS LINE: 'profileImage' to 'photo'
            .sort({ createdAt: -1 });
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

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
            .populate('client', 'nom prenom photo') // CHANGE THIS LINE: 'profileImage' to 'photo'
            .sort({ createdAt: -1 });

        const formattedReviews = reviews.map(review => ({
            id: review._id,
            nom: review.client ? `${review.client.prenom || ''} ${review.client.nom || ''}`.trim() : 'Client Anonyme',
            note: review.note,
            commentaire: review.commentaire,
            date: review.createdAt,
            profileImage: review.client ? review.client.photo : undefined, // CHANGE THIS LINE: 'profileImage' to 'photo'
        }));

        res.status(200).json(formattedReviews);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reviews for city', error: error.message });
    }
};

exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find({})
            .populate('client', 'nom prenom photo') // CHANGE THIS LINE: 'profileImage' to 'photo'
            .sort({ createdAt: -1 });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching all reviews', error: error.message });
    }
};

module.exports = {
    createReview: exports.createReview,
    getReviewsForPrestataire: exports.getReviewsForPrestataire,
    getReviewsByCityName: exports.getReviewsByCityName,
    getAllReviews: exports.getAllReviews,
};