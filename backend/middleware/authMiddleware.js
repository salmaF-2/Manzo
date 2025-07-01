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

// ✅ Auth for any logged-in user (client, prestataire, admin, etc.)
const requireAuth = (req, res, next) => {
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


// ✅ Auth only for clients
const requireClientAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Non autorisé' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'client') {
      return res.status(403).json({ message: 'Accès réservé aux clients' });
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

// ✅ Auth only for prestataires
const requirePrestataireAuth = (req, res, next) => {
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
