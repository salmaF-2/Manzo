const City = require('../models/City');
const User = require('../models/User'); // We need the User model here
const Service = require('../models/Service'); // We need the Service model here

exports.getAllCities = async (req, res) => {
    try {
        const cities = await City.find().populate('prestataires', 'nom prenom photo'); 
        res.json(cities);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addCity = async (req, res) => {
    try {
        const { name, image, coordinates, prestataires } = req.body;
        const city = new City({ name, image, coordinates, prestataires });
        await city.save();
        res.status(201).json(city);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getCityByName = async (req, res) => {
    try {
        const { name } = req.params;
        
        // FIX: Use a robust regex pattern that handles 'e' and 'é' to match the database
        const regexPattern = name.replace(/e/gi, '[eé]');

        // 1. Find the city document by name using the robust regex
        const city = await City.findOne({ name: { $regex: new RegExp(regexPattern, 'i') } })
            .populate({
                path: 'prestataires',
                model: 'User',
                select: 'nom prenom photo prestataireInfo.noteMoyenne prestataireInfo.nombreAvis prestataireInfo.secteurActivite',
                match: { role: 'prestataire' }
            });

        // 2. Fetch all services for this city
        let servicesInCity = [];
        let prestatairesInCity = [];
        let cityId = null;

        if (city && city.prestataires && city.prestataires.length > 0) {
            cityId = city._id;
            prestatairesInCity = city.prestataires;
        } else {
 
            prestatairesInCity = await User.find({
                role: 'prestataire',
                // Use the same robust regex for the user's 'ville' field
                ville: { $regex: new RegExp(regexPattern, 'i') }
            }).select('nom prenom photo prestataireInfo.noteMoyenne prestataireInfo.nombreAvis prestataireInfo.secteurActivite');
            
            // If we found a city but no prestataires were linked, we still need its ID for services
            if (city) {
                cityId = city._id;
            }
        }

        if (cityId) {
            servicesInCity = await Service.find({ 
                cities: cityId // Find services where the cities array contains the city's ID
            }).populate({
                path: 'prestataire', // Populate the prestataire field to get their name
                model: 'User',
                select: 'nom prenom'
            });
        }

        if (prestatairesInCity.length === 0 && servicesInCity.length === 0 && !city) {
            return res.status(404).json({ message: 'City not found and no services or prestataires available.' });
        }
        
        // 3. Extract unique service categories from the prestataires (for the filter tags)
        const servicesSet = new Set();
        prestatairesInCity.forEach(p => {
            if (p.prestataireInfo?.secteurActivite) {
                servicesSet.add(p.prestataireInfo.secteurActivite);
            }
        });
        const availableServices = Array.from(servicesSet);
        
        // 4. Format the populated prestataires for the frontend
        const formattedPrestataires = prestatairesInCity.map(p => ({
            _id: p._id,
            name: `${p.nom} ${p.prenom}`,
            service: p.prestataireInfo?.secteurActivite || 'Service non spécifié',
            photo: p.photo,
            averageRating: p.prestataireInfo?.noteMoyenne || 0,
            numberOfReviews: p.prestataireInfo?.nombreAvis || 0,
            distance: 'N/A'
        }));

        // <<< ADDED LOGIC: FORMAT SERVICES FOR THE FRONTEND >>>
        const formattedServices = servicesInCity.map(s => ({
            _id: s._id,
            title: s.title,
            description: s.description,
            price: s.price,
            image: s.image,
            prestataire: s.prestataire ? `${s.prestataire.nom} ${s.prestataire.prenom}` : 'Prestataire non spécifié',
            duration: s.duration || 'N/A',
            pricingType: s.pricingType || 'fixed'
        }));

        // 5. Construct the final response object with all the new data
        const cityResponse = {
            name: city ? city.name : name,
            description: city?.description || `Find the best service providers and services in ${city?.name || name}.`,
            image: city?.image, 
            prestataires: formattedPrestataires,
            availableServices: availableServices, // This is for the category tags
            services: formattedServices // This is the new list of detailed services
        };

        res.status(200).json(cityResponse);

    } catch (error) {
        console.error('Error fetching city by name:', error);
        res.status(500).json({ message: 'Server error while fetching city details.', error: error.message });
    }
};