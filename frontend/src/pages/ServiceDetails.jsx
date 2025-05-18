import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { servicesFixes, servicesDevis, prestataires, villes } from '../../data/data';
import { getIconComponent } from '../../data/icons';
import PrestataireCard from '../Recherche/PrestataireCard';

const ServiceDetails = () => {
  const { serviceId } = useParams();
  const [city, setCity] = useState('Marrakech');

  // Trouver le service
  const service = [...servicesFixes, ...servicesDevis].find(
    s => s.id === parseInt(serviceId) || s.id === serviceId
  );

  // Trouver les prestataires
  const filteredPrestataires = prestataires[city]?.filter(
    p => p.service === service.category
  ) || [];

  if (!service) {
    return <div className="container mx-auto px-4 py-8">Service non trouvé</div>;
  }

  const Icon = getIconComponent(service.icon);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Section détail du service */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="md:w-1/4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 h-48 w-full rounded-lg flex items-center justify-center">
              <Icon className="text-6xl text-blue-600" />
            </div>
          </div>
          
          <div className="md:w-3/4">
            <h1 className="text-3xl font-bold mb-2 text-gray-800">{service.title}</h1>
            <p className="text-gray-600 mb-4 text-lg">{service.description}</p>
            
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Choisissez votre ville :</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-64 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
                {villes.map(ville => (
                  <option key={ville} value={ville}>{ville}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Section prestataires */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">
          {filteredPrestataires.length} Prestataire{filteredPrestataires.length !== 1 ? 's' : ''} disponible{filteredPrestataires.length !== 1 ? 's' : ''} à {city}
        </h2>
        
        {filteredPrestataires.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrestataires.map(prestataire => (
              <PrestataireCard 
                key={prestataire.id} 
                prestataire={prestataire}
                city={city}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-2xl mx-auto">
            <div className="text-blue-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-800">Aucun prestataire disponible</h3>
            <p className="text-gray-600 mb-4">Essayez de modifier la ville ou revenez plus tard.</p>
            <button 
              onClick={() => setCity('Marrakech')} 
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Réinitialiser la ville
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceDetails;