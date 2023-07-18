import { MongoClient } from "mongodb";

let db = null;

async function connectToDatabase() {
  if (db) {
    return db;
  }

  const client = new MongoClient(process.env.MONGO_CONNECTION_STRING);

  try {
    await client.connect();
    db = client.db("demography");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }

  return db;
}

export default connectToDatabase;
