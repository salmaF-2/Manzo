import React, { useEffect } from "react";
import { FiArrowLeft, FiUpload, FiPlus, FiTrash2, FiClock, FiMapPin, FiPhone, FiMail, FiHome } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import SideBar from "./SideBar";

const ModifierProfil = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const location = useLocation();
  const from = location.state?.from || '/ProfilPrestataire';

  return (
    <div className="flex bg-gray-50 min-h-[calc(100vh-5rem)] mt-20">
      <SideBar />
      
      <div className="flex-1 ml-60 p-8">
        {/* Bouton de retour */}
        <Link 
          to={from} 
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-6"
        >
          <FiArrowLeft className="mr-2" />
          Retour au profil
        </Link>

        {/* Titre principal */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Modifier le profil</h1>
          <div className="flex gap-4">
            <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
              Annuler
            </button>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Enregistrer
            </button>
          </div>
        </div>

        {/* Grille principale */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne de gauche */}
          <div className="lg:col-span-2 space-y-8">
            {/* Carte Informations personnelles */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100">
                Informations personnelles
              </h2>
              
              <div className="flex flex-col md:flex-row gap-8">
                {/* Photo de profil */}
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <img 
                      src="https://randomuser.me/api/portraits/women/21.jpg" 
                      alt="Profile" 
                      className="w-40 h-40 rounded-full object-cover border-4 border-white shadow"
                    />
                    <div className="absolute bottom-0 right-0 bg-blue-100 p-2 rounded-full">
                      <label htmlFor="fileInput" className="cursor-pointer">
                        <FiUpload className="text-blue-600" />
                      </label>
                      <input id="fileInput" type="file" className="hidden" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 text-center">
                    Formats supportés: JPG, PNG<br/>
                    Taille max: 5MB
                  </p>
                </div>

                {/* Formulaire */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
                    <input 
                      type="text" 
                      placeholder="Votre prénom" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                    <input 
                      type="text" 
                      placeholder="Votre nom" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Titre professionnel</label>
                    <input 
                      type="text" 
                      placeholder="Votre métier ou spécialité" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Carte À propos */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100">
                À propos
              </h2>
              <textarea
                placeholder="Décrivez votre expérience, vos compétences et votre approche..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition min-h-[150px]"
              ></textarea>
            </div>

            {/* Carte Services */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100">
                Services proposés
              </h2>
              
              <div className="flex gap-2 mb-6">
                <input
                  type="text"
                  placeholder="Ajouter un service"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <FiPlus /> Ajouter
                </button>
              </div>
              
              <div className="space-y-3">
                {['Plomberie générale', 'Installation sanitaire', 'Dépannage urgent'].map((service, index) => (
                  <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                    <span className="text-gray-700">{service}</span>
                    <button className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50">
                      <FiTrash2 />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Carte Services à prix fixe */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100">
                Services à prix fixe
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-2 mb-6">
                <input
                  type="text"
                  placeholder="Service"
                  className="md:col-span-5 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
                <input
                  type="text"
                  placeholder="Prix (DH)"
                  className="md:col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
                <input
                  type="text"
                  placeholder="Description"
                  className="md:col-span-4 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
                <button className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <FiPlus />
                </button>
              </div>
              
              <div className="space-y-3">
                <div className="grid grid-cols-12 gap-4 items-center bg-gray-50 p-3 rounded-lg">
                  <span className="md:col-span-5 text-gray-700">Débouchage évier</span>
                  <span className="md:col-span-2 text-gray-700">800 DH</span>
                  <span className="md:col-span-4 text-gray-500 text-sm">Débouchage rapide et efficace</span>
                  <button className="md:col-span-1 text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 flex justify-end">
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Colonne de droite */}
          <div className="space-y-8">
            {/* Carte Contact */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100">
                Contact
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                    <FiPhone className="text-gray-400" /> Téléphone
                  </label>
                  <input 
                    type="tel" 
                    placeholder="+212 6 12 34 56 78" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                    <FiMail className="text-gray-400" /> Email
                  </label>
                  <input 
                    type="email" 
                    placeholder="votre@email.com" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                    <FiHome className="text-gray-400" /> Adresse
                  </label>
                  <input 
                    type="text" 
                    placeholder="Votre adresse complète" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  />
                </div>
              </div>
            </div>

            {/* Carte Localisation */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100">
                Localisation
              </h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <FiMapPin className="text-gray-400" /> Ville
                </label>
                <input 
                  type="text" 
                  placeholder="Votre ville" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
              </div>
              
              <div className="rounded-xl overflow-hidden border border-gray-200">
                <div className="h-48 bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400">Carte interactive</span>
                </div>
              </div>
            </div>

            {/* Carte Disponibilité */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-100 flex items-center gap-2">
                <FiClock className="text-gray-400" /> Disponibilité
              </h2>
              
              <div className="space-y-4">
                {['Lundi', 'Mardi', 'Mercredi'].map((jour, index) => (
                  <div key={index} className="grid grid-cols-5 gap-2">
                    <select className="col-span-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm">
                      <option>{jour}</option>
                    </select>
                    <input 
                      type="time" 
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"
                    />
                    <span className="flex items-center justify-center">à</span>
                    <input 
                      type="time" 
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"
                    />
                  </div>
                ))}
                
                <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mt-4 text-sm">
                  <FiPlus /> Ajouter un créneau
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModifierProfil;