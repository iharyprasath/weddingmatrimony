import express from "express";
import {
  createAboutSection,
  getAboutSections,
  getAboutSectionById,
  updateAboutSection,
  deleteAboutSection,
} from "../controllers/aboutcontroller.js";
import upload from "../middleware/mid.js";

const router = express.Router();
const aboutUpload = upload.fields([
  { name: "image_one", maxCount: 1 },
  { name: "image_two", maxCount: 1 },
]);

router.post("/", aboutUpload, createAboutSection);
router.get("/", getAboutSections);
router.get("/:id", getAboutSectionById);
router.put("/:id", aboutUpload, updateAboutSection);
router.delete("/:id", deleteAboutSection);

export default router;
