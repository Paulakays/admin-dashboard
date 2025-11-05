import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  Avatar,
} from "@mui/material";
import api from "../api";

function MyProfile() {
  const [user, setUser] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [image, setImage] = useState(null);

  // Load user data from local storage on component mount
  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        setUser(storedUser);
        setForm({
          firstName: storedUser.firstName || "",
          lastName: storedUser.lastName || "",
          email: storedUser.email || "",
          phone: storedUser.phone || "",
        });
      }
    } catch {
      console.error("Failed to load user data.");
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  // Handle form field changes
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Handle saving updated profile
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token"); // get the stored JWT token

      const { data } = await api.put("/users/profile", form, {
        headers: {
          Authorization: `Bearer ${token}`, // send token in headers
        },
      });

      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      setOpenEdit(false);
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return null;

  return (
    <Box sx={{ mt: 6, textAlign: "center" }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        My Profile
      </Typography>

      {/* Profile Image */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 2,
        }}
      >
        <label htmlFor="profile-upload">
          <input
            type="file"
            id="profile-upload"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <Avatar
            src={image}
            sx={{
              width: 120,
              height: 120,
              cursor: "pointer",
              border: "3px solid #6610f4",
              "&:hover": { borderColor: "#520dc2" },
            }}
          />
        </label>
      </Box>

      <Card
        sx={{
          maxWidth: 400,
          mx: "auto",
          borderRadius: 3,
          boxShadow: 3,
          p: 2,
        }}
      >
        <CardContent>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>First Name:</strong> {user.firstName}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Last Name:</strong> {user.lastName}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Email:</strong> {user.email}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Phone:</strong> {user.phone || "N/A"}
          </Typography>
          <Typography variant="body1">
            <strong>Role:</strong> {user.role}
          </Typography>
        </CardContent>
      </Card>

      <Button
        variant="contained"
        sx={{
          mt: 3,
          backgroundColor: "#6610f4",
          "&:hover": { backgroundColor: "#520dc2" },
          textTransform: "none",
          borderRadius: 2,
          px: 3,
        }}
        onClick={() => setOpenEdit(true)}
      >
        Edit Profile
      </Button>

      {/* Edit Dialog */}
      <Dialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        PaperProps={{
          sx: { borderRadius: 3, padding: 2, minWidth: 400, maxWidth: 500 },
        }}
      >
        <DialogTitle sx={{ fontWeight: 600, color: "#6610f4" }}>
          Edit Profile
        </DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <TextField
            label="First Name"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: "space-between", mt: 1 }}>
          <Button
            variant="contained"
            onClick={() => setOpenEdit(false)}
            sx={{
              backgroundColor: "#6610f4",
              "&:hover": { backgroundColor: "#520dc2" },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#6610f4",
              "&:hover": { backgroundColor: "#520dc2" },
            }}
            onClick={handleSave}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default MyProfile;
