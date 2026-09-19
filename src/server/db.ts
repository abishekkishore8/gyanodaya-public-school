import "server-only";

import { MongoClient, type Db } from "mongodb";

import { mongo } from "./config";

/**
 * Next.js reloads modules on every edit in development, so the client is
 * cached on `globalThis` to avoid opening a new connection pool per reload.
 */
const globalForMongo = globalThis as typeof globalThis & {
  __gpsMongoClient?: Promise<MongoClient>;
};

/**
 * Connects lazily and reuses the connection.
 *
 * Connecting on demand (rather than at import time) means a missing or bad
 * `MONGODB_URI` surfaces as a handled 500 from the route that needed the
 * database, instead of breaking every route.
 */
export async function getDb(): Promise<Db> {
  if (!mongo.uri) {
    throw new Error("MONGODB_URI is not configured.");
  }

  if (!globalForMongo.__gpsMongoClient) {
    globalForMongo.__gpsMongoClient = new MongoClient(mongo.uri).connect().catch((error) => {
      // Let the next call retry rather than caching a failed connection.
      globalForMongo.__gpsMongoClient = undefined;
      throw error;
    });
  }

  const client = await globalForMongo.__gpsMongoClient;
  return client.db(mongo.dbName);
}
