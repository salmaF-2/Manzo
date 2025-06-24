import { 
    FaStar,FaHands, FaToolbox, FaTruckMoving, FaHammer, FaBolt, FaSeedling, 
    FaPaintRoller, FaFaucet, FaSnowflake, FaUtensils, FaBath, FaHome, 
    FaHouseDamage, FaSwimmingPool, FaLaptop, FaShieldAlt, FaFire, 
    FaLevelUpAlt, FaTree, FaFilm, FaWineBottle, FaDumbbell, FaRegClock,
    FaWater, FaCouch, FaPaw, FaBicycle, FaGlassCheers, FaBaby, FaCar,
    FaShoppingBasket, FaBoxOpen, FaPlug, FaBirthdayCake, FaTshirt
  } from 'react-icons/fa';
  
  export const servicesFixes = [
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
        image: "petsitting.avif",
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
        icon: <FaBirthdayCake className="text-2xl text-[#5869A3]" />
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
        image: "babysitting.jpg",
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
    },{
        id: 21,
        title: "Installation de climatiseur",
        description: "Installation d'un climatiseur mural (fourni par le client)",
        price: 450,
        duration: "3 heures",
        image: "climatisation.jpg",
        rating: 4.6,
        category: "bricolage",
        icon: <FaSnowflake className="text-2xl text-[#5869A3]" />
      },
      {
        id: 22,
        title: "Cours particulier (1h)",
        description: "Soutien scolaire en mathématiques niveau collège",
        price: 100,
        duration: "1 heure",
        image: "cours-maths.jpg",
        rating: 4.8,
        category: "education",
        icon: <FaLaptop className="text-2xl text-[#5869A3]" />
      },
      {
        id: 23,
        title: "Massage relaxant",
        description: "Séance de massage corporel d'1h à domicile",
        price: 300,
        duration: "1 heure",
        image: "massage.jpg",
        rating: 4.9,
        category: "bienetre",
        icon: <FaHands className="text-2xl text-[#5869A3]" />
      },
      {
        id: 24,
        title: "Dépannage informatique",
        description: "Diagnostic et résolution de problèmes informatiques",
        price: 200,
        duration: "1-2 heures",
        image: "depannage-info.jpg",
        rating: 4.7,
        category: "technologie",
        icon: <FaLaptop className="text-2xl text-[#5869A3]" />
      },
      {
        id: 25,
        title: "Taille de haie",
        description: "Taille de haie jusqu'à 10 mètres linéaires",
        price: 180,
        duration: "2 heures",
        image: "taille-haie.jpg",
        rating: 4.5,
        category: "jardin",
        icon: <FaTree className="text-2xl text-[#5869A3]" />
      },
      {
        id: 26,
        title: "Garde de plantes",
        description: "Entretien de vos plantes d'intérieur pendant votre absence",
        price: 80,
        duration: "30 minutes/visite",
        image: "plantes.jpg",
        rating: 4.4,
        category: "jardin",
        icon: <FaSeedling className="text-2xl text-[#5869A3]" />
      },
      {
        id: 27,
        title: "Service de traiteur basique",
        description: "Préparation et livraison de repas pour 4 personnes",
        price: 400,
        duration: "3 heures",
        image: "traiteur.jpg",
        rating: 4.6,
        category: "cuisine",
        icon: <FaUtensils className="text-2xl text-[#5869A3]" />
      },
      {
        id: 28,
        title: "Nettoyage de moquette",
        description: "Nettoyage professionnel de moquette (jusqu'à 20m²)",
        price: 250,
        duration: "2 heures",
        image: "moquette.jpg",
        rating: 4.5,
        category: "menage",
        icon: <FaCouch className="text-2xl text-[#5869A3]" />
      },
      {
        id: 29,
        title: "Montage de vélo",
        description: "Assemblage d'un vélo neuf ou réassemblage après transport",
        price: 150,
        duration: "1-2 heures",
        image: "velo.jpg",
        rating: 4.7,
        category: "bricolage",
        icon: <FaBicycle className="text-2xl text-[#5869A3]" />
      },
      {
        id: 30,
        title: "Service de conciergerie",
        description: "Courses, réservations et petites tâches administratives",
        price: 120,
        duration: "2 heures",
        image: "conciergerie.jpg",
        rating: 4.3,
        category: "divers",
        icon: <FaShoppingBasket className="text-2xl text-[#5869A3]" />
      }
  ];
  
  export const servicesDevis = [
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
        title: "Salle de sport privée",
        description: "Conception d'espace fitness personnalisé",
        startingPrice: 25000,
        details: "Équipements professionnels",
        image: "sport.jpg",
        rating: 4.7,
        category: "amenagement",
        icon: <FaDumbbell className="text-2xl text-[#5869A3]" />
    },
    {
        id: 20,
        title: "Isolation thermique",
        description: "Isolation complète des combles ou murs",
        startingPrice: 15000,
        details: "Matériaux écologiques disponibles",
        image: "isolation.jpg",
        rating: 4.8,
        category: "renovation",
        icon: <FaHome className="text-2xl text-[#5869A3]" />
      },
      {
        id: 21,
        title: "Veranda sur mesure",
        description: "Construction de véranda en aluminium ou bois",
        startingPrice: 30000,
        details: "Plusieurs modèles disponibles",
        image: "veranda.jpg",
        rating: 4.7,
        category: "amenagement",
        icon: <FaHome className="text-2xl text-[#5869A3]" />
      },
      {
        id: 22,
        title: "Salle de bain accessible",
        description: "Aménagement PMR avec douche à l'italienne",
        startingPrice: 18000,
        details: "Conforme aux normes d'accessibilité",
        image: "sdb-pmr.jpg",
        rating: 4.9,
        category: "renovation",
        icon: <FaBath className="text-2xl text-[#5869A3]" />
      },
      {
        id: 23,
        title: "Éclairage extérieur",
        description: "Installation complète avec détecteurs de mouvement",
        startingPrice: 7000,
        details: "Solutions LED économiques",
        image: "eclairage.jpg",
        rating: 4.6,
        category: "exterieur",
        icon: <FaBolt className="text-2xl text-[#5869A3]" />
      },
      {
        id: 24,
        title: "Portail automatique",
        description: "Installation de portail coulissant ou battant",
        startingPrice: 12000,
        details: "Plusieurs motorisations disponibles",
        image: "portail.jpg",
        rating: 4.7,
        category: "exterieur",
        icon: <FaHome className="text-2xl text-[#5869A3]" />
      },
      {
        id: 25,
        title: "Bureau jardin",
        description: "Construction d'un espace de travail dans le jardin",
        startingPrice: 25000,
        details: "Isolation et électricité incluses",
        image: "bureau-jardin.jpg",
        rating: 4.8,
        category: "amenagement",
        icon: <FaLaptop className="text-2xl text-[#5869A3]" />
      },
      {
        id: 26,
        title: "Salle de jeux enfants",
        description: "Aménagement complet avec rangements sécurisés",
        startingPrice: 15000,
        details: "Personnalisation selon l'âge",
        image: "salle-jeux.jpg",
        rating: 4.7,
        category: "amenagement",
        icon: <FaBaby className="text-2xl text-[#5869A3]" />
      },
      {
        id: 27,
        title: "Mur végétalisé",
        description: "Installation d'un mur végétal intérieur ou extérieur",
        startingPrice: 8000,
        details: "Plantes adaptées au climat",
        image: "mur-vegetal.jpg",
        rating: 4.6,
        category: "decoration",
        icon: <FaTree className="text-2xl text-[#5869A3]" />
      },
      {
        id: 28,
        title: "Système d'arrosage automatique",
        description: "Installation complète avec programmateur",
        startingPrice: 5000,
        details: "Goutte-à-goutte ou aspersion",
        image: "arrosage.jpg",
        rating: 4.5,
        category: "jardin",
        icon: <FaWater className="text-2xl text-[#5869A3]" />
      },
      {
        id: 29,
        title: "Studio indépendant",
        description: "Construction d'un studio dans le jardin",
        startingPrice: 60000,
        details: "Permis de construire inclus",
        image: "studio.jpg",
        rating: 4.9,
        category: "construction",
        icon: <FaHome className="text-2xl text-[#5869A3]" />
      }]

      export const prestataires = {
        Marrakech: [
          {
            id: 1,
            nom: 'Hamid Services',
            service: 'Plomberie',
            note: 4.7,
            avis: 128,
            distance: '2.5 km',
            prix: '200-400 MAD',
            pricingType: 'fixed', // Prix fixe pour les interventions standard
            photo: 'https://randomuser.me/api/portraits/men/1.jpg',
            localisation: [31.6295, -7.9811],
            email: 'hamid@manzo.ma',
            description: 'Plombier professionnel avec 10 ans d\'expérience.',
            disponibilite: 'Lun-Ven: 8h-20h',
            details: {
              certifications: ['CAP Plomberie', 'Certification Gaz'],
              equipement: 'Matériel professionnel complet',
              garantie: '1 an sur les interventions',
              photosTravaux: [
                'https://example.com/plomberie1.jpg',
                'https://example.com/plomberie2.jpg'
              ]
            }
          },
          
          {
            id: 2,
            nom: 'Fatima Ménage',
            service: 'Ménage',
            note: 4.9,
            avis: 215,
            distance: '1.2 km',
            prix: '150-300 MAD',
            pricingType: 'fixed', // Service standard avec prix fixe
            photo: 'https://randomuser.me/api/portraits/women/1.jpg',
            localisation: [31.6250, -7.9830],
            email: 'fatima@manzo.ma',
            description: 'Service de ménage complet avec produits écologiques.',
            disponibilite: 'Tous les jours: 7h-22h',
            details: {
              certifications: ['Certification Eco-label'],
              produitsEco: true,
              photosTravaux: [
                'https://example.com/menage1.jpg'
              ]
            }
          },
          {
            id: 101,
            nom: 'Youssef Jardinage',
            service: 'Jardinage',
            note: 4.6,
            avis: 92,
            distance: '3.2 km',
            prix: '180-350 MAD',
            pricingType: 'fixed', // Prix fixe pour l'entretien régulier
            photo: 'https://randomuser.me/api/portraits/men/22.jpg',
            localisation: [31.6200, -7.9900],
            email: 'youssef@manzo.ma',
            description: 'Entretien de jardins et espaces verts avec matériel professionnel.',
            disponibilite: 'Lun-Sam: 7h-18h',
            details: {
              equipement: 'Tondeuse, taille-haie, souffleur',
              produitsBio: true
            }
          },
          {
            id: 102,
            nom: 'Karim Electric',
            service: 'Électricité',
            note: 4.8,
            avis: 145,
            distance: '2.8 km',
            prix: '250-600 MAD',
            pricingType: 'fixed', // Prix fixe pour les interventions standard
            photo: 'https://randomuser.me/api/portraits/men/33.jpg',
            localisation: [31.6300, -7.9750],
            email: 'karim@manzo.ma',
            description: 'Électricien certifié pour installations et dépannages.',
            disponibilite: 'Lun-Ven: 8h-19h',
            details: {
              certifications: ['BEP Électricité', 'Certification NFC 15-100']
            }
          },{
  id: 2,
  nom: 'Karim Plomberie Express',
  service: 'Plomberie',
  note: 4.9,
  avis: 215,
  distance: '1.8 km',
  prix: '150-350 MAD',
  pricingType: 'fixed',
  photo: 'https://randomuser.me/api/portraits/men/32.jpg',
  localisation: [31.6259, -7.9893],
  email: 'karim@plomberie-express.ma',
  description: 'Service rapide et efficace 24h/24 pour vos urgences plomberie.',
  disponibilite: '7j/7 - 24h/24',
  details: {
    specialites: ['Dépannage urgent', 'Chauffe-eau', 'Canalisations'],
    certifications: ['BTS Fluides', 'Certifié Vinci Energies'],
    equipement: 'Camion atelier équipé',
    garantie: '2 ans sur les installations',
    langues: ['Arabe', 'Français', 'Anglais'],
    photosTravaux: [
      'https://example.com/karim1.jpg',
      'https://example.com/karim2.jpg'
    ],
    services: [
      'Réparation fuites',
      'Installation sanitaire',
      'Détection fuites',
      'Débouchage'
    ]
  }
},
        ],
        Casablanca: [
          {
            id: 3,
            nom: 'Karim Électricité',
            service: 'Électricité',
            note: 4.5,
            avis: 95,
            distance: '3.1 km',
            prix: '250-500 MAD',
            pricingType: 'fixed', // Prix fixe pour les dépannages
            photo: 'https://randomuser.me/api/portraits/men/32.jpg',
            localisation: [33.5731, -7.5898],
            email: 'karim@manzo.ma',
            description: 'Électricien certifié pour installations domestiques.',
            disponibilite: 'Lun-Sam: 9h-19h',
            details: {
              certifications: ['BEP Électricité', 'Certification NFC 15-100'],
              garantie: '2 ans sur les installations'
            }
          },
          {
            id: 201,
            nom: 'Leila Nettoyage',
            service: 'Ménage',
            note: 4.7,
            avis: 178,
            distance: '1.5 km',
            prix: '160-320 MAD',
            pricingType: 'fixed', // Service standard avec prix fixe
            photo: 'https://randomuser.me/api/portraits/women/25.jpg',
            localisation: [33.5700, -7.5800],
            email: 'leila@manzo.ma',
            description: 'Service de ménage complet avec produits écologiques.',
            disponibilite: 'Lun-Sam: 8h-20h',
            details: {
              produitsEco: true,
              equipement: 'Aspirateur professionnel'
            }
          },
          {
            id: 202,
            nom: 'Mehdi Informatique',
            service: 'Informatique',
            note: 4.9,
            avis: 210,
            distance: '2.3 km',
            prix: '300-800 MAD',
            pricingType: 'quote', // Dépannage informatique peut nécessiter un devis
            photo: 'https://randomuser.me/api/portraits/men/45.jpg',
            localisation: [33.5750, -7.5850],
            email: 'mehdi@manzo.ma',
            description: 'Dépannage informatique à domicile pour particuliers et professionnels.',
            disponibilite: 'Lun-Dim: 9h-21h',
            details: {
              specialites: ['Hardware', 'Réseaux', 'Logiciels']
            }
          }
        ],
        Rabat: [
          {
            id: 301,
            nom: 'Leila Couture',
            service: 'Couture',
            note: 4.8,
            avis: 142,
            distance: '1.5 km',
            prix: '80-200 MAD',
            pricingType: 'fixed', // Prix fixe pour les retouches standard
            photo: 'https://randomuser.me/api/portraits/women/42.jpg',
            localisation: [34.0209, -6.8416],
            email: 'leila@manzo.ma',
            description: 'Couturière expérimentée pour retouches et créations sur mesure.',
            disponibilite: 'Mar-Sam: 9h-18h',
            details: {
              specialites: ['Retouches', 'Habits traditionnels', 'Création sur mesure']
            }
          },
          {
            id: 302,
            nom: 'Mehdi Informatique',
            service: 'Informatique',
            note: 4.7,
            avis: 98,
            distance: '2.3 km',
            prix: '200-500 MAD',
            pricingType: 'quote', // Dépannage peut nécessiter un devis
            photo: 'https://randomuser.me/api/portraits/men/45.jpg',
            localisation: [34.0250, -6.8350],
            email: 'mehdi@manzo.ma',
            description: 'Dépannage informatique à domicile pour particuliers et professionnels.',
            disponibilite: 'Lun-Ven: 8h-20h',
            details: {
              certifications: ['CISCO', 'Microsoft']
            }
          },
          {
            id: 303,
            nom: 'Hassan Plomberie',
            service: 'Plomberie',
            note: 4.6,
            avis: 115,
            distance: '3.0 km',
            prix: '220-450 MAD',
            pricingType: 'fixed', // Prix fixe pour les interventions standard
            photo: 'https://randomuser.me/api/portraits/men/50.jpg',
            localisation: [34.0180, -6.8500],
            email: 'hassan@manzo.ma',
            description: 'Plombier professionnel pour dépannages et installations.',
            disponibilite: 'Lun-Sam: 8h-19h'
          }
        ],
        Tanger: [
          {
            id: 401,
            nom: 'Youssef Jardinage',
            service: 'Jardinage',
            note: 4.6,
            avis: 87,
            distance: '3.0 km',
            prix: '150-350 MAD',
            pricingType: 'fixed', // Prix fixe pour l'entretien régulier
            photo: 'https://randomuser.me/api/portraits/men/60.jpg',
            localisation: [35.7595, -5.8340],
            email: 'youssef@manzo.ma',
            description: 'Entretien de jardins et espaces verts avec matériel professionnel.',
            disponibilite: 'Lun-Sam: 7h-17h',
            details: {
              equipement: 'Tondeuse, taille-haie, souffleur'
            }
          },
          {
            id: 402,
            nom: 'Nadia Beauté',
            service: 'Coiffure',
            note: 4.8,
            avis: 134,
            distance: '1.8 km',
            prix: '120-300 MAD',
            pricingType: 'fixed', // Prix fixe pour les services de coiffure
            photo: 'https://randomuser.me/api/portraits/women/55.jpg',
            localisation: [35.7600, -5.8300],
            email: 'nadia@manzo.ma',
            description: 'Coiffeuse à domicile pour femmes et enfants.',
            disponibilite: 'Mar-Sam: 9h-19h'
          }
        ],
        Agadir: [
          {
            id: 501,
            nom: 'Nadia Massage',
            service: 'Bien-être',
            note: 4.9,
            avis: 156,
            distance: '1.8 km',
            prix: '250-400 MAD',
            pricingType: 'fixed', // Prix fixe pour les massages
            photo: 'https://randomuser.me/api/portraits/women/65.jpg',
            localisation: [30.4278, -9.5981],
            email: 'nadia@manzo.ma',
            description: 'Massothérapeute diplômée, spécialisée en massage relaxant et sportif.',
            disponibilite: 'Tous les jours: 9h-21h',
            details: {
              certifications: ['Diplôme de massothérapie'],
              typesMassage: ['Relaxant', 'Sportif', 'Ayurvédique']
            }
          },
          {
            id: 502,
            nom: 'Karim Climatisation',
            service: 'Climatisation',
            note: 4.7,
            avis: 112,
            distance: '4.2 km',
            prix: '300-600 MAD',
            pricingType: 'quote', // Installation peut nécessiter un devis
            photo: 'https://randomuser.me/api/portraits/men/70.jpg',
            localisation: [30.4300, -9.6000],
            email: 'karim-clim@manzo.ma',
            description: 'Installation et réparation de climatiseurs toutes marques.',
            disponibilite: 'Lun-Dim: 8h-20h',
            details: {
              marques: ['Daikin', 'LG', 'Samsung']
            }
          },
          {
            id: 503,
            nom: 'Said Peinture',
            service: 'Peinture',
            note: 4.5,
            avis: 89,
            distance: '2.5 km',
            prix: '200-500 MAD',
            pricingType: 'quote', // Peinture peut nécessiter un devis selon surface
            photo: 'https://randomuser.me/api/portraits/men/75.jpg',
            localisation: [30.4250, -9.5950],
            email: 'said@manzo.ma',
            description: 'Peintre professionnel pour intérieur et extérieur.',
            disponibilite: 'Lun-Sam: 8h-18h'
          },{
  id: 504,
  nom: 'Nettoyage Express Agadir',
  service: 'Ménage',
  note: 4.5,
  avis: 89,
  distance: '1.2 km',
  prix: '120-200 MAD',
  pricingType: 'fixed',
  photo: 'https://randomuser.me/api/portraits/women/22.jpg',
  localisation: [31.6287, -7.9881],
  description: 'Service de ménage complet pour particuliers avec produits écologiques.',
  disponibilite: 'Lun-Sam: 8h-18h',
  details: {
    servicesInclus: [
      'Dépoussiérage complet',
      'Nettoyage sols',
      'Nettoyage salle de bain',
      'Nettoyage cuisine'
    ],
    equipement: 'Apporte tous les produits et matériels',
    produits: 'Écologiques (certifiés EcoLabel)',
    dureeMoyenne: '2-3 heures pour 50m²'
  }
},
{
  id: 505,
  nom: 'Clean Luxury Services',
  service: 'Ménage',
  note: 4.9,
  avis: 156,
  distance: '2.8 km',
  prix: '300-500 MAD',
  pricingType: 'fixed',
  photo: 'https://randomuser.me/api/portraits/women/45.jpg',
  localisation: [31.6243, -7.9836],
  description: 'Service haut de gamme avec protocole de nettoyage professionnel pour résidences et villas.',
  disponibilite: '7j/7 sur rendez-vous',
  premium: true,
  details: {
    protocole: [
      'Méthode en 7 étapes',
      'Nettoyage profond',
      'Désinfection aux UV',
      'Aspiration HEPA'
    ],
    certifications: ['Certification ISSA', 'Formation Hygiène Hospitalière'],
    cibles: ['Résidences haut standing', 'Airbnb premium', 'Bureaux'],
    garantie: 'Satisfait ou nettoyage gratuit'
  },
  inclus: [
    'Nettoyage vitres',
    'Désinfection',
    'Rangement',
    'Produits luxe'
  ]
},
{
  id: 506,
  nom: 'Fatima Ménage & Repassage',
  service: 'Ménage',
  note: 4.7,
  avis: 203,
  distance: '0.8 km',
  prix: '150-250 MAD',
  pricingType: 'fixed',
  photo: 'https://randomuser.me/api/portraits/women/63.jpg',
  localisation: [31.6302, -7.9847],
  description: 'Service complet de ménage incluant repassage avec une équipe de 2 professionnelles.',
  disponibilite: 'Lun-Ven: 7h-20h',
  equipe: true,
  details: {
    services: {
      menage: [
        'Nettoyage complet',
        'Changement linge',
        'Rangement',
        'Aspiration'
      ],
      repassage: [
        'Jusqu\'à 10 kg inclus',
        'Pliage professionnel',
        'Repassage délicat'
      ]
    },
    avantages: [
      'Même équipe à chaque visite',
      'Clé remise en sécurité',
      'Flexibilité horaire'
    ]
  },
 
}
        ],
        Fes: [
          {
            id: 601,
            nom: 'Ahmed Peinture',
            service: 'Peinture',
            note: 4.5,
            avis: 76,
            distance: '2.7 km',
            prix: '180-400 MAD',
            pricingType: 'quote', // Peinture nécessite généralement un devis
            photo: 'https://randomuser.me/api/portraits/men/80.jpg',
            localisation: [34.0333, -5.0000],
            email: 'ahmed-peintre@manzo.ma',
            description: 'Peintre professionnel pour intérieur et extérieur.',
            disponibilite: 'Lun-Sam: 8h-19h',
            details: {
              typesPeinture: ['Acrylique', 'Glycéro', 'Naturelle']
            }
          },
          {
            id: 602,
            nom: 'Fatima Ménage',
            service: 'Ménage',
            note: 4.7,
            avis: 102,
            distance: '1.2 km',
            prix: '130-280 MAD',
            pricingType: 'fixed', // Service standard avec prix fixe
            photo: 'https://randomuser.me/api/portraits/women/85.jpg',
            localisation: [34.0300, -5.0100],
            email: 'fatima@manzo.ma',
            description: 'Service de ménage complet avec produits naturels.',
            disponibilite: 'Lun-Ven: 7h-18h'
          }
        ],
        Oujda: [
          {
            id: 701,
            nom: 'Samira Ménage',
            service: 'Ménage',
            note: 4.8,
            avis: 134,
            distance: '1.1 km',
            prix: '120-250 MAD',
            pricingType: 'fixed', // Service standard avec prix fixe
            photo: 'https://randomuser.me/api/portraits/women/75.jpg',
            localisation: [34.6867, -1.9114],
            email: 'samira@manzo.ma',
            description: 'Service de ménage complet avec produits naturels.',
            disponibilite: 'Lun-Ven: 7h-18h',
            details: {
              produitsEco: true,
              equipement: 'Aspirateur professionnel'
            }
          },
          {
            id: 702,
            nom: 'Mohamed Electric',
            service: 'Électricité',
            note: 4.6,
            avis: 87,
            distance: '2.5 km',
            prix: '200-450 MAD',
            pricingType: 'fixed', // Prix fixe pour les interventions standard
            photo: 'https://randomuser.me/api/portraits/men/90.jpg',
            localisation: [34.6800, -1.9100],
            email: 'mohamed@manzo.ma',
            description: 'Électricien professionnel pour installations et dépannages.',
            disponibilite: 'Lun-Sam: 8h-18h'
          }
        ],
        Meknes: [
          {
            id: 801,
            nom: 'Khalid Plomberie',
            service: 'Plomberie',
            note: 4.7,
            avis: 112,
            distance: '2.0 km',
            prix: '180-400 MAD',
            pricingType: 'fixed', // Prix fixe pour les interventions standard
            photo: 'https://randomuser.me/api/portraits/men/95.jpg',
            localisation: [33.8920, -5.5400],
            email: 'khalid@manzo.ma',
            description: 'Plombier professionnel pour dépannages et installations.',
            disponibilite: 'Lun-Sam: 8h-19h'
          },
          {
            id: 802,
            nom: 'Aicha Couture',
            service: 'Couture',
            note: 4.9,
            avis: 156,
            distance: '1.3 km',
            prix: '70-180 MAD',
            pricingType: 'fixed', // Prix fixe pour les retouches standard
            photo: 'https://randomuser.me/api/portraits/women/95.jpg',
            localisation: [33.8950, -5.5350],
            email: 'aicha@manzo.ma',
            description: 'Couturière expérimentée pour retouches et créations.',
            disponibilite: 'Mar-Sam: 9h-17h'
          }
        ],
        Tetouan: [
          {
            id: 901,
            nom: 'Yassin Jardinage',
            service: 'Jardinage',
            note: 4.5,
            avis: 78,
            distance: '3.2 km',
            prix: '160-320 MAD',
            pricingType: 'fixed', // Prix fixe pour l'entretien régulier
            photo: 'https://randomuser.me/api/portraits/men/100.jpg',
            localisation: [35.5762, -5.3684],
            email: 'yassin@manzo.ma',
            description: 'Entretien de jardins et espaces verts.',
            disponibilite: 'Lun-Ven: 8h-17h'
          },
          {
            id: 902,
            nom: 'Leila Ménage',
            service: 'Ménage',
            note: 4.7,
            avis: 98,
            distance: '1.5 km',
            prix: '140-260 MAD',
            pricingType: 'fixed', // Service standard avec prix fixe
            photo: 'https://randomuser.me/api/portraits/women/100.jpg',
            localisation: [35.5800, -5.3700],
            email: 'leila@manzo.ma',
            description: 'Service de ménage complet avec produits écologiques.',
            disponibilite: 'Lun-Sam: 8h-18h'
          }
        ]
      };
      export const villes = Object.keys(prestataires);

      export const cityCoordinates = {
        Marrakech: { lat: 31.6295, lng: -7.9811, zoom: 13 },
        Casablanca: { lat: 33.5731, lng: -7.5898, zoom: 12 },
        Rabat: { lat: 34.0209, lng: -6.8416, zoom: 13 },
        Tanger: { lat: 35.7595, lng: -5.8340, zoom: 13 },
        Agadir: { lat: 30.4278, lng: -9.5981, zoom: 13 },
        Fes: { lat: 34.0333, lng: -5.0000, zoom: 13 },
        Oujda: { lat: 34.6867, lng: -1.9114, zoom: 13 },
        Meknes: { lat: 33.8920, lng: -5.5400, zoom: 13 },
        Tetouan: { lat: 35.5762, lng: -5.3684, zoom: 13 }
      };
  export const categories = [
    { id: 'all', name: 'Tous les services', icon: <FaHome /> },
    { id: 'menage', name: 'Ménage', icon: <FaTshirt /> },
    { id: 'jardin', name: 'Jardinage', icon: <FaTree /> },
    { id: 'animaux', name: 'Animaux', icon: <FaPaw /> },
    { id: 'livraison', name: 'Livraison', icon: <FaBicycle /> },
    { id: 'bricolage', name: 'Bricolage', icon: <FaToolbox /> },
    { id: 'decoration', name: 'Décoration', icon: <FaPaintRoller /> },
    { id: 'technologie', name: 'Technologie', icon: <FaLaptop /> },
    { id: 'cuisine', name: 'Cuisine', icon: <FaUtensils /> },
    { id: 'famille', name: 'Famille', icon: <FaBaby /> },
    { id: 'automobile', name: 'Auto', icon: <FaCar /> }
  ];