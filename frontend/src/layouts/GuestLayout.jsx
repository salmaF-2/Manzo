// layouts/GuestLayout.jsx
import Header from "../components/Header";
import Footer from "../components/Footer";

const GuestLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default GuestLayout;