import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/users.js";
//Reads env. file
dotenv.config();

const users = [
  {
    firstName: "Jada",
    lastName: "Harrison",
    email: "jada.harrison@gmail.com",
    role: "admin",
    phone: "01572-101-234",
    password: "pass123",
  },
  {
    firstName: "Malcolm",
    lastName: "Reed",
    email: "malcolm.reed@gmail.com",
    role: "user",
    phone: "01572-202-345",
    password: "pass456",
  },
  {
    firstName: "Zoe",
    lastName: "Perry",
    email: "zoe.perry@gmail.com",
    role: "user",
    phone: "01572-303-456",
    password: "pass789",
  },
  {
    firstName: "Terrence",
    lastName: "Hughes",
    email: "terrence.hughes@gmail.com",
    role: "user",
    phone: "01572-404-567",
    password: "pass111",
  },
  {
    firstName: "Chanel",
    lastName: "Brooks",
    email: "chanel.brooks@gmail.com",
    role: "admin",
    phone: "01572-505-678",
    password: "pass222",
  },
  {
    firstName: "Darius",
    lastName: "Coleman",
    email: "darius.coleman@gmail.com",
    role: "user",
    phone: "01572-606-789",
    password: "pass333",
  },
  {
    firstName: "Monique",
    lastName: "Foster",
    email: "monique.foster@gmail.com",
    role: "user",
    phone: "01572-707-890",
    password: "pass444",
  },
  {
    firstName: "Isaiah",
    lastName: "Griffin",
    email: "isaiah.griffin@gmail.com",
    role: "user",
    phone: "01572-808-901",
    password: "pass555",
  },
  {
    firstName: "Avery",
    lastName: "Jordan",
    email: "avery.jordan@gmail.com",
    role: "user",
    phone: "01572-909-012",
    password: "pass666",
  },
  {
    firstName: "Kiara",
    lastName: "Watson",
    email: "kiara.watson@gmail.com",
    role: "admin",
    phone: "01572-010-123",
    password: "pass777",
  },
];

const importData = async () => {
  try {
    //Connects with MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected for seeding...");

    //Inserts new data
    await User.insertMany(users);
    console.log("Data imported successfully!");

    process.exit();
  } catch (error) {
    console.error(`Error with data import: ${error.message}`);
    process.exit(1);
  }
};

importData();
