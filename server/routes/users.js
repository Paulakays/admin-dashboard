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

      //The newer version is saved in Mongo DB
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
