import prisma from "../DB/db.config.js";

// Create Final Submission
const createFinalSubmission = async (req, res) => {
  const {
    consumerName,
    accountNo,
    sanLoad,
    solarLoad,
    installationDate,
    bidirectionalMeterNo,
    bidirectionalMeterCap,
    bidirectionalMeterMake,
    bidirectionalMeterMultiplyFactor,
    importKWH,
    importKVAH,
    importMDI,
    exportKWH,
    exportKVAH,
    exportMDI,
    netSolarMeterNo,
    netSolarMeterCap,
    netSolarMeterMake,
    netSolarMeterMultiplyFactor,
    netSolarKWH,
    netSolarKVAH,
    netSolarMDI,
    oldMeterNo,
    oldMeterCap,
    oldMeterMake,
    oldMeterKWH,
    oldMeterKVAH,
    oldMeterMDI,
  } = req.body;

  try {
    // Check if the account number already exists
    const existingSubmission = await prisma.finalSubmissions.findUnique({
      where: { accountNo },
    });

    if (existingSubmission) {
      return res.status(400).json({
        message: "A submission with this account number already exists",
        status: false,
      });
    }

    // Create the final submission
    const createdSubmission = await prisma.finalSubmissions.create({
      data: {
        consumerName,
        accountNo,
        sanLoad,
        solarLoad,
        installationDate: installationDate || "",
        bidirectionalMeterNo,
        bidirectionalMeterCap,
        bidirectionalMeterMake,
        bidirectionalMeterMultiplyFactor,
        importKWH,
        importKVAH,
        importMDI,
        exportKWH,
        exportKVAH,
        exportMDI,
        netSolarMeterNo,
        netSolarMeterCap,
        netSolarMeterMake,
        netSolarMeterMultiplyFactor,
        netSolarKWH,
        netSolarKVAH,
        netSolarMDI,
        oldMeterNo,
        oldMeterCap,
        oldMeterMake,
        oldMeterKWH,
        oldMeterKVAH,
        oldMeterMDI,
      },
    });

    return res.status(201).json({
      data: createdSubmission,
      message: "Final Submission Created Successfully!",
      status: true,
    });
  } catch (error) {
    console.log("Error while creating final submission:", error);

    // Handle Prisma errors
    if (error.code === "P2002") {
      return res.status(400).json({
        message: "A submission with this account number already exists",
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
      message: "Failed to create final submission. Please try again later",
      status: false,
      debug: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Update Final Submission
const updateFinalSubmission = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  console.log("Update Data", updateData);

  try {
    // Check if the submission exists
    const existingSubmission = await prisma.finalSubmissions.findUnique({
      where: { id },
    });

    if (!existingSubmission) {
      return res.status(404).json({
        message: "Final Submission not found",
        status: false,
      });
    }

    // Update the final submission
    const updatedSubmission = await prisma.finalSubmissions.update({
      where: { id },
      data: updateData,
    });

    return res.status(200).json({
      data: updatedSubmission,
      message: "Final Submission Updated Successfully!",
      status: true,
    });
  } catch (error) {
    console.log("Error while updating final submission:", error);

    // Handle Prisma errors
    if (error.code === "P2025") {
      return res.status(404).json({
        message: "Final Submission not found",
        status: false,
      });
    }

    // Default error response
    return res.status(500).json({
      message: "Failed to update final submission. Please try again later",
      status: false,
      debug: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Get All Final Submissions
const getAllFinalSubmissions = async (req, res) => {
  try {
    const submissions = await prisma.finalSubmissions.findMany();

    return res.status(200).json({
      data: submissions,
      message: "Final Submissions Retrieved Successfully!",
      status: true,
    });
  } catch (error) {
    console.log("Error while retrieving final submissions:", error);

    return res.status(500).json({
      message: "Failed to retrieve final submissions. Please try again later",
      status: false,
      debug: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Delete Final Submission
const deleteFinalSubmission = async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the submission exists
    const existingSubmission = await prisma.finalSubmissions.findUnique({
      where: { id },
    });

    if (!existingSubmission) {
      return res.status(404).json({
        message: "Final Submission not found",
        status: false,
      });
    }

    // Delete the final submission
    await prisma.finalSubmissions.delete({
      where: { id },
    });

    return res.status(200).json({
      message: "Final Submission Deleted Successfully!",
      status: true,
    });
  } catch (error) {
    console.log("Error while deleting final submission:", error);

    // Handle Prisma errors
    if (error.code === "P2025") {
      return res.status(404).json({
        message: "Final Submission not found",
        status: false,
      });
    }

    // Default error response
    return res.status(500).json({
      message: "Failed to delete final submission. Please try again later",
      status: false,
      debug: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
export {
  createFinalSubmission,
  updateFinalSubmission,
  getAllFinalSubmissions,
  deleteFinalSubmission,
};
