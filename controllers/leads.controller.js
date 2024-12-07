import Lead from "../models/leads.model.js";
import mongoose from "mongoose";

export const getLeads = async (req, res) => {
  console.log("[getLeads] Received request with query:", req.query);

  try {
    if (req.query.id) {
      console.log(`[getLeads] Fetching lead with ID: ${req.query.id}`);
      const lead = await Lead.findById(req.query.id);

      if (!lead) {
        console.log(`[getLeads] No lead found with ID: ${req.query.id}`);
        return res.status(404).json({ message: "Lead not found" });
      }

      console.log("[getLeads] Lead found:", lead);
      return res.status(200).json(lead);
    } else {
      console.log("[getLeads] Fetching all leads");
      const leads = await Lead.find();

      if (leads.length === 0) {
        console.log("[getLeads] No leads found in database");
        return res.status(200).json({ message: "No leads found" });
      }

      console.log(`[getLeads] Fetched ${leads.length} leads`);
      return res.status(200).json(leads);
    }
  } catch (error) {
    console.error("[getLeads] Error while fetching leads:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const createLead = async (req, res) => {
  const { name, email, phone, status } = req.body;
  console.log(
    "[createLead] Received request to create lead with data:",
    req.body
  );

  try {
    const lead = new Lead({ name, email, phone, status });
    console.log("[createLead] Saving new lead to database");
    await lead.save();

    console.log("[createLead] Lead created successfully:", lead);
    return res.status(201).json(lead);
  } catch (error) {
    console.error("[createLead] Error while creating lead:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const updateLead = async (req, res) => {
  const { id, name, email, phone, status } = req.body;
  console.log("[updateLead] Received request to update lead with ID:", id);
  console.log("[updateLead] Update data:", req.body);

  try {
    console.log(`[updateLead] Updating lead with ID: ${id}`);
    const lead = await Lead.findByIdAndUpdate(
      id,
      {
        name,
        email,
        phone,
        status,
      },
      { new: true }
    );

    if (!lead) {
      console.log(`[updateLead] No lead found with ID: ${id}`);
      return res.status(404).json({ message: "Lead not found" });
    }

    console.log("[updateLead] Lead updated successfully:", lead);
    return res.status(200).json(lead);
  } catch (error) {
    console.error("[updateLead] Error while updating lead:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteLead = async (req, res) => {
  const { id } = req.query;
  console.log("[deleteLead] Received request to delete lead with ID:", id);

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log(`[deleteLead] Invalid ID format: ${id}`);
      return res.status(404).json({ message: "Invalid lead id" });
    }

    console.log(`[deleteLead] Searching for lead with ID: ${id}`);
    const lead = await Lead.findById(id);

    if (!lead) {
      console.log(`[deleteLead] No lead found with ID: ${id}`);
      return res.status(404).json({ message: "Lead not found" });
    }

    console.log(`[deleteLead] Deleting lead with ID: ${id}`);
    await lead.deleteOne();

    console.log(`[deleteLead] Lead deleted successfully: ${id}`);
    return res.status(200).json({ message: "Lead deleted" });
  } catch (error) {
    console.error("[deleteLead] Error while deleting lead:", error);
    return res.status(500).json({ message: error.message });
  }
};
