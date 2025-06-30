import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt, FaClock, FaQuoteLeft } from 'react-icons/fa';
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

// Assuming these static imports are still used for fallback or services images
import { servicesFixes, servicesDevis } from '../data/data';

// Import images from local assets (can be removed if images are entirely fetched from API)
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

// Images de services pour arrière-plan (might become dynamic too)
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

// Mappage des noms de ville aux images importées (use as fallback if cityDetails.image is not available)
const staticVilleImages = {
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

// Images de service par catégorie (if these are static, keep them, otherwise they'll come from API)
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
  const { ville } = useParams(); // 'ville' from URL params, e.g., /villedetail/Casablanca

  const [cityDetails, setCityDetails] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [prestatairesInCity, setPrestatairesInCity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [availableServices, setAvailableServices] = useState([]);

  const [services, setServices] = useState([]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [serviceType, setServiceType] = useState('all');

  const API_BASE_URL = 'http://localhost:5000/api'; // Ensure this matches your server.js port
  const BASE_SERVER_URL = 'http://localhost:5000'; // Define your backend server's base URL

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on component mount or city change

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch city details and its associated prestataires and services
        const cityResponse = await fetch(`${API_BASE_URL}/cities/${ville}`);
        if (!cityResponse.ok) {
          throw new Error(`HTTP error! status: ${cityResponse.status}`);
        }
        const cityData = await cityResponse.json();
        
        setCityDetails(cityData);
        
        setPrestatairesInCity(cityData.prestataires || []);
        setAvailableServices(cityData.availableServices || []);
        setServices(cityData.services || []); // Set the new detailed services state

        // Fetch reviews for the city
        const reviewsResponse = await fetch(`${API_BASE_URL}/reviews/city/${ville}`);
        if (!reviewsResponse.ok) {
          throw new Error(`HTTP error! status: ${reviewsResponse.status}`);
        }
        const reviewsData = await reviewsResponse.json();
        setReviews(reviewsData);

      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Échec du chargement des données. Veuillez réessayer plus tard.");
      } finally {
        setLoading(false);
      }
    };

    if (ville) {
      fetchData();
    }
  }, [ville]); // Re-fetch when 'ville' parameter changes

  // You can now delete the 'filteredServices' and 'servicesToDisplay' logic if you want to use the API data
  // const filteredServices = [...servicesFixes, ...servicesDevis].filter(...)
  // const servicesToDisplay = serviceType === 'all' ? filteredServices : filteredServices.filter(...)

  const nextSlide = () => {
    if (currentSlide < prestatairesInCity.length - 4) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center text-lg">Chargement des détails de la ville...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-8 text-center text-red-500 text-lg">{error}</div>;
  }

  // Fallback if no city details are found
  if (!cityDetails) {
    return <div className="container mx-auto px-4 py-8 text-center text-lg">Détails de la ville non trouvés pour {ville}.</div>;
  }

  // Use cityDetails.image from API, fallback to static image if not found
  const cityImageSrc = cityDetails.image
    ? `${BASE_SERVER_URL}${cityDetails.image}` 
    : staticVilleImages[cityDetails.name] || 'https://via.placeholder.com/1200x400?text=Image+de+la+ville+non+trouvée';


  return (
    <div className="container mx-auto px-4 py-8">
      {/* En-tête avec image de la ville */}
      <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-8 shadow-lg">
        <img
          src={cityImageSrc}
          alt={cityDetails.name}
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 flex flex-col justify-end p-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
            Services à {cityDetails.name}
          </h1>
          <p className="text-lg md:text-xl text-white/90">
            Trouvez les meilleurs prestataires de services près de chez vous
          </p>
        </div>
      </div>

      {/* Description de la ville */}
      <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Découvrez {cityDetails.name}</h2>
        <p className="text-gray-600">
          {cityDetails.description || `
            ${cityDetails.name} est une ville dynamique offrant une gamme complète de services à domicile.
            Nos prestataires de services sont soigneusement sélectionnés pour leur professionnalisme et leur savoir-faire.
            Trouvez ci-dessous les services disponibles dans votre région.
          `}
        </p>
      </div>
      
      {/* NEW SECTION: Services disponibles - using API data with cards */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Services disponibles</h2>
        {services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service, index) => (
                    <div
                        key={service._id || index}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                    >
                        <div className="h-48 overflow-hidden">
                            <img
                                src={service.image ? `${BASE_SERVER_URL}/uploads/services/${service.image}` : 'https://via.placeholder.com/400x300?text=Image+du+service'}
                                alt={service.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="p-4">
                            <h3 className="font-bold text-lg mb-2">{service.title}</h3>
                            <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                            <p className="text-gray-700 text-sm mb-2">
                                <span className="font-semibold">Prestataire :</span> {service.prestataire}
                            </p>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-600">
                                    <FaClock className="inline mr-1" />
                                    {service.duration}
                                </span>
                                <span className="font-bold text-blue-600">
                                    {service.price ? `${service.price} MAD` : 'Sur devis'}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <p className="text-gray-600 text-center mt-8">Aucun service disponible pour {cityDetails.name} pour le moment.</p>
        )}
      </section>
      {/* END NEW SECTION */}

      {/* Liste des prestataires */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Prestataires vérifiés à {cityDetails.name}</h2>
          {prestatairesInCity.length > 4 && (
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
                disabled={currentSlide >= prestatairesInCity.length - 4}
              >
                <ChevronRightIcon className="h-5 w-5 text-gray-700" />
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {prestatairesInCity.slice(currentSlide, currentSlide + 4).map((prestataire, index) => (
            <div
              key={prestataire._id || index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48">
                <img
                  // FIX: Prioritize bannerImage, then check for photo, then service, then city image
                  src={prestataire.bannerImage ? `${BASE_SERVER_URL}${prestataire.bannerImage}` : prestataire.photo ? `${BASE_SERVER_URL}${prestataire.photo}` : serviceImages[prestataire.service] || staticVilleImages[cityDetails.name] || 'https://via.placeholder.com/400x300?text=Image+de+service'}
                  alt={prestataire.service}
                  className="w-full h-full object-cover"
                />
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                  <div className="w-12 h-12 rounded-full border-4 border-white bg-white shadow-md overflow-hidden">
                    <img
                      // FIX: Use optional chaining to check for the nested photoProfil
                      src={prestataire.prestataireInfo?.documents?.photoProfil ? `${BASE_SERVER_URL}${prestataire.prestataireInfo.documents.photoProfil}` : 'https://via.placeholder.com/100x100?text=Profil'}
                      alt={prestataire.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="pt-8 pb-4 px-4 text-center">
                <h3 className="font-bold text-lg mb-1">{prestataire.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{prestataire.service}</p>
                <div className="flex justify-center items-center mb-2">
                  <FaStar className="text-yellow-400 mr-1" />
                  <span className="font-semibold">{prestataire.averageRating?.toFixed(1) || 'N/A'}</span>
                  <span className="text-gray-500 text-sm ml-1">({prestataire.numberOfReviews || 0} avis)</span>
                </div>
                <div className="text-sm text-gray-600">
                  <FaMapMarkerAlt className="inline mr-1" />
                  {prestataire.distance || 'N/A'}
                </div>
              </div>
            </div>
          ))}
        </div>
        {prestatairesInCity.length === 0 && (
          <p className="text-gray-600 text-center mt-8">Aucun prestataire de service trouvé pour {cityDetails.name}.</p>
        )}
      </section>

      {/* Avis des clients */}
      {reviews.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Avis des clients à {cityDetails.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((avis, index) => (
              <div
                key={avis.id || index}
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
                    {avis.nom} {/* This will be the client's name from populated review */}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(avis.date).toLocaleDateString('fr-FR')} {/* Format date */}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
      {reviews.length === 0 && !loading && (
        <section className="mb-12 text-center text-gray-600">
          <p>Aucun avis trouvé pour {cityDetails.name} pour le moment.</p>
        </section>
      )}

      {/* Pagination (placeholder - implement actual logic if needed) */}
      {prestatairesInCity.length > 4 && ( // Change from servicesToDisplay to prestatairesInCity
        <div className="flex justify-center mb-8">
          <nav className="flex items-center space-x-2">
            <button className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300">
              &laquo;
            </button>
            <button className="px-3 py-1 rounded-md bg-blue-600 text-white">
              1
            </button>
            <button className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300">
              2
            </button>
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