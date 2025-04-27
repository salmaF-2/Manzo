import React, {useEffect, useState} from "react";
import SideBar from "./SideBar";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaInstagram, FaTwitter } from "react-icons/fa";
import image1 from '../../assets/images/image1.png';
import { Link } from "react-router-dom";

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
    useEffect(() => {
          window.scrollTo(0, 0);
    }, []);
    const [showAll, setShowAll] = useState(false);

    const toggleShowAll = () => {
      setShowAll(!showAll);
    };

    const reviewsToDisplay = showAll ? reviewsData : reviewsData.slice(0, 3);


  return (
    <div className="flex bg-[rgba(188,208,234,0.20)] min-h-[calc(100vh-5rem)] mt-20">
      <SideBar />

      {/* Main content - modification ici : suppression de overflow-y-auto */}
      <div className="flex-1 ml-60 p-6 mt-4">
        <h1 className="text-2xl font-bold mb-6">Profil</h1>

        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow mb-6 overflow-hidden">
            {/* Grande image de bannière */}
            {/* <div className="h-40 w-full bg-cover bg-center" style={{ backgroundImage: `url('/path/to/ton-image.png')` }}>
                
            </div> */}
            <div className="h-48 w-full overflow-hidden">
                <img
                    src={image1}
                    alt="Bannière"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Contenu en dessous de l'image */}
            <div className="flex items-center gap-6 p-6 -mt-14">
                {/* Image de profil */}
                <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-white"
                />
                
                {/* Infos utilisateur */}
                <div className="mt-10">
                <h2 className="text-xl font-bold">Salma IKSOD</h2>
                <p className="text-gray-600">Professional Plumber - 8 ans d'expérience</p>
                <p className="text-gray-400 flex items-center gap-1"><FaMapMarkerAlt className="mr-1" />Agadir, Maroc</p>
                <div className="flex gap-2 mt-2 text-gray-500">
                    <FaLinkedin className="hover:text-blue-700 cursor-pointer" />
                    <FaInstagram className="hover:text-pink-500 cursor-pointer" />
                    <FaTwitter className="hover:text-sky-400 cursor-pointer" />
                </div>
                </div>

                {/* Boutons */}
                <div className="ml-auto flex gap-4">
                {/* Ce bouton sert à changer l'image de bannière */}
                <label className="flex items-center gap-2 border border-blue-600 text-blue-600 px-4 py-2 rounded-lg text-sm cursor-pointer">
                  📷 Changer la photo
                  <input type="file" accept="image/*" className="hidden" />
                </label>
                <Link to="/modifierProfil" 
                    state={{ from: '/ProfilPrestataire' }} 
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
                    Modifier le profil
                </Link>
                </div>
            </div>
        </div>

        {/* About and Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="font-bold text-lg mb-4">À propos</h3>
            <p className="text-gray-600 text-sm">
              Professionnelle expérimentée avec plus de 8 ans d'expertise dans le domaine. Passionnée par la qualité et la satisfaction client, je m'engage à fournir des services exceptionnels adaptés à vos besoins spécifiques.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <div className="flex flex-col gap-2 text-gray-600 text-sm">
              <div className="flex items-center gap-2"><FaPhoneAlt /> +212 612 0441 45</div>
              <div className="flex items-center gap-2"><FaEnvelope /> salmaiksod@gmail.com</div>
              <div className="flex items-center gap-2"><FaMapMarkerAlt /> 80000 Agadir, Maroc</div>
            </div>
          </div>
        </div>

        {/* Services and Availability */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="md:col-span-2 bg-white rounded-2xl shadow p-6">
            <h3 className="font-bold text-lg mb-4">Mes services</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600 text-sm items-center">
              <div className="p-4 border rounded-xl ">Débouchage évier<br/></div>
              <div className="p-4 border rounded-xl">Remplacement robinet<br/></div>
              <div className="p-4 border rounded-xl">Débouchage évier<br/></div>
              <div className="p-4 border rounded-xl">Remplacement robinet<br/></div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="flex justify-between mb-4">
              <h3 className="font-bold text-lg">Disponibilité</h3>
              <Link to="/modifierProfil" 
                    state={{ from: '/ProfilPrestataire' }} ><button className="text-blue-600 text-sm">✏️</button></Link>
            </div>
            <div className="text-gray-600 text-sm flex flex-col gap-2">
              <div className="flex justify-between"><span>Lundi - Vendredi</span><span>9h - 18h</span></div>
              <div className="flex justify-between"><span>Samedi</span><span>10h - 16h</span></div>
              <div className="flex justify-between"><span>Dimanche</span><span className="text-red-500">Fermé</span></div>
            </div>
          </div>
        </div>

        {/* Prix fixes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="md:col-span-3 ml-4 ">
            <h2 className="font-bold text-lg">Prix Fixes</h2>
          </div>   

          <div className="bg-white rounded-2xl shadow p-6 text-center">
            <h4 className="font-bold text-md mb-2">Débouchage évier</h4>
            <p className="text-gray-400 text-sm mb-4">Intervention rapide, garantie 3 mois</p>
            <p className="text-blue-600 font-bold text-lg">500DH</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-6 text-center">
            <h4 className="font-bold text-md mb-2">Remplacement robinet</h4>
            <p className="text-gray-400 text-sm mb-4">Fourniture et main d’œuvre incluses</p>
            <p className="text-blue-600 font-bold text-lg">1290DH</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-6 text-center">
            <h4 className="font-bold text-md mb-2">Détection fuite</h4>
            <p className="text-gray-400 text-sm mb-4">Diagnostic complet</p>
            <p className="text-blue-600 font-bold text-lg">750DH</p>
          </div>
        </div>

        {/* avis client */}
        {/* <div className="bg-white rounded-2xl shadow p-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Avis clients</h3>
                <div className="text-yellow-500 text-sm">⭐ 4,9/5 (128 avis)</div>
            </div>
            <div className="space-y-4">
               
                <div className="border rounded-xl p-4">
                <div className="flex items-center mb-2 gap-3">
                    <img
                    src="https://randomuser.me/api/portraits/women/65.jpg"
                    alt="Sophie Martin"
                    className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                    <div className="flex justify-between items-center">
                        <span className="font-bold text-sm">Sophie Martin</span>
                        <span className="text-gray-400 text-xs">il y a 2 jours</span>
                    </div>
                    <span className="text-yellow-500 text-xs flex items-center gap-1">
                        ⭐ 5/5
                    </span>
                    </div>
                </div>
                <p className="text-gray-600 text-sm">
                    Excellent service ! Marie est très professionnelle et minutieuse. Je la recommande vivement !
                </p>
                </div>

                
                <div className="border rounded-xl p-4">
                <div className="flex items-center mb-2 gap-3">
                    <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="Pierre Dubois"
                    className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                    <div className="flex justify-between items-center">
                        <span className="font-bold text-sm">Pierre Dubois</span>
                        <span className="text-gray-400 text-xs">il y a 1 semaine</span>
                    </div>
                    <span className="text-yellow-500 text-xs flex items-center gap-1">
                        ⭐ 4/5
                    </span>
                    </div>
                </div>
                <p className="text-gray-600 text-sm">
                    Très satisfait du service. Ponctuelle et efficace. Je recommande.
                </p>
                </div>
            </div>

            
            <div className="text-right mt-4">
                <button className="text-blue-600 text-sm">Voir tout</button>
            </div>
        </div> */}
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">Avis clients</h3>
            <div className="text-yellow-500 text-sm">⭐ 4,9/5 (128 avis)</div>
          </div>

          {/* Liste des avis */}
          <div className="space-y-4">
            {reviewsToDisplay.map((review) => (
              <div key={review.id} className="border rounded-xl p-4">
                <div className="flex items-center mb-2 gap-3">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-10 h-10 rounded-full object-cover"
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

          {/*  button voir tout / moins */}
          <div className="text-right mt-4">
            <button className="text-blue-600 text-sm" onClick={toggleShowAll}>
              {showAll ? 'Voir moins' : 'Voir tout'}
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
};



export default Profil;