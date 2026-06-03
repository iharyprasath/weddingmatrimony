import Hero from "../models/heromodel.js";

// CREATE HERO
export const createHero = async (req, res) => {
  try {
    const { title, description, subtitle } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;

    const hero = await Hero.create({
      title,
      description,
      image,
      subtitle,
    });

    res.status(201).json({
      message: "Hero created successfully",
      data: hero,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating hero",
      error: error.message,
    });
  }
};

// GET ALL HERO DATA
export const getHeroes = async (req, res) => {
  try {
    const heroes = await Hero.findAll({
      order: [["id", "DESC"]],
    });

    res.status(200).json(heroes);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching heroes",
      error: error.message,
    });
  }
};

// GET SINGLE HERO
export const getHeroById = async (req, res) => {
  try {
    const hero = await Hero.findByPk(req.params.id);

    if (!hero) {
      return res.status(404).json({
        message: "Hero not found",
      });
    }

    res.status(200).json(hero);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching hero",
      error: error.message,
    });
  }
};

// UPDATE HERO
export const updateHero = async (req, res) => {
  try {
    const { title, description, subtitle } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;

    const hero = await Hero.findByPk(req.params.id);

    if (!hero) {
      return res.status(404).json({
        message: "Hero not found",
      });
    }

    await hero.update({
      title: title ?? hero.title,
      description: description ?? hero.description,
      image: image ?? hero.image,
      subtitle: subtitle ?? hero.subtitle,
    });

    res.status(200).json({
      message: "Hero updated successfully",
      data: hero,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating hero",
      error: error.message,
    });
  }
};

// DELETE HERO
export const deleteHero = async (req, res) => {
  try {
    const hero = await Hero.findByPk(req.params.id);

    if (!hero) {
      return res.status(404).json({
        message: "Hero not found",
      });
    }

    await hero.destroy();

    res.status(200).json({
      message: "Hero deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting hero",
      error: error.message,
    });
  }
};
