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


