// Configuration des routes
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Accueil from "./pages/Accueil";
import Contact from "./pages/Accueil";
import DevenirPres from "./pages/DevenirPres.js"




const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element=""/>
        <Route path="/DevenirPres" element={<DevenirPres />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/serviceFixe" element="" />
        <Route path="/serviceDevis" element="" />
        <Route path="/Seconnecter" element="" />
        <Route path="/CreerCompte" element="" />

      </Routes>
      <Footer/>
    </BrowserRouter>
  );
};

export default AppRoutes;
