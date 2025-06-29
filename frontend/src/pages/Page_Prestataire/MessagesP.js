// import React, { useEffect, useState, useRef } from "react";
// import SideBar from "./SideBar";
// import { motion, AnimatePresence } from "framer-motion";
// import { MoreVertical, Paperclip, Send, Search, ChevronDown, Pin, Trash2, X, Image, Video, FileText } from "lucide-react";

// const MessagesP = () => {
//   const [showOptions, setShowOptions] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [activeConversation, setActiveConversation] = useState(0);
//   const [newMessage, setNewMessage] = useState("");
//   const [showFileOptions, setShowFileOptions] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [filePreview, setFilePreview] = useState(null);
//   const fileInputRef = useRef(null);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const conversations = [
//     {
//       id: 0,
//       name: "Sarah Johnson",
//       avatar: "https://i.pravatar.cc/150?img=1",
//       lastMessage: "Bonjour, je voudrais prendre rendez-vous...",
//       time: "Il y a 5 min",
//       online: true,
//       messages: [
//         { text: "Bonjour, je voudrais prendre rendez-vous pour une consultation la semaine prochaine.", time: "10:30", sent: false },
//         { text: "Bien sûr! Je suis disponible mardi et jeudi après-midi. Quelle heure vous conviendrait le mieux?", time: "10:32", sent: true },
//         { text: "Mardi à 14h serait parfait pour moi.", time: "10:35", sent: false }
//       ]
//     },
//     {
//       id: 1,
//       name: "Michael Brown",
//       avatar: "https://i.pravatar.cc/150?img=2",
//       lastMessage: "Merci pour votre réponse rapide...",
//       time: "Hier",
//       online: false,
//       messages: [
//         { text: "Bonjour Docteur, j'ai une question concernant mon traitement.", time: "09:15", sent: false },
//         { text: "Bien sûr Michael, de quoi s'agit-il?", time: "09:20", sent: true }
//       ]
//     },
//     {
//       id: 2,
//       name: "Emma Wilson",
//       avatar: "https://i.pravatar.cc/150?img=3",
//       lastMessage: "Est-ce possible de modifier mon rendez-vous...",
//       time: "28 Jan",
//       online: true,
//       messages: [
//         { text: "Bonjour, j'aimerais modifier mon rendez-vous du 15 février.", time: "14:45", sent: false },
//         { text: "Je peux vous proposer le 17 février à la même heure.", time: "15:00", sent: true }
//       ]
//     }
//   ];

//   const filteredConversations = conversations.filter(conv => 
//     conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleFileSelect = (type) => {
//     fileInputRef.current.accept = type === 'image' ? 'image/*' : 
//                                  type === 'video' ? 'video/*' : 
//                                  '.pdf,.doc,.docx,.txt';
//     fileInputRef.current.click();
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedFile(file);
      
//       // Create preview for images
//       if (file.type.startsWith('image/')) {
//         const reader = new FileReader();
//         reader.onload = (event) => {
//           setFilePreview(event.target.result);
//         };
//         reader.readAsDataURL(file);
//       } else {
//         setFilePreview(null);
//       }
      
//       setShowFileOptions(false);
//     }
//   };

//   const handleSendMessage = () => {
//     if (newMessage.trim() === "" && !selectedFile) return;
    
//     const updatedConversations = [...conversations];
//     updatedConversations[activeConversation].messages.push({
//       text: newMessage,
//       time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
//       sent: true,
//       file: selectedFile ? {
//         name: selectedFile.name,
//         type: selectedFile.type,
//         size: selectedFile.size,
//         preview: filePreview
//       } : null
//     });
    
//     setNewMessage("");
//     setSelectedFile(null);
//     setFilePreview(null);
//   };

//   const renderFilePreview = (file) => {
//     if (!file) return null;
    
//     if (file.type.startsWith('image/')) {
//       return (
//         <div className="mt-2 max-w-xs">
//           <img 
//             src={file.preview} 
//             alt="Preview" 
//             className="rounded-lg border border-gray-200 max-h-40 object-cover"
//           />
//         </div>
//       );
//     }
    
//     return (
//       <div className="mt-2 p-3 bg-gray-100 rounded-lg border border-gray-200 flex items-center">
//         <FileText className="text-blue-600 mr-2" size={20} />
//         <div className="truncate">
//           <p className="font-medium truncate">{file.name}</p>
//           <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="flex bg-gradient-to-br from-[#BCD0EA50] to-indigo-50 min-h-[calc(100vh-5rem)] mt-20">
//       <SideBar />

//       <div className="flex-1 ml-60 p-6 mt-4">
//         <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="text-3xl font-bold mb-8 text-gray-800">
//           💬 Messages
//         </motion.h1>

//         <motion.div
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//           className="relative mb-8 w-full max-w-4xl"
//         >
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Search className="text-gray-400" size={20} />
//           </div>
//           <input
//             type="text"
//             placeholder="Rechercher des conversations..."
//             className="w-full pl-10 pr-10 py-3 rounded-xl border-0 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 transition-all duration-300"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           {searchQuery && (
//             <motion.button 
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setSearchQuery("")}
//               className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-blue-600 transition-colors"
//             >
//               <X className="text-gray-400 hover:text-gray-600" size={20} />
//             </motion.button>
//           )}
//         </motion.div>

//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.3 }}
//           className="bg-white rounded-2xl shadow-lg flex h-[600px] overflow-hidden border border-gray-100"
//         >
//           <div className="w-1/3 border-r border-gray-100 flex flex-col">
//             <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
//               <h3 className="font-semibold text-gray-700">Toutes les conversations</h3>
//               <ChevronDown className="text-gray-400" size={18} />
//             </div>

//             <div className="flex-1 overflow-y-auto">
//               <AnimatePresence>
//                 {filteredConversations.length > 0 ? (
//                   filteredConversations.map((conversation) => (
//                     <motion.div
//                       key={conversation.id}
//                       initial={{ opacity: 0, x: -10 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       exit={{ opacity: 0, x: -10 }}
//                       transition={{ duration: 0.2 }}
//                       onClick={() => {
//                         setActiveConversation(conversation.id);
//                         setSelectedFile(null);
//                         setFilePreview(null);
//                       }}
//                       className={`flex items-center gap-3 p-4 cursor-pointer transition-all duration-200 ${
//                         activeConversation === conversation.id 
//                           ? 'bg-blue-50 border-l-4 border-blue-500' 
//                           : 'hover:bg-gray-50 border-l-4 border-transparent'
//                       }`}
//                     >
//                       <div className="relative">
//                         <img
//                           src={conversation.avatar}
//                           alt="avatar"
//                           className="w-12 h-12 rounded-full object-cover shadow-sm"
//                         />
//                         {conversation.online && (
//                           <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
//                         )}
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <div className="flex justify-between items-center">
//                           <h4 className="font-semibold truncate">{conversation.name}</h4>
//                           <span className="text-xs text-gray-400 whitespace-nowrap ml-2">{conversation.time}</span>
//                         </div>
//                         <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
//                       </div>
//                     </motion.div>
//                   ))
//                 ) : (
//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     className="p-4 text-center text-gray-500"
//                   >
//                     Aucune conversation trouvée
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           </div>

//           <div className="flex-1 flex flex-col">
//             <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50">
//               <div className="flex items-center gap-3">
//                 <div className="relative">
//                   <img
//                     src={conversations[activeConversation].avatar}
//                     alt="avatar"
//                     className="w-10 h-10 rounded-full object-cover shadow-sm"
//                   />
//                   {conversations[activeConversation].online && (
//                     <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
//                   )}
//                 </div>
//                 <div>
//                   <h4 className="font-semibold">{conversations[activeConversation].name}</h4>
//                   <p className={`text-xs ${conversations[activeConversation].online ? 'text-green-500' : 'text-gray-500'}`}>
//                     {conversations[activeConversation].online ? 'En ligne' : 'Hors ligne'}
//                   </p>
//                 </div>
//               </div>
//               <div className="relative">
//                 <button
//                   onClick={() => setShowOptions((prev) => !prev)}
//                   className="p-2 rounded-full hover:bg-gray-200 transition-colors"
//                 >
//                   <MoreVertical className="text-gray-600" size={20} />
//                 </button>
//                 <AnimatePresence>
//                   {showOptions && (
//                     <motion.div
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -10 }}
//                       transition={{ duration: 0.2 }}
//                       className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10 overflow-hidden border border-gray-200"
//                     >
//                       <button className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors">
//                         <Pin className="mr-2" size={16} />
//                         Épingler
//                       </button>
//                       <button className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 transition-colors">
//                         <Trash2 className="mr-2" size={16} />
//                         Supprimer
//                       </button>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             </div>

//             <div className="flex-1 p-6 overflow-y-auto bg-gradient-to-b from-white to-blue-50">
//               <div className="space-y-4">
//                 <AnimatePresence>
//                   {conversations[activeConversation].messages.map((message, index) => (
//                     <motion.div
//                       key={index}
//                       initial={{ opacity: 0, y: message.sent ? 10 : -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.3 }}
//                       className={`flex ${message.sent ? 'justify-end' : 'justify-start'}`}
//                     >
//                       <motion.div
//                         whileHover={{ scale: 1.02 }}
//                         className={`max-w-[75%] p-4 rounded-2xl shadow-sm ${
//                           message.sent 
//                             ? 'bg-blue-600 text-white rounded-tr-none' 
//                             : 'bg-white border border-gray-200 rounded-tl-none'
//                         }`}
//                       >
//                         <p>{message.text}</p>
//                         {message.file && renderFilePreview(message.file)}
//                         <div className={`text-xs mt-1 text-right ${
//                           message.sent ? 'text-blue-100' : 'text-gray-500'
//                         }`}>
//                           {message.time}
//                         </div>
//                       </motion.div>
//                     </motion.div>
//                   ))}
//                 </AnimatePresence>
//               </div>
//             </div>

//             <div className="border-t border-gray-100 p-4 bg-white">
//               <motion.div 
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.4 }}
//                 className="flex items-center gap-2"
//               >
//                 <div className="relative">
//                   <button 
//                     onClick={() => setShowFileOptions(!showFileOptions)}
//                     className="text-gray-500 hover:text-blue-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
//                   >
//                     <Paperclip size={20} />
//                   </button>
                  
//                   <AnimatePresence>
//                     {showFileOptions && (
//                       <motion.div
//                         initial={{ opacity: 0, y: -10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         exit={{ opacity: 0, y: -10 }}
//                         className="absolute bottom-full left-0 mb-2 bg-white shadow-lg rounded-md z-10 overflow-hidden border border-gray-200"
//                       >
//                         <button 
//                           onClick={() => handleFileSelect('image')}
//                           className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
//                         >
//                           <Image className="mr-2" size={16} />
//                           Image
//                         </button>
//                         <button 
//                           onClick={() => handleFileSelect('video')}
//                           className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
//                         >
//                           <Video className="mr-2" size={16} />
//                           Vidéo
//                         </button>
//                         <button 
//                           onClick={() => handleFileSelect('document')}
//                           className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
//                         >
//                           <FileText className="mr-2" size={16} />
//                           Document
//                         </button>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
                  
//                   <input
//                     type="file"
//                     ref={fileInputRef}
//                     onChange={handleFileChange}
//                     className="hidden"
//                   />
//                 </div>

//                 <input
//                   type="text"
//                   placeholder="Écrivez votre message..."
//                   className="flex-1 px-4 py-3 border-0 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 transition-all"
//                   value={newMessage}
//                   onChange={(e) => setNewMessage(e.target.value)}
//                   onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//                 />
//                 <button 
//                   onClick={handleSendMessage}
//                   disabled={!newMessage.trim() && !selectedFile}
//                   className={`p-2 rounded-full transition-all ${
//                     newMessage.trim() || selectedFile
//                       ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
//                       : 'bg-gray-200 text-gray-400 cursor-not-allowed'
//                   }`}
//                 >
//                   <Send size={20} />
//                 </button>
//               </motion.div>
              
//               {selectedFile && (
//                 <motion.div
//                   initial={{ opacity: 0, height: 0 }}
//                   animate={{ opacity: 1, height: 'auto' }}
//                   className="mt-2 flex items-center justify-between bg-blue-50 p-2 rounded-lg"
//                 >
//                   <div className="flex items-center">
//                     <Paperclip className="text-blue-600 mr-2" size={16} />
//                     <span className="text-sm truncate max-w-xs">{selectedFile.name}</span>
//                   </div>
//                   <button 
//                     onClick={() => {
//                       setSelectedFile(null);
//                       setFilePreview(null);
//                     }}
//                     className="text-gray-500 hover:text-red-500"
//                   >
//                     <X size={16} />
//                   </button>
//                 </motion.div>
//               )}
              
//               {filePreview && selectedFile?.type.startsWith('image/') && (
//                 <motion.div
//                   initial={{ opacity: 0, height: 0 }}
//                   animate={{ opacity: 1, height: 'auto' }}
//                   className="mt-2"
//                 >
//                   <img 
//                     src={filePreview} 
//                     alt="Preview" 
//                     className="rounded-lg border border-gray-200 max-h-40 object-cover"
//                   />
//                 </motion.div>
//               )}
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default MessagesP;




import React, { useEffect, useState, useRef } from "react";
import SideBar from "./SideBar";
import { motion, AnimatePresence } from "framer-motion";
import { MoreVertical, Paperclip, Send, Search, ChevronDown, Pin, Trash2, X, Image, Video, FileText } from "lucide-react";
import axios from "axios";
import io from "socket.io-client";
import { jwtDecode } from 'jwt-decode';

const MessagesP = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeConversation, setActiveConversation] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [showFileOptions, setShowFileOptions] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [currentMessages, setCurrentMessages] = useState([]);
  const [currentParticipant, setCurrentParticipant] = useState(null);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasFetchedInitialData, setHasFetchedInitialData] = useState(false);
  
  const fileInputRef = useRef(null);
  const socket = useRef(null);
  const messagesEndRef = useRef(null);
const [userId, setUserId] = useState(null);
  // Connect to Socket.IO

  useEffect(() => {
    socket.current = io("http://localhost:5000", {
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (token) {
      // Décoder le token pour obtenir l'ID utilisateur
      const decoded = jwtDecode(token); // Vous aurez besoin de 'jwt-decode'
      setUserId(decoded.userId);
    }
        
        // Fetch conversations
        const convResponse = await axios.get("http://localhost:5000/api/messages/conversations", {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Filter out invalid conversations
        const validConversations = convResponse.data.filter(conv => conv.participant);
        setConversations(validConversations);
        
        // If there are conversations, load the first one by default
        if (validConversations.length > 0 && !activeConversation) {
          handleConversationSelect(validConversations[0]);
        }
        
        setHasFetchedInitialData(true);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Only fetch if we haven't already
    if (!hasFetchedInitialData) {
      fetchInitialData();
    }
    socket.current.on("newMessage", (message) => {
      if (message.conversationId === activeConversation?._id) {

        const receivedMessage = {
          ...message,
          sent: message.senderId === userId // Comparez avec l'ID de l'utilisateur actuel
        };
        setCurrentMessages(prev => {
          const messageExists = prev.some(msg => msg.id === message.id);
          if (!messageExists && message.conversationId === activeConversation?._id) {
            return [...prev, {
              ...message,
              sent: message.senderId === userId
            }];
          }
          return prev;
        });
      }
      
      // Update last message in conversations list
      setConversations(prev => prev.map(conv => {
        if (conv._id === message.conversationId) {
          return {
            ...conv,
            lastMessage: message.text || (message.file ? "Fichier" : "Message"),
            lastMessageTime: message.time
          };
        }
        return conv;
      }));
    });


    socket.current.on("userStatusChanged", ({ userId, online }) => {
      setConversations(prev => prev.map(conv => {
        if (conv.participant._id === userId) {
          return { 
            ...conv, 
            participant: { 
              ...conv.participant, 
              online 
            } 
          };
        }
        return conv;
      }));
      
      if (currentParticipant?._id === userId) {
        setCurrentParticipant(prev => ({
          ...prev,
          online
        }));
      }
    });

    return () => {
      socket.current.disconnect();
    };
    }, [activeConversation, hasFetchedInitialData]);

    const handleConversationSelect = async (conversation) => {
      setActiveConversation(conversation);
      setIsLoading(true);
      
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/api/messages/conversations/${conversation._id}/messages`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        setCurrentMessages(response.data.messages);
        setCurrentParticipant(response.data.participant);
        
        // Join conversation room
        socket.current.emit("joinConversation", conversation._id);
        
        // Mark as read (optional)
        // await axios.patch(`/api/conversations/${conversation._id}/read`, {}, { headers });
      } catch (error) {
        console.error("Error loading conversation:", error);
      } finally {
        setIsLoading(false);
      }
  };

  // Fetch conversations
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/messages/conversations", {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Filtrer les conversations sans participant
        const validConversations = response.data.filter(conv => conv.participant);
        setConversations(validConversations);
        
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };
    fetchConversations();
  }, []);
  // Fetch messages when conversation changes
  useEffect(() => {
    if (activeConversation) {
      const fetchMessages = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `http://localhost:5000/api/messages/conversations/${activeConversation._id}/messages`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setCurrentMessages(response.data.messages);
          setCurrentParticipant(response.data.participant);
          
          socket.current.emit("joinConversation", activeConversation._id);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      };

      fetchMessages();
    }
  }, [activeConversation]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages]);

  
  const handleSearch = async (query) => {
      if (query.length < 2) {
        setShowSearchResults(false);
        return;
      }
      
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/api/messages/users/search?query=${query}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSearchResults(response.data);
        setShowSearchResults(true);
      } catch (error) {
        console.error("Search error:", error);
        setShowSearchResults(false);
      }
    };
  const startNewConversation = async (user) => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          `http://localhost:5000/api/messages/conversations/${user._id}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        const newConversation = {
          _id: response.data.conversationId,
          participant: response.data.recipient,
          lastMessage: "Nouvelle conversation",
          lastMessageTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        setConversations(prev => [newConversation, ...prev]);
        handleConversationSelect(newConversation);
        
        setSearchQuery("");
        setSearchResults([]);
        setShowSearchResults(false);
      } catch (error) {
        console.error("Error starting conversation:", error);
        alert("Impossible de démarrer une conversation : " + error.message);
      }
  };
  const handleFileSelect = (type) => {
    fileInputRef.current.accept = type === 'image' ? 'image/*' : 
                                 type === 'video' ? 'video/*' : 
                                 '.pdf,.doc,.docx,.txt';
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setFilePreview(event.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        setFilePreview(null);
      }
      
      setShowFileOptions(false);
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === "" && !selectedFile) return;
    
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("content", newMessage);
      if (selectedFile) {
        formData.append("file", selectedFile);
      }

      const response = await axios.post(
        `http://localhost:5000/api/messages/conversations/${activeConversation._id}/messages`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      // Marquez explicitement le message comme envoyé
      const sentMessage = {
        ...response.data,
        sent: true // Forcez ce flag à true pour les messages envoyés
      };

      setCurrentMessages(prev => [...prev, sentMessage]);
      setNewMessage("");
      setSelectedFile(null);
      setFilePreview(null);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  const renderFilePreview = (file) => {
    if (!file) return null;
    
    if (file.type.startsWith('image/')) {
      return (
        <div className="mt-2 max-w-xs">
          <img 
            src={file.url} 
            alt="Preview" 
            className="rounded-lg border border-gray-200 max-h-40 object-cover"
          />
        </div>
      );
    }
    
    return (
      <div className="mt-2 p-3 bg-gray-100 rounded-lg border border-gray-200 flex items-center">
        <FileText className="text-blue-600 mr-2" size={20} />
        <div className="truncate">
          <p className="font-medium truncate">{file.name}</p>
          <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
        </div>
      </div>
    );
  };

 const filteredConversations = conversations.filter(conv => {
  const participantName = conv.participant?.name?.toLowerCase() || '';
  const lastMsg = conv.lastMessage?.toLowerCase() || '';
  return participantName.includes(searchQuery.toLowerCase()) || 
         lastMsg.includes(searchQuery.toLowerCase());
});

  return (
    <div className="flex bg-gradient-to-br from-[#BCD0EA50] to-indigo-50 min-h-[calc(100vh-5rem)] mt-20">
      <SideBar />

      <div className="flex-1 ml-60 p-6 mt-4">
        <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="text-3xl font-bold mb-8 text-gray-800">
          💬 Messages
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative mb-8 w-full max-w-4xl"
        >
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="text-gray-400" size={20} />
          </div>
          <input
            type="text"
            placeholder="Rechercher des clients..."
            className="w-full pl-10 pr-10 py-3 rounded-xl border-0 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 transition-all duration-300"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              handleSearch(e.target.value);
            }}
          />
          {searchQuery && (
            <button 
              onClick={() => {
                setSearchQuery("");
                setShowSearchResults(false);
              }}
              className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-blue-600 transition-colors"
            >
              <X className="text-gray-400 hover:text-gray-600" size={20} />
            </button>
          )}
          
         
    
          {showSearchResults && searchQuery.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md max-h-60 overflow-y-auto border border-gray-200"
            >
              {searchResults.length > 0 ? (
                searchResults
                  .filter(user => !conversations.some(conv => conv.participant?._id === user._id))
                  .map(user => (
                    <div 
                      key={user._id}
                      className="p-3 hover:bg-gray-100 cursor-pointer flex items-center"
                      onClick={() => startNewConversation(user._id)}
                    >
                      <img 
                        src={user.photo ? `http://localhost:5000${user.photo}` : 'https://i.pravatar.cc/150?img=0'}
                        alt={user.nom}
                        className="w-8 h-8 rounded-full mr-3"
                      />
                      <div>
                        <p className="font-medium">{user.prenom} {user.nom}</p>
                        <p className="text-xs text-gray-500">
                          {user.role === 'prestataire' ? 'Prestataire' : 'Client'} • 
                          {user.online ? ' En ligne' : ' Hors ligne'}
                        </p>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="p-3 text-gray-500">Aucun résultat trouvé</div>
              )}
            </motion.div>
          )}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg flex h-[600px] overflow-hidden border border-gray-100"
        >
          <div className="w-1/3 border-r border-gray-100 flex flex-col">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="font-semibold text-gray-700">Toutes les conversations</h3>
              <ChevronDown className="text-gray-400" size={18} />
            </div>

            <div className="flex-1 overflow-y-auto">
              <AnimatePresence>
                {filteredConversations.length > 0 ? (
                  filteredConversations.map((conversation) => (
                    <motion.div
                      key={conversation._id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => setActiveConversation(conversation)}
                      className={`flex items-center gap-3 p-4 cursor-pointer transition-all duration-200 ${
                        activeConversation?._id === conversation._id 
                          ? 'bg-blue-50 border-l-4 border-blue-500' 
                          : 'hover:bg-gray-50 border-l-4 border-transparent'
                      }`}
                    >
                      <div className="relative">
                        <img
                          src={conversation.participant?.avatar || 'https://i.pravatar.cc/150?img=0'}
                          alt="avatar"
                          className="w-12 h-12 rounded-full object-cover shadow-sm"
                        />
                        {conversation.participant?.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <h4 className="font-semibold truncate">
                            {conversation.participant?.name || 'Utilisateur inconnu'}
                          </h4>
                          <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                            {conversation.lastMessageTime}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 truncate">
                          {conversation.lastMessage || 'Aucun message'}
                        </p>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-4 text-center text-gray-500"
                  >
                    Aucune conversation trouvée
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex-1 flex flex-col">
            {activeConversation ? (
              <>
                <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={currentParticipant?.avatar || 'https://i.pravatar.cc/150?img=0'}
                        alt="avatar"
                        className="w-10 h-10 rounded-full object-cover shadow-sm"
                      />
                      {currentParticipant?.online && (
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold">{currentParticipant?.name}</h4>
                      <p className={`text-xs ${currentParticipant?.online ? 'text-green-500' : 'text-gray-500'}`}>
                        {currentParticipant?.online ? 'En ligne' : 'Hors ligne'}
                      </p>
                    </div>
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => setShowOptions((prev) => !prev)}
                      className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      <MoreVertical className="text-gray-600" size={20} />
                    </button>
                    <AnimatePresence>
                      {showOptions && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10 overflow-hidden border border-gray-200"
                        >
                          <button className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors">
                            <Pin className="mr-2" size={16} />
                            Épingler
                          </button>
                          <button 
                            className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 transition-colors"
                            onClick={async () => {
                              try {
                                const token = localStorage.getItem("token");
                                await axios.delete(
                                  `http://localhost:5000/api/messages/conversations/${activeConversation._id}`,
                                  { headers: { Authorization: `Bearer ${token}` } }
                                );
                                setConversations(prev => 
                                  prev.filter(c => c._id !== activeConversation._id)
                                );
                                setActiveConversation(null);
                              } catch (error) {
                                console.error("Error deleting conversation:", error);
                              }
                            }}
                          >
                            <Trash2 className="mr-2" size={16} />
                            Supprimer
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="flex-1 p-6 overflow-y-auto bg-gradient-to-b from-white to-blue-50">
                  <div className="space-y-4">
                    <AnimatePresence>
                      {currentMessages.map((message, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: message.sent ? 10 : -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`flex ${message.sent ? 'justify-end' : 'justify-start'}`}
                        >
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            className={`max-w-[75%] p-4 rounded-2xl shadow-sm ${
                              message.sent 
                                ? 'bg-blue-600 text-white rounded-tr-none' 
                                : 'bg-white border border-gray-200 rounded-tl-none'
                            }`}
                          >
                            <p>{message.text}</p>
                            {message.file && renderFilePreview(message.file)}
                            <div className={`text-xs mt-1 text-right ${
                              message.sent ? 'text-blue-100' : 'text-gray-500'
                            }`}>
                              {message.time}
                            </div>
                          </motion.div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                <div className="border-t border-gray-100 p-4 bg-white">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center gap-2"
                  >
                    <div className="relative">
                      <button 
                        onClick={() => setShowFileOptions(!showFileOptions)}
                        className="text-gray-500 hover:text-blue-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
                      >
                        <Paperclip size={20} />
                      </button>
                      
                      <AnimatePresence>
                        {showFileOptions && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute bottom-full left-0 mb-2 bg-white shadow-lg rounded-md z-10 overflow-hidden border border-gray-200"
                          >
                            <button 
                              onClick={() => handleFileSelect('image')}
                              className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                            >
                              <Image className="mr-2" size={16} />
                              Image
                            </button>
                            <button 
                              onClick={() => handleFileSelect('video')}
                              className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                            >
                              <Video className="mr-2" size={16} />
                              Vidéo
                            </button>
                            <button 
                              onClick={() => handleFileSelect('document')}
                              className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                            >
                              <FileText className="mr-2" size={16} />
                              Document
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </div>

                    <input
                      type="text"
                      placeholder="Écrivez votre message..."
                      className="flex-1 px-4 py-3 border-0 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 transition-all"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    />
                    <button 
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim() && !selectedFile}
                      className={`p-2 rounded-full transition-all ${
                        newMessage.trim() || selectedFile
                          ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <Send size={20} />
                    </button>
                  </motion.div>
                  
                  {selectedFile && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-2 flex items-center justify-between bg-blue-50 p-2 rounded-lg"
                    >
                      <div className="flex items-center">
                        <Paperclip className="text-blue-600 mr-2" size={16} />
                        <span className="text-sm truncate max-w-xs">{selectedFile.name}</span>
                      </div>
                      <button 
                        onClick={() => {
                          setSelectedFile(null);
                          setFilePreview(null);
                        }}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <X size={16} />
                      </button>
                    </motion.div>
                  )}
                  
                  {filePreview && selectedFile?.type.startsWith('image/') && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-2"
                    >
                      <img 
                        src={filePreview} 
                        alt="Preview" 
                        className="rounded-lg border border-gray-200 max-h-40 object-cover"
                      />
                    </motion.div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                Sélectionnez une conversation pour commencer à discuter
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MessagesP;

// import React, { useEffect, useState, useRef } from "react";
// import SideBar from "./SideBar";
// import { motion, AnimatePresence } from "framer-motion";
// import { MoreVertical, Paperclip, Send, Search, ChevronDown, Pin, Trash2, X, Image, Video, FileText } from "lucide-react";
// import axios from "axios";
// import io from "socket.io-client";

// const MessagesP = () => {
//   const [showOptions, setShowOptions] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [activeConversation, setActiveConversation] = useState(null);
//   const [newMessage, setNewMessage] = useState("");
//   const [showFileOptions, setShowFileOptions] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [filePreview, setFilePreview] = useState(null);
//   const [conversations, setConversations] = useState([]);
//   const [currentMessages, setCurrentMessages] = useState([]);
//   const [currentParticipant, setCurrentParticipant] = useState(null);
//   const [showSearchResults, setShowSearchResults] = useState(false);
//   const [searchResults, setSearchResults] = useState([]);
  
//   const fileInputRef = useRef(null);
//   const socket = useRef(null);
//   const messagesEndRef = useRef(null);

//   // Connect to Socket.IO
//   useEffect(() => {
//     socket.current = io("http://localhost:5000");

//     socket.current.on("newMessage", (message) => {
//       if (message.conversationId === activeConversation?._id) {
//         setCurrentMessages(prev => [...prev, message]);
//       }
//     });

//     socket.current.on("userStatusChanged", ({ userId, online }) => {
//       setConversations(prev => prev.map(conv => {
//         if (conv.participant._id === userId) {
//           return { ...conv, participant: { ...conv.participant, online } };
//         }
//         return conv;
//       }));
//     });

//     return () => {
//       socket.current.disconnect();
//     };
//   }, [activeConversation]);

//   // Fetch conversations
//   useEffect(() => {
//     const fetchConversations = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get("http://localhost:5000/api/messages/conversations", {
//           headers: { Authorization: `Bearer ${token}` }
//         });
        
//         // Filtrer les conversations sans participant
//         const validConversations = response.data.filter(conv => conv.participant);
//         setConversations(validConversations);
        
//       } catch (error) {
//         console.error("Error fetching conversations:", error);
//       }
//     };
//     fetchConversations();
//   }, []);
//   // Fetch messages when conversation changes
//   useEffect(() => {
//     if (activeConversation) {
//       const fetchMessages = async () => {
//         try {
//           const token = localStorage.getItem("token");
//           const response = await axios.get(
//             `http://localhost:5000/api/messages/conversations/${activeConversation._id}/messages`,
//             { headers: { Authorization: `Bearer ${token}` } }
//           );
//           setCurrentMessages(response.data.messages);
//           setCurrentParticipant(response.data.participant);
          
//           socket.current.emit("joinConversation", activeConversation._id);
//         } catch (error) {
//           console.error("Error fetching messages:", error);
//         }
//       };

//       fetchMessages();
//     }
//   }, [activeConversation]);

//   // Auto-scroll to bottom of messages
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [currentMessages]);

//   const handleSearch = async (query) => {
//     if (query.length < 2) {
//       setShowSearchResults(false);
//       return;
//     }
    
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.get(
//         `http://localhost:5000/api/messages/users/search?query=${query}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setSearchResults(response.data);
//       setShowSearchResults(true);
//     } catch (error) {
//       console.error("Search error:", error);
//       setShowSearchResults(false);
//     }
//   };

// const startNewConversation = async (userId) => {
//   try {
//     const token = localStorage.getItem("token");
//     const response = await axios.post(
//       `http://localhost:5000/api/messages/conversations/${userId}`,
//       {},
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
    
//     // Vérification que le participant existe
//     if (!response.data.recipient) {
//       throw new Error("Participant non trouvé");
//     }
    
//     // Créer la nouvelle conversation
//     const newConversation = {
//       _id: response.data.conversationId,
//       participant: response.data.recipient,
//       lastMessage: "Nouvelle conversation",
//       lastMessageTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//     };
    
//     // Mettre à jour l'état
//     setConversations(prev => [newConversation, ...prev]);
//     setActiveConversation(newConversation);
//     setCurrentParticipant(response.data.recipient);
//     setCurrentMessages([]);
    
//     // Réinitialiser complètement la recherche
//     setSearchQuery("");
//     setSearchResults([]);
//     setShowSearchResults(false);
    
//   } catch (error) {
//     console.error("Error:", error);
//     // Ajoutez ici une notification à l'utilisateur
//     alert("Impossible de démarrer une conversation : " + error.message);
//   }
// };

//   const handleFileSelect = (type) => {
//     fileInputRef.current.accept = type === 'image' ? 'image/*' : 
//                                  type === 'video' ? 'video/*' : 
//                                  '.pdf,.doc,.docx,.txt';
//     fileInputRef.current.click();
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedFile(file);
      
//       if (file.type.startsWith('image/')) {
//         const reader = new FileReader();
//         reader.onload = (event) => {
//           setFilePreview(event.target.result);
//         };
//         reader.readAsDataURL(file);
//       } else {
//         setFilePreview(null);
//       }
      
//       setShowFileOptions(false);
//     }
//   };

//   const handleSendMessage = async () => {
//     if (newMessage.trim() === "" && !selectedFile) return;
    
//     try {
//       const token = localStorage.getItem("token");
//       const formData = new FormData();
//       formData.append("content", newMessage);
//       if (selectedFile) {
//         formData.append("file", selectedFile);
//       }

//       const response = await axios.post(
//         `http://localhost:5000/api/messages/conversations/${activeConversation._id}/messages`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data"
//           }
//         }
//       );

//       setCurrentMessages(prev => [...prev, response.data]);
//       setNewMessage("");
//       setSelectedFile(null);
//       setFilePreview(null);
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   const renderFilePreview = (file) => {
//     if (!file) return null;
    
//     if (file.type.startsWith('image/')) {
//       return (
//         <div className="mt-2 max-w-xs">
//           <img 
//             src={file.url} 
//             alt="Preview" 
//             className="rounded-lg border border-gray-200 max-h-40 object-cover"
//           />
//         </div>
//       );
//     }
    
//     return (
//       <div className="mt-2 p-3 bg-gray-100 rounded-lg border border-gray-200 flex items-center">
//         <FileText className="text-blue-600 mr-2" size={20} />
//         <div className="truncate">
//           <p className="font-medium truncate">{file.name}</p>
//           <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
//         </div>
//       </div>
//     );
//   };

//  const filteredConversations = conversations.filter(conv => {
//   const participantName = conv.participant?.name?.toLowerCase() || '';
//   const lastMsg = conv.lastMessage?.toLowerCase() || '';
//   return participantName.includes(searchQuery.toLowerCase()) || 
//          lastMsg.includes(searchQuery.toLowerCase());
// });

//   return (
//     <div className="flex bg-gradient-to-br from-[#BCD0EA50] to-indigo-50 min-h-[calc(100vh-5rem)] mt-20">
//       <SideBar />

//       <div className="flex-1 ml-60 p-6 mt-4">
//         <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="text-3xl font-bold mb-8 text-gray-800">
//           💬 Messages
//         </motion.h1>

//         <motion.div
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//           className="relative mb-8 w-full max-w-4xl"
//         >
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <Search className="text-gray-400" size={20} />
//           </div>
//           <input
//             type="text"
//             placeholder="Rechercher des clients..."
//             className="w-full pl-10 pr-10 py-3 rounded-xl border-0 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 transition-all duration-300"
//             value={searchQuery}
//             onChange={(e) => {
//               setSearchQuery(e.target.value);
//               handleSearch(e.target.value);
//             }}
//           />
//           {searchQuery && (
//             <button 
//               onClick={() => {
//                 setSearchQuery("");
//                 setShowSearchResults(false);
//               }}
//               className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-blue-600 transition-colors"
//             >
//               <X className="text-gray-400 hover:text-gray-600" size={20} />
//             </button>
//           )}
          
         
//           {/* {showSearchResults && searchQuery.length > 0 && (
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md max-h-60 overflow-y-auto border border-gray-200"
//             >
//               {searchResults.length > 0 ? (
//                 searchResults
//                   .filter(user => !conversations.some(conv => conv.participant?._id === user._id))
//                   .map(user => (
//                     <div 
//                       key={user._id}
//                       className="p-3 hover:bg-gray-100 cursor-pointer flex items-center"
//                       onClick={() => startNewConversation(user._id)}
//                     >
//                       <img 
//                         src={user.photo || 'https://i.pravatar.cc/150?img=0'} 
//                         alt={user.nom}
//                         className="w-8 h-8 rounded-full mr-3"
//                       />
//                       <div>
//                         <p className="font-medium">{user.prenom} {user.nom}</p>
//                         <p className="text-xs text-gray-500">
//                           {user.role === 'prestataire' ? 'Prestataire' : 'Client'} • 
//                           {user.online ? ' En ligne' : ' Hors ligne'}
//                         </p>
//                       </div>
//                     </div>
//                   ))
//               ) : (
//                 <div className="p-3 text-gray-500">Aucun résultat trouvé</div>
//               )}
//             </motion.div>
//           )} */}
//           {showSearchResults && searchQuery.length > 0 && (
//   <motion.div
//     initial={{ opacity: 0, y: -10 }}
//     animate={{ opacity: 1, y: 0 }}
//     className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md max-h-60 overflow-y-auto border border-gray-200"
//   >
//     {searchResults.length > 0 ? (
//       searchResults
//         .filter(user => !conversations.some(conv => conv.participant?._id === user._id))
//         .map(user => (
//           <div 
//             key={user._id}
//             className="p-3 hover:bg-gray-100 cursor-pointer flex items-center"
//             onClick={() => startNewConversation(user._id)}
//           >
//             <img 
//               src={user.photo || 'https://i.pravatar.cc/150?img=0'} 
//               alt={user.nom}
//               className="w-8 h-8 rounded-full mr-3"
//             />
//             <div>
//               <p className="font-medium">{user.prenom} {user.nom}</p>
//               <p className="text-xs text-gray-500">
//                 {user.role === 'prestataire' ? 'Prestataire' : 'Client'} • 
//                 {user.online ? ' En ligne' : ' Hors ligne'}
//               </p>
//             </div>
//           </div>
//         ))
//     ) : (
//       <div className="p-3 text-gray-500">Aucun résultat trouvé</div>
//     )}
//   </motion.div>
// )}
//         </motion.div>

//         <motion.div 
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.3 }}
//           className="bg-white rounded-2xl shadow-lg flex h-[600px] overflow-hidden border border-gray-100"
//         >
//           <div className="w-1/3 border-r border-gray-100 flex flex-col">
//             <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
//               <h3 className="font-semibold text-gray-700">Toutes les conversations</h3>
//               <ChevronDown className="text-gray-400" size={18} />
//             </div>

//             <div className="flex-1 overflow-y-auto">
//               <AnimatePresence>
//                 {filteredConversations.length > 0 ? (
//                   filteredConversations.map((conversation) => (
//                     <motion.div
//                       key={conversation._id}
//                       initial={{ opacity: 0, x: -10 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       exit={{ opacity: 0, x: -10 }}
//                       transition={{ duration: 0.2 }}
//                       onClick={() => setActiveConversation(conversation)}
//                       className={`flex items-center gap-3 p-4 cursor-pointer transition-all duration-200 ${
//                         activeConversation?._id === conversation._id 
//                           ? 'bg-blue-50 border-l-4 border-blue-500' 
//                           : 'hover:bg-gray-50 border-l-4 border-transparent'
//                       }`}
//                     >
//                       <div className="relative">
//                         <img
//                           src={conversation.participant?.avatar || 'https://i.pravatar.cc/150?img=0'}
//                           alt="avatar"
//                           className="w-12 h-12 rounded-full object-cover shadow-sm"
//                         />
//                         {conversation.participant?.online && (
//                           <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
//                         )}
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <div className="flex justify-between items-center">
//                           <h4 className="font-semibold truncate">
//                             {conversation.participant?.name || 'Utilisateur inconnu'}
//                           </h4>
//                           <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
//                             {conversation.lastMessageTime}
//                           </span>
//                         </div>
//                         <p className="text-sm text-gray-500 truncate">
//                           {conversation.lastMessage || 'Aucun message'}
//                         </p>
//                       </div>
//                     </motion.div>
//                   ))
//                 ) : (
//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     className="p-4 text-center text-gray-500"
//                   >
//                     Aucune conversation trouvée
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           </div>

//           <div className="flex-1 flex flex-col">
//             {activeConversation ? (
//               <>
//                 <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50">
//                   <div className="flex items-center gap-3">
//                     <div className="relative">
//                       <img
//                         src={currentParticipant?.avatar || 'https://i.pravatar.cc/150?img=0'}
//                         alt="avatar"
//                         className="w-10 h-10 rounded-full object-cover shadow-sm"
//                       />
//                       {currentParticipant?.online && (
//                         <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
//                       )}
//                     </div>
//                     <div>
//                       <h4 className="font-semibold">{currentParticipant?.name}</h4>
//                       <p className={`text-xs ${currentParticipant?.online ? 'text-green-500' : 'text-gray-500'}`}>
//                         {currentParticipant?.online ? 'En ligne' : 'Hors ligne'}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="relative">
//                     <button
//                       onClick={() => setShowOptions((prev) => !prev)}
//                       className="p-2 rounded-full hover:bg-gray-200 transition-colors"
//                     >
//                       <MoreVertical className="text-gray-600" size={20} />
//                     </button>
//                     <AnimatePresence>
//                       {showOptions && (
//                         <motion.div
//                           initial={{ opacity: 0, y: -10 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           exit={{ opacity: 0, y: -10 }}
//                           transition={{ duration: 0.2 }}
//                           className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10 overflow-hidden border border-gray-200"
//                         >
//                           <button className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors">
//                             <Pin className="mr-2" size={16} />
//                             Épingler
//                           </button>
//                           <button 
//                             className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 transition-colors"
//                             onClick={async () => {
//                               try {
//                                 const token = localStorage.getItem("token");
//                                 await axios.delete(
//                                   `http://localhost:5000/api/messages/conversations/${activeConversation._id}`,
//                                   { headers: { Authorization: `Bearer ${token}` } }
//                                 );
//                                 setConversations(prev => 
//                                   prev.filter(c => c._id !== activeConversation._id)
//                                 );
//                                 setActiveConversation(null);
//                               } catch (error) {
//                                 console.error("Error deleting conversation:", error);
//                               }
//                             }}
//                           >
//                             <Trash2 className="mr-2" size={16} />
//                             Supprimer
//                           </button>
//                         </motion.div>
//                       )}
//                     </AnimatePresence>
//                   </div>
//                 </div>

//                 <div className="flex-1 p-6 overflow-y-auto bg-gradient-to-b from-white to-blue-50">
//                   <div className="space-y-4">
//                     <AnimatePresence>
//                       {currentMessages.map((message, index) => (
//                         <motion.div
//                           key={index}
//                           initial={{ opacity: 0, y: message.sent ? 10 : -10 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ duration: 0.3 }}
//                           className={`flex ${message.sent ? 'justify-end' : 'justify-start'}`}
//                         >
//                           <motion.div
//                             whileHover={{ scale: 1.02 }}
//                             className={`max-w-[75%] p-4 rounded-2xl shadow-sm ${
//                               message.sent 
//                                 ? 'bg-blue-600 text-white rounded-tr-none' 
//                                 : 'bg-white border border-gray-200 rounded-tl-none'
//                             }`}
//                           >
//                             <p>{message.text}</p>
//                             {message.file && renderFilePreview(message.file)}
//                             <div className={`text-xs mt-1 text-right ${
//                               message.sent ? 'text-blue-100' : 'text-gray-500'
//                             }`}>
//                               {message.time}
//                             </div>
//                           </motion.div>
//                         </motion.div>
//                       ))}
//                     </AnimatePresence>
//                     <div ref={messagesEndRef} />
//                   </div>
//                 </div>

//                 <div className="border-t border-gray-100 p-4 bg-white">
//                   <motion.div 
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.4 }}
//                     className="flex items-center gap-2"
//                   >
//                     <div className="relative">
//                       <button 
//                         onClick={() => setShowFileOptions(!showFileOptions)}
//                         className="text-gray-500 hover:text-blue-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
//                       >
//                         <Paperclip size={20} />
//                       </button>
                      
//                       <AnimatePresence>
//                         {showFileOptions && (
//                           <motion.div
//                             initial={{ opacity: 0, y: -10 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             exit={{ opacity: 0, y: -10 }}
//                             className="absolute bottom-full left-0 mb-2 bg-white shadow-lg rounded-md z-10 overflow-hidden border border-gray-200"
//                           >
//                             <button 
//                               onClick={() => handleFileSelect('image')}
//                               className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
//                             >
//                               <Image className="mr-2" size={16} />
//                               Image
//                             </button>
//                             <button 
//                               onClick={() => handleFileSelect('video')}
//                               className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
//                             >
//                               <Video className="mr-2" size={16} />
//                               Vidéo
//                             </button>
//                             <button 
//                               onClick={() => handleFileSelect('document')}
//                               className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
//                             >
//                               <FileText className="mr-2" size={16} />
//                               Document
//                             </button>
//                           </motion.div>
//                         )}
//                       </AnimatePresence>
                      
//                       <input
//                         type="file"
//                         ref={fileInputRef}
//                         onChange={handleFileChange}
//                         className="hidden"
//                       />
//                     </div>

//                     <input
//                       type="text"
//                       placeholder="Écrivez votre message..."
//                       className="flex-1 px-4 py-3 border-0 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30 transition-all"
//                       value={newMessage}
//                       onChange={(e) => setNewMessage(e.target.value)}
//                       onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//                     />
//                     <button 
//                       onClick={handleSendMessage}
//                       disabled={!newMessage.trim() && !selectedFile}
//                       className={`p-2 rounded-full transition-all ${
//                         newMessage.trim() || selectedFile
//                           ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
//                           : 'bg-gray-200 text-gray-400 cursor-not-allowed'
//                       }`}
//                     >
//                       <Send size={20} />
//                     </button>
//                   </motion.div>
                  
//                   {selectedFile && (
//                     <motion.div
//                       initial={{ opacity: 0, height: 0 }}
//                       animate={{ opacity: 1, height: 'auto' }}
//                       className="mt-2 flex items-center justify-between bg-blue-50 p-2 rounded-lg"
//                     >
//                       <div className="flex items-center">
//                         <Paperclip className="text-blue-600 mr-2" size={16} />
//                         <span className="text-sm truncate max-w-xs">{selectedFile.name}</span>
//                       </div>
//                       <button 
//                         onClick={() => {
//                           setSelectedFile(null);
//                           setFilePreview(null);
//                         }}
//                         className="text-gray-500 hover:text-red-500"
//                       >
//                         <X size={16} />
//                       </button>
//                     </motion.div>
//                   )}
                  
//                   {filePreview && selectedFile?.type.startsWith('image/') && (
//                     <motion.div
//                       initial={{ opacity: 0, height: 0 }}
//                       animate={{ opacity: 1, height: 'auto' }}
//                       className="mt-2"
//                     >
//                       <img 
//                         src={filePreview} 
//                         alt="Preview" 
//                         className="rounded-lg border border-gray-200 max-h-40 object-cover"
//                       />
//                     </motion.div>
//                   )}
//                 </div>
//               </>
//             ) : (
//               <div className="flex-1 flex items-center justify-center text-gray-500">
//                 Sélectionnez une conversation pour commencer à discuter
//               </div>
//             )}
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default MessagesP;