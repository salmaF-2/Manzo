// layouts/ClientLayout.jsx
import HeaderRole from "../components/HeaderRole";
import FooterRole from "../components/FooterRole";

const ClientLayout = ({ children }) => {
  return (
    <>
      <HeaderRole role="client" />
      {children}
      <FooterRole />
    </>
  );
};

export default ClientLayout;