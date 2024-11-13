// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
// Global Variables
export const collections = {};
// Initialize Connection
export async function connectToDatabase() {
    dotenv.config({ path: __dirname + "/.env" });
    // Create MongoDB client and connect to the database
    const client = new mongoDB.MongoClient(process.env.DB_CONN_STRING);
    await client.connect();
    // Connect to the database and set up the collection
    const db = client.db(process.env.DB_NAME);
    const usersCollection = db.collection(process.env.USERS_COLLECTION_NAME);
    // Store the collection in the global variable for external access
    collections.users = usersCollection;
    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${usersCollection.collectionName}`);
}
