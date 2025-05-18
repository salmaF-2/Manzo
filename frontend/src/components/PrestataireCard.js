import React, { useState } from 'react';
import { 
  FaStar, FaComments, FaUser, FaMapMarkerAlt, 
  FaClock, FaCheckCircle, FaTools, FaHome,
  FaTshirt, FaTree, FaLaptop, FaSnowflake,
  FaPaintRoller, FaHands
} from 'react-icons/fa';

const serviceIcons = {
  Plomberie: <FaTools className="text-blue-500" />,
  Ménage: <FaHome className="text-green-500" />,
  Électricité: <FaTools className="text-yellow-500" />,
  Couture: <FaTshirt className="text-pink-500" />,
  Jardinage: <FaTree className="text-emerald-500" />,
  Informatique: <FaLaptop className="text-purple-500" />,
  'Bien-être': <FaHands className="text-teal-500" />,
  Peinture: <FaPaintRoller className="text-orange-500" />,
  Climatisation: <FaSnowflake className="text-blue-300" />
};

const PrestataireCard = ({ prestataire, onOpenChat }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="p-5 flex flex-col sm:flex-row gap-5">
        <div className="flex-shrink-0 relative">
          <img
            src={prestataire.photo}
            alt={prestataire.nom}
            className="w-20 h-20 rounded-full object-cover border-4 border-[#4D6099]"
          />
          <div className="absolute -bottom-2 -right-2 bg-white p-1 rounded-full shadow">
            {serviceIcons[prestataire.service] || <FaUser />}
          </div>
        </div>
        
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold text-xl text-[#1F263D]">{prestataire.nom}</h3>
              <p className="text-gray-600 flex items-center gap-1">
                {serviceIcons[prestataire.service]}
                {prestataire.service}
              </p>
            </div>
            <div className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full">
              <FaStar className="mr-1 text-yellow-500" />
              <span className="font-bold">{prestataire.note}</span>
              <span className="text-gray-500 text-sm ml-1">({prestataire.avis})</span>
            </div>
          </div>
          
          <div className="mt-3 flex flex-wrap items-center text-gray-600 gap-2">
            <span className="flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm">
              <FaMapMarkerAlt className="mr-1 text-[#4D6099]" />
              {prestataire.distance}
            </span>
            <span className="flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm">
              <FaClock className="mr-1 text-[#4D6099]" />
              {prestataire.disponibilite}
            </span>
            <span className="flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm font-semibold text-[#4D6099]">
              {prestataire.prix}
            </span>
          </div>
          
          <p className="mt-3 text-gray-600">{prestataire.description}</p>
          
          {showDetails && prestataire.details && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h4 className="font-semibold text-[#1F263D] mb-2">Détails supplémentaires :</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                {prestataire.details.certifications && (
                  <li className="flex items-start">
                    <FaCheckCircle className="mt-1 mr-2 text-green-500 flex-shrink-0" />
                    <span>Certifications : {prestataire.details.certifications.join(', ')}</span>
                  </li>
                )}
                {prestataire.details.equipement && (
                  <li className="flex items-start">
                    <FaCheckCircle className="mt-1 mr-2 text-green-500 flex-shrink-0" />
                    <span>Équipement : {prestataire.details.equipement}</span>
                  </li>
                )}
                {prestataire.details.garantie && (
                  <li className="flex items-start">
                    <FaCheckCircle className="mt-1 mr-2 text-green-500 flex-shrink-0" />
                    <span>Garantie : {prestataire.details.garantie}</span>
                  </li>
                )}
              </ul>
              
              {prestataire.details.photosTravaux && (
                <div className="mt-3">
                  <h5 className="font-medium text-[#1F263D] mb-2">Exemples de travaux :</h5>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {prestataire.details.photosTravaux.map((photo, index) => (
                      <img 
                        key={index} 
                        src={photo} 
                        alt={`Travail ${index + 1}`}
                        className="h-24 rounded-lg object-cover border border-gray-200"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-gray-50 px-5 py-4 flex flex-wrap justify-between items-center gap-3">
        <button 
          onClick={() => setShowDetails(!showDetails)}
          className="text-[#4D6099] hover:text-[#1F263D] font-medium flex items-center"
        >
          {showDetails ? 'Moins de détails' : 'Plus de détails'}
        </button>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => onOpenChat(prestataire)}
            className="flex items-center gap-2 bg-blue-100 text-blue-700 hover:bg-blue-200 px-4 py-2 rounded-full transition-colors"
          >
            <FaComments /> Chat
          </button>
          <button className="bg-[#4D6099] hover:bg-[#1F263D] text-white px-4 py-2 rounded-full transition-colors">
            Voir profil
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrestataireCard;