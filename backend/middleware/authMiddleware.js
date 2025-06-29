const jwt = require('jsonwebtoken');

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

// 🧠 Export each function cleanly
module.exports = {
  requireAuth,
  requireClientAuth,
  requirePrestataireAuth
};
