import { FaHome, FaTools, FaCalendarAlt, FaHistory, FaComments, FaMoneyBill, FaCog, FaSignOutAlt, FaUserAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { NavLink ,useLocation } from "react-router-dom";

const SideBar = () => {
    const location = useLocation();
    return (
        <div className="fixed left-0 top-20 h-[calc(100vh-5rem)] w-60 bg-white shadow-lg flex flex-col p-6">

            {/* image de prestataire */}
            <div className="flex items-center space-x-3 mb-8">
                <img src="https://i.pravatar.cc/40" alt="Avatar" className="w-10 h-10 rounded-full" />
                <div>
                    <h4 className="text-sm font-semibold">Salma IKSOD</h4>
                    <span className="text-xs text-green-500">✔ Vérifié</span>
                </div>
            </div>

            {/* Navigation links with scroll if needed */}
            <nav className="flex-1 overflow-y-auto">
                <ul className="space-y-2 text-sm">

                    {/* <NavLink to='/ProfilPrestataire' 
                        className={({isActive}) => 
                            `flex items-center space-x-2 hover:text-blue-600 cursor-pointer p-2 rounded-lg ${isActive ? 'bg-[#EFF6FF] text-blue-600 font-semibold' : ''}`}>
                        <li className="flex items-center space-x-2">
                            <FaUserAlt />
                            <span>Profil</span>
                        </li>
                    </NavLink> */}
                    <NavLink to='/ProfilPrestataire'
                        className={({isActive}) => 
                            `flex items-center space-x-2 hover:text-blue-600 cursor-pointer p-2 rounded-lg ${
                                isActive || location.pathname === '/modifierProfil' 
                                ? 'bg-[#EFF6FF] text-blue-600 font-semibold' 
                                : ''
                            }`}
                        >
                        <li className="flex items-center space-x-2">
                        <FaUserAlt />
                        <span>Profil</span>
                        </li>
                    </NavLink>

                    <NavLink to='/DashboardPrestataire' className={({isActive}) => 
                            `flex items-center space-x-2 hover:text-blue-600 cursor-pointer p-2 rounded-lg ${isActive ? 'bg-[#EFF6FF] text-blue-600 font-semibold' : ''}`}>
                        <li className="flex items-center space-x-2">
                            <MdDashboard />
                            <span>Tableau de bord</span>
                        </li>
                    </NavLink>

                    <NavLink to='/Services-Prestataire' className={({isActive}) => 
                            `flex items-center space-x-2 hover:text-blue-600 cursor-pointer p-2 rounded-lg ${isActive ? 'bg-[#EFF6FF] text-blue-600 font-semibold' : ''}`}>
                        <li className="flex items-center space-x-2">
                            <FaTools />
                            <span>Services</span>
                        </li>
                    </NavLink>

                    <NavLink 
                        to='/Demandes-Prestataire' className={({isActive}) => 
                            `flex items-center space-x-2 hover:text-blue-600 cursor-pointer p-2 rounded-lg ${isActive ? 'bg-[#EFF6FF] text-blue-600 font-semibold' : ''}`}>
                        <li className="flex items-center space-x-2">
                            <FaHome />
                            <span>Demandes</span>
                        </li>
                    </NavLink>

                    <NavLink to='/Rendez-vous-Prestataire' className={({isActive}) => 
                            `flex items-center space-x-2 hover:text-blue-600 cursor-pointer p-2 rounded-lg ${isActive ? 'bg-[#EFF6FF] text-blue-600 font-semibold' : ''}`}>
                        <li className="flex items-center space-x-2">
                            <FaCalendarAlt />
                            <span>Rendez-vous</span>
                        </li>
                    </NavLink>

                    <NavLink to='/Historique-Prestataire' className={({isActive}) => 
                            `flex items-center space-x-2 hover:text-blue-600 cursor-pointer p-2 rounded-lg ${isActive ? 'bg-[#EFF6FF] text-blue-600 font-semibold' : ''}`}>
                        <li className="flex items-center space-x-2">
                            <FaHistory />
                            <span>Historique</span>
                        </li>
                    </NavLink>

                    <NavLink to='/Messages-Prestataire' className={({isActive}) => 
                            `flex items-center space-x-2 hover:text-blue-600 cursor-pointer p-2 rounded-lg ${isActive ? 'bg-[#EFF6FF] text-blue-600 font-semibold' : ''}` }>
                        <li className="flex items-center space-x-2">
                            <FaComments />
                            <span>Messages</span>
                        </li>
                    </NavLink>

                    <NavLink to='/Paiemant-Prestataire' className={({isActive}) => 
                            `flex items-center space-x-2 hover:text-blue-600 cursor-pointer p-2 rounded-lg ${isActive ? 'bg-[#EFF6FF] text-blue-600 font-semibold' : ''}`}>
                        <li className="flex items-center space-x-2">
                            <FaMoneyBill />
                            <span>Paiements</span>
                        </li>
                    </NavLink>

                    <NavLink to='/Parametre-Prestataire' className={({isActive}) => 
                            `flex items-center space-x-2 hover:text-blue-600 cursor-pointer p-2 rounded-lg ${isActive ? 'bg-[#EFF6FF] text-blue-600 font-semibold' : ''}` }>
                        <li className="flex items-center space-x-2">
                            <FaCog />
                            <span>Paramètres</span>
                        </li>
                    </NavLink>
                </ul>
            </nav>

            {/* se deconnecter */}
            <div className="mt-auto pt-4">
                <button className="flex items-center space-x-2 text-red-500 hover:text-red-600 text-sm p-2 rounded-lg hover:bg-red-50 w-full">
                    <FaSignOutAlt />
                    <span>Déconnexion</span>
                </button>
            </div>
        </div>
    )
}

export default SideBar;