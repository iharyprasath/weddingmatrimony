import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const databaseUrl =
  process.env.MYSQL_PUBLIC_URL || process.env.DATABASE_URL || process.env.DB_URL;

const requiredEnv = ["DB_NAME", "DB_USER", "DB_PASSWORD", "DB_HOST", "DB_PORT"];
const missingEnv = requiredEnv.filter((key) => !process.env[key]);

if (!databaseUrl && missingEnv.length > 0) {
  throw new Error(`Missing required database env vars: ${missingEnv.join(", ")}`);
}

const sequelize = databaseUrl
  ? new Sequelize(databaseUrl, {
      dialect: "mysql",
    })
  : new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
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
