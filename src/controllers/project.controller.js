import prisma from "../DB/db.config.js";
import { formatDate } from "../utils/DateFormate.js";

const createProject = async (req, res) => {
  console.log("Req.Body =>", req.body);
  const {
    name,
    mobileNumber,
    villageCity,
    district,
    state,
    dscsSpInds,
    pspdlSection,
    solarConnectionDemand,
    proposedSolarLoad,
    monthlyBill,
    monthlyUnitConsumption,
    positiveNegative,
    successRate,
    visitStatus,
    finalStatus,
    noteForLead,
    whatsappLink,
  } = req.body;
  const date = formatDate(new Date());
  console.log("Formatted Lead Date >", date);

  try {
    let project = await prisma.project.findUnique({
      where: {
        mobileNumber,
      },
    });

    if (project) {
      // Project exists, update finalStatus
      project = await prisma.project.update({
        where: {
          mobileNumber,
        },
        data: {
          finalStatus,
        },
      });

      return res.status(200).json({
        data: project,
        message: "Project finalStatus updated successfully",
        status: true,
      });
    } else {
      // Project doesn't exist, create new project
      const createdProject = await prisma.project.create({
        data: {
          dateOfLead: date,
          name,
          mobileNumber,
          villageCity,
          district,
          state,
          dscsSpInds,
          pspdlSection,
          solarConnectionDemand,
          proposedSolarLoad,
          monthlyBill,
          monthlyUnitConsumption,
          positiveNegative,
          successRate,
          visitStatus,
          finalStatus,
          noteForLead,
          whatsappLink,
        },
      });

      if (!createdProject) {
        return res.status(500).json({
          message: "Server Error 500 !!",
          status: false,
        });
      }

      return res.status(201).json({
        data: createdProject,
        message: "Project Created Successfully !!",
        status: true,
      });
    }
  } catch (error) {
    console.error("Error in createProject:", error);
    return res.status(500).json({
      error: error.message,
      message: "Error while creating or updating project !!",
      status: false,
    });
  }
};

const getAllProject = async (req, res) => {
  try {
    const project = await prisma.project.findMany();
    const filterNoConvertedLead = project.filter(
      (pro) => pro.finalStatus === "Converted"
    );
    return res.status(200).json({
      data: filterNoConvertedLead,
      message: "Projects fetched successfully!!",
      status: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.message,
      message: "Error while fetching Projects!!",
      status: false,
    });
  }
};
const changeFinalStatus = async (req, res) => {
  const { mobileNumber, finalStatus } = req.body;
  console.log("changeCurrentSOL Req.body =>", req.body);

  if (!mobileNumber) {
    return res.status(400).json({
      message: "missing mobileNumber",
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
    const updatedProject = await prisma.project.update({
      where: {
        mobileNumber: mobileNumber,
      },
      data: {
        finalStatus: finalStatus,
      },
    });
    const updatedLeds = await prisma.leads.update({
      where: {
        mobileNumber: mobileNumber,
      },
      data: {
        finalStatus: finalStatus,
      },
    });

    if (!updatedProject && !updatedLeds) {
      return res.status(404).json({
        message: "Lead not found",
        status: false,
      });
    }

    return res.status(200).json({
      message: "Final Status updated successfully",
      status: true,
      updatedProject: updatedProject,
      updatedLeads: updatedLeds,
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

const updateProject = async (req, res) => {
  console.log("Req.Body =>", req.body);
  const {
    projectId,
    dateOfLead,
    name,
    mobileNumber,
    villageCity,
    district,
    state,
    dscsSpInds,
    pspdlSection,
    solarConnectionDemand,
    proposedSolarLoad,
    monthlyBill,
    monthlyUnitConsumption,
    positiveNegative,
    successRate,
    visitStatus,
    finalStatus,
    noteForLead,
  } = req.body;
  try {
    const updatedProject = await prisma.project.update({
      where: {
        id: projectId,
      },
      data: {
        dateOfLead,
        name,
        mobileNumber,
        villageCity,
        district,
        state,
        dscsSpInds,
        pspdlSection,
        solarConnectionDemand,
        proposedSolarLoad,
        monthlyBill,
        monthlyUnitConsumption,
        positiveNegative,
        successRate,
        visitStatus,
        finalStatus,
        noteForLead,
      },
    });

    if (!updatedProject) {
      return res.status(500).json({
        message: "Server Error 500 !!",
        status: false,
      });
    }

    return res.status(201).json({
      data: updatedProject,
      message: "Project Updated Successfully !!",
      status: true,
    });
  } catch (error) {
    console.error("Error in UpadteProject:", error);
    return res.status(500).json({
      error: error.message,
      message: "Error while updating project !!",
      status: false,
    });
  }
};
export { createProject, getAllProject, changeFinalStatus, updateProject };
