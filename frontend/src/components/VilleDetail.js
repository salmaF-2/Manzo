import React from 'react';
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
      {/* En-tête avec image de la ville - Animation de fondu et zoom */}
      <div className="relative h-96 rounded-lg overflow-hidden mb-8 shadow-lg group">
        <img 
          src={villeImages[ville]} 
          alt={ville}
          className="w-full h-full object-cover brightness-75 transition-all duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end p-6">
          <div className="w-full transform transition-all duration-700 delay-100 translate-y-10 group-hover:translate-y-0">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 animate-fade-in">Services à {ville}</h1>
            <p className="text-xl text-white opacity-90 animate-fade-in animate-delay-100">
              Trouvez les meilleurs prestataires près de chez vous
            </p>
          </div>
        </div>
      </div>

      {/* Description de la ville - Animation de glissement */}
      <div className="bg-white rounded-lg p-6 shadow-md mb-8 transition-all duration-500 hover:shadow-xl transform hover:-translate-y-1">
        <h2 className="text-2xl font-semibold text-[#475489] mb-4 animate-fade-in">Découvrez {ville}</h2>
        <p className="text-gray-600 animate-fade-in animate-delay-100">
          {ville} est une ville dynamique offrant une gamme complète de services à domicile. 
          Nos prestataires sont soigneusement sélectionnés pour leur professionnalisme et leur savoir-faire.
          Trouvez ci-dessous les services disponibles dans votre région.
        </p>
      </div>

      {/* Liste des prestataires - Animation de carrousel */}
      <section className="mb-12 animate-fade-in-up">
        <h2 className="text-2xl font-bold text-[#475489] mb-6 animate-fade-in">Prestataires vérifiés à {ville}</h2>
        <div className="relative">
          <div className="flex overflow-x-auto scrollbar-hide space-x-4 pb-4">
            {villeData.slice(currentSlide, currentSlide + 4).map((prestataire, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 w-72 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className="relative h-48 group">
                  <img 
                    src={serviceImages[prestataire.service] || villeImages[ville]} 
                    alt={prestataire.service}
                    className="w-full h-full object-cover brightness-50 group-hover:brightness-75 transition-all duration-300"
                  />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 group-hover:scale-110">
                    <img 
                      src={prestataire.photo} 
                      alt={prestataire.nom}
                      className="w-20 h-20 rounded-full border-4 border-white object-cover shadow-md"
                    />
                  </div>
                  <div className="absolute top-2 right-2 bg-white rounded-full p-1 transition-all duration-300 hover:scale-110">
                    <CheckCircleIcon className="h-5 w-5 text-green-500" />
                  </div>
                </div>
                <div className="p-4 text-center transition-all duration-300 group-hover:bg-gray-50">
                  <h3 className="font-bold text-lg animate-fade-in">{prestataire.nom}</h3>
                  <p className="text-sm text-gray-600 mb-2 animate-fade-in animate-delay-100">{prestataire.service}</p>
                  <div className="flex justify-center items-center mb-2 animate-fade-in animate-delay-150">
                    <FaStar className="text-yellow-400 mr-1 animate-bounce" />
                    <span className="font-semibold">{prestataire.note}</span>
                    <span className="text-gray-500 text-sm ml-1">({prestataire.avis} avis)</span>
                  </div>
                  <div className="flex justify-center items-center animate-fade-in animate-delay-200">
                    <span className="text-sm text-gray-600">
                      <FaMapMarkerAlt className="inline mr-1" />
                      {prestataire.distance}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {villeData.length > 4 && (
            <>
              <button 
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 z-10 transition-all duration-300 hover:scale-110"
                disabled={currentSlide === 0}
              >
                <ChevronLeftIcon className="h-6 w-6 text-gray-700" />
              </button>
              <button 
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 z-10 transition-all duration-300 hover:scale-110"
                disabled={currentSlide >= villeData.length - 4}
              >
                <ChevronRightIcon className="h-6 w-6 text-gray-700" />
              </button>
            </>
          )}
        </div>
      </section>

      {/* Liste des services - Animation de grille */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-[#475489] mb-6 animate-fade-in">Services disponibles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesToDisplay.map((service, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="h-48 overflow-hidden relative group">
                <img 
                  src={villeImages[ville]} 
                  alt={service.title}
                  className="w-full h-full object-cover brightness-75 transition-all duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end p-4">
                  <h3 className="font-bold text-lg text-white transform transition-all duration-500 translate-y-5 group-hover:translate-y-0">
                    {service.title}
                  </h3>
                </div>
              </div>
              <div className="p-4 transition-all duration-300 group-hover:bg-gray-50">
                <p className="text-gray-600 text-sm mb-3 animate-fade-in">{service.description}</p>
                <div className="flex justify-between items-center animate-fade-in animate-delay-100">
                  <span className="text-sm text-gray-600">
                    <FaClock className="inline mr-1" />
                    {service.duration}
                  </span>
                  <span className="font-semibold text-[#475489]">
                    {service.price ? `${service.price} MAD` : 'Sur devis'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Avis des clients - Animation de carte */}
      {villeAvis[ville] && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#475489] mb-6 animate-fade-in">Avis des clients à {ville}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {villeAvis[ville].map((avis, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center mb-4">
                  <div className="flex items-center mr-4">
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        className={`text-xl transition-all duration-300 ${i < Math.floor(avis.note) ? 'text-yellow-400 hover:scale-125' : 'text-gray-300 hover:scale-110'}`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold">{avis.note}/5</span>
                </div>
                <div className="relative mb-4 group">
                  <FaQuoteLeft className="text-gray-300 text-3xl absolute -top-2 -left-2 transition-all duration-300 group-hover:text-[#475489]" />
                  <p className="text-gray-600 pl-6 italic transition-all duration-300 group-hover:text-gray-800">
                    {avis.commentaire}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700 transition-all duration-300 hover:text-[#475489]">
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

      {/* Pagination - Animation de boutons */}
      {servicesToDisplay.length > 9 && (
        <div className="flex justify-center mb-8 animate-fade-in">
          <nav className="flex items-center space-x-2">
            <button className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 transition-all duration-300 hover:bg-gray-300 hover:scale-105">
              &laquo;
            </button>
            <button className="px-3 py-1 rounded-md bg-[#5869A3] text-white transition-all duration-300 transform hover:scale-110">
              1
            </button>
            {servicesToDisplay.length > 9 && (
              <button className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 transition-all duration-300 hover:bg-gray-300 hover:scale-105">
                2
              </button>
            )}
            <button className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 transition-all duration-300 hover:bg-gray-300 hover:scale-105">
              &raquo;
            </button>
          </nav>
        </div>
      )}

      {/* Lien de retour - Animation de bouton */}
      <div className="mt-8 text-center animate-fade-in">
        <Link 
          to="/" 
          className="inline-flex items-center px-4 py-2 bg-[#5869A3] text-white rounded-full hover:bg-[#475489] transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default VilleDetail;