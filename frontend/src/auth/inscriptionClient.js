import React, { useEffect, useState } from "react";
import ClientImage from '../assets/images/CrCompte/InscClient.png';
import Google from "../assets/images/CrCompte/google.png";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const InscriptionClient = () => {
    const [cities, setCities] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Récupérer les villes au chargement du composant
        const fetchCities = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/auth/cities');
                const data = await response.json();
                if (response.ok) {
                    setCities(data);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des villes:", error);
            }
        };
        
        fetchCities();
        window.scrollTo(0, 0);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            nom: document.getElementById('nom').value,
            prenom: document.getElementById('prenom').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            confirmPassword: document.getElementById('confirmPassword').value,
            ville: document.getElementById('ville').value,
            genre: document.getElementById('genre').value,
            telephone: document.getElementById('telephone').value 
        };

        try {
            const response = await fetch('http://localhost:5000/api/auth/register/client', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData)
            });

            const data = await response.json();
        
            if (!response.ok) {
                console.error('Détails de l\'erreur:', data);
                throw new Error(data.message || 'Erreur lors de l\'inscription');
            }
            
            console.log('Inscription réussie:', data);
            if (data.token) localStorage.setItem('token', data.token);
            
            // Afficher la notification de succès
            toast.success('Inscription réussie! Redirection en cours...', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                onClose: () => {
                    // Rediriger vers la page d'accueil après la notification
                    navigate('/');
                }
            });
            
        } catch (error) {
            console.error('Erreur complète:', error);
            toast.error(`Erreur: ${error.message}`, {
                position: "top-center"
            });
        }
    };

    return(
        <div className="relative min-h-screen flex items-center justify-center bg-gray-100 mt-14 px-4 sm:px-6 lg:px-8">
            <ToastContainer />
            <div className="absolute inset-0">
                <img src={ClientImage} alt="Background" className="w-full h-full object-cover" />
            </div>

            <div className="relative bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-md sm:max-w-lg md:max-w-2xl mx-auto">
                <h2 className="text-center text-3xl sm:text-4xl text-[#6977AF] font-bold mb-4">Inscription client</h2>
                <p className="text-center text-gray-500 mb-4 text-sm sm:text-base">
                    Vous avez déjà un compte ? <Link to='/Seconnecter' className="text-blue-600">Connectez-vous</Link>
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 w-full">
                    <div className="mb-2 sm:mb-0">
                        <label htmlFor="nom" className="block text-gray-700 text-sm sm:text-base">Nom</label>
                        <input type="text" id="nom" placeholder="Nom" className="border p-2 text-sm sm:text-base rounded-full w-full" />
                    </div>
                    <div className="mb-2 sm:mb-0">
                        <label htmlFor="prenom" className="block text-gray-700 text-sm sm:text-base">Prénom</label>
                        <input type="text" id="prenom" placeholder="Prénom" className="border p-2 text-sm sm:text-base rounded-full w-full" />
                    </div>
                    <div className="mb-2 sm:mb-0">
                        <label htmlFor="telephone" className="block text-gray-700 text-sm sm:text-base">Téléphone</label>
                        <input type="text" id="telephone" className="border p-2 text-sm sm:text-base rounded-full w-full" placeholder="Entrer votre téléphone" />
                    </div>
                    <div className="mb-2 sm:mb-0">
                        <label htmlFor="genre" className="block text-gray-700 text-sm sm:text-base">Genre</label>
                        <div className="relative">
                            <select 
                                id="genre" 
                                className="border p-2 text-sm sm:text-base rounded-full w-full appearance-none pr-8"
                            >
                                <option value="">Le genre...</option>
                                <option value="femme">Femme</option>
                                <option value="homme">Homme</option>
                            </select>
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="mb-2 sm:mb-0">
                        <label htmlFor="ville" className="block text-gray-700 text-sm sm:text-base">Entrez Votre Ville</label>
                        <div className="relative">
                            <select 
                                id="ville" 
                                className="border p-2 text-sm sm:text-base rounded-full w-full appearance-none pr-8"
                            >
                                <option value="">Sélectionnez votre ville...</option>
                                {cities.map((city) => (
                                    <option key={city._id} value={city.name}>
                                        {city.name}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="mb-2 sm:mb-0">
                        <label htmlFor="email" className="block text-gray-700 text-sm sm:text-base">E-Mail</label>
                        <input type="email" id="email" placeholder="E-Mail" className="border p-2 text-sm sm:text-base rounded-full w-full" />
                    </div>
                    <div className="mb-2 sm:mb-0">
                        <label htmlFor="password" className="block text-gray-700 text-sm sm:text-base">Mot De Passe</label>
                        <input type="password" id="password" placeholder="Mot De Passe" className="border p-2 text-sm sm:text-base rounded-full w-full" />
                    </div>
                    <div className="mb-2 sm:mb-0">
                        <label htmlFor="confirmPassword" className="block text-gray-700 text-sm sm:text-base">Confirmez Votre Mot De Passe</label>
                        <input type="password" id="confirmPassword" placeholder="Confirmez Votre Mot De Passe" className="border p-2 text-sm sm:text-base rounded-full w-full" />
                    </div>
                </div>

                <div className="mt-4 flex items-start">
                    <input type="checkbox" id="terms" className="mr-2 mt-1" />
                    <label htmlFor="terms" className="text-xs sm:text-sm">
                        J'AI LU ET J'ACCEPTE LES <a href="#" className="text-blue-600">CONDITIONS GÉNÉRALES D'UTILISATION</a>
                    </label>
                </div>

                <button onClick={handleSubmit} className="mt-4 bg-[#4C5A91] text-white py-2 rounded-full shadow-sm hover:bg-[#48578A] w-full font-semibold text-sm sm:text-base">
                    Créer un compte
                </button>
            </div>
        </div>
    )
};

export default InscriptionClient;

// import React, { useEffect, useState } from "react";
// import ClientImage from '../assets/images/CrCompte/InscClient.png';
// import Google from "../assets/images/CrCompte/google.png";
// import { Link } from "react-router-dom";

// // responsive faite
// const InscriptionClient = () =>{
//     const [cities, setCities] = useState([]);

//      useEffect(() => {
//         // Récupérer les villes au chargement du composant
//         const fetchCities = async () => {
//             try {
//                 const response = await fetch('http://localhost:5000/api/auth/cities');
//                 const data = await response.json();
//                 if (response.ok) {
//                     setCities(data);
//                 }
//             } catch (error) {
//                 console.error("Erreur lors de la récupération des villes:", error);
//             }
//         };
        
//         fetchCities();
//         window.scrollTo(0, 0);
//     }, []);
//     useEffect(() => {
//         window.scrollTo(0, 0);
//     }, []);

//     const handleSubmit = async (e) =>{
//         e.preventDefault();
//         const formData = {
//             nom: document.getElementById('nom').value,
//             prenom: document.getElementById('prenom').value,
//             email: document.getElementById('email').value,
//             password: document.getElementById('password').value,
//             confirmPassword: document.getElementById('confirmPassword').value,
//             ville: document.getElementById('ville').value,
//             genre: document.getElementById('genre').value,
//             telephone: document.getElementById('telephone').value 
//         };

//         try {
//             const response = await fetch('http://localhost:5000/api/auth/register/client', {
//                 method: 'POST',
//                 headers: {'Content-Type': 'application/json'},
//                 body: JSON.stringify(formData)
//             });

//             const data = await response.json();
        
//             if (!response.ok) {
//                 console.error('Détails de l\'erreur:', data);
//                 throw new Error(data.message || 'Erreur lors de l\'inscription');
//             }
//             console.log('Inscription réussie:', data);
//             if (data.token) localStorage.setItem('token', data.token);
//             window.location.href = '/';
//         } catch (error) {
//             console.error('Erreur complète:', error);
//             alert(`Erreur: ${error.message}\nVeuillez vérifier la console pour plus de détails`);
//         }
//     };

//     return(
//         <div className="relative min-h-screen flex items-center justify-center bg-gray-100 mt-14 px-4 sm:px-6 lg:px-8">
//             <div className="absolute inset-0">
//                 <img src={ClientImage} alt="Background" className="w-full h-full object-cover" />
//             </div>

//             <div className="relative bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-md sm:max-w-lg md:max-w-2xl mx-auto">
//                 <h2 className="text-center text-3xl sm:text-4xl text-[#6977AF] font-bold mb-4">Inscription client</h2>
//                 <p className="text-center text-gray-500 mb-4 text-sm sm:text-base">
//                     Vous avez déjà un compte ? <Link to='/Seconnecter'><a href="#" className="text-blue-600">Connectez-vous</a></Link>
//                 </p>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 w-full">
//                     <div className="mb-2 sm:mb-0">
//                         <label htmlFor="nom" className="block text-gray-700 text-sm sm:text-base">Nom</label>
//                         <input type="text" id="nom" placeholder="Nom" className="border p-2 text-sm sm:text-base rounded-full w-full" />
//                     </div>
//                     <div className="mb-2 sm:mb-0">
//                         <label htmlFor="prenom" className="block text-gray-700 text-sm sm:text-base">Prénom</label>
//                         <input type="text" id="prenom" placeholder="Prénom" className="border p-2 text-sm sm:text-base rounded-full w-full" />
//                     </div>
//                     <div className="mb-2 sm:mb-0">
//                         <label htmlFor="telephone" className="block text-gray-700 text-sm sm:text-base">Téléphone</label>
//                         <input type="text" id="telephone" className="border p-2 text-sm sm:text-base rounded-full w-full" placeholder="Entrer votre téléphone" />
//                     </div>
//                     {/* <div className="mb-2 sm:mb-0">
//                         <label htmlFor="genre" className="block text-gray-700 text-sm sm:text-base">Genre</label>
//                         <input type="text" id="genre" placeholder="Genre" className="border p-2 text-sm sm:text-base rounded-full w-full" />
//                     </div> */}
//                    <div className="mb-2 sm:mb-0">
//                         <label htmlFor="genre" className="block text-gray-700 text-sm sm:text-base">Genre</label>
//                         <div className="relative">
//                             <select 
//                                 id="genre" 
//                                 className="border p-2 text-sm sm:text-base rounded-full w-full appearance-none pr-8"
//                             >
//                                 <option value="">Le genre...</option>
//                                 <option value="femme">Femme</option>
//                                 <option value="homme">Homme</option>
//                             </select>
//                             <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
//                                 <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                                 </svg>
//                             </div>
//                         </div>
//                     </div>
//                     {/* <div className="mb-2 sm:mb-0">
//                         <label htmlFor="ville" className="block text-gray-700 text-sm sm:text-base">Entrez Votre Ville</label>
//                         <input type="text" id="ville" placeholder="Entrez Votre Ville" className="border p-2 text-sm sm:text-base rounded-full w-full" />
//                     </div> */}
//                     <div className="mb-2 sm:mb-0">
//                         <label htmlFor="ville" className="block text-gray-700 text-sm sm:text-base">Entrez Votre Ville</label>
//                         <div className="relative">
//                             <select 
//                                 id="ville" 
//                                 className="border p-2 text-sm sm:text-base rounded-full w-full appearance-none pr-8"
//                             >
//                                 <option value="">Sélectionnez votre ville...</option>
//                                 {cities.map((city) => (
//                                     <option key={city._id} value={city.name}>
//                                         {city.name}
//                                     </option>
//                                 ))}
//                             </select>
//                             <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
//                                 <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                                 </svg>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="mb-2 sm:mb-0">
//                         <label htmlFor="email" className="block text-gray-700 text-sm sm:text-base">E-Mail</label>
//                         <input type="email" id="email" placeholder="E-Mail" className="border p-2 text-sm sm:text-base rounded-full w-full" />
//                     </div>
//                     <div className="mb-2 sm:mb-0">
//                         <label htmlFor="password" className="block text-gray-700 text-sm sm:text-base">Mot De Passe</label>
//                         <input type="password" id="password" placeholder="Mot De Passe" className="border p-2 text-sm sm:text-base rounded-full w-full" />
//                     </div>
//                     <div className="mb-2 sm:mb-0">
//                         <label htmlFor="confirmPassword" className="block text-gray-700 text-sm sm:text-base">Confirmez Votre Mot De Passe</label>
//                         <input type="password" id="confirmPassword" placeholder="Confirmez Votre Mot De Passe" className="border p-2 text-sm sm:text-base rounded-full w-full" />
//                     </div>
//                 </div>

//                 {/* <div className="mt-4 flex justify-center">
//                     <button className="flex bg-[#E8E8E8] items-center justify-center px-4 py-2 rounded-full w-full md:w-1/2 mt-2 text-sm sm:text-base">
//                         <img src={Google} alt="Google" className="w-5 h-5 mr-2" />
//                         <span>S'inscrire avec Google</span>
//                     </button>
//                 </div> */}

//                 <div className="mt-4 flex items-start">
//                     <input type="checkbox" id="terms" className="mr-2 mt-1" />
//                     <label htmlFor="terms" className="text-xs sm:text-sm">
//                         J'AI LU ET J'ACCEPTE LES <a href="#" className="text-blue-600">CONDITIONS GÉNÉRALES D'UTILISATION</a>
//                     </label>
//                 </div>

//                 <button onClick={handleSubmit} className="mt-4 bg-[#4C5A91] text-white py-2 rounded-full shadow-sm hover:bg-[#48578A] w-full font-semibold text-sm sm:text-base">
//                     Créer un compte
//                 </button>
//             </div>
//         </div>
//     )
// };

// export default InscriptionClient; 

