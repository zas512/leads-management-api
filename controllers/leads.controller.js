import Lead from "../models/leads.model.js";
import mongoose from "mongoose";

export const getLeads = async (req, res) => {
  console.log("[getLeads] Received request with query:", req.query);

  try {
    if (req.query.id) {
      console.log(`[getLeads] Fetching lead with ID: ${req.query.id}`);
      const lead = await Lead.findById(req.query.id);

      if (!lead) {
        console.log(`[getLeads] Lead with ID: ${req.query.id} does not exist`);
        return res.status(404).json({ message: "Lead not found" });
      }

      console.log(`[getLeads] Successfully fetched lead:`, lead);
      return res.status(200).json(lead);
    } else {
      console.log("[getLeads] Fetching all leads from the database");
      const leads = await Lead.find();

      if (leads.length === 0) {
        console.log("[getLeads] No leads found in the database");
        return res.status(200).json({ message: "No leads found" });
      }

      console.log(`[getLeads] Successfully fetched ${leads.length} leads`);
      return res.status(200).json(leads);
    }
  } catch (error) {
    console.error("[getLeads] An error occurred while fetching leads:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createLead = async (req, res) => {
  const { name, email, phone, status } = req.body;
  console.log(
    "[createLead] Received request to create a lead with the following data:",
    req.body
  );

  try {
    const lead = new Lead({ name, email, phone, status });
    console.log("[createLead] Attempting to save the lead to the database");
    await lead.save();

    console.log("[createLead] Successfully created lead:", lead);
    return res.status(201).json(lead);
  } catch (error) {
    console.error("[createLead] Error occurred while creating lead:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateLead = async (req, res) => {
  const { _id, name, email, phone, status } = req.body;
  console.log(`[updateLead] Received request to update lead with ID: ${_id}`);
  console.log(`[updateLead] Update data received:`, req.body);
  try {
    console.log(`[updateLead] Attempting to update lead with ID: ${_id}`);
    const lead = await Lead.findByIdAndUpdate(
      _id,
      { name, email, phone, status },
      { new: true }
    );

    if (!lead) {
      console.log(`[updateLead] No lead found with ID: ${_id}`);
      return res.status(404).json({ message: "Lead not found" });
    }

    console.log("[updateLead] Lead updated successfully:", lead);
    return res.status(200).json(lead);
  } catch (error) {
    console.error("[updateLead] Error occurred while updating lead:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteLead = async (req, res) => {
  const { _id } = req.query;
  console.log(`[deleteLead] Received request to delete lead with ID: ${_id}`);

  try {
    console.log(`[deleteLead] Searching for lead with ID: ${_id}`);
    const lead = await Lead.findById(_id);

    if (!lead) {
      console.log(`[deleteLead] No lead found with ID: ${_id}`);
      return res.status(404).json({ message: "Lead not found" });
    }

    console.log(`[deleteLead] Attempting to delete lead with ID: ${_id}`);
    await lead.deleteOne();

    console.log(`[deleteLead] Successfully deleted lead with ID: ${_id}`);
    return res.status(200).json({ message: "Lead deleted successfully" });
  } catch (error) {
    console.error("[deleteLead] Error occurred while deleting lead:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getLeadStats = async (req, res) => {
  console.log("[getLeadStats] Received request to fetch lead stats");
  try {
    const totalLeads = await Lead.countDocuments();
    const newLeads = await Lead.countDocuments({ status: "New" });
    const convertedLeads = await Lead.countDocuments({
      status: { $in: ["Qualified", "Closed"] },
    });
    const pendingFollowUps = await Lead.countDocuments({ status: "Contacted" });
    console.log("[getLeadStats] Stats calculated successfully");
    return res.status(200).json({
      totalLeads,
      newLeads,
      convertedLeads,
      pendingFollowUps,
    });
  } catch (error) {
    console.error("[getLeadStats] Error while fetching lead stats:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
