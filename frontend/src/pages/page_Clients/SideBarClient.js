import { FaHome, FaTools, FaCalendarAlt, FaHistory, FaComments, FaMoneyBill, FaCog, FaSignOutAlt, FaUserAlt,FaFemale,FaMale} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

const SideBarClient = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [userData, setUserData] = useState({
        nom: '',
        prenom: '',
        photo: null,
        genre: 'femme',
        email: ''
    });
    const [photoVersion, setPhotoVersion] = useState(0); // Ajout d'un état pour forcer le rafraîchissement

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
                        photo: data.photo || null,
                        genre: data.genre || 'femme',
                        email: data.email || ''
                    });
                }
            } catch (error) {
                console.error('Erreur lors du chargement du profil:', error);
            }
        };

        fetchProfile();

        // Écouter les événements de mise à jour du profil
        const handleProfileUpdate = () => {
            fetchProfile();
            setPhotoVersion(prev => prev + 1); // Incrémenter pour forcer le rafraîchissement de l'image
        };

        window.addEventListener('profileUpdated', handleProfileUpdate);

        return () => {
            window.removeEventListener('profileUpdated', handleProfileUpdate);
        };
    }, []);

    // Gestion de la déconnexion
    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // Affichage conditionnel de l'avatar
    const renderAvatar = () => {
        if (userData.photo) {
            return (
                <img 
                    src={
                        userData.photo.startsWith('/uploads/') 
                            ? `http://localhost:5000${userData.photo}?v=${photoVersion}`
                            : `${userData.photo}?v=${photoVersion}`
                    }
                    alt="Profil"
                    className="w-10 h-10 rounded-full border-2 border-blue-200 object-cover"
                    onError={(e) => {
                        e.target.style.display = 'none';
                        const fallback = e.target.nextElementSibling;
                        if (fallback) {
                            fallback.style.display = 'flex';
                        }
                    }}
                    key={`avatar-${photoVersion}`}
                />
            );
        }
        
        return (
            <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                userData.genre === 'homme' 
                    ? 'border-blue-200 bg-blue-50 text-blue-500' 
                    : 'border-pink-200 bg-pink-50 text-pink-500'
            }`}>
                {userData.genre === 'homme' ? (
                    <FaMale className="text-lg" />
                ) : (
                    <FaFemale className="text-lg" />
                )}
            </div>
        );
    };

    return (
        <div className="fixed left-0 top-20 h-[calc(100vh-5rem)] w-60 bg-white border-r border-gray-200 flex flex-col p-6 z-40">
            {/* Section profil */}
            <div className="flex items-center space-x-3 mb-8 p-3 bg-white rounded-lg shadow-sm">
                {renderAvatar()}
                <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-gray-800 truncate">
                        {userData.prenom} {userData.nom}
                    </h4>
                    <p className="text-xs text-gray-500 truncate">{userData.email}</p>
                    <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full mt-1 inline-block">
                        Bienvenue
                    </span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto">
                <ul className="space-y-1 text-sm">
                    <NavLink 
                        to='/DashboardClient' 
                        className={({isActive}) => 
                            `flex items-center space-x-2 hover:bg-blue-100/50 cursor-pointer p-2.5 rounded-lg transition-all ${
                                isActive 
                                ? 'bg-blue-100 text-blue-600 font-medium border-l-4 border-blue-500' 
                                : 'text-gray-600 hover:text-blue-600'
                            }`}
                    >
                        <MdDashboard className="text-blue-500 min-w-[20px]" />
                        <span className="truncate">Tableau de bord</span>
                    </NavLink>

                    <NavLink 
                        to='/Reservations-Client'
                        className={({ isActive }) => 
                            `flex items-center space-x-2 hover:bg-blue-100/50 cursor-pointer p-2.5 rounded-lg transition-all ${
                            isActive || 
                            location.pathname === '/Ajouter_service' || 
                            location.pathname === '/Modifier_service'
                                ? 'bg-blue-100 text-blue-600 font-medium border-l-4 border-blue-500' 
                                : 'text-gray-600 hover:text-blue-600'
                            }`}
                    >
                        <FaTools className="text-blue-500 min-w-[20px]" />
                        <span className="truncate">Mes réservations</span>
                    </NavLink>

                    <NavLink 
                        to='/demande-envoyer-Client' 
                        className={({isActive}) => 
                            `flex items-center space-x-2 hover:bg-blue-100/50 cursor-pointer p-2.5 rounded-lg transition-all ${
                                isActive 
                                ? 'bg-blue-100 text-blue-600 font-medium border-l-4 border-blue-500' 
                                : 'text-gray-600 hover:text-blue-600'
                            }`}
                    >
                        <FaCalendarAlt className="text-blue-500 min-w-[20px]" />
                        <span className="truncate">Demandes envoyées</span>
                    </NavLink>

                    <NavLink 
                        to='/avis-Client' 
                        className={({isActive}) => 
                            `flex items-center space-x-2 hover:bg-blue-100/50 cursor-pointer p-2.5 rounded-lg transition-all ${
                                isActive 
                                ? 'bg-blue-100 text-blue-600 font-medium border-l-4 border-blue-500' 
                                : 'text-gray-600 hover:text-blue-600'
                            }`}
                    >
                        <FaHistory className="text-blue-500 min-w-[20px]" />
                        <span className="truncate">Avis & Évaluations</span>
                    </NavLink>

                    <NavLink 
                        to='/MessagesClient' 
                        className={({isActive}) => 
                            `flex items-center space-x-2 hover:bg-blue-100/50 cursor-pointer p-2.5 rounded-lg transition-all ${
                                isActive 
                                ? 'bg-blue-100 text-blue-600 font-medium border-l-4 border-blue-500' 
                                : 'text-gray-600 hover:text-blue-600'
                            }`}
                    >
                        <FaComments className="text-blue-500 min-w-[20px]" />
                        <span className="truncate">Messages</span>
                    </NavLink>

                    <NavLink 
                        to='/Paiemant-Client' 
                        className={({isActive}) => 
                            `flex items-center space-x-2 hover:bg-blue-100/50 cursor-pointer p-2.5 rounded-lg transition-all ${
                                isActive 
                                ? 'bg-blue-100 text-blue-600 font-medium border-l-4 border-blue-500' 
                                : 'text-gray-600 hover:text-blue-600'
                            }`}
                    >
                        <FaMoneyBill className="text-blue-500 min-w-[20px]" />
                        <span className="truncate">Paiements</span>
                    </NavLink>
                    
                    <NavLink 
                        to='/ProfilClient'
                        className={({isActive}) => 
                            `flex items-center space-x-2 hover:bg-blue-100/50 cursor-pointer p-2.5 rounded-lg transition-all ${
                                isActive || location.pathname === '/modifierProfil' 
                                ? 'bg-blue-100 text-blue-600 font-medium border-l-4 border-blue-500' 
                                : 'text-gray-600 hover:text-blue-600'
                            }`}
                    >
                        <FaUserAlt className="text-blue-500 min-w-[20px]" />
                        <span className="truncate">Profil</span>
                    </NavLink>

                    <NavLink 
                        to='/parametreclient' 
                        className={({isActive}) => 
                            `flex items-center space-x-2 hover:bg-blue-100/50 cursor-pointer p-2.5 rounded-lg transition-all ${
                                isActive 
                                ? 'bg-blue-100 text-blue-600 font-medium border-l-4 border-blue-500' 
                                : 'text-gray-600 hover:text-blue-600'
                            }`}
                    >
                        <FaCog className="text-blue-500 min-w-[20px]" />
                        <span className="truncate">Paramètres</span>
                    </NavLink>
                </ul>
            </nav>

            {/* Bouton de déconnexion */}
            <div className="mt-auto pt-4">
                <button 
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-red-500 hover:text-red-600 text-sm p-2.5 rounded-lg hover:bg-red-50/80 w-full transition-all border border-red-100 hover:border-red-200"
                >
                    <FaSignOutAlt className="min-w-[20px]" />
                    <span>Déconnexion</span>
                </button>
            </div>
        </div>
    );
}

export default SideBarClient;