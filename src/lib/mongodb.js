import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error(
    "MONGODB_URI is missing. Add your MongoDB connection string to .env.local and restart the dev server.",
  );
}

// Reuse one client across dev-server hot reloads, but recreate it when the
// connection string changes (.env.local edits) — otherwise the cached client
// keeps pointing at the old URI. MongoClient connects lazily, so build-time
// prerendering works without the database actually running.
const globalForMongo = globalThis;
if (globalForMongo._verdantMongoUri !== uri) {
  const previous = globalForMongo._verdantMongoClient;
  if (previous) {
    previous.close().catch(() => {});
  }
  globalForMongo._verdantMongoUri = uri;
  globalForMongo._verdantMongoClient = new MongoClient(uri, {
    maxPoolSize: 10,
  });
}

export const client = globalForMongo._verdantMongoClient;

// Database name is explicit because the connection string has no /dbname suffix.
export const db = client.db("restaurant");
