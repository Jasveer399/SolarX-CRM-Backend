import prisma from "../DB/db.config.js";
import { formatDate } from "../utils/DateFormate.js";

const createProject = async (req, res) => {
  const {
    name,
    mobileNumber,
    villageCity,
    district,
    state,
    assignedTo,
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
  try {
    let project = await prisma.project.findUnique({
      where: {
        mobileNumber,
      },
    });

    if (project) {
      project = await prisma.project.update({
        where: {
          mobileNumber,
        },
        data: {
          finalStatus,
          isConvertToProject: true,
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
          assignedTo,
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
    const project = await prisma.project.findMany({
      where: {
        AND: [{ isConvertToProject: true }, { isQuotation: false }],
      },
      orderBy: [{ createdAt: "desc" }],
    });
    return res.status(200).json({
      data: project,
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
    if (!updatedProject) {
      return res.status(404).json({
        message: "Prospect not found",
        status: false,
      });
    }

    return res.status(200).json({
      message: `Final Status updated successfully TO ${finalStatus}`,
      status: true,
      updatedProject: updatedProject,
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

const changeProspectToLeads = async (req, res) => {
  const { mobileNumber } = req.body;
  try {
    const updatedLead = await prisma.leads.update({
      where: {
        mobileNumber: mobileNumber,
      },
      data: {
        isConvertToProject: false,
        finalStatus:"InProgress"
      },
    });
    if (updatedLead) {
      const updatedProject = await prisma.project.update({
        where: {
          mobileNumber: mobileNumber,
        },
        data: {
          isConvertToProject: false,
        },
      });
      if (!updatedProject) {
        return res.status(404).json({
          message: "Prospect not found",
          status: false,
        });
      }
      return res.status(200).json({
        message: "Prospect converted to Lead successfully",
        status: true,
        updatedProject: updatedProject,
      });
    }
  } catch (error) {
    console.error("Error in changeProspectToLeads:", error);
    return res.status(500).json({
      error: error.message,
      message: "Error while converting prospect to Lead!!",
      status: false,
    });
  }
};

const updateProject = async (req, res) => {
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

const deleteProject = async (req, res) => {
  console.log("Delete Project id =>", req.body);
  try {
    const { projectId } = req.body;
    const deletedProject = await prisma.project.delete({
      where: {
        id: projectId,
      },
    });
    const deleteLead = await prisma.leads.deleteMany({
      where: {
        mobileNumber: deletedProject.mobileNumber,
      },
    });
    if (!deletedProject && !deleteLead) {
      return res.status(404).json({
        message: "Project OR Lead not found",
        status: false,
      });
    }
    return res.status(200).json({
      message: "Project OR Lead deleted successfully",
      status: true,
    });
  } catch (error) {
    console.error("Error in deleteProspect:", error);
    return res.status(500).json({
      error: error.message,
      message: "Error while deleting project!!",
      status: false,
    });
  }
};
export {
  createProject,
  getAllProject,
  changeFinalStatus,
  updateProject,
  deleteProject,
  changeProspectToLeads,
};
