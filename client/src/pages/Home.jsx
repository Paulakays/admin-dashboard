import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Box,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TablePagination,
  Alert,
  Snackbar,
} from "@mui/material";
import api from "../api";

function Home() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
  });
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // Check if current user is admin
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const isAdmin = currentUser?.role === "admin";

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      const { data } = await api.get("/users");
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle opening add/edit dialog
  const handleOpenAdd = () => {
    setEditingUser(null);
    setForm({ firstName: "", lastName: "", email: "", phone: "", role: "" });
    setOpenDialog(true);
  };

  const handleOpenEdit = (user) => {
    setEditingUser(user);
    setForm({ ...user });
    setOpenDialog(true);
  };

  // Handle form field changes
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Handle submitting add/edit form
  const handleSubmit = async () => {
    if (!form.firstName || !form.lastName || !form.email || !form.role) {
      setAlertMessage("Please fill in all required fields.");
      setAlertOpen(true);
      return;
    }
    try {
      if (editingUser) {
        await api.put(`/users/${editingUser._id}`, form);
        setAlertMessage("User updated successfully");
      } else {
        await api.post("/users", form);
        setAlertMessage("User added successfully");
      }
      setAlertOpen(true);
      fetchUsers();
      setOpenDialog(false);
    } catch (err) {
      console.error(err);
      const backendMessage = err.response?.data?.message;
      if (backendMessage) {
        setAlertMessage(backendMessage);
      } else {
        setAlertMessage("Something went wrong. Please try again.");
      }
      setAlertOpen(true);
    }
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(filter.toLowerCase()) ||
      user.lastName.toLowerCase().includes(filter.toLowerCase()) ||
      user.email.toLowerCase().includes(filter.toLowerCase()) ||
      user.role.toLowerCase().includes(filter.toLowerCase()) ||
      (user.phone && user.phone.includes(filter))
  );

  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        User List
      </Typography>

      <TextField
        label="Search Users"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        margin="normal"
        fullWidth
      />

      {/* If admin, show Add User button */}
      {isAdmin && (
        <Button
          variant="contained"
          sx={{
            mt: 2,
            mb: 2,
            backgroundColor: "#6610f4",
            fontWeight: 600,
            textTransform: "none",
            "&:hover": { backgroundColor: "#520dc2" },
          }}
          onClick={handleOpenAdd}
        >
          Add User
        </Button>
      )}

      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 600 }}>First Name</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Last Name</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Role</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Phone</TableCell>
            {isAdmin && <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredUsers
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((user) => (
              <TableRow
                key={user._id}
                sx={{
                  "&:hover": { backgroundColor: "#f5f5f5" },
                }}
              >
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.phone}</TableCell>
                {isAdmin && (
                  <TableCell>
                    <Button
                      variant="outlined"
                      sx={{
                        textTransform: "none",
                        borderColor: "#6610f4",
                        color: "#6610f4",
                        "&:hover": {
                          borderColor: "#520dc2",
                          color: "#520dc2",
                          backgroundColor: "rgba(82,13,194,0.08)",
                        },
                      }}
                      onClick={() => handleOpenEdit(user)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          {filteredUsers.length === 0 && (
            <TableRow style={{ height: 53 * rowsPerPage }}>
              <TableCell colSpan={isAdmin ? 6 : 5} align="center">
                No users found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={filteredUsers.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ mt: 2 }}
      />

      {isAdmin && (
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          PaperProps={{
            sx: { borderRadius: 3, padding: 3, minWidth: 400, maxWidth: 500 },
          }}
        >
          <DialogTitle sx={{ fontWeight: 600, color: "#6610f4" }}>
            {editingUser ? "Edit User" : "Add User"}
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
            <TextField
              label="Role"
              name="role"
              value={form.role}
              onChange={handleChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions sx={{ justifyContent: "space-between", mt: 1 }}>
            <Button
              onClick={() => setOpenDialog(false)}
              variant="contained"
              sx={{
                backgroundColor: "#6610f4",
                color: "#fff",
                fontWeight: 600,
                textTransform: "none",
                borderRadius: 1,
                "&:hover": { backgroundColor: "#520dc2" },
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#6610f4",
                color: "#fff",
                fontWeight: 600,
                textTransform: "none",
                borderRadius: 1,
                "&:hover": { backgroundColor: "#520dc2" },
              }}
              onClick={handleSubmit}
            >
              {editingUser ? "Update" : "Add"}
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setAlertOpen(false)}
          severity={alertMessage.includes("successfully") ? "success" : "error"}
          sx={{
            width: "100%",
            backgroundColor: alertMessage.includes("successfully")
              ? "#4caf50"
              : "#f44336",
            color: "#fff",
            "& .MuiAlert-icon": { color: "#fff" },
          }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Home;
