// import React, { useEffect,useState  } from "react";
// import image from "../assets/images/CrCompte/imageinscription.png";
// import Google from "../assets/images/CrCompte/google.png";
// import { Link,useNavigate  } from "react-router-dom";


// const Connexion = () =>{
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");
//     const navigate = useNavigate();

//      const handleLogin = async (e) => {
//         e.preventDefault();
//         setError("");

//         try {
//             const response = await fetch('http://localhost:5000/api/auth/login', {
//                 method: 'POST',
//                 headers: {'Content-Type': 'application/json',},
//                 body: JSON.stringify({ email, password }),
//             });

//             const data = await response.json();

//             if (!response.ok) {
//                 throw new Error(data.message || 'Erreur de connexion');
//             }

//             // Stocker le token et les infos utilisateur
//             localStorage.setItem('token', data.token);
//             localStorage.setItem('userRole', data.user.role);

//             // Redirection selon le rôle
//             if (data.user.role === 'client') {
//                 navigate('/dashboard-client');
//             } else if (data.user.role === 'prestataire') {
//                 navigate('/DashboardPrestataire');
//             } else {
//                 navigate('/');
//             }

//         } catch (err) {
//             setError(err.message);
//             console.error('Erreur de connexion:', err);
//         }
//     };

//     useEffect(() => {
//         window.scrollTo(0, 0);
//     }, []);

//     return (
//         <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-white p-4 md:mt-20 mt-14">
//             <div className="bg-white shadow-lg rounded-lg flex flex-col md:flex-row w-full max-w-4xl overflow-hidden">
//                 <div className="w-full md:w-1/2 p-4 md:p-8">
//                     <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-900 md:mt-8">Bienvenue</h2>
//                     <p className="text-center text-gray-600 mt-2 md:mt-4">Veuillez entrer vos identifiants</p>
//                     <button className="flex bg-[#E8E8E8] items-center justify-center px-4 py-2 rounded-full w-full md:w-[300px] mt-4 md:mt-6 mx-auto">
//                         <img src={Google} alt="Google" className="w-5 h-5 mr-2" />
//                         <span>Se connecter avec Google</span>
//                     </button>
//                     <div className="flex items-center my-3 md:my-4">
//                         <hr className="flex-grow border-gray-300"/>
//                         <span className="px-2 text-gray-500">ou</span>
//                         <hr className="flex-grow border-gray-300"/>
//                     </div>
//                     {error && <div className="text-red-500 text-center mb-4">{error}</div>}
//                     <form onSubmit={handleLogin}>
//                         <input type="email" placeholder="Email" className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500" value={email} onChange={(e) => setEmail(e.target.value)} required />
//                         <input type="password" placeholder="Mot de passe" className="w-full px-4 py-2 mt-3 md:mt-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500" value={password} onChange={(e) => setPassword(e.target.value)}  required />  
//                         <div className="mt-3 md:mt-4">
//                             <input type="checkbox" id="remember" className="mr-2" />
//                             <label htmlFor="remember" className="text-gray-600">Se souvenir de moi pendant 30 jours</label>
//                         </div>
//                         <button className="w-full mt-3 md:mt-4 bg-[#4C5A91] text-white py-2 rounded-full shadow-sm hover:bg-[#48578A]" type="submit" >Se connecter</button>
//                     </form>
//                     <p className="mt-3 md:mt-4 text-center text-gray-600">
//                         Vous n'avez pas de compte ? <Link to='/CreerCompte'><a href="#" className="text-blue-700 font-semibold">Inscrivez-vous</a></Link>
//                     </p>    
//                     <p className="mt-2 text-center">
//                         <Link to="/MotDePasseOublie" className="text-sm text-blue-600 hover:underline">
//                             Mot de passe oublié ?
//                         </Link>
//                     </p>
//                 </div>

//                 <div className="w-full md:w-1/2 mt-0 md:mt-2">
//                     <img src={image} alt="Artisan travaillant" className="w-full h-full object-cover" />
//                 </div>
//             </div>
//         </div>
//     )
// };

// export default Connexion;


import React, { useEffect, useState } from "react";
import image from "../assets/images/CrCompte/imageinscription.png";
import Google from "../assets/images/CrCompte/google.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Connexion = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Erreur de connexion');
            }

            // Stocker le token dans localStorage
            localStorage.setItem('token', data.token);
            
            // Mettre à jour le contexte d'authentification
            login({
                id: data.user.id,
                email: data.user.email,
                role: data.user.role,
                name: data.user.name || '',
                token: data.token
            });

            // Redirection selon le rôle
            if (data.user.role === 'client') {
                navigate('/DashboardClient');
            } else if (data.user.role === 'prestataire') {
                navigate('/DashboardPrestataire');
            } else {
                navigate('/');
            }

        } catch (err) {
            setError(err.message);
            console.error('Erreur de connexion:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-white p-4 md:mt-20 mt-14">
            <div className="bg-white shadow-lg rounded-lg flex flex-col md:flex-row w-full max-w-4xl overflow-hidden">
                <div className="w-full md:w-1/2 p-4 md:p-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-900 md:mt-8">Bienvenue</h2>
                    <p className="text-center text-gray-600 mt-2 md:mt-4">Veuillez entrer vos identifiants</p>
                    
                    <button 
                        className="flex bg-[#E8E8E8] items-center justify-center px-4 py-2 rounded-full w-full md:w-[300px] mt-4 md:mt-6 mx-auto hover:bg-gray-200 transition"
                    >
                        <img src={Google} alt="Google" className="w-5 h-5 mr-2" />
                        <span>Se connecter avec Google</span>
                    </button>
                    
                    <div className="flex items-center my-3 md:my-4">
                        <hr className="flex-grow border-gray-300"/>
                        <span className="px-2 text-gray-500">ou</span>
                        <hr className="flex-grow border-gray-300"/>
                    </div>
                    
                    {error && <div className="text-red-500 text-center mb-4">{error}</div>}
                    
                    <form onSubmit={handleLogin}>
                        <input 
                            type="email" 
                            placeholder="Email" 
                            className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                        
                        <input 
                            type="password" 
                            placeholder="Mot de passe" 
                            className="w-full px-4 py-2 mt-3 md:mt-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}  
                            required 
                        />  
                        
                        <div className="mt-3 md:mt-4 flex items-center">
                            <input type="checkbox" id="remember" className="mr-2" />
                            <label htmlFor="remember" className="text-gray-600 text-sm">
                                Se souvenir de moi pendant 30 jours
                            </label>
                        </div>
                        
                        <button 
                            className={`w-full mt-3 md:mt-4 bg-[#4C5A91] text-white py-2 rounded-full shadow-sm hover:bg-[#48578A] transition ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`} 
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Connexion en cours...' : 'Se connecter'}
                        </button>
                    </form>
                    
                    <p className="mt-3 md:mt-4 text-center text-gray-600">
                        Vous n'avez pas de compte ? {' '}
                        <Link to='/CreerCompte' className="text-blue-700 font-semibold hover:underline">
                            Inscrivez-vous
                        </Link>
                    </p>    
                    
                    <p className="mt-2 text-center">
                        <Link to="/MotDePasseOublie" className="text-sm text-blue-600 hover:underline">
                            Mot de passe oublié ?
                        </Link>
                    </p>
                </div>

                <div className="w-full md:w-1/2 mt-0 md:mt-2 hidden md:block">
                    <img 
                        src={image} 
                        alt="Artisan travaillant" 
                        className="w-full h-full object-cover" 
                    />
                </div>
            </div>
        </div>
    );
};

export default Connexion;