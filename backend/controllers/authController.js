const User = require('../models/User');
const City = require('../models/City'); // Si vous avez un modèle City
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


// code a
// exports.registerPrestataire = async (req, res) => {
//     try {
//         // Vérifier si une erreur Multer s'est produite
    
//         console.log('Body:', req.body); // Log du body
//         console.log('Files:', req.files); // Log des fichiers
//         // Extraction des données du formulaire
//         const { 
//             nom, prenom, email, password, confirmPassword,
//             telephone, ville, genre, dateNaissance, adresse,
//             description, experience, secteurActivite, tarification,
//             methodePaiement, acceptConditions,
//             nomCarte, numeroCarte, dateExpiration, cvc
//         } = req.body;

//         // Validation des champs obligatoires
//         if (!nom || !prenom || !email || !password || !confirmPassword || 
//             !telephone || !ville || !genre || !dateNaissance || !adresse || 
//             !secteurActivite || !experience || !acceptConditions) {
//             return res.status(400).json({ message: 'Tous les champs obligatoires doivent être remplis' });
//         }
        

//         if (password !== confirmPassword) {
//             return res.status(400).json({ message: 'Les mots de passe ne correspondent pas' });
//         }

//         // Vérification de l'existence de l'utilisateur
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: 'Un utilisateur avec cet email existe déjà' });
//         }

//         // Hachage du mot de passe
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         // Recherche de la ville
//         let cityId = null;
//         if (ville) {
//             const city = await City.findOne({ name: ville });
//             if (city) cityId = city._id;
//         }

//         const documents = {};
//         if (req.files) {
//             if (req.files.cin) documents.cin = req.files.cin[0].path;
//             if (req.files.rib) documents.rib = req.files.rib[0].path;
//             if (req.files.certifications) {
//                 documents.certifications = req.files.certifications.map(f => f.path);
//             }
//             if (req.files.carteAE) documents.carteAE = req.files.carteAE[0].path;
//             if (req.files.photoProfil) documents.photoProfil = req.files.photoProfil[0].path; // Correction ici
//             if (req.files.videoPresentation) documents.videoPresentation = req.files.videoPresentation[0].path; // Correction ici
//         }
        
       

//         // Validation des documents obligatoires
//         if (!documents.cin) {
//             return res.status(400).json({ message: 'Le document CIN est obligatoire' });
//         }

//         // Création de l'utilisateur
//         const newUser = new User({
//             email,
//             password: hashedPassword,
//             role: 'prestataire',
//             nom,
//             prenom,
//             telephone,
//             ville: cityId,
//             genre,
//             dateNaissance,
//             adresse,
//             prestataireInfo: {
//                 description,
//                 experience,
//                 secteurActivite,
//                 tarification,
//                 documents,
//                 methodePaiement: methodePaiement || null,
//                 detailsCarte: methodePaiement === 'carte' ? {
//                     nomCarte,
//                     numeroCarte,
//                     dateExpiration,
//                     cvc
//                 } : null,
//                 statutVerification: 'en_attente'
//             }
//         });

//         await newUser.save();

//         // Génération du token
//         const token = jwt.sign(
//             { userId: newUser._id, role: newUser.role },
//             process.env.JWT_SECRET,
//             { expiresIn: '1h' }
//         );

//         // Préparation de la réponse
//         const userResponse = newUser.toObject();
//         delete userResponse.password;

//         res.status(201).json({
//             message: 'Inscription prestataire réussie. Votre compte est en attente de validation.',
//             user: userResponse,
//             token
//         });

//     } catch (error) {
//         console.error('Erreur lors de l\'inscription prestataire:', error);
//         res.status(500).json({ 
//         message: 'Erreur lors de l\'inscription', 
//         error: error.message ,stack: error.stack
//         });
//     }
// };


// exports.registerPrestataire = async (req, res) => {
//     try {
//         // Vérifier si une erreur Multer s'est produite
//         if (req.fileValidationError) {
//             return res.status(400).json({ message: req.fileValidationError });
//         }

//         console.log('Body:', req.body);
//         console.log('Files:', req.files);

//         // Extraction des données du formulaire
//         const { 
//             nom, prenom, email, password, confirmPassword,
//             telephone, ville, genre, dateNaissance, adresse,
//             experience, secteurActivite, tarification,
//             methodePaiement, acceptConditions,
//             nomCarte, numeroCarte, dateExpiration, cvc
//         } = req.body;

//         // Validation des champs requis
//         const requiredFields = ['nom', 'prenom', 'email', 'password', 'confirmPassword', 
//                               'telephone', 'ville', 'genre', 'dateNaissance', 'adresse',
//                               'experience', 'secteurActivite'];
        
//         const missingFields = requiredFields.filter(field => !req.body[field]);
        
//         if (missingFields.length > 0) {
//             return res.status(400).json({ 
//                 message: 'Champs obligatoires manquants',
//                 missingFields 
//             });
//         }

//         if (password !== confirmPassword) {
//             return res.status(400).json({ message: 'Les mots de passe ne correspondent pas' });
//         }

//         // Vérification de l'existence de l'utilisateur
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: 'Un utilisateur avec cet email existe déjà' });
//         }

//         // Hachage du mot de passe
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         // Gestion des fichiers uploadés
//         const documents = {};
//         if (req.files) {
//             if (req.files.cin) documents.cin = `/uploads/${req.files.cin[0].filename}`;
//             if (req.files.rib) documents.rib = `/uploads/${req.files.rib[0].filename}`;
//             if (req.files.certifications) {
//                 documents.certifications = req.files.certifications.map(f => `/uploads/${f.filename}`);
//             }
//             if (req.files.carteAE) documents.carteAE = `/uploads/${req.files.carteAE[0].filename}`;
//             if (req.files.photoProfil) documents.photoProfil = `/uploads/${req.files.photoProfil[0].filename}`;
//             if (req.files.videoPresentation) documents.videoPresentation = `/uploads/${req.files.videoPresentation[0].filename}`;
//         }

//         // Création du nouvel utilisateur prestataire
//         const newUser = new User({
//             email,
//             password: hashedPassword,
//             role: 'prestataire',
//             nom,
//             prenom,
//             telephone,
//             ville,
//             genre,
//             prestataireInfo: {
//                 experience,
//                 secteurActivite,
//                 tarification,
//                 documents,
//                 methodePaiement: methodePaiement || null,
//                 detailsCarte: methodePaiement === 'carte' ? {
//                     nomCarte,
//                     numeroCarte,
//                     dateExpiration,
//                     cvc
//                 } : null,
//                 statutVerification: 'en_attente'
//             }
//         });

//         // Sauvegarde de l'utilisateur
//         const savedUser = await newUser.save();

//         // Génération du token JWT
//         const token = jwt.sign(
//             { userId: savedUser._id, role: savedUser.role },
//             process.env.JWT_SECRET,
//             { expiresIn: '1h' }
//         );

//         // Préparation de la réponse sans le mot de passe
//         const userResponse = savedUser.toObject();
//         delete userResponse.password;

//         return res.status(201).json({
//             message: 'Inscription prestataire réussie',
//             user: userResponse,
//             token
//         });

//     } catch (error) {
//         console.error('Erreur détaillée:', error);
//         return res.status(500).json({ 
//             message: 'Erreur serveur', 
//             error: error.message,
//             stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
//         });
//     }
// };


exports.registerPrestataire = async (req, res) => {
    try {
        // Vérifier si une erreur Multer s'est produite
        if (req.fileValidationError) {
            return res.status(400).json({ message: req.fileValidationError });
        }

        // Récupérer les données du formulaire
        const formData = req.body;
        
        // Si vous utilisez express.json(), les données multipart ne seront pas parsées
        // Donc nous devons soit :
        // 1. Utiliser express.urlencoded({ extended: true })
        // 2. Ou parser manuellement les champs texte

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



// exports.registerPrestataire = async (req, res) => {
//     try {
//         // Vérifier si une erreur Multer s'est produite
//         if (req.fileValidationError) {
//             return res.status(400).json({ message: req.fileValidationError });
//         }

//         console.log('Body:', req.body);
//         console.log('Files:', req.files);

//         const { 
//             nom, prenom, email, password, confirmPassword,
//             telephone, ville, genre, dateNaissance, adresse,
//             description, experience, secteurActivite, tarification,
//             methodePaiement, acceptConditions,
//             nomCarte, numeroCarte, dateExpiration, cvc
//         } = req.body;

//         // Validation améliorée
//         const requiredFields = {
//             nom, prenom, email, password, confirmPassword,
//             telephone, ville, genre, dateNaissance, adresse,
//             description, experience, secteurActivite, acceptConditions
//         };

//         const missingFields = Object.entries(requiredFields)
//             .filter(([_, value]) => !value)
//             .map(([key]) => key);

//         if (missingFields.length > 0) {
//             return res.status(400).json({ 
//                 message: 'Champs obligatoires manquants',
//                 missingFields 
//             });
//         }

//         if (password !== confirmPassword) {
//             return res.status(400).json({ message: 'Les mots de passe ne correspondent pas' });
//         }

//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: 'Un utilisateur avec cet email existe déjà' });
//         }

//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         let cityId = null;
//         if (ville) {
//             const city = await City.findOne({ name: ville });
//             if (city) cityId = city._id;
//         }

//         // Gestion des fichiers
//         const documents = {};
//         if (req.files) {
//             if (req.files.cin) documents.cin = `/uploads/${req.files.cin[0].filename}`;
//             if (req.files.rib) documents.rib = `/uploads/${req.files.rib[0].filename}`;
//             if (req.files.certifications) {
//                 documents.certifications = req.files.certifications.map(f => `/uploads/${f.filename}`);
//             }
//             if (req.files.carteAE) documents.carteAE = `/uploads/${req.files.carteAE[0].filename}`;
//             if (req.files.photoProfil) documents.photoProfil = `/uploads/${req.files.photoProfil[0].filename}`;
//             if (req.files.videoPresentation) documents.videoPresentation = `/uploads/${req.files.videoPresentation[0].filename}`;
//         }

//         // Création de l'utilisateur
//         const newUser = new User({
//             email,
//             password: hashedPassword,
//             role: 'prestataire',
//             nom,
//             prenom,
//             telephone,
//             ville: cityId,
//             genre,
//             prestataireInfo: {
//                 description,
//                 experience,
//                 secteurActivite,
//                 tarification,
//                 documents,
//                 methodePaiement: methodePaiement || null,
//                 detailsCarte: methodePaiement === 'carte' ? {
//                     nomCarte,
//                     numeroCarte,
//                     dateExpiration,
//                     cvc
//                 } : null,
//                 statutVerification: 'en_attente'
//             }
//         });

//         // Sauvegarde avec vérification d'erreur
//         const savedUser = await newUser.save();
//         console.log('Utilisateur créé:', savedUser._id);

//         const token = jwt.sign(
//             { userId: savedUser._id, role: savedUser.role },
//             process.env.JWT_SECRET,
//             { expiresIn: '1h' }
//         );

//         const userResponse = savedUser.toObject();
//         delete userResponse.password;

//         return res.status(201).json({
//             message: 'Inscription prestataire réussie',
//             user: userResponse,
//             token
//         });

//     } catch (error) {
//         console.error('Erreur détaillée:', error);
//         return res.status(500).json({ 
//             message: 'Erreur serveur', 
//             error: error.message,
//             stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
//         });
//     }
// };