import Service from "../models/servicemodel.js";

// Get all services
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll({ order: [["id", "DESC"]] });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: "Error fetching services", error });
  }
};

// Get a single service by ID
export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: "Error fetching service", error });
  }
};

// Create a new service
export const createService = async (req, res) => {
  const { title, description, buttontext } = req.body;
  try {
    const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;

    const service = await Service.create({
      title: title,
      description: description,
      image: image,
      buttontext: buttontext,
    });
    res.status(201).json({ message: "Service created successfully", data: service });
  } catch (error) {
    res.status(500).json({ message: "Error creating service", error: error.message });
  }
};

// Update an existing service
export const updateService = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;

    const { title, description, buttontext } = req.body;

    await service.update({
      title: title ?? service.title,
      description: description ?? service.description,
      image: image ?? service.image,
      buttontext: buttontext ?? service.buttontext,
    });

    res.json({ message: "Service updated successfully", data: service });
  } catch (error) {
    res.status(500).json({ message: "Error updating service", error: error.message });
  }
};

// Delete a service
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    await service.destroy();
    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting service", error });
  }
};
