import {useState, useRef, useEffect} from 'react';
import {FaUser} from "react-icons/fa";
import {Link} from "react-router-dom" ;
import { ChevronDown } from "lucide-react";
import logo from "../assets/images/logo.png";

const Header = () =>{
    const [isOpen , setIsOpen] = useState(false);
    const userMenuRef = useRef(null);

    const [servicesOpen, setServicesOpen] = useState(false);
    const servicesRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (servicesRef.current && !servicesRef.current.contains(event.target)) {
                setServicesOpen(false);
            }
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return(
        <div className='bg-white shadow-md p-6 flex justify-between items-center'>
            <img src={logo} alt='logo MANZO' className='text-xl font-bold text-[#5869A3] ml-10 w-28 h-auto' />
            <nav className='flex items-center space-x-6'>

                <Link to="/" className='text-[#5869A3] font-medium border border-transparent hover:bg-[#5869A3] hover:text-white focus:bg-[#5869A3] focus:text-white rounded-full px-4 py-2 transition duration-300'>Accueil</Link>
                <Link to="/DevenirPres"className='text-[#5869A3] font-medium border border-transparent hover:bg-[#5869A3] hover:text-white focus:bg-[#5869A3] focus:text-white rounded-full px-4 py-2 transition duration-300'>Devenir prestataire</Link>
                <Link to="/Contact"className='text-[#5869A3] font-medium border border-transparent hover:bg-[#5869A3] hover:text-white focus:bg-[#5869A3] focus:text-white rounded-full px-4 py-2 transition duration-300'>Contacter-nous</Link>
                
                <div className="relative" ref={servicesRef}>
                    <button onClick={() => setServicesOpen(!servicesOpen)}
                        className="flex items-center text-[#5869A3] font-medium border border-transparent hover:bg-[#5869A3] hover:text-white focus:bg-[#5869A3] focus:text-white rounded-full px-4 py-2 transition duration-300">
                        Services <ChevronDown className="ml-2 w-5 h-5" />
                    </button>
                    {servicesOpen && (
                        <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                        <ul className="py-2">
                            <Link to="/serviceFixe"><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Services Fixe</li></Link>
                            <Link to="/serviceDevis"><li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Services Devis</li></Link>
                        </ul>
                        </div>
                    )}
                </div>
                <div className='relative' ref={userMenuRef}>
                    <button onClick={() => setIsOpen(!isOpen)} className='p-4 rounded-full bg-gray-200 hover:bg-gray-300 ml-16 -translate-x-10'>
                        <FaUser className='text-[#5869A3]' />
                    </button>
                    {isOpen && (
                        <div className='absolute right-0 mt-7 w-48 bg-white shadow-lg rounded-lg p-2'>
                            <Link to="/Seconnecter">
                                <button className='block w-full px-4 py-2 text-center text-white bg-[#5869A3] rounded-md hover:bg-[#48578A]'>
                                    Se connecter
                                </button>
                            </Link>
                            <Link to="/CreerCompte">
                                <button className='block w-full px-4 py-2 mt-2 text-center border border-[#5869A3] text-[#5869A3] rounded-md hover:bg-indigo-100'>
                                    Créer un compte
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    )
}

export default Header;