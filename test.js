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
  origin: 'http://localhost:3000', 
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
// app.listen(PORT, () => {
//   console.log(`🚀 Serveur en écoute sur le port ${PORT}`);
// });
server.listen(PORT, () => {
  console.log(`🚀 Serveur en écoute sur le port ${PORT}`);
});



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
// Route pour récupérer les villes
router.get('/cities', authController.getCities);

module.exports = router;

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

            if (req.body.disponibilites) {
                updateData.$set['prestataireInfo.disponibilites'] = JSON.parse(req.body.disponibilites);
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
// Changer le mot de passe du prestataire
exports.changePrestatairePassword = async (req, res) => {
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

        // Vérifier que c'est bien un prestataire
        if (user.role !== 'prestataire') {
            return res.status(403).json({ message: 'Accès réservé aux prestataires' });
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


--frontend/src/parametreprestataire.js


db bit ndir backend dyl suppression dyl whed compte client  khas ydekhel l code dyl compte dylo ila kant khata2 atkhrej boite erreur  il kan code shih aydir supprimer mon compte o atkhrej boite succ 
bla matbdeliya design dyl frontend dyli matbedelia walo