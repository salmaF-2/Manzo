import React, { useEffect } from "react";
import { LineChart, ShoppingCart, Star, Clock, Heart, CheckCircle } from 'lucide-react';
import { motion } from "framer-motion";
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
        <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="text-3xl font-bold mb-8 text-gray-800">
          📊 Tableau de Bord Client
        </motion.h1>

        {/* Stats Cards */}
        <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div variants={item}>
            <StatCard 
              title="Commandes" 
              value="15" 
              subtitle="+3 ce mois" 
              icon={<LineChart size={24} />} 
              color="blue" 
              subtitleColor="blue" 
            />
          </motion.div>

          <motion.div variants={item}>
            <StatCard 
              title="Dépenses" 
              value="2,850 Dh" 
              subtitle="Économie: 320 Dh" 
              icon={<ShoppingCart size={24} className="text-[#10B981]"/>} 
              color="green" 
              subtitleColor="green"
            />
          </motion.div>

          <motion.div variants={item}>
            <StatCard 
              title="Favoris" 
              value="8" 
              subtitle="Prestataires favoris" 
              icon={<Heart size={24} />} 
              color="pink" 
              subtitleColor="pink" 
            />
          </motion.div>

          <motion.div variants={item}>
            <StatCard 
              title="En cours" 
              value="3" 
              subtitle="Services actifs" 
              icon={<Clock size={24} />} 
              color="orange" 
              subtitleColor="orange"
            />
          </motion.div>
        </motion.div>

        {/* Demandes récentes */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold mb-5 text-gray-700">Mes demandes récentes</h2>
          <RequestItem 
            prestataire="Ahmed K." 
            service="Plomberie - Réparation chauffe-eau" 
            status="En cours"
            date="15 Juin 2023"
            rating={4}
          />
          <RequestItem 
            prestataire="Fatima Z." 
            service="Nettoyage - Maison complète" 
            status="Terminé"
            date="10 Juin 2023"
            rating={5}
          />
        </motion.div>

        {/* Services fréquents & Recommandations */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-semibold mb-5 text-gray-700">Services fréquents</h2>
            <ServiceItem 
              name="Plomberie" 
              count="5 commandes" 
              last="Dernière: 12 Juin" 
              icon="💧"
            />
            <ServiceItem 
              name="Nettoyage" 
              count="3 commandes" 
              last="Dernière: 5 Juin" 
              icon="🧹"
            />
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-xl font-semibold mb-5 text-gray-700">Recommandations</h2>
            <RecommendationItem 
              name="Électricité - Installation luminaires" 
              reason="Basé sur vos services précédents"
              icon="💡"
            />
            <RecommendationItem 
              name="Jardinage - Entretien mensuel" 
              reason="Nouveau dans votre région"
              icon="🌿"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Composants adaptés pour le client
const StatCard = ({ title, value, subtitle, icon, color, subtitleColor }) => {
  const colorClasses = { 
    blue: 'text-blue-600',
    green: 'text-green-600',
    pink: 'text-pink-500',
    orange: 'text-orange-500',
    gray: 'text-gray-500',
  };

  const bgColorClasses = {
    blue: 'bg-blue-100',
    green: 'bg-green-100',
    pink: 'bg-pink-100',
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

const RequestItem = ({ prestataire, service, status, date, rating }) => (
  <motion.div 
    whileHover={{ x: 5 }}
    className="flex justify-between items-center py-3 px-2 border-b last:border-none hover:bg-gray-50 rounded-lg transition-colors"
  >
    <div className="flex-1">
      <div className="font-medium text-gray-800">{service}</div>
      <div className="text-sm text-gray-500">Par {prestataire} • {date}</div>
    </div>
    <div className="flex items-center space-x-3">
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={16} 
            fill={i < rating ? "#F59E0B" : "none"} 
            className={i < rating ? "text-yellow-500" : "text-gray-300"} 
          />
        ))}
      </div>
      <motion.div 
        whileHover={{ scale: 1.05 }}
        className={`text-xs font-medium px-3 py-1 rounded-full ${
          status === "Terminé" 
            ? "bg-green-100 text-green-600" 
            : "bg-blue-100 text-blue-600"
        }`}
      >
        {status}
      </motion.div>
    </div>
  </motion.div>
);

const ServiceItem = ({ name, count, last, icon }) => (
  <motion.div 
    whileHover={{ x: 5 }}
    className="flex items-center mb-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
  >
    <div className="text-2xl mr-4">{icon}</div>
    <div className="flex-1">
      <div className="font-medium text-gray-800">{name}</div>
      <div className="text-sm text-gray-500">{count} • {last}</div>
    </div>
    <button className="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors">
      Commander
    </button>
  </motion.div>
);

const RecommendationItem = ({ name, reason, icon }) => (
  <motion.div 
    whileHover={{ x: 5 }}
    className="flex items-center mb-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
  >
    <div className="text-2xl mr-4">{icon}</div>
    <div className="flex-1">
      <div className="font-medium text-gray-800">{name}</div>
      <div className="text-sm text-gray-500">{reason}</div>
    </div>
    <button className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full hover:bg-blue-200 transition-colors">
      Découvrir
    </button>
  </motion.div>
);

export default DashboardClient;