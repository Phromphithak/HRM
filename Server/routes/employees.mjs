import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
  let collection = await db.collection("employees");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get a single record by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("employees");
  let query = {_id: new ObjectId(req.params.id)};
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new record.
router.post("/", async (req, res) => {
  const newEmployee = {
    name: req.body.name,
    phonenumber: req.body.phonenumber,
    position: req.body.position,
    email: req.body.email,
    isVerified: req.body.isVerified,
    status: req.body.status,
    avatarUrl: req.body.avatarUrl,
    salary: req.body.salary,  // เพิ่มเขตข้อมูลเงินเดือน
  };
  const collection = await db.collection("employees");
  const result = await collection.insertOne(newEmployee);
  res.status(204).json(result);
});

// This section will help you update a record by id.
router.patch("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const updates = {
    $set: {
      name: req.body.name,
      position: req.body.position,
      salary: req.body.salary,
    }
  };

  let collection = await db.collection("employees");
  let result = await collection.updateOne(query, updates);
  res.send(result).status(200);
});

// This section will help you delete an employee
router.delete("/:id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).send("Invalid ObjectId");
      return;
    }

    const query = { _id: new ObjectId(req.params.id) };
    const collection = db.collection("employees");
    const result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      res.status(404).send("Employee not found");
    } else {
      res.status(200).send("Employee deleted");
    }
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;