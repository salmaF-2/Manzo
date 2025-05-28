import { FaHome, FaTools, FaCalendarAlt, FaHistory, FaComments, FaMoneyBill, FaCog, FaSignOutAlt, FaUserAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { NavLink, useLocation } from "react-router-dom";

const SideBarClient = () => {
    const location = useLocation();
    return (
        <div className="fixed left-0 top-20 h-[calc(100vh-5rem)] w-60 bg-white border-r border-gray-200 flex flex-col p-6">


            {/* Profile section with subtle shadow */}
            <div className="flex items-center space-x-3 mb-8 p-3 bg-white rounded-lg shadow-sm">
                <img src="https://i.pravatar.cc/40" alt="Avatar" className="w-10 h-10 rounded-full border-2 border-blue-200" />
                <div>
                    <h4 className="text-sm font-semibold text-gray-800">Salma IKSOD</h4>
                    <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">✔ Vérifié</span>
                </div>
            </div>

            {/* Navigation links with modern design */}
            <nav className="flex-1 overflow-y-auto">
                <ul className="space-y-1 text-sm">

                    <NavLink to='/ProfilClient'
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

                    <NavLink to='/DashboardClient' 
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

                    <NavLink to='/Reservations-Client'
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
                        <span>Mes réservations</span>
                    </NavLink>

                    <NavLink to='/demande-envoyer-Client' 
                        className={({isActive}) => 
                            `flex items-center space-x-2 hover:bg-blue-100/50 cursor-pointer p-2.5 rounded-lg transition-all ${
                                isActive 
                                ? 'bg-blue-100 text-blue-600 font-medium border-l-4 border-blue-500' 
                                : 'text-gray-600 hover:text-blue-600'
                            }`}>
                        <li className="flex items-center space-x-2">
                            <FaCalendarAlt className="text-blue-500" />
                            <span>Demandes envoyées</span>
                        </li>
                    </NavLink>

                    <NavLink to='/avis-Client' 
                        className={({isActive}) => 
                            `flex items-center space-x-2 hover:bg-blue-100/50 cursor-pointer p-2.5 rounded-lg transition-all ${
                                isActive 
                                ? 'bg-blue-100 text-blue-600 font-medium border-l-4 border-blue-500' 
                                : 'text-gray-600 hover:text-blue-600'
                            }`}>
                        <li className="flex items-center space-x-2">
                            <FaHistory className="text-blue-500" />
                            <span>Avis & Évaluations</span>
                        </li>
                    </NavLink>

                    <NavLink to='/Messages-Client' 
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

                    <NavLink to='/Paiemant-Client' 
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

                    <NavLink to='/Parametre-Client' 
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

export default SideBarClient;
