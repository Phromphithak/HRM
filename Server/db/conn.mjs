import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

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

const conn = await connectToDatabase();
const db = conn.db("hrmdata");

// ทำงานที่ต้องการกับฐานข้อมูล

// ปิดการเชื่อมต่อหลังจากใช้เสร็จสิ้น
await client.close();

export default db;
