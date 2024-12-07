import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Test route working" });
});

export default app;
