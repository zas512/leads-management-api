import mongoose from "mongoose";

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["New", "Contacted", "Qualified", "Lost", "Closed"],
    default: "new",
  },
});

const Lead = mongoose.model("Lead", leadSchema);

export default Lead;
