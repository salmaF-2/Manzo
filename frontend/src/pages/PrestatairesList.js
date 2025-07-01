import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt, FaArrowLeft, FaCalendarAlt, FaBriefcase, FaMoneyBillWave, FaClock } from 'react-icons/fa';
import { IoMdChatboxes } from 'react-icons/io';
import { motion } from 'framer-motion';
import axios from 'axios';

const PrestatairesList = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [service, setService] = useState(null);
  const [prestataires, setPrestataires] = useState([]);
  const [groupedPrestataires, setGroupedPrestataires] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [serviceResponse, prestatairesResponse] = await Promise.all([
          axios.get(`http://localhost:5000/api/services/${serviceId}`),
          axios.get(`http://localhost:5000/api/services/${serviceId}/prestataires`)
        ]);

        // --- FIX: Correctly access the service object from the 'data' property ---
        setService(serviceResponse.data.data);

        const prestatairesData = prestatairesResponse.data.data?.prestataires || [];
        setPrestataires(prestatairesData);

        const grouped = prestatairesData.reduce((acc, prestataire) => {
          const city = prestataire.ville || 'Autre';
          if (!acc[city]) acc[city] = [];
          
          acc[city].push(prestataire);
          return acc;
        }, {});

        setGroupedPrestataires(grouped);
      } catch (err) {
        console.error('Erreur lors de la récupération des données:', err);
        setError(err.response?.data?.message || 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [serviceId]);

  const handleReservation = (prestataireId) => {
    if (!service) {
      console.error("Service is not loaded yet");
      return;
    }

    // Pass the entire service object in the navigation state
    navigate(`/reservation/${serviceId}/${prestataireId}`, {
      state: {
        service: service, // Pass the whole service object
        // pricingType is already inside the service object
      }
    });
  };

  const handleChat = (prestataireId) => {
    navigate('/chat', {
      state: {
        prestataireId,
        serviceId,
        serviceName: service?.title
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h3 className="text-xl font-medium text-red-600 mb-4">Erreur</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retour
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8 pt-32">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <FaArrowLeft className="mr-2" />
          Retour aux services
        </button>

        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Prestataires pour {service?.title}
          </h1>
          <p className="text-lg text-gray-600">
            {prestataires.length} prestataire(s) disponible(s)
          </p>
        </div>

        {Object.keys(groupedPrestataires).length > 0 ? (
          Object.entries(groupedPrestataires).map(([city, cityPrestataires]) => (
            <div key={city} className="mb-12">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-blue-500" />
                {city} <span className="ml-2 text-sm text-gray-500">({cityPrestataires.length})</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cityPrestataires.map((prestataire) => (
                  <motion.div
                    key={prestataire._id}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100"
                  >
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="relative mr-4">
                          <img
                            src={prestataire.photo || prestataire.prestataireInfo?.documents?.photoProfil || '/default-profile.jpg'}
                            alt={`${prestataire.prenom} ${prestataire.nom}`}
                            className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
                            onError={(e) => e.target.src = '/default-profile.jpg'}
                          />
                          {prestataire.prestataireInfo?.noteMoyenne && (
                            <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-white rounded-full p-1 flex items-center justify-center">
                              <FaStar className="text-xs" />
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800">
                            {prestataire.prenom} {prestataire.nom}
                          </h3>
                          <div className="flex items-center text-sm text-gray-600">
                            <FaStar className="text-yellow-500 mr-1" />
                            <span>{prestataire.prestataireInfo?.noteMoyenne?.toFixed(1) || 'Nouveau'}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4 text-sm">
                        <div className="flex items-center text-gray-600">
                          <FaBriefcase className="mr-2 text-blue-500" />
                          <span>Service: {prestataire.serviceDetails?.title || service?.title}</span>
                        </div>
                        
                        {prestataire.serviceDetails?.pricingType === 'fixed' && (
                          <div className="flex items-center text-gray-600">
                            <FaMoneyBillWave className="mr-2 text-blue-500" />
                            <span>Prix: {prestataire.serviceDetails?.price} MAD</span>
                          </div>
                        )}
                        
                        {prestataire.serviceDetails?.pricingType === 'devis' && (
                          <div className="flex items-center text-gray-600">
                            <FaMoneyBillWave className="mr-2 text-blue-500" />
                            <span>Prix: À partir de {prestataire.serviceDetails?.startingPrice || 'sur devis'} MAD</span>
                          </div>
                        )}
                        
                        <div className="flex items-center text-gray-600">
                          <FaClock className="mr-2 text-blue-500" />
                          <span>Durée: {prestataire.serviceDetails?.duration || 'Non spécifiée'}</span>
                        </div>

                        <div className="flex items-center text-gray-600">
                          <FaMapMarkerAlt className="mr-2 text-blue-500" />
                          <span>{prestataire.ville || 'Localisation non spécifiée'}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <FaBriefcase className="mr-2 text-blue-500" />
                          <span>Expérience: {prestataire.prestataireInfo?.experience || 'Non spécifiée'}</span>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => handleChat(prestataire._id)}
                          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          <IoMdChatboxes className="inline mr-1" /> Chat
                        </button>
                        <button
                          onClick={() => handleReservation(prestataire._id)}
                          disabled={!service} // This will now be correctly enabled
                          className={`flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition-colors ${
                            !service ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                          style={{ position: 'relative', zIndex: 1 }}
                        >
                          <FaCalendarAlt className="inline mr-1" /> Réserver
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-medium text-gray-600 mb-4">
              Aucun prestataire disponible pour ce service
            </h3>
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Retour aux services
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default PrestatairesList;