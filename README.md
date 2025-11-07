# 🚀 Admin Dashboard System

A full-stack user management system built using MERN stack (MongoDB, Express.js, React.js and Node.js)

It provides secure authentification , role based access control for admins and users and a responsive dashboard UI for managing users.

## 🧩 Features

### 👨🏿‍💻 Admin Dashboard

- View all users in a searchable, paginated table.
- Add and edit users.
- Edit their own profiles.

### 👥 User Dashboard

- A registered user can view and edit their own profiles.
- A registered user can contact admins via the contact page.
- A new user can register themselves and have all the rights of a registered user.

### ➕ Endpoints

- `POST api/auth/admin-login` - Logs in an admin
- `POST api/auth/login` - Logs in a user
- `POST api/auth/register` - Registers a new user
- `GET api/users/` - returns all users(admin only)
- `GET api/users/:id` - returns user by ID (admin only)
- `POST api/users/` - creates a new user (admin only)
- `PUT api/users/profile` - update own profile (user or admin)
- `PUT api/users/:id` - updates user by ID (admin only)
- `DELETE api/users/:id` - deletes user by ID (admin only)

## 🧱 Tech Stack

- **Frontend:** React, Axios, Material UI
- **Backend:** Node.js, Express js, Mongoose
- **Database:** MongoDB

## 🔧 Installation and Setup

1.  Created a folder named admin-dashboard.
2.  Created two more folders in the root folder of admin-dashboard; one to handle the client side(frontend) and the other to handle the server side (backend).
3.  Navigated to the client folder of admin-dashboard in git bash and ran `create vite@latest . -- --template react` to create the app, then ran `npm install` to install all dependencies.
4.  Navigated to the server folder and ran `npm install` to install all dependencies.
5.  Then ran `npm init` to initialize the project and create a package.json file.
6.  Create a `.env` file in the server folder.

### 🖥️ Prerequisites

Make sure you have the following installed:

- Node.js
- MongoDB
- npm or yarn

## ⚙️ Run Node.js

Navigate to the client directory and server directory separately and run:

-- 💻 Git bash --

`npm start` or `npm run dev`
