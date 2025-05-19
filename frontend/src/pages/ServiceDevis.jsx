import { useState, useEffect } from 'react';
import { servicesDevis } from '../data/data';
import { FiSearch, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import {FaHome, FaStar, FaRegClock ,FaTruckMoving,FaHammer,FaToolbox,FaTree,FaLaptop,FaSnowflake,FaPaintRoller} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ServiceDevis = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 10;

  const [quotationServices] = useState(servicesDevis);
  const navigate = useNavigate();

  const serviceCategories = [
    { id: 'all', name: 'Tous les services', icon: <FaHome className="transition-transform group-hover:scale-125" /> },
    { id: 'demenagement', name: 'Déménagement', icon: <FaTruckMoving className="transition-transform group-hover:scale-125" /> },
    { id: 'renovation', name: 'Rénovation', icon: <FaHammer className="transition-transform group-hover:scale-125" /> },
    { id: 'bricolage', name: 'Bricolage', icon: <FaToolbox className="transition-transform group-hover:scale-125" /> },
    { id: 'exterieur', name: 'Extérieur', icon: <FaTree className="transition-transform group-hover:scale-125" /> },
    { id: 'confort', name: 'Confort', icon: <FaSnowflake className="transition-transform group-hover:scale-125" /> },
    { id: 'amenagement', name: 'Aménagement', icon: <FaPaintRoller className="transition-transform group-hover:scale-125" /> },
    { id: 'technologie', name: 'Technologie', icon: <FaLaptop className="transition-transform group-hover:scale-125" /> }
  ];

  const filteredServices = quotationServices.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || 
                          service.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = filteredServices.slice(indexOfFirstService, indexOfLastService);
  const totalPages = Math.ceil(filteredServices.length / servicesPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, categoryFilter]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow container mx-auto px-4 py-8 pt-32">
        {/* En-tête avec animation de fondu et zoom */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-[#5869A3] mb-4 relative pb-2 
              after:content-[''] after:block after:w-20 after:h-1 after:bg-[#5869A3] 
              after:mt-4 after:mx-auto after:rounded-full after:animate-scale-x">
            Services avec Devis
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto animate-fade-in-up animate-delay-100">
            Des solutions sur mesure adaptées à vos besoins
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar des catégories avec animations */}
          <div className="lg:w-1/4 animate-slide-in-left">
            <div className="bg-white p-6 rounded-xl shadow-sm sticky top-4 transition-all duration-300 hover:shadow-md">
              <h2 className="text-xl font-semibold text-[#5869A3] mb-4 flex items-center animate-fade-in">
                <FaHome className="mr-2 transition-transform hover:scale-110" />
                Catégories
              </h2>
              <ul className="space-y-2">
                {serviceCategories.map((cat, index) => (
                  <li key={cat.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 50}ms` }}>
                    <button
                      onClick={() => setCategoryFilter(cat.id)}
                      className={`group w-full text-left px-4 py-3 rounded-lg flex items-center transition-all duration-300 ${
                        categoryFilter === cat.id 
                        ? 'bg-[#5869A3] text-white scale-105' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:scale-[1.02]'
                      }`}
                    >
                      <span className="mr-3">{cat.icon}</span>
                      <span className="group-hover:underline">{cat.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contenu principal avec animations */}
          <div className="lg:w-3/4 animate-fade-in-up">
            {/* Barre de recherche avec animation */}
            <div className="mb-8 bg-white p-6 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="relative animate-pulse-once">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-transform duration-300 group-hover:scale-125" />
                <input
                  type="text"
                  placeholder="Rechercher un service..."
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5869A3] transition-all duration-300 hover:shadow-sm focus:shadow-md"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Résultats avec animations */}
            <div className="mb-12">
              <div className="flex justify-between items-center mb-6 animate-fade-in">
                <h2 className="text-xl font-semibold text-gray-700">
                  {filteredServices.length} services disponibles
                  {categoryFilter !== 'all' && ` dans ${serviceCategories.find(c => c.id === categoryFilter)?.name}`}
                </h2>
                {filteredServices.length > servicesPerPage && (
                  <div className="text-sm text-gray-500 animate-fade-in animate-delay-100">
                    Page {currentPage} sur {totalPages}
                  </div>
                )}
              </div>

              {/* Liste des services avec animations */}
              {currentServices.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {currentServices.map((service, index) => (
                      <div 
                        key={service.id} 
                        className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col animate-fade-in-up"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className="h-48 bg-gray-200 relative overflow-hidden group">
                          <img 
                            src={`/images/services/${service.image}`} 
                            alt={service.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            onError={(e) => e.target.src = '/images/services/default.jpg'}
                          />
                          <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full flex items-center text-sm shadow transition-all duration-300 hover:scale-110">
                            <FaStar className="text-yellow-500 mr-1 animate-spin-once" />
                            {service.rating}
                          </div>
                          {service.popular && (
                            <div className="absolute top-2 left-2 bg-[#5869A3] text-white px-3 py-1 rounded-full text-xs font-medium shadow transition-all duration-300 hover:scale-110">
                              Populaire
                            </div>
                          )}
                        </div>
                        
                        <div className="p-6 flex-grow flex flex-col transition-all duration-300 group-hover:bg-gray-50">
                          <div className="flex items-center mb-3">
                            <div className="mr-3 transition-transform duration-300 group-hover:scale-125">
                              {service.icon}
                            </div>
                            <h2 className="text-xl font-bold text-[#5869A3] group-hover:underline">{service.title}</h2>
                          </div>
                          <p className="text-gray-600 mb-4 flex-grow">{service.description}</p>
                          
                          <div className="mb-4">
                            <div className="flex items-center text-gray-500 mb-2">
                              <FaRegClock className="mr-2 transition-transform duration-300 hover:scale-125" />
                              <span className="text-sm">{service.details}</span>
                            </div>
                            {service.startingPrice > 0 ? (
                              <span className="text-lg font-bold text-[#5869A3] animate-pulse-once">
                                À partir de {service.startingPrice} MAD
                              </span>
                            ) : (
                              <span className="text-lg font-bold text-[#5869A3] animate-pulse-once">
                                Devis personnalisé
                              </span>
                            )}
                          </div>
                          
                          <button 
                            className="w-full bg-[#5869A3] hover:bg-[#48578A] text-white py-3 rounded-lg font-medium transition-all duration-300 mt-auto transform hover:scale-[1.02] shadow hover:shadow-md"
                            onClick={() => navigate('/prestataires', { 
                              state: { 
                                service: service.title,
                                pricingType: 'quote',
                              }
                            })}
                          >
                            Choisir le prestataire convenable
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination avec animations */}
                  {totalPages > 1 && (
                    <div className="flex justify-center mt-8 animate-fade-in-up">
                      <nav className="flex items-center gap-1">
                        <button
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                          className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-[#5869A3] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-110"
                        >
                          <FiChevronLeft className="h-5 w-5" />
                        </button>
                        
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map(page => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-4 py-2 border-t border-b border-gray-300 transition-all duration-300 hover:scale-110 ${
                              currentPage === page 
                              ? 'bg-[#5869A3] text-white scale-105' 
                              : 'bg-white text-[#5869A3] hover:bg-gray-50'
                            }`}
                          >
                            {page}
                          </button>
                        ))}

                        {totalPages > 5 && currentPage < totalPages - 2 && (
                          <span className="px-2 animate-fade-in">...</span>
                        )}

                        {totalPages > 5 && currentPage >= totalPages - 2 && (
                          Array.from({ length: 3 }, (_, i) => totalPages - 2 + i).map(page => (
                            <button
                              key={page}
                              onClick={() => setCurrentPage(page)}
                              className={`px-4 py-2 border-t border-b border-gray-300 transition-all duration-300 hover:scale-110 ${
                                currentPage === page 
                                ? 'bg-[#5869A3] text-white scale-105' 
                                : 'bg-white text-[#5869A3] hover:bg-gray-50'
                              }`}
                            >
                              {page}
                            </button>
                          ))
                        )}

                        {totalPages > 5 && currentPage <= totalPages - 3 && (
                          <>
                            {currentPage < totalPages - 3 && <span className="px-2 animate-fade-in">...</span>}
                            <button
                              onClick={() => setCurrentPage(totalPages)}
                              className={`px-4 py-2 border-t border-b border-gray-300 transition-all duration-300 hover:scale-110 ${
                                currentPage === totalPages 
                                ? 'bg-[#5869A3] text-white scale-105' 
                                : 'bg-white text-[#5869A3] hover:bg-gray-50'
                              }`}
                            >
                              {totalPages}
                            </button>
                          </>
                        )}

                        <button
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                          disabled={currentPage === totalPages}
                          className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-[#5869A3] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-110"
                        >
                          <FiChevronRight className="h-5 w-5" />
                        </button>
                      </nav>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-16 bg-white rounded-xl shadow-sm animate-fade-in-up">
                  <h3 className="text-xl font-medium text-gray-600 mb-2">
                    Aucun service ne correspond à vos critères
                  </h3>
                  <button 
                    onClick={() => {
                      setSearchTerm('');
                      setCategoryFilter('all');
                    }}
                    className="mt-4 px-6 py-2 bg-[#5869A3] text-white rounded-lg hover:bg-[#48578A] transition-all duration-300 transform hover:scale-105 shadow hover:shadow-md"
                  >
                    Réinitialiser les filtres
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ServiceDevis;