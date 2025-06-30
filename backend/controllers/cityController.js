
const City = require('../models/City');
const User = require('../models/User'); 
const Service = require('../models/Service');


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

// This is the getCityByName function we just worked on
exports.getCityByName = async (req, res) => {
    try {
        const { name } = req.params;
        
        const regexPattern = name.replace(/e/gi, '[eé]');

        const city = await City.findOne({ name: { $regex: new RegExp(regexPattern, 'i') } })
            .populate({
                path: 'prestataires',
                model: 'User',
                select: 'nom prenom email photo bannerImage description prestataireInfo.noteMoyenne prestataireInfo.nombreAvis prestataireInfo.tools prestataireInfo.secteurActivite prestataireInfo.documents.photoProfil',
                match: { role: 'prestataire' }
            })
            .lean();

        let prestatairesInCity = [];
        let cityId = null;

        if (city) {
            cityId = city._id;
            if (city.prestataires && city.prestataires.length > 0) {
                prestatairesInCity = city.prestataires;
            } else {
                prestatairesInCity = await User.find({
                    role: 'prestataire',
                    ville: { $regex: new RegExp(regexPattern, 'i') }
                })
                .select('nom prenom email photo bannerImage description prestataireInfo.noteMoyenne prestataireInfo.nombreAvis prestataireInfo.tools prestataireInfo.secteurActivite prestataireInfo.documents.photoProfil')
                .lean();
            }
        } else {
            prestatairesInCity = await User.find({
                role: 'prestataire',
                ville: { $regex: new RegExp(regexPattern, 'i') }
            })
            .select('nom prenom email photo bannerImage description prestataireInfo.noteMoyenne prestataireInfo.nombreAvis prestataireInfo.tools prestataireInfo.secteurActivite prestataireInfo.documents.photoProfil')
            .lean();
        }

        let servicesInCity = [];
        if (cityId) {
            servicesInCity = await Service.find({ 
                cities: cityId
            }).populate({
                path: 'prestataire',
                model: 'User',
                select: 'nom prenom'
            }).lean();
        }

        if (prestatairesInCity.length === 0 && servicesInCity.length === 0 && !city) {
            return res.status(404).json({ message: 'City not found and no services or prestataires available.' });
        }
        
        const servicesSet = new Set();
        prestatairesInCity.forEach(p => {
            if (p.prestataireInfo?.secteurActivite) {
                servicesSet.add(p.prestataireInfo.secteurActivite);
            }
        });
        const availableServices = Array.from(servicesSet);
        
        const formattedPrestataires = prestatairesInCity.map(p => ({
            _id: p._id,
            nom: p.nom,
            prenom: p.prenom,
            name: `${p.nom || ''} ${p.prenom || ''}`.trim() || 'Nom inconnu', 
            prestataireInfo: p.prestataireInfo, 
            photo: p.photo, 
            service: p.prestataireInfo?.secteurActivite || 'Service non spécifié',
            averageRating: p.prestataireInfo?.noteMoyenne || 0,
            numberOfReviews: p.prestataireInfo?.nombreAvis || 0,
            distance: 'N/A',
        }));

        const formattedServices = servicesInCity.map(s => ({
            _id: s._id,
            title: s.title,
            description: s.description,
            price: s.price,
            image: s.image,
            prestataire: s.prestataire,
            duration: s.duration || 'N/A',
            pricingType: s.pricingType || 'fixed'
        }));

        const cityResponse = {
            name: city ? city.name : name,
            description: city?.description || `Find the best service providers and services in ${city?.name || name}.`,
            image: city?.image, 
            prestataires: formattedPrestataires,
            availableServices: availableServices,
            services: formattedServices
        };

        res.status(200).json(cityResponse);

    } catch (error) {
        console.error('Error fetching city by name:', error);
        res.status(500).json({ message: 'Server error while fetching city details.', error: error.message });
    }
};