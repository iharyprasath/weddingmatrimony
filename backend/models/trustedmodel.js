import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const trustedmodel = sequelize.define("trustedbrand", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  trustedimage: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
    tableName: "trustedbrands",timestamps: true,
});
export default trustedmodel;