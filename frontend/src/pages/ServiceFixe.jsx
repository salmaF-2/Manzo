import { useState, useEffect } from 'react';
import { servicesFixes, categories } from '../data/data';
import { FiSearch, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaStar, FaRegClock,FaHome } from 'react-icons/fa';

const ServiceFixe = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 10;

  const [fixedServices] = useState(servicesFixes);

  // Filtrage des services
  const filteredServices = fixedServices.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || 
                          service.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = filteredServices.slice(indexOfFirstService, indexOfLastService);
  const totalPages = Math.ceil(filteredServices.length / servicesPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, categoryFilter]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#5869A3] mb-4 relative pb-2 
              after:content-[''] after:block after:w-20 after:h-1 after:bg-[#5869A3] 
              after:mt-4 after:mx-auto after:rounded-full">
            Nos Services à Prix Fixe
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Des services de qualité avec des tarifs transparents
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar des catégories */}
          <div className="lg:w-1/4">
            <div className="bg-white p-6 rounded-xl shadow-sm sticky top-4">
              <h2 className="text-xl font-semibold text-[#5869A3] mb-4 flex items-center">
                <FaHome className="mr-2" />
                Catégories
              </h2>
              <ul className="space-y-2">
                {categories.map(cat => (
                  <li key={cat.id}>
                    <button
                      onClick={() => setCategoryFilter(cat.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition ${
                        categoryFilter === cat.id 
                        ? 'bg-[#5869A3] text-white' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      <span className="mr-3">{cat.icon}</span>
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="lg:w-3/4">
            {/* Barre de recherche */}
            <div className="mb-8 bg-white p-6 rounded-xl shadow-sm">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher un service..."
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5869A3]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Résultats */}
            <div className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-700">
                  {filteredServices.length} services disponibles
                  {categoryFilter !== 'all' && ` dans ${categories.find(c => c.id === categoryFilter)?.name}`}
                </h2>
                {filteredServices.length > servicesPerPage && (
                  <div className="text-sm text-gray-500">
                    Page {currentPage} sur {totalPages}
                  </div>
                )}
              </div>

              {/* Liste des services */}
              {currentServices.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {currentServices.map(service => (
                      <div key={service.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                        <div className="h-48 bg-gray-200 relative overflow-hidden">
                          <img 
                            src={`/images/services/${service.image}`} 
                            alt={service.title}
                            className="w-full h-full object-cover"
                            onError={(e) => e.target.src = '/images/services/default.jpg'}
                          />
                          <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full flex items-center text-sm shadow">
                            <FaStar className="text-yellow-500 mr-1" />
                            {service.rating}
                          </div>
                        </div>
                        
                        <div className="p-6 flex-grow flex flex-col">
                          <div className="flex items-center mb-3">
                            <div className="mr-3">{service.icon}</div>
                            <h2 className="text-xl font-bold text-[#5869A3]">{service.title}</h2>
                          </div>
                          <p className="text-gray-600 mb-4 flex-grow">{service.description}</p>
                          
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-2xl font-bold text-[#5869A3]">{service.price} MAD</span>
                            <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                              {service.duration}
                            </span>
                          </div>
                          
                          <button className="w-full bg-[#5869A3] hover:bg-[#48578A] text-white py-3 rounded-lg font-medium transition-colors duration-300 mt-auto">
                            Choisir le prestataire convenable
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center mt-8">
                      <nav className="flex items-center gap-1">
                        <button
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                          className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-[#5869A3] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <FiChevronLeft className="h-5 w-5" />
                        </button>
                        
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map(page => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-4 py-2 border-t border-b border-gray-300 ${
                              currentPage === page 
                              ? 'bg-[#5869A3] text-white' 
                              : 'bg-white text-[#5869A3] hover:bg-gray-50'
                            }`}
                          >
                            {page}
                          </button>
                        ))}

                        {totalPages > 5 && currentPage < totalPages - 2 && (
                          <span className="px-2">...</span>
                        )}

                        {totalPages > 5 && currentPage >= totalPages - 2 && (
                          Array.from({ length: 3 }, (_, i) => totalPages - 2 + i).map(page => (
                            <button
                              key={page}
                              onClick={() => setCurrentPage(page)}
                              className={`px-4 py-2 border-t border-b border-gray-300 ${
                                currentPage === page 
                                ? 'bg-[#5869A3] text-white' 
                                : 'bg-white text-[#5869A3] hover:bg-gray-50'
                              }`}
                            >
                              {page}
                            </button>
                          ))
                        )}

                        {totalPages > 5 && currentPage <= totalPages - 3 && (
                          <>
                            {currentPage < totalPages - 3 && <span className="px-2">...</span>}
                            <button
                              onClick={() => setCurrentPage(totalPages)}
                              className={`px-4 py-2 border-t border-b border-gray-300 ${
                                currentPage === totalPages 
                                ? 'bg-[#5869A3] text-white' 
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
                          className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-[#5869A3] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <FiChevronRight className="h-5 w-5" />
                        </button>
                      </nav>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-16 bg-white rounded-xl shadow-sm">
                  <h3 className="text-xl font-medium text-gray-600 mb-2">
                    Aucun service ne correspond à vos critères
                  </h3>
                  <button 
                    onClick={() => {
                      setSearchTerm('');
                      setCategoryFilter('all');
                    }}
                    className="mt-4 px-6 py-2 bg-[#5869A3] text-white rounded-lg hover:bg-[#48578A] transition"
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

export default ServiceFixe;