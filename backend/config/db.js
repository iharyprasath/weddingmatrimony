import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME ,
  process.env.DB_USER ,
  process.env.DB_PASSWORD ,
  {
    host: process.env.DB_HOST ,
    dialect: "mysql",
    port: Number(process.env.DB_PORT),
  },
);

// CHECK DATABASE CONNECTION
async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("MySQL Connected Successfully");
  } catch (error) {
    console.log("Database connection failed");
    console.log(error);
  }
}

connectDB();

export default sequelize;
