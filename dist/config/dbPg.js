import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";
// Load environment variables from .env file
dotenv.config({ path: __dirname + "/.env" });
console.log(process.env);
// Set up your local PostgreSQL connection
const sequelize = new Sequelize("postgres://postgres@localhost:5432/smartnx", {
    dialect: "postgres",
    logging: false,
});
// Test the connection
sequelize
    .authenticate()
    .then(() => {
    console.log("PostgreSQL connected successfully.");
})
    .catch((error) => {
    console.error("Unable to connect to the database:", error);
});
export default sequelize;
