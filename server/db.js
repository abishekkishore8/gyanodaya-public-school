import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME || "gps_school_website";

if (!uri) {
  throw new Error("MONGODB_URI is not configured.");
}

let client;
let db;

export async function getDb() {
  if (db) return db;

  client = new MongoClient(uri);
  await client.connect();
  db = client.db(dbName);
  return db;
}