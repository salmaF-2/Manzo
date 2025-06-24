// Configuration des routes
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { AuthProvider } from "./context/AuthContext";
import HeaderRole from "./components/HeaderRole";

// salma fadili
import ServiceFixe from "./pages/ServiceFixe";
import ServiceDevis from "./pages/ServiceDevis";
import ResultatsRecherche from "./pages/ResultatsRecherche";
// salma 
import Accueil from "./pages/Accueil";
import Contact from "./pages/Contact.js";
import DevenirPres from "./auth/DevenirPres.js"

import CreerCompte from "./auth/creerCompte";
import Connexion from "./auth/connexion";
import InscriptionClient from "./auth/inscriptionClient";
import Dashboard from "./pages/Page_Prestataire/Dashboard";
import ProfilP from "./pages/Page_Prestataire/Profil";
import ModifierProfil from "./pages/Page_Prestataire/ModifierProfil";
import ServicesP from "./pages/Page_Prestataire/PageServices";
import AjouterService from "./pages/Page_Prestataire/Ajouter_service";
import ModifierService from "./pages/Page_Prestataire/Modifier_service";
import DemandesS from "./pages/Page_Prestataire/DemandesS";
import ParametreP from "./pages/Page_Prestataire/ParametreP";
import MessagesP from "./pages/Page_Prestataire/MessagesP";
import PaiementP from "./pages/Page_Prestataire/Paiements";
import RendezVousP from "./pages/Page_Prestataire/Rendez-vousP";
import HistoriqueP from "./pages/Page_Prestataire/HistoriqueP";
import PrestatairesList from "./pages/PrestatairesList";
import VilleDetail from "./components/VilleDetail";
// youness
import AboutPage from "./pages/savoirplus";
import CentreAide from "./pages/centreAide";
import PFAQProfessional from "./pages/ProFAQCategories";
import CFAQProfessional from "./pages/ClientFAQCategories";
import FAQcompte from "./pages/FAQ/FAQcompte";
import FAQgeneral from "./pages/FAQ/FAQgeneral";
import FAQpaiement from "./pages/FAQ/FAQpaiement";
import FAQdemandeService from "./pages/FAQ/FAQservice";
import FAQevaluation from "./pages/FAQ/FAQevaluation";
import FAQabsenceAnnulation from "./pages/FAQ/FAQcancel";
import FAQannexes from "./pages/FAQ/FAQannex";
import FAQadhesion from "./pages/FAQ/FAQadhesion";
import FAQpostAdhesion from "./pages/FAQ/FAQpostAdhesion";
import FAQpaiementP from "./pages/FAQ/FAQpaiementP";
import FAQnotation from "./pages/FAQ/FAQnotation";
import FAQevaluationP from "./pages/FAQ/FAQevaluationP";

import ProfileP from "./pages/lockedprofileP";
import Mainprofile from "./pages/profile";
import DashboardClient from "./pages/page_Clients/DashboardClient.js";
import MotDePasseOublie from "./auth/MotdePasseOublier.js";
import ProtectedRoute from "./components/ProtectedRoute.js";
import ProfilClient from "./pages/page_Clients/ProfilClient.js";

const AppWrapper = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <App />
            </AuthProvider>
        </BrowserRouter>
    );
};

const App = () => {
  const location = useLocation();

  const shouldShowHeaderFooter = () => {
    const path = location.pathname.toLowerCase();
     // const shouldShowHeaderFooter =
    //   location.pathname.toLowerCase() !== "/faq" &&
    //   location.pathname.toLowerCase() !== "/faq-professional";
    
    // Liste des routes où on ne veut pas afficher Header/Footer
    const excludedRoutes = [
      // Pages FAQ
      "/faq",
      "/faq-professional",
      
      // Routes prestataires
      "/dashboardprestataire",
      "/profilprestataire",
      "/modifierprofil",
      "/services-prestataire",
      "/ajouter_service",
      "/modifier_service",
      "/demandes-prestataire",
      "/rendez-vous-prestataire",
      "/historique-prestataire",
      "/messages-prestataire",
      "/paiemant-prestataire",
      "/parametre-prestataire",
      
      // Routes clients
      "/dashboardclient",
      "/profilclient"
    ];
    
    return !excludedRoutes.some(route => path.startsWith(route));
  };

  return (
    <>
      {shouldShowHeaderFooter() && <Header />}
      <HeaderRole />

      <Routes>
        {/* accueil */}
        <Route path="/" element={<Accueil />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/DevenirPres" element={<DevenirPres />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/serviceFixe" element={<ServiceFixe />} />
        <Route path="/serviceDevis" element={<ServiceDevis />} />
        <Route path="/recherche" element={<ResultatsRecherche />} />
        
        {/* Prestataires */}
        <Route path="/prestataires" element={<PrestatairesList />} />
        <Route path="/ville/:ville" element={<VilleDetail />} />

        {/* Auth */}
        <Route path="/CreerCompte" element={<CreerCompte />} />
        <Route path="/InscriptionClient" element={<InscriptionClient />} />
        <Route path="/Seconnecter" element={<Connexion />} />
        <Route path="/MotDePasseOublie" element={<MotDePasseOublie />} />

        {/* Partie Prestataire */}
        <Route element={<ProtectedRoute allowedRoles={['prestataire']} />}>
            <Route path="/DashboardPrestataire" element={<Dashboard />} />
            <Route path="/ProfilPrestataire" element={<ProfilP />} />
            <Route path="/modifierProfil" element={<ModifierProfil />} />
            <Route path="/Services-Prestataire" element={<ServicesP />} />
            <Route path="/Ajouter_service" element={<AjouterService />} />
            <Route path="/Modifier_service" element={<ModifierService />} />
            <Route path="/Demandes-Prestataire" element={<DemandesS />} />
            <Route path="/Rendez-vous-Prestataire" element={<RendezVousP />} />
            <Route path="/Historique-Prestataire" element={<HistoriqueP />} />
            <Route path="/Messages-Prestataire" element={<MessagesP />} />
            <Route path="/Paiemant-Prestataire" element={<PaiementP />} />
            <Route path="/Parametre-Prestataire" element={<ParametreP />} />
        </Route>
        
        {/* Partie Client */}
        <Route element={<ProtectedRoute allowedRoles={['client']} />}>
          <Route path="/DashboardClient" element={<DashboardClient />} />
          <Route path="/ProfilClient" element={<ProfilClient />} />
        </Route>

        {/* FAQ Pages - Clients */}
        <Route path="/faq" element={<CentreAide />} />
        <Route path="/faq-client" element={<CFAQProfessional />} />
        <Route path="/faq-client/compte" element={<FAQcompte />} />
        <Route path="/faq-client/general" element={<FAQgeneral />} />
        <Route path="/faq-client/paiement" element={<FAQpaiement />} />
        <Route path="/faq-client/service" element={<FAQdemandeService />} />
        <Route path="/faq-client/evaluation" element={<FAQevaluation />} />
        <Route path="/faq-client/absences" element={<FAQabsenceAnnulation />} />
        <Route path="/faq-client/annexes" element={<FAQannexes />} />

        {/* FAQ Pages - Professionnels */}
        <Route path="/faq-professional" element={<PFAQProfessional />} />
        <Route path="/faq-professional/adhesion" element={<FAQadhesion />} />
        <Route path="/faq-professional/post-adhesion" element={<FAQpostAdhesion />} />
        <Route path="/faq-professional/paiement" element={<FAQpaiementP />} />
        <Route path="/faq-professional/notation" element={<FAQnotation />} />
        <Route path="/faq-professional/evaluation" element={<FAQevaluationP />} />

        {/* les Profiles pages */}
        <Route path="/profile-locked" element={<ProfileP />} />
        <Route path="/profile" element={<Mainprofile />} />
      </Routes>

      {shouldShowHeaderFooter() && <Footer />}
    </>
  );
};

export default AppWrapper;