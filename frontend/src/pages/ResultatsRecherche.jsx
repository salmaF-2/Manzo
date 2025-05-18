import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  FaMapMarkerAlt, FaStar, FaComments, FaEnvelope, FaUser, 
  FaSearch, FaClock, FaCheckCircle, FaTools, FaHome, 
  FaLaptop, FaTshirt, FaTree, FaTimes 
} from 'react-icons/fa';
import PrestataireCard from '../components/PrestataireCard'
import { prestataires, villes, cityCoordinates } from '../data/data';

// Configuration des icônes Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const ChatInterface = ({ prestataire, onClose }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: `Bonjour ! Je suis ${prestataire.nom}, comment puis-je vous aider ?`,
      sender: 'prestataire',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const messagesEndRef = useRef(null);

  const handleSendMessage = () => {
    if (message.trim() === '') return;
    
    const newMessage = {
      id: messages.length + 1,
      text: message,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMessage]);
    setMessage('');
    
    setTimeout(() => {
      const response = {
        id: messages.length + 2,
        text: `Merci pour votre message. Je vous répondrai dès que possible.`,
        sender: 'prestataire',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, response]);
    }, 1000);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 w-80 bg-white rounded-xl shadow-2xl z-50 flex flex-col border border-gray-200">
      <div className="bg-[#4D6099] text-white p-4 rounded-t-xl flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img 
            src={prestataire.photo} 
            alt={prestataire.nom} 
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="font-semibold">{prestataire.nom}</span>
        </div>
        <button onClick={onClose} className="text-white hover:text-gray-200">
          <FaTimes />
        </button>
      </div>
      
      <div className="flex-grow p-4 overflow-y-auto max-h-80">
        {messages.map(msg => (
          <div 
            key={msg.id} 
            className={`mb-3 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-xs p-3 rounded-lg ${msg.sender === 'user' 
                ? 'bg-[#4D6099] text-white rounded-br-none' 
                : 'bg-gray-100 text-gray-800 rounded-bl-none'}`}
            >
              <p>{msg.text}</p>
              <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-3 border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tapez votre message..."
            className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4D6099]"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            className="bg-[#4D6099] text-white p-2 rounded-lg hover:bg-[#3A4B7D] transition-colors"
          >
            Envoyer
          </button>
        </div>
      </div>
    </div>
  );
};

const ResultatsRecherche = () => {
  const location = useLocation();
  const [prestatairesList, setPrestatairesList] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [loading, setLoading] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [currentPrestataire, setCurrentPrestataire] = useState(null);
  const mapRef = useRef(null);
  const [mapKey, setMapKey] = useState(0);

  const getCityCoordinates = (city) => {
    return cityCoordinates[city] || { 
      lat: 31.7917,
      lng: -7.0926,
      zoom: 6 
    };
  };

  const handleOpenChat = (prestataire) => {
    setCurrentPrestataire(prestataire);
    setChatOpen(true);
  };

 
    const filterPrestataires = (city, service) => {
      setLoading(true);
      
      setTimeout(() => {
        if (!city || !prestataires[city]) {
          setPrestatairesList([]);
          setLoading(false);
          return;
        }
    
        let filtered = prestataires[city];
        
        if (service) {
          filtered = filtered.filter(p => 
            p.service.toLowerCase() === service.toLowerCase()
          );
        }
        
        setPrestatairesList(filtered || []);
        setLoading(false);
        
        // Force la réinitialisation de la carte en changeant sa clé
        setMapKey(prevKey => prevKey + 1);
        
        // Optionnel: si vous voulez aussi déplacer la carte
        if (mapRef.current) {
          const { lat, lng, zoom } = getCityCoordinates(city);
          mapRef.current.flyTo([lat, lng], zoom);
        }
      }, 500);
    };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const service = params.get('service') || '';
    const city = params.get('location') || villes[0] || 'Marrakech';
    
    setSelectedService(service);
    setSelectedCity(city);
    filterPrestataires(city, service);
  }, [location.search]);

  const handleSearch = () => {
    filterPrestataires(selectedCity, selectedService);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#F8FAFC] to-[#E9EFF9]">
      {/* Barre de recherche */}
      <div className="flex-grow container mx-auto px-4 py-8 pt-32">
        <div className="relative z-10 bg-white p-6 shadow-xl rounded-2xl flex flex-col sm:flex-row text-[#4D6099] w-full max-w-5xl mx-auto gap-4 border border-gray-100">
          <div className="flex items-center flex-1 p-3 border-2 border-gray-200 rounded-xl bg-white focus-within:border-[#4D6099] transition-colors">
            <FaUser className="mr-3 text-[#809DCA] text-lg" />
            <select 
              className="flex-1 bg-transparent focus:outline-none text-[#1F263D] font-medium"
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
            >
              <option value="">Tous les services</option>
              <option value="Plomberie">Plomberie</option>
              <option value="Ménage">Ménage</option>
              <option value="Électricité">Électricité</option>
              <option value="Couture">Couture</option>
              <option value="Jardinage">Jardinage</option>
              <option value="Informatique">Informatique</option>
            </select>
          </div>
          
          <div className="flex items-center flex-1 p-3 border-2 border-gray-200 rounded-xl bg-white focus-within:border-[#4D6099] transition-colors">
            <FaMapMarkerAlt className="mr-3 text-[#809DCA] text-lg" />
            <select 
              className="flex-1 bg-transparent focus:outline-none text-[#1F263D] font-medium"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              {villes.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
          
          <button
            className="text-white px-8 py-3 flex items-center justify-center rounded-xl hover:bg-[#1F263D] transition-colors shadow-md"
            style={{ 
              backgroundColor: '#4D6099',
              backgroundImage: 'linear-gradient(to right, #4D6099, #3A4B7D)'
            }}
            onClick={handleSearch}
          >
            <FaSearch className="mr-2" />
            <span className="font-semibold">Rechercher</span>
          </button>
        </div>
      </div>

      {/* Contenu principal */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#1F263D] mb-2">
            {selectedService 
              ? `Prestataires en ${selectedService} à ${selectedCity}` 
              : `Tous les prestataires à ${selectedCity}`}
          </h1>
          <p className="text-lg text-gray-600">
            {prestatairesList.length} {prestatairesList.length === 1 ? 'professionnel disponible' : 'professionnels disponibles'}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Liste des prestataires */}
          <div className="lg:w-1/2 space-y-6">
            {loading ? (
              <div className="space-y-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-white p-6 rounded-xl shadow animate-pulse h-40"></div>
                ))}
              </div>
            ) : prestatairesList.length > 0 ? (
              prestatairesList.map(prestataire => (
                <PrestataireCard 
                  key={prestataire.id} 
                  prestataire={prestataire} 
                  onOpenChat={handleOpenChat}
                />
              ))
            ) : (
              <div className="bg-white p-8 rounded-xl shadow-md text-center">
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/4076/4076478.png" 
                  alt="Aucun résultat" 
                  className="w-24 mx-auto mb-4 opacity-70"
                />
                <h3 className="text-xl font-bold text-[#1F263D] mb-2">
                  Aucun prestataire trouvé
                </h3>
                <p className="text-gray-600">
                  Essayez de modifier vos critères de recherche ou élargissez la zone géographique
                </p>
              </div>
            )}
          </div>

          {/* Carte */}
          <div className="lg:w-1/2 h-[600px] sticky top-6 rounded-xl overflow-hidden shadow-xl border-2 border-white">
            {selectedCity && (
              <MapContainer
                key={mapKey}
                center={[getCityCoordinates(selectedCity).lat, getCityCoordinates(selectedCity).lng]}
                zoom={getCityCoordinates(selectedCity).zoom}
                className="h-full"
                whenCreated={map => { mapRef.current = map }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {!loading && prestatairesList.map(prestataire => (
                  <Marker key={prestataire.id} position={prestataire.localisation}>
                    <Popup className="custom-popup">
                      <div className="text-center min-w-[200px]">
                        <img
                          src={prestataire.photo}
                          alt={prestataire.nom}
                          className="w-16 h-16 rounded-full mx-auto mb-3 border-2 border-[#4D6099]"
                        />
                        <h4 className="font-bold text-lg text-[#1F263D]">{prestataire.nom}</h4>
                        <p className="text-gray-600 flex items-center justify-center gap-1">
                          {prestataire.service}
                        </p>
                        <div className="flex items-center justify-center mt-2 text-yellow-500">
                          <FaStar />
                          <span className="ml-1 font-bold">{prestataire.note}</span>
                          <span className="text-gray-500 text-sm ml-1">({prestataire.avis})</span>
                        </div>
                        <div className="mt-2 flex items-center justify-center text-gray-600">
                          <FaMapMarkerAlt className="mr-1 text-[#4D6099]" />
                          <span>{prestataire.distance}</span>
                        </div>
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <button
                            onClick={() => handleOpenChat(prestataire)}
                            className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                          >
                            <FaComments /> Chat
                          </button>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            )}
          </div>
        </div>
      </main>

      {/* Chat */}
      {chatOpen && (
        <ChatInterface 
          prestataire={currentPrestataire} 
          onClose={() => setChatOpen(false)} 
        />
      )}
    </div>
  );
};

export default ResultatsRecherche;