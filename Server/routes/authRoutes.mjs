// routes/authRoutes.mjs
import express from "express";
import bcrypt from "bcrypt";
import User from "../db/models/user.model.mjs";
import db from "../db/conn.mjs";

const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
  try {
    let collection = db.collection("users");
    let results = await collection.find({}).toArray();
    res.status(200).send(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error registering user: ${error.message}` });


  }
});

// Register Route
router.post("/", async (req, res) => {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ error: "User with this email already exists" });
    }

    // Save the user
    const form = {
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword, // Use the hashed password
    };

    const collection = await db.collection("users");
    const result = await collection.insertOne(form);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error registering user" });
  }
});

// Login Route
router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare the password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error logging in" });
  }
});

export default router;
