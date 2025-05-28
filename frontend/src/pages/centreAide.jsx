import { useEffect } from "react";
import { Link } from "react-router-dom";
import Vector2 from "../assets/images/Vector2.png";
import ca1 from "../assets/images/ca1.png";
import ca2 from "../assets/images/ca2.png";
import Faqfooter from "../components/faqfooter";
import logo from "../assets/images/logo.png";
export default function CentreAide() {

  useEffect(() => {
          window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <header className="bg-white shadow-sm fixed w-full h-[100px] top-0 z-50 border border-b-[#434F84]">
        <div className="container mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center space-x-3 ml-8">
            <img src={logo} alt="MANZO Logo" className="h-[41px] w-[173px] " />
            <span className="text-lg text-[#475489]">CENTRE D'AIDE</span>
          </div>

          <nav>
            <ul className="flex space-x-6 mr-8">
              <li>
                <Link
                  to="/tableau-de-bord"
                  className="text-[#475489] font-semibold hover:text-[#3a4574]"
                >
                  TABLEAU DE BORD
                </Link>
              </li>
              <li>
                <Link
                  to="/demander-un-service"
                  className="text-[#475489] font-semibold hover:text-[#3a4574]"
                >
                  DEMANDER UN SERVICE
                </Link>
              </li>
              <li>
                <Link
                  to="/devenir-prestataire"
                  className="text-[#475489] font-semibold hover:text-[#3a4574]"
                >
                  DEVENIR PRESTATAIRE
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <section className="py-16 bg-white relative bg-[#BCD0EA]/[9%] ">
        <div className="container mx-auto px-5 max-w-6xl mt-10 mb-10 mr-[6%] ">
          <div className="flex flex-col">
            <div className="text-left mb-7 max-w-[600px] mb-[30px] ml-[2%]">
              <h2 className="text-6xl text-[#6977AF] mt-7 mb-5 ml-5">FAQ</h2>
              <p className="text-6xl text-[#6977AF] font-modak">MANZO M3AK</p>
            </div>
            <div className="flex flex-col items-center sm:items-start relative">
              <div className="absolute left-[43%] bottom-[55px] transform -translate-x-1/2">
                <img src={Vector2} alt="Flèche" />
              </div>
              <Link
                to="/Contact"
                className="flex w-full justify-center sm:justify-start mt-6"
              >
                <button className="bg-[#475489] text-white font-semibold rounded-[15.5px] w-[185px] h-[42px] mb-5 ml-[52%] ">
                  Besoin d'aide
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 justify-items-center">
          <Link to="/faq-client" className="group">
            <div className="shadow-md max-w-[480px] w-full mx-auto text-center transition-all duration-300 ease-in-out group-hover:bg-[#1B1F2A]">
              <img
                src={ca1}
                alt="Client"
                className="w-[480px] h-[480px] object-cover border-[10px] border-[#434F84] border-b-0 transition-all duration-300 ease-in-out group-hover:opacity-75"
              />
              <div className="p-0">
                <button className="w-full border-[10px] border-[#434F84] outline-none py-4 text-[#1B1F2A] font-bold text-center cursor-pointer text-xl transition-all duration-300 ease-in-out group-hover:text-white group-hover:rotate-3">
                  Vous êtes un client ?
                </button>
              </div>
            </div>
          </Link>

          <Link to="/faq-professional" className="group">
            <div className="shadow-md max-w-[480px] w-full mx-auto text-center transition-all duration-300 ease-in-out group-hover:bg-[#1B1F2A]">
              <img
                src={ca2}
                alt="Professional"
                className="w-[480px] h-[480px] object-cover border-[10px] border-[#434F84] border-b-0 transition-all duration-600 ease-in-out group-hover:opacity-75"
              />

              <div className="p-0">
                <button className="w-full border-[10px] border-[#434F84] outline-none py-4 text-[#1B1F2A] font-bold text-center cursor-pointer text-xl transition-all duration-300 ease-in-out group-hover:text-white group-hover:rotate-3">
                  Vous êtes un professionnel ?
                </button>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <Faqfooter />
    </div>
  );
}
