import { useState, useRef, useEffect } from 'react';
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import logo from "../assets/images/logo.png";

const Header = () => {
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

    return (
        <div className='bg-white p-6 flex justify-between items-center fixed top-0 left-0 w-full z-50'> 
        {/* shadow-md */}
            <Link to="/"><img src={logo} alt='logo MANZO' className='text-xl font-bold text-[#5869A3] ml-10 w-28 h-auto' /></Link>
            
            {/* Menu */}
            <button className='md:hidden text-[#5869A3] text-2xl' onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* navigation menu */}
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
                        <Link to="/serviceFixe" className="block px-4 py-2 hover:bg-gray-100" onClick={() => {setServicesOpen(false); setIsMobileMenuOpen(false);}}>
                            Services Fixe
                        </Link>
                    </li>
                    <li>
                        <Link to="/serviceDevis" className="block px-4 py-2 hover:bg-gray-100" onClick={() => {setServicesOpen(false);setIsMobileMenuOpen(false);}}>
                            Services Devis
                        </Link>
                    </li>
                    </ul>
                )}
                </div>

                <Link to="/Seconnecter" onClick={() => setIsMobileMenuOpen(false)} className="block text-center text-white bg-[#5869A3] rounded-md px-4 py-2 hover:bg-[#48578A]">
                    Se connecter
                </Link>

                <Link to="/CreerCompte" onClick={() => setIsMobileMenuOpen(false)} className="block text-center border border-[#5869A3] text-[#5869A3] rounded-md px-4 py-2 hover:bg-indigo-100">
                    Créer un compte
                </Link>
                <Link to="/Dashboard" onClick={() => setIsMobileMenuOpen(false)} className="block text-center border border-[#5869A3] text-[#5869A3] rounded-md px-4 py-2 hover:bg-indigo-100">
                    Tableau de bord
                </Link>
                <Link to="/Deconnexion" onClick={() => setIsMobileMenuOpen(false)} className="block text-center text-white bg-[#5869A3] rounded-md px-4 py-2 hover:bg-[#48578A]">
                    Déconnexion
                </Link>
            </div>
            )}

            {/* Navigation 2*/}
            {/* <nav className='hidden md:flex items-center space-x-2'>

                <Link to="/" className='text-[#5869A3] font-medium hover:bg-[#5869A3] hover:text-white rounded-full px-4 py-2 transition duration-300'>Accueil</Link>
                <Link to="/DevenirPres" className='text-[#5869A3] font-medium hover:bg-[#5869A3] hover:text-white rounded-full px-4 py-2 transition duration-300'>Devenir prestataire</Link>
                <Link to="/Contact" className='text-[#5869A3] font-medium hover:bg-[#5869A3] hover:text-white rounded-full px-4 py-2 transition duration-300'>Contacter-nous</Link>

                <div className="relative" ref={servicesRef}>
                    <button onClick={() => setServicesOpen(!servicesOpen)} className="flex items-center text-[#5869A3] font-medium hover:bg-[#5869A3] hover:text-white rounded-full px-4 py-2 transition duration-300">
                        Services <ChevronDown className="ml-2 w-5 h-5" />
                    </button>
                    {servicesOpen && (
                        <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                            <ul className="py-2">
                                <Link to="/serviceFixe" onClick={() => setServicesOpen(false)}><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Services Fixe</li></Link>
                                <Link to="/serviceDevis" onClick={() => setServicesOpen(false)}><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Services Devis</li></Link>
                            </ul>
                        </div>
                    )}
                </div>
                

                <div className='relative' ref={userMenuRef}>
                    <button onClick={() => setIsOpen(!isOpen)} className='p-4 rounded-full bg-gray-200 hover:bg-gray-300 mr-10'>
                        <FaUser className='text-[#5869A3]' />
                    </button>
                    {isOpen && (
                        <div className='absolute right-0 mt-7 w-48 bg-white shadow-lg rounded-lg p-2 z-50'>
                            <Link to="/Seconnecter"  onClick={() => setIsOpen(false)}  className='block w-full px-4 py-2 text-center text-white bg-[#5869A3] rounded-md hover:bg-[#48578A]'>Se connecter</Link>
                            <Link to="/CreerCompte"  onClick={() => setIsOpen(false)}  className='block w-full px-4 py-2 mt-2 text-center border border-[#5869A3] text-[#5869A3] rounded-md hover:bg-indigo-100'>Créer un compte</Link>
                            <Link to="/Dashboard"  onClick={() => setIsOpen(false)}  className='block w-full px-4 py-2 mt-2 text-center border border-[#5869A3] text-[#5869A3] rounded-md hover:bg-indigo-100'>Tableau de bord</Link>
                            <Link to="/Deconnexion"  onClick={() => setIsOpen(false)}  className='block w-full px-4 py-2 mt-2 text-center text-white bg-[#5869A3] rounded-md hover:bg-[#48578A]'>Déconnexion</Link>
                        </div>
                    )}
                </div>
            </nav> */}
            <nav className='hidden md:flex items-center space-x-2'>
                <Link to="/" className='text-[#5869A3] font-medium hover:bg-[#5869A3] hover:text-white rounded-full px-4 py-2 transition duration-300'>Accueil</Link>
                <Link to="/DevenirPres" className='text-[#5869A3] font-medium hover:bg-[#5869A3] hover:text-white rounded-full px-4 py-2 transition duration-300'>Devenir prestataire</Link>
                <Link to="/Contact" className='text-[#5869A3] font-medium hover:bg-[#5869A3] hover:text-white rounded-full px-4 py-2 transition duration-300'>Contacter-nous</Link>

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
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Services Fixe</li>
                        </Link>
                        <Link to="/serviceDevis" onClick={() => setServicesOpen(false)}>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Services Devis</li>
                        </Link>
                    </ul>
                    </div>
                )}
                </div>



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
                <button className="p-4 rounded-full bg-gray-200 hover:bg-gray-300 mr-10">
                    <FaUser className="text-[#5869A3]" />
                </button>
                {isOpen && (
                    <div className="absolute right-0 mt-7 w-48 bg-white shadow-lg rounded-lg p-2 z-50">
                    <Link to="/Seconnecter" onClick={() => setIsOpen(false)} className="block w-full px-4 py-2 text-center text-white bg-[#5869A3] rounded-md hover:bg-[#48578A]">Se connecter</Link>
                    <Link to="/CreerCompte" onClick={() => setIsOpen(false)} className="block w-full px-4 py-2 mt-2 text-center border border-[#5869A3] text-[#5869A3] rounded-md hover:bg-indigo-100">Créer un compte</Link>
                    <Link to="/Dashboard" onClick={() => setIsOpen(false)} className="block w-full px-4 py-2 mt-2 text-center border border-[#5869A3] text-[#5869A3] rounded-md hover:bg-indigo-100">Tableau de bord</Link>
                    <Link to="/Deconnexion" onClick={() => setIsOpen(false)} className="block w-full px-4 py-2 mt-2 text-center text-white bg-[#5869A3] rounded-md hover:bg-[#48578A]">Déconnexion</Link>
                    </div>
                )}
                </div>
            </nav>
        </div>
    );
};

export default Header;
