import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import { motion } from "framer-motion";
import moment from 'moment';

const HistoriqueP = () => {
  const [historyAppointments, setHistoryAppointments] = useState([
    {
      id: 1,
      client: 'Sophie Martin',
      clientImage: 'https://randomuser.me/api/portraits/women/44.jpg',
      service: 'Contrôle annuel',
      dateDemande: moment().subtract(5, 'days').toDate(),
      dateRealisee: moment().subtract(1, 'days').toDate(),
      status: 'terminé',
      phone: '06 12 34 56 78',
      duree: '1h',
      montant: '80€'
    },
    {
      id: 2,
      client: 'Lucas Bernard',
      clientImage: 'https://randomuser.me/api/portraits/men/32.jpg',
      service: 'Ajustement appareil',
      dateDemande: moment().subtract(2, 'weeks').toDate(),
      dateRealisee: moment().subtract(1, 'week').toDate(),
      status: 'terminé',
      phone: '07 89 01 23 45',
      duree: '30min',
      montant: '50€'
    },
    {
      id: 3,
      client: 'Emma Dubois',
      clientImage: 'https://randomuser.me/api/portraits/women/68.jpg',
      service: 'Soin carie',
      dateDemande: moment().subtract(10, 'days').toDate(),
      dateRealisee: moment().subtract(3, 'days').toDate(),
      status: 'annulé',
      phone: '06 45 67 89 01',
      duree: '45min',
      montant: '0€'
    }
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const formatStatus = (status) => {
    switch(status) {
      case 'terminé': return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Terminé</span>;
      case 'annulé': return <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">Annulé</span>;
      default: return status;
    }
  };

  return (
    <div className="flex bg-gradient-to-br from-[#BCD0EA50] to-indigo-50 min-h-[calc(100vh-5rem)] mt-20">
      <SideBar />

      <div className="flex-1 ml-60 p-6 mt-4">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.5 }} 
          className="text-3xl font-bold mb-8 text-gray-800"
        >
          🕓 Historique des Rendez-vous
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#5869A3]/10">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#4D6099] uppercase tracking-wider">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#4D6099] uppercase tracking-wider">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#4D6099] uppercase tracking-wider">Date demande</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#4D6099] uppercase tracking-wider">Date réalisée</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#4D6099] uppercase tracking-wider">Statut</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#4D6099] uppercase tracking-wider">Durée</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#4D6099] uppercase tracking-wider">Montant</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {historyAppointments.map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img 
                          src={appointment.clientImage} 
                          alt={appointment.client}
                          className="w-10 h-10 rounded-full mr-3 object-cover"
                        />
                        <div>
                          <div className="font-medium text-gray-900">{appointment.client}</div>
                          <div className="text-xs text-gray-500">{appointment.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {appointment.service}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {moment(appointment.dateDemande).format('DD/MM/YYYY')}
                      </div>
                      <div className="text-xs text-gray-500">
                        {moment(appointment.dateDemande).format('HH:mm')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {moment(appointment.dateRealisee).format('DD/MM/YYYY')}
                      </div>
                      <div className="text-xs text-gray-500">
                        {moment(appointment.dateRealisee).format('HH:mm')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatStatus(appointment.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {appointment.duree}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {appointment.montant}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HistoriqueP;