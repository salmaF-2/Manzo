// Configuration des routes
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";




const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element="" />
        <Route path="/DevenirPres" element="" />
        <Route path="/Contact" element="" />
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
