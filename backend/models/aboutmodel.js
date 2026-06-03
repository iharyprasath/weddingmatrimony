import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const AboutSection = sequelize.define(
  "AboutSection",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    heading: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    highlight: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description_one: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    cta_text: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cta_href: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description_two: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    phone_label: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone_value: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    support_label: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    support_value: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image_one: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image_two: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "about_sections",
    timestamps: true,
  },
);

export default AboutSection;
