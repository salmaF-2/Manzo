import React, { useState, useEffect } from 'react';
import { X, ChevronDown, Eye, EyeOff, Info} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import FileUpload from '../auth/FileUpload.js';
import { toast } from 'sonner';
import axios from 'axios';

const PopUp = ({ isOpen, onClose }) => {
  // recuperer les city 
  const [cities, setCities] = useState([]);
  useEffect(() => {
  const fetchCities = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/cities');
      setCities(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des villes:', error);
      toast.error('Erreur lors du chargement des villes');
    }
  };

  if (isOpen) {
    fetchCities();
  }
}, [isOpen]);
  
  const [uploadedFiles, setUploadedFiles] = useState({
    cin: null,
    rib: null,
    certifications: [],
    carteAE: null,
    photoProfil: null,
    videoPresentation: null
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    confirmPassword: '',
    telephone: '',
    ville: '',
    genre: '',
    dateNaissance: '',
    adresse: '',
    experience: '',
    secteurActivite: '',
    tarification: '',
    methodePaiement: '',
    nomCarte: '',
    numeroCarte: '',
    dateExpiration: '',
    cvc: '',
    acceptConditions: false
  });

  const handleFileChange = (file, fieldName) => {
    if (fieldName === 'certifications') {
      setUploadedFiles(prev => ({
        ...prev,
        certifications: [...prev.certifications, file]
      }));
    } else {
      setUploadedFiles(prev => ({
        ...prev,
        [fieldName]: file
      }));
    }
  };
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);


  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

   const handleExperienceSelect = (value) => {
    setFormData(prev => ({
      ...prev,
      experience: value
    }));
  };


// const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     const formData = new FormData();
//     // const formInputs = { ...formData };

//     // Remplace ceci par ton vrai état ou tes valeurs du formulaire
//     const formInputs = {
//       nom :formData.nom,
//       prenom : formData.prenom,
//       email : formData.email,
//       password :formData.password,
//       confirmPassword : formData.confirmPassword,
//       telephone :formData.telephone,
//       ville :formData.ville,
//       genre : formData.genre,
//       dateNaissance : formData.dateNaissance,
//       adresse :formData.adresse,
//       experience : formData.experience,
//       secteurActivite : formData.secteurActivite,
//       tarification : formData.tarification,
//       methodePaiement : formData.methodePaiement,
//       acceptConditions :formData.acceptConditions,
//       nomCarte :formData.nomCarte,
//       numeroCarte :formData.numeroCarte,
//       dateExpiration : formData.dateExpiration,
//       cvc : formData.cvc
//     };
    

//     // Ajoute les champs texte
//     for (const [key, value] of Object.entries(formInputs)) {
//       if (value !== undefined && value !== null) {
//         formData.append(key, value);
//       }
//     }

//     // Ajoute les fichiers
//     if (uploadedFiles.cin) formData.append('cin', uploadedFiles.cin);
//     if (uploadedFiles.rib) formData.append('rib', uploadedFiles.rib);
//     if (uploadedFiles.carteAE) formData.append('carteAE', uploadedFiles.carteAE);
//     if (uploadedFiles.photoProfil) formData.append('photoProfil', uploadedFiles.photoProfil);
//     if (uploadedFiles.videoPresentation) formData.append('videoPresentation', uploadedFiles.videoPresentation);

//     if (uploadedFiles.certifications && uploadedFiles.certifications.length > 0) {
//       uploadedFiles.certifications.forEach(file => {
//         formData.append('certifications', file);
//       });
//     }

//     const response = await fetch('http://localhost:5000/api/auth/register/prestataire', {
//       method: 'POST',
//       body: formData
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(data.message || "Erreur lors de l'inscription");
//     }

//     toast.success(data.message);
//     setIsSubmitted(true);

//   } catch (error) {
//     console.error('Erreur:', error);
//     toast.error(error.message || "Une erreur est survenue");
//   }
// };


const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formDataToSend = new FormData();

    // Ajouter tous les champs du formulaire
    Object.keys(formData).forEach(key => {
      if (formData[key] !== undefined && formData[key] !== null) {
        formDataToSend.append(key, formData[key]);
      }
    });

    // Ajouter les fichiers
    if (uploadedFiles.cin) formDataToSend.append('cin', uploadedFiles.cin);
    if (uploadedFiles.rib) formDataToSend.append('rib', uploadedFiles.rib);
    if (uploadedFiles.carteAE) formDataToSend.append('carteAE', uploadedFiles.carteAE);
    if (uploadedFiles.photoProfil) formDataToSend.append('photoProfil', uploadedFiles.photoProfil);
    if (uploadedFiles.videoPresentation) formDataToSend.append('videoPresentation', uploadedFiles.videoPresentation);

    // Ajouter les certifications
    if (uploadedFiles.certifications && uploadedFiles.certifications.length > 0) {
      uploadedFiles.certifications.forEach((file, index) => {
        formDataToSend.append(`certifications`, file);
      });
    }

    const response = await fetch('http://localhost:5000/api/auth/register/prestataire', {
      method: 'POST',
      body: formDataToSend
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Erreur lors de l'inscription");
    }

    const data = await response.json();
    toast.success(data.message);
    setIsSubmitted(true);

  } catch (error) {
    console.error('Erreur:', error);
    toast.error(error.message || "Une erreur est survenue");
  }
};


useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => {
        onClose();
        navigate('/');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSubmitted, onClose, navigate]);

  if (!isOpen) return null;

  const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, 3));
  const handlePrev = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  // if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <div className="relative bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
      {!isSubmitted ? (
        <>
        <button 
          className="absolute top-3 right-3 text-sm text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className="text-[#4A5B8C] text-sm hover:text-[#3a4a7a] font-medium text-left"> 
        {currentStep > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                className="text-sm text-[#4A5B8C] hover:text-[#3a4a7a] font-medium text-left"
              >
                 ← Retour
              </button>
            )}
        </div>
        <div className="text-sm text-center mb-6">
          <h2 className="text-2xl font-bold mb-1">Inscription Prestataire</h2>
          <p className="text-sm text-gray-600">
            Vous avez déjà un compte ? <Link to='/Seconnecter' className="text-[#4A5B8C]">
              Connectez-vous
              </Link>
          </p>
        </div>
        
        {/* Step Indicator with connecting lines */}
        <div className="text-sm flex items-center justify-between mb-8 relative h-8">
          {[1, 2, 3].map((step, index) => (
            <React.Fragment key={step}>
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center z-10
                  ${currentStep === step ? 'bg-[#4A5B8C] text-white' : 'bg-gray-100'}`}
              >
                {step}
              </div>
              
              {index < 2 && (
                <div className="flex-1 mx-2 relative">
                  <div 
                    className={`absolute top-1/2 h-1 -translate-y-1/2 w-full 
                      ${currentStep > index + 1 ? 'bg-[#4A5B8C]' : 'bg-gray-200'}`} 
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
        
      <form onSubmit={handleSubmit}>
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-m font-bold text-[#4A5B8C] mb-4">Informations personnelles</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <input
                    type="text"
                    name="nom"
                    placeholder="Nom"
                    className="w-full h-10 p-2.5 border rounded-lg focus:ring-2 focus:ring-[#4A5B8C]"
                    value={formData.nom || ''}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="prenom"
                    placeholder="Prénom"
                    className="w-full h-10 p-2.5 border rounded-lg focus:ring-2 focus:ring-[#4A5B8C]"
                    value={formData.prenom || ''}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <input
                    type="date"
                    name="dateNaissance"
                    placeholder="Date De Naissance"
                    className="w-full h-10 p-2.5 border rounded-lg focus:ring-2 focus:ring-[#4A5B8C]"
                    value={formData.dateNaissance || ''}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="relative">
                  <select
                    name="genre"
                    className="w-full h-10 p-2.5 border rounded-lg focus:ring-2 focus:ring-[#4A5B8C] appearance-none"
                    value={formData.genre || ''}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Genre</option>
                    <option value="homme">Homme</option>
                    <option value="femme">Femme</option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* <div className="mb-4 relative">
                <select
                  name="ville"
                  className="w-full h-10 p-2.5 border rounded-lg focus:ring-2 focus:ring-[#4A5B8C] appearance-none"
                  value={formData.ville || ''}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Sélectionner Votre Ville</option>
                  <option value="paris">Tangier</option>
                  <option value="lyon">Rabat</option>
                  <option value="marseille">Casablanca</option>
                  <option value="bordeaux">Fes</option>
                  <option value="lille">Agadir</option>
                  <option value="lille">Marrakech</option>
                  <option value="lille">Kénitra</option>
                  <option value="lille">Tétouane</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </div>
              </div> */}
              <div className="mb-4 relative">
                <select
                  name="ville"
                  className="w-full h-10 p-2.5 border rounded-lg focus:ring-2 focus:ring-[#4A5B8C] appearance-none"
                  value={formData.ville || ''}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Sélectionner Votre Ville</option>
                  {cities.map((city) => (
                    <option key={city._id} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div className="mb-4">
                <textarea
                  name="adresse"
                  placeholder="Adresse Complète"
                  className="w-full h-10 p-2.5 border rounded-lg focus:ring-2 focus:ring-[#4A5B8C]"
                  value={formData.adresse || ''}
                  onChange={handleChange}
                  required
                  rows="2"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <input
                    type="tel"
                    name="telephone"
                    placeholder="Téléphone"
                    className="w-full h-10 p-2.5 border rounded-lg focus:ring-2 focus:ring-[#4A5B8C]"
                    value={formData.telephone || ''}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="E-Mail"
                    className="w-full h-10 p-2.5 border rounded-lg focus:ring-2 focus:ring-[#4A5B8C]"
                    value={formData.email || ''}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Mot De Passe"
                    className="w-full h-10 p-2.5 border rounded-lg focus:ring-2 focus:ring-[#4A5B8C]"
                    value={formData.password || ''}
                    onChange={handleChange}
                    required
                  />
                  <button 
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                  </button>
                </div>
                <div>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirmez Votre Mot De Passe"
                    className="w-full h-10 p-2.5 border rounded-lg focus:ring-2 focus:ring-[#4A5B8C]"
                    value={formData.confirmPassword || ''}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Professional Information */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-m font-bold text-[#4A5B8C] mb-4">Informations professionnelles</h3>
              
              <div className="relative mb-6">
                <select
                  name="secteurActivite"
                  className="w-full h-10 p-2.5 border rounded-lg focus:ring-2 focus:ring-[#4A5B8C] appearance-none"
                  value={formData.secteurActivite || ''}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Secteur D'activité</option>
                  <option value="informatique">Eléctricité</option>
                  <option value="santé">Santé</option>
                  <option value="education">Éducation</option>
                  <option value="batiment">Bâtiment</option>
                  <option value="commerce">Commerce</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div className="mb-4">
                <div className="text-sm font-medium mb-3">Expérience</div>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    className={`py-1 px-3 rounded-lg ${
                      formData.experience === "0-1" 
                      ? "bg-[#4A5B8C] text-white" 
                      : "bg-gray-100"
                    }`}
                    onClick={() => handleExperienceSelect("0-1")}
                  >
                    0-1 an
                  </button>
                  <button
                    type="button"
                    className={`py-2 px-5 rounded-lg ${
                      formData.experience === "1-3" 
                      ? "bg-[#4A5B8C] text-white" 
                      : "bg-gray-100"
                    }`}
                    onClick={() => handleExperienceSelect("1-3")}
                  >
                    1-3 ans
                  </button>
                  <button
                    type="button"
                    className={`py-2 px-5 rounded-lg ${
                      formData.experience === "3-5" 
                      ? "bg-[#4A5B8C] text-white" 
                      : "bg-gray-100"
                    }`}
                    onClick={() => handleExperienceSelect("3-5")}
                  >
                    3-5 ans
                  </button>
                  <button
                    type="button"
                    className={`py-2 px-5 rounded-lg ${
                      formData.experience === "5+" 
                      ? "bg-[#4A5B8C] text-white" 
                      : "bg-gray-100"
                    }`}
                    onClick={() => handleExperienceSelect("5+")}
                  >
                    5+ ans
                  </button>
                </div>
              </div>


              <div className="mb-6 h-10">
                <input
                  type="text"
                  name="tarification"
                  placeholder="Tarification Approximative (Optionnel)"
                  className="w-full h-10 p-2.5 border rounded-lg focus:ring-2 focus:ring-[#4A5B8C]"
                  value={formData.tarification || ''}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-6">
                <div className="text-md font-medium mb-3">Documents Requis (Téléchargement PDF Ou Image)</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* <FileUpload label="• CIN En Cours De Validité" />
                  <FileUpload label="• RIB (Optionnel)" />
                  <FileUpload label="• Certifications" />
                  <FileUpload label="• Carte Autoentrepreneur / ICE" /> */}
                  <FileUpload 
                    label="• CIN En Cours De Validité" 
                    onFileChange={(file) => handleFileChange(file, 'cin')}
                    name="cin"
                  />

                  <FileUpload 
                    label="• RIB (Optionnel)" 
                    onFileChange={(file) => handleFileChange(file, 'rib')}
                    name="rib"
                  />

                  <FileUpload 
                    label="• Certifications" 
                    onFileChange={(file) => handleFileChange(file, 'certifications')}
                    name="certifications"
                  />

                  <FileUpload 
                    label="• Carte Autoentrepreneur / ICE" 
                    onFileChange={(file) => handleFileChange(file, 'carteAE')}
                    name="carteAE"
                  />

                  

                  
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Validation */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-[#4A5B8C] mb-4">Validation et activation</h3>
              
              <div className="mb-6">
                <div className="text-md font-medium mb-5">Mode De Paiement Préféré</div>
               
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Méthode de paiement</label>
                  <select
                    name="methodePaiement"
                    className="w-full p-2 border rounded"
                    value={formData.methodePaiement}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Sélectionnez...</option>
                    <option value="carte">Carte bancaire</option>
                    <option value="virement">Virement bancaire</option>
                    <option value="paypal">PayPal</option>
                  </select>
                </div>

                <div className="mb-5">
                  <input
                    type="text"
                    name="nomCarte"
                    placeholder="Nom Sur La Carte"
                    className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-[#4A5B8C]"
                    value={formData.nomCarte || ''}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-12 gap-4 mb-6">
                  <div className="col-span-6">
                    <input
                      type="text"
                      name="numeroCarte"
                      placeholder="Carte De Crédit"
                      className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-[#4A5B8C]"
                      value={formData.numeroCarte || ''}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-span-3">
                    <input
                      type="text"
                      name="dateExpiration"
                      placeholder="MM/AA"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#4A5B8C]"
                      value={formData.dateExpiration || ''}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-span-3 relative">
                    <input
                      type="text"
                      name="cvc"
                      placeholder="CVC"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#4A5B8C]"
                      value={formData.cvc || ''}
                      onChange={handleChange}
                      required
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <Info className="h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <div>
                    <img src="/images/services/294654_visa_icon.png" alt="Visa" className="h-6" />
                  </div>
                  <div>
                    <img src="/images/services\mastercardl.png" alt="Mastercard" className="h-6" />
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-md font-medium mb-2">Photo De Profil (Optionnel)</div>
                  <FileUpload 
                    onFileChange={(file) => handleFileChange(file, 'photoProfil')}
                    name="photoProfil"
                  />
                </div>

                <div className="mb-6">
                  <div className="text-md font-medium mb-2">Vidéo De Présentation (Optionnel)</div>
                  <FileUpload 
                    onFileChange={(file) => handleFileChange(file, 'videoPresentation')}
                    name="videoPresentation"
                  />
                </div>

                <div className="text-xs text-gray-600 mb-4 text-justify">
                  CONFORMÉMENT À LA LOI 09-08, VOUS DISPOSEZ D'UN DROIT D'ACCÈS, DE RECTIFICATION ET D'OPPOSITION AU TRAITEMENT DE VOS DONNÉES PERSONNELLES. CE TRAITEMENT A ÉTÉ NOTIFIÉ À LA CNDP SOUS LE N°D-W-903/2024
                </div>

                <div className="flex items-start mb-6">
                  <input
                    type="checkbox"
                    id="acceptConditions"
                    name="acceptConditions"
                    className="mt-1 h-4 w-4"
                    checked={formData.acceptConditions || false}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="acceptConditions" className="ml-2 text-xs text-gray-600">
                    J'AI LU ET J'ACCEPTE LES CONDITIONS GÉNÉRALES D'UTILISATION, NOTAMMENT <a href="#" className="font-bold underline">CONDITION GENERALE DU MANZO</a>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <div className="w-full flex justify-center">
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-[#4A5B8C] hover:bg-[#3a4a7a] text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Suivant
                </button>
              ) : (
                <div className="w-full max-w-sm">
                  <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition-colors">
                      Soumettre
                  </button>
                </div>
              )}
            </div>
          </div>
        </form>
        </>
        ) : (
            /* Success message */
          <div className="text-center p-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#4A5B8C] mb-2">
              Votre inscription a bien été prise en compte !
            </h3>
            <p className="text-gray-600 mb-6">
              Nous vérifions vos informations et vous recevrez un email sous 24 à 48 heures.
            </p>
            <div className="animate-pulse text-sm text-gray-500">
              Redirection automatique...
            </div>
        </div>
      )}
      </div>
      
    </div>
    
  );
};

export default PopUp;