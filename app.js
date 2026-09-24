import express from "express";
import { createServer } from "node:http";
import mongoose from "mongoose";
import cors from "cors";

import { connectToSocket } from "./controllers/socketManager.js";
import userRoutes from "./routes/users.routes.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ extended: true, limit: "40kb" }));

app.use("/api/v1/users", userRoutes);


app.get("/home", (req, res) => {
  return res.json({ message: "is it working?" });
});

const start = async () => {
  try {
    const connection = await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/confero"
    );

    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection is `error`:", error.message);
  }

  server.listen(port, () => {
    console.log(`Server is running on port. ${port}`);
  });
};

start();


