const Category = require('../models/Category');
const Service = require('../models/Service');

// Create a new category (Admin only)
exports.createCategory = async (req, res) => {
  try {
    const { name, iconName } = req.body;

    // Validate required field
    if (!name) {
      return res.status(400).json({ error: 'Category name is required' });
    }

    const category = new Category({
      name,
      iconName,
      services: [] // Initialize empty services array
    });

    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate('services', 'title price');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
      .populate('services', 'title description price duration');

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a category (Admin only)
exports.updateCategory = async (req, res) => {
  try {
    const { name, iconName } = req.body;
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Update fields if provided
    if (name) category.name = name;
    if (iconName) category.iconName = iconName;

    await category.save();
    res.json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a category (Admin only)
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Remove this category reference from all associated services
    await Service.updateMany(
      { category: category._id },
      { $unset: { category: "" } }
    );

    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get services by category
exports.getServicesByCategory = async (req, res) => {
  try {
    const services = await Service.find({ category: req.params.id })
      .populate('cities', 'name');
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};