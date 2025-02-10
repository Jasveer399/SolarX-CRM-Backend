import prisma from "../DB/db.config.js";
import { formatDate } from "../utils/DateFormate.js";

const createLead = async (req, res) => {
  const {
    mobileNumber,
    dateOfVisit,
    name,
    villageCity,
    district,
    state,
    sourceOfLead,
    currentSOL,
    callerName,
    assignedTo,
    noteForLead,
    finalStatus,
  } = req.body;

  try {
    // Validate mobile number if provided
    if (mobileNumber !== undefined && mobileNumber !== null) {
      // Check if mobile number already exists
      const existingLead = await prisma.leads.findUnique({
        where: { mobileNumber },
      });

      if (existingLead) {
        return res.status(400).json({
          message: "A lead with this mobile number already exists",
          status: false,
        });
      }
    }

    const createdLead = await prisma.leads.create({
      data: {
        mobileNumber,
        dateOfVisit,
        name,
        villageCity,
        district,
        state,
        sourceOfLead,
        currentSOL,
        callerName,
        assignedTo,
        noteForLead,
        finalStatus,
      },
    });

    return res.status(201).json({
      data: createdLead,
      message: "Lead Created Successfully!",
      status: true,
    });
  } catch (error) {
    console.log("Error while creating lead:", error);

    // Handle different types of errors
    if (error.code === "P2002") {
      return res.status(400).json({
        message: "This mobile number is already registered with another lead",
        status: false,
      });
    }

    // Handle validation errors for enums (CurrentSOL and FinalStatus)
    if (error.code === "P2012") {
      return res.status(400).json({
        message: "Invalid value provided for CurrentSOL or FinalStatus",
        status: false,
      });
    }

    // Handle invalid field type errors
    if (error.code === "P2019") {
      return res.status(400).json({
        message: "One or more field values are in an incorrect format",
        status: false,
      });
    }

    // Default error response
    return res.status(500).json({
      message: "Failed to create lead. Please try again later",
      status: false,
      debug: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

const getAllLeads = async (req, res) => {
  try {
    const totalLeadsCount = await prisma.leads.findMany();
    const leads = await prisma.leads.findMany({
      where: {
        OR: [
          { finalStatus: "InProgress" },
          { finalStatus: null },
          { isConvertToProject: false },
        ],
      },
      orderBy: [
        { createdAt: "desc" },
        { name: "asc" },
        { mobileNumber: "desc" },
      ],
    });
    return res.status(200).json({
      data: leads,
      totalLeadsCount: totalLeadsCount,
      message: "Leads fetched successfully!!",
      status: true,
    });
  } catch (error) {
    console.log("Error while fetching leads:", error);
    return res.status(500).json({
      error: error.message,
      message: "Error while fetching leads!!",
      status: false,
    });
  }
};

const changeCurrentSOL = async (req, res) => {
  const { leadId, currentsol, finalStatus } = req.body;
  console.log("changeCurrentSOL Req.body =>", req.body);

  if (!leadId || typeof leadId !== "string") {
    return res.status(400).json({
      message: "Invalid or missing leadId",
      status: false,
    });
  }

  if (!currentsol) {
    return res.status(400).json({
      message: "missing currentSOL value",
      status: false,
    });
  }

  try {
    const currentSOL = await prisma.leads.update({
      where: {
        id: leadId,
      },
      data: {
        currentSOL: currentsol,
      },
    });

    if (!currentSOL) {
      return res.status(404).json({
        message: "Lead not found",
        status: false,
      });
    }

    return res.status(200).json({
      message: "Current SOL updated successfully",
      status: true,
      data: currentSOL,
    });
  } catch (error) {
    console.error("Error updating current SOL:", error);

    if (error.code === "P2025") {
      return res.status(404).json({
        message: "Lead not found",
        status: false,
      });
    }

    return res.status(500).json({
      message: "Error while updating current SOL",
      status: false,
      error: error.message,
    });
  }
};
const changeFinalStatus = async (req, res) => {
  const { leadId, finalStatus } = req.body;

  if (!leadId || typeof leadId !== "string") {
    return res.status(400).json({
      message: "Invalid or missing leadId",
      status: false,
    });
  }

  if (!finalStatus) {
    return res.status(400).json({
      message: "missing finalStatus value",
      status: false,
    });
  }

  try {
    const updatedLead = await prisma.leads.update({
      where: {
        id: leadId,
      },
      data: {
        finalStatus: finalStatus,
        isConvertToProject: true,
      },
    });

    if (!updatedLead) {
      return res.status(404).json({
        message: "Lead not found",
        status: false,
      });
    }

    return res.status(200).json({
      message: "Final Status updated successfully",
      status: true,
      data: updatedLead,
    });
  } catch (error) {
    console.error("Error updating Final Status:", error);

    if (error.code === "P2025") {
      return res.status(404).json({
        message: "Lead not found",
        status: false,
      });
    }

    return res.status(500).json({
      message: "Error while updating Final Status",
      status: false,
      error: error.message,
    });
  }
};

const updateLead = async (req, res) => {
  const {
    leadId,
    mobileNumber,
    dateOfVisit,
    name,
    villageCity,
    district,
    state,
    sourceOfLead,
    currentSOL,
    callerName,
    assignedTo,
    finalStatus,
    noteForLead,
    whatsappUrl,
  } = req.body;
  console.log("changeCurrentSOL Req.body =>", req.body);

  if (!leadId || typeof leadId !== "string") {
    return res.status(400).json({
      message: "Invalid or missing leadId",
      status: false,
    });
  }

  try {
    const updatedLead = await prisma.leads.update({
      where: {
        id: leadId,
      },
      data: {
        mobileNumber,
        dateOfVisit,
        name,
        villageCity,
        district,
        state,
        sourceOfLead,
        currentSOL,
        callerName,
        assignedTo,
        finalStatus,
        noteForLead,
        whatsappUrl,
      },
    });

    if (!updatedLead) {
      return res.status(404).json({
        message: "Lead not found",
        status: false,
      });
    }

    return res.status(200).json({
      message: "Lead updated successfully",
      status: true,
      data: updatedLead,
    });
  } catch (error) {
    console.error("Error updating Lead:", error);

    if (error.code === "P2025") {
      return res.status(404).json({
        message: "Lead not found",
        status: false,
      });
    }

    return res.status(500).json({
      message: "Error while updating Lead",
      status: false,
      error: error.message,
    });
  }
};

const BATCH_SIZE = 100;

const formatDateforExcel = (dateString) => {
  if (!dateString) return null;

  // Remove any potential whitespace
  dateString = dateString.trim();

  // Try to identify the format
  const parts = dateString.split(/[/-]/);

  if (parts.length !== 3) return null;

  // Check if it's yyyy/mm/dd format
  if (parts[0].length === 4) {
    // Convert from yyyy/mm/dd to dd/mm/yyyy
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }

  // If it's already in dd/mm/yyyy format, return as is
  if (parts[0].length === 2 || parts[0].length === 1) {
    return dateString;
  }

  return null;
};

const processBatch = async (batch) => {
  return await Promise.all(
    batch.map(async (lead) => {
      try {
        const formattedDate = formatDateforExcel(lead.dateOfVisit);

        return await prisma.leads.upsert({
          where: { mobileNumber: lead.mobileNumber },
          update: {
            dateOfVisit: formattedDate,
            name: lead.name,
            villageCity: lead.villageCity,
            district: lead.district,
            state: lead.state,
          },
          create: {
            mobileNumber: lead.mobileNumber,
            dateOfVisit: formattedDate,
            name: lead.name,
            villageCity: lead.villageCity,
            district: lead.district,
            state: lead.state,
          },
        });
      } catch (error) {
        console.error(
          `Error processing lead with mobile number ${lead.mobileNumber}:`,
          error
        );
        return {
          error: true,
          mobileNumber: lead.mobileNumber,
          message: error.message,
        };
      }
    })
  );
};

const CreateLeadsFromExcel = async (req, res) => {
  try {
    const { leadsData } = req.body;

    if (!Array.isArray(leadsData) || leadsData.length === 0) {
      return res
        .status(400)
        .json({ error: "Invalid input: Expected an array of leads" });
    }

    const results = [];
    const errors = [];

    for (let i = 0; i < leadsData.length; i += BATCH_SIZE) {
      const batch = leadsData.slice(i, i + BATCH_SIZE);
      const batchResults = await processBatch(batch);

      batchResults.forEach((result) => {
        if (result.error) {
          errors.push(result);
        } else {
          results.push(result);
        }
      });

      // Optional: Add a small delay between batches to prevent overwhelming the database
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    return res.status(201).json({
      message: "Leads processing completed",
      count: results.length,
      data: results,
      errors: errors,
      status: true,
    });
  } catch (error) {
    console.error("Error processing leads:", error);
    res.status(500).json({ error: "An error occurred while processing leads" });
  } finally {
    await prisma.$disconnect();
  }
};

const deleteLeads = async (req, res) => {
  const { leadID } = req.body;
  try {
    const deletedPayment = await prisma.leads.delete({
      where: {
        id: leadID,
      },
    });
    return res.status(200).json({
      data: deletedPayment,
      message: "Lead Deleted Successfully !!",
      status: true,
    });
  } catch (error) {
    console.error("Error while deleting Lead:", error);
    return res.status(500).json({
      error: error.message,
      message: "Error while deleting Lead!!",
      status: false,
    });
  }
};

export {
  createLead,
  getAllLeads,
  changeCurrentSOL,
  updateLead,
  changeFinalStatus,
  CreateLeadsFromExcel,
  deleteLeads,
};
