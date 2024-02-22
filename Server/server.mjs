// server.mjs
import express from "express";
import cors from "cors";
import records from "./routes/record.mjs";
import employees from "./routes/employees.mjs";
import authRoutes from "./routes/authRoutes.mjs";

const PORT = 5050;
const app = express();

const corsOptions = {
  origin: ['http://localhost:3030', 'https://hrm-xil-lin.vercel.app'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/public/Uploadimage",express.static("public/Uploadimage"));

app.use("/api/record", records);
app.use("/api/employees", employees);

// Use the authRoutes router
app.use("/api/users", authRoutes);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
