import express from "express";
import {
  getLeads,
  createLead,
  updateLead,
  deleteLead,
} from "../controllers/leads.controller.js";

const router = express.Router();

router.get("/get", getLeads);
router.post("/create", createLead);
router.put("/update", updateLead);
router.delete("/delete", deleteLead);

export default router;
