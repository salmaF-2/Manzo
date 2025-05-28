import React, { useEffect } from "react";

import { LineChart, Coins, Star, Clock } from 'lucide-react';
import { motion } from "framer-motion";
import SideBar from "../Page_Prestataire/SideBar";
import SideBarClient from "./SideBarClient";


const DashboardClient = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="flex bg-gradient-to-br from-[#BCD0EA50] to-indigo-50 min-h-[calc(100vh-5rem)] mt-20">
      <SideBarClient />

      <div className="flex-1 ml-60 p-6 mt-4">
        <motion.h1  initial={{ opacity: 0, x: -20 }}  animate={{ opacity: 1, x: 0 }}  transition={{ duration: 0.5 }} className="text-3xl font-bold mb-8 text-gray-800">
          📊 Tableau de Bord Client 
        </motion.h1>

        {/* Stats Cards */}
        <motion.div  variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

          <motion.div variants={item}>
            <StatCard  title="Prestation" value="127" subtitle="+12% ce mois" icon={<LineChart size={24} />} color="blue" subtitleColor="blue" />
          </motion.div>

          <motion.div variants={item}>
            <StatCard title="Revenus" value="3,450 Dh" subtitle="+8% ce mois" icon={<Coins size={24} className="text-[#10B981]"/>} color="green" subtitleColor="green"/>
          </motion.div>

          <motion.div variants={item}>
            <StatCard title="Note moyenne" value="4.8/5" subtitle="Based on 89 avis" icon={<Star size={24} />} color="yellow" subtitleColor="yellow" />
          </motion.div>

          <motion.div variants={item}>
            <StatCard title="Demandes" value="12" subtitle="5 en attente" icon={<Clock size={24} />} color="orange" subtitleColor="orange"/>
          </motion.div>

        </motion.div>

        {/* Demandes récentes */}
        <motion.div  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold mb-5 text-gray-700">Demandes récentes</h2>
          <RequestItem name="Marie Lambert" service="Plomberie - Fuite robinet" status="En attente"/>
          <RequestItem name="Pierre Martin" service="Électricité - Installation lampe" status="Acceptée"/>
        </motion.div>

        {/* Services & Disponibilites */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-semibold mb-5 text-gray-700">Mes services</h2>
            <ServiceItem name="Plomberie" price="à partir de 500dh" />
            <ServiceItem name="Électricité" price="à partir de 200dh" />
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-semibold mb-5 text-gray-700">Disponibilités</h2>
            <hr/>
            <div className="grid grid-cols-7 gap-2 text-center mt-6">
              {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day, index) => (
                <motion.div 
                  key={day}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  className="bg-blue-100 text-blue-600 rounded-lg py-2 font-medium hover:bg-blue-200 transition-colors"
                >
                  {day}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

const StatCard = ({ title, value, subtitle, icon, color, subtitleColor }) => {
  const colorClasses = { blue: 'text-blue-600',
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

  return (
    <motion.div 
      whileHover={{ scale: 1.03 }}
      className={`bg-white p-5 rounded-2xl shadow-md border border-gray-100 transition-all duration-300 relative overflow-hidden group`}
    >
      <div className="absolute -right-4 -top-4 opacity-10 group-hover:opacity-20 transition-opacity">
        {React.cloneElement(icon, { size: 60 })}
      </div>
      <div className="absolute top-4 right-4 text-2xl">
        <div className={`p-3 rounded-xl ${bgColorClasses[color]} group-hover:scale-110 transition-transform`}>
          {React.cloneElement(icon, { className: `${colorClasses[color]}`, size: 24 })}
        </div>
      </div>
      <h3 className={`text-sm ${colorClasses[color]} font-semibold mb-1`}>{title}</h3>
      <div className="text-2xl font-bold text-gray-800 mt-2">{value}</div>
      <p className={`text-xs ${colorClasses[subtitleColor]} mt-2`}>{subtitle}</p>
    </motion.div>
  );
};

const RequestItem = ({ name, service, status }) => (
  <motion.div 
    whileHover={{ x: 5 }}
    className="flex justify-between items-center py-3 px-2 border-b last:border-none hover:bg-gray-50 rounded-lg transition-colors"
  >
    <div>
      <div className="font-medium text-gray-800">{name}</div>
      <div className="text-sm text-gray-500">{service}</div>
    </div>
    <motion.div 
      whileHover={{ scale: 1.05 }}
      className={`text-xs font-medium px-3 py-1 rounded-full ${
        status === "Acceptée" 
          ? "bg-green-100 text-green-600" 
          : "bg-yellow-100 text-yellow-600"
      }`}
    >
      {status}
    </motion.div>
  </motion.div>
);

const ServiceItem = ({ name, price }) => (
  <motion.div 
    whileHover={{ x: 5 }}
    className="flex justify-between items-center mb-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
  >
    <div>
      <div className="font-medium text-gray-800">{name}</div>
      <div className="text-sm text-gray-500">{price}</div>
    </div>
    <div className="relative w-12 h-6 bg-blue-100 rounded-full">
      <motion.div 
        className="absolute top-0.5 left-0.5 w-5 h-5 bg-blue-500 rounded-full shadow-sm"
        animate={{ x: 18 }}
        transition={{ 
          repeat: Infinity,
          repeatType: "reverse",
          duration: 1.5
        }}
      />
    </div>
  </motion.div>
);

export default DashboardClient;




