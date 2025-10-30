//Enables usage of environmentvariables from .env file
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
//Creates a web server to handle requests
import express from "express";
//Allows communication between frontend and backend
import cors from "cors";
import mongoose from "mongoose";

//Reads variables
dotenv.config();

//app is the server
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
//Lets the server understand JSON data sent from frontend
app.use(express.json());

//Connects to MongoDB; throws an error if something goes wrong
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log("MongoDB connected successfully"))
  )
  .catch((err) => console.error("MongoDB connection error:", err));

//Loads the routes created for authentification
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
