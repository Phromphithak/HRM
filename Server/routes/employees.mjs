import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import employee from "../db/models/employee.mjs";

const router = express.Router();

// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
  try {
    let collection = await db.collection("employees");
    let results = await collection.find({}).toArray();
    res.send(results).status(200);
  } catch (error) {
    console.log(error)
    res.status(500).send('Server Error')
  }
});

// get a single record by id
router.get("/:id", async (req, res) => {
  try {
    let collection = await db.collection("employees");
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ error: "Employee not found" });
  }
});

// This section will help you create a new record.
router.post("/", async (req, res) => {
  try {
    const newEmployee = await employee(req.body).save();
    res.send(newEmployee)
    res.status(201).json(result);
  } catch (error) {
    console.log(error)
    res.status(500).send('Server Error')
  }
  
  // const collection = await db.collection("employees");
  // const result = await collection.insertOne(newEmployee);
  
});

// This section will help you update a record by id.
router.patch("/:id", async (req, res) => {
  try {
    const id = { _id: new ObjectId(req.params.id) };
    const updates = await employee.findOneAndUpdate({_id: id}, req.body,{new:true}).exec()
    res.send(updates).status(200);
  } catch (error) {
    res.status(500).send('Server Error')
  }
  // let collection = await db.collection("employees");
  // let result = await collection.updateOne(query, updates);
});

// This section will help you delete an employee
router.delete("/:id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid ObjectId" });
    }

    const query = { _id: new ObjectId(req.params.id) };
    const collection = db.collection("employees");
    const result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }

    return res.status(200).send("Employee deleted");
  } catch (error) {
    console.error("Error deleting employee:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;