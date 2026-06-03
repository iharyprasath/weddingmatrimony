import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Service = sequelize.define(
  "Service",
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
    }

    
  },
  {
    tableName: "services",
    timestamps: true,
  },
);
export default Service;
