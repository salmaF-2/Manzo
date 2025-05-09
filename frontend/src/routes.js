// Configuration des routes
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ServiceFixe from "./pages/ServiceFixe";
import ServiceDevis from "./pages/ServiceDevis";
import ResultatsRecherche from "./pages/ResultatsRecherche";
import Accueil from "./pages/Accueil";
import CreerCompte from "./components/creerCompte";
import Connexion from "./components/connexion";
import InscriptionClient from "./components/inscriptionClient";

import PrestatairesList from './pages/PrestatairesList';
import VilleDetail from "./components/VilleDetail";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Accueil/> }/>
        <Route path="/DevenirPres" element="" />
        <Route path="/Contact" element="" />
        <Route path="/serviceFixe" element={<ServiceFixe/>} />
        <Route path="/serviceDevis" element={<ServiceDevis/>} />
        <Route path="/recherche" element={<ResultatsRecherche/>} />
        {/* <Route path="/services/tout-le-maroc" element={<ServicesTousMaroc/>} /> */}
        <Route path="/CreerCompte" element={<CreerCompte/>} />
        <Route path="/InscriptionClient" element={<InscriptionClient/>} />
        <Route path="/InscriptionPrestataire" element=''/>
        <Route path="/Seconnecter" element={<Connexion/>}/>
        <Route path="/prestataires" element={<PrestatairesList />} />
        <Route path="/ville/:ville" element={<VilleDetail />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
};

export default AppRoutes;
