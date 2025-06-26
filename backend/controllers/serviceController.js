const Service = require('../models/Service');
const City = require('../models/City');
const Category = require('../models/Category');

// Créer nouveau service
exports.createService = async (req, res) => {
  try {
    const { title, description, price, startingPrice, duration, image, 
            category, pricingType, cities, iconName, popular } = req.body;

    // Valider champs
    if (!title || !pricingType) {
      return res.status(400).json({ error: 'Title and pricingType are required' });
    }

    // Valider type de service
    if (!['fixed', 'devis'].includes(pricingType)) {
      return res.status(400).json({ error: 'Invalid pricingType' });
    }

    const service = new Service({
      title,
      description,
      price,
      startingPrice,
      duration,
      image,
      category,
      pricingType,
      cities,
      iconName,
      popular: popular || false
    });

    await service.save();

    // mise a jour categorie avec service
    if (category) {
      await Category.findByIdAndUpdate(category, {
        $addToSet: { services: service._id }
      });
    }

    // mise a jour villes avec service
    if (cities && cities.length > 0) {
      await City.updateMany(
        { _id: { $in: cities } },
        { $addToSet: { services: service._id } }
      );
    }

    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all services
exports.getAllServices = async (req, res) => {
  try {
    const { category, city, popular, pricingType } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (city) filter.cities = city;
    if (popular) filter.popular = popular === 'true';
    if (pricingType) filter.pricingType = pricingType;

    const services = await Service.find(filter)
      .populate('category', 'name')
      .populate('cities', 'name');

    res.json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single service by ID
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id)
      .populate('category', 'name')
      .populate('cities', 'name');

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a service
exports.updateService = async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'description', 'price', 'startingPrice', 
                          'duration', 'image', 'category', 'pricingType', 
                          'cities', 'iconName', 'popular', 'rating'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).json({ error: 'Invalid updates!' });
    }

    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    // Handle category update
    if (updates.includes('category') && service.category !== req.body.category) {
      // Remove from old category
      if (service.category) {
        await Category.findByIdAndUpdate(service.category, {
          $pull: { services: service._id }
        });
      }
      // Add to new category
      if (req.body.category) {
        await Category.findByIdAndUpdate(req.body.category, {
          $addToSet: { services: service._id }
        });
      }
    }

    // Handle cities update
    if (updates.includes('cities')) {
      // Remove from old cities
      await City.updateMany(
        { _id: { $in: service.cities } },
        { $pull: { services: service._id } }
      );
      // Add to new cities
      await City.updateMany(
        { _id: { $in: req.body.cities } },
        { $addToSet: { services: service._id } }
      );
    }

    updates.forEach(update => service[update] = req.body[update]);
    await service.save();

    res.json(service);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a service
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    // Remove from category
    if (service.category) {
      await Category.findByIdAndUpdate(service.category, {
        $pull: { services: service._id }
      });
    }

    // Remove from cities
    if (service.cities && service.cities.length > 0) {
      await City.updateMany(
        { _id: { $in: service.cities } },
        { $pull: { services: service._id } }
      );
    }

    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get popular services
exports.getPopularServices = async (req, res) => {
  try {
    const services = await Service.find({ popular: true })
      .populate('category', 'name')
      .populate('cities', 'name')
      .limit(8);

    res.json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get services by city
exports.getServicesByCity = async (req, res) => {
  try {
    const services = await Service.find({ cities: req.params.cityId })
      .populate('category', 'name')
      .populate('cities', 'name');

    res.json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




