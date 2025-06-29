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