import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { prestataires, servicesFixes, servicesDevis } from '../data/data';
import { FaStar, FaMapMarkerAlt, FaClock, FaQuoteLeft } from 'react-icons/fa';
import { ChevronLeftIcon, ChevronRightIcon, CheckCircleIcon } from "@heroicons/react/solid";
import { Link } from 'react-router-dom';

// Import des images des villes
import Agadir from "../assets/images/villes/Agadir.jpg";
import CasaBlanca from "../assets/images/villes/Casablanca.jpg";
import Marrakech from "../assets/images/villes/Marrakech.jpeg";
import Dakhla from "../assets/images/villes/Dakhla.jpg";
import Fes from "../assets/images/villes/Fes.jpg";
import Knitra from "../assets/images/villes/Knitra.jpg";
import Oujda from "../assets/images/villes/Oujda.jpg";
import Tanger from "../assets/images/villes/Tangier.jpeg";
import Titouane from "../assets/images/villes/Titouan.jpg";
import Tiznit from "../assets/images/villes/Tiznit.jpg";

// Images de services pour arrière-plan
import ServicePlomberie from "../assets/services/plomberie.jpg";
import ServiceMenage from "../assets/services/menage.jpg";
import ServiceJardinage from "../assets/services/jardinage.jpg";
import ServiceElectricite from "../assets/services/electricite.jpg";
import ServicePeinture from "../assets/services/peinture.jpg";
import ServiceDemenagement from "../assets/services/demenagement.jpg";
import ServiceInformatique from "../assets/services/informatique.jpg";
import ServiceClimatisation from "../assets/services/climatisation.jpg";
import ServiceMecanique from "../assets/services/mecanique.jpg";
import ServiceCuisine from "../assets/services/cuisine.jpg";
import ServiceBabysitting from "../assets/services/babysitting.jpg";
import ServiceCoiffure from "../assets/services/coiffure.jpg";

// Mappage des noms de ville aux images importées
const villeImages = {
  Agadir,
  Casablanca: CasaBlanca,
  Marrakech,
  Dakhla,
  Fes,
  Kenitra: Knitra,
  Tanger,
  Oujda,
  Tetouan: Titouane,
  Tiznit
};

// Avis clients par ville
const villeAvis = {
  Agadir: [
    {
      nom: "Karim B.",
      note: 4.5,
      commentaire: "Service de plomberie rapide et efficace. Le prestataire était ponctuel et professionnel.",
      date: "15/06/2023"
    },
    {
      nom: "Fatima Z.",
      note: 5,
      commentaire: "Ménage impeccable ! Je recommande vivement ce service.",
      date: "22/05/2023"
    }
  ],
  Casablanca: [
    {
      nom: "Mehdi L.",
      note: 4,
      commentaire: "Bon service d'électricité mais un peu cher.",
      date: "10/07/2023"
    },
    {
      nom: "Leila M.",
      note: 5,
      commentaire: "Super expérience avec le service de ménage. Tout était parfait.",
      date: "05/06/2023"
    }
  ],
};

// Images de service par catégorie
const serviceImages = {
  Plomberie: ServicePlomberie,
  Ménage: ServiceMenage,
  Jardinage: ServiceJardinage,
  Électricité: ServiceElectricite,
  Peinture: ServicePeinture,
  Déménagement: ServiceDemenagement,
  Informatique: ServiceInformatique,
  Climatisation: ServiceClimatisation,
  Mécanique: ServiceMecanique,
  Cuisine: ServiceCuisine,
  Babysitting: ServiceBabysitting,
  Coiffure: ServiceCoiffure,
};

const VilleDetail = () => {
  const { ville } = useParams();
  const villeData = prestataires[ville] || [];
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [serviceType, setServiceType] = React.useState('all');
  
  // Effet pour scroller vers le haut au chargement
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [ville]);

  const filteredServices = [...servicesFixes, ...servicesDevis].filter(
    service => service.ville === ville
  );

  const servicesToDisplay = serviceType === 'all' 
    ? filteredServices 
    : filteredServices.filter(service => service.category === serviceType);

  const nextSlide = () => {
    if (currentSlide < villeData.length - 4) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* En-tête avec image de la ville - Version corrigée */}
      <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-8 shadow-lg">
        <img 
          src={villeImages[ville]} 
          alt={ville}
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 flex flex-col justify-end p-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
            Services à {ville}
          </h1>
          <p className="text-lg md:text-xl text-white/90">
            Trouvez les meilleurs prestataires près de chez vous
          </p>
        </div>
      </div>

      {/* Description de la ville */}
      <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Découvrez {ville}</h2>
        <p className="text-gray-600">
          {ville} est une ville dynamique offrant une gamme complète de services à domicile. 
          Nos prestataires sont soigneusement sélectionnés pour leur professionnalisme et leur savoir-faire.
          Trouvez ci-dessous les services disponibles dans votre région.
        </p>
      </div>

      {/* Liste des prestataires */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Prestataires vérifiés à {ville}</h2>
          {villeData.length > 4 && (
            <div className="flex space-x-2">
              <button 
                onClick={prevSlide}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                disabled={currentSlide === 0}
              >
                <ChevronLeftIcon className="h-5 w-5 text-gray-700" />
              </button>
              <button 
                onClick={nextSlide}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                disabled={currentSlide >= villeData.length - 4}
              >
                <ChevronRightIcon className="h-5 w-5 text-gray-700" />
              </button>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {villeData.slice(currentSlide, currentSlide + 4).map((prestataire, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48">
                <img 
                  src={serviceImages[prestataire.service] || villeImages[ville]} 
                  alt={prestataire.service}
                  className="w-full h-full object-cover"
                />
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                  <div className="w-12 h-12 rounded-full border-4 border-white bg-white shadow-md overflow-hidden">
                    <img 
                      src={prestataire.photo} 
                      alt={prestataire.nom}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="pt-8 pb-4 px-4 text-center">
                <h3 className="font-bold text-lg mb-1">{prestataire.nom}</h3>
                <p className="text-sm text-gray-600 mb-3">{prestataire.service}</p>
                <div className="flex justify-center items-center mb-2">
                  <FaStar className="text-yellow-400 mr-1" />
                  <span className="font-semibold">{prestataire.note}</span>
                  <span className="text-gray-500 text-sm ml-1">({prestataire.avis} avis)</span>
                </div>
                <div className="text-sm text-gray-600">
                  <FaMapMarkerAlt className="inline mr-1" />
                  {prestataire.distance}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Liste des services */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Services disponibles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesToDisplay.map((service, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={villeImages[ville]} 
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">
                    <FaClock className="inline mr-1" />
                    {service.duration}
                  </span>
                  <span className="font-semibold text-blue-600">
                    {service.price ? `${service.price} MAD` : 'Sur devis'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Avis des clients */}
      {villeAvis[ville] && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Avis des clients à {ville}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {villeAvis[ville].map((avis, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex items-center mb-4">
                  <div className="flex items-center mr-4">
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        className={`${i < Math.floor(avis.note) ? 'text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold">{avis.note}/5</span>
                </div>
                <div className="relative mb-4">
                  <FaQuoteLeft className="text-gray-300 text-3xl absolute -top-2 -left-2" />
                  <p className="text-gray-600 pl-6 italic">
                    {avis.commentaire}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700">
                    {avis.nom}
                  </span>
                  <span className="text-sm text-gray-500">
                    {avis.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Pagination */}
      {servicesToDisplay.length > 9 && (
        <div className="flex justify-center mb-8">
          <nav className="flex items-center space-x-2">
            <button className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300">
              &laquo;
            </button>
            <button className="px-3 py-1 rounded-md bg-blue-600 text-white">
              1
            </button>
            {servicesToDisplay.length > 9 && (
              <button className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300">
                2
              </button>
            )}
            <button className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300">
              &raquo;
            </button>
          </nav>
        </div>
      )}

      {/* Lien de retour */}
      <div className="text-center">
        <Link 
          to="/" 
          className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default VilleDetail;