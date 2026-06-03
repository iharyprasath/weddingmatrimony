import upload from "../middleware/mid.js";
import express from "express";

import {
  createHero,
  getHeroes,
  getHeroById,
  updateHero,
  deleteHero,
} from "../controllers/herocontroller.js";

const router = express.Router();


// CREATE HERO
router.post("/",  upload.single("banner_image"), createHero);


// GET ALL HEROES
router.get("/", getHeroes);


// GET SINGLE HERO
router.get("/:id", getHeroById);


// UPDATE HERO
router.put("/:id",  upload.single("banner_image"), updateHero);


// DELETE HERO
router.delete("/:id", deleteHero);


export default router;
