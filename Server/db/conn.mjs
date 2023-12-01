import { MongoClient } from "mongodb";

const connectionString = process.env.MONGODB_URI || "";

const client = new MongoClient(connectionString);

let conn;
try {
  console.log("Connecting to MongoDB Atlas...");
  conn = await client.connect();
} catch(e) {
  console.error(e);
}

let db = conn.db("hrmdata");

export default db;