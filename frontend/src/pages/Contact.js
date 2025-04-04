import ContactForm from "../components/ContactForm";
import bhDbPay from "../assets/images/bh-db-pay.jpg"; // ✅ Adjust the path based on where your image is

const ContactPage = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg flex items-center">
      {/* Left Side - Contact Form */}
      <div className="w-1/2 p-6">
        <ContactForm />
      </div>

      {/* Right Side - Image Section */}
      <div className="w-1/2 flex justify-center items-center">
        <img src={bhDbPay} alt="Contact Support" className="w-full h-auto rounded-lg shadow-md" />
      </div>
    </div>
  );
};

export default ContactPage;
