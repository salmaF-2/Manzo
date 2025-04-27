import React, { useEffect } from "react";
import SideBar from "./SideBar";
import { LineChart, Coins , Star, Clock } from 'lucide-react';

const Dashboard = () => {
  useEffect(() => {
            window.scrollTo(0, 0);
      }, []);
  return (
    <div className="flex bg-[rgba(188,208,234,0.20)] min-h-[calc(100vh-5rem)] mt-20">
      <SideBar />

      {/* Main content - modification ici : suppression de overflow-y-auto */}
      <div className="flex-1 ml-60 p-6 mt-4">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        {/* Le reste de votre code existant reste inchangé */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard title="Prestation" value="127" subtitle="+12% ce mois" icon={<LineChart size={24} />} color="blue" subtitleColor="blue"  />
          <StatCard title="Revenus" value="3,450 Dh" subtitle="+8% ce mois"  icon={<Coins  size={24} className="text-[#10B981]"/>}  color="green" subtitleColor="green"/>
          <StatCard title="Note moyenne" value="4.8/5" subtitle="Based on 89 avis" icon={<Star size={24}  />} color="yellow" subtitleColor="yellow" />
          <StatCard title="Demandes" value="12" subtitle="5 en attente" icon={<Clock size={24}  />} color="orange" subtitleColor="orange" />
        </div>

        {/* Demandes récentes */}
        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <h2 className="text-lg font-semibold mb-4">Demandes récentes</h2>
          <RequestItem name="Marie Lambert" service="Plomberie - Fuite robinet" status="En attente" />
          <RequestItem name="Pierre Martin" service="Électricité - Installation lampe" status="Acceptée" />
        </div>

        {/* Services & Disponibilites */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="text-lg font-semibold mb-4">Mes services</h2>
            <ServiceItem name="Plomberie" price="à partir de 500dh" />
            <ServiceItem name="Électricité" price="à partir de 200dh" />
          </div>
          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="text-lg font-semibold mb-4">Disponibilités</h2>
            <div className="grid grid-cols-7 gap-2 text-center">
              {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day) => (
                <div key={day} className="bg-blue-100 text-blue-600 rounded py-2">{day}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Vos composants StatCard, RequestItem et ServiceItem restent inchangés
const colorClasses = {
  blue: 'text-blue-600',
  green: 'text-green-600',
  yellow: 'text-yellow-500', 
  orange: 'text-orange-500',
  gray: 'text-gray-500',
};
const bgColorClasses = {
  blue: 'bg-blue-100',
  green: 'bg-green-100',
  yellow: 'bg-yellow-100',
  orange: 'bg-orange-100',
  gray: 'bg-gray-100',
};
const StatCard = ({ title, value, subtitle, icon, color, subtitleColor }) => (
  <div className="bg-white p-4 rounded-xl shadow hover:-translate-y-1 transition-transform duration-200 ease-in-out relative">
    <div className="absolute top-4 right-4 text-2xl">
      <div className={`p-2 rounded-full ${bgColorClasses[color]}`}>
        {React.cloneElement(icon, { className: `text-${color}-500`, size: 24 })}
      </div>
    </div>
    <h3 className={`text-sm text-${color}-500 font-semibold`}>{title}</h3>
    <div className="text-2xl font-bold mt-2">{value}</div>
    <p className={`text-sm ${colorClasses[subtitleColor]} mt-2`}>{subtitle}</p>
  </div>
);

const RequestItem = ({ name, service, status }) => (
  <div className="flex justify-between items-center py-2 border-b last:border-none">
    <div>
      <div className="font-medium">{name}</div>
      <div className="text-sm text-gray-500">{service}</div>
    </div>
    <div className={`text-sm px-3 py-1 rounded-full ${
      status === "Acceptée" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"
    }`}>
      {status}
    </div>
  </div>
);

const ServiceItem = ({ name, price }) => (
  <div className="flex justify-between items-center mb-3">
    <div>
      <div className="font-medium">{name}</div>
      <div className="text-sm text-gray-500">{price}</div>
    </div>
    <div className="w-10 h-5 bg-blue-500 rounded-full"></div>
  </div>
);

export default Dashboard;