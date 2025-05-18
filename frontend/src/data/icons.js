import {
    FaHome,
    FaTshirt,
    FaTree,
    FaTruckMoving,
    FaHammer,
    FaStar,
    FaMapMarkerAlt,
    FaClock,
    FaShoppingCart,
    FaComments,
    FaEnvelope,
    FaUser,
    FaCheckCircle,
    FaTools,
    FaLaptop,
    FaBath,
    FaSnowflake,
    FaUtensils,
    FaSwimmingPool,
    FaShieldAlt,
    FaFire,
    FaLevelUpAlt,
    FaFilm,
    FaDumbbell
  } from 'react-icons/fa';
  
  export const getIconComponent = (iconName) => {
    const icons = {
      FaHome,
      FaTshirt,
      FaTree,
      FaTruckMoving,
      FaHammer,
      FaStar,
      FaMapMarkerAlt,
      FaClock,
      FaShoppingCart,
      FaComments,
      FaEnvelope,
      FaUser,
      FaCheckCircle,
      FaTools,
      FaLaptop,
      FaBath,
      FaSnowflake,
      FaUtensils,
      FaSwimmingPool,
      FaShieldAlt,
      FaFire,
      FaLevelUpAlt,
      FaFilm,
      FaDumbbell
    };
  
    return icons[iconName] || FaUser;
  };