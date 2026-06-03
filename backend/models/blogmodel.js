import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Blog = sequelize.define(
  "Blog",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    buttontext: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    blogdate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "blogs",
    timestamps: true,
  },
);

export default Blog;
