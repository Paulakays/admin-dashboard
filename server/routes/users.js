import express from "express";
import User from "../models/User.js";
//Checks if the user is logged in and has the admin role
import { protect, isAdmin } from "../middleware/auth.js";

//Handles api/users requests
const router = express.Router();

//Returns a list of all users excluding their passwords
//Throws an exception if something goes wrong
// GET api/users/ - returns all users(admin only)
router.get("/", protect, isAdmin, async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ message: "Not authorized as an admin" });
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

//Gets a single user by their Id
// GET api/users/:id - returns user by ID (admin only)
router.get("/:id", protect, isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

//Creates a new user
// POST api/users/ - creates a new user (admin only)
router.post("/", protect, isAdmin, async (req, res) => {
  try {
    const { firstName, lastName, email, phone, role, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      phone,
      role,
      password: password || "123456", // temporary default password if not provided
    });

    await newUser.save();
    res.status(201).json({
      message: "User created successfully",
      user: {
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// PUT api/users/profile - update own profile (user or admin)
// Update own profile
router.put("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id); // current logged-in user

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update only allowed fields
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.phone = req.body.phone || user.phone;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      phone: updatedUser.phone,
      role: updatedUser.role,
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

//Updates a user's information
// PUT api/users/:id - updates user by ID (admin only)
router.put("/:id", protect, isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    //Checks if there's a new value from the request body and updates if there is
    if (user) {
      user.firstName = req.body.firstName || user.firstName;
      user.lastName = req.body.lastName || user.lastName;
      user.email = req.body.email || user.email;
      user.phone = req.body.phone || user.phone;
      user.role = req.body.role || user.role;

      //Saves the updated user to the database
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        phone: updatedUser.phone,
        role: updatedUser.role,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

//Finds user by Id and deletes them
// DELETE api/users/:id - deletes user by ID (admin only)
router.delete("/:id", protect, isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      await user.deleteOne();
      res.json({ message: "User removed" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

export default router;
