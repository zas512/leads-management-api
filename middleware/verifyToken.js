import { verifyToken } from "../helpers/auth.helper.js";

export const verify = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  next();
};
