// conn.mjs

import mongoose from "mongoose";

const connectionString = "mongodb+srv://LIX:lP2cvkJvHQWK4F4H@hrmdata.z5igopj.mongodb.net/test?retryWrites=true&w=majority";

// Update the connection options
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(connectionString, mongooseOptions);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB Atlas!");
});

export default db;
