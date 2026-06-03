// models/heroModel.js

import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Hero = sequelize.define(
  "Hero",
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

    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    subtitle: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "hero",
    timestamps: false,
  },
);

export default Hero;

// models/serviceModel.js

