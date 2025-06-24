import { useState, useRef, useEffect } from 'react';
import { FaUser, FaBars, FaTimes, FaBell, FaHeart, FaEnvelope, FaHome, FaSignOutAlt, FaMoneyBillWave, FaClipboardList } from "react-icons/fa";
import { Link ,useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/images/logo.png";

const HeaderRole = () => {
    // États communs
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const role = user?.role || 'guest';

    const [isOpen, setIsOpen] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    // Références
    const userMenuRef = useRef(null);
    const servicesRef = useRef(null);
    const mobileMenuRef = useRef(null);
    const servicesTimeoutRef = useRef(null);
    const userTimeoutRef = useRef(null);

    // Gestion des clics en dehors des menus
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (servicesRef.current && !servicesRef.current.contains(event.target)) {
                setServicesOpen(false);
            }
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
                setIsMobileMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Gestion du redimensionnement
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMobileMenuOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Gestion de la déconnexion
    const handleLogout = () => {
        console.log("Déconnexion...");
        logout();
        navigate('/');
        setIsOpen(false);
        setIsMobileMenuOpen(false);
        // Ajouter ici la logique de déconnexion réelle
    };

    // Contenu du menu Services (commun à guest et client)
    const renderServicesMenu = () => (
        <>
            <button 
                onClick={() => setServicesOpen(!servicesOpen)} 
                className="flex justify-between items-center w-full text-[#5869A3] font-medium hover:bg-[#5869A3] hover:text-white rounded-full px-4 py-2 transition duration-300"
            >
                Services <ChevronDown className="ml-2 w-5 h-5" />
            </button>

            {servicesOpen && (
                <ul className="mt-2 bg-white border border-gray-200 rounded-lg shadow-md">
                    <li>
                        <Link 
                            to="/serviceFixe" 
                            className="block px-4 py-2 hover:bg-gray-100 text-[#5869A3]" 
                            onClick={() => {
                                setServicesOpen(false); 
                                setIsMobileMenuOpen(false);
                            }}
                        >
                            Services Fixe
                        </Link>
                    </li>
                    <li>
                        <Link 
                            to="/serviceDevis" 
                            className="block px-4 py-2 hover:bg-gray-100 text-[#5869A3]" 
                            onClick={() => {
                                setServicesOpen(false);
                                setIsMobileMenuOpen(false);
                            }}
                        >
                            Services Devis
                        </Link>
                    </li>
                </ul>
            )}
        </>
    );

    // Menu utilisateur pour guest
    const renderGuestUserMenu = () => (
        <>
            <Link 
                to="/Seconnecter" 
                onClick={() => setIsOpen(false)} 
                className="block w-full px-4 py-2 text-center text-white bg-[#5869A3] rounded-md hover:bg-[#48578A]"
            >
                Se connecter
            </Link>
            <Link 
                to="/CreerCompte" 
                onClick={() => setIsOpen(false)} 
                className="block w-full px-4 py-2 mt-2 text-center border border-[#5869A3] text-[#5869A3] rounded-md hover:bg-indigo-100"
            >
                Créer un compte
            </Link>
        </>
    );

    // Menu utilisateur pour client
    const renderClientUserMenu = () => (
        <>
            <Link to="/DashboardClient" onClick={() => setIsOpen(false)} className="flex items-center px-4 py-2 text-[#5869A3] hover:bg-gray-100 rounded-md">
                <FaHome className="mr-3" /> Tableau de bord
            </Link>
            <Link to="/Messages-Client" onClick={() => setIsOpen(false)} className="flex items-center px-4 py-2 text-[#5869A3] hover:bg-gray-100 rounded-md">
                <FaEnvelope className="mr-3" /> Messages
            </Link>
            <Link to="/Reservations-Client" onClick={() => setIsOpen(false)} className="flex items-center px-4 py-2 text-[#5869A3] hover:bg-gray-100 rounded-md">
                <FaBell className="mr-3" /> Réservations
            </Link>
            <Link to="/favoris-client" onClick={() => setIsOpen(false)} className="flex items-center px-4 py-2 text-[#5869A3] hover:bg-gray-100 rounded-md">
                <FaHeart className="mr-3" /> Favoris
            </Link>
            <Link to="/ProfilClient" onClick={() => setIsOpen(false)} className="flex items-center px-4 py-2 text-[#5869A3] hover:bg-gray-100 rounded-md">
                <FaUser className="mr-3" /> Informations du compte
            </Link>
            <div className="border-t border-gray-200 mt-2"></div>
            <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 mt-2 text-red-500 hover:bg-gray-100 rounded-md">
                <FaSignOutAlt className="mr-3" /> Se déconnecter
            </button>
        </>
    );

    // Menu utilisateur pour prestataire
    const renderPrestataireUserMenu = () => (
        <>
            <Link to="/DashboardPrestataire" onClick={() => setIsOpen(false)} className="flex items-center px-4 py-2 text-[#5869A3] hover:bg-gray-100 rounded-md">
                <FaHome className="mr-3" /> Tableau de bord
            </Link>
            <Link to="/messages-prestataire" onClick={() => setIsOpen(false)} className="flex items-center px-4 py-2 text-[#5869A3] hover:bg-gray-100 rounded-md">
                <FaEnvelope className="mr-3" /> Messages
            </Link>
            {/* <Link to="/reservations-prestataire" onClick={() => setIsOpen(false)} className="flex items-center px-4 py-2 text-[#5869A3] hover:bg-gray-100 rounded-md">
                <FaBell className="mr-3" /> Réservations
            </Link> */}
            <Link to="/Services-Prestataire" onClick={() => setIsOpen(false)} className="flex items-center px-4 py-2 text-[#5869A3] hover:bg-gray-100 rounded-md">
                <FaClipboardList className="mr-3" /> Annonces
            </Link>
            <Link to="/Paiemant-Prestataire" onClick={() => setIsOpen(false)} className="flex items-center px-4 py-2 text-[#5869A3] hover:bg-gray-100 rounded-md">
                <FaMoneyBillWave className="mr-3" /> Paiements
            </Link>
            <Link to="/ProfilPrestataire" onClick={() => setIsOpen(false)} className="flex items-center px-4 py-2 text-[#5869A3] hover:bg-gray-100 rounded-md">
                <FaUser className="mr-3" /> Informations du compte
            </Link>
            <div className="border-t border-gray-200 mt-2"></div>
            <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 mt-2 text-red-500 hover:bg-gray-100 rounded-md">
                <FaSignOutAlt className="mr-3" /> Se déconnecter
            </button>
        </>
    );

    // Liens de navigation communs
    const commonLinks = (
        <>
            <Link to="/" className="text-[#5869A3] font-medium hover:bg-[#5869A3] hover:text-white rounded-full px-4 py-2 transition duration-300">
                Accueil
            </Link>
            {role !== 'prestataire' && (
                <Link to="/DevenirPres" className="text-[#5869A3] font-medium hover:bg-[#5869A3] hover:text-white rounded-full px-4 py-2 transition duration-300">
                    Devenir prestataire
                </Link>
            )}
            <Link to="/Contact" className="text-[#5869A3] font-medium hover:bg-[#5869A3] hover:text-white rounded-full px-4 py-2 transition duration-300">
                Contacter-nous
            </Link>
        </>
    );

    // Icônes de notifications (client et prestataire)
    const renderNotificationIcon = () => {
        if (role === 'client') {
            return (
                <Link to="/reservations" className="text-[#5869A3] hover:text-[#48578A] relative mr-4">
                    <FaBell className="text-xl mr-4" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center mr-4">2</span>
                </Link>
            );
        } else if (role === 'prestataire') {
            return (
                <Link to="/reservations-prestataire" className="text-[#5869A3] hover:text-[#48578A] relative mr-4">
                    <FaBell className="text-xl mr-4" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center mr-4">5</span>
                </Link>
            );
        }
        return null;
    };

    return (
        <div className='bg-white p-6 flex justify-between items-center fixed top-0 left-0 w-full z-50'>
            <Link to="/"><img src={logo} alt='logo MANZO' className='text-xl font-bold text-[#5869A3] ml-10 w-28 h-auto' /></Link>
            
            {/* Bouton menu mobile */}
            <button className='md:hidden text-[#5869A3] text-2xl' onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Menu mobile */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-white shadow-md p-4 flex flex-col space-y-4 z-50" ref={mobileMenuRef}>
                    {commonLinks}
                    
                    {/* Menu Services (seulement pour guest et client) */}
                    {(role === 'guest' || role === 'client') && (
                        <div ref={servicesRef} className="w-full">
                            {renderServicesMenu()}
                        </div>
                    )}

                    {/* Menu utilisateur mobile */}
                    <div className="border-t border-gray-200 pt-4 mt-2">
                        {role === 'guest' && (
                            <>
                                <Link 
                                    to="/Seconnecter" 
                                    onClick={() => setIsMobileMenuOpen(false)} 
                                    className="block text-center text-white bg-[#5869A3] rounded-md px-4 py-2 hover:bg-[#48578A]"
                                >
                                    Se connecter
                                </Link>
                                <Link 
                                    to="/CreerCompte" 
                                    onClick={() => setIsMobileMenuOpen(false)} 
                                    className="block text-center border border-[#5869A3] text-[#5869A3] rounded-md px-4 py-2 hover:bg-indigo-100 mt-2"
                                >
                                    Créer un compte
                                </Link>
                            </>
                        )}
                        
                        {role === 'client' && (
                            <>
                                <Link to="/dashboardClient" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center px-4 py-2 text-[#5869A3] hover:bg-gray-100 rounded-md">
                                    <FaHome className="mr-3" /> Tableau de bord
                                </Link>
                                <Link to="/messages" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center px-4 py-2 text-[#5869A3] hover:bg-gray-100 rounded-md">
                                    <FaEnvelope className="mr-3" /> Messages
                                </Link>
                                <Link to="/reservations" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center px-4 py-2 text-[#5869A3] hover:bg-gray-100 rounded-md">
                                    <FaBell className="mr-3" /> Réservations
                                </Link>
                                <Link to="/favoris" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center px-4 py-2 text-[#5869A3] hover:bg-gray-100 rounded-md">
                                    <FaHeart className="mr-3" /> Favoris
                                </Link>
                                <Link to="/mon-compte" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center px-4 py-2 text-[#5869A3] hover:bg-gray-100 rounded-md">
                                    <FaUser className="mr-3" /> Informations du compte
                                </Link>
                            </>
                        )}
                        
                        {role === 'prestataire' && (
                            <>
                                <Link to="/DashboardPrestataire" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center px-4 py-2 text-[#5869A3] hover:bg-gray-100 rounded-md">
                                    <FaHome className="mr-3" /> Tableau de bord
                                </Link>
                                <Link to="/messages-prestataire" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center px-4 py-2 text-[#5869A3] hover:bg-gray-100 rounded-md">
                                    <FaEnvelope className="mr-3" /> Messages
                                </Link>
                                <Link to="/reservations-prestataire" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center px-4 py-2 text-[#5869A3] hover:bg-gray-100 rounded-md">
                                    <FaBell className="mr-3" /> Réservations
                                </Link>
                                <Link to="/annonces" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center px-4 py-2 text-[#5869A3] hover:bg-gray-100 rounded-md">
                                    <FaClipboardList className="mr-3" /> Annonces
                                </Link>
                                <Link to="/payouts" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center px-4 py-2 text-[#5869A3] hover:bg-gray-100 rounded-md">
                                    <FaMoneyBillWave className="mr-3" /> Paiements
                                </Link>
                                <Link to="/ProfilPrestataire" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center px-4 py-2 text-[#5869A3] hover:bg-gray-100 rounded-md">
                                    <FaUser className="mr-3" /> Informations du compte
                                </Link>
                            </>
                        )}
                        
                        {(role === 'client' || role === 'prestataire') && (
                            <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 text-red-500 hover:bg-gray-100 rounded-md">
                                <FaSignOutAlt className="mr-3" /> Se déconnecter
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Navigation desktop */}
            <nav className='hidden md:flex items-center space-x-2'>
                {commonLinks}
                
                {/* Menu Services (seulement pour guest et client) */}
                {(role === 'guest' || role === 'client') && (
                    <div 
                        className="relative"
                        ref={servicesRef}
                        onMouseEnter={() => {
                            clearTimeout(servicesTimeoutRef.current);
                            setServicesOpen(true);
                        }}
                        onMouseLeave={() => {
                            servicesTimeoutRef.current = setTimeout(() => {
                                setServicesOpen(false);
                            }, 300); 
                        }} 
                    >
                        <button className="flex items-center text-[#5869A3] font-medium hover:bg-[#5869A3] hover:text-white rounded-full px-4 py-2 transition duration-300">
                            Services <ChevronDown className="ml-2 w-5 h-5" />
                        </button>
                        {servicesOpen && (
                            <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                                <ul className="py-2">
                                    <Link to="/serviceFixe" onClick={() => setServicesOpen(false)}>
                                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[#5869A3]">Services Fixe</li>
                                    </Link>
                                    <Link to="/serviceDevis" onClick={() => setServicesOpen(false)}>
                                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[#5869A3]">Services Devis</li>
                                    </Link>
                                </ul>
                            </div>
                        )}
                    </div>
                )}
                
                {/* Icônes de notifications */}
                {(role === 'client' || role === 'prestataire') && renderNotificationIcon()}
                
                {/* Menu utilisateur */}
                <div 
                    className="relative"
                    ref={userMenuRef}
                    onMouseEnter={() => {
                        clearTimeout(userTimeoutRef.current);
                        setIsOpen(true);
                    }}
                    onMouseLeave={() => {
                        userTimeoutRef.current = setTimeout(() => {
                            setIsOpen(false);
                        }, 300); 
                    }}
                >
                    <button className="p-4 rounded-full bg-gray-200 hover:bg-gray-300">
                        <FaUser className="text-[#5869A3]" />
                    </button>
                    
                    {isOpen && (
                        <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg p-2 z-50">
                            {role === 'guest' && renderGuestUserMenu()}
                            {role === 'client' && renderClientUserMenu()}
                            {role === 'prestataire' && renderPrestataireUserMenu()}
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
};

export default HeaderRole;