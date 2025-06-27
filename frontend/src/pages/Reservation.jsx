import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { FaCalendarAlt, FaClock, FaUser, FaCreditCard, FaMoneyBillWave } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Reservation = () => {
  const { serviceId, prestataireId } = useParams();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  // États
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

  // Horaires disponibles
  const availableTimes = [
    '08:00', '09:00', '10:00', '11:00',
    '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  // Chargement des données initiales
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [serviceRes, prestataireRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/services/${serviceId}`),
          axios.get(`http://localhost:5000/api/auth/user/${prestataireId}`)
        ]);
        
        if (!serviceRes.data || !prestataireRes.data) {
          throw new Error('Données manquantes');
        }

        setService(serviceRes.data);
        setPrestataire(prestataireRes.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Erreur de chargement');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [serviceId, prestataireId]);

  // Gestion des changements de formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  
  try {
    const bookingRes = await axios.post('http://localhost:5000/api/bookings', {
      service: serviceId,
      prestataire: prestataireId,
      date: selectedDate,
      time: selectedTime,
      client: { // Objet client complet
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address
      },
      paymentMethod,
    });

    setStep(3); // Confirmation
  } catch (error) {
    setError(error.response?.data?.error || "Erreur lors de la réservation");
  } finally {
    setLoading(false);
  }
};
  // Gestion des erreurs
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

  // Vérification des données
  if (!service || !prestataire) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h3 className="text-xl font-medium text-red-600 mb-4">Données manquantes</h3>
          <button
            onClick={() => navigate('/services')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Voir les services
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Étapes de progression */}
        <div className="bg-blue-600 text-white p-6">
          <h1 className="text-2xl font-bold mb-4">Réservation de service</h1>
          <div className="flex justify-between">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className={`text-center ${step >= stepNumber ? 'opacity-100' : 'opacity-50'}`}>
                <div className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center ${step >= stepNumber ? 'bg-white text-blue-600' : 'bg-blue-500'}`}>
                  {stepNumber}
                </div>
                <span className="text-sm mt-2">
                  {stepNumber === 1 ? 'Date & Heure' : stepNumber === 2 ? 'Informations' : 'Confirmation'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Contenu du formulaire */}
        <div className="p-6">
          {step === 1 ? (
            <div>
              <h2 className="text-xl font-semibold mb-6">Choisissez la date et l'heure</h2>
              
              <div className="flex flex-col md:flex-row gap-8">
                {/* Sélection de date */}
                <div className="md:w-1/2">
                  <div className="mb-6">
                    <label className="block text-gray-700 mb-2 flex items-center">
                      <FaCalendarAlt className="mr-2" /> Date
                    </label>
                    <DatePicker
                      selected={selectedDate}
                      onChange={date => {
                        setSelectedDate(date);
                        setSelectedTime('');
                      }}
                      minDate={new Date()}
                      inline
                      className="border rounded-lg p-2 w-full"
                      locale="fr"
                      dateFormat="P"
                    />
                  </div>
                </div>
                
                {/* Sélection d'heure */}
                <div className="md:w-1/2">
                  {selectedDate && (
                    <>
                      <div className="mb-6">
                        <label className="block text-gray-700 mb-2 flex items-center">
                          <FaClock className="mr-2" /> Heure
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {availableTimes.map(time => (
                            <button
                              key={time}
                              type="button"
                              onClick={() => setSelectedTime(time)}
                              className={`py-2 px-4 rounded-lg border ${selectedTime === time 
                                ? 'bg-blue-600 text-white border-blue-600' 
                                : 'bg-white border-gray-300 hover:border-blue-500'}`}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      {/* Récapitulatif */}
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-medium mb-3">Résumé</h3>
                        <div className="flex items-start mb-4">
                          <img 
                            src={prestataire.photo || prestataire.prestataireInfo?.documents?.photoProfil || '/default-profile.jpg'} 
                            alt={`${prestataire.prenom} ${prestataire.nom}`}
                            className="w-12 h-12 rounded-full object-cover mr-3"
                            onError={(e) => e.target.src = '/default-profile.jpg'}
                          />
                          <div>
                            <p className="font-medium">
                              {prestataire.prenom} {prestataire.nom}
                            </p>
                            <p className="text-sm text-gray-600">{service.title}</p>
                            <p className="text-sm font-semibold">{service.price} MAD</p>
                          </div>
                        </div>
                        
                        {selectedTime && (
                          <div className="border-t pt-3">
                            <p className="flex justify-between text-sm mb-1">
                              <span className="text-gray-600">Date:</span>
                              <span>{selectedDate.toLocaleDateString('fr-FR')}</span>
                            </p>
                            <p className="flex justify-between text-sm">
                              <span className="text-gray-600">Heure:</span>
                              <span>{selectedTime}</span>
                            </p>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  disabled={!selectedDate || !selectedTime}
                  className={`px-6 py-2 rounded-lg font-medium ${!selectedDate || !selectedTime 
                    ? 'bg-gray-300 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                >
                  Continuer
                </button>
              </div>
            </div>
          ) : step === 2 ? (
            <form onSubmit={handleSubmit}>
              <h2 className="text-xl font-semibold mb-6">Vos informations</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Méthode de paiement */}
                <div>
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-4">Méthode de paiement</h3>
                    <div className="flex space-x-4 mb-4">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`flex-1 py-3 px-4 rounded-lg border flex items-center justify-center ${paymentMethod === 'card' 
                          ? 'border-blue-600 bg-blue-50' 
                          : 'border-gray-300'}`}
                      >
                        <FaCreditCard className="mr-2" />
                        Carte bancaire
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('cash')}
                        className={`flex-1 py-3 px-4 rounded-lg border flex items-center justify-center ${paymentMethod === 'cash' 
                          ? 'border-blue-600 bg-blue-50' 
                          : 'border-gray-300'}`}
                      >
                        <FaMoneyBillWave className="mr-2" />
                        Espèces
                      </button>
                    </div>
                    
                    {paymentMethod === 'card' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-gray-700 mb-1">Détails de la carte</label>
                          <div className="p-3 border border-gray-300 rounded-lg">
                            <CardElement options={{
                              style: {
                                base: {
                                  fontSize: '16px',
                                  color: '#424770',
                                  '::placeholder': {
                                    color: '#aab7c4',
                                  },
                                },
                                invalid: {
                                  color: '#9e2146',
                                },
                              },
                            }} />
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Utilisez 4242 4242 4242 4242 pour les tests
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Informations personnelles */}
                <div>
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-4">Coordonnées</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-700 mb-1 flex items-center">
                          <FaUser className="mr-2" /> Nom complet
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">Téléphone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">Adresse</label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">Notes supplémentaires</label>
                        <textarea
                          name="notes"
                          value={formData.notes}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg"
                          rows="3"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-2 border border-gray-300 rounded-lg font-medium"
                >
                  Retour
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
                  disabled={loading}
                >
                  {loading ? 'Traitement...' : 'Confirmer la réservation'}
                </button>
              </div>
            </form>
          ) : (
            /* Étape de confirmation */
            <div className="text-center py-8">
              <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-lg max-w-md mx-auto mb-8">
                <svg className="w-16 h-16 mx-auto mb-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <h2 className="text-2xl font-bold mb-2">Réservation confirmée !</h2>
                <p>Votre réservation a été enregistrée avec succès.</p>
                {paymentMethod === 'card' && (
                  <p className="mt-2 text-sm">Le paiement a été traité.</p>
                )}
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-md mx-auto mb-8 text-left">
                <h3 className="font-medium text-gray-800 mb-4">Détails</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service:</span>
                    <span className="font-medium">{service.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Prestataire:</span>
                    <span className="font-medium">
                      {prestataire.prenom} {prestataire.nom}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">
                      {selectedDate.toLocaleDateString('fr-FR')} à {selectedTime}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Paiement:</span>
                    <span className="font-medium">
                      {paymentMethod === 'card' ? 'Carte bancaire' : 'Espèces'} - {service.price} MAD
                    </span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => navigate('/mes-reservations')}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
              >
                Voir mes réservations
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reservation;