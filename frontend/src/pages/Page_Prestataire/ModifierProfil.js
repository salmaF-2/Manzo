import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import SideBar from "./SideBar";
import { motion } from "framer-motion";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ModifierProfil = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        ville: '',
        description: '',
        adresse: '',
        prestataireInfo: {
            secteurActivite: '',
            localisation: '',
            documents: {
                photoProfil: null
            },
            disponibilites: []
        },
        socialLinks: {
            linkedin: '',
            instagram: '',
            facebook: '',
            tiktok: ''
        }
    });
    const [loading, setLoading] = useState(true);
    const [cities, setCities] = useState([]);
    
    const location = useLocation();
    const from = location.state?.from || '/ProfilPrestataire';

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchPrestataireProfile();
    }, []);

    const fetchPrestataireProfile = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/auth/prestataire/profile', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        // Assurez-vous que toutes les propriétés sont bien définies
        console.log('Données complètes reçues:', response.data);
        const data = response.data;
        setUserData({
            ...data,
            prestataireInfo: {
                // ajoter
                experience: response.data.prestataireInfo?.experience || '',
                secteurActivite: data.prestataireInfo?.secteurActivite || '',
                localisation: data.prestataireInfo?.localisation || '',
                documents: {
                    photoProfil: data.prestataireInfo?.documents?.photoProfil || null,
                    ...data.prestataireInfo?.documents
                },
                disponibilites: data.prestataireInfo?.disponibilites || []
            },
            socialLinks: {
                linkedin: data.socialLinks?.linkedin || '',
                instagram: data.socialLinks?.instagram || '',
                facebook: data.socialLinks?.facebook || '',
                tiktok: data.socialLinks?.tiktok || ''
            }
        });
        setLoading(false);
    } catch (error) {
        console.error('Erreur:', error);
        toast.error('Erreur de chargement du profil');
        setLoading(false);
    }
};
useEffect(() => {
    const fetchCities = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/auth/cities');
            setCities(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des villes:', error);
            toast.error('Erreur de chargement des villes');
        }
    };
    
    fetchCities();
}, []);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSocialLinkChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            socialLinks: {
                ...prev.socialLinks,
                [name]: value
            }
        }));
    };

    const handlePrestataireInfoChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            prestataireInfo: {
                ...prev.prestataireInfo,
                [name]: value
            }
        }));
    };

    const handleDisponibiliteChange = (index, field, value) => {
        setUserData(prev => {
            const newDisponibilites = [...prev.prestataireInfo.disponibilites];
            if (!newDisponibilites[index]) {
                newDisponibilites[index] = { jour: '', heures: [] };
            }
            
            if (field === 'jour') {
                newDisponibilites[index].jour = value;
            } else if (field === 'heures') {
                newDisponibilites[index].heures = [value];
            }
            
            return {
                ...prev,
                prestataireInfo: {
                    ...prev.prestataireInfo,
                    disponibilites: newDisponibilites
                }
            };
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const formData = new FormData();
            
            // Ajoutez tous les champs texte
            formData.append('nom', userData.nom);
            formData.append('prenom', userData.prenom);
            formData.append('email', userData.email);
            formData.append('telephone', userData.telephone);
            formData.append('ville', userData.ville);
            formData.append('description', userData.description);
            formData.append('adresse', userData.adresse);
            
            // Infos prestataire
            formData.append('experience', userData.prestataireInfo.experience || '');
            formData.append('secteurActivite', userData.prestataireInfo.secteurActivite || '');
            formData.append('prestataireInfo[localisation]', userData.prestataireInfo.localisation || '');
            
            // Liens sociaux - IMPORTANT: utilisez cette syntaxe
            formData.append('socialLinks[linkedin]', userData.socialLinks.linkedin || '');
            formData.append('socialLinks[instagram]', userData.socialLinks.instagram || '');
            formData.append('socialLinks[facebook]', userData.socialLinks.facebook || '');
            formData.append('socialLinks[tiktok]', userData.socialLinks.tiktok || '');


            formData.append('disponibilites', JSON.stringify(userData.prestataireInfo.disponibilites));

            const response = await axios.put(
                'http://localhost:5000/api/auth/prestataire/profile',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            window.dispatchEvent(new Event('profileUpdated'));
            toast.success('Profil mis à jour avec succès!');
            navigate(from);
        } catch (error) {
            console.error('Erreur:', error);
            toast.error(error.response?.data?.message || 'Échec de la mise à jour');
        }
    };
    if (loading) {
        return (
            <div className="flex bg-gradient-to-br from-[#BCD0EA50] to-indigo-50 min-h-[calc(100vh-5rem)] mt-20">
                <SideBar />
                <div className="flex-1 ml-60 p-6 mt-4 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            </div>
        );
    }
   const handlePhotoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            toast.error('La taille du fichier ne doit pas dépasser 5MB');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const formData = new FormData();
            formData.append('photoProfil', file);
            
            const response = await axios.put(
                'http://localhost:5000/api/auth/prestataire/profile',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            // Mise à jour de l'état local avec la nouvelle photo
            setUserData(prev => ({
                ...prev,
                prestataireInfo: {
                    ...prev.prestataireInfo,
                    documents: {
                        ...prev.prestataireInfo.documents,
                        photoProfil: response.data.user.prestataireInfo.documents.photoProfil
                    }
                }
            }));

            toast.success('Photo de profil mise à jour avec succès!');
        } catch (error) {
            console.error('Erreur:', error);
            toast.error(error.response?.data?.message || 'Échec de la mise à jour');
        }
    };

    return (
        <div className="flex bg-gradient-to-br from-[#BCD0EA50] to-indigo-50 min-h-[calc(100vh-5rem)] mt-20">
            <SideBar />
            
            <div className="flex-1 ml-60 p-6 mt-4">
                {/* Bouton de retour */}
                <Link to={from} 
                    className="flex items-center text-blue-600 mb-4 hover:text-blue-800 transition-colors">
                    <FaArrowLeft className="mr-2" />
                    Retour au profil
                </Link>

                {/* titre */}
                <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="text-3xl font-bold mb-8 text-gray-800">
                    Modifier le profil
                </motion.h1>
                
                {/* Partie 1 => formulaire de modification */}
                <form onSubmit={handleSubmit}>
                    <div className="bg-white rounded-2xl shadow p-6">
                        <h2 className="text-xl font-semibold mb-6">Informations personnelles</h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                            {/* Photo de profil */}
                            <div className="flex flex-col items-center">
                                <div className="relative">
                                    <img 
                                        src={userData.prestataireInfo?.documents?.photoProfil ? 
                                            `http://localhost:5000${userData.prestataireInfo.documents.photoProfil}` : 
                                            "https://randomuser.me/api/portraits/women/21.jpg"}  
                                        alt="Profile" 
                                        className="w-56 h-56 rounded-full object-cover mb-4"
                                    />
                                    <input 
                                        id="photoProfilInput" 
                                        type="file" 
                                        accept="image/*" 
                                        className="hidden" 
                                        onChange={handlePhotoUpload}
                                    />
                                </div>
                                <label 
                                    htmlFor="photoProfilInput" 
                                    className="flex items-center justify-center gap-2 px-4 py-2 mt-2 border rounded-lg hover:bg-gray-100 text-sm cursor-pointer"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553 4.553a1.25 1.25 0 01-1.768 1.768L13 12l-1 1m-6 4V5a2 2 0 012-2h7a2 2 0 012 2v6m-2 0l-4 4m0 0l-4-4" />
                                    </svg>
                                    Changer la photo
                                </label>
                            </div>
                            {/* Champs texte */}
                            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Prénom</label>
                                    <input 
                                        type="text" 
                                        name="prenom"
                                        value={userData.prenom}
                                        onChange={handleInputChange}
                                        className="border rounded-lg w-full p-2"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Nom</label>
                                    <input 
                                        type="text" 
                                        name="nom"
                                        value={userData.nom}
                                        onChange={handleInputChange}
                                        className="border rounded-lg w-full p-2"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium mb-1">Secteur d'activité</label>
                                    <input 
                                        type="text" 
                                        name="secteurActivite"
                                        value={userData.prestataireInfo?.secteurActivite || ''}
                                        onChange={(e) => handlePrestataireInfoChange(e)}
                                        className="border rounded-lg w-full p-2"
                                    />
                                </div>

                                {/* <div className="md:col-span-2">
                                    <label className="block text-sm font-medium mb-1">Localisation</label>
                                    <input 
                                        type="text" 
                                        name="localisation"
                                        value={userData.prestataireInfo.localisation || ''}
                                        onChange={handlePrestataireInfoChange}
                                        className="border rounded-lg w-full p-2"
                                    />
                                </div> */}

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium mb-1">Expérience</label>
                                    <select 
                                        name="experience"
                                        value={userData.prestataireInfo?.experience || ''}
                                        onChange={(e) => handlePrestataireInfoChange(e)}
                                        className="border rounded-lg w-full p-2"
                                    >
                                        <option value="">Sélectionnez une option</option>
                                        <option value="0-1">0-1 an</option>
                                        <option value="1-3">1-3 ans</option>
                                        <option value="3-5">3-5 ans</option>
                                        <option value="5+">5+ ans</option>
                                    </select>
                                </div>

                                {/* Réseaux sociaux */}
                                <div>
                                    <label className="block text-sm font-medium mb-1">LinkedIn</label>
                                    <div className="flex items-center border rounded-lg p-2">
                                        <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" className="h-5 w-5 mr-2" />
                                        <input 
                                            type="text" 
                                            name="linkedin"
                                            value={userData.socialLinks.linkedin || ''}
                                            onChange={handleSocialLinkChange}
                                            placeholder="URL LinkedIn" 
                                            className="w-full outline-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Instagram</label>
                                    <div className="flex items-center border rounded-lg p-2">
                                        <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" className="h-5 w-5 mr-2" />
                                        <input 
                                            type="text" 
                                            name="instagram"
                                            value={userData.socialLinks.instagram || ''}
                                            onChange={handleSocialLinkChange}
                                            placeholder="URL Instagram" 
                                            className="w-full outline-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Facebook</label>
                                    <div className="flex items-center border rounded-lg p-2">
                                        <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" className="h-5 w-5 mr-2" />
                                        <input 
                                            type="text" 
                                            name="facebook"
                                            value={userData.socialLinks.facebook || ''}
                                            onChange={handleSocialLinkChange}
                                            placeholder="URL Facebook" 
                                            className="w-full outline-none"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Tiktok</label>
                                    <div className="flex items-center border rounded-lg p-2">
                                        <img src="https://cdn-icons-png.flaticon.com/512/3046/3046125.png" alt="Tiktok" className="h-5 w-5 mr-2" />
                                        <input 
                                            type="text" 
                                            name="tiktok"
                                            value={userData.socialLinks.tiktok || ''}
                                            onChange={handleSocialLinkChange}
                                            placeholder="URL Tiktok" 
                                            className="w-full outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Partie 2*/}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                        <div className="lg:col-span-2 space-y-6">
                            {/* À propos */}
                            <div className="bg-white rounded-2xl shadow p-6">
                                <h2 className="text-xl font-semibold mb-4">À propos</h2>
                                <textarea
                                    name="description"
                                    value={userData.description}
                                    onChange={handleInputChange}
                                    placeholder="Décrivez votre expérience et vos compétences..."
                                    className="border rounded-lg w-full p-4 h-40 resize-none"
                                ></textarea>
                            </div>
                        </div>

                        {/* Colonne droite : Localisation */}
                        <div className="bg-white rounded-2xl shadow p-6">
                            <h2 className="text-xl font-semibold mb-4">Localisation</h2>

                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Adresse</label>
                                <input 
                                    type="text" 
                                    name="adresse"
                                    value={userData.adresse}
                                    onChange={handleInputChange}
                                    placeholder="Votre adresse" 
                                    className="border rounded-lg w-full p-2" 
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Ville</label>
                                <select 
                                    name="ville"
                                    value={userData.ville}
                                    onChange={handleInputChange}
                                    className="border rounded-lg w-full p-2"
                                >
                                    <option value="">Sélectionnez une ville</option>
                                    {cities.map((city) => (
                                        <option key={city._id} value={city.name}>
                                            {city.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Partie 3 => Services à prix fixe */}
                    <div className="space-y-6 mt-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Disponibilité */}
                            <div className="bg-white rounded-2xl shadow p-6">
                                <h2 className="text-xl font-semibold mb-4">Disponibilité</h2>
                                <div className="space-y-4 mt-4">
                                    {userData.prestataireInfo.disponibilites.map((dispo, index) => (
                                        <div className="flex flex-col md:flex-row gap-2 items-center" key={index}>
                                            <select
                                                className="border rounded-lg p-2 w-full md:w-40"
                                                value={dispo.jour || ''}
                                                onChange={(e) => handleDisponibiliteChange(index, 'jour', e.target.value)}
                                            >
                                                <option value="">--Jour--</option>
                                                <option value="Lundi">Lundi</option>
                                                <option value="Mardi">Mardi</option>
                                                <option value="Mercredi">Mercredi</option>
                                                <option value="Jeudi">Jeudi</option>
                                                <option value="Vendredi">Vendredi</option>
                                                <option value="Samedi">Samedi</option>
                                                <option value="Dimanche">Dimanche</option>
                                            </select>
                                            
                                            <div className="flex items-center gap-2 w-full md:w-auto">
                                                <input
                                                    type="time"
                                                    className="border rounded-lg p-2 w-full"
                                                    value={dispo.heures?.[0]?.split('-')[0] || ''}
                                                    onChange={(e) => handleDisponibiliteChange(index, 'heures', `${e.target.value}-${dispo.heures?.[0]?.split('-')[1] || ''}`)}
                                                />
                                                <span>-</span>
                                                <input
                                                    type="time"
                                                    className="border rounded-lg p-2 w-full"
                                                    value={dispo.heures?.[0]?.split('-')[1] || ''}
                                                    onChange={(e) => handleDisponibiliteChange(index, 'heures', `${dispo.heures?.[0]?.split('-')[0] || ''}-${e.target.value}`)}
                                                />
                                            </div>
                                            
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newDisponibilites = [...userData.prestataireInfo.disponibilites];
                                                    newDisponibilites.splice(index, 1);
                                                    setUserData(prev => ({
                                                        ...prev,
                                                        prestataireInfo: {
                                                            ...prev.prestataireInfo,
                                                            disponibilites: newDisponibilites
                                                        }
                                                    }));
                                                }}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                Supprimer
                                            </button>
                                        </div>
                                    ))}
                                    
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setUserData(prev => ({
                                                ...prev,
                                                prestataireInfo: {
                                                    ...prev.prestataireInfo,
                                                    disponibilites: [...prev.prestataireInfo.disponibilites, { jour: '', heures: ['', ''] }]
                                                }
                                            }));
                                        }}
                                        className="text-blue-600 hover:text-blue-800 text-sm"
                                    >
                                        + Ajouter une disponibilité
                                    </button>
                                </div>
                            </div>


                            {/* Contact */}
                            <div className="bg-white rounded-2xl shadow p-6">
                                <h2 className="text-xl font-semibold mb-4">Contact</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Téléphone</label>
                                        <input 
                                            type="text" 
                                            name="telephone"
                                            value={userData.telephone}
                                            onChange={handleInputChange}
                                            placeholder="+33 6 12 34 56 78" 
                                            className="border rounded-lg w-full p-2" 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Email</label>
                                        <input 
                                            type="email" 
                                            name="email"
                                            value={userData.email}
                                            onChange={handleInputChange}
                                            placeholder="email@example.com" 
                                            className="border rounded-lg w-full p-2" 
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Adresse</label>
                                        <input 
                                            type="text" 
                                            name="adresse"
                                            value={userData.adresse}
                                            onChange={handleInputChange}
                                            placeholder="Votre adresse" 
                                            className="border rounded-lg w-full p-2" 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Boutons en bas */}
                        <div className="flex justify-end gap-4 mt-6">
                            <Link to={from} className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100">
                                Annuler
                            </Link>
                            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
                                Enregistrer
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModifierProfil;






// version avant disponibilite
// import React, { useEffect, useState } from "react";
// import { FaArrowLeft } from "react-icons/fa";
// import { Link, useLocation } from "react-router-dom";
// import SideBar from "./SideBar";
// import { motion } from "framer-motion";
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';

// const ModifierProfil = () => {
//     const navigate = useNavigate();
//     const [userData, setUserData] = useState({
//         nom: '',
//         prenom: '',
//         email: '',
//         telephone: '',
//         ville: '',
//         description: '',
//         adresse: '',
//         prestataireInfo: {
//             secteurActivite: '',
//             localisation: '',
//             documents: {
//                 photoProfil: null
//             },
//             disponibilites: []
//         },
//         socialLinks: {
//             linkedin: '',
//             instagram: '',
//             facebook: '',
//             tiktok: ''
//         }
//     });
//     const [loading, setLoading] = useState(true);
//     const [cities, setCities] = useState([]);
    
//     const location = useLocation();
//     const from = location.state?.from || '/ProfilPrestataire';

//     useEffect(() => {
//         window.scrollTo(0, 0);
//         fetchPrestataireProfile();
//     }, []);

//     const fetchPrestataireProfile = async () => {
//     try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get('http://localhost:5000/api/auth/prestataire/profile', {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         });
        
//         // Assurez-vous que toutes les propriétés sont bien définies
//         console.log('Données complètes reçues:', response.data);
//         const data = response.data;
//         setUserData({
//             ...data,
//             prestataireInfo: {
//                 // ajoter
//                 experience: response.data.prestataireInfo?.experience || '',
//                 secteurActivite: data.prestataireInfo?.secteurActivite || '',
//                 localisation: data.prestataireInfo?.localisation || '',
//                 documents: {
//                     photoProfil: data.prestataireInfo?.documents?.photoProfil || null,
//                     ...data.prestataireInfo?.documents
//                 },
//                 disponibilites: data.prestataireInfo?.disponibilites || []
//             },
//             socialLinks: {
//                 linkedin: data.socialLinks?.linkedin || '',
//                 instagram: data.socialLinks?.instagram || '',
//                 facebook: data.socialLinks?.facebook || '',
//                 tiktok: data.socialLinks?.tiktok || ''
//             }
//         });
//         setLoading(false);
//     } catch (error) {
//         console.error('Erreur:', error);
//         toast.error('Erreur de chargement du profil');
//         setLoading(false);
//     }
// };
// useEffect(() => {
//     const fetchCities = async () => {
//         try {
//             const response = await axios.get('http://localhost:5000/api/auth/cities');
//             setCities(response.data);
//         } catch (error) {
//             console.error('Erreur lors de la récupération des villes:', error);
//             toast.error('Erreur de chargement des villes');
//         }
//     };
    
//     fetchCities();
// }, []);
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setUserData(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const handleSocialLinkChange = (e) => {
//         const { name, value } = e.target;
//         setUserData(prev => ({
//             ...prev,
//             socialLinks: {
//                 ...prev.socialLinks,
//                 [name]: value
//             }
//         }));
//     };

//     const handlePrestataireInfoChange = (e) => {
//         const { name, value } = e.target;
//         setUserData(prev => ({
//             ...prev,
//             prestataireInfo: {
//                 ...prev.prestataireInfo,
//                 [name]: value
//             }
//         }));
//     };

//     const handleDisponibiliteChange = (index, field, value) => {
//         setUserData(prev => {
//             const newDisponibilites = [...prev.prestataireInfo.disponibilites];
//             if (!newDisponibilites[index]) {
//                 newDisponibilites[index] = { jour: '', heures: [] };
//             }
            
//             if (field === 'jour') {
//                 newDisponibilites[index].jour = value;
//             } else if (field === 'heures') {
//                 newDisponibilites[index].heures = [value];
//             }
            
//             return {
//                 ...prev,
//                 prestataireInfo: {
//                     ...prev.prestataireInfo,
//                     disponibilites: newDisponibilites
//                 }
//             };
//         });
//     };
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const token = localStorage.getItem('token');
//             const formData = new FormData();
            
//             // Ajoutez tous les champs texte
//             formData.append('nom', userData.nom);
//             formData.append('prenom', userData.prenom);
//             formData.append('email', userData.email);
//             formData.append('telephone', userData.telephone);
//             formData.append('ville', userData.ville);
//             formData.append('description', userData.description);
//             formData.append('adresse', userData.adresse);
            
//             // Infos prestataire
//             formData.append('experience', userData.prestataireInfo.experience || '');
//             formData.append('secteurActivite', userData.prestataireInfo.secteurActivite || '');
//             formData.append('prestataireInfo[localisation]', userData.prestataireInfo.localisation || '');
            
//             // Liens sociaux - IMPORTANT: utilisez cette syntaxe
//             formData.append('socialLinks[linkedin]', userData.socialLinks.linkedin || '');
//             formData.append('socialLinks[instagram]', userData.socialLinks.instagram || '');
//             formData.append('socialLinks[facebook]', userData.socialLinks.facebook || '');
//             formData.append('socialLinks[tiktok]', userData.socialLinks.tiktok || '');

//             const response = await axios.put(
//                 'http://localhost:5000/api/auth/prestataire/profile',
//                 formData,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                         'Content-Type': 'multipart/form-data'
//                     }
//                 }
//             );
//             window.dispatchEvent(new Event('profileUpdated'));
//             toast.success('Profil mis à jour avec succès!');
//             navigate(from);
//         } catch (error) {
//             console.error('Erreur:', error);
//             toast.error(error.response?.data?.message || 'Échec de la mise à jour');
//         }
//     };
//     if (loading) {
//         return (
//             <div className="flex bg-gradient-to-br from-[#BCD0EA50] to-indigo-50 min-h-[calc(100vh-5rem)] mt-20">
//                 <SideBar />
//                 <div className="flex-1 ml-60 p-6 mt-4 flex items-center justify-center">
//                     <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//                 </div>
//             </div>
//         );
//     }
//    const handlePhotoUpload = async (e) => {
//         const file = e.target.files[0];
//         if (!file) return;

//         if (file.size > 5 * 1024 * 1024) {
//             toast.error('La taille du fichier ne doit pas dépasser 5MB');
//             return;
//         }

//         try {
//             const token = localStorage.getItem('token');
//             const formData = new FormData();
//             formData.append('photoProfil', file);
            
//             const response = await axios.put(
//                 'http://localhost:5000/api/auth/prestataire/profile',
//                 formData,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                         'Content-Type': 'multipart/form-data'
//                     }
//                 }
//             );

//             // Mise à jour de l'état local avec la nouvelle photo
//             setUserData(prev => ({
//                 ...prev,
//                 prestataireInfo: {
//                     ...prev.prestataireInfo,
//                     documents: {
//                         ...prev.prestataireInfo.documents,
//                         photoProfil: response.data.user.prestataireInfo.documents.photoProfil
//                     }
//                 }
//             }));

//             toast.success('Photo de profil mise à jour avec succès!');
//         } catch (error) {
//             console.error('Erreur:', error);
//             toast.error(error.response?.data?.message || 'Échec de la mise à jour');
//         }
//     };

//     return (
//         <div className="flex bg-gradient-to-br from-[#BCD0EA50] to-indigo-50 min-h-[calc(100vh-5rem)] mt-20">
//             <SideBar />
            
//             <div className="flex-1 ml-60 p-6 mt-4">
//                 {/* Bouton de retour */}
//                 <Link to={from} 
//                     className="flex items-center text-blue-600 mb-4 hover:text-blue-800 transition-colors">
//                     <FaArrowLeft className="mr-2" />
//                     Retour au profil
//                 </Link>

//                 {/* titre */}
//                 <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="text-3xl font-bold mb-8 text-gray-800">
//                     Modifier le profil
//                 </motion.h1>
                
//                 {/* Partie 1 => formulaire de modification */}
//                 <form onSubmit={handleSubmit}>
//                     <div className="bg-white rounded-2xl shadow p-6">
//                         <h2 className="text-xl font-semibold mb-6">Informations personnelles</h2>

//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
//                             {/* Photo de profil */}
//                             <div className="flex flex-col items-center">
//                                 <div className="relative">
//                                     <img 
//                                         src={userData.prestataireInfo?.documents?.photoProfil ? 
//                                             `http://localhost:5000${userData.prestataireInfo.documents.photoProfil}` : 
//                                             "https://randomuser.me/api/portraits/women/21.jpg"}  
//                                         alt="Profile" 
//                                         className="w-56 h-56 rounded-full object-cover mb-4"
//                                     />
//                                     <input 
//                                         id="photoProfilInput" 
//                                         type="file" 
//                                         accept="image/*" 
//                                         className="hidden" 
//                                         onChange={handlePhotoUpload}
//                                     />
//                                 </div>
//                                 <label 
//                                     htmlFor="photoProfilInput" 
//                                     className="flex items-center justify-center gap-2 px-4 py-2 mt-2 border rounded-lg hover:bg-gray-100 text-sm cursor-pointer"
//                                 >
//                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553 4.553a1.25 1.25 0 01-1.768 1.768L13 12l-1 1m-6 4V5a2 2 0 012-2h7a2 2 0 012 2v6m-2 0l-4 4m0 0l-4-4" />
//                                     </svg>
//                                     Changer la photo
//                                 </label>
//                             </div>
//                             {/* Champs texte */}
//                             <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
//                                 <div>
//                                     <label className="block text-sm font-medium mb-1">Prénom</label>
//                                     <input 
//                                         type="text" 
//                                         name="prenom"
//                                         value={userData.prenom}
//                                         onChange={handleInputChange}
//                                         className="border rounded-lg w-full p-2"
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm font-medium mb-1">Nom</label>
//                                     <input 
//                                         type="text" 
//                                         name="nom"
//                                         value={userData.nom}
//                                         onChange={handleInputChange}
//                                         className="border rounded-lg w-full p-2"
//                                     />
//                                 </div>

//                                 <div className="md:col-span-2">
//                                     <label className="block text-sm font-medium mb-1">Secteur d'activité</label>
//                                     <input 
//                                         type="text" 
//                                         name="secteurActivite"
//                                         value={userData.prestataireInfo?.secteurActivite || ''}
//                                         onChange={(e) => handlePrestataireInfoChange(e)}
//                                         className="border rounded-lg w-full p-2"
//                                     />
//                                 </div>

//                                 {/* <div className="md:col-span-2">
//                                     <label className="block text-sm font-medium mb-1">Localisation</label>
//                                     <input 
//                                         type="text" 
//                                         name="localisation"
//                                         value={userData.prestataireInfo.localisation || ''}
//                                         onChange={handlePrestataireInfoChange}
//                                         className="border rounded-lg w-full p-2"
//                                     />
//                                 </div> */}

//                                 <div className="md:col-span-2">
//                                     <label className="block text-sm font-medium mb-1">Expérience</label>
//                                     <select 
//                                         name="experience"
//                                         value={userData.prestataireInfo?.experience || ''}
//                                         onChange={(e) => handlePrestataireInfoChange(e)}
//                                         className="border rounded-lg w-full p-2"
//                                     >
//                                         <option value="">Sélectionnez une option</option>
//                                         <option value="0-1">0-1 an</option>
//                                         <option value="1-3">1-3 ans</option>
//                                         <option value="3-5">3-5 ans</option>
//                                         <option value="5+">5+ ans</option>
//                                     </select>
//                                 </div>

//                                 {/* Réseaux sociaux */}
//                                 <div>
//                                     <label className="block text-sm font-medium mb-1">LinkedIn</label>
//                                     <div className="flex items-center border rounded-lg p-2">
//                                         <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" className="h-5 w-5 mr-2" />
//                                         <input 
//                                             type="text" 
//                                             name="linkedin"
//                                             value={userData.socialLinks.linkedin || ''}
//                                             onChange={handleSocialLinkChange}
//                                             placeholder="URL LinkedIn" 
//                                             className="w-full outline-none"
//                                         />
//                                     </div>
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm font-medium mb-1">Instagram</label>
//                                     <div className="flex items-center border rounded-lg p-2">
//                                         <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" className="h-5 w-5 mr-2" />
//                                         <input 
//                                             type="text" 
//                                             name="instagram"
//                                             value={userData.socialLinks.instagram || ''}
//                                             onChange={handleSocialLinkChange}
//                                             placeholder="URL Instagram" 
//                                             className="w-full outline-none"
//                                         />
//                                     </div>
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm font-medium mb-1">Facebook</label>
//                                     <div className="flex items-center border rounded-lg p-2">
//                                         <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" className="h-5 w-5 mr-2" />
//                                         <input 
//                                             type="text" 
//                                             name="facebook"
//                                             value={userData.socialLinks.facebook || ''}
//                                             onChange={handleSocialLinkChange}
//                                             placeholder="URL Facebook" 
//                                             className="w-full outline-none"
//                                         />
//                                     </div>
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm font-medium mb-1">Tiktok</label>
//                                     <div className="flex items-center border rounded-lg p-2">
//                                         <img src="https://cdn-icons-png.flaticon.com/512/3046/3046125.png" alt="Tiktok" className="h-5 w-5 mr-2" />
//                                         <input 
//                                             type="text" 
//                                             name="tiktok"
//                                             value={userData.socialLinks.tiktok || ''}
//                                             onChange={handleSocialLinkChange}
//                                             placeholder="URL Tiktok" 
//                                             className="w-full outline-none"
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Partie 2*/}
//                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
//                         <div className="lg:col-span-2 space-y-6">
//                             {/* À propos */}
//                             <div className="bg-white rounded-2xl shadow p-6">
//                                 <h2 className="text-xl font-semibold mb-4">À propos</h2>
//                                 <textarea
//                                     name="description"
//                                     value={userData.description}
//                                     onChange={handleInputChange}
//                                     placeholder="Décrivez votre expérience et vos compétences..."
//                                     className="border rounded-lg w-full p-4 h-40 resize-none"
//                                 ></textarea>
//                             </div>
//                         </div>

//                         {/* Colonne droite : Localisation */}
//                         <div className="bg-white rounded-2xl shadow p-6">
//                             <h2 className="text-xl font-semibold mb-4">Localisation</h2>

//                             <div className="mb-4">
//                                 <label className="block text-sm font-medium mb-1">Adresse</label>
//                                 <input 
//                                     type="text" 
//                                     name="adresse"
//                                     value={userData.adresse}
//                                     onChange={handleInputChange}
//                                     placeholder="Votre adresse" 
//                                     className="border rounded-lg w-full p-2" 
//                                 />
//                             </div>

//                             <div className="mb-4">
//                                 <label className="block text-sm font-medium mb-1">Ville</label>
//                                 <select 
//                                     name="ville"
//                                     value={userData.ville}
//                                     onChange={handleInputChange}
//                                     className="border rounded-lg w-full p-2"
//                                 >
//                                     <option value="">Sélectionnez une ville</option>
//                                     {cities.map((city) => (
//                                         <option key={city._id} value={city.name}>
//                                             {city.name}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Partie 3 => Services à prix fixe */}
//                     <div className="space-y-6 mt-6">
//                         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                             {/* Disponibilité */}
//                             <div className="bg-white rounded-2xl shadow p-6">
//                                 <h2 className="text-xl font-semibold mb-4">Disponibilité</h2>
//                                 <div className="space-y-4 mt-10">
//                                     {[0, 1, 2].map((index) => {
//                                         const dispo = userData.prestataireInfo.disponibilites[index] || {};
//                                         return (
//                                             <div className="flex gap-2" key={index}>
//                                                 <select 
//                                                     className="border rounded-lg p-2 w-40"
//                                                     value={dispo.jour || ''}
//                                                     onChange={(e) => handleDisponibiliteChange(index, 'jour', e.target.value)}
//                                                 >
//                                                     <option value="">--Jour--</option>
//                                                     <option value="Lundi">Lundi</option>
//                                                     <option value="Mardi">Mardi</option>
//                                                     <option value="Mercredi">Mercredi</option>
//                                                     <option value="Jeudi">Jeudi</option>
//                                                     <option value="Vendredi">Vendredi</option>
//                                                     <option value="Samedi">Samedi</option>
//                                                     <option value="Dimanche">Dimanche</option>
//                                                 </select>
//                                                 <span className="flex items-center">-</span>
//                                                 <select 
//                                                     className="border rounded-lg p-2 w-40"
//                                                     value={dispo.jour || ''}
//                                                     onChange={(e) => handleDisponibiliteChange(index, 'jour', e.target.value)}
//                                                 >
//                                                     <option value="">--Jour--</option>
//                                                     <option value="Lundi">Lundi</option>
//                                                     <option value="Mardi">Mardi</option>
//                                                     <option value="Mercredi">Mercredi</option>
//                                                     <option value="Jeudi">Jeudi</option>
//                                                     <option value="Vendredi">Vendredi</option>
//                                                     <option value="Samedi">Samedi</option>
//                                                     <option value="Dimanche">Dimanche</option>
//                                                 </select>
//                                                 <input 
//                                                     type="time" 
//                                                     className="border rounded-lg p-2 w-36" 
//                                                     value={dispo.heures?.[0]?.split('-')[0] || ''}
//                                                     onChange={(e) => handleDisponibiliteChange(index, 'heures', `${e.target.value}-${dispo.heures?.[0]?.split('-')[1] || ''}`)}
//                                                 />
//                                                 <input 
//                                                     type="time" 
//                                                     className="border rounded-lg p-2 w-36" 
//                                                     value={dispo.heures?.[0]?.split('-')[1] || ''}
//                                                     onChange={(e) => handleDisponibiliteChange(index, 'heures', `${dispo.heures?.[0]?.split('-')[0] || ''}-${e.target.value}`)}
//                                                 />
//                                             </div>
//                                         );
//                                     })}
//                                 </div>
//                             </div>

//                             {/* Contact */}
//                             <div className="bg-white rounded-2xl shadow p-6">
//                                 <h2 className="text-xl font-semibold mb-4">Contact</h2>
//                                 <div className="space-y-4">
//                                     <div>
//                                         <label className="block text-sm font-medium mb-1">Téléphone</label>
//                                         <input 
//                                             type="text" 
//                                             name="telephone"
//                                             value={userData.telephone}
//                                             onChange={handleInputChange}
//                                             placeholder="+33 6 12 34 56 78" 
//                                             className="border rounded-lg w-full p-2" 
//                                         />
//                                     </div>
//                                     <div>
//                                         <label className="block text-sm font-medium mb-1">Email</label>
//                                         <input 
//                                             type="email" 
//                                             name="email"
//                                             value={userData.email}
//                                             onChange={handleInputChange}
//                                             placeholder="email@example.com" 
//                                             className="border rounded-lg w-full p-2" 
//                                         />
//                                     </div>
//                                     <div>
//                                         <label className="block text-sm font-medium mb-1">Adresse</label>
//                                         <input 
//                                             type="text" 
//                                             name="adresse"
//                                             value={userData.adresse}
//                                             onChange={handleInputChange}
//                                             placeholder="Votre adresse" 
//                                             className="border rounded-lg w-full p-2" 
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Boutons en bas */}
//                         <div className="flex justify-end gap-4 mt-6">
//                             <Link to={from} className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100">
//                                 Annuler
//                             </Link>
//                             <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">
//                                 Enregistrer
//                             </button>
//                         </div>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default ModifierProfil;
