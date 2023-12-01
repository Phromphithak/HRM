// ใช้ `import` แทน `require` ในโมดูล ES
import dotenv from 'dotenv';
dotenv.config({ path: 'config.env' });

import { MongoClient } from "mongodb";

const connectionString = process.env.ATLAS_URI || "";
const client = new MongoClient(connectionString);

async function connectToDatabase() {
  try {
    console.log("Connecting to MongoDB Atlas...");
    const conn = await client.connect();
    console.log("Connected to MongoDB Atlas!");
    return conn;
  } catch (e) {
    console.error("Error connecting to MongoDB Atlas:", e);
    throw e;
  }
}

let conn;
try {
  conn = await connectToDatabase();
} catch (e) {
  console.error(e);
  // ทำการจัดการข้อผิดพลาดตามที่คุณต้องการ
  throw e;
}

let db = conn.db("hrmdata");

export default db;
