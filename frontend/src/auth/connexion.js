import React, { useEffect } from "react";
import image from "../assets/images/CrCompte/imageinscription.png";
import Google from "../assets/images/CrCompte/google.png";
import { Link } from "react-router-dom";


const Connexion = () =>{
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-white p-4 md:mt-20 mt-14">
            <div className="bg-white shadow-lg rounded-lg flex flex-col md:flex-row w-full max-w-4xl overflow-hidden">
                <div className="w-full md:w-1/2 p-4 md:p-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-900 md:mt-8">Bienvenue</h2>
                    <p className="text-center text-gray-600 mt-2 md:mt-4">Veuillez entrer vos identifiants:</p>
                    <button className="flex bg-[#E8E8E8] items-center justify-center px-4 py-2 rounded-full w-full md:w-[300px] mt-4 md:mt-6 mx-auto">
                        <img src={Google} alt="Google" className="w-5 h-5 mr-2" />
                        <span>Se connecter avec Google</span>
                    </button>
                    <div className="flex items-center my-3 md:my-4">
                        <hr className="flex-grow border-gray-300"/>
                        <span className="px-2 text-gray-500">ou</span>
                        <hr className="flex-grow border-gray-300"/>
                    </div>
                    <input type="email" placeholder="Email" className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <input type="password" placeholder="Mot de passe" className="w-full px-4 py-2 mt-3 md:mt-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500" />  
                    <div className="mt-3 md:mt-4">
                        <input type="checkbox" id="remember" className="mr-2" />
                        <label htmlFor="remember" className="text-gray-600">Se souvenir de moi pendant 30 jours</label>
                    </div>
                    <button className="w-full mt-3 md:mt-4 bg-[#4C5A91] text-white py-2 rounded-full shadow-sm hover:bg-[#48578A]">Se connecter</button>
                    <p className="mt-3 md:mt-4 text-center text-gray-600">
                        Vous n'avez pas de compte ? <Link to='/CreerCompte'><a href="#" className="text-blue-700 font-semibold">Inscrivez-vous</a></Link>
                    </p>    
                </div>

                <div className="w-full md:w-1/2 mt-0 md:mt-2">
                    <img src={image} alt="Artisan travaillant" className="w-full h-full object-cover" />
                </div>
            </div>
        </div>
    )
};

export default Connexion;