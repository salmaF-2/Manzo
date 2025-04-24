import { useState, useRef, useEffect } from 'react';
import { FaUser, FaBars, FaTimes, FaBell, FaHeart, FaEnvelope, FaHome, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import logo from "../assets/images/logo.png";

const HeaderClient = () => {
    const [isOpen, setIsOpen] = useState(false);
    const userMenuRef = useRef(null);

    const [servicesOpen, setServicesOpen] = useState(false);
    const servicesRef = useRef(null);

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const mobileMenuRef = useRef(null);
    const servicesTimeoutRef = useRef(null);
    const userTimeoutRef = useRef(null);

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

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMobileMenuOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleLogout = () => {
        // Ajoutez ici la logique de déconnexion
        console.log("Déconnexion...");
        setIsOpen(false);
        setIsMobileMenuOpen(false);
    };

    return (
        <div className='bg-white p-6 flex justify-between items-center fixed top-0 left-0 w-full z-50'>
            <Link to="/"><img src={logo} alt='logo MANZO' className='text-xl font-bold text-[#5869A3] ml-10 w-28 h-auto' /></Link>
            
            {/* Menu mobile */}
            <button className='md:hidden text-[#5869A3] text-2xl' onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Menu mobile ouvert */}
            {isMobileMenuOpen && (
            <div className="absolute top-full left-0 w-full bg-white shadow-md p-4 flex flex-col space-y-4 z-50" ref={mobileMenuRef}>
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-[#5869A3] font-medium hover:bg-[#5869A3] hover:text-white rounded-full px-4 py-2 transition duration-300">
                    Accueil
                </Link>

                <Link to="/DevenirPres" onClick={() => setIsMobileMenuOpen(false)} className="text-[#5869A3] font-medium hover:bg-[#5869A3] hover:text-white rounded-full px-4 py-2 transition duration-300">
                    Devenir prestataire
                </Link>

                <Link to="/Contact" onClick={() => setIsMobileMenuOpen(false)}className="text-[#5869A3] font-medium hover:bg-[#5869A3] hover:text-white rounded-full px-4 py-2 transition duration-300">
                    Contacter-nous
                </Link>

                {/* Dropdown Services mobile */}
                <div ref={servicesRef} className="w-full">
                <button onClick={() => setServicesOpen(!servicesOpen)} className="flex justify-between items-center w-full text-[#5869A3] font-medium hover:bg-[#5869A3] hover:text-white rounded-full px-4 py-2 transition duration-300">
                    Services <ChevronDown className="ml-2 w-5 h-5" />
                </button>

                {servicesOpen && (
                    <ul className="mt-2 bg-white border border-gray-200 rounded-lg shadow-md">
                    <li>
                        <Link to="/serviceFixe" className="block px-4 py-2 hover:bg-gray-100 text-[#5869A3] " onClick={() => {setServicesOpen(false); setIsMobileMenuOpen(false);}}>
                            Services Fixe
                        </Link>
                    </li>
                    <li>
                        <Link to="/serviceDevis" className="block px-4 py-2 hover:bg-gray-100 text-[#5869A3]" onClick={() => {setServicesOpen(false);setIsMobileMenuOpen(false);}}>
                            Services Devis
                        </Link>
                    </li>
                    </ul>
                )}
                </div>

                {/* Menu utilisateur mobile */}
                <div className="border-t border-gray-200 pt-4 mt-2">
                    <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center px-4 py-2 text-[#5869A3] hover:bg-gray-100 rounded-md">
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
                    <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 text-red-500 hover:bg-gray-100 rounded-md">
                        <FaSignOutAlt className="mr-3" /> Se déconnecter
                    </button>
                </div>
            </div>
            )}

            {/* Navigation desktop */}
            <nav className='hidden md:flex items-center space-x-2'>
                <Link to="/" className='text-[#5869A3] font-medium hover:bg-[#5869A3] hover:text-white rounded-full px-4 py-2 transition duration-300'>Accueil</Link>
                <Link to="/DevenirPres" className='text-[#5869A3] font-medium hover:bg-[#5869A3] hover:text-white rounded-full px-4 py-2 transition duration-300'>Devenir prestataire</Link>
                <Link to="/Contact" className='text-[#5869A3] font-medium hover:bg-[#5869A3] hover:text-white rounded-full px-4 py-2 transition duration-300'>Contacter-nous</Link>

                {/* Dropdown Services desktop */}
                <div className="relative"
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

                {/* Icônes supplémentaires pour le client */}
                <div className="flex items-center space-x-4 mr-4">
                    <Link to="/reservations" className="text-[#5869A3] hover:text-[#48578A] relative mr-4">
                        <FaBell className="text-xl" />
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">2</span>
                    </Link>
                </div>

                {/* Menu utilisateur desktop */}
                <div className="relative"
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
                        <Link to="/dashboard" onClick={() => setIsOpen(false)} className="flex items-center px-4 py-2 text-[#5869A3] hover:bg-gray-100 rounded-md">
                            <FaHome className="mr-3" /> Tableau de bord
                        </Link>
                        <Link to="/messages" onClick={() => setIsOpen(false)} className="flex items-center px-4 py-2 text-[#5869A3] hover:bg-gray-100 rounded-md">
                            <FaEnvelope className="mr-3" /> Messages
                        </Link>
                        <Link to="/reservations" onClick={() => setIsOpen(false)} className="flex items-center px-4 py-2 text-[#5869A3] hover:bg-gray-100 rounded-md">
                            <FaBell className="mr-3" /> Réservations
                        </Link>
                        <Link to="/favoris" onClick={() => setIsOpen(false)} className="flex items-center px-4 py-2 text-[#5869A3] hover:bg-gray-100 rounded-md">
                            <FaHeart className="mr-3" /> Favoris
                        </Link>
                        <Link to="/mon-compte" onClick={() => setIsOpen(false)} className="flex items-center px-4 py-2 text-[#5869A3] hover:bg-gray-100 rounded-md">
                            <FaUser className="mr-3" /> Informations du compte
                        </Link>
                        <div className="border-t border-gray-200 mt-2"></div>
                        <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 mt-2 text-red-500 hover:bg-gray-100 rounded-md">
                            <FaSignOutAlt className="mr-3" /> Se déconnecter
                        </button>
                    </div>
                )}
                </div>
            </nav>
        </div>
    );
};

export default HeaderClient;