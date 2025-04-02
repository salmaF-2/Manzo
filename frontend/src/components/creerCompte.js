import React from "react";
import { Link } from "react-router-dom";
import prestataire from "../assets/images/CrCompte/prestataire.png";
import service from "../assets/images/CrCompte/service.png";


const CreerCompte = () =>{
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white mt-10">
            <h1 className="text-4xl text-[#6977AF] font-bold mb-6">Bienvenue chez <span className="text-[#475489]">Manzo</span></h1>
            <h3 className="text-2sm text-[#434F83] mb-6">Choisissez votre profil d'inscription</h3>

            <div className="flex space-x-10">
                <Link to='/InscriptionClient'>
                <div className="border rounded-lg shadow-lg p-6 w-[320px] h-[300px] text-center transition-transform transform hover:scale-105 hover:shadow-2xl">
                    <div className="flex justify-center mb-10">
                    <img src={service} alt="Service" className="w-16 h-16 mt-4" />
                    </div>
                    <h2 className="font-bold text-lg">J'ai besoin d'un service</h2>
                    <p className="text-gray-600">Réservez le prestataire idéal pour vos services du quotidien</p>
                </div>
                </Link>
                <div className="flex items-center text-gray-500 text-lg font-semibold">OU</div>
                <Link to='/InscriptionPrestataire'>
                <div className="border rounded-lg shadow-lg p-6 w-[320px] h-[300px] text-center transition-transform transform hover:scale-105 hover:shadow-2xl">
                    <div className="flex justify-center mb-10">
                    <img src={prestataire} alt="Prestataire" className="w-16 h-16 mt-4" />
                    </div>
                    <h2 className="font-bold text-lg">Devenir prestataire</h2>
                    <p className="text-gray-600">Augmentez vos revenus en rendant service près de chez vous</p>
                </div>
                </Link>
            </div>

            <p className="mt-6 text-gray-600 mt-10">
                Vous avez déjà un compte ?{' '}
                <Link to='/Seconnecter'><a href="#" className="text-blue-500 ">Connectez-vous</a></Link>
            </p>
        </div>
    )
}
export default CreerCompte;