import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoLocation } from "react-icons/io5";
import { FaLinkedinIn, FaInstagram, FaPhoneAlt, FaEnvelope, FaUserCircle } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { IoMdPin } from 'react-icons/io';

// Assets (replace with your actual paths)
import profilep from "../assets/images/profilep.webp";
import banner from "../assets/images/banner.jpeg";

const Mainprofile = () => {
  const [showAllServices, setShowAllServices] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);

  // Profile data
  const profile = {
    name: "Sophie Martin",
    profession: "Plombière",
    experience: "8 ans d'expérience",
    location: "Agadir, Maroc",
    rating: "4.8 (24 Avis clients)",
    about: "Professionnelle expérimentée avec plus de 8 ans d'expertise dans le domaine. Passionnée par la qualité et la satisfaction client, je m'engage à fournir des services exceptionnels adaptés à vos besoins spécifiques.",
    contact: {
      phone: "+212 612 0441 45",
      email: "soph@sophie-martin.com",
      address: "80000 Agadir, Maroc"
    },
    availability: [
      { day: "Lundi - Vendredi", hours: "9h - 18h", available: true },
      { day: "Samedi", hours: "10h - 16h", available: true },
      { day: "Dimanche", hours: "Fermé", available: false }
    ],
    fixedPrices: [
      { service: "Débouchage évier", description: "Intervention rapide, garantie 3 mois", price: "500DH" },
      { service: "Remplacement robinet", description: "Fourniture et main d'œuvre incluses", price: "1290DH" },
      { service: "Détection fuite", description: "Diagnostic complet", price: "750DH" }
    ],
    reviews: [
      {
        id: 1,
        name: "Sophie Martin",
        rating: 5,
        date: "y a 2 jours",
        comment: "Excellent service ! Marie est très professionnelle et minutieuse. Je la recommande vivement !",
        avatar: null
      },
      {
        id: 2,
        name: "Pierre Dubois",
        rating: 5,
        date: "y a 1 semaine",
        comment: "Très satisfait du service. Ponctuelle et efficace. Je recommande.",
        avatar: null
      },
      {
        id: 3,
        name: "Amélie Laurent",
        rating: 4,
        date: "y a 3 semaines",
        comment: "Bon service, un peu de retard mais travail de qualité.",
        avatar: null
      },
      {
        id: 4,
        name: "Thomas Bernard",
        rating: 5,
        date: "y a 1 mois",
        comment: "Parfait ! Je ferai appel à nouveau à ce service.",
        avatar: null
      }
    ]
  };

  // Services data
  const services = [
    { title: "Débouchage évier", description: "Solution rapide pour vos problèmes de canalisation" },
    { title: "Remplacement robinet", description: "Installation professionnelle de tous types de robinets" },
    { title: "Réparation chauffe-eau", description: "Dépannage et entretien de chauffe-eau" },
    { title: "Installation sanitaire", description: "Mise en place d'équipements sanitaires" },
    { title: "Détection de fuites", description: "Localisation précise des fuites cachées" },
    { title: "Entretien chaudière", description: "Maintenance préventive annuelle" }
  ];

  // Display either all services or just the first 2
  const displayedServices = showAllServices ? services : services.slice(0, 2);
  const displayedReviews = showAllReviews ? profile.reviews : profile.reviews.slice(0, 2);

  return (
    <div className="max-w mx-auto bg-white rounded-lg shadow-md overflow-hidden px-5 py-6 mb-9 mt-5 mr-[50px] ml-[50px] pt-[100px]">
      {/* Banner Section */}
      <div className="h-32 bg-gray-200 relative -mx-4 mb-6 -mt-5">
        <img src={banner} alt="Banner" className="w-full h-full object-cover" />
      </div>

      {/* Profile Header */}
      <div className="flex -mt-20 relative mb-4">
        <div className="w-24 h-24 rounded-full border-4 border-white bg-gray-300 overflow-hidden shadow-md">
          <img src={profilep} alt="Profile" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Profile Info */}
      <div className="flex justify-between items-start mb-6">
        <div className="mt-2">
          <h1 className="text-2xl font-bold">{profile.name}</h1>
          <p className="text-gray-600">{profile.profession} - {profile.experience}</p>
          <p className="text-gray-600 flex items-center">
            <IoLocation className="mr-1" />
            {profile.location}
          </p>
          
          {/* Social Links */}
          <div className="flex space-x-2 mt-2">
            <a href="https://www.linkedin.com/" className="text-xl hover:text-blue-500"><FaLinkedinIn /></a>
            <a href="https://www.instagram.com/" className="text-xl hover:text-pink-500"><FaInstagram /></a>
            <a href="https://x.com/" className="text-xl hover:text-black"><RiTwitterXLine /></a>
          </div>
          
          {/* Badges */}
          <div className="flex items-center mt-4">
            <div className="flex items-center bg-blue-100 rounded-[20px] px-3 py-1">
              <span className="text-yellow-400">★</span>
              <span className="ml-2 text-sm text-blue-500">{profile.rating}</span>
            </div>
            <div className="flex items-center bg-green-100 rounded-[20px] px-3 py-1 ml-4">
              <span className="text-green-700">✔</span>
              <span className="ml-2 text-sm text-green-700">Identité vérifiée</span>
            </div>
          </div>
        </div>
        
        {/* Contact Button */}
        <Link to="/seconnecter">
          <button className="px-4 py-2 bg-[#475489] text-white rounded-md w-40 mr-9 hover:bg-[#3a466f] transition-colors">
            ✉ Contacter
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-[6%]">
        <div className="md:col-span-2 bg-white rounded-md shadow-md px-8 py-4 mb-8">
          <h2 className="text-lg font-bold mb-2">À propos</h2>
          <p className="text-sm text-gray-700">
            {profile.about}
          </p>
        </div>

        <div className="bg-white rounded-md shadow-md p-4 hover:shadow-lg transition-shadow mt-4 mb-6">
          <h2 className="text-lg font-bold mb-2">Contact</h2>
          <p className="flex items-center text-sm text-gray-700 mb-2">
            <FaPhoneAlt className="mr-2 text-[#475489]" /> {profile.contact.phone}
          </p>
          <p className="flex items-center text-sm text-gray-700 mb-2">
            <FaEnvelope className="mr-2 text-[#475489]" /> {profile.contact.email}
          </p>
          <p className="flex items-center text-sm text-gray-700">
            <IoMdPin className="mr-2 text-[#475489]" /> {profile.contact.address}
          </p>
        </div>
      </div>

      {/* Services and Availability Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Services Card */}
        <div className="md:col-span-2 bg-white rounded-md shadow-md px-6 py-4">
          <h2 className="text-lg font-bold mb-4">Services proposés</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {displayedServices.map((service, index) => (
              <div key={index} className="border rounded-md p-4 hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-[#475489]">{service.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{service.description}</p>
              </div>
            ))}
          </div>

          {services.length > 2 && (
            <div className="flex justify-center mt-4">
              <button 
                className="bg-[#475489] text-white px-6 py-2 rounded-md hover:bg-[#3a466f] transition-colors flex items-center justify-center"
                onClick={() => setShowAllServices(!showAllServices)}
              >
                {showAllServices ? "Voir moins" : "Voir plus"}
              </button>
            </div>
          )}
        </div>

        {/* Availability Card */}
        <div className="bg-white rounded-md shadow-md p-4 hover:shadow-lg transition-shadow self-start">
          <h2 className="text-lg font-bold mb-2">Disponibilité</h2>
          {profile.availability.map((item, index) => (
            <p key={index} className="text-sm text-gray-700 mb-1">
              {item.day} 
              <span className={`float-right font-bold ${item.available ? '' : 'text-red-500'}`}>
                {item.hours}
              </span>
            </p>
          ))}
          <button className="mt-3 bg-green-500 hover:bg-green-600 text-white w-full py-2 rounded-md transition-colors">
            📅 Réserver
          </button>
        </div>
      </div>

      {/* Fixed Prices Section */}
      <div className="mb-4">
        <h2 className="text-lg font-bold mb-4">Prix Fixes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {profile.fixedPrices.map((item, index) => (
            <div key={index} className="bg-white shadow rounded-md p-4 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold ">{item.service}</h3>
              <p className="text-sm text-gray-600 mt-1">{item.description}</p>
              <p className="mt-2 font-bold text-blue-500 text-lg">{item.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="bg-white rounded-md shadow-md px-6 py-4 mb-8 relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Avis clients</h2>
          {profile.reviews.length > 2 && (
            <button 
              onClick={() => setShowAllReviews(!showAllReviews)}
              className="text-[#475489] font-medium hover:underline text-sm"
            >
              {showAllReviews ? "Voir moins" : "Voir tous"}
            </button>
          )}
        </div>

        <div className="space-y-4">
          {displayedReviews.map((review, index) => (
            <div key={review.id} className={index !== displayedReviews.length - 1 ? "border-b border-gray-200 pb-4" : ""}>
              <div className="flex gap-3">
                {/* Profile Image */}
                <div className="flex-shrink-0">
                  {review.avatar ? (
                    <img 
                      src={review.avatar} 
                      alt={review.name} 
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <FaUserCircle className="w-10 h-10 text-gray-400" />
                  )}
                </div>
                
                {/* Review Content */}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-medium">{review.name}</h3>
                    <div className="flex items-center">
                      <span className="text-yellow-400">
                        {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                      </span>
                      <span className="text-gray-500 text-sm ml-2">1/ {review.date}</span>
                    </div>
                  </div>
                  <p className="text-gray-700 mt-1">{review.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center mb-5 mt-[3%]">
  <button className="bg-green-500 text-white px-[10%] py-3 rounded-md hover:bg-green-800 transition-colors">Réserver</button>
</div>
 
      
    </div>
  );
};

export default Mainprofile;