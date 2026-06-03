import AboutSection from "../models/aboutmodel.js";

function uploadedImage(req, field, fallback) {
  const file = req.files && req.files[field] && req.files[field][0];
  return file ? `/uploads/${file.filename}` : fallback;
}

export const createAboutSection = async (req, res) => {
  try {
    const about = await AboutSection.create({
      heading: req.body.heading,
      highlight: req.body.highlight,
      description_one: req.body.description_one,
      cta_text: req.body.cta_text,
      cta_href: req.body.cta_href,
      description_two: req.body.description_two,
      note: req.body.note,
      phone_label: req.body.phone_label,
      phone_value: req.body.phone_value,
      support_label: req.body.support_label,
      support_value: req.body.support_value,
      image_one: uploadedImage(req, "image_one", req.body.image_one),
      image_two: uploadedImage(req, "image_two", req.body.image_two),
    });

    res.status(201).json({ message: "About section created successfully", data: about });
  } catch (error) {
    res.status(500).json({ message: "Error creating about section", error: error.message });
  }
};

export const getAboutSections = async (req, res) => {
  try {
    const about = await AboutSection.findOne({ order: [["id", "DESC"]] });
    res.status(200).json(about);
  } catch (error) {
    res.status(500).json({ message: "Error fetching about section", error: error.message });
  }
};

export const getAboutSectionById = async (req, res) => {
  try {
    const about = await AboutSection.findByPk(req.params.id);
    if (!about) {
      return res.status(404).json({ message: "About section not found" });
    }

    res.status(200).json(about);
  } catch (error) {
    res.status(500).json({ message: "Error fetching about section", error: error.message });
  }
};

export const updateAboutSection = async (req, res) => {
  try {
    const about = await AboutSection.findByPk(req.params.id);
    if (!about) {
      return res.status(404).json({ message: "About section not found" });
    }

    await about.update({
      heading: req.body.heading ?? about.heading,
      highlight: req.body.highlight ?? about.highlight,
      description_one: req.body.description_one ?? about.description_one,
      cta_text: req.body.cta_text ?? about.cta_text,
      cta_href: req.body.cta_href ?? about.cta_href,
      description_two: req.body.description_two ?? about.description_two,
      note: req.body.note ?? about.note,
      phone_label: req.body.phone_label ?? about.phone_label,
      phone_value: req.body.phone_value ?? about.phone_value,
      support_label: req.body.support_label ?? about.support_label,
      support_value: req.body.support_value ?? about.support_value,
      image_one: uploadedImage(req, "image_one", req.body.image_one) ?? about.image_one,
      image_two: uploadedImage(req, "image_two", req.body.image_two) ?? about.image_two,
    });

    res.status(200).json({ message: "About section updated successfully", data: about });
  } catch (error) {
    res.status(500).json({ message: "Error updating about section", error: error.message });
  }
};

export const deleteAboutSection = async (req, res) => {
  try {
    const about = await AboutSection.findByPk(req.params.id);
    if (!about) {
      return res.status(404).json({ message: "About section not found" });
    }

    await about.destroy();
    res.status(200).json({ message: "About section deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting about section", error: error.message });
  }
};
