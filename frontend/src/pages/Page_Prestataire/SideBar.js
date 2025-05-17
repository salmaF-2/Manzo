import { FaHome, FaTools, FaCalendarAlt, FaHistory, FaComments, FaMoneyBill, FaCog, FaSignOutAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

const SideBar = ()=>{
    return(
        <div className="h-screen w-64 bg-white shadow-lg flex flex-col p-4 mt-24">
            <div className="flex items-center space-x-3 mb-8">
                <img  src="https://i.pravatar.cc/40" alt="Avatar" className="w-10 h-10 rounded-full" />
                <div>
                    <h4 className="text-sm font-semibold">Jean Dupont</h4>
                    <span className="text-xs text-green-500">✔ Vérifié</span>
                </div>
            </div>
            <nav className="flex-1">
                <ul className="space-y-4 text-sm">
                    <li className="flex items-center space-x-2 text-blue-600 font-semibold">
                        <MdDashboard />
                        <span>Tableau de bord</span>
                    </li>
                    
                    <li className="flex items-center space-x-2 hover:text-blue-600 cursor-pointer">
                        <FaTools />
                        <span>Services</span>
                    </li>

                    <li className="flex items-center space-x-2 hover:text-blue-600 cursor-pointer">>
                        <FaHome />
                        <span>Demandes</span>
                    </li>

                    <li className="flex items-center space-x-2 hover:text-blue-600 cursor-pointer">>
                        <FaCalendarAlt />
                        <span>Rendez-vous</span>
                    </li>

                    <li className="flex items-center space-x-2 hover:text-blue-600 cursor-pointer">
                        <FaHistory />
                        <span>Historique</span>
                    </li>

                    <li className="flex items-center space-x-2 hover:text-blue-600 cursor-pointer">
                        <FaComments />
                        <span>Messages</span>
                    </li>

                    <li className="flex items-center space-x-2 hover:text-blue-600 cursor-pointer">
                        <FaMoneyBill />
                        <span>Paiements</span>
                    </li>

                    <li className="flex items-center space-x-2 hover:text-blue-600 cursor-pointer">
                        <FaCog />
                        <span>Paramètres</span>
                    </li>
                </ul>
            </nav>

            <div className="mt-6">
            <button className="flex items-center space-x-2 text-red-500 hover:text-red-600 text-sm">
                <FaSignOutAlt />
                <span>Déconnexion</span>
            </button>
            </div>
        </div>
    )
}

export default SideBar;