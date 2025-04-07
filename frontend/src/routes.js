// Configuration des routes
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ServiceFixe from "./pages/ServiceFixe";
import ServiceDevis from "./pages/ServiceDevis";
import ResultatsRecherche from "./pages/services/ResultatsRecherche";




const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element="" />
        <Route path="/DevenirPres" element="" />
        <Route path="/Contact" element="" />
        <Route path="/serviceFixe" element={<ServiceFixe/>} />
        <Route path="/serviceDevis" element={<ServiceDevis/>} />
        <Route path="/recherche" element={<ResultatsRecherche/>} />
        {/* <Route path="/services/tout-le-maroc" element={<ServicesTousMaroc/>} /> */}
     
  
        <Route path="/Seconnecter" element="" />
        <Route path="/CreerCompte" element="" />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
};

export default AppRoutes;
