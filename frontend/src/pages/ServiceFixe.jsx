import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FiSearch, FiFilter, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaStar,  FaHome, 
    FaTshirt, 
    FaTree, 
    FaWater, 
    FaCouch, 
    FaPaw, 
    FaBicycle,
    FaToolbox,
    FaGlassCheers,
    FaLaptop,
    FaUtensils,
    FaBaby,
    FaCar,
    FaShoppingBasket,
    FaFaucet,
    FaBoxOpen,
    FaPlug,
    FaSwimmingPool,
    FaPaintRoller,
     FaRegClock,
      } from 'react-icons/fa';

const ServiceFixe = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeLetter, setActiveLetter] = useState('');
    const [priceFilter, setPriceFilter] = useState('all');
    const [showFilters, setShowFilters] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const servicesPerPage = 10;

    // Données des services
    const [fixedServices] = useState([
        {
            id: 1,
            title: "Ménage standard",
            description: "Nettoyage complet incluant salon, chambres, cuisine et salle de bain",
            price: 200,
            duration: "2-3 heures",
            image: "menage.jpg",
            rating: 4.5,
            category: "menage",
            icon: <FaHome className="text-2xl text-[#5869A3]" />
        },
        {
            id: 2,
            title: "Repassage de vêtements",
            description: "Repassage soigné de vos vêtements (jusqu'à 10 kg)",
            price: 150,
            duration: "2 heures",
            image: "repassage.jpg",
            rating: 4.7,
            category: "menage",
            icon: <FaTshirt className="text-2xl text-[#5869A3]" />
        },
        {
            id: 3,
            title: "Jardinage basique",
            description: "Tonte de pelouse et taille des haies (jusqu'à 50m²)",
            price: 300,
            duration: "3 heures",
            image: "jardinage.jpg",
            rating: 4.6,
            category: "jardin",
            icon: <FaTree className="text-2xl text-[#5869A3]" />
        },
        {
            id: 4,
            title: "Lavage de vitres",
            description: "Nettoyage intérieur et extérieur des vitres (max 10 fenêtres)",
            price: 250,
            duration: "2 heures",
            image: "vitres.jpg",
            rating: 4.3,
            category: "menage",
            icon: <FaWater className="text-2xl text-[#5869A3]" />
        },
        {
            id: 5,
            title: "Nettoyage de tapis",
            description: "Shampouinage professionnel de vos tapis (jusqu'à 3 tapis standards)",
            price: 180,
            duration: "2 heures",
            image: "tapis.jpg",
            rating: 4.4,
            category: "menage",
            icon: <FaCouch className="text-2xl text-[#5869A3]" />
        },
        {
            id: 6,
            title: "Pet-sitting (1 jour)",
            description: "Garde d'animaux à domicile (1 visite par jour)",
            price: 120,
            duration: "1 heure/jour",
            image: "petsitting.jpg",
            rating: 4.8,
            category: "animaux",
            icon: <FaPaw className="text-2xl text-[#5869A3]" />
        },
        {
            id: 7,
            title: "Coursier local",
            description: "Livraison de colis dans un rayon de 10 km",
            price: 100,
            duration: "1 course",
            image: "coursier.jpg",
            rating: 4.2,
            category: "livraison",
            icon: <FaBicycle className="text-2xl text-[#5869A3]" />
        },
        {
            id: 8,
            title: "Montage de meuble",
            description: "Assemblage d'un meuble standard (IKEA, etc.)",
            price: 220,
            duration: "2-3 heures",
            image: "meuble.jpg",
            rating: 4.5,
            category: "bricolage",
            icon: <FaToolbox className="text-2xl text-[#5869A3]" />
        },
        {
            id: 9,
            title: "Nettoyage après fête",
            description: "Nettoyage complet après événement (jusqu'à 50m²)",
            price: 350,
            duration: "4 heures",
            image: "fete.jpg",
            rating: 4.6,
            category: "menage",
            icon: <FaGlassCheers className="text-2xl text-[#5869A3]" />
        },
        {
            id: 10,
            title: "Service de pressing",
            description: "Retrait et livraison de vos vêtements au pressing",
            price: 80,
            duration: "1 heure",
            image: "pressing.jpg",
            rating: 4.1,
            category: "menage",
            icon: <FaTshirt className="text-2xl text-[#5869A3]" />
        },
        {
            id: 11,
            title: "Décoration intérieure",
            description: "Conseils et aide à la décoration d'une pièce",
            price: 400,
            duration: "3 heures",
            image: "deco.jpg",
            rating: 4.7,
            category: "decoration",
            icon: <FaPaintRoller className="text-2xl text-[#5869A3]" />
        },
        {
            id: 12,
            title: "Service informatique",
            description: "Installation et configuration de matériel informatique",
            price: 250,
            duration: "2 heures",
            image: "informatique.jpg",
            rating: 4.9,
            category: "technologie",
            icon: <FaLaptop className="text-2xl text-[#5869A3]" />
        },
        {
            id: 13,
            title: "Préparation de repas",
            description: "Préparation de 5 repas équilibrés pour la semaine",
            price: 280,
            duration: "3 heures",
            image: "repas.jpg",
            rating: 4.6,
            category: "cuisine",
            icon: <FaUtensils className="text-2xl text-[#5869A3]" />
        },
        {
            id: 14,
            title: "Garde d'enfants (soirée)",
            description: "Garde d'enfants à domicile (jusqu'à 3 enfants, 4 heures)",
            price: 150,
            duration: "4 heures",
            image: "garde.jpg",
            rating: 4.8,
            category: "famille",
            icon: <FaBaby className="text-2xl text-[#5869A3]" />
        },
        {
            id: 15,
            title: "Nettoyage de voiture",
            description: "Nettoyage intérieur et extérieur complet",
            price: 180,
            duration: "1h30",
            image: "voiture.jpg",
            rating: 4.4,
            category: "automobile",
            icon: <FaCar className="text-2xl text-[#5869A3]" />
        },
        {
            id: 16,
            title: "Aide aux courses",
            description: "Faire vos courses et les livrer à domicile",
            price: 120,
            duration: "2 heures",
            image: "courses.jpg",
            rating: 4.3,
            category: "livraison",
            icon: <FaShoppingBasket className="text-2xl text-[#5869A3]" />
        },
        {
            id: 17,
            title: "Service de plomberie basique",
            description: "Réparation de fuites et problèmes simples",
            price: 300,
            duration: "2 heures",
            image: "plomberie.jpg",
            rating: 4.7,
            category: "bricolage",
            icon: <FaFaucet className="text-2xl text-[#5869A3]" />
        },
        {
            id: 18,
            title: "Organisation de placards",
            description: "Tri et organisation de vos placards et rangements",
            price: 220,
            duration: "3 heures",
            image: "organisation.jpg",
            rating: 4.5,
            category: "menage",
            icon: <FaBoxOpen className="text-2xl text-[#5869A3]" />
        },
        {
            id: 19,
            title: "Service électrique basique",
            description: "Installation d'appareils et dépannages simples",
            price: 280,
            duration: "2 heures",
            image: "electrique.jpg",
            rating: 4.6,
            category: "bricolage",
            icon: <FaPlug className="text-2xl text-[#5869A3]" />
        },
        {
            id: 20,
            title: "Nettoyage de piscine",
            description: "Nettoyage et traitement d'une piscine (jusqu'à 30m³)",
            price: 350,
            duration: "3 heures",
            image: "piscine.jpg",
            rating: 4.7,
            category: "jardin",
            icon: <FaSwimmingPool className="text-2xl text-[#5869A3]" />
        }
    ]);

    // Filtrage
    const filteredServices = fixedServices.filter(service => {
        const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            service.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesLetter = !activeLetter || activeLetter === 'Tous' || 
                            service.title.startsWith(activeLetter);
        const matchesPrice = priceFilter === 'all' || 
                           (priceFilter === 'under200' && service.price < 200) ||
                           (priceFilter === '200-300' && service.price >= 200 && service.price <= 300) ||
                           (priceFilter === 'over300' && service.price > 300);
        
        return matchesSearch && matchesLetter && matchesPrice;
    });

    // Pagination
    const indexOfLastService = currentPage * servicesPerPage;
    const indexOfFirstService = indexOfLastService - servicesPerPage;
    const currentServices = filteredServices.slice(indexOfFirstService, indexOfLastService);
    const totalPages = Math.ceil(filteredServices.length / servicesPerPage);

    // Alphabet pour filtrage
    const alphabet = ['Tous', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];

    // Réinitialiser la page quand les filtres changent
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, activeLetter, priceFilter]);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            
            <main className="flex-grow container mx-auto px-4 py-8">
                {/* Titre avec style amélioré */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-[#5869A3] mb-4 relative pb-2 
                        after:content-[''] after:block after:w-20 after:h-1 after:bg-[#5869A3] 
                        after:mt-4 after:mx-auto after:rounded-full">
                        Nos Services à Prix Fixe
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Des services de qualité avec des tarifs transparents
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
                                    <h4 className="font-medium mb-3 text-gray-700">Tranche de prix</h4>
                                    <div className="flex flex-wrap gap-3">
                                        {[
                                            {value: 'all', label: 'Tous les prix'},
                                            {value: 'under200', label: '< 200 MAD'},
                                            {value: '200-300', label: '200-300 MAD'},
                                            {value: 'over300', label: '> 300 MAD'}
                                        ].map((filter) => (
                                            <button 
                                                key={filter.value}
                                                onClick={() => setPriceFilter(filter.value)}
                                                className={`px-4 py-2 rounded-full text-sm ${
                                                    priceFilter === filter.value ? 
                                                    'bg-[#5869A3] text-white' : 'bg-gray-200 hover:bg-gray-300'
                                                }`}
                                            >
                                                {filter.label}
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
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-8">
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
                                        </div>
                                        
                                        <div className="p-6 flex-grow flex flex-col">
                                            <div className="flex items-center mb-3">
                                                <div className="mr-3">
                                                    {service.icon}
                                                </div>
                                                <h2 className="text-xl font-bold text-[#5869A3]">{service.title}</h2>
                                            </div>
                                            <p className="text-gray-600 mb-4 flex-grow">{service.description}</p>
                                            
                                            <div className="flex justify-between items-center mb-4">
                                                <span className="text-2xl font-bold text-[#5869A3]">{service.price} MAD</span>
                                                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                                    {service.duration}
                                                </span>
                                            </div>
                                            
                                            <button className="w-full bg-[#5869A3] hover:bg-[#48578A] text-white py-3 rounded-lg font-medium transition-colors duration-300 mt-auto">
                                                Commander
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
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
                                    setPriceFilter('all');
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

export default ServiceFixe;