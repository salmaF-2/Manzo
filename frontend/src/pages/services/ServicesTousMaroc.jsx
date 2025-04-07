// src/pages/Services/ServicesTousMaroc.jsx
import { FaTools, FaBroom, FaPlug, FaTree, FaPaintRoller, FaKey, FaSnowflake, FaBaby, FaUserNurse } from "react-icons/fa";
import { FaTruckMoving, FaWater } from "react-icons/fa"; // Changed from FaPeopleCarry to FaTruckMoving
import { LuArrowLeft } from "react-icons/lu";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const ServicesTousMaroc = () => {
  const services = [
    { icon: <FaBroom className="text-4xl" />, name: "Ménage", description: "Service de nettoyage professionnel pour votre domicile ou bureau" },
    { icon: <FaTools className="text-4xl" />, name: "Bricolage", description: "Petits travaux de réparation et d'installation" },
    { icon: <FaPlug className="text-4xl" />, name: "Electricité", description: "Installation et réparation électrique" },
    { icon: <FaTree className="text-4xl" />, name: "Jardinage", description: "Entretien de jardins et espaces verts" },
    { icon: <FaWater className="text-4xl" />, name: "Plomberie", description: "Réparation et installation de systèmes de plomberie" },
    { icon: <FaPaintRoller className="text-4xl" />, name: "Peinture", description: "Service de peinture intérieure et extérieure" },
    { icon: <FaKey className="text-4xl" />, name: "Serrurerie", description: "Ouverture de porte, changement de serrures" },
    { icon: <FaSnowflake className="text-4xl" />, name: "Climatisation", description: "Installation et réparation de climatiseurs" },
    { icon: <FaTruckMoving className="text-4xl" />, name: "Déménagement", description: "Aide au déménagement et transport d'objets" }, // Changed icon here
    { icon: <FaBaby className="text-4xl" />, name: "Garde d'enfants", description: "Baby-sitting et garde d'enfants à domicile" },
    { icon: <FaUserNurse className="text-4xl" />, name: "Aide aux personnes âgées", description: "Assistance et accompagnement des seniors" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <Link 
          to="/services" 
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors mb-6"
        >
          <LuArrowLeft /> Retour aux services
        </Link>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Tous nos services disponibles dans toutes les villes du Maroc</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex flex-col items-center text-center"
            >
              <div className="text-green-600 mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{service.name}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ServicesTousMaroc;