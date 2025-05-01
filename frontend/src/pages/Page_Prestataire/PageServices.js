// import React, { useEffect } from "react";
// import SideBar from "./SideBar";
// import { LineChart, Star } from 'lucide-react';
// import { FaCogs } from 'react-icons/fa';
// import {Link} from 'react-router-dom';
// import { motion } from "framer-motion";


// // exemple dyl json 
// const servicesData = {
//     "services": [
//       {
//         "id": 1,
//         "title": "Service de Nettoyage",
//         "description": "Nettoyage professionnel pour maisons et bureaux",
//         "price": "500DH",
//         "status": "Actif",
//         "statusColor": "green",
//         "image": "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2"
//       },
//       {
//         "id": 2,
//         "title": "Jardinage",
//         "description": "Entretien complet de jardins et espaces verts",
//         "price": "450DH",
//         "status": "Actif",
//         "statusColor": "green",
//         "image": "https://images.unsplash.com/photo-1595152772835-219674b2a8a6"
//       },
//       {
//         "id": 3,
//         "title": "Bricolage",
//         "description": "Réparations et installations diverses",
//         "price": "600DH",
//         "status": "En pause",
//         "statusColor": "yellow",
//         "image": "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2"
//       }
//     ]
// }
// ;

// const ServicesP = () => {
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const getStatusColorClass = (color) => {
//     switch(color) {
//       case 'green': return 'bg-green-500';
//       case 'yellow': return 'bg-yellow-400';
//       default: return 'bg-gray-500';
//     }
//   };

//   return (
//     <div className="flex bg-[rgba(188,208,234,0.20)] min-h-[calc(100vh-5rem)] mt-20">
//       <SideBar />

//       <div className="flex-1 p-6 ml-60"> {/* ml-60 pour compenser la largeur du SideBar */}
//         <div className="flex justify-between items-center mb-6">
//           <div className="flex items-center mt-2">
//           <motion.h1  initial={{ opacity: 0, x: -20 }}  animate={{ opacity: 1, x: 0 }}  transition={{ duration: 0.5 }} className="text-3xl font-bold mb-8 text-gray-800 ">
//               Mes services
//           </motion.h1>
//             {/* <h1 className="text-2xl font-bold">Mes services</h1> */}
//           </div>
//           {/* <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200 mt-4">
//             + Nouveau service
//           </button> */}
//           <Link to="/Ajouter_service" state={{from : '/Services-Prestataire'}}>
//             <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-200 mt-4">
//               + Nouveau service
//             </button>
//           </Link>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
//           {servicesData.services.map((service) => (
//             <div key={service.id} className="bg-white rounded-lg shadow-md p-4 border border-gray-100">
//               <div className="relative">
//                 <img
//                   src={service.image}
//                   alt={service.title}
//                   className="w-full h-40 object-cover rounded-md"
//                 />
//                 <span className={`absolute top-2 right-2 ${getStatusColorClass(service.statusColor)} text-white text-xs font-bold px-2 py-1 rounded`}>
//                   {service.status}
//                 </span>
//               </div>
//               <h2 className="mt-4 text-lg font-semibold">{service.title}</h2>
//               <p className="text-gray-500 text-sm mt-1">
//                 {service.description}
//               </p>
//               <p className="text-blue-600 font-bold mt-2">{service.price}</p>
//               <div className="flex gap-2 mt-4">
//                 {/* <Link to='/Modifier_service' state={{ from: '/Services-Prestataire' }} >
//                   <button className="bg-blue-100 text-blue-600 hover:bg-blue-200 px-3 py-1 rounded-lg text-sm transition duration-200">
//                     Modifier
//                   </button>
//                 </Link> */}
//                 <Link 
//                     to={{
//                       pathname: '/Modifier_service',
//                       state: { 
//                         service: service, // Envoie toutes les données du service
//                         from: '/Services-Prestataire' 
//                       }
//                     }}>
//                     <button className="bg-blue-100 text-blue-600 hover:bg-blue-200 px-3 py-1 rounded-lg text-sm transition duration-200">
//                       Modifier
//                     </button>
//                 </Link>
//                 <button className="bg-red-100 text-red-600 hover:bg-red-200 px-3 py-1 rounded-lg text-sm transition duration-200">
//                   Supprimer
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Statistiques */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {/* Total Services */}
//             <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
//                 <div className="flex justify-between items-start">
//                 <div>
//                     <h3 className="text-xl font-semibold text-gray-700">Total Services</h3>
//                     <p className="text-3xl mt-2">3</p>
//                     <p className="text-blue-700 text-sm mt-1">2 actifs, 1 en pause</p>
//                 </div>
//                 <div className="bg-blue-100 p-3 rounded-full">
//                     <FaCogs  className="h-6 w-6 text-blue-600" />
//                 </div>
//                 </div>
//             </div>

//             {/* Réservations ce mois */}
//             <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
//                 <div className="flex justify-between items-start">
//                 <div>
//                     <h3 className="text-xl font-semibold text-gray-700">Réservations ce mois</h3>
//                     <p className="text-3xl mt-2 ">28</p>
//                     <p className="text-green-500 text-sm mt-1">+12% vs mois dernier</p>
//                 </div>
//                 <div className="bg-green-100 p-3 rounded-full">
//                     <LineChart className="h-6 w-6 text-green-600" />
//                 </div>
//                 </div>
//             </div>

//             {/* Note moyenne */}
//             <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
//                 <div className="flex justify-between items-start">
//                 <div>
//                     <h3 className="text-xl font-semibold text-gray-700">Note moyenne</h3>
//                     <p className="text-3xl mt-2">4.8</p>
//                     <p className="text-yellow-600 text-sm mt-1">Sur 457 avis</p>
//                 </div>
//                 <div className="bg-yellow-100 p-3 rounded-full">
//                     <Star className="h-6 w-6 text-yellow-600" fill="currentColor" />
//                 </div>
//                 </div>
//             </div>
//         </div>


        
//       </div>
//     </div>
//   );
// };

// export default ServicesP;


// design 2 
import React, { useEffect } from "react";
import SideBar from "./SideBar";
import { LineChart, Star } from 'lucide-react';
import { FaCogs } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";

const servicesData = {
    "services": [
      {
        "id": 1,
        "title": "Service de Nettoyage",
        "description": "Nettoyage professionnel pour maisons et bureaux",
        "price": "500DH",
        "status": "Actif",
        "statusColor": "green",
        "image": "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2"
      },
      {
        "id": 2,
        "title": "Jardinage",
        "description": "Entretien complet de jardins et espaces verts",
        "price": "450DH",
        "status": "Actif",
        "statusColor": "green",
        "image": "https://images.unsplash.com/photo-1595152772835-219674b2a8a6"
      },
      {
        "id": 3,
        "title": "Bricolage",
        "description": "Réparations et installations diverses",
        "price": "600DH",
        "status": "En pause",
        "statusColor": "yellow",
        "image": "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2"
      }
    ]
};

const ServicesP = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const cardHover = {
    scale: 1.03,
    transition: { duration: 0.3 }
  };

  const getStatusColorClass = (color) => {
    switch(color) {
      case 'green': return 'bg-green-100 text-green-800';
      case 'yellow': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex bg-gradient-to-br from-[#BCD0EA50] to-indigo-50 min-h-[calc(100vh-5rem)] mt-20">
      <SideBar />

      <div className="flex-1 p-6 ml-60">
        <div className="flex justify-between items-center mb-8">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.5 }} 
            className="text-3xl font-bold text-gray-800 mt-4"
          >
            Mes services
          </motion.h1>
          
          <Link to="/Ajouter_service" state={{from: '/Services-Prestataire'}}>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg mt-4"
            >
              + Nouveau service
            </motion.button>
          </Link>
        </div>

        {/* Grille des services en haut */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          {servicesData.services.map((service) => (
            <motion.div 
              key={service.id} 
              variants={item}
              whileHover={cardHover}
              className="bg-white rounded-xl shadow-sm hover:shadow-md p-6 border border-gray-100 transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden rounded-lg">
                <motion.img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                />
                <motion.span 
                  className={`absolute top-3 right-3 ${getStatusColorClass(service.statusColor)} text-xs font-semibold px-3 py-1 rounded-full shadow-sm`}
                >
                  {service.status}
                </motion.span>
              </div>
              
              <div className="mt-5">
                <h2 className="text-xl font-bold text-gray-800">{service.title}</h2>
                <p className="text-gray-600 mt-2 text-sm">
                  {service.description}
                </p>
                <p className="text-blue-600 font-bold mt-3 text-lg">{service.price}</p>
                
                <div className="flex gap-3 mt-6">
                  <Link 
                    to={{
                      pathname: '/Modifier_service',
                      state: { 
                        service: service,
                        from: '/Services-Prestataire' 
                      }
                    }}
                  >
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm"
                    >
                      Modifier
                    </motion.button>
                  </Link>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm"
                  >
                    Supprimer
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Statistiques en bas */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <motion.div variants={item}>
            <StatCard 
              title="Total Services" 
              value={servicesData.services.length} 
              subtitle={`${servicesData.services.filter(s => s.status === 'Actif').length} actifs, ${servicesData.services.filter(s => s.status !== 'Actif').length} en pause`} 
              icon={<FaCogs size={24} />} 
              color="blue" 
              subtitleColor="blue" 
            />
          </motion.div>
          <motion.div variants={item}>
            <StatCard 
              title="Réservations ce mois" 
              value="28" 
              subtitle="+12% vs mois dernier" 
              icon={<LineChart size={24} />} 
              color="green" 
              subtitleColor="green" 
            />
          </motion.div>
          <motion.div variants={item}>
            <StatCard 
              title="Note moyenne" 
              value="4.8/5" 
              subtitle="Sur 457 avis" 
              icon={<Star size={24} />} 
              color="yellow" 
              subtitleColor="yellow" 
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

// Composant StatCard réutilisé depuis Dashboard
const StatCard = ({ title, value, subtitle, icon, color, subtitleColor }) => {
  const colorClasses = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    yellow: 'text-yellow-500', 
    orange: 'text-orange-500',
    gray: 'text-gray-500',
  };

  const bgColorClasses = {
    blue: 'bg-blue-100',
    green: 'bg-green-100',
    yellow: 'bg-yellow-100',
    orange: 'bg-orange-100',
    gray: 'bg-gray-100',
  };

  return (
    <motion.div 
      whileHover={{ scale: 1.03 }}
      className={`bg-white p-5 rounded-2xl shadow-md border border-gray-100 transition-all duration-300 relative overflow-hidden group`}
    >
      <div className="absolute -right-4 -top-4 opacity-10 group-hover:opacity-20 transition-opacity">
        {React.cloneElement(icon, { size: 60 })}
      </div>
      <div className="absolute top-4 right-4 text-2xl">
        <div className={`p-3 rounded-xl ${bgColorClasses[color]} group-hover:scale-110 transition-transform`}>
          {React.cloneElement(icon, { className: `${colorClasses[color]}`, size: 24 })}
        </div>
      </div>
      <h3 className={`text-sm ${colorClasses[color]} font-semibold mb-1`}>{title}</h3>
      <div className="text-2xl font-bold text-gray-800 mt-2">{value}</div>
      <p className={`text-xs ${colorClasses[subtitleColor]} mt-2`}>{subtitle}</p>
    </motion.div>
  );
};

export default ServicesP;