require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const stripeRoutes = require('./routes/stripeRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const cityRoutes = require('./routes/cityRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');
const serviceRoutes = require('./routes/serviceRoutes'); 
const categoryRoutes = require('./routes/categoryRoutes'); 
const { requireClientAuth, requirePrestataireAuth } = require('./middleware/authMiddleware');

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// This middleware is CORRECT. It serves static files from the 'uploads' directory
// and makes them accessible at URLs like http://localhost:5000/uploads/your-image.png
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
console.log("Static files from 'uploads' directory are now being served.");

// Global error handler
app.use((err, req, res, next) => {
  console.error('Middleware erreur:', err);
  res.status(500).json({ error: err.message });
});

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connexion à MongoDB réussie"))
  .catch((err) => console.error("❌ Erreur de connexion MongoDB :", err));

// Route Definitions
// Note: Some routes are mounted at `/api` and others at specific prefixes like `/api/reviews`.
app.use('/api/stripe', stripeRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api', contactRoutes);
app.use('/api', cityRoutes);

// This is the route that is being called by the frontend.
// The `reviewRoutes` module needs to have a route defined for `GET /`
// to handle the request to `http://localhost:5000/api/reviews`.
app.use('/api/reviews', reviewRoutes);

app.use('/api/services', serviceRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/auth', authRoutes);

// Protected routes
app.get('/DashboardClient', requireClientAuth, (req, res) => {
  res.json({ message: 'Bienvenue dans votre espace client' });
});
app.get('/DashboardPrestataire', requirePrestataireAuth, (req, res) => {
  res.json({ message: 'Bienvenue dans votre espace prestataire' });
});

// 404 handler (must be the last middleware)
app.use((req, res) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur en écoute sur le port ${PORT}`);
});