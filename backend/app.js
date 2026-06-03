import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import db from "./config/db.js";
import heroRoutes from "./routers/herorouter.js";
import serviceRoutes from "./routers/servicerouter.js";
import trustrouter from "./routers/trustedrouter.js";
import blogRoutes from "./routers/blogrouter.js";
import aboutRoutes from "./routers/aboutrouter.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/heroes", heroRoutes);
app.use("/services", serviceRoutes);
app.use("/trusted", trustrouter);
app.use("/blogs", blogRoutes);
app.use("/about-section", aboutRoutes);
app.use("/about", aboutRoutes);
// FRONTEND

app.use(express.static(path.join(__dirname, "../frontend")));

// ADMIN

app.use("/admin", express.static(path.join(__dirname, "../admin")));

const PORT = process.env.PORT || 5000;

db.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database sync failed", error);
  });
