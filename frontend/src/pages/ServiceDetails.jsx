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
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
              <Icon className="text-5xl text-blue-600" />
            </div>
          </div>
          
          <div className="md:w-2/3">
            <h1 className="text-3xl font-bold mb-2">{service.title}</h1>
            <p className="text-gray-600 mb-4">{service.description}</p>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Ville :</label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-auto"
              >
                {villes.map(ville => (
                  <option key={ville} value={ville}>{ville}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-6">
        Prestataires disponibles à {city}
      </h2>
      
      <div className="space-y-6">
        {filteredPrestataires.length > 0 ? (
          filteredPrestataires.map(prestataire => (
            <PrestataireCard 
              key={prestataire.id} 
              prestataire={prestataire}
              city={city}
            />
          ))
        ) : (
          <div className="bg-white p-8 rounded-xl shadow-md text-center">
            <h3 className="text-xl font-bold mb-2">Aucun prestataire disponible</h3>
            <p className="text-gray-600">Essayez de modifier la ville ou revenez plus tard.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceDetails;