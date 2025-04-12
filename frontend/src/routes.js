// Configuration des routes
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Accueil from "./pages/Accueil";
import CreerCompte from "./components/creerCompte";
import Connexion from "./components/connexion";
import InscriptionClient from "./components/inscriptionClient";
import Dashboard from "./pages/Page_Prestataire/Dashboard";




const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Header/>
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
      
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
};

export default AppRoutes;
