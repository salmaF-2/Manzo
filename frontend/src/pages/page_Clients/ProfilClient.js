import React, { useState, useEffect } from "react";
import { FaUser, FaFemale, FaMale, FaEdit } from "react-icons/fa";
import SideBarClient from "./SideBarClient";

const ProfilClient = () => {
  const [userData, setUserData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    ville: "",
    rue: "",
    codePostal: "",
    genre: "femme",
    photo: null
  });

  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Récupérer les données du client
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/auth/client/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setUserData({
            nom: data.nom || '',
            prenom: data.prenom || '',
            email: data.email || '',
            telephone: data.telephone || '',
            ville: data.ville || '',
            rue: data.rue || '',
            codePostal: data.codePostal || '',
            genre: data.genre || 'femme',
            photo: data.photo || null
          });
          if (data.photo) {
            const fullPhotoUrl = data.photo.startsWith('/uploads/') 
              ? `http://localhost:5000${data.photo}`
              : data.photo;
            setPreviewImage(fullPhotoUrl);
          }
        }
      } catch (error) {
        console.error('Erreur lors du chargement du profil:', error);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    return () => {
      if (previewImage && previewImage.startsWith('blob:')) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);
  useEffect(() => {
    if (userData.photo && typeof userData.photo === 'string') {
      const fullUrl = userData.photo.startsWith('/uploads/')
        ? `http://localhost:5000${userData.photo}`
        : userData.photo;
      setPreviewImage(fullUrl);
    }
  }, [userData.photo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    if (previewImage && previewImage.startsWith('blob:')) {
      URL.revokeObjectURL(previewImage);
    }

    if (file) {
      // Verifier le type de fichier
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        alert('Seules les images (JPEG, PNG, GIF, WEBP) sont autorisées');
        return;
      }

      // Verifier la taille du fichier 
      if (file.size > 5 * 1024 * 1024) {
        alert('La taille maximale autorisée est de 5MB');
        return;
      }

      // Créer une URL temporaire pour la prévisualisation
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setUserData(prev => ({ 
        ...prev, 
        photo: file  
      }));
    } else {
      // Si aucun fichier sélectionné réinitialiser
      setPreviewImage(userData.photo || null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      
      formData.append('nom', userData.nom);
      formData.append('prenom', userData.prenom);
      formData.append('telephone', userData.telephone);
      formData.append('ville', userData.ville);
      formData.append('genre', userData.genre);
      formData.append('rue', userData.rue);
      formData.append('codePostal', userData.codePostal);
      
      if (userData.photo && typeof userData.photo !== 'string') {
        formData.append('photo', userData.photo);
      }

      const response = await fetch('http://localhost:5000/api/auth/client/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        setIsEditing(false);
        if (data.user.photo) {
          // hadi kateviter le cache
          const newPhotoUrl = data.user.photo.startsWith('/uploads/') 
          ? `http://localhost:5000${data.user.photo}?t=${Date.now()}`
          : `${data.user.photo}?t=${Date.now()}`;
          setPreviewImage(newPhotoUrl);
          setUserData(prev => ({ ...prev, photo: data.user.photo }));
        }
        setShowSuccessModal(true);
        window.dispatchEvent(new Event('profileUpdated'));
      } else {
        throw new Error('Échec de la mise à jour du profil');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
      alert('Une erreur est survenue lors de la mise à jour du profil');
    }
  };

  // Affichage conditionnel de l'avatar
  const renderAvatar = () => {
    if (previewImage && typeof userData.photo !== 'string') {
      return (
        <img 
          src={previewImage}
          alt="Nouvelle photo de profil" 
          className="w-full h-full object-cover rounded-full"
          onLoad={() => {
            if (previewImage.startsWith('blob:')) {
              URL.revokeObjectURL(previewImage);
            }
          }}
        />
      );
    }

    if (previewImage && typeof userData.photo === 'string') {
      const baseUrl = previewImage.startsWith('/uploads/') 
        ? `http://localhost:5000${previewImage}`
        : previewImage;

      return (
        <img 
          key={`avatar-${Date.now()}`} 
          src={`${baseUrl}?t=${Date.now()}`} 
          alt="Photo de profil actuelle"
          className="w-full h-full object-cover rounded-full"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '';
            setPreviewImage(null);
          }}
        />
      );
    }

    return (
      <div className={`w-full h-full flex items-center justify-center rounded-full ${
        userData.genre === 'homme' 
          ? 'bg-blue-100 text-blue-600' 
          : 'bg-pink-100 text-pink-600'
      }`}>
        {userData.genre === 'homme' ? (
          <FaMale className="text-5xl" />
        ) : (
          <FaFemale className="text-5xl" />
        )}
      </div>
    );
  };

  return (
    <div className="flex bg-gradient-to-br from-[#BCD0EA50] to-indigo-50 min-h-[calc(100vh-5rem)] mt-20">
      <SideBarClient />
      
      <div className="flex-1 ml-60 p-8">
        <div className="bg-white rounded-lg shadow-md p-6 w-full">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Les informations personnelles</h1>
            {!isEditing && (
              <button 
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition flex items-center gap-2"
              >
                <FaEdit /> Modifier profil
              </button>
            )}
          </div>

          {/* Section Avatar agrandie */}
          <div className="flex flex-col items-center mb-8 relative">
            <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden mb-4 border-4 border-white shadow-lg relative">
              {renderAvatar()}
            </div>

            {isEditing && (
              <label className="absolute bottom-[90px] right-[calc(50%-64px)] translate-x-1/2 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 shadow-md">
                <input
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
                <FaEdit />
              </label>
            )}

            <h2 className="text-xl font-semibold text-gray-800">
              {userData.prenom} {userData.nom}
            </h2>
            <p className="text-gray-600">{userData.email}</p>
          </div>


          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <h3 className="font-semibold text-lg border-b pb-2 text-gray-800">Modifier profil</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2">Nom</label>
                    <input
                      type="text"
                      name="nom"
                      value={userData.nom}
                      onChange={handleInputChange}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Prénom</label>
                    <input
                      type="text"
                      name="prenom"
                      value={userData.prenom}
                      onChange={handleInputChange}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={userData.email}
                      className="w-full p-3 border rounded-lg bg-gray-100 cursor-not-allowed"
                      disabled
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Téléphone</label>
                    <input
                      type="tel"
                      name="telephone"
                      value={userData.telephone}
                      onChange={handleInputChange}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2">Ville</label>
                    <input
                      type="text"
                      name="ville"
                      value={userData.ville}
                      onChange={handleInputChange}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Code Postal</label>
                    <input
                      type="text"
                      name="codePostal"
                      value={userData.codePostal}
                      onChange={handleInputChange}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Non renseigné"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2">Adresse</label>
                    <input
                      type="text"
                      name="rue"
                      value={userData.rue}
                      onChange={handleInputChange}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Non renseigné"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Genre</label>
                    <select
                      name="genre"
                      value={userData.genre}
                      onChange={handleInputChange}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="homme">Homme</option>
                      <option value="femme">Femme</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-4 mt-8">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition font-medium"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                  >
                    Enregistrer les modifications
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <h3 className="font-semibold text-lg border-b pb-2 text-gray-800">Informations du profil</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2">Nom</label>
                  <p className="p-3 bg-gray-50 rounded-lg border">{userData.nom}</p>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Prénom</label>
                  <p className="p-3 bg-gray-50 rounded-lg border">{userData.prenom}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2">Email</label>
                  <p className="p-3 bg-gray-50 rounded-lg border">{userData.email}</p>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Téléphone</label>
                  <p className="p-3 bg-gray-50 rounded-lg border">{userData.telephone || "Non renseigné"}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2">Ville</label>
                  <p className="p-3 bg-gray-50 rounded-lg border">{userData.ville || "Non renseigné"}</p>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Code Postal</label>
                  <p className="p-3 bg-gray-50 rounded-lg border">{userData.codePostal || "Non renseigné"}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2">Adresse</label>
                  <p className="p-3 bg-gray-50 rounded-lg border">{userData.rue || "Non renseigné"}</p>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Genre</label>
                  <p className="p-3 bg-gray-50 rounded-lg border">{userData.genre === "femme" ? "Femme" : "Homme"}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modale de succès */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full animate-fade-in">
            <div className="flex justify-center mb-4">
              <svg 
                className="w-12 h-12 text-green-500" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-center text-gray-900 mb-2">
              Succès!
            </h3>
            <p className="text-sm text-gray-500 text-center mb-4">
              Votre profil a été mis à jour avec succès.
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => setShowSuccessModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilClient;













// b
// import React, { useState, useEffect } from "react";
// import { FaUser, FaFemale, FaMale } from "react-icons/fa";
// import SideBarClient from "./SideBarClient";

// const ProfilClient = () => {
//   const [userData, setUserData] = useState({
//     nom: "",
//     prenom: "",
//     email: "",
//     telephone: "",
//     ville: "",
//     rue: "",
//     codePostal: "",
//     genre: "femme",
//     photo: null
//   });

//   const [isEditing, setIsEditing] = useState(false);
//   const [previewImage, setPreviewImage] = useState(null);
//   const [showSuccessModal, setShowSuccessModal] = useState(false);

//   // Récupérer les données du client
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await fetch('http://localhost:5000/api/auth/client/profile', {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
        
//         if (response.ok) {
//           const data = await response.json();
//           setUserData({
//             nom: data.nom || '',
//             prenom: data.prenom || '',
//             email: data.email || '',
//             telephone: data.telephone || '',
//             ville: data.ville || '',
//             rue: data.rue || '',
//             codePostal: data.codePostal || '',
//             genre: data.genre || 'femme',
//             photo: data.photo || null
//           });
//           if (data.photo) {
//             const fullPhotoUrl = data.photo.startsWith('/uploads/') 
//               ? `http://localhost:5000${data.photo}`
//               : data.photo;
//             setPreviewImage(fullPhotoUrl);
//           }
//         }
//       } catch (error) {
//         console.error('Erreur lors du chargement du profil:', error);
//       }
//     };

//     fetchProfile();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUserData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setUserData(prev => ({ ...prev, photo: file })); 
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       const token = localStorage.getItem('token');
//       const formData = new FormData();
      
//       formData.append('nom', userData.nom);
//       formData.append('prenom', userData.prenom);
//       formData.append('telephone', userData.telephone);
//       formData.append('ville', userData.ville);
//       formData.append('genre', userData.genre);
//       formData.append('rue', userData.rue);
//       formData.append('codePostal', userData.codePostal);
      
//       if (userData.photo && typeof userData.photo !== 'string') {
//         formData.append('photo', userData.photo);
//       }

//       const response = await fetch('http://localhost:5000/api/auth/client/profile', {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         },
//         body: formData
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setIsEditing(false);
//         if (data.user.photo) {
//           setPreviewImage(data.user.photo);
//           setUserData(prev => ({ ...prev, photo: data.user.photo }));
//         }
//         setShowSuccessModal(true);
//       } else {
//         throw new Error('Échec de la mise à jour du profil');
//       }
//     } catch (error) {
//       console.error('Erreur lors de la mise à jour du profil:', error);
//       alert('Une erreur est survenue lors de la mise à jour du profil');
//     }
//   };

//   // Affichage conditionnel de l'avatar
//   const renderAvatar = () => {
//     if (previewImage) {
//       return (
//         <img 
//           src={previewImage.startsWith('blob:') || previewImage.startsWith('http') 
//             ? previewImage 
//             : `http://localhost:5000${previewImage}`} 
//           alt="Profil" 
//           className="w-full h-full object-cover" 
//         />
//       );
//     } else {
//       return (
//         <div className={`w-full h-full flex items-center justify-center ${
//           userData.genre === 'homme' ? 'bg-blue-100 text-blue-500' : 'bg-pink-100 text-pink-500'
//         }`}>
//           {userData.genre === 'homme' ? (
//             <FaMale className="text-3xl" />
//           ) : (
//             <FaFemale className="text-3xl" />
//           )}
//         </div>
//       );
//     }
//   };

//   return (
//     <div className="flex bg-gradient-to-br from-[#BCD0EA50] to-indigo-50 min-h-[calc(100vh-5rem)] mt-20">
//       <SideBarClient />
      
//       <div className="flex-1 ml-60 p-8">
//         <div className="bg-white rounded-lg shadow-md p-6 w-full">
//           <div className="flex justify-between items-center mb-6">
//             <h1 className="text-2xl font-bold text-gray-800">Les informations personnelles</h1>
//             {!isEditing && (
//               <button 
//                 onClick={() => setIsEditing(true)}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
//               >
//                 Modifier profil
//               </button>
//             )}
//           </div>

//           <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden mb-6">
//             {renderAvatar()}
//           </div>

//           {isEditing ? (
//             <form onSubmit={handleSubmit}>
//               <div className="space-y-4">
//                 <h3 className="font-semibold text-lg border-b pb-2">Modifier profil</h3>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-gray-700 mb-1">Nom</label>
//                     <input
//                       type="text"
//                       name="nom"
//                       value={userData.nom}
//                       onChange={handleInputChange}
//                       className="w-full p-2 border rounded"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-gray-700 mb-1">Prénom</label>
//                     <input
//                       type="text"
//                       name="prenom"
//                       value={userData.prenom}
//                       onChange={handleInputChange}
//                       className="w-full p-2 border rounded"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-gray-700 mb-1">Email</label>
//                     <input
//                       type="email"
//                       name="email"
//                       value={userData.email}
//                       className="w-full p-2 border rounded"
//                       disabled
//                       readOnly
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-gray-700 mb-1">Téléphone</label>
//                     <input
//                       type="tel"
//                       name="telephone"
//                       value={userData.telephone}
//                       onChange={handleInputChange}
//                       className="w-full p-2 border rounded"
//                     />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-gray-700 mb-1">Ville</label>
//                     <input
//                       type="text"
//                       name="ville"
//                       value={userData.ville}
//                       onChange={handleInputChange}
//                       className="w-full p-2 border rounded"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-gray-700 mb-1">Code Postal</label>
//                     <input
//                       type="text"
//                       name="codePostal"
//                       value={userData.codePostal}
//                       onChange={handleInputChange}
//                       className="w-full p-2 border rounded"
//                       placeholder="Non renseigné"
//                     />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-gray-700 mb-1">Adresse</label>
//                     <input
//                       type="text"
//                       name="rue"
//                       value={userData.rue}
//                       onChange={handleInputChange}
//                       className="w-full p-2 border rounded"
//                       placeholder="Non renseigné"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-gray-700 mb-1">Genre</label>
//                     <select
//                       name="genre"
//                       value={userData.genre}
//                       onChange={handleInputChange}
//                       className="w-full p-2 border rounded"
//                       required
//                     >
//                       <option value="homme">Homme</option>
//                       <option value="femme">Femme</option>
//                     </select>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-gray-700 mb-1">Photo de profil</label>
//                   <input 
//                     type="file" 
//                     onChange={handleImageChange}
//                     accept="image/*"
//                     className="border p-2 rounded w-full"
//                   />
//                 </div>
//               </div>

//               <div className="flex justify-end gap-4 mt-6">
//                 <button
//                   type="button"
//                   onClick={() => setIsEditing(false)}
//                   className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
//                 >
//                   Annuler
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
//                 >
//                   Enregistrer
//                 </button>
//               </div>
//             </form>
//           ) : (
//             <div className="space-y-4">
//               <h3 className="font-semibold text-lg border-b pb-2">Profil</h3>
              
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-gray-700 mb-1">Nom</label>
//                   <p className="p-2 bg-gray-50 rounded">{userData.nom}</p>
//                 </div>
//                 <div>
//                   <label className="block text-gray-700 mb-1">Prénom</label>
//                   <p className="p-2 bg-gray-50 rounded">{userData.prenom}</p>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-gray-700 mb-1">Email</label>
//                   <p className="p-2 bg-gray-50 rounded">{userData.email}</p>
//                 </div>
//                 <div>
//                   <label className="block text-gray-700 mb-1">Téléphone</label>
//                   <p className="p-2 bg-gray-50 rounded">{userData.telephone}</p>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-gray-700 mb-1">Ville</label>
//                   <p className="p-2 bg-gray-50 rounded">{userData.ville}</p>
//                 </div>
//                 <div>
//                   <label className="block text-gray-700 mb-1">Code Postal</label>
//                   <p className="p-2 bg-gray-50 rounded">{userData.codePostal || "Non renseigné"}</p>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-gray-700 mb-1">Adresse</label>
//                   <p className="p-2 bg-gray-50 rounded">{userData.rue || "Non renseigné"}</p>
//                 </div>
//                 <div>
//                   <label className="block text-gray-700 mb-1">Genre</label>
//                   <p className="p-2 bg-gray-50 rounded">{userData.genre === "femme" ? "Femme" : "Homme"}</p>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Modale de succès */}
//       {showSuccessModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 max-w-sm w-full animate-fade-in">
//             <div className="flex justify-center mb-4">
//               <svg 
//                 className="w-12 h-12 text-green-500" 
//                 fill="none" 
//                 stroke="currentColor" 
//                 viewBox="0 0 24 24" 
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path 
//                   strokeLinecap="round" 
//                   strokeLinejoin="round" 
//                   strokeWidth="2" 
//                   d="M5 13l4 4L19 7"
//                 ></path>
//               </svg>
//             </div>
//             <h3 className="text-lg font-medium text-center text-gray-900 mb-2">
//               Succès!
//             </h3>
//             <p className="text-sm text-gray-500 text-center mb-4">
//               Votre profil a été mis à jour avec succès.
//             </p>
//             <div className="flex justify-center">
//               <button
//                 onClick={() => setShowSuccessModal(false)}
//                 className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
//               >
//                 Fermer
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfilClient;