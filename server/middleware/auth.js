import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  let token;

  //Checks if the request has an authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //Splits the string to extract the actual token which is in the second part of the array
      token = req.headers.authorization.split(" ")[1];

      //Uses the secret key to check that the token is valid
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //Fetches the user without the password
      req.user = await User.findById(decoded.id).select("-password");

      //If the user doesn't exist the request is rejected
      if (!req.user) {
        return res
          .status(401)
          .json({ message: "Not authorized, user not found" });
      }
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

//Checks if the user is an admin
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as an admin" });
  }
};

export { protect, isAdmin };
