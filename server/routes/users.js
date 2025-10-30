import express from "express";
import User from "../models/users.js";
//Checks if the user is logged in and has the admin role
import { protect, isAdmin } from "../middleware/auth.js";

//Handles api/users requests
const router = express.Router();

//Returns a list of all users excluding their passwords
//Throws an exception if something goes wrong
router.get("/", protect, isAdmin, async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

//Gets a single user by their Id
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
        firstname: updatedUser.firstname,
        lastname: updatedUser.lastname,
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
