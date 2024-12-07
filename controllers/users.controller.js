import {
  encryptPassword,
  comparePassword,
  generateToken,
} from "../helpers/auth.helper.js";
import User from "../models/users.model.js";

export const registerUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("[registerUser] Received request with email:", email);

  if (!email || !password) {
    console.log("[registerUser] Missing email or password in request");
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    console.log("[registerUser] Checking if user already exists");
    const user = await User.findOne({ email });
    if (user) {
      console.log(`[registerUser] User with email ${email} already exists`);
      return res.status(400).json({ message: "User already exists" });
    }

    console.log("[registerUser] Encrypting password");
    const hashedPassword = await encryptPassword(password);
    console.log("[registerUser] Password encrypted successfully");

    console.log("[registerUser] Creating new user in database");
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    console.log(
      `[registerUser] User registered successfully with email: ${email}`
    );

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("[registerUser] Error during user registration:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("[loginUser] Received login request with email:", email);

  if (!email || !password) {
    console.log("[loginUser] Missing email or password in request");
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    console.log("[loginUser] Searching for user in database");
    const user = await User.findOne({ email });
    if (!user) {
      console.log(`[loginUser] No user found with email: ${email}`);
      return res.status(400).json({ message: "Invalid email or password" });
    }

    console.log("[loginUser] Comparing provided password with stored password");
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      console.log("[loginUser] Invalid password provided");
      return res.status(400).json({ message: "Invalid email or password" });
    }

    console.log("[loginUser] Generating authentication token");
    const token = generateToken(user._id);

    console.log("[loginUser] Setting cookie with authentication token");
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    console.log(`[loginUser] Login successful for user: ${email}`);
    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("[loginUser] Error during login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
