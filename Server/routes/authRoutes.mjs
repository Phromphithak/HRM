// routes/authRoutes.mjs
import express from "express";
import bcrypt from "bcrypt";
import db from "../db/conn.mjs";
import { User } from "../db/models/user.model.mjs";

const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
  try {
    let collection = db.collection("users");
    let results = await collection.find({}).toArray();
    res.status(200).send(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching users" });
  }
});

// Constants for roles
const EMPLOYEE_ROLE = "user";

// Register Route
router.post("/register", async (req, res) => {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ error: "User with this email already exists" });
    }

    // Save the user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      fullName: req.body.fullName,
      role: EMPLOYEE_ROLE,
    });
    await newUser.save();
    
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error registering user" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate and send JWT token
    // ...

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        // Add other user data you want to include
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error logging in" });
  }
});

export default router;
