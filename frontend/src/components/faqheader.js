import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";

const Faqheader = () => {
  return (
    <header className="bg-white shadow-sm fixed w-full h-[100px] top-0 z-50 border border-b-[#434F84]" >
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        <div className="flex items-center space-x-3 ml-8">
          <img src={logo} alt="MANZO Logo" className="h-[41px] w-[173px] " />
          <span className="text-lg text-[#475489]">CENTRE D'AIDE</span>
        </div>

        <nav>
          <ul className="flex space-x-6 mr-8">
            <li>
              <Link to="/tableau-de-bord" className="text-[#475489] font-semibold hover:text-[#3a4574]">
                TABLEAU DE BORD
              </Link>
            </li>
            <li>
              <Link to="/demander-un-service" className="text-[#475489] font-semibold hover:text-[#3a4574]">
                DEMANDER UN SERVICE
              </Link>
            </li>
            <li>
              <Link to="/devenir-prestataire" className="text-[#475489] font-semibold hover:text-[#3a4574]">
                DEVENIR PRESTATAIRE
              </Link>
            </li>
            <li>
              <Link to="/faq" className="text-[#475489] font-semibold hover:text-[#3a4574]">
                FAQ
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Faqheader;
