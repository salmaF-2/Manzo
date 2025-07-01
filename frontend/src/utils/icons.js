import * as FaIcons from 'react-icons/fa';
import * as FiIcons from 'react-icons/fi';
import * as OtherIcons from 'react-icons/io'; // Ajoutez d'autres bibliothèques si nécessaire

export const getIconComponent = (iconName) => {
  if (!iconName) return FaIcons.FaHome; // Icône par défaut
  
  // Essayez de trouver l'icône dans différentes bibliothèques
  return (
    FaIcons[iconName] || 
    FiIcons[iconName] || 
    OtherIcons[iconName] || 
    FaIcons.FaHome // Fallback
  );
};