import React, { useEffect, useState } from "react";
import { HelpCircle } from "lucide-react";
import PopUp from "./PopUp.js";

export default function PrestataireInscription() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  useEffect(() => {
          window.scrollTo(0, 0);
      }, []);
    return (
      <div className="prestataire-page mt-14 ">
        <section className="hero-section text-center py-12 w-full px-2 sm:px-4">
        {/* Main heading */}
        <h1 className="text-2xl md:text-4xl font-black uppercase text-[#8C97C3] mb-4">
            REJOIGNEZ MANZO
        </h1>
        
        {/* Subheading */}
        <h2 className="text-2xl md:text-3xl font-bold uppercase text-[#4A5B8C] mb-8">
            LIBÉREZ VOTRE POTENTIEL, TRAVAILLEZ À VOTRE RYTHME
        </h2>
        
        {/* Wider description paragraph */}
        <div className="max-w-4xl mx-auto px-2">
            <p className="text-lg md:text-xl font-bold uppercase text-gray-700 mb-6">
            DÉCOUVREZ LES AVANTAGES DE DEVENIR PRESTATAIRE AVEC MANZO.
            UN RÉSEAU DE CLIENTS, DES FORMATIONS PROFESSIONNELLES, DES PAIEMENTS SÉCURISÉS ET BIEN PLUS ENCORE POUR VOUS PERMETTRE DE RÉUSSIR.
            </p>
        </div>
        
        {/* Full-width image with minimal padding */}
        <div className="w-full px-2 sm:px-4 mt-12">
            <img 
            src="/images/services/devenirpres1.png" 
            alt="Devenir prestataire MANZO" 
            className="w-full h-auto rounded-lg shadow-md" 
            />
        </div>
        </section>


      {/* Wavy Divider with Logo Inside */}
        <div className="relative bg-white">
        <svg
            viewBox="0 0 1440 320"
            className="w-full h-40"
            preserveAspectRatio="none"
        >
            <path
            fill="#f0f5fa" /* Light blue */
            d="M0,224 C360,64 1080,384 1440,224 L1440,320 L0,320 Z"
            />
        </svg>
        {/* Centered Logo */}
        <div className="absolute inset-0 flex justify-center items-center">
        <div className="bg-white p-3 rounded-full shadow-md">
            <img 
            src="/images/services/manzo logo.png" 
            alt="Logo" 
            className="h-16 w-16 md:h-20 md:w-20" 
            />
        </div>
        </div>
        </div>


  
        <section className="py-12 bg-[#f0f5fa] w-full px-6 sm:px-12" id="advantages">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-[#4A5B8C] mb-4 tracking-tight">MES AVANTAGES</h2>
            <div className="flex justify-center mt-6">
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#4A5B8C] to-transparent"></div>
            </div>
        </div>

        {/* Card Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {[
            {
                title: "Flexibilité Horaires",
                text: "Vous choisissez quand et combien de temps vous travaillez selon vos disponibilités.",
                badge: "Disponible 24h/24",
                image: "/images/services/horaire.png",
            },
            {
                title: "Paiement Immédiat",
                text: "Recevez vos paiements directement sur votre compte en toute sécurité.",
                badge: "Sécurisé & Rapide",
                image: "/images/services/paiment.png",
            },
            {
                title: "Réseau Professionnel",
                text: "Accédez à une clientèle fidèle et développez votre réseau de professionnels.",
                badge: "+5000 clients",
                image: "/images/services/reseau.png",
            },
            {
                title: "Tableau de Bord",
                text: "Suivez en temps réel vos missions, revenus et performances.",
                badge: "Analytique Complet",
                image: "/images/services/tab.png",
            },
            {
                title: "Support Premium",
                text: "Notre équipe dédiée vous accompagne à chaque étape de votre activité.",
                badge: "7j/7 - 9h-20h",
                image: "/images/services/supp.png",
            },
            {
                title: "Formation Continue",
                text: "Accédez à des modules de formation pour développer vos compétences.",
                badge: "Certifications",
                image: "/images/services/form.png",
            },
            {
                title: "Parrainage Avantageux",
                text: "Gagnez des primes en invitant d'autres prestataires à rejoindre Manzo.",
                badge: "Gagnant/Gagnant",
                image: "/images/services/sponsor.png",
            },
            {
                title: "Offres Exclusives",
                text: "Profitez de remises sur du matériel, des outils ou des abonnements professionnels grâce à nos partenaires.",
                badge: "Offres",
                image: "/images/services/offre.png",
            },
            {
                title: "Protection Juridique",
                text: "Soyez serein grâce à une couverture juridique adaptée à votre activité.",
                badge: "Sécurité",
                image: "/images/services/law.png",
            },
            ].map((adv, idx) => (
            <div
                key={idx}
                className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-2 flex flex-col justify-between"
            >
                <div className="p-5">
                <div className="w-16 h-16 mx-auto mb-4">
                    <img src={adv.image} alt={adv.title} className="w-full h-full object-contain" />
                </div>
                <h3 className="text-lg font-semibold text-[#4A5B8C] text-center mb-3">{adv.title}</h3>
                <p className="text-gray-600 text-center text-sm">{adv.text}</p>
                </div>
                <div className="bg-[#a1c4fd] text-[#4A5B8C] text-sm font-medium text-center py-3 border-t border-[#e3f2fd] rounded-b-3xl">
                {adv.badge}
                </div>
            </div>
            ))}
        </div>

        {/* Modern Divider */}
        <div className="flex justify-center mt-20 mb-10">
            <div className="w-48 h-1 bg-gradient-to-r from-transparent via-[#4A5B8C] to-transparent"></div>
        </div>
        </section>



    {/* How It Works Section */}
    <section className="advantages-section text-center pt-0 pb-16 bg-[#f0f5fa] w-full px-2 sm:px-4" id="how-it-works">
    {/* Section title */}
    <h1 className="text-2xl md:text-3xl font-black uppercase text-[#4A5B8C] mb-12 flex items-center justify-center gap-3">
    COMMENT ÇA FONCTIONNE 
    <HelpCircle className="w-7 h-7 text-[#4A5B8C]" />
    </h1>

    <div className="relative max-w-6xl mx-auto">
        {/* Process circles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-24">
        {/* Step 1 with Image */}
        <div className="flex flex-col items-center transition-all duration-500 hover:scale-105 bg-[#f0f5fa]">
    <img 
        src="/images/services/Choose Your Cleaning Service.png"  
        alt="Find Mission" 
        className="w-32 h-32 object-contain mb-4 bg-[#f0f5fa]"  
    />
    <h3 className="text-lg font-semibold text-center mb-2">Trouvez une mission</h3>
    <p className="text-sm text-gray-600 text-center max-w-xs">
        Choisissez une mission qui correspond à vos compétences
    </p>
    </div>

        
        {/* Step 2 */}
        <div className="flex flex-col items-center transition-all duration-500 hover:scale-105 ">
        <img 
        src="/images/services/Schedule Your Cleaning Time (1).png"  
        alt="Find Mission" 
        className="w-32 h-32 object-contain"  
        />
    <h3 className="text-lg font-semibold text-center mb-2">Confirmez le rendez-vous</h3>
    <p className="text-sm text-gray-600 text-center max-w-xs">
    Acceptez la mission et planifiez l'intervention.  </p>
    </div>
        
        {/* Step 3 */}
        <div className="flex flex-col items-center transition-all duration-500 hover:scale-105">
        <img 
        src="/images/services/Home.png"  
        alt="Find Mission" 
        className="w-32 h-32 object-contain"  
        />
    <h3 className="text-lg font-semibold text-center mb-2">Réalisez la prestation</h3>
    <p className="text-sm text-gray-600 text-center max-w-xs">
    Faites votre travail avec professionnalisme et qualité.  </p>
    </div>
        
        {/* Step 4 */}
        <div className="flex flex-col items-center transition-all duration-500 hover:scale-105">
        <img 
        src="/images/services/Choose Your Cleaning Service-2.png"  
        alt="Find Mission" 
        className="w-32 h-32 object-contain"  
        />
    <h3 className="text-lg font-semibold text-center mb-2">Recevez votre paiement</h3>
    <p className="text-sm text-gray-600 text-center max-w-xs">
    Le client règle et laisse un avis.  </p>
    </div>
        </div>
        
    {/* Connecting lines with arrow */}
    <div className="hidden md:block absolute top-14 left-1/2 w-2/3 h-3/4 -translate-x-1/2">
    <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 500 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Main path */}
        <path 
        d="M125,32 C200,30 300,120 375,32 C450,-50 50,350 125,268 C200,180 300,180 375,268" 
        stroke="#f2bb30" 
        strokeWidth="2" 
        strokeDasharray="5 5" 
        fill="none"
        markerEnd="url(#arrowhead)"
        />
        
        {/* Arrowhead definition */}
        <defs>
        <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
        >
            <polygon 
            points="0 0, 10 3.5, 0 7" 
            fill="#f2bb30"
            />
        </marker>
        </defs>
    </svg>
    </div>
        
    {/* Modern Divider */}
    <div className="flex justify-center mt-20 mb-10">
        <div className="w-48 h-1 bg-gradient-to-r from-transparent via-[#4A5B8C] to-transparent"></div>
    </div>
    </div>
    </section>

{/* Join Steps Section with Enhanced UX */}
<section className="pt-0 pb-16 bg-[#f0f5fa] w-full px-4 sm:px-8" id="join-steps">
  {/* Section Title - No top margin */}
  <div className="max-w-4xl mx-auto text-center">
    <h2 className="text-3xl md:text-3xl font-bold text-[#4A5B8C] mb-8">
      REJOIGNEZ <span className="text-[#8C97C3]">MANZO</span> EN 4 ÉTAPES SIMPLES
    </h2>
    {/* <div className="w-40 h-1 bg-[#4A5B8C] mx-auto mb-4"></div> */}

  </div>

  {/* Steps Grid */}
  <div className="max-w-9xl mx-auto px-6 py-12">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {/* Step 1 */}
      <div className="w-[350px] h-[250px] perspective-1000 mx-auto">
  <div className="w-full h-full relative preserve-3d transition-transform duration-1000 group-hover:rotate-y-180">
    {/* Front of Card */}
    <div className="absolute w-full h-full backface-hidden bg-[#6A2C70] text-white flex items-center border-[10px] border-[#4A5B8C] rounded-lg justify-center text-2xl rotate-y-0">
      {/* Front content (image) */}
      <img src="/images/services/s1s.png" alt="Card Front" className="w-full h-full object-cover" />
    </div>
    
{/* Back of Card */}
<div className="absolute w-full h-full backface-hidden bg-[#4A5B8C] text-white flex flex-col items-center justify-center border-[10px] border-[#4A5B8C] rounded-lg p-8 rotate-y-180">
  {/* Title */}
  <h3 className="text-2xl md:text-xl font-bold mb-4 text-center leading-tight">
  Remplissez le formulaire
  </h3>
  
  {/* Description */}
  <p className="text-lg text-center text-white/90 max-w-[90%]">
  Postulez en ligne ou contactez notre service client.
  </p>
</div>

  </div>
</div>

      {/* Step 2 */}
      <div className="w-[350px] h-[250px] perspective-1000 mx-auto">
  <div className="w-full h-full relative preserve-3d transition-transform duration-1000 group-hover:rotate-y-180">
    {/* Front of Card */}
    <div className="absolute w-full h-full backface-hidden bg-[#6A2C70] text-white flex items-center border-[10px] border-[#4A5B8C] rounded-lg justify-center text-2xl rotate-y-0">
      {/* Front content (image) */}
      <img src="/images/services/s2.jpg" alt="Card Front" className="w-full h-full object-cover" />
    </div>
    
{/* Back of Card */}
<div className="absolute w-full h-full backface-hidden bg-[#4A5B8C] text-white flex flex-col items-center justify-center border-[10px] border-[#4A5B8C] rounded-lg p-8 rotate-y-180">
  {/* Title */}
  <h3 className="text-2xl md:text-xl font-bold mb-4 text-center leading-tight">
  Passez un entretien
  </h3>
  {/* Description */}
  <p className="text-lg text-center text-white/90 max-w-[90%]">
  Validez vos compétences et obtenez toutes les infos.  </p>
</div>

  </div>
</div>

      {/* Step 3 */}
      <div className="w-[350px] h-[250px] perspective-1000 mx-auto">
  <div className="w-full h-full relative preserve-3d transition-transform duration-1000 group-hover:rotate-y-180">
    {/* Front of Card */}
    <div className="absolute w-full h-full backface-hidden bg-[#6A2C70] text-white flex items-center border-[10px] border-[#4A5B8C] rounded-lg justify-center text-2xl rotate-y-0">
      {/* Front content (image) */}
      <img src="/images/services/s3.jpg" alt="Card Front" className="w-full h-full object-cover" />
    </div>
    
{/* Back of Card */}
<div className="absolute w-full h-full backface-hidden bg-[#4A5B8C] text-white flex flex-col items-center justify-center border-[10px] border-[#4A5B8C] rounded-lg p-8 rotate-y-180">
  {/* Title */}
  <h3 className="text-2xl md:text-xl font-bold mb-4 text-center leading-tight">
  Déposez votre dossier  </h3>
  
  {/* Description */}
  <p className="text-lg text-center text-white/90 max-w-[90%]">
  Envoyez vos documents administratifs.  </p>
</div>

  </div>
</div>

      {/* Step 4 */}
      <div className="w-[350px] h-[250px] perspective-1000 mx-auto">
  <div className="w-full h-full relative preserve-3d transition-transform duration-1000 group-hover:rotate-y-180">
    {/* Front of Card */}
    <div className="absolute w-full h-full backface-hidden bg-[#6A2C70] text-white flex items-center border-[10px] border-[#4A5B8C] rounded-lg justify-center text-2xl rotate-y-0">
      {/* Front content (image) */}
      <img src="/images/services/s4.jpg" alt="Card Front" className="w-full h-full object-cover" />
    </div>
    
{/* Back of Card */}
<div className="absolute w-full h-full backface-hidden bg-[#4A5B8C] text-white flex flex-col items-center justify-center border-[10px] border-[#4A5B8C] rounded-lg p-8 rotate-y-180">
  {/* Title */}
  <h5 className="text-2xl md:text-xl font-bold mb-4 text-center leading-tight">
  Suivez la formation et activez votre compte  </h5>
  
  {/* Description */}
  <p className="text-lg text-center text-white/90 max-w-[90%]">
  Apprenez les bases et démarrez votre activité sur notre app !  </p>
</div>

  </div>
</div>
    </div>
  </div>

  {/* Modern Divider */}
  <div className="flex justify-center mt-20 mb-4">
    <div className="w-48 h-1 bg-gradient-to-r from-transparent via-[#4A5B8C] to-transparent"></div>
  </div>
</section>

{/* Required Documents Section with Enhanced UX */}
<section className="pt-0 pb-16 bg-[#f0f5fa] w-full px-4 sm:px-8" id="required-documents">
  <div className="max-w-6xl mx-auto">
    {/* Section Title */}
    <div className="text-center mb-24">
      <h2 className="text-3xl md:text-3xl font-bold text-[#4A5B8C] mb-8">DOCUMENTS REQUIS</h2>
      <p className="text-gray-600 max-w-4xl mx-auto text-lg leading-relaxed px-4">
  Contactez notre service client pour plus d'informations.<br />
  Service client disponible 7j/7, de 9h à 20h au +212 520 100 004
</p>
    </div>

{/* Documents Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
  {/* Professionals Card */}
  <div className="flex items-start space-x-6 p-8 bg-[#e3f2fd] rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
    <div className="bg-white p-3 rounded-full flex-shrink-0 w-16 h-16 flex items-center justify-center">
      <img 
        src="/images/services/image container.png" 
        alt="Professionals" 
        className="w-20 h-20 object-contain"
      />
    </div>
    <div>
      <h3 className="text-xl font-semibold mb-4 text-[#336ed4]">Professionnels sans statut</h3>
      <ul className="space-y-3 text-gray-700">
        <li className="flex items-start">
          <span className="w-2 h-2 bg-[#4A5B8C] rounded-full mt-2 mr-3 flex-shrink-0"></span>
          <span>Copie CIN en cours de validité</span>
        </li>
        <li className="flex items-start">
          <span className="w-2 h-2 bg-[#4A5B8C] rounded-full mt-2 mr-3 flex-shrink-0"></span>
          <span>RIB (optionnel)</span>
        </li>
        <li className="flex items-start">
          <span className="w-2 h-2 bg-[#4B5B8C] rounded-full mt-2 mr-3 flex-shrink-0"></span>
          <span>Fiche anthropométrique</span>
        </li>
      </ul>
    </div>
  </div>

  {/* Bank Details Card */}
  <div className="flex items-start space-x-6 p-8 bg-[#e3f2fd] rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
    <div className="bg-white p-3 rounded-full flex-shrink-0 w-16 h-16 flex items-center justify-center">
      <img 
        src="/images/services/image container-1.png" 
        alt="Bank Details" 
        className="w-10 h-10 object-contain"
      />
    </div>
    <div>
      <h3 className="text-xl font-semibold mb-4 text-[#336ed4]">Auto-entrepreneurs</h3>
      <ul className="space-y-3 text-gray-700">
        <li className="flex items-start">
          <span className="w-2 h-2 bg-[#4A5B8C] rounded-full mt-2 mr-3 flex-shrink-0"></span>
          <span>Carte AE</span>
        </li>
        <li className="flex items-start">
          <span className="w-2 h-2 bg-[#4A5B8C] rounded-full mt-2 mr-3 flex-shrink-0"></span>
          <span>Attestation d'éligibilité</span>
        </li>
        <li className="flex items-start">
          <span className="w-2 h-2 bg-[#4A5B8C] rounded-full mt-2 mr-3 flex-shrink-0"></span>
          <span>Copie CIN en cours de validité</span>
        </li>
        <li className="flex items-start">
          <span className="w-2 h-2 bg-[#4A5B8C] rounded-full mt-2 mr-3 flex-shrink-0"></span>
          <span>RIB (optionnel)</span>
        </li>
        <li className="flex items-start">
          <span className="w-2 h-2 bg-[#4A5B8C] rounded-full mt-2 mr-3 flex-shrink-0"></span>
          <span>Fiche anthropométrique</span>
        </li>
      </ul>
    </div>
  </div>
</div>
  </div>
</section>

{/* Wavy Divider */}
<div className="relative bg-[#f0f5fa]">
  <svg
    viewBox="0 0 1440 120"
    className="w-full h-32"
    preserveAspectRatio="none"
  >
    <path
      fill="white"
      d="M0,80 C300,40 600,120 900,60 C1200,0 1440,80 1440,80 L1440,600 L0,600 Z"    />
  </svg>
</div>



{/* Call To Action Section */}
<section className="relative w-full h-[500px] md:h-[600px] bg-white mb-8">
  {/* Wavy Image Container - Balanced Wave */}
  <div className="absolute inset-0 w-full h-full overflow-hidden">
    <svg 
      viewBox="0 0 1440 600" 
      className="absolute inset-0 w-full h-full z-0"
      preserveAspectRatio="none"
    >
      <path
        fill="url(#cta-image)"
        d="M0,80 C300,40 600,120 900,60 C1200,0 1440,80 1440,80 L1440,600 L0,600 Z" 
      />
      <defs>
        <pattern id="cta-image" patternUnits="userSpaceOnUse" width="1440" height="600">
          <image 
            href="/images/services/Vector201.png" 
            x="0" 
            y="0" 
            width="1440" 
            height="600"
            preserveAspectRatio="xMidYMid slice"
          />
        </pattern>
      </defs>
    </svg>
  </div>
  
  
  <>
      {/* Main Content - remains unchanged */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-[#4A5B8C] text-3xl md:text-4xl font-bold mb-6 leading-tight">
            PRÊT À PROPOSER VOS SERVICES À DOMICILE ?
          </h2>
          <p className="text-[#4B5B8C] text-lg md:text-xl mb-8 font-medium">
            Rejoignez notre communauté de professionnels et commencez à travailler selon vos conditions.
          </p>
          <div className="flex justify-center">
            <button 
              className="bg-[#4A5B8C] hover:bg-[#3a4a7a] text-white font-semibold px-8 py-3 md:px-10 md:py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
              onClick={() => setIsFormOpen(true)}
            >
              Prenez contact maintenant
            </button>
          </div>
        </div>
      </div>

      {/* Popup Form  */}
      <PopUp
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={(formData) => {
          console.log('Form submitted:', formData);
          setIsFormOpen(false);
        }}
      />
    </>
</section>

      </div>
    );
  }