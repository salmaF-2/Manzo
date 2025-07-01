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