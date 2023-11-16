import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs"
import records from "./routes/record.mjs";
import employees from "./routes/employees.mjs"

const PORT = 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/record", records);
app.use("/employees",employees);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});