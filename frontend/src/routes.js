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
        <Route path="/Dashboard" element={<Dashboard/>}/>

        {/* partie Clients */}
      
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
};

export default AppRoutes;
