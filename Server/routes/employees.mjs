// routes/employees.mjs
import express from "express";
import { ObjectId } from "mongodb";
import multer from "multer";
import db from "../db/conn.mjs";

const router = express.Router();

// Get all employees
router.get("/", async (req, res) => {
  try {
    const collection = await db.collection("employees");
    const results = await collection.find({}).toArray();
    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).send('Server Error');
  }
});

// Get a single employee by ID
router.get("/:id", async (req, res) => {
  try {
    const collection = await db.collection("employees");
    const query = { _id: new ObjectId(req.params.id) };
    const result = await collection.findOne(query);

    if (!result) res.status(404).send("Not found");
    else res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching employee data:', error);
    res.status(500).send('Server Error');
  }
});

// Create a new employee
router.post("/", async (req, res) => {
  try {
    const newEmployee = req.body;

    const collection = await db.collection("employees");
    const result = await collection.insertOne(newEmployee);

    res.status(200).json(result.ops[0]); // Return the created employee
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).send('Server Error');
  }
});

// Add pay history to an employee
router.post("/:id/payhistory", async (req, res) => {
  try {
    const employeeId = req.params.id;
    const { date, amount } = req.body;

    const query = { _id: new ObjectId(employeeId) };
    const update = {
      $push: {
        "payrollInformation.payHistory": {
          date: new Date(date),
          amount: parseFloat(amount),
        },
      },
    };

    const collection = await db.collection("employees");
    const result = await collection.updateOne(query, update);

    console.log("Pay history added:", result);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error adding pay history:', error);
    res.status(500).send('Server Error');
  }
});

// Delete an employee by ID
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("employees");
    const result = await collection.deleteOne(query);

    res.status(200).json(result);
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).send('Server Error');
  }
});

// Update an employee by ID
router.put("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updateData = req.body;

    const collection = db.collection("employees");
    const result = await collection.updateOne(query, { $set: updateData });

    console.log("Update result:", result);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error updating employee information:', error);
    res.status(500).send('Server Error');
  }
});

// Update employee's image and information
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../public/Uploadimage/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
const imageUpload = upload.single("image");

router.put("/:id/upload", imageUpload, async (req, res) => {
  try {
    const employeeId = req.params.id;
    const query = { _id: new ObjectId(employeeId) };

    // Check if an image was uploaded
    const imagePath = req.file ? req.file.path : null;

    // Extract other fields from the request body
    const employeeData = req.body;
    const update = {
      $set: {
        "personalInformation.image": imagePath,
        ...employeeData,
      },
    };

    const collection = await db.collection("employees");
    const result = await collection.updateOne(query, update);

    console.log("Image and information uploaded:", result);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error uploading image and information:', error);
    res.status(500).send('Server Error');
  }
});

export default router;
