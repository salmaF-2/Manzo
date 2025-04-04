import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
    email: "",
    service: "",
    comment: "",
    privacyChecked: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData); // Replace with API call later
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Contactez-nous</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <input name="fullName" type="text" placeholder="Nom et prénom" className="p-2 border rounded" onChange={handleChange} required />
        <input name="address" type="text" placeholder="Adresse" className="p-2 border rounded" onChange={handleChange} required />
        <input name="city" type="text" placeholder="Ville" className="p-2 border rounded" onChange={handleChange} required />
        <input name="postalCode" type="text" placeholder="Code Postal" className="p-2 border rounded" onChange={handleChange} required />
        <input name="phone" type="tel" placeholder="Numéro de téléphone" className="p-2 border rounded" onChange={handleChange} required />
        <input name="email" type="email" placeholder="E-mail" className="p-2 border rounded" onChange={handleChange} required />
        <input name="service" type="text" placeholder="Service désiré" className="p-2 border rounded col-span-2" onChange={handleChange} required />
        <textarea name="comment" placeholder="Ajoutez un commentaire" className="p-2 border rounded col-span-2" onChange={handleChange}></textarea>
        <label className="col-span-2 flex items-center">
          <input type="checkbox" name="privacyChecked" className="mr-2" onChange={handleChange} />
          Je souhaite protéger mes données en signant un accord de confidentialité.
        </label>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded col-span-2">Envoyer</button>
      </form>
    </div>
  );
};

export default Contact;
