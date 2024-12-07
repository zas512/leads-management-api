import Lead from "../models/leads.model.js";
import mongoose from "mongoose";

export const getLeads = async (req, res) => {
  try {
    if (req.query.id) {
      const lead = await Lead.findById(req.query.id);
      if (!lead) {
        return res.status(404).json({ message: "Lead not found" });
      }
      return res.status(200).json(lead);
    } else {
      const leads = await Lead.find();
      if (leads.length === 0) {
        return res.status(200).json({ message: "No leads found" });
      }
      return res.status(200).json(leads);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createLead = async (req, res) => {
  const { name, email, phone, status } = req.body;
  try {
    const lead = new Lead({ name, email, phone, status });
    await lead.save();
    return res.status(201).json(lead);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateLead = async (req, res) => {
  const { id, name, email, phone, status } = req.body;
  try {
    const lead = await Lead.findByIdAndUpdate(id, {
      name,
      email,
      phone,
      status,
    });
    return res.status(200).json(lead);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteLead = async (req, res) => {
  const { id } = req.query;
  try {
    const lead = await Lead.findById(id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Invalid lead id" });
    }
    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }
    await lead.deleteOne();
    return res.status(200).json({ message: "Lead deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
