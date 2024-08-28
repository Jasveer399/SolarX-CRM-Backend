import prisma from "../DB/db.config.js";

const createProject = async (req, res) => {
  console.log("Req.Body =>", req.body);
  const {
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
    whatsappLink,
  } = req.body;

  try {
    const createdProject = await prisma.project.create({
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
        whatsappLink,
      },
    });

    if (!createdProject) {
      return res.status(500).json({
        message: "Server Error 500 !!",
        status: false,
      });
    }

    return res.status(200).json({
      data: createdProject,
      message: "project Created Successfully !!",
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

const getAllProject = async (req, res) => {
    try {
      const project = await prisma.project.findMany();
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

export {createProject,getAllProject}
