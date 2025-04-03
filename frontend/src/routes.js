import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
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

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

const App = () => {
  const location = useLocation();

  const shouldShowFooter =
    location.pathname.toLowerCase() !== "/faq" &&
    location.pathname.toLowerCase() !== "/faq-professional";

  return (
    <div>
      {shouldShowFooter && <Header />}
      <Routes>
        <Route path="/about" element={<AboutPage />} />
        <Route path="/DevenirPres" element="" />
        <Route path="/Contact" element="" />
        <Route path="/serviceFixe" element="" />
        <Route path="/serviceDevis" element="" />
        <Route path="/Seconnecter" element="" />
        <Route path="/CreerCompte" element="" />
        <Route path="/faq-professional" element={<PFAQProfessional />} />
        <Route path="/faq-client" element={<CFAQProfessional />} />
        <Route path="/faq-client/compte" element={<FAQcompte />} />
        <Route path="/faq-client/general" element={<FAQgeneral />} />
        <Route path="/faq-client/paiement" element={<FAQpaiement />} />
        <Route path="/faq-client/service" element={<FAQdemandeService />} />
        <Route path="/faq-client/evaluation" element={<FAQevaluation />} />
        <Route path="/faq-client/absences" element={<FAQabsenceAnnulation />} />
        <Route path="/faq-client/annexes" element={<FAQannexes />} />
        <Route path="/faq-professional/adhesion" element={<FAQadhesion />} />
        <Route path="/faq-professional/post-adhesion" element={<FAQpostAdhesion />} />
        <Route path="/faq-professional/paiement" element={<FAQpaiementP />} />
        <Route path="/faq-professional/notation" element={<FAQnotation />} />
        <Route path="/faq-professional/evaluation" element={<FAQevaluationP />} />
        <Route path="/faq" element={<CentreAide />} />
      </Routes>
      {shouldShowFooter && <Footer />}
    </div>
  );
};

export default AppRoutes;
