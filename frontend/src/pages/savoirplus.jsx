import React from "react";
import calendrier from "../assets/images/calendrier.png";
import journal from "../assets/images/un-journal.png";
import articleImage from "../assets/images/article.png";
import crayon from "../assets/images/crayon.png";
import logo from "../assets/images/logo.png";
import MANZO from "../assets/images/MANZO.png";
import PL from "../assets/images/PL.png";
import PLL from "../assets/images/PLL.png";
import Vectorr from "../assets/images/Vectorr.png";
import Vector2 from "../assets/images/Vector2.png";
import Poem from "../assets/images/Poem.png";
import lg1 from "../assets/images/lg1.png";
import lg2 from "../assets/images/lg2.png";
import lg3 from "../assets/images/lg3.png";
import lg4 from "../assets/images/lg4.png";
import Loogo from "../assets/images/Logoo.png";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="font-sans text-gray-800 leading-relaxed pt-[60px]">
      <section className="py-16">
        <div className="container mx-auto px-5 max-w-6xl">
          <h1 className="text-4xl font-black text-center mb-5 text-[#8C97C3]">
            NOUS SOMMES UNE PLATEFORME{" "}
            <span className="text-[#5869A3]">RESPONSABLE.</span>
          </h1>
          <div className="max-w-4xl mx-auto font-sans ">
            <div className="flex flex-wrap items-center gap-4 pb-6 ">
              <div className="flex items-center shrink-0">
                <img
                  src={journal}
                  alt="Newspaper icon"
                  className="h-[25px] w-[25px] object-contain"
                />
              </div>

              <span className="text-sm font-semibold text-[#5869A3] tracking-wider whitespace-nowrap">
                ARTICLE
              </span>

              <div className="flex items-center shrink-0">
                <img
                  src={articleImage}
                  alt="Article visual"
                  className="h-[25px] w-[25px] object-contain rounded"
                />
              </div>

              <h1 className="text-lg font-semibold text-[#5869A3] whitespace-nowrap">
                Actu , les coulisses de Manzo
              </h1>

              <div className="flex items-center shrink-0">
                <img
                  src={calendrier}
                  alt="Calendar icon"
                  className="h-[25px] w-[25px] mr-1 object-contain"
                />
                <span className="text-sm font-semibold text-[#5869A3] whitespace-nowrap">
                  Publication : 24 Fév 2025
                </span>
              </div>

              <div className="flex items-center shrink-0">
                <img
                  src={crayon}
                  alt="Edit icon"
                  className="h-[25px] w-[25px] mr-1 object-contain"
                />
                <span className="text-sm font-semibold text-[#5869A3] whitespace-nowrap">
                  {" "}
                  Dernière modification : 01 mai 2025
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="relative py-16">
        <div className="container mx-auto px-5 max-w-6xl">
          <div className="float-right ml-8 mb-8 bg-[rgba(188,208,234,0.09)] w-[421px] h-[470px] rounded-[50px] relative p-8">
            <div className="mb-6">
              <h1 className="text-[32px] font-bold text-gray-900 flex justify-center items-center">
                <img src={logo} alt="manzo" />
              </h1>
            </div>
            <h2 className="text-[24px] font-bold text-gray-900 mb-4 ml-14 mr-6 leading-tight">
              MANZO rend votre quotidien plus facile
            </h2>

            <div className="space-y-4 mb-8 ml-6 mr-2">
              <p className="text-[16px] text-gray-700 leading-relaxed">
                En quelques clics, accédez à une large gamme de services à
                domicile : ménage, plombiers, jardiniers...
              </p>
              <p className="text-[16px] text-gray-700 leading-relaxed">
                Découvrez nos offres, accordez-vous du temps ou faites plaisir à
                vos proches avec un bon cadeau MANZO !
              </p>
            </div>

            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
              <Link to="/services">
                <button className="bg-[#434F83] w-[275px] h-[55px] rounded-full shadow-md border-2 border-[#BCD0EA] flex items-center justify-center text-white font-semibold text-[16px]">
                  Réserver un service
                </button>
              </Link>
            </div>
          </div>

          <div className="overflow-hidden">
            <div className="flex items-center mb-4">
              <p className="text-sm font-bold text-[#5869A3]">
                Temps de lecture : 5 minutes environ
              </p>
            </div>

            <h2 className="text-3xl font-bold text-[#1B1F2A] mb-5">
              Nous sommes MANZO:
            </h2>

            <p className="mb-4 font-semibold text-[#3E4763]">
              Manzo, qui signifie "la satisfaction" en japonais, est une
              plateforme conçue pour simplifier l'accès aux services à domicile.
              Besoin d'un plombier, d'un électricien, d'un agent de ménage ou
              d'un bricoleur ? Manzo facilite la mise en relation entre
              particuliers et professionnels qualifiés. En parallèle, nous
              offrons aux artisans et travailleurs indépendants un moyen
              efficace d'élargir leur clientèle et de gérer leur activité en
              toute autonomie.
            </p>

            <h3 className="text-2xl font-semibold mt-8 mb-5">
              Des services à domicile accessibles à tous.
            </h3>

            <p className="mb-4 font-semibold text-[#3E4763]">
              Notre ambition est simple : permettre à chacun de trouver
              rapidement et facilement un prestataire fiable, quel que soit le
              service recherché. Qu'il s'agisse d'une urgence, d'un entretien
              régulier ou d'un projet spécifique, Manzo connecte les clients
              avec les professionnels adaptés, grâce à une interface intuitive
              et un système de réservation simplifié.
            </p>
          </div>
        </div>
        <div className="mx-auto px-5 max-w-6xl ">
          <h3 className="text-2xl font-semibold mb-5 mt-8">
            Liberté et transparence pour les prestataires
          </h3>

          <p className="mb-4 font-semibold text-[#3E4763]">
            Les prestataires sur Manzo fixent librement leurs tarifs et ajoutent
            leurs services selon leurs préférences. La plateforme facilite la
            gestion des paiements en assurant des transactions sécurisées et
            sans frais cachés.
            <div>
              Ils peuvent ainsi adapter leurs offres en fonction de leur
              expertise et de la demande du marché. Manzo leur offre une
              visibilité accrue et un accès direct à une large clientèle.
            </div>
          </p>
        </div>
      </div>
      <div className="bg-[rgba(188,208,234,0.09)] py-8 text-center mx-auto px-5 max-w-6xl rounded-[50px]">
        <div className="container mx-auto px-5 max-w-6xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 mt-20 flex items-center justify-center">
            <img src={MANZO} alt="manzo" />
          </h2>
          <blockquote
            className="text-lg italic font-bold text-[#475489] mb-12"
            style={{ textShadow: "4px 4px 4px rgba(0, 0, 0, 0.2)" }}
          >
            " <span className="font-bold text-[#8C97C3]">MANZO</span> LA
            PLATEFORME QUI CONNECTE CONFIANCE ET EXPERTISE POUR DES
            <br className="hidden sm:block" />
            SERVICES A DOMICILE ACCESSIBLES A TOUS."
          </blockquote>
        </div>
      </div>

      <div className="relative py-12">
        <div className="absolute inset-0 opacity-10 -z-10 w-full h-[80%]"></div>

        <div className="container mx-auto px-5 max-w-6xl">
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <div className="mb-16">
                <h3 className="text-2xl font-bold text-[#1B1F2A] mb-4">
                  Un engagement envers les artisans et l'économie locale.
                </h3>
                <p className="text-[#3E4763] font-semibold">
                  Manzo est ancré dans le territoire et valorise les
                  travailleurs indépendants en leur offrant une visibilité
                  accrue. En facilitant l'accès à un réseau de clients, nous
                  soutenons l'artisanat et encourageons le développement des
                  services de proximité, pour une économie plus dynamique et
                  inclusive.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-[#1B1F2A] mb-4">
                  Une flexibilité totale pour les professionnels.
                </h3>
                <p className="text-[#3E4763] font-semibold">
                  Manzo respecte la liberté des prestataires : ils définissent
                  eux-mêmes leurs disponibilités, leur zone d'intervention et
                  acceptent ou refusent les demandes selon leur emploi du temps.
                  Notre plateforme leur permet de gérer leur activité à leur
                  rythme, sans contrainte ni engagement forcé.
                </p>
              </div>
            </div>

            <div className="w-1/2 bg-[rgba(188,208,234,0.09)] rounded-[50px] p-5 p w-[336px] h-[434px] mr-20">
              <img
                src={PL}
                alt="pl"
                className="w-[336px] h-[434px] rounded-lg m-4 "
              />
            </div>
          </div>
        </div>
      </div>
      <div className="relative py-12">
        <div className="absolute inset-0 opacity-10 -z-10 w-full h-[80%]"></div>

        <div className="container mx-auto px-5 max-w-6xl">
          <div className="flex justify-start items-center">
            <div className="w-[336px] h-[434px] bg-[rgba(188,208,234,0.09)] rounded-[50px] p-5 mr-8">
              <img
                src={PLL}
                alt="pll"
                className="w-[357px] h-[434px] rounded-lg m-4"
              />
            </div>

            <div className="flex-1 pl-6">
              <div className="mb-16">
                <h3 className="text-2xl font-bold text-[#1B1F2A] mb-4 ">
                  Une mise en relation optimisée et équitable.
                </h3>
                <p className="text-[#3E4763] font-semibold ">
                  Notre système intelligent prend en compte plusieurs critères
                  comme la localisation, la disponibilité et la satisfaction des
                  clients pour garantir un service rapide et efficace. Chaque
                  prestataire est évalué de manière objective, assurant aux
                  clients une qualité de service optimale et aux professionnels
                  une reconnaissance de leur savoir-faire, sans aucune
                  discrimination.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-[#1B1F2A] mb-4">
                  Une transparence totale avec nos partenaires.
                </h3>
                <p className="text-[#3E4763] font-semibold">
                  Manzo privilégie une communication claire avec ses
                  utilisateurs. Les professionnels ont accès à toutes les
                  informations nécessaires sur leurs missions, leurs paiements
                  et les retours clients. Nous garantissons une relation de
                  confiance entre toutes les parties pour assurer une expérience
                  fluide et satisfaisante.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative py-12">
        <div className="absolute inset-0 opacity-10 -z-10 w-full h-[80%]"></div>
        <div className="container mx-auto px-5 max-w-6xl">
          <div className="flex justify-start items-start space-x-8">
            <div className="flex-1 pl-6">
              <div>
                <h3 className="text-2xl font-bold text-[#1B1F2A] mb-4">
                  Une plateforme en constante évolution.
                </h3>
                <p className="text-[#3E4763] font-semibold">
                  Manzo ne cesse d’innover pour améliorer l’expérience
                  utilisateur. Nous nous engageons à offrir une plateforme
                  toujours plus performante, intuitive et respectueuse des
                  enjeux sociaux et environnementaux. Notre objectif ? Bâtir une
                  communauté engagée, où clients et prestataires trouvent
                  satisfaction et confiance dans chaque service rendu.
                </p>
              </div>
            </div>

            <div className="w-[446px] h-[460px] bg-[rgba(188,208,234,0.09)] rounded-[50px] relative p-10">
              <div className="mb-6">
                <h1 className="text-[25px] font-bold text-gray-900 text-center items-center pt-8">
                  Inscrivez-vous à la Newsletter 
                  <span className="text-[#6977AF]">#MANZO</span>
                </h1>
              </div>
              <h2 className="text-[24px] text-gray-900 mb-4 text-center mx-5">
                Ne ratez pas les astuces et les bons plans de MANZO !
              </h2>

              <div className="flex flex-col justify-center items-center">
                <img
                  src={Vectorr}
                  alt="arrow"
                  className="absolute bottom-[80px] right-[53%] transform -translate-x-1/2 "
                />

                <input
                  type="email"
                  placeholder="Saisissez votre adresse e-mail"
                  className="px-4 py-2 mb-8 w-[392px] h-[51px] rounded-[50px] border-2 border-[#BCD0EA] focus:outline-none focus:ring-2 focus:ring-[#6977AF] focus:border-[#6977AF] text-center"
                />
                <Link to="/CreerCompte">
                  <button className="px-6 py-2 w-[251px] h-[51px] bg-[#434F83] text-white rounded-[50px] font-semibold">
                    Je m'inscrire
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2 ml-4">
            <img
              src={Poem}
              alt="author"
              className="w-[25px] h-[25px] rounded-full"
            />
            <p className="text-sm text-[#3E4763] font-light">Auteur : Salma</p>
          </div>
        </div>
      </div>

      <section className="text-[#6977AF] font-bold py-12 text-center">
        <div className="container mx-auto px-5 max-w-6xl">
          <h2 className="text-3xl font-bold">
            SIMPLIFIER VOTRE QUOTIDIEN EST NOTRE VOCATION.
          </h2>
        </div>
      </section>


      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-12 items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 col-span-2 self-center ml-[10%] mr-5">
            <div className="flex flex-col items-start">
              <div className="border-2 bg-[#475489]/40 w-[90px] h-[90px] rounded-full flex justify-center items-center mb-4">
                <img src={lg1} alt="Logo 1" className="w-12 h-12" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Une plateforme en constante évolution
              </h2>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="mr-2">→</span>
                  <span>
                    Sélection des meilleurs prestataires selon les avis et la
                    qualité du service.
                  </span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col items-start">
              <div className="border-2 bg-[#475489]/40 w-[90px] h-[90px] rounded-full flex justify-center items-center mb-4">
                <img src={lg2} alt="Logo 2" className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                Matching intelligent des prestataires
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="mr-2">→</span>
                  <span>
                    Filtrage avancé pour trouver le prestataire idéal selon les
                    besoins.
                  </span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col items-start">
              <div className="border-2 bg-[#475489]/40 w-[90px] h-[90px] rounded-full flex justify-center items-center mb-4">
                <img src={lg3} alt="Logo 3" className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                Réservation simplifiée et gestion intuitive
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="mr-2">→</span>
                  <span>
                    Réservation rapide via un calendrier interactif et une
                    interface fluide.
                  </span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col items-start">
              <div className="border-2 bg-[#475489]/40 w-[90px] h-[90px] rounded-full flex justify-center items-center mb-4">
                <img src={lg4} alt="Logo 4" className="w-12 h-12" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                Système de paiement sécurisé et flexible
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="mr-2">→</span>
                  <span>
                    Paiement en ligne ou en espèces avec gestion automatisée des
                    transactions.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex justify-center md:justify-end self-center">
            <div className="bg-[rgba(188,208,234,0.09)] rounded-[50px] p-5 w-[389px] h-[776px] flex items-center justify-center">
              <img
                src={Loogo}
                alt="pl"
                className="w-[246px] h-[715px] rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-3xl text-[#6977AF] font-black mb-12 ml-[13%]">
        EN QUELQUES CHIFFRES
      </h2>
      <section className="py-16 text-center w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 w-full px-10">
          <div className="p-10 bg-[rgba(188,208,234,0.09)] border border-blue-200 rounded-[50px] shadow-md w-full transform transition-transform duration-300 hover:scale-105 hover:rotate-2">
            <div className="text-5xl font-bold text-[#A3BADB] mb-3">
              10 000 +
            </div>
            <div className="text-xl font-bold">
              Services rendus depuis la création
            </div>
          </div>

          <div className="p-10 bg-[rgba(188,208,234,0.09)] border border-blue-200 rounded-[50px] shadow-md w-full transform transition-transform duration-300 hover:scale-105 hover:rotate-2">
            <div className="text-5xl font-bold text-[#A3BADB] mb-3">9800 +</div>
            <div className="text-xl font-bold">
              Services demandés chaque mois
            </div>
          </div>

          <div className="p-10 bg-[rgba(188,208,234,0.09)] border border-blue-200 rounded-[50px] shadow-md w-full transform transition-transform duration-300 hover:scale-105 hover:rotate-2">
            <div className="text-5xl font-bold text-[#4D6099] mb-3">1925 +</div>
            <div className="text-xl font-bold">
              Clients utilisent MANZO pour leurs services à domicile
            </div>
          </div>

          <div className="p-10 bg-[rgba(188,208,234,0.09)] border border-blue-200 rounded-[50px] shadow-md w-full transform transition-transform duration-300 hover:scale-105 hover:rotate-2">
            <div className="text-5xl font-bold text-[#1F263D] mb-3">
              15 villes
            </div>
            <div className="text-xl font-bold m-4">Couverture géographique</div>
          </div>
        </div>
      </section>

      <section className="py-20 text-center border-t-2 border-b-2 border-[#475489] bg-[rgba(188,208,234,0.09)] mt-12 ">
        <div className="container mx-auto px-5 max-w-6xl">
          <h2 className="text-3xl font-black mb-8 text-[#6977AF]">
            COMMENCEZ L'AVENTURE MANZO SANS PLUS TARDER
          </h2>
          <div className="flex flex-col md:flex-row justify-center gap-6 mt-12">
            <Link to="/DevenirPres">
              <button className="text-[#475489] border-4 border-[#475489] font-bold py-4 px-8 rounded-[37.5px] text-lg w-[302px] h-[63px] hover:bg-[#475489] hover:text-white transition duration-300">
                Devenir prestataire
              </button>
            </Link>
            <Link to="/services">
              <button className="bg-[#434F83] border-white text-white font-bold py-4 px-8 rounded-[37.5px] text-lg w-[302px] h-[63px] hover:bg-[#475489] transition duration-300">
                Demander un service
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white relative">
        <div className="container mx-auto px-5 max-w-6xl mt-10 mb-10">
          <div className="flex flex-col">
            <div className="text-left mb-8 max-w-[600px] mb-[50px] ml-[1%]">
              <h2 className="text-3xl font-black text-[#6977AF] ">
                VOUS AVEZ DES QUESTIONS ?
              </h2>
              <p className="text-3xl text-[#6977AF] font-black ">
                CONSULTEZ NOTRE <span className="text-[#475489]">FAQ </span>POUR
              </p>
              <p className="text-3xl text-[#6977AF] font-black ml-[30%] ">
                EN <span className="text-[#475489]">SAVOIR PLUS</span> !
              </p>
            </div>

            <div className="flex items-end justify-center relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 mb-5 mb-[10px]">
                <img
                  src={Vector2}
                  alt="Arrow pointing to button"
                  className="transform mb-9"
                />
              </div>

              <Link to="/faq" className="flex w-full ml-[59%]">
                <button className="bg-[#475489] text-xl text-white font-bold py-3 px-6 rounded-[37.5px] w-[275px] h-[75px] ">
                  Voir la FAQ
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
