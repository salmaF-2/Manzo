import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import { motion } from "framer-motion";

const PaiementP = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [filterDate, setFilterDate] = useState("");
  const [filterClient, setFilterClient] = useState("");
  const [filterStatus, setFilterStatus] = useState("tous");
  
  // Données de démonstration
  const [payments, setPayments] = useState([
    {
      id: 1,
      client: "Sophie Martin",
      date: "2023-05-15",
      amount: 120,
      service: "Nettoyage complet",
      method: "Espèces",
      status: "payé",
      invoice: true
    },
    {
      id: 2,
      client: "Jean Dupont",
      date: "2023-05-18",
      amount: 85,
      service: "Repassage",
      method: "Carte bancaire",
      status: "payé",
      invoice: true
    },
    {
      id: 3,
      client: "Marie Lambert",
      date: "2023-05-20",
      amount: 65,
      service: "Garde d'enfants",
      method: "PayPal",
      status: "en attente",
      invoice: false
    },
    {
      id: 4,
      client: "Thomas Leroy",
      date: "2023-05-22",
      amount: 150,
      service: "Bricolage",
      method: "À la livraison",
      status: "à payer",
      invoice: false
    },
  ]);

  const filteredPayments = payments.filter(payment => {
    return (
      (filterDate === "" || payment.date.includes(filterDate)) &&
      (filterClient === "" || payment.client.toLowerCase().includes(filterClient.toLowerCase())) &&
      (filterStatus === "tous" || payment.status === filterStatus)
    );
  });

  const totalAmount = filteredPayments.reduce((sum, payment) => sum + payment.amount, 0);

  const markAsPaid = (id) => {
    setPayments(payments.map(payment => 
      payment.id === id ? {...payment, status: "payé"} : payment
    ));
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
          💳 Historique des paiements
        </motion.h1>

        {/* Filtres */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-md p-6 mb-8"
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Filtrer les paiements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Date</label>
              <input
                type="date"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Client</label>
              <input
                type="text"
                placeholder="Rechercher par client"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                value={filterClient}
                onChange={(e) => setFilterClient(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Statut</label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-200 focus:outline-none"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="tous">Tous les statuts</option>
                <option value="payé">Payé</option>
                <option value="en attente">En attente</option>
                <option value="à payer">À payer</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Total des paiements */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#5869A3]/10 rounded-lg shadow-md p-4 mb-8"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium text-indigo-800">Total des paiements filtrés</h3>
              <p className="text-sm text-white-600">{filteredPayments.length} paiement(s)</p>
            </div>
            <div className="text-2xl font-bold text-indigo-900">{totalAmount} DH</div>
          </div>
        </motion.div>

        {/* Liste des paiements */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#5869A3]/10">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#4D6099] uppercase tracking-wider">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#4D6099] uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#4D6099] uppercase tracking-wider">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#4D6099] uppercase tracking-wider">Montant</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#4D6099] uppercase tracking-wider">Méthode</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#4D6099] uppercase tracking-wider">Statut</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#4D6099] uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPayments.length > 0 ? (
                  filteredPayments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{payment.client}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.service}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{payment.amount} €</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.method}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${payment.status === "payé" ? "bg-green-100 text-green-800" : 
                            payment.status === "en attente" ? "bg-yellow-100 text-yellow-800" : 
                            "bg-red-100 text-red-800"}`}>
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          {payment.invoice && (
                            <button className="text-indigo-600 hover:text-indigo-900">
                              Télécharger facture
                            </button>
                          )}
                          {payment.status !== "payé" && (
                            <button 
                              onClick={() => markAsPaid(payment.id)}
                              className="text-green-600 hover:text-green-900"
                            >
                              Marquer comme payé
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                      Aucun paiement trouvé avec ces critères
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Intégration future Stripe/PayPal */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-4 border-2 border-dashed border-gray-300 rounded-lg text-center"
        >
          <p className="text-gray-500 mb-2">Intégration future des paiements en ligne</p>
          <div className="flex justify-center space-x-4">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Configurer Stripe
            </button>
            <button className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">
              Configurer PayPal
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PaiementP;