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

let conn;
try {
  conn = await connectToDatabase();
} catch (e) {
  console.error(e);
  // ในกรณีที่มีข้อผิดพลาด, คุณสามารถเลือกจะทำอะไรต่อไปได้ตามที่คุณต้องการ
  // เช่น การล็อกข้อผิดพลาด, การทำงานแบบ graceful shutdown, หรือการ throw ต่อ
  process.exit(1); // จบการทำงานทั้งโปรแกรม
}

let db = conn.db("hrmdata");

// ทำงานที่ต้องการกับฐานข้อมูล

// ปิดการเชื่อมต่อหลังจากใช้เสร็จสิ้น
await client.close();

export default db;
