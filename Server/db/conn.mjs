import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let conn;
try {
  console.log("Connecting to MongoDB Atlas...");
  conn = await client.connect();
} catch(e) {
  console.error(e);
}

let db = conn.db("hrmdata");

export default db;