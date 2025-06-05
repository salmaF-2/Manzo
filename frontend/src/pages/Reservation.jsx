// import { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { FaCalendarAlt, FaCreditCard, FaMoneyBillWave, FaCheck, FaSpinner } from 'react-icons/fa';
// import { motion } from 'framer-motion';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const Reservation = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const prestataireId = state?.prestataireId;
//   const serviceId = state?.serviceId;

//   const [step, setStep] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [prestataire, setPrestataire] = useState(null);
//   const [service, setService] = useState(null);
//   const [availableSlots, setAvailableSlots] = useState([]);

//   const [formData, setFormData] = useState({
//     date: null,
//     heureDebut: null,
//     client: '',
//     prestataire: prestataireId,
//     service: serviceId || '',
//     adresse: '',
//     statut: 'en_attente',
//     paymentMethod: 'card',
//     cardDetails: {
//       name: '',
//       number: '',
//       expiry: '',
//       cvc: ''
//     },
//     personalInfo: {
//       firstName: '',
//       lastName: '',
//       email: '',
//       phone: '',
//       address: '',
//       city: '',
//       postalCode: ''
//     }
//   });

//   // Sécurité : si pas d'ID, on redirige
//   useEffect(() => {
//     if (!prestataireId) {
//       toast.error('Aucun prestataire sélectionné');
//       navigate('/');
//     }
//   }, [prestataireId, navigate]);

//   // Charger les données
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);

//         const prestataireRes = await axios.get(`http://localhost:5000/api/users/${prestataireId}`);
//         setPrestataire(prestataireRes.data);

//         if (serviceId) {
//           const serviceRes = await axios.get(`http://localhost:5000/api/services/${serviceId}`);
//           setService(serviceRes.data);
//           setFormData(prev => ({ ...prev, service: serviceId }));
//         }

//         const slotsRes = await axios.get(`http://localhost:5000/api/bookings/availability/${prestataireId}`);
//         setAvailableSlots(slotsRes.data);

//       } catch (error) {
//         toast.error('Erreur lors du chargement des données');
//         console.error('Fetch error:', error);
//         navigate(-1);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (prestataireId) {
//       fetchData();
//     }
//   }, [prestataireId, serviceId, navigate]);

//   const handleSlotSelect = (date, time) => {
//     setFormData({
//       ...formData,
//       date: new Date(date),
//       heureDebut: time,
//       heureFin: calculateEndTime(time, service?.duration || 120)
//     });
//   };

//   const calculateEndTime = (startTime, duration) => {
//     const [hours, minutes] = startTime.split(':').map(Number);
//     const endDate = new Date();
//     endDate.setHours(hours + Math.floor(duration / 60));
//     endDate.setMinutes(minutes + (duration % 60));
//     return `${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`;
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       personalInfo: {
//         ...formData.personalInfo,
//         [name]: value
//       }
//     });
//   };

//   const handleCardChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       cardDetails: {
//         ...formData.cardDetails,
//         [name]: value
//       }
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const bookingData = {
//         client: formData.personalInfo.email,
//         prestataire: formData.prestataire,
//         service: formData.service,
//         date: formData.date,
//         heureDebut: formData.heureDebut,
//         heureFin: formData.heureFin,
//         adresse: `${formData.personalInfo.address}, ${formData.personalInfo.postalCode} ${formData.personalInfo.city}`,
//         statut: 'en_attente',
//         paymentMethod: formData.paymentMethod
//       };

//       const response = await axios.post('http://localhost:5000/api/bookings', bookingData);

//       if (formData.paymentMethod === 'card') {
//         const paymentResponse = await axios.post('http://localhost:5000/api/payments', {
//           bookingId: response.data._id,
//           cardDetails: formData.cardDetails,
//           amount: service?.price || 0
//         });

//         if (!paymentResponse.data.success) {
//           throw new Error('Échec du paiement');
//         }
//       }

//       setStep(4);

      
//       // Envoyer un email de confirmation
//       await axios.post('http://localhost:5000/api/email/confirmation', {
//         bookingId: response.data._id,
//         clientEmail: formData.personalInfo.email
//       });
      
//     } catch (error) {
//       toast.error('Erreur lors de la réservation');
//       console.error('Booking error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Grouper les créneaux par date
//   const slotsByDate = availableSlots.reduce((acc, slot) => {
//     const dateStr = new Date(slot.date).toISOString().split('T')[0];
//     if (!acc[dateStr]) acc[dateStr] = [];
//     acc[dateStr].push(slot.time);
//     return acc;
//   }, {});

//   const renderStep = () => {
//     if (loading) {
//       return (
//         <div className="flex justify-center items-center py-12">
//           <FaSpinner className="animate-spin text-4xl text-[#5869A3]" />
//         </div>
//       );
//     }

//     switch(step) {
//       case 1: // Sélection de la date/heure
//         return (
//           <div className="space-y-6">
//             <h2 className="text-2xl font-bold text-[#5869A3]">Choisissez une date</h2>
//             <div className="grid grid-cols-7 gap-2">
//               {Object.keys(slotsByDate).map(date => (
//                 <motion.button
//                   key={date}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => {
//                     setFormData({ ...formData, date: new Date(date) });
//                     setFormData(prev => ({ ...prev, heureDebut: null }));
//                   }}
//                   className={`p-3 rounded-lg ${
//                     formData.date && new Date(formData.date).toISOString().split('T')[0] === date 
//                       ? 'bg-[#5869A3] text-white' 
//                       : 'bg-gray-100'
//                   }`}
//                 >
//                   {new Date(date).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' })}
//                 </motion.button>
//               ))}
//             </div>

//             {formData.date && (
//               <>
//                 <h2 className="text-2xl font-bold text-[#5869A3] mt-8">Choisissez un horaire</h2>
//                 <div className="grid grid-cols-2 gap-3">
//                   {slotsByDate[new Date(formData.date).toISOString().split('T')[0]]?.map(time => (
//                     <motion.button
//                       key={time}
//                       whileHover={{ scale: 1.05 }}
//                       whileTap={{ scale: 0.95 }}
//                       onClick={() => handleSlotSelect(formData.date, time)}
//                       className={`p-3 rounded-lg ${
//                         formData.heureDebut === time 
//                           ? 'bg-[#5869A3] text-white' 
//                           : 'bg-gray-100'
//                       }`}
//                     >
//                       {time}
//                     </motion.button>
//                   ))}
//                 </div>
//               </>
//             )}

//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setStep(2)}
//               disabled={!formData.date || !formData.heureDebut}
//               className={`mt-6 w-full py-3 rounded-lg font-medium ${
//                 !formData.date || !formData.heureDebut 
//                   ? 'bg-gray-300 cursor-not-allowed' 
//                   : 'bg-[#5869A3] text-white'
//               }`}
//             >
//               Continuer
//             </motion.button>
//           </div>
//         );
      
//       case 2: // Informations personnelles
//         return (
//           <form onSubmit={(e) => { e.preventDefault(); setStep(3); }}>
//             <h2 className="text-2xl font-bold text-[#5869A3] mb-6">Vos informations</h2>
            
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//               <div>
//                 <label className="block text-gray-700 mb-1">Prénom</label>
//                 <input
//                   type="text"
//                   name="firstName"
//                   value={formData.personalInfo.firstName}
//                   onChange={handleInputChange}
//                   className="w-full p-3 border rounded-lg"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 mb-1">Nom</label>
//                 <input
//                   type="text"
//                   name="lastName"
//                   value={formData.personalInfo.lastName}
//                   onChange={handleInputChange}
//                   className="w-full p-3 border rounded-lg"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 mb-1">Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.personalInfo.email}
//                   onChange={handleInputChange}
//                   className="w-full p-3 border rounded-lg"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 mb-1">Téléphone</label>
//                 <input
//                   type="tel"
//                   name="phone"
//                   value={formData.personalInfo.phone}
//                   onChange={handleInputChange}
//                   className="w-full p-3 border rounded-lg"
//                   required
//                 />
//               </div>
//               <div className="md:col-span-2">
//                 <label className="block text-gray-700 mb-1">Adresse</label>
//                 <input
//                   type="text"
//                   name="address"
//                   value={formData.personalInfo.address}
//                   onChange={handleInputChange}
//                   className="w-full p-3 border rounded-lg"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 mb-1">Ville</label>
//                 <input
//                   type="text"
//                   name="city"
//                   value={formData.personalInfo.city}
//                   onChange={handleInputChange}
//                   className="w-full p-3 border rounded-lg"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 mb-1">Code postal</label>
//                 <input
//                   type="text"
//                   name="postalCode"
//                   value={formData.personalInfo.postalCode}
//                   onChange={handleInputChange}
//                   className="w-full p-3 border rounded-lg"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="flex justify-between">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 type="button"
//                 onClick={() => setStep(1)}
//                 className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg"
//               >
//                 Retour
//               </motion.button>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 type="submit"
//                 className="px-6 py-2 bg-[#5869A3] text-white rounded-lg"
//               >
//                 Continuer
//               </motion.button>
//             </div>
//           </form>
//         );
      
//       case 3: // Paiement
//         return (
//           <form onSubmit={handleSubmit}>
//             <h2 className="text-2xl font-bold text-[#5869A3] mb-6">Méthode de paiement</h2>
            
//             <div className="flex gap-4 mb-6">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 type="button"
//                 onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
//                 className={`flex-1 p-4 border rounded-lg flex flex-col items-center ${
//                   formData.paymentMethod === 'card' 
//                     ? 'border-[#5869A3] bg-[#5869A3]/10' 
//                     : 'border-gray-200'
//                 }`}
//               >
//                 <FaCreditCard className="text-2xl mb-2 text-[#5869A3]" />
//                 <span>Carte bancaire</span>
//               </motion.button>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 type="button"
//                 onClick={() => setFormData({ ...formData, paymentMethod: 'cash' })}
//                 className={`flex-1 p-4 border rounded-lg flex flex-col items-center ${
//                   formData.paymentMethod === 'cash' 
//                     ? 'border-[#5869A3] bg-[#5869A3]/10' 
//                     : 'border-gray-200'
//                 }`}
//               >
//                 <FaMoneyBillWave className="text-2xl mb-2 text-[#5869A3]" />
//                 <span>Espèces</span>
//               </motion.button>
//             </div>

//             {formData.paymentMethod === 'card' && (
//               <div className="space-y-4 mb-6">
//                 <div>
//                   <label className="block text-gray-700 mb-1">Nom du titulaire</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.cardDetails.name}
//                     onChange={handleCardChange}
//                     className="w-full p-3 border rounded-lg"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-gray-700 mb-1">Numéro de carte</label>
//                   <input
//                     type="text"
//                     name="number"
//                     value={formData.cardDetails.number}
//                     onChange={handleCardChange}
//                     className="w-full p-3 border rounded-lg"
//                     placeholder="1234 5678 9012 3456"
//                     required
//                   />
//                 </div>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-gray-700 mb-1">Date d'expiration</label>
//                     <input
//                       type="text"
//                       name="expiry"
//                       value={formData.cardDetails.expiry}
//                       onChange={handleCardChange}
//                       className="w-full p-3 border rounded-lg"
//                       placeholder="MM/AA"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-gray-700 mb-1">Cryptogramme</label>
//                     <input
//                       type="text"
//                       name="cvc"
//                       value={formData.cardDetails.cvc}
//                       onChange={handleCardChange}
//                       className="w-full p-3 border rounded-lg"
//                       placeholder="CVC"
//                       required
//                     />
//                   </div>
//                 </div>
//               </div>
//             )}

//             <div className="bg-gray-50 p-4 rounded-lg mb-6">
//               <h3 className="font-bold text-lg mb-2">Récapitulatif</h3>
//               <div className="space-y-2">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Service</span>
//                   <span>{service?.name || 'Non spécifié'}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Prestataire</span>
//                   <span>{prestataire?.name || 'Non spécifié'}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Date et heure</span>
//                   <span>
//                     {formData.date?.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} à {formData.heureDebut}
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Durée</span>
//                   <span>{service?.duration || 'Non spécifié'} minutes</span>
//                 </div>
//                 <div className="flex justify-between font-bold text-lg mt-2">
//                   <span>Total</span>
//                   <span>{service?.price || '0'}€</span>
//                 </div>
//               </div>
//             </div>

//             <div className="flex justify-between">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 type="button"
//                 onClick={() => setStep(2)}
//                 className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg"
//               >
//                 Retour
//               </motion.button>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 type="submit"
//                 disabled={loading}
//                 className="px-6 py-2 bg-[#5869A3] text-white rounded-lg flex items-center gap-2"
//               >
//                 {loading ? <FaSpinner className="animate-spin" /> : <FaCheck />}
//                 Confirmer la réservation
//               </motion.button>
//             </div>
//           </form>
//         );
      
//       case 4: // Confirmation
//         return (
//           <div className="text-center py-8">
//             <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
//               <FaCheck className="text-3xl text-green-600" />
//             </div>
//             <h2 className="text-3xl font-bold text-[#5869A3] mb-4">Réservation confirmée !</h2>
//             <p className="text-lg text-gray-600 mb-8">
//               Votre réservation a été enregistrée avec succès. Vous recevrez un email de confirmation.
//             </p>
            
//             <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md text-left mb-8">
//               <h3 className="font-bold text-xl mb-4 text-[#5869A3]">Récapitulatif</h3>
//               <div className="space-y-3">
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Service</span>
//                   <span className="font-medium">{service?.name || 'Non spécifié'}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Prestataire</span>
//                   <span className="font-medium">{prestataire?.name || 'Non spécifié'}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Date et heure</span>
//                   <span className="font-medium">
//                     {formData.date?.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} à {formData.heureDebut}
//                   </span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Durée</span>
//                   <span className="font-medium">{service?.duration || 'Non spécifié'} minutes</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-600">Mode de paiement</span>
//                   <span className="font-medium">
//                     {formData.paymentMethod === 'card' ? 'Carte bancaire' : 'Espèces'}
//                   </span>
//                 </div>
//                 <div className="flex justify-between border-t pt-3 mt-3">
//                   <span className="font-bold">Total</span>
//                   <span className="font-bold text-lg">{service?.price || '0'}€</span>
//                 </div>
//               </div>
//             </div>

//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => navigate('/')}
//               className="px-6 py-3 bg-[#5869A3] text-white rounded-lg font-medium"
//             >
//               Retour à l'accueil
//             </motion.button>
//           </div>
//         );
      
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 sm:p-8">
//         <h1 className="text-3xl font-bold text-center text-[#5869A3] mb-8">
//           {step < 4 ? 'Réservation' : 'Confirmation'}
//         </h1>
        
//         {renderStep()}
//       </div>
//     </div>
//   );
// };

// export default Reservation;


{/* Step Content */}

import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  FaStar, FaCalendarAlt, FaClock, FaCreditCard, 
  FaMoneyBillWave, FaUser, FaMapMarkerAlt, 
  FaPhone, FaEnvelope, FaArrowLeft 
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../utils/motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const ReservationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { prestataireId, serviceId } = location.state || {};
  
  // États pour le formulaire
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    postalCode: user?.postalCode || '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [error, setError] = useState(null);
  const [prestataire, setPrestataire] = useState(null);
  const [service, setService] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [isDateSelected, setIsDateSelected] = useState(false);

  // Créneaux horaires par défaut (seront remplacés par les disponibilités réelles)
  const defaultTimes = [
    '08:00', '09:00', '10:00', '11:00',
    '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  // Charger les données du prestataire, du service et des disponibilités
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Récupérer les infos du prestataire
        const prestataireResponse = await axios.get(`http://localhost:5000/api/users/${prestataireId}`);
        setPrestataire(prestataireResponse.data);
        
        // Récupérer les infos du service
        const serviceResponse = await axios.get(`http://localhost:5000/api/services/${serviceId}`);
        setService(serviceResponse.data);
        
        // Pré-remplir les infos utilisateur si disponible
        if (user) {
          setFormData(prev => ({
            ...prev,
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            email: user.email || '',
            phone: user.phone || '',
            address: user.address || '',
            city: user.city || '',
            postalCode: user.postalCode || ''
          }));
        }
        
        setIsLoading(false);
      } catch (err) {
        console.error("Erreur lors du chargement des données:", err);
        setError("Erreur lors du chargement des données");
        setIsLoading(false);
        toast.error("Erreur lors du chargement des données");
      }
    };

    if (prestataireId && serviceId) {
      fetchData();
    } else {
      navigate('/'); // Rediriger si les paramètres sont manquants
    }
  }, [prestataireId, serviceId, user, navigate]);

  // Charger les disponibilités lorsque la date est sélectionnée
  useEffect(() => {
    const fetchAvailability = async () => {
      if (selectedDate) {
        try {
          setIsLoading(true);
          // Ici vous devriez appeler votre endpoint API pour les disponibilités
          // Pour l'exemple, nous utilisons les créneaux par défaut
          setAvailableTimes(defaultTimes);
          setIsDateSelected(true);
          setIsLoading(false);
        } catch (err) {
          console.error("Erreur lors du chargement des disponibilités:", err);
          toast.error("Erreur lors du chargement des disponibilités");
          setIsLoading(false);
        }
      }
    };

    fetchAvailability();
  }, [selectedDate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\s/g, '');
    if (value.length > 16) value = value.substring(0, 16);
    value = value.replace(/(\d{4})/g, '$1 ').trim();
    setFormData(prev => ({
      ...prev,
      cardNumber: value
    }));
  };

  const handleCardExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.substring(0, 4);
    if (value.length > 2) value = value.replace(/^(\d{2})/, '$1/');
    setFormData(prev => ({
      ...prev,
      cardExpiry: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // Validation des champs requis
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || 
          !formData.address || !formData.city || !formData.postalCode) {
        throw new Error("Veuillez remplir tous les champs obligatoires");
      }

      if (paymentMethod === 'card' && (!formData.cardNumber || !formData.cardExpiry || !formData.cardCvc)) {
        throw new Error("Veuillez remplir tous les détails de la carte");
      }

      // Préparer les données pour le backend
      const bookingData = {
        client: user._id,
        prestataire: prestataireId,
        service: serviceId,
        date: selectedDate,
        heureDebut: selectedTime,
        heureFin: calculateEndTime(selectedTime, service.duree),
        adresse: `${formData.address}, ${formData.postalCode} ${formData.city}`,
        statut: 'en_attente',
        devis: {
          montant: service.prix,
          details: service.description,
          accepte: false
        },
        paymentMethod: paymentMethod === 'card' ? 'credit_card' : 'cash'
      };

      // Envoyer la requête au backend
      const response = await axios.post('http://localhost:5000/api/bookings', bookingData, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });

      setIsLoading(false);
      setStep(3); // Afficher la confirmation
      toast.success("Réservation confirmée avec succès!");
    } catch (err) {
      console.error("Erreur lors de la réservation:", err.response?.data || err.message);
      setError(err.response?.data?.message || err.message || "Une erreur est survenue lors de la réservation");
      setIsLoading(false);
      toast.error(err.response?.data?.message || err.message || "Erreur lors de la réservation");
    }
  };

  // Calculer l'heure de fin en fonction de la durée du service
  const calculateEndTime = (startTime, durationMinutes) => {
    const [hours, minutes] = startTime.split(':').map(Number);
    const startDate = new Date();
    startDate.setHours(hours, minutes, 0, 0);
    
    const endDate = new Date(startDate.getTime() + durationMinutes * 60000);
    return `${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`;
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('fr-FR', { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long',
      year: 'numeric'
    });
  };

  if (!prestataire || !service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5869A3]"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100"
    >
      <main className="container mx-auto px-4 py-8 pt-32 max-w-4xl">
        <motion.div variants={fadeIn('down', 'spring', 0.2, 1)} className="mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-[#5869A3] hover:text-[#48578A] transition-all duration-300"
          >
            <FaArrowLeft className="mr-2" />
            Retour aux prestataires
          </button>
        </motion.div>

        {error && (
          <motion.div 
            variants={fadeIn('down', 'spring', 0.2, 1)} 
            className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg mb-6"
          >
            {error}
          </motion.div>
        )}

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* En-tête avec progression */}
          <div className="bg-[#5869A3] text-white p-6">
            <h1 className="text-2xl font-bold mb-2">Réserver un service</h1>
            <div className="flex justify-between items-center mt-6">
              <div className={`flex flex-col items-center ${step >= 1 ? 'opacity-100' : 'opacity-50'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-white text-[#5869A3]' : 'bg-[#48578A]'}`}>
                  1
                </div>
                <span className="text-sm mt-2">Date & Heure</span>
              </div>
              <div className={`flex flex-col items-center ${step >= 2 ? 'opacity-100' : 'opacity-50'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-white text-[#5869A3]' : 'bg-[#48578A]'}`}>
                  2
                </div>
                <span className="text-sm mt-2">Paiement</span>
              </div>
              <div className={`flex flex-col items-center ${step >= 3 ? 'opacity-100' : 'opacity-50'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-white text-[#5869A3]' : 'bg-[#48578A]'}`}>
                  3
                </div>
                <span className="text-sm mt-2">Confirmation</span>
              </div>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="p-6 md:p-8">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Choisissez une date et une heure</h2>
                
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Section calendrier */}
                  <div className="md:w-1/2">
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2 flex items-center">
                        <FaCalendarAlt className="mr-2 text-[#5869A3]" />
                        Sélectionnez une date
                      </label>
                      <DatePicker
                        selected={selectedDate}
                        onChange={(date) => {
                          setSelectedDate(date);
                          setSelectedTime('');
                        }}
                        minDate={new Date()}
                        inline
                        className="border rounded-lg p-2 w-full"
                        locale="fr"
                        filterDate={(date) => {
                          // Filtrer les weekends (optionnel)
                          const day = date.getDay();
                          return day !== 0 && day !== 6;
                        }}
                      />
                    </div>
                  </div>
                  
                  {/* Section heure et résumé */}
                  <div className="md:w-1/2">
                    {selectedDate && (
                      <>
                        <div className="mb-6">
                          <label className="block text-gray-700 mb-2 flex items-center">
                            <FaClock className="mr-2 text-[#5869A3]" />
                            Sélectionnez une heure
                          </label>
                          {isLoading ? (
                            <div className="flex justify-center py-8">
                              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#5869A3]"></div>
                            </div>
                          ) : (
                            <div className="grid grid-cols-2 gap-3">
                              {availableTimes.map(time => (
                                <button
                                  key={time}
                                  onClick={() => setSelectedTime(time)}
                                  className={`py-2 px-4 rounded-lg border ${selectedTime === time ? 'bg-[#5869A3] text-white border-[#5869A3]' : 'bg-white border-gray-300 hover:border-[#5869A3]'}`}
                                >
                                  {time}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h3 className="font-medium text-gray-800 mb-3">Résumé de la réservation</h3>
                          <div className="flex items-start mb-4">
                            <img 
                              src={prestataire.photo || '/profile.jpg'} 
                              alt={prestataire.nom} 
                              className="w-12 h-12 rounded-full object-cover mr-3"
                            />
                            <div>
                              <p className="font-medium">{prestataire.nom}</p>
                              <p className="text-sm text-gray-600">{service.nom}</p>
                              <div className="flex items-center mt-1">
                                <FaStar className="text-yellow-400 mr-1 text-sm" />
                                <span className="text-sm">{prestataire.rating || 4.8}</span>
                              </div>
                            </div>
                          </div>
                          {selectedDate && selectedTime && (
                            <div className="border-t pt-3">
                              <p className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600">Date:</span>
                                <span className="font-medium">{formatDate(selectedDate)}</span>
                              </p>
                              <p className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600">Heure:</span>
                                <span className="font-medium">{selectedTime} - {calculateEndTime(selectedTime, service.duree)}</span>
                              </p>
                              <p className="flex justify-between text-sm">
                                <span className="text-gray-600">Durée:</span>
                                <span className="font-medium">{service.duree} minutes</span>
                              </p>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                    
                    {!selectedDate && (
                      <div className="bg-blue-50 border border-blue-100 text-blue-800 p-4 rounded-lg">
                        <p>Veuillez sélectionner une date pour voir les créneaux disponibles</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end">
                  <button
                    onClick={() => setStep(2)}
                    disabled={!selectedDate || !selectedTime}
                    className={`px-6 py-3 rounded-lg font-medium ${!selectedDate || !selectedTime ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#5869A3] hover:bg-[#48578A] text-white'}`}
                  >
                    Continuer
                  </button>
                </div>
              </motion.div>
            )}
            
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Méthode de paiement</h2>
                
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Section paiement */}
                  <div className="md:w-1/2">
                    <div className="mb-6">
                      <div className="flex space-x-4 mb-4">
                        <button
                          onClick={() => setPaymentMethod('card')}
                          className={`flex-1 py-3 px-4 rounded-lg border flex items-center justify-center ${paymentMethod === 'card' ? 'border-[#5869A3] bg-[#5869A3]/10' : 'border-gray-300'}`}
                        >
                          <FaCreditCard className="mr-2" />
                          Carte bancaire
                        </button>
                        <button
                          onClick={() => setPaymentMethod('cash')}
                          className={`flex-1 py-3 px-4 rounded-lg border flex items-center justify-center ${paymentMethod === 'cash' ? 'border-[#5869A3] bg-[#5869A3]/10' : 'border-gray-300'}`}
                        >
                          <FaMoneyBillWave className="mr-2" />
                          Espèces
                        </button>
                      </div>
                      
                      {paymentMethod === 'card' && (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-gray-700 mb-1">Numéro de carte</label>
                            <input
                              type="text"
                              name="cardNumber"
                              value={formData.cardNumber}
                              onChange={handleCardNumberChange}
                              placeholder="1234 5678 9012 3456"
                              className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#5869A3] focus:ring-1 focus:ring-[#5869A3]"
                              maxLength="19"
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-gray-700 mb-1">Date d'expiration</label>
                              <input
                                type="text"
                                name="cardExpiry"
                                value={formData.cardExpiry}
                                onChange={handleCardExpiryChange}
                                placeholder="MM/AA"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#5869A3] focus:ring-1 focus:ring-[#5869A3]"
                                maxLength="5"
                              />
                            </div>
                            <div>
                              <label className="block text-gray-700 mb-1">Cryptogramme</label>
                              <input
                                type="text"
                                name="cardCvc"
                                value={formData.cardCvc}
                                onChange={handleInputChange}
                                placeholder="CVC"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#5869A3] focus:ring-1 focus:ring-[#5869A3]"
                                maxLength="3"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {paymentMethod === 'cash' && (
                        <div className="bg-yellow-50 border border-yellow-100 text-yellow-800 p-4 rounded-lg">
                          <p>Vous paierez en espèces directement au prestataire lors de la prestation.</p>
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Vos informations</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-700 mb-1 flex items-center">
                            <FaUser className="mr-2 text-[#5869A3] text-sm" />
                            Prénom
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#5869A3] focus:ring-1 focus:ring-[#5869A3]"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 mb-1">Nom</label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#5869A3] focus:ring-1 focus:ring-[#5869A3]"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 mb-1 flex items-center">
                          <FaEnvelope className="mr-2 text-[#5869A3] text-sm" />
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#5869A3] focus:ring-1 focus:ring-[#5869A3]"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 mb-1 flex items-center">
                          <FaPhone className="mr-2 text-[#5869A3] text-sm" />
                          Téléphone
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#5869A3] focus:ring-1 focus:ring-[#5869A3]"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 mb-1 flex items-center">
                          <FaMapMarkerAlt className="mr-2 text-[#5869A3] text-sm" />
                          Adresse
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#5869A3] focus:ring-1 focus:ring-[#5869A3]"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-700 mb-1">Code postal</label>
                          <input
                            type="text"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#5869A3] focus:ring-1 focus:ring-[#5869A3]"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 mb-1">Ville</label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#5869A3] focus:ring-1 focus:ring-[#5869A3]"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Section résumé */}
                  <div className="md:w-1/2">
                    <div className="bg-gray-50 p-6 rounded-lg sticky top-4">
                      <h3 className="font-medium text-gray-800 mb-4">Récapitulatif</h3>
                      
                      <div className="flex items-start mb-6">
                        <img 
                          src={prestataire.photo || '/profile.jpg'} 
                          alt={prestataire.nom} 
                          className="w-14 h-14 rounded-full object-cover mr-4"
                        />
                        <div>
                          <p className="font-medium">{prestataire.nom}</p>
                          <p className="text-sm text-gray-600">{service.nom}</p>
                          <div className="flex items-center mt-1">
                            <FaStar className="text-yellow-400 mr-1 text-sm" />
                            <span className="text-sm">{prestataire.rating || 4.8}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Date:</span>
                          <span className="font-medium">{formatDate(selectedDate)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Heure:</span>
                          <span className="font-medium">{selectedTime} - {calculateEndTime(selectedTime, service.duree)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Durée:</span>
                          <span className="font-medium">{service.duree} minutes</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Paiement:</span>
                          <span className="font-medium">
                            {paymentMethod === 'card' ? 'Carte bancaire' : 'Espèces'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="border-t pt-4">
                        <div className="flex justify-between font-bold text-lg">
                          <span>Total:</span>
                          <span>{service.prix}€</span>
                        </div>
                      </div>
                      
                      <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="w-full mt-6 bg-[#5869A3] hover:bg-[#48578A] text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center"
                      >
                        {isLoading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Traitement...
                          </>
                        ) : (
                          "Confirmer la réservation"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-8"
              >
                <div className="bg-green-50 border border-green-100 text-green-800 p-6 rounded-lg max-w-md mx-auto mb-8">
                  <svg className="w-16 h-16 mx-auto mb-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <h2 className="text-2xl font-bold mb-2">Réservation confirmée !</h2>
                  <p className="mb-4">Votre réservation a bien été enregistrée.</p>
                  <p className="text-sm">
                    Un email de confirmation a été envoyé à <span className="font-medium">{formData.email}</span>
                  </p>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-md mx-auto mb-8 text-left">
                  <h3 className="font-medium text-gray-800 mb-4">Détails de la réservation</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Prestataire:</span>
                      <span className="font-medium">{prestataire.nom}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service:</span>
                      <span className="font-medium">{service.nom}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">{formatDate(selectedDate)} à {selectedTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Durée:</span>
                      <span className="font-medium">{service.duree} minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Adresse:</span>
                      <span className="font-medium text-right">{formData.address}, {formData.postalCode} {formData.city}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Paiement:</span>
                      <span className="font-medium">
                        {paymentMethod === 'card' ? 'Carte bancaire' : 'Espèces'} - {service.prix}€
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => navigate('/')}
                    className="px-6 py-3 bg-[#5869A3] hover:bg-[#48578A] text-white rounded-lg font-medium"
                  >
                    Retour à l'accueil
                  </button>
                  <button
                    onClick={() => navigate('/mes-reservations')}
                    className="px-6 py-3 bg-white border border-[#5869A3] text-[#5869A3] hover:bg-[#5869A3]/10 rounded-lg font-medium"
                  >
                    Voir mes réservations
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </motion.div>
  );
};

export default ReservationPage;