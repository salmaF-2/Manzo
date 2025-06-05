// import React, { useEffect, useState } from 'react';
// import { Phone, Mail, Send, Globe, Clock } from 'lucide-react';
// import { toast } from 'sonner';

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     address: '',
//     city: '',
//     postalCode: '',
//     phone: '',
//     email: '',
//     service: '',
//     message: '',
//   });
  
//   const [privacyConsent, setPrivacyConsent] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!formData.fullName.trim()) newErrors.fullName = 'Le nom est requis';
//     if (!formData.email.trim()) {
//       newErrors.email = 'L\'email est requis';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'L\'email est invalide';
//     }
//     if (!formData.phone.trim()) newErrors.phone = 'Le téléphone est requis';
//      if (!formData.message.trim()) newErrors.message = 'Le message est requis';
//     if (!privacyConsent) newErrors.privacy = 'Vous devez accepter la politique de confidentialité';

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
    
//     // Effacer l'erreur quand l'utilisateur corrige
//     if (errors[name]) {
//       setErrors(prev => {
//         const newErrors = {...prev};
//         delete newErrors[name];
//         return newErrors;
//       });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       return;
//     }

//     setIsSubmitting(true);
//     const toastId = toast.loading('Envoi du message en cours...');
    
//     try {
//       const payload = {
//         fullName: formData.fullName,
//         email: formData.email,
//         phone: formData.phone,
//         message: formData.message,
//         address: formData.address,
//         city: formData.city,
//         postalCode: formData.postalCode,
//         service: formData.service,
//         privacyConsent: privacyConsent
//       };
//       const token = localStorage.getItem('token');
//         const headers = {
//           'Content-Type': 'application/json'
//       };

//         if (token) {
//           headers['Authorization'] = `Bearer ${token}`;
//         }

//       // const response = await fetch('http://localhost:5000/api/contact', {
//       //   method: 'POST',
//       //   headers: {
//       //     'Content-Type': 'application/json',
//       //     ...(localStorage.getItem('token') && {
//       //       'Authorization': `Bearer ${localStorage.getItem('token')}`
//       //     })
//       //   },
//       //   body: JSON.stringify(payload)
//       // });
//       const response = await fetch('http://localhost:5000/api/contact', {
//         method: 'POST',
//         headers: headers,
//         body: JSON.stringify(payload)
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || 'Erreur lors de l\'envoi du message');
//       }

//       toast.success(data.message || 'Message envoyé avec succès!');
      
//       setFormData({
//         fullName: '',
//         address: '',
//         city: '',
//         postalCode: '',
//         phone: '',
//         email: '',
//         service: '',
//         message: '',
//       });
//       setPrivacyConsent(false);
      
//     } catch (error) {
//       console.error('Erreur:', error);
//       toast.error(error.message || 'Une erreur est survenue');
//     } finally {
//       setIsSubmitting(false);
//       toast.dismiss(toastId);
//     }
//   };
  
//   useEffect(() => {
//           window.scrollTo(0, 0);
//       }, []);

//   return (
//     <div className="min-h-[calc(100vh-56px)] bg-white flex flex-col px-4 sm:px-6 lg:px-8 mt-6">
//       <div className="container mx-auto px-4 py-8 flex-grow">
//         <div className="flex flex-col lg:flex-row gap-6 items-center"> {/* Changed items-start to items-center */}
          
//           <div className="w-full lg:w-1/2 space-y-5 lg:pl-24 mt-12 mb-12 lg:pr-12"> {/* Reduced mb-48 to mb-12 */}
//             <div className="space-y-1.5 mb-10">
//               <h1 className="text-5xl font-bold">
//                 Contactez<span className="text-[#5869A3]">-nous</span>
//               </h1>
//               <p className="text-sm text-gray-600 mb-8">
//                 Remplissez et envoyez le formulaire et un membre de notre équipe vous contactera dans les plus brefs délais.
//               </p>
//             </div>
            
//             <form onSubmit={handleSubmit} className="space-y-3.5">
//               <div>
//                 <input
//                   type="text"
//                   name="fullName"
//                   value={formData.fullName}
//                   onChange={handleChange}
//                   required
//                   placeholder="Nom et prénom"
//                   className={`w-full p-2.5 border-b ${errors.fullName ? 'border-red-500' : 'border-gray-300'} text-sm focus:border-blue-500 outline-none`}
//                   // className="w-full p-2.5 border-b border-gray-300 text-sm focus:border-blue-500 outline-none"
//                 />
//                  {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
//               </div>
              
//               <div>
//                 <input
//                   type="text"
//                   name="address"
//                   value={formData.address}
//                   onChange={handleChange}
//                   required
//                   placeholder="Addresse"
//                   className="w-full p-2.5 border-b border-gray-300 text-sm focus:border-blue-500 outline-none"
//                 />
//               </div>
              
//               <div className="grid grid-cols-2 gap-3">
//                 <div>
//                   <input
//                     type="text"
//                     name="city"
//                     value={formData.city}
//                     onChange={handleChange}
//                     required
//                     placeholder="Ville"
//                     className="w-full p-2.5 border-b border-gray-300 text-sm focus:border-blue-500 outline-none"
//                   />
//                 </div>
//                 <div>
//                   <input
//                     type="text"
//                     name="postalCode"
//                     value={formData.postalCode}
//                     onChange={handleChange}
//                     placeholder="Code Postal"
//                     className="w-full p-2.5 border-b border-gray-300 text-sm focus:border-blue-500 outline-none"
//                   />
//                 </div>
//               </div>
              
//               <div>
//                 <input
//                   type="tel"
//                   required
//                   value={formData.phone}
//                   onChange={handleChange}
//                   name="phone"
//                   placeholder="Téléphone"
//                   // className="w-full p-2.5 border-b border-gray-300 text-sm focus:border-blue-500 outline-none"
//                   className={`w-full p-2.5 border-b ${errors.phone ? 'border-red-500' : 'border-gray-300'} text-sm focus:border-blue-500 outline-none`}
//                 />
//                  {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
//               </div>
              
//               <div>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                   placeholder="Email"
//                   // className="w-full p-2.5 border-b border-gray-300 text-sm focus:border-blue-500 outline-none"
//                   className={`w-full p-2.5 border-b ${errors.email ? 'border-red-500' : 'border-gray-300'} text-sm focus:border-blue-500 outline-none`}
//                 />
//                   {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
//               </div>
              
//               <div>
//                 <select
//                   name="service"
//                   value={formData.service}
//                   onChange={handleChange}
//                   className="w-full p-2.5 border-b border-gray-300 text-sm focus:border-blue-500 outline-none bg-white"
//                 >
//                   <option value="" disabled>Service désiré</option>
//                   <option value="consultation">Consultation</option>
//                   <option value="support">Support technique</option>
//                   <option value="partnership">Collaboration</option>
//                   <option value="other">Autre</option>
//                 </select>
//               </div>
              
//               <div>
//                 <textarea
//                   name="message"
//                   value={formData.message}
//                   onChange={handleChange}
//                   placeholder="Votre message"
//                   rows={3}
//                   // className="w-full p-2.5 border border-gray-300 text-sm focus:border-blue-500 outline-none rounded"
//                   className={`w-full p-2.5 border ${errors.message ? 'border-red-500' : 'border-gray-300'} text-sm focus:border-blue-500 outline-none rounded`}
//                 />
//                 {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
//               </div>
              
//               <div className="flex items-start gap-2">
//                 <input
//                   type="checkbox"
//                   id="privacy"
//                   checked={privacyConsent}
//                   onChange={() => setPrivacyConsent(!privacyConsent)}
//                   className="mt-1"
//                 />
//                 <label htmlFor="privacy" className={`text-sm ${errors.privacy ? 'text-red-500' : 'text-gray-600'}`}>
//                 Je souhaite protéger mes données en signant un accord de confidentialité.                </label>
//               </div>
//               {errors.privacy && <p className="mt-1 text-sm text-red-500">{errors.privacy}</p>}
              
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="w-full bg-[#5869A3] hover:bg-[#5869A3]/70 text-white py-3 px-6 rounded transition-colors flex items-center justify-center gap-2"
//               >
//                 {isSubmitting ? (
//                   <span>en cours d'envoi...</span>
//                 ) : (
//                   <>
//                     <span>Envoyer</span>
//                     <Send size={16} />
//                   </>
//                 )}
//               </button>
//             </form>
            
//             <div className="pt-5 border-t border-gray-200 grid grid-cols-2 gap-3">
//               <div className="flex items-center gap-2">
//                 <div className="bg-gray-100 p-1.5 rounded-full">
//                   <Phone size={16} />
//                 </div>
//                 <div>
//                   <p className="text-xs font-medium">TÉLÉPHONE</p>
//                   <p className="text-xs text-[#5869A3]">+212 520 100 004</p>
//                 </div>
//               </div>
              
//               <div className="flex items-center gap-2">
//                 <div className="bg-gray-100 p-1.5 rounded-full">
//                   <Mail size={16} />
//                 </div>
//                 <div>
//                   <p className="text-xs font-medium">E-MAIL</p>
//                   <p className="text-xs text-[#5869A3]">manzoservice6@gmail.com</p>
//                 </div>
//               </div>
              
//               <div className="flex items-center gap-2">
//                 <div className="bg-gray-100 p-1.5 rounded-full">
//                   <Globe size={16} />
//                 </div>
//                 <div>
//                   <p className="text-xs font-medium">SERVICE CLIENT</p>
//                   <p className="text-xs text-[#5869A3]">https://baiduiaix.com</p>
//                 </div>
//               </div>
              
//             </div>
//           </div>
          
//           {/* IMAGE SECTION */}
//           <div className="w-full lg:w-1/2 rounded-lg flex items-center justify-center"> {/* Added flex and centering classes */}
//             <div className="relative">
//               <div className="aspect-[4/3] w-full rounded-lg">
//                 <img src="/images/services/image 12.png" alt="Contact illustration" className="object-cover" />
//               </div>
//               <div className="absolute bottom-[-4rem] right-0 p-3 rounded-tl-lg">
//                 <div className="w-13 h-13">
//                   <img src="/images/services/image 13.png" alt="Decoration" />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contact;


import React, { useEffect, useState } from 'react';
import { Phone, Mail, Send, Globe, Clock } from 'lucide-react';
import { toast } from 'sonner';
import {jwtDecode} from 'jwt-decode'; 

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
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded && decoded.userId) {
          // Option 1: Si l'email est dans le token
          if (decoded.email) {
            setUserEmail(decoded.email);
            setFormData(prev => ({ ...prev, email: decoded.email }));
          } else {
            // Option 2: Sinon, faire une requête pour récupérer l'email
            fetchUserEmail(decoded.userId);
          }
        }
      } catch (error) {
        console.error('Erreur de décodage du token:', error);
      }
    }
  }, []);

  const fetchUserEmail = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/client/profile`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (data.email) {
        setUserEmail(data.email);
        setFormData(prev => ({ ...prev, email: data.email }));
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du profil:', error);
    }
  };

const validateForm = () => {
  const newErrors = {};
  
  if (!formData.fullName.trim()) newErrors.fullName = 'Le nom est requis';
  if (!formData.email.trim()) {
    newErrors.email = 'L\'email est requis';
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = 'L\'email est invalide';
  } else if (userEmail && formData.email !== userEmail) {
    // Modification ici : message personnalisé au lieu de confirm
    newErrors.email = 'Ce n\'est pas votre email de connexion. Veuillez utiliser : ' + userEmail;
  }
  if (!formData.phone.trim()) newErrors.phone = 'Le téléphone est requis';
  if (!formData.message.trim()) newErrors.message = 'Le message est requis';
  if (!privacyConsent) newErrors.privacy = 'Vous devez accepter la politique de confidentialité';

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Effacer l'erreur quand l'utilisateur corrige
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading('Envoi du message en cours...');
    
    try {
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        service: formData.service,
        privacyConsent: privacyConsent
      };
      const token = localStorage.getItem('token');
        const headers = {
          'Content-Type': 'application/json'
      };

        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

      // const response = await fetch('http://localhost:5000/api/contact', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     ...(localStorage.getItem('token') && {
      //       'Authorization': `Bearer ${localStorage.getItem('token')}`
      //     })
      //   },
      //   body: JSON.stringify(payload)
      // });
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de l\'envoi du message');
      }

      toast.success(data.message || 'Message envoyé avec succès!');
      
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
      
    } catch (error) {
      console.error('Erreur:', error);
      toast.error(error.message || 'Une erreur est survenue');
    } finally {
      setIsSubmitting(false);
      toast.dismiss(toastId);
    }
  };
  
  useEffect(() => {
          window.scrollTo(0, 0);
      }, []);

  return (
    <div className="min-h-[calc(100vh-56px)] bg-white flex flex-col px-4 sm:px-6 lg:px-8 mt-6">
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex flex-col lg:flex-row gap-6 items-center"> {/* Changed items-start to items-center */}
          
          <div className="w-full lg:w-1/2 space-y-5 lg:pl-24 mt-12 mb-12 lg:pr-12"> {/* Reduced mb-48 to mb-12 */}
            <div className="space-y-1.5 mb-10">
              <h1 className="text-5xl font-bold">
                Contactez<span className="text-[#5869A3]">-nous</span>
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
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  placeholder="Nom et prénom"
                  className={`w-full p-2.5 border-b ${errors.fullName ? 'border-red-500' : 'border-gray-300'} text-sm focus:border-blue-500 outline-none`}
                  // className="w-full p-2.5 border-b border-gray-300 text-sm focus:border-blue-500 outline-none"
                />
                 {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
              </div>
              
              <div>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
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
                    value={formData.city}
                    onChange={handleChange}
                    required
                    placeholder="Ville"
                    className="w-full p-2.5 border-b border-gray-300 text-sm focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="Code Postal"
                    className="w-full p-2.5 border-b border-gray-300 text-sm focus:border-blue-500 outline-none"
                  />
                </div>
              </div>
              
              <div>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  name="phone"
                  placeholder="Téléphone"
                  // className="w-full p-2.5 border-b border-gray-300 text-sm focus:border-blue-500 outline-none"
                  className={`w-full p-2.5 border-b ${errors.phone ? 'border-red-500' : 'border-gray-300'} text-sm focus:border-blue-500 outline-none`}
                />
                 {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
              </div>
              
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Email"
                  className={`w-full p-2.5 border-b ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } text-sm focus:border-blue-500 outline-none`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.email.includes('Ce n\'est pas votre email') ? (
                      <>
                        <span>{errors.email}</span>
                        <button 
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, email: userEmail }))}
                          className="ml-2 text-blue-600 hover:text-blue-800 underline"
                        >
                          Utiliser mon email de connexion
                        </button>
                      </>
                    ) : (
                      errors.email
                    )}
                  </p>
                )}
              </div>
              
              <div>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
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
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Votre message"
                  rows={3}
                  // className="w-full p-2.5 border border-gray-300 text-sm focus:border-blue-500 outline-none rounded"
                  className={`w-full p-2.5 border ${errors.message ? 'border-red-500' : 'border-gray-300'} text-sm focus:border-blue-500 outline-none rounded`}
                />
                {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
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
                className="w-full bg-[#5869A3] hover:bg-[#5869A3]/70 text-white py-3 px-6 rounded transition-colors flex items-center justify-center gap-2"
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
                  <p className="text-xs text-[#5869A3]">+212 520 100 004</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="bg-gray-100 p-1.5 rounded-full">
                  <Mail size={16} />
                </div>
                <div>
                  <p className="text-xs font-medium">E-MAIL</p>
                  <p className="text-xs text-[#5869A3]">manzoservice6@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="bg-gray-100 p-1.5 rounded-full">
                  <Globe size={16} />
                </div>
                <div>
                  <p className="text-xs font-medium">SERVICE CLIENT</p>
                  <p className="text-xs text-[#5869A3]">https://baiduiaix.com</p>
                </div>
              </div>
              
            </div>
          </div>
          
          {/* IMAGE SECTION */}
          <div className="w-full lg:w-1/2 rounded-lg flex items-center justify-center"> {/* Added flex and centering classes */}
            <div className="relative">
              <div className="aspect-[4/3] w-full rounded-lg">
                <img src="/images/services/image 12.png" alt="Contact illustration" className="object-cover" />
              </div>
              <div className="absolute bottom-[-4rem] right-0 p-3 rounded-tl-lg">
                <div className="w-13 h-13">
                  <img src="/images/services/image 13.png" alt="Decoration" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;