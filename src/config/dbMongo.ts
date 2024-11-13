import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

// Global Variables
export const collections: { users?: mongoDB.Collection } = {};

export async function connectToDatabaseMongo() {
  try {
    dotenv.config();
    const client = new mongoDB.MongoClient(process.env.MONGO_URI as string);
    await client.connect();

    const db = client.db(process.env.MONGO_INITDB_DATABASE);
    collections.users = db.collection("users");

    console.log(
      `Successfully connected to MongoDB database: ${db.databaseName} and collection: ${collections.users.collectionName}`,
    );
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}
