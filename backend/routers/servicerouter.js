// routes/serviceRoutes.js
import express from "express";
import {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
} from "../controllers/servicecontroller.js";
import  upload from "../middleware/mid.js";
// 👆 assumes you created uploadMiddleware.js with multer config

const router = express.Router();

// CREATE SERVICE (with single image upload)
router.post("/", upload.single("service_image"), createService);

// GET ALL SERVICES
router.get("/", getAllServices);

// GET SINGLE SERVICE
router.get("/:id", getServiceById);

// UPDATE SERVICE (with single image upload)
router.put("/:id", upload.single("service_image"), updateService);

// DELETE SERVICE
router.delete("/:id", deleteService);

export default router;
