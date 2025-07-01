const Service = require('../models/Service');
const City = require('../models/City');
const Category = require('../models/Category');
const User = require('../models/User');

// Créer un nouveau service
exports.createService = async (req, res) => {
  try {
    const { title, description, price, startingPrice, duration, image, 
            category, pricingType, cities, iconName, popular, prestataire } = req.body;

    // Validation des données
    if (!title || !pricingType || !prestataire) {
      return res.status(400).json({ 
        success: false,
        error: 'Title, pricingType et prestataire sont requis' 
      });
    }

    if (!['fixed', 'devis'].includes(pricingType)) {
      return res.status(400).json({
        success: false,
        error: 'Le pricingType doit être "fixed" ou "devis"'
      });
    }

    // Création du service
    const service = new Service({
      title,
      description,
      price: pricingType === 'fixed' ? price : null,
      startingPrice: pricingType === 'devis' ? startingPrice : null,
      duration,
      image,
      category,
      pricingType,
      cities,
      iconName,
      popular: popular || false,
      prestataire
    });

    await service.save();

    // Mise à jour des relations
    if (category) {
      await Category.findByIdAndUpdate(category, {
        $addToSet: { services: service._id }
      });
    }

    if (cities && cities.length > 0) {
      await City.updateMany(
        { _id: { $in: cities } },
        { $addToSet: { services: service._id } }
      );
    }

    // Ajouter le service au prestataire
    await User.findByIdAndUpdate(prestataire, {
      $addToSet: { 
        'services.service': service._id,
        'services.category': category 
      }
    });

    res.status(201).json({
      success: true,
      data: service
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Récupérer les services avec filtres
exports.getServices = async (req, res) => {
  try {
    const { 
      category, 
      city, 
      pricingType, 
      popular, 
      search,
      limit = 10,
      page = 1 
    } = req.query;

    const query = {};
    
    if (category) query.category = category;
    if (city) query.cities = city;
    if (pricingType) query.pricingType = pricingType;
    if (popular) query.popular = popular === 'true';
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;
    
    const services = await Service.find(query)
      .populate('category', 'name iconName')
      .populate('cities', 'name')
      .populate('prestataire', 'firstName lastName photo rating')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Service.countDocuments(query);

    res.json({
      success: true,
      data: services,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit),
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};

// Récupérer un service par ID
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id)
      .populate('category', 'name iconName')
      .populate('cities', 'name')
      .populate('prestataire', 'firstName lastName photo rating services');

    if (!service) {
      return res.status(404).json({
        success: false,
        error: 'Service non trouvé'
      });
    }

    res.json({
      success: true,
      data: service
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Mettre à jour un service
exports.updateService = async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'description', 'price', 'startingPrice', 
                          'duration', 'image', 'category', 'pricingType', 
                          'cities', 'iconName', 'popular'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).json({ 
        success: false,
        error: 'Mises à jour non autorisées' 
      });
    }

    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({
        success: false,
        error: 'Service non trouvé'
      });
    }

    // Gestion de la mise à jour de la catégorie
    if (updates.includes('category') && service.category !== req.body.category) {
      // Retirer de l'ancienne catégorie
      if (service.category) {
        await Category.findByIdAndUpdate(service.category, {
          $pull: { services: service._id }
        });
      }
      // Ajouter à la nouvelle catégorie
      if (req.body.category) {
        await Category.findByIdAndUpdate(req.body.category, {
          $addToSet: { services: service._id }
        });
      }
    }

    // Gestion de la mise à jour des villes
    if (updates.includes('cities')) {
      // Retirer des anciennes villes
      await City.updateMany(
        { _id: { $in: service.cities } },
        { $pull: { services: service._id } }
      );
      // Ajouter aux nouvelles villes
      await City.updateMany(
        { _id: { $in: req.body.cities } },
        { $addToSet: { services: service._id } }
      );
    }

    // Appliquer les mises à jour
    updates.forEach(update => service[update] = req.body[update]);
    await service.save();

    res.json({
      success: true,
      data: service
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Supprimer un service
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        error: 'Service non trouvé'
      });
    }

    // Retirer de la catégorie
    if (service.category) {
      await Category.findByIdAndUpdate(service.category, {
        $pull: { services: service._id }
      });
    }

    // Retirer des villes
    if (service.cities && service.cities.length > 0) {
      await City.updateMany(
        { _id: { $in: service.cities } },
        { $pull: { services: service._id } }
      );
    }

    // Retirer du prestataire
    if (service.prestataire) {
      await User.findByIdAndUpdate(service.prestataire, {
        $pull: { 'services.service': service._id }
      });
    }

    res.json({
      success: true,
      message: 'Service supprimé avec succès'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
exports.getServicesByCity = async (req, res) => {
  try {
    const services = await Service.find({ cities: req.params.cityId })
      .populate('category', 'name iconName')
      .populate('cities', 'name')
      .populate('prestataire', 'firstName lastName photo');

    res.json({
      success: true,
      data: services
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
// Récupérer les services populaires
exports.getPopularServices = async (req, res) => {
  try {
    const services = await Service.find({ popular: true })
      .populate('category', 'name iconName')
      .populate('cities', 'name')
      .populate('prestataire', 'firstName lastName photo')
      .limit(8);

    res.json({
      success: true,
      data: services
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id)
      .populate('category', 'name iconName')
      .populate('cities', 'name')
      .populate('prestataire', 'firstName lastName photo rating services');

    if (!service) {
      return res.status(404).json({
        success: false,
        error: 'Service non trouvé'
      });
    }

    res.json({
      success: true,
      data: service // Correctly wrapped in 'data'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// This function was also already correct
exports.getPrestatairesForService = async (req, res) => {
  try {
    const serviceId = req.params.id;
    const service = await Service.findById(serviceId);

    if (!service) {
      return res.status(404).json({ success: false, error: 'Service non trouvé' });
    }

    let prestataires = [];
    if (service.prestataire) {
      const prestataire = await User.findById(service.prestataire)
        .select('nom prenom photo ville prestataireInfo rating')
        .lean();
      if (prestataire) {
        prestataires.push({
          ...prestataire,
          serviceDetails: {
            title: service.title,
            price: service.price,
            startingPrice: service.startingPrice,
            pricingType: service.pricingType,
            duration: service.duration
          }
        });
      }
    } else {
      // Fallback for a different data model (not strictly used based on schema but good to have)
      prestataires = await User.find({ role: 'prestataire', 'prestataireInfo.services': serviceId })
        .select('nom prenom photo ville prestataireInfo rating')
        .lean();
      prestataires = prestataires.map(p => ({
        ...p,
        serviceDetails: {
          title: service.title,
          price: service.price,
          startingPrice: service.startingPrice,
          pricingType: service.pricingType,
          duration: service.duration
        }
      }));
    }

    res.json({
      success: true,
      data: {
        prestataires,
        service: {
          title: service.title,
          pricingType: service.pricingType
        }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};