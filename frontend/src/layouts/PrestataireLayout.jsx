import HeaderRole from "../components/HeaderRole";
import FooterRole from "../components/FooterRole";

const PrestataireLayout = ({ children }) => {
  return (
    <>
      <HeaderRole role="prestataire" />
      {children}
      <FooterRole />
    </>
  );
};

export default PrestataireLayout;