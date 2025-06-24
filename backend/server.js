// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const { requireClientAuth,requirePrestataireAuth  } = require('./middleware/authMiddleware');
const app = express();
const contactRoutes = require('./routes/contactRoutes');

// Middlewares
// app.use(cors());
app.use(cors({
  origin: 'http://localhost:3000', // ou votre URL frontend
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 


app.use((err, req, res, next) => {
  console.error('Middleware erreur:', err);
  res.status(500).json({ error: err.message });
});
// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ Connexion à MongoDB réussie"))
  .catch((err) => console.error("❌ Erreur de connexion MongoDB :", err));
app.use('/api', contactRoutes);


const cityRoutes = require('./routes/cityRoutes');
app.use('/api', cityRoutes);
// Servir les fichiers statiques
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Routes authetification
app.use('/api/auth', authRoutes);
app.get('/DashboardClient', requireClientAuth, (req, res) => {
    res.json({ message: 'Bienvenue dans votre espace client' });
});
app.get('/DashboardPrestataire', requirePrestataireAuth, (req, res) => {
    res.json({ message: 'Bienvenue dans votre espace prestataire' });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route non trouvée' });
});


// Lancement du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur en écoute sur le port ${PORT}`);
});