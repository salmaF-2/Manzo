import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FiSearch, FiFilter, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaStar ,FaTruckMoving,FaDumbbell ,
    FaLevelUpAlt  ,
    FaHammer,
    FaBolt,
    FaSeedling,
    FaPaintRoller,
    FaFaucet,
    FaSnowflake,
    FaUtensils,
    FaBath,
    FaHome,
    FaHouseDamage,
    FaSwimmingPool,
    FaLaptop,
    FaShieldAlt,
    FaFire,
    FaTree,
    FaFilm,
    FaWineBottle, FaRegClock } from 'react-icons/fa';

const ServiceDevis = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeLetter, setActiveLetter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [showFilters, setShowFilters] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const servicesPerPage = 10;

    // Données des services
    const [quotationServices] = useState([
        {
            id: 1,
            title: "Déménagement complet",
            description: "Service clé en main incluant emballage, transport et déballage",
            startingPrice: 1500,
            details: "Prix selon volume et distance",
            image: "demenagement.jpg",
            rating: 4.8,
            category: "demenagement",
            icon: <FaTruckMoving className="text-2xl text-[#5869A3]" />,
            popular: true
        },
        {
            id: 2,
            title: "Rénovation intérieure",
            description: "Transformation complète d'une pièce (peinture, sols, éclairage)",
            startingPrice: 8000,
            details: "Devis après étude des besoins",
            image: "renovation.jpg",
            rating: 4.7,
            category: "renovation",
            icon: <FaHammer className="text-2xl text-[#5869A3]" />
        },
        {
            id: 3,
            title: "Installation électrique",
            description: "Mise aux normes ou installation complète",
            startingPrice: 2500,
            details: "Prix selon surface et complexité",
            image: "electrique.jpg",
            rating: 4.9,
            category: "bricolage",
            icon: <FaBolt className="text-2xl text-[#5869A3]" />,
            popular: true
        },
        {
            id: 4,
            title: "Création de jardin",
            description: "Aménagement paysager complet avec plantes adaptées",
            startingPrice: 5000,
            details: "Devis après visite du terrain",
            image: "jardin.jpg",
            rating: 4.6,
            category: "exterieur",
            icon: <FaSeedling className="text-2xl text-[#5869A3]" />
        },
        {
            id: 5,
            title: "Peinture intérieure",
            description: "Préparation des surfaces et peinture de qualité",
            startingPrice: 3000,
            details: "Prix selon surface et type de peinture",
            image: "peinture.jpg",
            rating: 4.5,
            category: "renovation",
            icon: <FaPaintRoller className="text-2xl text-[#5869A3]" />
        },
        {
            id: 6,
            title: "Plomberie complète",
            description: "Rénovation du réseau ou installation neuve",
            startingPrice: 4000,
            details: "Devis technique gratuit",
            image: "plomberie.jpg",
            rating: 4.7,
            category: "bricolage",
            icon: <FaFaucet className="text-2xl text-[#5869A3]" />
        },
        {
            id: 7,
            title: "Climatisation centrale",
            description: "Installation de système multi-split ou centralisé",
            startingPrice: 10000,
            details: "Solution sur mesure",
            image: "climatisation.jpg",
            rating: 4.8,
            category: "confort",
            icon: <FaSnowflake className="text-2xl text-[#5869A3]" />
        },
        {
            id: 8,
            title: "Cuisine équipée",
            description: "Conception et installation de cuisine sur mesure",
            startingPrice: 15000,
            details: "Plans 3D inclus",
            image: "cuisine.jpg",
            rating: 4.9,
            category: "amenagement",
            icon: <FaUtensils className="text-2xl text-[#5869A3]" />,
            popular: true
        },
        {
            id: 9,
            title: "Salle de bain premium",
            description: "Rénovation complète avec matériaux haut de gamme",
            startingPrice: 12000,
            details: "Options personnalisables",
            image: "sdb.jpg",
            rating: 4.7,
            category: "renovation",
            icon: <FaBath className="text-2xl text-[#5869A3]" />
        },
        {
            id: 10,
            title: "Domotique intelligente",
            description: "Automatisation de l'éclairage, sécurité et chauffage",
            startingPrice: 8000,
            details: "Solutions adaptées à votre habitat",
            image: "domotique.jpg",
            rating: 4.8,
            category: "technologie",
            icon: <FaHome className="text-2xl text-[#5869A3]" />
        },
        {
            id: 11,
            title: "Toiture complète",
            description: "Réfection de toiture avec matériaux durables",
            startingPrice: 20000,
            details: "Garantie décennale incluse",
            image: "toiture.jpg",
            rating: 4.6,
            category: "exterieur",
            icon: <FaHouseDamage className="text-2xl text-[#5869A3]" />
        },
        {
            id: 12,
            title: "Piscine enterrée",
            description: "Construction clé en main avec filtration",
            startingPrice: 50000,
            details: "Plans 3D et autorisations inclus",
            image: "piscine.jpg",
            rating: 4.9,
            category: "exterieur",
            icon: <FaSwimmingPool className="text-2xl text-[#5869A3]" />
        },
        {
            id: 13,
            title: "Bureau sur mesure",
            description: "Espace de travail optimisé et ergonomique",
            startingPrice: 7000,
            details: "Solutions adaptées au télétravail",
            image: "bureau.jpg",
            rating: 4.5,
            category: "amenagement",
            icon: <FaLaptop className="text-2xl text-[#5869A3]" />
        },
        {
            id: 14,
            title: "Système de sécurité",
            description: "Installation complète avec caméras et alarme",
            startingPrice: 6000,
            details: "Surveillance 24/7 optionnelle",
            image: "securite.jpg",
            rating: 4.7,
            category: "technologie",
            icon: <FaShieldAlt className="text-2xl text-[#5869A3]" />
        },
        {
            id: 15,
            title: "Cheminée moderne",
            description: "Installation de foyer fermé ou insert",
            startingPrice: 9000,
            details: "Conforme aux normes",
            image: "cheminee.jpg",
            rating: 4.6,
            category: "confort",
            icon: <FaFire className="text-2xl text-[#5869A3]" />
        },
        {
            id: 16,
            title: "Escalier sur mesure",
            description: "Conception et installation en bois, métal ou verre",
            startingPrice: 15000,
            details: "Plans techniques inclus",
            image: "escalier.jpg",
            rating: 4.8,
            category: "amenagement",
            icon: <FaLevelUpAlt   className="text-2xl text-[#5869A3]" />
        },
        {
            id: 17,
            title: "Terrasse en bois",
            description: "Aménagement extérieur avec matériaux premium",
            startingPrice: 8000,
            details: "Traitement anti-UV inclus",
            image: "terrasse.jpg",
            rating: 4.7,
            category: "exterieur",
            icon: <FaTree className="text-2xl text-[#5869A3]" />
        },
        {
            id: 18,
            title: "Home cinéma",
            description: "Installation professionnelle avec acoustique",
            startingPrice: 20000,
            details: "Solutions haut de gamme",
            image: "cinema.jpg",
            rating: 4.9,
            category: "divertissement",
            icon: <FaFilm className="text-2xl text-[#5869A3]" />,
            popular: true
        },
        {
            id: 19,
            title: "Cave à vin",
            description: "Aménagement climatisé pour conservation optimale",
            startingPrice: 12000,
            details: "Capacité personnalisable",
            image: "cave.jpg",
            rating: 4.6,
            category: "amenagement",
            icon: <FaWineBottle className="text-2xl text-[#5869A3]" />
        },
        {
            id: 20,
            title: "Salle de sport privée",
            description: "Conception d'espace fitness personnalisé",
            startingPrice: 25000,
            details: "Équipements professionnels",
            image: "sport.jpg",
            rating: 4.7,
            category: "amenagement",
            icon: <FaDumbbell className="text-2xl text-[#5869A3]" />
        }
    ]);
    // Filtrage
    const filteredServices = quotationServices.filter(service => {
        const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            service.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesLetter = !activeLetter || activeLetter === 'Tous' || 
                            service.title.startsWith(activeLetter);
        const matchesCategory = categoryFilter === 'all' || 
                              service.category === categoryFilter;
        
        return matchesSearch && matchesLetter && matchesCategory;
    });

    // Pagination
    const indexOfLastService = currentPage * servicesPerPage;
    const indexOfFirstService = indexOfLastService - servicesPerPage;
    const currentServices = filteredServices.slice(indexOfFirstService, indexOfLastService);
    const totalPages = Math.ceil(filteredServices.length / servicesPerPage);

    // Catégories uniques
    const categories = ['all', ...new Set(quotationServices.map(service => service.category))];

    // Alphabet pour filtrage
    const alphabet = ['Tous', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];

    // Réinitialiser la page quand les filtres changent
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, activeLetter, categoryFilter]);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            
            <main className="flex-grow container mx-auto px-4 py-8">
                {/* Titre avec style amélioré */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-[#5869A3] mb-4 relative pb-2 
                        after:content-[''] after:block after:w-20 after:h-1 after:bg-[#5869A3] 
                        after:mt-4 after:mx-auto after:rounded-full">
                        Services avec Devis
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Des solutions sur mesure adaptées à vos besoins spécifiques
                    </p>
                </div>

                {/* Barre de recherche et filtres */}
                <div className="mb-8 bg-white p-6 rounded-xl shadow-sm sticky top-0 z-10">
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="relative flex-grow">
                            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Rechercher un service..."
                                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5869A3]"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button 
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#5869A3] text-white rounded-lg hover:bg-[#48578A] transition"
                        >
                            <FiFilter /> Filtres
                        </button>
                    </div>

                    {/* Filtres dépliants */}
                    {showFilters && (
                        <div className="bg-gray-50 p-6 rounded-lg mb-4 border border-gray-200">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-medium text-lg">Filtrer par :</h3>
                                <button 
                                    onClick={() => setShowFilters(false)}
                                    className="p-1 rounded-full hover:bg-gray-200"
                                >
                                    <FiX className="text-gray-500 text-xl" />
                                </button>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="font-medium mb-3 text-gray-700">Catégories</h4>
                                    <div className="flex flex-wrap gap-3">
                                        {categories.map(category => (
                                            <button 
                                                key={category}
                                                onClick={() => setCategoryFilter(category)}
                                                className={`px-4 py-2 rounded-full text-sm ${
                                                    categoryFilter === category ? 
                                                    'bg-[#5869A3] text-white' : 'bg-gray-200 hover:bg-gray-300'
                                                }`}
                                            >
                                                {category === 'all' ? 'Toutes catégories' : category}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Filtre alphabétique */}
                    <div className="overflow-x-auto py-3">
                        <div className="flex space-x-2">
                            {alphabet.map(letter => (
                                <button
                                    key={letter}
                                    onClick={() => setActiveLetter(letter === 'Tous' ? '' : letter)}
                                    className={`px-3 py-1 rounded-md min-w-[2.5rem] text-center transition ${
                                        (activeLetter === '' && letter === 'Tous') || 
                                        activeLetter === letter ? 
                                        'bg-[#5869A3] text-white shadow-md' : 
                                        'bg-gray-200 hover:bg-gray-300'
                                    }`}
                                >
                                    {letter}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Résultats */}
                <div className="mb-12">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-700">
                            {filteredServices.length} services disponibles
                        </h2>
                        {filteredServices.length > servicesPerPage && (
                            <div className="text-sm text-gray-500">
                                Page {currentPage} sur {totalPages}
                            </div>
                        )}
                    </div>

                    {/* Liste des services */}
                    {currentServices.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                                {currentServices.map(service => (
                                    <div key={service.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col">
                                        <div className="h-48 bg-gray-200 relative overflow-hidden">
                                            <img 
                                                src={`/images/services/${service.image}`} 
                                                alt={service.title}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.src = '/images/services/default.jpg';
                                                }}
                                            />
                                            <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full flex items-center text-sm shadow">
                                                <FaStar className="text-yellow-500 mr-1" />
                                                {service.rating}
                                            </div>
                                            {service.popular && (
                                                <div className="absolute top-2 left-2 bg-[#5869A3] text-white px-3 py-1 rounded-full text-xs font-medium shadow">
                                                    Populaire
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="p-6 flex-grow flex flex-col">
                                            <div className="flex items-center mb-3">
                                                <div className="mr-3">
                                                    {service.icon}
                                                </div>
                                                <h2 className="text-xl font-bold text-[#5869A3]">{service.title}</h2>
                                            </div>
                                            <p className="text-gray-600 mb-4 flex-grow">{service.description}</p>
                                            
                                            <div className="mb-4">
                                                <div className="flex items-center text-gray-500 mb-2">
                                                    <FaRegClock className="mr-2" />
                                                    <span className="text-sm">{service.details}</span>
                                                </div>
                                                {service.startingPrice > 0 ? (
                                                    <span className="text-lg font-bold text-[#5869A3]">
                                                        À partir de {service.startingPrice} MAD
                                                    </span>
                                                ) : (
                                                    <span className="text-lg font-bold text-[#5869A3]">
                                                        Devis personnalisé
                                                    </span>
                                                )}
                                            </div>
                                            
                                            <button className="w-full bg-[#5869A3] hover:bg-[#48578A] text-white py-3 rounded-lg font-medium transition-colors duration-300 mt-auto">
                                                Demander un devis
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination (identique à ServiceFixe) */}
                            {totalPages > 1 && (
                                <div className="flex justify-center mt-8">
                                    <nav className="flex items-center gap-1">
                                    <button
                                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                            disabled={currentPage === 1}
                                            className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-[#5869A3] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <FiChevronLeft className="h-5 w-5" />
                                        </button>
                                        
                                        {/* Afficher les premières pages */}
                                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map(page => (
                                            <button
                                                key={page}
                                                onClick={() => setCurrentPage(page)}
                                                className={`px-4 py-2 border-t border-b border-gray-300 ${currentPage === page ? 'bg-[#5869A3] text-white' : 'bg-white text-[#5869A3] hover:bg-gray-50'}`}
                                            >
                                                {page}
                                            </button>
                                        ))}

                                        {/* Séparateur si beaucoup de pages */}
                                        {totalPages > 5 && currentPage < totalPages - 2 && (
                                            <span className="px-2">...</span>
                                        )}

                                        {/* Afficher les dernières pages */}
                                        {totalPages > 5 && currentPage >= totalPages - 2 && (
                                            Array.from({ length: 3 }, (_, i) => totalPages - 2 + i).map(page => (
                                                <button
                                                    key={page}
                                                    onClick={() => setCurrentPage(page)}
                                                    className={`px-4 py-2 border-t border-b border-gray-300 ${currentPage === page ? 'bg-[#5869A3] text-white' : 'bg-white text-[#5869A3] hover:bg-gray-50'}`}
                                                >
                                                    {page}
                                                </button>
                                            ))
                                        )}

                                        {/* Dernière page */}
                                        {totalPages > 5 && currentPage <= totalPages - 3 && (
                                            <>
                                                {currentPage < totalPages - 3 && (
                                                    <span className="px-2">...</span>
                                                )}
                                                <button
                                                    onClick={() => setCurrentPage(totalPages)}
                                                    className={`px-4 py-2 border-t border-b border-gray-300 ${currentPage === totalPages ? 'bg-[#5869A3] text-white' : 'bg-white text-[#5869A3] hover:bg-gray-50'}`}
                                                >
                                                    {totalPages}
                                                </button>
                                            </>
                                        )}

                                        <button
                                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                            disabled={currentPage === totalPages}
                                            className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-[#5869A3] hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <FiChevronRight className="h-5 w-5" />
                                        </button>
                                             
                                    </nav>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-16 bg-white rounded-xl shadow-sm">
                            <h3 className="text-xl font-medium text-gray-600 mb-2">Aucun service ne correspond à vos critères</h3>
                            <button 
                                onClick={() => {
                                    setSearchTerm('');
                                    setActiveLetter('');
                                    setCategoryFilter('all');
                                }}
                                className="mt-4 px-6 py-2 bg-[#5869A3] text-white rounded-lg hover:bg-[#48578A] transition"
                            >
                                Réinitialiser les filtres
                            </button>
                        </div>
                    )}
                </div>
            </main>
            
        </div>
    );
};

export default ServiceDevis;