import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

export const verifyToken = (token, userId) => {
  return jwt.verify(token, process.env.JWT_SECRET, { userId });
};

export const encryptPassword = (password) => {
  return bcrypt.hash(password, 10);
};

export const comparePassword = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};
