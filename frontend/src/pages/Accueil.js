import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Shape from '../assets/images/Shape.png';
import Vector from '../assets/images/Vector1.png';
import hahah from '../assets/images/hahah.png';
import image1 from '../assets/images/image1.png';
import image2 from '../assets/images/image2.png';
import PetitLogo from "../assets/images/manzo logo.png";
// villes
import Agadir from "../assets/ImagesVilles/Agadir.jpeg";
import CasaBlanca from "../assets/ImagesVilles/casa.jpeg";
import Marrakech from "../assets/ImagesVilles/kesh.jpeg";
import dakhla from "../assets/ImagesVilles/dakhla.jpeg";
import Fes from "../assets/ImagesVilles/fes.jpeg";
import Knitra from "../assets/ImagesVilles/Kenitra.jpeg";
import Oujda from "../assets/ImagesVilles/oujda.jpeg";
import Tanger from "../assets/ImagesVilles/tanga.jpeg";
import Titouane from '../assets/ImagesVilles/titoune.jpeg';
import Tiznit from '../assets/ImagesVilles/tiznit.jpeg';
// service 
import rectangle1 from '../assets/images/Rectangle1.png';
import rectangle2 from '../assets/images/Rectangle2.png';
import rectangle3 from '../assets/images/Rectangle3.png';
import Vector4 from '../assets/images/Vector4.png';
import Vector5 from '../assets/images/Vector5.png';
import Union1 from '../assets/images/Union1.png';
import Union2 from '../assets/images/Union2.png';

// Avantage 
import servicess1 from '../assets/images/Servicee1.png';
import time from '../assets/images/Time.png';
import Securite from '../assets/images/Securite.png';
import Vector6 from '../assets/images/Vector6.png';

// 
import rectangle4 from '../assets/images/Rectangle4.png';
import rectangle5 from '../assets/images/Rectangle5.png';

// prestataire
import { ChevronLeftIcon, ChevronRightIcon, CheckCircleIcon } from "@heroicons/react/solid";
import pre1 from '../assets/images/prestataire/pre1.png';
import pre2 from '../assets/images/prestataire/pre2.png';
import pre3 from '../assets/images/prestataire/pre3.png';
import pre4 from '../assets/images/prestataire/pre4.png';
import pre5 from '../assets/images/prestataire/pre5.png';

// Avis
import Getoile from '../assets/images/avis/Getoile.png';
import avis1 from '../assets/images/avis/avis1.png';
import avis2 from '../assets/images/avis/avis2.png';
import avis3 from '../assets/images/avis/avis3.png';

import { Link } from 'react-router-dom';
import { FaUser, FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import "../css/Accueil.css";

// --- New, more reliable shuffling function ---
const shuffleArray = (array) => {
    // Create a copy to avoid mutating the original array
    const shuffled = [...array]; 
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

const Accueil = () => {
    const [backendCities, setBackendCities] = useState([]);
    const [loadingCities, setLoadingCities] = useState(true);
    
    // Fetch cities from backend on component mount
    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await axios.get('/api/cities');
                setBackendCities(response.data);
                setLoadingCities(false);
            } catch (error) {
                console.error("Error fetching cities:", error);
                setLoadingCities(false);
                // Fallback to local images if API fails
            }
        };
        
        fetchCities();
    }, []);

    const services = [
        { city: "Agadir", image: Agadir },
        { city: "CasaBlanca", image: CasaBlanca },
        { city: "Marrakech", image: Marrakech },
        { city: "Dakhla", image: dakhla },
        { city: "Fès", image: Fes },
        { city: "Tanger", image: Tanger },
        { city: "Kénitra", image: Knitra },
        { city: "Oujda", image: Oujda},
        { city: "Titouane", image: Titouane },
        { city: "Tiznit", image: Tiznit}
    ];

    // avantages 
    const steps = [
        {
          image: servicess1, 
          title: "Prestataires de Confiance",
          description: "Nos experts sont soigneusement sélectionnés pour leur fiabilité et leur savoir-faire."
        },
        {
          image: time, 
          title: "Réservation Facile",
          description: "Réservez en quelques clics à l'heure qui vous convient."
        },
        {
          image: Securite, 
          title: "Sécurité Garantie",
          description: "Tous nos prestataires sont vérifiés pour votre tranquillité d'esprit."
        }
    ];

    // les avis 
    const [reviews, setReviews] = useState([]);

    // This local data serves as a fallback if the API is down or returns an empty list.
    const localReviewsData = [
        {
            name: "Iksod Salma",
            rating: 4.5,
            image: avis1,
            review: "A great little app that some of the big guns have clearly been taking their cue from. Looks like Incomee might actually be cleaner and simpler to use than competitors.",
        },
        {
            name: "Salma ElFadili",
            rating: 5,
            image: avis2,
            review: "A great little app that some of the big guns have clearly been taking their cue from. Looks like Incomee might actually be cleaner and simpler to use than competitors.",
        },
        {
            name: "Younes Oubaha",
            rating: 5,
            image: avis3,
            review: "A great little app that some of the big guns have clearly been taking their cue from. Looks like Incomee might actually be cleaner and simpler to use than competitors.",
        },
        {
            name: "Younes Oubaha",
            rating: 3,
            image: avis1,
            review: "A great little app that some of the big guns have clearly been taking their cue from. Looks like Incomee might actually be cleaner and simpler to use than competitors.",
        },
        {
            name: "Salma ElFadili",
            rating: 4,
            image: avis2,
            review: "A great little app that some of the big guns have clearly been taking their cue from. Looks like Incomee might actually be cleaner and simpler to use than competitors.",
        },
        {
            name: "Younes Oubaha",
            rating: 5,
            image: avis3,
            review: "A great little app that some of the big guns have clearly been taking their cue from. Looks like Incomee might actually be cleaner and simpler to use than competitors.",
        },
        // To make the shuffling more noticeable, add at least a few more reviews here!
        { name: "Ahmed B.", rating: 4, image: avis1, review: "Great service and very reliable. Would recommend!" },
        { name: "Fatima C.", rating: 5, image: avis2, review: "The best experience I've had with a service app." },
        { name: "Omar D.", rating: 4.5, image: avis3, review: "Quick and efficient. Will use again for sure." }
    ];

    useEffect(() => {
        const fetchReviews = async () => {
            console.log("Attempting to fetch reviews from backend...");
            try {
                // Add a cache-busting query parameter to force a fresh fetch
                const response = await axios.get(`/api/reviews?_t=${new Date().getTime()}`); 
                const backendReviews = response.data;
                
                console.log("Backend response received:", backendReviews);
                
                let reviewsToDisplay;
                
                // --- CORRECTED MAPPING LOGIC with the image URL fix ---
                if (backendReviews && backendReviews.length > 0) { 
                    console.log(`Found ${backendReviews.length} reviews from DB. Mapping fields...`);
                    // Map the backend data to the frontend's expected format
                    const mappedReviews = backendReviews.map(review => ({
                        // Map 'note' to 'rating' and 'commentaire' to 'review'
                        rating: review.note, 
                        review: review.commentaire,
                        // Use name from populated client field if available, otherwise a placeholder
                        name: review.client ? `${review.client.nom} ${review.client.prenom}` : "Utilisateur Manzo",
                        // FIX: CONSTRUCT THE FULL IMAGE URL
                        // We prepend the base URL to the path received from the backend
                        image: review.client?.photo ? `http://localhost:5000${review.client.photo}` : avis1,
                    }));
                    reviewsToDisplay = mappedReviews;
                } else {
                    console.log('Backend returned no reviews or an empty list. Using local fallback.');
                    reviewsToDisplay = localReviewsData;
                }
                
                // Shuffle the chosen array and slice the first 6
                const shuffledReviews = shuffleArray(reviewsToDisplay);
                setReviews(shuffledReviews.slice(0, 6));
                console.log("Reviews set to state successfully.");

            } catch (error) {
                console.error("API call to /api/reviews failed. Using local fallback.", error);
                // On error, always fall back to a shuffled local list
                const shuffledLocalReviews = shuffleArray(localReviewsData);
                setReviews(shuffledLocalReviews.slice(0, 6));
            }
        };
        
        fetchReviews();
    }, []); // Empty dependency array to run only on component mount
    
    //prestataire vérifie
    const prestataires = [
        { name: "BRAHIM", skill: "PEINTURE", image: pre1 },
        { name: "ABDERRAHIM", skill: "PLOMBERIE", image: pre2},
        { name: "HICHEM", skill: "CLIMATISATION", image: pre3},
        { name: "ABDERRAHMAN", skill: "MOULURES", image: pre4 },
        { name: "MED", skill: "TRISSIEN", image: pre5},
        { name: "JALAL", skill: "RENOVATION", image: pre1 },
        { name: "BRAHIM", skill: "PEINTURE", image: pre2 },
        { name: "ABDERRAHIM", skill: "PLOMBERIE", image: pre3 },
        { name: "HICHEM", skill: "CLIMATISATION", image: pre4 },
        { name: "ABDERRAHMAN", skill: "MOULURES", image: pre5 },
        { name: "MED", skill: "TRISSIEN", image: pre1 },
        { name: "MOHAMMED", skill: "RENOVATION", image: pre2 },
    ];
    const [index, setIndex] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(4); 

    // State for search form
    const [service, setService] = useState('');
    const [location, setLocation] = useState('');

    useEffect(() => {
        const handleResize = () => {
            setItemsPerPage(window.innerWidth >= 1024 ? 8 : 4);
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const nextSlide = () => {
        if (index < prestataires.length - itemsPerPage) setIndex(index + 1);
    };

    const prevSlide = () => {
        if (index > 0) setIndex(index - 1);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    //avis 
    const StarRating = ({ rating }) => {
        return (
            <div className="flex">
                {Array.from({ length: 5 }, (_, i) => (
                    <span key={i} className={`text-xl ${i < Math.floor(rating) ? 'text-[#FFC703]' : 'text-gray-300'}`}>
                        ★
                    </span>
                ))}
            </div>
        );
    };

    return (
        <div className="overflow-hidden">
            {/* Partie 1 */}
            <div className="relative bg-white p-4 md:p-10 rounded-lg flex flex-col lg:flex-row items-center pt-20 lg:pt-[125px]">
                {/* Texte à gauche */}
                <div className="w-full lg:w-1/2 ml-0 lg:ml-20 order-2 lg:order-1 mt-8 lg:mt-0">
                    <h2 className="text-2xl md:text-3xl font-semibold text-[#475489] text-center lg:text-left">Trouver ce que vous convient</h2>
                    <h1 className="text-4xl md:text-6xl font-bold text-[#475489] relative inline-block text-center lg:text-left">
                        <span className="relative z-10">Autour de vous !</span>
                    </h1>
                    <div className="flex justify-center lg:justify-start">
                        <img src={Shape} alt="décoration"/>
                    </div>

                    {/* Image flèche en dessous du titre */}
                    <div className="hidden lg:block absolute left-[590px] top-[150px] w-50 h-50 pt-[210px]">
                        <img src={Vector} alt="Fléche"/>
                    </div>
                    
                    {/* Formulaire sous le texte */}
                    <div className="relative z-10 mt-6 bg-white p-5 shadow-lg flex flex-col sm:flex-row text-[#9BA5C8] w-full lg:w-[140%] rounded-lg overflow-visible gap-4" style={{ borderRadius: '50px' }}>
                        <div className="flex items-center flex-1 p-3 border rounded-lg lg:rounded-l-lg bg-white" style={{ borderRadius: '50px' }}>
                            <FaUser className="mr-2" />
                            <select 
                                className="flex-1 bg-transparent focus:outline-none"
                                value={service}
                                onChange={(e) => setService(e.target.value)}
                            >
                                <option value="" disabled>Sélectionner un service</option>
                                <option value="Plomberie">Plomberie</option>
                                <option value="Ménage">Ménage</option>
                                <option value="Électricité">Électricité</option>
                                <option value="Couture">Couture</option>
                                <option value="Jardinage">Jardinage</option>
                                <option value="Informatique">Informatique</option>
                            </select>
                        </div>
                        <div className="flex items-center flex-1 p-3 border rounded-lg lg:rounded-none bg-white" style={{ borderRadius: '50px' }}>
                            <FaMapMarkerAlt className="mr-2" />
                            <select 
                                className="flex-1 bg-transparent focus:outline-none"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            >
                                <option value="">Sélectionner l'emplacement</option>
                                {backendCities.length > 0 ? (
                                    backendCities.sort((a, b) => a.name.localeCompare(b.name)).map((city) => (
                                        <option key={city.name} value={city.name}>{city.name}</option>
                                    ))
                                ) : (
                                    services.sort().map((service) => (
                                        <option key={service.city} value={service.city}>{service.city}</option>
                                    ))
                                )}
                            </select>
                        </div>
                        <Link 
                            to={service && location 
                                ? `/recherche?service=${encodeURIComponent(service)}&location=${encodeURIComponent(location)}`
                                : '#'}
                            className={`text-white px-6 py-3 flex items-center justify-center rounded-lg lg:rounded-r-lg ${!service || !location ? 'opacity-50 cursor-not-allowed' : ''}`} 
                            style={{ backgroundColor: '#434F83', borderRadius: '50px'}}
                        >
                            <span className="mr-2">Recherche</span>
                            <FaSearch />
                        </Link>
                    </div>
                </div>      
                {/* Images à droite */}
                <div className="relative w-full lg:w-1/2 flex gap-4 mr-0 lg:mr-20 order-1 lg:order-2 top-20 lg:top-0">
                    <img src={image1} alt="Travailleur 1" className="w-full w-1/2 rounded-lg" />
                    <img src={image2} alt="Travailleur 2" className="w-full w-1/2 rounded-lg" />
                </div>
            </div>

            {/* Partout Au Maroc  Partie 2 */}
            <div className="relative bg-white">
                <div className="absolute top-0 left-0 right-0 flex justify-center z-20">
                    <img src={PetitLogo} alt="Manzo Logo" className="h-24 max-w-xs" />
                </div>

                <div className="relative">
                    <img src={hahah} alt="Background Image" className="w-full h-auto min-h-[1100px] object-cover z-10" />
                    <div className="absolute inset-0 flex items-center justify-center z-10 pt-16 pb-18 h-[900px]">
                        <div className="py-12 w-full max-w-6xl mx-auto rounded-lg px-4">
                            <div className="text-center">
                                <h2 className="text-4xl font-bold text-[#475489] mb-19 pt-24">PARTOUT AU MAROC</h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 pt-10">
                                    {backendCities.length > 0 ? (
                                        backendCities.map((city, index) => (
                                            <Link 
                                                key={index} 
                                                to={`/ville/${city.name}`}
                                                className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                                            >
                                                <img 
                                                    src={city.image || services.find(s => s.city === city.name)?.image} 
                                                    alt={city.name} 
                                                    className="w-full h-32 md:h-40 object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-4">
                                                    <p className="text-white font-semibold text-sm md:text-base">Service à {city.name}</p>
                                                </div>
                                            </Link>
                                        ))
                                    ) : (
                                        services.map((service, index) => (
                                            <Link 
                                                key={index} 
                                                to={`/ville/${service.city}`}
                                                className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                                            >
                                                <img 
                                                    src={service.image} 
                                                    alt={service.city} 
                                                    className="w-full h-32 md:h-40 object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-4">
                                                    <p className="text-white font-semibold text-sm md:text-base">Service à {service.city}</p>
                                                </div>
                                            </Link>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Rest of your existing code remains exactly the same */}
            {/* PArtie 3  */}
            <div className='flex flex-col md:flex-row items-center justify-between p-4 md:p-8 bg-white'>
                <div className='relative flex flex-col space-y-4 w-full md:w-1/2 md:ml-28 mb-8 md:mb-0'>
                    <div className="flex space-x-4 justify-center md:justify-start">
                        <img 
                            src={rectangle1} 
                            alt="Électricien" 
                            className="object-cover w-[190px] h-[200px] md:w-auto md:h-auto" 
                        />
                        <div className='mt-28 hidden md:block'>
                            <img 
                                src={rectangle2} 
                                alt="Plombier" 
                                className="w-[190px] h-[200px] object-cover"
                            />
                        </div>
                    </div>
                    <div className="flex justify-center md:mr-16">
                        <img 
                            src={rectangle3} 
                            alt="Femme de ménage" 
                            className="object-cover w-[190px] h-[200px] md:w-auto md:h-auto" 
                        />
                    </div>

                    {/* fleche image */}
                    <img 
                        src={Vector4}
                        alt="Flèche vers le bas" 
                        className="absolute hidden md:block top-[190px] left-[50%] md:left-[450px] w-45 transform rotate-[-10deg] vector a" 
                    />
                    <img 
                        src={Vector5}
                        alt="Flèche vers la droite" 
                        className="absolute hidden md:block top-[360px] left-[40%] md:left-[380px] w-50 transform rotate-[30deg] vector a" 
                    />
                    {/* etoiles */}
                    <img 
                        src={Union1}
                        alt="Décoration" 
                        className="absolute hidden md:block top-[17px] left-[50%] md:left-[431px] w-50 etoile1 a" 
                    />
                    <img 
                        src={Union2}
                        alt="Décoration" 
                        className="absolute hidden md:block top-[310px] left-[20%] md:left-[140px] w-50 etoile1 a" 
                    />
                    <img 
                        src={Union1}
                        alt="Décoration" 
                        className="absolute hidden md:block top-[-25px] left-[-15px] w-etoile1 a" 
                    />
                </div>

                <div className="w-full md:w-1/2 text-center md:text-left space-y-6 md:space-y-14 md:mr-20 mx-4 md:ml-10">
                    <h1 className="text-xl md:text-3xl font-bold text-[#8C97C3] text-center">
                        <span className="text-[#475489]">MANZO</span>, VOTRE ALLIÉ POUR DES SERVICES À DOMICILE DE QUALITÉ ET DE CONFIANCE.
                    </h1>
                    <p className="text-[#6977AF] text-sm md:text-lg text-center leading-relaxed max-w-[700px] mx-auto">
                        "MANZO EST UNE APPLICATION QUI CONNECTE LES PARTICULIERS À DES PRESTATAIRES DE SERVICES À DOMICILE QUALIFIÉS À TRAVERS TOUT LE MAROC. NOTRE MISSION EST D'OFFRIR DES SERVICES RAPIDES, FIABLES ET ADAPTÉS, POUR SIMPLIFIER VOTRE QUOTIDIEN EN TOUTE CONFIANCE."
                    </p>
                    <div className='flex justify-center'>
                        <button className="bg-[#5869A3]  text-white px-6 py-2 rounded-full shadow-md hover:bg-[#9BA5C8] transition text-sm md:text-base">
                            Savior plus
                        </button>
                    </div>
                </div>
            </div>

            {/* partie 4 Prestataire */}
            <div className="w-full p-6 text-center">
                <h2 className="text-4xl font-bold text-[#6977AF] mt-6 mb-8">
                    Pourquoi choisir <span className='text-[#475489]'>Manzo</span> ?
                </h2>
                <p className="text-1xl text-[#434F83] font-semibold my-2 text-justify mb-8">
                    PRESTATAIRES VÉRIFIÉS
                </p>
                <div className="relative flex items-center justify-center overflow-hidden mb-10">
                    <button 
                        onClick={prevSlide} 
                        className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-md z-10 hover:bg-gray-100"
                    >
                        <ChevronLeftIcon className="h-6 w-6 text-gray-700" />
                    </button>
                    <div className="flex space-x-4 overflow-hidden">
                        {prestataires.slice(index, index + itemsPerPage).map((p, idx) => (
                            <Link key={idx} href={p.link} passHref>
                                <div className="relative w-40 h-56 overflow-hidden rounded-lg cursor-pointer">
                                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                                    <div className="absolute bottom-0 w-full bg-[#5869A3] bg-opacity-70 p-2 text-white rounded-t-lg">
                                        <p className="text-xs font-bold">{p.skill}</p>
                                    </div>
                                    <CheckCircleIcon className="absolute top-2 right-2 text-blue-500 h-5 w-5" />
                                </div>
                            </Link>
                        ))}
                    </div>
                    <button 
                        onClick={nextSlide} 
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-md z-10 hover:bg-gray-100"
                    >
                        <ChevronRightIcon className="h-6 w-6 text-gray-700" />
                    </button>
                </div>
            </div>
           
            {/* partie 5  */}
            <div className="text-center py-12 bg-[rgba(188,208,234,0.2)]">
                <h2 className="text-4xl font-bold text-[#6977AF] mb-8">Comment ça marche ?</h2>
                <div className="relative flex flex-col md:flex-row items-center justify-center gap-8">
                    {steps.map((step, index) => (
                    <div key={index} className="flex flex-col items-center text-center max-w-xs relative">
                        <div className="p-6 rounded-full  mb-4 relative z-10">
                        <img src={step.image} alt={step.title} className="w-[150px] h-[150px]" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                        <p className="text-gray-600 mt-2">{step.description}</p>
                    </div>
                    ))}
                    <img 
                    src={Vector6} 
                    alt="Tracé en pointillé" 
                    className="absolute w-full max-w-[750px] top-14 md:top-20 vector b"
                    />
                </div>
            </div>

            {/* partie 6  les avis  */}
            <div className="p-8 m-8">
                <h2 className="text-4xl font-bold text-left text-[#6977AF] mb-10">Les avis de nos clients</h2>
                <div className="flex space-x-6 overflow-x-auto scrollbar-hide">
                    <div className="bg-white p-6 rounded-lg shadow-md min-w-[250px] text-center">
                    <p className="font-semibold text-lg">Excellent</p>
                    <div className="flex justify-center my-2">
                        <img src={Getoile} alt='Grande étoile' className='mt-4'/>
                    </div>
                    <p className="text-gray-500 text-sm mt-10">Pilote de confiance</p>
                    </div>
                    {reviews.map((review, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-md min-w-[300px]">
                        <StarRating rating={review.rating} />
                        <p className="text-gray-600 mt-6">{review.review}</p>
                        <div className="flex items-center mt-6">
                        <img
                            src={review.image}
                            alt={review.name}
                            className="w-10 h-10 rounded-full mr-3 mt-4"
                        />
                        <div>
                            <p className="font-bold text-gray-700">{review.name}</p>
                        </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>

            {/* partie 7  */}
            <div className="text-center py-4 md:py-8 lg:py-12 bg-[rgba(188,208,234,0.2)]">
                <div className="container mx-auto px-4 m-4">
                    <div className="relative flex flex-col md:flex-row items-center justify-center gap-6 lg:gap-8">
                        {/* Texte et bouton */}
                        <div className="text-center ">
                            <h2 className="text-justify text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#8C97C3] leading-snug lg:leading-tight mr-24">
                                         Intégrez notre réseau dès aujourd'hui et <br className="hidden sm:inline"/>partagez vos services avec notre clientèle<br className="hidden sm:inline"/> grandissante !
                                </h2>
                            <button className="mt-10 ml-28 px-6 py-3 mx-auto md:mr-[350px] text-white rounded-full shadow-md bg-[#5869A3] hover:bg-[#9BA5C8] ">
                                Proposer vos services
                            </button>
                        </div>

                        {/* Images */}
                        <div className="flex flex-col gap-3 sm:gap-4 w-full md:w-auto">
                            <div className="flex justify-center md:justify-end gap-3 sm:gap-4">
                                <img 
                                    src={rectangle4}
                                    alt="Technicien installant une climatisation"
                                    className="w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 lg:w-48 lg:h-48 object-cover rounded-xl"
                                />
                                <img 
                                    src={rectangle5}
                                    alt="Livreur sonnant à une porte"
                                    className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 object-cover rounded-xl mt-8 sm:mt-10 md:mt-12"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* partie 8  */}      
            <div className="mx-auto bg-white rounded-lg shadow-md overflow-hidden p-20 text-center ">
                <h1 className="text-4xl font-bold text-[#6977AF] mb-6">Inscrivez-vous maintenant sur <span className='text-[#475489]'>Manzo ?</span></h1>
                <div className='flex flex-col items-center space-y-4'>
                    <Link to='/CreerCompte'>
                        <button className="w-[200px] bg-[#5869A3] hover:bg-[#9BA5C8] text-white font-semibold py-2 px-4 transition duration-200 rounded-full">
                            Inscrivez-vous
                        </button>
                    </Link>
                    <Link to='/Seconnecter'>
                        <button className="w-[200px] bg-gray-200 hover:bg-gray-300 text-[#475489] border-4 border-[#475489] font-semibold py-2 px-4  transition duration-200 rounded-full">
                            Connecter-vous
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Accueil;