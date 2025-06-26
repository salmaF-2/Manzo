--backend/controller/authController.js
const User = require('../models/User');
const City = require('../models/City'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


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
            ville: cityId,
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






// 2 : Prestataire 
// Récupérer les informations du prestataire connecté
exports.getPrestataireProfile = async (req, res) => {
    try {
        // Populate les données nécessaires si vous utilisez des références
        const user = await User.findById(req.user.userId)
            .select('-password -createdAt -__v -prestataireInfo.detailsCarte');
        
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        if (user.role !== 'prestataire') {
            return res.status(403).json({ message: 'Accès réservé aux prestataires' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Erreur lors de la récupération du profil:', error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};
// Mettre à jour la bannière du prestataire
exports.updatePrestataireBanner = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Aucune image téléchargée' });
        }

        const bannerPath = `/uploads/${req.file.filename}`;
        
        const updatedUser = await User.findByIdAndUpdate(
            req.user.userId,
            { bannerImage: bannerPath },
            { new: true, select: '-password -prestataireInfo.detailsCarte -createdAt -__v' }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }

        res.status(200).json({
            message: 'Bannière mise à jour avec succès',
            bannerImage: updatedUser.bannerImage
        });
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la bannière:', error);
        res.status(500).json({ 
            message: 'Erreur serveur', 
            error: error.message 
        });
    }
};

// Mettre à jour le profil prestataire
exports.updatePrestataireProfile = async (req, res) => {
    try {
        const updateData = {};

        // Gestion des fichiers uploadés
        if (req.files) {
            if (req.files.photoProfil) {
                updateData.$set = updateData.$set || {};
                updateData.$set['prestataireInfo.documents.photoProfil'] = `/uploads/${req.files.photoProfil[0].filename}`;
            }
            if (req.files.banner) {
                updateData.$set = updateData.$set || {};
                updateData.$set.bannerImage = `/uploads/${req.files.banner[0].filename}`;
            }
        }

        // Gestion des champs texte
        if (req.body) {
            updateData.$set = updateData.$set || {};
            
            // Champs de base
            const textFields = ['nom', 'prenom', 'telephone', 'ville', 'description', 'adresse', 'email'];
            textFields.forEach(field => {
                if (req.body[field] !== undefined) {
                    updateData.$set[field] = req.body[field];
                }
            });

            // Champs prestataireInfo
            const prestataireFields = ['experience', 'secteurActivite', 'localisation', 'titreProfessionnel'];
            prestataireFields.forEach(field => {
                if (req.body[field] !== undefined || req.body[`prestataireInfo[${field}]`] !== undefined) {
                    updateData.$set[`prestataireInfo.${field}`] = req.body[field] || req.body[`prestataireInfo[${field}]`];
                }
            });

            // Liens sociaux - IMPORTANT
            if (req.body.socialLinks) {
                updateData.$set.socialLinks = {
                    linkedin: req.body.socialLinks.linkedin || req.body['socialLinks[linkedin]'] || '',
                    instagram: req.body.socialLinks.instagram || req.body['socialLinks[instagram]'] || '',
                    facebook: req.body.socialLinks.facebook || req.body['socialLinks[facebook]'] || '',
                    tiktok: req.body.socialLinks.tiktok || req.body['socialLinks[tiktok]'] || ''
                };
            } else {
                // Gestion alternative pour FormData
                updateData.$set.socialLinks = {
                    linkedin: req.body['socialLinks[linkedin]'] || '',
                    instagram: req.body['socialLinks[instagram]'] || '',
                    facebook: req.body['socialLinks[facebook]'] || '',
                    tiktok: req.body['socialLinks[tiktok]'] || ''
                };
            }
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.user.userId,
            updateData,
            { new: true, select: '-password -prestataireInfo.detailsCarte -createdAt -__v' }
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
        res.status(500).json({ 
            message: 'Erreur serveur', 
            error: error.message 
        });
    }
};


// Récupérer toutes les villes
exports.getCities = async (req, res) => {
    try {
        const cities = await City.find().select('name');
        res.status(200).json(cities);
    } catch (error) {
        console.error('Erreur:', error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

--backend/middleware/authmiddleware.js
// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

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
// Route pour récupérer les villes
router.get('/cities', authController.getCities);

module.exports = router;

--frontend/src/prestataire/sidebar.js
import { FaHome, FaTools, FaCalendarAlt, FaHistory, FaComments, FaMoneyBill, FaCog, FaSignOutAlt, FaUserAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const SideBar = () => {
    const location = useLocation();
    const [userData, setUserData] = useState({
        nom: '',
        prenom: '',
        prestataireInfo: {
            documents: {
                photoProfil: null
            }
        }
    });
    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/auth/prestataire/profile', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUserData(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
        }
    };
    return (
        <div className="fixed left-0 top-20 h-[calc(100vh-5rem)] w-60 bg-white border-r border-gray-200 flex flex-col p-6">


            {/* Profile section with subtle shadow */}
            <div className="flex items-center space-x-3 mb-8 p-3 bg-white rounded-lg shadow-sm">
                <div className="relative flex-shrink-0">
                    <img 
                        src={userData.prestataireInfo?.documents?.photoProfil 
                            ? `http://localhost:5000${userData.prestataireInfo.documents.photoProfil}`
                            : "https://i.pravatar.cc/80"} 
                        alt="Avatar" 
                        className="w-12 h-12 rounded-full border-2 border-blue-200 object-cover" 
                    />
                </div>
                <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-gray-800 truncate">
                        {userData.prenom} {userData.nom}
                    </h4>
                    <span className="inline-block mt-1 text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">
                        ✔ Vérifié
                    </span>
                </div>
            </div>

            {/* Navigation links with modern design */}
            <nav className="flex-1 overflow-y-auto">
                <ul className="space-y-1 text-sm">

                    <NavLink to='/ProfilPrestataire'
                        className={({isActive}) => 
                            `flex items-center space-x-2 hover:bg-blue-100/50 cursor-pointer p-2.5 rounded-lg transition-all ${
                                isActive || location.pathname === '/modifierProfil' 
                                ? 'bg-blue-100 text-blue-600 font-medium border-l-4 border-blue-500' 
                                : 'text-gray-600 hover:text-blue-600'
                            }`}
                        >
                        <li className="flex items-center space-x-2">
                            <FaUserAlt className="text-blue-500" />
                            <span>Profil</span>
                        </li>
                    </NavLink>

                    <NavLink to='/DashboardPrestataire' 
                        className={({isActive}) => 
                            `flex items-center space-x-2 hover:bg-blue-100/50 cursor-pointer p-2.5 rounded-lg transition-all ${
                                isActive 
                                ? 'bg-blue-100 text-blue-600 font-medium border-l-4 border-blue-500' 
                                : 'text-gray-600 hover:text-blue-600'
                            }`}>
                        <li className="flex items-center space-x-2">
                            <MdDashboard className="text-blue-500" />
                            <span>Tableau de bord</span>
                        </li>
                    </NavLink>

                    <NavLink to='/Services-Prestataire'
                        className={({ isActive }) => 
                            `flex items-center space-x-2 hover:bg-blue-100/50 cursor-pointer p-2.5 rounded-lg transition-all ${
                            isActive || 
                            location.pathname === '/Ajouter_service' || 
                            location.pathname === '/Modifier_service'
                                ? 'bg-blue-100 text-blue-600 font-medium border-l-4 border-blue-500' 
                                : 'text-gray-600 hover:text-blue-600'
                            }`}
                        >
                        <FaTools className="text-blue-500" />
                        <span>Services</span>
                    </NavLink>

                    <NavLink to='/Demandes-Prestataire' 
                        className={({isActive}) => 
                            `flex items-center space-x-2 hover:bg-blue-100/50 cursor-pointer p-2.5 rounded-lg transition-all ${
                                isActive 
                                ? 'bg-blue-100 text-blue-600 font-medium border-l-4 border-blue-500' 
                                : 'text-gray-600 hover:text-blue-600'
                            }`}>
                        <li className="flex items-center space-x-2">
                            <FaHome className="text-blue-500" />
                            <span>Demandes</span>
                        </li>
                    </NavLink>

                    <NavLink to='/Rendez-vous-Prestataire' 
                        className={({isActive}) => 
                            `flex items-center space-x-2 hover:bg-blue-100/50 cursor-pointer p-2.5 rounded-lg transition-all ${
                                isActive 
                                ? 'bg-blue-100 text-blue-600 font-medium border-l-4 border-blue-500' 
                                : 'text-gray-600 hover:text-blue-600'
                            }`}>
                        <li className="flex items-center space-x-2">
                            <FaCalendarAlt className="text-blue-500" />
                            <span>Rendez-vous</span>
                        </li>
                    </NavLink>

                    <NavLink to='/Historique-Prestataire' 
                        className={({isActive}) => 
                            `flex items-center space-x-2 hover:bg-blue-100/50 cursor-pointer p-2.5 rounded-lg transition-all ${
                                isActive 
                                ? 'bg-blue-100 text-blue-600 font-medium border-l-4 border-blue-500' 
                                : 'text-gray-600 hover:text-blue-600'
                            }`}>
                        <li className="flex items-center space-x-2">
                            <FaHistory className="text-blue-500" />
                            <span>Historique</span>
                        </li>
                    </NavLink>

                    <NavLink to='/Messages-Prestataire' 
                        className={({isActive}) => 
                            `flex items-center space-x-2 hover:bg-blue-100/50 cursor-pointer p-2.5 rounded-lg transition-all ${
                                isActive 
                                ? 'bg-blue-100 text-blue-600 font-medium border-l-4 border-blue-500' 
                                : 'text-gray-600 hover:text-blue-600'
                            }`}>
                        <li className="flex items-center space-x-2">
                            <FaComments className="text-blue-500" />
                            <span>Messages</span>
                        </li>
                    </NavLink>

                    <NavLink to='/Paiemant-Prestataire' 
                        className={({isActive}) => 
                            `flex items-center space-x-2 hover:bg-blue-100/50 cursor-pointer p-2.5 rounded-lg transition-all ${
                                isActive 
                                ? 'bg-blue-100 text-blue-600 font-medium border-l-4 border-blue-500' 
                                : 'text-gray-600 hover:text-blue-600'
                            }`}>
                        <li className="flex items-center space-x-2">
                            <FaMoneyBill className="text-blue-500" />
                            <span>Paiements</span>
                        </li>
                    </NavLink>

                    <NavLink to='/Parametre-Prestataire' 
                        className={({isActive}) => 
                            `flex items-center space-x-2 hover:bg-blue-100/50 cursor-pointer p-2.5 rounded-lg transition-all ${
                                isActive 
                                ? 'bg-blue-100 text-blue-600 font-medium border-l-4 border-blue-500' 
                                : 'text-gray-600 hover:text-blue-600'
                            }`}>
                        <li className="flex items-center space-x-2">
                            <FaCog className="text-blue-500" />
                            <span>Paramètres</span>
                        </li>
                    </NavLink>
                </ul>
            </nav>

            {/* Logout button with modern style */}
            <div className="mt-auto pt-4">
                <button className="flex items-center space-x-2 text-red-500 hover:text-red-600 text-sm p-2.5 rounded-lg hover:bg-red-50/80 w-full transition-all border border-red-100 hover:border-red-200">
                    <FaSignOutAlt />
                    <span>Déconnexion</span>
                </button>
            </div>
        </div>
    )
}

export default SideBar;

--frontend/src/context/AuthContext.js
// frontend/context/AuthContext.js
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();



export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        // Optionnel: Récupérer l'utilisateur depuis localStorage au chargement
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const login = (userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

--frontend/src/router.js
// Configuration des routes
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";
import HeaderRole from "./components/HeaderRole";

// salma fadili
import ServiceFixe from "./pages/ServiceFixe";
import ServiceDevis from "./pages/ServiceDevis";
import ResultatsRecherche from "./pages/ResultatsRecherche";
// salma 
import Accueil from "./pages/Accueil";
import Contact from "./pages/Contact.js";
import DevenirPres from "./auth/DevenirPres.js"

import CreerCompte from "./auth/creerCompte";
import Connexion from "./auth/connexion";
import InscriptionClient from "./auth/inscriptionClient";
import Dashboard from "./pages/Page_Prestataire/Dashboard";
import ProfilP from "./pages/Page_Prestataire/Profil";
import ModifierProfil from "./pages/Page_Prestataire/ModifierProfil";
import ServicesP from "./pages/Page_Prestataire/PageServices";
import AjouterService from "./pages/Page_Prestataire/Ajouter_service";
import ModifierService from "./pages/Page_Prestataire/Modifier_service";
import DemandesS from "./pages/Page_Prestataire/DemandesS";
import ParametreP from "./pages/Page_Prestataire/ParametreP";
import MessagesP from "./pages/Page_Prestataire/MessagesP";
import PaiementP from "./pages/Page_Prestataire/Paiements";
import RendezVousP from "./pages/Page_Prestataire/Rendez-vousP";
import HistoriqueP from "./pages/Page_Prestataire/HistoriqueP";
import PrestatairesList from "./pages/PrestatairesList";
import VilleDetail from "./components/VilleDetail";
// youness
import AboutPage from "./pages/savoirplus";
import CentreAide from "./pages/centreAide";
import PFAQProfessional from "./pages/ProFAQCategories";
import CFAQProfessional from "./pages/ClientFAQCategories";
import FAQcompte from "./pages/FAQ/FAQcompte";
import FAQgeneral from "./pages/FAQ/FAQgeneral";
import FAQpaiement from "./pages/FAQ/FAQpaiement";
import FAQdemandeService from "./pages/FAQ/FAQservice";
import FAQevaluation from "./pages/FAQ/FAQevaluation";
import FAQabsenceAnnulation from "./pages/FAQ/FAQcancel";
import FAQannexes from "./pages/FAQ/FAQannex";
import FAQadhesion from "./pages/FAQ/FAQadhesion";
import FAQpostAdhesion from "./pages/FAQ/FAQpostAdhesion";
import FAQpaiementP from "./pages/FAQ/FAQpaiementP";
import FAQnotation from "./pages/FAQ/FAQnotation";
import FAQevaluationP from "./pages/FAQ/FAQevaluationP";

import ProfileP from "./pages/lockedprofileP";
import Mainprofile from "./pages/profile";
import DashboardClient from "./pages/page_Clients/DashboardClient.js";
import MotDePasseOublie from "./auth/MotdePasseOublier.js";
import ProtectedRoute from "./components/ProtectedRoute.js";
import ProfilClient from "./pages/page_Clients/ProfilClient.js";

const AppWrapper = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <App />
            </AuthProvider>
        </BrowserRouter>
    );
};

const App = () => {
  const location = useLocation();

  const shouldShowHeaderFooter = () => {
    const path = location.pathname.toLowerCase();
     // const shouldShowHeaderFooter =
    //   location.pathname.toLowerCase() !== "/faq" &&
    //   location.pathname.toLowerCase() !== "/faq-professional";
    
    // Liste des routes où on ne veut pas afficher Header/Footer
    const excludedRoutes = [
      // Pages FAQ
      "/faq",
      "/faq-professional",
      
      // Routes prestataires
      "/dashboardprestataire",
      "/profilprestataire",
      "/modifierprofil",
      "/services-prestataire",
      "/ajouter_service",
      "/modifier_service",
      "/demandes-prestataire",
      "/rendez-vous-prestataire",
      "/historique-prestataire",
      "/messages-prestataire",
      "/paiemant-prestataire",
      "/parametre-prestataire",
      
      // Routes clients
      "/dashboardclient",
      "/profilclient"
    ];
    
    return !excludedRoutes.some(route => path.startsWith(route));
  };

  return (
    <>
      {shouldShowHeaderFooter() && <Header />}
      <HeaderRole />

      <Routes>
        {/* accueil */}
        <Route path="/" element={<Accueil />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/DevenirPres" element={<DevenirPres />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/serviceFixe" element={<ServiceFixe />} />
        <Route path="/serviceDevis" element={<ServiceDevis />} />
        <Route path="/recherche" element={<ResultatsRecherche />} />
        
        {/* Prestataires */}
        <Route path="/prestataires" element={<PrestatairesList />} />
        <Route path="/ville/:ville" element={<VilleDetail />} />

        {/* Auth */}
        <Route path="/CreerCompte" element={<CreerCompte />} />
        <Route path="/InscriptionClient" element={<InscriptionClient />} />
        <Route path="/Seconnecter" element={<Connexion />} />
        <Route path="/MotDePasseOublie" element={<MotDePasseOublie />} />

        {/* Partie Prestataire */}
        <Route element={<ProtectedRoute allowedRoles={['prestataire']} />}>
            <Route path="/DashboardPrestataire" element={<Dashboard />} />
            <Route path="/ProfilPrestataire" element={<ProfilP />} />
            <Route path="/modifierProfil" element={<ModifierProfil />} />
            <Route path="/Services-Prestataire" element={<ServicesP />} />
            <Route path="/Ajouter_service" element={<AjouterService />} />
            <Route path="/Modifier_service" element={<ModifierService />} />
            <Route path="/Demandes-Prestataire" element={<DemandesS />} />
            <Route path="/Rendez-vous-Prestataire" element={<RendezVousP />} />
            <Route path="/Historique-Prestataire" element={<HistoriqueP />} />
            <Route path="/Messages-Prestataire" element={<MessagesP />} />
            <Route path="/Paiemant-Prestataire" element={<PaiementP />} />
            <Route path="/Parametre-Prestataire" element={<ParametreP />} />
        </Route>
        
        {/* Partie Client */}
        <Route element={<ProtectedRoute allowedRoles={['client']} />}>
          <Route path="/DashboardClient" element={<DashboardClient />} />
          <Route path="/ProfilClient" element={<ProfilClient />} />
        </Route>

        {/* FAQ Pages - Clients */}
        <Route path="/faq" element={<CentreAide />} />
        <Route path="/faq-client" element={<CFAQProfessional />} />
        <Route path="/faq-client/compte" element={<FAQcompte />} />
        <Route path="/faq-client/general" element={<FAQgeneral />} />
        <Route path="/faq-client/paiement" element={<FAQpaiement />} />
        <Route path="/faq-client/service" element={<FAQdemandeService />} />
        <Route path="/faq-client/evaluation" element={<FAQevaluation />} />
        <Route path="/faq-client/absences" element={<FAQabsenceAnnulation />} />
        <Route path="/faq-client/annexes" element={<FAQannexes />} />

        {/* FAQ Pages - Professionnels */}
        <Route path="/faq-professional" element={<PFAQProfessional />} />
        <Route path="/faq-professional/adhesion" element={<FAQadhesion />} />
        <Route path="/faq-professional/post-adhesion" element={<FAQpostAdhesion />} />
        <Route path="/faq-professional/paiement" element={<FAQpaiementP />} />
        <Route path="/faq-professional/notation" element={<FAQnotation />} />
        <Route path="/faq-professional/evaluation" element={<FAQevaluationP />} />

        {/* les Profiles pages */}
        <Route path="/profile-locked" element={<ProfileP />} />
        <Route path="/profile" element={<Mainprofile />} />
      </Routes>

      {shouldShowHeaderFooter() && <Footer />}
    </>
  );
};

export default AppWrapper;
--frontend/src/app.js
import AppRoutes from './routes';
import { Toaster } from 'sonner';
import React from 'react';
// import './App.css';

function App() {
  return (
    <div>
      <AppRoutes/>
      <Toaster position="top-center" richColors closeButton />
    </div>
  );
}

export default App;
