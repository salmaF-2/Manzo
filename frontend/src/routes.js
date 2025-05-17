// Configuration des routes
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Accueil from "./pages/Accueil";
import CreerCompte from "./auth/creerCompte";
import Connexion from "./auth/connexion";
import InscriptionClient from "./auth/inscriptionClient";
import Dashboard from "./pages/Page_Prestataire/Dashboard";
import HeaderRole from "./components/HeaderRole";
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




const AppRoutes = () => {
  return (
    <BrowserRouter>
      <HeaderRole/>
      <Routes>
        {/* accueil */}
        <Route path="/" element={<Accueil/> }/>
        <Route path="/DevenirPres" element="" />
        <Route path="/Contact" element="" />
        <Route path="/serviceFixe" element="" />
        <Route path="/serviceDevis" element="" />

        {/* connexion inscription */}
        <Route path="/CreerCompte" element={<CreerCompte/>} />
        <Route path="/InscriptionClient" element={<InscriptionClient/>} />
        <Route path="/InscriptionPrestataire" element=''/>
        <Route path="/Seconnecter" element={<Connexion/>}/>

        {/* partie prestataire */}
        <Route path="/DashboardPrestataire" element={<Dashboard/>}/>
        <Route path="/ProfilPrestataire" element={<ProfilP/>} />
        <Route path="/modifierProfil" element={<ModifierProfil/>} />
        <Route path="/Services-Prestataire" element={<ServicesP/>}/>
        <Route path="/Ajouter_service" element={<AjouterService/>}/>
        <Route path="/Modifier_service" element={<ModifierService/>}/>
        <Route path="/Demandes-Prestataire" element={<DemandesS/>}/>
        <Route path="/Rendez-vous-Prestataire" element={<RendezVousP/>}/>
        <Route path="/Historique-Prestataire" element={<HistoriqueP/>}/>
        <Route path="/Messages-Prestataire" element={<MessagesP/>}/>
        <Route path="/Paiemant-Prestataire" element={<PaiementP/>}/>
        <Route path="/Parametre-Prestataire" element={<ParametreP/>}/>

        {/* partie Clients */}
      
      </Routes>
      {/* <Footer/> */}
    </BrowserRouter>
  );
};

export default AppRoutes;