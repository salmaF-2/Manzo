import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok, FaYoutube} from 'react-icons/fa';
import logo from "../assets/images/logo.png";
import PetitLogo from "../assets/images/manzo logo.png";
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className='bg-[#F2F8FF] py-10 px-6 md:px-16 text-gray-700'>
            {/* petit logo */}
            <div className="flex justify-center -mt-16 mb-10 z-10 relative">
                <img src={PetitLogo} alt="Manzo Logo" className="h-24 max-w-xs" />
            </div>
            
            <div className='container mx-auto flex flex-col md:flex-row items-start justify-between gap-6'>

                <div className="w-full md:w-1/3 mb-6 md:mb-0 flex justify-start">
                    <Link to='/'><img src={logo} alt='Manzo logo' className='h-12' /></Link>
                </div>
                
                <div className="flex flex-wrap justify-center md:justify-between w-full max-w-4xl gap-6">
                    <div className='mb-6 md:mb-0 md:w-1/3 text-center md:text-left'>
                        <h3 className="font-semibold mb-2 underline">Découvrir</h3>
                        <ul>
                            <Link to="/"><li>Accueil</li></Link>
                            <Link to="/services"><li>Services</li></Link>
                            <Link to="DevenirPres"><li>Devenir prestataire</li></Link>
                            <Link to="/"><li>Connexion/inscription</li></Link>
                            <Link to="/"><li>Contact</li></Link>
                        </ul>
                    </div>

                    <div className="text-center md:text-left">
                        <h3 className="font-semibold mb-2 underline">Liens utiles</h3>
                        <ul className="space-y-1 text-sm">
                            <Link to="/about"><li>Qui nous sommes</li></Link>
                            <Link to="/faq"><li>FAQ / Centre d'aide</li></Link>
                            <Link to="/"><li>Politique de confidentialité</li></Link>
                            <Link to="/"><li>Mentions légales</li></Link>
                            <Link to="/"><li>CGV</li></Link>
                        </ul>
                    </div>

                    <div className="md:w-1/3 text-center md:text-left">
                        <h3 className="font-semibold mb-2 underline">Contactez-nous</h3>
                        <p className="text-sm">@MANZO.O</p>
                        <p className="text-sm">#MANZO.O</p>
                    </div>
                </div>
                
                <div className="w-full md:w-1/3 flex flex-col items-center md:items-end space-y-4 mt-6 md:mt-20">
                    <div className="flex space-x-4 text-gray-600">
                        <a href="#" className="p-2 border rounded-full hover:text-blue-500"><FaLinkedinIn /></a>
                        <a href="#" className="p-2 border rounded-full hover:text-blue-500"><FaFacebookF /></a>
                        <a href="#" className="p-2 border rounded-full hover:text-red-500"><FaYoutube /></a>
                        <a href="#" className="p-2 border rounded-full hover:text-pink-500"><FaInstagram /></a>
                        <a href="#" className="p-2 border rounded-full hover:text-black"><FaTiktok /></a>
                    </div>
                    <div className="text-sm text-gray-500 text-center md:text-right">
                        © 2025 CMC
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
