import express from "express";
import {
  getLeads,
  createLead,
  updateLead,
  deleteLead,
  getLeadStats,
} from "../controllers/leads.controller.js";
import { verify } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/get", verify, getLeads);
router.post("/create", verify, createLead);
router.put("/update", verify, updateLead);
router.delete("/delete", verify, deleteLead);
router.get("/stats", verify, getLeadStats);

export default router;
