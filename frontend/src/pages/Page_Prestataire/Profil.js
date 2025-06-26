import React, {useEffect, useState} from "react";
import SideBar from "./SideBar";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaInstagram, FaTwitter,FaFacebook, FaTiktok } from "react-icons/fa";
import image1 from '../../assets/images/image1.png';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from 'axios';
import { toast } from 'react-toastify';


// json ri exemple 
const reviewsData = [
    {
      id: 1,
      name: "Sophie Martin",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      date: "il y a 2 jours",
      rating: 5,
      comment: "Excellent service ! Marie est très professionnelle et minutieuse. Je la recommande vivement !"
    },
    {
      id: 2,
      name: "Pierre Dubois",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      date: "il y a 1 semaine",
      rating: 4,
      comment: "Très satisfait du service. Ponctuelle et efficace. Je recommande."
    },
    {
      id: 3,
      name: "Lucie Lefevre",
      avatar: "https://randomuser.me/api/portraits/women/21.jpg",
      date: "il y a 3 semaines",
      rating: 5,
      comment: "Super expérience, Marie a fait un travail exceptionnel. Très attentionnée."
    },
    {
      id: 4,
      name: "Marc Dupont",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      date: "il y a 1 mois",
      rating: 4,
      comment: "Bon service, mais il y a quelques petites améliorations possibles."
    },
    {
      id: 5,
      name: "Julie Bernard",
      avatar: "https://randomuser.me/api/portraits/women/30.jpg",
      date: "il y a 2 mois",
      rating: 5,
      comment: "Très contente de l'expérience, je reviendrai sans hésiter !"
    }
];

const Profil = () => {
  const [userData, setUserData] = useState({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        ville: '',
        description: '',
        bannerImage: null,
        prestataireInfo: {
            experience: '',
            secteurActivite: '',
            documents: {
                photoProfil: null
            }
        },
        socialLinks: {}
    });
    const [loading, setLoading] = useState(true);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchPrestataireProfile();
    }, []);

    const fetchPrestataireProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/auth/prestataire/profile', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Données reçues:', response.data);
            setUserData({
                ...response.data,
                bannerImage: response.data.bannerImage || null,
                prestataireInfo: {
                    ...response.data.prestataireInfo,
                    documents: {
                        ...response.data.prestataireInfo?.documents,
                        photoProfil: response.data.prestataireInfo?.documents?.photoProfil || null
                    }
                }
            });
            setLoading(false);
        } catch (error) {
            console.error('Erreur:', error);
            toast.error('Erreur de chargement du profil');
            setLoading(false);
        }
    };

   const handleBannerUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Vérification de la taille du fichier
    if (file.size > 10 * 1024 * 1024) { // 10MB
        toast.error('La taille du fichier ne doit pas dépasser 10MB');
        return;
    }

    try {
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('banner', file);

        const response = await axios.put(
            'http://localhost:5000/api/auth/prestataire/banner',
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            }
        );

        setUserData(prev => ({
            ...prev,
            bannerImage: response.data.bannerImage
        }));
        toast.success('Bannière mise à jour avec succès!');
    } catch (error) {
        console.error('Erreur:', error);
        toast.error(error.response?.data?.message || 'Échec de la mise à jour');
    }
};

    const toggleShowAll = () => {
      setShowAll(!showAll);
    };

    const reviewsToDisplay = showAll ? reviewsData : reviewsData.slice(0, 3);

    if (loading) {
        return (
            <div className="flex bg-gradient-to-br from-[#BCD0EA50] to-indigo-50 min-h-[calc(100vh-5rem)] mt-20">
                <SideBar />
                <div className="flex-1 ml-60 p-6 mt-4 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            </div>
        );
    }
    const ensureHttp = (url) => {
      if (!url) return '#';
      if (url.startsWith('http://') || url.startsWith('https://')) {
          return url;
      }
      return `https://${url}`;
  };

  return (
    <div className="flex bg-gradient-to-br from-[#BCD0EA50] to-indigo-50 min-h-[calc(100vh-5rem)] mt-20">
      <SideBar />

      {/* Main content */}
      <div className="flex-1 ml-60 p-6 mt-4">
        <motion.h1  initial={{ opacity: 0, x: -20 }}  animate={{ opacity: 1, x: 0 }}  transition={{ duration: 0.5 }} className="text-3xl font-bold mb-8 text-gray-800">
        📄Profil
        </motion.h1>

        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg mb-6 overflow-hidden transform transition-all hover:shadow-xl">
            <div className="h-48 w-full overflow-hidden">
                <img
                  src={userData.bannerImage ? `http://localhost:5000${userData.bannerImage}` : image1}
                  alt="Bannière"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
            </div>

            {/* Contenu en dessous de l'image */}
            <div className="flex items-center gap-6 p-6 -mt-10 animate-slideUp">
                {/* Image de profil */}
                <img
                  src={userData.prestataireInfo?.documents?.photoProfil ? `http://localhost:5000${userData.prestataireInfo.documents.photoProfil}` : "https://randomuser.me/api/portraits/women/44.jpg"}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md transition-transform duration-300 hover:scale-110"
                />
                
                {/* Infos utilisateur */}
                <div className="mt-10">
                <h2 className="text-xl font-bold">{userData.nom} {userData.prenom}</h2>
                {/* <p className="text-gray-600">{userData.prestataireInfo?.secteurActivite} - {userData.prestataireInfo?.experience} ans d'expérience</p> */}
                <p className="text-gray-600">
                    {userData.prestataireInfo?.secteurActivite || 'Secteur non spécifié'} - <span></span> 
                    {userData.prestataireInfo?.experience || 'Expérience non spécifiée'} ans d'expérience
                </p>
                <p className="text-gray-400 flex items-center gap-1">
                    <FaMapMarkerAlt className="mr-1" />
                    {userData.ville}, Maroc
                </p>
                  <div className="flex gap-2 mt-2 text-gray-500">
                    {/* Icône LinkedIn - Toujours visible */}
                    <a 
                        href={userData.socialLinks?.linkedin ? ensureHttp(userData.socialLinks.linkedin) : '#'} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`${userData.socialLinks?.linkedin ? 'hover:text-blue-700' : 'opacity-50 cursor-default'} transition-colors duration-300`}
                    >
                        <FaLinkedin />
                    </a>
                    
                    {/* Icône Instagram - Toujours visible */}
                    <a 
                        href={userData.socialLinks?.instagram ? ensureHttp(userData.socialLinks.instagram) : '#'} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`${userData.socialLinks?.instagram ? 'hover:text-pink-500' : 'opacity-50 cursor-default'} transition-colors duration-300`}
                    >
                        <FaInstagram />
                    </a>
                    
                    {/* Icône Facebook - Toujours visible */}
                    <a 
                        href={userData.socialLinks?.facebook ? ensureHttp(userData.socialLinks.facebook) : '#'} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`${userData.socialLinks?.facebook ? 'hover:text-blue-500' : 'opacity-50 cursor-default'} transition-colors duration-300`}
                    >
                        <FaFacebook />
                    </a>
                    
                    {/* Icône TikTok - Toujours visible */}
                    <a 
                        href={userData.socialLinks?.tiktok ? ensureHttp(userData.socialLinks.tiktok) : '#'} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`${userData.socialLinks?.tiktok ? 'hover:text-black' : 'opacity-50 cursor-default'} transition-colors duration-300`}
                    >
                        <FaTiktok />
                    </a>
                  </div>
                </div>

                {/* Boutons */}
                <div className="ml-auto flex gap-4">
                <label className="flex items-center gap-2 border border-blue-600 text-blue-600 px-4 py-2 rounded-lg text-sm cursor-pointer hover:bg-blue-50 transition-colors duration-300">
                  📷 Changer la bannière
                  <input type="file" accept="image/*" className="hidden" onChange={handleBannerUpload}/>
                </label>
                <Link to="/modifierProfil" 
                    state={{ from: '/ProfilPrestataire' }} 
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors duration-300 shadow-md hover:shadow-lg">
                    Modifier le profil
                </Link>
                </div>
            </div>
        </div>

        {/* About and Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 transform transition-all hover:scale-[1.01] hover:shadow-xl">
            <h3 className="font-bold text-lg mb-4">À propos</h3>
            <p className="text-gray-600 text-sm">
              {userData.description || "Professionnel expérimenté avec plusieurs années d'expertise dans le domaine. Passionné par la qualité et la satisfaction client."}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 transform transition-all hover:scale-[1.01] hover:shadow-xl">
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <div className="flex flex-col gap-2 text-gray-600 text-sm">
                <div className="flex items-center gap-2 hover:text-blue-600 transition-colors duration-300">
                    <FaPhoneAlt /> {userData.telephone || 'Non renseigné'}
                </div>
                <div className="flex items-center gap-2 hover:text-blue-600 transition-colors duration-300">
                    <FaEnvelope /> {userData.email}
                </div>
                <div className="flex items-center gap-2 hover:text-blue-600 transition-colors duration-300">
                    <FaMapMarkerAlt /> {userData.adresse || 'Non renseigné'}, {userData.ville || 'Non renseigné'}, Maroc
                </div>
            </div>
          </div>
        </div>

        {/* Services and Availability */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="md:col-span-2 bg-white rounded-2xl shadow-lg p-6 transform transition-all hover:scale-[1.01] hover:shadow-xl">
            <h3 className="font-bold text-lg mb-4">Mes services</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600 text-sm items-center">
              <div className="p-4 border rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300">Débouchage évier<br/></div>
              <div className="p-4 border rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300">Remplacement robinet<br/></div>
              <div className="p-4 border rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300">Débouchage évier<br/></div>
              <div className="p-4 border rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all duration-300">Remplacement robinet<br/></div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 transform transition-all hover:scale-[1.01] hover:shadow-xl">
            <div className="flex justify-between mb-4">
              <h3 className="font-bold text-lg">Disponibilité</h3>
              <Link to="/modifierProfil" 
                    state={{ from: '/ProfilPrestataire' }} >
                <button className="text-blue-600 text-sm hover:text-blue-800 transition-colors duration-300">✏️</button>
              </Link>
            </div>
            <div className="text-gray-600 text-sm flex flex-col gap-2">
              <div className="flex justify-between hover:text-blue-600 transition-colors duration-300"><span>Lundi - Vendredi</span><span>9h - 18h</span></div>
              <div className="flex justify-between hover:text-blue-600 transition-colors duration-300"><span>Samedi</span><span>10h - 16h</span></div>
              <div className="flex justify-between hover:text-blue-600 transition-colors duration-300"><span>Dimanche</span><span className="text-red-500">Fermé</span></div>
            </div>
          </div>
        </div>

        {/* Prix fixes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="md:col-span-3 ml-4">
            <h2 className="font-bold text-lg animate-pulse">Prix Fixes</h2>
          </div>   

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center transform transition-all hover:scale-105 hover:shadow-xl">
            <h4 className="font-bold text-md mb-2">Débouchage évier</h4>
            <p className="text-gray-400 text-sm mb-4">Intervention rapide, garantie 3 mois</p>
            <p className="text-blue-600 font-bold text-lg animate-bounce">500DH</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center transform transition-all hover:scale-105 hover:shadow-xl">
            <h4 className="font-bold text-md mb-2">Remplacement robinet</h4>
            <p className="text-gray-400 text-sm mb-4">Fourniture et main d'œuvre incluses</p>
            <p className="text-blue-600 font-bold text-lg animate-bounce">1290DH</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center transform transition-all hover:scale-105 hover:shadow-xl">
            <h4 className="font-bold text-md mb-2">Détection fuite</h4>
            <p className="text-gray-400 text-sm mb-4">Diagnostic complet</p>
            <p className="text-blue-600 font-bold text-lg animate-bounce">750DH</p>
          </div>
        </div>

        {/* avis client */}
        <div className="bg-white rounded-2xl shadow-lg p-6 transform transition-all hover:shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">Avis clients</h3>
            <div className="text-yellow-500 text-sm flex items-center gap-1">
              <span className="animate-ping">⭐</span> 4,9/5 (128 avis)
            </div>
          </div>

          {/* Liste des avis */}
          <div className="space-y-4">
            {reviewsToDisplay.map((review, index) => (
              <div 
                key={review.id} 
                className="border rounded-xl p-4 transform transition-all hover:scale-[1.01] hover:shadow-md hover:border-blue-200"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center mb-2 gap-3">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-sm">{review.name}</span>
                      <span className="text-gray-400 text-xs">{review.date}</span>
                    </div>
                    <span className="text-yellow-500 text-xs flex items-center gap-1">
                      ⭐ {review.rating}/5
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{review.comment}</p>
              </div>
            ))}
          </div>

          {/* button voir tout / moins */}
          <div className="text-right mt-4">
            <button 
              className="text-blue-600 text-sm hover:text-blue-800 font-medium transition-colors duration-300"
              onClick={toggleShowAll}
            >
              {showAll ? 'Voir moins' : 'Voir tout'}
            </button>
          </div>
        </div>
        
      </div>

      {/* Ajout des animations CSS dans le style global */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Profil;