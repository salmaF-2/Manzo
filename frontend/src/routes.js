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




const AppRoutes = () => {
  return (
    <BrowserRouter>
      <HeaderRole role='prestataire'/>
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
        <Route path="/Services-Prestataire" element=""/>
        <Route path="/Demandes-Prestataire" element=""/>
        <Route path="/Rendez-vous-Prestataire" element=""/>
        <Route path="/Historique-Prestataire" element=""/>
        <Route path="/Messages-Prestataire" element=""/>
        <Route path="/Paiemant-Prestataire" element=""/>
        <Route path="/Parametre-Prestataire" element=""/>

        {/* partie Clients */}
      
      </Routes>
      {/* <Footer/> */}
    </BrowserRouter>
  );
};

export default AppRoutes;