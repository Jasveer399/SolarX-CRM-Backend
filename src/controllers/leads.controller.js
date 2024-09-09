import prisma from "../DB/db.config.js";
import { formatDate } from "../utils/DateFormate.js";

const createLead = async (req, res) => {
  console.log("Req.Body =>", req.body);
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
    const createdLead = await prisma.leads.create({
      data: {
        mobileNumber, // Convert to BigInt
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

    if (!createdLead) {
      return res.status(500).json({
        message: "Server Error 500 !!",
        status: false,
      });
    }

    return res.status(200).json({
      data: createdLead,
      message: "Lead Created Successfully !!",
      status: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.message,
      message: "Error while creating lead !!",
      status: false,
    });
  }
};

const getAllLeads = async (req, res) => {
  try {
    const leads = await prisma.leads.findMany({
      where: {
        OR: [
          { finalStatus: "InProgress" },
          { finalStatus: null },
          { isConvertToProject: false },
        ],
      },
      orderBy: [{ createdAt: "desc" }],
    });
    return res.status(200).json({
      data: leads,
      message: "Leads fetched successfully!!",
      status: true,
    });
  } catch (error) {
    console.log(error);
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
  console.log("changeCurrentSOL Req.body =>", req.body);

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

const BATCH_SIZE = 100; // Adjust this value based on your system's capabilities

const processBatch = async (batch) => {
  return await Promise.all(
    batch.map(async (lead) => {
      try {
        return await prisma.leads.upsert({
          where: { mobileNumber: lead.mobileNumber },
          update: {
            dateOfVisit: lead.dateOfVisit,
            name: lead.name,
            villageCity: lead.villageCity,
            district: lead.district,
            state: lead.state,
          },
          create: {
            mobileNumber: lead.mobileNumber,
            dateOfVisit: lead.dateOfVisit,
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

export {
  createLead,
  getAllLeads,
  changeCurrentSOL,
  updateLead,
  changeFinalStatus,
  CreateLeadsFromExcel,
};
