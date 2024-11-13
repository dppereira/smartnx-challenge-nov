import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";

export async function connectToDatabasePostgres() {
  try {
    dotenv.config();
    const sequelize = new Sequelize(process.env.POSTGRES_URI as string, {
      dialect: "postgres",
      logging: false,
    });

    await sequelize.authenticate();
    console.log("PostgreSQL connected successfully.");
  } catch (error) {
    console.error("Unable to connect to PostgreSQL:", error);
    throw error;
  }
}
