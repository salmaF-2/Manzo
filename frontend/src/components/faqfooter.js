import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { FaLinkedinIn, FaFacebookF, FaYoutube, FaInstagram, FaTiktok } from "react-icons/fa";

const Faqfooter = () => {
  return (
    <footer className="bg-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          {/* Logo */}
          <div className="mb-4">
            <img src={logo} alt="Logo" className="mx-auto" />
          </div>
          
          {/* Links */}
          <div className="flex text-center flex-wrap gap-4 md:gap-6 justify-center mb-4">
            <Link to="/" className="text-gray-600 hover:text-[#475489] transition-colors">
              www.manzo.com
            </Link>
            <Link to="/services" className="text-gray-600 hover:text-[#475489] transition-colors">
              services
            </Link>
            <Link to="/avis" className="text-gray-600 hover:text-[#475489] transition-colors">
              avis manzo
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-[#475489] transition-colors">
              Qui nous sommes
            </Link>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4 text-black mb-4">
            <a href="#" className="text-2xl hover:text-blue-500">
              <FaLinkedinIn />
            </a>
            <a href="#" className="text-2xl hover:text-blue-500">
              <FaFacebookF />
            </a>
            <a href="#" className="text-2xl hover:text-red-500">
              <FaYoutube />
            </a>
            <a href="#" className="text-2xl hover:text-pink-500">
              <FaInstagram />
            </a>
            <a href="#" className="text-2xl hover:text-black">
              <FaTiktok />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Faqfooter;
