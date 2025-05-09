import { useLocation, useNavigate } from 'react-router-dom';
import { prestataires } from '../data/data';
import { FaStar, FaMapMarkerAlt, FaArrowLeft, FaCalendarAlt } from 'react-icons/fa';
import { IoMdChatboxes } from 'react-icons/io';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../utils/motion';

const serviceMapping = {
  'Ménage standard': 'Ménage',
  'Repassage de vêtements': 'Ménage',
  'Jardinage basique': 'Jardinage',
  'Lavage de vitres': 'Ménage',
  'Nettoyage de tapis': 'Ménage',
  'Service de plomberie basique': 'Plomberie',
  'Service électrique basique': 'Électricité',
  'Déménagement complet': 'Déménagement',
  'Rénovation intérieure': 'Rénovation',
  'Installation électrique': 'Électricité',
};

const PrestatairesList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { service: serviceFromState, pricingType } = location.state || {};
  
  const getProviderServiceName = () => serviceMapping[serviceFromState] || serviceFromState;
  const allPrestataires = Object.values(prestataires).flat();
  const providerServiceName = getProviderServiceName();

  const filteredPrestataires = allPrestataires.filter(prestataire => {
    return prestataire.service === providerServiceName && 
          (!pricingType || prestataire.pricingType === pricingType);
  });

  const prestatairesByCity = filteredPrestataires.reduce((acc, prestataire) => {
    const city = Object.keys(prestataires).find(city => 
      prestataires[city].some(p => p.id === prestataire.id)
    ) || 'Autre';
    if (!acc[city]) acc[city] = [];
    acc[city].push(prestataire);
    return acc;
  }, {});

  const handleReservation = (prestataireId) => {
    navigate('/reservation', { state: { prestataireId } });
  };

  const handleChat = (prestataireId) => {
    navigate('/chat', { state: { prestataireId } });
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100"
    >
      <main className="flex-grow container mx-auto px-4 py-8 pt-32">
        <motion.div variants={fadeIn('down', 'spring', 0.2, 1)} className="mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-[#5869A3] hover:text-[#48578A] transition-all duration-300 hover:scale-105"
          >
            <FaArrowLeft className="mr-2" />
            Retour aux services
          </button>
        </motion.div>

        <motion.div variants={fadeIn('up', 'spring', 0.4, 1)} className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#5869A3] mb-4">
            Prestataires pour {serviceFromState}
          </h1>
          <p className="text-lg text-gray-600">
            {filteredPrestataires.length} prestataires disponibles
            {pricingType === 'fixed' && ' (Prix fixes)'}
            {pricingType === 'quote' && ' (Sur devis)'}
          </p>
        </motion.div>

        {Object.entries(prestatairesByCity).map(([city, prestataires], index) => (
          <motion.div 
            key={city}
            variants={fadeIn('up', 'spring', index * 0.1, 0.75)}
            className="mb-16"
          >
            <h2 className="text-2xl font-semibold text-[#5869A3] mb-6 flex items-center">
              <FaMapMarkerAlt className="mr-2" />
              {city}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {prestataires.map((prestataire, idx) => (
                <motion.div
                  key={prestataire.id}
                  whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 border border-gray-200 hover:border-[#5869A3]/30 relative"
                >
                  <div className="relative h-40 bg-gradient-to-r from-[#5869A3] to-[#48578A]">
                    <div className="absolute -bottom-6 left-6 z-10">
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="relative"
                      >
                        <div className="w-16 h-16 rounded-full border-4 border-white shadow-xl overflow-hidden">
                          <img
                            src={prestataire.photo}
                            alt={prestataire.nom}
                            className="w-full h-full object-cover"
                            onError={(e) => e.target.src = '/default-profile.jpg'}
                          />
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-white rounded-full p-1 shadow-md">
                          <FaStar className="text-xs" />
                        </div>
                      </motion.div>
                    </div>
                  </div>
                  
                  <div className="p-6 pt-10">
                    <div className="flex justify-between items-start mb-3">
                      <motion.h3 
                        whileHover={{ color: '#48578A' }}
                        className="text-xl font-bold text-gray-800 transition-colors duration-300"
                      >
                        {prestataire.nom}
                      </motion.h3>
                      <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full shadow-inner">
                        <FaStar className="text-yellow-500 mr-1 text-sm" />
                        <span className="text-sm font-medium">{prestataire.note}</span>
                      </div>
                    </div>
                    
                    <motion.p 
                      whileHover={{ color: '#5869A3' }}
                      className="text-gray-600 text-sm mb-4 transition-colors duration-300 min-h-[60px]"
                    >
                      {prestataire.description}
                    </motion.p>
                    
                    <div className="flex items-center text-gray-500 text-sm mb-4">
                      <FaMapMarkerAlt className="mr-2 text-[#5869A3]" />
                      <span>{prestataire.distance}</span>
                    </div>
                    
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-lg font-bold text-[#5869A3]">
                        {prestataire.prix}
                        {prestataire.pricingType === 'quote' && ' (sur devis)'}
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                        {prestataire.disponibilite}
                      </span>
                    </div>
                    
                    <div className="flex gap-3">
                      <motion.button
                        whileHover={{ scale: 1.05, backgroundColor: '#F0F4FF' }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleChat(prestataire.id)}
                        className="flex-1 bg-white border-2 border-[#5869A3] text-[#5869A3] hover:text-[#48578A] py-2 rounded-xl font-medium transition-all duration-300 flex items-center justify-center"
                      >
                        <IoMdChatboxes className="mr-2 text-lg" /> Chat
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleReservation(prestataire.id)}
                        className="flex-1 bg-gradient-to-r from-[#5869A3] to-[#48578A] hover:from-[#48578A] hover:to-[#5869A3] text-white py-2 rounded-xl font-medium transition-all duration-300 flex items-center justify-center shadow-md"
                      >
                        <FaCalendarAlt className="mr-2" /> Réserver
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}

        {filteredPrestataires.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16 bg-white rounded-xl shadow-sm"
          >
            <h3 className="text-xl font-medium text-gray-600 mb-2">
              Aucun prestataire ne correspond à vos critères
            </h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
              className="mt-4 px-6 py-2 bg-gradient-to-r from-[#5869A3] to-[#48578A] text-white rounded-lg hover:from-[#48578A] hover:to-[#5869A3] transition-all duration-300 shadow-md"
            >
              Retour aux services
            </motion.button>
          </motion.div>
        )}
      </main>
    </motion.div>
  );
};

export default PrestatairesList;