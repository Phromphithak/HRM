import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import records from "./routes/record.mjs";
import employees from "./routes/employees.mjs";

const PORT = 5050;
const app = express();

const corsOptions = {
  origin: "https://hrm-xil-lin.vercel.app", // Remove the trailing slash
}

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/record", records);
app.use("/api/employees", employees);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
