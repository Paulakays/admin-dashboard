import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";

function Users() {
  const [users, setUsers] = useState([
    {
      id: 1,
      firstName: "Malik",
      lastName: "Johnson",
      email: "malik-johnson@gmail.com",
      role: "Admin",
      phone: "01572-167-897",
    },
    {
      id: 2,
      firstName: "Aaliyah",
      lastName: "Williams",
      email: "aaliyah-williams@gmail.com",
      role: "User",
      phone: "01572-234-567",
    },
    {
      id: 3,
      firstName: "Jalen",
      lastName: "Brown",
      email: "jalen-brown@gmail.com",
      role: "User",
      phone: "01572-345-678",
    },
    {
      id: 4,
      firstName: "Imani",
      lastName: "Davis",
      email: "imani-davis@gmail.com",
      role: "Moderator",
      phone: "01572-456-789",
    },
    {
      id: 5,
      firstName: "Trey",
      lastName: "Miller",
      email: "trey-miller@gmail.com",
      role: "User",
      phone: "01572-567-890",
    },
    {
      id: 6,
      firstName: "Nia",
      lastName: "Wilson",
      email: "nia-wilson@gmail.com",
      role: "Admin",
      phone: "01572-678-901",
    },
    {
      id: 7,
      firstName: "DeShawn",
      lastName: "Moore",
      email: "deshawn-moore@gmail.com",
      role: "User",
      phone: "01572-789-012",
    },
    {
      id: 8,
      firstName: "Brianna",
      lastName: "Taylor",
      email: "brianna-taylor@gmail.com",
      role: "Moderator",
      phone: "01572-890-123",
    },
    {
      id: 9,
      firstName: "Kendrick",
      lastName: "Anderson",
      email: "kendrick-anderson@gmail.com",
      role: "User",
      phone: "01572-901-234",
    },
    {
      id: 10,
      firstName: "Ayanna",
      lastName: "Thomas",
      email: "ayanna-thomas@gmail.com",
      role: "User",
      phone: "01572-012-345",
    },
  ]);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>First Name</TableCell>
          <TableCell>Second Name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Role</TableCell>
          <TableCell>Phone</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.firstName}</TableCell>
            <TableCell>{user.lastName}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>{user.phone}</TableCell>
            <TableCell>
              <Button>Edit</Button>
              <Button>Add</Button>
              <Button>Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default Users;
