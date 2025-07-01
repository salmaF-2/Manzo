--backend/models/User.js
const mongoose = require('mongoose');

const disponibiliteSchema = new mongoose.Schema({
  jour: String,               // Ex: "lundi"
  heures: [String]            // Ex: ["08:00-12:00"]
});

const prestataireInfoSchema = new mongoose.Schema({
  noteMoyenne: { type: Number, default: 0 },
  nombreAvis: { type: Number, default: 0 },
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
  disponibilites: [disponibiliteSchema],
  experience: {
    type: String,
    enum: ['0-1', '1-3', '3-5', '5+']
  },
  secteurActivite: String,
  tarification: String,
  documents: {
    cin: String,
    rib: String,
    certifications: [String],
    carteAE: String,
    photoProfil: String,
    videoPresentation: String
  },
  methodePaiement: {
    type: String,
    enum: ['carte', 'virement', 'paypal'],
    required: false // optionnel
  },
  detailsCarte: {
    nomCarte: String,
    numeroCarte: String,
    dateExpiration: String,
    cvc: String
  },
  statutVerification: {
    type: String,
    enum: ['en_attente', 'verifie', 'rejete'],
    default: 'en_attente'
  },
  localisation: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      index: '2dsphere'
    }
  }
});

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['client', 'prestataire', 'admin'], 
    required: true 
  },
  online: {
        type: Boolean,
        default: false
  },
  nom: String,
  prenom: String,
  telephone: String,
  photo: String,
  bannerImage: String,
  description: String,
  genre: {
    type: String,
    enum: ['homme', 'femme'], 
  },
  // ville: { type: mongoose.Schema.Types.ObjectId, ref: 'City' },
  ville: String,
  codePostal: String,
  rue: String,
  socialLinks: { // Nouveau champ pour les liens sociaux
    linkedin: String,
    instagram: String,
    facebook: String,
    tiktok: String
  },
  adresse: String,
  prestataireInfo: prestataireInfoSchema,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);



--backend/server.js
// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const stripeRoutes = require('./routes/stripeRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const serviceRoutes = require('./routes/serviceRoutes'); 
const categoryRoutes = require('./routes/categoryRoutes'); 

const authRoutes = require('./routes/authRoutes');
const { requireClientAuth,requirePrestataireAuth  } = require('./middleware/authMiddleware');
const app = express();

const contactRoutes = require('./routes/contactRoutes');
const messageRoutes = require('./routes/messageRoutes');

const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

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

// message
// Configuration Socket.io
// Stocker l'instance io dans l'app pour y accéder dans les contrôleurs
app.set('socketio', io);

io.on('connection', (socket) => {
    console.log('Un utilisateur s\'est connecté');

    // Rejoindre la room utilisateur
    socket.on('joinUser', (userId) => {
        socket.join(userId);
        console.log(`Utilisateur ${userId} a rejoint sa room`);
    });

    // Rejoindre une conversation
    socket.on('joinConversation', (conversationId) => {
        socket.join(conversationId);
        console.log(`Rejoint la conversation ${conversationId}`);
    });

    socket.on('disconnect', () => {
        console.log('Un utilisateur s\'est déconnecté');
    });
});

app.use('/api/messages', messageRoutes);



const cityRoutes = require('./routes/cityRoutes');
app.use('/api/stripe', stripeRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api', cityRoutes);

// This is the route that is being called by the frontend.
// The `reviewRoutes` module needs to have a route defined for `GET /`
// to handle the request to `http://localhost:5000/api/reviews`.
app.use('/api/reviews', reviewRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/categories', categoryRoutes);

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
// app.listen(PORT, () => {
//   console.log(`🚀 Serveur en écoute sur le port ${PORT}`);
// });
server.listen(PORT, () => {
  console.log(`🚀 Serveur en écoute sur le port ${PORT}`);
});

--backend/Middleware/authMiddleware.js
// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');


exports.requireAuth = (req, res, next) => {
  try {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
      
      if (!token) {
        return res.status(401).json({ error: 'Authorization token missing' });
      }

      // Ajoutez des logs pour débogage
      console.log('Received token:', token);
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded token:', decoded);
      
      req.user = decoded;
      next();
    } catch (error) {
      console.error('JWT verification error:', error.message);
      
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Token expired' });
      }
      
      res.status(401).json({ error: 'Invalid token' });
    }
  }

exports.requireClientAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Non autorisé' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== 'client') {
            return res.status(403).json({ message: 'Accès réservé aux clients' });
        }

        // req.user = decoded;
        req.user = {
            userId: decoded.userId,
            role: decoded.role
        };
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token invalide' });
    }
};

// ^restataire 
exports.requirePrestataireAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Non autorisé' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== 'prestataire') {
            return res.status(403).json({ message: 'Accès réservé aux prestataires' });
        }

        req.user = {
            userId: decoded.userId,
            role: decoded.role
        };
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token invalide' });
    }
};

exports.requireAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Non autorisé' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            userId: decoded.userId,
            role: decoded.role
        };
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token invalide' });
    }
};

// exports.checkOnlineStatus = async (req, res, next) => {
//     try {
//         const user = await User.findById(req.user.userId);
//         if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });
        
//         req.user.online = user.online;
//         next();
//     } catch (error) {
//         res.status(500).json({ message: 'Erreur serveur', error: error.message });
//     }
// };

exports.checkOnlineStatus = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.userId).select('online');
        req.user.online = user?.online || false;
        next();
    } catch (error) {
        console.error('Erreur online status:', error);
        next(); // Passe quand même à la suite même en cas d'erreur
    }
};



--backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { upload, profilePicUpload, bannerUpload } = require('../config/multer');
const { requireClientAuth } = require('../middleware/authMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const { requirePrestataireAuth } = require('../middleware/authMiddleware');

// Inscription client
router.post('/register/client', authController.registerClient);
// se connecter  
router.post('/login', authController.login);
// Inscription prestataire (avec gestion de fichiers)
router.post('/register/prestataire', 
    upload.fields([
        { name: 'cin', maxCount: 1 },
        { name: 'rib', maxCount: 1 },
        { name: 'certifications', maxCount: 5 },
        { name: 'carteAE', maxCount: 1 },
        { name: 'photoProfil', maxCount: 1 },
        { name: 'videoPresentation', maxCount: 1 }
    ]),
    authController.registerPrestataire
);




// Client ---------------------------------------------------------------
// Récupérer le profil client protégé par authentification
router.get('/client/profile', requireClientAuth, authController.getClientProfile);
// Mettre à jour le profil client protégé par authentification
router.put(
  '/client/profile',
  authMiddleware.requireClientAuth,
  profilePicUpload.single('photo'),
  authController.updateClientProfile
);
// Changer le mot de passe
router.put(
    '/client/change-password',
    authMiddleware.requireClientAuth,
    authController.changePassword
);
// Suppression de compte client
router.delete(
  '/client/delete-account',
  authMiddleware.requireClientAuth,
  authController.deleteClientAccount
);



// Récupérer le profil prestataire
router.get('/prestataire/profile', requirePrestataireAuth, authController.getPrestataireProfile);
// Mettre à jour la bannière
router.put(
    '/prestataire/banner',
    requirePrestataireAuth,
    bannerUpload.single('banner'), // Utilisez bannerUpload ici
    authController.updatePrestataireBanner
);
// Mettre à jour le profil prestataire
router.put(
    '/prestataire/profile',
    requirePrestataireAuth,
    upload.fields([
        { name: 'photoProfil', maxCount: 1 },
        { name: 'banner', maxCount: 1 }
    ]),
    authController.updatePrestataireProfile
);
// Changer le mot de passe prestataire
router.put(
    '/prestataire/change-password',
    authMiddleware.requirePrestataireAuth,
    authController.changePrestatairePassword
);
// Supprimer le compte prestataire
router.delete(
  '/prestataire/delete-account',
  authMiddleware.requirePrestataireAuth,
  authController.deletePrestataireAccount
);
// Route pour récupérer les villes
router.get('/cities', authController.getCities);
router.get('/user/:id', authController.getUserById);

module.exports = router;

--backend/controller/authController.js
const User = require('../models/User');
const City = require('../models/City'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Service = require('../models/Service');

// inscription client 
exports.registerClient = async (req, res) => {
    try {
        const { nom, prenom, email, 
            password, 
            confirmPassword, 
            telephone, 
            ville, 
            genre 
        } = req.body;

        // Validation des données
        if (!nom || !prenom || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: 'Tous les champs obligatoires doivent être remplis' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Les mots de passe ne correspondent pas' });
        }

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Un utilisateur avec cet email existe déjà' });
        }

        // Hacher le mot de passe
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Trouver la ville correspondante (si vous utilisez des villes prédéfinies)
        let cityId = null;
        if (ville) {
            const city = await City.findOne({ name: ville });
            if (city) {
                cityId = city._id;
            }
        }

        // Créer un nouvel utilisateur client
        const newUser = new User({
            email,
            password: hashedPassword,
            role: 'client',
            nom,
            prenom,
            telephone,
            // ville: cityId,
            ville: ville,
            genre,
            // photo: req.file?.path si vous gérez les fichiers
        });

        await newUser.save();

        // Créer un token JWT (optionnel)
        const token = jwt.sign(
            { userId: newUser._id, role: newUser.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Réponse sans le mot de passe
        const userResponse = newUser.toObject();
        delete userResponse.password;

        res.status(201).json({
            message: 'Inscription réussie',
            user: userResponse,
            token
        });

    } catch (error) {
        console.error('Erreur lors de l\'inscription:', error);
        res.status(500).json({ message: 'Erreur lors de l\'inscription', error: error.message });
    }
};
// Se connecter
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Vérification des champs requis
        if (!email || !password) {
            return res.status(400).json({ message: 'Email et mot de passe requis' });
        }

        // Vérification de l'utilisateur
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
        }

        // Vérification du mot de passe
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
        }

        // Création du token JWT
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Réponse sans le mot de passe
        const userResponse = user.toObject();
        delete userResponse.password;

        res.status(200).json({
            message: 'Connexion réussie',
            token,
            user: userResponse
        });

    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        res.status(500).json({ message: 'Erreur lors de la connexion', error: error.message });
    }
};
// inscription prestataire 
exports.registerPrestataire = async (req, res) => {
    try {
        // Vérifier si une erreur Multer s'est produite
        if (req.fileValidationError) {
            return res.status(400).json({ message: req.fileValidationError });
        }

        // Récupérer les données du formulaire
        const formData = req.body;

        // Solution alternative pour les champs texte
        const {
            nom, prenom, email, password, confirmPassword,
            telephone, ville, genre, dateNaissance, adresse,
            experience, secteurActivite, tarification,
            methodePaiement, acceptConditions,
            nomCarte, numeroCarte, dateExpiration, cvc
        } = req.body;

        // Validation des champs requis
        const requiredFields = ['nom', 'prenom', 'email', 'password', 'confirmPassword', 
                              'telephone', 'ville', 'genre', 'dateNaissance', 'adresse',
                              'experience', 'secteurActivite'];
        
        const missingFields = requiredFields.filter(field => !req.body[field]);
        
        if (missingFields.length > 0) {
            return res.status(400).json({ 
                message: 'Champs obligatoires manquants',
                missingFields 
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Les mots de passe ne correspondent pas' });
        }

        // Vérification de l'existence de l'utilisateur
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Un utilisateur avec cet email existe déjà' });
        }

        // Hachage du mot de passe
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Gestion des fichiers uploadés
        const documents = {};
        if (req.files) {
            if (req.files.cin) documents.cin = `/uploads/${req.files.cin[0].filename}`;
            if (req.files.rib) documents.rib = `/uploads/${req.files.rib[0].filename}`;
            if (req.files.certifications) {
                documents.certifications = req.files.certifications.map(f => `/uploads/${f.filename}`);
            }
            if (req.files.carteAE) documents.carteAE = `/uploads/${req.files.carteAE[0].filename}`;
            if (req.files.photoProfil) documents.photoProfil = `/uploads/${req.files.photoProfil[0].filename}`;
            if (req.files.videoPresentation) documents.videoPresentation = `/uploads/${req.files.videoPresentation[0].filename}`;
        }

        // Création du nouvel utilisateur prestataire
        const newUser = new User({
            email,
            password: hashedPassword,
            role: 'prestataire',
            nom,
            prenom,
            telephone,
            ville,
            genre,
            prestataireInfo: {
                experience,
                secteurActivite,
                tarification,
                documents,
                methodePaiement: methodePaiement || null,
                detailsCarte: methodePaiement === 'carte' ? {
                    nomCarte,
                    numeroCarte,
                    dateExpiration,
                    cvc
                } : null,
                statutVerification: 'en_attente'
            }
        });

        await newUser.save();

        // Génération du token JWT
        const token = jwt.sign(
            { userId: newUser._id, role: newUser.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Réponse sans le mot de passe
        const userResponse = newUser.toObject();
        delete userResponse.password;

        return res.status(201).json({
            message: 'Inscription prestataire réussie',
            user: userResponse,
            token
        });

    } catch (error) {
        console.error('Erreur détaillée:', error);
        return res.status(500).json({ 
            message: 'Erreur serveur', 
            error: error.message
        });
    }
};



// 1 : client 
// partie Client son profil 
// Récupérer les informations du client connecté
exports.getClientProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password -prestataireInfo -createdAt -__v');
        
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Erreur lors de la récupération du profil:', error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};
// mettre à jour le profil Client 
exports.updateClientProfile = async (req, res) => {
    try {
        const { nom, prenom, telephone, ville, genre, rue, codePostal } = req.body;
        
        // Les champs autorisés à être mis à jour
        const updateData = {
            nom,
            prenom,
            telephone,
            ville,
            genre,
            rue,
            codePostal
        };

        if (req.file) {
            updateData.photo = `/uploads/${req.file.filename}`;
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.user.userId,
            updateData,
            { new: true, select: '-password -prestataireInfo -createdAt -__v' }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        res.status(200).json({
            message: 'Profil mis à jour avec succès',
            user: updatedUser
        });
    } catch (error) {
        console.error('Erreur lors de la mise à jour du profil:', error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};
// Changer le mot de passe du client
exports.changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword, confirmPassword } = req.body;
        const userId = req.user.userId;

        // Validation des champs
        if (!currentPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({ message: 'Tous les champs sont obligatoires' });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: 'Les nouveaux mots de passe ne correspondent pas' });
        }

        // Récupérer l'utilisateur
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        // Vérifier l'ancien mot de passe
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Mot de passe actuel incorrect' });
        }

        // Hacher le nouveau mot de passe
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Mettre à jour le mot de passe
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Mot de passe mis à jour avec succès' });

    } catch (error) {
        console.error('Erreur lors du changement de mot de passe:', error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};
// Supprimer le compte client
exports.deleteClientAccount = async (req, res) => {
  try {
    const { password } = req.body;
    const userId = req.user.userId;

    // Validation des champs
    if (!password) {
      return res.status(400).json({ 
        message: 'Le mot de passe est requis pour confirmer la suppression' 
      });
    }

    // Récupérer l'utilisateur
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Vérifier que c'est bien un client
    if (user.role !== 'client') {
      return res.status(403).json({ 
        message: 'Cette action est réservée aux comptes clients' 
      });
    }

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ 
        message: 'Mot de passe incorrect' 
      });
    }

    // Supprimer l'utilisateur
    await User.findByIdAndDelete(userId);

    res.status(200).json({ 
      message: 'Compte supprimé avec succès',
      success: true
    });

  } catch (error) {
    console.error('Erreur lors de la suppression du compte:', error);
    res.status(500).json({ 
      message: 'Erreur serveur', 
      error: error.message 
    });
  }
};

--frontend/src/parametreclient.js
import React, { useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import { motion } from "framer-motion";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import SideBarClient from "./SideBarClient";
import { useNavigate } from "react-router-dom";

const SettingSection = ({ title, children }) => (
  <motion.div
    className="bg-white rounded-2xl shadow-sm p-4 space-y-4 border border-gray-100"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <h2 className="text-lg font-semibold text-gray-800 flex items-center">
      <span className="w-1.5 h-5 bg-blue-500 rounded-full mr-2"></span>
      {title}
    </h2>
    <div className="space-y-2">{children}</div>
  </motion.div>
);

const SettingRow = ({ label, description, toggle, checked, onChange, onClick }) => (
  <div 
    className="flex items-center justify-between py-2 px-1 hover:bg-gray-50 rounded-md transition-colors cursor-pointer"
    onClick={!toggle ? onClick : undefined}
  >
    <div>
      <p className="text-sm font-medium text-gray-800">{label}</p>
      {description && <p className="text-xs text-gray-500">{description}</p>}
    </div>
    {toggle ? (
      <Switch
        checked={checked}
        onChange={onChange}
        className={`${
          checked ? "bg-blue-500" : "bg-gray-300"
        } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300`}
      >
        <span className="sr-only">{label}</span>
        <span
          className={`${
            checked ? "translate-x-6" : "translate-x-1"
          } inline-block w-4 h-4 transform bg-white rounded-full transition-transform shadow-sm`}
        />
      </Switch>
    ) : (
      <button 
        onClick={onClick}
        className="text-blue-500 hover:text-blue-600 text-xs font-medium transition-colors"
      >
        Modifier
      </button>
    )}
  </div>
);

const PasswordDialog = ({ isOpen, onClose }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      alert("Les nouveaux mots de passe ne correspondent pas");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/auth/client/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          confirmPassword
        })
      });

      const data = await response.json();

      if (response.ok) {
        setShowSuccess(true); // Afficher la boîte de succès
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        alert(data.message || 'Erreur lors du changement de mot de passe');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Une erreur est survenue');
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    onClose(); // Fermer aussi le dialogue principal
  };
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Changer le mot de passe
                  </Dialog.Title>

                  <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Mot de passe actuel
                      </label>
                      <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Nouveau mot de passe
                      </label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Confirmer le mot de passe
                      </label>
                      <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                        required
                      />
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        Annuler
                      </button>
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        Mettre à jour
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Transition appear show={showSuccess} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={handleSuccessClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex flex-col items-center text-center">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                      <svg
                        className="h-6 w-6 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <Dialog.Title
                      as="h3"
                      className="mt-3 text-lg font-medium leading-6 text-gray-900"
                    >
                      Succès!
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Votre mot de passe a été changé avec succès.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-center">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                      onClick={handleSuccessClose}
                    >
                      OK
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

const ParametreC = () => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [password, setPassword] = useState("");
  const [showSuccessDelete, setShowSuccessDelete] = useState(false);
  const [showErrorDelete, setShowErrorDelete] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();
  
  const handleDeleteAccount = async () => {
  if (!isChecked) {
    setErrorMessage("Veuillez confirmer que vous comprenez que cette action est irréversible");
    setShowErrorDelete(true);
    return;
  }

  if (!password) {
    setErrorMessage("Veuillez entrer votre mot de passe");
    setShowErrorDelete(true);
    return;
  }

  try {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:5000/api/auth/client/delete-account', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ password })
    });

    const data = await response.json();

    if (response.ok) {
      setShowSuccessDelete(true);
      // Déconnexion et redirection avec rechargement complet
      setTimeout(() => {
        localStorage.clear(); // Vide tout le localStorage
        window.location.href = '/'; // Force un rechargement complet
      }, 2000);
    } else {
      setErrorMessage(data.message || 'Erreur lors de la suppression du compte');
      setShowErrorDelete(true);
    }
  } catch (error) {
    console.error('Erreur:', error);
    setErrorMessage('Une erreur est survenue');
    setShowErrorDelete(true);
  }
};
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);

  return (
    <div className={`flex bg-gradient-to-br from-[#BCD0EA50] to-indigo-50 to-gray-50 min-h-[calc(100vh-5rem)] mt-20 ${isPasswordDialogOpen ? 'overflow-hidden' : ''}`}>
      <div className={`${isPasswordDialogOpen ? 'opacity-50' : ''}`}>
        <SideBarClient />
      </div>

      <div className={`flex-1 p-6 space-y-6 ml-60 mt-4 ${isPasswordDialogOpen ? 'opacity-50 pointer-events-none' : ''}`}>
        <motion.h1 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.5 }} 
          className="text-3xl font-bold mb-8 text-gray-800"
        >
          ⚙️ Paramètres
          <p className="text-sm text-gray-500">Gérez vos paramètres de compte et préférences</p>
        </motion.h1>

        <SettingSection title="Paramètres du compte">
          <div className="flex items-center justify-between py-2 px-1 hover:bg-gray-50 rounded-md transition-colors">
            <div>
              <p className="text-sm font-medium text-gray-800">Langue</p>
              <p className="text-xs text-gray-500">Sélectionnez votre langue préférée</p>
            </div>
            <select 
              className="text-xs border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
              defaultValue="fr"
            >
              <option value="fr">Français</option>
              <option value="en">English</option>
              <option value="ar">العربية</option>
            </select>
          </div>

          <div className="flex items-center justify-between py-2 px-1 hover:bg-gray-50 rounded-md transition-colors">
            <div>
              <p className="text-sm font-medium text-gray-800">Fuseau horaire</p>
              <p className="text-xs text-gray-500">Définir votre fuseau horaire</p>
            </div>
            <select 
              className="text-xs border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
              defaultValue="Africa/Casablanca"
            >
              <option value="Africa/Casablanca">Maroc (UTC+1)</option>
            </select>
          </div>
        </SettingSection>

        <SettingSection title="Notifications">
          <SettingRow
            label="Activer & Désactiver la notifications"
            description="Recevoir des notifications"
            toggle
            checked={emailNotifs}
            onChange={setEmailNotifs}
          />
        </SettingSection>

        <SettingSection title="Sécurité">
          <SettingRow 
            label="Changer le mot de passe" 
            description="Modifier votre mot de passe actuel" 
            toggle={false}
            onClick={() => setIsPasswordDialogOpen(true)}
          />

          <PasswordDialog 
            isOpen={isPasswordDialogOpen} 
            onClose={() => setIsPasswordDialogOpen(false)}
          />
        </SettingSection>

        <SettingSection title="Supprimer le compte">
          <p className="text-sm text-gray-600">Cette action est irréversible. Toutes vos données seront définitivement supprimées.</p>
          <label className="flex items-center gap-2 text-sm mt-2">
            <input 
              type="checkbox" 
              className="h-4 w-4 text-red-500 border-gray-300 rounded focus:ring-red-500" 
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            Je comprends que cette action est irréversible
          </label>
          <input
            type="password"
            placeholder="Entrez votre mot de passe pour confirmer"
            className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-300 focus:border-transparent"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button 
            className="mt-3 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition-colors shadow-sm"
            onClick={handleDeleteAccount}
          >
            Supprimer mon compte
          </button>
        </SettingSection>
      </div>
        {/* Dialogue de succès pour la suppression */}
        <Transition appear show={showSuccessDelete} as={Fragment}>
          <Dialog as="div" className="relative z-50" onClose={() => setShowSuccessDelete(false)}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-50" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <div className="flex flex-col items-center text-center">
                      <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                        <svg
                          className="h-6 w-6 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <Dialog.Title
                        as="h3"
                        className="mt-3 text-lg font-medium leading-6 text-gray-900"
                      >
                        Compte supprimé avec succès
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Vous serez redirigé vers la page d'accueil.
                        </p>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>

        {/* Dialogue d'erreur pour la suppression */}
        <Transition appear show={showErrorDelete} as={Fragment}>
          <Dialog as="div" className="relative z-50" onClose={() => setShowErrorDelete(false)}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-50" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <div className="flex flex-col items-center text-center">
                      <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                        <svg
                          className="h-6 w-6 text-red-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                      <Dialog.Title
                        as="h3"
                        className="mt-3 text-lg font-medium leading-6 text-gray-900"
                      >
                        Erreur
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          {errorMessage}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-center">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                        onClick={() => setShowErrorDelete(false)}
                      >
                        OK
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
    </div>
  );
};

export default ParametreC;

