import express from "express";
import {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} from "../controllers/blogcontroller.js";
import upload from "../middleware/mid.js";

const router = express.Router();

router.post("/", upload.single("blog_image"), createBlog);
router.get("/", getBlogs);
router.get("/:id", getBlogById);
router.put("/:id", upload.single("blog_image"), updateBlog);
router.delete("/:id", deleteBlog);

export default router;
