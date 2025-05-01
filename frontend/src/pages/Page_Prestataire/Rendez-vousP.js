import React, { useEffect } from "react";
import SideBar from "./SideBar";
import { motion } from "framer-motion";


const RendezVousP = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <div className="flex bg-gradient-to-br from-[#BCD0EA50] to-indigo-50 min-h-[calc(100vh-5rem)] mt-20">
      <SideBar />

      <div className="flex-1 ml-60 p-6 mt-4">
        <motion.h1  initial={{ opacity: 0, x: -20 }}  animate={{ opacity: 1, x: 0 }}  transition={{ duration: 0.5 }} className="text-3xl font-bold mb-8 text-gray-800">
          Messages
        </motion.h1>

      </div>
    </div>
  );
};


export default RendezVousP;