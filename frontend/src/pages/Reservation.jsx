import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { 
  FaCalendarAlt, 
  FaClock, 
  FaUser, 
  FaCreditCard, 
  FaMoneyBillWave,
  FaCheckCircle,
  FaInfoCircle,
  FaStar,
  FaMapMarkerAlt,
  FaBriefcase
} from 'react-icons/fa';
import { IoMdAlert } from 'react-icons/io';
import DatePicker from 'react-datepicker';
import { registerLocale } from "react-datepicker";
import fr from 'date-fns/locale/fr';
import 'react-datepicker/dist/react-datepicker.css';
import { motion } from 'framer-motion';

// Register the French locale for the date picker
registerLocale('fr', fr);

const Reservation = () => {
  const { serviceId, prestataireId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const stripe = useStripe();
  const elements = useElements();

  // State Management
  const [service, setService] = useState(null);
  const [prestataire, setPrestataire] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    notes: ''
  });
  const [price, setPrice] = useState(0);

  const availableTimes = [
    '08:00', '09:00', '10:00', '11:00',
    '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  // Data Fetching Effect
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let serviceData;
        
        // Use data from navigation state if available, otherwise fetch
        if (location.state?.service) {
          serviceData = location.state.service;
        } else {
          const serviceRes = await axios.get(`http://localhost:5000/api/services/${serviceId}`);
          serviceData = serviceRes.data.data;
        }
        
        setService(serviceData);
        setPrice(serviceData.price || serviceData.startingPrice || 0);

        // If service is 'devis', card payment is not an initial option
        if (serviceData.pricingType === 'devis') {
          setPaymentMethod('cash');
        }

        const prestataireRes = await axios.get(`http://localhost:5000/api/auth/user/${prestataireId}`);
        setPrestataire(prestataireRes.data);

      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Erreur de chargement des informations.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [serviceId, prestataireId, location.state]);

  // Form Input Handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Form Submission Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const bookingData = {
        service: serviceId,
        prestataire: prestataireId,
        date: selectedDate,
        time: selectedTime,
        paymentMethod,
        pricingType: service.pricingType,
        clientDetails: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          notes: formData.notes
        }
      };

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentification requise pour réserver.');
      }
console.log('Token:', token);
    console.log('Booking data:', bookingData);
      // 1. Create booking
      const response = await axios.post('http://localhost:5000/api/bookings', {
      service: serviceId,
      prestataire: prestataireId,
      date: selectedDate,
      time: selectedTime,
      paymentMethod,
      pricingType: service.pricingType,
      clientDetails: formData
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      // Ajoutez ceci pour mieux capturer les erreurs
      validateStatus: function (status) {
        return status < 500; // Reject only if status is >= 500
      }
    });

      // 2. Handle Stripe payment if card payment selected
      if (paymentMethod === 'card' && response.data.clientSecret) {
        if (!stripe || !elements) {
          throw new Error("Stripe n'est pas prêt. Veuillez rafraîchir la page.");
        }
        
        const cardElement = elements.getElement(CardElement);
        
        const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
          response.data.clientSecret,
          {
            payment_method: {
              card: cardElement,
              billing_details: {
                name: formData.name,
                email: formData.email,
                address: {
                  line1: formData.address
                }
              }
            }
          }
        );

        if (stripeError) {
          throw stripeError;
        }

        // 3. Update payment status if successful
        if (paymentIntent.status === 'succeeded') {
          await axios.patch(
            `http://localhost:5000/api/bookings/${response.data.booking._id}/payment-status`,
            { status: 'paid' },
            { headers: { 'Authorization': `Bearer ${token}` } }
          );
        }
      }

      setStep(3); // Move to confirmation
    } catch (error) {
      console.error('Erreur lors de la réservation:', error);
      setError(error.response?.data?.error || error.message || "Une erreur est survenue lors de la réservation.");
    } finally {
      setLoading(false);
    }
  };

  // Loading State
  if (loading && step !== 2) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement en cours...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error && step !== 2) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <div className="text-red-500 mb-4 flex justify-center"><IoMdAlert size={48} /></div>
          <h3 className="text-xl font-medium text-gray-800 mb-4">Une erreur est survenue</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button onClick={() => navigate(-1)} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Retour</button>
        </div>
      </div>
    );
  }

  // Data Missing State
  if (!service || !prestataire) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <div className="text-yellow-500 mb-4 flex justify-center"><FaInfoCircle size={48} /></div>
          <h3 className="text-xl font-medium text-gray-800 mb-4">Données manquantes</h3>
          <p className="text-gray-600 mb-6">Impossible de charger les informations de réservation.</p>
          <button onClick={() => navigate('/services')} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Voir les services</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-6">
          <h1 className="text-2xl font-bold mb-4">Réservation de service</h1>
          <div className="flex justify-between">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="text-center">
                <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center transition-all ${step >= stepNumber ? 'bg-white text-blue-600 scale-110' : 'bg-blue-400 text-white'}`}>
                  {stepNumber === 3 && step === 3 ? <FaCheckCircle/> : stepNumber}
                </div>
                <span className={`text-sm mt-2 transition-all ${step >= stepNumber ? 'font-medium' : 'opacity-80'}`}>
                  {stepNumber === 1 ? 'Date & Heure' : stepNumber === 2 ? 'Informations' : 'Confirmation'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 md:p-8">
          {step === 1 && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Choisissez la date et l'heure</h2>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/2 flex justify-center">
                  <DatePicker
                    selected={selectedDate}
                    onChange={date => { setSelectedDate(date); setSelectedTime(''); }}
                    minDate={new Date()}
                    inline
                    className="border rounded-lg p-2"
                    locale="fr"
                  />
                </div>
                
                <div className="w-full md:w-1/2">
                  {selectedDate ? (
                    <>
                      <div className="mb-6">
                        <label className="block text-gray-700 mb-2 flex items-center"><FaClock className="mr-2 text-blue-500" /> Heure</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {availableTimes.map(time => (
                            <motion.button
                              key={time}
                              type="button"
                              onClick={() => setSelectedTime(time)}
                              whileTap={{ scale: 0.95 }}
                              className={`py-2 px-4 rounded-lg border text-center transition-all ${selectedTime === time ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-white border-gray-300 hover:border-blue-500 hover:bg-blue-50'}`}
                            >
                              {time}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg h-full flex items-center">
                      <div className="flex items-start">
                        <FaInfoCircle className="mt-1 mr-2 flex-shrink-0 text-yellow-500" />
                        <p>Veuillez sélectionner une date pour voir les heures disponibles.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <motion.button
                  onClick={() => setStep(2)}
                  disabled={!selectedDate || !selectedTime}
                  whileTap={{ scale: 0.95 }}
                  className={`px-8 py-3 rounded-lg font-medium transition-all ${!selectedDate || !selectedTime ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'}`}
                >
                  Continuer
                </motion.button>
              </div>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit}>
              <h2 className="text-xl font-semibold mb-6">Vos informations et paiement</h2>
              {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-6" role="alert">{error}</div>}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-4">Méthode de paiement</h3>
                    {service.pricingType === 'fixed' ? (
                      <>
                        <div className="flex space-x-4 mb-4">
                          <motion.button 
                            type="button" 
                            onClick={() => setPaymentMethod('card')} 
                            className={`flex-1 py-3 px-4 rounded-lg border flex items-center justify-center transition-all ${paymentMethod === 'card' ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-inner' : 'border-gray-300 hover:border-blue-400'}`}
                          >
                            <FaCreditCard className="mr-2" /> Carte bancaire
                          </motion.button>
                          <motion.button 
                            type="button" 
                            onClick={() => setPaymentMethod('cash')} 
                            className={`flex-1 py-3 px-4 rounded-lg border flex items-center justify-center transition-all ${paymentMethod === 'cash' ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-inner' : 'border-gray-300 hover:border-blue-400'}`}
                          >
                            <FaMoneyBillWave className="mr-2" /> Espèces
                          </motion.button>
                        </div>
                        {paymentMethod === 'card' && (
                          <div className="p-3 border border-gray-300 rounded-lg bg-gray-50">
                            <CardElement 
                              options={{ 
                                style: { 
                                  base: { 
                                    fontSize: '16px', 
                                    color: '#424770', 
                                    '::placeholder': { color: '#aab7c4' } 
                                  }, 
                                  invalid: { color: '#9e2146' } 
                                } 
                              }} 
                            />
                            <p className="text-xs text-gray-500 mt-1">Utilisez 4242 4242 4242 4242 pour les tests.</p>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-blue-800">
                        <div className="flex items-start">
                          <FaInfoCircle className="mt-1 mr-2 flex-shrink-0 text-blue-500" />
                          <p>Ce service est sur devis. La réservation sera confirmée sans paiement initial. Le prestataire vous contactera pour le prix.</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-4">Coordonnées</h3>
                  <div className="space-y-4">
                    <input 
                      type="text" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleInputChange} 
                      placeholder="Nom complet" 
                      className="w-full p-3 border border-gray-300 rounded-lg" 
                      required 
                    />
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleInputChange} 
                      placeholder="Email" 
                      className="w-full p-3 border border-gray-300 rounded-lg" 
                      required 
                    />
                    <input 
                      type="tel" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleInputChange} 
                      placeholder="Téléphone" 
                      className="w-full p-3 border border-gray-300 rounded-lg" 
                      required 
                    />
                    <input 
                      type="text" 
                      name="address" 
                      value={formData.address} 
                      onChange={handleInputChange} 
                      placeholder="Adresse" 
                      className="w-full p-3 border border-gray-300 rounded-lg" 
                      required 
                    />
                    <textarea 
                      name="notes" 
                      value={formData.notes} 
                      onChange={handleInputChange} 
                      placeholder="Notes supplémentaires..." 
                      className="w-full p-3 border border-gray-300 rounded-lg" 
                      rows="2"
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex justify-between items-center">
                <motion.button 
                  type="button" 
                  onClick={() => setStep(1)} 
                  whileTap={{ scale: 0.95 }} 
                  className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50"
                >
                  Retour
                </motion.button>
                <motion.button 
                  type="submit" 
                  whileTap={{ scale: 0.95 }} 
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-md disabled:opacity-50" 
                  disabled={loading}
                >
                  {loading ? 'Traitement...' : 'Confirmer la réservation'}
                </motion.button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="text-center py-8">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }} 
                className="bg-green-50 text-green-800 p-6 rounded-lg max-w-md mx-auto mb-8"
              >
                <FaCheckCircle size={48} className="mx-auto text-green-500 mb-4" />
                <h2 className="text-2xl font-bold mb-2">Réservation confirmée !</h2>
                <p>Votre demande de réservation a été envoyée au prestataire. Vous recevrez une notification de confirmation.</p>
              </motion.div>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <motion.button 
                  onClick={() => navigate('/Reservations-Client')} 
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-md"
                >
                  Voir mes réservations
                </motion.button>
                <motion.button 
                  onClick={() => navigate('/')} 
                  className="px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-medium"
                >
                  Retour à l'accueil
                </motion.button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Reservation;