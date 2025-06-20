const Review = require('../models/Review');

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
