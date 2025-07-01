--backend/models/Conversations.js
const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    },
    pinned: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Index pour améliorer les performances
conversationSchema.index({ participants: 1 });
conversationSchema.index({ updatedAt: -1 });
conversationSchema.index({ pinned: -1, updatedAt: -1 });

module.exports = mongoose.model('Conversation', conversationSchema);

--backend/models/Contact.js
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: String,
  city: String,
  postalCode: String,
  service: String,
  privacyConsent: { type: Boolean, default: false },
  message: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Référence à l'utilisateur connecté (optionnel)
  // role: { type: String, enum: ['client', 'prestataire', 'guest'] }, // Rôle de l'expéditeur
  role: { type: String, enum: ['client', 'prestataire', 'guest'], default: 'guest' },
  createdAt: { type: Date, default: Date.now }
},{ timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);

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





--backend/controller/messageController.js
const User = require('../models/User');
const Message = require('../models/Message');
const Conversation = require('../models/Conversation');

// Récupérer les conversations avec statut en ligne
// Dans messageController.js
exports.getConversations = async (req, res) => {
    try {
        const userId = req.user.userId;

        const conversations = await Conversation.find({
            participants: userId
        })
        .populate({
            path: 'participants',
            select: 'nom prenom photo online role',
            match: { _id: { $ne: userId } }
        })
        .populate('lastMessage')
        .sort({ updatedAt: -1 });

        const formattedConversations = conversations.map(conv => {
            const otherParticipant = conv.participants.find(p => p._id.toString() !== userId);
            
            return {
                _id: conv._id,
                participant: otherParticipant ? {
                    _id: otherParticipant._id,
                    name: `${otherParticipant.nom} ${otherParticipant.prenom}`,
                    avatar: otherParticipant.photo || 'https://i.pravatar.cc/150?img=0',
                    online: otherParticipant.online,
                    role: otherParticipant.role
                } : null,
                lastMessage: conv.lastMessage?.content || 'Aucun message',
                lastMessageTime: formatTime(conv.lastMessage?.createdAt || conv.createdAt)
            };
        }).filter(conv => conv.participant); // Filter out conversations without participant

        res.status(200).json(formattedConversations);
    } catch (error) {
        console.error('Erreur:', error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

// Récupérer les messages d'une conversation
exports.getMessages = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const userId = req.user.userId;

        // Vérifier l'accès
        const conversation = await Conversation.findOne({
            _id: conversationId,
            participants: userId
        });

        if (!conversation) {
            return res.status(403).json({ message: 'Accès non autorisé' });
        }

        // Récupérer les messages
        const messages = await Message.find({ conversation: conversationId })
            .sort({ createdAt: 1 });

        // Récupérer l'autre participant
        const otherParticipantId = conversation.participants.find(id => id.toString() !== userId);
        const otherParticipant = await User.findById(otherParticipantId)
            .select('nom prenom photo online');

        res.status(200).json({
            messages: messages.map(msg => ({
                id: msg._id,
                text: msg.content,
                time: formatTime(msg.createdAt),
                sent: msg.sender.toString() === userId,
                file: msg.file
            })),
            participant: {
                name: `${otherParticipant.nom} ${otherParticipant.prenom}`,
                avatar: otherParticipant.photo || 'https://i.pravatar.cc/150?img=0',
                online: otherParticipant.online
            }
        });
    } catch (error) {
        console.error('Erreur:', error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

// Envoyer un message
exports.sendMessage = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const content = req.body.content || ''; // Gérer le cas où content est vide
        const userId = req.user.userId;
        const file = req.file;

        console.log("Nouveau message reçu:", { content, file }); // Debug log

        // Vérifier l'accès
        const conversation = await Conversation.findOne({
            _id: conversationId,
            participants: userId
        }).populate('participants');

        if (!conversation) {
            return res.status(403).json({ message: 'Accès non autorisé' });
        }

        // Créer le message (même si content est vide mais file existe)
        const newMessage = new Message({
            conversation: conversationId,
            sender: userId,
            content: content,
            ...(file && {
                file: {
                    name: file.originalname,
                    type: file.mimetype,
                    size: file.size,
                    url: `/uploads/${file.filename}`
                }
            })
        });

        await newMessage.save();

        // Mettre à jour la conversation
        conversation.lastMessage = newMessage._id;
        await conversation.save();

        // Populer le message pour Socket.IO
        const populatedMessage = await Message.findById(newMessage._id)
            .populate('sender', 'nom prenom');

        // Préparer les données pour Socket.IO
        const messageData = {
            id: populatedMessage._id,
            text: populatedMessage.content,
            time: formatTime(populatedMessage.createdAt),
            sent: false,
            file: populatedMessage.file,
            conversationId: conversationId,
            senderId: userId,
            senderName: `${populatedMessage.sender.nom} ${populatedMessage.sender.prenom}`
        };

        // Envoyer la réponse
        res.status(201).json({
            id: populatedMessage._id,
            text: populatedMessage.content,
            time: formatTime(populatedMessage.createdAt),
            sent: true, // Indique que le message a été envoyé par l'utilisateur actuel
            file: populatedMessage.file,
            conversationId: conversationId,
            senderId: userId
        });

        // Notifier via Socket.IO
        const io = req.app.get('socketio');

        
        io.to(conversationId).emit('newMessage', messageData);

    } catch (error) {
        console.error('Erreur:', error);
        res.status(500).json({ 
            message: 'Erreur serveur', 
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};


// Démarrer une nouvelle conversation
exports.startConversation = async (req, res) => {
    try {
        const { recipientId } = req.params;
        const userId = req.user.userId;

        // Vérification de base
        if (recipientId === userId) {
            return res.status(400).json({ message: 'Vous ne pouvez pas parler à vous-même' });
        }

        // Vérification plus simple de l'existence du destinataire
        const recipient = await User.findById(recipientId);
        if (!recipient) {
            return res.status(404).json({ message: 'Destinataire non trouvé' });
        }

        // Vérifier si une conversation existe déjà (sans restriction de rôle)
        let conversation = await Conversation.findOne({
            participants: { $all: [userId, recipientId] }
        });

        if (!conversation) {
            conversation = new Conversation({
                participants: [userId, recipientId]
            });
            await conversation.save();
        }

        res.status(200).json({
            conversationId: conversation._id,
            recipient: {
                name: `${recipient.nom} ${recipient.prenom}`,
                avatar: recipient.photo || 'https://i.pravatar.cc/150?img=0',
                online: recipient.online
            }
        });
    } catch (error) {
        console.error('Erreur:', error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

// Mettre à jour le statut en ligne
exports.updateOnlineStatus = async (req, res) => {
    try {
        const { online } = req.body;
        const userId = req.user.userId;

        await User.findByIdAndUpdate(userId, { online });

        // Notifier via Socket.io
        const io = req.app.get('socketio');
        io.emit('userStatusChanged', { userId, online });

        res.status(200).json({ message: 'Statut mis à jour' });
    } catch (error) {
        console.error('Erreur:', error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

// Supprimer une conversation
exports.deleteConversation = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const userId = req.user.userId;

        // Vérifier que l'utilisateur fait partie de la conversation
        const conversation = await Conversation.findOneAndDelete({
            _id: conversationId,
            participants: userId
        });

        if (!conversation) {
            return res.status(404).json({ message: 'Conversation non trouvée' });
        }

        // Supprimer les messages associés
        await Message.deleteMany({ conversation: conversationId });

        res.status(200).json({ message: 'Conversation supprimée' });
    } catch (error) {
        console.error('Erreur:', error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

// Épingler une conversation
exports.pinConversation = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const userId = req.user.userId;

        // Vérifier que l'utilisateur fait partie de la conversation
        const conversation = await Conversation.findOneAndUpdate(
            {
                _id: conversationId,
                participants: userId
            },
            { pinned: true },
            { new: true }
        );

        if (!conversation) {
            return res.status(404).json({ message: 'Conversation non trouvée' });
        }

        res.status(200).json({ message: 'Conversation épinglée' });
    } catch (error) {
        console.error('Erreur:', error);
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

// Fonction utilitaire pour formater la date
function formatTime(date) {
    if (!date) return '';
    
    const now = new Date();
    const messageDate = new Date(date);
    const diffInHours = (now - messageDate) / (1000 * 60 * 60);

    if (diffInHours < 24) {
        return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 48) {
        return 'Hier';
    } else {
        return messageDate.toLocaleDateString([], { day: 'numeric', month: 'short' });
    }
}


exports.searchUsers = async (req, res) => {
    try {
        const { query } = req.query;
        const userId = req.user.userId;
        const userRole = req.user.role;

        // Vérification minimale de la requête
        if (!query || query.length < 2) {
            return res.status(400).json({ message: 'La recherche nécessite au moins 2 caractères' });
        }

        // Recherche plus permissive
        const users = await User.find({
            $and: [
                { _id: { $ne: userId } }, // Exclure l'utilisateur actuel
                { 
                    $or: [
                        { nom: { $regex: query, $options: 'i' } },
                        { prenom: { $regex: query, $options: 'i' } },
                        { 
                            $expr: {
                                $regexMatch: {
                                    input: { $concat: ["$prenom", " ", "$nom"] },
                                    regex: query,
                                    options: "i"
                                }
                            }
                        }
                    ]
                }
            ]
        })
        .select('nom prenom photo online role email createdAt')
        .limit(10);

        const formattedUsers = users.map(user => ({
            ...user._doc,
            photo: user.photo ? `/uploads/${user.photo.split('/').pop()}` : null
        }));

        // res.status(200).json(users);
        res.status(200).json(formattedUsers);
    } catch (error) {
        console.error('Erreur:', error);
        res.status(500).json({ 
            message: 'Erreur serveur', 
            error: error.message
        });
    }
};

--backend/routes/messageRoutes.js
const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const { requireAuth, checkOnlineStatus } = require('../middleware/authMiddleware');
const { upload } = require('../config/multer');

// Toutes les routes messages
router.get('/conversations', requireAuth, checkOnlineStatus, messageController.getConversations);
router.post('/conversations/:recipientId', requireAuth, checkOnlineStatus, messageController.startConversation);
router.get('/conversations/:conversationId/messages', requireAuth, checkOnlineStatus, messageController.getMessages);
router.post('/conversations/:conversationId/messages', requireAuth, checkOnlineStatus, upload.single('file'), messageController.sendMessage);

// Route de recherche - IMPORTANTE
router.get('/users/search', requireAuth, checkOnlineStatus, messageController.searchUsers);
// Autres routes...
router.put('/users/online-status', requireAuth, messageController.updateOnlineStatus);
router.delete('/conversations/:conversationId', requireAuth, messageController.deleteConversation);
router.patch('/conversations/:conversationId/pin', requireAuth, messageController.pinConversation);

module.exports = router;

--frontend/src/messageClient.js
import React, { useEffect, useState, useRef } from "react";
import SideBarClient from "./SideBarClient";
import { motion, AnimatePresence } from "framer-motion";
import { MoreVertical, Paperclip, Send, Search, ChevronDown, Pin, Trash2, X, Image, Video, FileText } from "lucide-react";
import axios from "axios";
import io from "socket.io-client";
import { jwtDecode } from 'jwt-decode';

const MessagesC = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeConversation, setActiveConversation] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [showFileOptions, setShowFileOptions] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [currentMessages, setCurrentMessages] = useState([]);
  const [currentParticipant, setCurrentParticipant] = useState(null);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const fileInputRef = useRef(null);
  const socket = useRef(null);
  const messagesEndRef = useRef(null);
  const [userId, setUserId] = useState(null);

  // Connect to Socket.IO
  useEffect(() => {
    socket.current = io("http://localhost:5000");

    socket.current.on("newMessage", (message) => {
      if (message.conversationId === activeConversation?._id) {
         const receivedMessage = {
          ...message,
          sent: message.senderId === userId // Comparez avec l'ID de l'utilisateur actuel
        };
        setCurrentMessages(prev => [...prev, receivedMessage]);
      }
    });

    socket.current.on("userStatusChanged", ({ userId, online }) => {
      setConversations(prev => prev.map(conv => {
        if (conv.participant?._id === userId) {
          return { ...conv, participant: { ...conv.participant, online } };
        }
        return conv;
      }));
    });

    return () => {
      socket.current.disconnect();
    };
  }, [activeConversation]);

  // Fetch conversations
  useEffect(() => {
    const fetchConversations = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/messages/conversations", {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Filtrer les conversations valides
        const validConversations = response.data.filter(conv => 
          conv.participant && 
          conv.participant._id && 
          conv.participant.name
        );
        
        setConversations(validConversations);
        
        // Si une conversation est déjà active, la mettre à jour
        if (activeConversation) {
          const updatedConv = validConversations.find(c => c._id === activeConversation._id);
          if (updatedConv) {
            setActiveConversation(updatedConv);
          }
        }
      } catch (error) {
        console.error("Error fetching conversations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConversations();
  }, []);

  // Fetch messages when conversation changes
  useEffect(() => {
    if (activeConversation) {
      const fetchMessages = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `http://localhost:5000/api/messages/conversations/${activeConversation._id}/messages`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setCurrentMessages(response.data.messages);
          setCurrentParticipant(response.data.participant);
          
          socket.current.emit("joinConversation", activeConversation._id);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      };

      fetchMessages();
    }
  }, [activeConversation]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages]);

  const handleSearch = async (query) => {
    if (query.length < 2) {
      setShowSearchResults(false);
      return;
    }
    
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/api/messages/users/search?query=${query}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSearchResults(response.data);
      setShowSearchResults(true);
    } catch (error) {
      console.error("Search error:", error);
      setShowSearchResults(false);
    }
  };

  const startNewConversation = async (userId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `http://localhost:5000/api/messages/conversations/${userId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    
    // Vérification que le participant existe
    if (!response.data.recipient) {
      throw new Error("Participant non trouvé");
    }
    
    // Créer la nouvelle conversation
    const newConversation = {
      _id: response.data.conversationId,
      participant: response.data.recipient,
      lastMessage: "Nouvelle conversation",
      lastMessageTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    // Mettre à jour l'état
    setConversations(prev => [newConversation, ...prev]);
    setActiveConversation(newConversation);
    setCurrentParticipant(response.data.recipient);
    setCurrentMessages([]);
    
    // Réinitialiser complètement la recherche
    setSearchQuery("");
    setSearchResults([]);
    setShowSearchResults(false);
    
  } catch (error) {
    console.error("Error:", error);
    // Ajoutez ici une notification à l'utilisateur
    alert("Impossible de démarrer une conversation : " + error.message);
  }
};
  const handleFileSelect = (type) => {
    fileInputRef.current.accept = type === 'image' ? 'image/*' : 
                                 type === 'video' ? 'video/*' : 
                                 '.pdf,.doc,.docx,.txt';
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setFilePreview(event.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        setFilePreview(null);
      }
      
      setShowFileOptions(false);
    }
  };

  // const handleSendMessage = async () => {
  //   if (newMessage.trim() === "" && !selectedFile) return;
    
  //   try {
  //     const token = localStorage.getItem("token");
  //     const formData = new FormData();
  //     formData.append("content", newMessage);
  //     if (selectedFile) {
  //       formData.append("file", selectedFile);
  //     }

  //     const response = await axios.post(
  //       `http://localhost:5000/api/messages/conversations/${activeConversation._id}/messages`,
  //       formData,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "multipart/form-data"
  //         }
  //       }
  //     );

  //     // Mettre à jour les messages
  //     setCurrentMessages(prev => [...prev, response.data]);
      
  //     // Mettre à jour la dernière conversation
  //     setConversations(prev => prev.map(conv => {
  //       if (conv._id === activeConversation._id) {
  //         return {
  //           ...conv,
  //           lastMessage: newMessage || "Fichier envoyé",
  //           lastMessageTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  //         };
  //       }
  //       return conv;
  //     }));

  //     setNewMessage("");
  //     setSelectedFile(null);
  //     setFilePreview(null);
  //   } catch (error) {
  //     console.error("Error sending message:", error);
  //   }
  // };

  const handleSendMessage = async () => {
    if (newMessage.trim() === "" && !selectedFile) return;
    
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("content", newMessage);
      if (selectedFile) {
        formData.append("file", selectedFile);
      }

      const response = await axios.post(
        `http://localhost:5000/api/messages/conversations/${activeConversation._id}/messages`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      // Marquez explicitement le message comme envoyé
      const sentMessage = {
        ...response.data,
        sent: true // Forcez ce flag à true pour les messages envoyés
      };

      setCurrentMessages(prev => [...prev, sentMessage]);
      setNewMessage("");
      setSelectedFile(null);
      setFilePreview(null);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  const renderFilePreview = (file) => {
    if (!file) return null;
    
    if (file.type.startsWith('image/')) {
      return (
        <div className="mt-2 max-w-xs">
          <img 
            src={file.url} 
            alt="Preview" 
            className="rounded-lg border border-gray-200 max-h-40 object-cover"
          />
        </div>
      );
    }
    
    return (
      <div className="mt-2 p-3 bg-gray-100 rounded-lg border border-gray-200 flex items-center">
        <FileText className="text-blue-600 mr-2" size={20} />
        <div className="truncate">
          <p className="font-medium truncate">{file.name}</p>
          <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
        </div>
      </div>
    );
  };

  const filteredConversations = conversations.filter(conv => {
    if (!conv.participant) return false;
    
    const participantName = conv.participant.name?.toLowerCase() || '';
    const lastMsg = conv.lastMessage?.toLowerCase() || '';
    return participantName.includes(searchQuery.toLowerCase()) || 
           lastMsg.includes(searchQuery.toLowerCase());
  });

  return (
    <div className="flex bg-gradient-to-br from-[#BCD0EA50] to-indigo-50 min-h-[calc(100vh-5rem)] mt-20">
      <SideBarClient />

      <div className="flex-1 ml-60 p-6 mt-4">
        <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="text-3xl font-bold mb-8 text-gray-800">
          💬 Messages
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative mb-8 w-full max-w-4xl"
        >
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-gray-400" size={20} />
          </div>
          <input
            type="text"
            placeholder="Rechercher des prestataires..."
            className="w-full pl-10 pr-10 py-3 rounded-xl border-0 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 transition-all duration-300"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              handleSearch(e.target.value);
            }}
          />
          {searchQuery && (
            <button 
              onClick={() => {
                setSearchQuery("");
                setShowSearchResults(false);
              }}
              className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-blue-600 transition-colors"
            >
              <X className="text-gray-400 hover:text-gray-600" size={20} />
            </button>
          )}
          
    
          {showSearchResults && searchQuery.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md max-h-60 overflow-y-auto border border-gray-200"
            >
              {searchResults.length > 0 ? (
                searchResults
                  .filter(user => !conversations.some(conv => conv.participant?._id === user._id))
                  .map(user => (
                    <div 
                      key={user._id}
                      className="p-3 hover:bg-gray-100 cursor-pointer flex items-center"
                      onClick={() => startNewConversation(user._id)}
                    >
                      <img 
                        src={user.photo || 'https://i.pravatar.cc/150?img=0'} 
                        alt={user.nom}
                        className="w-8 h-8 rounded-full mr-3"
                      />
                      <div>
                        <p className="font-medium">{user.prenom} {user.nom}</p>
                        <p className="text-xs text-gray-500">
                          {user.role === 'prestataire' ? 'Prestataire' : 'Client'} • 
                          {user.online ? ' En ligne' : ' Hors ligne'}
                        </p>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="p-3 text-gray-500">Aucun résultat trouvé</div>
              )}
            </motion.div>
          )}
        </motion.div>

        {isLoading ? (
          <div className="flex items-center justify-center h-[600px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg flex h-[600px] overflow-hidden border border-gray-100"
          >
            <div className="w-1/3 border-r border-gray-100 flex flex-col">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h3 className="font-semibold text-gray-700">Toutes les conversations</h3>
                <ChevronDown className="text-gray-400" size={18} />
              </div>

              <div className="flex-1 overflow-y-auto">
                <AnimatePresence>
                  {filteredConversations.length > 0 ? (
                    filteredConversations.map((conversation) => (
                      <motion.div
                        key={conversation._id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => setActiveConversation(conversation)}
                        className={`flex items-center gap-3 p-4 cursor-pointer transition-all duration-200 ${
                          activeConversation?._id === conversation._id 
                            ? 'bg-blue-50 border-l-4 border-blue-500' 
                            : 'hover:bg-gray-50 border-l-4 border-transparent'
                        }`}
                      >
                        <div className="relative">
                          <img
                            src={conversation.participant?.avatar || 'https://i.pravatar.cc/150?img=0'}
                            alt="avatar"
                            className="w-12 h-12 rounded-full object-cover shadow-sm"
                          />
                          {conversation.participant?.online && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <h4 className="font-semibold truncate">
                              {conversation.participant?.name || 'Utilisateur inconnu'}
                            </h4>
                            <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                              {conversation.lastMessageTime}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 truncate">
                            {conversation.lastMessage || 'Aucun message'}
                          </p>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-4 text-center text-gray-500"
                    >
                      Aucune conversation trouvée
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="flex-1 flex flex-col">
              {activeConversation ? (
                <>
                  <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={currentParticipant?.avatar || 'https://i.pravatar.cc/150?img=0'}
                          alt="avatar"
                          className="w-10 h-10 rounded-full object-cover shadow-sm"
                        />
                        {currentParticipant?.online && (
                          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold">{currentParticipant?.name}</h4>
                        <p className={`text-xs ${currentParticipant?.online ? 'text-green-500' : 'text-gray-500'}`}>
                          {currentParticipant?.online ? 'En ligne' : 'Hors ligne'}
                        </p>
                      </div>
                    </div>
                    <div className="relative">
                      <button
                        onClick={() => setShowOptions((prev) => !prev)}
                        className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                      >
                        <MoreVertical className="text-gray-600" size={20} />
                      </button>
                      <AnimatePresence>
                        {showOptions && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10 overflow-hidden border border-gray-200"
                          >
                            <button className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors">
                              <Pin className="mr-2" size={16} />
                              Épingler
                            </button>
                            <button 
                              className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 transition-colors"
                              onClick={async () => {
                                try {
                                  const token = localStorage.getItem("token");
                                  await axios.delete(
                                    `http://localhost:5000/api/messages/conversations/${activeConversation._id}`,
                                    { headers: { Authorization: `Bearer ${token}` } }
                                  );
                                  setConversations(prev => 
                                    prev.filter(c => c._id !== activeConversation._id)
                                  );
                                  setActiveConversation(null);
                                } catch (error) {
                                  console.error("Error deleting conversation:", error);
                                }
                              }}
                            >
                              <Trash2 className="mr-2" size={16} />
                              Supprimer
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="flex-1 p-6 overflow-y-auto bg-gradient-to-b from-white to-blue-50">
                    <div className="space-y-4">
                      <AnimatePresence>
                        {currentMessages.map((message, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: message.sent ? 10 : -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className={`flex ${message.sent ? 'justify-end' : 'justify-start'}`}
                          >
                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              className={`max-w-[75%] p-4 rounded-2xl shadow-sm ${
                                message.sent 
                                  ? 'bg-blue-600 text-white rounded-tr-none' 
                                  : 'bg-white border border-gray-200 rounded-tl-none'
                              }`}
                            >
                              <p>{message.text}</p>
                              {message.file && renderFilePreview(message.file)}
                              <div className={`text-xs mt-1 text-right ${
                                message.sent ? 'text-blue-100' : 'text-gray-500'
                              }`}>
                                {message.time}
                              </div>
                            </motion.div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                      <div ref={messagesEndRef} />
                    </div>
                  </div>

                  <div className="border-t border-gray-100 p-4 bg-white">
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex items-center gap-2"
                    >
                      <div className="relative">
                        <button 
                          onClick={() => setShowFileOptions(!showFileOptions)}
                          className="text-gray-500 hover:text-blue-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
                        >
                          <Paperclip size={20} />
                        </button>
                        
                        <AnimatePresence>
                          {showFileOptions && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute bottom-full left-0 mb-2 bg-white shadow-lg rounded-md z-10 overflow-hidden border border-gray-200"
                            >
                              <button 
                                onClick={() => handleFileSelect('image')}
                                className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                              >
                                <Image className="mr-2" size={16} />
                                Image
                              </button>
                              <button 
                                onClick={() => handleFileSelect('video')}
                                className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                              >
                                <Video className="mr-2" size={16} />
                                Vidéo
                              </button>
                              <button 
                                onClick={() => handleFileSelect('document')}
                                className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                              >
                                <FileText className="mr-2" size={16} />
                                Document
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                        
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </div>

                      <input
                        type="text"
                        placeholder="Écrivez votre message..."
                        className="flex-1 px-4 py-3 border-0 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 transition-all"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                      <button 
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim() && !selectedFile}
                        className={`p-2 rounded-full transition-all ${
                          newMessage.trim() || selectedFile
                            ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        <Send size={20} />
                      </button>
                    </motion.div>
                    
                    {selectedFile && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-2 flex items-center justify-between bg-blue-50 p-2 rounded-lg"
                      >
                        <div className="flex items-center">
                          <Paperclip className="text-blue-600 mr-2" size={16} />
                          <span className="text-sm truncate max-w-xs">{selectedFile.name}</span>
                        </div>
                        <button 
                          onClick={() => {
                            setSelectedFile(null);
                            setFilePreview(null);
                          }}
                          className="text-gray-500 hover:text-red-500"
                        >
                          <X size={16} />
                        </button>
                      </motion.div>
                    )}
                    
                    {filePreview && selectedFile?.type.startsWith('image/') && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-2"
                      >
                        <img 
                          src={filePreview} 
                          alt="Preview" 
                          className="rounded-lg border border-gray-200 max-h-40 object-cover"
                        />
                      </motion.div>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  Sélectionnez une conversation pour commencer à discuter
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MessagesC;































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