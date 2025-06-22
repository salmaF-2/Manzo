import { FaHome, FaTools, FaCalendarAlt, FaHistory, FaComments, FaMoneyBill, FaCog, FaSignOutAlt, FaUserAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const SideBar = () => {
    const location = useLocation();
    const [userData, setUserData] = useState({
        nom: '',
        prenom: '',
        prestataireInfo: {
            documents: {
                photoProfil: null
            }
        }
    });
    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/auth/prestataire/profile', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUserData(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
        }
    };
    return (
        <div className="fixed left-0 top-20 h-[calc(100vh-5rem)] w-60 bg-white border-r border-gray-200 flex flex-col p-6">


            {/* Profile section with subtle shadow */}
            <div className="flex items-center space-x-3 mb-8 p-3 bg-white rounded-lg shadow-sm">
                <div className="relative flex-shrink-0">
                    <img 
                        src={userData.prestataireInfo?.documents?.photoProfil 
                            ? `http://localhost:5000${userData.prestataireInfo.documents.photoProfil}`
                            : "https://i.pravatar.cc/80"} 
                        alt="Avatar" 
                        className="w-12 h-12 rounded-full border-2 border-blue-200 object-cover" 
                    />
                </div>
                <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-gray-800 truncate">
                        {userData.prenom} {userData.nom}
                    </h4>
                    <span className="inline-block mt-1 text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">
                        ✔ Vérifié
                    </span>
                </div>
            </div>

            {/* Navigation links with modern design */}
            <nav className="flex-1 overflow-y-auto">
                <ul className="space-y-1 text-sm">

                    <NavLink to='/ProfilPrestataire'
                        className={({isActive}) => 
                            `flex items-center space-x-2 hover:bg-blue-100/50 cursor-pointer p-2.5 rounded-lg transition-all ${
                                isActive || location.pathname === '/modifierProfil' 
                                ? 'bg-blue-100 text-blue-600 font-medium border-l-4 border-blue-500' 
                                : 'text-gray-600 hover:text-blue-600'
                            }`}
                        >
                        <li className="flex items-center space-x-2">
                            <FaUserAlt className="text-blue-500" />
                            <span>Profil</span>
                        </li>
                    </NavLink>

                    <NavLink to='/DashboardPrestataire' 
                        className={({isActive}) => 
                            `flex items-center space-x-2 hover:bg-blue-100/50 cursor-pointer p-2.5 rounded-lg transition-all ${
                                isActive 
                                ? 'bg-blue-100 text-blue-600 font-medium border-l-4 border-blue-500' 
                                : 'text-gray-600 hover:text-blue-600'
                            }`}>
                        <li className="flex items-center space-x-2">
                            <MdDashboard className="text-blue-500" />
                            <span>Tableau de bord</span>
                        </li>
                    </NavLink>

                    <NavLink to='/Services-Prestataire'
                        className={({ isActive }) => 
                            `flex items-center space-x-2 hover:bg-blue-100/50 cursor-pointer p-2.5 rounded-lg transition-all ${
                            isActive || 
                            location.pathname === '/Ajouter_service' || 
                            location.pathname === '/Modifier_service'
                                ? 'bg-blue-100 text-blue-600 font-medium border-l-4 border-blue-500' 
                                : 'text-gray-600 hover:text-blue-600'
                            }`}
                        >
                        <FaTools className="text-blue-500" />
                        <span>Services</span>
                    </NavLink>

                    <NavLink to='/Demandes-Prestataire' 
                        className={({isActive}) => 
                            `flex items-center space-x-2 hover:bg-blue-100/50 cursor-pointer p-2.5 rounded-lg transition-all ${
                                isActive 
                                ? 'bg-blue-100 text-blue-600 font-medium border-l-4 border-blue-500' 
                                : 'text-gray-600 hover:text-blue-600'
                            }`}>
                        <li className="flex items-center space-x-2">
                            <FaHome className="text-blue-500" />
                            <span>Demandes</span>
                        </li>
                    </NavLink>

                    <NavLink to='/Rendez-vous-Prestataire' 
                        className={({isActive}) => 
                            `flex items-center space-x-2 hover:bg-blue-100/50 cursor-pointer p-2.5 rounded-lg transition-all ${
                                isActive 
                                ? 'bg-blue-100 text-blue-600 font-medium border-l-4 border-blue-500' 
                                : 'text-gray-600 hover:text-blue-600'
                            }`}>
                        <li className="flex items-center space-x-2">
                            <FaCalendarAlt className="text-blue-500" />
                            <span>Rendez-vous</span>
                        </li>
                    </NavLink>

                    <NavLink to='/Historique-Prestataire' 
                        className={({isActive}) => 
                            `flex items-center space-x-2 hover:bg-blue-100/50 cursor-pointer p-2.5 rounded-lg transition-all ${
                                isActive 
                                ? 'bg-blue-100 text-blue-600 font-medium border-l-4 border-blue-500' 
                                : 'text-gray-600 hover:text-blue-600'
                            }`}>
                        <li className="flex items-center space-x-2">
                            <FaHistory className="text-blue-500" />
                            <span>Historique</span>
                        </li>
                    </NavLink>

                    <NavLink to='/Messages-Prestataire' 
                        className={({isActive}) => 
                            `flex items-center space-x-2 hover:bg-blue-100/50 cursor-pointer p-2.5 rounded-lg transition-all ${
                                isActive 
                                ? 'bg-blue-100 text-blue-600 font-medium border-l-4 border-blue-500' 
                                : 'text-gray-600 hover:text-blue-600'
                            }`}>
                        <li className="flex items-center space-x-2">
                            <FaComments className="text-blue-500" />
                            <span>Messages</span>
                        </li>
                    </NavLink>

                    <NavLink to='/Paiemant-Prestataire' 
                        className={({isActive}) => 
                            `flex items-center space-x-2 hover:bg-blue-100/50 cursor-pointer p-2.5 rounded-lg transition-all ${
                                isActive 
                                ? 'bg-blue-100 text-blue-600 font-medium border-l-4 border-blue-500' 
                                : 'text-gray-600 hover:text-blue-600'
                            }`}>
                        <li className="flex items-center space-x-2">
                            <FaMoneyBill className="text-blue-500" />
                            <span>Paiements</span>
                        </li>
                    </NavLink>

                    <NavLink to='/Parametre-Prestataire' 
                        className={({isActive}) => 
                            `flex items-center space-x-2 hover:bg-blue-100/50 cursor-pointer p-2.5 rounded-lg transition-all ${
                                isActive 
                                ? 'bg-blue-100 text-blue-600 font-medium border-l-4 border-blue-500' 
                                : 'text-gray-600 hover:text-blue-600'
                            }`}>
                        <li className="flex items-center space-x-2">
                            <FaCog className="text-blue-500" />
                            <span>Paramètres</span>
                        </li>
                    </NavLink>
                </ul>
            </nav>

            {/* Logout button with modern style */}
            <div className="mt-auto pt-4">
                <button className="flex items-center space-x-2 text-red-500 hover:text-red-600 text-sm p-2.5 rounded-lg hover:bg-red-50/80 w-full transition-all border border-red-100 hover:border-red-200">
                    <FaSignOutAlt />
                    <span>Déconnexion</span>
                </button>
            </div>
        </div>
    )
}

export default SideBar;