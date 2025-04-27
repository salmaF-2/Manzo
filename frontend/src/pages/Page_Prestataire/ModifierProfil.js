import React, { useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import SideBar from "./SideBar";
import image1 from '../../assets/images/image1.png';

const ModifierProfil = () => {
    useEffect(() => {
              window.scrollTo(0, 0);
        }, []);
  const location = useLocation();
  const from = location.state?.from || '/ProfilPrestataire';

  return (
    <div className="flex bg-[rgba(188,208,234,0.20)] min-h-[calc(100vh-5rem)] mt-20">
      <SideBar />
      
      <div className="flex-1 ml-60 p-6 mt-4">
        {/* Bouton de retour  */}
        <Link to={from} 
          className="flex items-center text-blue-600 mb-4 hover:text-blue-800 transition-colors">
          <FaArrowLeft className="mr-2" />
          Retour au profil
        </Link>

        {/* titre */}
        <h1 className="text-2xl font-bold mb-6">Modifier le profil</h1>
        
        {/* Partie 1 => formulaire de modification */}
        <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold mb-6">Informations personnelles</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                {/* Photo de profil */}
                <div className="flex flex-col items-center">
                    <div className="relative">
                        <img src="https://randomuser.me/api/portraits/women/21.jpg"  alt="Profile" className="w-56 h-56 rounded-full object-cover mb-4"/>

                        {/* Input file caché */}
                        <input id="fileInput" type="file" accept="image/*" className="hidden" onChange={(e) => {const file = e.target.files[0];
                            if (file) {
                            const imageUrl = URL.createObjectURL(file);
                            console.log("Image sélectionnée :", imageUrl);
                            }
                        }}/>
                    </div>

                    {/* Label qui déclenche l'input */}
                    <label htmlFor="fileInput" className="flex items-center justify-center gap-2 px-4 py-2 mt-2 border rounded-lg hover:bg-gray-100 text-sm cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553 4.553a1.25 1.25 0 01-1.768 1.768L13 12l-1 1m-6 4V5a2 2 0 012-2h7a2 2 0 012 2v6m-2 0l-4 4m0 0l-4-4" />
                        </svg>
                        Changer la photo
                    </label>
                </div>


                {/* Champs texte */}
                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Prénom</label>
                    <input type="text" placeholder="Entrer votre Prénom" className="border rounded-lg w-full p-2"/>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Nom</label>
                    <input type="text" placeholder="Entrer votre Nom" className="border rounded-lg w-full p-2"/>
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Titre professionnel</label>
                    <input type="text" placeholder="Entrer votre profession" className="border rounded-lg w-full p-2"/>
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-1">Localisation</label>
                    <input type="text" placeholder="Entrer votre localisation" className="border rounded-lg w-full p-2"/>
                </div>

                {/* Réseaux sociaux */}
                <div>
                    <label className="block text-sm font-medium mb-1">LinkedIn</label>
                    <div className="flex items-center border rounded-lg p-2">
                    <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" className="h-5 w-5 mr-2" />
                    <input type="text" placeholder="URL LinkedIn" className="w-full outline-none"/>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Instagram</label>
                    <div className="flex items-center border rounded-lg p-2">
                    <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" className="h-5 w-5 mr-2" />
                    <input type="text" placeholder="URL Instagram" className="w-full outline-none"/>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Facebook</label>
                    <div className="flex items-center border rounded-lg p-2">
                    <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" className="h-5 w-5 mr-2" />
                    <input type="text" placeholder="URL Facebook" className="w-full outline-none" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Tiktok</label>
                    <div className="flex items-center border rounded-lg p-2">
                    <img src="https://cdn-icons-png.flaticon.com/512/3046/3046125.png" alt="Tiktok" className="h-5 w-5 mr-2" />
                    <input type="text" placeholder="URL Tiktok" className="w-full outline-none"/>
                    </div>
                </div>
                </div>
            </div>
        </div>


        {/* Partie 2*/}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">

        <div className="lg:col-span-2 space-y-6">

            {/* À propos */}
            <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">À propos</h2>
            <textarea
                placeholder="Décrivez votre expérience et vos compétences..."
                className="border rounded-lg w-full p-4 h-40 resize-none"
            ></textarea>
            </div>

            {/* Services proposés */}
            <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Services proposés</h2>

            {/* Champ pour ajouter un service */}
            <div className="flex gap-2 mb-4">
                <input
                type="text"
                placeholder="Nouveau service"
                className="border rounded-lg p-2 flex-1"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                Ajouter
                </button>
            </div>

            {/* Liste des services */}
            <div className="space-y-2">
                <div className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
                <span>Plomberie générale</span>
                <button className="text-red-500 hover:text-red-700">🗑️</button>
                </div>
                <div className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
                <span>Installation sanitaire</span>
                <button className="text-red-500 hover:text-red-700">🗑️</button>
                </div>
            </div>
            </div>

        </div>

        {/* Colonne droite : Localisation */}
        <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Localisation</h2>

            <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Adresse</label>
            <input type="text" placeholder="Votre adresse" className="border rounded-lg w-full p-2" />
            </div>

            <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Ville</label>
            <input type="text" placeholder="Votre ville" className="border rounded-lg w-full p-2" />
            </div>

            {/* Carte */}
            <div className="rounded-lg overflow-hidden mt-4">
            <img src="https://upload.wikimedia.org/wikipedia/commons/8/88/OpenStreetMap_Project_Logo.svg"
                alt="Carte" className="w-full h-48 object-cover"
            />
            </div>
        </div>
        </div>







        {/* Partie 3 => Services à prix fixe */}
        <div className="space-y-6 mt-6">
            <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Services à prix fixe</h2>
            <div className="flex gap-2 mb-4">
                <input type="text" placeholder="Service" className="border rounded-lg p-2 flex-1" />
                <input type="text" placeholder="Prix" className="border rounded-lg p-2 w-24" />
                <input type="text" placeholder="Description" className="border rounded-lg p-2 flex-1" />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                + Ajouter
                </button>
            </div>
            {/* Exemple de service ajouté */}
            <div className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
                <span>Débouchage évier</span>
                <div className="flex items-center gap-2">
                <span className="text-gray-700">800 DH</span>
                <button className="text-red-500 hover:text-red-700">🗑️</button>
                </div>
            </div>
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Disponibilité */}
            <div className="bg-white rounded-2xl shadow p-6">
                <h2 className="text-xl font-semibold mb-4 ">Disponibilité</h2>
                <div className="space-y-4 mt-10">
                    {[1,2,3].map((_, i) => (
                        <div className="flex gap-2" key={i}>
                        <select className="border rounded-lg p-2 w-40">
                            <option>--Rien--</option>
                            <option>Dimanche</option>
                            <option>Lundi</option>
                            <option>Mardi</option>
                            <option>Mercredi</option>
                            <option>Jeudi</option>
                            <option>Vedredi</option>
                            <option>Samedi</option>
                        </select>
                        <span className="flex items-center">-</span>
                        <select className="border rounded-lg p-2 w-40">
                            <option>--Rien--</option>
                            <option>Dimanche</option>
                            <option>Lundi</option>
                            <option>Mardi</option>
                            <option>Mercredi</option>
                            <option>Jeudi</option>
                            <option>Vedredi</option>
                            <option>Samedi</option>
                        </select>
                        <input type="time" className="border rounded-lg p-2 w-36" />
                        <input type="time" className="border rounded-lg p-2 w-36" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Contact */}
            <div className="bg-white rounded-2xl shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Contact</h2>
                <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Téléphone</label>
                    <input type="text" placeholder="+33 6 12 34 56 78" className="border rounded-lg w-full p-2" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input type="email" placeholder="email@example.com" className="border rounded-lg w-full p-2" />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Adresse</label>
                    <input type="text" placeholder="Votre adresse" className="border rounded-lg w-full p-2" />
                </div>
                </div>
            </div>

        </div>

        {/* Avis clients */}
        {/* <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Avis clients</h2>

            <div className="flex gap-4 mb-4">
                <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg">Affichés (12)</button>
                <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg">Masqués (3)</button>
            </div>

            <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg flex flex-col gap-2">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                    <img src="https://i.pravatar.cc/40" alt="Marie Laurent" className="w-8 h-8 rounded-full" />
                    <span className="font-semibold">Marie Laurent</span>
                    </div>
                    <span>🙈</span>
                </div>
                <div className="flex gap-1 text-yellow-400">
                    ★★★★☆
                </div>
                <p className="text-gray-600">Excellent travail, très professionnel et ponctuel.</p>
                <p className="text-sm text-gray-400">12 Jan 2025</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg flex flex-col gap-2">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                    <img src="https://i.pravatar.cc/41" alt="Pierre Martin" className="w-8 h-8 rounded-full" />
                    <span className="font-semibold">Pierre Martin</span>
                    </div>
                    <span>👀</span>
                </div>
                <div className="flex gap-1 text-yellow-400">
                    ★★★☆☆
                </div>
                <p className="text-gray-600">Service correct mais un peu cher.</p>
                <p className="text-sm text-gray-400">5 Jan 2025</p>
                </div>
            </div>
        </div> */}

        {/* Boutons en bas */}
        <div className="flex justify-end gap-4 mt-6">
        <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100">Annuler</button>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">Enregistrer</button>
        </div>

        </div>

      </div>
    </div>
  );
};

export default ModifierProfil;