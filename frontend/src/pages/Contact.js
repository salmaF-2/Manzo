import React, { useState } from 'react';
import { Phone, Mail, Send, Globe, Clock } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  });
  
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!privacyConsent) newErrors.privacy = 'You must accept the privacy policy';

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        toast.success('Your message has been sent! We will contact you shortly.');
        setFormData({
          fullName: '',
          address: '',
          city: '',
          postalCode: '',
          phone: '',
          email: '',
          service: '',
          message: '',
        });
        setPrivacyConsent(false);
        setIsSubmitting(false);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          
          <div className="w-full lg:w-1/2 space-y-5 pl-24 mt-12 mb-48 pr-12">
            <div className="space-y-1.5 mb-10">
              <h1 className="text-5xl font-bold ">
                Contactez<span className="text-blue-500">-nous</span>
              </h1>
              <p className="text-sm text-gray-600 mb-8">
                Remplissez et envoyez le formulaire et un membre de notre équipe vous contactera dans les plus brefs délais.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="Nom et prénom"
                  className="w-full p-2.5 border-b border-gray-300 text-sm focus:border-blue-500 outline-none"
                />
              </div>
              
              <div>
                <input
                  type="text"
                  name="address"
                  required
                  placeholder="Addresse"
                  className="w-full p-2.5 border-b border-gray-300 text-sm focus:border-blue-500 outline-none"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <input
                    type="text"
                    name="city"
                    required
                    placeholder="Ville"
                    className="w-full p-2.5 border-b border-gray-300 text-sm focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="postalCode"
                    placeholder="Code Postal"
                    className="w-full p-2.5 border-b border-gray-300 text-sm focus:border-blue-500 outline-none"
                  />
                </div>
              </div>
              
              <div>
                <input
                  type="tel"
                  required
                  name="phone"
                  placeholder="Téléphone"
                  className="w-full p-2.5 border-b border-gray-300 text-sm focus:border-blue-500 outline-none"
                />
              </div>
              
              <div>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email"
                  className="w-full p-2.5 border-b border-gray-300 text-sm focus:border-blue-500 outline-none"
                />
              </div>
              
              <div>
                <select
                  name="service"
                  className="w-full p-2.5 border-b border-gray-300 text-sm focus:border-blue-500 outline-none bg-white"
                >
                  <option value="" disabled>Service désiré</option>
                  <option value="consultation">Consultation</option>
                  <option value="support">Support technique</option>
                  <option value="partnership">Collaboration</option>
                  <option value="other">Autre</option>
                </select>
              </div>
              
              <div>
                <textarea
                  name="message"
                  placeholder="Votre message"
                  rows={3}
                  className="w-full p-2.5 border border-gray-300 text-sm focus:border-blue-500 outline-none rounded"
                />
              </div>
              
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="privacy"
                  checked={privacyConsent}
                  onChange={() => setPrivacyConsent(!privacyConsent)}
                  className="mt-1"
                />
                <label htmlFor="privacy" className={`text-sm ${errors.privacy ? 'text-red-500' : 'text-gray-600'}`}>
                Je souhaite protéger mes données en signant un accord de confidentialité.                </label>
              </div>
              {errors.privacy && <p className="mt-1 text-sm text-red-500">{errors.privacy}</p>}
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded transition-colors flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>en cours d'envoi...</span>
                ) : (
                  <>
                    <span>Envoyer</span>
                    <Send size={16} />
                  </>
                )}
              </button>
            </form>
            
            <div className="pt-5 border-t border-gray-200 grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2">
                <div className="bg-gray-100 p-1.5 rounded-full">
                  <Phone size={16} />
                </div>
                <div>
                  <p className="text-xs font-medium">TÉLÉPHONE</p>
                  <p className="text-xs text-gray-600">+212 520 100 004</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="bg-gray-100 p-1.5 rounded-full">
                  <Mail size={16} />
                </div>
                <div>
                  <p className="text-xs font-medium">E-MAIL</p>
                  <p className="text-xs text-blue-500">@MAUZCO</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="bg-gray-100 p-1.5 rounded-full">
                  <Globe size={16} />
                </div>
                <div>
                  <p className="text-xs font-medium">SERVICE CLIENT</p>
                  <p className="text-xs text-blue-500">https://baiduiaix.com</p>
                </div>
              </div>
              
            </div>
          </div>
          
          {/* IMAGE SECTION */}
          <div className="w-full lg:w-1/2 rounded-lg relative mt-20">
            <div className="aspect-[4/3] w-full rounded-lg ">
                <img src="/images/image 12.png"></img>
            </div>
            <div className="absolute bottom-0 right-0  p-3 rounded-tl-lg">
              <div className="w-13 h-13">
              <img src="/images/image 13.png"></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
);
};

export default Contact;