const Contact = require('../models/Contact');
const User = require('../models/User');
const nodemailer = require('nodemailer');


exports.sendContactMessage = async (req, res) => {
    try {
        let userInfo = {
            userId: null,
            role: 'guest'
        };

        if (req.headers.authorization) {
            try {
                const token = req.headers.authorization.split(' ')[1];
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                userInfo = {
                    userId: decoded.userId,
                    role: decoded.role
                };
            } catch (error) {
                console.log('Token invalide ou expiré, traitement en tant que visiteur');
            }
        }

        const {
            fullName,
            email,
            phone,
            address,
            city,
            postalCode,
            service,
            message,
            privacyConsent
        } = req.body;

        if (!fullName || !email || !phone || !message || !privacyConsent) {
            return res.status(400).json({ 
                success: false,
                message: 'Tous les champs obligatoires doivent être remplis',
                errors: {
                    ...(!fullName && { fullName: 'Le nom est requis' }),
                    ...(!email && { email: 'L\'email est requis' }),
                    ...(!phone && { phone: 'Le téléphone est requis' }),
                    ...(!message && { message: 'Le message est requis' }),
                    ...(!privacyConsent && { privacy: 'Vous devez accepter la politique de confidentialité' })
                }
            });
        }

        // Vérification de l'email
        if (!/\S+@\S+\.\S+/.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Email invalide',
                errors: { email: 'Veuillez entrer un email valide' }
            });
        }

        // Création du message de contact
        const newContact = new Contact({
            fullName,
            email,
            phone,
            address,
            city,
            postalCode,
            service,
            message,
            privacyConsent,
            user: userInfo.userId,
            role: userInfo.role
        });

        await newContact.save();

        // Récupérer les infos utilisateur si connecté
        let userDetails = {};
        if (userInfo.userId) {
            const user = await User.findById(userInfo.userId).select('nom prenom email');
            if (user) {
                userDetails = {
                    nom: user.nom,
                    prenom: user.prenom,
                    email: user.email
                };
            }
        }

        // Configuration du transporteur Nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // Configuration de l'email
        const mailOptions = {
            from: `"Manzo Service" <${process.env.EMAIL_USER}>`,
            to: 'manzoservice6@gmail.com',
            replyTo: email,
            subject: `Nouveau message de contact - ${service || 'Aucun service spécifié'}`,
            html: `
                <h2>Nouveau message de contact</h2>
                <p><strong>Nom:</strong> ${fullName}</p>
                <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <p><strong>Téléphone:</strong> <a href="tel:${phone}">${phone}</a></p>
                ${address ? `<p><strong>Adresse:</strong> ${address}</p>` : ''}
                ${city ? `<p><strong>Ville:</strong> ${city}</p>` : ''}
                ${postalCode ? `<p><strong>Code postal:</strong> ${postalCode}</p>` : ''}
                ${service ? `<p><strong>Service:</strong> ${service}</p>` : ''}
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
                <hr>
                <p><strong>Statut de l'expéditeur:</strong> ${userInfo.role === 'guest' ? 'Visiteur non connecté' : `Utilisateur connecté (${userInfo.role})`}</p>
                ${userInfo.userId ? `
                    <p><strong>Compte associé:</strong></p>
                    <p>Nom: ${userDetails.nom || 'Non disponible'}</p>
                    <p>Prénom: ${userDetails.prenom || 'Non disponible'}</p>
                    <p>Email du compte: ${userDetails.email || 'Non disponible'}</p>
                ` : ''}
                <p><strong>Consentement aux données:</strong> ${privacyConsent ? 'Oui' : 'Non'}</p>
            `
        };

        // Envoi de l'email
        await transporter.sendMail(mailOptions);
        console.log('Email envoyé avec succès');

        res.status(201).json({ 
            success: true,
            message: 'Votre message a été envoyé avec succès. Nous vous contacterons bientôt.',
            userStatus: userInfo.role === 'guest' ? 'guest' : 'connected'
        });

    } catch (error) {
        console.error('Erreur détaillée:', error);
        
        if (error.message.includes('Invalid login') || error.message.includes('Authentication failed')) {
            return res.status(500).json({ 
                success: false,
                message: 'Erreur d\'authentification email',
                error: 'Configuration SMTP incorrecte'
            });
        }

        res.status(500).json({ 
            success: false,
            message: 'Une erreur est survenue lors de l\'envoi du message',
            error: error.message 
        });
    }
};

// Récupérer les messages de contact (pour l'admin)
exports.getContactMessages = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Accès non autorisé' });
        }

        const messages = await Contact.find().sort({ createdAt: -1 }).populate('user', 'email nom prenom');

        res.status(200).json(messages);
    } catch (error) {
        console.error('Erreur lors de la récupération des messages:', error);
        res.status(500).json({ 
            message: 'Erreur serveur', 
            error: error.message 
        });
    }
};

