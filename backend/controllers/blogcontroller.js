import Blog from "../models/blogmodel.js";

export const createBlog = async (req, res) => {
  try {
    const { title, category, description, buttontext, blogdate } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;

    const blog = await Blog.create({
      title,
      category,
      description,
      image,
      buttontext,
      blogdate,
    });

    res.status(201).json({ message: "Blog created successfully", data: blog });
  } catch (error) {
    res.status(500).json({ message: "Error creating blog", error: error.message });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll({ order: [["id", "DESC"]] });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs", error: error.message });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blog", error: error.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    const { title, category, description, buttontext, blogdate } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;

    await blog.update({
      title: title ?? blog.title,
      category: category ?? blog.category,
      description: description ?? blog.description,
      image: image ?? blog.image,
      buttontext: buttontext ?? blog.buttontext,
      blogdate: blogdate ?? blog.blogdate,
    });

    res.status(200).json({ message: "Blog updated successfully", data: blog });
  } catch (error) {
    res.status(500).json({ message: "Error updating blog", error: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByPk(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    await blog.destroy();
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting blog", error: error.message });
  }
};
