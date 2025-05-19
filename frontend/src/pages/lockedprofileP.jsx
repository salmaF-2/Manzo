import React from 'react';
import { Link } from 'react-router-dom';
import profilep from '../assets/images/profilep.webp'
import banner from '../assets/images/banner.jpeg'

export default function ProfileP() {
    return (
        <div className="max-w mx-auto bg-white rounded-lg shadow-md overflow-hidden px-5 py-6 mb-9 mt-5 mr-[50px] ml-[50px] pt-[100px]">
            <div className="h-32 bg-gray-200 relative -mx-4 mb-6 -mt-5">
                <img src={banner} alt="Banner" className="w-full h-full object-cover" />
            </div>

            <div className="flex -mt-20 relative mb-4">
                <div className="w-24 h-24 rounded-full border-4 border-white bg-gray-300 overflow-hidden shadow-md">
                    <img src={profilep} alt="Profile" className="w-full h-full object-cover" />
                </div>
            </div>

            <div className="flex justify-between items-start mb-6">
                <div>
                    <h1 className="text-2xl font-bold">John DOE</h1>
                    <p className="text-gray-600 ml-6">Électricien</p>
                    <div className="flex items-center mt-1">
                        <div className="flex text-yellow-400">
                            <span className='text-[#475489]'>★</span>
                        </div>
                        <span className="ml-2 text-sm text-gray-500">4.8 (24 Avis clients)</span>
                    </div>
                </div>
                <Link to="/seconnecter">
                    <button className="px-4 py-2 bg-[#475489] text-white rounded-md w-40 mr-9">
                        Se connecter
                    </button>
                </Link>
            </div>

            <hr className="my-4 border-gray-200" />

            <div className='bg-gray-100 rounded-[30px] p-4'>
                <h2 className="font-semibold text-lg mb-2 text-[#475489]">Aperçu des services</h2>
                <p className="text-gray-600">
                    Inscrivez-vous pour accéder aux informations complètes et contacter ce professionnel
                </p>
            </div>
        </div>
    );
}