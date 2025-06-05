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

// contact
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