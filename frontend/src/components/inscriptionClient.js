import React from "react";
import ClientImage from '../assets/images/CrCompte/InscClient.png';
import Google from "../assets/images/CrCompte/google.png";
import { Link } from "react-router-dom";

// responsive faite
const InscriptionClient = () =>{
    return(
        <div className="relative min-h-screen flex items-center justify-center bg-gray-100 mt-12 px-4">
            <div className="absolute inset-0">
                <img src={ClientImage} alt="Background" className="w-full h-full object-cover" />
            </div>

            <div className="relative bg-white shadow-lg rounded-lg p-8 w-full max-w-lg md:max-w-2xl">
                <h2 className="text-center text-4xl text-[#6977AF] font-bold font-semibold mb-4">Inscription client</h2>
                <p className="text-center text-gray-500 mb-4">
                    Vous avez déjà un compte ? <Link to='/Seconnecter'><a href="#" className="text-blue-600">Connectez-vous</a></Link>
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                    <div>
                        <label htmlFor="nom" className="block text-gray-700">Nom</label>
                        <input type="text" id="nom" placeholder="Nom" className="border p-2 rounded-full w-full" />
                    </div>
                    <div>
                        <label htmlFor="prenom" className="block text-gray-700">Prénom</label>
                        <input type="text" id="prenom" placeholder="Prénom" className="border p-2 rounded-full w-full" />
                    </div>
                    <div>
                        <label htmlFor="dateNaissance" className="block text-gray-700">Date De Naissance</label>
                        <input type="date" id="dateNaissance" className="border p-2 rounded-full w-full" />
                    </div>
                    <div>
                        <label htmlFor="genre" className="block text-gray-700">Genre</label>
                        <input type="text" id="genre" placeholder="Genre" className="border p-2 rounded-full w-full" />
                    </div>
                    <div>
                        <label htmlFor="ville" className="block text-gray-700">Sélectionner Votre Ville</label>
                        <input type="text" id="ville" placeholder="Sélectionner Votre Ville" className="border p-2 rounded-full w-full" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-gray-700">E-Mail</label>
                        <input type="email" id="email" placeholder="E-Mail" className="border p-2 rounded-full w-full" />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700">Mot De Passe</label>
                        <input type="password" id="password" placeholder="Mot De Passe" className="border p-2 rounded-full w-full" />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-gray-700">Confirmez Votre Mot De Passe</label>
                        <input type="password" id="confirmPassword" placeholder="Confirmez Votre Mot De Passe" className="border p-2 rounded-full w-full" />
                    </div>
                </div>

                <div className="mt-4 flex justify-center">
                    <button className="flex bg-[#D9D9D9] items-center justify-center px-4 py-2 rounded-full w-full md:w-1/2 mt-2">
                        <img src={Google} alt="Google" className="w-5 h-5 mr-2" />
                        <span>Se connecter avec Google</span>
                    </button>
                </div>

                <div className="mt-4">
                    <input type="checkbox" id="terms" className="mr-2" />
                    <label htmlFor="terms">
                        J'AI LU ET J'ACCEPTE LES <a href="#" className="text-blue-600">CONDITIONS GÉNÉRALES D'UTILISATION</a>
                    </label>
                </div>

                <button className="mt-4 bg-[#4C5A91] text-white py-2 rounded-full shadow-sm hover:bg-[#48578A] w-full font-semibold">
                    Créer un compte
                </button>
            </div>
        </div>

    )
};

export default InscriptionClient; 