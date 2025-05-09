import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheck, FiX, FiEye, FiCalendar, FiUser, FiTool, FiSearch } from "react-icons/fi";

const DemandesS = () => {
  const [demandes, setDemandes] = useState([
    {
      id: 1,
      nom: "Sara Benali",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      service: "Nettoyage à domicile",
      dateDemande: "2025-05-01",
      dateSouhaitee: "2025-05-10",
      status: "pending",
    },
    {
      id: 2,
      nom: "Youssef Karim",
      image: "https://randomuser.me/api/portraits/men/33.jpg",
      service: "Plomberie",
      dateDemande: "2025-05-03",
      dateSouhaitee: "2025-05-06",
      status: "pending",
    },
  ]);

  const [selectedId, setSelectedId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAccepter = (id) => {
    setDemandes(demandes.map(d => 
      d.id === id ? {...d, status: "accepted"} : d
    ));
  };

  const handleRefuser = (id) => {
    setDemandes(demandes.map(d => 
      d.id === id ? {...d, status: "rejected"} : d
    ));
  };

  const handleVoirDetails = (id) => {
    setSelectedId(id);
  };

  const filteredDemandes = demandes.filter(d => 
    (filter === "all" ? true : d.status === filter) &&
    (d.nom.toLowerCase().includes(searchTerm.toLowerCase()) || 
     d.service.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const selectedDemande = demandes.find(d => d.id === selectedId);

  return (
    <div className="flex bg-gradient-to-br from-[#BCD0EA50] to-indigo-50 min-h-[calc(100vh-5rem)] mt-20">
      <SideBar />
      
      <div className="flex-1 ml-60 p-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl font-bold text-gray-800">📌 Mes Demandes de Service</h1>
          <p className="text-gray-600 mb-6">Gérez les demandes de vos clients</p>
          
          <div className="flex justify-between items-center mb-8">
            <div className="relative w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input type="text" placeholder="Rechercher..." className="pl-10 pr-4 py-2 w-full rounded-full border border-[#5869A3] focus:outline-none focus:ring-2 focus:ring-[#5869A3] focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex space-x-2 bg-white p-1 rounded-full shadow-sm">
              {["all", "pending", "accepted", "rejected"].map((f) => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`px-4 py-1 text-sm rounded-full transition-all ${
                    filter === f ? "bg-[#5869A3] text-white": "text-white-100 hover:bg-[#5869A3]"}`}
                >
                  {f === "all" ? "Toutes" :  f === "pending" ? "En attente" : f === "accepted" ? "Acceptées" : "Refusées"}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid gap-6">
          <AnimatePresence>
            {filteredDemandes.length > 0 ? (
              filteredDemandes.map((demande) => (
                <motion.div
                  key={demande.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ type: "spring", damping: 25 }}
                  className={`bg-white rounded-2xl shadow-md overflow-hidden transition-all ${
                    demande.status === "accepted" 
                      ? "border-l-4 border-green-500" 
                      : demande.status === "rejected" 
                      ? "border-l-4 border-red-500" 
                      : "border-l-4 border-amber-500"
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <motion.div whileHover={{ scale: 1.05 }}>
                          <img
                            src={demande.image}
                            alt={demande.nom}
                            className="w-14 h-14 rounded-full object-cover border-2 border-white shadow"
                          />
                        </motion.div>
                        <div>
                          <h3 className="font-semibold text-lg">{demande.nom}</h3>
                          <div className="flex items-center text-gray-500 text-sm mt-1">
                            <FiTool className="mr-1" />
                            <span>{demande.service}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleAccepter(demande.id)}
                          className="flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition"
                        >
                          <FiCheck className="mr-2" />
                          Accepter
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleRefuser(demande.id)}
                          className="flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
                        >
                          <FiX className="mr-2" />
                          Refuser
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleVoirDetails(demande.id)}
                          className="flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition"
                        >
                          <FiEye className="mr-2" />
                          Détails
                        </motion.button>
                      </div>
                    </div>
                    
                    <div className="flex justify-between mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center text-gray-500">
                        <FiCalendar className="mr-2" />
                        <span>Demandé le: {demande.dateDemande}</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <FiCalendar className="mr-2" />
                        <span>Souhaité pour: {demande.dateSouhaitee}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-2xl shadow-sm p-8 text-center"
              >
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-600">
                  Aucune demande trouvée
                </h3>
                <p className="text-gray-500 mt-1">
                  {filter === "all" && searchTerm === ""
                    ? "Vous n'avez aucune demande pour le moment" 
                    : searchTerm !== ""
                    ? `Aucune demande ne correspond à "${searchTerm}"`
                    : `Aucune demande ${filter === "pending" ? "en attente" : filter === "accepted" ? "acceptée" : "refusée"}`}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Modal Détails */}
      <AnimatePresence>
        {selectedId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedDemande && (
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={selectedDemande.image}
                        alt={selectedDemande.nom}
                        className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
                      />
                      <h2 className="text-xl font-bold">{selectedDemande.nom}</h2>
                    </div>
                    <button
                      onClick={() => setSelectedId(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <FiX size={24} />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-medium text-blue-800 mb-2">Service demandé</h3>
                      <p className="text-blue-700">{selectedDemande.service}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-medium text-gray-800 mb-2">Date de demande</h3>
                        <p className="text-gray-700">{selectedDemande.dateDemande}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-medium text-gray-800 mb-2">Date souhaitée</h3>
                        <p className="text-gray-700">{selectedDemande.dateSouhaitee}</p>
                      </div>
                    </div>

                    <div className="flex space-x-3 pt-4">
                      <button
                        onClick={() => {
                          handleAccepter(selectedDemande.id);
                          setSelectedId(null);
                        }}
                        className="flex-1 flex items-center justify-center py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                      >
                        <FiCheck className="mr-2" />
                        Accepter
                      </button>
                      <button
                        onClick={() => {
                          handleRefuser(selectedDemande.id);
                          setSelectedId(null);
                        }}
                        className="flex-1 flex items-center justify-center py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                      >
                        <FiX className="mr-2" />
                        Refuser
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DemandesS;




//exemple de accepter anunuler refuser
// import React, { useEffect, useState } from "react";
// import SideBar from "./SideBar";
// import { motion, AnimatePresence } from "framer-motion";
// import { FiCheck, FiX, FiEye, FiCalendar, FiUser, FiTool, FiRotateCw } from "react-icons/fi";

// const DemandesS = () => {
//   const [demandes, setDemandes] = useState([
//     {
//       id: 1,
//       nom: "Sara Benali",
//       image: "https://randomuser.me/api/portraits/women/44.jpg",
//       service: "Nettoyage à domicile",
//       dateDemande: "2025-05-01",
//       dateSouhaitee: "2025-05-10",
//       status: "pending",
//       previousStatus: null,
//       details: "Nettoyage complet de l'appartement (3 pièces)"
//     },
//     {
//       id: 2,
//       nom: "Youssef Karim",
//       image: "https://randomuser.me/api/portraits/men/33.jpg",
//       service: "Plomberie",
//       dateDemande: "2025-05-03",
//       dateSouhaitee: "2025-05-06",
//       status: "pending",
//       previousStatus: null,
//       details: "Réparation d'un robinet qui fuit dans la cuisine"
//     },
//   ]);

//   const [selectedId, setSelectedId] = useState(null);
//   const [filter, setFilter] = useState("all");
//   const [showConfirmModal, setShowConfirmModal] = useState({
//     visible: false,
//     action: null,
//     id: null
//   });

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const handleAction = (id, action) => {
//     setDemandes(demandes.map(d => {
//       if (d.id === id) {
//         return {
//           ...d,
//           status: action === "accept" ? "accepted" : "rejected",
//           previousStatus: d.status
//         };
//       }
//       return d;
//     }));
//     setSelectedId(null);
//   };

//   const undoAction = (id) => {
//     setDemandes(demandes.map(d => {
//       if (d.id === id) {
//         return {
//           ...d,
//           status: d.previousStatus || "pending",
//           previousStatus: null
//         };
//       }
//       return d;
//     }));
//   };

//   const openConfirmModal = (id, action) => {
//     setShowConfirmModal({
//       visible: true,
//       action,
//       id
//     });
//   };

//   const closeConfirmModal = () => {
//     setShowConfirmModal({
//       visible: false,
//       action: null,
//       id: null
//     });
//   };

//   const filteredDemandes = demandes.filter(d => 
//     filter === "all" ? true : d.status === filter
//   );

//   const selectedDemande = demandes.find(d => d.id === selectedId);

//   const getStatusColor = (status) => {
//     switch(status) {
//       case "accepted": return "bg-green-100 text-green-800";
//       case "rejected": return "bg-red-100 text-red-800";
//       default: return "bg-amber-100 text-amber-800";
//     }
//   };

//   return (
//     <div className="flex bg-gradient-to-br from-[#f8fafc] to-[#f0f7ff] min-h-[calc(100vh-5rem)] mt-20">
//       <SideBar />
      
//       <div className="flex-1 ml-60 p-8">
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="flex justify-between items-center mb-8"
//         >
//           <h1 className="text-3xl font-bold text-gray-800">
//             Mes Demandes de Service
//           </h1>
          
//           <div className="flex space-x-2 bg-white p-1 rounded-full shadow-sm">
//             {["all", "pending", "accepted", "rejected"].map((f) => (
//               <button
//                 key={f}
//                 onClick={() => setFilter(f)}
//                 className={`px-4 py-1 text-sm rounded-full transition-all ${
//                   filter === f
//                     ? "bg-indigo-500 text-white"
//                     : "text-gray-600 hover:bg-gray-100"
//                 }`}
//               >
//                 {f === "all" ? "Toutes" : 
//                  f === "pending" ? "En attente" : 
//                  f === "accepted" ? "Acceptées" : "Refusées"}
//               </button>
//             ))}
//           </div>
//         </motion.div>

//         <div className="grid gap-6">
//           <AnimatePresence>
//             {filteredDemandes.length > 0 ? (
//               filteredDemandes.map((demande) => (
//                 <motion.div
//                   key={demande.id}
//                   layout
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, x: -50 }}
//                   transition={{ type: "spring", damping: 25 }}
//                   className={`bg-white rounded-2xl shadow-md overflow-hidden transition-all ${
//                     demande.status === "accepted" 
//                       ? "border-l-4 border-green-500" 
//                       : demande.status === "rejected" 
//                       ? "border-l-4 border-red-500" 
//                       : "border-l-4 border-amber-500"
//                   }`}
//                 >
//                   <div className="p-6">
//                     <div className="flex items-start justify-between">
//                       <div className="flex items-center space-x-4">
//                         <motion.div whileHover={{ scale: 1.05 }}>
//                           <img
//                             src={demande.image}
//                             alt={demande.nom}
//                             className="w-14 h-14 rounded-full object-cover border-2 border-white shadow"
//                           />
//                         </motion.div>
//                         <div>
//                           <h3 className="font-semibold text-lg">{demande.nom}</h3>
//                           <div className="flex items-center">
//                             <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(demande.status)} mr-2`}>
//                               {demande.status === "accepted" ? "Accepté" : demande.status === "rejected" ? "Refusé" : "En attente"}
//                             </span>
//                             {demande.previousStatus && (
//                               <motion.button
//                                 whileHover={{ scale: 1.1 }}
//                                 whileTap={{ scale: 0.9 }}
//                                 onClick={() => undoAction(demande.id)}
//                                 className="text-gray-500 hover:text-gray-700"
//                                 title="Annuler la dernière action"
//                               >
//                                 <FiRotateCw size={16} />
//                               </motion.button>
//                             )}
//                           </div>
//                           <div className="flex items-center text-gray-500 text-sm mt-1">
//                             <FiTool className="mr-1" />
//                             <span>{demande.service}</span>
//                           </div>
//                         </div>
//                       </div>
                      
//                       <div className="flex space-x-2">
//                         {demande.status === "pending" ? (
//                           <>
//                             <motion.button
//                               whileHover={{ scale: 1.05 }}
//                               whileTap={{ scale: 0.95 }}
//                               onClick={() => openConfirmModal(demande.id, "accept")}
//                               className="flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition"
//                             >
//                               <FiCheck className="mr-2" />
//                               Accepter
//                             </motion.button>
//                             <motion.button
//                               whileHover={{ scale: 1.05 }}
//                               whileTap={{ scale: 0.95 }}
//                               onClick={() => openConfirmModal(demande.id, "reject")}
//                               className="flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
//                             >
//                               <FiX className="mr-2" />
//                               Refuser
//                             </motion.button>
//                           </>
//                         ) : (
//                           <motion.button
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             onClick={() => undoAction(demande.id)}
//                             className="flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition"
//                           >
//                             <FiRotateCw className="mr-2" />
//                             Annuler
//                           </motion.button>
//                         )}
//                         <motion.button
//                           whileHover={{ scale: 1.05 }}
//                           whileTap={{ scale: 0.95 }}
//                           onClick={() => setSelectedId(demande.id)}
//                           className="flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition"
//                         >
//                           <FiEye className="mr-2" />
//                           Détails
//                         </motion.button>
//                       </div>
//                     </div>
                    
//                     <div className="flex justify-between mt-4 pt-4 border-t border-gray-100">
//                       <div className="flex items-center text-gray-500">
//                         <FiCalendar className="mr-2" />
//                         <span>Demandé le: {demande.dateDemande}</span>
//                       </div>
//                       <div className="flex items-center text-gray-500">
//                         <FiCalendar className="mr-2" />
//                         <span>Souhaité pour: {demande.dateSouhaitee}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))
//             ) : (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 className="bg-white rounded-2xl shadow-sm p-8 text-center"
//               >
//                 <div className="text-gray-400 mb-4">
//                   <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                   </svg>
//                 </div>
//                 <h3 className="text-lg font-medium text-gray-600">
//                   Aucune demande trouvée
//                 </h3>
//                 <p className="text-gray-500 mt-1">
//                   {filter === "all" 
//                     ? "Vous n'avez aucune demande pour le moment" 
//                     : `Aucune demande ${filter === "pending" ? "en attente" : filter === "accepted" ? "acceptée" : "refusée"}`}
//                 </p>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </div>

//       {/* Modal Détails */}
//       <AnimatePresence>
//         {selectedId && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
//             onClick={() => setSelectedId(null)}
//           >
//             <motion.div
//               initial={{ scale: 0.9, y: 50 }}
//               animate={{ scale: 1, y: 0 }}
//               exit={{ scale: 0.9, y: 50 }}
//               className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
//               onClick={(e) => e.stopPropagation()}
//             >
//               {selectedDemande && (
//                 <div className="p-6">
//                   <div className="flex justify-between items-start mb-4">
//                     <div className="flex items-center space-x-3">
//                       <img
//                         src={selectedDemande.image}
//                         alt={selectedDemande.nom}
//                         className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
//                       />
//                       <h2 className="text-xl font-bold">{selectedDemande.nom}</h2>
//                     </div>
//                     <button
//                       onClick={() => setSelectedId(null)}
//                       className="text-gray-400 hover:text-gray-600"
//                     >
//                       <FiX size={24} />
//                     </button>
//                   </div>

//                   <div className="space-y-4">
//                     <div className="bg-blue-50 p-4 rounded-lg">
//                       <h3 className="font-medium text-blue-800 mb-2">Service demandé</h3>
//                       <p className="text-blue-700">{selectedDemande.service}</p>
//                       <p className="text-blue-600 text-sm mt-2">{selectedDemande.details}</p>
//                     </div>

//                     <div className="grid grid-cols-2 gap-4">
//                       <div className="bg-gray-50 p-4 rounded-lg">
//                         <h3 className="font-medium text-gray-800 mb-2">Date de demande</h3>
//                         <p className="text-gray-700">{selectedDemande.dateDemande}</p>
//                       </div>
//                       <div className="bg-gray-50 p-4 rounded-lg">
//                         <h3 className="font-medium text-gray-800 mb-2">Date souhaitée</h3>
//                         <p className="text-gray-700">{selectedDemande.dateSouhaitee}</p>
//                       </div>
//                     </div>

//                     <div className="flex space-x-3 pt-4">
//                       {selectedDemande.status === "pending" ? (
//                         <>
//                           <button
//                             onClick={() => {
//                               openConfirmModal(selectedDemande.id, "accept");
//                               setSelectedId(null);
//                             }}
//                             className="flex-1 flex items-center justify-center py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
//                           >
//                             <FiCheck className="mr-2" />
//                             Accepter
//                           </button>
//                           <button
//                             onClick={() => {
//                               openConfirmModal(selectedDemande.id, "reject");
//                               setSelectedId(null);
//                             }}
//                             className="flex-1 flex items-center justify-center py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
//                           >
//                             <FiX className="mr-2" />
//                             Refuser
//                           </button>
//                         </>
//                       ) : (
//                         <button
//                           onClick={() => {
//                             undoAction(selectedDemande.id);
//                             setSelectedId(null);
//                           }}
//                           className="flex-1 flex items-center justify-center py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
//                         >
//                           <FiRotateCw className="mr-2" />
//                           Annuler
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Modal de confirmation */}
//       <AnimatePresence>
//         {showConfirmModal.visible && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
//           >
//             <motion.div
//               initial={{ scale: 0.9, y: 20 }}
//               animate={{ scale: 1, y: 0 }}
//               exit={{ scale: 0.9, y: 20 }}
//               className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full"
//             >
//               <h3 className="text-lg font-bold mb-4">
//                 {showConfirmModal.action === "accept" ? "Confirmer l'acceptation" : "Confirmer le refus"}
//               </h3>
//               <p className="text-gray-600 mb-6">
//                 Êtes-vous sûr de vouloir {showConfirmModal.action === "accept" ? "accepter" : "refuser"} cette demande ? 
//                 Vous pourrez annuler cette action ultérieurement.
//               </p>
//               <div className="flex justify-end space-x-3">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={closeConfirmModal}
//                   className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
//                 >
//                   Annuler
//                 </motion.button>
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => {
//                     handleAction(showConfirmModal.id, showConfirmModal.action);
//                     closeConfirmModal();
//                   }}
//                   className={`px-4 py-2 rounded-lg text-white ${
//                     showConfirmModal.action === "accept" 
//                       ? "bg-green-600 hover:bg-green-700" 
//                       : "bg-red-600 hover:bg-red-700"
//                   }`}
//                 >
//                   {showConfirmModal.action === "accept" ? "Confirmer" : "Refuser"}
//                 </motion.button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default DemandesS;




// design tableau
// import React, { useEffect, useState } from "react";
// import SideBar from "./SideBar";
// import { motion, AnimatePresence } from "framer-motion";
// import { FiCheck, FiX, FiEye, FiCalendar, FiUser, FiTool, FiChevronDown, FiChevronUp, FiRotateCw } from "react-icons/fi";

// const DemandesS = () => {
//   const [demandes, setDemandes] = useState([
//     {
//       id: 1,
//       nom: "Sara Benali",
//       image: "https://randomuser.me/api/portraits/women/44.jpg",
//       service: "Nettoyage à domicile",
//       dateDemande: "2025-05-01",
//       dateSouhaitee: "2025-05-10",
//       status: "pending",
//       details: "Nettoyage complet de l'appartement (3 pièces)",
//       previousStatus: null
//     },
//     {
//       id: 2,
//       nom: "Youssef Karim",
//       image: "https://randomuser.me/api/portraits/men/33.jpg",
//       service: "Plomberie",
//       dateDemande: "2025-05-03",
//       dateSouhaitee: "2025-05-06",
//       status: "pending",
//       details: "Réparation d'un robinet qui fuit dans la cuisine",
//       previousStatus: null
//     },
//   ]);

//   const [expandedRow, setExpandedRow] = useState(null);
//   const [sortConfig, setSortConfig] = useState({ key: "dateDemande", direction: "desc" });
//   const [showConfirmModal, setShowConfirmModal] = useState({ visible: false, action: null, id: null });

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const handleAction = (id, action) => {
//     setDemandes(demandes.map(d => {
//       if (d.id === id) {
//         return {
//           ...d,
//           status: action === "accept" ? "accepted" : "rejected",
//           previousStatus: d.status // Sauvegarde l'ancien statut
//         };
//       }
//       return d;
//     }));
//     setExpandedRow(null);
//   };

//   const undoAction = (id) => {
//     setDemandes(demandes.map(d => {
//       if (d.id === id) {
//         return {
//           ...d,
//           status: d.previousStatus || "pending", // Restaure l'ancien statut
//           previousStatus: null
//         };
//       }
//       return d;
//     }));
//   };

//   const handleSort = (key) => {
//     let direction = "asc";
//     if (sortConfig.key === key && sortConfig.direction === "asc") {
//       direction = "desc";
//     }
//     setSortConfig({ key, direction });
//   };

//   const sortedDemandes = [...demandes].sort((a, b) => {
//     if (a[sortConfig.key] < b[sortConfig.key]) {
//       return sortConfig.direction === "asc" ? -1 : 1;
//     }
//     if (a[sortConfig.key] > b[sortConfig.key]) {
//       return sortConfig.direction === "asc" ? 1 : -1;
//     }
//     return 0;
//   });

//   const getStatusColor = (status) => {
//     switch(status) {
//       case "accepted": return "bg-green-100 text-green-800";
//       case "rejected": return "bg-red-100 text-red-800";
//       default: return "bg-amber-100 text-amber-800";
//     }
//   };

//   const openConfirmModal = (id, action) => {
//     setShowConfirmModal({
//       visible: true,
//       action,
//       id
//     });
//   };

//   const closeConfirmModal = () => {
//     setShowConfirmModal({ visible: false, action: null, id: null });
//   };

//   return (
//     <div className="flex bg-gradient-to-br from-[#f8fafc] to-[#f0f7ff] min-h-[calc(100vh-5rem)] mt-20">
//       <SideBar />
      
//       <div className="flex-1 ml-60 p-8">
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="mb-8"
//         >
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">
//             Demandes de Service
//           </h1>
//           <p className="text-gray-600">Gérez les demandes de vos clients</p>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.2 }}
//           className="bg-white rounded-2xl shadow-md overflow-hidden"
//         >
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th 
//                     scope="col" 
//                     className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                     onClick={() => handleSort("nom")}
//                   >
//                     <div className="flex items-center">
//                       Client
//                       {sortConfig.key === "nom" && (
//                         sortConfig.direction === "asc" ? 
//                         <FiChevronUp className="ml-1" /> : 
//                         <FiChevronDown className="ml-1" />
//                       )}
//                     </div>
//                   </th>
//                   <th 
//                     scope="col" 
//                     className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                     onClick={() => handleSort("service")}
//                   >
//                     <div className="flex items-center">
//                       Service
//                       {sortConfig.key === "service" && (
//                         sortConfig.direction === "asc" ? 
//                         <FiChevronUp className="ml-1" /> : 
//                         <FiChevronDown className="ml-1" />
//                       )}
//                     </div>
//                   </th>
//                   <th 
//                     scope="col" 
//                     className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                     onClick={() => handleSort("dateDemande")}
//                   >
//                     <div className="flex items-center">
//                       Date demande
//                       {sortConfig.key === "dateDemande" && (
//                         sortConfig.direction === "asc" ? 
//                         <FiChevronUp className="ml-1" /> : 
//                         <FiChevronDown className="ml-1" />
//                       )}
//                     </div>
//                   </th>
//                   <th 
//                     scope="col" 
//                     className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
//                     onClick={() => handleSort("dateSouhaitee")}
//                   >
//                     <div className="flex items-center">
//                       Date souhaitée
//                       {sortConfig.key === "dateSouhaitee" && (
//                         sortConfig.direction === "asc" ? 
//                         <FiChevronUp className="ml-1" /> : 
//                         <FiChevronDown className="ml-1" />
//                       )}
//                     </div>
//                   </th>
//                   <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Statut
//                   </th>
//                   <th scope="col" className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 <AnimatePresence>
//                   {sortedDemandes.map((demande) => (
//                     <React.Fragment key={demande.id}>
//                       <motion.tr 
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         className="hover:bg-gray-50 transition-colors"
//                       >
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="flex items-center">
//                             <div className="flex-shrink-0 h-10 w-10">
//                               <img className="h-10 w-10 rounded-full object-cover" src={demande.image} alt={demande.nom} />
//                             </div>
//                             <div className="ml-4">
//                               <div className="text-sm font-medium text-gray-900">{demande.nom}</div>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm text-gray-900">{demande.service}</div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm text-gray-500">{demande.dateDemande}</div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm text-gray-500">{demande.dateSouhaitee}</div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="flex items-center">
//                             <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(demande.status)}`}>
//                               {demande.status === "accepted" ? "Accepté" : demande.status === "rejected" ? "Refusé" : "En attente"}
//                             </span>
//                             {demande.previousStatus && (
//                               <motion.button
//                                 initial={{ opacity: 0, scale: 0.8 }}
//                                 animate={{ opacity: 1, scale: 1 }}
//                                 whileHover={{ scale: 1.1 }}
//                                 whileTap={{ scale: 0.9 }}
//                                 onClick={() => undoAction(demande.id)}
//                                 className="ml-2 text-gray-500 hover:text-gray-700 transition-colors"
//                                 title="Annuler la dernière action"
//                               >
//                                 <FiRotateCw size={14} />
//                               </motion.button>
//                             )}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                           <div className="flex justify-end space-x-2">
//                             {demande.status === "pending" ? (
//                               <>
//                                 <motion.button
//                                   whileHover={{ scale: 1.05 }}
//                                   whileTap={{ scale: 0.95 }}
//                                   onClick={() => openConfirmModal(demande.id, "accept")}
//                                   className="text-green-600 hover:text-green-900"
//                                 >
//                                   <FiCheck size={18} />
//                                 </motion.button>
//                                 <motion.button
//                                   whileHover={{ scale: 1.05 }}
//                                   whileTap={{ scale: 0.95 }}
//                                   onClick={() => openConfirmModal(demande.id, "reject")}
//                                   className="text-red-600 hover:text-red-900"
//                                 >
//                                   <FiX size={18} />
//                                 </motion.button>
//                               </>
//                             ) : (
//                               <motion.button
//                                 whileHover={{ scale: 1.05 }}
//                                 whileTap={{ scale: 0.95 }}
//                                 onClick={() => undoAction(demande.id)}
//                                 className="text-blue-600 hover:text-blue-900"
//                                 title="Annuler la dernière action"
//                               >
//                                 <FiRotateCw size={18} />
//                               </motion.button>
//                             )}
//                             <motion.button
//                               whileHover={{ scale: 1.05 }}
//                               whileTap={{ scale: 0.95 }}
//                               onClick={() => setExpandedRow(expandedRow === demande.id ? null : demande.id)}
//                               className="text-blue-600 hover:text-blue-900"
//                             >
//                               {expandedRow === demande.id ? <FiChevronUp size={18} /> : <FiEye size={18} />}
//                             </motion.button>
//                           </div>
//                         </td>
//                       </motion.tr>

//                       {/* Expanded Row */}
//                       <AnimatePresence>
//                         {expandedRow === demande.id && (
//                           <motion.tr
//                             initial={{ opacity: 0, height: 0 }}
//                             animate={{ opacity: 1, height: "auto" }}
//                             exit={{ opacity: 0, height: 0 }}
//                             transition={{ duration: 0.3 }}
//                             className="bg-gray-50"
//                           >
//                             <td colSpan="6" className="px-6 py-4">
//                               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                                 <div className="col-span-2">
//                                   <h4 className="text-sm font-medium text-gray-700 mb-2">Détails de la demande</h4>
//                                   <p className="text-sm text-gray-600">{demande.details}</p>
//                                 </div>
//                                 <div>
//                                   <h4 className="text-sm font-medium text-gray-700 mb-2">Actions</h4>
//                                   <div className="flex flex-wrap gap-2">
//                                     {demande.status === "pending" ? (
//                                       <>
//                                         <motion.button
//                                           whileHover={{ scale: 1.05 }}
//                                           whileTap={{ scale: 0.95 }}
//                                           onClick={() => openConfirmModal(demande.id, "accept")}
//                                           className="flex items-center px-3 py-1 bg-green-100 text-green-700 rounded text-sm"
//                                         >
//                                           <FiCheck className="mr-1" /> Accepter
//                                         </motion.button>
//                                         <motion.button
//                                           whileHover={{ scale: 1.05 }}
//                                           whileTap={{ scale: 0.95 }}
//                                           onClick={() => openConfirmModal(demande.id, "reject")}
//                                           className="flex items-center px-3 py-1 bg-red-100 text-red-700 rounded text-sm"
//                                         >
//                                           <FiX className="mr-1" /> Refuser
//                                         </motion.button>
//                                       </>
//                                     ) : (
//                                       <motion.button
//                                         whileHover={{ scale: 1.05 }}
//                                         whileTap={{ scale: 0.95 }}
//                                         onClick={() => undoAction(demande.id)}
//                                         className="flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm"
//                                       >
//                                         <FiRotateCw className="mr-1" /> Annuler
//                                       </motion.button>
//                                     )}
//                                     <motion.button
//                                       whileHover={{ scale: 1.05 }}
//                                       whileTap={{ scale: 0.95 }}
//                                       onClick={() => setExpandedRow(null)}
//                                       className="flex items-center px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm"
//                                     >
//                                       <FiX className="mr-1" /> Fermer
//                                     </motion.button>
//                                   </div>
//                                 </div>
//                               </div>
//                             </td>
//                           </motion.tr>
//                         )}
//                       </AnimatePresence>
//                     </React.Fragment>
//                   ))}
//                 </AnimatePresence>
//               </tbody>
//             </table>
//           </div>

//           {demandes.length === 0 && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="p-8 text-center"
//             >
//               <div className="text-gray-400 mb-4">
//                 <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                 </svg>
//               </div>
//               <h3 className="text-lg font-medium text-gray-600">
//                 Aucune demande trouvée
//               </h3>
//               <p className="text-gray-500 mt-1">
//                 Vous n'avez aucune demande pour le moment
//               </p>
//             </motion.div>
//           )}
//         </motion.div>
//       </div>

//       {/* Modal de confirmation */}
//       <AnimatePresence>
//         {showConfirmModal.visible && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
//           >
//             <motion.div
//               initial={{ scale: 0.9, y: 20 }}
//               animate={{ scale: 1, y: 0 }}
//               exit={{ scale: 0.9, y: 20 }}
//               className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full"
//             >
//               <h3 className="text-lg font-bold mb-4">
//                 {showConfirmModal.action === "accept" ? "Confirmer l'acceptation" : "Confirmer le refus"}
//               </h3>
//               <p className="text-gray-600 mb-6">
//                 Êtes-vous sûr de vouloir {showConfirmModal.action === "accept" ? "accepter" : "refuser"} cette demande ? 
//                 Cette action peut être annulée ultérieurement.
//               </p>
//               <div className="flex justify-end space-x-3">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={closeConfirmModal}
//                   className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
//                 >
//                   Annuler
//                 </motion.button>
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => {
//                     handleAction(showConfirmModal.id, showConfirmModal.action);
//                     closeConfirmModal();
//                   }}
//                   className={`px-4 py-2 rounded-lg text-white ${
//                     showConfirmModal.action === "accept" 
//                       ? "bg-green-600 hover:bg-green-700" 
//                       : "bg-red-600 hover:bg-red-700"
//                   }`}
//                 >
//                   {showConfirmModal.action === "accept" ? "Confirmer" : "Refuser"}
//                 </motion.button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default DemandesS;