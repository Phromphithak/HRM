// models/user.model.mjs
import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.model("User", userSchema);

export default User;
