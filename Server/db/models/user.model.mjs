// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'employee'],
    default: 'employee',
  },
  profileImage: {
    type: String, // เก็บ URL ของรูปภาพหรือ path ไปยังรูปภาพบนเซิร์ฟเวอร์
    default: `/assets/images/avatars/avatar_1.jpg`, // รูปภาพเริ่มต้น (ถ้ามี)
  },
  // อื่น ๆ ที่คุณต้องการเก็บสำหรับผู้ใช้
  // ...
});

export const User = mongoose.model('users', userSchema);

