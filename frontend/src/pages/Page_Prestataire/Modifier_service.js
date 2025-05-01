import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import SideBar from "./SideBar";

const ModifierService = () => {
    useEffect(() => {
              window.scrollTo(0, 0);
    }, []);

    const location = useLocation();
    const from = location.state?.from || '/Services-Prestataire';

    const [formData, setFormData] = useState({
        nom:"", 
        description : "",
        prix : "",
        statut : "actif",
        image : null,
    });

    const [preview , setPreview] = useState(null);

    const handleChange = (e)=>{
        const {name,value} = e.target; 
        setFormData((prev)=>({
            ...prev, [name]:value,
        }));
    };

    const handleImageChange =(e)=>{
        const file = e.target.files[0];
        setFormData((prev)=>({...prev, image:file}));

        if(file){
            const reader = new FileReader();
            reader.onloadend = () =>{
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

  return (
    <div className="flex bg-gradient-to-br from-[#BCD0EA50] to-indigo-50 min-h-[calc(100vh-5rem)] mt-20">
      <SideBar />
      
      <div className="flex-1 ml-60 p-6 mt-4">
        {/* Bouton de retour  */}
        <Link to={from} 
          className="flex items-center text-blue-600 mb-4 hover:text-blue-800 transition-colors">
          <FaArrowLeft className="mr-2" />
          Retour au liste des services
        </Link>

        {/* titre */}
        <h1 className="text-2xl font-bold mb-6">Modifier un service</h1>
        
        {/* Partie 1 => formulaire de modification */}
        <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold mb-6">Informations du service</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* nom de servive */}
                <div>
                    <label className="block mb-1 font-medium">Nom du service</label>
                    <input type="text" name="nom" value={formData.nom} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded-lg" placeholder="Entrer votre profession" />
                </div>
                {/* prix */}
                <div>
                    <label className="block mb-1 font-medium">Prix (en DH)</label>
                    <input type="number" name="prix" value={formData.prix} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded-lg" placeholder="Entrer le prix" />
                </div>
                {/* dexcription */}
                <div className="md:col-span-2">
                    <label className="block mb-1 font-medium">Description</label>
                    <textarea name="description" value={formData.description} rows={4} onChange={handleChange} className="w-full border border-gray-300 p-2 rounded-lg" placeholder="Entrer la description" />
                </div>
                {/* image de service */}
                <div>
                    <label className="block mb-2 font-semibold text-gray-700">Image du service</label>
                    <label htmlFor="imageUpload"className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-50 text-blue-700 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}  d="M3 15a4 4 0 014-4h10a4 4 0 014 4M12 10V3m0 0l3.5 3.5M12 3L8.5 6.5"/>
                        </svg>
                        <span>Choisir une image</span>
                    </label>

                    <input id="imageUpload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                    />

                    {preview && (
                        <img
                        src={preview}
                        alt="Aperçu"
                        className="mt-4 h-[400px] w-full object-cover rounded-lg border border-gray-300 shadow-sm"
                        />
                    )}
                </div>

                {/* statut */}
                <div>
                    <label className="block mb-2 font-semibold text-gray-700">Statut</label>
                    <div className="flex flex-wrap gap-6 mt-2">
                        {/* Actif */}
                        <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="statut" value="actif" checked={formData.statut === "actif"} onChange={handleChange} className="accent-blue-600 w-4 h-4"/>
                        <span className="text-gray-700">Actif</span>
                        </label>

                        {/* En pause */}
                        <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="statut" value="en pause" checked={formData.statut === "en pause"}  onChange={handleChange}  className="accent-orange-500 w-4 h-4"/>
                        <span className="text-gray-700">En pause</span>
                        </label>
                    </div>
                </div>

            </div>
        </div>

        <div className="space-y-6 mt-6">
            {/* Boutons en bas */}
            <div className="flex justify-end gap-4 mt-6">
                <Link to="/Services-Prestataire">
                    <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100">Annuler</button>
                </Link>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg">Modifier</button>
            </div>
        </div>

      </div>
    </div>
  );
};

export default ModifierService;