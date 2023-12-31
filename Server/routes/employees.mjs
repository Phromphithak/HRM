// routes/employees.mjs
import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import { Employee } from "../db/models/employee.mjs";


const router = express.Router();

// This section will help you get a list of all the employees.
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
  try {
    const {
      personalInformation,
      employmentInformation,
      payrollInformation,
      paymentInformation,
      deductions,
      specialWorkHistory,
      adjustments,
    } = req.body;
    const newDocument = {
      personalInformation,
      employmentInformation,
      payrollInformation,
      paymentInformation,
      deductions,
      specialWorkHistory,
      adjustments,
    };

    const collection = await db.collection("employees");
    const result = await collection.insertOne(newDocument);
    res.status(200).send(result); // ops จะบอกถึงเอกสารที่ถูกสร้างขึ้น
    console.log(result, collection);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});


// This section will help you update a record by id.
router.put("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    // Extract data from the request body
    const {
      personalInformation,
      employmentInformation,
      payrollInformation,
      paymentInformation,
      deductions,
      specialWorkHistory,
      adjustments,
    } = req.body;

    const updates = {
      $set: {
        personalInformation,
        employmentInformation,
        payrollInformation,
        paymentInformation,
        deductions,
        specialWorkHistory,
        adjustments,
      },
    };
    
    let collection = db.collection("employees");
    let result = await collection.updateOne(query, updates);
    
    console.log("Update result:", result);
    res.send(result).status(200);

  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).send('Server Error');
  }
});
// This section will help you delete a record
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("employees");
  let result = await collection.deleteOne(query);
  res.send(result).status(200);
});

export default router;