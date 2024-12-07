import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import usersRouter from "./routes/users.route.js";
import leadsRouter from "./routes/leads.route.js";
import testRouter from "./routes/test.route.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/users", usersRouter);
app.use("/leads", leadsRouter);
app.use("/test", testRouter);
app.use("/", (req, res) => {
  res.status(200).json({ message: "Hello World" });
});
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
