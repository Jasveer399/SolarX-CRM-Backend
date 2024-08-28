import prisma from "../DB/db.config.js";

const createLead = async (req, res) => {
  console.log("Req.Body =>", req.body);
  const {
    mobileNumber,
    dateOfVisit,
    name,
    city,
    district,
    state,
    sourceOfLead,
    currentSOL,
    callerName,
    assignedTo,
    finalStatus,
    whatsappUrl,
  } = req.body;

  try {
    const createdLead = await prisma.leads.create({
      data: {
        mobileNumber, // Convert to BigInt
        dateOfVisit,
        name,
        city,
        district,
        state,
        sourceOfLead,
        currentSOL,
        callerName,
        assignedTo,
        finalStatus,
        whatsappUrl,
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
    const leads = await prisma.leads.findMany();
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

const changeCurrentSOLandFinalStatus = async (req, res) => {
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
        finalStatus: finalStatus,
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
const updateLead = async (req, res) => {
  const {
    leadId,
    mobileNumber,
    dateOfVisit,
    name,
    city,
    district,
    state,
    sourceOfLead,
    currentSOL,
    callerName,
    assignedTo,
    finalStatus,
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
        city,
        district,
        state,
        sourceOfLead,
        currentSOL,
        callerName,
        assignedTo,
        finalStatus,
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

export { createLead, getAllLeads, changeCurrentSOLandFinalStatus, updateLead };
