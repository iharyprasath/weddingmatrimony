import express from 'express';
import { getTrusted, getTrustedById, updatetrusted, deletetrusted, createTrusted } from '../controllers/trustedcontroller.js';


import upload from "../middleware/mid.js";

const trustrouter = express.Router();

trustrouter.post("/", upload.single("trustedimage"), createTrusted);
trustrouter.get("/", getTrusted);
trustrouter.get("/:id", getTrustedById);
trustrouter.put("/:id", upload.single("trustedimage"), updatetrusted);
trustrouter.delete("/:id", deletetrusted);

export default trustrouter;
